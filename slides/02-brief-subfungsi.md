# Brief sub-fungsi + custom prompt

Setelah paparan dan kickoff (`prompts/00_kickoff.md`), tiap kelompok memakai section di bawah. Prompt lengkap juga ada di `prompts/slides/`.

---

## MRP — Market Research & Pricing

**Approver:** Antonny Fayen Budiman  
**Peran agen:** CoS (pemilik KB + command center), Data Cleaner, Report Writer

### Yang dikerjakan Sesi 1
- Bersihkan data competitor, conjoint, CSAT/loyalty, evaluasi offline
- Tulis ringkasan ke `knowledge-base/mrp/drafts/`
- CoS memperbarui `knowledge-base/command-center.md` (hanya MRP)

### Data
`mock-data/mrp/` — mulai `*_sample100.csv`, lalu file penuh.  
SOP: `knowledge-base/company/sop/sop_mrp_kb_command_center.md`

### Output
`kualitas_data.md` + baris command center terisi untuk pekerjaan KB

### Custom prompt (tempel setelah kickoff)

Lihat blok di `prompts/slides/mrp-sesi1.md` (satu tempelan).

---

## Event Management

**Approver:** Endo Eko Satryo  
**Peran agen:** CoS (orkestrator), Event Planner, Comms Drafter

### Yang dikerjakan Sesi 1
- Baca KB MRP dan seed calendar
- Tulis `campaign_calendar.md` (offline + online)
- Siapkan monitoring isu dari kliping (tanpa merilis)

### Data
`mock-data/event/event_calendar_seed.csv`, `media_clippings.csv`  
SOP: `sop_campaign_orchestration.md`, `sop_sync_dan_status_report.md`

### Output
Calendar draft + draf status-report ke MRP (belum mengedit command center)

### Custom prompt
`prompts/slides/event-sesi1.md`

---

## MBLP — Marketing, Brand & Loyalty

**Approver:** Kania Hapsari  
**Peran agen:** CoS, Content Planner/Writer, Creative/Loyalty support

### Yang dikerjakan Sesi 1
- Jalur kreatif: `01_content_planning.md` lalu `02_content_draft.md`
- Jangan loncat ke content bank sebelum approval

### Data
`mock-data/mblp/content_history.csv` (+ comments/partners di sesi berikutnya)  
SOP: `sop_creative_pipeline.md`

### Output
Planning + draft yang selaras calendar Event dan fakta KB

### Custom prompt
`prompts/slides/mblp-sesi1.md`

---

## Digital Marketing

**Approver:** Fachrizal Imaduddin  
**Peran agen:** CoS, Performance Reader, Scheduler

### Yang dikerjakan Sesi 1
- Baca performa lima akun + WA blast
- Tulis rencana homeless media
- Brief creative ke MBLP menyusul di Sesi 2 (jangan tulis creative sendiri)

### Data
`mock-data/digital/social_daily.csv`, `homeless_media_inventory.csv`, `wa_blast_history.csv`  
SOP: `sop_digital_scheduling.md`

### Output
`performance_readout.md` + `homeless_media_plan.md`

### Custom prompt
`prompts/slides/digital-sesi1.md`
