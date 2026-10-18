# ALPHA-TUNE-001 — Test-readiness and evidence-capture tuning

- **Preregistration:** [`../plans/ALPHA-TUNE-001.md`](../plans/ALPHA-TUNE-001.md)
- **Status:** Post-change replay measured once; process evidence is mixed and causal effect is inconclusive
- **Run ID:** `ALPHA-TUNE-001`
- **Workspace:** AgenticLab V5 development workspace
- **Baseline:** [`../baselines/ALPHA-BASELINE-001-v0.1.md`](../baselines/ALPHA-BASELINE-001-v0.1.md)

## Summary

Implemented the approved text-only tuning batch from observed PBI 1/PBI 2 friction. The `/plan` guidance now asks for a bounded dependency/style/browser/harness preflight when custom browser validation is planned. `/implement` now checks validation readiness, distinguishes environment/build startup failures from acceptance failures, and specifies test-only diagnostics and temporary-output cleanup. The result template separates delivery and coordinator session windows and records attempts, setup, cleanup, usage, and time-window caveats.

The batch was exercised in the fresh PBI 2 replay [`ALPHA-TUNE-VAL-001`](ALPHA-TUNE-VAL-001.md), followed by separately labeled rescues [`ALPHA-TUNE-RESCUE-001`–`005`](ALPHA-TUNE-RESCUE-001.md). The initial replay ended incomplete (1 case passed, 1 failed, 2 unrun). After 18 command attempts across build/fixture failures, diagnostics, and approved rescues, the final rescue isolated suite passed 4/4. The pass required production fixes for a stale alignment timer and cleanup focus, plus test-only scroll-preserving opener focus. This is a useful successful rescue outcome, but not a first-pass workflow result.

## Changed files

- `system/prompts/delivery/plan.md`
- `system/prompts/delivery/implement.md`
- `evaluation/templates/run-result.md`
- `evaluation/README.md`
- `evaluation/plans/ALPHA-TUNE-001.md`
- `evaluation/results/ALPHA-TUNE-001.md`

## Acceptance checks

| Check | Result | Evidence/limit |
|---|---|---|
| Plan preflight covers behavior-critical dependencies, CSS/SCSS processing, local runner/browser, generated-output path/cleanup, and exact command | Pass by static review | Does not install or inspect target dependencies automatically. |
| Implement preflight blocks unapproved setup and separates environment/startup failure from acceptance failure | Pass by static review | Must be observed in a later real implementation run. |
| Diagnostics are temporary/test-only; final checks preserve behavior assertions and approved remediation limits | Pass by static review | No EverShop test was run for this prompt update. |
| Result template separates session roles, run-window time from active time, command attempts from test cases, and environment cleanup | Pass by static review | Future data must populate these fields to validate usefulness. |
| `git diff --check` | Pass | Documentation-only validation. |

## Post-change evidence against the tuning question

| Measure | Observed | Interpretation |
|---|---|---|
| Preflight completeness | Required pinned packages/browser/style path were identified before source edits; missing dependencies triggered separate setup approval. The first plan invocation still needed master-supplied source paths. | Positive on dependency readiness; partial on task-context capture. |
| Late dependency discovery | 0 required packages first discovered after implementation began, following the approved preflight. A Webpack `.js` alias/module-resolution problem surfaced at first build. | Dependency preflight worked; it did not cover every harness integration assumption. |
| Validation attempts | 18 recorded harness command attempts across replay, diagnostics, and rescues, including build/startup failures, intentional diagnostic stops, and one post-restart attempt blocked before test startup. | This is an observed iteration count, not 18 independent behavioral failures and not a comparable retry rate. The final pass followed multiple adaptive corrections. |
| Acceptance outcome | Original replay: 1 pass, 1 fail, 2 unrun. Final separately labeled rescue: 4/4 pass. | The PBI can pass in the rescue workspace after targeted corrections; the preregistered first replay remains incomplete. Do not retroactively replace its result. |
| Harness hygiene/safety | Generated output cleaned; temporary diagnostics restored; no project package/lock changes, app/database access, full Jest/E2E, or browser download. | Approval boundaries and cleanup were maintained. The dependency tree vanished on reboot, was recreated only after approval, and is currently under `/tmp`. |
| Usage/effort | Final rescue command reported 2.6 seconds. Per-run delivery/coordinator tokens, cost, and active time unavailable; the Pi session spans multiple rescues. | Do not compare cost or effort with the baseline from this run. |

## Interpretation and limits

The tuning batch appears to have helped **readiness and process discipline**: missing packages were surfaced before edits, setup stayed approval-gated, failure classes were recorded, and temporary output/diagnostics were cleaned. It did **not** prevent harness alias/import/JSX mistakes, a stale timer bug, or scroll-focus bugs; the original fresh replay did not complete. The final 4/4 came only after multiple adaptive source and test-fixture corrections.

This single replay cannot establish that the prompt tuning caused the worse initial result or that it generally reduces retries. Conditions differed from the original sandbox: tune001 started from a fresh EverShop source copy without the previous PBI implementation and rebuilt the harness, while the original sandbox already had a working implementation/setup. The prompt batch was text-only; the observed code defects were in the fresh implementation. Keep ALPHA-TUNE-001 unchanged for now; do not revert it or claim benefit from one rescue pass.

The tuning batch does not add a dependency installer, Herdr integration, automatic telemetry, or changes to scope/knowledge/write gates. If further validation is desired, preregister the next bounded task with a known/stable harness, exact source paths, a fixed remediation cap, and explicit separation of first-pass outcome from rescue outcome. Avoid treating the original Alpha runs and this adaptive replay as a controlled comparison.
