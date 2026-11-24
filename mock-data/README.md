# Mock data (fiktif)

Struktur mengikuti pekerjaan nyata MRP, Event, MBLP, dan Digital. Angka, harga, kompetitor, dan responden **fiktif**. Lihat [RESEARCH_NOTES.md](RESEARCH_NOTES.md).

Generate ulang: `python3 mock-data/generate/generate_mock.py` (seed 42).

| Folder | Isi utama | Perkiraan baris |
| --- | --- | --- |
| `mrp/` | Harga kompetitor harian, conjoint, CSAT/loyalty MyPertamina, evaluasi offline SPBU, price book | 20k+ / 5k / 8k / 3k |
| `event/` | Seed calendar event nasional, kliping media | 5 / 3k |
| `mblp/` | Riwayat konten 5 akun, komentar komunitas, partner loyalty | 5k / 20k / 120 |
| `digital/` | Performa sosial harian, inventori homeless media, riwayat WA blast | 450 / 400 / 60 |

File `*_sample100.csv` untuk iterasi cepat. `solutions/traps.md` hanya fasilitator.
