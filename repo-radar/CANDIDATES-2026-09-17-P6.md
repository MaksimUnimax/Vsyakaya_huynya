# Repo Radar — Pass 6 — 2026-09-17

Scope: public repositories with opaque/generic public presentation whose contents reveal a substantially more specific, coherent project. Private-source/public-mirror repos are off-target.

Intent rule: an opaque public surface is observable; deliberate concealment from competitors is NOT asserted unless the author explicitly says so.

## Strong candidates

### spot-rail-hq/main

Public surface: repo name `main`; description only `welcome to Spot Rail HQ!`; no topics; 0 stars. Public repo created 2026-04-18.

Actual project: `srhq.uk`, a UK railway information/discovery/travel platform built around a full-screen interactive rail map. Internal project instructions identify three monetized audiences: explorers (ads/editorial sponsorships), trip planners (Trainline/Railcard affiliate intent), and active travellers (rebooking affiliate intent).

Implementation/evidence: MapLibre map; Stadia base tiles; OpenRailwayMap overlay; station GeoJSON; live departures via Realtime Trains NG API; Rail Data Marketplace incident feed; public RSS news; Vercel/serverless API wrappers to keep keys off the client. The repo contains detailed scripts/data for UK stations and historical stations, including NaPTAN/NPTG joins and special handling of Elizabeth line/DLR/Underground identities and Southampton Town Quay replacement-bus semantics.

Maturity: coherent data/modeling rules, live/departure integrations, incident polling, monetization logic, database/map pages, runbooks and historical-data research. Current public evidence is mainly Apr-Aug 2026; no earlier origin proven in this pass.

Why radar-relevant: GitHub Search shows a bland `main` repo with almost no explanatory metadata; internal docs reveal a specific product with commercial funnel and substantial UK rail-data engineering.

### LandXI-Web/Main

Public surface: repo `Main`; description null; topics empty; 0 stars; homepage null; roughly 2 GB. Current public repo created 2026-08-25; default branch `plan1-foundation`.

Actual project: a Korean geospatial/satellite-imagery and AI-analysis platform undergoing a redesign. Client/design specs describe a satellite-orbit → cloud layer → Korea terrain → service area → click-to-analysis experience, with imagery as the map base and 3D/data overlays.

Evidence of scale: an internal function inventory describes an existing `landxi7` product with roughly 35 reachable pages and ~340 UI functions. Modules include Dashboard, Data Management, Projects, Analysis Services, XI Map, support, card administration, service administration and account features. Data Management covers ECW/TIF/ZIP/SHP/XLSX, publishing layers, permissions/sharing, spatial editing and archives. Projects include AI-development projects and an 8-step workflow canvas. Dashboard tracks an AI backbone model and operational data.

Current state: the public branch is primarily a redesign/rebuild scaffold; many of the ~340 old-system functions are not yet reimplemented. Do not describe the current branch as a complete 340-function app.

Age mismatch: repo created 2026-08-25, but specs already refer to an existing `landxi7` system and client decisions dated 2026-08-21. Therefore this public repo is demonstrably a redesign workspace for an older product; exact original start date remains unknown.

Why radar-relevant: `Main` + no description/topics/0 stars hides a production-scale geospatial/AI product rewrite with customer research, screenshots, legacy-system inventory and hundreds of functions.

### jckund/test

Public surface: repo literally `test`; description null; topics empty; 0 stars; public since 2026-07-08; about 853 MB. Current default branch is unusually named `claude/nascar-page-scraper-mwi55a`.

Actual project: automated NASCAR prediction-market/sportsbook monitoring and expected-value analysis.

Kalshi layer: tracks NASCAR Winner/Top3/Top5/Top10/Top20 markets through Kalshi's public trade API. Every 15 minutes GitHub Actions collects prices/bids/asks/volume/open interest, stores snapshots/diffs and commits changes back to the repo, turning Git history into a market-price history. It watches all Cup-driver trades in the lookback window and records/alerts on large individual trades. Static GitHub Pages provides a dashboard with implied prices, moneyline odds, sparklines and activity.

Model layer: `ev_model.py` treats Kalshi tier prices as a probability distribution over finishing buckets (win, 2-3, 4-5, 6-10, 11-38). It Monte-Carlo samples 300,000 paired finishes to estimate P(driver A finishes ahead of driver B), then compares that probability with sportsbook odds and computes expected return.

Cross-market layer: `fanduel_scraper.js` launches a real Chromium browser on a GitHub Actions runner, captures FanDuel's public page JSON responses, extracts NASCAR race winner/top3/top5/top10 odds, converts American odds to implied probabilities and removes sportsbook margin by normalizing the field. It aligns the same race/drivers against Kalshi.

Alert layer: `evwatch.py` compares Kalshi tradeable YES/NO prices (including Kalshi fee) with an external no-vig model/book probability and raises alerts above a configured EV threshold (default 30%). It deduplicates by series/tier/driver/side/price-band and can send Pushover/webhook/GitHub notifications.

Maturity: not merely a scraper; it has durable data state, automated collection, cross-market normalization, probability simulation, expected-value calculation, price-band alert dedup and a live dashboard. Public history visible for a little over two months in this repo; earlier origin not established.

Why radar-relevant: almost perfect surface mismatch — `test`, no description, 0 stars — while the repo is an automated sports-market research/monitoring system.

### coachofanalytics/dev

Public surface: repo `dev`; description null; topics empty; 2 stars. Public since 2020-01-24 and still pushed in Sep 2026 — ~6 years 8 months of visible history.

Actual project: a long-running Django platform combining data-analytics/science coaching/training with investment/options tooling and client/investor functionality.

Education/career side: code contains mock-interview flows, coach profiles, course materials and pages for "EXPERTS FOR DATA ANALYTICS/SCIENCE".

Finance side: the `investing` app has models for investments and investor contracts, protected capital, invested amounts, bi-weekly returns, investment-rate plans, ticker fundamentals/risk measures, credit spreads, short puts, covered calls, oversold/overbought screening and options returns.

Interpretation: this looks more like a broad operational platform grown over years than a single clean modern product. The exact commercial boundary between coaching and investment tooling is not fully established in this pass.

Security hygiene note: old integration artifacts include credential/token-looking file paths. Do not reproduce values; any live credentials in a public repo should be revoked/rotated by the owner.

Why radar-relevant: extremely long-lived public repo named only `dev` with no description/topics, while inside is a multi-module business platform.

### Smile-Wifi/Main

Public surface: repo `Main`; description null; topics empty; 0 stars. Public since 2025-10-27 (~11 months). Owner name gives some clue (`Smile-Wifi`) but the repo card does not explain the product.

Actual project: `Smile Wifi — Offline Local Portal`, effectively a local-network "mini internet" / PWA for cafés, campuses or community Wi-Fi where users may have little or no WAN internet.

Functionality: service worker + offline cache; local app grid; local media/video/advertising; central search; admin panel; weather/games/news/content; APK distribution. Listed local services include SmileFlix, PublicDoc, Musify, sports, eBooks, local business, SmileNews and others. Repo also contains an Android app bundle, Netlify config/functions, data/media/news/pages and admin UI.

Interpretation: rather than giving every client unrestricted internet, a local Wi-Fi network can expose a curated portal of cached/local tools and entertainment, still working offline. The architecture could suit schools/campuses/community hotspots, but actual deployments/business scale were not established in this pass.

Why radar-relevant: medium-strength mask — name is generic and metadata empty, but the account name and README reveal the idea once opened.

## Borderline / interesting but weaker mask

### ASPECT-pipeline/main

Scientific data pipeline for the ESA Hera mission ASPECT hyperspectral instrument: Level 0/1/2 calibration, Level 3 composition/taxonomy analysis including neural-network and MGM methods, FITS outputs and Hera SPICE geometry. Technically fascinating and large, but owner/repo naming (`ASPECT-pipeline`) already reveals much of the purpose, so it is not a strong camouflage hit.

## Rejected / noise checked in this pass

- `unrealersnidhi-hub/main` — ERPNext/upstream-derived source; not a unique hidden project.
- `philh-myftp-biz/Main` — home-lab/backup collection (AI, Plex, Minecraft, VMs, website), not one coherent product.
- `Ritornelle/main` — mostly static albums/films site.
- `Nerovix/tmp` — Linux-kernel tree/copy, not a distinct product.
- `kbmedphys/tmp` — temporary upload/delete scratchpad; current root essentially empty.
- `WLO2025/main` — young static site, no compelling coherent hidden system established.
- `boasislab/main` — description explicitly says forest-guide exam study-material sharing; not hidden.
- `SFN-eu/tmp` — depth-map/artifact dump; no coherent product established.
- `medticc/tmp` — personal portfolio.
- `blitzprecision/tmp` — large annotation/prompt/output dump; coherent product not established.
- `DruvJ/test` — huge multi-project/prototype/archive collection (`CognitiveCanvas`, invoicing/PWA, etc.), but current evidence looks like a container of separate experiments rather than one disguised coherent product.

## Search-method update

High-yield signals from this pass:

1. Inspect default branch name as well as repo name. A generic repo whose default branch names a real task/product can leak the hidden purpose.
2. Compare public `created_at` with internal specs/changelog/client-meeting dates and references to legacy systems.
3. Look for automated data collection that commits state back to Git — these repos may use GitHub simultaneously as code host, scheduler, datastore and history.
4. A vague README is less important than deep control files (`CLAUDE.md`, design specs, runbooks, function inventories), which often reveal the real product, monetization and data sources.
