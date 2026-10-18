# ALPHA-KNOWLEDGE-PILOT-001 — Amendment 001: pending isolation and atomic batch writes

- **Status:** Approved by the user for pilot-local adapter implementation on 2026-10-17; workspace staging remains default-off until the explicit opt-in
- **Parent plan:** [`ALPHA-KNOWLEDGE-PILOT-001.md`](ALPHA-KNOWLEDGE-PILOT-001.md)
- **Reason:** The approved high-level plan calls for automatic pending staging and one batch promotion, but current V5 mechanisms do not implement either safely.

## Reviewer findings

A read-only reviewer inspected C02/C04/C09, the knowledge contract, workspace scope/profile, and the Pi knowledge-write gate/policy.

- The current gate previews/asks for confirmation on individual built-in `write`/`edit` calls. It has no atomic multi-file promotion, rollback, batch approval, or promotion operation.
- The gate does not enforce a separate pending-vs-active lifecycle or pending-read isolation. Current policy/instructions alone cannot guarantee that pending records will not be treated as active memory.
- The one-time workspace opt-in, revocation, rejection/expiry semantics, collision handling, and complete-batch-preview behavior need an explicit technical definition.
- The reviewer made no code changes, ran no commands/tests, and accessed no application/database/protected data.

## Proposed implementation boundary

1. **Separate active knowledge from candidates.** Approved active records remain under `AgenticLab/knowledge/`, routed from `INDEX.md`. Automatically staged candidates go under `AgenticLab/knowledge-pending/`, outside the active corpus and never linked from the active index. Normal project retrieval searches only `AgenticLab/knowledge/`; the adapter blocks ordinary built-in `read`/`grep`/`find`/`ls` access to the pending path. A dedicated review/promotion tool may read pending items only for an explicitly requested batch review.
2. **One-time opt-in is explicit and default-off.** A workspace-owned policy file enables auto-staging only for this pilot workspace. It is not inferred from task text, a prior workspace, or candidate status. Turning it off prevents further staging. No pending item is active by default; rejected pending items remain pending until an explicit discard or cleanup operation.
3. **Staging is a purpose-built Pi tool, not a file-tool bypass.** Add a typed `stageKnowledgeCandidates` tool in the pilot-local Pi adapter. It derives destinations from trusted workspace state (no model-supplied paths), validates schema, provenance, scope, size, and deterministic sensitive-content rules, and writes only status `candidate` records into the separate pending inbox. Staging also fails closed if active knowledge already exists or a promotion has committed; this pilot supports only one initial batch. Built-in `write`/`edit`/`read`/`grep`/`find`/`ls` and shell commands cannot access this path as alternate routes. If the opt-in is off, missing, or unreadable, staging fails closed and candidates remain transient.
4. **Promotion is one explicit batch transaction.** Add a typed `promoteKnowledgeBatch` operation that reads pending candidates internally, validates selected IDs, detects duplicates/collisions, builds the complete active-record/index preview, and requests one `ctx.ui.confirm`. Rejection changes nothing. Approval applies a single initial pilot batch atomically. Require `AgenticLab/knowledge/` to be absent; build the complete active tree (`INDEX.md` plus per-record files) in a sibling temporary directory, then rename the tree into place. If preparation or rename fails, leave active knowledge absent and pending untouched. Abort if an active knowledge root already exists; general merging/repeated promotions are out of scope. Keep the bundle bounded to the UI's reviewable preview limit; abort rather than truncate. Existing built-in writes to active knowledge retain their existing per-operation confirmation.
5. **Jev is advisory and shadow-first.** Add a no-write `triageKnowledgeCandidates` tool with a strict TypeBox schema for one disposition per candidate: `stage`, `transient`, `merge`, `needs-evidence`, `unsafe/out-of-scope`, or `abstain`, plus rationale/missing evidence/uncertainty. It returns an ephemeral review ID and summary. `stageKnowledgeCandidates` accepts only a valid in-memory review ID and stages only candidates labeled `stage`; if the policy is disabled, triage still runs but staging remains off. Jev-style judgment may advise but cannot write, approve, activate, delete, or suppress a user confirmation. No external Jev API/service is in scope.
6. **Wire only the pilot delivery workflow.** Update the pilot copy's `prompts/delivery/implement.md` to maintain a transient, source-linked candidate ledger and run the structured Jev-style triage at meaningful handoffs. If staging is disabled, all candidates remain transient; if the user has opted in, the workflow may call `stageKnowledgeCandidates` once with eligible candidates, without per-candidate prompts. No other workflow or default-mode auto-capture is included.
7. **Pilot-specific only.** These tools, prompt changes, and the opt-in do not change global V5 policy. Auto-staging is limited to `V5-memory-pilot-001`; no auto-activation is tested.

The initial Pi extension had no batch transaction or pending-state isolation; the approved pilot-local prototype implements these controls. Keep changes confined to the pilot copy's extension and tests; do not make a generic bypass or alter the canonical `system/` payload.

## Required tests before a live cross-session exercise

- **Default-off and workspace isolation:** staging is blocked when opt-in is absent/off; enabling it affects only this workspace. Staging is also blocked after promotion or if active knowledge already exists.
- **Candidate safety:** malformed, unsupported, missing-provenance, wrong-scope, and synthetic sensitive/credential-shaped candidates are rejected or remain transient. Benign negative examples prevent keyword overblocking.
- **Pending isolation:** pending candidates are not reachable through normal active-memory retrieval or returned as approved knowledge. Only the explicit review path can inspect them.
- **Shadow triage:** the strict output schema requires one valid disposition per input candidate; malformed/incomplete decisions fail validation, produce no review ID, and persist nothing.
- **Staging UX:** one workflow can stage only `stage`-labeled candidates from a valid in-memory review ID, without per-candidate confirmation after the explicit workspace opt-in; no candidate is active.
- **Batch promotion:** require the active root to be absent; preview is complete and readable; one approval applies the initial batch; rejection changes nothing; injected preparation/rename failure leaves no partial active root; retry is safe/idempotent. Existing active knowledge causes a safe abort.
- **Fresh-session retrieval:** after promotion, a naturally relevant task reads/verifies the active record; an unrelated task does not. Verify actual tool-read traces, not answer self-report.
- **Safety boundary:** no app/server, PostgreSQL, `.env`, root `data/`, full Jest/E2E, or network service; no write to the immutable source copy.

## Test sequence and stop rule

1. Read the Pi extension/custom-tool documentation and design a small pure policy module plus unit tests; do not assume the existing gate exposes transaction APIs.
2. Implement/test the typed tools in the pilot workspace only, with staging default-off.
3. Enable the one-time workspace opt-in only for the synthetic/approved pilot; run Jev triage in shadow mode first.
4. Review the shadow results, then use one batch promotion for a single user-approved candidate set.
5. Verify relevant/unrelated retrieval in a fresh session.

Stop before persistent staging if pending isolation or all-or-nothing promotion cannot be demonstrated in tests. Stop and report any safety-gate failure. No global AgenticLab policy or external Jev API changes are authorized by this amendment.

## Implementation approval boundary

The user approved the pilot-local implementation scope on 2026-10-17: add strict structured triage, typed staging/promotion tools, block ordinary direct access to pending, provide a default-off policy and one-time opt-in command, and wire candidate triage into only this pilot copy's `/implement` prompt. Work only in `/home/peet/Projects/V5-memory-pilot-001/`; do not change canonical `system/` files or other workspaces. Staging remains disabled by default. No real candidate may be staged until the user separately invokes/approves the one-time workspace opt-in; tests use temporary synthetic fixtures.