# V52-C03 — Task-aware context engineering and retrieval

**Status:** `candidate`; tightly coupled to C02, not yet selected

**Implementation readiness:** **Not ready for a general context subsystem.** A bounded retrieval path may be designed with the first memory slice.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C02 memory lifecycle](C02-knowledge-lifecycle.md), [C08 adapters](C08-runtime-adapters.md)

## Purpose

Select the smallest context sufficient for the next decision or action. Memory is one context source alongside the user request, current source code/project state, workflow/checkpoint state, tools, and references. Memory defines available knowledge and its lifecycle; context engineering decides what to select and how much to load now.

## Context and evidence

V4 used always-loaded Digest/hot indexes plus trigger-term cold retrieval and feature/project artifacts. This gave a concrete staged-loading idea, but the V4 audit/diagnosis reports that cold-tier matches were zero in one 17-session sample and several always-on/adapter layers accumulated recurring token costs.

V5's EverShop runs showed: tool availability alone produced zero memory calls; concise local guidance increased relevant-task activation; initial navigation reduced source calls in a small pilot, but the independent replication had a regression on its Jest task, an unnecessary cross-project query, no consistent time gain, and a pre-`taskScope` interface. A later one-run current-schema spot-check showed one relevant lookup and one unrelated skip, not reliability or benefit. These are activation/precision findings on code-derivable fixtures, not proof of general retrieval value.

Hindsight/OpenViking-inspired trajectory and overview-first retrieval ideas are useful hypotheses. Their server/vector infrastructure and automatic context processing are not selected.

**Historical sources (optional):** V4 `MANUAL.md` §§5–6 and `episodic-memory-retrieval-gap.md`; V5 `pipeline/context-engineering.md`, relevant EverShop activation/navigation/replication results and `evershop-alpha-pipeline-concept-map.md`. The evidence and caveats are summarized above and in the roadmap.

## V5 direction

- Anchor retrieval to objective and actual project scope; verify source status/freshness before consequential use.
- Prefer direct references and deterministic scope/status/freshness filters, followed by the simplest suitable keyword/concept match.
- Treat a match as a candidate for analysis, not truth or an instruction.
- Distinguish `applicable records`, `no match`, `candidates filtered` (with reasons), and `retrieval unavailable/failed`. A failed store must not appear empty.
- Make a detailed per-read trajectory ephemeral by default; explain material retrieval choices to the user proportionately rather than narrating each lookup.
- Load full bounded sources when completeness warrants it; use selective snippets when the source is large and the question narrow.

## Explicit exclusions

No unconditional memory floor/Digest, embeddings/vector service, graph traversal, semantic reranker, autonomous multi-query loop, fixed context token budget, or permanent retrieval telemetry is selected. These can only follow measured misses or costs that a simpler mechanism cannot address.

## Preconditions and acceptance checks

Before implementing retrieval, specify the next-step information need and scope. Tests should cover right-scope match, wrong-scope rejection, stale/superseded filtering, no match, filtered-only results, and storage failure. On an approved real task, inspect whether loaded items helped, misled, or were unnecessary; verify code-backed facts against current code. Count calls/tokens only if those measures answer a named decision.

## Timing / next action

Design with C02 for the first vertical slice. Do not build a general context planner first. Advanced retrieval remains parked until ordinary use shows specific misses that lexical/direct retrieval cannot solve.
