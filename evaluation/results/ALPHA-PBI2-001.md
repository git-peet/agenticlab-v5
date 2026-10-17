# ALPHA-PBI2-001 — Accessible product-image viewer

- **Preregistration:** [`../plans/ALPHA-PBI2-001.md`](../plans/ALPHA-PBI2-001.md)
- **Environment amendment:** [`../plans/ALPHA-PBI2-001-setup-amendment.md`](../plans/ALPHA-PBI2-001-setup-amendment.md)
- **Status:** The isolated Playwright suite passes 4/4 after the approved ArrowRight fix; full EverShop integration/backend remain untested.
- **Run ID:** `ALPHA-PBI2-001`
- **Target:** `V5-alpha-sandbox` (fresh EverShop copy)
- **Pi version:** 1.2.0

## Summary

Pi reports that the approved PBI 2 source and isolated harness files were implemented, including a real `react-slick` import, a native `<dialog>` opened with `showModal()`, Escape/cancel synchronization, focus handling, scroll restoration, and cleanup. These implementation details have not yet passed browser validation.

Pi's first validation attempt exited before running tests because `./node_modules/.bin/playwright` was missing. The approved temporary dependency directory still existed, but the temporary project-root symlink did not. After verifying that the root `node_modules` path was absent and the approved `/tmp` dependency tree was present, the symlink was restored and the approved test command was run with system Chromium 152.

On the first retry, Playwright discovered four tests, but all four timed out in `beforeEach` while waiting for `window.productImageViewerHarness`; no acceptance assertion ran. Pi then added browser/response diagnostics and normalized the real `react-slick` import. On the subsequent run, the fixture initialized and all four tests reached their acceptance assertions, but **0/4 passed**: focus left the dialog during Tab checks, the image intercepted the real Next button click, and the cleanup tests did not observe an increase in tracked 100 ms timers.

Pi then used the one approved remediation cycle to add a Tab focus trap, name the delayed slider callback, make timer tracking use unique harness IDs, fix the image-double `objectFit` warning, and compile/inject real Slick/gallery styles. Its rerun failed during Webpack startup with `Cannot find module 'sass'`; the suite did not start in that cycle. After the user separately approved Sass 1.98.0 in `/tmp`, Pi ran a verification-only retry with no edits. Four tests ran: three passed (named modal/Escape/focus, close scroll/listener/timer cleanup, and unmount cleanup); one navigation test failed. Clicking the real Next button changed Front to Side, but ArrowRight did not advance to Back.

The user then approved one bounded remediation for that navigation failure. Via Herdr, the master sent the prompt to the sandbox Pi. It synchronized `activeSlide` from the modal slider's `beforeChange` callback and reran the same suite. The result remained 3/4: the navigation test still failed because ArrowRight left the active image on Side instead of advancing to Back.

The user subsequently approved a bounded diagnostic/remediation cycle. Via Herdr, the master sent the prompt to the sandbox Pi. Pi moved arrow handling to window capture and instrumented the event path and modal slider reference. The diagnostics showed ArrowRight reached `handleKeyDown` while focus was on the in-dialog Next button; the ref existed, `slickNext` was a function, and the method was invoked. The prototype spy used in an earlier attempt was not a valid probe for the actual modal instance.

With that cause established, Pi set `waitForAnimate: false` for the modal slider so a key navigation request during an existing Slick transition is not dropped. The final dedicated run passed **4/4**. The navigation assertion confirmed Front → Side via the real Next button, ArrowRight to Back, and ArrowLeft back to Side. The close/focus and cleanup checks also passed. A separately approved cleanup removed the temporary diagnostic `data-*` attributes, key-event tracing, console logging, and internal handler/ref assertions while retaining the observable behavior checks; the post-cleanup suite also passed 4/4.

## Changed paths reported by Pi

- `packages/evershop/src/components/frontStore/catalog/Media.tsx`
- `packages/evershop/src/components/frontStore/catalog/Media.scss`
- `tests/product-image-viewer/playwright.config.ts`
- `tests/product-image-viewer/webpack.config.mjs`
- `tests/product-image-viewer/swc-loader.cjs`
- `tests/product-image-viewer/style-loader.cjs`
- `tests/product-image-viewer/server.mjs`
- `tests/product-image-viewer/fixture.html`
- `tests/product-image-viewer/fixture.tsx`
- `tests/product-image-viewer/testDoubles.tsx`
- `tests/product-image-viewer/product-image-viewer.spec.ts`

This list is from Pi's reports read directly from the Herdr sandbox pane; no independent source diff was reviewed. Later changes to `Media.tsx` set modal `waitForAnimate: false`; the approved cleanup removed temporary navigation diagnostics from `Media.tsx`, `fixture.tsx`, and the spec while preserving user-visible behavior tests.

## Validation evidence

| Measure | Observation | Evidence/limit |
|---|---|---|
| Initial Pi test invocation | Exit 127: `./node_modules/.bin/playwright` missing | User-pasted Pi output. No tests ran in that invocation. |
| Temporary dependency state | `/tmp/agenticlab-pbi2-deps.yYkMTh/node_modules` existed; project-root `node_modules` was absent | Exact path check before retry. Root symlink was recreated only after confirming absence. Why the prior link was absent is unknown. |
| Retry command | `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium ./node_modules/.bin/playwright test --config=tests/product-image-viewer/playwright.config.ts` | Run from the approved sandbox root using the temporary lock-versioned dependencies and system Chromium 152. |
| First retry result | 4 discovered; 0 passed, 4 failed | Each failed in `beforeEach` on the 15-second wait for `window.productImageViewerHarness`; no feature assertion ran. |
| Follow-up retry result | 4 tests reached assertions; 0 passed, 4 failed | Pi reports focus containment failure, Next-button click interception by the image, and no observed increase in the tracked 100 ms timer count in both cleanup tests. |
| One-cycle remediation rerun | Failed before tests started | Webpack could not resolve `sass` from the temporary dependency tree. User-pasted Pi output; no acceptance assertion ran. No dependency setup was attempted in that cycle. |
| Supplemental test setup | Sass 1.98.0 added to `/tmp` | User separately approved the addition; installed with lifecycle scripts disabled. Exact workspace symlink still points to the approved temp dependency tree. |
| Sass-enabled verification-only rerun | 3 passed, 1 failed | Directly inspected via Herdr `agent get`/`agent read`; only modal ArrowRight navigation failed after Next-button click. No edits in that attempt. |
| Bounded ArrowRight remediation and rerun | 3 passed, 1 failed | Sent through Herdr to `w5:p1`; Pi synchronized modal `activeSlide` from `beforeChange`. ArrowRight still left the active image on Side instead of reaching Back. |
| Bounded event-path fix | 4 passed, 0 failed | Diagnostics showed event reached handler; modal ref and method were available/invoked. Setting modal Slick `waitForAnimate: false` fixed the dropped request. |
| Approved diagnostic cleanup and verification | 4 passed, 0 failed | Removed test-only DOM attributes/logging/internal assertions; retained observable modal, keyboard navigation, focus, and cleanup checks. Same dedicated config passed 4/4. |
| Execution channel | Herdr used only to route prompts and inspect the sandbox Pi pane | This is operational process context, not an AgenticLab feature, metric, or result. |
| Build/server boundary | The dedicated fixture/server path ran; generated bundle was under `/tmp`, not the repository | No EverShop application or database was started/accessed. The exact leftover temporary bundle directory was removed afterward. |
| Scope/safety | No install into the repo, package/lock edit, app, database, `.env`, `data/`, full Jest/E2E, or browser download | After final validation, removed the exact temporary root symlink, `/tmp` dependency tree, and generated bundle directories. |
| Pi session metrics | Aggregated | See [`../metrics/ALPHA-20261016-PI-SESSION-METRICS.csv`](../metrics/ALPHA-20261016-PI-SESSION-METRICS.csv). The Evershop Pi PBI 2 window has 14 user messages, 72 assistant messages, 89 tool calls, 18.00M total tokens, and $0.419908 reported session cost. Its 11 Playwright command calls include 9 nonzero tool results and 2 clean exits; final post-cleanup suite passed 4/4. Window span is 5h33m47s, including idle/approval gaps, not active time. |

## Interpretation

PBI 2 source changes are real EverShop source changes, not merely a mock implementation. The latest dedicated browser run passes all four tests against the actual `Media` component and real `react-slick`: named native modal/Escape/focus, modal button and keyboard navigation, scroll/listener/timer cleanup on close, and unmount cleanup. The investigation found that the modal slider ref was valid and the `slickNext` method was invoked; React Slick's default `waitForAnimate` behavior was dropping a request during the prior transition. Setting the modal slider option to `false` resolved the failure.

The test remains an isolated fixture, not a running EverShop storefront. Application-level routing/CSS integration beyond the bundled component, backend behavior, and PostgreSQL persistence are not established. The approved cleanup removed the temporary diagnostic attributes and logging; final validation still passed 4/4.

Herdr is only the terminal/session control channel used to operate the separate Evershop Pi session and retrieve its output. Herdr itself is outside the AgenticLab experiment; no Herdr capability is counted as a feature, measure, or result.

## Next step

The approved navigation fix and cleanup-only pass are complete; the final isolated suite passes 4/4. The bounded PBI 2 validation goal is met subject to the stated lack of full-storefront/backend integration. Temporary dependencies, the exact root symlink, and generated bundle directories have been removed. Any broader EverShop integration validation is a separate scope.

## Data handling

This record combines Evershop Pi reports, authorized Playwright outcomes, and privacy-minimized usage/tool aggregates from the exact sessions. Herdr was only the operational prompt/output channel; its mixed coordinator-window figures are separated and not counted as PBI evidence. No raw session transcript, unrelated session history, or project data has been copied here; extraction definitions are in [`../metrics/README.md`](../metrics/README.md).
