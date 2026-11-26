# ALPHA-DELIVERY-001/R2 — Consolidated R2 result

- **Experiment:** [`ALPHA-DELIVERY-R2`](../experiments/ALPHA-DELIVERY-R2/manifest.json)
- **Workspace:** `AlphaProject-R2` @ local HEAD after PBI 9
- **Payload:** staged C13 `3b69eaa` (clean `50290a9` + query-shape guidance)
- **Model:** `deepseek-v4.1-flash`
- **Status:** complete; PBI 2 and 3 excluded from comparison because of in-run interventions

## Comparison set

| PBI | Task | R1 span | R2 span | R1 cost | R2 cost | R1 tools | R2 tools | R1 retrieval (applicable/calls) | R2 retrieval | R1 gates | R2 gates |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 4 | Conversations UI | 316 s | 625 s | $0.0687 | $0.1139 | 54 | 72 | 2 / 5 | 0 / 2 | 0 | 3 |
| 7 | Search + pagination | 524 s | 515 s | $0.1064 | $0.1112 | 57 | 64 | 3 / 4 | 0 / 2 | 1 | 2 |
| 9 | Triage feedback | 335 s | 515 s | $0.0949 | $0.1151 | 43 | 61 | 1 / 2 | 0 / 2 | 0 | 0 |

Totals across the comparable subset:

- R1: 1,175 s, $0.2700, 154 tool calls, 6 applicable retrievals / 11 calls, 1 gate block
- R2: 1,655 s, $0.3402, 197 tool calls, 0 applicable retrievals / 6 calls, 5 gate blocks

## Result

C13 Level 1 did **not** produce a measurable improvement on this subset:

- slower and more expensive in all three PBIs;
- more tool calls;
- fewer applicable retrieval results;
- more gate blocks overall.

All PBIs still completed with validated, working changes. The experiments are small and task mix was not perfectly controlled; PBI 4 gained edit UI and logout cache clearing in R2, PBI 7 changed bounds/URL state, and R2 built on a different implementation lineage. These are directional results, not proof of regression.

## Why R2 had more friction

Most extra friction came from plan serialization and fresh-workspace facts, not C13 prompt guidance:

- placeholder or annotated `inScope` strings blocked exact-path gates;
- `backend/app/frontend/` was a missing build-time mount prerequisite;
- baseline model/migration drift surfaced only in a fresh workspace;
- generated client emission changed under `FASTAPI_ENV=test`;
- the fresh corpus had no R1 records, so retrieval had less to find.

R2 PBI 2 had 11 gate blocks; PBI 3 had 10. Both were excluded from the comparison set, but they are real governance evidence.

## Knowledge outcome

R2 ended with 19 promoted records, created from a fresh empty corpus through ordinary work. Strong capture/dedup behavior; weak retrieval applicability in the comparison subset.

## Decision and next safe action

Do not publish the staged C13 payload as a proven improvement. The evidence does not justify it.

Next options:

1. Keep C13 as a candidate and leave the published clean payload at `50290a9`.
2. Run a focused C13 A/B on a retrieval-sensitive read-only task rather than full PBIs, where query shaping is the only variable.
3. If retrieval remains weak, evaluate C13 Level 3 topic maps or a bounded preflight under C12's rules, with explicit approval.

No payload publication or further mechanism implementation is authorized by this synthesis.
