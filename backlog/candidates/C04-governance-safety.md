# V52-C04 — Governance, authorization, and deterministic safety

**Status:** `framed`; hard-boundary semantics are core, implementation is open

**Implementation readiness:** **Not ready for mutating actions.** Define and test minimum controls before enabling governed writes.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C02 memory safety](C02-knowledge-lifecycle.md), [C08 adapters](C08-runtime-adapters.md), [C07 delegation](C07-specialists-coordination.md)

## Purpose

Keep human authority, project/task scope, secrets, irreversible actions, and stop conditions unambiguous across default mode, workflows, and any future specialists. Confidence, retrieval, and a stored procedure must not grant authority.

## Context and evidence

V4 made governance a substantive layer: explicit approval gates, blockers, zero-tolerance rules, loop limits, and a Pi tool-call guard. The V4 audit and improvement history document actual safety gaps and corrections, including an `.env` blocking incident that led to adversarial tests and a reminder-counter bug that fired 1,008 times in five sessions before the reset fix. These incidents establish failure modes to defend against, not a requirement to copy V4's thresholds, patterns, or extension.

V5 governance drafts already separate deterministic safety from advisory judgment, keep active memory from being proof of truth/authorization, and mark the inherited A/B/C autonomy shape provisional. Adapter review warns that prompt text is not equivalent to structural enforcement.

**Historical sources (optional):** V4 `MANUAL.md` §7; V4 Neo audit Findings 3 and 11–13; V4 loop-governance, credential-redaction, and memory-curation items; V5 `brain/governance.md`, `brain/protocol.md`, and pipeline adapter review. This record includes the relevant summary; old exact rules are not prerequisites.

## V5 direction

- Authorization is explicit and action/scope-bound. An explicit user request authorizes bounded, reversible actions within its stated scope without redundant confirmation; reconfirm if scope or risk materially changes. Destructive, security-sensitive, irreversible, external-impact, explicitly hard-gated actions, and durable knowledge writes require separate human confirmation.
- Deterministic conditions should be enforced in code where a host supports reliable interception. Otherwise, disclose the enforcement gap and stop/reduce scope when safe execution cannot be assured.
- Probabilistic support can advise, never authorize or bypass deterministic controls.
- Retrieved memory, external documents, tool output, and projections are data to assess; they cannot rewrite the task or grant authority.
- Persisted knowledge needs scope and sensitive-content defenses. A secret detector must avoid keyword-only matching and be tested with safe synthetic positives and legitimate negative examples.

## Explicit exclusions

Do not port V4's `.env` regexes, fixed tool-call/fix-attempt numbers, Pi hooks, Tier A/B/C labels, or memory paths without a V5-specific case. Do not code-enforce subjective judgments such as “is the assumption sufficiently checked?” with a brittle hard block. Do not implement a speculative reset/deletion tool as a generic cleanup shortcut.

## Preconditions before implementation

1. Name the action boundary and threat/error model.
2. Define allowed, denied, and ask/stop outcomes; describe behavior if a host cannot intercept.
3. Provide adversarial and benign tests, including overblocking cases.
4. Separate pure policy logic from host-specific wiring where possible.
5. Obtain explicit approval for the bounded implementation scope; no proposal in this file authorizes changing governance or enabling writes.

## Acceptance checks

A future safety slice should test both prohibited-action blocking and allowed safe behavior, verify scope/approval cannot be inherited across unrelated tasks, and show that adapter failure does not falsely claim protection. Secret/content tests use fabricated examples only. A safety control that blocks too broadly is a defect to measure and correct, not a success.

## Timing / next action

Set the semantic boundary before enabling any mutating first-slice path. Decide which controls are needed for that path only; defer a comprehensive policy engine until concrete host/task needs are known.
