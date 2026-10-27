# C03 Experiment 1 raw metric archive

This directory preserves the local content-free metric logs and their point-in-time snapshots for later comparison. It does not contain raw Pi transcripts, source excerpts, prompts, credentials, or database contents.

- `agenticlab.jsonl` — current local AgenticLab event log at archive time.
- `c03-context-experiment.jsonl` — current local C03 experiment log at archive time.
- `snapshots/pre-pbi1-implement-20261025T205822+0100/` — baseline captured after the approved PBI1 plan and before implementation.
- `snapshots/pre-pbi4-20261025T201406+0100/` — earlier snapshot retained for chronology.

For current-code conclusions, use the audited classifications in `C03-METRIC-REVIEW.md`: the 63 C03 rows include 46 reviewed outcomes, 1 stale-runtime diagnostic (`c03-v023`), and 16 invalid stub-generated rows. Do not count the latter 17 as valid current-code outcomes. PBI1 itself added no C03 metric rows and made zero `assembleContext` calls.
