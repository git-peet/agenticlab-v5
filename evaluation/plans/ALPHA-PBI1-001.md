# ALPHA-PBI1-001 — Accessible quantity selector through V5 Alpha

- **Status:** User-approved preregistration; frozen; not run
- **Run ID:** `ALPHA-PBI1-001`
- **Prepared:** 2026-10-16
**PBI:** [PBI 1 — Accessible quantity selector](../../PBIs%20-%20reviewed.md)

## Question

Can the initialized V5 Alpha carry out the bounded quantity-selector PBI in the clean EverShop workspace, stay within the approved source/test boundary, and verify the agreed UI behavior without using the EverShop app, database, full Jest/E2E, or unapproved dependency setup?

This is one operational task run, not an A/B comparison or evidence of general AgenticLab benefit. The run measures the task outcome and Alpha behavior, not database persistence.

## Scope and provenance

- **Workspace:** `/home/peet/Projects/V5-alpha-sandbox/` (`V5-alpha-sandbox`), fresh EverShop copy.
- **EverShop baseline:** root/package manifest is version `2.2.1`; Git source revision was not verified under the current `.git` exclusion. Record as unknown unless the user separately authorizes a safe revision check.
- **AgenticLab:** local test payload based on V5 commit `8280a9a0035aca185c9e9d50b729d5da85e9be9b`, with the approved YAML-frontmatter and prompt-registration patches. This is not a clean published revision. Record the current local `SOURCE-REVISION.txt` value and Pi version at run time.
- **Approved plan:** the Pi plan supplied for PBI 1: new shared `QuantitySelector.tsx`; update `ProductSingleForm.tsx`, `ItemQuantity.tsx`, and `DefaultCartItemList.tsx`; add the dedicated `tests/quantity-selector/` static Playwright harness files listed in that plan. Keep `AddToCart.tsx`, `CartContext.tsx`, root package/lock files, and unrelated files unchanged unless implementation finds a necessary contract gap and the user separately approves it.
- **Conditions:** one AgenticLab-assisted implementation/verification run; no plain-Pi baseline or A/B arm. Pi is expected to use the registered `/plan` and `/implement` prompts, both explicitly user-invoked; no workflow runs automatically.

## Boundaries and stop conditions

- Use only the approved plan's source and harness paths. Do not inspect `.git` internals, `.env`/secrets, repository-root `data/`, backups, databases, or production/customer data.
- Do not start EverShop, run migrations, use PostgreSQL, run full Jest/E2E, run a build, or install dependencies for this task.
- Do not use `npx`, `npm exec`, or another command that could fetch/install packages. The only proposed test command is `./node_modules/.bin/playwright test --config=tests/quantity-selector/playwright.config.ts`, and only if that local executable and dependencies are already available. If not, stop and request a separate approval for a safe test setup.
- The isolated static server must serve only the fixture and generated bundle/assets; it must not expose the repository root. Configure Playwright output/reports and generated bundles outside the repository (e.g. under an approved temporary directory) and clean them up. Do not modify `package.json` or lockfiles.
- Mock cart success/failure responses. This run may validate the UI-to-`CartContext.updateItem` dispatch contract, but must not claim PostgreSQL persistence or full backend integration.
- Stop on an out-of-scope file need, unavailable/missing local test runner, unexpected pre-existing dependency path, unsafe test configuration, or any request to access protected data/run unapproved commands.

## Acceptance checks

Score each as `pass`, `partial`, `fail`, or `unavailable`; do not infer success from an unrun command.

1. Product-detail quantity remains whole-number, minimum 1, with no newly invented maximum; add-to-cart receives the latest committed valid value only.
2. Cart quantity retains the existing range 1–99, renders a usable accessible input/control, and emits the existing delta/action dispatch shape rather than an absolute quantity.
3. Empty, malformed, fractional, below-minimum, and above-maximum committed values are announced accessibly, are not silently clamped, and do not trigger add/update callbacks; valid recovery works.
4. Keyboard operation, accessible names/invalid-state association, loading behavior, cart failure feedback, and retention of the last valid quantity are verified in the isolated browser fixture.
5. The dedicated local Playwright command passes, or execution is correctly stopped and reported unavailable if the existing local executable/dependencies are absent.
6. Edits stay within the approved implementation and test paths; no app, database, protected data, package/lockfile change, or full suite is touched.

## Measures

Capture only available evidence relevant to this run:

- Task acceptance outcomes and isolated test pass/fail counts.
- Exact changed paths versus the approved plan and verification evidence for each.
- Scope deviations, blocked/attempted out-of-scope actions, corrections, and implementation misunderstandings.
- Tool-call counts/types, user clarifications/approval interruptions, and approximate elapsed time if observable.
- Pi-reported tokens/cost/duration if available; otherwise mark `unavailable`.

Do not collect or copy raw Pi session transcripts, full tool-result bodies, source files, or customer/project data into canonical evaluation records. Keep raw session data local. A single run cannot estimate reliability or comparative benefit.

## Interpretation and decision rule

A passing run shows only that this implementation/test path worked for this task in this workspace and runtime. It does not prove database persistence, full EverShop integration, broad Alpha effectiveness, or that the mechanism improves over direct Pi. Record regressions, corrections, and test limitations; decide separately whether the PBI is complete within the UI scope and whether a later integration task is needed.

## Result handoff

After execution, write the privacy-minimized outcome using [`../templates/run-result.md`](../templates/run-result.md), record it under `evaluation/results/ALPHA-PBI1-001.md`, and keep this preregistration frozen. Do not begin implementation until both the user-approved PBI plan and this evaluation scope are approved.
