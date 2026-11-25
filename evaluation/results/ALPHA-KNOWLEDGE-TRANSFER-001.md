# ALPHA-KNOWLEDGE-TRANSFER-001 — Result

- **Preregistration:** [`../plans/ALPHA-KNOWLEDGE-TRANSFER-001.md`](../plans/ALPHA-KNOWLEDGE-TRANSFER-001.md) (committed before either run as `5ffae8b`)
- **Status:** **null result** — no transfer observed, because the treatment never consulted the record
- **Run date/time and offset:** 2026-11-24, UTC+01:00
- **Workspaces:** `exp11` (control), `exp12` (treatment), both disposable
- **Payload revision:** `4827f6b`, identical in both
- **Pi version:** 1.6.0
- **Model/provider/mode:** `deepseek-v4.1-flash` via `opencode-go`, thinking `high`, default work (no workflow invocation)

## Summary

Two identical workspaces received the identical compose-coverage task. The only difference was the
knowledge corpus: empty control, one relevant record in treatment.

The treatment **never called `readKnowledgeRecords`**. The control did call it once and correctly got
a complete no-match. Therefore this run does not test whether knowledge transfers; it tests whether
retrieval activates, and the answer in the treatment was no.

Both agents produced working, tested checkers that exit 0 on the repository and 1 with an
undocumented required variable. Neither matched the repository check-script convention exactly.

## Acceptance results

| Area/check | Control `exp11` | Treatment `exp12` |
|---|---|---|
| 1. `scripts/check_compose_env.py` | met | met |
| 2. final line `summary: check=… status=…` | **not met** — `Summary: 0 error(s), …` | **not met** — `compose-env-check: 0 errors, …` |
| 3. `error:` / `warning:` prefixes | **not met** — `ERROR:` / `WARNING:` uppercase | **not met** — `WARNING ` / `INFO    `, no colon |
| 4. `fatal:` + exit 2 on unusable input | **not met** — exit 1 | **met** — exit 2, `file not found:` |
| 5. exit 1 on error, 0 on clean | met (exit 1 / exit 0) | met (exit 1 / exit 0) |
| 6. `--root PATH` | met | met |
| 7. tests under `scripts/tests/` | met (16 tests) | met (15 tests) |
| **Total** | **4 / 7** | **5 / 7** |

Retrieval: control 1 call → complete `no_match` (searched 0); treatment **0 calls**.

## Session/window boundaries

| Role | Local session label | Window start/end (UTC) | Boundary basis | Attribution caveat |
|---|---|---|---|---|
| Delivery agent | `exp11-control` | 13:48:16 – 13:55:05 | identical prompt to final response | includes operator restart before the run |
| Delivery agent | `exp12-treatment` | 13:48:16 – 14:24:51 | identical prompt to final response | same, plus a slower run |

Session file paths retained locally. Both runs used default work only, so no approval ceremonies
occurred inside the measured windows.

## Observed measures

| Measure | Control | Treatment |
|---|---:|---:|
| Window span | 408 s | 2,195 s |
| Tool calls | 42 | 47 |
| `isError` results | 2 | 4 |
| Gate blocks | 2 (`knowledge_shell` 1, `sensitive_path` 1) | 2 (`knowledge_shell` 1, `sensitive_path` 1) |
| Total tokens | 1,040,683 | 1,573,985 |
| Reported cost | $0.0265 | $0.0566 |
| `readKnowledgeRecords` calls | 1 | **0** |
| Tests passing | 16 | 15 |

The treatment took five times longer and cost twice as much while producing a comparable result. One
run cannot attribute that to anything; it is recorded, not explained.

## Failures, corrections, and deviations

- **Prediction not matched.** The preregistered expectation was treatment ≥5/7 with control ≤3/7.
  Actual 5/7 and 4/7, with no retrieval in treatment. By the preregistered rule, a one-point gap
  triggers a repeat — but a repeat would test the same non-retrieval behaviour, so it was not run.
- **Treatment retrieval absence is the finding**, not a variance footnote. The record was in the
  matching scope, active, and retrievable; the agent simply did not ask.
- **Control did retrieve**, on an identical prompt. So activation is unstable between runs, not
  uniformly absent.
- **Baseline caveat carried from the preregistration:** `scripts/add_latest_release_date.py` already
  used `sys.exit(0/1)`, which is why criterion 5 is met by both agents. Criterion 5 therefore
  discriminates poorly and should be dropped or replaced in a future rubric.
- **Two gate false positives class confirmed** in both workspaces (`knowledge_shell` on compound
  reads, `sensitive_path` on a search pattern). These were reported separately in
  `ALPHA-DELIVERY-001` and fixed in `4827f6b`; these runs used the fixed payload, which suggests
  either different command shapes remain blocked, or the fixes did not cover these cases. Not
  investigated here.

## User/content review

Both outputs are usable checkers. Neither output format matches the repository convention, so a
reviewer wanting consistency would have to correct both.

## Interpretation and evidence limits

Supported:

- In default work, a relevant active record was not consulted by this model in this run.
- Two capable agents produced comparable, working results with and without a convention record.
- Retrieval activation varies between runs on identical prompts.

Not supported:

- That knowledge does not help. The treatment never read it, so the experiment did not test transfer.
- That the record is a poor format. The record was never examined by the agent.
- Any speed or cost comparison: one run each, and the treatment's extra time is unexplained.

## Decision and next safe action

The hypothesis to test next is **activation**, not record quality. The specific question:

> Why does an agent with a matching active record skip `readKnowledgeRecords` in default work, while
> the same prompt in a sibling workspace triggers it?

Options, in order of preference:

1. Test a record whose content is **not inferable** from the repository, on a task where guessing is
   expensive — this separates "retrieval unnecessary" from "retrieval not happening".
2. Then, only if retrieval still fails, adjust activation: either the `AGENTS.md` trigger wording or a
   read-before-write rule for tasks that create new conventions.
3. Drop rubric criterion 5 (exit codes) as non-discriminating, and add a criterion that captures
   output-shape conformance to an existing script if a convention test is repeated.

No payload change is authorised by this result.

## Data handling

- Raw Pi session/trace location retained locally: yes, not copied here.
- Sanitized evidence included here: counts, tokens, cost, block categories, rubric evidence lines.
- Excluded: prompt text beyond the task statement, tool output, file contents. `.env` was never read;
  no protected data was present.
