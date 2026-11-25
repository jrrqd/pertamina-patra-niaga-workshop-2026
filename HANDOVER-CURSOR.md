# Handover: Workshop AI Agent – Pertamina Patra Niaga (Jumat 27 Nov 2026, 150 menit)
From Lucius (Grok Bot), 25 Nov 2026 13:10 WIB. Untuk Cursor di Mac Rizki.

## Sudah selesai
- One-pager silabus v9 (Canva DAHb5Cb7bTQ, edit https://www.canva.com/d/BMJ_6eqMX-bjRNB). PDF: syllabus/silabus-patra-niaga-canva-v9.pdf. Terkirim ke Dwika 13:08 WIB dari rizki@mail.grokbot.com (cc suluhadi@gmail.com).
- Pre/post test: https://docs.google.com/document/d/1284zEOfsubP8X1pvuz3nMuqgrsaa3i4sWTjRo0G9rCQ/edit (Dwika editor; terkirim 12:36). PDF di tests/.
- Deck live saat ini rev7 (BELUM sesuai silabus v9): https://docs.google.com/presentation/d/1njmayzKkhK_Yc1uIkhEw_EeFAHNANEFAxZmV6NETYl8/edit (Dwika editor). rev6/rev5 sudah [LAMA].

## Keputusan terbaru (silabus v9) – deck & kartu harus disamakan
- 8 kelompok, 2 per sub-fungsi (A & B), bersaing pada soal & temuan yang sama.
- MRP: data crunching dari mock data – analisis, tren, perkiraan kebutuhan, rekomendasi berbasis angka (bukan memo harga).
- EVENT: ide & konsep event, lalu rencana penyelenggaraan (rundown, vendor, logistik, izin, eksekusi). TANPA holding statement/media.
- MBLP: campaign baru – "brief dan campaign plan" (pakai istilah Inggris "campaign plan").
- DIGITAL: pembuatan konten + content calendar.
- Rundown: 00–10 pembukaan; 10–20 Dwika; 20–30 Rizki; 30–40 setup Cursor Web + Kartu 0; 40–80 Sesi 1; 80–90 jeda; 90–130 Sesi 2 (temuan dirilis menit 90, 100, 110, 120); 130–150 presentasi & refleksi (dipandu Ibu Heppy).
- Tidak ada sesi laporan terpisah, tidak ada pemilihan pilot.
- Skor: +1 temuan ketahuan & ditahan, −1 lolos, 0 tidak tersentuh; pemenang per pasangan.
- Satu akun Cursor bersama untuk 8 grup OK (training, mock data) – agen diberi nama kode grup, aturan fair play.

## Progress Cursor 25 Nov 2026 sore
- Kartu `rev6-kartu/` disesuaikan ke v9 (output, 40 menit Sesi 1, temuan menit 90/100/110/120, Kartu 9 presentasi).
- `fasilitator-only/traps/` disesuaikan. Event belum punya kunci id baru (kalender hanya EV001–EV005). Folder di `.gitignore`.
- Deck lokal: `patra-niaga-workshop-rev8.pptx`. Belum di-upload ke Google Slides (akun suluhadi@gmail.com, Rizki yang upload). Belum prefix [LAMA] pada rev7.
- Command center browser: `command-center/` (pola ops-dashboard, path `/patra/`, port 3072). Logo asli Patra Niaga. CRUD SOP + org canvas + prompt CoS. Toggle UI ID/EN (isi tidak diterjemahkan). Preview lokal: `python3 tools/preview_server.py` di `http://127.0.0.1:8766/patra/`. Preview Vercel: static `command-center/site/` dengan localStorage (tanpa Grokbot); deploy akun menunggu authorize team. Deploy radr menunggu `PATRA_DEPLOY_YES=1`. Tidak menyentuh `/ops/`.

## Sisa pekerjaan
1. Deck rev8: file lokal sudah. Upload sebagai Google Slides baru "(rev8)", share editor ke Dwika, prefix [LAMA] pada rev7. edit patra-niaga-workshop-rev6.pptx (sudah berisi edit rev7) sesuai v9 – slide rundown, 8 grup, penilaian, slide soal/kartu tiap sub-fungsi, notes fasilitator, penutup. Upload sebagai Google Slides baru "(rev8)" di folder yang sama (suluhadi@gmail.com), share ke dwika.putra@gmail.com editor, beri prefix "[LAMA] " ke rev7. Catatan: konektor Google Slides Grok Bot 403 di file hasil konversi; upload ulang pptx.
2. Kartu peserta di rev6-kartu/ (kartu/0-pembuka.md … 9-laporan-dan-log.md, soal/template-sesi1.md): sesuaikan EVENT/MBLP/DIGITAL/MRP dan nama output (mis. 02_memo_harga -> output analisis data; 02_rencana_aktivasi -> ide+rencana event; 02_paket_konten + kalender konten; MBLP campaign plan). Kartu 9 "laporan" menyesuaikan ke presentasi & refleksi.
3. Kartu temuan fasilitator di fasilitator-only/traps/step-1..4.md: sesuaikan dengan fokus baru (jangan taruh di repo).
4. Repo workshop (bundle patra-niaga-workshop.bundle; Victor yang pegang; belum di-push): soal/ & mock data EVENT/MBLP/DIGITAL/MRP disesuaikan; kartu disalin byte-identik dari rev6-kartu/. Repo final di Cursor Origin pada akun Cursor baru (belum dibuat).
5. Blocker Rizki: akun Cursor baru (Premium+) + repo kosong; data KB perusahaan di Mac (brand_guideline.md, orgstructure.md, roster.md, sop_creative_pipeline.md, sop_digital_scheduling.md); fasilitator 3 & 4; daftar anggota A/B; QR Mentimeter dari Dwika; spend limit ~$50.
6. Dry run 8 agen paralel sebelum Kamis 26 Nov.

## Aturan teks
- Sapa audiens "peserta", jangan "Bapak/Ibu" (nama orang seperti Ibu Heppy tetap).
- Teks yang dilihat peserta: tanpa kata "jebakan" atau "traps"; pakai "temuan".
- Menulis sebagai Rizki dalam Bahasa Indonesia: jangan "saya" (pakai "aku").
- Email ke luar: Rizki yang approve sebelum kirim. Masukan Dwika masuk ke rizki@mail.grokbot.com.

## File dalam patra-niaga-handover-files.tgz
rev6-kartu/, fasilitator-only/traps/, syllabus v9 pdf/png, tests/, patra-niaga-workshop.bundle (git clone dari bundle), patra-niaga-workshop-rev6.pptx.
