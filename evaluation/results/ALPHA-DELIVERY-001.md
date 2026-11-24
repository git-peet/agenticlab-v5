# ALPHA-DELIVERY-001 — Result

- **Preregistration:** [`../plans/ALPHA-DELIVERY-001.md`](../plans/ALPHA-DELIVERY-001.md) (scope drafted as `exp10/PBIs.md` before the run; see deviations)
- **Status:** pass with defects found
- **Run date/time and offset:** 2026-11-24, UTC+01:00
- **Workspace label:** `exp10` (`/home/peet/Projects/exp10`), disposable
- **Payload revision:** `a60dce9` (defects fixed afterwards in `4827f6b`)
- **Pi version:** 1.6.0
- **Model/provider/mode:** `deepseek-v4.1-flash` via `opencode-go`, thinking level `high`, interactive TUI in Orca

## Summary

Five bounded delivery tasks were implemented in one disposable workspace. All five produce working,
stdlib-only maintenance checkers with tests; 148 tests pass and every checker exits 0 on the
repository. Each negative control was verified by the operator independently of the agent.

The session's purpose was not to validate governance but to use the payload for ordinary work. It
found four real frictions, two of them false positives, and it answered the knowledge question with
a caveat: a recorded convention was retrieved in a fresh session and complied with, but the same
convention was also visible in the code the agent had already written.

## Acceptance results

| Area/check | Result | Evidence reference | Notes/deviation |
|---|---|---|---|
| PBI 1 python-version checker | pass | `scripts/check_python_version.py`, 13 tests | `status=ok resolved=3.14 sources=4/4` |
| PBI 1 negative controls | pass | operator run on temp copies | mismatch → exit 1, 2 errors; missing Dockerfile → exit 0, 1 warning |
| PBI 2 alembic chain validator | pass | `scripts/check_alembic_chain.py` | `heads=a1b2c3d4e5f6 revisions=6 errors=0` |
| PBI 2 negative controls | pass | operator injected second head / dangling parent | exit 1, both heads named; dangling parent named with file:line |
| PBI 3 workflow path validator | pass | `scripts/check_workflow_paths.py` | `workflows=15 runs=51 scripts=8 workdirs=7 errors=0` |
| PBI 3 negative controls | pass | operator removed `backend/scripts/prestart.sh`, broke a `working-directory` | exit 1, both referencing lines named |
| PBI 4 doc link checker | pass | `scripts/check_doc_links.py` | `files=11 links=22 errors=0 warnings=4`; warnings are real badge URLs that escape the repo root |
| PBI 5 compose env checker | pass | `scripts/check_compose_env.py` | `files=3 documented=13 interpolations=19 errors=0 warnings=3 info=4` |
| Convention reuse (knowledge) | partial | `check-script-convention` record; PBI 5 retrieval | retrieved and complied, but the convention was also inferable from existing scripts |
| Full suite | pass | `python3 -m unittest discover -s scripts/tests` | 148 tests |

## Session/window boundaries

| Role | Local session label | Window start/end (UTC) | Boundary basis | Attribution caveat |
|---|---|---|---|---|
| Delivery agent | `exp10-pbi1` | 12:16:40 – 12:33:10 | first `/plan` prompt for PBI 1 to the next PBI prompt | includes operator approval waits |
| Delivery agent | `exp10-pbi2` | 12:33:11 – 12:37:20 | PBI 2 prompt to PBI 3 prompt | same session file as PBI 3 and 4 |
| Delivery agent | `exp10-pbi3` | 12:37:21 – 12:43:15 | PBI 3 prompt to PBI 4 prompt | — |
| Delivery agent | `exp10-pbi4` | 12:43:16 – 13:03:00 | PBI 4 `/plan` to session end | includes two promotion confirmations and the disposition question |
| Delivery agent | `exp10-pbi5` | 13:03:47 – end | PBI 5 prompt after restart | fresh session, required by the gate finding |

Exact session file paths are retained locally. Four separate Pi sessions were used because the
action-scope gate could not be released within a session after a workflow kept its checkpoint.

## Observed measures

| Measure | Value | Source/method | Limitation |
|---|---:|---|---|
| Window span, all five PBIs | 3,086 s (51 min) | declared windows | includes approval waits and idle gaps; not active time |
| Tool calls | 184 | session JSONL | not a measure of effort |
| Read / write / edit / bash | 22 / 15 / 12 / 103 | session JSONL | — |
| Tool-result `isError` flags | 13 | session JSONL | not failed tests; 7 of these were governance blocks |
| Gate blocks | 7 | session JSONL, classified | a block is not automatically good or bad |
| — `knowledge_shell` | 4 | same | mostly compound commands bundling a capture-policy read |
| — `sensitive_path` | 2 | same | both false positives |
| — `action_scope` | 1 | same | caused by a retained checkpoint |
| Uncached / cache-read / output tokens | 120,334 / 7,261,558 / 157,382 | session JSONL | keep categories separate |
| Reported cost | $0.1751 | sum of Pi per-message cost | not an invoice |
| Tests passing | 148 | `unittest` | final state only |
| Promotion confirmations | 3 | operator observation | latency not recorded; the confirm dialog leaves no session trace |

Per-PBI: PBI 1 990 s / 66 calls / $0.053; PBI 2 249 s / 26 / $0.024; PBI 3 354 s / 20 / $0.028;
PBI 4 1184 s / 37 / $0.041; PBI 5 309 s / 35 / $0.029.

## Failures, corrections, and deviations

- **Operator as approver.** The plan approvals were given by the harness operator standing in for
  the user. This weakens any claim about the human cost of the approval flow; the user did confirm
  all three knowledge promotions personally.
- **Four sessions, not one.** PBI 2 could not start in the PBI 1 session: the retained checkpoint
  left the action-scope gate armed with a stale scope, so every default-work write was refused. The
  same happened after PBI 4. Restarting was the cleanest remedy and is itself the finding.
- **Two false-positive blocks.** `date +%Y-%m-%d && ls .../knowledge/` was refused because `date`
  was absent from the "cannot write" list; `git status --porcelain | grep -c .` was refused because
  grep's pattern `.` was treated as a path resolving to the workspace root, which contains `.env`.
- **One by-design block.** `python3 -c "...open('...plan-checkpoint.json')..."` was refused:
  interpreters are treated as write-capable. The refusal is correct by design but was friction.
- **A first comment-edit attempt by the operator was invalid.** An earlier probe run omitted
  `/implement`, so the gate was unarmed; those results were discarded rather than reported.
- **PBI 5 staging.** The agent staged one candidate and stopped; nothing was promoted during the run.
- **Post-run fixes.** The two false positives and the gate-release gap were fixed in `4827f6b`
  after the measurement, deliberately, so the run stayed on one payload revision.

## User/content review

The user reviewed progress between PBIs, approved the three promotions, and chose checkpoint
dispositions. No deliverable was rejected. The user identified the system-subject knowledge concern
earlier in the session, which led to a separate guard; no such record appeared in this run.

## Interpretation and evidence limits

Supported:

- Five bounded tasks can be delivered end to end with this payload, with verifiable outputs.
- The default-work path carries visibly less overhead than `/plan` → `/implement` in wall time,
  though task complexity was not controlled.
- A recorded convention was retrieved in a fresh session and followed.
- Gates block rarely on ordinary work, and two of the seven blocks were wrong.

Not supported:

- Any claim that the payload is faster or cheaper than using Pi without it. There was no baseline
  condition, and the structured PBIs were also the hardest tasks.
- Any claim that recorded knowledge *caused* the PBI 5 convention match; the same convention was
  visible in four existing scripts. A clean test needs the convention to exist only as a record.
- Any claim about approval cost: the operator approved plans, and confirm latency is unrecorded.

## Decision and next safe action

Keep the payload as a working experimental baseline. The four frictions are fixed in `4827f6b`
(three of them) and documented (the interpreter refusal is intentional).

Next safe actions, in priority order:

1. Run one PBI in a workspace where the convention exists only as a knowledge record, to isolate the
   knowledge effect.
2. Run a paired baseline someday, but only if a decision actually depends on the speed question.
3. Instrument approval prompts only if a future question needs their count or latency.

## Data handling

- Raw Pi session/trace location retained locally: yes, not copied here.
- Sanitized evidence included here: window boundaries, counts, tokens, cost, block categories, and
  first-line block reasons.
- Excluded: prompt text, tool output, file contents, and record bodies. No secrets or credentials
  were present; `.env` was never read.
