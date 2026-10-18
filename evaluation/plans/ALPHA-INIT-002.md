# ALPHA-INIT-002 — Fresh delivery-workspace initialization readiness

**Status:** Completed with limitations; runtime slash-command availability not independently verified  
**Run ID:** `ALPHA-INIT-002`  
**Prepared:** 2026-10-17  
**Baseline reference:** [`../baselines/ALPHA-BASELINE-001-v0.1.md`](../baselines/ALPHA-BASELINE-001-v0.1.md)  
**Payload:** AgenticLab local payload built from commit `3e779dc31aa581efe07a6426b27767c2a77d4d88`  
**Target:** `/home/peet/Projects/V5-alpha-tune001/` (EverShop package reports v2.2.1; workspace has no Git metadata, so the exact source commit is unavailable)

## Question

Can the tuned AgenticLab payload be initialized in a second clean delivery workspace with the approved scope/preview/write gates and make its local instructions and opt-in workflows available in a fresh Pi session?

This is a setup/readiness smoke only. It is not part of the PBI 2 tuning-effect measure and does not claim complete EverShop orientation.

## Conditions and scope

- A new EverShop copy and the committed AgenticLab payload are present at the target path. The inspected package version is 2.2.1; no `.git` metadata is present. Known PBI 1/2 source/test artifacts were absent in the inspected paths. `.env` and repository-root `data/` were not inspected.
- Run the approved `AgenticLab/prompts/system/initialize-workspace.md` flow from this workspace only.
- Candidate initialization writes are limited to the four previewed setup/profile files: `AgenticLab/PROJECT-SCOPE.md`, `AgenticLab/PROJECT-OVERVIEW.md`, `.pi/settings.json`, and `.pi/APPEND_SYSTEM.md`. No file is written until the user approves the complete exact preview.
- Do not rerun setup if these files already exist or ownership is ambiguous; stop and ask.
- No EverShop app/server, PostgreSQL, `.env`, root `data/`, dependencies, full Jest/E2E, or application build. No global Pi configuration change.

## Acceptance checks

- Project identity, workspace boundary, and exclusions are confirmed before project-source reads.
- Orientation is bounded and partial coverage/unknowns are stated honestly.
- A complete preview precedes all writes; actual writes match the user-approved four paths.
- No host application source, package/lock files, protected data, or global settings are changed/accessed.
- A fresh trusted Pi session discovers the append-system context, extension, and `/initialize-workspace`, `/plan`, `/implement`, `/premortem`; none runs automatically.

## Measures

Record relevant reads/writes and their paths (not content), clarification/approval turns, any blocked/failed operation, Pi version/model/provider, session window and usage/cost if available. Separate initialization-worker metrics from coordinator-session metrics. Window span is not active/hands-on time. Keep raw session history local and do not copy it into the result.

## Stop conditions

Stop on unclear project identity/scope, pre-existing setup files, a write before explicit preview approval, protected-path access, any app/database/test/dependency operation outside this plan, or mismatch between the approved preview and actual changes.

## Approval and outcome

The user approved this preregistration and separately approved the exact four-file initialization preview before writes. The setup files were written and read back. The later `/help` text was submitted through Herdr's agent-prompt interface and was answered as ordinary user text; it is not evidence that the slash commands were present in the TUI registry. Verify command availability using an actual fresh Pi command-completion/invocation check before relying on it.
