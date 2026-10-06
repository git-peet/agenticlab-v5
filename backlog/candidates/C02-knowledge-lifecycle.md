# V52-C02 — Project knowledge capture, lifecycle, and memory defense

**Status:** `candidate` — central capability; not yet selected for implementation

**Implementation readiness:** **Partly framed, not implementation-ready.** Select a minimal record/write/read slice and obtain an explicit work scope first.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C03 context engineering](C03-context-engineering.md), [C04 governance](C04-governance-safety.md), [C05 continuity](C05-continuity-observability.md)

## Purpose

Preserve useful project knowledge across sessions without treating every observation, transcript, or retrieved record as current truth. The difficult unresolved part is not simply storing records: it is proposing the right knowledge, reviewing it, using it at the right time, and correcting it safely.

## Context and evidence

**V4:** The V4 manual describes semantic/project facts, episodic logs, procedural skills, hierarchical/topological context, working context, and a promotion/consolidation pipeline. It uses Digest/MOC/atomic note/SEMANTIC_MAP/feature/reference forms. The audit confirms substantial accumulated project knowledge and deliberate correction/maintenance responsibilities, but also reports empty/underused navigation surfaces in some workspaces. A V4 metric sample recorded zero cold-tier matches across 17 sessions. Therefore capture and curation are evident; actual retrieval usefulness and layer utilization are not established by record volume.

**V5 experiments:** A synthetic billing retry fixture favored a minimal-memory condition by +2, +2, and +1 rubric points in three pairs (mean 4.67/5 vs. 3/5), with no hard safety failures. The separate cost pair reported 822 vs. 1,211 total tokens (+47.3%) for the memory condition; latency was one sample and maintenance effort was unmeasured. EverShop's code-derived tasks tied on answer quality; Dia F1 was near ceiling without memory and was exploratory. These results justify keeping the memory question alive, not claiming general benefit.

**Transferable Hindsight concepts:** evidence-backed observations; distinguish capture/retain, recall, reflection/synthesis, verification, and projection; preserve contradictions and support; isolate memory scopes; defend persistence boundaries. The source analysis rejected Hindsight's server/database/hosted infrastructure, automatic retention, and unconditional recall for V5's intended self-contained, governed baseline.

**Historical sources (optional):** V4 `MANUAL.md` §6; V4 Neo audit Findings 2, 4, 13; `default-session-memory-curation-gate-gap.md`, `episodic-memory-retrieval-gap.md`, `credential-shaped-content-redaction-gap.md`, `hindsight-value.md`; V5 `brain/memory-spec.md`, memory coverage/research documents, and evaluation reports. The findings needed for this record are summarized above and in the roadmap.

## V5 direction

A future minimum loop should distinguish:

1. A transient observation or candidate from durable knowledge.
2. Candidate, active/approved, inactive, stale, contradicted, and superseded meaning without conflating these dimensions.
3. Source/provenance, project/feature/workspace scope, evidence/support, uncertainty, and relevant verification date.
4. Human review/promotion from an agent's recommendation. An agent-authored candidate does not self-authorize durable status.
5. Memory from operational logs, checkpoints, user-owned notes, evaluations, and generated projections.
6. Retrieved content from instructions/authorization: memory is evidence, never an authority to expand scope.

Credential-shaped data and sensitive content must be considered at persistence boundaries. A future detector should focus on value shapes, not indiscriminate keywords such as “token”; any such control needs synthetic adversarial tests and false-positive cases.

## Explicit exclusions

- No populated V4 project-memory import.
- No raw-transcript retention or the stopped V5 session-corpus mining.
- No automatic promotion, automatic synthesis into “truth,” unconditional injection, Hindsight dependency, vector store, or copied V4 tier/file layout.
- No broad metrics collection unless an approved experiment specifies its purpose and data handling.

## Preconditions before implementation

- Select one project/workspace scope and a concrete source of a candidate decision/experience.
- Define the smallest inspectable record and where its source evidence points.
- Decide how a human reviews and approves a candidate in the chosen host; fail closed for any governed write if confirmation is unavailable.
- Define retrieval states, scope/freshness checks, and what must be verified against current code.
- Confirm that using a real project task and storing its data is explicitly approved.

## Future acceptance checks

A bounded prototype should show that it can: propose a supported, scoped candidate; keep it inactive until human action; retrieve it only in the right scope; mark stale/filtered/unavailable distinctly; preserve provenance; verify current facts where needed; and avoid secrets/unsafe content. Test a fresh session using one genuine project decision rather than a designer-authored fact that duplicates code. Measure capture/review effort and retrieval errors as well as usefulness.

## Timing / next action

This is a plausible part of the first vertical slice, not yet selected. The roadmap suggests a real approved decision in the Python learning workspace, potentially across sessions; first resolve the test-database warning before running its tests. Do not start memory persistence or project-data collection until the user approves the task/data boundary.
