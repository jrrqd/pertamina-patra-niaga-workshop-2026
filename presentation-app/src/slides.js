export const PROMPTS = {
  mrp: `Saya CoS / Data Cleaner MRP. Approver: Antonny Fayen Budiman.
Baca AGENTS.md, knowledge-base/command-center.md, dan knowledge-base/company/sop/sop_mrp_kb_command_center.md.

Sesi 1:
1) Mulai dari *_sample100.csv di mock-data/mrp/, lalu file penuh bila sudah stabil:
   competitor_prices_daily.csv, conjoint_price_acceptance.csv,
   mypertamina_csat_loyalty.csv, offline_site_evaluation.csv, price_book_fictional.json
2) Tulis knowledge-base/mrp/drafts/kualitas_data.md:
   - anomali harga kompetitor (sebut tanggal/kota/produk/id bila ada)
   - conjoint yang bertentangan dengan verbatim
   - CSAT/NPS tinggi tapi teks memaksa
   - skor offline buruk
   - pisahkan sumber internal fiktif vs publik fiktif
3) Sebagai CoS, perbarui knowledge-base/command-center.md hanya baris pekerjaan KB/command center.
Jangan set status approved. Jangan baca mock-data/solutions/. Jangan memasukkan data internal sungguhan.`,
  event: `Saya CoS / Event Planner Event Management. Approver: Endo Eko Satryo.
Baca AGENTS.md, knowledge-base/command-center.md, knowledge-base/company/campaign_brief.md,
sop_campaign_orchestration.md dan sop_sync_dan_status_report.md.

Sesi 1:
1) Baca fakta KB MRP yang sudah ada (jangan mengarang angka).
2) Baca mock-data/event/event_calendar_seed.csv dan media_clippings_sample100.csv
   (lalu media_clippings.csv bila perlu).
3) Tulis knowledge-base/evm/drafts/campaign_calendar.md:
   event nasional, aktivasi sponsorship, slot digital untuk MBLP dan Digital.
4) Tulis draf holding/batas pesan singkat bila ada isu; rumor = belum terverifikasi.
5) Tulis knowledge-base/status-reports/2026-11-27_evm_calendar.md untuk MRP.
Jangan mengedit knowledge-base/command-center.md. Jangan merilis. Jangan set approved.`,
  mblp: `Saya CoS / Content Planner MBLP. Approver: Kania Hapsari.
Baca AGENTS.md, command-center.md, brand_guideline.md, dan sop_creative_pipeline.md.

Sesi 1 — jangan loncat ke content bank:
1) Baca campaign calendar Event bila sudah ada; jika belum, catat blocked dan tetap buat planning berbasis brief + KB.
2) Baca mock-data/mblp/content_history_sample100.csv lalu content_history.csv.
3) Tulis knowledge-base/mblp/drafts/01_content_planning.md
   (pilar untuk @mypertamina @pertamaxseries.id @brightgas @SPBUPertamina @dexseriesid).
4) Tulis knowledge-base/mblp/drafts/02_content_draft.md (naskah draft, bukan final).
5) Tandai caption riwayat yang melanggar guideline (sebut post_id).
6) Tulis status-report ke knowledge-base/status-reports/ untuk MRP.
Jangan mengedit command center. Jangan set approved. Jangan publish.`,
  digital: `Saya CoS / Performance Reader Digital. Approver: Fachrizal Imaduddin.
Baca AGENTS.md, command-center.md, dan sop_digital_scheduling.md.

Sesi 1:
1) Baca mock-data/digital/social_daily_sample100.csv lalu social_daily.csv,
   wa_blast_history.csv, dan homeless_media_inventory.csv.
2) Tulis knowledge-base/dgm/drafts/performance_readout.md untuk lima akun resmi:
   tandai anomali engagement/ecommerce/open rate (sebut tanggal dan account).
3) Tulis knowledge-base/dgm/drafts/homeless_media_plan.md dari slot status available.
4) Jangan menulis creative sendiri; catat bahwa brief ke MBLP menyusul Sesi 2.
5) Tulis status-report ke knowledge-base/status-reports/ untuk MRP.
Jangan mengedit command center. Jangan mengunggah. Jangan set approved.`,
  grill: `Grill-me dulu sebelum mengerjakan apa pun.
Tanyakan sampai jelas: (1) tujuan output, (2) file sumber yang boleh dibaca,
(3) file yang boleh ditulis, (4) yang dilarang, (5) kriteria selesai,
(6) kapan harus berhenti dan minta approval manusia.
Jangan mengolah data sampai saya jawab semua poin itu.`,
};

export const slides = [
  {
    id: "title",
    section: "Paparan",
    bg: "hero",
    title: "Membangun Organisasi Agentic AI untuk Marketing",
    body: "Fungsi Marketing · Pertamina Patra Niaga · 27 Nov 2026\nHands-on 2,5 jam · Cursor + grokbot · Cursor Origin (bukan GitHub)",
  },
  {
    id: "cursor",
    section: "Paparan",
    title: "Apa itu Cursor",
    bullets: [
      "Editor + Agent — bukan sekadar chatbot di samping",
      "Membaca folder proyek, menulis file, mengikuti AGENTS.md",
      "Hari ini Anda memimpin tim agen, bukan hanya bertanya ke AI",
    ],
  },
  {
    id: "workflow",
    section: "Paparan",
    title: "Alur kerja di Cursor",
    bullets: [
      "Clone repo dari Cursor Origin",
      "Baca AGENTS.md dan command-center.md",
      "Tempel kickoff, lalu prompt sub-fungsi",
      "Draf di knowledge-base/<dept>/drafts/",
      "Manusia menyetujui; MRP memperbarui command center",
    ],
  },
  {
    id: "pricing",
    section: "Paparan",
    title: "Harga paket Cursor (ringkas)",
    table: [
      ["Plus", "~$8/bln", "Pool dasar"],
      ["Premium", "~$30/bln", "4× usage; Grok Bot; cloud agents"],
      ["Super", "~$100/bln", "15× usage"],
      ["Ultra", "~$200/bln", "50× usage"],
      ["Teams", "dari ~$30/seat", "Sesuai tier seat"],
    ],
    note: "Angka bisa berubah. Workshop: akun berbayar per sub-fungsi.",
  },
  {
    id: "models",
    section: "Paparan",
    title: "Konsumsi per model",
    bullets: [
      "Cursor models (Grok / Composer) memakai pool paket",
      "Third-party biasanya di luar pool (harga API)",
      "Sample CSV → model lebih ringan; file penuh → model lebih kuat",
    ],
  },
  {
    id: "grill",
    section: "Paparan",
    title: "Skill grill-me",
    bullets: [
      "Panggang brief sebelum agen bekerja",
      "Wajib jelas: tujuan, sumber, output, larangan, kriteria selesai, approval manusia",
      "Tanpa grill-me, agen mengarang",
    ],
    promptKey: "grill",
  },
  {
    id: "grokbot",
    section: "Paparan",
    title: "Apa itu grokbot",
    bullets: [
      "Agen dengan peran tertulis di Cursor",
      "Chief of Staff = pintu keluar masuk",
      "Spesialis = kerjakan data dan draf",
      "Satu laptop berbayar per sub-fungsi; satu approver manusia",
    ],
  },
  {
    id: "org",
    section: "Paparan",
    bg: "flow",
    title: "Org structure workshop",
    bullets: [
      "MRP — Antonny Fayen Budiman — KB + command center",
      "Event — Endo Eko Satryo — campaign calendar",
      "MBLP — Kania Hapsari — jalur kreatif → content bank",
      "Digital — Fachrizal Imaduddin — homeless media + jadwal",
      "VP Heppy Wulansari — approval lintas fungsi",
    ],
  },
  {
    id: "gov",
    section: "Paparan",
    title: "Governance",
    bullets: [
      "Hanya MRP yang menulis KB bersama dan command center",
      "Sub-fungsi lain: baca KB → draf sendiri → status-reports/",
      "approved hanya setelah keputusan manusia di decisions/",
      "Tidak ada publish / ubah harga sungguhan",
    ],
  },
  {
    id: "e2e",
    section: "Paparan",
    bg: "flow",
    title: "Alur ujung ke ujung",
    body: "Sumber fiktif → MRP (KB + command center) → Event (calendar) → MBLP (kreatif → content bank) → Digital (homeless + jadwal) → weekly report",
  },
  {
    id: "rules",
    section: "Paparan",
    bg: "station",
    title: "Aturan keras",
    bullets: [
      "mock-data/ fiktif — jangan masukkan data internal",
      "Jebakan ada di data; nilai = temuan yang ditahan",
      "Hands-on di Cursor Origin, bukan GitHub",
    ],
  },
  {
    id: "next",
    section: "Paparan",
    title: "Selanjutnya",
    bullets: [
      "Clone Cursor Origin",
      "Tempel prompts/00_kickoff.md",
      "Ambil brief sub-fungsi Anda (slide berikutnya)",
      "Grill-me → Sesi 1",
    ],
  },
  {
    id: "mrp",
    section: "Brief MRP",
    title: "MRP — Market Research & Pricing",
    bullets: [
      "Approver: Antonny Fayen Budiman",
      "Output: kualitas_data.md + update command center",
      "Data: mock-data/mrp/ (sample dulu, lalu full)",
      "SOP: sop_mrp_kb_command_center.md",
    ],
    promptKey: "mrp",
  },
  {
    id: "event",
    section: "Brief Event",
    title: "Event Management",
    bullets: [
      "Approver: Endo Eko Satryo",
      "Output: campaign_calendar.md + status-report",
      "Data: mock-data/event/",
      "SOP: sop_campaign_orchestration.md",
    ],
    promptKey: "event",
  },
  {
    id: "mblp",
    section: "Brief MBLP",
    title: "MBLP — Brand & Loyalty",
    bullets: [
      "Approver: Kania Hapsari",
      "Output: 01_content_planning + 02_content_draft",
      "Jangan loncat ke content bank di Sesi 1",
      "Data: mock-data/mblp/",
    ],
    promptKey: "mblp",
  },
  {
    id: "digital",
    section: "Brief Digital",
    title: "Digital Marketing",
    bullets: [
      "Approver: Fachrizal Imaduddin",
      "Output: performance_readout + homeless_media_plan",
      "Brief creative ke MBLP di Sesi 2",
      "Data: mock-data/digital/",
    ],
    promptKey: "digital",
  },
];
