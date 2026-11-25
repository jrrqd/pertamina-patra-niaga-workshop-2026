# Command Center · Pertamina Patra Niaga

Command center browser untuk workshop 27 Nov 2026. Didaut dari pola [ops-dashboard](../../2026%20ops-dashboard/) di VPS radr, **tanpa** mengubah `https://radr.nxtdev.xyz/ops/`.

Peserta memakai browser (tanpa instal Cursor di laptop kantor):

- Pilih kode grup (MRP-A … DIGITAL-B)
- Lihat tugas per sub-fungsi
- CRUD struktur organisasi (canvas + prompt ke Chief of Staff)
- CRUD SOP draf (path sumber tetap; hapus tidak menyentuh file KB)
- Kirim masukan ke agen (antrean per grup; pintu yang sama dari app Grokbot)

Logo: `site/assets/pertamina-patra-niaga.webp` (asli, lihat ATTRIBUTION.md).

## Preview lokal

```bash
cd command-center
PATRA_PORT=3972 PATRA_ALLOWED_ORIGIN=http://127.0.0.1:8766 \
  PATRA_DATA_DIR="$PWD/data" PATRA_LOG_FILE="$PWD/data/responses.jsonl" \
  python3 backend/patra_cc.py &
python3 tools/preview_server.py
# buka http://127.0.0.1:8766/patra/
```

## Uji

```bash
python3 backend/tests/test_patra_cc.py
```

## Deploy

Lihat [deploy/DEPLOY.md](deploy/DEPLOY.md). Hanya setelah persetujuan Rizki. Path produksi: `/patra/`, port `3072`.
