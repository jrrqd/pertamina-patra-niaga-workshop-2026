# Workshop 27 Nov 2026 — Organisasi Agentic AI untuk Marketing

Hands-on 2,5 jam untuk Fungsi Marketing Pertamina Patra Niaga. Empat sub-fungsi asli memakai Cursor berbayar (grokbot). MRP memelihara knowledge base dan command center. Event mengorkestrasi campaign calendar. MBLP menjalankan jalur kreatif. Digital menjadwalkan content bank ke homeless media.

Semua data fiktif. Tidak ada publikasi, belanja, aktivasi, atau setting harga sungguhan.

## Rundown

| Waktu | Blok | Kegiatan |
| --- | --- | --- |
| 00:00–00:30 | Paparan | Organisasi agen, aturan main, brief kampanye B2C retail fiktif |
| 00:30–00:45 | Setup | Cursor, repo, `prompts/00_kickoff.md` |
| 00:45–01:15 | Sesi 1 | MRP mengisi KB. Event calendar. MBLP sampai draf. Digital homeless media |
| 01:15–01:25 | Jeda | Cek progres |
| 01:25–02:05 | Sesi 2 | Event orkestrasi. MBLP sampai approval. Digital brief + content bank |
| 02:05–02:25 | Sesi 3 | Ujung ke ujung. CoS tunjukkan file. MRP perbarui KB, command center, weekly report |
| 02:25–02:30 | Tutup | Apa yang didelegasikan vs keputusan manusia |

## Empat sub-fungsi

Peserta: `knowledge-base/company/roster.md`.

| Sub-fungsi | Approver | Peran agen |
| --- | --- | --- |
| Market Research & Pricing | Antonny Fayen Budiman | KB, command center, weekly report |
| Event Management | Endo Eko Satryo | Campaign calendar offline/online |
| Marketing, Brand & Loyalty | Kania Hapsari | Planning → draft → creative → approval → content bank |
| Digital Marketing | Fachrizal Imaduddin | Homeless media, brief ke MBLP, jadwal tayang |

Heppy Wulansari menyetujui output lintas fungsi. Hanya CoS MRP yang menulis KB bersama dan command center. Sub-fungsi lain mengirim `knowledge-base/status-reports/`.

## Isi repo

- `knowledge-base/` — fakta, command center, drafts, status-reports, reports
- `prompts/` — teks siap tempel
- `mock-data/mrp|event|mblp|digital/` — data besar + sample100
- `mock-data/RESEARCH_NOTES.md` — pola publik yang membentuk struktur data
- `mock-data/solutions/traps.md` — kunci fasilitator
- `AGENTS.md` dan `.cursor/rules/`

## Menjalankan

1. Clone repo dari **Cursor Origin** (bukan GitHub). Lihat `ORIGIN.md`.
2. Buka Live App paparan/brief (`slides/README.md`) → salin prompt.
3. Tempel `prompts/00_kickoff.md`, lalu prompt sub-fungsi / `prompts/slides/`.
4. Iterasi dengan `*_sample100.csv`, lalu file penuh.
5. Baca command center kapan saja. Jangan diedit kecuali CoS MRP.

Generate ulang data: `python3 mock-data/generate/generate_mock.py`

## Paparan

Cursor Live App di `presentation-app/` (bukan Canva, bukan GitHub). Publish lewat cloud agent — lihat `slides/README.md`.
