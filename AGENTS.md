# Aturan untuk semua grokbot

Repo ini adalah latihan workshop. Data di `mock-data/` fiktif. Jangan meminta atau menyimpan data internal perusahaan. Tidak ada publikasi, belanja, aktivasi, atau setting harga sungguhan.

## Peran organisasi

- Tiap sub-fungsi (MRP, EVM, MBLP, DGM) punya satu Chief of Staff (CoS) dan beberapa spesialis. Nama approver ada di `knowledge-base/company/roster.md`.
- **MRP** adalah satu-satunya penulis `knowledge-base/` bersama dan `knowledge-base/command-center.md`.
- **Event** menulis campaign calendar di foldernya, lalu mengirim laporan status ke MRP.
- **MBLP** menulis tahap kreatif di foldernya, lalu mengirim laporan status ke MRP.
- **Digital** menulis rencana homeless media dan jadwal tayang di foldernya, lalu mengirim laporan status ke MRP.
- Spesialis tidak mengirim pesan ke sub-fungsi lain. CoS berbicara lewat handoff dan laporan status.

## Sinkron sebelum dan sesudah kerja

1. Baca `knowledge-base/` dan `knowledge-base/command-center.md`.
2. Hentikan kerja yang bertentangan dengan fakta berstatus `approved`. Tanyakan ke MRP.
3. Kerjakan draf hanya di `knowledge-base/<dept>/drafts/` sub-fungsi Anda.
4. Kirim laporan pekerjaan ke MRP di `knowledge-base/handoffs/` atau `knowledge-base/status-reports/`. Jangan mengedit command center sendiri.
5. Baca ulang command center sebelum langkah berikutnya.

## Knowledge base dan command center

- Fakta bersama hanya file di `knowledge-base/` dengan `status: approved`.
- Draf, data mentah, dan opini agen bukan fakta.
- Setiap file markdown baru memakai frontmatter:

```yaml
---
dept: mblp | evm | dgm | mrp | company
status: draft | pending_approval | approved
owner: nama-agen-atau-manusia
date: YYYY-MM-DD
tags: []
---
```

- Sebut path file sumber. Wikilink tidak wajib.
- Jangan menyalin isi SOP. Tulis path SOP yang relevan.
- Laporan mingguan ditulis MRP di `knowledge-base/reports/weekly-YYYY-MM-DD.md` dan disetujui Antonny Fayen Budiman sebelum dibagikan.

## Human in the loop

Berhenti dan minta manusia sebelum:

- memasukkan fakta ke KB atau mengubah status menjadi `approved`
- merilis caption, naskah, atau materi creative ke content bank
- mengubah campaign calendar yang sudah disetujui
- menjadwalkan atau mengunggah konten
- mengusulkan setting harga jual
- menyatakan angka sebagai fakta bila sumber saling bertentangan
- membalas atau mengutip data pribadi, isu politik, atau tuduhan hukum

Catat keputusan manusia di `knowledge-base/decisions/` dengan nama penyetuju. Agen tidak boleh mengubah status menjadi `approved` sendiri.

## Cara kerja data

- Iterasi pertama: file `*_sample100.csv`.
- Heavy lifting: file CSV penuh di `mock-data/`.
- Jangan memuat seluruh CSV ke dalam KB. Tulis ringkasan, metrik, dan id baris yang jadi bukti.
- Jangan baca `mock-data/solutions/`. Itu kunci fasilitator.
- Sumber eksternal di latihan adalah paket fiktif di `mock-data/`, bukan pengambilan langsung dari sistem luar.

## Bahasa

Bahasa Indonesia, kalimat pendek, sebut sumber berupa path file dan id baris.
