# V52-C09 — Jev-inspired bounded decision support

**Status:** `candidate`; advisory methodology only, no API/runtime selected

**Implementation readiness:** **Not ready for automation.** First identify a recurring bounded decision and define outcomes.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C03 context](C03-context-engineering.md), [C04 authority](C04-governance-safety.md)

## Purpose

Determine whether selected decisions benefit from explicit typed judgment (choice, score, yes/no/abstain) instead of embedding every judgment in open-ended prose. It should support—not replace—reasoning, deterministic rules, or human authority.

## Context and evidence

The V4 backlog's current strategic analysis superseded its older universal-classifier proposal. Its recommended direction is targeted default-session decision support for bounded points such as context sufficiency/clarification, exploration-versus-action, continue/stop, and post-answer grounding; initial support is observational/advisory. The design notes warn that local LLM confidence is uncalibrated, decision support may add tokens, malformed/missing output needs a fallback, outcomes can be delayed/unobservable, and different decision types/models must not be casually pooled. API-backed Jev is a separate dependency/privacy/cost decision.

V5's Jev register adopts the conceptual model: bounded state → atomic typed question → advisory recommendation/uncertainty → deterministic composition. No V5 benchmark has demonstrated benefit. The F1 conflict probe and memory experiments do not test Jev.

**Historical sources (optional):** V4 `jev-integration-analysis.md`, `jev-targeted-decision-support-design.md`, `jev-targeted-decision-support-pilot.md`, historical `jev-classifier-stage-integration.md`; V5 `pipeline/jev-candidates.md`. Universal-classifier material is explicitly superseded; the summarized current direction is sufficient.

## V5 direction

If tested, define one atomic question and permitted outputs, pass only task-relevant evidence with provenance/uncertainty, and allow abstention. Keep results in a bounded evaluation record, separate from semantic memory. First observe or shadow; do not make an automatic branch until the decision's outcomes are measurable and errors understood. Deterministic code applies any permissible policy.

## Deferred revisit: knowledge-review prompt

When a durable-knowledge candidate needs human review, the system could use Jev-style advice to assess whether the candidate is worth presenting, what evidence is missing, or whether several candidates can be summarized into one review batch. This is a later **review-preparation** hypothesis, not the first Jev pilot and not an extension of the existing write gate. Reconsider only after real V5 use shows recurring approval interruptions or confusing reviews. The current first-slice trial required two successful approvals (record write plus later index update) for one decision; the user emphasized that prompt *frequency*, not wording alone, determines whether the workflow is less streamlined. This single sample is a signal to measure, not enough to implement a batch mechanism.

Hard boundary: Jev may recommend `present / keep transient / gather evidence` or help structure a batch. It cannot approve the write, choose `active` status, suppress a required confirmation, or authorize deletion. The user remains the decision-maker; deterministic Pi gating remains unchanged. Before considering automation, measure approval interactions per task/decision, false omissions, unnecessary or redundant prompts, review time, user corrections, and token/call cost.

## Explicit exclusions

No Jev API/service, universal classifier, per-turn classifier, confidence-based autonomy, model routing, memory promotion authority, or override of tool/approval gates. Do not claim token efficiency: classification may cost extra.

## Preconditions / acceptance

Before a pilot, define: the repeated problem; exactly when support is invoked; labels/outcomes; missing/malformed fallback; user-overrides; model/procedure identity; cost/latency; privacy; and how false proceed/false stop are judged. Record that confidence is `uncalibrated` until evidence warrants another label. A shadow run must precede any workflow influence.

## Timing / next action

Preserve the candidate; do not place it in the first vertical slice unless real work reveals a recurring decision problem. If selected, begin with one manual/local advisory question. Actual Jev runtime access/API evaluation requires a separate approval and comparison.
