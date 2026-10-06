# V52-C10 — Bounded semantic reuse and decision caching

**Status:** `parked`

**Implementation readiness:** **Do not implement now.** The prerequisite evidence has not been observed.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C03 context](C03-context-engineering.md), [C09 Jev decisions](C09-jev-decisions.md)

## Purpose

Reuse a prior result for repeated, bounded decisions only when the relevant task context is truly compatible. Similar wording by itself is not proof that requests or states are equivalent.

## Context and evidence

The V5 pipeline extracted a two-threshold pattern from PromptCache: high match may be a reuse candidate, low match triggers fresh reasoning, and an ambiguous/gray-zone match must be verified or recomputed. The transferable idea is explicit uncertainty handling, not PromptCache infrastructure. No AgenticLab data currently demonstrates a sufficiently frequent repeated decision, net savings, or safe invalidation.

**Historical sources (optional):** V5 `pipeline/bounded-semantic-reuse.md` and first roadmap §5.7. Its summary and current disposition are complete here.

## V5 concept if the trigger is met

Start with canonical exact matching for a structured, low-risk decision. Eligibility would need project/workspace, current state/version, decision type, policy/schema version, provenance, risk, and age/expiry. A match is provisional. Revalidate mutable facts and enforce current authorization regardless of reuse. Similarity, if ever needed, is only a candidate signal with a gray-zone verification path.

## Explicit exclusions

No embeddings, ANN index, external service, process-wide cache, raw conversation cache, or reuse of code changes, designs, security decisions, authorization, or mutable repository facts. A cache hit can never bypass verification or approval.

## Timing / next action

Unpark only after real use shows repeated equivalent bounded decisions whose fresh evaluation costs measurable time/tokens, and after C09/C03 define the decision and context identity. Compare reuse versus fresh reasoning; record false-reuse, stale-result and invalidation rates alongside cost, latency, corrections, and maintenance. If no measurable recurrence appears, close as unnecessary.

## Required action if revisited

First write a bounded experiment proposal and obtain approval. Do not treat this record as permission to implement caching.
