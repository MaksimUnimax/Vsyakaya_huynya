# B1 — Autonomous Supplier Negotiation for Russian Procurement

Дата закрытия: 2026-09-16.

Статус: `KILL__POWERFUL_PROCUREMENT_INCUMBENTS_CAN_ADD_THE_AGENT_TOO_EASILY`

## Идея

Pactum-like autonomous bilateral negotiation layer for Russian procurement:

`buyer uploads existing supplier base + current terms -> defines per-supplier/segment guardrails -> agent contacts suppliers -> negotiates payment terms / rebates / discounts / volume trade-offs -> escalates exceptions -> records agreed result and measurable savings`.

This is distinct from a classic reverse auction. Pactum explicitly supports supplier-level commercial-term negotiations, single-source negotiations, long-tail suppliers, post-sourcing negotiations and mass campaigns where no competitive sourcing event is required.

## Western demand is real

Pactum publicly positions autonomous negotiations as a way to engage the unmanaged supplier tail and negotiate payment terms, rebates and discounts at scale.

Sources:
- https://pactum.com/autonomous-procurement-with-pactum
- https://pactum.com/blog/the-first-and-only-use-case-catalog-for-autonomous-negotiations
- https://pactum.com/blog/procurement-campaign
- https://pactum.com/campaigns-agents

Public vendor case studies include Walmart and Honeywell. Pactum states Walmart achieved roughly 3% average gain and large payment-term improvements across autonomous supplier negotiations. These are vendor-provided case studies, so they prove production use and willingness to deploy, not an independent universal ROI benchmark.

Keelvar independently demonstrates a broader mature autonomous-procurement category, including agent-operated sourcing and supplier-side bid automation.

## Russian exact gap existed at feature level

A current bounded search did not find a Russian product publicly stating the exact workflow:

`guardrails -> AI agent itself conducts individualized bilateral negotiation -> supplier counteroffers -> agent trades price/payment/volume variables -> closes within bounds`.

Russian products found mostly automate:
- supplier discovery and evaluation;
- procurement creation;
- tender/risk analysis;
- competitive auctions/peretorzhka;
- routine supplier Q&A;
- procurement documents.

B2B-Center and Bidzaar already support mature reverse-auction/peretorzhka workflows. B2B-Center procedures can allow suppliers to edit payment terms as well as price, and Bidzaar cases show measurable price reductions from competition.

That does not equal Pactum-style bilateral supplier-by-supplier autonomous negotiation.

## Why the candidate is still KILL

The remaining gap is strategically too easy for incumbent Russian procurement platforms to fill.

### B2B-RTS / B2B-Center already owns nearly all required primitives

As of 2026 B2B-RTS publicly reports:
- a common B2B-RTS AI platform;
- 20 customer-facing AI agents, with 5 already in production and 15 in pilots/testing;
- its own low-code AI-agent constructor;
- supplier-side and buyer-side AI assistants;
- procurement/SRM products and an existing supplier network;
- direct supplier communication surfaces.

Source:
https://b2b-rts.ru/press-center/news/b2b-rts-masshtabiruet-ekosistemu-iskusstvennogo-intellekta/

B2B-Center has also already added an AI assistant to supplier chats in `Буст 2.0`; it analyzes the supplier's question and existing conversation and answers routine questions autonomously.

Source:
https://www.b2b-center.ru/news/?id=613

`Буст` already searches suppliers, sends requests directly to them, verifies them and aggregates offers.

Source:
https://www.b2b-center.ru/bust/

Therefore adding a bounded negotiation policy/agent is an extension of infrastructure and relationships they already control.

### Bidzaar is similarly close

Bidzaar already has:
- its own AI module for supplier discovery/evaluation;
- a large supplier network;
- embedded buyer-supplier chats;
- multi-stage tenders and peretorzhka;
- buyer workflows where suppliers improve price, payment and delivery terms.

Sources:
https://bidzaar.com/bidzaar-ai
https://bidzaar.com/for-purchasers

### Distribution asymmetry is fatal

A new entrant would need to earn:
- enterprise procurement trust;
- access to sensitive supplier/commercial data;
- permission to communicate externally in the buyer's name;
- supplier contact reach;
- integration with ERP/SRM/contracts;
- reputation that the bot will not damage supplier relationships.

B2B-RTS/B2B-Center/Bidzaar already possess large portions of those assets.

For them, autonomous negotiation is a new agent/capability. For a startup, the feature requires building the whole buyer/supplier distribution and trust base first.

This fails the existing incumbent rule learned from R1/Parsing.agency.

## OWNER_VERIFIABILITY_GATE

The product itself would pass well:
- buyer provides current terms and allowed guardrails;
- every offer/counteroffer is logged;
- system can prove it never exceeded limits;
- final supplier acceptance is explicit;
- savings / payment-term improvement can be calculated versus baseline;
- contract/addendum remains human-approved.

So owner-verifiability is NOT the rejection reason.

## Reopen condition

Do not reopen generic `Pactum for Russia` unless a structural wedge is found that procurement-platform incumbents cannot easily access, for example:
- a buyer segment not served by their procurement/SRM networks but with very large repeated supplier portfolios;
- a proprietary two-sided supplier network or unique transaction data;
- a channel where negotiation occurs outside and independently of procurement platforms and cannot be added as a simple platform agent;
- a defensible protocol/data/network advantage rather than better prompts or UI.

Final: `KILL__POWERFUL_PROCUREMENT_INCUMBENTS_CAN_ADD_THE_AGENT_TOO_EASILY`.