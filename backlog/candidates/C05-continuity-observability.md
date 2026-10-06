# V52-C05 — Continuity, operational records, and observability

**Status:** `candidate`; log/checkpoint boundaries are partly framed

**Implementation readiness:** **Only a minimal work record may be needed initially.** Retention and runtime telemetry are not ready to implement.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C02 memory lifecycle](C02-knowledge-lifecycle.md), [C08 runtime](C08-runtime-adapters.md)

## Purpose

Allow substantial work to be recovered and important outcomes to be evaluated, without turning every turn into a log or confusing historical activity with current truth or durable project knowledge.

## Context and evidence

V4 used session logs, phase logs, checkpoints, resume prompts, recovery from Pi session JSONL, maintenance runs, and counters/ledgers for recurring mechanisms. These helped preserve work and reveal implementation/measurement failures. The V4 audit also found unevenly populated logs and underused mechanisms. The lesson is to preserve the function and measure use/cost—not inherit every record class, cadence, hook, or metric.

The V5 `logging-and-recovery` candidate separates logical records: working/session, workflow, approval, checkpoint, audit/evaluation, and memory. It says checkpoints are snapshots requiring current-state/authorization revalidation; logs reconstruct past activity but do not establish current truth. Cross-cutting research additionally asks about attention cost, traceability, and failure-cause attribution. Those angles overlap existing contracts and should only be pulled forward if a concrete gap remains.

**Historical sources (optional):** V4 `MANUAL.md` §§5.4, 6.12, 8–9; Neo audit Findings 4–5, 8, 15; V5 `pipeline/logging-and-recovery.md`, `cross-cutting-research-angles.md`, evaluation plan. The relevant distinctions and lessons are summarized here.

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

Use `DEV-LOG.md` for material V5 design/build history now. Add a project-work checkpoint only when a real task needs interruption/restart resilience. Defer general telemetry and raw-session recall until actual use identifies a bounded need.
