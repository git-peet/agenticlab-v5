# ALPHA-C03-CONTEXT-RETRIEVAL-001 — Bounded Context Retrieval Evaluation

**Status:** Approved for bounded execution  
**Prepared:** 2026-10-18  
**Related candidate:** [C03 context-engineering](../../backlog/candidates/C03-context-engineering.md)  
**Workspace:** `/home/peet/Projects/V5-memory-pilot-001/` (same disposable workspace)  
**Active corpus:** `AgenticLab/knowledge/` — one record: `low-friction-capture-batch-review` (decision, active, project:ALPHA-KNOWLEDGE-PILOT-001)  
**Parent pilot:** ALPHA-KNOWLEDGE-PILOT-001 (write) + ALPHA-KNOWLEDGE-READ-001 (read)

## Scope

This is a focused retrieval evaluation against the existing active knowledge corpus. It does not modify the corpus, the policy, or any application/source files. It uses fresh Pi sessions to test the context assembly model and retrieval outcomes defined in C03.

**Out of scope:** Running EverShop, accessing PostgreSQL, `.env`, root `data/`, full Jest/E2E, global Pi settings, package/lock changes, or modifying active knowledge. No new candidates will be staged.

## Evaluation questions (from C03)

1. **Scope filtering:** Does the agent correctly filter by `project:ALPHA-KNOWLEDGE-PILOT-001` and reject out-of-scope queries?
2. **Category/status filtering:** Does it correctly filter by `category: decision` and `status: active`?
3. **Retrieval outcome vocabulary:** Does it distinguish `applicable`, `no match`, `filtered`, `unavailable`?
4. **Index/MOC route:** Does it navigate INDEX.md → metadata → full body appropriately?
5. **Context sufficiency:** Does it load only what's needed for the next decision?

## Test cases

### Relevant retrieval (applicable)
- **Query:** "What user-experience problem motivated the pilot's approval design?"
- **Expected:** Reads INDEX.md → finds low-friction-capture-batch-review → reads metadata → reads body → answers with citation
- **Outcome type:** `applicable`

### Unrelated retrieval (no match)
- **Query:** "What retry/backoff behavior was approved for the pilot workflow?"
- **Expected:** Reads INDEX.md → identifies one record → reads it → confirms no retry/backoff info → returns `no match`
- **Outcome type:** `no match`

### Out-of-scope retrieval (filtered)
- **Query:** "What are the EverShop product image viewer requirements?"
- **Expected:** Reads INDEX.md → sees scope is project:ALPHA-KNOWLEDGE-PILOT-001 → correctly rejects as out-of-scope → returns `filtered` with reason
- **Outcome type:** `filtered`

### Stale/superseded filtering (not applicable here — no superseded records)
- Not tested in this evaluation (requires multiple records with lifecycle states)

### Cross-session baseline
- All tests use fresh Pi sessions (no prior conversation context)
- Compare against earlier read-pilot results to confirm consistency

## Sessions to create

| Session | Purpose | Test cases |
|---|---|---|
| `c03-relevant` | Relevant retrieval | Test case 1 |
| `c03-unrelated` | Unrelated retrieval | Test case 2 |
| `c03-out-of-scope` | Out-of-scope filtering | Test case 3 |

## Success criteria

- Each test uses a fresh Pi session with only the workspace instructions + active knowledge available
- Retrieval outcomes use C03 vocabulary (`applicable`, `no match`, `filtered`)
- No knowledge writes or staging invoked
- Safety: no protected data reads, no app/db access

## Stop conditions

- Any attempt to modify active knowledge
- Any access to `.env`, `data/`, PostgreSQL, or EverShop application
- Retrieval returns wrong outcome type

## Evidence location

Results will be recorded in `evaluation/results/ALPHA-C03-CONTEXT-RETRIEVAL-001.md`.