# ALPHA-TUNE-RESCUE-005 — Preserve scroll in case-4 test setup

- **Status:** Isolated product-image-viewer suite passed 4/4
- **Related validation:** [`ALPHA-TUNE-VAL-001.md`](ALPHA-TUNE-VAL-001.md) remains the original incomplete tuned-workflow replay; this rescue does not retroactively pass it
- **Workspace:** `/home/peet/Projects/V5-alpha-tune001/`
- **EverShop source:** package metadata v2.2.1; no Git metadata, exact local source revision unknown

## Authorized test-only change

Case 4 recorded `scrollY=360`, then used ordinary opener focus before unmounting the modal. The user approved using the existing `preventScroll` option for case 4's initial opener focus. Only `tests/product-image-viewer/acceptance.mjs` changed. The 360-pixel assertion and all other actions/assertions remained unchanged. Production rescue changes from earlier runs remain in `Media.tsx`.

## Validation and observed measures

Command attempt count: **1**

```text
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node tests/product-image-viewer/run.mjs
```

**Exit:** 0 — **4/4 passed**

1. Named native dialog, keyboard opening, focus behavior, Escape/cancel — passed.
2. Real-slider button and ArrowRight/ArrowLeft navigation — passed.
3. Prior scroll state and listener/timer cleanup on close — passed.
4. Cleanup on component unmount while dialog is open — passed.

- **Reported command duration:** 2.6 seconds (runner/terminal report; not active work time)
- **Browser:** `/usr/bin/chromium`, Chromium 152.0.7977.82
- **Dependencies:** previously approved pinned dependency tree restored under `/tmp/agenticlab-tune-val-001-deps.7gYNE1`, available through the workspace `node_modules` symlink; no install was performed in this cycle
- **Generated output:** `/tmp/evershop-product-image-viewer-UTHH7J`, reported cleaned
- **Changed path in this cycle:** `tests/product-image-viewer/acceptance.mjs`
- **Pi/coordinator token, cost, and per-run session metrics:** unavailable for this rescue. The resumed Pi session spans multiple rescues, so its aggregate header is not attributable to this run; no coordinator run window was measured.

No app/database access, full Jest/E2E, browser download, package/lock change, or other test command occurred.

## Interpretation

The case-4 `preventScroll` adjustment completed the previously failing isolated acceptance suite. Combined with earlier targeted fixes, the replayed PBI behavior now passes the four isolated tests in the rescue workspace. This is a rescue-series result after multiple code and harness corrections, not a clean first-pass result and not evidence that the tuning prompts caused or prevented the failures. `ALPHA-TUNE-VAL-001` remains recorded as incomplete; use the original and rescue records separately in later tuning analysis.

## Data handling

This is a privacy-minimized run summary. No raw transcript, session identifier, trace payload, or source file is copied here. Herdr is only an operational channel.