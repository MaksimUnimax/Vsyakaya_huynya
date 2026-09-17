# Candidate deep dive — yoho369/crypto-perpetual-arbitrage

Date: 2026-09-17
Status: **CANDIDATE / DEEPENED / NOT PROMOTED / NOT YET BROKEN**

Repo: `yoho369/crypto-perpetual-arbitrage`

This file does not promote the repo into `INTERESTING_REPOS.md`; only the owner can do that.

## 1. What the project is trying to exploit

The same crypto perpetual future trades simultaneously on several exchanges: Binance, Bybit, OKX, Gate, Hyperliquid and KuCoin.

If one venue temporarily quotes the same contract materially higher than another, the strategy tries to:
- short the expensive venue;
- long the cheap venue;
- wait for the cross-exchange price gap to shrink.

The intended profit is the **convergence of the relative price gap**, not a directional prediction that BTC/AVAX/etc. rises or falls.

## 2. Why funding is removed before deciding that a gap is abnormal

Perpetual futures use funding payments to anchor contracts to spot. Exchanges have different funding rates and settlement intervals. A persistent price gap can therefore be compensation for future funding rather than a free mispricing.

The data pipeline constructs funding-adjusted prices from each exchange's index/mark/mid and inferred funding accrual. The strategy then measures the cross-exchange spread in this adjusted space.

Plain-language idea:

> first remove the predictable rent attached to each venue's perpetual contract; only then ask whether the remaining price difference is unusually large.

## 3. What the OU model means here

Ornstein-Uhlenbeck is a formal version of a rubber-band assumption.

For each venue pair, the author assumes that the adjusted spread has:
- a moving normal level;
- typical variability around that level;
- a tendency to return after an unusually large displacement.

The live/backtest signal estimates this from a rolling 1,440-minute (~24h) history using lagged observations. The current spread is turned into an `s_score`, roughly:

> “how many normal spread-volatility units away from the estimated equilibrium are we?”

The headline entry gate is usually `|s| >= 4.0`.

OU is therefore not magic prediction of crypto. It is simply a decision rule saying that a very extreme relative-price gap is more likely to close than continue widening.

## 4. What is good about the backtest design

Compared with many toy arbitrage repos, several parts are materially better:

- one-minute **BBO** (best bid / best ask), not just midpoint or last price;
- entry execution uses the bid on the short leg and ask on the long leg;
- fees for both exchanges are explicitly deducted;
- a bid-ask-width guard rejects visibly bad books;
- signal parameters are rolling/ex-ante with shift barriers rather than fit on the current/future window;
- funding events can force an exit so the model does not casually ignore transfer payments;
- there is a 300-minute maximum holding period;
- a net-EV gate requires estimated convergence to exceed fees plus a liquidity/spread hurdle.

These are reasons to keep auditing rather than dismissing the repo immediately.

## 5. Historical 2025 headline is uneven, not universally magical

Stored notebook output for 2025 shows BTC with:
- 117 trades;
- win rate 44.44%;
- +432.66 bps cumulative PnL;
- calendar Sharpe ~2.01;
- trade-level Sharpe only ~0.18.

Different venue pairs are very uneven. Some make money; others lose. AVAX has much larger apparent returns but also enormous single-trade losses on some venue pairs. This is not a smooth “everything mean-reverts” story.

## 6. What the 2026 OOS claim actually contains

The notebook has an explicit Jan-Feb 2026 evaluation block:

`2026-01-01 -> 2026-02-28`.

Token-specific frozen-looking configs include:
- BTC: sigma 4.0, max spread 10 bps;
- AVAX: sigma 4.0, max spread 20 bps;
- BERA: sigma 4.0, max spread 10 bps;
- KAITO: sigma 4.0, max spread 5 bps.

The attractive README wording sounds much stronger than the sample sizes actually are.

### AVAX

The “perfect win rate” is only:
- **5 trades**;
- **5/5 wins**;
- +21.00 bps total;
- all 5 exits were normal mean-reversion hits.

Five wins are interesting but not evidence of a stable high-win-rate process.

### BERA

The stronger holdout is:
- **23 trades**;
- 78.26% win rate = 18/23;
- **+336.88 bps** cumulative PnL;
- calendar Sharpe ~4.26;
- 15 normal mean-reversion exits;
- 8 normal funding exits;
- **0 imputed exits** in this OOS slice.

The absence of imputed exits matters: one suspicious fallback in the engine cannot explain the BERA headline by itself.

## 7. Why “OOS” is still weaker than a true forward test

The repository itself was created in late May 2026. The claimed OOS period is January-February 2026, already fully known by the time the public repo appeared.

A retrospective holdout can be legitimate if:
- all model choices were made only on 2025;
- Jan-Feb 2026 was genuinely untouched until final evaluation.

But the public Git history cannot prove that chronology because both train and holdout outcomes were already historical before publication.

So treat this as:

**retrospective holdout evidence**

not:

**prospective frozen forward test**.

## 8. Parameter-selection risk

The sensitivity notebook explicitly sweeps:
- sigma thresholds: 2.0, 2.5, 3.0, 3.5, 4.0;
- book-width guards: 5, 10, 20 bps plus unconstrained.

The selected per-token settings appear intended to come from 2025 sensitivity and then be applied to Jan-Feb 2026. That is a reasonable research design if the sequence was truly frozen, but because publication came later it remains a claim we cannot independently timestamp.

## 9. Important execution limitations

### A. No order-book depth

BBO tells us only the best price, not how much size is available there.

A displayed ask can be real for $5 of size and useless for a $10,000 position. The backtest does not walk deeper levels.

### B. No two-leg execution race

The model acts as if the long and short legs can both be obtained from their same-minute snapshots. In reality one venue may fill first and the other quote may disappear, creating temporary or permanent directional exposure.

### C. One-minute data is coarse for arbitrage

Cross-exchange crypto gaps can disappear in milliseconds or seconds. A one-minute BBO sample can establish that two snapshots differed; it cannot establish that a two-leg strategy could capture the gap at real latency.

### D. BBO forward-fill up to three minutes

The execution loader reindexes and forward-fills BBO for up to three missing minutes. That means some “current” executable prices can actually be old observations.

### E. Signal data has an even broader stale-data concern

The master data pipeline computes a `stale_*` flag, but then forward-fills bid/ask/mid/index/mark without an equivalent hard age limit. The backtest's signal path uses funding-adjusted spread columns and does not obviously veto entries based on those stale flags.

This means the **signal** can potentially be generated by stale carried-forward source values even if the execution BBO passes its own separate checks.

### F. Forced-exit imputation

At funding/timeout, if current BBO is missing, the engine can use the last prior valid BBO to force a close. That can make an ugly illiquid exit look better than reality.

This is a real general weakness, but it did **not** drive the attractive BERA Jan-Feb OOS slice because that slice reports zero imputed exits.

## 10. Conceptual mismatch worth auditing

The signal is built in a **funding-adjusted spread space**, but the convergence target/exit test uses a trailing mean of the **raw physical spread**.

That may be intentional: adjusted space identifies an abnormal dislocation while raw prices determine actual executable convergence. But it mixes two different objects and deserves an explicit derivation. A future reproduction should test whether the result survives when signal and target are defined consistently in the same economic space.

## 11. “Liquidity toll” is not liquidity simulation

The engine subtracts a rolling median combined bid-ask spread as an expected friction hurdle. That is useful, but it is not the same as:
- actual depth available at BBO;
- queue position;
- slippage for trade size;
- simultaneous two-leg fill probability.

So a positive `Net EV` in this backtest means “positive after fees and a spread-based friction proxy,” not “proven executable arbitrage.”

## 12. Current assessment

Unlike `maxstw23/pairs-trading`, no single accounting bug has yet destroyed this repo's headline.

The good news:
- signal construction is mostly causal;
- bid/ask and fees are used;
- BERA OOS survives the obvious imputed-exit suspicion;
- not every asset/config wins, which is more believable than a universally perfect system.

The unresolved problem is **execution realism and chronology**, not an already-proven fake formula:

`minute BBO != depth != simultaneous fill != live arbitrage`.

The next serious test is therefore not more parameter tweaking. It is to obtain/pin the supplied master data, reproduce all 2025 + Jan-Feb 2026 tables exactly, then rerun with:
- no stale inputs;
- no imputed exit prices;
- size-aware depth/slippage if recoverable;
- one common frozen parameter rule;
- separate reporting of each venue pair;
- and preferably a genuinely later untouched period.
