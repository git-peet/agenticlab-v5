# Alpha delivery-workspace checkpoint — two PBIs completed

- **Checkpoint:** `ALPHA-20261016-TWO-PBI-CHECKPOINT`
- **Recorded:** 2026-10-16
- **Workspace:** `V5-alpha-sandbox` (fresh EverShop copy)
**Purpose:** Preserve the first useful delivery-workspace milestone and the evidence available for the first V5 tuning discussion.

## Checkpoint statement

AgenticLab V5, despite needing corrections during execution, guided two distinct, bounded EverShop UI PBIs from approved plans to passing isolated browser suites. The code changes were made in actual EverShop source files; the validation harnesses isolated the relevant components and mocked surrounding application services where appropriate.

This supports a **supervised delivery-feasibility claim**: the current workflow can take these bounded UI slices through planning, implementation, and isolated acceptance checks in a fresh delivery workspace. It does **not** show unsupervised delivery, full storefront integration, persistence, or a general productivity advantage over plain Pi.

## Run evidence

| Run | Outcome | What the evidence supports | What it does not support |
|---|---|---|---|
| [`ALPHA-INIT-001`](../results/ALPHA-INIT-001.md) | Bounded initialization/readiness smoke passed; orientation remained partial. | Four approved setup writes/readbacks, fresh Pi startup/pointer availability, and a separate candidate initializer session's aggregate usage/cost were checked. | Complete project orientation, isolated worker cost with perfect attribution, or delivery benefit. |
| [`ALPHA-PBI1-001`](../results/ALPHA-PBI1-001.md) | Isolated suite passed **6/6** after harness corrections. | Actual quantity-selector/cart components were bundled and exercised; mocked UI/dispatcher contract cases passed. | EverShop server behavior, PostgreSQL persistence, full app integration, or benefit versus a baseline. |
| [`ALPHA-PBI2-001`](../results/ALPHA-PBI2-001.md) | Final post-cleanup isolated suite passed **4/4** using real `react-slick`. | Actual `Media` component modal, focus/Escape behavior, image navigation, and cleanup cases passed in the static browser fixture. | Running-storefront integration, backend behavior, or PostgreSQL persistence. |

Across the two PBI suites, **10/10 final isolated test cases passed**. This is a derived count of the final run results, not a cross-PBI reliability rate or a measure of feature completeness.

## Observed process and boundaries

- The AgenticLab delivery workflow included separate planning, approval, premortem, implementation, and validation steps. Pi followed stop conditions when local dependencies or tests were unavailable; temporary setup and later retries were explicitly approved.
- The implementation required human supervision and multiple corrections, especially for PBI 2's test harness and React Slick navigation. “Completed” here means the named component-level acceptance suite passed, not that the work was autonomous or production-ready.
- The tests used isolated static fixtures. No EverShop app/server, PostgreSQL, `.env`, repository-root `data/`, full Jest/E2E suite, or full application build was used for these runs.
- Temporary lock-pinned browser/test dependencies were installed under `/tmp` with lifecycle scripts disabled, including Sass when the real stylesheet loader required it. The exact workspace symlink, temp dependency tree, and generated bundle directories were removed afterward. No EverShop `package.json` or lockfile was changed.
- Herdr was used only as an operational channel to control/read the separate Pi session and reduce manual prompt relay. Herdr is not part of the AgenticLab experiment and contributes no result or metric.
- The local AgenticLab payload was a test build based on `8280a9a`, not a clean published revision. The result records contain the detailed limitations and evidence provenance.

## Improvement candidates surfaced by the runs

These are candidates for review, not approved changes. The session-metrics dataset supports exploratory numerical analysis, not causal comparison.

1. **Dependency preflight:** Have the plan identify the complete test toolchain and source-style dependencies up front (including browser binary strategy, Sass/style processing, and real UI libraries) before implementation begins.
2. **Harness readiness and cleanup:** Keep tests against real target components/libraries where behavior depends on them; make fixture boot failures diagnosable; ensure servers remove generated `/tmp` output on every exit path. During PBI 2, failed runs left temporary bundle directories that required manual cleanup.
3. **Behavior-first assertions:** Preserve user-visible outcomes as the acceptance evidence. Keep handler/ref spies and diagnostic attributes temporary and test-only; PBI 2 needed a cleanup pass to remove them from production source and the final spec.
4. **Bounded remediation flow:** The explicit stop/approval gates worked, but repeated manual handoffs added friction. Consider whether the implementation workflow can present a compact diagnosis, proposed bounded fix, and exact rerun command at each failure without weakening the authorization gate.
5. **Learning and evaluation capture:** Task-local findings informed fixes, while durable knowledge remained opt-in. Pi usage/cost and tool metrics have now been extracted as aggregates; raw session bodies were not copied, and active time/user hands-on time remain unavailable.

## Evidence gaps and claim boundary

- No control/baseline runs were conducted, so no causal claim that AgenticLab improves speed, quality, or effort is supported.
- Privacy-minimized Pi-session metrics are now available in [`../metrics/ALPHA-20261016-PI-SESSION-METRICS.csv`](../metrics/ALPHA-20261016-PI-SESSION-METRICS.csv), with definitions and window caveats in [`../metrics/README.md`](../metrics/README.md): per-window message/tool counts, model tokens/cost, Playwright command counts, and approximate tool call/result timestamp deltas. The separate initialization session was recovered from a target-workspace/date-bounded metadata lookup; its worker metrics and final activation check are distinct from PBI1/PBI2. The elapsed windows include idle/approval gaps, so active time and user hands-on time remain unavailable. Raw session bodies were not copied. Coordinator-session figures are separate; the PBI2 coordinator window contains Herdr activity and is excluded from PBI attribution.
- No independent full source-diff review or complete application integration test was performed.
- Passing isolated component tests do not prove parent-page, backend, or persistence behavior.

## Next decision

The frozen initial descriptive baseline is [`../baselines/ALPHA-BASELINE-001-v0.1.md`](../baselines/ALPHA-BASELINE-001-v0.1.md). Use it, together with this checkpoint, to select a small, explicitly approved first tuning batch for AgenticLab V5. Keep the tested workflow and application changes stable while deciding which process improvements to make. If the next claim is comparative effectiveness, preregister a bounded control/baseline or paired evaluation rather than inferring benefit from these two successful component slices.
