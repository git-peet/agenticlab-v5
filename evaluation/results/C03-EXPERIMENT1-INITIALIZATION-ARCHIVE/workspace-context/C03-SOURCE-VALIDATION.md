# C03 Live Source Validation

**Workspace:** `/home/peet/Projects/c03-experimental-phase/`
**Authorization:** Read-only inspection under `packages/evershop/src/**` only, for named C03 scenarios W2/W3/W4/D1/T1. T1 may inspect test source in this subtree but no tests were executed. No EverShop files were changed; no app, scripts, build, database, or network operation was run.
**Metrics:** Content-free outcomes are in `.pi/metrics/c03-context-experiment.jsonl` as live-source runs `c03-v014`–`c03-v025` and `c03-v028`–`c03-v037`. No source excerpts or user-authored prompt text are stored here.

## W2 — Research: modules and client-side state (`c03-v014`)

- Knowledge lookup: complete in-scope no-match; source inspection followed.
- Read-only source files inspected:
  - `packages/evershop/src/bin/lib/loadModules.js`
  - `packages/evershop/src/bin/lib/startUp.js`
  - `packages/evershop/src/components/common/context/app.tsx`
  - `packages/evershop/src/components/common/form/Form.tsx`
- Evidence categories: module list/loading and extension composition/bootstrap ordering; React state/dispatch contexts and form-state provider.
- Outcome: `right_scope_match`, `stop`, `pass`. The answer distinguished inspected patterns from broader project-wide unknowns.

## W3 — Planning: extension module contribution and bootstrap ordering (`c03-v015`)

- Knowledge lookup: complete in-scope no-match; source inspection followed.
- Read-only source files inspected:
  - `packages/evershop/src/bin/extension/index.ts`
  - `packages/evershop/src/bin/lib/startUp.js`
  - `packages/evershop/src/bin/lib/bootstrap/bootstrap.ts`
- Evidence categories: enabled-extension discovery/order, module bootstrap loading, and registry/hook lock boundary.
- Outcome: `right_scope_match`, `stop`, `pass`. The plan stated which source facts were verified and left extension-specific configuration/registrations unknown rather than guessing.

## W4 — Resume fixture: detect stale bootstrap checkpoint (`c03-v016`)

- Fixture: synthetic checkpoint claimed extension registration could occur at any time during request handling. This was scenario input only; it was not persisted.
- Knowledge lookup: complete in-scope no-match; source inspection followed.
- Read-only source files inspected:
  - `packages/evershop/src/bin/lib/startUp.js`
  - `packages/evershop/src/bin/lib/bootstrap/bootstrap.ts`
  - `packages/evershop/src/lib/util/hookable.ts`
  - `packages/evershop/src/lib/util/registry.ts`
- Outcome: `right_scope_match`, stale exclusion, `stop`, `pass`. Current source contradicts the synthetic checkpoint: bootstrap runs before the relevant registries/hooks are locked. No extension-specific runtime configuration was inspected.

## Integrated tool-path runs (`c03-v017`–`c03-v019`)

These reran W2/W3/W4 through the registered `assembleContext` tool. Each run called scoped knowledge retrieval first, then read only its explicitly supplied, policy-approved source paths, returned a source-bounded bundle, and answered from that bundle. All three recorded `right_scope_match`, `stop`, `pass`; W4 also recorded exclusion code `stale` for its synthetic checkpoint. The content-free event rows are in the C03 metrics file.

## Discovery-first W2 (`c03-v020`)

- Knowledge lookup ran first and returned a complete in-scope no-match.
- The agent then ran a targeted filename/content search only under `packages/evershop/src/**`, matching module/bootstrap and React context/form patterns. It selected four paths from the search results; no source files were separately read before assembly.
- `assembleContext` repeated the scoped knowledge lookup, read only those four selected paths, and returned `right_scope_match` with `current_source` selected. The agent answered from the bundle and stated evidence limits. Outcome: pass.
- This validates agent-led path discovery followed by bounded assembly. It does not make `assembleContext` itself a file-discovery/search tool.

## Minimal same-scope source selection W2 (`c03-v035`)

- Knowledge lookup: complete in-scope no-match; targeted search under `packages/evershop/src/components/common/**` discovered both the app context and form-state files as candidates.
- For the narrow browser back/forward refresh question, the agent passed only `components/common/context/app.tsx` to `assembleContext` and excluded `components/common/form/Form.tsx` as irrelevant.
- The answer described the source-level navigation handler and explicitly noted that the code does not establish runtime success because errors are swallowed. Outcome pass; no runtime/app test ran.

## Task-local workflow handoff W4 (`c03-v021`)

- Synthetic, explicitly invoked plan-to-implementation fixture supplied a checkpoint plus four handoff notes: one candidate tied to a selected current-source path, one stale, one wrong-scope, and one unsupported by selected evidence.
- `assembleContext` included the checkpoint and the evidence-backed in-scope candidate. It excluded stale, wrong-scope, and unsupported notes with the corresponding categorical reasons. The current-source bundle verified the checkpoint; no implementation or durable knowledge write occurred.
- Outcome: `right_scope_match`, `stop`, `pass`; included source types included `checkpoint`, `current_source`, and `task_handoff`. The content-free record is `c03-v021`.

## Live two-phase workflow handoff W4 (`c03-v037`)

- Phase 1 assembled a read-only checkout bootstrap plan from current source. Phase 2 resumed with an explicit synthetic approved checkpoint and a task-local candidate tied to `packages/evershop/src/modules/checkout/bootstrap.ts`.
- The in-scope evidence-backed candidate crossed the phase boundary. Stale, sibling-scope, and unsupported-evidence notes were excluded. No code was changed and no durable knowledge write occurred. Outcome: pass.

## Subproject-scope validation (c03-v023–c03-v025, c03-v028)

- `c03-v023` is a preserved stale-runtime diagnostic: the live Pi process had not yet been restarted after scope support changed from exact workspace scope to descendant scopes. Its old extension returned unavailable before retrieval; no source file was read. After restarting with `pi --continue`, the same child-scope W3 scenario passed as `c03-v024`.
- W3 v024 requested `project:c03-experimental-phase/modules/checkout`. Knowledge lookup completed no-match under that child scope; targeted path discovery stayed inside `packages/evershop/src/modules/checkout/**`; `assembleContext` assembled selected source paths and returned a bounded planning bundle. Outcome pass.
- W4 v025 used the same child scope with an explicit workflow checkpoint and task-local handoff. The in-scope, evidence-backed candidate was included; a sibling-scope note and an unsupported evidence reference were excluded. The current source contradicted the synthetic checkpoint and it was marked stale. Outcome pass.
- W3 v028 supplied checkout and catalog module paths for a checkout-scoped task. The policy mapped their source scopes before reading: checkout bootstrap was read, while the sibling catalog path was filtered as wrong-scope before its body was opened. Outcome pass.
- No live source path outside the already approved root was inspected. The stale-runtime diagnostic is not treated as evidence against the reloaded current extension; all metric rows remain preserved.

## D1 — Live bug diagnosis (`c03-v029`)

- Knowledge lookup: complete in-scope no-match; targeted discovery and assembly followed within `packages/evershop/src/modules/checkout/**`.
- Paths read: `api/createOrder/route.json`, `api/createOrder/placeOrder.js`, `services/checkout.ts`, and `services/orderCreator.ts` under the checkout module.
- Outcome: `right_scope_match`, stop/partial. The sources showed a create-order flow and transactional order creation but did not establish an idempotency/duplicate-submission guarantee. The model kept the symptom unverified, distinguished concurrency as a hypothesis, and identified that runtime evidence would be needed. No tests or application execution occurred.

## D1 — Retrieval-exhausted clarification (`c03-v036`)

- Knowledge lookup returned a complete in-scope no-match. A targeted search for explicit idempotency/duplicate-order policy under `packages/evershop/src/modules/checkout/**` found no relevant decision evidence; one migration candidate was unrelated.
- The agent then asked one focused clarification distinguishing an existing approved decision from a new requirement proposal. No repeated search, app execution, or tests occurred.
- Outcome: `no_match`, `clarify`, `partial`. This validates the retrieval-first clarification path, not the existence/absence of policies outside the approved subtree.

## D1 — Retrieval-exhausted clarification (`c03-v036`)

- Knowledge lookup returned a complete in-scope no-match. A targeted search for explicit idempotency/duplicate-order policy under `packages/evershop/src/modules/checkout/**` found no relevant decision evidence; the only path assembled was an unrelated migration file (`migration/Version-1.0.4.js`).
- The agent then asked one focused clarification distinguishing an existing approved decision from a new requirement proposal. It did not repeat the search, run tests, or execute the application.
- Outcome: `no_match`, `clarify`, `partial`. This validates retrieval-first clarification when evidence is exhausted; it does not establish whether an idempotency policy exists outside the approved subtree.

## T1 — Live test review (`c03-v030`–`c03-v034`)

- Knowledge lookup: complete in-scope no-match; filename discovery and bounded review followed inside the checkout subtree.
- Initial runs v030/v031 read `tests/unit/zeroCheckout.test.js`, `tests/unit/billingAddressRule.test.js`, and `services/orderCreator.ts` in bounded views. These showed zero-checkout and billing-address validation, not explicit duplicate-submission/idempotency coverage; no tests were executed.
- Follow-ups v032/v033 inventoried recognized test-source paths under the checkout subtree and searched them for order-creation/idempotency/duplicate-submission terms. The inventory identified 24 standard test-source candidates; results were limited to validation references in the two files above. Nonstandard test layouts and tests outside the approved subtree were not ruled out.
- v034 fully read the two matched test files within the tool’s line bound. Neither contains explicit duplicate-order/idempotency assertions. This establishes the finding for those two files, not for all tests in the repository.
- All T1 runs were read-only; no tests were executed. The broader coverage conclusion remains scoped/partial.

## Live `assembleContext` integration smoke

- Called the model-visible `assembleContext` tool with two approved paths: `packages/evershop/src/bin/lib/startUp.js` and `packages/evershop/src/bin/lib/bootstrap/bootstrap.ts`.
- The tool performed a complete knowledge no-match first, then read both paths via nested Pi `read` calls. It returned `right_scope_match` with `current_source` selected and no read failures. Pi then answered from the assembled bundle without further source reads.
- This was an integration smoke, not a scored C03 scenario; no C03 metric was written. The nested `readKnowledgeRecords` call emitted its normal C02 `no_match` event because C02 metrics remain enabled for this experiment.

## Limits

- The live assembler reads only explicit paths allowed by `.pi/context-assembly-policy.json`; current configuration permits `packages/evershop/src/**`, with symlink/path checks and bounded file counts/lines.
- The generic `assembleContext()` remains a callback-driven core; the Pi tool supplies the real `readKnowledgeRecords` and `read` calls. It does not discover arbitrary project files, answer tasks, or write metrics.
- No conclusions are made about source outside `packages/evershop/src/**` or about all client/module patterns in the application.
