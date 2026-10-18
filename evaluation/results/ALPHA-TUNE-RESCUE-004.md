# ALPHA-TUNE-RESCUE-004 — Prevent cleanup focus from undoing scroll restoration

- **Status:** Superseded by [`ALPHA-TUNE-RESCUE-005.md`](ALPHA-TUNE-RESCUE-005.md), which passes all four isolated cases
- **Related records:** [`ALPHA-TUNE-VAL-001.md`](ALPHA-TUNE-VAL-001.md) remains the original incomplete tuning replay; prior rescues are [`ALPHA-TUNE-RESCUE-001.md`](ALPHA-TUNE-RESCUE-001.md), [`ALPHA-TUNE-RESCUE-002.md`](ALPHA-TUNE-RESCUE-002.md), and [`ALPHA-TUNE-RESCUE-003.md`](ALPHA-TUNE-RESCUE-003.md)
- **Workspace:** `/home/peet/Projects/V5-alpha-tune001/`
- **EverShop source:** package metadata v2.2.1; no Git metadata, exact local source revision unknown

## Authorized repair

The case-3 trace showed cleanup restored scroll with `window.scrollTo(...)`, then ordinary opener `.focus()` scrolled the page back to the opener. The user approved one production change: use `mainImageTriggerRef.current?.focus({ preventScroll: true })` in modal cleanup. The stale alignment timer cancellation and modal `waitForAnimate: false` remain. No tests/assertions changed.

Changed path:

- `packages/evershop/src/components/frontStore/catalog/Media.tsx`

## Validation

Only this command was run:

```text
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node tests/product-image-viewer/run.mjs
```

**Exit:** 1 (acceptance assertion failure)

- Case 1, modal/focus/Escape: passed.
- Case 2, slider navigation: passed.
- Case 3, scroll restoration and cleanup on close: passed.
- Case 4, cleanup on unmount: failed; expected `scrollY=360`, observed `0`.
- Temporary output `/tmp/evershop-product-image-viewer-Fn0n98` was reported cleaned.

No further changes or reruns occurred. No package/lock changes, installs, app/database access, full Jest/E2E, or browser downloads occurred. The approved temporary dependency tree under `/tmp` remains staged.

## Interpretation and next decision

The approved production change fixed case 3. Case 4's current test sets and records scrollY before calling `openDialog(page)` with its default opener focus, rather than the case-specific `preventScroll` path used by case 3. Given the earlier trace that ordinary opener focus scrolls to 0 before the component captures its baseline, the case-4 result is consistent with the same test-baseline issue; this has not been confirmed in a dedicated case-4 trace.

The user approved the corresponding test-only change in the next rescue: case 4 also focuses its opener with `preventScroll: true`, keeps the 360-pixel assertion, and the isolated suite passes 4/4. See [`ALPHA-TUNE-RESCUE-005.md`](ALPHA-TUNE-RESCUE-005.md).

## Data handling

This record is a privacy-minimized summary of the approved rescue run. No raw transcript, source file, session identifier, or trace payload is copied here. Herdr is only an operational channel.