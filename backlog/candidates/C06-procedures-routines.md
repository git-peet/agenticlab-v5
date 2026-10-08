# V52-C06 — Reusable skills, procedures, and process routines

**Status:** `candidate`; no universal starter pack selected

**Implementation readiness:** **Not ready for a procedure catalog.** Use a candidate only when an actual repeated need or explicit high-value procedure is identified.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C01 workflows](C01-operating-model.md), [C07 specialists](C07-specialists-coordination.md)

## Purpose

Preserve procedures that improve recurring engineering or AgenticLab work, while distinguishing reusable guidance from policy, workflow sequencing, durable facts, and human authorization.

## Context and evidence

V4 distinguishes skills (repeatable technical procedures) from conventions and provides extraction/indexing machinery. Its backlog proposes pre-built global skills because a discovery-only system may re-derive common procedures early; a separate “Routines” idea addresses multi-session, user-gated AgenticLab process procedures that do not fit silent skill invocation. V4 also records an ordered minimalism-ladder idea to make “simpler solution” review more checkable. The whole-repository overengineering-audit proposal explicitly says it is speculative and should stay parked absent real need.

V4's manual and audit show many procedures embedded in personas/prompts. Their value may be their sequencing and stop conditions, not their persona ownership or exact thresholds. No V5 usage evidence selects a universal prebuilt pack or routine tier.

**Historical sources (optional):** V4 `MANUAL.md` §§6.11 and 8–9; `pre-built-global-skills-starter-pack.md`, `process-routine-tier-gap.md`, `senior-minimalism-ladder-gap.md`, `repo-wide-overengineering-audit-gap.md`, and `pre-heavy-implementation-loose-ends-pass-gap.md`; V5 specialist/context pipeline. Concepts and limits are summarized here.

**External concept check (README-level, not implementation validation):** TencentDB Agent Memory describes Skills as versioned assets with resource files, trigger boundaries, execution steps, and validation rules. This reinforces C06's distinction between a reusable procedure and a prompt snippet. If a real V5 procedure later needs companion files or explicit validation, consider those as properties of that procedure; no universal schema/catalog is selected. Agent/team loadouts and sharing ACLs are not requirements for the current V5 scope, and the project's benchmark/architecture claims were not independently evaluated here.

## V5 direction

- A skill/procedure teaches a repeatable method; it is not proof the method is current, nor permission to perform restricted steps.
- A workflow coordinates phases/handoffs. A gated process routine, if ever needed, must state actors and explicit pauses; do not silently apply it like an in-task hint.
- Select the lightest method that serves the task. An ordered minimalism ladder is a possible technique, but it cannot justify skipping correctness, safety, accessibility, or necessary tests.
- Promotion should reflect demonstrated or deliberately approved value; scope and trigger should be precise enough to avoid noisy context injection.

## Explicit exclusions

No V4 skill schema/index/triggers, automatic three-use promotion threshold, always-on global skill pack, new Routines tier, or system-wide overengineering command is selected. Do not treat every backlog process as a runtime feature.

## Preconditions / acceptance

Before adding a procedure, show a concrete repeat/problem and define trigger, applicability, stop conditions, actor/approval requirements, source/evidence, owner, and update/retirement method. Test both a matching and a near-miss task. For gated routines, verify that each human approval pause remains explicit and does not authorize the following step.

## Timing / next action

Keep candidate possibilities in the portfolio. Extract a first procedure only when real active work exposes repetition or the user explicitly selects an already well-evidenced process; do not delay the first V5 skeleton to build a skills ecosystem.
