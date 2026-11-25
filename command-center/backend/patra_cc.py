#!/usr/bin/env python3
"""Patra Niaga command center API (stdlib only).

Listens on 127.0.0.1. nginx proxies /patra/api/ here behind workshop basic auth.
Does not touch the family ops dashboard on port 3071.
"""
from __future__ import annotations

import fcntl
import json
import os
import re
import tempfile
import threading
import time
import uuid
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlsplit

HOST = "127.0.0.1"
PORT = int(os.environ.get("PATRA_PORT", "3072"))
DATA_DIR = os.environ.get("PATRA_DATA_DIR", os.path.join(os.path.dirname(__file__), "..", "data"))
ORG_FILE = os.environ.get("PATRA_ORG_FILE", os.path.join(DATA_DIR, "org.json"))
SOPS_FILE = os.environ.get("PATRA_SOPS_FILE", os.path.join(DATA_DIR, "sops.json"))
TASKS_FILE = os.environ.get("PATRA_TASKS_FILE", os.path.join(DATA_DIR, "tasks.json"))
SCHEDULES_FILE = os.environ.get("PATRA_SCHEDULES_FILE", os.path.join(DATA_DIR, "schedules.json"))
DOCS_FILE = os.environ.get("PATRA_DOCS_FILE", os.path.join(DATA_DIR, "docs.json"))
LOG = os.environ.get("PATRA_LOG_FILE", os.path.join(DATA_DIR, "responses.jsonl"))
LOCK_FILE = os.environ.get("PATRA_LOCK_FILE", os.path.join(DATA_DIR, "patra.lock"))
ORIGIN = os.environ.get("PATRA_ALLOWED_ORIGIN", "https://radr.nxtdev.xyz")
WEBHOOK_URL = os.environ.get("PATRA_WEBHOOK_URL", "").strip()
WEBHOOK_KEY = os.environ.get("PATRA_WEBHOOK_KEY", "").strip()
MAX_CHARS = 2000
MAX_BODY = 32 * 1024
PER_MIN = int(os.environ.get("PATRA_RATE_PER_MIN", "30"))
PER_DAY = int(os.environ.get("PATRA_RATE_PER_DAY", "400"))
API_PREFIX = "/patra/api"
WIB = timezone(timedelta(hours=7))
DEPTS = ("mrp", "event", "mblp", "digital")
GROUPS = (
    "MRP-A", "MRP-B", "EVENT-A", "EVENT-B",
    "MBLP-A", "MBLP-B", "DIGITAL-A", "DIGITAL-B",
)
GROUP_RE = re.compile(r"^(MRP|EVENT|MBLP|DIGITAL)-(A|B)$")
CTRL_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")
ID_RE = re.compile(r"^[a-z0-9][a-z0-9_-]{0,63}$")

lock = threading.Lock()
accepted: list[float] = []


def now_wib() -> str:
    return datetime.now(WIB).isoformat(timespec="seconds")


def clean(text: str, limit: int = MAX_CHARS) -> str:
    return CTRL_RE.sub("", (text or "").strip())[:limit]


def group_to_dept(group: str) -> str:
    return {
        "MRP": "mrp", "EVENT": "event", "MBLP": "mblp", "DIGITAL": "digital",
    }[group.split("-", 1)[0]]


def ensure_parent(path: str) -> None:
    os.makedirs(os.path.dirname(os.path.abspath(path)) or ".", exist_ok=True)


def atomic_write(path: str, data: dict) -> None:
    ensure_parent(path)
    ensure_parent(LOCK_FILE)
    payload = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    with open(LOCK_FILE, "a+", encoding="utf-8") as lf:
        fcntl.flock(lf.fileno(), fcntl.LOCK_EX)
        try:
            fd, tmp = tempfile.mkstemp(prefix=".tmp-", dir=os.path.dirname(os.path.abspath(path)) or ".")
            try:
                with os.fdopen(fd, "w", encoding="utf-8") as out:
                    out.write(payload)
                    out.flush()
                    os.fsync(out.fileno())
                os.replace(tmp, path)
            except Exception:
                try:
                    os.unlink(tmp)
                except OSError:
                    pass
                raise
        finally:
            fcntl.flock(lf.fileno(), fcntl.LOCK_UN)


def read_json(path: str) -> dict:
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def append_log(rec: dict) -> None:
    ensure_parent(LOG)
    line = json.dumps(rec, ensure_ascii=False) + "\n"
    fd = os.open(LOG, os.O_WRONLY | os.O_APPEND | os.O_CREAT, 0o640)
    try:
        os.write(fd, line.encode("utf-8"))
        os.fsync(fd)
    finally:
        os.close(fd)


def read_log() -> dict:
    entries = {}
    try:
        with open(LOG, encoding="utf-8") as f:
            for line in f:
                try:
                    r = json.loads(line)
                except ValueError:
                    continue
                if r.get("type") == "forward_result":
                    e = entries.get(r.get("entry_id"))
                    if e:
                        e["forward_status"] = r.get("forward_status")
                        e["error"] = r.get("error")
                        e["forwarded_at"] = r.get("at")
                elif r.get("id"):
                    entries[r["id"]] = r
    except FileNotFoundError:
        pass
    return entries


def rate_ok() -> bool:
    now = time.time()
    while accepted and accepted[0] < now - 86400:
        accepted.pop(0)
    if len(accepted) >= PER_DAY:
        return False
    if sum(1 for t in accepted if t >= now - 60) >= PER_MIN:
        return False
    return True


def origin_ok(handler: BaseHTTPRequestHandler) -> bool:
    origin = handler.headers.get("Origin", "")
    referer = handler.headers.get("Referer", "")
    if ORIGIN.startswith("http://127.0.0.1") or ORIGIN.startswith("http://localhost"):
        return (
            origin.startswith("http://127.0.0.1")
            or origin.startswith("http://localhost")
            or referer.startswith("http://127.0.0.1")
            or referer.startswith("http://localhost")
            or not origin
        )
    return origin == ORIGIN or referer.startswith(ORIGIN + "/")


def forward(payload: dict) -> tuple[str, str | None]:
    if not WEBHOOK_URL or not WEBHOOK_KEY:
        return "queued", None
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        WEBHOOK_URL,
        data=body,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "X-Patra-Key": WEBHOOK_KEY,
            "User-Agent": "patra-cc/1.0",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            if 200 <= resp.status < 300:
                return "sent", None
            return "failed", f"HTTP {resp.status}"
    except urllib.error.HTTPError as e:
        return "failed", f"HTTP {e.code}"
    except Exception as e:
        return "failed", type(e).__name__


def validate_node(node: dict) -> dict | None:
    nid = clean(str(node.get("id", "")), 64).lower().replace(" ", "-")
    if not ID_RE.match(nid):
        return None
    label = clean(str(node.get("label", "")), 120)
    if not label:
        return None
    kind = clean(str(node.get("kind", "agent")), 20)
    if kind not in ("human", "agent"):
        kind = "agent"
    holder = clean(str(node.get("holder", "")), 120)
    try:
        x = int(node.get("x", 40))
        y = int(node.get("y", 40))
    except (TypeError, ValueError):
        x, y = 40, 40
    return {
        "id": nid,
        "label": label,
        "kind": kind,
        "holder": holder,
        "x": max(0, min(x, 1200)),
        "y": max(0, min(y, 800)),
    }


def validate_edge(edge: dict, node_ids: set[str]) -> dict | None:
    a = clean(str(edge.get("from", "")), 64)
    b = clean(str(edge.get("to", "")), 64)
    if a not in node_ids or b not in node_ids or a == b:
        return None
    return {"from": a, "to": b}


class Handler(BaseHTTPRequestHandler):
    server_version = "patra-cc/1.0"

    def log_message(self, fmt, *args):
        sys_stderr = __import__("sys").stderr
        sys_stderr.write("%s - %s\n" % (self.address_string(), fmt % args))

    def _json(self, code: int, obj: dict):
        raw = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(raw)

    def _read_body(self) -> dict | None:
        n = int(self.headers.get("Content-Length") or 0)
        if n <= 0 or n > MAX_BODY:
            return None
        try:
            return json.loads(self.rfile.read(n).decode("utf-8"))
        except Exception:
            return None

    def _require_api(self) -> bool:
        if self.headers.get("X-Patra-Request") != "1" and self.headers.get("X-Ops-Request") != "1":
            self._json(403, {"error": "header X-Patra-Request: 1 wajib"})
            return False
        return True

    def do_GET(self):
        if not self.path.startswith(API_PREFIX):
            self._json(404, {"error": "not found"})
            return
        if not self._require_api():
            return
        parts = urlsplit(self.path)
        path = parts.path.rstrip("/") or API_PREFIX
        qs = parse_qs(parts.query)

        if path == f"{API_PREFIX}/health":
            self._json(200, {"ok": True, "service": "patra-cc", "at": now_wib()})
            return

        if path == f"{API_PREFIX}/org":
            data = read_json(ORG_FILE)
            dept = (qs.get("dept") or [""])[0].lower()
            if dept:
                if dept not in DEPTS:
                    self._json(400, {"error": "dept tidak dikenal"})
                    return
                self._json(200, {
                    "updated": data.get("updated"),
                    "status": data.get("status", "draft"),
                    "dept": dept,
                    "graph": data["depts"][dept],
                })
                return
            self._json(200, data)
            return

        if path == f"{API_PREFIX}/sops":
            data = read_json(SOPS_FILE)
            dept = (qs.get("dept") or [""])[0].lower()
            items = data.get("items", [])
            if dept and dept != "all":
                if dept not in DEPTS:
                    self._json(400, {"error": "dept tidak dikenal"})
                    return
                items = [i for i in items if i.get("dept") in (dept, "all")]
            self._json(200, {
                "updated": data.get("updated"),
                "status": data.get("status", "draft"),
                "items": items,
            })
            return

        if path == f"{API_PREFIX}/tasks":
            data = read_json(TASKS_FILE)
            dept = (qs.get("dept") or [""])[0].lower()
            if dept:
                if dept not in DEPTS:
                    self._json(400, {"error": "dept tidak dikenal"})
                    return
                self._json(200, {"dept": dept, "task": data["depts"][dept], "updated": data.get("updated")})
                return
            self._json(200, data)
            return

        if path == f"{API_PREFIX}/schedules":
            data = read_json(SCHEDULES_FILE)
            dept = (qs.get("dept") or [""])[0].lower()
            items = data.get("items", [])
            if dept:
                if dept not in DEPTS:
                    self._json(400, {"error": "dept tidak dikenal"})
                    return
                items = [i for i in items if i.get("dept") == dept]
            self._json(200, {
                "updated": data.get("updated"),
                "note": data.get("note", ""),
                "items": items,
            })
            return

        if path == f"{API_PREFIX}/docs":
            self._json(200, read_json(DOCS_FILE))
            return

        if path == f"{API_PREFIX}/history":
            group = (qs.get("group") or [""])[0].upper()
            entries = list(read_log().values())
            if group:
                if not GROUP_RE.match(group):
                    self._json(400, {"error": "kode grup tidak dikenal"})
                    return
                entries = [e for e in entries if e.get("group") == group]
            entries.sort(key=lambda e: e.get("submitted_at", ""), reverse=True)
            self._json(200, {"items": entries[:200], "total": len(entries)})
            return

        self._json(404, {"error": "not found"})

    def do_POST(self):
        if not self.path.startswith(API_PREFIX):
            self._json(404, {"error": "not found"})
            return
        if not self._require_api():
            return
        if not origin_ok(self):
            self._json(403, {"error": "origin ditolak"})
            return
        parts = urlsplit(self.path)
        path = parts.path.rstrip("/")
        body = self._read_body()
        if body is None:
            self._json(400, {"error": "body JSON tidak valid"})
            return

        with lock:
            if not rate_ok():
                self._json(429, {"error": "batas kirim tercapai"})
                return

            if path == f"{API_PREFIX}/org":
                self._handle_org(body)
                return
            if path == f"{API_PREFIX}/sops":
                self._handle_sops(body)
                return
            if path == f"{API_PREFIX}/schedules":
                self._handle_schedules(body)
                return
            if path == f"{API_PREFIX}/respond":
                self._handle_respond(body)
                return

        self._json(404, {"error": "not found"})

    def _handle_org(self, body: dict):
        action = clean(str(body.get("action", "")), 40)
        dept = clean(str(body.get("dept", "")), 20).lower()
        if dept not in DEPTS:
            self._json(400, {"error": "dept wajib: mrp|event|mblp|digital"})
            return
        data = read_json(ORG_FILE)
        graph = data["depts"][dept]

        if action == "save_graph":
            nodes_in = body.get("nodes") or []
            edges_in = body.get("edges") or []
            if not isinstance(nodes_in, list) or not isinstance(edges_in, list):
                self._json(400, {"error": "nodes dan edges harus array"})
                return
            nodes = []
            for n in nodes_in[:40]:
                vn = validate_node(n)
                if vn:
                    nodes.append(vn)
            ids = {n["id"] for n in nodes}
            edges = []
            for e in edges_in[:80]:
                ve = validate_edge(e, ids)
                if ve:
                    edges.append(ve)
            graph["nodes"] = nodes
            graph["edges"] = edges
            data["updated"] = now_wib()
            data["status"] = "draft"
            atomic_write(ORG_FILE, data)
            self._json(200, {"ok": True, "dept": dept, "graph": graph, "status": "draft"})
            return

        if action == "create_node":
            node = validate_node(body.get("node") or body)
            if not node:
                self._json(400, {"error": "node tidak valid"})
                return
            if any(n["id"] == node["id"] for n in graph["nodes"]):
                self._json(409, {"error": "id node sudah ada"})
                return
            graph["nodes"].append(node)
            data["updated"] = now_wib()
            data["status"] = "draft"
            atomic_write(ORG_FILE, data)
            self._json(200, {"ok": True, "node": node, "status": "draft"})
            return

        if action == "update_node":
            node = validate_node(body.get("node") or body)
            if not node:
                self._json(400, {"error": "node tidak valid"})
                return
            found = False
            for i, n in enumerate(graph["nodes"]):
                if n["id"] == node["id"]:
                    graph["nodes"][i] = node
                    found = True
                    break
            if not found:
                self._json(404, {"error": "node tidak ditemukan"})
                return
            data["updated"] = now_wib()
            data["status"] = "draft"
            atomic_write(ORG_FILE, data)
            self._json(200, {"ok": True, "node": node, "status": "draft"})
            return

        if action == "delete_node":
            nid = clean(str(body.get("id", "")), 64)
            before = len(graph["nodes"])
            graph["nodes"] = [n for n in graph["nodes"] if n["id"] != nid]
            graph["edges"] = [e for e in graph["edges"] if e["from"] != nid and e["to"] != nid]
            if len(graph["nodes"]) == before:
                self._json(404, {"error": "node tidak ditemukan"})
                return
            data["updated"] = now_wib()
            data["status"] = "draft"
            atomic_write(ORG_FILE, data)
            self._json(200, {"ok": True, "deleted": nid, "status": "draft"})
            return

        self._json(400, {"error": "action org: save_graph|create_node|update_node|delete_node"})

    def _handle_sops(self, body: dict):
        action = clean(str(body.get("action", "")), 40)
        data = read_json(SOPS_FILE)
        items = data.setdefault("items", [])

        if action == "create":
            title = clean(str(body.get("title", "")), 200)
            dept = clean(str(body.get("dept", "")), 20).lower()
            if not title or dept not in DEPTS + ("all",):
                self._json(400, {"error": "title dan dept wajib"})
                return
            item = {
                "id": clean(str(body.get("id") or f"sop-{uuid.uuid4().hex[:8]}"), 64),
                "dept": dept,
                "title": title,
                "source_path": clean(str(body.get("source_path", "")), 400),
                "summary": clean(str(body.get("summary", "")), 800),
                "steps": clean(str(body.get("steps", "")), 1200),
            }
            if any(i["id"] == item["id"] for i in items):
                self._json(409, {"error": "id sudah ada"})
                return
            items.append(item)
            data["updated"] = now_wib()
            data["status"] = "draft"
            atomic_write(SOPS_FILE, data)
            self._json(200, {"ok": True, "item": item, "status": "draft"})
            return

        if action == "update":
            sid = clean(str(body.get("id", "")), 64)
            for i, item in enumerate(items):
                if item["id"] != sid:
                    continue
                if "title" in body:
                    item["title"] = clean(str(body["title"]), 200) or item["title"]
                if "summary" in body:
                    item["summary"] = clean(str(body["summary"]), 800)
                if "steps" in body:
                    item["steps"] = clean(str(body["steps"]), 1200)
                if "source_path" in body:
                    item["source_path"] = clean(str(body["source_path"]), 400)
                if "dept" in body:
                    dept = clean(str(body["dept"]), 20).lower()
                    if dept in DEPTS + ("all",):
                        item["dept"] = dept
                items[i] = item
                data["updated"] = now_wib()
                data["status"] = "draft"
                atomic_write(SOPS_FILE, data)
                self._json(200, {"ok": True, "item": item, "status": "draft"})
                return
            self._json(404, {"error": "sop tidak ditemukan"})
            return

        if action == "delete":
            sid = clean(str(body.get("id", "")), 64)
            before = len(items)
            data["items"] = [i for i in items if i["id"] != sid]
            if len(data["items"]) == before:
                self._json(404, {"error": "sop tidak ditemukan"})
                return
            data["updated"] = now_wib()
            data["status"] = "draft"
            atomic_write(SOPS_FILE, data)
            self._json(200, {"ok": True, "deleted": sid, "status": "draft"})
            return

        self._json(400, {"error": "action sop: create|update|delete"})

    def _handle_schedules(self, body: dict):
        action = clean(str(body.get("action", "")), 40)
        data = read_json(SCHEDULES_FILE)
        items = data.setdefault("items", [])

        if action == "create":
            dept = clean(str(body.get("dept", "")), 20).lower()
            time_s = clean(str(body.get("time", "")), 40)
            days = clean(str(body.get("days", "")), 80)
            routine = clean(str(body.get("routine", "")), 400)
            owner = clean(str(body.get("owner", "")), 120)
            status = clean(str(body.get("status", "Aktif")), 20)
            if status not in ("Aktif", "Dijeda"):
                status = "Aktif"
            if dept not in DEPTS or not time_s or not days or not routine or not owner:
                self._json(400, {"error": "time, days, routine, owner, dept wajib"})
                return
            item = {
                "id": clean(str(body.get("id") or f"sch-{uuid.uuid4().hex[:8]}"), 64),
                "time": time_s,
                "days": days,
                "routine": routine,
                "owner": owner,
                "dept": dept,
                "status": status,
            }
            if any(i["id"] == item["id"] for i in items):
                self._json(409, {"error": "id sudah ada"})
                return
            items.append(item)
            data["updated"] = now_wib()
            atomic_write(SCHEDULES_FILE, data)
            self._json(200, {"ok": True, "item": item, "status": "draft"})
            return

        if action == "update":
            sid = clean(str(body.get("id", "")), 64)
            for i, item in enumerate(items):
                if item["id"] != sid:
                    continue
                if "time" in body:
                    item["time"] = clean(str(body["time"]), 40) or item["time"]
                if "days" in body:
                    item["days"] = clean(str(body["days"]), 80) or item["days"]
                if "routine" in body:
                    item["routine"] = clean(str(body["routine"]), 400) or item["routine"]
                if "owner" in body:
                    item["owner"] = clean(str(body["owner"]), 120) or item["owner"]
                if "dept" in body:
                    dept = clean(str(body["dept"]), 20).lower()
                    if dept in DEPTS:
                        item["dept"] = dept
                if "status" in body:
                    status = clean(str(body["status"]), 20)
                    item["status"] = status if status in ("Aktif", "Dijeda") else item["status"]
                items[i] = item
                data["updated"] = now_wib()
                atomic_write(SCHEDULES_FILE, data)
                self._json(200, {"ok": True, "item": item, "status": "draft"})
                return
            self._json(404, {"error": "jadwal tidak ditemukan"})
            return

        if action == "delete":
            sid = clean(str(body.get("id", "")), 64)
            before = len(items)
            data["items"] = [i for i in items if i["id"] != sid]
            if len(data["items"]) == before:
                self._json(404, {"error": "jadwal tidak ditemukan"})
                return
            data["updated"] = now_wib()
            atomic_write(SCHEDULES_FILE, data)
            self._json(200, {"ok": True, "deleted": sid, "status": "draft"})
            return

        self._json(400, {"error": "action jadwal: create|update|delete"})

    def _handle_respond(self, body: dict):
        group = clean(str(body.get("group", "")), 20).upper()
        if not GROUP_RE.match(group):
            self._json(400, {"error": "group wajib, mis. MRP-A"})
            return
        kind = clean(str(body.get("type", "feedback")), 20)
        if kind not in ("feedback", "org"):
            self._json(400, {"error": "type: feedback|org"})
            return
        note = clean(str(body.get("note", "")), MAX_CHARS)
        if not note:
            self._json(400, {"error": "note wajib"})
            return
        eid = str(uuid.uuid4())
        entry = {
            "id": eid,
            "type": kind,
            "group": group,
            "dept": group_to_dept(group),
            "recipient": group,
            "note": note,
            "submitted_at": now_wib(),
            "forward_status": "queued" if not WEBHOOK_URL else "pending",
        }
        append_log(entry)
        accepted.append(time.time())
        status, err = forward({
            "id": eid,
            "type": kind,
            "group": group,
            "dept": entry["dept"],
            "note": note,
            "submitted_at": entry["submitted_at"],
            "source": "patra-command-center",
        })
        append_log({
            "type": "forward_result",
            "entry_id": eid,
            "forward_status": status,
            "error": err,
            "at": now_wib(),
        })
        entry["forward_status"] = status
        if err:
            entry["error"] = err
        self._json(200, {"ok": True, "entry": entry})


def main():
    ensure_parent(LOG)
    ensure_parent(LOCK_FILE)
    for path in (ORG_FILE, SOPS_FILE, TASKS_FILE, SCHEDULES_FILE, DOCS_FILE):
        if not os.path.isfile(path):
            raise SystemExit(f"missing data file: {path}")
    httpd = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"patra-cc on http://{HOST}:{PORT}{API_PREFIX}/", flush=True)
    httpd.serve_forever()


if __name__ == "__main__":
    main()
