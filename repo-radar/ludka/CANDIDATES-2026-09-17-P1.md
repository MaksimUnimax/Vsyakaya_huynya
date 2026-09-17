# Лудка — Candidates P1 — 2026-09-17

Первый отдельный проход после выделения ветки `лудка`.

Цель не собрать все GitHub-репозитории со словом arbitrage, а найти public repos, где можно восстановить мыслительный процесс разработчика и независимо проверять гипотезы/сигналы/результаты.

## A. Сильные кандидаты — углублять

### 1. routsiddharth/vela

URL: https://github.com/routsiddharth/vela
Public: да.
Domain: Kalshi short-dated BTC/ETH prediction markets.
Тип: structural mispricing + live execution + live research dataset.

Тезис автора необычный и конкретный. Короткие Kalshi crypto contracts settle не по последнему тику, а по среднему 60 samples за финальные 60 секунд. Когда большая часть samples уже зафиксирована, итоговая средняя иногда почти определена, а order book продолжает торговать контракт как будто последний тик всё ещё решает исход. Vela реконструирует settlement TWAP из Binance 1s feed, онлайн корректирует Binance→CF-index bias, оценивает p(side wins), затем покупает только когда расчётный EV после fees проходит gate.

README заявляет live real-capital result после bankroll reset 2026-06-18:
- +$20.23 realized PnL;
- 210 traded windows;
- 205 W / 5 L = 97.6% hit rate;
- indexed equity ≈1.40x;
- сам автор подчёркивает per-window t-stat ≈1.0 и прямо пишет, что результат пока statistically insignificant.

Это очень сильный кандидат для нашей задачи, потому что автор не продаёт hit-rate как доказанный edge. Он отдельно называет left-skewed payoff, rare large losses, HAC/block-bootstrap/calibration/fill-conditional adverse selection как нерешённые вопросы.

Архитектура содержит live broker, Kalshi WS/book, Binance de-bias, projection model, SQLite stores, backtests, analysis scripts и основной analysis notebook.

Важно: README описывает `livepaper/data_btc/paper.db` и run logs, но прямой GitHub contents probe `livepaper/data_btc` вернул 404. Значит надо отдельно установить, что из live raw evidence реально committed, а что существует только локально у автора. README/PnL script ещё не равны независимо воспроизводимой статистике.

Следующий аудит:
1. `scripts/pnl_report.py` — откуда именно он берёт realized PnL.
2. notebook — можно ли воспроизвести 210 windows из committed evidence.
3. exact settlement reconstruction: timestamps/sampling/de-bias causality.
4. maker/taker fill timestamps против decision timestamps.
5. loss distribution: почему 97.6% hit rate даёт всего +$20.23 и какой размер rare loss.
6. fillability/queue position и потенциальный adverse-selection bias.

### 2. charlieyang1557/polymarket-arb

URL: https://github.com/charlieyang1557/polymarket-arb
Public: да.
Domain: Polymarket US + Kalshi; sports prediction markets.
Тип: market making / calibration / cross-market research / live fills.

Один из лучших кандидатов именно для наблюдения за мыслительной работой автора, потому что итог исследования отрицательный.

README фиксирует реальный live период Mar 10 – May 16 2026:
- capital deployed $28.03;
- final balance $28.68 (+$0.65);
- 36 maker fills across 5 sessions;
- 4 strategies tested — all negative or neutral EV;
- ~190 commits;
- 656 unit tests / 37 test files.

Главный вывод автора: проблема retail market making — adverse selection. YES-side fills у него теряли ~4.62c/contract при WR 43.9%, NO-side были +2.31c/contract при WR 51.3%; fill ratio 209 YES / 117 NO. То есть bot систематически получал больше исполнения на худшей стороне.

Отдельные провалившиеся гипотезы:
1. passive pre-game market making — spread capture съедается informed flow;
2. Pinnacle de-vig calibration — рынок сходится примерно в ±0.8%, edge не найден;
3. correlated-market lag — direction accuracy около coin flip, negative simulated PnL;
4. WebSocket momentum/event strategy — abandoned после результатов 1–3.

Сильная evidence база по описанию:
- 326 live fills в round-trip simulator;
- 350K+ orderbook snapshots across 59 events;
- fill detection через exchange activities;
- exact risk stack;
- kill-condition tracker, который должен сам закрыть исследовательскую линию при недостаточном round-trip rate.

Следующий аудит:
- committed DB/snapshots/results vs README claims;
- full project report;
- reconstruct one live session from orders/fills;
- проверить, как 36 maker fills соотносятся с 326 live fills в simulator;
- разделить realized account PnL и counterfactual simulator outputs.

### 3. tanamsethi31/footymodel

URL: https://github.com/tanamsethi31/footymodel
Public: да.
Domain: football value betting / bookmaker market efficiency.
Тип: long-running research program; Dixon-Coles/xG/lineup models, walk-forward, CLV.

На момент первичного просмотра GitHub показывал 412 commits. `RESULTS.md` особенно ценен тем, что автор многократно проверяет и затем убивает собственные гипотезы.

Основная goals-only модель:
- test 2022-07 → 2025-06;
- 8,972 value bets;
- pooled yield -11.7%;
- хорошо calibrated globally, но overconfident именно там, где спорит с market;
- opening-line CLV pooled -0.63%, beat-close only 45.4%.

xG улучшил calibration, но не создал edge. Line shopping оказался крупнейшим реальным рычагом: best-price O/U поднял result примерно с -9% до -2.56%, т.е. около 6.4 percentage points recovered, но всё равно не сделал стратегию прибыльной.

Дальше автор тестирует lineups. Первый Premier League effect выглядел перспективно, но big-5 replication его сильно ослабила — автор прямо назвал это classic overfitting-to-first-dataset signature. `RESULTS.md` затем продолжает работу с full-lineup attack+defence; этот хвост надо дочитать полностью перед выводом о текущем состоянии.

Очень хороший кандидат не как «готовая ставка», а как журнал борьбы модели с efficient market.

Следующий аудит:
- дочитать весь latest `RESULTS.md`;
- восстановить chronology commits/phase transitions;
- проверить, какие backtest results/data committed;
- проверить line-shopping assumption: best historical price действительно available/causal или идеализированный ceiling;
- посмотреть forward/live инфраструктуру, если она уже появилась.

### 4. santzmr/funding-rate-arbitrage

URL: https://github.com/santzmr/funding-rate-arbitrage
Public: да.
Domain: BTC perpetual funding carry.
Тип: research/backtest of delta-neutral funding-rate thesis.

Маленький repo (первичный GitHub search показывал 2 commits), но логика очень прозрачная и поэтому полезная.

Data: Binance BTCUSDT Jan 2023 – Jul 2026, 3,912 observations at 8h funding cadence.

Результат автора:
- funding is stationary / mean-reverting;
- не предсказывает future perp returns на проверенных горизонтах;
- delta-neutral strategy при taker fees: -1.52% за ~3.5 years, 33 trades, 21% win rate;
- без fees те же trades: +5.20%;
- maker-fee sensitivity делает большую часть grid положительной, best cell +3.57%;
- главный вывод: execution cost важнее entry threshold.

Особенно ценная деталь: автор нашёл собственную временную ошибку. Klines были indexed by open_time, хотя для funding timestamp нужен candle close; старый вариант фактически сдвигал price series на 8 hours. Он это документирует.

Следующий аудит:
- проверить исправленный alignment код;
- reproduce result tables;
- test maker assumption против реальной fill probability;
- сравнить planned cross-exchange funding differential extension с текущей single-exchange logic.

### 5. GasparCoquet/pairs-trading-backtest

URL: https://github.com/GasparCoquet/pairs-trading-backtest
Public: да.
Domain: US equities statistical arbitrage / cointegration pairs.
Тип: post-mortem одного ложного edge.

Очень сильный кандидат именно как история ошибки разработчика.

Repo раньше заявлял Sharpe 0.96, CAGR 10.38%, MaxDD 9.96%. Автор затем выяснил, что `fetch_prices()` при failure Yahoo Finance молча переходил на `generate_synthetic_prices()`. Synthetic generator сам создавал пары с injected AR(1) mean-reverting spread. Стратегия буквально «находила» ту cointegration, которую её же генератор построил.

После реальных данных:
- Sharpe 0.07;
- CAGR -0.61%;
- MaxDD 40.46%;
- worst day -18.65%;
- total return -3.30%.

Дальше автор нашёл ещё две методологические проблемы:
1. 45 cointegration tests/window без multiple-testing correction. Under null expected 2.25 false rejections; observed Engle-Granger uncorrected = 2.27/window — почти буквально шум.
2. «confirmation ADF» использовал неверные critical values на fitted residuals и фактически ничего не фильтровал.
3. normal exit-only logic не имела stop-loss; первая реализация stop-loss тоже оказалась buggy, потому что сразу повторно входила в тот же spread.

После Benjamini-Hochberg остаётся всего 2 pair-windows, 10/11 windows сидят в cash. Автор прямо заключает: edge исчез; corrected strategy почти не торгует, потому что торговать нечего.

Отдельно очень ценно, что broken code paths сохранены за flags для воспроизводимости ошибок.

Следующий аудит:
- commit history before/after correction;
- проверить claimed original README через Git history;
- запустить mental/code audit multiple-testing pipeline;
- посмотреть, были ли ошибки найдены самим автором или после внешнего review (issues/PR history).

### 6. himnishpersonal/arb-trading-bot

URL: https://github.com/himnishpersonal/arb-trading-bot
Public search result: public GitHub page доступна.
Domain: Kalshi ↔ Polymarket cross-venue arbitrage.
Тип: paper execution / quote persistence / semantic market matching.

Это пока не доказанный edge, но инженерно хороший reference:
- live market ingestion;
- normalized schema;
- market matching with title/token/rules/category similarity;
- hard filters for close-date, numeric threshold, entity/team and settlement wording mismatches;
- both YES/NO cross-venue directions;
- fee/slippage/depth gates;
- SQL tables for quotes, opportunities, execution batches, fills, positions and PnL snapshots;
- quote-history backtest;
- live trading deliberately disabled.

Полезен как contrast к `jckund/test`: здесь автор уже понимает, что market equivalence itself is a dangerous part of arbitrage and требует confirm/reject workflow.

Следующий аудит: есть ли committed historical quotes/backtest reports или repo пока только framework.

### 7. aayanvatsa04/btc-perpetual-funding-arbitrage

URL: https://github.com/aayanvatsa04/btc-perpetual-funding-arbitrage
Public: да.
Domain: BTC perp funding carry.
Тип: Ornstein-Uhlenbeck signal + delta-neutral carry + 2-year walk-forward + live paper bot.

README/search claims real Bybit history, walk-forward backtest and outputs:
`backtest_trades.csv`, `equity_curve.csv`, `paper_trades.csv`, `paper_bot.log`.

Нужно проверить, находятся ли эти result files реально в public tree и являются ли они captured runs, а не только ожидаемыми generated outputs. Пока medium-priority candidate.

## B. Adversarial candidates — красивые claims, сначала пытаться сломать

### oddsflowai-team/oddsflow-ai-football-value-signals

Search surfaced a `PERFORMANCE.md` claiming 3,181 bets, 57.4% hit rate and 38.5% ROI, with several Monte-Carlo variants around 47–51% ROI. Это аномально высокие цифры для футбольных рынков.

Не принимать как результат. Напротив, кандидат интересен именно для adversarial audit:
- source of odds;
- timestamp causality;
- duplicated/overlapping bets;
- outcome leakage;
- whether stake/profit arithmetic uses actual quoted limits/prices;
- in-sample model selection;
- settlement rules;
- whether 600 matches can legitimately yield 3,181 economically independent bets.

### PandaXPanther/pandaxpanther-prediction-bot

README/search claims four concurrent strategies: structural arb, cross-venue arb, crypto latency (Polymarket lag vs Binance/Coinbase), NOAA weather model; positions/fills/PnL persisted to Postgres.

Слишком много attractive claims в одном repo. Не считать strong candidate до проверки actual history/data/results. Но если там есть committed execution evidence, может стать очень интересным.

### ImMike/polymarket-arbitrage

README claims simulation mode 99.6% win rate and $573 profit. Пока low-confidence: simulated win rate почти ничего не доказывает. Проверять только если есть real quote history, realistic matching and actual settlement replay.

## C. Инженерно интересные, но пока без доказанного outcome layer

### PalashAwasthi05/stable-arb-bot

Stablecoin cross-exchange scanner/simulator. Важный плюс — пишет multi-level orderbook snapshots, replay учитывает `price_ttl_ms`, partial fills и depth. Может быть полезен как reference по честному execution simulation даже если нет реальных PnL.

### vincentdamato/OptionArbitrage

Options scanner: put-call parity, box, butterfly, vertical/calendar anomalies, IV/skew, Schwab live chain, transaction/slippage backtest. Нужно доказать, что repo содержит настоящие historical scans/results, а не только framework.

### TemiKayode/parallax

Kalshi/Polymarket Rust stat-arb/risk-gated market-making reference implementation. Search describes tested live quote ingestion but intentionally incomplete live order submission. Полезно для архитектуры, меньше для outcome research, пока нет real fills.

## D. Низкий приоритет / noise этого прохода

- `tswaim/polymarket-kalshi-arbitrage-bot`: на момент search всего 1 commit. Сильный README, слабая исследовательская история.
- `arbbets/Prediction-Market-Arbitrage`: 2 commits, фактически README-level project.
- `bcosm/hoops-spread`: web search surfaced rich backtest claims, но GitHub connector `get_repo` сейчас возвращает 404. Не использовать до повторного обнаружения реального public source.
- generic old triangular-arbitrage bots без preserved outcomes: не удалять навсегда, но они ниже приоритета, чем repos с falsifiable research trail.

## P1 вывод

Новый трек уже подтверждает, что самый интересный класс — не «бот обещает прибыль», а **repo как лабораторный журнал**.

Текущий first-depth set:
1. `routsiddharth/vela` — проверить claimed live structural edge;
2. `charlieyang1557/polymarket-arb` — разобрать реальный провал market-making hypotheses;
3. `tanamsethi31/footymodel` — проследить длинную цепочку гипотеза → тест → no-go → новая гипотеза;
4. `GasparCoquet/pairs-trading-backtest` — разобрать anatomy of false alpha;
5. `santzmr/funding-rate-arbitrage` — fees/alignment/execution turn theoretical carry into loss;
6. вернуться к `jckund/test` как исходному эталону и закончить contract-level verification Top3-NO anomaly.

Следующие поисковые проходы должны расширять домены, а не клонировать P1: sports exchanges, bookmaker cross-book arb, politics/election forecasting, weather/event contracts, options parity, volatility, FX, commodity spreads, crypto basis/funding, market-making, alternative-data models.