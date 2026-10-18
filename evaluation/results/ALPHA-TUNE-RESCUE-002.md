# ALPHA-TUNE-RESCUE-002 — Cancel stale modal alignment timer

- **Status:** Incomplete; navigation cases now pass, but scroll-restoration case fails
- **Related records:** [`ALPHA-TUNE-VAL-001.md`](ALPHA-TUNE-VAL-001.md) is the separate incomplete tuning replay; [`ALPHA-TUNE-RESCUE-001.md`](ALPHA-TUNE-RESCUE-001.md) records the prior `waitForAnimate` trial and the timer diagnosis
- **Workspace:** `/home/peet/Projects/V5-alpha-tune001/`
- **EverShop source:** package metadata v2.2.1; no Git metadata, exact local source revision unknown

## Diagnosis and authorized repair

The focused diagnostic showed the ArrowRight handler and modal slider ref were valid, `slickNext` was called, and `beforeChange` reported a move from slide 1 to 2; another callback then moved the slider from 1 back to 0. The only identified code path for that reset was the pending 100 ms `slickGoTo(openingIndex, true)` alignment timer, which retained the original opening index and was not canceled on navigation.

The user approved one bounded repair. In `Media.tsx`, Pi added a ref to track the pending modal-alignment timer; modal `beforeChange` cancels it, the callback clears its ref when fired, and effect cleanup cancels any outstanding timer. The existing `waitForAnimate: false` rescue setting and normal 500 ms speed remain. No assertions, waits, or test actions changed.

Changed path:

- `packages/evershop/src/components/frontStore/catalog/Media.tsx`

## Validation

Only this command was run:

```text
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node tests/product-image-viewer/run.mjs
```

**Exit:** 1 (acceptance assertion failure)

- Case 1, modal/focus/Escape: passed.
- Case 2, modal button and arrow navigation: passed.
- Case 3, scroll restoration and cleanup on close: failed; expected scroll position 420, observed 0.
- Case 4, cleanup on unmount: not run.
- Temporary output `/tmp/evershop-product-image-viewer-zE1m7Q` was reported cleaned.

No additional fix or rerun was made. No package/lock changes, installs, app/database access, full Jest/E2E, or browser downloads occurred. The approved temporary dependency tree and workspace `node_modules` symlink remain staged.

## Interpretation and next decision

The stale-alignment repair resolved the earlier navigation failures: cases 1 and 2 passed in this run. A separate scroll-restoration acceptance failure is now exposed; its cause has not been diagnosed. Do not assume it was caused by the timer fix or change it without evidence. The rescue remains incomplete and does not retroactively make `ALPHA-TUNE-VAL-001` pass.

A separately approved diagnostic captured the case-3 scroll/focus timeline: ordinary `opener.focus()` moved from `scrollY=420` to `0` before the modal effect captured its baseline. This was a real test setup effect, but not a sufficient explanation: the subsequent test-only `preventScroll` change still failed case 3 with `scrollY=0`. See [`ALPHA-TUNE-RESCUE-003.md`](ALPHA-TUNE-RESCUE-003.md). The step that resets scroll under `preventScroll` remains unknown.

Further changes/runs require fresh approval. Recommended next step: one compact diagnostic-only trace with `preventScroll` enabled, capturing scroll position after opener focus, `showModal`, close-button focus, cleanup `scrollTo`, and final assertion. Do not alter production scroll logic or weaken the assertion before that trace identifies the responsible step.

## Data handling

This record contains a privacy-minimized summary of the approved rescue run and Herdr output. No raw transcript, source file, session identifier, or diagnostic trace payload is copied here. Herdr is only an operational channel.