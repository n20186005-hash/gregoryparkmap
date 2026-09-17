# Gregory Park content notes

## Entity binding variables (single source of truth: `src/data/attraction.ts`)

| Variable | Value used on this site |
| --- | --- |
| `{{DOMAIN_NAME}}` | `gregoryparkmap.com` |
| `{{ATTRACTION_FULL_NAME}}` | `Gregory Park` (name as published on the Google Maps listing) |
| `{{ATTRACTION_SHORT_NAME}}` | `Gregory Park` (the name the domain maps to; aliases: `Gregory Park Nuwara Eliya`, `Nuwara Eliya Gregory Park`, `Gregory Lake Park`) |
| `{{CITY_NAME}}` | `Nuwara Eliya` |
| `{{STATE_PROVINCE}}` | `Central Province` |
| `{{COUNTRY_NAME}}` | `Sri Lanka` |
| `{{COUNTRY_CODE_2LETTER}}` | `LK` |
| `{{POSTAL_CODE}}` | `22200` |
| `{{LATITUDE}}` / `{{LONGITUDE}}` | `6.9567875` / `80.777390625` (derived from Plus Code `XQ4G+PX6`, ≈40 m resolution — not survey grade) |
| `{{MAPS_SHARE_URL}}` | `https://maps.app.goo.gl/GeS1xbW7J6xB2xKUA` |
| `{{MAPS_EMBED_SRC}}` | `https://www.google.com/maps?q=Gregory+Park%2C+Nuwara+Eliya%2C+Sri+Lanka&output=embed&hl=si-LK&gl=lk` |
| `{{NEARBY_LANDMARK_1}}` / `{{NEARBY_LANDMARK_2}}` | `Lake Gregory` / `Victoria Park` |
| `{{GOVT_TOURISM_URL}}` | `https://www.sltda.gov.lk/` (Sri Lanka Tourism Development Authority, a `.gov.lk` portal) |

Swap those values to reuse the page for another single-attraction site.

## Rating and reviews (Google Maps, September 2026 snapshot)

- Supplied by the site owner: **4.5 / 5** from **16,447** Google Maps user reviews.
- Shown on the page in three places: the "facts" band (`4.5 / 5` + small print), the reviews block
  (`#reviews`) and the sources block (`#sources`).
- Attribution strings are fixed by the publisher:
  - Small print under the rating: `评分与评价数同步自谷歌地图（Google Maps）用户评价 · 2026 年 9 月 · 点击查看谷歌地图全部评价↗`
  - Reviews block + sources block: `同步自 Google 地图用户评价，同步时间 2026 年 9 月；版权归原作者与 Google 地图所有`
  - Reviews button: `在谷歌地图查看全部评价`
- **Ratings/reviews are page content only.** No `aggregateRating`, `ratingValue` or `Review` nodes are emitted in
  JSON-LD (by design, to avoid misusing Google review content). The reviews section links out to Google Maps,
  keeps every Google URL live, and reproduces no review text — only a clearly labelled summary of recurring
  themes ("非原文引用").

## Structured data (in `src/layouts/Layout.astro`)

- `TouristAttraction` + `Park` with `@id`, `alternateName`, `address` (incl. `addressRegion`), `geo`, `hasMap`,
  `sameAs` (Google Maps + official tourism portal), `image` list and `openingHoursSpecification`.
- `isAccessibleForFree: false` — public sources sell Gregory Park / Lake Gregory entrance tickets, and the page
  FAQ says the park entrance and lake activities may be ticketed separately, so "free" would be inaccurate.
- `WebSite` and `BreadcrumbList` nodes anchor the domain to the entity
  (`Gregory Park (Nuwara Eliya) → Nuwara Eliya → Central Province → Sri Lanka`).
- `FAQPage` mirrors the FAQ text that is actually visible on the page (7 Sinhala + 4 English entries).
  The previous Chinese-only FAQ markup did not match the visible Sinhala content, which risks a structured-data
  mismatch, so it was replaced with the visible text.

## SEO surface

- Canonical, `og:*`, `twitter:*`, `robots` (max-image-preview), `geo.position` / `geo.placename` / `ICBM`.
- English entity sections with the required H1/H2 hierarchy: `About Gregory Park`,
  `Location & How to Visit Gregory Park in Nuwara Eliya`, `Landmarks & Attractions Around Gregory Park`,
  `History & Significance of Gregory Park`.
- Every image alt starts with the entity name (English) and keeps the original Sinhala description.
- `astro.config.mjs` falls back to `https://gregoryparkmap.com` so canonical/OG/sitemap URLs are absolute even
  when `PUBLIC_SITE_URL` is not set.

## PWA

- `public/manifest.webmanifest` (standalone, theme `#173f3b`, shortcuts to `#map`, `#reviews`, `#faq`).
- `public/sw.js`: install-time app shell, network-first navigations with cached shell fallback,
  cache-first-with-refresh for `/_astro`, `/images`, `/icons`, and `public/offline.html` as the offline page.
- Registration happens in `Layout.astro` and only in production builds.
- Icons in `public/icons` are generated with `node scripts/generate-icons.mjs` (pure Node, no dependencies) —
  a copper "G" on forest green, matching the hero stamp.

## Content sources

- Map short link provided by the owner: https://maps.app.goo.gl/GeS1xbW7J6xB2xKUA
- Address pin: XQ4G+PX6, Peradeniya-Badulla-Chenkaladi Hwy, Nuwara Eliya 22200, Sri Lanka
- Public guide source (accessed during build): Trip.com says open 06:00–18:00, suggested 1–3 hours,
  family-friendly; activities include lakeside walking, boating, pony rides, cycling, picnic lawns and snacks.
- Nuwara Eliya guide source: https://travelwithanjaly.com/nuwara-eliya-travel-guide/ (Gregory Lake created in
  1873; boat/jet ski, picnics, ponies; nearby Victoria Park, tea outlets, Horton Plains, waterfalls; local foods.)
- GetYourGuide source: https://www.getyourguide.com/en-gb/lake-gregory-l148101/ (lake activity framing,
  4.8/5 on 924 reviews for that listing, 1–2 hour average activity; not treated as an official Gregory Park rating.)
- Entrance-fee references: Lakpura Gregory Lake entrance tickets, TravelTriangle Lake Gregory entry-fee page.
- Design direction: cool highland / colonial garden editorial. Moss green, lake blue, warm copper. Sinhala is the
  main site language (the attraction is in Sri Lanka); English is used for the entity/SEO sections and PWA metadata.
- Image sources: Wikimedia Commons, downloaded locally into `public/images`. Visible source credit link in footer.
- Disclaimer: unofficial visitor guide; hours, fees, activities and access can change; verify locally before travel.

## New visitor-guide sections (non-profit science tone)

All new copy lives in `src/data/visitor-guide.ts`; the rendered blocks are in
`src/components/WeatherPanel.astro`, `src/components/TravelSections.astro` and
`src/components/ServicesSections.astro`, wired into `src/pages/index.astro`.

- **Live weather (`#weather`)** — Server Component (`output: 'server'`). Fetches a 7-day outlook at
  request time on the Cloudflare Worker and caches it (in-memory + `Cache-Control` with `s-maxage`) so
  visitors are not re-fetched on every navigation. Falls back to the current month's 30-year climate
  normals when the upstream call fails — never to invented numbers. The visitor-facing copy only answers
  "is it raining / should I bring an umbrella"; no provider, no "free / no key" wording appears on the page.
  Attribution is a single neutral Sources row (`Open-Meteo (CC BY 4.0)`), with none of the prohibited
  comment phrases.
- **Advice engine (`src/lib/weather-advice.ts`)** — the weather module now outputs *actions, not numbers*.
  Rules read condition / temps / wind & gusts / UV / rain probability and emit short bilingual
  (Sinhala + English) items in four blocks: **⚠️ risks** (thunder, heavy rain ≥70 % & ≥10 mm, gusts ≥50 km/h,
  fog, cold night ≤6 °C — rendered topmost in red, with a link to meteo.gov.lk for official advisories),
  **wear** (day–night swing ≥8 °C, max ≤15 °C, rain likely, sunny-cool), **do** (boats/pony rides pause in
  heavy rain → tea factory, slippery lawns, breezy checks, clear-sky best windows, UV ≥5), and **carry**
  (rain jacket vs umbrella depending on wind, sun kit, warm layers, default water bottle). Unmet rules are
  hidden entirely (verified live: UV=1 suppressed the sun items); probability wording stays "likely/අවකාශය",
  never "will rain". Data fields extended with current `uv_index` and daily `uv_index_max`; the base card now
  shows rain chance, UV level and wind gusts in plain language.
- **Seasonal strategy (`#seasons`)** — a 5-column table (Period / Weather / Lake & water / Wildlife /
  Strategy) built from the Sri Lanka Department of Meteorology 1991–2020 normals, replacing the
  NOAA/FWC US-template wording with local climate-state language.
- **Getting there (`#transport`)** — airport → Colombo → Nanu Oya train + tuk-tuk, intercity bus, private
  car/SUV, plus "no commercial airport" note; final local legs (town → park, Nanu Oya → town, from Kandy/Ella).
- **Routes (`#routes`)** — 3 audience plans (families / photography / low-mobility) + half-day and full-day
  templates. Kept neutral; no business names.
- **Visitor services (`#facilities`)** — type-neutral WC / parking / food / stay / shops / fuel & EV /
  cash / medical, so it reads as a planning overview, not a vendor list.
- **Science & responsibility (`#responsibility`)** — what the lake is, the 2026 CEA water-quality finding
  (phosphate / nitrogen / BOD, quoted as secondary reporting) and 6 visitor-responsibility points.
- **History expansion** — inside the existing `#guide` History block: a 1818→today timeline (Dr John Davy,
  Samuel Baker, the 1873 reservoir named for Gov. William Gregory, Victoria Park) plus a clearly-labelled
  "Stories & legends" box (Ramayana / Hakgala / Seetha Amman) marked as tradition, not established history.
- **FAQ + JSON-LD** — 4 new Sinhala + 4 new English Q&A (weather/best season, airport route, facilities,
  swim/drink) that mirror visible sections; total 19 questions in `FAQPage`. `TouristAttraction` now also
  carries `publicAccess: true` and `amenityFeature` (toilets, parking, food vendors, lawns, boats, play area).
- **Section kickers renumbered** 01–17 (story, weather, guide[EN], seasons, transport, routes, facts,
  itinerary, food, details, facilities, responsibility, nearby, map, faq, reviews, sources).

## Files ignored for the repo / deploy

- `.gitignore` covers `node_modules`, `dist`, `.astro`, `.wrangler/`, `wrangler.toml`, `.dev.vars`,
  `*.log`, `.DS_Store`, etc.
- For the Cloudflare Workers assets upload, the `@astrojs/cloudflare` adapter auto-generates
  `dist/client/.assetsignore` (it currently lists `wrangler.json` and `.dev.vars`); those are skipped on
  upload, so no extra ignore file is needed there. Manual deploy flow is `astro build` then `wrangler deploy`.

