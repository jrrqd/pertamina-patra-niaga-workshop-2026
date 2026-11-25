#!/usr/bin/env python3
"""Local tests for patra_cc (no network, no radr)."""
import json
import os
import shutil
import tempfile
import threading
import time
import unittest
import urllib.error
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
import sys
sys.path.insert(0, os.path.join(ROOT, "backend"))
import patra_cc  # noqa: E402


class PatraCCTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.mkdtemp(prefix="patra-cc-")
        for name in ("org.json", "sops.json", "tasks.json"):
            shutil.copy(os.path.join(ROOT, "data", name), os.path.join(cls.tmp, name))
        cls.log = os.path.join(cls.tmp, "responses.jsonl")
        os.environ["PATRA_PORT"] = "3979"
        os.environ["PATRA_DATA_DIR"] = cls.tmp
        os.environ["PATRA_ORG_FILE"] = os.path.join(cls.tmp, "org.json")
        os.environ["PATRA_SOPS_FILE"] = os.path.join(cls.tmp, "sops.json")
        os.environ["PATRA_TASKS_FILE"] = os.path.join(cls.tmp, "tasks.json")
        os.environ["PATRA_LOG_FILE"] = cls.log
        os.environ["PATRA_LOCK_FILE"] = os.path.join(cls.tmp, "patra.lock")
        os.environ["PATRA_ALLOWED_ORIGIN"] = "http://127.0.0.1:8766"
        # reload module config
        patra_cc.PORT = 3979
        patra_cc.DATA_DIR = cls.tmp
        patra_cc.ORG_FILE = os.environ["PATRA_ORG_FILE"]
        patra_cc.SOPS_FILE = os.environ["PATRA_SOPS_FILE"]
        patra_cc.TASKS_FILE = os.environ["PATRA_TASKS_FILE"]
        patra_cc.LOG = cls.log
        patra_cc.LOCK_FILE = os.environ["PATRA_LOCK_FILE"]
        patra_cc.ORIGIN = "http://127.0.0.1:8766"
        patra_cc.WEBHOOK_URL = ""
        patra_cc.WEBHOOK_KEY = ""
        cls.httpd = patra_cc.ThreadingHTTPServer(("127.0.0.1", 3979), patra_cc.Handler)
        cls.thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.thread.start()
        time.sleep(0.2)

    @classmethod
    def tearDownClass(cls):
        cls.httpd.shutdown()
        shutil.rmtree(cls.tmp, ignore_errors=True)

    def call(self, method, path, body=None):
        data = None if body is None else json.dumps(body).encode("utf-8")
        req = urllib.request.Request(
            "http://127.0.0.1:3979" + path,
            data=data,
            method=method,
            headers={
                "X-Patra-Request": "1",
                "Content-Type": "application/json",
                "Origin": "http://127.0.0.1:8766",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=5) as r:
                return r.status, json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            return e.code, json.loads(e.read().decode("utf-8"))

    def test_health_and_org(self):
        code, data = self.call("GET", "/patra/api/health")
        self.assertEqual(code, 200)
        self.assertTrue(data["ok"])
        code, data = self.call("GET", "/patra/api/org?dept=mrp")
        self.assertEqual(code, 200)
        self.assertIn("nodes", data["graph"])

    def test_org_crud(self):
        code, data = self.call("POST", "/patra/api/org", {
            "action": "create_node",
            "dept": "event",
            "node": {"id": "ev-logistik", "label": "Logistik", "kind": "agent", "holder": "Agen Logistik", "x": 200, "y": 300},
        })
        self.assertEqual(code, 200)
        code, data = self.call("POST", "/patra/api/org", {
            "action": "delete_node",
            "dept": "event",
            "id": "ev-logistik",
        })
        self.assertEqual(code, 200)

    def test_sop_crud(self):
        code, data = self.call("POST", "/patra/api/sops", {
            "action": "create",
            "dept": "mblp",
            "title": "SOP uji draf",
            "summary": "ringkas",
            "steps": "satu dua",
            "source_path": "knowledge-base/company/sop/sop_creative_pipeline.md",
        })
        self.assertEqual(code, 200)
        sid = data["item"]["id"]
        code, data = self.call("POST", "/patra/api/sops", {
            "action": "update",
            "id": sid,
            "title": "SOP uji draf diubah",
        })
        self.assertEqual(code, 200)
        self.assertEqual(data["item"]["title"], "SOP uji draf diubah")
        code, data = self.call("POST", "/patra/api/sops", {"action": "delete", "id": sid})
        self.assertEqual(code, 200)

    def test_feedback_org_queue(self):
        code, data = self.call("POST", "/patra/api/respond", {
            "group": "MRP-A",
            "type": "org",
            "note": "tambah peran analis di bawah CoS MRP",
        })
        self.assertEqual(code, 200)
        self.assertEqual(data["entry"]["forward_status"], "queued")
        code, data = self.call("GET", "/patra/api/history?group=MRP-A")
        self.assertEqual(code, 200)
        self.assertGreaterEqual(data["total"], 1)
        self.assertEqual(data["items"][0]["type"], "org")


if __name__ == "__main__":
    unittest.main()
