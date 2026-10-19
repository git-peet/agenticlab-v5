# Herdr / Pi session handoff — 2026-10-17

**Prepared:** 2026-10-17  
**Purpose:** Resume the current AgenticLab master Pi, original EverShop sandbox Pi, and tuned PBI 2 replay Pi conversations after laptop restart and experimental workspace archiving.

> Local handoff only. This contains Pi session IDs and local paths; do not commit or share it casually. Pi session files contain the conversations and tool history.

## Status as of 2026-10-18 (post-pilot completion)

Both bounded pilots have completed. The write pilot (`ALPHA-KNOWLEDGE-PILOT-001`) passed its test: one user-directed candidate triaged, staged, promoted in one batch, and retrieved in a fresh Pi session. The read pilot (`ALPHA-KNOWLEDGE-READ-001`) passed its test: relevant retrieval grounded with citation, unrelated query returned grounded no-match after corpus inspection, and tool-based verification confirmed active-corpus access and pending isolation. Neither is integration-ready — both are single-record, limited-scope checks.

**Current state:**
- Pilot workspace `/home/peet/Projects/V5-memory-pilot-001/` has one active knowledge record (`low-friction-capture-batch-review`) and policy enabled; pending queue absent.
- Canonical V5 at `/home/peet/Projects/AgenticLab-v5/` is unchanged; the read/write pilots were run in the disposable workspace.
- All pilot sub-Pi sessions (`w7:p3`–`w7:p7`, `w7:p8`–`w7:pB`) have been closed; only master `w7:p1` and canonical `w3:p2` remain.
- DEV-LOG.md entries V5-20261018-234 through V5-20261018-236 record the pilot runs and the write/read separation decision.
- See `evaluation/results/ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md` and `evaluation/results/ALPHA-KNOWLEDGE-READ-001-RUN-001.md`.

## Important persistence note

`herdr integration status` was checked on 2026-10-16. The Pi integration is **not installed** at `/home/peet/.pi/agent/extensions/herdr-agent-state.ts`.

Herdr normally keeps pane processes alive when the client detaches, but a laptop shutdown stops those processes. Herdr can restore the workspace layout, but without its Pi integration it will not automatically restart these Pi conversations. Start Herdr, select each workspace, and manually resume Pi using the IDs below. The Pi integration is still not installed. The new `V5-alpha-tune001` session was trusted only for its prior process; after restart, expect to review a new project-trust prompt and choose only that workspace if you approve.

## Resume the master Pi

- **Workspace root:** `/home/peet/Projects/AgenticLab-v5`
- **Herdr workspace label:** `AgenticLab-v5` (current pane was `w3:p2`; Herdr pane/workspace IDs may change after restart)
- **Pi session label:** `agenticlab-master` (from the current Herdr terminal title)
- **Pi session ID:** `01a13a3b-cac3-774d-8cb5-104ea244db5f`
- **Session file:** `/home/peet/.pi/agent/sessions/--home-peet-Projects-AgenticLab-v5--/2026-10-14T11-45-59-492Z_01a13a3b-cac3-774d-8cb5-104ea244db5f.jsonl`

In a terminal pane in the master workspace:

```bash
cd /home/peet/Projects/AgenticLab-v5
pi --session 01a13a3b-cac3-774d-8cb5-104ea244db5f
```

If Pi cannot resolve the ID, use the full session-file path with `pi --session <path>`.

## Resume the EverShop sandbox Pi

- **Workspace root:** `/home/peet/Projects/Archive/V5-Experiments/V5-alpha-sandbox`
- **Herdr workspace label:** `V5-alpha-sandbox` (the original `w5:p1` agent is not currently registered; recreate/select a Herdr pane at this archived root if needed)
- **Pi session label:** `evershop-sandbox`
- **Pi session ID:** `01a13fb6-c502-7262-af0c-64d6607f11dc`
- **Session file:** `/home/peet/.pi/agent/sessions/--home-peet-Projects-V5-alpha-sandbox--/2026-10-15T13-18-25-026Z_01a13fb6-c502-7262-af0c-64d6607f11dc.jsonl`

In a terminal pane in the sandbox workspace:

```bash
cd /home/peet/Projects/Archive/V5-Experiments/V5-alpha-sandbox
pi --session 01a13fb6-c502-7262-af0c-64d6607f11dc
```

If Pi cannot resolve the ID, use the full session-file path with `pi --session <path>`.

## Resume the tuned PBI 2 replay Pi

- **Workspace root:** `/home/peet/Projects/Archive/V5-Experiments/V5-alpha-tune001`
- **Herdr workspace label:** `V5-alpha-tune001` (current pane `w6:p1`; Herdr reports its cwd followed the move)
- **Pi session label:** `evershop-tune001`
- **Pi session ID:** `01a14a50-28e4-76a8-a90d-6ce08a48bcae`
- **Session file:** `/home/peet/.pi/agent/sessions/--home-peet-Projects-V5-alpha-tune001--/2026-10-17T14-42-09-765Z_01a14a50-28e4-76a8-a90d-6ce08a48bcae.jsonl`

In a terminal pane in the tuned workspace:

```bash
cd /home/peet/Projects/Archive/V5-Experiments/V5-alpha-tune001
pi --session 01a14a50-28e4-76a8-a90d-6ce08a48bcae
```

If Pi cannot resolve the ID, use the full session-file path with `pi --session <path>`.

## State at handoff

- The AgenticLab checkpoint is [`evaluation/checkpoints/ALPHA-20261016-TWO-PBI-CHECKPOINT.md`](evaluation/checkpoints/ALPHA-20261016-TWO-PBI-CHECKPOINT.md); the initial descriptive baseline is [`evaluation/baselines/ALPHA-BASELINE-001-v0.1.md`](evaluation/baselines/ALPHA-BASELINE-001-v0.1.md).
- PBI 1's original isolated suite passed 6/6. The original PBI 2 result is summarized in the next bullet.
- The original PBI 2 isolated suite passed 4/4 in `V5-alpha-sandbox`; the fresh tuned replay in `V5-alpha-tune001` did not. Original replay status: 1 case passed, 1 failed, 2 unrun. In separate rescues, timer cancellation allowed cases 1–2 to pass; cleanup `focus({ preventScroll: true })` passed case 3; a case-4 test-only `preventScroll` path then produced a 4/4 isolated suite pass. This is a rescue result, not a retroactive clean tuned replay. See `evaluation/results/ALPHA-TUNE-VAL-001.md` and `evaluation/results/ALPHA-TUNE-RESCUE-001.md` through `-005.md`.
- The temporary dependency tree was absent after restart and the first diagnostic attempt failed before the runner loaded. After explicit approval, the exact pinned set was recreated under `/tmp/agenticlab-tune-val-001-deps.7gYNE1` with lifecycle scripts disabled; the existing workspace `node_modules` symlink now resolves. No project manifest/lock changed. Keep the temporary set only for approved validation; do not reinstall if it disappears again without fresh approval.
- `V5-alpha-tune001` is an EverShop 2.2.1 source copy without Git metadata; exact source commit is unknown. The root `package.json`/`package-lock.json` version metadata mismatch was confirmed in upstream v2.2.1. No app, PostgreSQL, full Jest/E2E, `.env`, or `data/` was accessed; package/lock files were unchanged.
- The first tuning batch is committed locally in AgenticLab-v5 as `3e779dc` (not pushed). Its end-to-end effect remains inconclusive: the initial replay was incomplete and the separate 4/4 rescue followed multiple corrections. Herdr is only the operational channel. The handoff and session identifiers are local; do not commit/share this file casually.

## Workspace housekeeping

- Created `/home/peet/Projects/Archive/V5-Experiments/` and moved `V5-alpha-sandbox/`, `V5-alpha-tune001/`, and later `AgenticLab-Alpha-Workspace/` there, by explicit user approval. No directories were deleted. The tuned Herdr pane `w6:p1` reports its archived path as CWD; the original sandbox Pi agent was not registered at the time of its move.
- `AgenticLab-Alpha-Workspace` was confirmed as an 88 KB synthetic Alpha distribution/task-loop fixture (mock wishlist ID helpers; payload revision `7e4be9c`), not a production wishlist PBI. `AgenticLab-v5`, `AgenticLab-V4`, `Practice/evershop-dev`, `Practice/AgenticLab-v5.1-Backup`, and standalone `AgenticLab/` were not moved or deleted.
- User-designated clean EverShop source copy: `/home/peet/Projects/clean-evershop-dev/`. **Never modify, install into, rename, or delete this directory.** Use it only as the copy source when creating a separate, new experimental workspace; perform all experiments in the copy.

## Knowledge-capture pilot status

- Pilot workspace: `/home/peet/Projects/V5-memory-pilot-001`, copied from the user-designated immutable source `/home/peet/Projects/clean-evershop-dev/`; source untouched. Runtime payload revision `3e779dc31aa581efe07a6426b27767c2a77d4d88` is in `AgenticLab/`.
- The user approved initialization; `PROJECT-SCOPE.md`, `PROJECT-OVERVIEW.md`, `.pi/settings.json`, and `.pi/APPEND_SYSTEM.md` were written/read back. The user later approved the one-time pilot opt-in and one promotion batch. `AgenticLab/knowledge-capture-policy.json` is enabled; active `AgenticLab/knowledge/` contains one promoted record and `knowledge-pending/` is absent.
- Primary pilot Pi is Herdr pane `w7:p1`; read-only reviewer Pi is `w7:p3`; synthetic shadow evaluator Pi is `w7:p4`. A Codex reviewer attempt required sign-in; it was canceled before login and is not active.
- The reviewer found the old gate lacked pending/active isolation and atomic batch promotion. The user approved the pilot-local implementation in `evaluation/plans/ALPHA-KNOWLEDGE-PILOT-001-amendment-001.md`; adapter code is now implemented in `AgenticLab/` and the focused Node suite passed 20/20. No canonical V5 or clean-source files changed.

## Why the tuned PBI 2 phase generated more failures

**Observed:** The original sandbox had a working implementation and an established isolated test harness. The tune001 replay started from a fresh EverShop v2.2.1 copy without the prior PBI implementation, rebuilt the harness, and reimplemented the same acceptance scope. It hit Webpack alias resolution, react-slick import/JSX mistakes, then a stale 100 ms `slickGoTo(openingIndex, true)` timer that reset modal navigation. Cancelling that timer allowed cases 1–2 to pass. Case 3's production cleanup focus reset scroll after the explicit restoration; changing it to `focus({ preventScroll: true })` passed case 3. Case 4 required the test helper's opener focus to use `preventScroll` as well; with that test-only change, the isolated suite passed 4/4 in the rescue series.

**Tuning causality:** ALPHA-TUNE-001 changed written workflow guidance only; it did not change EverShop code. The tuned preflight did identify missing test dependencies before edits and required separate setup approval. The workflow did not prevent the harness/import mistakes or stale-timer implementation defect, and the replay did not reach full acceptance. That is evidence the tuning batch did not ensure successful completion in this run, but it does **not** prove the tuning changes caused the worse result: this was one non-controlled replay with a fresh source copy and rebuilt harness, unlike the original already-working sandbox. Do not revert the tuning batch based on this run alone; keep ALPHA-TUNE-VAL-001 incomplete and preserve each rescue separately.

**Next decision:** PBI 2's separate rescue passed 4/4; the original `ALPHA-TUNE-VAL-001` remains an incomplete first replay. Preserve both tracks and make no causal tuning-benefit claim. The memory pilot's implementation and one bounded end-to-end run are complete; see `evaluation/results/ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md`. The clean source `/home/peet/Projects/clean-evershop-dev/` remains immutable. The read-only reviewer identified the original gate gap; pilot-local tools now provide pending isolation and batch promotion. Codex auth was requested and canceled before login; Pi handled review and execution.

The high-level pilot plan and amendment are approved and implemented in the disposable workspace. The focused adapter tests passed 20/20; the 12-case synthetic shadow triage matched its authored reference labels 12/12 (exploratory only). The user approved opt-in, one candidate was triaged/staged, and the one-record batch was approved and promoted. Fresh Pi sessions retrieved the relevant rationale and, on a grounded negative recheck, correctly found no retry/backoff record. The initial negative attempt did not read knowledge; the recheck also exceeded the prescribed metadata-header range, both documented in `evaluation/results/ALPHA-KNOWLEDGE-PILOT-001-RUN-001.md`. Workspace opt-in remains enabled, one active record exists, and no pending queue remains. No application/database/package files or canonical V5/clean-source files changed. Residual limits: shell-path blocking is best-effort, sensitive filtering is heuristic, and external filesystem races/crash recovery are not fully covered. PBI 2 records are under `evaluation/results/ALPHA-TUNE-*.md`; pilot records are under `evaluation/results/ALPHA-KNOWLEDGE-PILOT-001-*.md`. Herdr panes: reviewer `w7:p3`, capture/triage `w7:p4`, relevant retrieval `w7:p5`, initial negative attempt `w7:p6`, grounded negative recheck `w7:p7`. Long-lived primary `w7:p1` lacked the updated triage tool; it failed closed without writes, so use a fresh Pi session to load the current pilot extension.
