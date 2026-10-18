# ALPHA-KNOWLEDGE-PILOT-001-SHADOW-001 — Synthetic Jev-style candidate triage

- **Status:** Completed in shadow mode; no candidate staged or promoted
- **Plan:** [`../plans/ALPHA-KNOWLEDGE-PILOT-001.md`](../plans/ALPHA-KNOWLEDGE-PILOT-001.md) and [`../plans/ALPHA-KNOWLEDGE-PILOT-001-amendment-001.md`](../plans/ALPHA-KNOWLEDGE-PILOT-001-amendment-001.md)
- **Fixture:** [`../fixtures/ALPHA-KNOWLEDGE-PILOT-001-shadow-v2.md`](../fixtures/ALPHA-KNOWLEDGE-PILOT-001-shadow-v2.md)
- **Workspace:** `/home/peet/Projects/V5-memory-pilot-001/`

## Method

A fresh Pi session (`knowledge-shadow`) received 12 synthetic candidate observations and invoked `triageKnowledgeCandidates` once. The tool validated exact candidate/decision coverage and returned an ephemeral in-memory review ID. The workspace opt-in remained disabled; the tool did not stage or promote anything. No files were read or changed by the shadow evaluation.

A prior free-form JSON request (v1 fixture) returned malformed/incomplete output and was not scored. Version 2 used the typed tool and withheld the expected labels from the evaluator. The reference labels are authored in the fixture for this exploratory check; they were not independently calibrated.

## Results

- Candidate cases: **12**
- Valid structured decisions: **12/12** (the extension schema accepted the complete result)
- Agreement with the fixture's reference labels: **12/12**
- Dispositions: 2 `stage`, 3 `transient`, 1 `merge`, 2 `needs-evidence`, 3 `unsafe/out-of-scope`, 1 `abstain`
- Persistent writes, staging, promotion: **none**; `pendingStagingEnabled` remains `false`
- Runtime: Pi 1.3.0, OpenRouter custom / `gpt-6-luna` as shown in the Herdr pane
- Per-run token/cost/active-time metrics: **unavailable**; no isolated coordinator window was recorded

## Interpretation and limits

The typed triage tool produced complete, parseable output where the earlier free-form JSON attempt failed. This verifies the structured output path and the ability to exercise Jev-style dispositions in shadow mode. The 12/12 agreement is only one small, synthetic, model-authored sample with an uncalibrated reference set; it is **not** a reliable precision/recall estimate, proof of real-task capture quality, or evidence that stored knowledge improves delivery.

No actual candidate has been staged. The next gate is an explicit one-time workspace opt-in. If enabled, pending candidates remain inactive; promotion still requires one batch confirmation. A separate real cross-session retrieval check is still outstanding.

## Data handling

Only synthetic candidate cases and aggregate dispositions are recorded. No raw transcript, session ID, credential, project source body, or full tool payload is copied here. The reviewer/triage session wrote no project knowledge.