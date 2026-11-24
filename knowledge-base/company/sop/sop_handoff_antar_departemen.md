---
dept: company
status: approved
owner: fasilitator
date: 2026-11-27
tags: [sop, handoff]
---

# SOP handoff antar departemen

**Tujuan.** Memindahkan pekerjaan antar CoS tanpa menyalin data mentah.

**Pemicu.** Ada temuan, draf, atau permintaan yang dibutuhkan departemen lain.

**Pelaku.** Hanya Chief of Staff. Spesialis tidak membuat file handoff.

**Langkah.**

1. Tulis file `knowledge-base/handoffs/YYYY-MM-DD_<dari>_to_<ke>_<topik>.md`.
2. Isi: pengirim, penerima, ringkasan, tautan ke draf atau id baris bukti, aksi yang diminta, status `pending_approval` atau `draft`.
3. Wikilink ke [[company/orgstructure]], SOP yang relevan, dan file lawan.
4. Penerima hanya membaca. Ia membalas dengan file handoff baru, bukan dengan mengedit file pengirim.
5. Setelah manusia menyetujui, CoS penerima menautkan [[decisions/...]] dan mengubah status salinan kerjanya menjadi `approved`.

**Selesai bila.** Ada pengirim, penerima, bukti, aksi, dan tautan. Tidak ada data pribadi di dalam handoff.
