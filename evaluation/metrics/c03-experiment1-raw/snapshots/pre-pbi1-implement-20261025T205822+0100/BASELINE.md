# Pre-PBI1 implementation metrics baseline

- Captured: 2026-10-25T20:58:22+01:00
- Workspace: `/home/peet/Projects/c03-experimental-phase/`
- Git HEAD: `ba38250` (`C03: snapshot AgenticLab prototype and EverShop baseline`)
- Timing: after `/plan` approval and before `/implement`; no PBI1 implementation changes had started.
- This is a byte-for-byte copy of the current top-level JSONL metric logs. Live logs were not modified.

## Snapshot contents

- `agenticlab.jsonl`: 59 rows
- `c03-context-experiment.jsonl`: 63 rows
- `SHA256SUMS`: integrity hashes for both copied logs

The previous pre-PBI4 snapshot had 58 `agenticlab.jsonl` rows and the same 63 C03 rows. The current AgenticLab log therefore includes one additional event from intervening planning activity; the C03 experiment log is unchanged.

For C03 outcome analysis, follow `C03-METRIC-REVIEW.md`: of the 63 physical C03 rows, 46 are reviewed outcomes, one is stale-runtime diagnostic `c03-v023`, and 16 are invalid stub-generated rows. Exclude those 17 rows from current-code conclusions. Do not treat raw event counts as quality or performance measures.

Use a PBI1-specific scorecard for new runs: acceptance outcome, whether the plan/implementation used sufficient and correct source context, scope adherence, task-handoff usefulness, retrieval/clarification friction, and targeted test outcomes. Record only the existing allowlisted content-free fields; no raw prompts, source excerpts, or credentials.

This snapshot and live metric logs are local experimental data. Do not commit or push them unless separately authorized.
