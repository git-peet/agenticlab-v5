# ALPHA-TUNE-VAL-001 — Fresh PBI 2 replay with tuned delivery prompts

**Status:** Draft preregistration; review/approval required before invoking `/plan`  
**Prepared:** 2026-10-17  
**Tuning batch:** [`ALPHA-TUNE-001`](ALPHA-TUNE-001.md)  
**Descriptive baseline:** [`../baselines/ALPHA-BASELINE-001-v0.1.md`](../baselines/ALPHA-BASELINE-001-v0.1.md)  
**Target:** `/home/peet/Projects/V5-alpha-tune001/`

## Question

In a fresh delivery workspace, do the tuned `/plan` and `/implement` instructions identify the product-image viewer's full validation requirements before source edits and handle validation failures/temporary output cleanly, while preserving the agreed PBI 2 acceptance checks?

This is a **fresh replay of the same PBI 2 scope**, not a new product feature. Reusing the same acceptance scope makes the process more comparable; one replay still does not establish a causal or statistical improvement.

## Conditions

- EverShop package metadata reports version 2.2.1. The supplied source copy has no Git metadata, so its exact source commit cannot be verified. The inspected package/source markers did not contain the earlier PBI 1/2 implementation artifacts.
- AgenticLab payload revision: `3e779dc31aa581efe07a6426b27767c2a77d4d88`.
- Target Herdr workspace: `V5-alpha-tune001`; Evershop Pi pane: `w6:p1`. Herdr is only the operational prompt/output channel and is not part of the AgenticLab metric.
- Pi 1.2.0 / model-provider must be recorded at run time. System Chromium 152 is installed at `/usr/bin/chromium`.
- Project `node_modules` was absent at preflight. The temporary PBI 2 dependency tree from the prior run has been removed. No test dependency or browser binary is pre-authorized for this replay.

## Scope

- Replay the reviewed PBI 2 acceptance scope from [`../../PBIs - reviewed.md`](../../PBIs%20-%20reviewed.md): `Media.tsx`/`Media.scss` and the isolated `tests/product-image-viewer/` harness/spec as needed.
- Use real `react-slick` and the actual stylesheet path when behavior depends on them. Mock only surrounding application services/context not under test.
- No EverShop app/server, PostgreSQL, `.env`, root `data/`, full Jest/E2E suite, package/lock changes, `npx`/`npm exec`, browser download, or dependency install in the project.
- Temporary dependency setup under `/tmp` requires separate explicit approval after the plan identifies the exact locked versions and package set. If required tools are missing, stop before source edits or tests unless the user separately approves setup.
- Generated bundle/results stay under unique `/tmp` directories and must be cleaned on success, failure, or termination.

## Tuning measures

1. **Preflight completeness:** Did the plan identify actual imports and the full style/browser/test toolchain, including Sass/SCSS if needed, before implementation? Record each expected dependency/version as available, missing, or unknown.
2. **Late-discovery count:** Count required test dependencies/assets first discovered after implementation started; target is zero, but report observed value rather than treating it as a pass gate by itself.
3. **Validation attempts:** Record each direct Playwright command attempt, whether it started the suite, and classify outcome as environment/preflight, build/server/fixture startup, acceptance failure, or pass. Separate command attempts from test-case totals.
4. **Harness hygiene:** Verify unique temporary output paths, cleanup after the final run, and no diagnostic data attributes/logs/spies in final production source or behavior tests.
5. **Outcome/safety:** PBI 2 acceptance-case results; files changed versus approved scope; any stop, clarification, or approval event; no out-of-scope app/database/data activity.
6. **Usage:** Capture delivery-Pi and coordinator session metrics separately, with UTC window definitions. Wall-window spans include idle time; active/hands-on time remains unavailable unless directly measured.

## Stop conditions

Stop if the EverShop source identity/scope is materially unclear, the generated plan widens scope, a required dependency is missing and no separate setup approval exists, validation tries to access protected paths, or a test fails beyond the explicitly authorized remediation bound. Do not silently substitute mocks for real slider/style behavior.

## Approval and sequence

1. Approve this preregistration.
2. Invoke the tuned `/plan` in the fresh workspace and review its exact implementation plan.
3. Approve the PBI plan separately, then invoke `/implement` separately.
4. Review any dependency/setup request before installation; no installation is authorized by this preregistration.
5. Record final metrics/result without raw session content.
