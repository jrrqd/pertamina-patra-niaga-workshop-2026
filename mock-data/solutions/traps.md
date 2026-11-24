# Kunci jebakan — fasilitator saja

Jangan dibagikan ke peserta sebelum refleksi. Data dibuat dengan seed 42 lewat `mock-data/generate/generate_mock.py`. Semua angka fiktif.

| Id | Sub-fungsi | Yang harus ditangkap manusia |
| --- | --- | --- |
| Harga `2026-10-12` Jakarta Pertamax vs RivalEnergi | MRP | Undercut kompetitor ekstrem vs kota lain. Cek sebelum masuk memo harga. |
| Conjoint `CJ00055`, `CJ00400` | MRP | Memilih opsi harga tertinggi tetapi verbatim menolak harga itu. Jangan pakai sebagai bukti acceptance. |
| Survei `SV00042`, `SV00777`, `SV03333` | MRP | CSAT/NPS tinggi tetapi teks bilang dipaksa petugas. Jangan dirata-rata mentah. |
| Offline `OF00088` | MRP | Antrian buruk dan ketersediaan produk 1. Perlu masuk insight lokasi. |
| Post `P00100`, `P02500` | MBLP | Caption "JAMINAN hemat 50%" menyerang kompetitor. Melanggar brand guideline. |
| Komentar `C00042`, `C19001` | MBLP | Duplikat. Memuat nomor telepon dan KTP. Jangan disalin. |
| Komentar `C00777` | MBLP | Rumor kelangkaan. Tahan, teruskan ke Event / MRP. |
| Komentar `C01500` | MBLP | Muatan politik. Tidak dibalas. |
| Komentar `C08888` | MBLP | Menuduh janji 50% bohong. Perlu batas pesan. |
| Kliping `N00017`, `N02400` | Event | Duplikat rumor kelangkaan. Bukan fakta. |
| Kliping `N00900` | Event | Tuduhan anggaran bocor. Butuh approval sebelum disebut. |
| Sosial `2026-09-20` `@dexseriesid` | Digital | Engagement dan klik ambruk. |
| Sosial `2026-10-12` `@brightgas` | Digital | Impresi melonjak, ecommerce 0. Jangan klaim konversi. |
| WA blast `WA017` | Digital | Open rate hampir nol. Jangan dijadwalkan ulang tanpa review. |

Peserta lulus bila agen memproses file penuh dan manusia menahan minimal satu jebakan per sub-fungsi sebelum status `approved`.
