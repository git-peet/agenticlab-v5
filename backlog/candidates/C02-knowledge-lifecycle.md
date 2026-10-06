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

The first host trial establishes only a narrow starting point: one active date decision was linked from `INDEX.md`, found in a fresh session after the user explicitly asked Pi to check project knowledge, and checked against current source. The pasted response does not prove that the record file itself was opened, nor that task-driven retrieval would find it without that instruction.

**Current V5 implementation boundary:** `system/brain/knowledge-contract.md` and `system/AGENTS.md` define the record lifecycle and instruct selective file reads; Pi's native `read`/`ls` tools performed the host trial. `system/adapters/pi/knowledge-write-gate.*` gates supported `write`/`edit` calls and blocks visible shell references—it does not implement read selection, search, index parsing, MOC/graph traversal, ranking, or retrieval telemetry. V5 has no custom retrieval engine yet. The user expects records to grow. A decision about this interface is therefore needed before another retrieval or capture mechanism is implemented.

### Comparative data-source boundary

Do not conflate these two DiaWorkspace paths, and do not confuse either with the Python V5 experimental host:

- **Experimental host:** `/home/peet/Projects/Practice/Python/Py-Desktop-Expense_Tracker/`. This remains the only V5 test host; DiaWorkspace is not being promoted to an implementation workspace.
- **Active DiaWorkspace copy:** `/home/peet/Projects/Practice/DiaWorkspace/AgenticLab/`. It is a Git working tree (`main`, HEAD `bae5ccf`) with modified and untracked files. Its hot-tier role/shared MOCs are largely empty templates, although other knowledge remains. Do not overwrite it.
- **Populated V3 Neo backup baseline:** `/home/peet/Projects/Full Laptop Backup/Agents/AgenticLab V3 Neo Backup/AgenticLab/`. Its knowledge tree has 113 files, 84 Markdown files, 41 directories, and about 932 KiB; architect, senior, explorer, tester, reviewer, UX, and shared MOCs contain substantial populated content. It lacks the active copy's `.git`, `tools/`, `.gitignore`, and `QUICKSTART.md`, so it is a historical reference, not a drop-in replacement.

Only a selective, read-only review of valuable backup material is in scope. Do not copy or import its knowledge into V5 or Python. Counts and structure are not evidence that any item remains useful or accurate; model recoverability must be assessed separately.

### V5 design stance: preserve capability, redesign mechanisms

V4's retrieval system accumulated layers over time, but that history is evidence of distinct needs and interactions—not proof that every mechanism should be ported unchanged, nor that layered capability should be discarded as patchwork. V5 should preserve demonstrated user value and useful synergies while seeking a more coherent, inspectable interface. Fewer files or mechanisms alone is not a success criterion; neither is reproducing V4's architecture because it exists.

Before selecting or removing a capability, map: the user problem it addresses; the V4 mechanism(s) involved and their interactions; evidence of benefit/failure; context, latency, maintenance, and approval costs; what a current model/source can re-derive; and a reasoned V5 disposition (`preserve`, `merge`, `replace`, `defer`, or `remove`). Remove or simplify only when the capability is redundant, no longer valuable, or can be supplied more reliably and cheaply another way without losing a demonstrated outcome.

### V4 retrieval-capability map (backup inspection; baseline, not endorsement)

Evidence labels distinguish specification, implementation, populated artifacts, and user-level outcome. The selected backup inspection was read-only and selective; it does not establish that these mechanisms helped current models on real tasks.

| Capability | V4 mechanisms and interactions | Evidence observed | Main costs, risks, or unresolved questions |
|---|---|---|---|
| Session orientation | Brain modules plus `DIGEST.md` injected at session start; digest summarizes conventions, gotchas, architecture, dependencies, and concept index; branch/tier tags can filter digest bullets | **Implemented/documented** in backup Pi adapter/spec; populated 8.6 KB digest with source-derived and decision-like summaries | Always-on context; content can duplicate code/MOCs or become stale. Branch tier filter applies only to digest bullets; no user-level benefit comparison against a current-model/no-memory baseline was found. |
| Hot navigation and domain routing | Shared/agent MOCs; task terms compared with `SYSTEM_CORE` domain watch terms; Pi adapter may emit a bounded heading/summary pointer digest, while protocol instructions also direct agents to read MOCs | **Populated** MOCs and **implemented** bounded Pi pointer-digest code | Runtime differs by mode: docs describe session-start MOC reads, while the inspected Pi adapter narrows/caps domain summaries. Full versus summary loading must be measured per harness, not assumed. |
| Conceptual retrieval | `SEMANTIC_MAP` names, slugs, aliases, trigger terms, `Governs`, `Related` links, wikilink resolution; matching triggers cold notes with per-turn/session caps and dedup | **Implemented** Pi trigger matcher and populated map; 30 usable nodes route to 16 target files | Trigger misses/false matches; status validation is not enforced by the inspected matcher (health guidance says lingering `candidate` nodes still participate). Some nodes target whole large MOCs, so relevant concept != minimal payload. Docs describe one-level `Related` traversal; the inspected Pi matcher path showed direct trigger/file matching, so that behavior needs per-harness verification. |
| Code-topology support | Graphify structural dependency/centrality graphs complement semantic concepts and execution-flow notes | **Documented** and referenced by populated Explorer/Architect knowledge | Graph freshness and setup/maintenance; structural graphs can be rebuilt from source, while semantic maps may add curated cross-module meaning. Keep their roles distinct. |
| Feature/procedure retrieval | Feature files/index for multi-phase cross-agent work; skill files for repeated procedures; status lifecycle and triggers route them separately from general MOCs | **Documented** in memory spec/MANUAL and **populated** examples exist | Feature state can become stale; skills require repeated validation and actor/approval fidelity. Avoid loading completed feature history as current instructions. |
| Accuracy and lifecycle control | Four-question write filter, conflict check, provenance/type tags, confidence/recency/supersession, branch/tier guard; `/review-memory`, `/refine`, `/triage` audit or curate | **Documented/implemented** in prompts/spec and reflected in dated/superseded backup records | Human review and maintenance consume time/approval interactions; old entries can remain alongside corrections; preserved history must not be mistaken for current truth. Actual prompt frequency and correction efficacy are not established by the backup. |
| Episodic continuity and consolidation | Dated session LOGs and checkpoints; `/retro` promotes selected episodes into semantic memory; mid-sprint LOG retrieval is explicitly deferred in the backup | **Documented**; logs/checkpoints populated; end-of-sprint consolidation prescribed | Logs accumulate, are generally not retrieved at task start, and promotion creates another review/write path. Checkpoints are short-lived state, not durable project knowledge. |
| Freshness and observability | `.memory-stale`, `.memory-debt`, major-replacement markers, match/token counters, and `/system-health` checks | **Implemented/documented** in the backup; improvement notes show follow-on gaps and revisions | Metrics mostly count matches/caps/cost, not whether the selected record improved an answer or why alternatives were skipped. Some thresholds were explicitly “reasoned, not measured”; instrumentation is not proof of effectiveness. |
| Separate information products | User `notes/` library is explicitly never auto-loaded; `improvements/` tracks AgenticLab-system changes and is not project memory; LOG/checkpoint/reference surfaces have distinct purposes | **Documented** in MANUAL and populated backup | Mixing these into one knowledge index would pollute task retrieval and scope. They may share a filesystem but need distinct discovery and retention policies. |

**Interaction path (conceptual):** current source/structural graph and delivery work produce observations → write filter/conflict check/user review decides whether to preserve them → entry is routed to MOC, atomic note, feature file, skill, LOG, or separate user/system backlog → digest/MOC/map/feature index determines discovery and loading → mutable claims are checked against current source → review/refine/retro correct, consolidate, supersede, or archive. These steps form a capability chain; reducing one surface may shift cost or failure into another.

**Observed runtime granularity:** 9 usable map nodes point to a ~3.9 KB symbol index and 3 point to a ~27.8 KB Architect MOC. The adapter caps notes/domains loaded, but a match can still load a much larger file than the matched concept. This is a candidate design issue—not proof that the legacy mechanism failed—because the backup contains no controlled user-level retrieval outcome for these examples.

### Proposed retrieval jobs

Treat these as a workload to review, not as validated requirements:

1. **Exact decision recall:** find a scoped decision and return its claim, rationale, status, and provenance.
2. **Task-relevant guidance:** identify applicable procedures or risks for a current task without loading unrelated records.
3. **Relationship/conflict lookup:** find supporting, contradicting, superseding, or dependent records when a task crosses topics.
4. **Correct negative result:** distinguish no match from out-of-scope/inactive/filtered records and from an unavailable store.
5. **Freshness/source check:** verify mutable claims against current source; surface contradiction or staleness rather than quietly trusting old text.

For each job, evaluate relevant-record recall, irrelevant/wrong-scope retrieval, source correctness, stale/conflicting handling, amount of context inspected, and user effort. Include **approval interactions per task/decision** and redundant metadata/index writes; prompt wording alone is not the friction measure. Read-only retrieval should not create approval prompts; confirmation remains at persistence boundaries. The first trial is one sample only.

### Read/retrieval mechanisms to compare

| Approach | Strength | Main tradeoff / evidence needed |
|---|---|---|
| Native file listing/reading from an index | No new runtime or index; inspectable and appropriate for a tiny collection | Agent must find the correct path manually; recall and context cost may degrade as candidate count grows. This is what the first Python-host trial used, after an explicit instruction. |
| Curated MOC/topic map with relative links | Human-readable, supports cross-category navigation and preserves known conceptual routes | Requires ongoing curation and approvals; omissions can hide valid records; maps may duplicate navigation already recoverable from source. |
| Local lexical full-text search | Deterministic, low infrastructure, useful when task terms resemble record wording | Misses paraphrases/implicit relationships; ranking and scope/status filtering need design. Current V5 gate blocks shell commands that mention project knowledge, so this needs a safe read-only host tool/search capability—not a shell bypass. |
| Curated semantic trigger map (V4-style) | Can route task language to concepts, aliases, and related sources beyond filenames | Trigger authoring, false matches/misses, stale paths, coarse target files, per-turn context cost. Keep the useful capability, but test it against real queries and current source. |
| Model/embedding-based semantic search | May find paraphrases and concepts not covered by explicit terms | Adds retrieval uncertainty, cost/privacy/infrastructure, ranking evaluation, and possible wrong-scope results. Not selected; require evidence that simpler methods miss valuable records first. |

A **candidate hybrid flow** (not selected) is: resolve workspace/subproject scope → use a curated map for high-value routes and local lexical discovery for coverage → filter by lifecycle/status/freshness → read a small set of exact records → verify mutable claims against current source → report applicable, no-match, filtered, or unavailable explicitly. Semantic/embedding fallback and retrieval-trajectory telemetry remain optional candidates, not baseline requirements.

### Model capability and source recoverability

Do not preserve knowledge merely because it once helped a less capable model. Evaluate the marginal value of each knowledge type with the current model and available project context. Current code, tests, and maintained documentation may make ordinary implementation facts cheap to re-derive; the model still may not recover an unrecorded decision, its rationale, a rejected alternative, a hidden constraint, or a costly discovery. Prioritize durable, reusable information that is not cheaply recoverable from current sources; verify source-derived claims rather than treating memory as truth. When practical, compare a current-source/no-memory baseline against scoped-memory assistance on representative tasks, including accuracy and context/review cost.

### Preliminary value/recoverability matrix (qualitative; baseline sample only)

| Knowledge class | Dia backup example | Likely recoverability from current sources/model | V5 design hypothesis |
|---|---|---|---|
| Current implementation facts and conventions | DIGEST bullets and MOC summaries of paths, frameworks, and code patterns | Often high if code/docs are available; can still be costly to rediscover in a monorepo | Do not duplicate ordinary facts by default. Keep concise source pointers or verified exceptions only when they repeatedly save meaningful discovery. |
| System topology and navigation | Explorer/Architect MOCs, symbol index, runtime-flow notes | Partly recoverable from code and structural graphs, but cross-module boundaries and useful search routes can be expensive to reconstruct | Retain only task-useful maps that reduce navigation cost; keep them scoped and source-linked rather than treating a graph snapshot as truth. |
| Decisions, rationale, external agreements | Architect ADRs and notes recording BE decisions/tradeoffs | Often low: implementation may show what happened, not why, what was rejected, or which external contract was agreed | High-priority candidates when reusable; store with provenance, scope, status, alternatives/consequences, and re-verification conditions. |
| Costly gotchas, risks, and corrections | MOC entries describing non-obvious bypasses, source changes, and superseded findings | Mixed: code may expose the current behavior, but not the discovery cost, historical failure, or reason not to “fix” it | Keep only non-obvious/recurrent/high-impact cases; mark confidence, status, source, and freshness, and prevent stale entries being presented as current. |
| Procedures and skills | Shared skill candidates and test/review procedures | Sometimes re-derivable, but validated repeated workflows can save steps and prevent omissions | Separate procedural knowledge from descriptive facts; retain after recurrence/validation and preserve actor/approval boundaries. |
| Feature and session state | Feature records, dated LOGs, checkpoints | Temporary state is not reliably inferable after a session, but loses value as work completes | Use bounded, status-bearing feature/checkpoint records for active work; archive or promote only durable decisions, not entire session histories. |
| User notes and AgenticLab-development backlog | `knowledge/notes/` (explicitly not auto-loaded) and `knowledge/improvements/` | Not necessarily recoverable from application source; belongs to a different audience/purpose | Keep these as separate information products, not in the default project-memory retrieval path. |

This is a qualitative sample, not a classification of all 113 backup files. The backup's `DIGEST.md` is about 8.6 KiB and documented as always-on; its semantic map has 30 usable nodes pointing to 16 files. Some nodes target large MOCs (three target the ~27.8 KiB Architect MOC; nine target a ~3.9 KiB symbol index), so conceptual navigation does not always imply atomic retrieval granularity. The Pi adapter caps matches and per-session loads, but a matched large target can still introduce unrelated sibling material. V5 should measure useful payload granularity, not only whether a map found a file.

The backup also demonstrates that storage structure and runtime loading are separate interfaces: the V3 docs describe digest/hot/cold/feature tiers, while its Pi adapter applies bounded pointer digests and trigger-based full-note loads. Verify actual loading per harness/mode before comparing context cost; do not infer runtime behavior from folder names alone.

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

Next map the valuable V4 retrieval capabilities and interactions, then design the smallest coherent knowledge structure/interface that can grow while balancing precision/recall, scope/status/freshness filtering, source verification, navigation/maintenance effort, and approval interruptions. Compare alternatives before selecting an implementation; preserve outcomes, not mechanisms by default. Keep the prompt-count result as a constraint; do not assume a static directory index is suitable as the record set grows, and do not implement batching or loosen confirmation without a separate decision.

**Jev revisit:** The later design of when/how to present a memory candidate for user review is a bounded-decision candidate (e.g. retain as candidate / keep transient / needs more evidence, or summarize a batch). See C09. Revisit only after actual candidate reviews reveal repeated friction—especially repeated approval interruptions, not merely unclear prompt wording. Jev may advise or prepare a review, never approve, persist, promote, suppress required confirmation, or delete knowledge.
