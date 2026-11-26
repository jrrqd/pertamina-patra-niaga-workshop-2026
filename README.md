# Workshop 27 Nov 2026 — Organisasi Agentic AI untuk Marketing

Hands-on 150 menit untuk Fungsi Marketing Pertamina Patra Niaga. Jumat, 27 November 2026.  
**Pembicara:** Rizki Suluh Adi dan Dwika Putra.

Delapan grup, dua per subfungsi (A dan B), soal dan data yang sama. Peserta hanya berbicara dengan Chief of Staff. Data latihan fiktif. Tidak ada publikasi, belanja, atau perubahan harga sungguhan.

- Slide materi (rev8): https://docs.google.com/presentation/d/12aWtL3TZFSdtq8syDsEciFU4vO8d_LDj1pK0KY_fbSE/edit
- Template Command Center: https://github.com/jrrqd/grokbot-command-center
- Silabus ringkas: `SILABUS.md`. Kartu peserta: `rev6-kartu/`.

## Rundown (silabus v9)

| Menit | Kegiatan |
| --- | --- |
| 00–10 | Pembukaan |
| 10–20 | Dwika: kenapa dan kapan perlu AI |
| 20–30 | Rizki: alat, vibecoding, demo live-build |
| 30–40 | Setup Cursor Web dan Kartu 0 |
| 40–80 | Sesi 1: petakan, pecah, pilih, house rules |
| 80–90 | Jeda |
| 90–130 | Sesi 2: temuan menit 90, 100, 110, 120 |
| 130–150 | Presentasi dan refleksi, dipandu Ibu Heppy |

Tidak ada sesi laporan terpisah dan tidak ada pemilihan pilot. Skor: +1 temuan ditahan, −1 lolos, 0 tidak tersentuh. Pemenang per pasangan.

## Contoh soal

| Subfungsi | Approver | Hasil |
| --- | --- | --- |
| MRP | Antonny Fayen Budiman | Analisis data latihan, bukan memo harga |
| Event | Endo Eko Satryo | Ide dan rencana penyelenggaraan, tanpa holding |
| MBLP | Kania Hapsari | Brief dan campaign plan |
| Digital | Fachrizal Imaduddin | Paket konten, kalender, sortir 50 profil fiktif (minimal 1000 follower) |

## Tiga aturan rumah

1. Satu bot, satu tugas.
2. Satu pintu masuk (Chief of Staff).
3. Tidak ada yang keluar tanpa persetujuan manusia.

## Empat sub-fungsi

Peserta: `knowledge-base/company/roster.md`.

| Sub-fungsi | Approver | Peran |
| --- | --- | --- |
| Market Research & Pricing | Antonny Fayen Budiman | Data bersama, papan status, laporan mingguan |
| Event Management | Endo Eko Satryo | Kalender kampanye luring/daring |
| Marketing, Brand & Loyalty | Kania Hapsari | Perencanaan → draf → kreatif → persetujuan → materi final |
| Digital Marketing | Fachrizal Imaduddin | Media yang tersedia, brief ke MBLP, jadwal tayang |

Heppy Wulansari menyetujui **satu kali** untuk output lintas fungsi. Hanya Chief of Staff MRP yang menulis data bersama dan papan status. Sub-fungsi lain mengirim `knowledge-base/status-reports/`.

## Isi folder

- `knowledge-base/` — fakta, papan status, draf, laporan status, laporan mingguan
- `prompts/` — peran spesialis
- `rev6-kartu/` — kartu yang ditempel peserta
- `mock-data/mrp|event|mblp|digital/` — data latihan + cuplikan pendek
- `mock-data/digital/influencer-screens/` — 50 profil Instagram fiktif untuk soal Digital
- `AGENTS.md` — aturan untuk semua bot

## Cara kerja peserta

1. Akun sudah masuk. Buka Chief of Staff kelompok Anda.
2. Tempel Kartu 0, lalu kartu Sesi 1 dan Sesi 2 dari `rev6-kartu/kartu/`.
3. Manajer memberi persetujuan pertama di Sesi 1, lalu persetujuan berikutnya di Sesi 2. Catat di log persetujuan.
4. Jangan anggap materi selesai atau tayang sebelum manusia setuju.
5. VP Heppy menyetujui satu kali bila hasilnya lintas fungsi.

Generate ulang data latihan: `python3 mock-data/generate/generate_mock.py`
