# AgenticLab V5 Development Log

**Purpose:** Preserve material project decisions, findings, scope changes, and outcomes. This is a concise development history, not a transcript or task tracker.

## Logging rules

- Append entries only; use a stable ID, local ISO-8601 timestamp with offset, type/status, source/evidence, outcome/rationale, and next action where useful.
- Record meaningful decisions, approvals, reversals, risks, empirical results (including null results), and scope boundaries—not every discussion, edit, or review pass.
- Keep entries short and privacy-aware. Link to the roadmap, candidate records, evaluation reports, or source evidence rather than copying large content.
- Distinguish user-approved decisions from proposals, findings, and unresolved questions. Use role labels such as “the user,” not personal names, so records remain portable across users and fresh sessions.
- Correct or supersede a prior entry with a new entry; do not silently rewrite historical decisions.

---

## Entries

### V5-20261006-001 — Product vision re-anchored; initial portfolio created

- **Recorded:** 2026-10-06T09:01:50+02:00
- **Type:** Product direction / synthesis / documentation
- **Status:** Roadmap and candidate portfolio drafted; first-slice choices remain recommendations for review
- **Sources:** `V5.2-roadmap.md`; V4 `MANUAL.md`, `v5/docs/V5-roadmap.md`, `v5/docs/agenticLab-neo-audit.md`, improvements index and relevant backlog items; V5 pipeline and evaluation reports; Python `LEARNING_PLAN.md` (read-only).
- **Finding:** AgenticLab is a delivery-focused engineering system with persistent project knowledge, supporting both default-agent work and explicitly invoked workflows through shared contracts. V4 demonstrates valuable delivery/control/curation functions, but its exact layers are not V5 requirements. Existing V5 results do not establish general memory benefit; retrieval of authentic prior decisions/experience remains open.
- **Outcome:** Created the V5.2 product/evidence roadmap and an 11-item candidate portfolio with source crosswalks from the V4 improvements backlog and first-attempt V5 pipeline. These are candidates and design inputs, not an implementation queue. Bounded semantic reuse is parked; the universal Jev classifier, external Hindsight/runtime dependencies, and wholesale V4 ports are not adopted.
- **Scope boundary:** No V4 files, Python application source, old delivery-workspace data, or session corpus were changed or inspected in this block; no model/API calls, project tests, implementation, global Pi changes, or V4 knowledge import. Python tasks are candidates only; the learning plan warns that bundled tests can write to the real database, so tests must not run before safe test-database isolation.
- **Next:** The user reviews the roadmap and candidate statuses; decide the first vertical slice and whether/when to use the Python workspace. No candidate is `selected` yet.

### V5-20261006-002 — Candidate portfolio made self-contained

- **Recorded:** 2026-10-06T09:14:23+02:00
- **Type:** Documentation correction / portability
- **Status:** Complete
- **Decision:** Candidate records must stand alone for a fresh session. Historical V4/pipeline paths are optional provenance pointers, not required reading.
- **Outcome:** Expanded all 11 candidate records with standalone context/evidence summaries, evidence limits, V5 disposition, explicit non-goals, preconditions, acceptance checks, readiness/actionability, and timing/next steps. Added a self-containedness rule to `backlog/README.md`; clarified that each old source item is summarized and crosswalked, while original V4/V5 source repositories remain historical lineage only. No candidate became selected or implementation-authorized.
- **Next:** Review the candidate portfolio; where a source fact is not sufficiently established in its summary, keep the item blocked/not-ready and consult its historical source only when needed.

### V5-20261006-003 — User references generalized for portability

- **Recorded:** 2026-10-06T09:17:02+02:00
- **Type:** Documentation convention / correction
- **Status:** Applied
- **Finding:** Personal-name references in portable roadmap/backlog documents made them less reusable for another user or fresh session.
- **Outcome:** Replaced personal-name mentions in the roadmap, candidate records, backlog index, and log with role-based wording such as “the user.” Added this as a `DEV-LOG.md` convention. No product decisions or candidate statuses changed.
- **Validation:** Search of the V5 repository finds no remaining occurrence of the personal name.
- **Next:** Apply role-based references to future portable V5 documentation.

### V5-20261006-004 — Python learning-task and test-safety inspection

- **Recorded:** 2026-10-06T09:21:02+02:00
- **Type:** Read-only project inspection / finding
- **Status:** Complete; no exercise selected or project change authorized
- **Scope:** Read `src/controller.py`, `src/gui.py` date/add paths, `src/data.py`, `src/tests/test_expense_tracker.py`, and README; searched source references. Checked only SQLite file metadata; did not open the database, run the app/tests, or edit project files.
- **Finding:** The date mismatch is confirmed: GUI emits ISO `YYYY-MM-DD`; controller docs say ISO but parses/returns `%m/%d/%Y` and its error text says a third format. The test/model path currently connects to the fixed `data/expenses.db`; controller construction creates an `ExpenseModel`, and the valid-add test calls an insert/commit there. Tests must be isolated before running, even though the current date mismatch may make that test fail before reaching the insert.
- **Outcome:** Updated `V5.2-roadmap.md` to replace the prior unverified-task note with verified source findings and the test-safety prerequisite. Exercise 6 remains a suitable candidate for a real decision/continuity task, conditional on safe test setup and the user's preference; no task has been selected.
- **Next:** If the user approves project changes, first scope a safe test-database isolation task; then decide whether Exercise 6 is the first V5 host task. Do not run the existing test suite before isolation.

### V5-20261006-005 — First vertical-slice plan drafted

- **Recorded:** 2026-10-06T09:25:29+02:00
- **Type:** Planning proposal
- **Status:** Draft for user review; implementation not authorized
- **Outcome:** Added `FIRST-SLICE-PLAN.md` and linked it from the roadmap. The proposed sequence is safe test-database isolation (Exercise 5) before a possible date-consistency/continuity task (Exercise 6), with V5 source in its clean repo and the Python workspace as a separate potential host. The plan makes source-control, workspace distribution, initial host, and learner interaction explicit decisions rather than assumptions.
- **Scope boundary:** No source files or databases were modified or executed; no test, app, dependency installation, runtime integration, or telemetry was performed. The plan itself grants no implementation approval.
- **Next:** The user decides the task sequence, project-instance/distribution method, source-control setup, initial host, and learning interaction before any code changes.

### V5-20261006-006 — GitHub remote connected; experiment-host purpose clarified

- **Recorded:** 2026-10-06T09:37:08+02:00
- **Type:** User direction / repository setup / planning correction
- **Status:** Local remote configured; plan updated; no commit or push
- **User direction:** The Python expense-tracker workspace is now a V5 experiment host, not a learning objective. It may be used as needed to test V5 design assumptions. The user asked to connect the clean local V5 repository to `https://github.com/git-peet/agenticlab-v5.git`.
- **Outcome:** Initialized `/home/peet/Projects/AgenticLab-v5/` on branch `main` and configured `origin`. `git ls-remote` returned no refs; local repository has no commits; no files were staged, committed, or pushed. Updated `FIRST-SLICE-PLAN.md` and `V5.2-roadmap.md` to remove the learning-centered framing, treat Python as an experimental host, and propose a reviewed workspace-local snapshot as the distribution method. That method and the initial Pi invocation remain recommendations awaiting confirmation.
- **Scope boundary:** No application/test files or databases were changed or opened. No tests, app, dependencies, global Pi settings, or V5 runtime were run/installed. No implementation is authorized by this entry.
- **Next:** User reviews the proposed distribution method, initial harness, and concrete Python task; separately approve any project edits/test isolation and initial commit/push.

### V5-20261006-007 — First-slice direction confirmed

- **Recorded:** 2026-10-06T09:42:05+02:00
- **Type:** User decision / planning update
- **Status:** Direction confirmed; implementation scope remains gated
- **User decisions:** Python workspace is a V5 experiment host, not a learning project; use the reviewed workspace-local snapshot approach with canonical sources in V5; use Pi as the initial harness; proceed with Exercise 5 test isolation before Exercise 6 as the candidate cross-session task.
- **Outcome:** Updated `FIRST-SLICE-PLAN.md` and `V5.2-roadmap.md` to distinguish confirmed direction from remaining implementation decisions. GitHub `origin` was already connected; no initial commit or push was performed.
- **Still requires a separate bounded go:** Python source edits/test execution, creation of the host snapshot, V5 runtime/adapter implementation, and initial commit/push. Do not run bundled tests against the current fixed DB path.
- **Next:** Define the exact local Pi loading/snapshot contents and prepare a bounded Exercise 5 implementation scope for user approval.

### V5-20261006-008 — Documentation baseline committed; test-isolation scope proposed

- **Recorded:** 2026-10-06T09:50:59+02:00
- **Type:** Repository baseline / implementation proposal
- **Status:** Initial docs commit complete; Python implementation scope awaiting approval
- **Outcome:** Created local root commit `bbe260c` (`docs: establish V5.2 roadmap and candidate portfolio`) on `main`, covering the current roadmap, first-slice plan, backlog and development log. No push was made. The remote had no refs at setup. The latest edits to `FIRST-SLICE-PLAN.md` and `V5.2-roadmap.md` record the user's confirmed direction and are currently uncommitted.
- **Exercise 5 proposal:** Limit changes to `src/data.py` (optional DB-path injection, default remains unchanged), `src/controller.py` (optional model injection, default remains unchanged), and `src/tests/test_expense_tracker.py` (per-test temporary DB, explicit injected model, connection close/cleanup, focused synthetic persistence assertion). Do not change GUI/preferences/main, access `data/expenses.db`, run the app, install dependencies, or run the full suite before Exercise 6 fixes the known date mismatch. This is a proposed boundary, not approval to edit Python files.
- **Next:** User approves/revises this exact source/test scope. Initial push and Python code changes remain unapproved.

### V5-20261006-009 — Exercise 5 test isolation implemented; focused test blocked

- **Recorded:** 2026-10-06T09:56:39+02:00
- **Type:** Approved project-scope implementation / validation result
- **Status:** Code changes made; behavioral verification blocked by environment dependency
- **Approved changes:** In the Python workspace, `ExpenseModel` now accepts an optional database path (existing application path remains default); `ExpenseTrackerController` accepts an optional model (default construction remains unchanged); controller tests use per-test temporary databases, close/clean them up, and include a focused synthetic persistence/isolation assertion.
- **Validation:** AST parsing succeeded for all three changed files. The focused `unittest` invocation failed during module import because the active Python interpreter lacks `pandas`; no dependency installation was attempted. The test failed before constructing `ExpenseModel`; the SQLite database was not opened. Its file metadata remained the previously observed 16,384 bytes and timestamp. No app or full suite was run. The `python -m unittest` import attempt generated Python 3.14 cache files; those exact generated cache files were removed.
- **Scope:** No changes to GUI/preferences/main, `data/expenses.db`, requirements, or V5 runtime. Python source changes are uncommitted. V5 doc updates since the initial baseline commit are also uncommitted pending approved push.
- **Next:** Do not install packages or broaden the change without approval. Ask for an existing environment with pandas or explicit approval for a safe dependency setup; rerun only the focused isolation test there. Exercise 6 remains unstarted.

### V5-20261006-010 — GitHub private-email push rejection

- **Recorded:** 2026-10-06T10:01:14+02:00
- **Type:** Publication blocker / privacy safeguard
- **Status:** First push rejected; privacy-safe retry prepared
- **Finding:** GitHub rejected publication because the local commits would expose a private commit email. The remote still has no published refs.
- **Action:** Configured a GitHub no-reply author email in this repository's local Git config only; global Git identity was not changed. Because the two local commits were never published, the publication history will be recreated from the current V5 documentation tree with the privacy-safe identity; the working files remain the source of truth. No Python project changes will be included in the V5 remote.
- **Next:** Verify the publication-safe history, push only the V5 repository to `origin/main`, and record the result. If GitHub rejects the no-reply identity, stop and ask rather than weaken privacy protection.

### V5-20261006-011 — Unpublished history rewritten for privacy-safe publication

- **Recorded:** 2026-10-06T10:01:14+02:00
- **Type:** Repository privacy correction
- **Status:** Local main rewritten with repo-local no-reply identity; push pending
- **Record:** GitHub rejected the first push under its private-email protection. The remote remained empty. Since none of the commits had been published, the local V5 documentation history was recreated with the GitHub no-reply address configured only in this repository; global Git configuration was not changed. The current tree and file contents are preserved. Older commit IDs mentioned in entries #008/#009 refer to the superseded, unpublished local attempt and are not in the rewritten main history. Only V5 documentation will be pushed; the Python project is a separate repository.
- **Next:** Push the rewritten V5 `main`; if GitHub rejects it again, stop and ask the user rather than disabling privacy protection.
