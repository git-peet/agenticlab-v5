# ALPHA-TUNE-VAL-001 — Fresh PBI 2 replay with tuned delivery prompts

- **Preregistration:** [`../plans/ALPHA-TUNE-VAL-001.md`](../plans/ALPHA-TUNE-VAL-001.md)
- **Status:** Latest authorized rerun is incomplete: first case passed, second failed, two acceptance cases did not run
- **Run ID:** `ALPHA-TUNE-VAL-001`
- **Workspace:** `/home/peet/Projects/V5-alpha-tune001/`
- **AgenticLab payload:** `3e779dc31aa581efe07a6426b27767c2a77d4d88`
- **EverShop source:** package metadata v2.2.1; no Git metadata, so exact local source commit is unknown

## Summary

After the initialization and fresh-session setup, the user approved a fresh PBI 2 replay plan. The tuned `/plan` command produced a scoped plan for the actual `Media.tsx`/`Media.scss` paths, real `react-slick`, Sass/CSS processing, and a static fixture. The first plan invocation initially guessed two wrong paths because the source paths were omitted from its prompt; after the master supplied the reviewed paths, the plan completed.

The user approved the plan and a lock-pinned temporary test environment under `/tmp`. The delivery Pi preflight reported the required direct packages and system Chromium available. Pi implemented within the planned source/harness scope and ran the approved command. The first attempt failed at Webpack compilation because `.js` source imports did not resolve to TypeScript files. The user approved one harness-only `webpack.config.mjs` correction to map `.js` to `.tsx`/`.ts`/`.js`.

The second attempt compiled and launched Chromium, but timed out waiting for the fixture's initial `Open image 1` control. No acceptance case completed (0/4). Under the preregistered categories, this is a fixture-startup failure because the expected initial control was never exposed.

The user approved one diagnostic/fix cycle. Pi added page/console and DOM diagnostics; the browser showed populated fixture data but an empty React mount and an invalid React element type in `Media`. Pi then changed the opening slider JSX tags from `<SliderComponent.default>` to `<SliderComponent>` but left the closing tags unchanged. That rerun failed to compile due to mismatched JSX tags. After a further explicit user authorization, Pi matched both closing tags and reran the harness. The fixture compiled and Chromium launched; test 1 (modal opening/focus/Escape) passed, test 2 (navigation) timed out waiting for the expected active-image alt, and tests 3–4 did not run. This is an incomplete suite, not a passing PBI result. In the latest separately approved diagnostic/fix cycle, temporary snapshots showed the real slider moving through the expected indexes/alts with Next, ArrowRight, and ArrowLeft. Pi removed those diagnostics, added a 150 ms settling wait before navigation, and reran the suite; test 2 still timed out, while case 1 passed and cases 3–4 did not run. In the latest separately approved cycle, Pi verified that the installed `react-slick` supports `slickGoTo(index, dontAnimate)`, changed the delayed opening alignment call to use `dontAnimate: true`, removed the ineffective 150 ms test delay, and reran the suite. Case 1 passed, case 2 again timed out after the Next button, and cases 3–4 did not run. Pi stopped without further changes. Under the user's delegated root-cause investigation, a temporary browser trace first failed because its helper treated a Playwright locator as a DOM node; it was restored without a rerun. A corrected trace ran with no waits added and showed case 1 passing, Next reaching Gallery image one, then the ArrowRight assertion timing out. The trace itself was emitted as an oversized line and could not be inspected; the diagnostic harness was restored and no product source changed. Comparing the two workspaces then showed a material implementation difference: original `V5-alpha-sandbox` modal settings explicitly set `waitForAnimate: false`; tune001 had omitted it. The user approved a separate rescue to add this setting; that run still passed only case 1 and timed out on ArrowRight after Next reached Gallery image one. A later diagnostic found the ArrowRight handler and `slickNext` were invoked, `beforeChange` moved 1→2, then a later callback moved 1→0. The pending 100 ms `slickGoTo(openingIndex, true)` is the only identified path that would reset to index 0; this strongly indicates stale delayed alignment overwrote navigation. A timer-cancellation rescue then passed cases 1–2 but failed case 3 scroll restoration (expected 420, observed 0); case 4 did not run. A later trace showed ordinary opener focus moved from 420 to 0 before modal open, but the case-specific `preventScroll` focus retained 420 through open. Cleanup then restored 420 with `window.scrollTo`, after which `mainImageTriggerRef.current?.focus()` reset scroll to 0. This identifies the cleanup focus as the scroll-restoration defect. A separately approved `focus({ preventScroll: true })` fix passed cases 1–3; case 4 then failed (expected scrollY 360, observed 0). Rescues and diagnostics are recorded separately in [`ALPHA-TUNE-RESCUE-001.md`](ALPHA-TUNE-RESCUE-001.md) through [`ALPHA-TUNE-RESCUE-005.md`](ALPHA-TUNE-RESCUE-005.md); the final rescue passed all four isolated cases.

## Preflight and scope evidence

| Check | Result | Evidence/limit |
|---|---|---|
| Required direct packages | Available through approved temporary `node_modules` symlink | Pi reports versions match the pinned set; no EverShop package/lock file changed. |
| Browser | `/usr/bin/chromium` 152.0.7977.82 available | Pi preflight. No browser download. |
| Source files | Actual `Media.tsx`/`Media.scss` in approved paths | Pi reports source/harness changes only in approved PBI 2 paths. |
| First validation attempt | Failed before launch | Webpack `.js` aliases did not resolve to TypeScript source extensions. No browser assertions ran. |
| Approved harness correction | Applied once | Updated only `webpack.config.mjs` alias/extension mapping. |
| Second validation attempt | Chromium launched; fixture startup timed out | Fixture data was populated, but the React mount was empty and the expected opener never rendered. No acceptance case completed. |
| Root-cause diagnostic | Temporary instrumentation; no assertion/action changes | ArrowRight reached the component handler with a valid ref and `waitForAnimate: false`; `slickNext` called `beforeChange` 1→2, then a callback moved 1→0, strongly implicating the pending opening-index alignment timer. Instrumentation was restored. |
| Separately labeled rescue 1 | Added `waitForAnimate: false`; one rerun | Case 1 passed; case 2 reached Gallery image one after Next, then timed out on ArrowRight. Setting alone was insufficient. See [`ALPHA-TUNE-RESCUE-001.md`](ALPHA-TUNE-RESCUE-001.md). |
| Separately labeled rescue 2 | Cancelled pending alignment timer on modal `beforeChange`; one rerun | Cases 1–2 passed; case 3 failed; trace isolated cleanup opener focus undoing `window.scrollTo`. |
| Separately labeled rescue 3 | Case-3 opener focus uses `preventScroll`; one rerun | Cases 1–2 passed; case 3 still failed (420 expected, 0 observed). See [`ALPHA-TUNE-RESCUE-003.md`](ALPHA-TUNE-RESCUE-003.md). |
| Separately labeled rescue 4 | Production cleanup focus uses `focus({ preventScroll: true })`; one rerun | Cases 1–3 passed; case 4 failed (360 expected, 0 observed). See [`ALPHA-TUNE-RESCUE-004.md`](ALPHA-TUNE-RESCUE-004.md). |
| Separately labeled rescue 5 | Case-4 opener focus uses `preventScroll`; one rerun | Cases 1–4 passed. One command attempt; exit 0; reported duration 2.6 s. Per-run session usage unavailable. See [`ALPHA-TUNE-RESCUE-005.md`](ALPHA-TUNE-RESCUE-005.md). |
| Original ALPHA-TUNE-VAL-001 cases | 1 passed, 1 failed, 2 not run | The initial replay remains incomplete; later rescue pass does not retroactively change this result. |
| App/database boundary | Preserved | No EverShop app, PostgreSQL, `.env`, root `data/`, full Jest/E2E, or other suite used. |
| Package boundary | Preserved | No package/lock changes or further installs. Temporary dependencies remain under `/tmp`; output from the failed run was reported cleaned. |

## Changed paths reported by Pi

- `packages/evershop/src/components/frontStore/catalog/Media.tsx`
- `packages/evershop/src/components/frontStore/catalog/Media.scss`
- `tests/product-image-viewer/run.mjs`
- `tests/product-image-viewer/webpack.config.mjs`
- `tests/product-image-viewer/swc-loader.cjs`
- `tests/product-image-viewer/fixture.tsx`
- `tests/product-image-viewer/acceptance.mjs`
- `tests/product-image-viewer/mocks/ProductContext.js`
- `tests/product-image-viewer/mocks/useCatalogImageDimensions.js`
- `tests/product-image-viewer/mocks/locale.js`

This list is from the Herdr sandbox-pane reports; no independent source diff review has been performed.

## Interpretation

The tuned preflight surfaced the dependency set before edits, and the approved temporary setup was available. The first harness correction resolved compilation and launched Chromium, revealing a fixture-mount/slider-import issue. Diagnostics led to a tag correction; the latest run passes the modal/focus/Escape case but fails navigation, with the remaining cases unrun. The separately approved `waitForAnimate: false` trial did not resolve navigation. A focused trace showed ArrowRight reached the handler, the ref and `slickNext` were valid, the call began a 1→2 transition, and another callback changed the slide to 0. The stale 100 ms opening-index alignment timer was the only identified path to that reset. A later timer-cancellation repair then passed both modal lifecycle and navigation cases, supporting that root-cause attribution. Case 3 initially failed scroll restoration (expected 420, got 0), but a follow-up trace showed the test's opener focus had already moved the page to 0 before the component captured its restoration baseline. The component restored the observed 0; the assertion compared to 420 measured before focus. With the test helper's `preventScroll` path, scroll stayed at 420 through modal open, close-button focus, dialog close, overflow restoration, and the component's `window.scrollTo(0,420)`. It changed to 0 immediately after `mainImageTriggerRef.current?.focus()` in cleanup, identifying that focus call as the reset. The cleanup-focus fix then passed case 3, but case 4 failed on scroll restoration (expected 360, observed 0). The test-only case-4 `preventScroll` adjustment produced a separate 4/4 rescue pass. This does not retroactively complete the original replay.

The official upstream v2.2.1 tag has the same manifest/lockfile root-version mismatch observed in this source copy (`package.json` 2.2.1; `package-lock.json` metadata 2.1.3). No manifest/lock reconciliation is planned; exact temporary test dependencies are taken from the lock entries and kept outside the repository.

## Next decision

The rescue series reached a 4/4 isolated pass after timer cancellation, non-scrolling cleanup focus, and case-specific test focus with `preventScroll`. This followed several adaptive corrections; it is not a clean first-pass tuned replay. Keep `ALPHA-TUNE-VAL-001` incomplete and report the rescue separately. The one-attempt outcome and measured validation data are in [`ALPHA-TUNE-RESCUE-005.md`](ALPHA-TUNE-RESCUE-005.md). Use the original replay and rescue series together for later analysis; no additional PBI 2 fixes are currently planned.

## Data handling

This result summarizes Pi output read from the exact Herdr pane and the authorized validation command. No raw transcript, tool-argument/result body, or EverShop source content was copied here. Herdr is only an operational channel, not an AgenticLab feature or measure.
