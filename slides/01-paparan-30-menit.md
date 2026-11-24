# Paparan 30 menit — Organisasi Agentic AI untuk Marketing

**Fungsi Marketing · Pertamina Patra Niaga · 27 Nov 2026**  
Hosting hands-on: **Cursor Origin** (bukan GitHub). Paparan ini nanti di Live App.

Angka harga Cursor bisa berubah; cek [cursor.com/docs/models-and-pricing](https://cursor.com/docs/models-and-pricing) sebelum hari H.

---

## Slide 1 — Judul

**Membangun Organisasi Agentic AI untuk Marketing**

Hands-on 2,5 jam · Cursor + grokbot · Cursor Origin

Tujuan: empat sub-fungsi menjalankan satu kampanye fiktif B2C retail ujung ke ujung, dengan manusia yang tetap menyetujui.

Visual: logo resmi Pertamina Patra Niaga + hero fotorealistik SPBU/retail (bukan logo palsu).

---

## Slide 2 — Apa itu Cursor

Cursor = editor kode + **Agent**, bukan sekadar chatbot di samping.

- Membaca folder proyek Anda
- Menulis file, merangkum CSV, mengikuti `AGENTS.md`
- Bisa memakai grokbot (agen dengan peran)

Hari ini Anda tidak “bertanya ke AI”. Anda **memimpin tim agen** di dalam workspace.

---

## Slide 3 — Alur kerja di Cursor

1. Buka repo dari **Cursor Origin**
2. Baca `AGENTS.md` dan `knowledge-base/command-center.md`
3. Tempel `prompts/00_kickoff.md`, lalu prompt sub-fungsi
4. Agen menulis draf di `knowledge-base/<dept>/drafts/`
5. Manusia menyetujui; MRP memperbarui command center

Aturan bersama hidup di `.cursor/rules/` dan SOP di `knowledge-base/company/sop/`.

---

## Slide 4 — Harga paket Cursor (ringkas)

| Paket | Harga (USD/bulan, sebelum pajak) | Catatan untuk workshop |
| --- | --- | --- |
| Plus | ~$8 | Pool dasar model Cursor; fitur terbatas |
| Premium | ~$30 | 4× usage Plus; cloud agents; **Grok Bot** |
| Super | ~$100 | 15× usage Plus; prioritas puncak |
| Ultra | ~$200 | 50× usage Plus |
| Teams | dari ~$30/seat | Sesuai tier seat |

Workshop memakai **akun berbayar per sub-fungsi** (Premium ke atas atau Teams) agar grokbot dan sync Origin lancar. Angka final mengikuti kontrak fasilitator.

---

## Slide 5 — Harga / konsumsi per model

- **Cursor models** (Grok 4.7 / 4.6 / 4.5, Composer): memakai pool usage paket.
- **Third-party models**: biasanya di luar pool, ditagih harga API (Premium ke atas).
- Tip praktek:
  - Iterasi cepat / sample CSV → model lebih ringan / Composer
  - Heavy lifting file penuh + keputusan → model lebih kuat
  - Jangan pakai model mahal hanya untuk “halo, apa tugas saya?”

---

## Slide 6 — Skill grill-me

Sebelum agen bekerja, **panggang brief-nya**.

Grill-me = memaksa kejelasan: tujuan, batasan, sumber data, kriteria selesai, dan apa yang wajib manusia.

Tanpa grill-me, agen mengarang. Dengan grill-me, agen mengerjakan kontrak yang sama dengan Anda.

---

## Slide 7 — Prompt grill-me (siap tempel)

```text
Grill-me dulu sebelum mengerjakan apa pun.
Tanyakan sampai jelas: (1) tujuan output, (2) file sumber yang boleh dibaca,
(3) file yang boleh ditulis, (4) yang dilarang, (5) kriteria selesai,
(6) kapan harus berhenti dan minta approval manusia.
Jangan mengolah data sampai saya jawab semua poin itu.
```

Setelah jawaban Anda lengkap, baru tempel prompt Sesi 1 sub-fungsi.

---

## Slide 8 — Apa itu grokbot

Grokbot = agen di Cursor dengan **peran tertulis**.

- **Chief of Staff**: orkestrasi, handoff, laporan status (pintu keluar masuk)
- **Spesialis**: mengerjakan data dan draf teknis

Satu sub-fungsi = satu laptop Cursor berbayar, beberapa peran agen, **satu approver manusia**.

---

## Slide 9 — Org structure workshop

| Sub-fungsi | Approver | Peran agen |
| --- | --- | --- |
| MRP | Antonny Fayen Budiman | KB + command center + weekly report |
| Event | Endo Eko Satryo | Campaign calendar offline/online |
| MBLP | Kania Hapsari | Jalur kreatif → content bank |
| Digital | Fachrizal Imaduddin | Homeless media + jadwal tayang |

VP Heppy Wulansari menyetujui output lintas fungsi. Leni mencatat keputusan VP.

Visual: diagram org (lihat `slides/assets/illustrations/`).

---

## Slide 10 — Governance

- Hanya **MRP** yang menulis KB bersama dan `command-center.md`
- Event / MBLP / Digital: baca KB → kerja di folder sendiri → `status-reports/` ke MRP
- Status `approved` hanya setelah manusia + file di `decisions/`
- Tidak ada publikasi, belanja, aktivasi, atau setting harga sungguhan

---

## Slide 11 — Alur ujung ke ujung

Sumber fiktif → MRP (KB + command center) → Event (calendar) → MBLP (kreatif → content bank) → Digital (homeless + jadwal) → kembali ke command center / weekly report.

---

## Slide 12 — Aturan keras

- Data di `mock-data/` **fiktif**
- Jangan memasukkan data internal sungguhan
- Jangan unggah konten atau ubah harga jual nyata
- Jebakan ada di data; nilai = temuan yang ditahan untuk approval

---

## Slide 13 — Selanjutnya

1. Setup: clone repo **Cursor Origin**, tempel kickoff
2. Ambil brief sub-fungsi Anda (deck berikutnya)
3. Grill-me → Sesi 1

Repo: Cursor Origin (bukan GitHub).  
Paparan & brief: Live App (tautan di `slides/README.md` setelah publish).
