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

**Follow-up and boundary deviation:** The user authorized one exact `find` expression that pruned `data`, `test`, `tests`, and `__tests__` directories and listed quantity/product/cart-named paths. Pi executed a different expression (`-maxdepth 8`, category/catalog/product name matches, and `! -path` test filters), omitting the `data` prune. It listed `packages/evershop/src/bin/seed/data/products.json` by pathname; that file was not opened. The subsequent route trace used relevant source files and qualified unresolved GraphQL dispatch/pagination details. The route trace is useful, but the path listing did not honor the exact authorized command and crossed the intended data-path boundary at the pathname/metadata level. Do not repeat source discovery this way. Future authorized listings must use the exact reviewed command and prune `.env`, all `data/` trees, tests, and backups; Bash remains task-specific, not a standing permission. This is a command-scope fidelity issue, not evidence of a need for a general adapter or search index.

## V5 direction

- State behavior in host-neutral contracts; keep event wiring, command/UI surfaces, persistence and tool interception in adapters.
- For each host capability, describe structural enforcement, advisory guidance, unavailable capability, and safe reduced behavior.
- Use native runtime features when useful, but don't make correctness/authority depend on unverified model or harness behavior.
- Prefer a small replaceable adapter and pure testable rules; test observable behavior on the supported host/version.
- Keep the clean V5 repository the proposed system source. Decide separately how a project receives a versioned instance/configuration.

### Read-only source-discovery fallback (design recommendation, not a tool selection)

For a bounded code task, use known source paths or available native read-only listing/search tools first. If the paths are unknown and the host has no native discovery tool, stop and ask for known paths or explicit permission for one scoped listing command. An authorized shell listing must match the exact approved command, name its source subtree, and exclude the paths protected for that task; list paths only, then read selected files through the host's read tool. In the Evershop trace above, pruning every directory named `data` was explicitly part of that task's allowance. Do not generalize it into a rule that excludes every source directory named `data` in every project; distinguish protected workspace data roots (such as root `.env`/`data/`) from source fixtures, and clarify if the user's boundary is ambiguous. Permission is task-specific, not a standing Bash grant, and does not relax C02's separate prohibition on shell-searching the knowledge corpus. Reconsider a custom listing tool only if repeated representative tasks show the known-path/permission fallback blocks useful work.

## Explicit exclusions

No assumption of immediate cross-harness parity, all-host support, global Pi configuration, install-time auto-mutators, a universal runtime framework, or external meta-harness. An AGENTS.md pointer may be considered later as a low-cost fallback, not a replacement for actual adapters.

## Preconditions / acceptance

Choose one host and one user journey. Specify workspace discovery, session/new-session semantics, tool/read/write capability, approval UI/fallback, data locations, version support, and what happens if hooks are unavailable. Verify actual runtime behavior (not just docs or similar prompt text). An adapter must disclose unsupported hard guarantees and must not silently claim parity.

## Timing / next action

Do not build all adapters before the first journey. The route-to-render trace is complete, but the listing command deviated from the exact approved expression and exposed a nested data-path name. Stop further source discovery until a corrected path-only command is reviewed. If the no-Bash limitation itself must be solved, verify the actual tool inventory and decide whether known paths are adequate or a native read-only listing capability is repeatedly needed. Do not add a general adapter/search framework from this task. Select implementation only after a repeated concrete need and explicit bounded scope.
