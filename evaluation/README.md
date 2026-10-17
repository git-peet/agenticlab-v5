# V5.2 Evaluation Records

This directory is the **canonical development-plane home** for V5.2 evaluation plans and interpreted results. It is not part of the droppable `system/` payload and does not collect data by itself.

## Data flow

1. Write and review a bounded preregistration here before a run. Assign a stable run ID and state the question, workspace scope, source/runtime versions, acceptance checks, measures, and data boundary.
2. Run the selected task in the delivery workspace. The Alpha payload has no metrics collector. For the current first-use smoke, use the Pi session's native tool/usage history when available and manually record user-visible events such as approvals or corrections.
3. Keep raw Pi session history and project/source content in their original local workspace/session location. Do not copy raw transcripts, tool-result bodies, secrets, or project files into this repository.
4. Create the privacy-minimized result from [`templates/run-result.md`](templates/run-result.md). Copy only the reviewed summary and necessary evidence into `evaluation/results/`; mark unavailable measures as `unavailable`, not zero.
5. Interpret the result against the preregistered question and record a decision, limitation, and revisit trigger. A readiness smoke is not a benefit comparison; one run does not establish general reliability.

## Evidence conventions

- Separate observed behavior, derived measurements, interpretation, and decision.
- Keep delivery-agent and coordinator session metrics separate; include only reviewed run windows and label mixed windows instead of attributing them to a PBI.
- Distinguish command attempts from individual test cases, tool-result error flags from test failures, and elapsed window span from active/hands-on time.
- Keep the run's actual payload commit, Pi version, model/provider (if available), mode/tool set, and relevant settings with its result. Do not combine results across different conditions or versions without labeling the difference.
- Capture only measures that inform the preregistered question: acceptance/safety outcomes, relevant tool calls and scope, user interruptions/corrections, and available token/cost/time data.
- Inspect only the exact Pi session associated with the run. Do not inventory or mine unrelated session history. Raw session data may contain project/user content.
- Do not add always-on instrumentation, external upload, a metrics database, or payload changes as part of this initial process. Automate collection only if manual capture proves unreliable or costly and a new bounded scope is approved.

## Current first run

- Preregistration: [`plans/ALPHA-INIT-001.md`](plans/ALPHA-INIT-001.md)
- Run ID: `ALPHA-INIT-001`
- Purpose: first delivery-workspace setup/initialization readiness smoke, not a delivery-benefit claim.
- Status: completed as a bounded initialization/readiness smoke; the four approved setup files were written/read back, and a fresh Pi 1.2.0 startup plus read-only pointer/profile availability check passed. Orientation remains partial, and this run does not measure delivery benefit. Privacy-minimized worker/coordinator session aggregates are now recorded in [`metrics/ALPHA-20261016-PI-SESSION-METRICS.csv`](metrics/ALPHA-20261016-PI-SESSION-METRICS.csv). Package copies are local test builds, not clean published revisions.
- PBI 1 run: [`plans/ALPHA-PBI1-001.md`](plans/ALPHA-PBI1-001.md) was approved; [`results/ALPHA-PBI1-001.md`](results/ALPHA-PBI1-001.md) records implementation and validation. After two harness corrections, the isolated Playwright suite passed 6/6 using temporary dependencies. No application/PostgreSQL/full-suite testing occurred; backend persistence and full integration remain unverified.
- PBI 2 run: [`plans/ALPHA-PBI2-001.md`](plans/ALPHA-PBI2-001.md) and the [temporary test setup amendment](plans/ALPHA-PBI2-001-setup-amendment.md) are approved. The final isolated Playwright suite passes 4/4, including modal ArrowRight/ArrowLeft navigation with modal Slick `waitForAnimate: false`; diagnostic instrumentation was removed and the post-cleanup suite also passed 4/4. Full EverShop integration/backend remain untested. The temporary test environment and generated bundles were cleaned; Herdr was only an operational channel. See [`results/ALPHA-PBI2-001.md`](results/ALPHA-PBI2-001.md).
- Tuning batch: [`plans/ALPHA-TUNE-001.md`](plans/ALPHA-TUNE-001.md) and [`results/ALPHA-TUNE-001.md`](results/ALPHA-TUNE-001.md) record the approved test-readiness/evidence-capture prompt update. It is not yet validated on a later delivery PBI.
- Session checkpoint: [`checkpoints/ALPHA-20261016-TWO-PBI-CHECKPOINT.md`](checkpoints/ALPHA-20261016-TWO-PBI-CHECKPOINT.md) summarizes the initialization smoke, both PBI outcomes, evidence limits, and candidate first tuning themes. It makes no comparative-benefit claim.
- Session metrics: [`metrics/README.md`](metrics/README.md) defines the privacy-minimized extraction; [`metrics/ALPHA-20261016-PI-SESSION-METRICS.csv`](metrics/ALPHA-20261016-PI-SESSION-METRICS.csv) and [`metrics/ALPHA-20261016-TOOL-ROUNDTRIPS.csv`](metrics/ALPHA-20261016-TOOL-ROUNDTRIPS.csv) hold structured aggregates, with coordinator windows separated from delivery-Pi metrics.
- Initial descriptive baseline: [`baselines/ALPHA-BASELINE-001-v0.1.md`](baselines/ALPHA-BASELINE-001-v0.1.md) is a frozen snapshot of initialization plus the two PBIs; it is not a comparative or validated performance claim.
