# V52-C08 — Runtime, adapters, and the current AI landscape

**Status:** `candidate`; core/host boundary must be designed, not copied

**Implementation readiness:** **Not ready for a general adapter framework.** Choose a narrow initial host journey first.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C04 governance](C04-governance-safety.md), [C07 specialists](C07-specialists-coordination.md), [C11 project boundary](C11-bootstrap-and-scope.md)

## Purpose

Provide AgenticLab behavior through coding-agent harnesses without making system semantics dependent on one runtime's APIs. Define a maintainable relationship between the canonical V5 source and a project's workspace-local use.

## Context and evidence

V4 separates shared markdown instructions/prompts from Pi, Copilot, and Cursor adapters. Pi can expose session lifecycle hooks, context injection, tool interception, and subagents; other hosts have different or weaker capabilities. The V4 adapter review praises thin wrappers, pure tested rule logic, selective retrieval, explicit capability gaps, and behavioral validation, while warning that `session-guard.ts` accumulated many responsibilities, recurring thresholds were sometimes reasoned rather than measured, persistent false retrieval can pollute context, and prose is not equivalent to structural enforcement.

V4 improvements separately identify: unassessed Pi-only mechanisms, setup that assumes one harness forever, and no thin AGENTS.md fallback for the long tail. Their priority varies; dual-harness and long-tail support are not shown to be real user requirements. V5 first roadmap and implementation-boundary document call for model-/harness-independent behavior with host-aware optimization.

**Historical sources (optional):** V4 `MANUAL.md` §§3 and 10; V4 Neo audit Findings 6, 9–12; V4 adapter review and the three adapter-related backlog items; V5 `pipeline/implementation-boundary.md` and V5 roadmap Priority 5. Historical references are not portable requirements.

## V5 direction

- State behavior in host-neutral contracts; keep event wiring, command/UI surfaces, persistence and tool interception in adapters.
- For each host capability, describe structural enforcement, advisory guidance, unavailable capability, and safe reduced behavior.
- Use native runtime features when useful, but don't make correctness/authority depend on unverified model or harness behavior.
- Prefer a small replaceable adapter and pure testable rules; test observable behavior on the supported host/version.
- Keep the clean V5 repository the proposed system source. Decide separately how a project receives a versioned instance/configuration.

## Explicit exclusions

No assumption of immediate cross-harness parity, all-host support, global Pi configuration, install-time auto-mutators, a universal runtime framework, or external meta-harness. An AGENTS.md pointer may be considered later as a low-cost fallback, not a replacement for actual adapters.

## Preconditions / acceptance

Choose one host and one user journey. Specify workspace discovery, session/new-session semantics, tool/read/write capability, approval UI/fallback, data locations, version support, and what happens if hooks are unavailable. Verify actual runtime behavior (not just docs or similar prompt text). An adapter must disclose unsupported hard guarantees and must not silently claim parity.

## Timing / next action

Do not build all adapters before the first journey. During first-slice planning, decide initial host and distribution boundary; implement only the minimum adapter needed and retain other host questions in this record.
