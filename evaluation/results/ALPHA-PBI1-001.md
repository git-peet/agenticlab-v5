# ALPHA-PBI1-001 — Quantity selector implementation attempt

- **Preregistration:** [`../plans/ALPHA-PBI1-001.md`](../plans/ALPHA-PBI1-001.md)
- **Status:** Scoped isolated UI/dispatcher validation passed 6/6 after harness corrections; backend persistence and full EverShop integration remain unverified.
- **Run ID:** `ALPHA-PBI1-001`
- **Run date:** 2026-10-16
- **Workspace:** `V5-alpha-sandbox` (fresh EverShop copy)
- **AgenticLab:** local test build based on `8280a9a`; not a clean published revision
- **Pi version:** 1.2.0

## Summary

Pi reported creating the planned quantity-selector implementation and isolated Playwright harness files within the approved scope. Validation initially stopped because the local Playwright runner/dependencies were unavailable; after two harness-only corrections, the isolated suite ran and passed 6/6 in Chromium 152 using temporary pinned dependencies. No EverShop app, PostgreSQL, full Jest/E2E, or application build was run. The result validates the scoped UI and mocked cart-dispatch contract only, not backend persistence or full application integration.

## Reported changes

- `packages/evershop/src/components/common/form/QuantitySelector.tsx` (new)
- `packages/evershop/src/components/frontStore/catalog/ProductSingleForm.tsx`
- `packages/evershop/src/components/frontStore/cart/ItemQuantity.tsx`
- `packages/evershop/src/components/frontStore/cart/DefaultCartItemList.tsx`
- `packages/evershop/src/components/frontStore/cart/AddToCart.tsx` — the plan allowed a conditional contract change; Pi reports adding an optional quantity argument so product add uses the latest committed value.
- `tests/quantity-selector/playwright.config.ts`
- `tests/quantity-selector/webpack.config.mjs`
- `tests/quantity-selector/swc-loader.cjs`
- `tests/quantity-selector/server.mjs`
- `tests/quantity-selector/fixture.html`
- `tests/quantity-selector/fixture.tsx`
- `tests/quantity-selector/testDoubles.tsx`
- `tests/quantity-selector/quantity-selector.spec.ts`

Pi reports no `package.json` or lockfile changes. The full tool trace and changed-file diff were not supplied or independently reviewed; this list is based on the user's pasted completion report.

## Validation status

| Check | Status | Evidence/limitation |
|---|---|---|
| Scoped UI/dispatcher acceptance | Pass for isolated cases | Dedicated static Playwright suite passed 6/6; tests use mocked add/cart dispatch. |
| Backend persistence/full app integration | Not tested | No EverShop app, PostgreSQL, or real backend was used; no persistence claim. |
| Isolated Playwright harness | Pass after corrections | Static server/bundle harness built and ran using system Chromium 152. |
| Dependency boundary | Pass | Pinned direct dependencies installed only under `/tmp` with lifecycle scripts disabled; no `npx`, package/lock changes, or persistent project dependency directory. |
| No app / database / full suite | Pass | Only the dedicated quantity-selector Playwright suite ran. |
| Scope/file list | Reported within approved list | Must still compare against actual diff before treating exact path compliance as independently verified. |
| PostgreSQL persistence | Not tested / out of scope | Mocked dispatcher tests cannot prove database persistence. |

## Interpretation

This run shows the system stopped at the preregistered dependency-availability gate instead of fetching/installing packages or using the unsafe E2E/database path. That is the intended safety behavior. It does **not** show that the component, callbacks, accessibility behavior, or test harness pass. The conditional `AddToCart` API change was allowed in the approved plan, but should be reviewed in the diff before validation.

No PBI completion or delivery-benefit claim is supported yet.

## Next safe action

The user may either provide an environment with the exact local Playwright toolchain already available or separately approve a disposable, lock-pinned test-dependency setup. Before any setup, verify that the EverShop root `node_modules` path is absent; stop if it exists or has unknown ownership. If temporary dependencies are approved, keep them outside the repository and use only the approved isolated test command. Do not use `npx`/`npm exec`, install into the project, change package/lock files, launch EverShop, run full Jest/E2E, or access PostgreSQL/`.env`/`data/`. After validation, record actual test output and inspect the source diff against the approved plan.

## Update 1 — Read-only review of reported implementation and harness

A read-only review of the listed implementation and harness files found the code generally follows the approved boundaries: it keeps an editable draft, validates before add/update, converts cart totals to the existing delta/action dispatch, blocks overlapping updates, reverts to the last valid cart quantity on failure, and reports errors. The static server binds to `127.0.0.1` and serves only the fixture page and generated bundle; generated bundle output is created under a temporary directory. No code was changed and no command/test was run.

**Items to resolve or explicitly accept before calling the PBI complete:**

- `QuantitySelector` renders a `type="text"` input (implicit textbox) but sets `aria-valuemin`/`aria-valuemax`, which are not meaningful on a textbox without spinbutton semantics. Either remove those attributes and keep it a textbox with its label/errors, or implement/test the appropriate spinbutton role/value/keyboard behavior.
- The spec tests exercise the increment path but do not explicitly assert that decrement dispatches `{ action: "decrease" }`. They also don't assert the `aria-invalid`/`aria-describedby` relationship or product add-loading behavior, although loading is exercised for cart updates.
- Playwright's `outputDir` is a fixed `/tmp/evershop-quantity-selector-results` path. Before execution, make it unique per run or otherwise ensure it cannot overwrite/clear pre-existing unrelated temporary artifacts. The bundle itself uses a unique `mkdtemp` directory and the static server's route allowlist is narrow.
- The optional `AddToCart` argument change is within the plan's conditional allowance, but no full type/build check or search of other call sites was performed. Review any broader callers only if they are in the approved scope; do not run the full build under current constraints.

These are review findings, not test failures: validation could not run because dependencies were unavailable. No app, database, `.env`, repository-root `data/`, or full test suite was accessed.

## Update 2 — Correction to the read-only test-spec review

A reread of the current `quantity-selector.spec.ts` corrects several points in Update 1: it **does** assert `aria-invalid` and the `aria-describedby` link for validation feedback, **does** test product add-to-cart loading, and **does** assert a cart decrease dispatch (`{ qty: 98, action: 'decrease' }`) after changing the cart quantity from 99 to 1. Those previously reported gaps were review errors.

One narrower gap remains: that decrease dispatch is caused by editing the textbox and committing, not by activating the decrement button. The suite exercises the increment button with Enter, but does not directly exercise decrement-button activation. Add a click/keyboard decrement-button assertion if the PBI requires both controls to be tested. No tests have been run; this correction is static inspection only.

## Update 3 — Direct decrement-button test added

**Evidence source:** user-pasted Pi report; no raw session/tool trace or test file was independently inspected in this update.

Pi reports adding a test to `tests/quantity-selector/quantity-selector.spec.ts` that starts with cart quantity 3, focuses the named decrement button, activates it with Enter, and asserts quantity 2 plus the exact mocked dispatch `{ itemId: 'cart-item-1', payload: { qty: 1, action: 'decrease' } }`. The report says the textbox was not edited to cause the change and no other files were modified.

This addresses the remaining decrement-button coverage gap identified in the read-only review, based on the supplied report. No tests or commands ran; the implementation and harness remain unverified until a safe local Playwright environment is available.

## Update 3 — Bounded temporary test setup; harness compile blocked

The user authorized a temporary dependency setup. The target's `node_modules` path was confirmed absent, then a temporary symlink to `/tmp/agenticlab-pbi1-deps.Jjp0fE/node_modules` was created. The temp environment used exact direct versions from the target lockfile (`@playwright/test` 1.59.1, React/ReactDOM 19.2.7, `react-hook-form` 7.71.1, webpack 5.104.1, `@swc/core` 1.15.10) with npm lifecycle scripts disabled. System Chromium 152 was available; an optional `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` override was added to the in-scope Playwright config so the test can use it without downloading a browser.

The approved test command was run once with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`. Playwright attempted to start the isolated server, but webpack compilation failed before any test case ran. It could not resolve the actual component imports `@components/common/form/QuantitySelector.js`, `@components/frontStore/cart/ItemQuantity.js`, and `@components/frontStore/cart/AddToCart.js`; the harness alias map does not currently resolve these planned real components. No app, test case, database, `.env`, or project data was used.

The exact temporary `node_modules` symlink and `/tmp/agenticlab-pbi1-deps.Jjp0fE` directory were removed after the failure; the target `node_modules` path is absent again. No package or lockfile changes were made. No `npx` or dependency setup in the Evershop repository occurred.

**Next correction:** ask Pi to update only `tests/quantity-selector/webpack.config.mjs` so the three intended application components resolve to their actual source files while surrounding dependencies remain stubbed. Then recreate the same bounded `/tmp` environment and rerun only the dedicated Playwright command. Do not claim PBI completion; the accessibility, behavior, and test outcomes remain unverified until a full test run succeeds.

## Update 4 — Isolated Playwright run: 2 passed, 4 failed

**Run conditions:** The approved bounded `/tmp` setup was recreated with lock-versioned direct dependencies and lifecycle scripts disabled. The test used system Chromium 152 through `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`. It ran only `./node_modules/.bin/playwright test --config=tests/quantity-selector/playwright.config.ts`.

**Results:** `cart input enforces 1–99 and controls are keyboard operable` and `cart decrement button decreases quantity with the keyboard` passed. Four tests failed:

- Product-input validation and the two product add-to-cart cases failed before their main assertions because `getByRole('textbox', { name: 'Quantity' })` matches both the product quantity field and the cart label “Quantity for Sample product”; the locator needs an exact match.
- Cart update failure/recovery timed out waiting for its error. Static review of `testDoubles.tsx` shows `releaseUpdates()` resolves pending updates but leaves `holdUpdate` true, so the subsequent intended failure is held instead of reaching `failUpdate`.

These are test locator/fixture issues, not evidence that the application acceptance passed or failed. The expected follow-up is to make the product locator exact and reset the mock hold state after release, then rerun the same isolated suite. Do not alter the app implementation based on these harness failures alone.

**Cleanup:** The exact temporary `/home/peet/Projects/V5-alpha-sandbox/node_modules` symlink and `/tmp/agenticlab-pbi1-deps.Ssbwca` dependency directory were removed after the run; no Evershop package or lockfile changes were made. The PBI remains unverified until all tests pass. No full suite, app, or database was used.

## Update 5 — Isolated suite passes after two harness corrections

After Pi changed the product locator to use an exact accessible name and made `releaseUpdates()` clear the mock hold flag, the approved isolated suite passed **6/6** in Chromium 152. The exact local Playwright binary was used with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`; no `npx` was used. The temporary pinned dependency tree and exact root symlink were removed after the run; the target `node_modules` path is absent. No app, database, full Jest/E2E, or package/lock changes occurred.

**Interpretation:** The six isolated tests now exercise the scoped quantity-selector UI, product add callback, cart delta dispatch (including direct decrement-button keyboard activation), validation/accessibility attributes, loading, and mock failure recovery. This is evidence for the tested component/dispatcher contract only. It does not prove EverShop server behavior, PostgreSQL persistence, parent-page/full app integration, or general delivery benefit. The full source diff and raw session trace were not independently reviewed.

## After-action interpretation (2026-10-16)

PBI 1 now has a bounded positive outcome: its isolated UI/dispatcher contract suite passed 6/6 after the harness issues were corrected. The implementation path stayed within the planned scope, and the test setup respected the no-install-in-EverShop/no-Postgres boundary. This is evidence that the feature slice can be implemented and tested in an isolated harness, not that it persists to PostgreSQL, integrates end-to-end with the running storefront, or improves Alpha performance versus plain Pi.

The process surfaced useful corrections: the initial plan's `npx` command conflicted with the no-install constraint (caught before execution); the harness initially lacked aliases for the real components; one test used an ambiguous accessible-name locator; and the update mock did not release its hold for the failure case. These were corrected before the passing run. No actual unsafe install, app/DB access, or out-of-scope edit occurred.

**Metrics follow-up:** A privacy-minimized extraction from the exact Evershop Pi session is now in [`../metrics/ALPHA-20261016-PI-SESSION-METRICS.csv`](../metrics/ALPHA-20261016-PI-SESSION-METRICS.csv), with definitions in [`../metrics/README.md`](../metrics/README.md). For the PBI 1 window, it records 9 Evershop-Pi user messages, 62 assistant messages, 116 tool calls, 5.63M total tokens, and Pi-reported delivery-session cost of $0.131847. PBI 1's 3 direct Playwright command attempts and final 6/6 result occurred in the separate coordinator session, not in the Evershop delivery Pi session. The window span is 7h16m54s, including idle/approval gaps; active time and hands-on time remain unavailable. No raw session body was copied. These metrics do not create a comparative-effectiveness claim.

**Recommendation:** perform this lightweight after-action now, then proceed to PBI 2 rather than pausing for broad mechanism redesign. Preregister PBI 2 as a separate run, focusing on focus/keyboard/dialog/unmount behavior and the same isolated-test boundaries. Carry forward explicit no-`npx`, actual-source aliasing, unique temp-output, and mock release-state checks. Revisit any systemic instruction or evaluation-tool change if the same failure pattern recurs.

## Data handling

This result combines the user-provided completion report, read-only source/harness inspection, and aggregate metadata from the exact Evershop and coordinator Pi sessions. No raw transcript, prompt/tool-result body, or project source was copied into the metrics records. See the metrics README for provenance, window definitions, and limitations.
