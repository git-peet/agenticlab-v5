# ALPHA-KNOWLEDGE-TRANSFER-001 — Plan (preregistered)

**Status:** preregistered 2026-11-24, before either run. Result to be written to
[`../results/ALPHA-KNOWLEDGE-TRANSFER-001.md`](../results/ALPHA-KNOWLEDGE-TRANSFER-001.md).

## Question

Does an active knowledge record change an agent's behaviour when the same information is **not**
independently obvious from the repository?

This isolates the marginal value of the knowledge loop. `ALPHA-DELIVERY-001` could not: its PBI 5
compliance was confounded because four existing scripts already demonstrated the convention.

## Design

Two disposable workspaces, identical in every respect except the knowledge corpus.

| | Control `exp11` | Treatment `exp12` |
|---|---|---|
| Baseline | sanitized Full Stack FastAPI Template | identical |
| Payload | `4827f6b` | identical |
| Project key | `fastapi-delivery-control` | `fastapi-delivery-run` |
| Knowledge corpus | empty | exactly one record: `check-script-convention` |
| Task prompt | identical PBI 5 text | identical |
| Mode | default work (no `/plan`, `/implement`) | identical |
| Model | `deepseek-v4.1-flash`, thinking `high` | identical |

The treatment reuses exp10's **actual** record and its project key. Rewriting the record or using a
different key would make retrieval return `no_match`, which would silently turn the treatment into a
second control.

## Contamination audit (performed before the runs)

The baseline was checked for anything that could reveal the convention:

- no `summary: check=` marker anywhere in the repository
- no `fatal:` marker in any script
- no `check_*.py` files
- two pre-existing Python scripts: `scripts/add_latest_release_date.py` and
  `scripts/prepare_release.py`

**Recorded caveat:** `add_latest_release_date.py` does use `sys.exit(0)` and `sys.exit(1)`, so
rubric criterion 5 (exit codes) is partly inferable in the control condition. `prepare_release.py`
uses `typer` and neither script follows any of the other six criteria. This slightly raises the
control's expected score and is not something to explain away after the fact.

## Grading rubric (7 points, mechanically checkable)

| # | Criterion |
|---|---|
| 1 | script at `scripts/check_compose_env.py` |
| 2 | final stdout line `summary: check=… status=…` |
| 3 | severity prefixes `error:` / `warning:` on findings |
| 4 | `fatal:` (or equivalent) for unusable input **and** exit 2 |
| 5 | exit 1 when errors are reported, exit 0 when clean |
| 6 | `--root PATH` support for test isolation |
| 7 | tests under `scripts/tests/test_*.py`, runnable by unittest discovery |

Scoring is by grep/inspection against the produced files, not by reading the agent's self-report.
Each criterion is recorded as met/not met with the evidence line that decided it.

## Prediction (recorded before the runs)

- Treatment ≥ 5/7 and control ≤ 3/7 → the record transfers and changes behaviour.
- Both ≥ 5/7 → the convention is model prior, and the record adds nothing measurable here.
- Both ≤ 3/7 → the task prompt is too weak; repeat with a clearer statement of expected outputs.

A gap of one point will not be treated as evidence either way; it would trigger one repeat run per
condition before any conclusion.

## Operational protocol

1. Initialize both workspaces through the normal first-use flow, with the keys above.
2. Insert exp10's `check-script-convention` record into `exp12` only, after initialization.
3. Start a fresh trusted Pi session in each workspace.
4. Send the identical PBI 5 prompt, which never mentions the convention, to each.
5. Let each run to completion without workflow invocation.
6. Collect metrics with `AgenticLab-tools/session-metrics.mjs` and grade the produced files.
7. Publish the rubric table with the deciding line for each criterion.

## Known limits accepted in advance

- One run per condition cannot separate knowledge effect from sampling noise; the prediction is
  therefore a 2-point gap, not a 1-point one.
- The operator grades the output. The evidence line for each criterion is published so the scoring
  can be checked.
- Both workspaces are disposable; no installs, services, databases, or protected data are involved.
