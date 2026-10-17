# ALPHA-TUNE-001 — Test-readiness and evidence-capture tuning

- **Preregistration:** [`../plans/ALPHA-TUNE-001.md`](../plans/ALPHA-TUNE-001.md)
- **Status:** Prompt/template changes completed; effect on a subsequent delivery run not yet measured
- **Run ID:** `ALPHA-TUNE-001`
- **Workspace:** AgenticLab V5 development workspace
- **Baseline:** [`../baselines/ALPHA-BASELINE-001-v0.1.md`](../baselines/ALPHA-BASELINE-001-v0.1.md)

## Summary

Implemented the approved text-only tuning batch from observed PBI 1/PBI 2 friction. The `/plan` guidance now asks for a bounded dependency/style/browser/harness preflight when custom browser validation is planned. `/implement` now checks validation readiness, distinguishes environment/build startup failures from acceptance failures, and specifies test-only diagnostics and temporary-output cleanup. The result template now separates delivery and coordinator session windows and records test attempts, environment setup, cleanup, usage, and time-window caveats.

This is a prompt/process change only. It has **not yet been exercised on a new delivery PBI**, so any reduction in retries, cost, or user interruptions remains unverified.

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

## Interpretation and limits

The change directly reflects measured issues: missing Playwright/Sass prerequisites, harness bootstrap failures, generated `/tmp` bundle cleanup, and temporary diagnostic instrumentation reaching production source. It does not add a dependency installer, a Herdr integration, automatic telemetry, or changes to scope/knowledge/write gates.

The best next validation is to apply this workflow to the next bounded, user-approved delivery task and compare the resulting preflight completeness, test-attempt categories, cleanup state, and coordinator/delivery metrics with baseline v0.1. Avoid treating the two historical PBI runs as a control group.
