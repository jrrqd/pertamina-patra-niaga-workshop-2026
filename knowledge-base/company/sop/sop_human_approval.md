---
dept: company
status: approved
owner: fasilitator
date: 2026-11-27
tags: [sop, approval]
---

# SOP persetujuan manusia

**Tujuan.** Agen mengangkat beban olah data. Manusia tetap bertanggung jawab atas yang keluar.

**Wajib approval manusia.**

- Caption, balasan publik, press release, holding statement
- Perubahan anggaran, jeda, atau pematian kampanye
- Angka yang masuk laporan eksekutif
- Apa pun yang menyentuh data pribadi, politik, atau tuduhan

**Langkah.**

1. CoS set status `pending_approval` dan sebut apa yang harus dicek manusia.
2. Manusia menulis `knowledge-base/decisions/YYYY-MM-DD_<dept>_<topik>.md` dengan frontmatter `status: approved` atau tetap menolak dalam isi file.
3. Isi keputusan: nama approver, objek yang diputuskan (wikilink), setuju atau tolak, alasan satu kalimat.
4. Agen tidak mengisi nama approver sendiri dan tidak mengubah status menjadi `approved` sebelum file keputusan ada.

**Selesai bila.** Keputusan tertaut dari draf dan dari handoff yang memakai draf itu.
