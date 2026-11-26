# ALPHA-DELIVERY-001 — Consolidated R1 result

- **Experiment:** [`ALPHA-DELIVERY-R1`](../experiments/ALPHA-DELIVERY-R1/manifest.json)
- **Workspace:** `AlphaProject` @ `9967003`
- **Payload:** `1f26fbe`
- **Model phases:** free (`hy4-flash-free`) for PBI 0–1; paid (`deepseek-v4.1-flash`) for PBI 2–5, 7–9
- **Status:** candidate PBI sequence closed; PBI 6 deferred by design, PBI 10 not applicable

## Summary

Nine PBIs were delivered across a real FastAPI/React template: a safe test runner, a full-stack
item-priority slice, conversation CRUD, synchronous triage, a Conversations UI, content-free usage
accounting, search/pagination, export, and structured feedback. All were validated with source
checks, focused tests, full suites, and browser checks where UI was involved. No task was broken by
a governance gate.

The clearest positive signal is qualitative and supported by the data: from the paid-model phase
onward, the workflow felt smoother, retrieval was consulted during normal work, and knowledge was
promoted with little ceremony. The clearest unresolved weakness is retrieval precision: many
lookups returned `no_match`.

## Per-PBI metrics

| PBI | Task | Span | Tools | Retrieval (applicable/calls) | Tokens | Cost | Gate blocks |
|---|---|---:|---:|---:|---:|---:|---:|
| 0 | Isolated test DB runner | 3,205 s* | 84 | 2 / 7 | 4.0M | free | 5 |
| 1 | Item priority slice | 29,608 s* | 120 | 4 / 10 | 15.5M | free | 4 |
| 2 | Conversation CRUD | 445 s | 68 | 1 / 7 | 11.0M | $0.0868 | 4 |
| 3 | Synchronous triage | 459 s | 60 | 2 / 5 | 14.4M | $0.0700 | 2 |
| 4 | Conversations UI | 316 s | 54 | 2 / 5 | 14.4M | $0.0687 | 0 |
| 5 | Usage accounting | 998 s* | 80 | 3 / 6 | 26.5M | $0.1607 | 0 |
| 7 | Search + pagination | 524 s | 57 | 3 / 4 | 24.1M | $0.1064 | 1 |
| 8 | Conversation export | 425 s | 48 | 1 / 4 | 24.2M | $0.0941 | 2 |
| 9 | Triage feedback | 335 s | 43 | 1 / 2 | 24.6M | $0.0949 | 0 |

\* PBI 1's span includes a long blocked interval; PBI 5 includes the laptop-crash interruption.
PBI 0–1 have no usable cost under the free model.

Paid-model subset totals (PBI 2–5, 7–9): **3,502 s, 410 tool calls, 33 retrieval calls / 13
applicable, 139.2M tokens, $0.6814, 9 gate blocks.**

## Findings

1. **Delivery completed.** Each PBI produced a working, scoped change with verification. No gate
   block broke a task.
2. **Retrieval activated in default work.** Across the paid subset, 33 lookups occurred. The agent
   used specific records for the no-transcript-echo rule, the injected triage client, the Playwright
   locator issue, and the download-link constraint.
3. **Retrieval precision is weak.** 20 of 33 paid-subset lookups were `no_match`. Activation is
   real; query/record matching needs calibration.
4. **Knowledge deduplication worked.** In PBI 9 the agent found an existing locator record and staged
   nothing, instead of duplicating it.
5. **Gate friction declined.** Paid-subset blocks were 4 → 2 → 0 → 0 → 1 → 2 → 0. Many early
   blocks were avoidable (`chmod +x`, knowledge-shell command shapes) and were later handled better.
6. **Prompt ordering was the recurring workflow defect.** Both A and B disposition branches caused
   trouble when the log was not written first. The lab workaround — write the log before A/B —
   worked in PBI 1–9; the prompt fix remains proposed, not applied.
7. **Schema work needs explicit lab-DB migration.** PBI 1 exposed the failure mode; every later
   schema PBI migrated the running lab database after isolated validation.
8. **Generated client whitespace was a recurring review cost.** SDK files produced trailing blank
   lines; review trimmed them before commit. A generic generation/format step is a small candidate.
9. **UI work was faster and cleaner.** The UI-heavy PBIs (4, 9) had no gate blocks and low span, but
   task complexity was not controlled, so this is directional only.

## Limits

- No same-task plain-Pi baseline, so efficiency and causal benefit are not established.
- One model per paid phase; no cross-model generalization.
- Two free-model PBIs have no cost data and one has a contaminated span.
- PBI 5 span includes a crash/resume; PBI 4 deferred the edit form.
- Approval prompts and latency are not captured automatically.
- Gate blocks are counted but not automatically classified as correct or incorrect.

## Decision and next safe action

Keep R1 as the working baseline. Before R2, the strongest bounded improvements are:

1. Write the implementation log before checkpoint disposition in `prompts/delivery/implement.md`.
2. Improve retrieval query guidance / record vocabulary to reduce `no_match` calls.
3. Consider normalizing generated SDK whitespace at generation time.

R2 should repeat the same PBI set under the same model phase and tagged manifest, then compare
like-for-like. No payload change is authorized by this result alone.
