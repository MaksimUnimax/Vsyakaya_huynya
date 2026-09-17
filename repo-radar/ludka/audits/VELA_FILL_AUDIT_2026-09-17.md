# Vela — independent adversarial audit of committed live-fill calibration

Date: 2026-09-17

Target repo: `routsiddharth/vela`
Pinned source commit: `ecade821de06c98a6e025229c5554404236345e1`
Target artifact: `analysis/data/fill_calibration_btc.parquet`
Parquet size: 61,425 bytes
Parquet SHA-256: `2eda765469a1302d076e42599267201179653f965f7e98a9577b23b81e2d40d0`

Independent audit implementation in this branch:

- `repo-radar/ludka/audits/vela_fill_audit.py`
- `repo-radar/ludka/audits/vela_outcome_audit.py`
- `repo-radar/ludka/audits/vela_series_fee_audit.py`
- workflow: `.github/workflows/ludka-vela-fill-audit.yml`

Final successful GitHub Actions evidence:

- run: `35228057723`
- job: `105224587500`
- artifact: `10499882201`
- workflow conclusion: `success`

This audit does NOT use Vela's private/runtime `paper.db` as an authority. It starts from the committed parquet, independently retrieves all 1,034 final Kalshi market outcomes through the public historical market API, checks the model/runtime code, and attacks the dataset construction assumptions.

---

## 1. Executive verdict

The three headline statistics from Vela's committed `fill_calibration_btc.parquet` are **real and exactly reproducible from that file**:

- **88 filled attempts**;
- **85 wins / 3 losses = 96.5909%**;
- **mean `net_pnl` per filled row = +$0.1803409**.

The 88 rows sum to **+$15.87**, not +$20.23. The README's wider `210 traded windows / +$20.23` claim is a different dataset and remains NOT independently reproducible from the public repository.

The 85/3 outcomes were independently checked against Kalshi's public historical market endpoint. **0 of the 88 filled labels disagree with Kalshi settlement.** We also recovered final outcomes for all **946 unfilled** attempts, which the original Vela step-3 analysis did not have.

However, several important conclusions surrounding those headline numbers need correction or downgrading:

1. The original report's raw filled-vs-unfilled contrast does **not by itself prove an extra adverse-selection effect**. Filled attempts started with materially lower model confidence. After conditioning on each row's own `p_side`, the additional fill-associated calibration penalty is about **-1.60 percentage points**, but a 100,000-draw Monte-Carlo test gives **p≈0.266**. This sample is too small to establish an extra effect statistically.
2. The PnL distribution is extremely left-skewed. **85 wins earned +$37.79; only 3 losses lost -$21.92.** One average loss is worth roughly sixteen average wins.
3. The published parquet is not a clean order-level execution table. It collapses repeated resting placements by ticker, does not retain filled quantity, retains only the first matching maker fill price, uses nearest book/estimate rows from a ±2-second window, and has no true queue-ahead measurement.
4. A real execution/logging defect exists: Vela records one order price locally, then its broker rounds the submitted price to two decimals. Kalshi's KXBTC15M historical markets used tapered deci-cent price increments above 90c. This can make the actual exchange order differ from the price used by the fill-calibration feature analysis.
5. A model robustness defect exists around feed gaps: missing already-elapsed one-second samples are dropped from `locked`, but the available-sample mean is still weighted by the full elapsed-second count. Missing locked samples do not receive explicit extra uncertainty. Live Binance WebSocket gaps can therefore make `p_side` too confident.
6. On the 69 clean rows where first fill price equals the recorded order price, the reported PnL matches **zero maker fee** and full submitted quantity exactly in 69/69 cases; the later generic `0.0175` maker-fee model matches 0/69. This proves how Vela's own runtime PnL was recorded for these rows. It does NOT by itself prove the historical exchange fee schedule, but it strongly warns against blindly applying the repo's later generic maker-fee assumption to these June fills.

Bottom line: **the committed live-fill sample is substantially more genuine than a README claim, but less clean than the author's step-3 narrative implies.** The actual settlements and PnL rows are credible; the causal explanation of fills, queue mechanics and the strength of adverse selection are not yet established at the same level.

---

## 2. Formal reconstruction of the strategy

For a market closing at `close_ts`, Vela models a settlement based on the mean of 60 RTI observations over the final minute.

At time `now`:

```text
start = close_ts - 60
n_elapsed = clamp(int(now) - start, 0, 60)
locked = Binance proxy values for elapsed settlement seconds that are present
lmean = mean(locked), otherwise latest spot
shat = (lmean * n_elapsed + latest_spot * (60 - n_elapsed)) / 60
mhat = shat - delta
margin = mhat - strike
```

`delta` is Vela's causal Binance-to-RTI basis correction.

Remaining settlement uncertainty is modeled as:

```text
sd_S² = sigma_sec² * remaining_var_factor(n_remaining)
        + resid_std²
```

Then:

```text
p_side = Phi(abs(margin) / sd_S)
bet YES iff margin > 0
```

BTC's current configured gate in the audited code is `p_side >= 0.84`.

For live panic-fade execution, Vela decides near 45 seconds to close, chooses the favored side, reads that side's current best bid, clamps it to the live resting range, sizes from the shared risk ledger, and sends a post-only maker order. Real fills are later polled from Kalshi and settlement PnL is computed from actual fill price/quantity/fees.

This is a coherent model of the right object: **probability of the settlement average crossing the strike**, not probability of BTC's final tick being above the strike.

---

## 3. Exact reproduction of the committed parquet

Independent read of the pinned parquet produced:

| Metric | Independent result |
|---|---:|
| rows | 1,034 |
| unique tickers | 1,034 |
| filled | 88 |
| fill rate | 8.5106% |
| wins | 85 |
| losses | 3 |
| filled win rate | 96.5909% |
| mean model `p_side`, filled | 97.9459% |
| mean model `p_side`, unfilled | 99.7570% |
| mean `net_pnl`, filled row | +$0.1803409 |
| total `net_pnl`, 88 rows | **+$15.87** |
| mean `contracts`, filled rows | 7.0 |

Important interpretation correction: `contracts` in this parquet is the **submitted order count from the grouped order record**, not an independently stored actual filled quantity.

The original `+$0.1803` therefore means:

> mean settlement PnL attached to one of the 88 filled ticker rows

It is NOT:

- +$0.1803 per contract;
- total project profitability;
- the README's 210-window result;
- an ROI measure.

---

## 4. Independent settlement verification — all 1,034 attempts

The audit queried:

`https://external-api.kalshi.com/trade-api/v2/historical/markets/{ticker}`

for all 1,034 tickers.

Coverage: **1,034 / 1,034**.

### Filled

- 85 / 88 chosen sides won;
- **96.5909%**;
- mean model `p_side`: **97.9459%**;
- calibration residual `actual - model`: **-1.355 percentage points**.

### Unfilled

- 946 / 946 chosen sides won;
- **100.0000%**;
- mean model `p_side`: **99.7570%**;
- residual `actual - model`: **+0.243 percentage points**.

### Label integrity

Comparing the parquet's `won` field with independently fetched Kalshi results for the 88 filled rows:

**0 disagreements.**

This strongly supports that the 85/3 result is not fabricated by arbitrary result labels in the committed parquet.

---

## 5. Does this prove adverse selection?

Not as strongly as Vela's original `step3` framing suggests.

A raw comparison says:

```text
filled:   96.591%
unfilled: 100.000%
difference: -3.409 percentage points
```

A naïve two-proportion test calls this extremely different.

But that comparison is confounded: filled attempts were already modeled as much weaker opportunities:

```text
mean p_side filled   = 97.946%
mean p_side unfilled = 99.757%
```

The correct question is not simply whether filled outcomes are worse. It is:

> Are filled outcomes worse **relative to their own model probabilities** than unfilled outcomes are relative to theirs?

The audit used the calibration residual:

`actual outcome - p_side`

and compared filled vs unfilled under a Monte-Carlo null where every row's outcome is generated from its own `p_side`.

Observed additional filled penalty:

**-1.598 percentage points.**

100,000-rep Monte-Carlo two-sided p-value:

**0.265827.**

That is nowhere near conventional statistical significance.

A second equivalent check on the filled subset alone gives:

- expected losses from model: **1.808**;
- observed losses: **3**;
- Poisson-binomial `P(losses >= 3)` under model: **0.268342**.

Therefore the current sample supports:

> fills happen disproportionately in weaker modeled opportunities

but does NOT yet establish:

> being filled adds a statistically demonstrated extra outcome penalty beyond the opportunity's own lower `p_side`.

This distinction matters.

---

## 6. The real risk: three losses consume most of the gains

Across the 88 filled rows:

```text
85 winners:  +$37.79 total   +$0.4446 mean
3 losers:    -$21.92 total   -$7.3067 mean
net:         +$15.87
```

Worst window:

**-$8.16**.

Best window:

**+$6.60**.

One average losing window costs about **16.4 average winning windows**.

The model therefore cannot be judged primarily on win rate. A tiny number of tail failures dominates economics.

The filled win-rate Wilson 95% interval is broad:

**90.45% .. 98.83%**.

The sample is still small relative to the left-tail risk.

---

## 7. Exact three losing windows

### Loss 1 — KXBTC15M

`KXBTC15M-26JUN262145-45`

- side: YES;
- model `p_side`: **91.705%**;
- submitted contracts: 17;
- recorded bid: 0.480;
- first maker fill: 0.480;
- PnL: **-$8.16**;
- placement feature time-to-close: ~44.20 sec.

### Loss 2 — KXBTC15M

`KXBTC15M-26JUN272330-30`

- side: NO;
- model `p_side`: **99.557%**;
- submitted contracts: 16;
- recorded bid: 0.490;
- first maker fill: 0.490;
- PnL: **-$7.84**;
- time-to-close: ~44.29 sec.

This is the most important warning case: even an almost `99.6%` model probability can still fail, and because the fill is near 49c on sixteen contracts, one miss costs far more than a typical winning window earns.

### Loss 3 — KXBTCD

`KXBTCD-26JUN2115-T64099.99`

- side: NO;
- model `p_side`: **95.657%**;
- submitted contracts: 8;
- recorded bid: 0.740;
- first maker fill: 0.740;
- PnL: **-$5.92**;
- time-to-close: ~44.60 sec.

---

## 8. The 88-row headline mixes two different BTC products

The committed calibration table is not just KXBTC15M.

### KXBTC15M

- attempts: 667;
- fills: 57 = 8.546%;
- filled: **55W / 2L = 96.491%**;
- mean filled model p: 97.645%;
- unfilled: **610W / 0L**;
- filled PnL: **+$10.70**;
- winning rows: +$26.70;
- losing rows: -$16.00.

### KXBTCD

- attempts: 367;
- fills: 31 = 8.447%;
- filled: **30W / 1L = 96.774%**;
- mean filled model p: 98.499%;
- unfilled: **336W / 0L**;
- filled PnL: **+$5.17**;
- winning rows: +$11.09;
- losing rows: -$5.92.

The aggregate win rate is similar across the two products, but future research should not automatically pool them. Their strike construction, liquidity and order-book behavior differ.

---

## 9. Dataset-construction defect: repeated placements are collapsed by ticker

Vela's separate `step5` report counts:

- 1,356 total order placements;
- 1,076 resting placements;
- 267 taker placements;
- 13 immediately executed placements.

But `step3_fill_calibration.py` creates only 1,034 maker attempt rows with:

```sql
select ticker, side, min(ts_ms) ts, avg(price) price, avg(count) ct
from orders
where action='place' and status='resting'
group by ticker
```

Therefore **42 resting placement records beyond the first unique ticker are collapsed** into grouped rows.

For a ticker with more than one recorded resting placement, the derived row can combine:

- timestamp from the earliest placement;
- average price across placements;
- average count across placements;
- first matching maker fill from the later fill search.

This is not an order-level causal table. Restart/replacement behavior can contaminate the feature attribution.

The headline 85/3 settlement labels survive this problem because they are ticker outcomes. Fill-model features such as price-to-mid and queue/depth attribution are more vulnerable.

---

## 10. Confirmed execution/logging bug: stored order price can differ from exchange order price

`LiveExecutor.on_decision()` calculates a maker price from the current best bid and stores that floating-point price in the local orders table.

`LiveBroker.place_limit_buy()` then passes the price through `_yes_price_dollars()`, which does:

```python
round(price_dollars, 2)
```

before sending the order to Kalshi.

But the independently fetched historical KXBTC15M market metadata uses a tapered price structure:

- below 0.10: 0.001 increments;
- 0.10–0.90: 0.01 increments;
- above 0.90: **0.001 increments**.

So a valid best bid such as `0.968` need not be rounded to `0.97`, yet Vela's broker does exactly that.

Observed in the committed parquet:

- first fill price **above** logged `our_bid`: 7 rows;
- exactly equal: 69 rows;
- below logged `our_bid`: 12 rows.

The 7 above-limit cases would be impossible for a correctly paired buy-limit if the logged price were the actual submitted limit. Broker-side rounding provides a concrete mechanism explaining them.

Consequences:

1. local `our_bid` is not always the actual exchange limit;
2. `dist_to_mid` and related fill-calibration features can be computed from the wrong order price;
3. queue/depth attribution can refer to a price level different from the one actually joined;
4. sub-cent differences matter when the claimed edge itself can be only a few cents per contract.

This does NOT invalidate the independent 85/3 outcomes or settlement PnL because actual fill price is later read from Kalshi fill records. It does weaken the causal execution analysis around why orders filled.

---

## 11. `our_depth` is not queue-ahead depth

`OrderBook` stores YES and NO bid maps. The engine persists:

```text
depth_yes = sum(all YES bid sizes)
depth_no  = sum(all NO bid sizes)
```

`step3` then assigns the chosen side's total depth to `our_depth` and comments that it is a "queue proxy".

It is not a direct measurement of:

- size resting ahead of this exact order;
- order priority at the joined price;
- fraction of same-price queue ahead;
- actual exchange queue position.

Therefore the public parquet cannot independently prove realistic maker fill probability or queue priority.

---

## 12. Nearest book/estimate feature rows may be post-placement

For each placement `step3` selects the nearest book snapshot / estimate within ±2 seconds using:

```text
order by abs(ts_ms - placement_ts)
```

The signed difference is discarded from the output.

Thus the chosen market feature row can occur **after** the order placement.

This is not outcome leakage in the settlement sense, but it is a causal-analysis problem if the goal is to explain why the order was placed or estimate queue state at submission time. A correct fill model should prefer the latest snapshot at or before submission, or at least retain signed latency and analyze sensitivity.

---

## 13. Fee/PnL surprise: the committed runtime rows behave as zero-maker-fee fills

To avoid contaminated price rows, the audit isolated the 69 filled rows where:

`first fill price == logged order price`.

For each row it tried to reproduce reported `net_pnl` from integer fill quantities up to the submitted count under two simple fee models.

### Zero maker fee

An integer quantity reproduces reported PnL:

**69 / 69**.

The full submitted quantity itself reproduces reported PnL exactly:

**69 / 69**.

### Generic 0.0175 maker fee

An integer quantity reproduces reported PnL:

**0 / 69**.

Full submitted quantity exactly reproduces PnL:

**0 / 69**.

Therefore, for this clean subset, the committed live PnL is exactly:

```text
winner: qty * (1 - fill_price)
loser:  -qty * fill_price
```

with **no maker fee deducted**.

This is strong internal evidence that the real fills represented in this June dataset carried no maker fee in Vela's exchange-returned/accounting path, or at minimum were recorded as if they did not.

It also means the repo's later generic `MAKER_FEE_RATE = 0.0175` should NOT simply be imposed retroactively on these committed live rows.

What this audit does NOT prove is the complete official June fee applicability history for every series. Historical fee applicability should be confirmed from an authoritative June schedule if that distinction becomes important.

---

## 14. Model robustness defect under missing Binance seconds

The formal projection calculates:

```text
n_elapsed = number of elapsed seconds in the settlement minute
locked = only exact-second Binance buckets that actually exist
n_lock = len(locked)
lmean = mean(locked)
shat = (lmean * n_elapsed + spot * (60 - n_elapsed)) / 60
```

If every elapsed second is present, this is coherent.

If the Binance WebSocket misses already-elapsed seconds, however:

- `n_lock < n_elapsed`;
- missing values are dropped from `locked`;
- mean of the surviving values is multiplied by **all `n_elapsed` seconds**;
- no extra uncertainty is added for the missing elapsed samples.

Vela's feed stores exact one-second closes and reconnects after outages; it does not reconstruct missing buckets inside this live path.

Therefore a feed gap can make the point estimate and especially confidence too optimistic.

This matters because the repo's own later refactor commit discovered persisted live tick sampling gaps under loop drift. The exact effect on these 1,034 attempts cannot be recovered from the public parquet because the full runtime buffer/database is not published.

---

## 15. Minor variance edge case

`_remaining_var_factor(n_rem)` returns zero for `n_rem <= 1`.

For exactly one remaining Brownian sample, the diffusion variance term should not mathematically be exactly zero; it should still contain a `1/60²` scaled contribution.

This is a small code-level defect. It is unlikely to matter for the audited maker decisions because the losing/fill examples are around 44 seconds to close, far from `n_rem=1`.

---

## 16. What remains genuinely strong after the adversarial audit

The following survived:

1. The committed parquet is internally readable and the author's headline 88 / 85W-3L / +$0.1803 figures reproduce exactly.
2. All 88 filled outcome labels match independently fetched Kalshi settlements.
3. All 946 unfilled chosen sides also independently resolve as winners, confirming that the model was genuinely extremely accurate over this short sample rather than merely on filled rows.
4. The model is pointed at the correct economic object — the settlement average rather than last price.
5. The strategy really did generate exchange fills and left a plausible live execution trail in code/history.
6. The 88-row sample's PnL is positive: +$15.87.
7. Both KXBTC15M and KXBTCD subgroups are positive in this sample.

---

## 17. What is weakened or NOT proven

The following should be downgraded:

1. **Extra adverse selection:** plausible, but not statistically demonstrated after controlling for `p_side` in this small sample (`p≈0.266`).
2. **Queue/fill model:** not independently established; total-side depth is not queue ahead.
3. **Order-price feature integrity:** broker rounding can make actual order price differ from logged `our_bid`.
4. **Order-level attribution:** repeated placements are collapsed by ticker.
5. **Exact `p_side` robustness during feed gaps:** not assured.
6. **Full 210-window / +$20.23 README result:** not independently reproducible with current public files.
7. **Persistence today:** June execution evidence does not prove the same opportunity survives in September.

---

## 18. Research interpretation

The strongest finding is not "97% win-rate bot."

It is this:

> A model can identify nearly locked settlement states extremely well, while executable profits depend almost entirely on a much rarer event: another participant must sell the favored side cheaply enough to compensate for the catastrophic payoff when the near-lock model is wrong.

The 946/946 unfilled results make the paradox especially clear: the best-looking predictions were mostly useless economically because nobody sold them to the bot.

The three fills that failed show the opposite side: the market is most willing to trade against you precisely in the tail cases where being wrong is expensive.

The sample is too small to prove the fill itself causally creates an extra information disadvantage, but it is more than enough to show why **prediction accuracy alone is the wrong objective**.

For future repo hunting, this becomes a reusable audit template:

`model accuracy -> market price -> actual order semantics -> queue/fill selection -> fees -> settlement -> tail PnL`.

Any public strategy missing one of those links should be treated as incomplete.

---

## 19. Recommended next independent experiment

Do NOT optimize Vela's June parameters further against this same sample.

A clean next experiment is a fresh, frozen, no-money forward capture:

1. Freeze the settlement model and candidate gates before collection.
2. Use current direct RTI if available plus independent BTC proxy feeds.
3. Record every decision with every expected settlement input.
4. Record exact pre-order book state.
5. Record the exact submitted exchange price AFTER tick-size normalization.
6. Record exchange order ID and exact queue-position/queue-ahead data if available.
7. Record all partial fills, quantities, prices and returned fee fields.
8. Independently settle every attempt, including unfilled attempts.
9. Analyze BTC15M and BTCD separately first.
10. Test model calibration and fill-conditional residuals out of sample.
11. Report average win, average loss, worst loss and CVaR before headline win rate.

Only that would answer the remaining economically important question:

> Does the panic-fade still have positive executable expectancy now, after realistic fill selection and tail losses?
