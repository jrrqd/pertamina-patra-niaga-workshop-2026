#!/usr/bin/env bash
# Push Patra command center to radr. Does NOTHING unless PATRA_DEPLOY_YES=1.
# Never touches /ops/ or ops-responses.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${PATRA_HOST:-radr.nxtdev.xyz}"

if [[ "${PATRA_DEPLOY_YES:-}" != "1" ]]; then
  echo "Ditolak: set PATRA_DEPLOY_YES=1 setelah Rizki menyetujui deploy."
  echo "Contoh: PATRA_DEPLOY_YES=1 ./deploy/push-patra.sh"
  exit 2
fi

echo "Sync site + data → $HOST:/var/www/patra-cc/"
rsync -az --delete \
  --exclude 'responses.jsonl' --exclude 'patra.lock' --exclude '.DS_Store' \
  "$ROOT/site/" "$HOST:/tmp/patra-cc-site/"
rsync -az "$ROOT/backend/patra_cc.py" "$HOST:/tmp/patra_cc.py"
rsync -az "$ROOT/deploy/patra-cc.service" "$HOST:/tmp/patra-cc.service"
rsync -az "$ROOT/deploy/patra-cc.conf" "$HOST:/tmp/patra-cc.conf"

ssh -o BatchMode=yes "$HOST" 'bash -s' <<'REMOTE'
set -euo pipefail
sudo mkdir -p /var/www/patra-cc /opt/patra-cc /etc/patra-cc /var/lib/patra-cc
sudo rsync -a --delete /tmp/patra-cc-site/ /var/www/patra-cc/
sudo install -m 0644 /tmp/patra_cc.py /opt/patra-cc/patra_cc.py
sudo install -m 0644 /tmp/patra-cc.service /etc/systemd/system/patra-cc.service
sudo install -m 0644 /tmp/patra-cc.conf /etc/nginx/snippets/patra-cc.conf
sudo chown -R www-data:www-data /var/www/patra-cc/data || true
sudo systemctl daemon-reload
sudo systemctl enable patra-cc
sudo systemctl restart patra-cc
sudo nginx -t
sudo systemctl reload nginx
curl -fsS -H "X-Patra-Request: 1" http://127.0.0.1:3072/patra/api/health
echo
echo "OK — pastikan osnai include snippets/patra-cc.conf dan htpasswd ada."
REMOTE
