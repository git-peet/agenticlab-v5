# V5 First Vertical Slice — Proposed Bounded Plan

**Status:** Direction and task sequence approved by the user; Python/V5 code changes still require a bounded implementation go

**Prepared:** 2026-10-06

**Parent direction:** [`V5.2-roadmap.md`](V5.2-roadmap.md)

**Candidate records:** [C01 operating model](backlog/candidates/C01-operating-model.md), [C02 knowledge lifecycle](backlog/candidates/C02-knowledge-lifecycle.md), [C03 context engineering](backlog/candidates/C03-context-engineering.md), [C04 governance](backlog/candidates/C04-governance-safety.md), [C08 adapters](backlog/candidates/C08-runtime-adapters.md), [C11 bootstrap/scope](backlog/candidates/C11-bootstrap-and-scope.md)

This is a plan to decide and then build one small useful path—not a commitment to implement all V5 candidates. Any source-code work in either repository needs a separate explicit approval of the bounded scope below.

## 1. Objective

Build the smallest V5 path that supports an actual project task through a **default-agent session**, carries one human-approved project decision into a fresh session, checks that decision against current source where relevant, and tests concrete V5 design assumptions in real work.

The Python workspace is now intended as an experimental host for V5 design, not as a teaching exercise. Tasks from its learning plan are possible fixtures because they are real project work, not because AgenticLab must teach Python. The slice should make the knowledge/context loop tangible while preserving a clean seam for user-invoked workflows; it must not make the Python project the canonical source for AgenticLab.

## 2. Proposed home, host, and distribution boundary

- **Canonical AgenticLab source:** `/home/peet/Projects/AgenticLab-v5/`.
- **Experimental project host:** `/home/peet/Projects/Practice/Python/Py-Desktop-Expense_Tracker/` (the user confirmed its purpose is now V5 experimentation, not a learning curriculum).
- AgenticLab code, design decisions, and development history stay in the V5 source repository. Python application changes and project-specific knowledge remain scoped to the Python workspace.
- **Agreed distribution direction:** generate or stage a versioned snapshot of the V5 runtime under a workspace-local `AgenticLab/` folder at the Python project root. Keep canonical sources in V5; the host copy is an instance/deployment, not a second editable source. Record its source revision. Avoid an absolute-path symlink (machine-specific and silently live-updating) and avoid editing the host copy as canonical. For the first prototype, use a deliberate, reviewed copy; no installer is needed.
- Before creating that host folder, define which system files, per-project config, memory, and evaluation records belong there and what must not be copied. No Python host integration has been created.
- **Git connection:** local V5 now has a Git repository on branch `main` with `origin` set to `https://github.com/git-peet/agenticlab-v5.git`. The GitHub repository returned no refs (empty at inspection). There are no commits yet. No files were staged, committed, or pushed. Initial commit/push remains a separate explicit action.
- **Agreed initial harness:** Pi, using only workspace-local configuration/integration for this experiment; no global Pi configuration. Verify the exact load/invocation method and adapter capability before implementing it. This is not an adapter implementation approval.

## 3. Proposed real task sequence

The Python workspace is confirmed as a V5 experiment host, not a learning project. The user approved the proposed sequence: isolate the test database (Exercise 5) first, then use the confirmed date-format mismatch (Exercise 6) as a possible V5 continuity/retrieval task. Project source changes and test execution still require a bounded implementation go.

### Prerequisite task — Exercise 5: isolate the test database

The inspected test setup constructs `ExpenseTrackerController`, which constructs `ExpenseModel`; `ExpenseModel` connects to the fixed `data/expenses.db` and creates tables. `test_add_expense_valid` invokes a database insert and commit. The current date mismatch may make that test fail before the insert today, but after fixing date parsing it could reach the real DB. **Do not run the bundled tests in the current form.**

Proposed goal: make test database selection explicit and ensure tests use an isolated temporary database. Do not copy, inspect, or mutate the user's real SQLite data as test setup. The implementation design (dependency injection, factory, or another narrow mechanism) remains open until an approved project task is scoped.

**Safety acceptance:** the test creates and verifies a row only in its isolated database; its test configuration explicitly targets the temporary DB and does not read or modify `data/expenses.db`. Do not launch the application as part of this test-isolation task; normal app use continues to use its project database. No unrelated database refactor is included.

### Candidate V5 continuity task — Exercise 6: consistent date handling

Read-only inspection confirmed the current clone's mismatch:

- `src/gui.py` converts the date widget to `YYYY-MM-DD`.
- `src/controller.py` documents `YYYY-MM-DD`, but `validate_date` parses and returns `%m/%d/%Y`; its error text mentions yet another format.
- `src/data.py` stores the resulting string in a SQLite `TEXT` field.
- The bundled valid-add test uses `2024-06-21`, consistent with the GUI and learning-plan recommendation, but is not an assertion-rich integration test.

Proposed V5 test objective: use this cross-layer issue to test whether the system gathers sufficient context, records a user-approved date-format decision with provenance, retrieves it in a fresh session, checks it against current source, and supports the bounded change. The learning plan recommends `YYYY-MM-DD`, but the actual decision remains for the user/task. Test a valid date plus an impossible date such as `2025-02-30` against an isolated test database. The source inspection does not authorize this project change; obtain a bounded project-work go before editing.

## 4. What the V5 slice must exercise

1. A default-agent entry with explicit project identity and task scope.
2. Minimal current-source inspection, staged rather than broad project loading.
3. A user-approved decision/knowledge candidate with a source pointer, scope, status, and uncertainty—not automatic promotion.
4. A fresh session that can retrieve the approved decision only for the correct project, check current code, and explain relevant provenance.
5. Distinct outcomes for applicable memory, no match, filtered/out-of-scope candidate, and retrieval failure. No result must not disguise a broken store.
6. Evaluate the selected V5 behaviors directly: task-context sufficiency, useful retrieval, provenance, scope/freshness, human review, and source verification. The Python task is a host fixture, not a teaching objective.
7. Verification through the isolated test database; the real `data/expenses.db` is never opened by tests.
8. A short user-facing report and concise development/evaluation record; no raw transcript or broad automatic telemetry.

The first runnable path may use one host only. Its shared contract should not bake Pi-specific details into the knowledge model. A user-invoked workflow remains a supported design requirement, but porting all V4 prompts or building a workflow router is outside this first slice.

## 5. Proposed phases and gates

### Phase 0 — Confirm decisions (no code)

**Complete:** canonical V5 source repo; GitHub remote connection; Python as experimental host; reviewed snapshot distribution; Pi as initial harness; Exercise 5 before possible Exercise 6. The exact workspace instance contents/loading path still needs a short design before creating the host copy.

### Phase 1 — Safe project test boundary

Under a separate approved project scope, isolate the tests from the live SQLite file (Exercise 5). Do not run the existing test suite before the isolation implementation has been inspected and approved. Then validate using only the temporary test database and stop if dependencies, database initialization, or test behavior require an unapproved expansion.

### Phase 2 — Minimal V5 skeleton in the canonical repo

Implement only the contracts and runtime behavior needed for the agreed task path: a default-session entry, explicit project scope, an inspectable approved decision record, bounded retrieval/verification, a human review gate for durable promotion, and a thin selected-host integration. Choose the storage and adapter mechanism only after the user approves the design; do not silently assume the old prototype's implementation is the V5 architecture.

### Phase 3 — Run the selected V5 task in the host project

If Exercise 6 is selected, create one real, user-approved date-format decision record during investigation, then use a fresh session to retrieve and verify it before the bounded implementation/verification task. Keep changes limited to the selected objective and necessary isolated tests; no unrelated cleanup or dependency installation. If another task is chosen, rewrite this phase to name it and the V5 assumption it tests.

### Phase 4 — Review and decide (no automatic expansion)

Report what worked, what was re-explained, whether retrieval was relevant/current/in scope, any corrections, user attention, time/cost if readily available, and maintenance burden. Decide whether to keep, revise, defer, or reject the exercised mechanism. One experience is qualitative evidence, not a statistical memory-benefit claim.

## 6. Scope exclusions and stop conditions

- No changes outside the selected files in V5 and the approved Python task scope.
- No reading/querying/copying the real expense database; no app launch before the test/data safety boundary is reviewed.
- No installing dependencies or converting `requirements.txt` (the learning plan reports UTF-16 encoding; stop if installation is needed).
- No global Pi config changes, external API/model calls, vector DB, external service, raw session mining, V4 memory import, automatic memory promotion, or additional harness port.
- Stop on unexpected database side effects, unclear approval, test isolation failure, a material project-scope change, or a need for infrastructure outside the agreed first slice.

## 7. Decisions needed before implementation

1. Approve the bounded code scope for Exercise 5 (test isolation) and its validation. Proposed scope is limited to the minimum database-injection/test setup necessary; no production DB reads, app launch, dependency installation, or unrelated refactor.
2. Before source edits, decide whether to make an initial Git commit/push of the current V5 baseline. The local repo is connected to an empty GitHub remote but currently has no commits; connection alone did not authorize a commit or push.
3. Confirm which files/configuration are included in the workspace-local snapshot and how Pi loads it without global configuration.
4. Reconfirm that Exercise 6 should be the subsequent V5 test task after safe test isolation; its project implementation still needs an approved bounded scope.

**Current state:** direction is agreed; implementation remains gated. Exercise 5 then Exercise 6 is the approved task sequence, but no Python source change, test-database isolation, V5 runtime, host snapshot/integration, test run, or data collection is authorized until the bounded code scope is approved.
