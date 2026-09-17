# Лудка — discovery pass P3 — полные карточки просмотренных repos

Дата: 2026-09-17

Жёсткое правило этого файла: каждый осмысленно просмотренный repo описывается человеческим языком. Никакая запись здесь не означает `INTERESTING`; только владелец может явно перенести repo в `INTERESTING_REPOS.md`.

---

## 1. `mpatout/kalshi-market-research`

URL: https://github.com/mpatout/kalshi-market-research

Статус P3: **STRONG CANDIDATE / ADVERSARIAL FILL AUDIT NEEDED / NOT PROMOTED**

### Footprint

- PUBLIC.
- Создан: 2026-09-10.
- Последний public push при просмотре: 2026-09-11.
- Stars: 0.
- Forks: 0.
- Watchers: 0.
- Python, ~3.7 MB.

### Что это простыми словами

Автор исследовал около 75 тысяч уже завершённых Kalshi markets и ищет повторяющиеся случаи, где участники систематически слишком дорого покупают маловероятные исходы.

Главная гипотеза на S&P 500 daily markets `KXINXU`: контракты, которые стоят примерно 5–12 центов, выигрывают заметно реже, чем подразумевает цена. Если рынок продаёт шанс как 5–12%, а фактическая частота побед ближе к 2–4%, пассивный продавец таких `YES` теоретически получает премию за чужой оптимизм / любовь к дешёвым лотерейным билетам.

Это не прогноз направления S&P. Это гипотеза о **longshot bias**: люди переплачивают за маленький шанс большого выигрыша.

### Какие стратегии исследуются

**Financials A — Intraday Yield Farm.** Пассивно продавать `YES` в 5–12c только в `KXINXU` внутри активной части дня. Автор сам пишет, что главный риск — execution bias: resting order могут заполнять преимущественно тогда, когда рынок действительно идёт против продавца.

**Financials B — Ceiling Trap.** Если дешёвый контракт внезапно улетает к 97–99c, продавать эту панику. Автор пишет, что исторически большинство таких surges потом не подтверждались, но отдельно отмечает massive adverse selection, коррелированные редкие убытки и ложность предположения о независимости событий.

**NCAA A/B.** Продавать переоценённые comeback-сценарии до halftime или в halftime. В документации прямо отмечены смешение разных типов рынков, low fill rates, game-state dependence и то, что «zero risk» предположение неверно.

**Spotify.** Аналогичный longshot/fandom bias в streaming markets; автор сам считает dataset маленьким и artist-level выводы ненадёжными.

### Данные и цепочка

1. Берутся settled Kalshi markets.
2. Для каждого рынка тянутся 1-minute candlesticks.
3. Строятся price-band / surge / reversal статистики.
4. Результат settlement известен, поэтому можно сравнить цену и фактический исход.
5. Maker fee моделируется формулой `ceil_cent(0.0175 * C * P * (1-P))`.
6. Выходом служат trade-level / market-level CSV, daily strategy CSV и агрегированные отчёты.
7. Затем Monte Carlo слой пытается распределять bankroll с учётом lockup, overlap и fill uncertainty.
8. Есть `live_bot`, который потребляет экспортированные правила и по умолчанию остаётся demo.

### Что реально сохранено

В отличие от многих README-only проектов, repo содержит:

- большой `pre_mc_backtests/MCBacktest.py`;
- `pre mc backtests daily strat.csv`;
- `pre mc output.txt`;
- отдельные financials/NCAA/Spotify outputs;
- `pre mc backtests final report.txt`.

Raw trade CSV около 46 MB регенерируется и не закоммичен целиком, но производные результаты и код расчёта публичны.

### Красивые headline results — пока НЕ принимаем

Committed report заявляет base scenario примерно:

- Financials: 49,599 markets, PnL ~$256k, ROI 24.74%;
- NCAA: 25,654 markets, PnL ~$455k, ROI 17.64%;
- Spotify: 688 markets, PnL ~$28k, ROI 43.02%.

Эти цифры требуют жёсткой проверки исполнения.

### Главная найденная нами проблема

Backtester задаёт fill-capture сценарии:

- optimistic = 100% observed candle volume;
- base = 25%;
- conservative = 10%.

Для selling-YES PnL на одной штуке считается как цена продажи минус fee минус $1, если YES в итоге выиграл. Затем и PnL, и требуемый margin умножаются на **observed 1-minute candle volume × assumed capture fraction**.

То есть base headline фактически говорит:

> «предположим, что наш resting maker смог забрать 25% всего наблюдаемого minute volume в тех свечах, которые подходят стратегии».

Это НЕ доказанный fill rate и НЕ queue simulation.

Более того, если и PnL, и margin масштабируются одной и той же capture fraction, ROI почти не меняется между 100% / 25% / 10%. Поэтому высокий ROI сам по себе не подтверждает исполнимость.

### Почему repo всё равно очень интересен

Автор сам понимает проблему и прямо пишет, что fill-adjusted performance critical, adverse selection massive, losses correlated, independence false. То есть это не случай, где автор слепо верит headline. Есть большой historical corpus, рабочая модель fees, сохранённые outputs и явное признание самого слабого места.

### Следующий аудит

Нужно воспроизвести Financials A/B из committed outputs и заменить `volume × 25%` на более честную fill model:

`resting price -> trade-through / touch -> queue ahead -> actual candle trades at/through level -> fill probability -> outcome -> fee -> clustered daily PnL`.

Особенно проверить, не считается ли весь candle volume доступным нашему side/price независимо от направления агрессора.

---

## 2. `mifisher/kalshi-weather-bot`

URL: https://github.com/mifisher/kalshi-weather-bot

Статус P3: **STRONG NEGATIVE-RESULT CANDIDATE / NOT PROMOTED**

### Footprint

- PUBLIC.
- Создан: 2026-07-28.
- Последний push: 2026-07-29.
- Stars: 1.
- Forks: 0.
- Watchers: 1.
- Python, небольшой repo.

### Что автор хотел сделать

Торговать Kalshi daily high-temperature markets. Например контракт может платить $1, если дневной максимум в Miami окажется выше заданной температуры.

Автор не просит LLM «угадать погоду». Он:

1. читает settlement rules и определяет точную NWS station;
2. берёт archived weather guidance;
3. оценивает вероятность каждого strike;
4. сравнивает её с реальной исторической Kalshi котировкой;
5. торгует только если edge переживает fees и reserve;
6. применяет жёсткие deterministic risk limits.

Ранняя версия использовала LLM в decision layer, но автор убрал его из execution path и заменил deterministic evaluator.

### Почему модель выглядит статистически умной

В 8 из 8 station/lead cells она обгоняет climatology по Brier score: примерно 0.065–0.15 против ~0.25. То есть прогноз погоды действительно информативнее тупого климатического baseline.

Но это не означает, что прогноз лучше **рынка**.

### Самый важный результат

Автор делает отдельный walk-forward backtest против **реальных historical Kalshi bid/ask**. Для каждого дня training содержит только target dates строго раньше текущего. Три модели:

- empirical historical forecast errors;
- raw ensemble;
- bias/spread calibrated ensemble.

Все три находят на бумаге примерно +15–18c expected edge на выбранную сделку.

Но фактически примерно на **950 simulated trades** каждая даёт около **−3…−4c на сделку после fees**.

То есть проект демонстрирует прекрасный урок:

> `лучше climatology` != `лучше рыночной цены`.

### Причём backtest ещё оптимистичен

Код прямо предупреждает: он предполагает, что passive order на best bid **всегда исполняется**. В реальности maker исполняют именно в неблагоприятные моменты; adverse selection сделает live result скорее хуже, а не лучше.

Поэтому отрицательный результат особенно убедителен: стратегия проигрывает даже под выгодной ей fill assumption.

### Полезные найденные автором ошибки данных

- Нельзя восстанавливать daily high как `max()` 3-hour temperature rows: это односторонне промахивается по дневному пику примерно на 2–3°F. Нужно использовать собственное daily max/min поле guidance.
- Forecast bias нестационарен: у отдельных stations seasonal swing около 3.5°F. Поэтому «откалибровать на всей истории» может сделать модель хуже.

### Итог автора

Проект остановлен на demo stage; production trading path не включён. Автор публично принимает отрицательный результат вместо попытки замаскировать его.

### Следующий аудит

Проверить фактические три итоговых PnL запуска и station breakdown из backtest cache/output; затем посмотреть, почему model probability систематически переоценивает edge относительно market price — calibration error, stale guidance, quote timing или рыночная информация вне weather model.

---

## 3. `Aaaaarin/vol-surface-dispersion`

URL: https://github.com/Aaaaarin/vol-surface-dispersion

Статус P3: **STRONG SELF-FALSIFIED ALPHA CANDIDATE / NOT PROMOTED**

### Footprint

- PUBLIC.
- Создан и последний push: 2026-09-04.
- Stars: 0.
- Forks: 0.
- Watchers: 0.
- Python, ~1 MB.

### Что такое dispersion простыми словами

Индекс вроде S&P 500 состоит из отдельных акций. Волатильность индекса зависит не только от волатильности каждой акции, но и от того, насколько синхронно они двигаются.

Опционные цены позволяют вычислить **implied correlation** — какую совместную корреляцию рынок как бы закладывает в цену index options относительно options на компоненты.

Если index options слишком дорогие относительно single-name options, одна классическая dispersion идея:

> продать дорогую index volatility и купить component volatility.

Прибыль должна идти из разницы между implied correlation и тем, какая correlation реально реализуется потом.

### Что repo делает хорошо

- реальные live option chains для текущего snapshot;
- implied-vol inversion через Brent вместо нестабильного Newton в low-vega областях;
- SVI surface по maturity;
- butterfly/calendar arbitrage checks;
- interpolation в total variance;
- implied-correlation inversion;
- realised correlation;
- z-score/hysteresis signal;
- costs и in/out-of-sample split.

### Где появился почти идеальный результат

Для historical backtest автору нужна история single-stock option chains. Бесплатно такой panel практически недоступен, поэтому historical implied correlation строится proxy-способом: VIX + realised vol ratios + сегодняшние variance-risk-premium отношения.

Если на этом proxy сделать backtest, получается что-то вроде:

- Sharpe ~4.7;
- win rate ~90%;
- Calmar ~25.

### И автор сам доказал, что это ложный alpha

Signal примерно:

`implied_corr_t - trailing_realised_corr_t`.

Payoff примерно:

`implied_corr_t - forward_realised_corr_[t,t+h]`.

Обе формулы содержат **один и тот же `implied_corr_t`**. Когда этот общий член объясняет большую часть движения, signal и будущий payoff становятся механически похожими даже без прогнозного преимущества.

Автор измеряет `corr(signal input, trade payoff) ≈ 0.824` и прямо пишет, что equity curve близка к математической identity, а Sharpe 4.7 — diagnostic, не discovery.

В offline simulator, где implied correlation задаётся независимо, circularity падает; timing signal получает OOS Sharpe ~1.60 после costs, но простой always-on sell-correlation benchmark получает ~3.96. То есть красивый timing overlay даже там проигрывает более простой стратегии.

### Почему repo ценен

Это очень хороший пример того, как sophisticated quant pipeline может дать фантастический backtest без обычного lookahead, но всё равно быть логически круговым. Автор сам ставит diagnostic, обнаруживает это и отказывается продавать Sharpe как результат.

### Следующий аудит

Не нужен аудит «верим ли Sharpe 4.7» — автор уже корректно отверг его. Если возвращаться, интерес представляет только подмена proxy implied-correlation на настоящий historical single-stock IV panel.

---

## 4. `counterfactual5/funding-arb`

URL: https://github.com/counterfactual5/funding-arb

Статус P3: **ACTIVE EXECUTION/SCANNER CANDIDATE / RESULT EVIDENCE NOT FOUND YET / NOT PROMOTED**

### Footprint

- PUBLIC.
- Создан: 2026-06-19.
- Последний push при просмотре: 2026-09-17.
- Stars: 2.
- Forks: 2.
- Python, активно поддерживается.

### Что делает

Большой operational engine для funding arbitrage между Binance, Bitget, Bybit, OKX и рядом perp DEX.

Есть три основных идеи:

**Pure Futures.** Long perp там, где funding выгоднее long-стороне, и short perp там, где funding выгоднее short-стороне, пытаясь нейтрализовать движение самой монеты и заработать разницу funding payments.

**Cash-and-Carry.** Long spot + short perpetual, чтобы убрать направление и получать funding/basis.

**Unified C&C.** Spot и futures ноги могут быть на разных venues, если так edge выше.

### Что хорошего в механике

- считает open-leg taker fees;
- отдельно показывает mark-price gap между venues;
- `real_edge = funding spread - fees - mark spread`;
- знает про mismatch funding intervals, например 1h vs 8h;
- есть cross-interval basis-blend logic;
- есть scanner, recorded JSONL, backtest, dry-run/live executor, position watcher и journal;
- реальные API fee tiers могут подхватываться автоматически;
- live режим явно отделён от dry-run.

### Чего пока нет как evidence

В README не найден независимый historical/live result вида:

`N сделок -> fills -> funding received -> exit slippage -> fees -> net PnL`.

То есть это пока сильный **инструмент**, но не доказанный edge diary.

### Следующий аудит

Искать committed `data/*.jsonl`, position journals, backtest outputs и actual fills. Если есть реальные исторические scanner snapshots, можно проверить, насколько `real_edge` переживает последующее схождение mark spread и полный close-leg cost.

---

## 5. `tfrmma/realistic-mm-backtester`

URL: https://github.com/tfrmma/realistic-mm-backtester

Статус P3: **AUDIT TOOL / ENGINEERING REFERENCE / NOT AN EDGE RESULT**

### Footprint

- PUBLIC.
- Создан: 2026-06-11.
- Последний push: 2026-07-17.
- Stars: 8.
- Forks: 2.

### Что это

Не стратегия, а специальный backtester для market-making, созданный против самой частой лжи paper backtests:

> «цена коснулась моего лимита — значит я исполнился».

### Что моделирует

- FIFO queue position: новый maker order встаёт в конец очереди уровня;
- trades и cancellations впереди двигают нашу позицию;
- latency feed/order/cancel;
- cancel, который пришёл слишком поздно;
- post-only rejection если рынок пересёкся до прихода order;
- taker order walking multiple book levels;
- inventory/risk;
- adverse-selection / fill-quality metrics;
- OOS и walk-forward parameter validation.

### Почему нам полезен

Это именно тот класс механики, которого не хватает `yoho369` и который нужен для честной проверки `mpatout` maker strategies. Repo не утверждает собственный market edge, поэтому оценивать его как profitable strategy бессмысленно. Его роль в `лудка` — **эталон исполнения для аудита других repos**.

---

## 6. `tfrmma/options-volatility-trading-strats`

URL: https://github.com/tfrmma/options-volatility-trading-strats

Статус P3: **OPTIONS RESEARCH FRAMEWORK / INCOMPLETE PERFORMANCE CHAIN / NOT PROMOTED**

### Footprint

- PUBLIC.
- Создан: 2026-06-03.
- Последний push: 2026-07-20.
- Stars: 8.
- Forks: 0.

### Что пытается исследовать

Crypto options volatility strategies:

- покупать/продавать straddles при расхождении implied vs realised vol;
- harvest variance risk premium;
- dispersion;
- skew/calendar relative-value trades.

### Что сделано лучше среднего

- fills по bid/ask, не midpoint;
- delta hedging по Whalley-Wilmott no-trade bands, а не тупо каждые N минут;
- realised vol через Yang-Zhang;
- SVI surface с no-arbitrage constraints;
- scenario-based portfolio margin;
- vega/theta/delta accounting;
- tests на ранее найденные mark-to-market / close-double-count / strike-search / Sharpe bugs.

### Главная граница

README прямо говорит: из четырёх стратегий только dispersion сейчас проводит полный end-to-end путь через `BacktestEngine`; остальные имеют strategy logic/theoretical fills, но не полноценный engine adapter. Реальный historical options result chain не показан.

Поэтому это полезный framework и источник хороших идей реализации, но пока не repo с проверяемым найденным edge.

---

## 7. `willhammondhimself/adaptive-volatility-arbitrage`

URL: https://github.com/willhammondhimself/adaptive-volatility-arbitrage

Статус P3: **ENGINEERING CANDIDATE / EXECUTION TOO OPTIMISTIC / NOT PROMOTED**

### Footprint

- PUBLIC.
- Создан: 2025-11-04.
- Последний push: 2026-05-03.
- Stars: 6.
- Forks: 4.

### Что делает

Большая платформа для volatility arbitrage: Heston FFT, Greeks, GARCH/Bayesian-LSTM volatility forecasts, delta-neutral strategies и dashboard.

Классическая идея: implied volatility options иногда выше/ниже будущей realised volatility; купить дешёвую vol или продать дорогую, постоянно хеджируя delta.

### Почему пока не принимаем как result repo

README сам признаёт ключевое ограничение backtester: **options fills сейчас по midpoint**, а bid-ask spread modeling — future work. Для options это огромная разница; spread легко съедает маленький volatility edge.

Raw historical options files также исключены из repo. Поэтому математический/engineering слой интересный, но executable profitability из него пока не следует.

---

## 8. `umaangk13/Delta-Neutral-Volatility-Arbitrage-Engine`

URL: https://github.com/umaangk13/Delta-Neutral-Volatility-Arbitrage-Engine

Статус P3: **WEAK / METHODOLOGY BROKEN AS HISTORICAL VOL-ARB EVIDENCE**

### Что заявляет

SPY short ATM straddles с daily delta hedge. README показывает, например:

- 2022 unfiltered +21.72%;
- 2023 unfiltered -30.92%;
- 2023 trend-filtered +5.93%.

### Почему это не реальный historical options backtest

Код скачивает историческую **только цену SPY**. Самих исторических option prices/IV нет.

На входе, ежедневной переоценке, Greeks и закрытии используется Black-Scholes с:

`sigma = 0.20  # Placeholder`.

То есть стратегия сама синтетически создаёт цену опциона из постоянной 20% IV, а потом сама же маркирует этот опцион той же моделью.

Так нельзя доказать thesis «рынок завышал implied vol относительно realised vol», потому что рыночная implied vol вообще отсутствует.

### Что результаты реально показывают

Только поведение синтетического short-straddle book на настоящем SPY spot path под искусственной constant-vol option pricing assumption. Это может быть учебным примером Greeks/hedging, но не evidence реальной volatility arbitrage opportunity.

---

## 9. `guzus/dr-manhattan`

URL: https://github.com/guzus/dr-manhattan

Статус P3: **INFRASTRUCTURE / REJECT FOR EDGE-DISCOVERY TRACK**

### Footprint

- PUBLIC.
- Создан: 2025-10-25.
- Последний push: 2026-07-18.
- Stars: 201.
- Forks: 34.

### Что это

По сути `CCXT` для prediction markets: единый API над Polymarket, Kalshi, Opinion, Limitless, Predict.fun. Есть markets, orderbook, orders, positions, websockets, strategy base class и MCP integration.

### Почему не наш кандидат

Это хороший plumbing layer, но мы не нашли самостоятельной гипотезы о mispricing, сохранённого decision chain, backtest history или результата автора. Поэтому как библиотека полезно, но в `лудка` не надо выдавать снова как новую strategy находку.

---

## 10. `else24/kalshi-market-bot`

URL: https://github.com/else24/kalshi-market-bot

Статус P3: **WEAK / GENERIC TOOLKIT**

### Footprint

- PUBLIC.
- Создан: 2026-08-01.
- Последний push: 2026-08-01.
- Stars: 37.
- Forks: 7.

### Что есть

Красивый terminal UI, live Kalshi order book, paper mode, generic strategies:

- mispricing против configurable fair-value model;
- momentum;
- rolling mean reversion.

### Почему слабый для нашей задачи

Сам fair-value model не является конкретной исследованной теорией, нет сохранённого historical evidence, из которого можно восстановить edge/results. Это toolkit, а не исследовательский дневник.

---

## 11. `DanielTomaro13/sportsdata-agents`

URL: https://github.com/DanielTomaro13/sportsdata-agents

Статус P3: **LARGE DATA/AGENT PLATFORM / NOT YET A CLEAN EDGE RESULT**

### Footprint

- PUBLIC.
- Создан: 2026-06-06.
- Последний push: 2026-09-03.
- Stars: 6.
- Forks: 2.

### Что это

Большая agentic sports-data платформа: odds warehouse по множеству букмекеров, Kalshi/Polymarket, deterministic event resolution, value scout, arb hunter, model agent, backtester, CLV, racing, fantasy и даже policy-gated real betting.

Интересная инженерная часть: event mapping fail-closed, backtest должен брать prevailing price на `predicted_at`, можно считать CLV против Pinnacle, а результаты settlement подтягиваются отдельно.

### Почему пока не сильная находка

Это прежде всего framework/platform. В первом просмотре не нашёл компактного публичного исследования вида:

`конкретная гипотеза -> фиксированный signal -> большой preserved signal set -> settled outcomes -> проверяемый PnL/CLV`.

Поэтому не тратим на него глубокий audit, пока не появится конкретная strategy artifact внутри repo.

---

## Вывод P3

Самые содержательные новые repos этого pass:

- `mpatout/kalshi-market-research` — настоящий большой edge candidate, но его огромный historical PnL упирается в assumed capture of candle volume; это надо ломать через queue/fill logic.
- `mifisher/kalshi-weather-bot` — особенно сильный честный отрицательный результат: хорошая weather forecast skill не смогла обыграть реальные Kalshi prices даже в оптимистичном always-fill backtest.
- `Aaaaarin/vol-surface-dispersion` — автор сам поймал очень убедительный circular false alpha и отказался считать Sharpe ~4.7 результатом.
- `counterfactual5/funding-arb` — активный operational funding-arb engine; надо искать фактический preserved execution ledger, иначе это остаётся framework.

`INTERESTING_REPOS.md` в этом pass не менялся: решение о promotion остаётся только за владельцем.
