# V52-C11 — Project bootstrap, greenfield setup, and workspace isolation

**Status:** `candidate`; setup and distribution boundary open

**Implementation readiness:** **Not ready for setup/reset tooling.** Decide the first host and data boundary first.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C02 knowledge](C02-knowledge-lifecycle.md), [C08 runtime](C08-runtime-adapters.md)

## Purpose

Start AgenticLab in an existing project or a greenfield assignment without confusing system configuration, target-project knowledge, work history, and external/user-owned material. Prevent one workspace's memory/history from silently becoming another project's context.

## Context and evidence

V4's startup combines project questionnaire, adapter/hook installation, topology, Graphify setup, and warmup. The audit recommends separating project profile, host integration, and bootstrap/context production; Graphify and warmup outputs are not universal runtime prerequisites. The V4 backlog proposes a greenfield startup path because code-analysis warmup has little to analyze in an empty project. It also identifies a possible workspace reset/seeded-state hazard, but its own correction notes that some alleged contamination was not verified in the audited copy. Thus reset safety is a valid boundary to design, not evidence that every V4 copy is contaminated.

V5's memory contract distinguishes session, feature, project, workspace, system, and external-reference scopes and forbids silent cross-project transfer. The clean V5 repository is the proposed system home; the Python expense tracker is a possible separate host/playground, not yet selected.

**Historical sources (optional):** V4 `agents-empty-startup-greenfield-variant.md`, `project-memory-reset-check-gap.md`, `MANUAL.md` §§3 and 11, Neo audit Finding 9; V5 roadmap Priority 5 Q22, memory spec §5. Relevant evidence and uncertainty are summarized above.

## V5 direction

- Treat bootstrap as an explicit setup/knowledge-production process, not always-on work.
- Separate AgenticLab system design history from a target project's code, decisions, and learning.
- A greenfield workspace has no code facts to infer; begin from the user-provided objective and accumulate verified knowledge as work occurs.
- Any deployment/import/reset operation must show exactly what data is affected and require appropriate human approval. Recovery/reset never silently expands scope or deletes governed knowledge.

## Explicit exclusions

No V4 monolithic setup prompt, mandatory warmup, mandatory Graphify, automatic knowledge import, destructive reset command, or assumptions about the Python repo's current code state. Do not modify the Python project from this record.

## Preconditions / acceptance

Before placing AgenticLab in a host workspace, determine canonical system source, instance/config/knowledge location, project identity and scope, version/update mechanism, and whether any existing state is present. Test both an empty/greenfield workspace and a workspace with existing files. A reset preview should enumerate every affected file and category before any deletion proposal; never rely on line count alone to infer seeded knowledge.

## Timing / next action

Decide the system-to-host boundary before integrating with the Python playground. Greenfield setup and reset tooling can follow a concrete setup use case; neither blocks a read-only first task in a prepared workspace.
