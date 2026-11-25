# Workshop 27 Nov 2026 — Organisasi Agentic AI untuk Marketing

Hands-on 2,5 jam untuk Fungsi Marketing Pertamina Patra Niaga.  
**Pembicara:** Rizki Suluh Adi

Empat sub-fungsi asli memakai satu akun yang sudah masuk. Peserta hanya berbicara dengan Chief of Staff. Spesialis sudah disiapkan. MRP menjaga data bersama dan papan status. Event mengatur kalender kampanye. MBLP menjalankan jalur kreatif. Digital menyusun jadwal tayang.

Semua data fiktif. Tidak ada publikasi, belanja, aktivasi, atau perubahan harga sungguhan.

## Rundown (150 menit, dua sesi)

| Waktu | Kegiatan |
| --- | --- |
| 00–25 | Paparan: promo jebakan, tim bot pembicara, tiga aturan rumah |
| 25–35 | Setup: akun sudah masuk, kartu tempel ke Chief of Staff |
| 35–70 | Sesi 1: brief ke Chief of Staff, persetujuan pertama |
| 70–80 | Jeda |
| 80–130 | Sesi 2: sekitar empat langkah, satu jebakan di tiap langkah |
| 130–145 | Laporan mingguan MRP, ringkasan satu halaman dan log persetujuan tiap manajer |
| 145–150 | Refleksi: tiap manajer menyebut satu tugas nyata yang ingin dicoba |

Silabus lengkap dan cara penilaian: `SILABUS.md`.

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
- `prompts/` — peran spesialis (sudah disiapkan) dan kartu tempel bernomor di `prompts/slides/`
- `mock-data/mrp|event|mblp|digital/` — data latihan + cuplikan pendek
- `mock-data/solutions/traps.md` — kunci dan daftar periksa juri
- `slides/` — kerangka paparan 25 menit dan brief sub-fungsi
- `presentation-app/` — layar paparan, brief, dan ringkasan akhir
- `AGENTS.md` — aturan untuk semua bot
- `_arsip-lama/` — rencana lama 24 Nov, jangan dipakai sebagai acuan

## Cara kerja peserta

1. Akun sudah masuk. Buka Chief of Staff kelompok Anda.
2. Tempel kartu 0 (`prompts/00_kickoff.md`), lalu kartu Sesi 1 dan Sesi 2 di `prompts/slides/`.
3. Manajer memberi persetujuan pertama di Sesi 1, lalu persetujuan berikutnya di Sesi 2. Catat di log persetujuan.
4. Jangan anggap materi selesai atau tayang sebelum manusia setuju.
5. VP Heppy menyetujui satu kali bila hasilnya lintas fungsi.

Generate ulang data latihan: `python3 mock-data/generate/generate_mock.py`
