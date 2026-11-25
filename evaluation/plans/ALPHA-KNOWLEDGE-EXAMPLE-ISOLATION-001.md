# ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001 — Plan (preregistered)

**Status:** preregistered 2026-11-25, before the run. Result:
[`../results/ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001.md`](../results/ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001.md).

## Question

`ALPHA-KNOWLEDGE-APPLICATION-001` produced 7/7 in two runs with an example-bearing record, versus 4/7
for the reference control and 5/7 for a prose-only record. But that record changed **two** things at
once: it added a fenced example, and it restated the rules more compactly.

> Which one did the work — the example, or the shorter wording?

## Design

One new treatment workspace, `exp15`, from the sanitized baseline plus payload `4827f6b`,
initialized with key `fastapi-delivery-run`, containing exactly one record:

`check-script-convention-with-example` = **the original verbose prose record verbatim** (exp10's
`check-script-convention`, unchanged wording) **plus** the same fenced example block used in the
previous run.

| Comparison | Record | Score |
|---|---|---|
| Reference control (`exp11`) | none | 4/7 |
| Prose-only (`exp12`) | verbose prose | 5/7 |
| Compact + example (`exp13`, `exp14`) | short prose + example | 7/7 |
| **This run (`exp15`)** | **verbose prose + example** | to be measured |

## Prediction

- `exp15` scores 7/7 → the example is doing the work; wording length is not the cause.
- `exp15` scores ≤ 6/7 → compactness contributes; the earlier result cannot be attributed to the
  example alone.

Criteria 2 and 3 (summary line shape, lowercase severity prefixes) are the discriminating ones, as
before.

## Protocol

1. Create `exp15`, initialize through the normal first-use flow, key `fastapi-delivery-run`.
2. Insert the verbose-prose-plus-example record only.
3. Restart Pi so the adapter loads.
4. Send the identical PBI 5 prompt.
5. Grade mechanically; count retrieval from the extractor.
6. Publish the rubric with the deciding line per criterion.

## Limits accepted in advance

- Single run; the previous experiment showed behaviour can vary between identical runs.
- Same model, same task family as all prior runs.
- The operator grades, with published evidence lines.
- No installs, services, databases, or protected data.
