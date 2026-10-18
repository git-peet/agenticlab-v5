# ALPHA-TUNE-RESCUE-001 — PBI 2 modal navigation rescue

- **Status:** Incomplete; no overall acceptance pass
- **Related validation:** [`ALPHA-TUNE-VAL-001.md`](ALPHA-TUNE-VAL-001.md) remains the separate, incomplete tuning-workflow replay
- **Workspace:** `/home/peet/Projects/V5-alpha-tune001/`
- **EverShop source:** package metadata v2.2.1; no Git metadata, exact local source revision unknown
- **Purpose:** Test one evidence-based repair after the root-cause investigation; not a clean tuning validation or a retroactive pass

## Hypothesis and authorized change

The original passing `V5-alpha-sandbox` modal slider explicitly used `waitForAnimate: false`; the tune001 modal settings had omitted it. Installed react-slick defaults this option to `true`, and its slide handler ignores further navigation while a transition is active. The user approved one rescue change: add `waitForAnimate: false` only to tune001's `modalSliderSettings`. The normal `speed: 500` and all acceptance assertions were left unchanged.

Changed path:

- `packages/evershop/src/components/frontStore/catalog/Media.tsx` (the setting remains in the tune001 workspace; it was not rolled back)

## Validation

Only this command was run:

```text
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node tests/product-image-viewer/run.mjs
```

**Exit:** 1 (acceptance assertion failure)

- Case 1, modal/focus/Escape: passed.
- Case 2: Next reached Gallery image one, but ArrowRight timed out waiting for Gallery image two.
- Cases 3–4: did not run.
- Temporary output `/tmp/evershop-product-image-viewer-ZYQnAx` was reported cleaned.

No additional fix or rerun was made. No package/lock changes, installs, app/database access, full Jest/E2E, or browser downloads occurred. The approved temporary dependency tree and `node_modules` symlink remain staged.

## Interpretation and next diagnostic

The change did **not** restore the 4/4 result, so omission of `waitForAnimate: false` was a real implementation difference but not the sufficient root cause.

A later, separately authorized diagnostic instrumented the ArrowRight handler and slider callbacks while preserving the test sequence. It observed: the key handler received ArrowRight while the Next button had focus; the modal ref and `slickNext` existed; `currentSlide` was 1, `animating` was true, and `waitForAnimate` was false; `slickNext` was called; `beforeChange` reported 1→2; then another `beforeChange` reported 1→0 and `afterChange` reported 0. The trace had no timestamps or call stack, but current source has a pending 100 ms `slickGoTo(openingIndex, true)` timer and that is the only identified path that would send this case back to opening index 0. This strongly identifies a stale delayed-alignment timer overwriting navigation—not a missing keyboard event or missing `slickNext` call—as the root cause. The original implementation avoids the stale index by updating `activeSlide` in modal `beforeChange` and resynchronizing with an effect dependent on `activeSlide`; tune001 captures the opening index once and does not update it from modal navigation.

A separately approved repair cancelled the pending alignment timer on modal `beforeChange`; see [`ALPHA-TUNE-RESCUE-002.md`](ALPHA-TUNE-RESCUE-002.md). In that run, navigation passed (cases 1–2), but case 3 failed scroll restoration (expected 420, got 0), and case 4 did not run. The stale-timer diagnosis is supported by the navigation improvement, but the full acceptance suite remains incomplete.

## Data handling

This record contains a privacy-minimized summary of the approved rescue run and Herdr output. No raw transcript, source file, session identifier, or trace payload is copied here. Herdr is only an operational channel.