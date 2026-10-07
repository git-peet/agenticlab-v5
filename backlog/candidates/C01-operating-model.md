# V52-C01 — Default-first operating model and explicit workflows

**Status:** `framed` — core product direction; runtime behavior not settled

**Implementation readiness:** **Not ready.** This is a system-level design constraint, not a standalone coding task.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md)

## Purpose

Define how a user enters AgenticLab work and how conversational/default work relates to deliberate engineering workflows. A future session can use this record without access to V4 documentation.

## Context and evidence

V4 evolved from explicit persona/workflow invocation toward default or “raw” conversations as an ordinary usage mode. Its explicit workflows (`/plan`, `/implement`, `/debug`, `/review-pr`, `/test`, etc.) still encode useful sequence, approval, handoff, verification, and recovery behavior. The V4 audit concluded that these functions should remain available, while the fixed eight-persona chain, persona-owned memory, and required ceremony for simple tasks should not be copied by default.

The first V5 roadmap independently described a default agent that may answer, clarify, invoke an existing workflow, or delegate. The second-attempt evaluation did not test routing or workflow quality; this is grounded in intended product direction and V4 audit evidence, not a measured V5 feature.

**Historical sources (optional lineage, not required to understand this record):** V4 `MANUAL.md` §§4–5 and 8; V4-to-V5 audit Findings 1 and 14–18; first V5 roadmap §§2 and Priority 2 Q5–9. The audit's conclusions are summarized above.

## V5 direction

- Default/free work is a first-class entry path; the user need not select a persona to begin.
- User-invoked workflow execution remains distinct from an agent recommendation to use a workflow.
- Both paths share the same task scope, context/knowledge, governance, authorization, verification, and continuity semantics.
- A workflow is justified when its sequence or controls help the task; it is not a universal wrapper.
- The default agent remains the visible owner unless an explicitly designed coordination model changes that responsibility.

### Candidate transition contract — design only

| Situation | Default behavior | Boundary |
|---|---|---|
| Ordinary question or bounded task | Work directly: answer, clarify, inspect current source, or use an available capability within the user's task scope. | No persona/workflow selection ceremony; normal authorization and verification rules still apply. |
| Reusable skill or procedure is relevant | Apply the lightest relevant technique when its trigger and scope fit. | A technique does not grant permission or silently introduce a gated multi-phase process; see C06. |
| A named workflow could materially improve sequencing, handoffs, or assurance, and the user has not already chosen a mode | Briefly recommend the workflow and why it fits; identify any changed scope or approval boundary. | A recommendation is not invocation. Wait for the user's explicit invocation/approval before starting. Do not add a recommendation prompt after the user has explicitly invoked that workflow. |
| User explicitly invokes a workflow | Follow that workflow within the stated task scope and its own gates. | Invocation does not expand scope or inherit approval for unrelated/mutating steps; the shared governance contract applies. |
| Workflow is unavailable, ambiguous, or unsuitable | Say so; offer a bounded direct alternative if it is clearly within the user's request, otherwise ask. | Do not pretend the workflow ran or switch modes silently. |

**Initial ownership:** default agent remains accountable for the task and its final report. The first path is single-agent; specialist isolation/delegation remains a separate C07 decision, not an implicit consequence of workflow recommendation.

### Representative journeys to evaluate (user-described; not selected workflows)

1. **Implementation PBI:** The user has a solid PBI with description and acceptance criteria, starts in the default session, and explicitly invokes `/plan`. The workflow produces a reviewed execution plan; `/implement` is a separate user-approved next step. Because the user chose the workflow, the default agent should not add an extra “would you like to plan?” interruption. V5 should preserve the useful explicit sequencing and gates without porting V4's exact persona roster or prompt choreography.
2. **Research PBI:** The PBI has acceptance criteria, but its requested outcome is investigation/findings rather than code. Stay in default/free work: gather scoped current-source and relevant knowledge evidence, organize findings against the criteria, and report uncertainty. A domain lens may inform priorities/blind spots as a contextual perspective, not a full persona lock-in or workflow. PBI format and acceptance criteria alone do not imply `/plan` or implementation. If research suggests implementation as a follow-up, offer it as an option and wait for the user's intent. Read-only comparison clarified the lineage: the active DiaWorkspace has a phased research artifact labelled PBI 156138 under a `155600-kafka-integration` folder; `DOCS-Pedro` has PBI 156142's original text/acceptance criteria and an Architect design explicitly paused at `/plan` Phase 4; a separate implementation report documents the Kafka replacement feature; the populated backup has a post-merge audit note for PBI 156142. Use each file's own PBI/status labels rather than inferring ownership or lineage from its folder. V4 `Domain Lens Adoption` is a contextual reasoning stance in default sessions, not full persona/workflow invocation. These are read-only provenance examples only; no knowledge was copied into V5.
3. **Recommendation boundary:** To test whether a recommendation adds value, compare an implementation PBI presented in default chat without an explicit workflow command against the research PBI. Recommend/clarify only if the intent or material process choice is genuinely ambiguous; do not route just because the input is PBI-shaped or contains acceptance criteria. Count the interruption and whether it prevented a meaningful mismatch.

**Workflow recommendation threshold (open):** recommend a workflow when its explicit sequencing, gates, handoffs, or validation would materially improve a task whose mode the user has not already chosen—not merely because the task has multiple steps. A fixed complexity score, automatic router, or minimum workflow checklist is not proposed. C03/C08 own how any domain perspective is discovered or loaded; this C01 distinction does not select V4's automatic lens-injection mechanism.

### Qualitative evaluation set (design/prototype only)

| Case | Expected behavior | Evidence to capture |
|---|---|---|
| Implementation PBI with explicit `/plan` invocation | Enter the requested planning workflow directly; retain its approval gates. Do not add a redundant workflow-recommendation prompt. `/implement` remains a separate user-approved transition. | Whether the workflow followed the intended PBI/AC outcome; any unnecessary extra prompt or scope change. |
| Research PBI with acceptance criteria, no implementation intent | Stay in default/free work; gather scoped evidence and deliver findings against the criteria. A relevant domain perspective may inform reasoning without persona lock-in. Do not recommend `/plan` or `/implement` solely because the input is PBI-shaped. | Finding coverage, source/knowledge trace, false workflow suggestions, and whether implementation was kept out of scope. |
| Implementation PBI supplied in default chat without a workflow command | Remain in default mode until intent is clear. Offer one concise recommendation/clarification only if structured planning would materially help; never silently invoke `/plan` or start implementation. | Was the extra interruption necessary and useful? Did it avoid a meaningful mismatch, or did the user correct/reject it? |

Judge this initially with a small qualitative walkthrough, not a classifier benchmark. Count extra user-facing prompts and corrections; do not set a numeric routing threshold from these examples alone.

### First delivery-prompt prototype (synthetic; limited evidence)

- The research-only PBI stayed in default work and produced source-backed findings plus a task-local learning candidate without writes.
- Explicit `/plan` produced a source-grounded plan after a correction request; one plan-approval question followed, with no redundant workflow-selection prompt.
- A later fresh-session test of the canonical `system/prompts/delivery/plan.md` draft inspected the fixture contract/source/tests, distinguished requirements from verified facts, and returned `no new candidate` because the existing contract already held the learning; it asked only the single plan-approval question.
- A subsequent native-template run confirmed `/plan` registration and the planning-vs-implementation scope split, but listed the real `AgenticLab/knowledge` directory despite the fixture-only request, skipped the fixture contract, and proposed the documented compatibility fact again. It read no real record contents and made no edits; this is a scope/deduplication failure, not an approved plan.
- Explicit `/implement` changed only the synthetic fixture, asked no extra kickoff or per-phase confirmation, and the isolated fixture tests passed 3/3. Persistent knowledge was not written.
- Standalone `/premortem` stayed read-only and distinguished an expected contract limitation from a conditional partial-file risk.
- An early prompt-draft flow duplicated the compatibility candidate across plan, implementation, and premortem. The canonical V5 `/plan` prompt then correctly returned `none` because the fixture contract already recorded the behavior; the subsequent implementation handoff also returned no new candidate.
- The canonical `/plan` prompt was manually loaded in a fresh Pi session, then the synthetic implementation was performed with the V5 implementation draft. Only fixture files changed; the focused fixture tests passed 4/4 after implementation.
- In a later native prompt-template re-test, Pi opened `/plan` from a fresh process, but the fixture path had been cleaned prematurely; it stopped rather than inventing a plan. After the fixture was restored, a natural `/plan` session made one bounded header read per record, then read only a plausible body, but omitted `grep` and skipped the fixture contract. This did not expose excluded bodies, but it failed the planned complete source/contract review and repeated a documented candidate. The scope boundary and contract-dedup behavior remain limitations to address before treating the prompt as robust.

This remains a prompt-text prototype on a small, one-feature fixture. Pi's native prompt registry exposed all three (`/plan`, `/implement`, `/premortem`) when loaded through explicit `--prompt-template` flags for one process; there is no persistent `.pi/settings.json` registration or custom loader. Multi-phase evaluation, the default-session implementation-PBI recommendation case, persistent-write approval, and consolidation of a genuinely new cross-phase candidate remain untested. Under a strict fixture-only request, one later invocation also listed the real knowledge directory; no record contents were read.

### Initial tabletop assessment (reasoned proposal, not runtime evidence)

- **Explicit `/plan`:** start the requested workflow directly. Its own required inputs and approval gates remain, but do not add a separate recommendation/confirmation prompt merely to ask whether to use the workflow the user just invoked.
- **Research PBI:** stay in default/free work and produce evidence-backed findings against its acceptance criteria. A research deliverable is not an implicit implementation plan. Ask only if the intended outcome or criteria are materially ambiguous; any implementation follow-up is a distinct user choice.
- **Implementation PBI in default chat:** if the task is a genuinely multi-phase, cross-domain, or gate-sensitive change, recommend `/plan` once with a brief reason and wait before entering it. For a bounded single-domain task, work directly within the user's authorization. If intent is ambiguous between research and implementation, ask one outcome-focused clarification rather than both a clarification and a workflow recommendation.

The recommendation's value is avoided mismatch/rework versus the extra interruption. This is a candidate rule derived from the described V4 journeys, not yet validated in a V5 runtime or with multiple users/tasks.

### Tabletop result (reasoned, not a runtime test)

- Explicit `/plan`: begin planning without a second mode-selection question.
- Research PBI with acceptance criteria: remain in default work; no implementation workflow merely because the input is structured.
- Small, single-surface implementation request: likely handle directly if authorization and scope are clear.
- Default-session, cross-domain implementation PBI involving a changed external contract, asynchronous rejection/status flow, client behavior, and integration tests: provisionally recommend `/plan` once, explain the coordination/risk reason, and wait for the user's invocation. Never auto-switch or ask multiple overlapping questions.

The last case is a hypothetical derived from the structure of the user's Kafka example, not a measured result. A fresh Pi instruction-tabletop then classified five synthetic cases as intended: explicit `/plan` and clear research/small tasks stayed direct; a cross-domain implementation case got one `/plan` recommendation; an ambiguous research-vs-implementation case got one outcome clarification. This confirms the instruction-level decision table is understandable in a prompted scenario, not that recommendations improve real work or interruption costs. No workflow was invoked. Jev remains parked; use the transparent qualitative rule first.

### Default-entry first-response probe (scenario-only)

In a fresh Python Pi session, the user presented a synthetic cross-domain implementation PBI in default mode and asked what to do first, without invoking a workflow. The agent proposed a read-only surface map and validation check; it did not recommend `/plan`, ask a question, inspect code, or edit anything. This was a zero-interruption first response. It suggests a possible sequence: start with a safe, bounded discovery step when asked how to begin, then reassess workflow value once scope is grounded. It does not show whether that discovery would later trigger `/plan` or avoid rework; the test stopped at the first response.

## Explicit exclusions

This record does **not** select automatic routing, a “master” agent, Jev classification, a fixed persona roster, or the exact commands to preserve. Do not port V4 prompts verbatim. Candidate forms for expertise (lens, skill/procedure, workflow, isolated specialist) are tracked in C06/C07.

## Preconditions before design or implementation

1. The user confirms the shared-contract/two-entry-path direction in the roadmap.
2. Use the implementation-PBI and research-PBI journeys above, keeping their outcomes and authorization boundaries distinct.
3. For workflow-recommendation evaluation, include a default-session implementation-PBI variant with no workflow command; compare with the explicitly invoked `/plan` path. Do not test both by silently changing conditions.
4. Specify how the selected harness represents each path and its failure/fallback behavior.

## Acceptance questions for a future bounded design

- Does an explicitly invoked `/plan` begin directly, without a redundant workflow recommendation prompt, while retaining its own approval gates?
- Does a research PBI with acceptance criteria stay in default/free work and produce evidence/findings without silently becoming an implementation plan?
- When an implementation PBI arrives in default chat without a workflow command, does a recommendation or clarification materially help enough to justify its interruption?
- Do direct and workflow modes use the same scope and safety contract, and does one owner remain accountable across any handoffs?

No quantitative threshold is set. Evaluate the three cases qualitatively first; count unnecessary prompts and user corrections, and define task-specific acceptance checks before implementation.

## Timing / next action

The user identified an implementation PBI that explicitly enters `/plan` → optional user-approved `/implement`, and a research PBI with acceptance criteria that stays in a less-gated default session with knowledge gathering/domain context. Read-only source review found corresponding Kafka examples: research PBI 156138, an explicit `/plan` design for PBI 156142, and a related implementation report; these document different work products and should not be conflated by folder name or authorship. The synthetic prompt pilot supports research-mode handling and explicit workflow entry; it does not test multi-phase checkpoints or durable-write approval. Cross-phase capture needs explicit consolidation.

A fresh Pi tabletop of the default-entry implementation case returned a single read-only surface-mapping next step, with no `/plan` recommendation or clarification prompt. That is a plausible low-interruption first move, but the test asked only for the first response and did not inspect code or test whether the agent would later recommend a workflow after discovery. All three prompt templates are available in the Pi prompt registry when loaded with explicit `--prompt-template` flags for one process; they are not persistently registered in `.pi/settings.json`. **Do not implement a router or port workflows from this record alone.** Secondary delivery prompts are parked in `backlog/README.md`; system prompts remain deferred, and C09 Jev is parked per the user's direction. Next design focus is C03 context engineering; revisit C01 routing only when a real task shows that a bounded discovery step needs an explicit workflow transition.
