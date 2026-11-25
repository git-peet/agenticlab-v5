# C03 / C03.1 exp4-to-clean-payload audit inventory

**Status:** Updated against clean-payload `main` at `119705d` (working tree clean, seven commits ahead of `origin/main`; not pushed). The approved generic slices selected so far are committed locally. This inventory describes completion under that selected scope—not full feature parity with exp4. The audit note itself is a local, untracked file in AgenticLab-v5, not part of the clean payload.

**Purpose:** Compare the current exp4 AgenticLab prototype with the generic, uninitialized clean payload; identify which differences are reusable, which belong only to calibration, and where an approved change would land before or after workspace initialization.

## Executive summary

The exp4/clean-payload comparison is not a simple directory diff. Exp4 is an initialized, active delivery workspace; the clean payload is a generic distribution copied into a consumer workspace and then rendered through an initialization flow. A difference may belong in runtime payload code, a prompt, the payload-to-workspace initialization procedure, project-local configuration, development-only tests, or nowhere in the clean payload.

The main conclusions so far:

1. **Do not port the exp4 C03 evaluation-card machinery as a generic feature.** `C03-EVAL-ID`, the PBI10 marker behavior, the exp4 evaluation report path/card format, and the PBI10 implementation record are experiment-specific. They should remain in exp4 unless a separate, generic evaluation feature is proposed and approved.
2. **The clean payload already has metrics, and both policy defaults are on.** It has knowledge-capture metrics and the C03 thin-slice context metrics (`context_source_used`, `context_stop_rule_triggered`, `context_assembly_complete`) behind the workspace policy. The template sets `metricsEnabled: true` and `pendingStagingEnabled: true`, as decided by the user. Initialization itself emits no metrics; the initialized workspace policy controls subsequent runtime use.
3. **The selected generic slices are committed locally:** A8 metric hardening; prompt-only context selection; filtered-only duplicate-check clarification; metric vocabulary/schema alignment; bounded initialization scope and validation guidance; staging/workflow completion changes; and the final initialization/validation handoff simplification. See the seven-commit list below. They add no exp4 selector, evaluation card, or new metric event.
4. **Do not port the exp4 selector, workflow guard, or PBI10 preflight wholesale.** The selector is now a candidate to assess for generic prompt/runtime fit; the workflow guard still needs C04 risk review; the PBI10 preflight remains experiment-specific and hardcodes a C03 report path. Each needs its own value, portability, and safety decision.
5. **Initialization-generated state must be handled through initialization, not copied from exp4.** Project identity, policy values, `.pi` wiring, overview, scope, and navigation files belong to the consumer workspace. Runtime metrics/checkpoints/evaluation artifacts are not payload seed data.
6. Use a temporary sandbox and regression layer for remaining proposed ports. Apply candidate changes to a disposable clean-payload copy, validate there, review the diff, and only then consider the actual clean payload.

## Comparison baseline and constraints

- **exp4:** `/home/peet/Projects/exp4`, current revision `48c6295`; the tracked C03/PBI10 commits are pushed. Two local `untitled` scratch files are not part of the source comparison.
- **Clean payload:** `/home/peet/Projects/C03-clean-payload`, comparison baseline `0922e93`; current `main` is `119705d`, seven commits ahead of `origin/main`, with a clean working tree.
- The seven local commits, all not pushed, are:
  - `bcd80d7` — validate content-free context metrics.
  - `2e5c1b0` — clarify prompt-driven context selection.
  - `4f71221` — clarify filtered handoff duplicate checks.
  - `9a4c671` — align context metric vocabulary/schema.
  - `0dd5b7a` — bound initialization scope and validation guidance.
  - `ed6ecea` — streamline knowledge capture/completion and enable staging by default.
  - `119705d` — simplify initialization and validation handoff.
- The clean payload's `README.md` says adapter development tests are not part of the installed runtime payload; the `adapters/pi/tests/` area is for development/port validation. No exp4 selector, evaluation, guard, or preflight mechanism has been ported.

### Porting constraints

- Keep the payload project-agnostic: no exp4 paths, project/PBI identifiers, report names, metrics history, or FastAPI project assumptions.
- Preserve the distinction between distributable payload files and consumer-workspace outputs created by initialization.
- Keep experiment-only evaluation instrumentation out of runtime defaults unless a separate product need is established.
- Tests and metrics are evidence about specific behaviors; they do not alone establish general context-engineering or governance value.
- Other inventory recommendations remain proposals. The selected slices are committed locally; no push is authorized.

## Inventory: exp4 differences and provisional disposition

| ID | Difference / exp4 surface | Clean-payload baseline | Provisional disposition | Potential landing point and prerequisites |
|---|---|---|---|---|
| A1 | **C03 evaluation marker and card** — `C03-EVAL-ID` propagation in exp4 `/plan`, checkpoint and `/implement`; one sanitized card in `EXP4-C03-CONTEXT-POLICY-001.md` | No C03 marker/card workflow or evaluation report found in the clean payload | **Do not port as-is.** It is opt-in research instrumentation tied to an exp4 report and prototype run IDs. | None for the current port. If future generic evaluations are desired, design a separate user-opt-in evaluation interface and configurable destination; do not reuse exp4 identifiers or report paths.
| A2 | **PBI10 preflight module** — `AgenticLab/adapters/pi/plan-preflight.mjs`; checks structured plan fields, paths, limited command forms, open decisions, and exp4 marker/card scope | No preflight module/tool. Clean `/plan` uses prompt-level planning and validation guidance. | **Defer pending value and contract review.** Do not port the module unchanged: it hardcodes the exp4 evaluation-card target and C03 marker semantics, supports only a limited set of command forms, and depends on the model assembling structured inputs. The tool's live invocation before final plan presentation was not observed in exp4. | If later justified, first separate project-agnostic checks from evaluation logic; define command/path-verification contract against arbitrary consumer workspaces; test supported and unsupported project layouts; add optional Pi registration and prompt wiring only after runtime integration is verified.
| A3 | **Pi delivery context guard** — `context-policy-gate.mjs` tracks `/plan` and `/implement`, allows `ls`/`find` during `/plan`, blocks other shell there, blocks direct reads of knowledge records/pending data during both workflows, registers `/plan-cancel` | No separate context-policy gate. Existing `knowledge-write-gate.mjs`/`.ts` already mediates knowledge paths, configured knowledge-read triggers, pending access, policy changes, and writes. | **Do not port wholesale; assess under C04 first.** This code is Pi-specific and bundles multiple policies. Its knowledge-read behavior overlaps existing gate responsibilities; shell command matching is a narrow heuristic, not a general sandbox. The shell boundary fixed exp4 friction, but that alone does not prove this is the right generic control. | If a concrete general need is found, define allowed/blocked/stop behavior and bypass/failure cases, then integrate with—not duplicate—the existing write/read gate. Keep host-specific logic in the adapter. Add benign and adversarial tests before enabling it in initialized workspaces.
| A4 | **Read-only listing during `/plan`** and accurate reporting of no tests/mutations | Clean planning instructions prohibit command execution and have no matching listing exception | **Candidate, not an automatic port.** It may reduce discovery friction, but the exception must be explicit and consistent across guard, prompt, and output report. The exp4 prompt was corrected so permitted `ls`/`find` listings are reported separately. | If adopted, state the precise Pi-only exception in the delivery prompt and guard; do not imply arbitrary shell is read-only. Test both listing and shell-operator/dangerous cases. Reassess against C04 action-boundary work.
| A5 | **Raw knowledge-read blocking during delivery workflows** | Clean adapter already enforces knowledge-read triggers, protects pending/policy access, and instructs retrieval through `readKnowledgeRecords`; not an identical workflow-wide read ban | **Compare/merge only if a demonstrated bypass remains.** Avoid a second overlapping hook. | First map `classifyKnowledgeReadTrigger`, `classifyPendingAccess`, shell restrictions, and workflow requirements. If there is a gap, add the narrow rule to the existing gate or a clearly separated adapter policy, with tests for active index/maps, record reads, pending queue, retrieval tools, and non-workflow use.
| A6 | **C03 context-source selection policy** — exp4 `context-source-policy.mjs` defines nine source layers, seven workload families, and explicit boolean signals; Pi tool records selection | No equivalent policy selector. Clean prompts call the context metric tool but do not run this selector. | **Assess as a candidate; do not exclude by assumption or port wholesale.** It appears bounded and may provide a clear source vocabulary, but has not shown delivery-efficiency benefit and adds an explicit selector call to workflows. Check what can be expressed simply in prompts versus what benefits from deterministic mapping, and whether the call adds friction. | First compare the exp4 selector's workload/signals with C03's source table and clean prompts. Prototype the minimal selector/prompt wiring in the disposable sandbox; test policy branches and tool wiring without exp4 names. Then decide whether to evaluate it in a real exp4 product task. Do not bundle in the guard, eval card, or preflight.
| A7 | **New `context_source_selected` metric** emitted by the selector before actual source use | Not present in clean; clean records source use and assembly/stop events | **Keep exp4/prototype-only for now.** It measures policy selection as a separate experiment dimension; no current general product requirement established. | No clean-payload change unless a named evaluation decision needs this signal. If considered later, make it privacy-minimized and gated by the existing workspace metrics policy.
| A8 | **Context metric hardening and result correctness** — exp4 validates context event fields, source IDs and assembly outcomes against allowlists and deduplicates sources. Baseline clean probing also found that successful `recordContextSelectionMetric` calls return `undefined` although the registered tool dereferences `result.recorded` (tool call errors after writing events), and that the tool drops an explicit `stopRuleFired: false` | Clean had the same context metric writer family but accepted arbitrary source/outcome strings within length bounds | **Applied and committed locally as `bcd80d7`; not pushed.** Preserves current event names/call shape, suppresses invalid metrics without errors or persisted rejected values, reports recorded/disabled status, and preserves false. | Changes are limited to `adapters/pi/knowledge-capture-metrics.mjs` and the existing tool path in `knowledge-capture-tools.mjs`; six external port-validation tests pass. No new events, selectors, evaluation markers, or prompts. Metrics remain enabled by default.
| A9 | **Stop-rule event naming/semantics** — exp4 changes `context_stop_rule_triggered` to `context_stop_rule_evaluated` so both `true` and `false` represent an evaluation | Clean uses `context_stop_rule_triggered` while the payload includes a boolean value | **Do not silently rename the generic event.** Decide whether event history/schema compatibility matters and whether recording false under “triggered” is misleading. | If changed, document compatibility/migration expectations or adopt a versioned/new event name. Include tests and update both plan/implement prompts and metric docs in one reviewed change.
| A10 | **`filtered` retrieval clarification** — exp4 plan says a filtered result with zero active matches can satisfy handoff-duplicate checking without waiting for `no_match` | Clean knowledge contract and prompts distinguish `filtered` from complete `no_match`; there was no specific handoff-duplicate note | **Applied and committed locally as `4f71221`; not pushed.** The task-specific rule preserves the no-match boundary and guards against truncated/ambiguous reasons. | Six sandbox tests verified complete filtered-only results, wrong-scope/status reasons, incomplete/unavailable outcomes, and truncation (`filteredCount` greater than returned reasons). The clause requires complete `filtered`, count zero, all filtered candidates represented, and reasons matching the exact duplicate-check scope/status/category. No adapter, metrics, or evaluator change.
| A11 | **Validation-target discovery prompt** — exp4 directs relevant project configuration/test-target verification and permits bounded listings; the latest exp4 cleanup avoids inspecting unrelated AgenticLab tests for application PBIs | Clean already tells planners to inspect proportionately and verify tests/commands; it has no hardcoded test path in the clean prompt | **No direct port required yet.** Preserve the general principle of verifying the relevant project's runner/targets; avoid a redundant unconditional instruction or project-specific paths. | If real runs show repeat friction, make a minimal generic prompt edit: inspect the relevant project manifest/config and target, not all directories. No selector or telemetry needed to implement this guidance.
| A12 | **C03 evaluation instructions in `/implement`** — append one card after validation and approval gates; read only approved in-session metrics/results, never raw metrics JSONL | Clean implement prompt reports normal metrics and knowledge outcomes but has no evaluation-card procedure | **Do not port.** The card is a temporary C03 calibration artifact and exp4 destination/marker is specific. | None. Keep existing generic content-free metric reporting only if separately judged useful; do not add a permanent card protocol by default.
| A13 | **Exp4 tests** — context-source selector tests, retrieval-policy tests, guard/preflight tests; total exp4 adapter suite 27/27 at last run | Clean payload has a development smoke test, not a complete runtime test suite; README says development tests are separate from installed payload. Its current `c03-smoke-test.mjs` hardcodes the clean-payload absolute path and `/tmp/c03-test`, so it is not relocatable as written. | **Port only regression tests for mechanisms explicitly approved for carry.** Do not add synthetic PBI stages or ship experiment-only tests as runtime project data. | Use the external/temporary test harness for clean-payload validation. If reusing the smoke test, make paths fixture/workspace-relative and parameterizable; keep test files out of installed workspaces unless the payload distribution contract changes.
| A14 | **Exp4-only PBI, result, log, metrics data** — PBI10 implementation notes/marker, implementation logs, C03 report/cards, live exp4 metrics | These are absent from clean by design | **Never port.** They are project/task/run evidence, not generic system mechanisms. | Keep in exp4 or AgenticLab-v5 research history as appropriate; do not copy them into clean payload or its initializer.

## Existing clean-payload metrics inventory

The clean payload currently has two event families sharing one writer and one `metricsEnabled` setting:

1. **Knowledge-capture/lifecycle events:** `candidate_staged`, `candidate_rejected`, `decision_knowledge`, `retrieval_success`, `no_match`. These are emitted by knowledge-capture tools for retrieval and lifecycle outcomes.
2. **Context-assembly events from the C03 thin slice:** `context_source_used`, `context_stop_rule_triggered`, `context_assembly_complete`. Prompts request these during `/plan` and `/implement`; the adapter exposes `recordContextSelectionMetric`.

Baseline tool probing confirmed two correctness issues: a normal registered context-metric tool call wrote its events and then threw a `TypeError` because the helper returned `undefined`; and `stopRuleFired: false` was rewritten to `null`, so no stop-rule event was recorded for the false case. Both were fixed in local commit `bcd80d7`.

The generic payload still does not contain exp4's `context_source_selected`, workload/source-selector module, `C03-EVAL-ID`, or card-append workflow. The committed A8 change strengthens source/outcome validation for the existing context events without adding any of those mechanisms. That safety hardening remains a separate question from whether to retain the context metrics themselves.

### Metric-hardening validation (sandbox first; approved local port applied)

A disposable copy at `/tmp/c03-metric-hardening-9xxgfvcg` was used to develop and test the hardening before applying the approved narrow change to the actual clean payload. The external test harness was then pointed directly at the updated clean-payload modules.

- Reproduced baseline bug: a valid registered `recordContextSelectionMetric` call writes metric rows, then throws `TypeError: Cannot read properties of undefined (reading 'recorded')`; the helper returned no result although the Pi tool reads `result.recorded`.
- Reproduced stop-rule bug: `stopRuleFired: false` is converted to `null` in the Pi tool, so the `context_stop_rule_triggered` event is omitted for the false case.
- Prototype behavior: keeps the existing event names and tool call; uses a generic allowlist; invalid source/outcome/extra-field inputs are dropped with a content-free status and no error or persisted payload; deduplicates source IDs; returns accurate recorded/disabled status; preserves explicit false.
- Validation: 6 external port-validation tests passed against the actual clean-payload modules for all source/outcome values, invalid-value suppression, direct writer enforcement, disabled-metrics behavior, lifecycle-event preservation, and tool result/status. No initialization flow or live Pi smoke was run.
- Scope remained narrow: no new event, prompt, tool call, evaluation card, selector, or initialization artifact was added.

The A8 change is committed locally in `bcd80d7`; it has not been pushed.

### A8 metric-vocabulary integration follow-up (sandbox-tested; committed locally)

A later fresh `/implement` run called the hardened metric tool using these source labels: `plan-checkpoint`, `project-instructions`, `project-scope`, `project-overview`, `knowledge-index`, and `knowledge-adapter`; the outcome was `context-ready-for-source-verification`. The validator rejected the event as `invalid-context-metric` and persisted nothing. The labels describe files/tools rather than the canonical source-layer IDs, and the outcome is free-form. This exposes a contract gap between prompt-generated values and the strict A8 allowlist, not a reason to weaken the content-free boundary.

An approved disposable prototype at `/tmp/c03-metric-vocab-fatp2ksg`:
- adds `project_scope` as a distinct canonical source ID, preserving the difference between workspace scope, operating instructions, and technical orientation;
- exports the source/outcome enums to the existing Pi tool schema using `StringEnum`;
- gives the tool a concise mapping from common file/tool names to semantic source IDs (`plan-checkpoint` → `approved_plan`, project instructions → `operating_instructions`, project overview → `project_orientation`, knowledge index/records → `project_knowledge`, adapter code → `current_source` only when materially used); and
- uses `complete` for a completed context assembly instead of free-form wording.

Combined A8 and vocabulary regression tests passed 13/13 in the sandbox, including canonical source/schema validation, invalid-value suppression, false-stop recording, and unchanged lifecycle events. This follow-up was subsequently applied to the clean payload in `9a4c671`; the enum and prompt/tool mapping are therefore no longer pending. The test harness remains external to the installed runtime payload, and the commit has not been pushed.

### Metrics default and initialization boundary

- User decision: metrics and candidate staging are **enabled by default**; candidate staging leaves eligible candidates inactive, and promotion requires separate confirmation.
- `config/knowledge-capture-policy.template.json` currently has `metricsEnabled: true` and `pendingStagingEnabled: true`.
- `README.md` and initialization guidance describe both defaults as enabled. The default/policy and workflow changes are in `ed6ecea`; the subsequent initialization refinements are in `0dd5b7a` and `119705d`.
- Initialization itself is read-only and must not emit metrics. After approval of the initialization preview, it creates a workspace policy from the template using the confirmed project identity. The user may explicitly opt out of either setting. Existing policy files remain preserved subject to scope/conflict checks.
- `.pi/metrics/agenticlab.jsonl` is a runtime-created output, not a seed file or initialization artifact. Do not copy exp4's metrics log or evaluation cards into a new project.

**Open review question:** whether both event families should continue sharing one opt-out switch, or whether any future change should separate context-experiment instrumentation from knowledge lifecycle outcomes. No change is selected here.

### Prompt-only context selection versus selector tool

The clean payload already prompts the agent to retain the user request and operating rules, retrieve project knowledge when relevant, inspect current source as needed, and stop when sufficient. Exp4's `selectContextSources` adds a deterministic mapping from a workload name plus explicit boolean signals to source-layer IDs. It **does not infer** those signals: the model still decides whether knowledge, a domain perspective, or an orientation source is relevant. Its potential value is a stable vocabulary and consistent mapping/measurement; its costs are an extra workflow tool call and maintaining another prompt/tool contract.

There is no strong reason to exclude the selector from consideration. A sandbox comparison was run at `/tmp/c03-context-approach-otasdqtg`:

- **Prompt-only variant:** adds a concise source-inclusion rubric to `/plan` and `/implement`; no new tool/module or additional tool call. It makes optional source layers and workflow-state boundaries explicit in prose.
- **Selector-assisted variant:** adds the exp4 pure selector and one `selectContextSources` call per explicit `/plan` and `/implement`. It emits no selection metric and makes no user prompt/approval. The selector returns source-layer IDs from model-supplied relevance signals; it does not infer relevance.
- **Size/overhead:** the prompt-only edits add about 894 bytes across the two prompts. Selector-assisted edits add about 1,167 prompt bytes, plus a 2.5 KB policy module and tool registration, and one extra tool call per workflow. It standardizes returned IDs and conditional mapping but still relies on the model for the underlying decisions.
- **Validation:** 5 sandbox tests passed for prompt variant distinction, selector mapping, workflow/checkpoint gating, tool registration, and absence of metrics writes. No live Pi or model behavior was tested.

**Provisional preference:** prompt-only is the more elegant starting point because it covers the source layers with less runtime machinery and no extra tool call. It is applied locally in commit `2e5c1b0` (not pushed). The selector remains a reasonable follow-up if real tasks show inconsistent source selection or a need for machine-readable selection output. Do not exclude it permanently or make it mandatory without evidence.

### Filtered-only handoff duplicate check (sandbox-validated; committed locally)

A disposable copy at `/tmp/c03-filtered-clarification-yxwoxd03` tested a narrowly scoped prompt clause against the clean adapter's actual `readKnowledge` result shapes. Six tests passed: complete filtered-only results include filter reasons without record claim bodies; complete `no_match` remains distinct; incomplete/unavailable results remain blockers; out-of-project candidates carry an explicit reason; and capped filter summaries are detected (`filteredCount` exceeds the returned list length). The tested clause was applied to `prompts/delivery/plan.md` and committed locally in `4f71221` (not pushed); the clean file matches the sandbox variant.

The tested wording is:

> **Filtered-only handoff duplicate check:** When checking a task-local handoff for duplicates, treat a result as clear only if `status` is `filtered`, `complete` is `true`, `count` is `0`, every filtered candidate is represented (`filteredCount` equals the returned `filtered` list length), and the reasons establish that all candidates are ineligible under the exact scope/status/category checked. Then conclude only that no eligible active match was returned for this duplicate check. Do not label it `no_match` or infer absence outside the check. If retrieval is incomplete/unavailable, reasons are truncated or ambiguous, or the filters do not match the check, report uncertainty; do not mark the handoff clear.

The cap check matters: a `filtered` summary may show only the first 20 reasons while `filteredCount` is larger, so the agent cannot assume the returned list explains every excluded candidate. This is a prompt-only clarification for the task-local handoff duplicate check; it changes no retrieval status, metrics, or adapter behavior. It is committed locally in the clean payload; further refinement remains subject to review.

## Pre-initialization vs post-initialization landing map

| Change type | Clean payload landing point if approved | Initialization/workspace consequence |
|---|---|---|
| Generic adapter logic | `adapters/pi/*.mjs` and extension composition in `knowledge-write-gate.ts` | Copied into each future initialized workspace as executable project-local extension code. Must be project-root relative, avoid exp4 assumptions, and have explicit host limitations. |
| Generic workflow semantics | `prompts/delivery/plan.md`, `implement.md`, or `brain/` contracts | Copied as generic instructions. Do not add exp4 IDs, result paths, PBI wording, or fixed project test paths. |
| Configurable behavior | Policy template and its parser/schema | Initialization must render the correct generic default and preview it. Workspace-local values must derive from confirmed project identity or explicit user choices, never exp4 config. |
| Initialization-only behavior | `prompts/system/initialize-workspace.md` and generic setup templates | Add only if a new workspace-owned artifact/value must be created. Keep it in the full preview/approval/write/check path. Do not copy exp4's generated scope, overview, `.pi` files, or populated knowledge. |
| Runtime artifacts | None in generic payload | Metrics logs, plan checkpoints, evaluation cards, implementation logs, and project knowledge are generated/owned by the consuming workspace after initialization; never seed from exp4. |
| Development validation | External port-validation test layer / temporary workspace | Do not add synthetic project/PBI state to runtime payload. Tests must use disposable fixtures and clean up. |

## Recommended temporary-sandbox validation process

The earlier C02 port work used disposable temporary copies/QA areas (for example the prior `c02-clean-payload-qa` and `c02-clean-payload-candidate` work areas). The same separation is appropriate here; treat these as validation sandboxes, not as the destination or authority.

For any change approved for a port:

1. Record the exact clean-payload baseline revision and verify the real clean-payload tree is clean apart from explicitly approved edits.
2. Create a disposable copy/worktree under a unique `/tmp` directory from the approved clean baseline. Keep project fixtures separate from the payload source.
3. Apply only the agreed inventory rows. No exp4 data, generated workspace config, PBI content, metrics logs, or evaluation cards enter the sandbox.
4. Add/run regression tests in the port-validation layer, using temporary workspace fixtures for pre-init and post-init states. Cover valid/invalid inputs, allowed/denied behavior, metrics enabled and disabled, initialization preservation, and failure/unavailable adapter cases as applicable.
5. Inspect the sandbox diff for hardcoded paths, project names, PBI/marker IDs, accidental data, and files that belong only in generated workspaces. Run test suite and `git diff --check`; run a live Pi smoke only if the agreed slice requires runtime integration.
6. Present test results, diff inventory, and remaining limitations for review. Only after explicit approval should remaining selected changes be applied to the actual clean payload. The approved A8 and metric-vocabulary changes are applied and committed locally; this does not authorize a push.

The clean payload README says its runtime payload omits the adapter development test suite. Keep the sandbox/regression layer outside files intended to be copied into consuming workspaces, unless the payload's distribution contract is separately changed.

## Decisions still needed in joint review

1. Do any intentionally deferred rows merit a future clean-payload port? Current candidates are the deterministic context selector, the C04 workflow/shell guard, and project-agnostic plan preflight; none is required to complete the currently selected scope.
2. Keep the selector deferred unless real delivery work demonstrates inconsistent source selection or a need for structured machine-readable output; prompt-only guidance is the current lower-friction choice.
3. Keep the workflow/shell guard under C04 review until its threat model, overlap with existing gates, and bypass/failure behavior are clear.
4. Keep PBI10 preflight deferred unless a general product need is demonstrated and its project-specific evaluation logic is separated.
5. No additional initialization setting is currently needed: staging and metrics default on, with explicit opt-out; staging is inactive until separately confirmed for promotion.

The clean-payload branch is ready for a push decision as an experimental baseline under this disposition. The inventory note should be kept in sync, but it is not part of the clean-payload branch.

## Decision boundary

**Current disposition:** The selected generic slices are committed locally in `bcd80d7`, `2e5c1b0`, `4f71221`, `9a4c671`, `0dd5b7a`, `ed6ecea`, and `119705d`. The clean-payload working tree is clean and seven commits ahead of `origin/main`; nothing has been pushed. This is complete for the selected port scope, not full exp4 feature parity. Keep exp4 evaluation/card plumbing and PBI10-specific artifacts out; leave the selector and extra selection metric deferred, the guard to C04 review, and preflight deferred pending a generic need.

A push still requires explicit user authorization and would publish all seven commits. Other proposed mechanisms remain unapproved until their scope and evidence are reviewed together.
