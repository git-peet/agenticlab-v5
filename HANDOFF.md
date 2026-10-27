# AGENT HANDOFF — PBI-2 + Knowledge Capture Mechanism

**Date:** 2026-10-21  
**Workspace:** `/home/peet/Projects/post-integration-delivery`  
**Session:** Post-reboot fresh session preparation  
**Purpose:** Give any agent (human or AI) full context to continue work immediately

---

## 1. WHERE WE CAME FROM (Context)

### Historical Background
- **AgenticLab** is a V5 delivery-focused engineering system supporting persistent, project-specific knowledge across sessions.
- **V4** had complex memory layers (MOC, SEMANTIC_MAP, atomic notes, episodic logs) with demonstrated zero cold-tier matches across 17 sessions.
- **V5** goal: Make the knowledge loop testable in real use without blocking whole system design. Memory is a capability, not an identity.
- **Canonical repo:** `/home/peet/Projects/AgenticLab-v5/` (source of truth, pushed to GitHub)
- **Delivery workspace:** `/home/peet/Projects/post-integration-delivery/` (current experiment host)
- **Payload workspace:** `/home/peet/Projects/AgenticLab/` (production payload copy)

### V5.2 Design Candidates (Backlog)
The following backlog candidates were reviewed:
- **C02 knowledge-lifecycle** — central capability; central to our work
- **C03 context-engineering** — retrieval interface design, bounded retrieval
- **C05 continuity-observability** — metrics collection triggers
- **C04 governance-safety**, **C08 runtime-adapters**, **C09 Jev decisions**, etc.

All knowledge-capture work maps primarily to **C02** and **C03**.

---

## 2. WHAT WE DID (Last 2 Days)

### Day 1: PBI-2 Implementation + Mechanism Discovery
- **PBI-2** (multi-warehouse inventory with low-stock alerts) implemented successfully
- Implementation artifacts:
  - `implementation-logs/post-integration-delivery/pbi-2-multi-warehouse-inventory/implementation-log.md`
  - `implementation-logs/post-integration-delivery/pbi-2-multi-warehouse-inventory/implement-record.json`
  - `implementation-logs/post-integration-delivery/pbi-2-multi-warehouse-inventory/premortem.md`
- **10 metric events captured** in `.pi/metrics/agenticlab.jsonl` (all agent-side):
  - `candidate_staged` × 6
  - `decision_knowledge` × 2  
  - `retrieval_success` × 2
- **Discovery:** No `AgenticLab/knowledge/` directory existed → retrieval events had nothing to retrieve → metrics were disconnected from actual knowledge records
- **Root cause identified:** Project-side `inventoryService.ts` imported `AgenticLab/adapters/pi/knowledge-capture-metrics.mjs` directly (violating operating contract: no AgenticLab imports in project code)

### Day 2: Mechanism Completion + Retrieval Trigger Design

#### A. Fixes Applied (Operating Contract Compliance)
1. **Removed project-code import** — Deleted `recordInventoryMetric()` function and its import from `packages/evershop/src/modules/inventory/services/inventoryService.ts`
2. **Cleared metrics** — Reset `.pi/metrics/agenticlab.jsonl` to 0 bytes (legacy events quarantined in `agenticlab.quarantine.md`)
3. **Operating contract** — "Code and dependency boundaries" section prohibits project-code AgenticLab imports

#### B. Knowledge Capture Mechanism Completed
- Created first durable knowledge record: `AgenticLab/knowledge/pbi-2-advisory-lock-concurrency.md`
- File contains: claim, evidence, rationale, verification plan, limitations, source reference
- **Promotion flow verified:** candidate_staged → decision_knowledge → retrieval_success → durable write

#### C. Retrieval Mechanism Added
**New adapter functions:**
- `readKnowledge(cwd, { id, query })` in `knowledge-capture-core.mjs`
- `readKnowledgeRecords` tool in `knowledge-capture-tools.mjs` (emits `retrieval_success` metric)
- `no_match` event type added to `ALLOWED_EVENTS` in `knowledge-capture-metrics.mjs`

#### D. Gate Fix
- `knowledge-write-policy.mjs` — Added `READ_ONLY_SHELL_COMMANDS` set; `shellReferencesKnowledge()` now allows `ls`, `find`, `cat`, `grep`, `read` on `AgenticLab/knowledge/` while blocking write/mutation commands

#### E. INDEX.md Created
- `AgenticLab/knowledge/INDEX.md` — Navigation index with trigger terms for each record
- Contains trigger terms: `advisory lock`, `concurrency`, `pg_advisory_xact_lock`, `reserve inventory`, etc.
- Routes to `pbi-2-advisory-lock-concurrency.md`

#### F. Trigger Instruction Added (Read-on-Demand)
- `AGENTS.md` Section 2 updated: "Before inspecting source code for design rationale... scan INDEX.md trigger terms..."
- `prompts/delivery/plan.md` Step 0: Index check before metrics staging
- `prompts/delivery/implement.md` Step 0: Index check before metrics staging
- `.pi/APPEND_SYSTEM.md` — Session-level injection announcing the trigger to every fresh session

---

## 3. GIT STATE (All Committed & Pushed)

| Repo | Branch | Remote | Last Commit |
|---|---|---|---|
| V5 canonical (`AgenticLab-v5/`) | `main` | `origin/main` | `86c48fd` feat: add retrieval trigger to AGENTS.md |
| Delivery (`post-integration-delivery/`) | `master` | `origin` | `d0f5e5a` feat: Phase 1 retrieval trigger |
| Payload (`AgenticLab/`) | — | (copy of V5 system/) | — |

**Files changed:** `knowledge-capture-core.mjs`, `knowledge-capture-tools.mjs`, `knowledge-capture-metrics.mjs`, `knowledge-write-policy.mjs`, `AGENTS.md`, `plan.md`, `implement.md`, `INDEX.md`, `knowledge/pbi-2-advisory-lock-concurrency.md`, `.pi/APPEND_SYSTEM.md`

---

## 4. WHERE WE STAND TODAY (Current State)

### Mechanism Status
- **Staging** ✅ — Agent stages candidates via `stageKnowledgeCandidates` tool → `candidate_staged` metric
- **Approval** ✅ — User approves via `/knowledge-opt-in` or `promoteKnowledgeBatch` → `decision_knowledge` metric
- **Durable Write** ✅ — `promotePending()` writes to `AgenticLab/knowledge/<id>.md` (verified: 1 record exists)
- **Retrieval** ✅ — `readKnowledgeRecords()` tool finds records by ID or query; `readKnowledge()` function works
- **Metrics** ✅ — All 4 event types defined; file cleared to 0 bytes for fresh session

**NOT Yet Fully Working:**
- **Trigger activation** — The agent does not *automatically* consult INDEX.md during free-session conversation. It worked during `/plan`/`/implement` workflows but not in free-form chat.
- **`retrieval_success` emission** — Agent read files directly (`read` tool) instead of using `readKnowledgeRecords` tool, so no `retrieval_success` metric fired in the last sub-session test

**Last sub-session test result:**
- Agent read `AgenticLab/knowledge/INDEX.md` then `pbi-2-advisory-lock-concurrency.md` — mechanism works structurally
- But agent fell through to source code (`inventoryService.ts`) for verification — acceptable but not yet optimal
- Metrics file remained at 0 events because agent used direct file tools, not `readKnowledgeRecords`

---

## 5. WHERE WE'RE HEADING (Next Steps)

### Phase 1: Trigger Calibration (Immediate)
1. **Test INDEX.md trigger** — Run a fresh session and ask about advisory lock concurrency. Verify:
   - Agent reads `AgenticLab/knowledge/INDEX.md`
   - Agent finds trigger match ("advisory lock")
   - Agent reads `pbi-2-advisory-lock-concurrency.md`
   - Agent emits `retrieval_success` via `readKnowledgeRecords` tool
   - Metrics file gets events
2. **Verify `no_match` emission** — Ask about a topic with no knowledge entry. Verify `no_match` fires.
3. **Confirm `.pi/metrics/agenticlab.jsonl` populates correctly**

### Phase 2: Hard Trigger (If Phase 1 Insufficient)
- Extend `knowledge-write-gate.mjs` tool_call hook to nudge agent toward INDEX.md when reading project source files with matching context
- This avoids modifying Pi core logic — stays in adapter/workspace layer

### Phase 3: MOC Scale (Future)
- When `AgenticLab/knowledge/` exceeds ~20 records, introduce domain MOCs per C02/C03 design
- Promote `INDEX.md` → `knowledge/<domain>/INDEX.md` structure
- Keep atomic entries unchanged

---

## 6. KEY FILES & PATHS

```
Delivery workspace root:
  /home/peet/Projects/post-integration-delivery/

Key files:
  AgenticLab/AGENTS.md                          # Agent instructions (trigger in Section 2)
  AgenticLab/brain/knowledge-contract.md        # Knowledge lifecycle contract
  AgenticLab/knowledge/INDEX.md                 # Navigation index with trigger terms
  AgenticLab/knowledge/pbi-2-advisory-lock-concurrency.md  # First promoted knowledge record
  AgenticLab/adapters/pi/knowledge-capture-core.mjs        # readKnowledge() function
  AgenticLab/adapters/pi/knowledge-capture-tools.mjs       # readKnowledgeRecords tool
  AgenticLab/adapters/pi/knowledge-capture-metrics.mjs     # Metrics events (ALLOWED_EVENTS)
  AgenticLab/adapters/pi/knowledge-write-policy.mjs        # Gate fix (read-only shell allowed)
  AgenticLab/prompts/delivery/plan.md                        # /plan prompt (Step 0: Index check)
  AgenticLab/prompts/delivery/implement.md                   # /implement prompt (Step 0: Index check)
  .pi/APPEND_SYSTEM.md                                       # Session-level trigger injection
  .pi/metrics/agenticlab.jsonl                               # Metrics log (currently empty/clean)
  implementation-logs/post-integration-delivery/pbi-2-multi-warehouse-inventory/  # PBI-2 artifacts

Canonical V5 repo:
  /home/peet/Projects/AgenticLab-v5/
  backlog/retrieval-trigger-design.md    # Full design spec
  system/brain/INDEX.md                  # Canonical INDEX.md copy
  system/AGENTS.md                       # Canonical AGENTS.md copy
  system/adapters/pi/*                   # Canonical adapter copies
```

---

## 7. CRITICAL DECISIONS MADE

| Decision | Reasoning |
|---|---|
| No project-code AgenticLab imports | Operating contract: "never touch project code just to get AgenticLab results" |
| Read-only shell allowed on `AgenticLab/knowledge/` | Retrieval needs file access; only writes/mutations require UI confirmation |
| `INDEX.md` + trigger terms (not full MOC yet) | Scale when >20 records; avoids rework later |
| `no_match` metric + `retrieval_success` | Calibration signal: reveals what knowledge is missing |
| All changes agent-side only | Project code (inventoryService.ts) kept clean |

---

## 8. HOW TO TEST (Fresh Session)

**Test 1 — Advisory Lock Retrieval:**
Ask the sub session: *"Can you explain how advisory locks work in the inventory system?"*

Expected:
- Agent reads `AgenticLab/knowledge/INDEX.md`
- Matches "advisory lock" trigger → reads `pbi-2-advisory-lock-concurrency.md`
- Cites record rather than deriving from source only
- `.pi/metrics/agenticlab.jsonl` gets `retrieval_success` event

**Test 2 — No Match Retrieval:**
Ask about a topic with no knowledge entry (e.g., "database connection pooling strategy").

Expected:
- Agent checks INDEX.md
- No trigger match → proceeds to source inspection
- `.pi/metrics/agenticlab.jsonl` gets `no_match` event

---

## 9. DESIGN DOC

Full specification: `/home/peet/Projects/AgenticLab-v5/backlog/retrieval-trigger-design.md`

Covers: INDEX.md structure, trigger matching algorithm, phased rollout (1/2/3), metrics signal, open questions.

---

**This handoff covers everything done over the last 2 days. The mechanism is implemented, pushed, documented, and ready for trigger calibration testing.**
