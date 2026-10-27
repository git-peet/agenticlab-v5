# Pre-PBI4 metrics baseline

- Captured: 2026-10-25T20:14:06+01:00
- Workspace: `/home/peet/Projects/c03-experimental-phase/`
- Git HEAD: `ba38250` (`C03: snapshot AgenticLab prototype and EverShop baseline`)
- Timing: captured while PBI4 `/plan` was in progress, before implementation.
- Source logs were copied unchanged; the live `.pi/metrics/*.jsonl` files were not modified.

## Snapshot contents

- `agenticlab.jsonl`: 58 rows
- `c03-context-experiment.jsonl`: 63 rows
- `SHA256SUMS`: integrity hashes for both copied logs

For interpreting C03 outcomes, follow `C03-METRIC-REVIEW.md`: the 63 C03 rows include 46 reviewed outcomes, one stale-runtime diagnostic (`c03-v023`), and 16 invalid stub-generated rows. Exclude the diagnostic and invalid rows from current-code conclusions, but preserve them in this raw snapshot for auditability.

This snapshot and the live metric logs are local experimental data. Do not commit or push them unless separately authorized.
