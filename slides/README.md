# Slide & Live App

## Konten

- [`01-paparan-30-menit.md`](01-paparan-30-menit.md) — outline paparan
- [`02-brief-subfungsi.md`](02-brief-subfungsi.md) — brief + pointer prompt
- Prompt siap tempel: [`../prompts/slides/`](../prompts/slides/)
- App presentasi: [`../presentation-app/`](../presentation-app/)

## Aset visual

- Logo resmi: `assets/logo/pertamina-patra-niaga.png` (sumber: pertaminapatraniaga.com — lihat ATTRIBUTION.md)
- Ilustrasi generate (bukan logo): `assets/illustrations/`

## Cursor Origin

Repo hands-on: `rizki/pertamina-patra-niaga-workshop-2026`  
Clone: `https://origin.cursor.com/rizki/pertamina-patra-niaga-workshop-2026.git`  
Panduan: [`../ORIGIN.md`](../ORIGIN.md)

## Publish Live App

App ada di `presentation-app/`. Publish lewat **cloud agent** (bukan local-only):

```text
Build an app from presentation-app/ in this repo for the workshop deck.
It is a keyboard-navigable presentation with Pertamina Patra Niaga logo,
section briefs, and copy-prompt buttons. Then publish it as a Cursor Live App
for our team (private/team access). Return the live URL.
```

Setelah publish, tempel URL di bawah:

- **Live App URL:** _(belum dipublish — setelah `git push` Origin berhasil, jalankan prompt cloud agent di atas dari Cursor)_
- Preview lokal: `cd presentation-app && npm install && npm run dev` (build `npm run build` sudah diverifikasi)

Lokal preview:

```bash
cd presentation-app && npm install && npm run dev
```
