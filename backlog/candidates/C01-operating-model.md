# V52-C01 — Default-first operating model and explicit workflows

**Status:** `framed` — core product direction; runtime behavior not settled

**Implementation readiness:** **Not ready.** This is a system-level design constraint, not a standalone coding task.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md)

## Purpose

Define how a user enters AgenticLab work and how conversational/default work relates to deliberate engineering workflows. A future session can use this record without access to V4 documentation.

## Context and evidence

V4 evolved from explicit persona/workflow invocation toward default or “raw” conversations as an ordinary usage mode. Its explicit workflows (`/plan`, `/implement`, `/debug`, `/review-pr`, `/test`, etc.) still encode useful sequence, approval, handoff, verification, and recovery behavior. The V4 audit concluded that these functions should remain available, while the fixed eight-persona chain, persona-owned memory, and required ceremony for simple tasks should not be copied by default.

The first V5 roadmap independently described a default agent that may answer, clarify, invoke an existing workflow, or delegate. The second-attempt evaluation did not test routing or workflow quality; this is grounded in intended product direction and V4 audit evidence, not a measured V5 feature.

**Historical sources (optional lineage, not required to understand this record):** V4 `MANUAL.md` §§4–5 and 8; V4-to-V5 audit Findings 1 and 14–18; first V5 roadmap §§2 and Priority 2 Q5–9. The audit's conclusions are summarized above.

## V5 direction

- Default/free work is a first-class entry path; the user need not select a persona to begin.
- User-invoked workflow execution remains distinct from an agent recommendation to use a workflow.
- Both paths share the same task scope, context/knowledge, governance, authorization, verification, and continuity semantics.
- A workflow is justified when its sequence or controls help the task; it is not a universal wrapper.
- The default agent remains the visible owner unless an explicitly designed coordination model changes that responsibility.

## Explicit exclusions

This record does **not** select automatic routing, a “master” agent, Jev classification, a fixed persona roster, or the exact commands to preserve. Do not port V4 prompts verbatim. Candidate forms for expertise (lens, skill/procedure, workflow, isolated specialist) are tracked in C06/C07.

## Preconditions before design or implementation

1. The user confirms the shared-contract/two-entry-path direction in the roadmap.
2. Name the first concrete user journey and its authorization boundary.
3. Decide whether the current work is a direct conversation or an explicitly invoked workflow; do not test both by silently changing conditions.
4. Specify how the selected harness represents each path and its failure/fallback behavior.

## Acceptance questions for a future bounded design

- Can the default agent handle a bounded task without unnecessary workflow ceremony?
- Can a user invoke a known workflow directly, and is that observably distinct from agent routing?
- Do both modes use the same scope and safety contract rather than drifting into separate policies?
- Is one owner accountable across any handoffs?

No quantitative threshold is set. A future design block must supply its own task-specific acceptance checks before implementation.

## Timing / next action

Keep as a core framing constraint while designing the first V5 slice. **Do not implement a router or port workflows from this record alone.** First settle the initial task journey with the user; then promote only the concrete required behavior to `selected` with a bounded scope.
