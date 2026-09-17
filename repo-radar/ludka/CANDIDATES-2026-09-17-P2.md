# Лудка — discovery pass P2 — полные карточки всех просмотренных repos

Дата: 2026-09-17

Правило этого файла: **каждый осмысленно просмотренный repo описывается полностью человеческим языком, независимо от того, сильный он, слабый или сомнительный.** Никакой repo из этого файла не считается `INTERESTING`, пока владелец отдельно не распорядится добавить его в `INTERESTING_REPOS.md`.

---

## 1. `spencerfletcher/arbitrage-engine`

URL: https://github.com/spencerfletcher/arbitrage-engine

Статус этого pass: **STRONG CANDIDATE / RECOMMEND FOR OWNER REVIEW, NOT PROMOTED**

### Footprint

- PUBLIC.
- Создан: 2026-07-17.
- Последний public push при просмотре: 2026-09-16.
- Stars: 0.
- Forks: 0.
- Watchers: 0.
- Python.
- Автор прямо пишет, что public history squashed, а market selection/tuning/full measurements частично скрыты.

### Что автор делает простыми словами

Он ищет одинаковое спортивное событие одновременно на Kalshi и Polymarket US. Если на одной площадке можно купить одну сторону, а на другой — противоположную, и суммарно заплатить меньше $1, то теоретически независимо от результата одна из сторон выплатит $1 и разница останется как прибыль.

Пример: купить `Team A YES` за $0.55 на одной площадке и экономически противоположную сторону за $0.40 на другой. Сумма $0.95, выплата $1, теоретический gross edge 5 центов.

### Откуда должна появляться прибыль

Не из прогноза матча, а из временного расхождения цен **на одно и то же событие** между двумя площадками.

### Decision chain

1. Найти рынки на двух площадках.
2. Убедиться, что это действительно одно и то же событие и одинаковые settlement rules.
3. Слушать WebSocket quotes.
4. Найти пару цен, где две противоположные стороны суммарно дешевле $1 после fees.
5. Подождать короткое подтверждение, чтобы отсеять one-tick шум.
6. Перед исполнением заново прочитать **свежий реальный order book**, обходя CDN cache.
7. Поставить первую ногу.
8. Вторую ногу размерить не по желаемому размеру, а по **реально заполненному количеству** первой.
9. Если hedge не удался — попытаться немедленно закрыть первую ногу.
10. Отдельно проверить settlement и фактический post-settlement PnL.

### Что автор сам обнаружил

- Около **69%** найденных «арбитражей» оказались stale-feed illusion: детектор систематически выбирал именно секунды, когда один feed отставал.
- Matcher путал разные игры doubleheader; **149 из 264** записанных `guaranteed_profit` opportunities в одном наборе оказались не одним событием.
- Реальный probe показал, что документированный FOK order фактически partial-filled: запрос на 300 shares при доступных 255 дал fill 255, хотя all-or-nothing логика ожидала 0.
- Fee model была неверной и отбрасывала часть реальных кандидатов; исправление вернуло **327 из 3,234** ранее отклонённых opportunities.
- Автор почти отказался от стратегии, думая, что ~0.3 s edge lifetime слишком короткий. Реальные замеры дали порядка ~30 ms на fresh verify и ~78 ms на обе order legs, поэтому latency перестала быть главным подозреваемым.
- В 408 settled matched games автор сообщает 0 settlement divergences / 0 voids.

### Что реально доказано, а что нет

Код, failure mechanisms и часть captured-response behavior публичны. Но полный measurement corpus, tuning, market selection и результаты намеренно не выложены. Поэтому числа из case study — сильные документированные observations, но пока не independently replayed evidence.

### Почему проект ценен

Самая ценная часть — не arb scanner, а способ мышления: автор несколько раз публично менял вывод после того, как собственный measurement опровергал удобную историю.

### Следующий аудит

Проследить в коде matcher -> fee -> fresh verify -> first-leg fill -> hedge sizing -> flatten. Отдельно проверить, какие из опубликованных counts можно восстановить из committed fixtures/log samples.

---

## 2. `spencerfletcher/market-maker`

URL: https://github.com/spencerfletcher/market-maker

Статус: **ENGINEERING CANDIDATE / RESULTS WITHHELD / NOT PROMOTED**

### Footprint

- PUBLIC.
- Создан: 2026-08-17.
- Последний public push: 2026-09-16.
- Stars: 1.
- Forks: 0.
- Watchers: 1.
- README заявляет ~44.8k Python lines и крупный public test suite.

### Что это

Это следующий проект того же автора после того, как taker-arbitrage стал выглядеть слишком зависимым от скорости и stale-feed selection. Вместо того чтобы бежать за уже возникшим расхождением, автор пытается **сам стоять в стакане как market maker** и зарабатывать на spread/credits, когда другие участники приходят к его цене.

### Откуда должна появляться прибыль

Market maker выставляет bid/ask и надеется получать компенсацию за предоставление ликвидности: spread, maker credit/fee economics и inventory management. Но здесь главная опасность — тебя чаще исполняют именно когда рынок идёт против твоей цены. Поэтому fill rate сам по себе не победа.

### Что автор публично показывает

Не результаты, а failure classes:

- WebSocket может получать frames и отвечать на ping, но книга при этом замерла по содержанию.
- Несколько процессов на одном IP могут вместе выбить venue rate-limit именно в момент teardown.
- SIGKILL может оставить реальную fill на бирже, которую локальный ledger не успел записать.
- Alert channel не может быть единственным свидетелем собственной смерти.
- Float error на границе ceil/floor может превратить микроскопическую ошибку в неверный fee либо phantom crossed book.
- Venue behavior надо тестировать captured real responses, а не mock-fixtures, написанными из тех же предположений, что и код.

### Важное ограничение

Автор **намеренно скрывает market selection, production tuning и все численные measurement results**. Поэтому repo не доказывает profitability. Его ценность — как reference по microstructure/execution engineering.

### Следующий аудит

Использовать как чек-лист при проверке других repos: queue attribution, exact fee rounding, stale-content detection, crash reconciliation, maker adverse selection.

---

## 3. `mperi1208/value-bet-model`

URL: https://github.com/mperi1208/value-bet-model

Статус: **STRONG CANDIDATE / OWNER DECIDES PROMOTION**

### Footprint

- PUBLIC.
- Создан: 2026-03-16.
- Последний push: 2026-09-14.
- Stars: 3.
- Forks: 1.
- Watchers: 3.

### Что автор сначала пытался сделать

С помощью ML предсказывать футбольные матчи лучше букмекерских линий. Использовал 53 features, исторические результаты/odds/xG, walk-forward по 25 сезонам и 10 лигам.

### Что получилось

ML **не победил рынок**. После двух исправлений методологии честный headline стал около **-6.7% ROI**, AUC примерно упёрся в ~0.56.

### Где автор потом нашёл другую идею

Он фактически удалил ML из прибыльной стратегии.

Новая логика:

1. Взять Pinnacle как «sharp» reference price — площадку, которая обычно быстрее отражает информацию.
2. Убрать bookmaker margin (`devig`) и получить приблизительную fair probability.
3. Сравнить её с котировками более медленных букмекеров.
4. Если soft bookmaker всё ещё предлагает существенно лучшую цену, чем следует из sharp reference, считать это value bet.

То есть прибыль по гипотезе идёт не из того, что автор лучше прогнозирует футбол, а из того, что **один букмекер переставляет цену медленнее другого**.

### Термины

- **Devig** — убрать встроенную букмекерскую маржу из коэффициентов, чтобы получить более честные вероятности.
- **CLV (Closing Line Value)** — насколько цена, по которой ты взял ставку, лучше финальной «закрывающей» линии. Положительный CLV считается более устойчивым evidence, чем короткий ROI.

### Заявленные результаты

Portfolio 2012–2024:

- 20,676 bets;
- ROI +4.86%;
- CLV +3.05%;
- примерно 68% selections beat Pinnacle close.

Автор отдельно указывает, что Asian Handicap leg имеет всего +0.4% CLV и поэтому **не считается доказанной частью edge**, несмотря на положительный ROI.

### Самокоррекции

- Июль 2026: -3.2% ML headline ухудшен до -6.7% после обнаружения global recalibration leakage и post-hoc league exclusion.
- Сентябрь 2026: Asian Handicap CLV исправлен с +1.6% на +0.4%.

### Ограничение и важный вывод

На Betfair Exchange идея перестаёт работать: там рынок движется вместе с Pinnacle, и комиссия делает результат отрицательным. Автор также показывает decay: количество 1X2 mispricings примерно вдвое меньше в 2022–2024, чем в 2012–2014.

### Следующий аудит

Проверить timestamps historical odds, executability `Max` odds, power-devig, CLV arithmetic и forward paper ledger.

---

## 4. `PredictionMarketTrader/openthomas`

URL: https://github.com/PredictionMarketTrader/openthomas

Статус: **WEATHER CANDIDATE / PUBLIC PAPER-TRADING PROJECT / NOT PROMOTED**

### Footprint

- PUBLIC.
- Создан: 2026-07-03.
- Последний push: 2026-09-12.
- Stars: 5.
- Forks: 1.
- Watchers: 5.

### Что автор делает

Торгует weather prediction markets. Например контракт может платить $1, если дневной максимум температуры в NYC окажется выше определённого значения.

Вместо «LLM угадывает погоду» автор строит статистическую baseline:

- знает точную NWS station, по которой будет settlement;
- объединяет семь numerical weather models;
- учит systematic bias конкретной станции на historical hindcast;
- уже наблюдавшиеся сегодня temperature extremes используют как физическое ограничение;
- затем LLM может только ограниченно сдвинуть baseline, а не заменить её;
- risk engine применяет fractional Kelly и hard caps.

### Термины

- **Hindcast** — прогнать старые прогнозы так, как будто мы находились в прошлом, не подглядывая в будущие наблюдения.
- **Station bias** — например конкретная модель систематически занижает Miami на ~2°F; этот bias можно оценить по прошлым дням.
- **Kelly sizing** — размер позиции зависит от предполагаемого edge и уверенности, но обычно берётся только доля полного Kelly из-за ошибки модели.

### Что особенно интересно

Автор публикует отрицательную эволюцию backtest:

- naked model-vs-market примерно **-3.8¢/contract**;
- после station bias + market prior около **-1.8¢**;
- после исправления timing leak — примерно breakeven.

Timing leak заключался в том, что replay позволял историческому market state знать утренний minimum раньше, чем моделирующая сторона могла его знать.

### Ограничение

README говорит о live paper/public feed, но полноценный independently reconciled profit track record ещё надо проверить. Пока это хороший research framework, не доказанная прибыльная система.

### Следующий аудит

Найти committed paper feed/journal, проверить timestamps weather guidance/observations, replay book source и settlement station mapping.

---

## 5. `yoho369/crypto-perpetual-arbitrage`

URL: https://github.com/yoho369/crypto-perpetual-arbitrage

Статус: **CANDIDATE / NEEDS ADVERSARIAL REPRODUCTION / NOT PROMOTED**

### Footprint

- PUBLIC.
- Создан: 2026-05-27.
- Последний push: 2026-08-19.
- Stars: 2.
- Forks: 1.
- Watchers: 2.
- Repo большой (~343 MB по GitHub metadata), есть notebooks, Python engine и отдельный PDF-report; большие master parquet вынесены во внешний data package.

### Что это вообще такое простыми словами

Один и тот же perpetual-futures контракт на BTC/AVAX/BERA/KAITO торгуется одновременно на нескольких криптобиржах. Например BTC perpetual на Binance может на короткое время быть немного дороже, чем тот же BTC perpetual на Bybit.

Автор хочет **купить дешёвый контракт на одной бирже и одновременно продать дорогой на другой**. Тогда общее направление BTC почти нейтрализуется: если BTC вырастет, long-leg заработает, short-leg потеряет; если упадёт — наоборот. Прибыль должна прийти из того, что ценовая разница между двумя биржами вернётся к нормальному уровню.

Это не классический spot-vs-futures cash-and-carry. Здесь сравниваются **perpetual против perpetual на разных биржах**.

### Что такое BBO

**BBO = Best Bid and Offer**: лучшая реальная цена, по которой прямо сейчас кто-то готов купить, и лучшая цена, по которой готов продать.

Это важно: нельзя считать arbitrage по mid-price, если купить/продать по этому mid нельзя. Код загружает minute-level bid/ask и при входе использует именно executable-side prices.

### Зачем автор «убирает funding»

Perpetual futures периодически платят funding между long и short. Если на одной бирже funding сильно отличается от другой, raw price spread может медленно дрейфовать просто из-за этой механики.

Автор строит **funding-adjusted spread**, чтобы попытаться выделить именно временное ценовое расхождение, а не известный funding drift.

### Что такое OU / s-score

OU = Ornstein–Uhlenbeck, модель mean reversion. В простом смысле автор предполагает:

> нормальная разница цен между двумя биржами гуляет вокруг некоторого среднего уровня; очень сильное отклонение имеет тенденцию возвращаться.

Каждую минуту он по предыдущим 1,440 минутам (~24 часа) оценивает текущий mean и volatility spread и переводит отклонение в `s-score` — «на сколько стандартных отклонений мы ушли от нормы».

Например `|s| >= 4` означает экстремальное отклонение примерно в четыре обычных sigma по его модели.

### Какие биржи в коде

Конфигурация содержит:

- Binance Futures;
- Bybit;
- OKX Swap;
- Gate.io Futures;
- Hyperliquid;
- KuCoin Futures.

Тестируемые tokens в текущем `main.py`: BTC, AVAX, BERA, KAITO.

### Decision chain

1. Построить funding-adjusted spread для каждой пары бирж.
2. На trailing 1,440 минутах оценить OU/AR(1) mean и variance **только из прошлого**.
3. Если `|s_score|` ниже порога — ничего не делать.
4. Если отклонение экстремальное — проверить реальные BBO обеих бирж.
5. Если суммарный bid-ask spread слишком большой — отказаться: это «токсичная/плохая ликвидность».
6. Посчитать gross expected convergence до trailing mean.
7. Вычесть round-trip fees и дополнительный `liquidity_toll` (rolling median bid-ask spread).
8. Войти только если net EV > 0.
9. Закрыть позицию при возврате spread к target mean, максимум через 300 минут либо перед funding epoch.

### Что автор заявляет

README приводит примеры:

- BTC: OU framework якобы снизил max drawdown почти на 60% против naive Z-score и поднял Gain-to-Pain до 2.53.
- KAITO: liquidity guard якобы убрал >100 toxic entries и сократил cumulative loss с -1,896 bps до -120 bps.
- 2-month OOS 2026: AVAX якобы perfect win rate, BERA >336 bps net yield с 78.3% win rate.

### Почему мы пока этому не верим

1. Headline OOS очень сильный, особенно `perfect win rate`.
2. Большие source/master datasets не committed; они лежат во внешнем Google Drive package.
3. Hyperparameter sensitivity есть отдельно, значит надо проверять, не выбраны ли 4σ/guards после просмотра результата.
4. В текущем `main.py` evaluation period задан **2025-03-01 -> 2025-12-31**, тогда как README говорит про **2-month OOS from 2026**. Значит headline 2026 не воспроизводится просто запуском default main; нужно выяснить, какой notebook/config реально дал эту цифру.
5. При forced exit с отсутствующим BBO код иногда использует последний доступный quote (`Funding_Imputed` / `Timeout_Imputed`). Это потенциально оптимистичная execution assumption, если реальный рынок в этот момент был недоступен именно из-за плохого режима.
6. BBO minute data не доказывает доступную depth на нужный размер; Level-1 quote может быть только маленьким объёмом.

### Следующий bounded audit

Скачать внешний parquet package, зафиксировать SHA, воспроизвести один token/pair без изменения параметров, затем проверить 2025-vs-2026 split, entry/exit quote causality, imputed exits, fee units, sensitivity к threshold/guard и depth assumption.

---

## 6. `maxstw23/pairs-trading`

URL: https://github.com/maxstw23/pairs-trading

Статус: **ADVERSARIAL / VERY STRONG CLAIM / NOT PROMOTED**

### Footprint

- PUBLIC.
- Создан: 2026-06-27.
- Последний push: тот же день 2026-06-27.
- Stars: 0.
- Forks: 0.
- Watchers: 0.
- Очень маленькая public history; price data не committed, при запуске скачивается из yfinance.

### Что автор пытается сделать простыми словами

Идея pairs trading: найти две акции, которые исторически двигаются вместе, например две компании одного сектора. Если одна внезапно ушла слишком высоко относительно другой, купить отставшую и продать переоценённую. При возврате их отношения к норме заработать на **сближении**, а не на общем росте рынка.

### Что такое cointegration

Это более строгая версия «две линии коррелируют». Две цены могут обе расти, но их комбинация должна иметь устойчивый mean-reverting spread. Engle–Granger test проверяет именно это.

Проблема: если проверить сотни/тысячи пар, случайно обязательно найдутся красивые p-values. Поэтому автор применяет **Benjamini–Hochberg FDR** — correction for multiple testing.

### Первый результат автора — честный null

README говорит: после FDR correction **ни одна static pair не выживает**. Это хороший отрицательный результат: наивное «найдём cointegrated пару из 60 акций» не подтверждается.

### Что такое Kalman hedge ratio

Static pairs trading предполагает постоянное соотношение, например `1 акция A ≈ 1.4 акции B`.

Kalman filter позволяет этому hedge ratio постепенно меняться во времени. То есть стратегия говорит: связь между компаниями существует, но коэффициент не обязан быть навечно фиксирован.

### Заявленный неожиданный результат

После провала static подхода README заявляет для dynamic Kalman strategy:

- **OOS Sharpe 4.03**;
- bootstrap 95% CI примерно `[3.28, 4.77]`;
- static walk-forward Sharpe -0.22;
- market beta ≈0.01;
- max drawdown всего -0.67%.

Это чрезвычайно сильный результат для daily equities stat-arb.

### Что такое Sharpe

Упрощённо: сколько средней прибыли стратегия получает на единицу колебаний результата. Sharpe 1 уже считается заметным; 4 на длинном OOS для простого public daily strategy выглядит настолько сильным, что требует агрессивной проверки.

### Что код делает правильно на первый взгляд

- train/test разделён по времени: train до 2022, test с 2023;
- Kalman state прогревается на train и идёт online через test;
- default transaction cost = 5 bps;
- bootstrap использует blocks, а не independent-day resampling;
- universe разделён по sectors.

### Главная странность, которую надо разобрать

`kalman_backtest()` принимает на вход DataFrame `pairs` и торгует `pairs.head(max_concurrent)`.

Но README одновременно утверждает, что после FDR **никакая static pair не survives correction**. Если в `pairs` действительно передать пустой FDR-selected set, Kalman backtest не сможет получить Sharpe 4.03 — он просто не будет торговать.

Значит где-то в notebook должен происходить один из вариантов:

- Kalman получает **другой, не FDR-approved candidate set**;
- threshold ослабляется;
- используются sector/preselected pairs;
- либо README смешивает два разных selection pipelines.

Это не доказанный баг, но это **главный adversarial question**.

### Другие риски

- Price data не committed, поэтому exact result зависит от текущего yfinance history/corrections.
- Repo создан и практически завершён в один день — нет публичной эволюции/forward testing.
- Sharpe 4.03 и drawdown -0.67% требуют проверки denominator/position normalization: pairs-return construction может недооценивать реальный capital/gross exposure.
- Надо проверить, когда именно применяется Kalman hedge ratio и нет ли same-close information в execution return despite stated next-open lag.

### Следующий bounded audit

Вскрыть notebook end-to-end и ответить на один вопрос первым: **какой конкретно `pairs` DataFrame передаётся в `kalman_backtest` после FDR null?** Затем воспроизвести result на pinned yfinance snapshot и проверить capital normalization/transaction costs.

---

## 7. `seralifatih/pm-arbitrage`

URL: https://github.com/seralifatih/pm-arbitrage

Статус: **CANDIDATE / ARITHMETIC SCANNER / NO PRESERVED OUTCOME HISTORY FOUND**

### Footprint

- PUBLIC.
- Создан: 2026-04-21.
- Последний push: 2026-04-29.
- Stars: 0.
- Forks: 1.
- Watchers: 0.

### Что он делает

Ищет арбитраж внутри multi-outcome Polymarket events.

Если есть событие с взаимоисключающими исходами и **ровно один** обязан победить, сумма цен всех YES теоретически должна быть около $1. Если сумма заметно ниже $1, можно попытаться купить YES на каждый исход и получить $1 от победителя. Для Top-K рынков ожидаемая сумма уже K, потому что ровно K исходов должны выплатить YES.

### Почему идея математически настоящая только при жёстком условии

Нужно доказать, что outcome list **полный** и структура действительно exactly-K.

Если в election market отсутствует кандидат `Other`, сумма YES ниже 1 может быть не арбитражем, а просто вероятностью не перечисленного победителя. Сам README это признаёт.

### Что scanner делает

- классифицирует winner-take-all / top-K;
- отбрасывает nested by-date, ladders и independent props;
- считает buy-YES / buy-NO basket;
- вычитает fee assumption;
- проходит CLOB order books на заданный размер по каждой leg;
- выдаёт fillability flag и score.

### Почему пока не сильный

- Sample output — не сохранённый исторический ledger.
- Нет найденной публичной цепочки opportunity -> actual fills -> settlement -> realised PnL.
- Repo description говорит cross-venue Polymarket/Kalshi, а текущий README в основном описывает internal Polymarket multi-outcome scanner — scope выглядит менявшимся/несогласованным.
- Fee assumption `4% round-trip` надо сверять с конкретной venue/market fee policy, а не принимать как универсальную.

### Следующий аудит

Взять несколько sample opportunities и независимо проверить completeness outcome space, exact settlement rules, live depth math и fee calculation.

---

## 8. `SohamMahale/crypto-arbitrage-project`

URL: https://github.com/SohamMahale/crypto-arbitrage-project

Статус: **WEAK / METHODOLOGY PROBLEM / DO NOT TREAT HEADLINE AS BACKTEST**

### Footprint

- PUBLIC.
- Создан: 2026-03-22.
- Последний push: 2026-03-22.
- Stars: 0.
- Forks: 0.
- Watchers: 0.
- Очень маленький repo; один основной `src/backtester.py` и report material.

### Что автор пытается показать

Классический BTC spot + perpetual carry:

- купить BTC spot;
- одновременно short BTC perpetual;
- направление BTC в значительной степени взаимно компенсируется;
- получать funding, который long/short participants periodically переводят друг другу;
- дополнительно учитывать spot-futures basis.

README заявляет примерно 6.5–7% sustainable annual return на 2022–2025 после costs.

### Почему это не полноценный торговый backtest

Код не симулирует реальную позицию по времени. Он по каждому месяцу:

1. считает **средний basis** месяца;
2. считает средний 8-hour funding rate;
3. annualizes funding как `avg_rate * 1095`;
4. annualizes monthly basis как `basis_monthly * 12`;
5. складывает эти annualized величины и называет строку `MONTHLY RESULTS`;
6. потом усредняет annualized monthly estimates для yearly summary.

То есть headline — скорее **retrospective annualized-rate estimate**, а не path-dependent PnL симуляция с входом, collateral, funding cashflows и exits.

### Дополнительные проблемы

- Spot и futures ряды просто обрезаются до одинаковой длины и сопоставляются по позиции строки, а не по timestamp.
- Нет liquidation/margin/collateral mechanics.
- Нет реального bid/ask/slippage, только flat 0.4% cost.
- README формулирует некоторые выводы как «proof» сильнее, чем позволяет такая модель.

### Почему всё равно фиксируем

Чтобы не найти его повторно и не принять headline `6.47% CAGR` за полноценную evidence-based strategy.

### Следующий action

Не углублять без отдельной причины; более сильные funding/carry repos уже есть в ledger.

---

# Итог P2

Этот документ — **candidate/review archive, не список INTERESTING**. В `INTERESTING_REPOS.md` по текущей воле владельца остаются только `routsiddharth/vela` и `jckund/test`.

Все восемь repos из этого pass должны также оставаться в `REVIEWED_REPOS.md` как anti-duplicate identities.