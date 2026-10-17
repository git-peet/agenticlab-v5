# ALPHA-TUNE-001 — Test-readiness and evidence-capture tuning

- **Status:** Completed; post-change behavior validation deferred to the next delivery run
- **Prepared:** 2026-10-17
- **Baseline:** [`../baselines/ALPHA-BASELINE-001-v0.1.md`](../baselines/ALPHA-BASELINE-001-v0.1.md)
**Evidence inputs:** [`../checkpoints/ALPHA-20261016-TWO-PBI-CHECKPOINT.md`](../checkpoints/ALPHA-20261016-TWO-PBI-CHECKPOINT.md), PBI 1/2 results, and the session metrics under `evaluation/metrics/`.

## Question

Can a small, text-only update to planning, implementation, and result-capture guidance make validation readiness more explicit, reduce avoidable harness/environment retries, and retain useful metrics without weakening approval boundaries or adding automatic telemetry?

This is a process/prompt tuning task. It is not a new Evershop PBI or a comparative effectiveness trial. The actual effect must be observed on a later separately scoped run.

## Observations motivating the batch

- Both PBI runs encountered dependency or harness setup failures. PBI 2's Sass/style requirement was discovered only after the fixture implementation attempted to compile its styles.
- PBI 2's static test server left generated bundle directories in `/tmp`; these were removed manually after the final test.
- Diagnostic attributes and handler/ref assertions briefly entered production/test code before a cleanup pass restored behavior-focused final assertions.
- The new metrics capture separates delivery Pi and coordinator windows, but run results need a consistent compact record of test attempts, dependency setup, cleanup, session role, and window semantics.

## Authorized scope

Update only:

- `system/prompts/delivery/plan.md`
- `system/prompts/delivery/implement.md`
- `evaluation/templates/run-result.md`
- `evaluation/README.md` (link this plan/result)
- this plan and a result record after static validation

Do not modify EverShop source, the `V5-alpha-sandbox` workspace, generated payload copies, global Pi settings/extensions, Herdr integration, package files, or any automatic metrics collector. Do not run the EverShop app, database, full test suites, or install dependencies.

## Intended changes

1. **Plan readiness:** When a custom/browser harness is part of validation, require a bounded preflight of relevant real imports and style assets (including CSS/SCSS/Sass), local runner and browser, mocks versus real behavior-critical libraries, generated-output location/cleanup, and the exact planned test command. Mark unknown/unavailable items; no install is implied.
2. **Implementation discipline:** Recheck the approved validation prerequisites before edits when that validation is an acceptance gate. Classify failures as environment/preflight, build/server/fixture startup, or acceptance assertion. Diagnose the evidenced layer before changing product source. Keep diagnostics test-only and temporary; preserve behavior assertions, clean generated artifacts, and follow the plan's bounded remediation/approval limit. No `npx`, browser download, or dependency install without separate approval.
3. **Result capture:** Extend the manual result template to distinguish delivery-agent and coordinator sessions, explicit run-window boundaries, test-command attempts versus test-case outcomes, dependency setup, temporary-output cleanup, Pi usage/cost/tool aggregates, and elapsed window versus active/hands-on time. Keep raw transcript/session IDs out of canonical result reports and mark unavailable values honestly.

## Acceptance checks

- The plan and implement prompts distinguish environment/build failures from behavioral failures and do not authorize implicit installs or unbounded retry loops.
- The prompts instruct harness cleanup and removal of temporary diagnostics before final verification without weakening accepted behavior.
- The run-result template records the above measures with units, provenance, and caveats; it explicitly states that tool error flags are not test-failure counts and window spans are not active time.
- `evaluation/README.md` links the plan/result and keeps the frozen descriptive baseline unchanged.
- Static review and `git diff --check` pass. No EverShop app or test is run for this prompt-only tuning.

## Limitations and follow-up

This change only improves the written workflow. It does not prove fewer retries, lower cost, or better delivery. The next comparable, user-approved delivery run should use the updated instructions and the same metrics definitions. Keep baseline v0.1 frozen; record later evidence separately before proposing a new baseline version.
