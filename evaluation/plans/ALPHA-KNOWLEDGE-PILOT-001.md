# ALPHA-KNOWLEDGE-PILOT-001 — Low-friction capture and cross-session recall

**Status:** One bounded end-to-end pilot loop completed for a user-directed pilot decision; see [`../results/ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md`](../results/ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md). This does not establish general memory benefit or capture quality during EverShop feature delivery.  
**Prepared:** 2026-10-17  
**Related candidates:** [C02 knowledge lifecycle](../../backlog/candidates/C02-knowledge-lifecycle.md), [C03 context/retrieval](../../backlog/candidates/C03-context-engineering.md), [C04 governance](../../backlog/candidates/C04-governance-safety.md), [C09 bounded decision support](../../backlog/candidates/C09-jev-decisions.md)

## Question

Can a delivery workflow capture useful, source-linked learning without prompting the user for every candidate, use Jev-inspired review to reduce noise, and make approved knowledge available in a fresh session—while keeping scope, privacy, provenance, and human authority intact?

This is a bounded design/pilot question, not evidence that Jev should become a universal classifier or that V5 memory improves delivery generally.

## Current-state baseline

- V5's current operating/knowledge contracts require explicit user confirmation for durable knowledge changes. The Pi adapter asks per supported `write`/`edit` tool call under `AgenticLab/knowledge`; record plus index can require multiple prompts.
- `/plan` and `/implement` allow a task-local candidate-learning handoff, but explicitly prohibit automatic durable persistence.
- The archived PBI 2 Alpha workspaces had no `AgenticLab/knowledge/INDEX.md` or record corpus; those PBIs did not test cross-session knowledge.
- A separate Python-host trial saved and retrieved one approved date-format decision. It is a narrow positive path check; utility and general reliability remain unproven.
- The user reports V4 delivery workflows were a major knowledge source. Existing C02 notes an earlier approximate provenance estimate; denominators differ and neither is a measured rate. The pilot will label candidate origin (delivery phase, explicit user decision, source-derived, etc.) rather than assume a proportion.

## Approved pilot policy

The user approved this first target: a one-time workspace opt-in to automatic staging of eligible knowledge candidates, followed by one batch review/promotion step. This is experimental workspace policy only, not a global V5 default.

1. **Capture transiently without per-candidate prompts.** At meaningful workflow boundaries, maintain a small task-local ledger with claim, applicability scope, source/evidence, uncertainty, and likely future value. Do not store raw dialogue.
2. **Use Jev-inspired review in shadow/advisory mode.** For each candidate, recommend one of: `stage`, `transient`, `merge`, `needs-evidence`, `unsafe/out-of-scope`, or `abstain`; include concise rationale and evidence references. Jev does not write, approve, activate, delete, or suppress a required safety check.
3. **Opt-in pending staging.** After a one-time workspace-level opt-in, eligible candidates may be written to a separate `pending` inbox as `candidate` records. Pending records are not active knowledge and are not automatically retrieved as accepted facts. Deterministic scope/sensitive-data rules can block staging. If the policy/evaluator is unavailable or uncertain, leave the item transient.
4. **One batch promotion review.** At workflow end, present a consolidated preview and allow one user decision for the batch. Only approved items become active. This replaces per-file prompts for the experimental path; ordinary `write`/`edit` calls remain gated. A batch must be atomic or fail without partial promotion.
5. **Defer auto-activation.** Do not let Jev confidence or shadow-mode scores activate durable knowledge. Automatic promotion would require a separate policy decision after sufficient evidence.

This policy is approved for the bounded pilot only. It does not change the general V5 rule; no auto-active promotion or Jev write authority is included.

## Scope and workspace

- **Source:** `/home/peet/Projects/clean-evershop-dev/`, user-designated immutable source copy. Read/copy only; never modify, install into, rename, or delete it.
- **Proposed destination:** `/home/peet/Projects/V5-memory-pilot-001/` (must be absent before creation). All setup, fixtures, and experimental changes belong in the destination.
- **Payload:** use a reviewed, recorded AgenticLab V5 source revision selected during preflight; current candidate is `3e779dc31aa581efe07a6426b27767c2a77d4d88`. Confirm payload files before copying.
- **Out of scope:** running EverShop, accessing PostgreSQL, `.env`, root `data/`, full Jest/E2E, external Jev API/service, global Pi settings, automatic retention from raw transcripts, or changing the immutable source copy.
- Use synthetic/non-sensitive candidate examples and a static isolated harness. Any dependency setup requires separate approval and remains under `/tmp`; no project package/lock changes.

## Implementation and test sequence

The independent read-only design review found the existing gate could not enforce pending isolation or perform an atomic batch promotion. The user approved the pilot-local tool boundary in [`amendment-001`](ALPHA-KNOWLEDGE-PILOT-001-amendment-001.md); the prototype is implemented only in this disposable workspace.

### Phase 1 — Design and adapter preflight

- Use the approved candidate schema, pending-vs-active lifecycle, one-time workspace opt-in, one batch review/promotion, and deterministic sensitive/scope blocks.
- Map the batch operation to the current Pi adapter. The existing adapter confirms individual file writes; do not bypass it. Implement a bounded, fully previewable batch path or stop and return the blocker rather than silently issuing multiple approvals or partial writes.
- Before code changes, verify the new workspace payload/source revision and confirm no existing knowledge data is being overwritten.

### Phase 2 — Synthetic shadow evaluation

- Prepare a small labeled fixture (target 10–12 examples) spanning useful explicit decisions, source-derivable facts, one-off observations, duplicates, outdated/contradictory claims, missing evidence, wrong scope, and synthetic sensitive/credential-shaped content.
- Run Jev-style triage without writes or effects on retrieval. Compare its recommendations with a human-reviewed label set. Confirm abstention and deterministic blocks. Do not use live session transcripts as the fixture.
- **Completed:** The first free-form shadow output was malformed and unscorable. A second run used `triageKnowledgeCandidates` with a strict schema and produced valid dispositions for all 12 synthetic cases, matching the reference labels 12/12. No files were written and policy remained disabled; this is one exploratory sample, not a quality estimate. See [`../results/ALPHA-KNOWLEDGE-PILOT-001-SHADOW-001.md`](../results/ALPHA-KNOWLEDGE-PILOT-001-SHADOW-001.md).

### Phase 3 — Opt-in staged workflow (completed with scope deviation)

- The user explicitly enabled the pilot workspace opt-in. One non-sensitive, real user-decision candidate from the pilot-design workflow was triaged, staged as pending, and shown in a complete one-record batch preview.
- The user approved the batch; promotion committed one active record and consumed the pending queue. There were two explicit confirmations total (one workspace opt-in and one batch promotion) and zero per-record confirmations; review time was not measured.
- **Deviation:** this was a user decision from the pilot-design workflow, not an EverShop feature-delivery task. It exercises the capture transaction and retrieval path, but not knowledge generation during application implementation. See [`../results/ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md`](../results/ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md).

### Phase 4 — Fresh-session retrieval check (completed as scripted probes)

- A fresh Pi session read the active index and promoted record, correctly answered the relevant question about the user-experience rationale, and cited the stable record path.
- A first unrelated-query attempt answered no-match without consulting knowledge and is not counted as grounded. A separate fresh recheck inspected the one-record active corpus and correctly returned no-match for retry/backoff behavior. Its metadata-header read exceeded the prescribed header-only range before reading the full record; this process deviation is recorded.
- These were scripted retrieval probes rather than natural delivery tasks. See [`../results/ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md`](../results/ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md).

## Measures

- Candidate quality: recall of human-labeled useful items, precision of staged/reviewed items, duplicate/merge rate, unsupported-claim rate, and abstentions.
- User burden: number of confirmations per workflow/decision, batch size, review time, and user corrections/rejections.
- Safety: wrong-scope staging/read, sensitive-content staging, unauthorized activation, partial transaction, and unreviewed pending items appearing as active. Safety violations are stop conditions, not acceptable trade-offs.
- Cross-session read: actual index/record reads, relevant vs. irrelevant activation, current-source verification, decision correctness, and user-rated utility.
- Cost: command attempts, elapsed run window vs. active time, and Pi usage if a clean run-specific window is available. Keep coordinator and delivery metrics separate; mark unavailable values honestly.

Use 10–12 synthetic shadow cases and one bounded cross-session pilot. This is an exploratory feasibility run, so report candidate precision/recall descriptively rather than claiming a general quality threshold. Hard acceptance gates are: zero out-of-scope or sensitive content staged; zero pending candidate treated as active; zero active promotion without the single batch approval; and no partial batch writes. Stop immediately on any safety-gate failure. Record user confirmations per workflow and whether the batch design reduces per-entry prompts.

## Stop conditions

Stop if the clean source identity or payload revision is unclear; the source copy would need modification; the gate cannot safely isolate pending staging from active knowledge; sensitive/scope filtering is uncertain; the batch preview is incomplete; any unauthorized write/read occurs; or required dependencies are absent without separate setup approval. Preserve current user authority and the no-app/database boundary.

## Expected decision

At completion, decide whether to (a) retain the current strict per-write gate, (b) adopt opt-in pending staging plus one batch promotion approval, (c) consider narrowly scoped auto-promotion under a separate policy, or (d) defer Jev and improve manual workflow capture. One small pilot informs that decision; it does not establish general V5 memory benefit.
