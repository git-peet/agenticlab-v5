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

## Knowledge interface design checkpoint — proposal, not selected

The first host trial establishes only a narrow starting point: one active date decision was linked from `INDEX.md`, found in a fresh session, and checked against current source. The pasted response does not prove that the record file itself was opened. The user expects the collection to grow. A decision about the interface is therefore needed before another capture/retrieval mechanism is implemented.

### Proposed retrieval jobs

Treat these as a workload to review, not as validated requirements:

1. **Exact decision recall:** find a scoped decision and return its claim, rationale, status, and provenance.
2. **Task-relevant guidance:** identify applicable procedures or risks for a current task without loading unrelated records.
3. **Relationship/conflict lookup:** find supporting, contradicting, superseding, or dependent records when a task crosses topics.
4. **Correct negative result:** distinguish no match from out-of-scope/inactive/filtered records and from an unavailable store.
5. **Freshness/source check:** verify mutable claims against current source; surface contradiction or staleness rather than quietly trusting old text.

For each job, evaluate relevant-record recall, irrelevant/wrong-scope retrieval, source correctness, stale/conflicting handling, amount of context inspected, and user effort. Include **approval interactions per task/decision** and redundant metadata/index writes; prompt wording alone is not the friction measure. The first trial is one sample only.

### Structure alternatives to compare

| Candidate | What it means | Main advantage | Main cost/risk |
|---|---|---|---|
| Atomic records with one curated file index | Stable individual records; index lists/links each one | Direct, inspectable navigation and status visibility | Every new record may require a second index write/approval; index grows and needs curation |
| Stable index plus records directory | Index explains retrieval; Pi file listing/search discovers records | Avoids a per-record index write | Less curated routing; scanning and relevance selection may become noisy as records grow |
| Category directories | Store records in folders by decision/fact/experience/risk/procedure | Simple deterministic coarse filter | Category overlap, taxonomy changes, misclassification, and moves; does not solve topical/cross-category navigation |
| Atomic records plus Map of Content (MOC)/topic maps | Curated topic pages point to records using ordinary Markdown links | Supports task/topic navigation across categories without duplicating claims | Maps also need maintenance/approval; can become stale or impose manual curation |
| Semantic map/graph | Explicit typed relations among records, entities, and sources | Could support dependency, contradiction, and supersession queries | Requires a stable relation model and verified updates; high complexity and maintenance, with no current evidence it is needed |

**Wikilinks are a link syntax, not a structure by themselves.** Relative Markdown links can connect records or maps without committing to a special wiki runtime. **Atomicity is also independent of navigation:** one fact/decision per record can coexist with categories, MOCs, or a graph.

### Working hypothesis for review

The current first-slice template declares one `Category` field with values `decision | fact | experience | risk | procedure`; it does not say whether records may have multiple categories or whether categories should determine paths. Treat these as record metadata, not an established folder taxonomy.

Keep records atomic and source-linked, with the existing category and lifecycle metadata. Do not assume category values imply category folders. Use a small, stable scope entry point; add curated maps or explicit typed relations only if the proposed retrieval jobs show that simple index/link navigation misses relevant records or produces too much irrelevant context. Do not select this as the final structure yet: first resolve growth assumptions, category cardinality (single vs multi-label), and which cross-record queries are genuinely expected. Any chosen design must account for approval frequency; avoiding a redundant index edit is not worth making retrieval unreliable.

### Retrieval flow to evaluate

A candidate flow is: resolve workspace/project scope → discover candidate records via the selected index/map/search method → filter category, lifecycle state, and freshness → read only relevant records → verify mutable claims at source → report applicable, no match, filtered, or unavailable explicitly. A vector/semantic retrieval service is not selected; consider it only if tested lexical/curated navigation misses relevant items at meaningful scale and its false positives, token/call cost, and maintenance are acceptable.

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

The first host trial saved and indexed one user-approved date decision; a fresh session found it via the index and checked current source. The response does not establish whether the record file itself was opened.

**Checkpoint / order change:** While implementing this knowledge capture/index/retrieval path, we recognized that records are expected to grow and that the interface/structure controls future navigation, retrieval accuracy, maintenance, and approval frequency. Pause additional capture and gate-workflow changes to define the knowledge interface first. This is a design priority, not approval to implement any particular structure (MOC, semantic map, wikilinks, or otherwise).

**Observed approval frequency:** the record write and later index update each required a separate successful user confirmation—two prompts for one decision. A no-preview index attempt was canceled during gate debugging; an earlier read-only shell false-positive and synthetic denied-write prompt were setup/test events, not representative steady-state samples. The user clarified that friction is the *number of interruptions*, not prompt wording. One decision is insufficient to establish a sustainable prompt rate.

Next design the smallest knowledge structure and retrieval interface that can grow while balancing precision/recall, scope/status/freshness filtering, source verification, navigation/maintenance effort, and approval interruptions. Compare alternatives before selecting an implementation. Keep the prompt-count result as a constraint; do not assume a static directory index is suitable as the record set grows, and do not implement batching or loosen confirmation without a separate decision.

**Jev revisit:** The later design of when/how to present a memory candidate for user review is a bounded-decision candidate (e.g. retain as candidate / keep transient / needs more evidence, or summarize a batch). See C09. Revisit only after actual candidate reviews reveal repeated friction—especially repeated approval interruptions, not merely unclear prompt wording. Jev may advise or prepare a review, never approve, persist, promote, suppress required confirmation, or delete knowledge.
