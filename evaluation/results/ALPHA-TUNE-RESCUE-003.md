# ALPHA-TUNE-RESCUE-003 — Preserve scroll during case-3 opener focus

- **Status:** Case 3 root cause identified; the fix and subsequent outcome are recorded in [`ALPHA-TUNE-RESCUE-004.md`](ALPHA-TUNE-RESCUE-004.md)
- **Related records:** [`ALPHA-TUNE-VAL-001.md`](ALPHA-TUNE-VAL-001.md) remains the original incomplete tuning replay; earlier rescue/diagnostic work is in [`ALPHA-TUNE-RESCUE-001.md`](ALPHA-TUNE-RESCUE-001.md) and [`ALPHA-TUNE-RESCUE-002.md`](ALPHA-TUNE-RESCUE-002.md)
- **Workspace:** `/home/peet/Projects/V5-alpha-tune001/`
- **EverShop source:** package metadata v2.2.1; no Git metadata, exact local source revision unknown

## Authorized test-only change

The prior case-3 diagnostic showed the test's `opener.focus()` moved the page from `scrollY=420` to `0` before modal open. The user approved one test-only correction: add an optional `preventScroll` path to `openDialog` and use it only for case 3's initial opener focus. The 420-pixel restoration assertion and production code were unchanged.

Changed path:

- `tests/product-image-viewer/acceptance.mjs`

## Validation

Only this command was run:

```text
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node tests/product-image-viewer/run.mjs
```

**Exit:** 1 (acceptance assertion failure)

- Case 1, modal/focus/Escape: passed.
- Case 2, slider navigation: passed.
- Case 3, scroll restoration: failed; expected `scrollY=420`, observed `0`.
- Case 4, unmount cleanup: not run.
- Temporary output `/tmp/evershop-product-image-viewer-OXTgz1` was reported cleaned.

No production source changed in this attempt. The earlier rescue changes (timer cancellation and `waitForAnimate: false`) remain. No package/lock changes, installs, app/database access, full Jest/E2E, or browser downloads occurred.

## Post-restart diagnostic attempts

The first approved diagnostic attempt after restart failed before the runner loaded because `webpack` could not be resolved: the workspace `node_modules` symlink pointed to the missing `/tmp/agenticlab-tune-val-001-deps.7gYNE1/node_modules`. No browser session or case ran. After explicit approval, the exact pinned temporary dependency set was restored under `/tmp`, with lifecycle scripts disabled and no project manifest/lock changes; the existing symlink now resolves.

A subsequent approved diagnostic run captured the case-3 scroll/focus lifecycle without changing behavior:

- The case began at `scrollY=420`; the opener's `focus({ preventScroll: true })` and Enter key retained 420.
- The modal effect captured `previousScrollY=420`. `showModal()`, overflow locking, close-button focus, `dialog.close()`, and overflow restoration all retained 420.
- Cleanup called `window.scrollTo(0, 420)`, which retained 420.
- Immediately after `mainImageTriggerRef.current?.focus()`, `scrollY` changed to 0. The scroll/focus event trace also showed focus returning to the opener at 0.

Temporary instrumentation was restored; the approved timer-cancellation fix, `waitForAnimate: false`, and case-3 test `preventScroll` path remain. The diagnostic command exited 1 at the existing scroll assertion; cases 1–2 passed, case 3 failed, case 4 did not run. Temporary output `/tmp/evershop-product-image-viewer-aR7wj9` was cleaned.

## Interpretation and next decision

The case-3 root cause is now clear: production cleanup restores the scroll position, then focuses the opener without `preventScroll`, which scrolls the page back to the opener and undoes that restoration. The test's case-specific `preventScroll` is working; it isolates the product cleanup issue. No production or test fix was made during this diagnostic.

The user later approved the minimal cleanup-focus fix; it passed case 3 in the next rescue but exposed a case-4 unmount scroll failure. See [`ALPHA-TUNE-RESCUE-004.md`](ALPHA-TUNE-RESCUE-004.md).

## Data handling

This record contains a privacy-minimized summary of the approved test-only rescue run. No raw transcript, source file, session identifier, or trace payload is copied here. Herdr is only an operational channel.