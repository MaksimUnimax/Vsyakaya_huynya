# Лудка — INTERESTING REPOS

Постоянный реестр проектов, которые **владелец явно распорядился оставить в интересных**.

## Жёсткое правило

- Ассистент **не повышает кандидатов сюда самостоятельно**.
- Даже очень сильный repo остаётся в candidate/adversarial pass, пока владелец явно не скажет добавить его в интересные.
- Ассистент может написать `RECOMMEND FOR INTERESTING`, но это не меняет этот файл.
- Полный антидубль всех просмотренных repos находится в `REVIEWED_REPOS.md`.
- Полные карточки непринятых кандидатов хранятся в discovery-pass документах.

---

## 1. `routsiddharth/vela`

URL: https://github.com/routsiddharth/vela

Статус: **INTERESTING / OWNER-APPROVED / DEEP AUDIT COMPLETED**

Deep dive: `deep-dives/VELA_2026-09-17.md`

Independent audit: `audits/VELA_FILL_AUDIT_2026-09-17.md`

### Что это

Vela исследует краткосрочные BTC/ETH prediction markets Kalshi. Главная идея не в прогнозировании направления BTC, а в буквальной арифметике settlement: контракт определяется средним из 60 CF Benchmarks RTI наблюдений за последнюю минуту. По мере прохождения этой минуты часть итогового среднего уже «запирается», а рынок может всё ещё эмоционально реагировать на последний тик BTC.

Автор прошёл несколько неудачных версий стратегии: near-lock taker оказался отрицательным после цены/fees; ранняя maker fee модель была неверной; слишком дешёвые fills оказались не «подарком», а иногда сигналом, что рынок знает больше модели. Затем появился более узкий panic-fade.

### Что мы независимо подтвердили

По committed `fill_calibration_btc.parquet`:

- 1,034 attempts;
- 88 fills;
- 85W / 3L = 96.5909%;
- все 88 settlement labels совпали с независимым historical Kalshi result;
- все 946 unfilled выбранных сторон тоже разрешились в пользу модели;
- 88 filled windows суммарно дали +$15.87 в опубликованной derived table;
- 85 winners дали +$37.79, а всего 3 losers съели -$21.92.

Мы также нашли execution/dataset defects: grouped placements, отсутствие фактического filled quantity в parquet, first-fill-only price, nearest ±2s book join, неверный `our_depth`, price-rounding mismatch между local order record и отправкой на Kalshi, а также потенциальную избыточную уверенность модели при пропущенных 1s feed buckets.

### Ограничение

Широкий README claim `210 windows / 205W-5L / +$20.23` полностью не воспроизводится, потому что runtime ledger не опубликован. Свежая проверка точного BRTI сейчас требует Kalshi account/auth; у владельца нет телефона для регистрации, поэтому Vela оставляем как сильный reference repo и не тратим время на operationalization.

---

## 2. `jckund/test`

URL: https://github.com/jckund/test

Статус: **INTERESTING / OWNER-APPROVED / CONTRACT-LEVEL VERIFICATION PENDING**

Deep dive: `deep-dives/NASCAR_JCKUND_TEST.md`

### Что это

Малозаметный NASCAR research system: Kalshi Winner/Top3/Top5/Top10 рынки сопоставляются со sportsbook/FanDuel вероятностями. Код собирает market history, bookmaker prices, убирает букмекерскую маржу, строит approximate finishing-position distribution и сохраняет EV alerts.

### Что мы уже восстановили

На четырёх завершённых гонках preliminary paper reconstruction дал 112 first-saved signals, paper cost около $38.60, payout $61 и apparent paper P/L +$22.40.

Но почти весь результат оказался в **NO**, особенно Top-3 NO на слабых гонщиков. YES-only был примерно около нуля.

### Почему это ещё не доказанный edge

Слишком большая разница между sportsbook-implied `P(NO)` и Kalshi NO ценой может означать:

- настоящий mispricing;
- неправильный YES/NO transform;
- несовпадение contract/settlement semantics;
- очень маленькую доступную глубину;
- сильную зависимость между множеством Top-3 NO ставок одной гонки.

Следующий bounded audit:

`alert timestamp -> exact ticker -> exact settlement wording -> recorded price/depth -> sportsbook fair probability -> side transform -> official finish -> Kalshi settlement -> executable return`.

---

## Promotion rule

Новый repo добавляется ниже **только после прямой команды владельца**.