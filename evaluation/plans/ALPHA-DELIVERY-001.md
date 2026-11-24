# ALPHA-DELIVERY-001 — Plan (preregistered scope)

**Status:** executed 2026-11-24; result in [`../results/ALPHA-DELIVERY-001.md`](../results/ALPHA-DELIVERY-001.md)

## Question

When the published payload is used for ordinary engineering work rather than governance probing:

1. Do the gates stay out of the way, and are the blocks that occur correct?
2. Does `/plan` → `/implement` cost materially more than default work for comparable tasks?
3. Does a recorded decision transfer to a fresh session?
4. What does one bounded task cost in wall time, tokens, and money?

## Scope

Five stdlib-only maintenance checkers on the sanitized FastAPI template in a disposable workspace
(`exp10`), no dependency install, no network, no services, no database, no Docker:

| PBI | Task | Mode |
|---|---|---|
| 1 | Python runtime version consistency | `/plan` → `/implement` |
| 2 | Alembic migration chain validator | default work |
| 3 | Workflow path validator | default work |
| 4 | Documentation link checker | `/plan` → `/implement` |
| 5 | Compose environment coverage (convention deliberately not briefed) | default work |

## Measures fixed before the run

Per PBI: declared window, tool calls by type, `isError` flags, gate blocks by category, tokens by
category, reported cost, tests passing, and an operator-verified negative control.

## Stated limits accepted in advance

- No baseline condition, so no speed claim is possible from this run.
- PBI 5's convention is a knowledge test only if the convention is not independently obvious from
  the repository; if it is, the result is a weaker signal and must be reported as such.
- Operator approvals of plans do not measure human approval cost.

## Amendments during the run

- The run used four Pi sessions instead of one: the action-scope gate could not be released within a
  session after a plan kept its checkpoint, so default-work tasks in later PBIs were blocked until a
  restart. Recorded as a finding, not a plan change.
