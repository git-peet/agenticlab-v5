# RETRIEVAL-AB-001 — Result

- **Date:** 2026-11-27
- **Workspace:** `/home/peet/Projects/AlphaProject`
- **Payload:** published `50290a9` (no staged C13 changes active in these sessions)
- **Model:** `deepseek-v4.1-flash`
- **Mode:** read-only, no workflows

## Design

Two fresh Pi sessions received one read-only brief each with the same four topic areas:

- **Control (session `...a355`):** ordinary engineering-review wording; no mention of prior knowledge.
- **Candidate (session `...a43a`):** wording included “Use prior project experience when it could help” and “distinguish prior project notes from current source.”

Neither prompt named `readKnowledgeRecords`, `INDEX.md`, record IDs, or the knowledge store.

## Results

| Condition | Retrieval calls | Applicable | `no_match` | Tool calls | Span | Tokens | Cost |
|---|---:|---:|---:|---:|---:|---:|---:|
| Control | 4 | 4 | 0 | 27 | 84 s | 430,808 | $0.0112 |
| Candidate | 6 | 6 | 0 | 27 | 76 s | 396,263 | $0.0103 |

Query examples were short topic phrases in both conditions:

- `Playwright disposable database port`
- `frontend API client regeneration`
- `FastAPI validation error 422 response model`
- `triage client boundary provider`

The candidate condition added two follow-up queries (`generate-client normalizes trailing whitespace`, `Playwright alternate port VITE_API_URL FRONTEND_HOST CORS e2e`), both applicable.

Both final answers were grounded in retrieved records and current source. Neither guessed.

## Interpretation

Supported:

- Natural task framing triggers scoped retrieval without explicit tool instruction in both conditions.
- First-query success was effectively 100% for the four main topics in both sessions.
- Query-shape guidance baked into the payload was not required for short topic phrases here; the model naturally used them.
- The memory-oriented candidate wording produced two extra applicable lookups, not fewer. It did not improve efficiency.

Not established:

- That users must say “use prior project experience” for retrieval to activate; the plain control also retrieved.
- That C13 Level 1 adds benefit; these sessions ran on published payload `50290a9`, not staged C13.
- Behavior under ambiguous topics with no matching records.

## Decision

Retrieval activation works well when task questions map to existing record topics. R1/R2's high `no_match` counts came from broader, composite queries during implementation, not from natural topic-framed questions.

C13 remains unproven and unpublished. The next useful experiment, if any, should use ambiguous or multi-topic questions rather than clean single-topic ones. This probe should not be used to justify a payload change.
