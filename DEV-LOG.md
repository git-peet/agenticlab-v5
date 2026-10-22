# AgenticLab V5 — Development Log

## V5-20261021-008 — Phase 3 Mechanism Completed & Verified

- **Recorded:** 2026-10-21
- **Type:** Mechanism completion / verification
- **Status:** Phase 3 verified; all adapter mechanisms operational; Phase 3 design (C02 MOC/index) ready for scope approval

### **Accomplished (Phase 3):**

1. ✅ `readKnowledgeRecords` adapter verified: 8 `retrieval_success` events emitted — agent correctly uses adapter for knowledge lookup (not direct source code reading)
2. ✅ Hard-trigger hook verified: Blocks direct `read`/`grep` on INDEX.md trigger terms, forces `readKnowledgeRecords` call; fail-open after 2 blocks per topic (5-min TTL)
3. ✅ Fail-open confirmed: After 2 blocks on same topic, gate returns `undefined` — agent can proceed without being trapped
4. ✅ MOC/index design created: `concurrency-control/INDEX.md` created (delivery workspace only — 34 lines, 1 record)
5. ✅ Checkpoint lifecycle verified: `AgenticLab/plan-checkpoint.json` correctly consumed by `/implement` and deleted at end; PBI-2 checkpoint replaced with PBI-3 checkpoint per user approval
6. ✅ Metrics validation complete: `retrieval_success` (×8), `no_match` (×3), `candidate_staged` (×0 — expected, no new reusable knowledge found during PBI-3 implementation)

### **Herdr sub-session (`w8:p1`) — PBI-3 Implementation:**

- Agent read source files to understand the problem
- Agent used `readKnowledgeRecords` for knowledge lookup (emitting `retrieval_success`)
- Agent tested hard-trigger gate by attempting direct source reads (was blocked, self-corrected to adapter call)
- Agent implemented PBI-3 wishlist feature per approved scope (migration, service, API, UI, isolated test config)
- Agent produced proper metrics in `.pi/metrics/agenticlab.jsonl`
- Task-local learning handoff: "None" — correct, as no new reusable knowledge identified

### **C02 Design Status:**

- `concurrency-control/INDEX.md` template created (ready for inventory-service, transaction-logic, inventory-row-model records)
- **Awaiting scope approval** for `promoteKnowledgeBatch` and full MOC promotion workflow
- **Independent reminder logged:** Free-session candidate trigger not yet implemented (V5-20261021-007)

### **Ready for Phase 4:**

- Run real delivery Alpha task using the full mechanism (`/plan` → `/implement` → `/premortem`), OR
- Proceed with C02 MOC/index design (awaiting explicit scope approval)

---

## V5-20261021-007 — Free-session candidate reminder (not forgotten)

- **Recorded:** 2026-10-21
- **Type:** Design reminder / open question
- **Status:** Not implemented; noted for future phase
- **Finding:** Workflows (`plan`, `implement`, `premortem`) have explicit `candidate_staged` metrics + adapter staging (see `plan.md:78`, `implement.md:51`, `premortem.md:42`). Free-session (random discussion, debugging, exploratory tool use, unscripted prompts) has **no** equivalent trigger or metric. `AGENTS.md` §32 restricts over-creation but does not activate collection.
- **Implication:** Valuable candidates from free-session exploration (e.g., a new concurrency observation discovered during debugging) can be lost if they never reach a structured `/plan` / `/implement` handoff. Need a lightweight trigger for: when an agent makes a verifiable claim during free session that could prevent rediscovery, propose it as `candidate` (with scope + source + evidence) without requiring full `/plan` structure.
- **Suggested reminder location (not yet implemented):** `.pi/APPEND_SYSTEM.md` — add line after retrieval trigger: "Free-session exploration: when you derive a verifiable, source-backed observation that could prevent future rediscovery, propose it as a scoped candidate (with claim, scope, source, evidence, status) before ending the session; do not persist session transcripts or unverified observations automatically."
- **Next if pursued:** Define minimal free-session trigger criteria (source-backed + verifiable + reusable); emit `candidate_staged` via adapter; require user approval (`/knowledge-opt-in`) before promotion to `AgenticLab/knowledge/`; keep distinction from `plan` workflow (no full checkpoint/feed required).
- **Relation to Phase 3:** Does not block C02 MOC/index design; independent of promotion pipeline. Can be implemented after MOC structure is validated.

---

## V5-20261021-006 — Phase 2 hard-trigger hook confirmed working in all workspaces

- **Status:** ✅ Complete; verified in delivery, canonical, and payload workspaces
- **Key verification:** 7 `retrieval_success` events after hard-trigger block on `inventoryService.ts` (matching INDEX.md "advisory lock" trigger)
- **Fail-open behavior:** Line 60 (`count > 2`) returns `undefined` — agent can proceed without being trapped
- **State clearing:** `readKnowledgeRecords` call clears lookup-state Map keyed by `cwd|topicKey`
- **Portability:** All 3 workspaces have identical implementation — no differences in logic or behavior

---

## V5-20261021-005 — Herdr sub-session access confirmed; reboot handoff recorded

- **Recorded:** 2026-10-21
- **Type:** Operational / tooling
- **Status:** Complete
- **Finding:** The main session can drive and observe delivery-workspace sub-sessions directly through the Herdr CLI (`herdr agent list | prompt | read | wait`), so test runs no longer require manually copying sub-session transcripts. Delivery sub-session is pane `w8:p1` (`/home/peet/Projects/post-integration-delivery`); canonical repo is `w3:p2` (`/home/peet/Projects/AgenticLab-v5`). Pane IDs may change after a laptop restart; `herdr agent list` is the source of truth.
- **Outcome:** Wrote `handoff-reboot.md` (repo root) capturing Phase 1 + Phase 2 status, the Herdr command set, a restart checklist, and the ordered next steps, so a fresh session can resume without re-deriving context. The file is a local handoff, not a committed design record.
- **Next:** Proceed to the C02 MOC/index design; keep the handoff file in sync when phase status changes.

---

## V5-20261021-004 — Retrieval trigger calibrated; metrics gap closed (Phase 1 + Phase 2)

- **Recorded:** 2026-10-21
- **Type:** Mechanism implementation / verification
- **Status:** Complete; verified in delivery workspace, ported to canonical and payload workspaces
- **Context:** Followed V5.2-roadmap §1-4; built on V5-20261020-004 (initial mechanism) and V5-20261020-003 (prompting conventions); verified against handoff-reboot.md (local handoff details)
- **Key Changes:**
  - *Adapter Layer*: `knowledge-capture-tools.mjs` now emits `retrieval_success` for `status: "ok" && count > 0` and `no_match` for `status === "no_match"` or `"not_found"`; `readKnowledge` now strips invalid/placeholder `id` values so pure query searches reach the `no_match` path
  - **Prompt Layer**: `prompts/delivery/plan.md` (Step 0) and `AgenticLab/AGENTS.md` Section 2 — explicit "Always call `readKnowledgeRecords`" rule with `read` tool blocking; `.pi/APPEND_SYSTEM.md` updated with same instruction; `system/prompts/system/initialize-workspace.md` updated to reflect session-level trigger
  - **C02 Design (Pending)**: Hard-trigger hook (`classifyKnowledgeReadTrigger` + `knowledge-write-gate.mjs` tool_call hook) implemented in all 3 workspaces — blocks direct `read`/`grep`/etc. on `INDEX.md` trigger terms, forces `readKnowledgeRecords` call, emits `no_match` on failure; verifies trigger terms against `INDEX.md` trigger list; emits metric events; agent self-corrects to tool call when blocked.
- **Verification:** 
  - Test A: 6 `retrieval_success` events (advisory lock topic) — agent consulted `INDEX.md`, matched "advisory lock" trigger, called `readKnowledgeRecords` with record ID, verified claims against source
  - Test B: 1 `no_match` event (connection-pooling query) — no trigger match, agent used `readKnowledgeRecords` with query "database connection pooling", metric emitted correctly
  - Combined session (Test A+B): 6 `retrieval_success` + 1 `no_match` = 7 events; agent read `INDEX.md`, then `pbi-2-advisory-lock-concurrency.md`, then `inventoryService.ts`; metrics file shows 6 `retrieval_success` + 1 `no_match` events
- **Porting:** 
  - Canonical (`system/`): adapter fix + `.pi/APPEND_SYSTEM.md` template update (system/prompts/system/initialize-workspace.md)
  - Delivery (`AgenticLab/`): adapter + `.pi/APPEND_SYSTEM.md` + `prompts/delivery/plan.md` + `AGENTS.md` 
  - Payload (`AgenticLab/`): adapter + metrics.mjs + AGENTS.md
- **Herdr sub-session access:** Confirmed via `herdr agent list` — `w8:p1` (delivery) and `w3:p2` (canonical) panes available; agent commands (`read`, `send-keys`, `prompt`) work via Herdr API; session state preserved across Herdr restarts; `.pi/metrics/agenticlab.jsonl` persists across sessions
- **Metrics:** `.pi/metrics/agenticlab.jsonl` now reliably emits `retrieval_success` and `no_match` events; fresh-session verification passes

---

## V5-20261020-004 — Gate fix allows retrieval; mechanism complete

- **Recorded:** 2026-10-20
- **Type:** ALPHA-INTEGRATION-001 / mechanism repair
- **Status:** Fix applied; verified
- **Files changed:**
  - `AgenticLab/adapters/pi/knowledge-write-policy.mjs` — added `READ_ONLY_SHELL_COMMANDS` set and `isReadOnlyShellCommand()`; modified `shellReferencesKnowledge()` to allow read-only shell commands on `AgenticLab/knowledge/` while blocking write/mutation commands
  - `AgenticLab/adapters/pi/knowledge-capture-core.mjs` — added `readKnowledge()` function to read durable records from `AgenticLab/knowledge/` (ID exact match, query substring search, bounded results)
  - `AgenticLab/adapters/pi/knowledge-capture-tools.mjs` — added `readKnowledgeRecords` tool that emits `retrieval_success` metric when matched ≥1 record
- **Verification:** Direct `node -e` test of `readKnowledge({ id })` returned record correctly; `ls`, `find`, `cat` shell commands now allowed on knowledge directory (verified via `shellReferencesKnowledge` unit-style test); `rm`/`edit` still blocked.
- **Note:** The fix avoids changing the mutation gate (still requires preview + confirmation via `classifyKnowledgeMutation` + `captureTransactionLocked`). It only relaxes the overly-aggressive read block on `AgenticLab/knowledge/`.

---

## Key Design Decisions (Durable)

- **Phase 1:** Calibration — adapter emits `retrieval_success`/`no_match`; scoring threshold ≥50% of query terms; prompt rules require explicit `readKnowledgeRecords` call
- **Phase 2:** Hard-trigger — INDEX.md-derived triggers; blocks source reads on trigger match; fail-open after 2 blocks; state cleared on `readKnowledgeRecords`
- **Phase 3:** MOC design — `knowledge/<domain>/INDEX.md` topic routers; candidate promotion pipeline (`candidate` → `active` via user-approved `promoteKnowledgeBatch`)
- **Phase 4:** Real Alpha task — full `/plan` → `/implement` → `/premortem` flow with retrieval metrics and candidate staging

---

## Current Status (as of 2026-10-21)

| Phase | Status | Next Action |
|--------|--------|-------------|
| **1** | ✅ Complete | — |
| **2** | ✅ Complete | — |
| **3** | ✅ Design verified; MOC ready | Proceed to C02 scope approval / Phase 4 |
| **4** | 🔜 Ready | Run real delivery Alpha task; measure retrieval activation |

The knowledge-retrieval mechanism is fully operational and verified across all three workspaces. The next logical step is to execute Phase 4 (real delivery task) or finalize the C02 MOC/index design.
