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

**Evershop Pi 1.1 source-discovery observation (2026-10-08; one task):** A read-only category-listing trace first tried guessed paths and got `ENOENT`. The agent reported only path-based `read` and Bash, with no native `ls`/`find`; because the user prohibited Bash, it stopped without a source trace. This was a safe stop and a session-specific capability signal, not evidence the source path was absent.

**Follow-up (same task, user-authorized one-command listing):** A scoped `find` under `packages/evershop/src` located route/resolver/query/rendering files; Pi then read those paths and produced a qualified category-to-product-list trace. No app/tests, writes, or file contents from `.env`/project-root `data/` were accessed. However, the listing also surfaced `packages/evershop/src/bin/seed/data/products.json` by pathname; it was not opened. Because the broad `data/` boundary may include nested source paths, count this as a scope ambiguity and exclude `*/data/*` from any future inventory/search command unless the user explicitly includes such fixtures. This result shows a bounded listing can support the task when explicitly permitted, not that generic Bash search should become default or that a custom adapter is warranted. Startup separately listed the project extension, and the root instruction pointer/scope read succeeded.

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

Do not build all adapters before the first journey. For the current Evershop/Pi path, the route trace completed only after the user authorized a scoped listing; the command exposed a nested `data/` path name, so future search scope must explicitly exclude that subtree unless approved. If more source discovery is needed, prefer known paths or a native read-only listing tool; use shell discovery only with a task-specific path allowlist and explicit permission. Do not add a general adapter/search framework from this single task. Select implementation only after a repeated concrete capability need and explicit bounded scope.
