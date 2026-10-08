# AgenticLab V5.2 Candidate Portfolio

**Status:** Initial source crosswalk complete; candidates are not implementation commitments

**Owner/source of truth:** this V5 repository

**Parent direction:** [`../V5.2-roadmap.md`](../V5.2-roadmap.md)

## Purpose and rules

This folder preserves plausible AgenticLab capabilities and design opportunities from the V4 improvements backlog and first-attempt V5 pipeline. Its purpose is to keep strong possibilities visible while preventing either wholesale porting or accidental loss.

**Self-containedness rule:** a fresh session must be able to understand a candidate's problem, evidence, V5 disposition, constraints, timing, and next safe action by reading that candidate and this index alone. Historical paths and external references below are optional provenance pointers only; they are not required reading and may not exist in a fresh checkout. The candidate records therefore summarize relevant source findings and limitations rather than merely naming a file/section. If critical evidence cannot be safely summarized, mark the item blocked/not-ready and request the source before implementation.

- The V5 backlog is the canonical portfolio after this migration. V4 and the previous V5 pipeline remain historical sources; do not update them as if they were the new backlog.
- A record describes a problem/concept, evidence, boundary, and revisit trigger. It is not automatically a feature specification or authorization to implement.
- Consolidate overlapping source items into one V5 candidate. Keep the original source identifiers below for lineage; do not copy V4-specific paths, thresholds, prompt choreography, dependencies, or workspace facts as V5 requirements.
- Preserve ideas explicitly as **parked** or **historical/reference** when not selected. Do not let a long candidate list become an implied roadmap.
- Before implementation, select one bounded item, define its acceptance/evaluation, confirm dependencies and data boundaries, and obtain explicit approval.

## Status vocabulary

| Status | Meaning |
|---|---|
| `framed` | Product/contract boundary is understood; exact behavior or implementation remains open. |
| `candidate` | Plausible V5 capability or mechanism with an identified use; not yet selected. |
| `parked` | Intentionally retained but not actionable now; a concrete trigger is recorded. |
| `selected` | the user explicitly selected it for a bounded design or implementation block; scope still governs. |
| `in-progress` | Work on the explicitly approved scope has begun. |
| `implemented` | The bounded deliverable is complete and validated; this does not imply general adoption. |
| `rejected` | Considered and explicitly excluded, with rationale retained. |
| `historical/reference` | Source material or an old mechanism retained for lineage, not a current V5 capability. |

Status, priority, dependencies, and authorization are separate. A high-interest candidate is not necessarily near-term; `selected` is not inferred from a recommendation.

## Portfolio index

| ID | Candidate | Status | Initial disposition | Record |
|---|---|---|---|---|
| V52-C01 | Default-first operating model with explicit workflows | framed | Core product direction; exact routing and workflow composition open | [C01](candidates/C01-operating-model.md) |
| V52-C02 | Project knowledge capture, lifecycle, and memory defense | candidate | Central capability; first-slice possibility, not selected | [C02](candidates/C02-knowledge-lifecycle.md) |
| V52-C03 | Task-aware context engineering and retrieval | candidate | Candidate; integrate with C02, avoid unconditional loading | [C03](candidates/C03-context-engineering.md) |
| V52-C04 | Governance, authorization, and deterministic safety | framed | Core constraint; re-derive V5 implementation | [C04](candidates/C04-governance-safety.md) |
| V52-C05 | Continuity, operational records, and observability | candidate | Candidate; proportionate and purpose-separated | [C05](candidates/C05-continuity-observability.md) |
| V52-C06 | Reusable skills, procedures, and process routines | candidate | Candidate; don't preload a speculative library | [C06](candidates/C06-procedures-routines.md) |
| V52-C07 | Specialist forms and independent coordination | candidate | Candidate; isolate only when independence/value warrants | [C07](candidates/C07-specialists-coordination.md) |
| V52-C08 | Runtime, adapters, and current AI landscape | candidate | Candidate; portable contracts, thin capability-aware adapters | [C08](candidates/C08-runtime-adapters.md) |
| V52-C09 | Jev-inspired bounded decision support | parked | User direction: no Jev for now. Revisit only for recurring bounded decisions or demonstrable review/interruption friction; no universal classifier | [C09](candidates/C09-jev-decisions.md) |
| V52-C10 | Bounded semantic reuse / decision caching | parked | Revisit only after repeated bounded decisions are observed | [C10](candidates/C10-bounded-reuse.md) |
| V52-C11 | Project bootstrap, greenfield setup, and workspace isolation | candidate | Prototype payload-to-host shape confirmed; reusable setup/update boundaries need design | [C11](candidates/C11-bootstrap-and-scope.md) |

### Working design-review guide (not implementation priority)

- **C11 design pass complete:** the manual `system/` → workspace-local `AgenticLab/` setup path and ownership/refresh rules are documented; recommend a manual runbook for first use, not an installer. Synthetic empty/populated/divergent fixtures passed file-operation/preservation checks against commit `ccc56e4`. Pi 1.1.0 discovered the root instructions and extension, then followed the root pointer in a read-only synthetic-scope check. Gate behavior/approval UI and clean-instance refresh remain untested; no installer scope follows from these checks.
- **Conditional follow-on — C08:** review only if a concrete Pi/host capability question remains from C11; do not start a general adapter framework.
- **Foundational baselines — C01/C02:** core to the product vision and already developed into usable operating/knowledge-interface baselines. Reopen only for a concrete routing, lifecycle, or retrieval gap.
- **Recently reviewed — C03/C04/C05:** the current context, governance, and continuity design passes found no implementation slice to select. Reopen only on new evidence or a specific task need.
- **Later, need-triggered — C06/C07:** revisit procedures when real work repeats a method; revisit specialist isolation/coordination when independent judgment or parallelism has a concrete benefit.
- **Parked — C10/C09:** C10 needs evidence of repeated equivalent decisions; C09 remains parked by the user's explicit direction and trigger.

This is a navigation aid, not automatic sequencing, implementation authorization, or a priority commitment. At the end of each review, record the outcome and stop for the user's choice of the next focus. No implementation candidate is currently selected or `in-progress`.

## Source crosswalk: V4 improvements backlog

The original V4 paths below are historical provenance pointers relative to the sibling V4 repository at `../AgenticLab-V4/`. They are **not required reading**: each destination record contains the material V5 context, source finding, evidence limits, and implementation timing needed for a fresh session. Disposition refers to the *idea*, not a claim that each old mechanism has been completely re-audited for implementation.

| V4 source item(s) | V5 destination / disposition |
|---|---|
| `backlog/default-session-memory-curation-gate-gap.md` | C02 + C04: preserve provenance, curation, and human promotion; replace lens-authored tags and V4 storage/gates with V5 contracts. |
| `backlog/episodic-memory-retrieval-gap.md` | C02 + C03 + C05: retain recall as a real candidate and retrieval observability; historical raw-session mining and automatic injection remain excluded absent safe scope and demonstrated need. |
| `backlog/hindsight-value.md` | C02 + C03: extract evidence-backed observations, retain/recall/reflect distinctions, defense, scoped views; reject importing Hindsight infrastructure or automatic retention. |
| `backlog/credential-shaped-content-redaction-gap.md` | C02 + C04: preserve value-shape secret defense as a candidate; require false-positive tests and a clear persistence boundary. |
| `backlog/jev-integration-analysis.md`, `jev-targeted-decision-support-design.md`, `jev-targeted-decision-support-pilot.md`, `jev-nine-decision-points-reference.md`, `jev-engineering-for-coding-agents-reference.md` | C09: preserve selective advisory decision support, atomic inputs/outputs, abstention and calibration. Research/reference provenance remains distinct from runtime evidence. |
| `backlog/jev-in-agenticlab.md`, `jev-classifier-stage-integration.md` | C09 historical lineage only. The universal/pre-persona classifier proposal is superseded/deferred and is not imported as the V5 plan. |
| `backlog/loop-governance-caps-code-enforcement-gap.md`, `phase-log-block-enforcement-gap.md`, `pre-heavy-implementation-loose-ends-pass-gap.md` | C04 + C05: preserve bounded stop/recording/assumption-sweep questions; re-derive when needed, do not port V4 counters, phase-log rules, or thresholds. |
| `backlog/pre-built-global-skills-starter-pack.md`, `senior-minimalism-ladder-gap.md`, `process-routine-tier-gap.md` | C06: preserve bootstrapping reusable procedures, minimalism review, and gated process-routine concepts as separate candidates; no V4 skills topology copied. |
| `backlog/herdr-multi-agent-runtime-candidate.md`, `omnigent-meta-harness-integration-candidate.md` | C07 + C08: retain supervision, capability descriptions, handoffs, and runtime complementarity as exploratory concepts; do not adopt either external runtime/dependency. |
| `backlog/pi-only-mechanisms-cross-harness-parity-gap.md`, `harness-switch-adapter-install-gap.md`, `agents-md-fallback-gap.md` | C08: preserve capability-aware adapter coverage, setup/re-setup, and a thin generic fallback as distinct questions; lower-priority/untested scenarios stay candidates, not parity claims. |
| `backlog/agents-empty-startup-greenfield-variant.md` and `agents-empty-startup-greenfield-variant-HANDOFF.md` | C11: preserve greenfield onboarding as a scenario; handoff file is supporting history, not a separate feature. |
| `backlog/project-memory-reset-check-gap.md` | C11 + C02: preserve workspace/project-data isolation and safe reuse/reset concerns; no destructive cleanup behavior is assumed. |
| `backlog/repo-wide-overengineering-audit-gap.md` | C06, parked: on-demand whole-repo audit remains speculative until real work demonstrates the need. |
| `backlog/v2-backup-remaining-categories-review.md`, `v3-to-v4-dev-history-archival-gap.md` | Historical/reference process and migration questions, not current delivery runtime features. Keep lineage in this crosswalk; reconsider only if V5 needs an explicit graduation/archive policy. |

Completed V4 backlog entries are not ported as tasks. Their lessons are represented at the relevant candidate level only when the V4 audit or evidence supports a durable V5 concern; the V4 `[done]/` history remains the source for detailed incident lineage.

## Source crosswalk: first-attempt V5 pipeline

The old pipeline paths below identify provenance only. The V5 destination record and roadmap carry the relevant concept, limitation, and disposition; a sibling V4 checkout is not required to understand or continue the candidate.

| V5 pipeline source | V5 destination / disposition |
|---|---|
| `v5/pipeline/context-engineering.md` | C03; task-aware staged assembly, scope/freshness, bounded loading and ephemeral retrieval outcomes remain candidates. |
| `v5/pipeline/jev-candidates.md` | C09; keep advisory typed decisions, atomicity, abstention, evidence grading and explicit deterministic composition. |
| `v5/pipeline/bounded-semantic-reuse.md` | C10, explicitly parked pending real repeated-decision evidence and invalidation/safety design. |
| `v5/pipeline/logging-and-recovery.md` | C05; retain separation of operational records, approvals, checkpoints, evaluation and durable memory. |
| `v5/pipeline/specialist-coordination.md` | C07; lens, procedure, workflow, isolated run remain distinct forms; independent evaluation matters where appropriate. |
| `v5/pipeline/implementation-boundary.md` | C08; use as a design input for core-versus-adapter boundaries, not as an approved directory/module plan. |
| `v5/pipeline/research/cross-cutting-research-angles.md` | Distributed to C03/C04/C05/C07: human attention, traceability, failure attribution and trust boundaries; multi-user memory remains explicitly out of scope. |
| `v5/pipeline/research/v4-adapter-review.md` | C08, plus C04/C05: thin adapters, capability matrices, behavioral tests and per-boundary fallback are candidate principles. |
| `v5/pipeline/research/memory-architecture-design.md`, `memory-architecture-coverage-audit.md`, `complete/memory-architecture-final-review.md` | C02/C03 supporting rationale and coverage evidence; not standalone features. |
| `v5/pipeline/INDEX.md`, `README.md` | Process/status conventions reviewed; the index's Stage 6 authorization/current-state statements belong to the first attempt and are not carried as V5.2 execution status. |

## Current prompt-review priority and deferred set (design only)

**Core delivery-prompt review status:** The initial capability assessment and one synthetic prompt prototype for `/plan`, `/implement`, and `/premortem` are complete. All three prompt files are available as Pi prompt commands in a process launched with explicit `--prompt-template` flags; this is session-scoped registration, not persistent `.pi/settings.json` configuration or a custom loader. The small prototype passed its focused fixture tests and showed no redundant `/implement` kickoff/phase prompts, but cross-phase learning candidates duplicated and were not consolidated; multi-phase work and persistent-write approval remain untested. Fine-tune only against real task evidence. V4 prompt text remains historical input, not a V5 specification.

**Parked secondary delivery prompts — revisit on a real use case:**

| Prompt | Revisit trigger |
|---|---|
| `/implementation-report` | First V5 implementation that needs a stakeholder-facing handoff/report. |
| `/debug` | First bounded, real root-cause investigation whose evidence/stop conditions need a dedicated flow. |
| `/test` | First implementation where coverage planning/execution is a distinct workflow need; clarify whether this means planning, writing, running, or all three. |
| `/review-pr` | First V5 PR review where independent review or multi-domain routing adds material value. |

These are parked, not rejected. Reopen sooner if a selected V5 workflow depends on one of them.

**Deferred, explicitly not forgotten — V4 system prompts:**

| Prompt | Likely V5 concerns to revisit | Status / trigger |
|---|---|---|
| `agents-startup` | C11 bootstrap/scope; C03 context assembly; C04 safety | Revisit when a V5 workspace onboarding/bootstrap slice is selected. |
| `review-memory` | C02 knowledge lifecycle; C04 memory safety/governance | Revisit when C02 persistence/curation behavior is selected for implementation or real corpus maintenance needs arise. |
| `system-health` | C05 observability/continuity; C02 knowledge health; C04 control status | Revisit when a concrete V5 runtime-health/observability need is selected. |
| `warmup` | C03 task context; C05 continuity/session orientation | Revisit when a new-workspace initialization or initial knowledge-seeding slice is selected. |

The deferral is a sequencing choice, not a finding that these prompts lack value; the user reports that several system prompts were valuable in V4. Reopen earlier if a delivery prompt depends on one of these system behaviors. No prompt is selected for porting or implementation.

## Candidate entry template

Each candidate record should state: ID and status; problem/value hypothesis; source lineage; evidence grade and limits; V5-shaped concept; non-goals; risks/costs/dependencies; evaluation or decision needed; revisit trigger. Add implementation detail only after selection. Corrections to historical dispositions should be recorded in `DEV-LOG.md` and reflected in the owning record.
