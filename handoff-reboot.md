### V5-20261021-006 — Knowledge Retrieval Mechanism Confirmed (Phase 2)

- **Recorded:** 2026-10-21  
- **Type:** Mechanism verification  
- **Status:** Complete; verified in delivery, canonical, and payload workspaces  
- **Context:** Follows V5-20261021-004 (mechanism complete) and V5-20261021-005 (Herdr sub-session access)  
- **Context:** The Phase 2 hard-trigger hook (`knowledge-write-gate.mjs`) is operational. It blocks `read`/`grep`/`find` on topics matching `INDEX.md` trigger terms, forcing `readKnowledgeRecords` first. The agent self-corrects by calling `readKnowledgeRecords`, producing `retrieval_success` events (7 observed in delivery workspace).  

- **Phase 3 (C02 MOC/Index Design):**  
  - ✅ **Index structure**: `AgenticLab/knowledge/INDEX.md` (root) → `knowledge/<domain>/INDEX.md` (topic MOCs)  
  - **Domain naming**: `concurrency-control/` (matches record `category: concurrency-control`, not `concurrency/`)  
  - **File naming**: `pbi-2-advisory-lock-concurrency.md` (PBI-derived, descriptive, preserves provenance)  
  - **Promotion pipeline**: `candidate` → `active` via `promoteKnowledgeBatch` (emits `decision_knowledge` metric)  
  - **Completeness guard**: `INDEX.md` lists all `status: active` records; `readKnowledgeRecords` with empty query verifies completeness  
  - **Metrics**: `retrieval_success`, `no_match`, `candidate_staged`, `decision_knowledge`, `knowledge_superseded`, `knowledge_corrected`  
  - **Portability**: `classifyKnowledgeReadTrigger` uses `INDEX.md` trigger terms; no changes needed for nested topic MOCs  

### **Phase 3 — Knowledge-Lifecycle Design (C02)**  
*Status: Candidate — not yet implemented*  

**Design principles (from `C02-knowledge-lifecycle.md`):**  
1. Distinguish transient vs. durable knowledge  
2. Define lifecycle states (candidate → active → inactive → stale → contradicted)  
3. Preserve source/provenance, scope, evidence, and uncertainty  
4. Agent-triggered knowledge must be reviewed before durable status  
5. `INDEX.md` is a navigation aid, not duplicate truth  

### **Phase 3 Design Plan**  

#### **Step 1: Topic MOC Structure**  
Create domain-specific `INDEX.md` files (e.g., `concurrency-control/INDEX.md`) when record count exceeds ~20. Each topic MOC:  
- Contains a table of active records (id, title, trigger terms, status)  
- Routes to atomic record files (e.g., `pbi-2-advisory-lock-concurrency.md`)  
- Uses same trigger-term format as root `INDEX.md`  

#### **Step 2: Promotion Pipeline**  
- **Candidate staging**: `AgenticLab/knowledge/_candidates/<domain>/` (non-durable, task-local)  
- **Promotion**: `promoteKnowledgeBatch` tool → user approval → `decision_knowledge` metric  
- **Gating**: `classifyKnowledgeMutation` + `captureTransactionLocked`  

### **Next Step**  
Draft the `concurrency-control/INDEX.md` template to validate the structure before generalizing to other domains. Use the existing `pbi-2-advisory-lock-concurrency.md` record as the first entry.