# Deploy Patra command center ke radr

**Jangan jalankan tanpa persetujuan Rizki.** Jangan menyentuh `/ops/` atau `ops-responses`.

URL: `https://radr.nxtdev.xyz/patra/`  
Port backend: `3072` (bukan 3071)

## Siapkan di VPS (sekali)

```bash
# dari laptop, setelah Rizki bilang ya — di luar jendela blokir ops-dashboard
ssh radr.nxtdev.xyz 'sudo mkdir -p /var/www/patra-cc /opt/patra-cc /etc/patra-cc /var/lib/patra-cc'
```

1. Salin `site/` → `/var/www/patra-cc/` (index, app.js, app.css, assets/, data/).
2. Salin `backend/patra_cc.py` → `/opt/patra-cc/patra_cc.py`.
3. Salin `deploy/patra-cc.service` → `/etc/systemd/system/patra-cc.service`.
4. Salin `deploy/patra-cc.conf` ke `/etc/nginx/snippets/patra-cc.conf` dan `include` dari situs osnai.
5. Buat htpasswd workshop: `/etc/nginx/patra-cc.htpasswd` (satu user bersama).
6. Opsional webhook Grokbot: `/etc/patra-cc/forward.env` dengan `PATRA_WEBHOOK_URL` dan `PATRA_WEBHOOK_KEY`.
7. `sudo systemctl daemon-reload && sudo systemctl enable --now patra-cc`
8. `sudo nginx -t && sudo systemctl reload nginx` (jangan restart nginx).

## Cek

```bash
ssh radr.nxtdev.xyz 'curl -fsS -H "X-Patra-Request: 1" http://127.0.0.1:3072/patra/api/health'
```

## Rollback

Hapus include nginx `/patra/`, stop `patra-cc`, biarkan `/ops/` utuh.
