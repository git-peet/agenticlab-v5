# ALPHA-PBI2-001 — Accessible product-image viewer

- **Status:** User-approved preregistration; frozen; not run
- **Run ID:** `ALPHA-PBI2-001`
- **Prepared:** 2026-10-16
**PBI:** [PBI 2 — Accessible product-image viewer](../../PBIs%20-%20reviewed.md)

## Question

Can the initialized V5 Alpha make the existing EverShop product-image viewer keyboard- and screen-reader-accessible, clean up focus/listener/scroll state correctly, and verify those behaviors in an isolated browser harness without starting EverShop or accessing PostgreSQL?

This is one bounded implementation/verification run, not an A/B comparison or evidence of general AgenticLab benefit. A prior PBI 2 run in a different Evershop workspace reportedly passed an isolated suite, but it is historical evidence only; this run starts from the fresh copy and must establish its own behavior.

## Scope and provenance

- **Workspace:** `/home/peet/Projects/V5-alpha-sandbox/` (`V5-alpha-sandbox`), fresh EverShop copy.
- **EverShop baseline:** root/package manifest version `2.2.1`; Git revision remains unknown because `.git` internals are excluded.
- **AgenticLab:** local test build based on `8280a9a` with approved local prompt/YAML patches and prompt registration; not a clean published revision. Target Pi CLI reports 1.2.0.
- **PBI source surface:** `packages/evershop/src/components/frontStore/catalog/Media.tsx` is the identified component. The read-only review found a click-only image opener, no dialog/focus management, document key listener and body-overflow changes, and delayed slider work requiring cleanup. Treat current source as authoritative; do not assume prior PBI 2 edits exist in this fresh workspace.
- **Implementation files:** the exact app and isolated-harness paths must be named in the Pi plan and approved before implementation. Expected app scope is `Media.tsx`; harness paths are to be proposed, not silently widened.
- **Conditions:** one user-authorized Alpha task, one isolated browser condition, no baseline arm. This measures task execution and acceptance only.

## Boundaries and stop conditions

- Begin with `/plan` after a fresh Pi startup confirms the delivery commands are registered. If `/plan` is absent, stop and report the prompt-registry gap; do not edit `.pi/settings.json` or use another prompt loader without separate approval.
- Planning is read-only. Do not edit, run commands/tests, install dependencies, launch EverShop, start services, connect to PostgreSQL, or access `.env`, secrets, repository-root `data/`, backups, databases, production/customer data, or `.git` internals.
- Implementation is limited to the user-approved plan's `Media.tsx` and explicitly listed isolated harness files. No unrelated source or package/lockfile edits.
- Use only an isolated static harness; do not import the existing app-backed E2E configuration or setup. It must not load `.env`, start the application/server, provision users, or access PostgreSQL.
- Do not use `npx`, `npm exec`, or any implicit fetch/install. Run a local Playwright executable only if it and required dependencies are already present. If not, stop and request separate approval for a bounded temporary setup. Any temp setup must preserve/verify the target `node_modules` path and clean only exact paths it created.
- Keep raw Pi session/tool history and project content local. No source outputs, raw transcripts, or user data are copied into canonical evaluation results.

## Acceptance checks

Score each as `pass`, `partial`, `fail`, or `unavailable`:

1. The main image opener is keyboard-operable and clearly named.
2. The fullscreen viewer is a named dialog; focus moves inside, remains appropriately managed while open, and returns to the opener on close.
3. Escape closes the viewer; previous/next and close controls are keyboard-operable and named.
4. Closing restores the exact prior body scroll state.
5. Document listeners and delayed slider work are cleaned up on close and unmount; rapid open/navigation does not produce stale slider behavior.
6. The dedicated isolated browser suite passes for these behaviors using the actual `Media` component and appropriate deterministic stubs/slider behavior.
7. No application launch, database access, `.env`/protected-data access, full Jest/E2E, unapproved command, dependency install, or change outside the approved plan occurs.

A passing isolated suite does not prove full product-page integration, application build success, or broad delivery benefit.

## Measures

Capture only measures available and relevant to this question:

- acceptance outcomes and focused test pass/fail counts;
- planned versus actual changed paths, tool calls, and scope deviations;
- any incorrect assumptions, harness failures, and recovery iterations;
- user-visible clarifications/approvals/corrections and approximate hands-on time if available;
- Pi-reported token/cost/tool/time data if available; otherwise `unavailable`.

No baseline comparison or system-wide reliability estimate is planned. The earlier PBI 2 result must not be pooled with this run because workspace, payload/runtime conditions, and starting state differ.

## Result handoff and decision

After execution, write a privacy-minimized result using [`../templates/run-result.md`](../templates/run-result.md) at `evaluation/results/ALPHA-PBI2-001.md`. Keep the raw session local. Record whether each criterion passed, failures and corrections, scope fidelity, and what remains unverified.

Do not change AgenticLab-wide prompts or governance from a single PBI. Revisit a system-level change only if a concrete failure or friction pattern recurs and is supported by evidence.

**Next safe action:** restart Pi in `V5-alpha-sandbox`, verify `/plan` is present, then review/approve a plan-only inspection/implementation plan before any source edits or test-environment setup.
