# V52-C07 — Specialist forms and independent coordination

**Status:** `candidate`; preserve specialist function, not fixed topology

**Implementation readiness:** **Not ready for multi-agent runtime.** Isolation and handoff requirements must be defined for a concrete use case.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C01 operating model](C01-operating-model.md), [C06 procedures](C06-procedures-routines.md), [C08 adapters](C08-runtime-adapters.md)

## Purpose

Use specialist expertise when it improves engineering outcomes; preserve independent judgment when review/diagnosis would be biased by implementation context; avoid role and coordination overhead when a direct agent or procedure suffices.

## Context and evidence

V4 used eight bounded personas and explicit orchestration chains. The audit found valuable capabilities: evidence-led exploration, design decomposition, implementation discipline, testing, UX review, diagnosis separate from fixing, and independent review. It also found fixed roster, per-persona memory, fixed tool caps, and mandatory role sequences were not V5 requirements. V4's manual explains context isolation as the defense against review self-rationalization; the audit cautions that prompt instructions alone do not prove actual isolation.

V5's specialist candidate distinguishes: lens/perspective (current context, not independent); skill/procedure (repeatable technique); policy/constraints (boundary); approved workflow (sequencing); isolated specialist run (separate context for independent judgment). V4-scoped Herdr/Omnigent notes describe possible runtime coordination but explicitly warn of authority complexity, double orchestration, infrastructure, and likely multiplied token cost. They are concepts, not selected dependencies.

**Historical sources (optional):** V4 `MANUAL.md` §§4, 7.4, 8; Neo audit Findings 14, 16–18; V4 `herdr-multi-agent-runtime-candidate.md` and `omnigent-meta-harness-integration-candidate.md`; V5 `pipeline/specialist-coordination.md`. Summary above is sufficient for current disposition.

## V5 direction

Choose the lightest form that meets need. An isolated run is justified when independence, specialization, or parallelism has a concrete benefit. One owner remains accountable; a handoff states objective, scope, evidence, output, authorization limits, and stop conditions. Specialists report source support, inference, uncertainty, checks performed, and blockers. Conflicts remain visible.

## Explicit exclusions

No permanent master persona, eight-agent roster, parallel-by-default runtime, Herdr/Omnigent dependency, automatic delegation classifier, or inherited authorization. Specialist confidence never grants authority.

## Preconditions / acceptance

Before an isolated run, identify why same-context reasoning is insufficient, what minimum evidence avoids invalid review, how the host enforces isolation, what permissions are delegated, and how the result is synthesized. Evaluation should score additional valid findings/rework avoided against cost, latency, context duplication, conflicts, and unnecessary invocation. No broad A/B experiment until a representative task exists.

## Timing / next action

Keep available as a capability design candidate. The first slice can be single-agent; add an isolated reviewer only when a real task warrants independent checking and the initial runtime can guarantee the boundary.
