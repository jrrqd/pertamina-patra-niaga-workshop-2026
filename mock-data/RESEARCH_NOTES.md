# Research notes for fictional mock data

Public patterns used to shape the **structure** of training data. All rows remain fictional. Do not treat prices or volumes as real Pertamina data.

## Patterns observed (public sources, 2025–2026)

- **MyPertamina** is the B2C loyalty and transaction hub for fuel, Bright Gas / LPG refill, Bright Store, and partner redemptions. Member grading and weekend double-points style promos are common themes.
- **MRP-like work** includes price acceptance, satisfaction, offline site experience, and competitor price watching for fuel and LPG retail.
- **MBLP-like work** includes creative campaigns for retail products, marketing calendars, MyPertamina points, partners, and grading benefits. Key visual needs span POSM, OOH, print, digital, video.
- **Event-like work** includes national activations (SPBU thematic, multi-city customer days, motorsport atmosphere, Bright Gas roadshows) and sponsorship activations tied to a calendar.
- **Digital-like work** includes five official social accounts (`@mypertamina`, `@pertamaxseries.id`, `@brightgas`, `@SPBUPertamina`, `@dexseriesid`), homeless media, WA blast, and metrics for reach, impression, engagement, ecommerce actions.

## How the mock pack mirrors that

| Sub-fungsi | Files | Real-world echo |
| --- | --- | --- |
| MRP | `mrp/competitor_prices_daily.csv`, `conjoint_price_acceptance.csv`, `mypertamina_csat_loyalty.csv`, `offline_site_evaluation.csv`, `price_book_fictional.json` | Competitor watch, conjoint-style acceptance, app CSAT/NPS, offline SPBU eval, fictional price memo inputs |
| Event | `event/event_calendar_seed.csv`, `media_clippings.csv` | National activation calendar, media monitoring around events |
| MBLP | `mblp/content_history.csv`, `community_comments.csv`, `loyalty_partners.csv` | Content pillars per account, community, partner ecosystem |
| Digital | `digital/social_daily.csv`, `homeless_media_inventory.csv`, `wa_blast_history.csv` | Five accounts, homeless slots, blast performance |

## Hard rules

- Competitor names are invented (`RivalEnergi`, etc.).
- Prices are invented around publicly discussed ranges, then labeled fictional.
- No real customer PII. Trap phone numbers are fake.
- Agents must not call live APIs or scrape live social accounts during the workshop.
