# V52-C13 — Bounded knowledge query shaping and retrieval preflight

**Status:** `candidate` — evidence-backed, not selected for design or implementation.

**Implementation readiness:** **Not ready for a general retrieval subsystem.** R1 provides a repeated, concrete query-shape problem. The smallest response is prompt/record guidance; a bounded retrieval preflight is a possible escalation. A context-policy engine, semantic ranking service, Codemode enablement, Jev decision layer, and semantic cache are not selected.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C03 context engineering](C03-context-engineering.md), [C02 knowledge lifecycle](C02-knowledge-lifecycle.md), [C05 evaluation](C05-continuity-observability.md), [C12 Codemode](C12-codemode-orchestration.md)

## Problem / value hypothesis

AgenticLab now retrieves project knowledge during ordinary default work, but retrieval quality is limited by query shape.

In `ALPHA-DELIVERY-R1` (paid-model subset PBI 2–5, 7–9):

- 33 `readKnowledgeRecords` calls;
- 13 returned an applicable record;
- 20 returned complete `no_match`;
- long, compound natural-language queries often failed;
- shorter title-like phrases or exact IDs usually succeeded;
- PBI 9 showed good deduplication: an existing record was retrieved and no duplicate was staged.

The issue is not simply “retrieval does not work” and not simply “records are bad.” Activation works, records can materially affect work, and many `no_match` results were correct because no matching record existed yet. The repeated failure mode is that the agent spends calls guessing with broad queries before finding a useful short phrase or exact ID.

**Hypothesis:** a small amount of query-shape guidance, plus record-writing guidance and possibly a bounded retrieval preflight, can reduce wasted lookups and make retrieved knowledge more consistently useful without adding a general context engine.

## Source lineage and inherited action points

This candidate does not invent a new subsystem. It extracts the useful parts of several existing candidates.

### From C03 / C03.1 / C03.2 — context engineering

- Project knowledge should be included when the task could benefit, not unconditionally.
- A complete `no_match` is a valid outcome; it must not be treated as retrieval failure.
- The sufficiency/stop rule should prevent repeated low-value querying.
- C03.2 explicitly says to prefer native tools and concise guidance unless evidence shows they are insufficient.
- The broader context-policy engine, workload classifier, and token-budget planner remain unselected.

### From C02 — knowledge lifecycle

- Records need clear scope, status, provenance, and effective lifecycle state.
- Worked examples transfer conventions better than prose alone.
- Titles/claims should contain searchable, concrete phrases.
- Deduplication before staging is already part of the lifecycle and worked in PBI 9.
- Retrieval outcome vocabulary (`applicable`, `no_match`, `filtered`, `unavailable`) remains the contract.

### From C05 — evaluation and calibration

- Do not add always-on telemetry.
- Compare named questions with preregistered measures.
- Keep raw local traces local; publish interpreted, content-free results.
- Use R1 as the baseline and R2 as the comparison.

### From C12 — Codemode orchestration

The useful core of C12 is **not Codemode itself**. It is the bounded retrieval sequence:

```text
enumerate active records
  → inspect bounded metadata
  → filter by scope/status/category
  → search only eligible bodies
  → return compact IDs/snippets to the model
```

If implemented later, this sequence could run as a direct helper or as an optional Codemode-orchestrated operation. Codemode enablement, nested-gate behavior, availability, partial-failure handling, and direct-tool fallback would all need separate approval and testing. C12 is not being selected by C13.

## V5-shaped concept

### Mechanism ladder

Use the smallest mechanism that solves the repeated problem.

1. **Prompt query-shape guidance**
   - Use an exact ID when known.
   - Otherwise use a short topic phrase with a few substantive terms.
   - Do not send a long natural-language question as a query.
   - Split distinct topics into separate queries.
   - Avoid `scope`/`category` filters unless explicitly established.
   - After one complete `no_match`, proceed with current source and capture a reusable finding if warranted; do not keep rephrasing unless a specific plausible record surfaced.

2. **Record-writing guidance**
   - Titles and claims should include concrete phrases likely to be searched.
   - Convention and output-format records should include one worked example.
   - Keep evidence separate from claim; evidence may quote paths that claim text should avoid.

3. **Bounded retrieval preflight**
   - A deterministic sequence that inventories eligible records, filters metadata first, searches only eligible bodies, and returns compact IDs/snippets.
   - Must preserve scope/status filtering and retrieval outcome vocabulary.
   - Must not expose excluded record body snippets.
   - Direct-tool implementation is preferred before any runtime capability change.

4. **Optional Codemode A/B**
   - Only if a preflight would otherwise require many serial tool calls or produce large irrelevant outputs.
   - Must verify nested gate behavior, fallback, and cost against direct tools.

### Product boundary

This is a knowledge-use improvement, not a new authority source. Retrieved records remain evidence, not instructions. The user's task and the workspace contract still define scope.

## Non-goals

- No general context-policy engine.
- No automatic workload classification or context planner.
- No semantic ranker, embeddings, external vector store, or semantic cache.
- No Jev decision layer; C09 remains separate.
- No automatic knowledge activation beyond existing scoped retrieval guidance.
- No Codemode enablement or runtime change without a separate approval.
- No changes to human promotion/confirmation gates.
- No payload change authorized by this candidate.

## Risks and costs

- Too much query guidance could suppress useful broad searches.
- Record-writing guidance could make titles unnatural if over-optimized.
- A preflight helper could add code and maintenance cost for a small gain.
- Codemode could reduce model-visible output without reducing underlying work; script generation overhead may outweigh benefit.
- `no_match` counts can be misread as failures when they are correct; evaluation must distinguish wasted queries from valid no-match checks.

## Evaluation / decision needed

### Question

Can bounded query shaping reduce wasted retrieval calls while preserving useful retrieval and task correctness?

### Baseline

`ALPHA-DELIVERY-R1`, paid-model subset:

- PBI 2, 3, 4, 5, 7, 8, 9;
- 33 retrieval calls, 13 applicable, 20 `no_match`;
- full raw metrics in `../../evaluation/experiments/ALPHA-DELIVERY-R1/`.

### Candidate run

Repeat a smaller representative subset under R2, preferably PBI 2, 4, 7, and 9:

- PBI 2: knowledge found a relevant validation-error record after broad misses;
- PBI 4: UI patterns with mixed retrieval;
- PBI 7: search/pagination with good retrieval;
- PBI 9: clean deduplication.

### Measures

Preregister before the run:

- `readKnowledgeRecords` calls per PBI;
- applicable / `no_match` / filtered outcomes;
- exact-ID reads;
- number of staging and promotion calls;
- tool calls, window, tokens, cost under the same model phase;
- task correctness and validation result;
- any excluded-record body exposure or gate issue;
- user-visible approval count.

### Decision signal

Keep or port only if:

- total retrieval calls or repeated broad queries decrease;
- applicable retrieval does not decrease;
- task correctness is preserved;
- no new scope/gate exposure appears;
- net cost/context does not increase meaningfully.

If no improvement appears, stop; the current prompt/record behavior is sufficient for now.

## Revisit trigger

This candidate was created because R1 produced repeated evidence: many broad natural-language queries returned `no_match`, while short phrases and exact IDs succeeded. Revisit for implementation only after an explicit approval of a bounded R2 experiment.

If R2 after prompt-only guidance shows no repeated problem, keep C13 as a reference and do not implement a preflight. If R2 still shows repeated misses despite query-shape guidance, propose either a deterministic direct-tool preflight or a Codemode A/B under C12's evaluation rules.

## Next safe action

No implementation is authorized. The next safe action is to choose whether to port the Level 1 prompt/record guidance into the clean payload before R2, with a separate approval. Alternatively, keep R1 unchanged and use C13 only as the preregistered question for R2.
