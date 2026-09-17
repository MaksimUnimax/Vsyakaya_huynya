# Лудка — public-repo research track

Отдельная ветка repo-radar для поиска и разбора публичных проектов, которые пытаются находить рыночные неэффективности, арбитраж, mispricing или строят проверяемые предсказания.

## Зачем

Главная ценность — не список «ботов для ставок», а возможность проследить инженерную и аналитическую мысль разработчика:

`источники данных -> гипотеза -> нормализация/модель -> сигнал -> исполнение или paper simulation -> сохранённая история -> проверка фактического результата`.

Интересны любые домены: спорт, prediction markets, политика, выборы, криптовалюты, акции, опционы, FX, товарные рынки, букмекеры, биржи, Kalshi/Polymarket и другие рынки. Предмет рынка сам по себе не является ограничением.

## Жёсткие условия

1. Репозиторий обязательно PUBLIC. Private/screenshot-only/closed-source проекты не подходят: без кода и истории мы не можем проверить механику.
2. Должна быть реальная вычислительная или торговая логика. Простые odds scrapers, UI-клоны, списки ссылок и affiliate-сайты без модели не подходят.
3. Предпочтение проектам, где можно восстановить полный decision chain: от сырого входа до сигнала.
4. Особенно ценны сохранённые snapshots, alerts, backtests, paper trades, fills, settlements, P/L, calibration, hit-rate, ROI, execution logs и Git history, позволяющие независимо перепроверить автора.
5. Не считать заявленную прибыль доказанной без проверки. README, screenshots и marketing claims — только claims.
6. Разделять model edge и execution edge: высокая paper-доходность без ликвидности/depth/slippage не считается подтверждённым исполнимым преимуществом.
7. Для бинарных рынков отдельно проверять YES/NO mapping, settlement condition, market ticker, event/date и преобразование вероятностей. Огромный apparent edge сначала считать потенциальным mapping/normalization bug.
8. Коррелированные сигналы не трактовать как независимые победы. Например, множество Top-3 NO на разных участников одного события требуют отдельного анализа зависимости.
9. Не ограничиваться известными/звёздными проектами. Особенно интересны малозаметные активные repos с неинформативным названием/описанием, где внутренняя система намного серьёзнее GitHub-витрины.
10. Для каждого сильного кандидата фиксировать не только «что делает», но и что реально уже работает, что планируется, какие данные накоплены и что можно проверить задним числом.

## Классы интереса

- cross-book / sportsbook arbitrage;
- prediction-market arbitrage и mispricing;
- exchange-to-exchange crypto/FX arbitrage;
- cash-and-carry / funding / basis / triangular arbitrage;
- options/volatility/stat-arb;
- market-making и spread capture;
- sports forecasting + value betting;
- election/politics forecasting и prediction-market models;
- event/news/weather/alternative-data forecasting с торговым слоем;
- cross-market probability reconciliation;
- ML/Bayesian/Monte-Carlo models, если прогноз реально используется для определения цены/ставки/позиции;
- любые необычные системы, где автор строит и проверяет собственную теорию вероятности/ценового перекоса.

## Карточка кандидата

Для каждого кандидата собирать:

- repo / owner / public status / default branch;
- возраст и текущую активность;
- stars/forks как контекст, но не как критерий качества;
- рынки и источники данных;
- что именно считается fair value / probability / edge;
- ключевой алгоритм и decision chain;
- исполнение: live / paper / alerts only / backtest;
- комиссии, slippage, liquidity/depth, limits;
- сохранённые сигналы и результаты;
- возможность независимого outcome backtest;
- фактически обнаруженные ошибки/ограничения;
- почему проект интересен с точки зрения логики разработчика.

## Эталон исходной находки

`jckund/test` — NASCAR/Kalshi + sportsbook probability reconciliation. В нём ценность оказалась не в названии и не в README, а в сохранённых рыночных snapshots и `EV_ALERTS`, из которых удалось восстановить paper-backtest. Первичная выборка показала, что YES-сигналы были около нуля, а apparent прибыль концентрировалась в Top-3 NO. Следующая проверка для него — contract-level verification: ticker/settlement/mapping/ask/depth/fillability/outcome, чтобы отличить реальный edge от mapping bug или микроскопической ликвидности.

Это эталон глубины разбора для ветки «лудка».