# C03 Context-Engineering Measurement Plan

**Status:** Bounded experimental v0 implemented and validated in synthetic/live scenarios. Retrieval-first context assembly, path-to-scope filtering, and ephemeral task handoff pass the adapter suite and scoped source runs. A user-invoked PBI1 `/plan`→`/implement` workflow has now run, but the sub-session made zero `assembleContext` calls and emitted no PBI1-specific C03 metric; the isolated Playwright acceptance suite did not run. Therefore this PBI1 workflow is not evidence that C03 context assembly improved or supported a real PBI implementation.
**Workspace:** `/home/peet/Projects/c03-experimental-phase/`
**Purpose:** Calibrate C03 context assembly in the disposable experimental workspace using an iterative measure → inspect → adjust → rerun loop, as in C02.

## 1. Boundary and principle

C03 excludes **always-on or permanent runtime retrieval telemetry**. That does not exclude temporary, local, experiment-only instrumentation used to calibrate the prototype. Any such instrumentation remains in this experimental workspace and is not ported to canonical `system/` or the installed payload without separate review and approval.

**Experimental-first implementation boundary (approved):** All C03 metrics and context-assembly implementation, calibration, and adjustments happen only in `/home/peet/Projects/c03-experimental-phase/`. Do not change canonical `AgenticLab-v5/system/` or the installed payload during prototyping. Once implementation is complete and validated, review a proposed upstream port separately; no commit or push without explicit approval.

Initialization left metrics off. For this initial experimental slice, the user approved enabling the existing C02 logger locally with `metricsEnabled: true` and `pendingStagingEnabled: false`; its output remains confined to `.pi/metrics/agenticlab.jsonl`. C03-specific experiment logging will be implemented and calibrated only in this workspace. This setting does not authorize pending knowledge staging or any canonical/payload change.

- Keep instrumentation opt-in and confined to the C03 experimental workspace.
- Record only metadata needed for named evaluation questions; never raw prompts, conversation transcripts, source excerpts, credentials, customer data, or unrestricted tool output.
- Do not impose a fixed context-token budget. Count tokens/calls only if they answer a specific evaluation question.
- At the end of calibration, decide explicitly whether experiment records are deleted or retained as reviewed evaluation evidence. Do not silently promote them into permanent runtime telemetry.

## 2. Existing C02 metrics: useful but incomplete

The copied adapter includes C02's local knowledge-capture metrics writer (`AgenticLab/adapters/pi/knowledge-capture-metrics.mjs`). Its allowlisted events include `candidate_staged`, `decision_knowledge`, `retrieval_success`, and `no_match`; records are content-free event names and timestamps in the local `.pi/metrics/agenticlab.jsonl` file. It can show whether C02 retrieval/capture events occurred, but it does **not** explain which context C03 selected, why something was filtered, whether assembly was sufficient, or whether context helped the task.

If enabled for the experiment, use this only as a C02 retrieval-activity baseline. C03 evaluation still needs task-level outcome observations and/or a separate experiment-only event record.

## 3. Evaluation questions

1. Did C03 include the smallest set of sources sufficient for the next decision/action, without enforcing a numeric token budget?
2. Did scope, status, and freshness checks include eligible material and reject wrong-scope, stale, or superseded material?
3. Were `no_match`, `filtered-only`, incomplete/unavailable storage, and genuine storage failure distinguished rather than collapsed into “empty”?
4. Was included context materially useful, unnecessary, missing, or misleading when checked against current authoritative sources?
5. Did the assembly stop when sufficient, or did it cause unnecessary retrieval/tool calls or user clarification?
6. Did the task outcome remain correct and within the approved scope compared with baseline behavior?

## 4. Minimal per-run scorecard

Use a stable synthetic scenario ID (not the raw prompt) and record:

- scenario ID, run ID, workload family, baseline/prototype version, and confirmed scope class;
- expected evidence/context categories, defined before the run;
- observed retrieval outcome: right-scope match, wrong-scope rejected, stale/superseded rejected, no match, filtered-only, incomplete/unavailable, or storage failure;
- selected source categories and stable record/source IDs where safe, plus exclusion reason codes (do not copy source bodies);
- sufficiency decision: sufficient/stop, ask a focused clarification, or retrieve more; note unnecessary extra retrieval when observed;
- post-run usefulness label: helpful, neutral/unnecessary, missing, or misleading, with a short evaluator rationale tied to source evidence;
- task outcome: pass/partial/fail against prewritten acceptance criteria;
- optional cost/friction measure only when tied to a question: retrieval/tool/model call count, token count, or user-visible clarification count.

Keep qualitative evaluator notes concise and source-referenced. Do not store user-authored prompt text or transcripts in the metrics record.

## 5. Initial scenario set (proposed v0)

Use two complementary sets. All controlled knowledge records are synthetic and live only in disposable test fixtures; do not mutate the workspace's active knowledge store.

### A. Controlled retrieval fixtures

| ID | Fixture | Expected outcome |
|---|---|---|
| R1 | Current, active record in requested scope; include a plausible irrelevant record | Select eligible record; exclude irrelevant record |
| R2 | Matching claim exists only in a different scope | Reject wrong-scope record; report wrong-scope/filtered outcome, not an eligible match |
| R3 | Stale/superseded record and current successor both exist | Exclude stale record; select current successor |
| R4 | Complete scan finds no matching record | Report complete `no_match` |
| R5 | Matches exist but all are ineligible (scope/status/freshness) | Report `filtered-only` with reason categories; never report complete no-match |
| R6 | Store cannot be read or scan is incomplete | Report `unavailable`/`incomplete`/storage failure distinctly; never report no-match |

These check outcome correctness and failure distinctions without mutating a live knowledge store.

### B. Representative work tasks

| ID | Workload | Expected measurement focus |
|---|---|---|
| W1 | Direct bounded question answerable from current source, with no relevant knowledge record | Avoid unnecessary knowledge/context loading; verify answer against current source |
| W2 | Research/exploration with one relevant scoped record plus current source evidence | Select the record only if useful; preserve research-only boundary and uncertainty |
| W3 | Explicit planning task with a relevant prior decision and current source surface | Assemble approved task state, scoped knowledge, and current source; do not implement |
| W4 | Approved implementation/resume fixture with a checkpoint and one changed source fact | Transfer only relevant approved state; detect stale checkpoint/source facts and verify current source |

For each task, freeze its scope, expected evidence, expected exclusions, stop condition, and acceptance rubric before baseline. Run the same scenario/source snapshot and rubric in baseline and prototype conditions. No EverShop app, database, test suite, or live knowledge-store operation is part of this first task set.

## 6. Proposed experiment record (v0; no raw content)

Use one record per scenario run in a separate local file, proposed path `.pi/metrics/c03-context-experiment.jsonl`. Keep the existing C02 event stream separate. The proposed C03 record contains only:

- `schemaVersion`, `runId`, `scenarioId`, `condition` (`baseline`/`prototype`), and `workloadFamily`;
- categorical `scopeOutcome` and `retrievalOutcome`;
- arrays of included source **types** and excluded reason **codes** (no source bodies, prompts, paths, or user-authored text);
- categorical `sufficiencyOutcome` (`stop`, `clarify`, `retrieve_more`) and `taskOutcome` (`pass`, `partial`, `fail`, `not_applicable`);
- optional numeric tool/model-call and token counts only when explicitly enabled for a named comparison.

Do not accept arbitrary metadata or free-text payloads in the runtime event writer. Record evaluator rationale in a separate reviewed scorecard, referring to scenario IDs and authoritative source evidence without copying source content.

## 7. Calibration loop and decision criteria

1. Freeze the scenario IDs, expected evidence, scope, and acceptance rubric.
2. Run a bounded baseline using the initialized C02 workspace behavior; record the scorecards and, only if explicitly enabled, C02 event counts.
3. Implement one bounded C03 prototype change at a time in this experimental workspace; record the change/version.
4. Rerun the same scenarios and compare misses, wrong-scope/stale leakage, unnecessary context/retrieval, sufficiency, task outcomes, and only the named cost measures.
5. Adjust organically when the observed failure/miss warrants it; preserve prior run results so changes can be compared.
6. Stop and review before any canonical/payload port or permanent telemetry decision.

Minimum safety/correctness gates:

- wrong-scope, stale, or superseded records are not presented as eligible context;
- filtered-only, incomplete, unavailable, and storage-failure results are not misreported as a complete no-match;
- material claims remain traceable to current authoritative evidence;
- the system stops or asks a focused question when evidence is insufficient, rather than fabricating sufficiency;
- context reduction is not considered a win if it increases missed evidence, misleading context, or task failure.

Small exploratory results are descriptive, not statistical proof of general benefit.

## 8. Decisions and operational status

- C02 metrics are enabled only in this experimental workspace via `AgenticLab/knowledge-capture-policy.json`; `pendingStagingEnabled` remains false. Revisit the metrics setting at the end of calibration.
- Baseline before C03 implementation: `node --test AgenticLab/adapters/pi/tests/*.test.mjs` passed 48/48 on 2026-10-24. After the initial slice, the same AgenticLab adapter suite passed 57/57. These are adapter tests only, not EverShop application tests or proof of C03 task quality.
- Initial local C03 slice: staged task-aware guidance in `AgenticLab/AGENTS.md`; added the C03 experiment writer and `recordC03ContextExperiment` tool; added synthetic tests. The fresh Pi process now exposes the tool through the existing `knowledge-write-gate.ts` extension; no separate extension was needed.
- First measured prototype result: W1 (direct question) was correct, stopped without source inspection/retrieval, and was recorded as `c03-v0-001` in `.pi/metrics/c03-context-experiment.jsonl`. No paired baseline W1 run exists yet; calibration remains incomplete.
- The C02 log has two `no_match` events from setup/design-topic knowledge lookups; these are not formal scenario results and must not be counted as baseline task outcomes.
- The experiment records stay local through calibration. Before closing or archiving the experiment, decide explicitly whether to retain or delete them.

**Current gate:** Generic helper and Pi tool integration are tested; live retrieval-first behavior is validated for W2/W3/W4 under the approved read-only `packages/evershop/src/**` boundary. Do not widen that source boundary or run application/host tests without separate approval. Continue within the experimental workspace; do not port upstream until implementation is complete, validated, and separately approved.

## 9. Post-calibration implementation checkpoint

- The finalized retrieval-first rule remains in `AgenticLab/AGENTS.md` step 5.
- `AgenticLab/adapters/pi/context-assembly.mjs` exports generic `assembleContext()`. It receives authorized retrieval callbacks, runs knowledge retrieval before current-source retrieval, selects only eligible in-scope active/current results, gates workflow prompts/checkpoints on explicit invocation, and returns per-source retrieval statuses plus a bounded assembled context. It performs no filesystem/network access and writes no metrics.
- `AgenticLab/adapters/pi/context-assembly-adapter.mjs` binds the generic helper to the actual `readKnowledge` adapter and a caller-supplied current-source retriever; workspace and expected-root must match. The adapter performs no source-file/network access itself.
- `AgenticLab/adapters/pi/context-assembly-tool.mjs` registers model-callable `assembleContext` through the existing Pi extension. It invokes `readKnowledgeRecords` first, then reads explicitly supplied current-source paths that pass `.pi/context-assembly-policy.json` root and symlink checks. It performs no C03 metric writes.
- `AgenticLab/adapters/pi/tests/context-assembly.test.mjs` and `context-assembly-tool.test.mjs` use synthetic inputs, temporary workspaces, the actual knowledge adapter/tool, and synthetic current-source files. They verify retrieval order, eligibility, workflow gating, failure distinctions, path restrictions, nested-tool composition, and no live C03 metric writes.
- **Metric correction:** `.pi/metrics/c03-context-experiment.jsonl` currently has 63 rows: 46 reviewed scenario outcomes, one stale-runtime diagnostic (`c03-v023`), and 16 invalid test-generated rows with run IDs beginning `c03-v011-prototype-`. The stale-runtime run occurred before Pi reloaded the scope update; the 16 stub rows are invalid. See `C03-METRIC-REVIEW.md`; do not count these 17 rows as current-code evidence.
- Current test result: `node --test AgenticLab/adapters/pi/tests/*.test.mjs` passes 92/92. This validates adapter logic, synthetic fixtures, prompt/checkpoint contract compatibility, and transient checkpoint lifecycle.
- Live source validation: W2/W3/W4 were run in the Pi session after bounded source-scope approval, first with the existing model-read flow (`c03-v014`–`c03-v016`), then through `assembleContext` (`c03-v017`–`c03-v019`). Discovery-first W2 (`c03-v020`) and W2 variations (`c03-v022`, `c03-v035`) passed; v035 selected only the app-context source and excluded the same-scope form file for a narrow navigation question. Child-scope W3 (`c03-v024`) and W4 handoff (`c03-v025`) passed; W3 v028 filtered a catalog sibling path before reading for checkout scope. D1 (`c03-v029`) showed source-level evidence but no runtime confirmation; D1 v036 verified complete knowledge/targeted-source no-match and triggered one focused clarification. T1 (`c03-v030`–`c03-v034`) remained bounded and did not support a repository-wide coverage claim. Twenty-one current-code live-source runs completed; `c03-v023` remains a stale-runtime diagnostic. See `C03-SOURCE-VALIDATION.md`.
- **Live integration:** The registered `assembleContext` tool was smoke-tested with approved paths, exercised for W2/W3/W4, and validated for a two-phase plan-to-resume handoff (`c03-v037`). Discovery-first W2 (`c03-v020`) confirmed the agent can call knowledge retrieval, perform targeted path discovery only under the allowed source root, then assemble with the discovered paths. The tool calls `readKnowledgeRecords` before reading explicitly supplied policy-approved paths, returns a source-bounded context, and writes no C03 metric; nested C02 knowledge calls emit normal retrieval events.
- **Task-local handoff:** `AgenticLab/AGENTS.md` and experimental `prompts/delivery/{plan,checkpoint,implement}.md` define the plan-to-implementation packet (`id`, `scope`, `candidate`/`verified` status, `evidenceRef`, concise content). `assembleContext` includes items only for an explicitly invoked/approved workflow, matching scope, and a selected evidence reference; stale, superseded, inactive, wrong-scope, uninvoked, or unsupported notes are excluded. Handoff remains in the existing transient checkpoint lifecycle and is never auto-written to durable knowledge. Synthetic and live W4 fixtures validate selection; a user-invoked `/plan`→`/implement` pair was not run.
- **Hierarchical scope:** `assembleContext` accepts a requested task scope only when it equals or descends from the configured workspace scope; C02 retrieval semantics filter sibling/out-of-workspace knowledge, and the same relation gates task-local handoff. `.pi/context-assembly-policy.json` maps module source paths to child scopes before file bodies are read. Synthetic checkout-vs-catalog fixtures and live child-scope W3/W4 runs pass; W3 v028 confirmed a catalog path was filtered before reading for checkout scope. Source inspection remains within the approved root; no broader source-root expansion occurred.
- **Implementation gap review:** `C03-IMPLEMENTATION-REVIEW.md` maps current v0 behavior to the candidate. D1/T1 scoped review is closed: D1 remains unconfirmed without runtime evidence; T1 found no explicit idempotency assertions in two fully read files but does not establish repository-wide absence. Further tests should answer a new acceptance question rather than repeat these cases. Broader workload families or source roots require separate scope approval.

## 10. Additional synthetic workload cases

These cases extend workload-family coverage without inspecting or modifying EverShop source. They test context selection, not application behavior or the model's general answer quality. Their source bodies and notes exist only in test fixtures; metric events contain categorical outcomes only.

| ID | Family | Fixture and expected behavior |
|---|---|---|
| D1 | `bug_diagnosis` | Synthetic checkout duplicate-submission report; include active in-scope knowledge and current source evidence; reject stale and sibling-scope records; do not claim a runtime cause beyond fixture evidence. |
| T1 | `test_review` | Synthetic explicitly invoked review workflow with checkpoint and current evidence; carry only a scoped handoff item whose evidence reference is selected; reject wrong-scope and unsupported notes; perform no durable write. |

The adapter tests pass for both cases. Runs `c03-v026` and `c03-v027` record synthetic prototype selection outcomes; they are not EverShop task-performance results.
