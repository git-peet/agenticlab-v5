# ALPHA-KNOWLEDGE-TRANSFER-001 — Result

- **Preregistration:** [`../plans/ALPHA-KNOWLEDGE-TRANSFER-001.md`](../plans/ALPHA-KNOWLEDGE-TRANSFER-001.md) (committed before either run as `5ffae8b`)
- **Status:** **partial transfer** — the record was retrieved and one criterion was adopted, the rest were not
- **Reproducibility note 2026-11-25:** the treatment's archived script now scores 7/7 under the mechanical rubric in `AgenticLab-tools/eval`, not the 5/7 recorded here. Its archive mtime postdates the measured run and the session log contains no later messages, so the change cannot be reconstructed. The exp12 row below is therefore **unreproducible from the surviving artifact**; the control and all three later experiments reproduce exactly. Treated as an isolated artifact integrity issue, not a finding about retrieval.
- **Correction 2026-11-24:** this result was first published as "treatment never retrieved" after a hand-scan of the session file missed two calls. The session record shows two retrieval calls with one match. The correction is recorded rather than silently edited; the hand-count was the failure, not the adapter.
- **Run date/time and offset:** 2026-11-24, UTC+01:00
- **Workspaces:** `exp11` (control), `exp12` (treatment), both disposable
- **Payload revision:** `4827f6b`, identical in both
- **Pi version:** 1.6.0
- **Model/provider/mode:** `deepseek-v4.1-flash` via `opencode-go`, thinking `high`, default work (no workflow invocation)

## Summary

Two identical workspaces received the identical compose-coverage task. The only difference was the
knowledge corpus: empty control, one relevant record in treatment.

The treatment retrieved the record (two calls: one `no_match` for a compose-specific query, then
`ok` with `count: 1` for `scripts check tooling python unittest convention`) and adopted **one** of
its seven criteria — exit 2 for unusable input, which the control did not. It did not adopt the
`summary: check=…` shape, the lowercase severity prefixes, or the `fatal:` marker.

So the record demonstrably reached the model and partially changed behaviour. The parts followed were
semantic (an unusual exit code); the parts dropped were literal formatting instructions. Both agents
produced working, tested checkers.

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

Retrieval: control 1 call → complete `no_match` (searched 0). Treatment **2 calls** → first
`no_match`, second `ok` returning `check-script-convention`. The only criterion the treatment gained
over the control is criterion 4, which is exactly one of the record's stated rules.

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
| `readKnowledgeRecords` calls | 1 | **2** |
| applicable / no_match results | 0 / 1 | 1 / 1 |
| Tests passing | 16 | 15 |

The treatment took five times longer and cost twice as much while producing a comparable result. One
run cannot attribute that to anything; it is recorded, not explained.

## Failures, corrections, and deviations

- **Prediction not matched.** The preregistered expectation was treatment ≥5/7 with control ≤3/7.
  Actual 5/7 and 4/7: a one-point gap, which the preregistration said must not be treated as evidence
  and would trigger a repeat run. Not repeated, because the informative question changed.
- **Operator error, corrected.** The first version of this result claimed the treatment never
  retrieved. It was based on a hand-scan of the session file that missed both calls. The automated
  extractor, extended with retrieval columns during this analysis, reports 2 calls. The corrected
  reading is recorded above and was never silently swapped.
- **Retrieval fired second time.** The first treatment query was compose-specific and returned
  `no_match`; the agent then re-queried with a convention-focused phrase and found the record. So a
  failed query did not end the attempt.
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

- A relevant active record was retrieved in default work after one failed query, without workflow
  ceremony.
- The retrieved record changed behaviour: the treatment adopted the record's exit-code rule, which
  the control without the record did not.
- The record's semantic rule transferred; its literal formatting rules did not.

Not supported:

- That retrieval is reliable. One treatment run, one retrieval sequence; the control made a single
  unrelated query and stopped.
- That the record's full convention is applied. Five of seven criteria were missed by the treatment,
  including both formatting rules.
- Any speed or cost comparison: one run each; the treatment's 5x span is unexplained and may reflect
  retrieval plus longer deliberation.
- Whether partial application is a model limitation or a record-precision limitation. This run cannot
  separate them.

## Decision and next safe action

Activation worked here; **application is the weaker link**. The question for the next run is:

> When a record is retrieved, which of its rules actually govern the output, and why do literal
> formatting rules lose to the model's own layout?

Options, in order of preference:

1. Repeat with more treatment runs to see whether partial application is stable, and whether the
   adopted criterion is always the semantic one.
2. Make the formatting rules unambiguous and short in the record (a single example line), and check
   whether an example transfers better than prose. That is a record-quality test, now worth running
   because retrieval is no longer the blocker.
3. Drop rubric criterion 5 (exit codes) as non-discriminating: the baseline script already used
   `sys.exit(0/1)`.
4. Only if application stays poor, consider a mechanism that surfaces the rule at the moment of use
   rather than at retrieval.

No payload change is authorised by this result.

## Data handling

- Raw Pi session/trace location retained locally: yes, not copied here.
- Sanitized evidence included here: counts, tokens, cost, block categories, rubric evidence lines.
- Excluded: prompt text beyond the task statement, tool output, file contents. `.env` was never read;
  no protected data was present.
