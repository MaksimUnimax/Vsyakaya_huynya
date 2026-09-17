# Лудка — deep-dives index

Этот каталог хранит углублённые разборы интересных public repos.

## Vela

- `VELA_2026-09-17.md` — предварительный deep-dive, сделанный до полного независимого пересчёта committed fill dataset.
- `../audits/VELA_FILL_AUDIT_2026-09-17.md` — **AUTHORITATIVE CURRENT AUDIT** для `analysis/data/fill_calibration_btc.parquet` и связанного model/execution code.

### Supersession note

После независимого аудита раздел предварительного deep-dive про `1,034 attempts / 88 fills` нельзя читать как доказательство отдельного fill-conditional adverse-selection effect.

Фактическое уточнение:

- filled: 85/88 = 96.591%, mean model p=97.946%;
- unfilled: 946/946 = 100.000%, mean model p=99.757%;
- после поправки на собственный `p_side` дополнительный filled calibration penalty ≈ -1.60 п.п.;
- Monte-Carlo p≈0.266 -> отдельный дополнительный adverse-selection effect на этой выборке **не доказан статистически**.

Также полный audit обнаружил order-price logging/submission mismatch, тикерное схлопывание повторных placements, отсутствие настоящего queue-ahead measure, fee/PnL inconsistency с поздней generic maker-fee моделью и robustness issue при пропущенных Binance seconds.

При любом будущем возврате к Vela сначала читать `../audits/VELA_FILL_AUDIT_2026-09-17.md`, а затем использовать старый deep-dive только как хронологический контекст.
