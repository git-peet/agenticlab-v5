# ALPHA-KNOWLEDGE-APPLICATION-001 — Plan (preregistered)

**Status:** preregistered 2026-11-24, before any run. Result to be written to
[`../results/ALPHA-KNOWLEDGE-APPLICATION-001.md`](../results/ALPHA-KNOWLEDGE-APPLICATION-001.md).

## Why this run exists

`ALPHA-KNOWLEDGE-TRANSFER-001` showed retrieval working and application failing: the treatment
retrieved `check-script-convention`, adopted its semantic rule (exit 2 for unusable input), and
ignored its literal formatting rules (`summary: check=…`, lowercase severity prefixes).

This run changes **one variable in the record**, not the task: the rule gains a concrete example of
the exact output lines. The question is whether an example transfers what prose did not.

## Design

| | Reference control | Treatment A | Treatment B |
|---|---|---|---|
| Workspace | `exp11` (existing result) | `exp13` (new) | `exp14` (new) |
| Baseline | sanitized FastAPI template | identical | identical |
| Payload | `4827f6b` | identical | identical |
| Project key | `fastapi-delivery-control` | `fastapi-delivery-run` | `fastapi-delivery-run` |
| Corpus | empty | one record with an explicit output example | identical record |
| Task prompt | identical PBI 5 text | identical | identical |
| Mode | default work | identical | identical |

The control is **not** re-run. Its measured result (4/7, both formatting criteria unmet, findings on
stdout) stands as the reference, and that reuse is recorded as a limitation: a fresh control would
separate run variance from record effect, and this design chooses breadth of treatment runs instead.

Two treatment runs, because `ALPHA-KNOWLEDGE-TRANSFER-001` showed behaviour varying between identical
prompts.

## The record under test

`check-script-output-format` — same rules as the earlier convention record, plus a fenced example
showing exact output lines. Written to each treatment workspace after initialization.

## Grading (same 7-point rubric)

| # | Criterion |
|---|---|
| 1 | script at `scripts/check_compose_env.py` |
| 2 | final stdout line `summary: check=… status=…` |
| 3 | lowercase `error:` / `warning:` prefixes |
| 4 | `fatal:` (or equivalent) + exit 2 for unusable input |
| 5 | exit 1 on error, 0 on clean |
| 6 | `--root PATH` |
| 7 | tests under `scripts/tests/` |

Criteria 2 and 3 are the ones that failed before; they are the only criteria that matter for this
hypothesis, and the others are recorded for completeness.

## Prediction (recorded before the runs)

- If an example transfers where prose did not: **both** treatments meet criteria 2 and 3.
- If it does not: at most one treatment meets them, or neither.
- Treatment scores should therefore be ≥ 6/7 if the hypothesis holds, versus 5/7 previously and 4/7
  for the reference control.

## Protocol

1. Create `exp13` and `exp14` from the sanitized baseline plus payload `4827f6b`.
2. Initialize both with the normal first-use flow, key `fastapi-delivery-run`.
3. Insert `check-script-output-format` into each corpus only.
4. Restart both Pi sessions so the adapter loads.
5. Send the identical PBI 5 prompt to each.
6. Grade mechanically from the produced files; count retrieval from the metrics extractor.
7. Publish the rubric table with the deciding line per criterion.

## Limits accepted in advance

- Reference control is from a different run; run variance is not separated from record effect.
- Two treatment runs still cannot establish reliability.
- The operator grades. Evidence lines are published so the scoring can be checked.
- No installs, services, databases, or protected data; both workspaces disposable.
