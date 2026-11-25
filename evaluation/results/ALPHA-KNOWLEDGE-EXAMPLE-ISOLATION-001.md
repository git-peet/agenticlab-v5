# ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001 — Result

- **Preregistration:** [`../plans/ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001.md`](../plans/ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001.md) (committed as `91435c9` before the run)
- **Status:** **pass** — the example carries the effect, not the shorter wording
- **Run date/time and offset:** 2026-11-25, UTC+01:00
- **Workspace:** `exp15` (disposable)
- **Payload revision:** `4827f6b`
- **Pi version:** 1.6.0
- **Model/provider/mode:** `deepseek-v4.1-flash` via `opencode-go`, thinking `high`, default work

## Summary

One workspace received the same compose-coverage task with exactly one record: exp10's **original
verbose prose, unchanged**, plus the fenced example block from the previous experiment.

It scored **7/7**, the same as the two compact-with-example runs, and unlike the prose-only run which
scored 5/7 with the same wording. The prediction was: 7/7 means the example is doing the work; ≤6/7
means compactness contributes. The example is doing the work.

## Rubric

| # | Criterion | exp11 control | exp12 prose | exp13/14 compact+example | **exp15 verbose+example** |
|---|---|---|---|---|---|
| 1 | `scripts/check_compose_env.py` | met | met | met | **met** |
| 2 | `summary: check=… status=…` | not met | not met | met | **met** |
| 3 | lowercase `error:` / `warning:` | not met | not met | met | **met** |
| 4 | `fatal:` + exit 2 | not met | met | met | **met** |
| 5 | exit 1 / 0 | met | met | met | **met** |
| 6 | `--root PATH` | met | met | met | **met** |
| 7 | tests under `scripts/tests/` | met | met | met | **met** |
| | **Total** | **4/7** | **5/7** | **7/7** | **7/7** |

Deciding evidence lines from exp15:

- `summary: check=compose-env status=ok files=3 documented=13 interpolated=12 missing=3 unused=4 errors=0 warnings=3`
- On the error fixture: `error: compose.yml:4: required interpolation '${ALPHA_REQUIRED:?set it}' is not documented in .env.example`
- `fatal:` with exit 2 on `--root /nonexistent`; exit 1 on the error fixture; exit 0 on the repository
- findings on stdout; tests pass

Note on grading: criterion 2 was first scored by grepping the script source, which missed exp15
because the summary line is built from an f-string. Re-scored from the script's **actual output**,
which is what the criterion means. The other runs were re-checked the same way and are unaffected.

## Retrieval

| | exp11 control | exp12 prose | exp13 | exp14 | **exp15** |
|---|---|---|---|---|---|
| Calls | 1 | 2 | 3 | 2 | **1** |
| Applicable | 0 | 1 | 2 | 2 | **1** |

One query, one hit, first time. Retrieval efficiency improved as the record became more directly
relevant, though one run each cannot establish that.

## Observed measures

| Measure | exp15 |
|---|---:|
| Window span | 157 s |
| Tool calls | 26 |
| Total tokens | 558,248 |
| Reported cost | $0.0183 |
| Tests | passing |

## Interpretation and evidence limits

Supported:

- The fenced example, not the shortened wording, is the plausible cause: identical verbose prose
  scored 5/7 without it and 7/7 with it.
- A retrieved record can govern output shape in default work, first query, no workflow ceremony.

Not supported:

- That examples are universally better. One record, one task, one model, one run per condition.
- That the effect is stable: exp12's 5/7 versus exp15's 7/7 differ by wording-plus-example, but each
  condition has a single run, so variance cannot be excluded.
- That retrieval always fires: earlier runs showed 0-call and 2-call sequences on similar prompts.
- Any performance claim: the faster runs may simply reflect an easier task after the format is clear.

## Decision and next safe action

Four conditions now exist for one task family, which is enough to state a narrow, defensible finding:

> A record that shows the exact expected output transfers formatting conventions that the same rules
> in prose do not, in default work, on this model.

If this is worth acting on, the smallest useful step is guidance rather than code: recommend in
`AGENTS.md` that records describing a convention or output shape include one worked example. That is
a prompt change, not a mechanism, and it should be proposed separately.

No payload change is authorised by this result. A fresh control run and a repeat of the prose-only
condition remain the obvious robustness checks if the finding is challenged.

## Data handling

- Raw Pi session/trace retained locally: yes, not copied here.
- Sanitized evidence: counts, tokens, cost, retrieval outcomes, rubric evidence lines.
- Excluded: prompt text beyond the task statement, tool output, file contents. `.env` never read.
