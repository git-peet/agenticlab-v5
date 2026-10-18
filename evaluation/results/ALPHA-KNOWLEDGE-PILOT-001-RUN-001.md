# ALPHA-KNOWLEDGE-PILOT-001 — One-candidate staging, batch promotion, and retrieval

- **Date:** 2026-10-17
- **Status:** Completed as a bounded pilot-path exercise; no claim of general memory benefit
- **Workspace:** `/home/peet/Projects/V5-memory-pilot-001/`
- **Plan:** [`../plans/ALPHA-KNOWLEDGE-PILOT-001.md`](../plans/ALPHA-KNOWLEDGE-PILOT-001.md)
- **Prototype/shadow evidence:** [`ALPHA-KNOWLEDGE-PILOT-001-IMPLEMENTATION.md`](ALPHA-KNOWLEDGE-PILOT-001-IMPLEMENTATION.md), [`ALPHA-KNOWLEDGE-PILOT-001-SHADOW-001.md`](ALPHA-KNOWLEDGE-PILOT-001-SHADOW-001.md)

## Run and approval path

1. The user explicitly confirmed `/knowledge-opt-in` in the pilot workspace. This changed only the pilot-local policy; it did not create a candidate.
2. One non-sensitive candidate was triaged through `triageKnowledgeCandidates` with a `stage` disposition and staged through `stageKnowledgeCandidates`.
3. The user approved the complete one-record preview through the promotion confirmation. `promoteKnowledgeBatch` reported that one record was committed as active and the pending queue was consumed.
4. Current state: active `AgenticLab/knowledge/INDEX.md` and one record exist; `AgenticLab/knowledge-pending/` is absent. The pilot policy remains enabled. No further candidate was staged.

**Tool-registration deviation:** An initial attempt from the long-lived primary Pi (`w7:p1`) stopped because the updated triage tool was not in its active tool set; it made no writes. The authorized run then used the Pi session `w7:p4`, where the pilot extension was loaded. Triage was performed anew there; no review ID or candidate was bypassed.

**Candidate:** `low-friction-capture-batch-review` (`AgenticLab/knowledge/low-friction-capture-batch-review.md`). It records the user's preference to avoid unsustainable per-entry approval prompts while retaining one batch approval before activation. The candidate came from the user's explicit pilot-design decision, not from a synthetic fixture or an EverShop code change; no raw dialogue was persisted.

**Approval burden:** 2 explicit confirmations for 1 promoted record (one workspace opt-in plus one batch promotion); zero per-record confirmations. Review time and active time were not measured.

## Fresh-session retrieval checks

### Relevant query — pass

- **Session:** fresh Pi session `memory-retrieval`, Herdr pane `w7:p5`; started after promotion with no prior candidate conversation.
- **Question:** what user-experience problem motivated the pilot's approval design?
- **Observed reads:** workspace instructions/scope/overview, active `INDEX.md`, then the active record's bounded metadata followed by its body.
- **Outcome:** correctly reported that approving every entry would be unsustainable/interruption-heavy, cited the record path/ID, and distinguished that rationale from the project-scope safeguard. This is direct evidence of a relevant cross-session read in this scripted probe.

### Unrelated query — initial attempt incomplete; fresh recheck pass

- **Initial session:** fresh Pi session `memory-unrelated`, pane `w7:p6`, was asked about approved retry/backoff behavior. It answered “no match” but performed no knowledge reads. Do **not** count that answer as a grounded retrieval pass.
- **Recheck session:** new Pi session `memory-negative-recheck`, pane `w7:p7`, received explicit retrieval-protocol instructions. It read the active index, established that the corpus contained one active project decision record, read that record, and correctly reported no retry/backoff information.
- **Protocol note:** in the recheck, the metadata read extended through line 25 before the full-record read, exceeding the workspace's prescribed metadata-only header range. The record was active and non-sensitive; the negative result is supported, but the read procedure was not perfectly followed.

## Metrics and limits

- **Focused adapter suite:** `node --test AgenticLab/adapters/pi/tests/knowledge-capture.test.mjs` — 20 passed, 0 failed (run before this live transaction; no code changed afterward).
- **Pi footer-reported session costs:** relevant retrieval `$0.002`; initial ungrounded negative attempt `$0.001`; grounded negative recheck `$0.001`. These are per-session UI estimates, not invoices. The staging/promotion session displayed `$0.008`, but it also included earlier synthetic shadow activity; do not attribute that total to the live transaction alone. Active time unavailable.
- **Shadow triage:** the separate 12-case synthetic run matched its authored reference labels 12/12; see the shadow result. This is one exploratory sample, not an accuracy estimate.
- **Plan deviation:** the staged candidate came from a real user decision in the pilot-design workflow, not an EverShop feature-delivery task. This exercises the actual opt-in/stage/batch/retrieval path, but does not establish capture quality during software implementation work.
- The clean EverShop source, application files, package/lock files, `.env`, root `data/`, databases, and global V5 policy were not modified or used. No dependencies were installed.

## Interpretation

The bounded path worked end to end for one user-directed candidate: opt-in → advisory triage → isolated pending staging → one approved atomic promotion → relevant fresh-session retrieval. The unrelated probe produced a grounded no-match only on its explicit recheck. The run demonstrates feasibility for this workspace and these cases; it does not establish Jev-style triage quality, general usefulness, or a causal delivery-performance benefit. The opt-in remains enabled in the pilot workspace; no additional candidate should be staged without a new bounded task and the applicable user authorization.