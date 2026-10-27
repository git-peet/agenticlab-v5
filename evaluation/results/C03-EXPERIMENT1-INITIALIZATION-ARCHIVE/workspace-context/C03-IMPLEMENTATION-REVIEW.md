# C03 Experimental Implementation Review

**Workspace:** `/home/peet/Projects/c03-experimental-phase/`
**Review date:** 2026-10-24
**Boundary:** Experimental workspace only. No upstream changes, commits, or pushes.

## Reviewed C03 v0 scope

This review maps the bounded experimental implementation to `backlog/candidates/C03-context-engineering.md`'s minimal context-assembly model. It does not select the backlog candidate for canonical implementation.

| C03 concern | Experimental v0 status | Evidence / limit |
|---|---|---|
| Current request and workspace/task scope | Implemented | `assembleContext()` retains request and scope. Workspace scope is validated against the configured AgenticLab policy. |
| Operating rules | Active in the system prompt; not duplicated in each assembled bundle | `AgenticLab/AGENTS.md` supplies the task and safety contract. The context tool returns supplementary task context. |
| Scoped project knowledge | Implemented and integrated | The Pi tool calls `readKnowledgeRecords` before source reads, includes eligible active record bodies, and preserves no-match/filtered/incomplete/unavailable/storage-failure distinctions. Synthetic active-record fixture and live complete-no-match path tested. |
| Current-source retrieval | Implemented with path and subproject-scope boundaries | `assembleContext` reads only caller-selected files under `.pi/context-assembly-policy.json` roots; workspace containment and symlink checks fail closed. Configured path-scope rules derive module scope before reading file content. Live W3 v028 confirmed a sibling catalog path was filtered before read for a checkout task. Discovery remains agent-led after knowledge retrieval. |
| Workflow prompt/checkpoint | Implemented, invocation-gated | Only included when `workflowInvoked` is true. W4 stale-checkpoint comparison validated live against current source. |
| Task-local handoff | Implemented, evidence-gated, ephemeral | W4 v021 verified workflow, scope, status, and evidence-reference checks. Stale, wrong-scope, and unsupported items are excluded; no automatic durable write occurs. |
| Smallest sufficient context | Agent-led in v0, not a semantic ranker | The agent selects the source paths; the assembler filters/combines and bounds path count/lines. No automatic relevance ranking or autonomous query loop. |
| User clarification / sufficiency | Retrieval-first guidance in `AGENTS.md` | Agent searches authorized sources before asking. The assembler reports retrieval outcomes; the model judges whether remaining evidence blocks the next action. |
| Cost/friction evaluation | Not measured | No named token/call-cost question was approved; no fixed token budget is imposed. |
| Durability / telemetry | Correctly excluded | C03 records remain local; task handoff is ephemeral; pending knowledge staging remains disabled; no permanent retrieval telemetry. |

## Validation evidence

- Full adapter suite: **88/88 passing**.
- Controlled retrieval fixtures R1–R6: prior calibration pass.
- Live source tasks: W2/W3/W4 passed through existing tools and `assembleContext` under the approved read-only `packages/evershop/src/**` scope. W3 v028 verified a checkout task excludes a catalog sibling path before reading. D1/T1 also ran live under the expanded scope; their outcomes were partial because runtime behavior and full test coverage were not established.
- Discovery-first W2: knowledge lookup → targeted in-root discovery → bounded assembly → answer from bundle; pass.
- Workflow handoff W4: explicit workflow/checkpoint, one evidence-backed candidate carried, stale/wrong-scope/unsupported notes excluded; pass. Live two-phase plan-to-resume handoff W4 v037 also passed the evidence gating.
- Synthetic D1/T1 adapter cases and metric records: bug-diagnosis context includes current scoped knowledge/source and excludes stale/sibling records; test-review context carries only invoked, evidence-linked handoff. Both pass selection assertions.
- Live D1/T1 retrieval-first runs: D1 (`c03-v029`) kept the symptom unconfirmed; D1 v036 found no decision evidence after retrieval and asked one focused clarification. T1 (`c03-v030`–`c03-v034`) found no duplicate/idempotency assertions in the fully read matched tests, but does not establish repository-wide coverage. No tests were executed.
- Minimal-context W2 v035 selected the AppProvider source and excluded a same-scope form-state decoy for a narrow browser-navigation question; pass.
- Metrics: 63 physical C03 rows; 46 reviewed outcomes, one stale-runtime diagnostic (`c03-v023`), and 16 preserved invalid stub-generated rows. See `C03-METRIC-REVIEW.md` for the audit rule. C02 activity remains in its separate local stream.

## Generalization review

Hierarchical task/subproject scope is supported for knowledge, task-local handoff, and current sources: requested scopes must equal or descend from the configured workspace scope; C02 scope-matching semantics reject sibling/out-of-workspace records and notes. Configured path-scope rules map `packages/evershop/src/modules/<module>` to corresponding task scopes. Synthetic checkout-vs-catalog tests and live child-scope W3/W4 runs (`c03-v024`, `c03-v025`) pass; live W3 v028 confirmed the catalog sibling path was filtered before reading when the task scope was checkout.

Source-path discovery is intentionally agent-led, not automated inside `assembleContext`; the discovery-first W2 run demonstrates the prescribed knowledge-first sequence. Paths remain restricted to the configured source roots. Synthetic D1 bug-diagnosis and T1 test-review fixtures exercise selection behavior, but are not evidence of live EverShop task quality. No vector retrieval, broad autonomous search, fixed token budget, or durable learning-write path is selected.

## Recommendation

Treat the current work as an operational **experimental C03 v0 slice**, not a general context subsystem and not an upstream-ready implementation. D1/T1 scoped review is closed with bounded conclusions: D1 remains unconfirmed without runtime evidence; T1 found no explicit assertions in the two fully read matching tests, but cannot establish repository-wide absence. Source-to-subproject mapping is implemented and verified by synthetic tests plus live W3 v028. Do not repeat these scenarios without a new acceptance question; any broader source/test scope needs separate approval. Keep the 16 invalid metric rows and stale-runtime diagnostic excluded from current-code performance conclusions; preserve all rows for auditability.
