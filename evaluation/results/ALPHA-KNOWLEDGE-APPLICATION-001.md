# ALPHA-KNOWLEDGE-APPLICATION-001 — Result

- **Preregistration:** [`../plans/ALPHA-KNOWLEDGE-APPLICATION-001.md`](../plans/ALPHA-KNOWLEDGE-APPLICATION-001.md) (committed as `9f478aa` before any run)
- **Status:** **pass** — the example transferred where prose did not
- **Run date/time and offset:** 2026-11-25, UTC+01:00
- **Workspaces:** `exp13`, `exp14` (treatments), `exp11` reused as reference control
- **Payload revision:** `4827f6b`, identical in all
- **Pi version:** 1.6.0
- **Model/provider/mode:** `deepseek-v4.1-flash` via `opencode-go`, thinking `high`, default work

## Summary

Two independent workspaces received the same compose-coverage task with exactly one record in the
corpus: the previous convention restated with a fenced example of the exact output lines.

Both treatments scored **7/7** on the rubric, including the two formatting criteria that prose alone
had failed to transfer. Both retrieved the record before implementing, and both printed findings to
stdout with lowercase severity prefixes and a final `summary: check=… status=… errors=… warnings=…`
line matching the example shape.

The reference control from the earlier run scored 4/7 with both formatting criteria unmet.

## Rubric

| # | Criterion | exp11 (reference control) | exp13 | exp14 |
|---|---|---|---|---|
| 1 | `scripts/check_compose_env.py` | met | met | met |
| 2 | final line `summary: check=… status=…` | **not met** (`Summary:`) | **met** | **met** |
| 3 | lowercase `error:` / `warning:` prefixes | **not met** (`WARNING:`) | **met** | **met** |
| 4 | `fatal:` + exit 2 on unusable input | **not met** (exit 1) | **met** | **met** |
| 5 | exit 1 on error, 0 on clean | met | met | met |
| 6 | `--root PATH` | met | met | met |
| 7 | tests under `scripts/tests/` | met | met | met |
| | **Total** | **4 / 7** | **7 / 7** | **7 / 7** |

Deciding evidence lines:

- `summary: check=compose-env status=ok files=3 documented=13 infos=4 errors=0 warnings=3` (both)
- `error: compose.yml:61: …` and `warning: …` on a fixture with an undocumented required variable
- `fatal: …` with exit 2 on `--root /nonexistent`
- exit 1 on the error fixture, exit 0 on the repository
- findings on stdout: 8 lines stdout, 0 on stderr, both workspaces

## Retrieval

| | exp11 (control) | exp12 (prose record) | exp13 | exp14 |
|---|---|---|---|---|
| Retrieval calls | 1 | 2 | **3** | **2** |
| Applicable matches | 0 | 1 | **2** | **2** |
| `no_match` | 1 | 1 | 1 | 0 |

The example record was retrieved in both treatments, more than once, and no treatment stopped after a
first `no_match`.

## Observed measures

| Measure | exp13 | exp14 |
|---|---:|---:|
| Window span | 137 s | 209 s |
| Tool calls | 20 | 29 |
| Retrieval calls | 3 | 2 |
| Total tokens | 369,098 | 763,216 |
| Reported cost | $0.0144 | $0.0210 |
| Tests | passing | passing |

Both treatment runs were faster and cheaper than the earlier prose-record run (2,195 s, $0.0566),
which is consistent with less deliberation after the format was settled, but one run each cannot
support that.

## Failures, corrections, and deviations

- **Hypothesis confirmed on both runs**, so no repeat was needed and none was run.
- **Reference control reused**, not re-run, as preregistered. Run variance is therefore not separated
  from record effect; a fresh control is the obvious follow-up if this result is challenged.
- **Access-count asymmetry:** the treatment corpora contained one record and retrieved it two to three
  times, while the control's empty corpus produced one query. Retrieval attempts may scale with the
  agent's expectation that something exists; this was not designed for and is not measured.
- **No gate blocks** occurred in either treatment run, unlike the earlier runs; the two
  `sensitive_path`/`knowledge_shell` false positives seen before did not recur on this task shape.

## Interpretation and evidence limits

Supported:

- A record carrying an explicit example transferred formatting rules that the same rules in prose did
  not transfer, in two independent runs.
- Retrieval fired in default work without any workflow invocation, in both treatments.
- The whole convention — including the semantic exit-code rule — was adopted in both runs.

Not supported:

- That example-bearing records are generally better. This is one record, one task, one model.
- That the effect is reliable at scale: two runs, and the control is from a different run.
- That examples beat prose *because* of the example; the record also restated the rules more
  compactly, and both changes arrived together.
- Any performance claim: the faster, cheaper runs may simply reflect a task the model found easier.

## Decision and next safe action

This is the first positive knowledge result in the project, and the honest scope of it is narrow:
**an example transferred a formatting convention that prose did not, twice.**

Next safe actions, in order:

1. **Separate example from compactness.** One treatment with the same prose as exp12 plus the example
   block, unchanged prose wording. If it still transfers, the example is doing the work.
2. Add a fresh control run so record effect is not confounded with run variance.
3. Only then consider a payload or guidance change, such as recommending a worked example in records
   describing conventions or output shapes.

No payload change is authorised by this result.

## Data handling

- Raw Pi session/trace location retained locally: yes, not copied here.
- Sanitized evidence included here: counts, tokens, cost, retrieval outcomes, rubric evidence lines,
  and the produced summary lines.
- Excluded: prompt text beyond the task statement, tool output, file contents. `.env` was never read.
