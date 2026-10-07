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

### Minimal context-assembly model v0 (design proposal, not selected)

```text
TASK
  → establish workspace, requested outcome, scope, and authorization
  → always retain the user's current request plus the shared operating/safety contract
  → on demand, select current source and relevant project context
       ├─ INDEX/MOC route → scoped record metadata/status → eligible evidence only
       ├─ current code/tests/docs for present-tense behavior
       └─ optional domain lens or procedure when it materially helps
  → if explicitly invoked, add only the approved workflow plan/checkpoint and current phase handoff
  → answer or act within scope; preserve source/provenance and uncertainty
```

**Default work:** begin with task/scope and inspect only the sources needed for the next decision. A task may retrieve scoped knowledge or use a domain perspective without loading a full persona, running a workflow, or auto-injecting a digest. A research PBI stays research unless the user requests implementation.

**Sufficiency/stop rule:** Assemble what is needed for the next decision or action; stop when it is sufficient to proceed and verify. If it is not, retrieve relevant evidence or ask a focused clarification. For knowledge retrieval, follow C02's complete scoped scan and outcome rules ([C02 index-completeness rule](C02-knowledge-lifecycle.md#proposed-index-completeness-rule-candidate), [knowledge-contract: Indexes, maps, and collections / Lifecycle / Retrieval outcome vocabulary](../../system/brain/knowledge-contract.md)); an incomplete scan does not support a no-match claim.

**Explicit workflow:** add the user-invoked workflow instructions, approved plan, and current progress/handoff to the same context model. Do not treat a record, checkpoint, or workflow prompt as new authority. Carry task-local learning candidates with evidence across phases, then consolidate; do not force automatic memory writes.

This sketch keeps the knowledge store, read/search method, domain perspective, skill, and workflow as separate layers. It does not select an always-on digest, fixed token budget, automatic domain classifier, custom context planner, universal persona loading, or a new retrieval service. Progressive disclosure remains an optional way to limit delivered content from genuinely long sources; it does not replace complete scoped search when completeness is claimed.

### Context source policy v0 (proposal)

| Context source | When to include | Role / boundary |
|---|---|---|
| Current user request, objective, scope, and authorization | Always | Defines the task and allowed actions; a PBI format alone does not imply implementation. |
| Shared operating/safety instructions and verified host capabilities | Baseline | Governs action and stop rules; tool availability is not permission. |
| Current source, tests, and authoritative external contracts | When needed for present behavior or design | Prefer direct, scoped evidence; label facts, requirements, and inference separately. |
| Project knowledge via INDEX/MOCs and authoritative records | Only when the task could benefit | Scope/status filter before snippet-producing search; maps route but do not establish truth or completeness. |
| Domain perspective or reusable procedure | Optional, when it materially improves focus | A lens changes reasoning priorities, not authority, output gates, or workflow mode. A procedure is a method, not permission. |
| User-invoked workflow, approved plan, and current checkpoint | Only in that workflow/resume context | Add the approved task state and relevant handoff; do not import unrelated history or expand authorization. |
| Task-local candidate-learning handoff | Only after meaningful discoveries | Ephemeral provenance for later consolidation; not an automatically loaded knowledge store or durable write. |

Do not load session logs or all role/persona memories as a generic default context source; retrieve operational history only when needed to resume or answer a scoped question.

### Workload families and bootstrap boundary (initial, non-exhaustive)

| Work family | Likely minimum context | Boundary to preserve |
|---|---|---|
| Direct question or bounded change | Request/scope, relevant instructions, exact current source | No persona/workflow ceremony or broad project-memory load by default. |
| Research/exploration PBI | Research acceptance criteria, scoped source/docs, relevant records, optional domain perspective | Findings and uncertainty, not implementation; PBI format alone does not imply `/plan`. |
| Bug diagnosis | Symptom/repro, relevant current path/tests/contracts, task history only if it explains a prior attempt | Confirmed evidence vs. hypotheses; no implementation until separately authorized. |
| Explicit planning | User-invoked workflow prompt, PBI/ACs, code surface, relevant scoped decisions/contracts | Produce plan and provenance handoff; do not implement. |
| Approved implementation/resume | Approved plan, current phase/checkpoint, changed source and validation results, carried candidate-learning list | Preserve scope; load only the state needed to continue; stop on material deviation. |
| Test/review/premortem | Relevant diff/current source, acceptance criteria, integration contract, prior plan/capture handoff | Independent review context when needed; distinguish findings from permission to fix. |
| Workspace bootstrap | Project identity/topology and setup sources in a deliberate one-time initialization pass | Separate from everyday context assembly; `/warmup` remains deferred for later system-prompt review. |

These are workload families to check for coverage, not a list of mandatory workflows or files to load. Other recurring work families may be added from actual use.

**V5 source-root context caveat:** Pi is installed globally and can be launched from any workspace; its working directory determines project grouping, context discovery, and project-resource lookup. The V5 repository currently has no root `AGENTS.md`, so Pi can run there but will not automatically receive V5-specific source-repo instructions from this checkout. `system/AGENTS.md` is a distributable target-project payload whose paths assume an installed `AgenticLab/` directory; do not inject it unchanged as developer-root guidance. A separate V5 root instruction file or an explicit per-process context is optional context wiring to decide later, not a prerequisite to run Pi. Python-host sessions continue to use their own root/context boundary.

**Evaluation questions:** (1) Did each loaded source materially help the next decision? (2) Was required context missed or irrelevant/off-scope context loaded? (3) Could the same result be derived more cheaply from current source? (4) Were knowledge candidates traceable and non-duplicative across phases? (5) How many user-visible interruptions were required? Use representative direct, research, and explicit-workflow tasks; do not infer a fixed context budget from the current small samples.

## Explicit exclusions

No unconditional memory floor/Digest, embeddings/vector service, graph traversal, semantic reranker, autonomous multi-query loop, fixed context token budget, or permanent retrieval telemetry is selected. These can only follow measured misses or costs that a simpler mechanism cannot address.

## Preconditions and acceptance checks

Before implementing retrieval, specify the next-step information need and scope. Tests should cover right-scope match, wrong-scope rejection, stale/superseded filtering, no match, filtered-only results, and storage failure. On an approved real task, inspect whether loaded items helped, misled, or were unnecessary; verify code-backed facts against current code. Count calls/tokens only if those measures answer a named decision.

## Timing / next action

C02's minimal INDEX → curated MOC → scoped-record interface is sufficient as the current knowledge foundation; its native two-phase search remains a manual completeness procedure, not a custom retrieval engine. The next V5 design pass is the context-assembly model above for default and explicitly invoked workflow sessions: distinguish always-on operating rules, task/request context, current-source evidence, scoped project knowledge, optional domain perspectives/procedures, and approved plan/checkpoint state. Prefer staged, task-relevant loading and trace material sources; do not add an unconditional digest, general context planner, fixed token budget, or semantic retrieval. Use representative direct, research, and explicit-workflow tasks to check whether each source was useful or unnecessary. Keep advanced retrieval parked until real tasks show misses that current sources and native tools cannot address.
