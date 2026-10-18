# Alpha Knowledge-Capture Pilot Checkpoint — Write & Read Verification

- **Checkpoint:** `ALPHA-20261018-KNOWLEDGE-PILOT`
- **Recorded:** 2026-10-18
- **Workspace:** `/home/peet/Projects/V5-memory-pilot-001/` (disposable EverShop copy)
- **Purpose:** Record the bounded pilot results for low-friction knowledge capture (write) and retrieval (read) in a controlled experiment.

## Checkpoint statement

The ALPHA-KNOWLEDGE-PILOT-001 write pilot and ALPHA-KNOWLEDGE-READ-001 read pilot both passed their bounded test criteria in a disposable pilot workspace. This supports a **feasibility claim**: a one-time workspace opt-in, advisory triage, pending staging, single batch promotion, and cross-session retrieval can be implemented and exercised without violating scope, privacy, or authority boundaries. It does **not** demonstrate general memory benefit, scalability, or readiness for canonical V5 integration.

## Pilot scope and boundary

| Element | Setting |
|---|---|
| Source copy | `/home/peet/Projects/clean-evershop-dev/` (immutable, never modified) |
| Pilot workspace | `/home/peet/Projects/V5-memory-pilot-001/` (disposable, AgenticLab payload rev `3e779dc31aa581efe07a6426b27767c2a77d4d88`) |
| Policy | `knowledge-capture-policy.json` enabled; `pendingStagingEnabled: true` |
| Active corpus | One record: `low-friction-capture-batch-review` (decision, active) |
| Pending queue | Absent (consumed after promotion) |
| Canonical V5 | Unchanged (`/home/peet/Projects/AgenticLab-v5/`) |

## Write pilot results (ALPHA-KNOWLEDGE-PILOT-001)

| Phase | Result | Evidence |
|---|---|---|
| Adapter tests | 20/20 passed | `node --test AgenticLab/adapters/pi/tests/knowledge-capture.test.mjs` |
| Synthetic shadow triage | 12/12 matched authored labels | One exploratory run; not a quality estimate |
| Opt-in + batch promotion | 1 candidate promoted | Two explicit confirmations (opt-in + batch), zero per-candidate prompts |
| Relevant retrieval | Pass (grounded) | Fresh Pi read active index/record, cited correct path/ID |
| Unrelated retrieval | First pass ungrounded; recheck grounded | Recheck read index/record and correctly returned no-match |

**Approvals:** User approved one-time opt-in and one batch promotion. No further candidates staged.

**Safety:** No out-of-scope staging, no sensitive content staged, no unauthorized activation, no partial batch writes. Policy file unchanged; `knowledge-pending/` absent.

## Read pilot results (ALPHA-KNOWLEDGE-READ-001)

| Test | Result | Notes |
|---|---|---|
| Relevant retrieval | Pass (grounded) | Read INDEX.md + record; cited `low-friction-capture-batch-review` |
| Unrelated (initial) | Fail (ungrounded) | Answered no-match without reading knowledge corpus |
| Unrelated (revised) | Pass (grounded) | Read INDEX.md, inspected record, returned no-match for retry/backoff |
| Tool-based corpus check | Pass | Verified index access, record status, pending isolation, no app/db access |

**Protocol deviation:** Metadata-header read exceeded prescribed range in recheck; recorded.

## Measures and limits

- **Corpus size:** Single active record — no scale or precision claims.
- **Session costs (UI footers):** `$0.002`–`$0.003` per fresh session; staging session mixed with prior shadow work (`$0.008` total, not attributable). Active time unavailable.
- **Synthetic shadow:** 12/12 match with authored labels — one exploratory sample, not an accuracy estimate.
- **No application/database/package changes.** Clean source untouched.
- **Residual limits:** Shell blocking is best-effort; credential scanning heuristic; external filesystem races not covered; crash between rename/marker may need manual recovery.

## Evidence location

| File | Purpose |
|---|---|
| `results/ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md` | Write pilot end-to-end run and retrieval |
| `results/ALPHA-KNOWLEDGE-READ-001-RUN-001.md` | Read pilot tool-based verification |
| `results/ALPHA-KNOWLEDGE-PILOT-001-IMPLEMENTATION.md` | Adapter implementation and shadow results |
| `results/ALPHA-KNOWLEDGE-PILOT-001-SHADOW-001.md` | Synthetic triage 12/12 |
| `plans/ALPHA-KNOWLEDGE-PILOT-001.md` | Original write-pilot plan (updated) |
| `plans/ALPHA-KNOWLEDGE-READ-001.md` | Read-pilot plan |
| `DEV-LOG.md` | V5-20261018-234, -235, -236 entries |

## Next decision

Both pilots are **bounded experiments** — not integration candidates. If broader knowledge-memory capability is desired, a new scoped proposal must be approved with:
1. Expanded corpus testing (multiple records, categories, scopes)
2. Scale and performance validation
3. Hardened safety guarantees (beyond best-effort shell/credential checks)
4. Fresh-session retrieval under natural delivery-task conditions (not scripted probes)
5. Comparison baseline or controlled evaluation design

The current V5.2 roadmap (`V5.2-roadmap.md`) remains the working product direction; this checkpoint provides one feasibility data point for the "Knowledge lifecycle" concern in that roadmap.