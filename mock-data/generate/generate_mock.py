#!/usr/bin/env python3
"""Deterministic fictional training data for Pertamina Patra Niaga marketing workshop.

Grounded in publicly known work patterns (MyPertamina loyalty, Bright Gas / fuel
retail campaigns, national SPBU activations, five official social accounts) but
ALL rows, prices, competitor names, and respondents are FICTIONAL. Seed 42.

Run from repo root:
    python3 mock-data/generate/generate_mock.py
"""

from __future__ import annotations

import csv
import json
import random
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "mock-data"
SEED = 42
START = date(2026, 8, 1)
END = date(2026, 10, 29)

PRODUCTS_FUEL = ["Pertamax", "Pertamax Turbo", "Dexlite", "Pertamina Dex"]
PRODUCTS_LPG = ["Bright Gas 5.5kg", "Bright Gas 12kg", "LPG NPSO 12kg"]
COMPETITORS = ["RivalEnergi", "MitraGas Nusantara", "BlueFlame Retail", "CityPump Co"]
CITIES = ["Jakarta", "Surabaya", "Bandung", "Medan", "Makassar", "Semarang", "Denpasar", "Palembang"]
GRADES = ["Bronze", "Silver", "Gold", "Platinum"]
ACCOUNTS = [
    "@mypertamina",
    "@pertamaxseries.id",
    "@brightgas",
    "@SPBUPertamina",
    "@dexseriesid",
]
CONTENT_PILLARS = [
    "produk_fuel",
    "produk_lpg",
    "loyalty_poin",
    "aktivasi_event",
    "edukasi_keamanan",
    "promo_weekend",
]
FIRST = ["Budi", "Sari", "Andi", "Dewi", "Raka", "Putri", "Agus", "Lina", "Fajar", "Maya"]
LAST = ["Santoso", "Wijaya", "Pratama", "Kusuma", "Halim", "Nugroho", "Saputra", "Lestari"]

# Facilitator trap ids — see mock-data/solutions/traps.md
TRAP_SURVEY = {42, 777, 3333}
TRAP_CONJOINT = {55, 400}
TRAP_PRICE_DAY = "2026-10-12"
TRAP_SOCIAL_POST = {100, 2500}
TRAP_COMMENT = {42, 777, 1500, 8888, 19001}
TRAP_CLIP = {17, 900, 2400}


def days():
    d = START
    while d <= END:
        yield d
        d += timedelta(days=1)


def write_csv(path: Path, header, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(header)
        w.writerows(rows)
    sample = path.with_name(path.stem + "_sample100.csv")
    with path.open(encoding="utf-8") as src, sample.open("w", encoding="utf-8") as dst:
        for i, line in enumerate(src):
            if i > 100:
                break
            dst.write(line)


def main():
    rng = random.Random(SEED)
    all_days = list(days())

    # --- MRP: competitor intelligence (fictional daily pump / refill prices) ---
    price_rows = []
    base = {
        "Pertamax": 13500,
        "Pertamax Turbo": 15500,
        "Dexlite": 14500,
        "Pertamina Dex": 16000,
        "Bright Gas 5.5kg": 91000,
        "Bright Gas 12kg": 192000,
        "LPG NPSO 12kg": 185000,
    }
    for d in all_days:
        for city in CITIES:
            for product, b in base.items():
                own = b + rng.randint(-200, 300)
                for comp in COMPETITORS:
                    delta = rng.randint(-800, 1200)
                    if d.isoformat() == TRAP_PRICE_DAY and product == "Pertamax" and city == "Jakarta" and comp == "RivalEnergi":
                        delta = -2500  # competitor undercut that looks like a data error vs other cities
                    price_rows.append([
                        d.isoformat(), city, product, "own_fictional", own,
                        comp, max(1000, b + delta), "fictional_osint_pack",
                    ])
    write_csv(
        OUT / "mrp" / "competitor_prices_daily.csv",
        ["date", "city", "product", "own_source", "own_price_idr", "competitor", "competitor_price_idr", "source_type"],
        price_rows,
    )

    # --- MRP: choice-based conjoint style responses (fictional) ---
    conjoint = []
    for i in range(1, 5001):
        price_level = [0, 1, 2][i % 3]
        brand = ["own", "competitor_a", "competitor_b"][i % 3]
        loyalty = GRADES[i % 4]
        chosen = "own" if (price_level < 2 and brand == "own") or (i % 7 == 0) else brand
        if i in TRAP_CONJOINT:
            chosen = "own"
            price_level = 2
            # respondent chose highest price own-brand with text that says they would never pay it
        note = ""
        if i in TRAP_CONJOINT:
            note = "Saya tidak akan bayar harga tertinggi; opsi di kuesioner memaksa saya memilih."
        conjoint.append([
            f"CJ{i:05d}", all_days[i % len(all_days)].isoformat(), CITIES[i % len(CITIES)],
            PRODUCTS_FUEL[i % len(PRODUCTS_FUEL)], price_level, brand, loyalty, chosen, note,
        ])
    write_csv(
        OUT / "mrp" / "conjoint_price_acceptance.csv",
        ["response_id", "date", "city", "product", "price_level_0_low_2_high", "brand_in_set", "member_grade", "chosen_option", "note"],
        conjoint,
    )

    # --- MRP: MyPertamina online CSAT / loyalty survey ---
    surveys = []
    texts_ok = [
        "Poin mudah ditukar, promo akhir pekan membantu.",
        "Pembayaran di SPBU lancar.",
        "Mau lebih banyak partner tukar poin di kota saya.",
    ]
    for i in range(1, 8001):
        score = rng.randint(1, 5)
        nps = rng.randint(0, 10)
        grade = GRADES[i % 4]
        channel = ["app_push", "in_app", "email"][i % 3]
        text = rng.choice(texts_ok)
        if i in TRAP_SURVEY:
            score = 5
            nps = 9
            text = "Nilai tinggi karena diminta petugas SPBU; sebenarnya poin lambat masuk dan grading tidak jelas."
        surveys.append([
            f"SV{i:05d}", all_days[i % len(all_days)].isoformat(), channel, grade,
            PRODUCTS_FUEL[i % 4] if i % 2 == 0 else PRODUCTS_LPG[i % 3],
            score, nps, text,
        ])
    write_csv(
        OUT / "mrp" / "mypertamina_csat_loyalty.csv",
        ["response_id", "date", "channel", "member_grade", "last_product", "csat_1_to_5", "nps_0_to_10", "verbatim"],
        surveys,
    )

    # --- MRP: offline product & service evaluation ---
    offline = []
    for i in range(1, 3001):
        site = f"SPBU-{CITIES[i % len(CITIES)][:3].upper()}-{100 + (i % 40)}"
        queue = rng.randint(1, 5)
        staff = rng.randint(1, 5)
        toilet = rng.randint(1, 5)
        product_avail = rng.randint(1, 5)
        if i == 88:
            product_avail = 1
            queue = 5
        offline.append([
            f"OF{i:05d}", all_days[i % len(all_days)].isoformat(), site, CITIES[i % len(CITIES)],
            queue, staff, toilet, product_avail, "fictional_offline_form",
        ])
    write_csv(
        OUT / "mrp" / "offline_site_evaluation.csv",
        ["response_id", "date", "site_id", "city", "score_queue", "score_staff", "score_facility", "score_product_availability", "source"],
        offline,
    )

    # --- MRP: fictional price book for workshop memos ---
    price_book = {
        "note": "FICTIONAL prices for workshop only. Not real Pertamina price list.",
        "as_of": "2026-10-29",
        "fuel_jbu_idr_per_liter": {
            "Pertamax": 13500,
            "Pertamax Turbo": 15500,
            "Dexlite": 14500,
            "Pertamina Dex": 16000,
        },
        "lpg_npso_refill_idr": {
            "Bright Gas 5.5kg": 91000,
            "Bright Gas 12kg": 192000,
            "LPG NPSO 12kg": 185000,
        },
        "losses_claim_reference_idr_per_liter": {
            "note": "Fictional training reference only",
            "Pertamax": 120,
            "Dexlite": 110,
        },
    }
    (OUT / "mrp").mkdir(parents=True, exist_ok=True)
    (OUT / "mrp" / "price_book_fictional.json").write_text(
        json.dumps(price_book, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    # --- Event: national calendar seeds + media monitoring style clips ---
    events = [
        ["EV001", "2026-08-16", "2026-08-17", "MyPertamina Pasar Rakyat Fiktif", "Jakarta", "nasional", "awareness_mypertamina"],
        ["EV002", "2026-09-04", "2026-09-04", "Sapa Pelanggan SPBU 20 Kota Fiktif", "Multi-kota", "nasional", "cx_spbu"],
        ["EV003", "2026-09-20", "2026-09-22", "Aktivasi Sponsorship Otomotif Fiktif", "Tangerang", "sponsorship_holding", "fuel_series"],
        ["EV004", "2026-10-09", "2026-10-11", "Fuel The Moment SPBU Tematik Fiktif", "40 SPBU fiktif", "nasional", "motorsport_atmosphere"],
        ["EV005", "2026-10-25", "2026-10-26", "Bright Gas Roadshow Dapur Aman Fiktif", "Surabaya", "nasional", "lpg_bright_gas"],
    ]
    write_csv(
        OUT / "event" / "event_calendar_seed.csv",
        ["event_id", "start_date", "end_date", "name", "location", "type", "product_focus"],
        events,
    )

    clips = []
    media = ["Harian Nusantara", "Kanal Energi", "Portal UMKM", "Warta Daerah", "Jurnal Retail"]
    for i in range(1, 3001):
        d = all_days[i % len(all_days)]
        title = f"Liputan aktivasi retail energi di {CITIES[i % len(CITIES)]}"
        sentiment = ["positive", "neutral", "neutral", "negative"][i % 4]
        summary = "Media fiktif meliput booth, SPBU tematik, atau promo MyPertamina."
        if i in TRAP_CLIP:
            title = {
                17: "Rumor: program loyalty menimbun stok BBM di Jawa",
                900: "Sumber anonim sebut anggaran aktivasi bocor ke pihak ketiga",
                2400: "Rumor: program loyalty menimbun stok BBM di Jawa",
            }[i]
            summary = "Klaim belum terverifikasi. Jangan dijadikan fakta."
            sentiment = "negative"
        clips.append([
            f"N{i:05d}", d.isoformat(), media[i % len(media)], ["tier1", "tier2", "tier3"][i % 3],
            title, summary, sentiment, f"https://media-fiktif.example/berita/{i}",
        ])
    write_csv(
        OUT / "event" / "media_clippings.csv",
        ["clip_id", "date", "media", "tier", "title", "summary", "sentiment", "url"],
        clips,
    )

    # --- MBLP: content & loyalty history for planning ---
    posts = []
    for i in range(1, 5001):
        d = all_days[(i * 7) % len(all_days)]
        account = ACCOUNTS[i % len(ACCOUNTS)]
        pillar = CONTENT_PILLARS[i % len(CONTENT_PILLARS)]
        caption = f"Konten {pillar} untuk {account}. Ajak transaksi lewat MyPertamina."
        likes = rng.randint(50, 8000)
        comments_n = rng.randint(0, 400)
        shares = rng.randint(0, 500)
        reach = likes * rng.randint(8, 35)
        if i in TRAP_SOCIAL_POST:
            caption = "JAMINAN hemat BBM 50% atau uang kembali. Kompetitor lain boros."
            likes, comments_n, shares, reach = 12000, 1500, 900, 400000
        posts.append([
            f"P{i:05d}", d.isoformat(), account, pillar, caption, likes, comments_n, shares, reach,
        ])
    write_csv(
        OUT / "mblp" / "content_history.csv",
        ["post_id", "date", "account", "pillar", "caption", "likes", "comments", "shares", "reach"],
        posts,
    )

    comments = []
    praise = ["Poin masuk cepat.", "Promo weekend membantu.", "Event SPBU seru."]
    complaint = ["Poin saya belum masuk.", "Grading member membingungkan.", "Stok Bright Gas di SPBU kosong."]
    spam = ["DM investasi cepat!!!"]
    for i in range(1, 20001):
        text = praise[i % 3] if i % 10 < 6 else (complaint[i % 3] if i % 10 < 9 else spam[0])
        if i in TRAP_COMMENT:
            text = {
                42: "Nomor saya 0812-9999-0001, tolong hubungi soal data KTP.",
                777: "Ini hoaks, BBM akan langka karena program poin menimbun stok.",
                1500: "Menteri harus mundur, ini pencitraan.",
                8888: "JAMINAN hemat 50% itu bohong.",
                19001: "Nomor saya 0812-9999-0001, tolong hubungi soal data KTP.",
            }[i]
        comments.append([
            f"C{i:05d}", f"P{((i * 3) % 5000) + 1:05d}", all_days[i % len(all_days)].isoformat(),
            ACCOUNTS[i % 5], f"{rng.choice(FIRST)} {rng.choice(LAST)}", text,
        ])
    write_csv(
        OUT / "mblp" / "community_comments.csv",
        ["comment_id", "post_id", "date", "account", "author", "text"],
        comments,
    )

    partners = []
    for i in range(1, 121):
        partners.append([
            f"PT{i:03d}", f"Partner Fiktif {i}", ["fnb", "travel", "ecommerce", "telco"][i % 4],
            GRADES[i % 4], rng.randint(5000, 200000), "active" if i % 9 else "expiring",
        ])
    write_csv(
        OUT / "mblp" / "loyalty_partners.csv",
        ["partner_id", "name", "category", "min_grade", "redemptions_90d", "contract_status"],
        partners,
    )

    # --- Digital: daily social performance per official account ---
    social_daily = []
    for d in all_days:
        for account in ACCOUNTS:
            impressions = rng.randint(20000, 900000)
            reach = int(impressions * rng.uniform(0.35, 0.7))
            engagement = int(reach * rng.uniform(0.01, 0.08))
            clicks = int(engagement * rng.uniform(0.1, 0.4))
            ecommerce = int(clicks * rng.uniform(0.02, 0.15)) if account in {"@mypertamina", "@brightgas"} else int(clicks * 0.01)
            # planted: @dexseriesid CTR collapse mid September
            if d.isoformat() == "2026-09-20" and account == "@dexseriesid":
                engagement = max(1, engagement // 20)
                clicks = max(1, clicks // 25)
            # planted: @brightgas spike paid with zero ecommerce on trap day
            if d.isoformat() == TRAP_PRICE_DAY and account == "@brightgas":
                impressions = impressions * 5
                ecommerce = 0
            social_daily.append([
                d.isoformat(), account, impressions, reach, engagement, clicks, ecommerce,
                "organic+boost_fictional",
            ])
    write_csv(
        OUT / "digital" / "social_daily.csv",
        ["date", "account", "impressions", "reach", "engagement", "link_clicks", "ecommerce_actions", "mix"],
        social_daily,
    )

    homeless = []
    for i in range(1, 401):
        homeless.append([
            f"HM{i:04d}", CITIES[i % len(CITIES)], ["lift_lobby", "office_toilet", "apartment_corridor", "coworking"][i % 4],
            CONTENT_PILLARS[i % len(CONTENT_PILLARS)], rng.randint(7, 30), rng.randint(50, 400),
            "available" if i % 11 else "booked_other_brand",
        ])
    write_csv(
        OUT / "digital" / "homeless_media_inventory.csv",
        ["slot_id", "city", "placement", "fit_pillar", "days_available", "est_daily_footfall", "status"],
        homeless,
    )

    wa_blast = []
    for i in range(1, 61):
        sent = rng.randint(50000, 400000)
        open_r = rng.uniform(0.18, 0.45)
        click_r = rng.uniform(0.02, 0.12)
        if i == 17:
            open_r = 0.02  # trap: almost no opens
        wa_blast.append([
            f"WA{i:03d}", all_days[i % len(all_days)].isoformat(), GRADES[i % 4],
            sent, int(sent * open_r), int(sent * click_r), ["double_points", "bright_gas", "event_invite"][i % 3],
        ])
    write_csv(
        OUT / "digital" / "wa_blast_history.csv",
        ["blast_id", "date", "target_grade", "sent", "opened", "clicked", "theme"],
        wa_blast,
    )

    # legacy aliases for older prompts (thin pointers already replaced; keep samples empty skip)
    print("done")
    for p in sorted(OUT.rglob("*.csv")):
        if "generate" in str(p) or "solutions" in str(p):
            continue
        n = sum(1 for _ in p.open(encoding="utf-8")) - 1
        print(f"{n:8d}  {p.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
