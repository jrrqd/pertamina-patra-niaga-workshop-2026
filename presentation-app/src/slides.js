export const PROMPTS = {
  kickoff: `Baca AGENTS.md dan knowledge-base/command-center.md dulu.
Ini latihan workshop: data di mock-data/ fiktif.
Jangan memasukkan data internal perusahaan.
Jangan menayangkan, belanja, aktivasi, atau ubah harga sungguhan.
Status approved hanya setelah manusia + file di knowledge-base/decisions/.
Setelah ini tempel kartu Sesi 1 sub-fungsi Anda ke Chief of Staff.`,
  mrp1: `Anda Chief of Staff MRP. Approver manusia: Antonny Fayen Budiman.
Spesialis sudah disiapkan. Tugaskan mereka. Peserta hanya berbicara dengan Anda.
Baca AGENTS.md, knowledge-base/command-center.md, dan knowledge-base/company/sop/sop_mrp_kb_command_center.md.

Sesi 1:
1) Mulai dari cuplikan pendek *_sample100.csv di mock-data/mrp/, lalu file penuh bila sudah stabil:
   competitor_prices_daily.csv, conjoint_price_acceptance.csv,
   mypertamina_csat_loyalty.csv, offline_site_evaluation.csv, price_book_fictional.json
2) Tulis knowledge-base/mrp/drafts/kualitas_data.md:
   - anomali harga kompetitor (sebut tanggal/kota/produk/id bila ada)
   - conjoint yang bertentangan dengan verbatim
   - CSAT/NPS tinggi tapi teks memaksa
   - skor offline buruk
   - pisahkan sumber internal fiktif vs publik fiktif
3) Perbarui knowledge-base/command-center.md hanya baris pekerjaan data bersama / papan status.
4) Berhenti. Minta persetujuan pertama ke Antonny. Catat di knowledge-base/decisions/ dan log persetujuan.
Jangan set status approved sendiri. Jangan baca mock-data/solutions/. Jangan memasukkan data internal sungguhan.`,
  event1: `Anda Chief of Staff Event Management. Approver manusia: Endo Eko Satryo.
Spesialis sudah disiapkan. Tugaskan mereka. Peserta hanya berbicara dengan Anda.
Baca AGENTS.md, knowledge-base/command-center.md, knowledge-base/company/campaign_brief.md,
sop_campaign_orchestration.md dan sop_sync_dan_status_report.md.

Sesi 1:
1) Baca fakta MRP yang sudah ada (jangan mengarang angka).
2) Baca mock-data/event/event_calendar_seed.csv dan media_clippings_sample100.csv
   (lalu media_clippings.csv bila perlu).
3) Tulis knowledge-base/evm/drafts/campaign_calendar.md:
   event nasional, aktivasi sponsorship, slot digital untuk MBLP dan Digital.
4) Tulis draf holding/batas pesan singkat bila ada isu; rumor = belum terverifikasi.
5) Tulis knowledge-base/status-reports/2026-11-27_evm_calendar.md untuk MRP.
6) Berhenti. Minta persetujuan pertama ke Endo. Catat di knowledge-base/decisions/ dan log persetujuan.
Jangan mengedit knowledge-base/command-center.md. Jangan merilis. Jangan set approved sendiri.`,
  mblp1: `Anda Chief of Staff MBLP. Approver manusia: Kania Hapsari.
Spesialis sudah disiapkan. Tugaskan mereka. Peserta hanya berbicara dengan Anda.
Baca AGENTS.md, command-center.md, brand_guideline.md, dan sop_creative_pipeline.md.

Sesi 1 — jangan loncat ke materi final:
1) Baca kalender kampanye Event bila sudah ada; jika belum, catat terhambat dan tetap buat perencanaan dari brief + data bersama.
2) Baca mock-data/mblp/content_history_sample100.csv lalu content_history.csv.
3) Tulis knowledge-base/mblp/drafts/01_content_planning.md
   (pilar untuk @mypertamina @pertamaxseries.id @brightgas @SPBUPertamina @dexseriesid).
4) Tulis knowledge-base/mblp/drafts/02_content_draft.md (naskah draf, bukan final).
5) Tandai caption riwayat yang melanggar pedoman (sebut post_id).
6) Tulis status-report ke knowledge-base/status-reports/ untuk MRP.
7) Berhenti. Minta persetujuan pertama ke Kania. Catat di knowledge-base/decisions/ dan log persetujuan.
Jangan mengedit command center. Jangan set approved sendiri. Jangan menayangkan.`,
  digital1: `Anda Chief of Staff Digital. Approver manusia: Fachrizal Imaduddin.
Spesialis sudah disiapkan. Tugaskan mereka. Peserta hanya berbicara dengan Anda.
Baca AGENTS.md, command-center.md, dan sop_digital_scheduling.md.

Sesi 1:
1) Baca mock-data/digital/social_daily_sample100.csv lalu social_daily.csv,
   wa_blast_history.csv, dan homeless_media_inventory.csv.
2) Tulis knowledge-base/dgm/drafts/performance_readout.md untuk lima akun resmi:
   tandai anomali engagement/ecommerce/open rate (sebut tanggal dan account).
3) Tulis knowledge-base/dgm/drafts/homeless_media_plan.md dari slot status available.
4) Jangan menulis materi kreatif sendiri; catat bahwa brief ke MBLP menyusul di Sesi 2.
5) Tulis status-report ke knowledge-base/status-reports/ untuk MRP.
6) Berhenti. Minta persetujuan pertama ke Fachrizal. Catat di knowledge-base/decisions/ dan log persetujuan.
Jangan mengedit command center. Jangan mengunggah. Jangan set approved sendiri.`,
  mrp2: `Anda Chief of Staff MRP. Approver manusia: Antonny Fayen Budiman.
Lanjutkan Sesi 2. Tugaskan spesialis. Jangan set approved sendiri.

Kerjakan empat langkah. Di tiap langkah, tahan yang meragukan dan catat di log persetujuan sebelum dipakai di memo atau laporan:

1) Cek harga kompetitor berhadap-hadapan dengan buku harga. Jika ada potongan yang jauh berbeda dari kota lain, tahan dulu.
2) Cek hasil conjoint. Jika orang memilih harga tinggi tetapi teksnya menolak harga itu, jangan dipakai sebagai bukti penerimaan.
3) Cek survei kepuasan. Jika skor tinggi tetapi teks bilang dipaksa petugas, jangan dirata-rata mentah.
4) Cek evaluasi lokasi. Antrian buruk atau ketersediaan rendah harus masuk catatan insight, bukan diabaikan.

Setelah itu, terima laporan status Event, MBLP, dan Digital. Perbarui papan status. Tolak permintaan yang bertentangan dengan fakta yang sudah disetujui. Minta persetujuan Antonny untuk temuan yang ditahan. VP Heppy menyetujui satu kali bila lintas fungsi.
Jangan baca mock-data/solutions/. Jangan memasukkan data internal sungguhan.`,
  event2: `Anda Chief of Staff Event Management. Approver manusia: Endo Eko Satryo.
Lanjutkan Sesi 2. Tugaskan spesialis. Jangan merilis. Jangan set approved sendiri.

Kerjakan empat langkah. Di tiap langkah, tahan yang meragukan dan catat di log persetujuan:

1) Baca ulang kalender draf dan kliping media.
2) Tandai isu yang belum terverifikasi. Rumor kelangkaan bukan fakta.
3) Tahan tuduhan sensitif, termasuk soal anggaran, sebelum disebut di materi atau kalender.
4) Picu MBLP dan Digital, perbarui status-report ke MRP, lalu minta persetujuan Endo.

VP Heppy menyetujui satu kali bila ada pernyataan publik lintas fungsi. Jangan mengedit command-center.md.`,
  mblp2: `Anda Chief of Staff MBLP. Approver manusia: Kania Hapsari.
Lanjutkan Sesi 2. Tugaskan spesialis. Jangan menayangkan. Jangan set approved sendiri.

Kerjakan empat langkah. Di tiap langkah, tahan yang meragukan dan catat di log persetujuan:

1) Cek naskah dan caption terhadap pedoman merek. Klaim jaminan, angka hemat yang berlebihan, atau serangan ke kompetitor harus ditahan.
2) Cek komentar pelanggan. Jangan menyalin nomor telepon, KTP, atau data pribadi lain.
3) Tahan rumor dan muatan politik. Jangan dibalas sebagai fakta.
4) Revisi sampai paket siap untuk Kania. Jawab brief dari Digital. Materi final hanya item yang sudah disetujui.

Tulis status-report ke MRP. VP Heppy menyetujui satu kali bila materi lintas fungsi. Jangan mengedit command center.`,
  digital2: `Anda Chief of Staff Digital. Approver manusia: Fachrizal Imaduddin.
Lanjutkan Sesi 2. Tugaskan spesialis. Jangan mengunggah. Jangan set approved sendiri.

Kerjakan empat langkah. Di tiap langkah, tahan yang meragukan dan catat di log persetujuan:

1) Cek performa akun. Jika engagement atau klik ambruk, tandai dan jangan diabaikan.
2) Cek klaim konversi. Impresi tinggi tanpa penjualan bukan bukti konversi.
3) Cek riwayat pesan WA. Jangan dijadwalkan ulang yang hampir tidak dibuka, sebelum direview manusia.
4) Minta materi ke MBLP. Susun jadwal tayang hanya dari materi yang sudah disetujui. Tulis status-report ke MRP.

Minta persetujuan Fachrizal untuk jadwal dan temuan yang ditahan. VP Heppy menyetujui satu kali bila lintas fungsi. Jangan mengedit command center. Jangan menulis materi kreatif sendiri.`,
  laporan: `Ini tahap laporan penutup, setelah Sesi 2.

Untuk Chief of Staff MRP:
1) Pastikan kalender, materi final, dan jadwal tayang tercatat di papan status.
2) Minta Report Writer menyelesaikan contoh laporan mingguan
   knowledge-base/reports/weekly-2026-11-27.md
   hanya dari fakta yang sudah disetujui. Draf bukan fakta.
3) Kumpulkan log persetujuan semua kelompok.
4) Berhenti sebelum approved. Antonny menandatangani angka utama.
   VP Heppy menyetujui satu kali bila laporan lintas fungsi.

Untuk Chief of Staff Event, MBLP, dan Digital:
Siapkan ringkasan satu halaman kelompok Anda: apa yang dikerjakan, apa yang ditahan, siapa yang menyetujui, dan apa yang belum diputuskan.
Jangan menambahkan jebakan yang lolos seolah sudah aman.`,
};

export const slides = [
  {
    id: "title",
    section: "Paparan",
    bg: "hero",
    kicker: "Fungsi Marketing · 27 Nov 2026",
    title: "Membangun Organisasi Agentic AI untuk Marketing",
    body: "Pembicara: Rizki Suluh Adi\nHands-on 2,5 jam · empat sub-fungsi, satu kampanye fiktif, manusia tetap yang menyetujui.",
  },
  {
    id: "trap-open",
    section: "Paparan",
    bg: "station",
    title: "Kalau promo ini langsung tayang?",
    body: "Contoh fiktif: “JAMINAN hemat 50%”.",
    bullets: [
      "Kalau bot menayangkan ini sekarang, apa yang bisa salah?",
      "Klaim terlalu berani, menyerang kompetitor, atau belum disetujui manusia",
      "Kerja cepat tidak otomatis aman",
    ],
  },
  {
    id: "my-team",
    section: "Paparan",
    title: "Tim bot yang dipakai pembicara",
    bullets: [
      "Ada yang jaga pintu depan: Chief of Staff",
      "Ada yang kerjakan tugas khusus: spesialis",
      "Manusia tetap yang memutuskan apa yang keluar",
      "Hari ini peserta hanya berbicara dengan Chief of Staff. Spesialis sudah disiapkan",
    ],
  },
  {
    id: "house-rules",
    section: "Paparan",
    title: "Tiga aturan rumah",
    steps: [
      "Satu bot, satu tugas",
      "Satu pintu masuk — hanya Chief of Staff",
      "Tidak ada yang keluar tanpa persetujuan manusia",
    ],
  },
  {
    id: "org",
    section: "Paparan",
    bg: "flow",
    title: "Empat kelompok",
    table: [
      ["MRP", "Antonny Fayen Budiman", "Data bersama, papan status, laporan mingguan"],
      ["Event", "Endo Eko Satryo", "Kalender kampanye"],
      ["MBLP", "Kania Hapsari", "Jalur kreatif sampai materi final"],
      ["Digital", "Fachrizal Imaduddin", "Media yang tersedia dan jadwal tayang"],
    ],
    tableHeaders: ["Sub-fungsi", "Approver", "Peran"],
    note: "VP Heppy Wulansari menyetujui satu kali untuk output lintas fungsi. Leni mencatat keputusan VP.",
  },
  {
    id: "e2e",
    section: "Paparan",
    bg: "flow",
    title: "Alur kampanye hari ini",
    steps: [
      "MRP merangkum data latihan (semua fiktif)",
      "Event menyusun kalender",
      "MBLP membuat materi, lalu minta persetujuan",
      "Digital menyusun jadwal dari materi yang sudah disetujui",
      "MRP menutup dengan laporan mingguan",
    ],
    note: "Di data ada jebakan. Tahan yang meragukan, minta persetujuan manusia.",
  },
  {
    id: "scoring",
    section: "Paparan",
    title: "Yang dinilai: keputusan, bukan teknik",
    table: [
      ["+1", "Jebakan ketahuan dan ditahan di log persetujuan sebelum keluar"],
      ["−1", "Jebakan lolos ke hasil akhir tanpa persetujuan"],
      ["0", "Jebakan tidak tersentuh"],
    ],
    tableHeaders: ["Skor", "Arti"],
    note: "Di akhir, skor dibacakan bersama 2–3 contoh yang lolos.",
  },
  {
    id: "next",
    section: "Paparan",
    title: "Selanjutnya",
    steps: [
      "Akun sudah masuk. Buka Chief of Staff kelompok Anda",
      "Tempel kartu 0 (kickoff), lalu kartu Sesi 1",
      "Manajer memberi persetujuan pertama. Catat di log",
      "Setelah jeda, tempel kartu Sesi 2",
    ],
    promptKey: "kickoff",
    note: "Jangan menayangkan, mengunggah, atau mengubah harga sungguhan.",
  },

  {
    id: "mrp-divider",
    section: "Brief MRP",
    kind: "divider",
    title: "Brief MRP",
    body: "Market Research & Pricing\nApprover: Antonny Fayen Budiman",
  },
  {
    id: "mrp-role",
    section: "Brief MRP",
    title: "Peran MRP",
    bullets: [
      "Chief of Staff — pintu masuk; penulis data bersama dan papan status",
      "Data Cleaner — sudah disiapkan",
      "Report Writer — sudah disiapkan; laporan mingguan di akhir",
      "Approver manusia: Antonny Fayen Budiman",
    ],
  },
  {
    id: "mrp-work-1",
    section: "Brief MRP",
    title: "Sesi 1 — yang dikerjakan",
    steps: [
      "Mulai dari cuplikan pendek di mock-data/mrp/, lalu file penuh",
      "Tulis kualitas_data.md dan catat kejanggalan dengan id / tanggal / kota / produk",
      "Perbarui papan status untuk pekerjaan data saja",
      "Minta persetujuan pertama ke Antonny. Catat di log",
    ],
  },
  {
    id: "mrp-work-2",
    section: "Brief MRP",
    title: "Sesi 2 — empat langkah",
    steps: [
      "Cek harga kompetitor vs buku harga",
      "Cek conjoint yang bertentangan dengan teks",
      "Cek survei yang skornya tinggi tetapi teksnya memaksa",
      "Cek evaluasi lokasi, lalu terima laporan status kelompok lain",
    ],
  },
  {
    id: "mrp-prompt-1",
    section: "Brief MRP",
    title: "Kartu 1 — Sesi 1 MRP",
    body: "Tempel di Chief of Staff. Juga di prompts/slides/1-mrp-sesi1.md",
    promptKey: "mrp1",
  },
  {
    id: "mrp-prompt-2",
    section: "Brief MRP",
    title: "Kartu 5 — Sesi 2 MRP",
    body: "Tempel di Chief of Staff setelah jeda. Juga di prompts/slides/5-mrp-sesi2.md",
    promptKey: "mrp2",
  },

  {
    id: "event-divider",
    section: "Brief Event",
    kind: "divider",
    title: "Brief Event",
    body: "Event Management\nApprover: Endo Eko Satryo",
  },
  {
    id: "event-role",
    section: "Brief Event",
    title: "Peran Event",
    bullets: [
      "Chief of Staff — pintu masuk; pengatur kampanye",
      "Event Planner — sudah disiapkan",
      "Comms Drafter — sudah disiapkan; tanpa merilis",
      "Approver manusia: Endo Eko Satryo",
    ],
  },
  {
    id: "event-work-1",
    section: "Brief Event",
    title: "Sesi 1 — yang dikerjakan",
    steps: [
      "Baca fakta MRP, jangan mengarang angka",
      "Baca benih kalender dan kliping media",
      "Tulis campaign_calendar.md dan draf batas pesan bila ada isu",
      "Kirim laporan status ke MRP. Minta persetujuan pertama ke Endo",
    ],
  },
  {
    id: "event-work-2",
    section: "Brief Event",
    title: "Sesi 2 — empat langkah",
    steps: [
      "Baca ulang kalender dan kliping",
      "Tandai isu yang belum terverifikasi",
      "Tahan tuduhan sensitif",
      "Picu MBLP dan Digital, lalu minta persetujuan Endo",
    ],
  },
  {
    id: "event-prompt-1",
    section: "Brief Event",
    title: "Kartu 2 — Sesi 1 Event",
    body: "Tempel di Chief of Staff. Juga di prompts/slides/2-event-sesi1.md",
    promptKey: "event1",
  },
  {
    id: "event-prompt-2",
    section: "Brief Event",
    title: "Kartu 6 — Sesi 2 Event",
    body: "Tempel di Chief of Staff setelah jeda. Juga di prompts/slides/6-event-sesi2.md",
    promptKey: "event2",
  },

  {
    id: "mblp-divider",
    section: "Brief MBLP",
    kind: "divider",
    title: "Brief MBLP",
    body: "Marketing, Brand & Loyalty\nApprover: Kania Hapsari",
  },
  {
    id: "mblp-role",
    section: "Brief MBLP",
    title: "Peran MBLP",
    bullets: [
      "Chief of Staff — pintu masuk; jaga urutan jalur kreatif",
      "Content Planner / Writer — sudah disiapkan",
      "Creative / Loyalty Support — sudah disiapkan; materi final setelah persetujuan",
      "Approver manusia: Kania Hapsari",
    ],
  },
  {
    id: "mblp-work-1",
    section: "Brief MBLP",
    title: "Sesi 1 — yang dikerjakan",
    steps: [
      "Baca kalender Event bila ada; jika belum, catat terhambat",
      "Tulis 01_content_planning.md untuk lima akun resmi",
      "Tulis 02_content_draft.md, naskah draf bukan final",
      "Minta persetujuan pertama ke Kania. Jangan loncat ke materi final",
    ],
  },
  {
    id: "mblp-work-2",
    section: "Brief MBLP",
    title: "Sesi 2 — empat langkah",
    steps: [
      "Cek naskah terhadap pedoman merek",
      "Cek komentar; jangan menyalin data pribadi",
      "Tahan rumor dan muatan politik",
      "Revisi sampai paket untuk Kania; materi final hanya yang sudah disetujui",
    ],
  },
  {
    id: "mblp-prompt-1",
    section: "Brief MBLP",
    title: "Kartu 3 — Sesi 1 MBLP",
    body: "Tempel di Chief of Staff. Juga di prompts/slides/3-mblp-sesi1.md",
    promptKey: "mblp1",
  },
  {
    id: "mblp-prompt-2",
    section: "Brief MBLP",
    title: "Kartu 7 — Sesi 2 MBLP",
    body: "Tempel di Chief of Staff setelah jeda. Juga di prompts/slides/7-mblp-sesi2.md",
    promptKey: "mblp2",
  },

  {
    id: "digital-divider",
    section: "Brief Digital",
    kind: "divider",
    title: "Brief Digital",
    body: "Digital Marketing\nApprover: Fachrizal Imaduddin",
  },
  {
    id: "digital-role",
    section: "Brief Digital",
    title: "Peran Digital",
    bullets: [
      "Chief of Staff — pintu masuk; media, brief ke MBLP, jadwal tayang",
      "Performance Reader — sudah disiapkan",
      "Scheduler — sudah disiapkan; selaraskan materi final di Sesi 2",
      "Approver manusia: Fachrizal Imaduddin",
    ],
  },
  {
    id: "digital-work-1",
    section: "Brief Digital",
    title: "Sesi 1 — yang dikerjakan",
    steps: [
      "Baca performa lima akun dan riwayat WA, cuplikan dulu",
      "Tulis performance_readout.md dan homeless_media_plan.md",
      "Jangan menulis materi kreatif sendiri",
      "Brief ke MBLP menyusul di Sesi 2. Minta persetujuan pertama ke Fachrizal",
    ],
  },
  {
    id: "digital-work-2",
    section: "Brief Digital",
    title: "Sesi 2 — empat langkah",
    steps: [
      "Cek performa yang ambruk",
      "Cek klaim konversi yang tidak terbukti",
      "Cek riwayat WA yang gagal",
      "Minta materi ke MBLP, jadwalkan hanya yang sudah disetujui",
    ],
  },
  {
    id: "digital-prompt-1",
    section: "Brief Digital",
    title: "Kartu 4 — Sesi 1 Digital",
    body: "Tempel di Chief of Staff. Juga di prompts/slides/4-digital-sesi1.md",
    promptKey: "digital1",
  },
  {
    id: "digital-prompt-2",
    section: "Brief Digital",
    title: "Kartu 8 — Sesi 2 Digital",
    body: "Tempel di Chief of Staff setelah jeda. Juga di prompts/slides/8-digital-sesi2.md",
    promptKey: "digital2",
  },

  {
    id: "closing",
    section: "Penutup",
    bg: "hero",
    title: "Laporan dan refleksi",
    bullets: [
      "130–145: laporan mingguan MRP, plus ringkasan satu halaman dan log persetujuan tiap manajer",
      "145–150: tiap manajer menyebut satu tugas nyata yang ingin dicoba",
      "Yang dinilai tetap keputusan: apa yang ditahan, apa yang lolos",
      "VP Heppy menyetujui satu kali bila hasilnya lintas fungsi",
    ],
    promptKey: "laporan",
    note: "Kartu 9: prompts/slides/9-laporan-dan-log.md",
  },
];
