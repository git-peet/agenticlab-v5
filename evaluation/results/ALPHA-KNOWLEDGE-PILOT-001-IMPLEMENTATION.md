# ALPHA-KNOWLEDGE-PILOT-001 — Pilot-local adapter prototype and shadow triage

- **Status:** Prototype, synthetic shadow phase, and one bounded live staging/promotion/retrieval loop complete; see [`ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md`](ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md).
- **Plan:** [`../plans/ALPHA-KNOWLEDGE-PILOT-001.md`](../plans/ALPHA-KNOWLEDGE-PILOT-001.md)
- **Implementation amendment:** [`../plans/ALPHA-KNOWLEDGE-PILOT-001-amendment-001.md`](../plans/ALPHA-KNOWLEDGE-PILOT-001-amendment-001.md)
- **Workspace:** `/home/peet/Projects/V5-memory-pilot-001/`
- **Immutable source:** `/home/peet/Projects/clean-evershop-dev/` (not modified)
- **AgenticLab payload:** `3e779dc31aa581efe07a6426b27767c2a77d4d88`

## Implemented in the disposable workspace

- Default-off `AgenticLab/knowledge-capture-policy.json` and explicit `/knowledge-opt-in` / `/knowledge-opt-out` commands.
- Structured `triageKnowledgeCandidates` tool; accepted reviews are ephemeral and expire in memory.
- `stageKnowledgeCandidates` stages only candidates with a valid triage review ID, and only while opt-in is enabled.
- `promoteKnowledgeBatch` gives one complete UI preview/confirmation and publishes one initial active knowledge tree atomically. Rejection leaves active knowledge unchanged.
- The pilot write gate blocks ordinary built-in file access and shell references to pending candidates and protects policy/commit-marker files. Ordinary writes to active knowledge retain the existing per-operation confirmation.
- Pilot-local `/implement` prompt maintains a source-linked transient candidate ledger, asks for Jev-style advisory dispositions, stages only under opt-in, and never opts in automatically.
- Synthetic adapter tests are under `AgenticLab/adapters/pi/tests/`.

**Prototype paths:** `AgenticLab/adapters/pi/knowledge-capture-core.mjs`, `knowledge-capture-tools.mjs`, `knowledge-write-policy.mjs`, `knowledge-write-gate.mjs`, `knowledge-write-gate.ts`, `AgenticLab/adapters/pi/tests/knowledge-capture.test.mjs`, `AgenticLab/AGENTS.md`, and `AgenticLab/prompts/delivery/implement.md`. In the later user-approved run, the policy was enabled, one active `knowledge/INDEX.md` plus one record were created through batch promotion, and the pending queue was consumed. See RUN-001 for the transaction and retrieval evidence.

## Verification and data collected

- **Focused test command:** `node --test AgenticLab/adapters/pi/tests/knowledge-capture.test.mjs`
- **Final result:** exit 0; **20 tests passed, 0 failed** (synthetic temporary workspaces; no install required)
- **Shadow triage:** one fresh Pi session called `triageKnowledgeCandidates` on 12 synthetic cases. The schema validated all 12 decisions and the dispositions matched the authored reference labels **12/12**. No file was read or changed, no pending candidate was staged, and workspace policy remained disabled. See [`ALPHA-KNOWLEDGE-PILOT-001-SHADOW-001.md`](ALPHA-KNOWLEDGE-PILOT-001-SHADOW-001.md).
- **Earlier shadow attempt:** a free-form JSON prompt produced malformed/incomplete output and was not scored; the typed triage tool was then used.
- **Pi usage/cost/active time:** implementation and staging/promotion are mixed with prior review/shadow work; the latter session displayed `$0.008` but is not attributable to the live transaction alone. The separate retrieval-session footer costs are recorded in RUN-001; active time was unavailable.
- No app/server, PostgreSQL, `.env`, root `data/`, full Jest/E2E, external Jev API, network service, dependency install, or package/lock change occurred.

## Independent review and residual limits

Separate read-only Pi reviews found no critical issue. Remaining limits: shell path blocking is lexical/best-effort, not an OS sandbox; concurrent external filesystem writers are not covered by the adapter lock; a crash between active-root rename and commit-marker write can require manual recovery; and the credential scanner is a pattern-based defense, not a guarantee. The live transaction and fresh-session retrieval did exercise the stage/promotion path and retrieval for one candidate; see RUN-001 for the bounded outcomes and the negative-probe protocol deviation.

## Current state and next gate

The one-candidate pilot loop has been exercised. Workspace opt-in remains enabled; the one approved batch is active and the pending queue was consumed. No raw session text was persisted. Do not stage more candidates without a new bounded task and applicable user authorization. The next decision is whether to retain the pilot workspace as-is or explicitly opt out before any future work. This experiment does not change global V5 rules or establish general memory benefit.