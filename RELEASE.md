# AgenticLab V5.2 — Release Note

**Release label:** `V5.2-RC1 — experimental`
**Date:** 2026-11-27
**Payload revision:** `d07ff5d`
**Status:** Experimental release candidate. Not a stable product release.

## What this is

V5.2 is a generic AgenticLab payload for Pi-based delivery work. It installs as a workspace-local
`AgenticLab/` directory with project-local `.pi/` wiring. It does not modify the host application,
does not require a global Pi setup, and does not import project knowledge from other workspaces.

This release candidate has a coherent operating contract, bounded knowledge and governance slices,
first-use initialization, reviewed payload refresh, and an external acceptance suite. It has been
validated in fresh workspaces and across two delivery rounds, but it is **not** a claim of general
productivity, safety superiority, or stable release readiness.

## Included capabilities

- **C02 bounded knowledge lifecycle** — scoped retrieval, inactive candidate staging, explicit
  promotion/rejection, correction/supersession, and explicit retrieval outcomes.
- **C03 thin context slice** — prompt-driven context guidance and content-free context metrics.
- **C04 governance/safety slices**:
  - path-based sensitive-file protection;
  - semantic authorization-fidelity, blocker, and fail-safe rules;
  - checkpoint-derived exact write/shell scope during `/implement`;
  - knowledge-path, write-capable-read, system-subject, refresh, workflow-ordering, and
    bare-path hardening.
- **C11 initialization and refresh** — full setup preview, explicit approval, source revision and
  sha256 manifest, workspace-owned state preservation, and conflict detection.
- **Delivery workflows** — opt-in `/plan`, `/implement`, `/premortem`; transient checkpoint;
  implementation log before checkpoint disposition.
- **Knowledge contract guidance** — worked examples for convention records, explicit evidence and
  lifecycle boundaries.

## What it can claim

- Default work and explicit workflows share one scope/authority/safety contract.
- Stored records, retrieved context, plans, tool output, and confidence are not authority.
- Sensitive path values are protected by a deterministic lexical gate.
- Knowledge writes, promotions, and rejections require the dedicated adapter and explicit
  confirmation; gate failure fails closed.
- `/implement` write/shell scope is deterministically checked against the approved checkpoint for
  tested command shapes.
- Workspace-owned project scope, overview, policy, knowledge, pending candidates, and logs are
  preserved through payload refresh.
- Metrics and evaluation are external to the payload and content-free.

## What it cannot claim

- It is not a stable product release.
- It is not an OS sandbox or shell parser.
- It does not deterministically intercept every commit, push, install, network, migration, or
  destructive action.
- It does not prove general delivery speed, quality, or safety improvement over plain Pi.
- It does not include V4 tiers, zero-tolerance tables, fixed caps, structured blocker schemas,
  DIGEST injection, content-based secret scanning, a general context-policy engine, or Codemode.
- C13 query-shape guidance was tested but not published; R2 did not show improvement.
- Retrieval activation and precision remain model- and task-dependent.

## Supported host assumptions

- Pi with project-local `.pi/settings.json` and trusted project resources.
- Generic payload copied as `AgenticLab/` into a target workspace.
- Workspace root remains authoritative for scope and data boundaries.
- No global Pi configuration, host-root `AGENTS.md`, or application-source coupling is required.

## Install and use

1. Copy the clean payload into a target workspace as `AgenticLab/`.
2. Invoke `/initialize-workspace` from the workspace with the project scope.
3. Review the complete setup preview and approve explicitly.
4. Start a fresh trusted Pi session so prompts and the extension load.
5. Use `/plan` and `/implement` only when explicitly invoked or approved.
6. Use `/refresh-payload <payload-dir>` for reviewed payload updates; it preserves workspace-owned
   state and stops on divergence.

## Validation evidence

- Release acceptance suite: `AgenticLab-tools/release/acceptance.mjs`
  - 15 release checks passed;
  - external AgenticLab-tools suites 66/66 passed.
- Fresh release-candidate smoke: [`evaluation/results/RELEASE-CANDIDATE-001.md`](evaluation/results/RELEASE-CANDIDATE-001.md)
  - initialization, prompt/extension registration, no workflow auto-run;
  - exact/near-miss action scope;
  - sensitive path allow/deny;
  - payload refresh `noop`;
  - `/plan` → `/implement` with implementation log before disposition.
- Capability matrix: [`evaluation/RELEASE-CAPABILITY-MATRIX.md`](evaluation/RELEASE-CAPABILITY-MATRIX.md)
- R1 and R2 delivery evidence: [`evaluation/results/ALPHA-DELIVERY-R1.md`](evaluation/results/ALPHA-DELIVERY-R1.md),
  [`evaluation/results/ALPHA-DELIVERY-R2.md`](evaluation/results/ALPHA-DELIVERY-R2.md)

## Release decision

This repository labels the current state **experimental release candidate**. Publication, tagging,
or an external announcement requires separate explicit approval.

The next evidence that should change this state is sustained real use, a repeated concrete failure,
or a clearly bounded improvement with a new comparison. Mechanism work without that evidence is
not justified by RC1.
