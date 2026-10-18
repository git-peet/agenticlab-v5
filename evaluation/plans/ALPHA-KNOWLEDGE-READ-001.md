# ALPHA-KNOWLEDGE-READ-001 — Read Capability Pilot (Separate from Write Pilot)

**Status:** Planned (approved for scope but not yet implemented)
**Prepared:** 2026-10-18
**Related candidates:** [C02 knowledge lifecycle](../../backlog/candidates/C02-knowledge-lifecycle.md), [C03 context/retrieval](../../backlog/candidates/C03-context-engineering.md), [C04 governance](../../backlog/candidates/C04-governance-safety.md), [C09 bounded decision support](../../backlog/candidates/C09-jev-decisions.md)

## Question

Can a delivery workflow correctly retrieve, filter, and navigate approved knowledge across sessions—while respecting scope, privacy, provenance, and human authority—without reading sensitive content or treating pending candidates as active?

This is a bounded design/pilot question, distinct from the write-side ALPHA-KNOWLEDGE-PILOT-001. It will test the read capabilities that were insufficiently validated in the original pilot.

## Context

The ALPHA-KNOWLEDGE-PILOT-001 successfully demonstrated write-side mechanisms (triage → staging → batch promotion) but had limited and procedurally flawed read testing:

- One relevant retrieval worked (citing the low-friction-capture-batch-review record)
- One unrelated retrieval returned "no match" without reading knowledge (not grounded)
- One unrelated recheck read the active corpus but exceeded the metadata-header range before full body read

Thus, the read capability requires a focused, separate pilot to validate index navigation, tool-based searches, scope filtering, and cross-session retrieval patterns.

## Scope

- **Workspace:** `/home/peet/Projects/V5-memory-pilot-001/` (same disposable workspace, separate test runs)
- **Source:** `/home/peet/Projects/clean-evershop-dev/` (user-designated immutable source, read-only)
- **Application scope:** EverShop core for bounded orientation; read capabilities tested via Pi tools against the active knowledge corpus
- **Payload:** AgenticLab V5 source revision `3e779dc31aa581efe07a6426b27767c2a77d4d88`

**Out of scope:** Running EverShop, accessing PostgreSQL, `.env`, root `data/`, full Jest/E2E, global Pi settings, or changing package/lock files. The pilot focuses only on read operations against the approved knowledge corpus.

## Implementation and test sequence

### Phase 1 — Design and scope validation

- Define bounded read testing scope with clear success criteria
- Establish test fixtures with known active knowledge records
- Map expected read tool behaviors (index navigation, scope filtering, sensitive-content checks)
- Ensure no overlap with existing write-pilot active corpus (keep it as-is)

### Phase 2 — Read capability evaluation

- Use fresh Pi sessions to test read tool usage patterns
- Exercise built-in read tools (`grep`, `find`, `read`) against active knowledge
- Validate scope/category/status filtering, search precision, and negative controls
- Document tool-based read performance and edge cases
- Keep all testing within the pilot workspace; do not modify active corpus

### Phase 3 — Cross-session read validation

- Start fresh Pi sessions without prior context
- Provide naturally relevant queries (expect knowledge retrieval)
- Provide unrelated queries (expect no-match or filtered-out results)
- Record tool-based read behaviors, not just prompt responses

## Measures

- **Read precision:** Correct records retrieved vs. total read attempts
- **Read coverage:** Index/tool usage vs. total eligible knowledge corpus
- **Scope filtering:** Irrelevant records correctly excluded
- **Sensitive protection:** No credential/sensitive content exposure during reads
- **Cross-session reliability:** Fresh Pi sessions consistently locate needed knowledge
- **Tool efficiency:** Time/resource usage for read operations

Use synthetic active knowledge records (not live delivery tasks) for focused read testing. The goal is to validate that the read capabilities work correctly within the existing write-pilot active corpus while establishing separate read-only testing boundaries.

## Stop conditions

Stop if the active knowledge corpus cannot be safely read without side effects, if read tools cannot reliably navigate the index and scope filters, or if any sensitive data is inadvertently exposed. Preserve the existing write-pilot state unchanged.

## Expected decision

At completion, decide whether read capabilities are ready for broader integration, need refinement, or should remain a separate concern from the write-side mechanisms. This pilot does not change global V5 rules or establish general memory benefit.