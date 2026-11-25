#!/usr/bin/env python3
"""Local preview: serves site/ at /patra/ and proxies /patra/api/ to the backend.

Backend:
  PATRA_PORT=3972 PATRA_ALLOWED_ORIGIN=http://127.0.0.1:8766 \\
  PATRA_DATA_DIR=data PATRA_LOG_FILE=data/responses.jsonl \\
  python3 backend/patra_cc.py

Then:
  python3 tools/preview_server.py
  open http://127.0.0.1:8766/patra/
"""
import functools
import http.server
import os
import urllib.error
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "site"))
CSP = (
    "default-src 'none'; script-src 'self'; style-src 'self'; "
    "img-src 'self' data:; connect-src 'self'; font-src 'self'; "
    "base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
)
BACK = os.environ.get("PATRA_PREVIEW_BACK", "http://127.0.0.1:3972")
PORT = int(os.environ.get("PATRA_PREVIEW_PORT", "8766"))


class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Content-Security-Policy", CSP)
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def translate_path(self, path):
        if path.startswith("/patra/"):
            path = path[len("/patra/"):] or "/"
        return super().translate_path(path)

    def proxy(self):
        n = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(n) if n else None
        hdr = {
            k: v for k, v in self.headers.items()
            if k.lower() in ("origin", "referer", "content-type", "x-patra-request", "x-ops-request")
        }
        req = urllib.request.Request(BACK + self.path, data=body, method=self.command, headers=hdr)
        try:
            r = urllib.request.urlopen(req, timeout=20)
            code, data = r.status, r.read()
        except urllib.error.HTTPError as e:
            code, data = e.code, e.read()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path.startswith("/patra/api/"):
            return self.proxy()
        if self.path in ("/patra", "/patra/"):
            self.path = "/patra/index.html"
        return super().do_GET()

    def do_POST(self):
        if self.path.startswith("/patra/api/"):
            return self.proxy()
        self.send_error(405)


if __name__ == "__main__":
    http.server.ThreadingHTTPServer(
        ("127.0.0.1", PORT),
        functools.partial(H, directory=ROOT),
    ).serve_forever()
