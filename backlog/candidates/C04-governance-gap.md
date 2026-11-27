# V52-C04-governance-gap — V4-to-V5 governance mechanism gap tracking

**Status:** `candidate`; reconciled 2026-11-23 after the first C04 sensitive-file slice. Historical gap table retained; current dispositions and next-slice decision recorded below. This document remains a tracking/decision aid, not implementation authorization.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C04 governance/safety](C04-governance-safety.md), [V4 governance](file:///home/peet/Projects/AgenticLab-V4/brain/governance.md), [V4 protocol](file:///home/peet/Projects/AgenticLab-V4/brain/protocol.md)

## Purpose

Track every V4 governance mechanism that was audited and confirmed missing from V5, so we can revisit after the backlog is completed and verify nothing was overlooked. This candidate documents the gap only — it does **not** select any governance implementation slice, does **not** port V4 thresholds blindly, and does **not** authorize any mutating change to canonical V5.

## Background

The V5 audit compared V4 governance (`governance.md`, `protocol.md`) against V5 `system/brain/operating-contract.md`. V4 made governance a substantive layer: zero-tolerance table, blocker protocol, tiered autonomy model, fix-attempt caps, loop governance tool-call caps, DIGEST/semantic-map injection at session start, credential redaction, and memory curation items. V5 currently covers only baseline mode rules, authority and scope boundaries, durable knowledge boundary, and code/dependency boundaries — documented in `operating-contract.md`.

This gap was surfaced during C03 context-engineering work and confirmed in dev-log entries `V5-20261007-094` (C04 governance boundaries clarified), `V5-20261018-238` (C04 governance and safety evaluation), and `V5-20261018-239` (integration of validated knowledge-capture mechanisms).

## Findings: original V4-to-V5 audit (historical)

The `Status` values in this table reflect the original audit snapshot. They are not the current disposition; see **Current reconciliation (2026-11-23)** below.

| # | V4 mechanism | V4 source | V5 current state | Status |
|---|--------------|-----------|------------------|--------|
| 1 | **Zero-tolerance table** — delete git hook files (`rm .git/hooks/`), `git commit`/`git push` without prior explicit approval | `governance.md` §3 | Not present in V5 operating contract | **Missing** |
| 2 | **Blocker protocol** — any agent, any phase, may raise a blocker immediately; cascade termination rule (one reroute max) | `protocol.md` §4 | Generic “raise a blocker” line only in V5 contract | **Missing structured protocol** |
| 3 | **Tiered autonomy model** — Tier C always gated, Tier B bounded, Tier A unrestricted | `governance.md` §6 | Not defined in V5 | **Missing** |
| 4 | **Fix-attempt caps** — 2 failed fix attempts for same issue → stop immediately, raise blocker | `protocol.md` §3 | Not present in V5 | **Missing** |
| 5 | **Loop governance** — tool-call cap, compact discipline, fix-attempt cap as three independent mechanisms | `protocol.md` §3 | Mentioned only in prose, no table or explicit cap | **Partial / missing table** |
| 6 | **DIGEST / semantic-map injection at session start** — always-on knowledge summary injected alongside brain modules | `protocol.md` Step 8, `memory-spec.md` §2 | Not present in V5 | **Missing** |
| 7 | **Credential redaction / secret detector** — avoid keyword-only matching; tested with synthetic positives and negatives | V4 Neo audit Findings 3 and 11–13 | Not present in V5 | **Missing** |
| 8 | **Memory curation items** — user notes, backlog candidates curation pipeline | V4 `MANUAL.md` §7 | Not present in V5 | **Missing** |

## Current reconciliation (2026-11-23)

This reconciliation uses V5.2, the clean payload after commit `77e315a`, the exp5 C04 prototype, and the exp6 fresh-initialization validation. It applies the C04 decision rules: preserve valuable V4 functions, reject V4 topology/thresholds without evidence, and avoid new machinery unless a real gap justifies it.

| # | V4 mechanism | Current V5/C04 position | Enforcement class | Evidence | Disposition |
|---|--------------|--------------------------|-------------------|----------|-------------|
| 1 | Zero-tolerance table | V5 has semantic approval boundaries for commits, pushes, installs, network, destructive/external actions, and durable knowledge writes. The V4 table and command patterns were not ported. | Semantic / interaction-level; not deterministic command interception | exp5 PBI6: commit and install stopped/asked; push blocked by missing remote, not approval semantics | **Covered semantically. Do not port V4 table.** Revisit only on a demonstrated bypass. |
| 2 | Blocker protocol | Clean payload now includes `Critical assumptions and blockers`: stop, state what was found, why it blocks, and the specific decision needed. No structured schema or cascade rule. | Semantic | Plan/implement stop conditions and exp5/exp6 validation | **Partially covered semantically. Defer structured protocol** until repeated ambiguity or coordination need appears. |
| 3 | Tiered autonomy model | V5 continues to distinguish bounded authorized work from separately gated high-risk actions. No Tier A/B/C labels. | Semantic | C04 audit and current AGENTS/operating contract | **Determined not needed as a V4-labeled system.** Keep the smaller action-boundary model. |
| 4 | Fix-attempt caps | No attempt counter or fixed cap exists. | Absent | C04 audit; no repeated failure evidence from current delivery work | **Defer.** Do not import V4 number `2` without V5 evidence. |
| 5 | Loop governance | No tool-call cap table or fixed compact/fix threshold exists in V5 governance. | Absent / host-managed context where available | C04 audit; no current material failure | **Defer.** Do not add numeric caps speculatively. |
| 6 | DIGEST / semantic-map injection | Not implemented; V5 uses scoped retrieval and navigation rather than always-on summaries. | Absent by design | V5.2 context-cost evidence; C02/C03 history | **Defer / likely unnecessary.** Revisit only if selective retrieval repeatedly fails for a named task. |
| 7 | Credential redaction / secret detector | Path-based sensitive-file boundary implemented in clean payload: `.env`, `.env.*`, `frontend/.env`, credentials/keys/secrets semantics; no content-based secret scanner. | Deterministic lexical gate + semantic rule | 13/13 tests; exp5 PBI2b/PBI3; exp6 fresh init and live probes | **Partially covered. Keep path-based boundary. Defer content-based scanning.** No V4 regexes were ported. |
| 8 | Memory curation items | V5 has C02 candidate → inactive staging → explicit promotion/correction lifecycle. No V4 curation pipeline. | Deterministic adapter lifecycle + semantic contract | C02 validation history; clean payload lifecycle | **Covered by C02. No C04 action.** |

### Selected slice decision (historical, implemented)

The selected C04 candidate slice was **action-scope fidelity for consequential commands and writes**. It was selected over tier labels, fixed loop caps, zero-tolerance tables, and content-based secret scanning because:

- semantic authorization fidelity is already published but not deterministically tested in general delivery;
- the Evershop command-scope incident and model-dependent tool-use traces are concrete evidence;
- the slice can be bounded to allowed/denied/ask/stop behavior with benign and adversarial cases;
- it does not require a broad governance engine.

This reconciliation did not itself authorize implementation. The slice was subsequently prototyped, validated, ported, and published at clean-payload `4f44378`, with knowledge-path and write-capable-read fixes following at `f2040da`, `0d70107`, and `3fafca9`; see `C04.2` for the evidence and limits.

### Explicit exclusions (from C04 governance/safety candidate)

These must **not** be blindly ported from V4 without a V5-specific justification:
- V4 `.env` regexes
- V4 fixed tool-call / fix-attempt numbers (unless re-derived for V5)
- V4 Pi hooks
- V4 Tier A/B/C labels
- V4 memory paths

## Next steps after reconciliation

1. **Done:** re-review the original eight findings against current V5, clean payload, exp5, and exp6 evidence.
2. **Done:** decide current treatment for each finding in the reconciliation table.
3. **Done for the implemented slice:** add validation tests for the sensitive-file boundary; node and live Pi checks passed.
4. **Done:** action-scope fidelity was prototyped in a fresh exp7 workspace, validated with 16/16 external tests plus live Pi probes, staged as a generic-only diff, and published at `4f44378`. Subsequent hardening was published through `d07ff5d`.
5. **Still required:** obtain explicit approval before any further governance implementation, clean-payload change, or publication.

## Acceptance criteria for revisiting after backlog completion

- [x] All 8 findings in this candidate are accounted for in the current reconciliation table.
- [x] The implemented C04 slice passes a validation suite: `node --check`, 13/13 external tests, and live Pi validation in exp5/exp6.
- [x] V4 exclusions verified: no V4 `.env` regexes, fixed tool-call/fix-attempt numbers, Pi hooks, Tier A/B/C labels, or V4 memory paths were ported.
- [x] The original eight-item V4 audit list was reviewed; no additional item was added from that list. New work requires fresh evidence.
- [x] The action-scope slice passed 16/16 external tests, live Pi probes, and a generic-only port review before publication at `4f44378`.

## References

- Dev-log: `V5-20261007-094` — C04 governance boundaries clarified
- Dev-log: `V5-20261018-238` — C04 governance and safety evaluation (ALPHA-C04-GOVERNANCE-SAFETY-001)
- Dev-log: `V5-20261018-239` — Integration of validated knowledge-capture mechanisms
- V4 governance: `/home/peet/Projects/AgenticLab-V4/brain/governance.md`
- V4 protocol: `/home/peet/Projects/AgenticLab-V4/brain/protocol.md`
- V5 operating contract: `/home/peet/Projects/AgenticLab-v5/system/brain/operating-contract.md`
- C04 governance/safety candidate: `backlog/candidates/C04-governance-safety.md`
- V4 audit history: `/home/peet/Projects/AgenticLab-V4/` (governance.md revision log, protocol.md revision log)
