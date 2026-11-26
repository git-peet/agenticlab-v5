# ALPHA-DELIVERY-R2 — PBI 2 exploratory result

**Status:** complete but excluded from the R1↔R2 comparison.

## Why excluded

R2 PBI 2 required multiple in-run operator decisions that changed the task conditions:

- exact migration filename had to be re-serialized into the checkpoint after the R1-style placeholder blocked the gate;
- empty `backend/app/frontend/` directory authorized for validation;
- model edits authorized for indexes and pre-existing forward-reference drift;
- test fixture edit authorized for a stale user-id assertion;
- generated client's removal of dev-only private operations accepted;
- a temporary `/tmp` copy of generated client source was made and deleted by the agent during diffing.

These are useful governance observations, but they are not like-for-like with R1.

## Result

Application code, docs, tests, migration, client regeneration, and implementation log are complete.

- 8 retrieval calls, all complete `no_match`;
- 11 gate blocks: 3 action-scope, 4 knowledge-shell, 4 sensitive-path;
- 2,090 s window, 171 tool calls, 18.4M tokens, $0.1600;
- 8 knowledge candidates staged and promoted after explicit confirmations.

The high block count and repeated no-match calls made this the highest-friction PBI in either round.

## Interpretation

Two distinct signals:

1. **Workflow/tooling fragility** — exact-path scope, test-env imports, model/migration drift, and generated-client behavior caused repeated decisions. These are AgenticLab/workspace issues, not product feature defects.
2. **Knowledge capture strength** — eight source-backed facts were promoted from a fresh workspace with no prior R1 records. This shows the capture loop can build a project corpus quickly from real work.

Not a valid signal for C13 query guidance because operator interventions dominated the run.

## Decision

Exclude PBI 2 from R2's metrics comparison. Keep its log and promoted records as workspace evidence. Continue the comparison with PBI 4, 7, and 9 under unchanged task prompts.
