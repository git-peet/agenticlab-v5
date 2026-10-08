# V52-C05 — Continuity, operational records, and observability

**Status:** `candidate`; log/checkpoint boundaries are partly framed

**Implementation readiness:** **Only a minimal work record may be needed initially.** Retention and runtime telemetry are not ready to implement.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C02 memory lifecycle](C02-knowledge-lifecycle.md), [C08 runtime](C08-runtime-adapters.md)

## Purpose

Allow substantial work to be recovered and important outcomes to be evaluated, without turning every turn into a log or confusing historical activity with current truth or durable project knowledge.

## Context and evidence

V4 used session logs, phase logs, checkpoints, resume prompts, recovery from Pi session JSONL, maintenance runs, and counters/ledgers for recurring mechanisms. These helped preserve work and reveal implementation/measurement failures. The V4 audit also found unevenly populated logs and underused mechanisms. The lesson is to preserve the function and measure use/cost—not inherit every record class, cadence, hook, or metric.

**Current V5 continuity check:** The roadmap, first-slice handoff, candidate records, and append-only `DEV-LOG.md` are sufficient to resume the current design work. This does not demonstrate recovery of an interrupted target-project task; no checkpoint/restart test for such work has been performed. Do not add a project checkpoint until a real substantial task needs interruption/restart resilience; when tested, verify source state and authorization afresh.

The V5 `logging-and-recovery` candidate separates logical records: working/session, workflow, approval, checkpoint, audit/evaluation, and memory. It says checkpoints are snapshots requiring current-state/authorization revalidation; logs reconstruct past activity but do not establish current truth. Cross-cutting research additionally asks about attention cost, traceability, and failure-cause attribution. Those angles overlap existing contracts and should only be pulled forward if a concrete gap remains.

**Historical sources (optional):** V4 `MANUAL.md` §§5.4, 6.12, 8–9; Neo audit Findings 4–5, 8, 15; V5 `pipeline/logging-and-recovery.md`, `cross-cutting-research-angles.md`, evaluation plan. The relevant distinctions and lessons are summarized here.

### Evaluation/calibration versus runtime telemetry (design clarification)

V5.1 already has a file-based evaluation process in `AgenticLab-V4/v5/evaluation/`: preregistered plans, baseline/candidate conditions, task fixtures, metrics, results, interpretation, decisions, and revisit triggers. The user reports that this evidence supported architecture decisions and future mechanism calibration. Evershop-specific per-run summaries were kept workspace-local; the V5.2 roadmap synthesizes selected results. The current V5.2 repository has no canonical `evaluation/` directory, run registry, or metrics database. The Evershop `AgenticLab-v5.1-Backup` preserves the old workspace artifacts; their contents are not imported into the new V5.2 knowledge store.

Preserve evaluation as a **development/evidence capability**, distinct from runtime telemetry, task checkpoints, project knowledge, and the append-only development log. A future V5.2 evaluation record should identify the question/mechanism, baseline and candidate, task/fixture and scope, exact source and harness/model versions, enabled conditions, named metrics, failures/deviations, interpretation, decision, and recalibration/revisit trigger. Keep project-specific raw traces/run outputs in the target workspace and minimize them; place only approved, reusable plans and interpreted summaries in canonical V5 evaluation records. Do not automatically collect every session or let metrics change policies/defaults.

**Disposition:** The evaluation capability is worth preserving; a database is not yet justified. Start with versioned, reviewable files and structured per-run summaries for an approved experiment. Consider a database only if repeated cross-run queries or calibration become materially difficult with files. This does not select a collector, schema, or implementation.

**Metrics collection trigger:** Do not gather a general calibration dataset now. For Jev, begin collecting decision metrics only after C09's real-use revisit trigger is met and the user explicitly selects a bounded pilot. Before its first run, preregister the atomic decision, comparison/baseline, outcome labels (including abstention/error), minimum evidence or stopping rule, cost/attention measures, and data-retention boundary. Collect only fields needed for that calibration question.

## V5 direction

- Keep the AgenticLab development log concise and append-only for material decisions/findings, not every pass.
- Keep project task checkpoints, approvals, evaluations, and durable knowledge distinct in purpose. References are preferable to copied data.
- A checkpoint can restore objective, status, blockers, decisions, approval references, verification, and next safe action; it cannot authorize continuation without revalidation.
- Prefer local, bounded, privacy-aware measures tied to an explicit question. No metric collection automatically changes policy/defaults.
- Raw transcripts, personal content, secrets, and source bodies are not retained by default.

## Explicit exclusions

No V4 `knowledge/.memory-debt`, automatic precompact hook, fixed session-log cadence, raw-history index, always-on metrics, or retention cleanup automation is selected. No cross-user/team memory model is in scope.

## Preconditions / acceptance

Before adding a record type, state who uses it, what decision/recovery it enables, its scope, privacy boundary, retention, and what it must not imply. A recovery test should check source state and approval afresh. A measurement should be collected only when it can alter a named architecture choice; include human attention and maintenance when relevant, not just token totals.

## Timing / next action

Use `DEV-LOG.md` for material V5 design/build history now. Before a future Evershop mechanism comparison, preregister a small evaluation plan only if it answers a named decision; keep per-run project artifacts local and record the interpreted, privacy-minimized result in canonical V5 evaluation records. For Jev specifically, wait for C09's real-use trigger and explicit pilot selection before collecting calibration metrics. First define that file-based record flow; do not build a metrics database or always-on collector. Add a project-work checkpoint only when a real task needs interruption/restart resilience; defer raw-session recall.
