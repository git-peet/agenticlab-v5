# V52-C09 — Jev-inspired bounded decision support

**Status:** `parked`; user direction is no Jev for now. Advisory methodology and revisit triggers are preserved; no API/runtime selected.

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

### Deferred revisit: default-session workflow recommendation

A second possible bounded decision is whether a default-session implementation request merits recommending an explicit workflow (e.g. `/plan`) or should be handled directly/clarified first. This is distinct from memory-candidate review and must be evaluated separately, not pooled into one Jev label set. Candidate outputs could be `direct`, `recommend_named_workflow`, `clarify_intent`, or `abstain`; an explicit workflow invocation bypasses this decision and starts the requested flow. Jev could advise only—it must never invoke a workflow, expand scope, or authorize implementation.

**Revisit trigger:** first complete the C01 synthetic/default-entry cases using the simplest V5 rule. Consider Jev only if actual use shows recurring ambiguity or costly misroutes that a transparent deterministic/manual rule does not handle. Any pilot should begin in shadow/advisory mode. Do not collect a general metrics dataset before this trigger; once the user explicitly selects a bounded pilot, preregister the atomic decision, baseline, outcome labels (including abstention/errors), sample/stopping rule, adoption/correction/interruption measures, and token/latency cost. Collect only the minimum local, privacy-bounded data needed to calibrate that question. No API, classifier, or routing mechanism is selected now.

## Explicit exclusions

No Jev API/service, universal classifier, per-turn classifier, confidence-based autonomy, model routing, memory promotion authority, or override of tool/approval gates. Do not claim token efficiency: classification may cost extra.

## Preconditions / acceptance

Before a pilot, define: the repeated problem; exactly when support is invoked; labels/outcomes; missing/malformed fallback; user-overrides; model/procedure identity; cost/latency; privacy; and how false proceed/false stop are judged. Record that confidence is `uncalibrated` until evidence warrants another label. A shadow run must precede any workflow influence.

## Timing / next action

Keep this candidate parked under the user's current direction: no Jev in the present V5 work. Revisit only when real tasks show recurring bounded decisions that a transparent rule does not handle, or when knowledge-review interruptions become measurably repetitive. If later selected, begin with one manual/local advisory question in shadow mode. Actual Jev runtime access/API evaluation requires a separate bounded scope and approval.
