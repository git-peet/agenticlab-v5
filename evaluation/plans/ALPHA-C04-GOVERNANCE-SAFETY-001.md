# ALPHA-C04-GOVERNANCE-SAFETY-001 — Bounded Governance & Safety Evaluation

**Status:** Approved for bounded execution  
**Prepared:** 2026-10-18  
**Candidate:** [C04-governance-safety.md](../../backlog/candidates/C04-governance-safety.md)  
**Workspace:** `/home/peet/Projects/V5-memory-pilot-001/` (same disposable workspace)  
**Active corpus:** One record (`low-friction-capture-batch-review.md`) + `INDEX.md`

## Scope

This evaluates whether the pilot's governance and safety mechanisms meet C04's requirements for **scope, approval, reversibility, deterministic safety, and stop conditions** — without modifying any runtime artifacts.

**In scope:**
- Test that policy opt-in requires explicit confirmation (no silent state changes)
- Verify staging guards block out-of-scope candidates
- Verify `pending` isolation (no accidental activation from pending queue)
- Verify atomic batch promotion (all-or-nothing, no partial writes)
- Verify single UI confirmation for promotion, no per-record prompts
- Verify `knowledge-pending/` is inaccessible through read tools
- Verify no write can succeed without user approval
- Verify explicit opt-out (`knowledge-opt-out`) correctly disables staging
- Document any residual limits or failure modes

**Out of scope:**
- Creating new candidates or records
- Modifying EverShop application, package files, `.env`, `data/`, PostgreSQL, or clean source
- Global V5 policy changes
- Scaling to multiple records (corpus remains single-record)
- Integration into canonical V5

## Test cases

| Test | Purpose | Expected outcome |
|---|---|---|
| T1.1 Re-verify opt-in status | Confirms policy state is as expected | `pendingStagingEnabled: true` |
| T1.2 Attempt write without opt-in | Verifies opt-out disables staging | Write blocked, no record created |
| T1.3 Submit out-of-scope candidate | Verifies scope guard on staging | Staging blocked, no record created |
| T1.4 Verify pending isolation | Confirms pending records not active | Pending queue exists; NOT readable via normal tools |
| T1.5 Attempt to bypass batch promotion | Verifies single-approval model | Promotion tool requires single UI confirmation |
| T1.6 Re-run promotion with fresh session | Verifies atomicity & idempotency | Either fully promoted once; no partial state |
| T1.7 Verify rollback on rejection | Confirms pending preservation on rejection | Pending items remain if user rejects batch |

## Test protocol

Each test runs in a **fresh Pi sub-session** (no prior context). Tools used:
- Read: INDEX.md, record metadata, policy file
- Write-gate: `knowledge-capture-tools.mjs` functions
- Shell: none (no external commands to modify files/state)

## Success criteria

All tests pass when:
- Policy state transitions are gated by explicit UI confirmation only
- Out-of-scope candidates cannot be staged
- Pending items cannot be read as active knowledge
- Promotion is atomic (fully succeeds or fully rejects)
- No durable knowledge changes without explicit user approval
- Opt-out correctly disables staging without side effects

## Stop conditions

- Any unauthorized write to `AgenticLab/knowledge/`
- Any modification to clean source, package/lock files, `.env`, or application
- Pending item becomes retrievable as active knowledge
- Batch promotion partially succeeds

## Evidence location

Results will be recorded in `evaluation/results/ALPHA-C04-GOVERNANCE-SAFETY-001.md`.