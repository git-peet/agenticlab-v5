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

### V5-20261006-012 — V5 documentation published to GitHub

- **Recorded:** 2026-10-06T10:03:48+02:00
- **Type:** Repository publication
- **Status:** Complete
- **Outcome:** Published the privacy-safe V5 `main` history to `origin/main`. The repository contains only the V5 roadmap, backlog, first-slice plan, and development log. GitHub accepted the repo-local no-reply identity; global Git identity remains unchanged. Local and remote V5 worktrees are clean at publication time.
- **Scope boundary:** No Python project files or database contents were included in or pushed to the V5 repository. Python source changes remain local and uncommitted in the separate project repository.
- **Next:** Focused Exercise 5 behavioral verification remains blocked until a suitable existing environment provides `pandas` or the user approves a safe dependency setup. Do not run the full Python suite or start Exercise 6 yet.

### V5-20261006-013 — Project-local dependencies configured; Exercise 5 focused test passes

- **Recorded:** 2026-10-06T10:33:06+02:00
- **Type:** Approved environment setup / validation result
- **Status:** Project-local setup complete; Exercise 5 focused test passed
- **Outcome:** Installed Python 3.12.15 via mise without changing mise configuration; created the Python project's ignored `.venv`; decoded the UTF-16 pinned `requirements.txt` to a temporary UTF-8 file without editing the original; installed the pinned packages into `.venv` from PyPI because the configured package index lacked `ttkthemes`. Added a project `.gitignore` for `.venv/`, `__pycache__/`, and bytecode. The focused temporary-database isolation test passed; GUI/application modules imported without launching the app; `pip check` found no broken requirements.
- **Safety:** No application main/UI was launched; the full test suite was not run; no dependencies were installed globally; the real `data/expenses.db` was not opened or modified (its metadata is unchanged). The Python source and `.gitignore` remain uncommitted in the separate Python repo; nothing from it was pushed to V5 GitHub.
- **Next:** Exercise 5 isolation is behaviorally verified. Before Exercise 6, confirm the date-format decision and bounded file/test scope; then test only against `.venv` and the isolated temporary database.

### V5-20261006-014 — Pi-native first-slice architecture proposed

- **Recorded:** 2026-10-06T10:42:44+02:00
- **Type:** Architecture proposal / runtime research
- **Status:** Proposed in `FIRST-SLICE-PLAN.md`; no runtime implementation authorized
- **Evidence:** Read the installed Pi 1.0.4 configuration, security, extension, settings, CLI, and terminal-UI docs plus the permission-gate/protected-path examples. Relevant findings are summarized in the plan: root context files load independently of project trust; project `.pi` settings/extensions are trust-gated; `tool_call` handlers can block built-in tool calls; extensions run with Pi process permissions and are not a sandbox.
- **Proposal:** Keep shippable assets in a V5 `system/` payload, stage a reviewed snapshot as Python-root `AgenticLab/`, use a root `AGENTS.md` pointer, and register a small project-local Pi write-confirmation gate. Durable record data remains project-specific. The gate's limitation against arbitrary shell/process writes is explicit; do not claim comprehensive protection.
- **Next:** User reviews/approves or changes the proposed skeleton scope before V5 source code, Pi adapter, project snapshot, or Python application changes proceed.

### V5-20261006-015 — V5 system skeleton and Python host snapshot staged

- **Recorded:** 2026-10-06T11:04:53+02:00
- **Type:** Approved implementation block / host integration
- **Status:** V5 payload committed/pushed; Python snapshot staged; interactive Pi trust/load not yet exercised
- **V5 payload:** Added `system/README.md`, `system/AGENTS.md`, operating/knowledge contracts, a Pi write-confirmation gate, pure path policy, and Node tests. Ten policy/handler tests pass; the Pi TypeScript wrapper loads under Node's strip-types check. Committed/pushed as `6996224719be65c09624de15a6b95970156ac154`.
- **Python host:** Staged the matching `AgenticLab/` system snapshot with source-revision marker, project scope note, and empty knowledge index; added a root `AGENTS.md` pointer and project `.pi/settings.json` with a path resolving to the snapshot extension. Snapshot files match the V5 payload. The V5 instance directory is uncommitted in the Python project.
- **Correction/containment:** A similarly named sibling path was initially targeted by generated host files. Inventory showed only the files created in this block; those were removed and the files were staged in the Git-controlled Python project root. No pre-existing project files or data were overwritten.
- **Trust/safety:** No Pi session was launched and no project-trust decision was granted. The extension executes with the Pi user's permissions, is not an OS sandbox, and only heuristically notices shell references to the knowledge directory. The user must review the project-trust prompt on first interactive use; if the extension is not trusted/available, durable knowledge writes are unavailable.
- **Project test status:** Exercise 5 isolation test and environment setup are complete; focused test passed earlier. Full Python suite/app remain unrun; Exercise 6 is not started and its date decision remains open. Real DB metadata remains unchanged. Python code and host snapshot are uncommitted; nothing from Python was pushed to the V5 GitHub repo.
- **Next:** User reviews the skeleton/snapshot and makes the Pi project-trust decision in an interactive session. Then separately approve Exercise 6's date-format behavior and bounded project-source change scope before editing or running the full suite.

### V5-20261006-016 — Pi session-only trust and denied-write smoke verified

- **Recorded:** 2026-10-06T11:30:40+02:00
- **Type:** Runtime smoke / safety outcome
- **Status:** Denied-write path passed; persistent trust and approved write remain untested
- **Record:** The user selected Pi's `Trust (this session only)` for the Python project. Startup listed `knowledge-write-gate.ts` among loaded extensions. The agent read the root `AGENTS.md` pointer and both V5 brain contracts, then attempted to write a synthetic marker under `AgenticLab/knowledge/`. Pi returned `Project knowledge change was not approved`; a file-read confirmed the marker did not exist.
- **Interpretation:** This verifies the interactive denied-write path for a built-in Pi write call and the workspace snapshot's policy-loading path. It does not verify the approval/allow path, subsequent-session trust, general shell-write protection, or that the extension is a security sandbox.
- **Safety:** No project source/database files were touched by this smoke test; no Pi global trust/configuration was changed. The extension path remains workspace-local.
- **Next:** User chooses whether to save persistent trust or repeat session-only trust. Confirm the date format and approve the bounded Exercise 6 code/test scope before changing Python source.

### V5-20261006-020 — Read-only shell command exposed write-gate false positive

- **Recorded:** 2026-10-06T12:09:17+02:00
- **Type:** Runtime smoke finding / adapter correction
- **Status:** Corrected in V5 source; host snapshot needs refresh and live retest
- **Finding:** In the Python Pi session, a read-only `find AgenticLab/knowledge ...` command triggered the write confirmation and was mislabeled as a persistent knowledge change. The user correctly rejected it. This was an overbroad shell heuristic, not a project-data mutation.
- **Correction:** V5 policy now blocks shell commands that visibly reference the knowledge tree with a clear instruction to use Pi file-read/list tools; it no longer presents them as confirmable writes. Built-in `write`/`edit` to project knowledge still requests UI approval and fails closed without UI. Expanded Node tests cover the new shell behavior.
- **Safety/result:** The synthetic knowledge marker did not exist after denial; no project code/database was changed by the erroneous read request. The gate still is not an OS sandbox and cannot reliably detect obfuscated shell access.
- **Next:** Run V5 Node tests, publish the correction, refresh the Python `AgenticLab/` snapshot, and ask the user to restart Pi/session-only trust before retrying the read-path smoke test.

### V5-20261006-021 — Shell read false positive fixed and snapshot refreshed

- **Recorded:** 2026-10-06T12:12:28+02:00
- **Type:** Adapter bug fix / host snapshot refresh
- **Status:** V5 fix published and staged in Python; live retest awaits a Pi restart
- **Finding:** A read-only shell `find` of `AgenticLab/knowledge` triggered the old confirmation and labeled the read as a persistent change. The user rejected it; no project knowledge was modified.
- **Fix:** Shell commands that visibly reference the project knowledge subtree are now blocked outright with a clear instruction to use Pi's `read`/`ls` tools; only built-in `write`/`edit` paths request interactive confirmation. Ten Node tests pass, including no-UI file-write blocking and shell-reference blocking without a confirmation dialog. Limitation remains: shell scanning is lexical and not a complete sandbox.
- **Publication/snapshot:** V5 fix published at `180bf2334b2631534e6dd96b53db2a5a15834404`. Updated the Python `AgenticLab/adapters/pi/` snapshot and `SOURCE-REVISION.txt`; verified the snapshot matches V5 and the `.pi/settings.json` extension path resolves. A path typo briefly placed only generated integration files in a similar sibling directory; it was identified, removed, and recreated under the Git-controlled project root, with no existing files or data overwritten.
- **Next:** The other Pi process still has the old extension loaded. Restart it, choose session-only trust again, verify shell `find` is blocked without a prompt, then use file read/list tools. Do not attempt a knowledge write until the new gate behavior is confirmed.

### V5-20261006-017 — Date representation selected for Exercise 6

- **Recorded:** 2026-10-06T11:35:24+02:00
- **Type:** User decision / project-task scope
- **Status:** Format decision confirmed; source-change scope still gated
- **Decision:** Use `YYYY-MM-DD` for Exercise 6. The user preferred `DD-MM-YYYY` but chose the existing GUI/test convention to avoid broader GUI, filter, storage, test, and documentation changes.
- **Next:** Await a separate bounded go for the controller/test change. Do not edit Python source merely from this format decision.

### V5-20261006-018 — Exercise 6 ISO date handling implemented and tested

- **Recorded:** 2026-10-06T11:52:42+02:00
- **Type:** Approved project implementation / test result
- **Status:** Exercise 6 code and tests complete; V5 memory-continuity trial pending
- **Changes:** `src/controller.py` now validates canonical `YYYY-MM-DD`, rejects invalid/noncanonical dates, uses ISO for the empty-date default, and reports the matching format. `src/tests/test_expense_tracker.py` verifies valid persistence, impossible-date rejection, noncanonical-date rejection, and isolated per-test DB use. All six controller tests pass.
- **Additional verification:** Both root CI smoke tests pass (`pytest -q tests/`); project-local `.venv` has no broken requirements. The smoke test may touch tracked bytecode; generated changes were restored. The root test also compiles source files. No GUI/app launch occurred.
- **Safety:** All tests use temporary DBs; `data/expenses.db` metadata remains unchanged and its contents were not opened. No source outside the approved controller/test isolation scope was changed, except project-local `.gitignore` for generated venv/bytecode. Python changes remain uncommitted/unpushed.
- **Next:** Exercise the V5 knowledge path: save the approved date-format decision through the Pi gate and retrieve/verify it in a fresh session. The gate's live approval/allow path and persistent trust remain untested.

### V5-20261006-022 — Jev review-preparation point retained as a future candidate

- **Recorded:** 2026-10-06T12:12:28+02:00
- **Type:** User-raised architecture follow-up
- **Status:** Documented as deferred; no Jev integration approved
- **Finding:** A human-gated memory proposal/review step may be a useful bounded decision point for Jev-style advisory support, especially if candidate review becomes repetitive or attention-heavy.
- **Boundary:** Jev could advise whether a candidate is worth presenting, identify missing evidence, or help summarize a batch. It cannot approve persistence, set a record active, replace the Pi confirmation gate, or authorize deletion. Do not add a classifier or call to the current slice.
- **Outcome:** Added the revisit note to C02, C09, `FIRST-SLICE-PLAN.md`, and the roadmap. Revisit after actual project-memory proposals provide evidence about interruption/review cost.
- **Next:** Complete the first V5 memory capture/retrieval trial; only then decide whether this Jev point solves a real problem.

### V5-20261006-023 — Timestamp correction for entry 022

- **Recorded:** 2026-10-06T12:19:17+02:00
- **Type:** Record-integrity correction
- **Status:** Corrected
- **Record:** Entry `V5-20261006-022` was assigned the timestamp from an earlier V5 entry by mistake. Its content is unchanged; this entry records the actual later logging time as 2026-10-06T12:19:17+02:00.

### V5-20261006-025 — Pi edit preview schema mismatch fixed

- **Recorded:** 2026-10-06T13:09:19+02:00
- **Type:** Adapter correctness / approval UX fix
- **Status:** V5 fix published; host snapshot refreshed; live preview check pending
- **Finding:** The user correctly rejected an `INDEX.md` edit confirmation because it said “No text preview available.” Pi 1.0.4's built-in `edit` tool supplies replacements in `input.edits[]`; the gate only read legacy top-level `newText`, so the intended review content was absent.
- **Fix:** V5 now formats each edit with existing and proposed text, and blocks a protected write/edit without a reviewable preview before showing an approval dialog. Twelve Node tests pass, including modern `edits[]` and fail-closed missing-preview cases.
- **Publication/snapshot:** Published at `e710071`. Refreshed only the Python host adapter runtime files and `AgenticLab/SOURCE-REVISION.txt`; verified runtime copies byte-for-byte. No knowledge or Python application files were changed by the refresh.
- **Next:** Restart Pi and session-trust the project to load the new adapter; verify the `INDEX.md` edit confirmation visibly contains old and proposed text. Only then may the user approve the index update. Fresh-session memory retrieval remains pending.

### V5-20261006-024 — Corrected shell-reference block verified in Pi

- **Recorded:** 2026-10-06T13:01:53+02:00
- **Type:** Runtime verification
- **Status:** Passed
- **Test:** In the Python project after launching a new Pi process with `pi --continue` and granting session-only project trust, the user asked Pi to run the read-only `find AgenticLab/knowledge ...` check.
- **Result:** Pi blocked shell access with “Shell access to AgenticLab project knowledge is blocked. Use Pi’s read tool to inspect it and the gated write/edit path to change it.” No Yes/No write-confirmation prompt appeared. The corrected snapshot is active; use Pi’s file tools for knowledge inspection.
- **Next:** Update `AgenticLab/knowledge/INDEX.md` through the gated edit path to reference the approved date-format record, then evaluate retrieval in a fresh session. The index remains stale; do not edit application code.

### V5-20261006-026 — Index approval and first fresh-session recall

- **Recorded:** 2026-10-06T13:16:26+02:00
- **Type:** Knowledge lifecycle / retrieval trial result
- **Status:** Index approval and readback passed; fresh-session index retrieval and source verification returned the expected decision
- **Index update:** The user reviewed a visible before/after `edit` preview after restarting Pi with the `edits[]`-aware gate, approved the scoped change, and confirmed via Pi `read` that the active record link, project scope, and existing guidance were retained. Only `AgenticLab/knowledge/INDEX.md` changed.
- **Fresh session:** Without prior conversation history, Pi reported the applicable active `YYYY-MM-DD` decision and record path, then checked `src/gui.py`, `src/controller.py`, and `src/tests/test_expense_tracker.py`. The response was consistent with the current source and reported no edits.
- **Evidence limit:** The pasted response confirms index-based discovery and current-source verification but does not explicitly establish whether Pi opened `records/expense-date-format.md` itself. Treat this as a successful index-level recall trial, not proof of a direct record-file read. No utility or interruption-cost conclusion is warranted from one run.
- **Next:** Review the trial qualitatively; if the Pi tool transcript makes it easy to tell, note whether the linked record file was read. Do not change the knowledge gate or add Jev support from this single result.

### V5-20261006-027 — Fresh-session handoff and status clarification

- **Recorded:** 2026-10-06T13:20:07+02:00
- **Type:** Current-state / next-session handoff
- **Status:** First bounded slice and first index-retrieval check complete; qualitative review remains
- **Current result:** The approved date decision is saved and indexed. In a new session, Pi found it via the index and verified current GUI/controller/tests without editing. The response does not establish that the linked record file itself was opened.
- **Next:** Review relevance, source consistency, re-explanation/attention cost, and whether the record helped. Do not add more gate mechanisms or implement the deferred Jev idea unless further observations support a specific change.
- **Boundaries:** Python host changes and integration remain uncommitted/unpushed; do not publish them without approval. The real expense DB was not opened or modified. No global Pi settings changed. Pi project trust is session-only.
- **Log navigation:** Entries `024` and `025` are displayed out of timestamp order and their `Next` lines describe earlier states. Entry `026` records the retrieval outcome; this entry plus `FIRST-SLICE-PLAN.md` hold the current handoff.

### V5-20261006-028 — Prompt frequency identified as primary friction measure

- **Recorded:** 2026-10-06T14:46:22+02:00
- **Type:** User evaluation feedback / workflow friction
- **Status:** Recorded; no gate or workflow change approved
- **Correction:** The user clarified that the main concern is not the wording/content of a confirmation prompt, but how many times the workflow interrupts them compared with the previously streamlined task flow.
- **Observed sample:** One decision required two successful approvals: one for saving the decision record and a separate one for updating the knowledge index. A no-preview index attempt was canceled while fixing the adapter; an earlier read-only shell false positive was also encountered and then fixed. These are pilot/setup events, not a stable estimate of normal-use prompt frequency.
- **Implication:** Future evaluation should count approval interruptions per meaningful task/decision and separate necessary durable changes from redundant index/metadata edits and false positives. The user affirmed the fresh-session answer was useful but did not yet state that the observed approval frequency was acceptable.
- **Outcome:** Updated C02, C09, the first-slice plan, and roadmap to emphasize frequency/attention cost and defer batching or Jev support until recurring friction is observed. No implementation change was made.

### V5-20261006-029 — Pause capture workflow to define the knowledge interface

- **Recorded:** 2026-10-06T15:03:03+02:00
- **Type:** Phase-order checkpoint / architecture priority
- **Status:** Agreed next design focus; no structure or implementation selected
- **Pause point:** During the V5 first vertical slice's knowledge capture/index/retrieval work (Phase 3 host continuity, now reviewed), the team recognized that project knowledge records will grow. The index/structure and retrieval contract determine navigation accuracy, maintenance work, and how many separate user approvals are needed.
- **Why reorder:** The trial required separate approvals for record creation and index maintenance. Choosing a per-record index or a stable directory index before discussing the knowledge interface could prematurely optimize for one-record use and harm navigation as the collection grows. Defer further capture/gate workflow changes until the knowledge interface is defined.
- **Next phase:** Bounded design discussion of expected growth, record units/lifecycle, structure/navigation alternatives (including MOC, semantic maps, and links), retrieval accuracy/verification, maintenance, and approval interruptions. Compare options; do not assume any particular structure or build it yet.
- **Boundary:** This changes the order of work, not the approved Python scope. Jev remains deferred; the real database is untouched; Python host changes remain uncommitted/unpushed. `FIRST-SLICE-PLAN.md` now records the current handoff.

### V5-20261006-030 — Retrieval jobs and knowledge-structure alternatives drafted

- **Recorded:** 2026-10-06T15:09:46+02:00
- **Type:** Knowledge-interface design work
- **Status:** Draft for user review; no structure selected and no implementation authorized
- **Work:** Expanded C02 with proposed retrieval jobs (exact decision recall, task-relevant procedures/risks, cross-record relations/conflicts, correct negative outcomes, and freshness/source verification), evaluation measures, structure alternatives, and a candidate retrieval flow.
- **Alternatives compared:** atomic records with a maintained index; a stable index plus record-directory discovery; category directories; atomic records with MOC/topic maps and Markdown links; and a semantic map/graph. Clarified that atomicity, category metadata, MOCs, semantic relations, and wikilink syntax solve different problems.
- **Initial hypothesis only:** keep atomic source-linked records and existing categories as metadata; defer category-based folders and graph structures until retrieval jobs justify them. Expected growth, category cardinality, and actual cross-record query needs remain to be discussed.
- **Next:** Review the proposed retrieval jobs and compare structure tradeoffs with the user. Select no architecture until the retrieval workload and growth assumptions are clear. No code or Python changes were made.

### V5-20261006-031 — Model recoverability and DiaWorkspace scale context

- **Recorded:** 2026-10-06T15:17:49+02:00
- **Type:** Knowledge-value design constraint / read-only inventory
- **Status:** Design consideration recorded; no corpus selection or migration
- **User insight:** Current models may make some knowledge that helped older agents unnecessary. Collection size alone does not establish utility; the design must consider what a capable current model can cheaply re-derive from current source versus what is not represented there (decisions/rationale, constraints, rejected alternatives, or costly discoveries).
- **Read-only inventory:** `DiaWorkspace/AgenticLab/knowledge` contains 129 files in 42 directories (~1,020 KiB), including 60 files under `improvements` (~612 KiB), 28 under `shared` (~95 KiB), and 7 under `notes` (~83 KiB), plus role-oriented memory folders and checkpoints. Migration-check snapshots add ~1.3 MiB of archived material. Only paths, file counts, and sizes were inspected; no knowledge content or `.env` was opened, copied, or changed.
- **Interpretation:** This confirms a larger/heterogeneous legacy structure, not that the records are useful, current, or worth preserving. The next interface design should include source-recoverability/model-baseline as an evaluation axis and avoid treating the old collection as a migration target.
- **Outcome:** Added this axis to the proposed C02 knowledge-interface design. No code or Python project changes were made.

### V5-20261006-032 — Distinguish DiaWorkspace working tree from populated backup

- **Recorded:** 2026-10-06T15:35:25+02:00
- **Type:** Baseline provenance / safety checkpoint
- **Status:** Distinction recorded; no overwrite, copy, or import performed
- **Correction:** The earlier 129-file/~1,020 KiB inventory described the active `/home/peet/Projects/Practice/DiaWorkspace/AgenticLab/` working tree, not the populated knowledge baseline the user meant. Its hot-tier MOCs are largely empty/template-like, though other knowledge files remain. Do not use those aggregate counts as the size/content of the populated memory corpus.
- **Populated baseline:** `/home/peet/Projects/Full Laptop Backup/Agents/AgenticLab V3 Neo Backup/AgenticLab/` contains 113 knowledge files (84 Markdown), 41 directories, and about 932 KiB. Its Architect, Senior, Explorer, Tester, Reviewer, UX, and shared hot MOCs contain substantive project content. Selected reads covered README, DIGEST, SEMANTIC_MAP, memory-spec, major MOCs, and representative feature/improvement/notes; this was not an exhaustive read of all 113 files. `.env` was not opened.
- **Overwrite risk:** The active DiaWorkspace AgenticLab is a Git repository on `main` at `bae5ccf` with modified and untracked work, including knowledge files. The backup has no `.git`, `tools/`, `.gitignore`, or `QUICKSTART.md`; it is not a drop-in replacement. Keep it separate and read-only as a comparison baseline. The Python expense-tracker workspace remains the only V5 experimental host.
- **Outcome:** Updated C02, the first-slice handoff, and roadmap to record the two-source boundary. No DiaWorkspace, backup, or Python files were modified.

### V5-20261006-033 — Qualitative value/recoverability matrix drafted from populated baseline

- **Recorded:** 2026-10-06T15:41:45+02:00
- **Type:** Knowledge-interface design / baseline analysis
- **Status:** Draft for review; no architecture or migration selected
- **Sampled evidence:** Reviewed the backup's README, DIGEST, SEMANTIC_MAP, memory specification, populated shared/agent MOCs, a feature record, improvement records, a note index, and selected role memory files. This is a targeted sample, not an audit of all 113 knowledge files.
- **Finding:** The old structure separates several dimensions—not just categories—including owner (shared/role), lifecycle/tier (digest/hot/cold/feature/reference), concept navigation (SEMANTIC_MAP/MOC links), and purpose (project knowledge vs. user notes, checkpoints, logs, and AgenticLab improvement backlog). Its category/entry tags are a separate axis.
- **Granularity observation:** The backup's SEMANTIC_MAP has 30 usable nodes targeting 16 files. Three concepts target the ~27.8 KiB Architect MOC and nine target the ~3.9 KiB shared symbol index; semantic navigation can therefore return coarser payloads than one concept. Runtime caps exist, but effective context granularity remains a design consideration. Documented runtime loading differs by tier/harness; do not infer token cost from file size alone.
- **Value hypothesis:** Current-source facts and conventions may often be re-derived; cross-system navigation can reduce search cost; explicit decisions/rationale/external contracts are less recoverable from code; active feature/checkpoint state is time-sensitive; user notes and framework-development backlog need separate purposes and retrieval policies. These are qualitative hypotheses from selected samples, not corpus-wide classifications or proof of benefit on today's models.
- **Outcome:** Added a preliminary value/recoverability matrix to C02. The Python workspace remains the only V5 experimental host; Dia's populated backup remains a read-only comparison baseline. No DiaWorkspace, backup, or Python files were modified.

### V5-20261006-034 — Preserve demonstrated capability while redesigning V4 mechanisms

- **Recorded:** 2026-10-06T15:47:04+02:00
- **Type:** User-approved design principle / knowledge-interface scope
- **Status:** Design constraint recorded; no architecture or implementation selected
- **Principle:** V4's layered retrieval system grew through accumulated mechanisms, but those layers may encode real value and useful synergy. V5 should improve the architecture without blindly porting the patchwork or indiscriminately removing mechanisms because current models are stronger or fewer components seem simpler.
- **Decision method:** Before preserving, merging, replacing, deferring, or removing a capability, map the user problem, V4 mechanisms/interactions, benefit/failure evidence, context/latency/maintenance/approval costs, and what current models/source can recover. Simplify only when the demonstrated outcome is preserved or no longer valuable.
- **Outcome:** Added a capability-preservation method to C02 and updated the first-slice handoff and roadmap. The next design step is to map V4 retrieval capabilities/interactions and costs before selecting a V5 knowledge interface. No V5 code, Python files, or DiaWorkspace files were changed.

### V5-20261006-035 — Preliminary V4 retrieval-capability map drafted

- **Recorded:** 2026-10-06T15:50:15+02:00
- **Type:** Capability mapping / architecture analysis
- **Status:** Preliminary map for user review; no V5 disposition selected
- **Scope mapped:** session orientation/DIGEST; hot MOC/domain routing; semantic-map cold retrieval; graphify topology; feature and procedure retrieval; write/conflict/lifecycle controls; episodic logs and `/retro`; freshness signals and metrics; separate user notes and AgenticLab improvement backlog.
- **Interactions noted:** discovery/source analysis → user-reviewed preservation and routing → digest/MOC/map/feature-based retrieval → current-source verification → review/refine/retro and supersession. Removing one surface can shift cost or failure to another.
- **Evidence/cost caveats:** backup docs and Pi adapter code confirm many mechanisms exist, and the backup contains populated artifacts. They do not prove current-model user benefit. Caps and thresholds exist, but some are explicitly reasoned-not-measured; metrics largely count matches/cost rather than answer improvement or candidate-selection rationale. Specified traversal can differ between harnesses; confirm behavior per mode.
- **Next:** Review the capability map and classify each capability as preserve/merge/replace/defer/remove only after user need, evidence, interaction, model recoverability, and cost are clear. Do not implement or import the V3 backup.

### V5-20261006-036 — Clarify the V5 read/retrieval implementation boundary

- **Recorded:** 2026-10-06T16:08:10+02:00
- **Type:** Architecture boundary clarification
- **Status:** Recorded; retrieval design remains in progress
- **Clarification:** The Pi files under `system/adapters/pi/` implement knowledge-write confirmation and shell-reference blocking; they do not implement read selection, search, index parsing, graph/MOC traversal, ranking, or retrieval telemetry. `system/AGENTS.md` and the knowledge contract give instructions/record semantics, while the host trial used Pi-native `read`/`ls` tools.
- **Trial limits:** The fresh-session test explicitly told Pi to check project knowledge/index, so it verifies a narrow host workflow plus source verification, not autonomous/task-triggered retrieval or a custom V5 read mechanism. The pasted response does not confirm the linked record file itself was opened.
- **Outcome:** C02, `FIRST-SLICE-PLAN.md`, and the roadmap now distinguish the write gate from the read/retrieval interface. Design of retrieval mechanisms remains the next knowledge-interface task.

### V5-20261006-037 — Read-side retrieval options drafted

- **Recorded:** 2026-10-06T16:10:30+02:00
- **Type:** Knowledge-interface design / retrieval mechanism comparison
- **Status:** Options and candidate flow drafted; no retrieval mechanism selected
- **Options compared:** native `ls`/`read`; curated MOC/topic maps; local lexical search; V4-style trigger maps; model/embedding search.
- **Candidate hybrid flow:** enforce workspace/subproject scope → use curated routes plus lexical discovery → filter lifecycle/status/freshness → read a small set of exact records → verify mutable claims in current source → report applicable/no-match/filtered/unavailable. This is a hypothesis for comparison, not an implementation decision.
- **Constraints:** Native file reads already work; the current Pi gate deliberately blocks Bash commands referencing project knowledge, so lexical search would require a safe read-only tool/host capability, not a shell bypass. Read-only retrieval should not prompt for approval; write approvals remain at persistence boundaries. Semantic/embedding fallback and retrieval telemetry remain optional.
- **Next:** Review these options against the proposed retrieval jobs and the V4 capability map; evaluate precision, recall, context size, maintenance, scope safety, and failure observability before selecting any V5 read mechanism.

### V5-20261006-038 — Retrieval must be observable, not just claimed

- **Recorded:** 2026-10-06T19:24:44+02:00
- **Type:** User-raised retrieval correctness / observability requirement
- **Status:** Required design property recorded; implementation remains pending
- **Concern:** The user recalls a V4 failure mode where it was unclear whether memory was actually retrieved. Trigger configuration or an answer naming a record is not sufficient proof.
- **Evidence ladder:** distinguish task activation, candidate consideration/filter reason, actual record read/delivery, source verification, answer citation, and task-level usefulness. A trace can establish activation/fetch; citation/self-report alone cannot prove that memory caused a better answer, which requires a task comparison or user outcome.
- **V4 baseline:** the inspected Pi adapter records aggregate match/cap/zero-match counters; the V4 backlog separately proposed candidate-level retrieval trajectories. The current map does not provide per-query proof of which candidate was selected and why.
- **Design constraint:** V5 retrieval tests must include relevant tasks without an explicit “check memory” instruction, plus irrelevant/no-match and wrong-scope cases. Do not persist raw prompts or record contents by default; log only the minimum structured evidence needed. Reads remain prompt-free; approvals are for persistence.
- **Outcome:** Added this requirement to C02 and the handoff/roadmap. No retrieval engine or telemetry code was implemented.

### V5-20261006-039 — Minimum proof artifact for a retrieval pilot

- **Recorded:** 2026-10-06T19:27:40+02:00
- **Type:** Retrieval-evaluation protocol / privacy boundary
- **Status:** Proposal recorded; no telemetry or retrieval code implemented
- **Initial evidence source:** Use Pi's native session tool-call trace to establish which index/map/record paths were actually read. Pair it with a concise session-local receipt: scope, activation mode, candidate IDs/paths and match/filter reasons, read success, source-verification paths, retrieval outcome, and user usefulness/noise assessment.
- **Privacy/cost:** Do not duplicate raw queries or full retrieved content into a new metrics file. Reads should remain prompt-free; avoid automatic durable telemetry absent a separate data/retention decision.
- **Evidence boundary:** This proves whether retrieval activated/fetched/verified, not whether memory causally improved an answer. That requires a representative current-source/no-memory comparison or user outcome. The model's post-task claim alone is insufficient.
- **Next:** Use this minimal trace in the next retrieval experiment. Do not build a search engine or persistent telemetry yet.

### V5-20261006-040 — Natural retrieval test missed memory and crossed DB read boundary

- **Recorded:** 2026-10-06T19:40:19+02:00
- **Type:** Retrieval activation failure / data-boundary incident
- **Status:** Test invalid; no further DB access
- **Retrieval result:** The natural date-format task's tool trace shows reads of source/tests/docs and no `AgenticLab/knowledge/INDEX.md` or decision-record read. It therefore did not demonstrate memory activation/fetch; it is a task-triggered retrieval miss under the current host instructions.
- **Boundary event:** The same trace shows a SQLite connection to `data/expenses.db` using `mode=ro` and SELECT queries. This confirms the real DB was read, which violated the documented no-read boundary even though the connection was read-only. Post-run file size, mtime, and ctime were unchanged; this establishes no observed modification, not permission to read. Do not repeat or query its contents.
- **Outcome:** Treat this retrieval run as invalid for normal-use evaluation. Require future Python-host retrieval prompts/tests to explicitly prohibit DB/CSV/data-file access and app/test execution, and inspect the existing tool trace to establish activation, candidate selection, and record fetch. No V5 code or Python files were changed during this incident.

### V5-20261006-041 — Persist host data boundary in Python project entry instructions

- **Recorded:** 2026-10-06T19:48:19+02:00
- **Type:** Experimental-host safety instruction
- **Status:** Added with user approval; uncommitted/unpushed
- **Change:** Added a V5-specific data boundary to the Python root `AGENTS.md`: do not read/query/copy/parse/summarize `data/` or `.env` without specific approval; do not run the app or tests/commands that could use the real DB unless temporary DB isolation is confirmed; stop and ask before data access. It states this is instruction, not an OS sandbox.
- **Verification:** Read back the updated instruction. No application source/tests or database were changed. DB size/mtime/ctime remain unchanged after the prior read-only query; that query remains a recorded boundary violation.
- **Next:** For another activation trial, use a fresh Python Pi session with a read-only tool allowlist (no Bash/MCP), explicitly prohibit `data/` and execution in the task, omit any mention of memory/index in the user task, and inspect the tool trace. Do not repeat if it attempts a data-path access.

### V5-20261006-042 — Guarded natural-task retrieval trace observed

- **Recorded:** 2026-10-06T19:57:26+02:00
- **Type:** Retrieval activation/fetch verification
- **Status:** Activation, record read, and source inspection observed; utility not yet attributable
- **Setup:** In a fresh Python Pi session with `--tools read,ls,grep,find --no-mcp`, project session-only trust, and the new root AGENTS data boundary, the user asked a natural date-format-change question without mentioning memory/index. No Bash, Python, SQLite, app, test, or edit tools were available/called.
- **Trace:** Pi read the project entry instructions, listed the workspace/source/test directories, then explicitly read `AgenticLab/knowledge/INDEX.md`, `records/expense-date-format.md`, and relevant GUI/controller/model/test/README files. No `data/` or `.env` content was read in this guarded run.
- **Result:** The system activated on a relevant task, fetched the linked record, and checked current source. The answer recommended keeping ISO storage and allowing presentation-only change, consistent with the record, but it did not explicitly cite the prior user decision/rationale. This proves the read path ran in this case, not that memory causally improved the answer or that accuracy holds across queries.
- **Outcome:** This is the first clean task-triggered retrieval trace. Keep the earlier database-read incident recorded separately; no further DB access is authorized. The next design work should define evidence/utility criteria across more than this single query.

### V5-20261006-043 — Unrelated task did not trigger date-memory lookup

- **Recorded:** 2026-10-06T20:09:07+02:00
- **Type:** Negative retrieval/selectivity check / source-analysis follow-up
- **Status:** No unnecessary date-memory lookup observed; one evidence gap in the first answer was corrected by follow-up read
- **Task:** In a fresh Python Pi session using only read/list/search tools, the user asked how expense descriptions are handled, without mentioning memory or the date decision. The tool trace shows no read of the knowledge index or date record, no access to `data/` or `.env`, no command execution, and no edits.
- **Result:** This is one positive example of selective non-retrieval for a task unrelated to the stored date decision. The initial answer's claim about test coverage was not adequately supported because it read only the root smoke test; the user then requested a targeted read of `src/tests/test_expense_tracker.py`. That follow-up found no test for blank/missing descriptions; the existing missing-fields test supplies a non-empty description. No tests were run.
- **Evidence limit:** One task does not estimate false-negative rate or general precision. The source-analysis miss also shows the agent can under-inspect relevant tests even when it avoids unnecessary memory retrieval.
- **Next:** Compare this negative case with the guarded positive date-format retrieval when refining activation and evidence criteria. No app/code/database change.

### V5-20261006-044 — Explicit no-match status observed

- **Recorded:** 2026-10-06T20:58:20+02:00
- **Type:** Retrieval negative-outcome check
- **Status:** Index-level no-match reporting passed; corpus completeness remains unresolved
- **Task:** In a fresh Python Pi session, the user explicitly asked whether project knowledge contained a prior data-retention decision for expense exports. The task prohibited edits, execution, and access to `data/` or `.env`.
- **Trace:** Pi read AgenticLab instructions, `knowledge/INDEX.md`, the knowledge contract, and `.pi/settings.json`. It reported the store available and the index listing only an unrelated active date-format decision; no applicable record was found. No record file was read; no protected data path was accessed.
- **Result:** This demonstrates the `no match` outcome when the available index is read, distinct from retrieval failure/unavailable. The check did not enumerate `knowledge/records/`, so it assumes the index is complete. Index completeness versus authoritative corpus discovery is an open knowledge-interface decision.
- **Next:** Compare an exhaustive manifest, stable index plus directory discovery, and a generated read-only inventory, balancing completeness, growth, retrieval cost, and approval frequency. No code, app, database, or Python changes.

### V5-20261006-044 — Explicit no-match status observed

- **Recorded:** 2026-10-06T20:54:49+02:00
- **Type:** Retrieval negative-outcome check
- **Status:** Index-level no-match reporting passed; completeness across unindexed files untested
- **Task:** In a fresh Python Pi session, the user explicitly asked whether project knowledge contained a prior data-retention decision for expense exports. The task prohibited edits, execution, and access to `data/` or `.env`.
- **Trace:** Pi read AgenticLab instructions, `knowledge/INDEX.md`, the knowledge contract, and `.pi/settings.json`. It reported that the store was available and the index listed only the unrelated active expense-date decision; no applicable record was found. No record file was read, and no protected data path was accessed.
- **Result:** This demonstrates the `no match` outcome for the current index, distinct from retrieval failure/unavailable. The check did not enumerate `knowledge/records/`, so it assumes the index is complete; index/record consistency remains an open interface requirement.
- **Next:** Include an index-completeness rule or safe consistency check in the knowledge-interface design. No app/code/database change.

### V5-20261006-045 — Compact mental model added for the knowledge interface

- **Recorded:** 2026-10-06T21:09:04+02:00
- **Type:** User-requested design simplification / interface synthesis
- **Status:** Working sketch for discussion; no schema, layout, or retrieval engine selected
- **User need:** The interface has many interacting dimensions and is becoming hard to hold mentally. User delegated synthesis judgement and authorized continued use of the populated V3 Neo backup as a read-only comparison baseline; Python remains the experimental host.
- **Sketch added to C02:** one read path (task → scope → index/topic MOC → completeness inventory/search → type/status/freshness filters → atomic record → source verification → explicit outcome) and one write path (observation → evidenced candidate → user review → approved record → discoverability update). Separates scope, topic, category/type, lifecycle/status, record truth, and MOC navigation.
- **Open design decision:** whether topic MOCs are exhaustive inventories or curated routes backed by a complete corpus scan; how to keep them complete without a separate approval for every record. No implementation or Python changes made.

### V5-20261006-046 — Hierarchical index/MOC direction approved for further design

- **Recorded:** 2026-10-06T21:17:29+02:00
- **Type:** User-approved architecture direction / design checkpoint
- **Status:** Preferred direction approved for design validation; no implementation authorized
- **Direction:** Keep `INDEX.md` as the central route to domain/topic MOCs; use curated maps to organize concepts and cross-category links; keep atomic records and metadata as the authoritative corpus. Category remains a record-type attribute, not the folder hierarchy.
- **Completeness constraint:** A MOC may aid navigation but must not be the only way to discover a valid record. The candidate design needs a complete, safe corpus inventory/search fallback for reliable no-match results.
- **Cost constraint:** Avoid a separate manual index approval for every record. Maps should change when concepts/routes change, not just because a record was added; a read-only inventory or generated view is a candidate, not yet selected.
- **Next:** Define how the corpus is enumerated, filtered, and proven complete without extra per-record approval prompts; then test an in-scope record omitted from the map and a true no-match. No code, Python, or DiaWorkspace changes.

### V5-20261006-046 — User approves hierarchical index/MOC direction for continued design

- **Recorded:** 2026-10-06T21:16:23+02:00
- **Type:** Knowledge-interface direction / user approval
- **Status:** Approved as the preferred direction to design and validate; not implementation authorization
- **Direction:** Keep a central `INDEX.md` routing to domain/topic MOCs, with MOCs grouping concepts and linking across record types. Treat atomic records and their metadata as authoritative; categories remain metadata rather than folders. A complete read-only inventory/search fallback must prevent an omitted MOC link from producing a false no-match.
- **Reason:** Supports organized, growing knowledge while preserving curated navigation and making record discovery complete. Avoid a separate manual index write/approval for every record where possible.
- **Next:** Specify how the authoritative record corpus is enumerated, how MOCs stay useful without being exhaustive per-record manifests, and how no-match is proven without a second approval per record. No code or host changes are authorized by this design direction alone.

### V5-20261006-047 — Development-log identifier correction

- **Recorded:** 2026-10-06T21:27:16+02:00
- **Type:** Log integrity correction
- **Status:** Corrected prospectively; prior entries retained
- **Correction:** Two adjacent entries were accidentally assigned ID `V5-20261006-046` while recording the same hierarchical index/MOC design direction. Their timestamps and content remain intact; treat them as a duplicate-ID recording error, not separate architecture decisions. `C02-knowledge-lifecycle.md` and `FIRST-SLICE-PLAN.md` are the current design/handoff sources.

### V5-20261006-048 — Native record inventory checked against the index

- **Recorded:** 2026-10-06T21:27:16+02:00
- **Type:** Read-only completeness check / knowledge retrieval
- **Status:** Current one-record corpus inventory agrees with index; scaling behavior remains untested
- **Trace:** In a fresh Python Pi session, the user asked Pi to enumerate `AgenticLab/knowledge/records/` and compare it with `INDEX.md`. The active toolset exposed `read` and `ls`; `find` and `grep` were not available to the model despite being requested. Pi listed the directory, read the record header, and found one flat record, no subdirectories, and a matching index entry. No data files, DB, app, tests, or edits were accessed.
- **Result:** Together with the prior explicit no-match query, this confirms no-match reporting against the current flat, one-record corpus. It does not test recursion, many records, or a record omitted from a map. The native `ls`/`read` baseline is sufficient at this scale; search/inventory tooling for growth remains an open design question.
- **Next:** Compare the cost and reliability of scoped Pi-native listing/search with a generated read-only inventory; keep the record corpus authoritative and the MOC a navigation aid. No implementation or Python changes.

### V5-20261006-049 — Native Pi `find` availability confirmed for current records tree

- **Recorded:** 2026-10-06T21:36:18+02:00
- **Type:** Read-only tool capability / inventory check
- **Status:** Current flat-tree inventory succeeded; recursive/scale and grep behavior remain untested
- **Trace:** In a new Python Pi session with the read-only tool selection, the user asked Pi to use its native `find` tool (not Bash) to list `AgenticLab/knowledge/records/`. The tool enumerated one Markdown record with a result limit of 1,000. No record contents, data files, database, `.env`, app, or tests were accessed; no files were edited.
- **Result:** Native `find` works in this session and confirms the current flat, one-record directory. Together with the prior `ls`/INDEX comparison, the current inventory matches the index. This is not evidence for larger/nested collections; grep/lexical search has not been tested.
- **Next:** Compare native `find`/`grep` against a generated read-only inventory as record count and hierarchy grow. No custom catalog, code, or Python change selected.

### V5-20261006-050 — Native Pi `grep` tested on records corpus

- **Recorded:** 2026-10-06T21:40:30+02:00
- **Type:** Read-only search capability / no-match check
- **Status:** Native lexical search works for the current corpus; semantic completeness and scale untested
- **Trace:** In a fresh Python Pi session with the read-only tool allowlist, the user asked the built-in `grep` tool (not Bash) to search only `AgenticLab/knowledge/records/` for `data-retention`. Pi reported no match and confined the search to that directory. No `data/` or `.env` access, execution, or edits occurred.
- **Result:** Confirms the current Pi host exposes native `grep` and it can search the scoped record directory without shell access. Combined with `find`, the minimal native-tool baseline can inventory and lexically search the present one-record corpus. A literal-term no-match does not prove semantic no-match; nested trees, large result sets, and paraphrase recall remain untested.
- **Next:** Evaluate native `find`/`grep` plus MOC routing as the first low-infrastructure candidate; compare against generated metadata inventory only if scale/cost evidence warrants it. Keep no-match claims scoped to the search method and corpus scanned.

### V5-20261006-051 — Synthetic map-omission fallback check

- **Recorded:** 2026-10-06T21:47:40+02:00
- **Type:** Retrieval capability fixture / scope-status filtering
- **Status:** Passed on synthetic fixture only; no implementation selected
- **Setup:** Created a temporary fixture under the Python workspace's test-fixture path: a root index and date-topic MOC, one active in-scope export-retention record deliberately omitted from the MOC, plus inactive and wrong-project decoys.
- **Result:** In a read-only Pi session, native `grep` found all three retention candidates in the records corpus. Pi read their metadata and selected the active in-scope record, excluding the inactive and wrong-scope entries. It did not use Bash, access `data/`/`.env`, run tests/app, or edit application/knowledge files.
- **Cleanup/limit:** The temporary fixture was removed and the Python workspace status returned to its pre-fixture state. This proves native lexical fallback can recover an unlinked record and apply metadata filters in a tiny controlled case; it does not establish behavior on real heterogeneous records, semantic paraphrases, large corpora, or result caps.
- **Next:** Use this as an acceptance scenario when comparing the preferred index/MOC + authoritative-record-corpus design with a generated catalog. No Python/Dia/V5 runtime code was changed.

### V5-20261006-052 — Record metadata and MOC responsibilities drafted

- **Recorded:** 2026-10-06T21:53:57+02:00
- **Type:** Knowledge-interface schema/navigation design
- **Status:** Proposed baseline for user review; no schema or implementation selected
- **Direction approved for design:** User accepted continuing with a hierarchical index/MOC interface and asked to proceed with a clear metadata/map responsibility split.
- **Draft split:** Root `INDEX.md` routes to domain/topic MOCs; MOCs curate concepts, aliases, relationships, and useful links without duplicating claims or acting as an exhaustive manifest; scoped atomic records remain authoritative and searchable independently of map membership.
- **Record metadata proposal:** one primary category (`decision | fact | experience | risk | procedure`), stable ID, workspace/subproject/feature scope, lifecycle state, provenance/evidence, and recorded/verified dates. Categories remain metadata, not folders. Topic membership is represented by map links initially; whether a topic/tag field is worth adding remains open.
- **Prompt-cost constraint:** target one approval per new record. Update a MOC only when a new concept/relationship merits curation, not for every record. If multiple changes become common, evaluate one approved transaction separately.
- **Next:** Review this split against monorepo-scale navigation, scope filtering, and the synthetic map-omission evidence. No code, Python, or DiaWorkspace changes.

### V5-20261006-053 — Minimal knowledge-interface contract drafted

- **Recorded:** 2026-10-06T22:00:38+02:00
- **Type:** Knowledge-interface synthesis / design checkpoint
- **Status:** V0 contract for user review; no implementation authorized
- **Model:** `INDEX.md` identifies scope and routes to domain/topic MOCs; MOCs curate concepts/aliases/relationships; atomic records are the authoritative content; a complete scoped inventory/search prevents maps from hiding records.
- **Record baseline:** stable ID, one primary category, workspace/subproject/feature scope, lifecycle state, provenance/evidence, recorded/verified dates. No separate topic field at this stage; topic relationships are in MOC links. Mixed claims should be split into linked atomic records.
- **Read path:** scope → MOC route → complete record inventory/search → metadata filters → read a small candidate set → source verification → explicit retrieval outcome and trace. No-match requires a successful complete scan; capped/unavailable search must be reported as incomplete.
- **Acceptance gate:** mapped record recall; map-omitted in-scope record found; inactive/wrong-scope records filtered; true no-match only after complete inventory; incomplete/capped inventory surfaced; trace shows activation and record fetch.
- **Boundaries:** maps need not be updated for each new record; one approval per record remains the target. This is a design contract, not approval for a custom catalog, graph, MOC generation, or write transaction.

### V5-20261006-054 — V0 read-side instructions implemented and Python snapshot refreshed

- **Recorded:** 2026-10-06T22:14:11+02:00
- **Type:** Approved contract implementation / host snapshot refresh
- **Status:** Published and staged; live Pi verification pending
- **V5 changes:** Updated only `system/AGENTS.md` and `system/brain/knowledge-contract.md` to define the INDEX/MOC/records roles, use maps as navigation rather than exhaustive inventories, require complete scoped record search before `no match`, report incomplete/unavailable scans, and cite actual record paths when they materially inform an answer. The `find`/`grep`/`read`/`ls` instruction is capability-aware and prohibits Bash for knowledge search.
- **Verification:** All 12 Pi gate Node tests pass. Published source revision is `647043d9008703a4b5a52ec5d2d732f19d879f0e`. Refreshed only the corresponding Python snapshot files and `AgenticLab/SOURCE-REVISION.txt`; `cmp` confirmed byte identity. No project knowledge, application code, tests, or database was touched by the refresh.
- **Next:** Load this snapshot in a fresh Python Pi session with read-only tools and verify one relevant natural task and one explicit no-match requiring a complete record scan. Keep `data/`/`.env` off-limits; do not run tests/app or use Bash. Confirm the actual tool trace, not only the answer.

### V5-20261006-055 — Updated read contract verified in Pi

- **Recorded:** 2026-10-06T22:18:00+02:00
- **Type:** Runtime verification / no-match completeness
- **Status:** Passed for the current flat, one-record corpus
- **Test:** Fresh Python Pi session with read-only tools; explicit query for an export-retention decision, with no access to `data/`/`.env`, no execution, and no edits.
- **Trace/result:** Pi read `INDEX.md` and the updated knowledge contract, enumerated `records/` with native `find`, searched it with native `grep`, then read the sole record. It returned `no match` for the requested topic and explicitly distinguished the indexed date-format record as unrelated. No protected paths were accessed.
- **Conclusion:** The updated instructions drive a complete inventory/search before no-match in the current corpus. This validates only a flat one-record case under the active read-only toolset; result caps, nesting, scale, semantic recall, and causal memory benefit remain open. The earlier DB-read incident remains a separate, invalid trial; no further DB access is authorized.
- **Next:** Review the v0 interface contract and decide whether to authorize a bounded implementation slice. No custom search engine or catalog is implemented.

### V5-20261007-056 — First-slice review outcome and next-scope recommendation

- **Recorded:** 2026-10-07T06:44:46+02:00
- **Type:** Phase 4 review / development order
- **Status:** First slice retained as a narrow prototype; implementation expansion not yet authorized
- **Evidence:** A relevant natural task triggered index/record read and current-source verification; an unrelated description task did not load the date record; an explicit no-match query was followed by complete enumeration/search of the current one-record corpus; a synthetic fixture demonstrated map-omission recovery and scope/status filtering. The user reported the relevant answer useful. The answer's causal reliance on the record and benefit beyond one task remain unproven.
- **Costs/limits:** One decision required two approvals for record plus index; the user's main concern is interruption frequency. A prior unguarded task queried the real DB read-only and violated scope, though it did not modify the DB; later tests used explicit data boundary plus read-only tools. Current native tool tests cover only a tiny flat corpus; nested/large-scale and semantic recall remain open.
- **Disposition:** Preserve the basic knowledge capability and continue with the user-approved INDEX → topic MOCs → authoritative records direction. Do not add auto-capture, custom semantic/embedding search, or Jev now. Next prepare one bounded implementation proposal for MOC/record responsibilities and completeness/fallback behavior, including approval-count impact; get explicit scope approval before changing runtime or Python files.

### V5-20261007-057 — Collection extensibility added to the read contract

- **Recorded:** 2026-10-07T06:59:53+02:00
- **Type:** Knowledge-interface extensibility / user direction
- **Status:** Contract updated; no new collection or MOC implemented
- **User requirement:** Keep the small baseline flexible enough for knowledge to grow, support wider MOC/index structures, and link to other information products such as backlog candidates without flattening them into one undifferentiated memory store.
- **Contract change:** `INDEX.md` may route to multiple nested maps/collections; each collection retains its own scope, purpose, owner, and lifecycle. Categories have one primary value per record but can be extended through a reviewed contract update. MOCs remain navigation projections, and backlog/user-note collections are linkable but not implicitly merged, loaded, or promoted.
- **Boundary:** No record, MOC, or backlog data was copied. No Python, DiaWorkspace, or retrieval-code changes were made in this documentation step.

### V5-20261007-058 — Flexible collection/map contract published and staged

- **Recorded:** 2026-10-07T07:03:05+02:00
- **Type:** Knowledge-interface contract update / host snapshot refresh
- **Status:** Published and staged; runtime behavior verification remains
- **Contract changes:** The index may route to multiple nested maps and explicitly separate collections by scope, owner, purpose, and lifecycle. The initial record category is one primary type and extensible through a reviewed contract change; categories do not imply folders. MOCs are navigation projections, not duplicate truth. No automatic merging/loading/promotion of user notes or AgenticLab backlog is implied.
- **Verification:** Published system revision `61286fa56326d4891f12a062ebff77740647c351`; 12 Node gate tests pass. Refreshed only `AgenticLab/AGENTS.md`, `AgenticLab/brain/knowledge-contract.md`, and `SOURCE-REVISION.txt` in the Python host; verified byte-identical runtime copies. No project knowledge records, application source/tests, or database were changed by this refresh.
- **Next:** Validate the updated collection wording in a fresh Python Pi session with read-only tools; no implementation beyond the contract is authorized.

### V5-20261007-059 — Updated collection/no-match contract verified in fresh Pi

- **Recorded:** 2026-10-07T07:05:07+02:00
- **Type:** Host-runtime contract verification
- **Status:** Passed for the current flat project-record corpus
- **Trace:** In a fresh Python Pi session, Pi read `AgenticLab/AGENTS.md`, `INDEX.md`, and the updated `knowledge-contract.md`; used native `find` and `grep` on `AgenticLab/knowledge/records/`; and read the sole record's metadata/content. It returned no match for export retention, distinguishing the unrelated active date decision.
- **Safety:** No Bash/MCP, app, test, edit, `data/`, or `.env` access occurred. The scan was under the 1,000-result limit and the current records directory is flat with one record.
- **Conclusion:** The new instructions correctly ask for record-corpus verification before no-match on this small host. Multi-collection routing, nested/large-corpus behavior, and semantic recall remain untested. No custom catalog/engine has been implemented.

### V5-20261007-060 — Bounded MOC/record implementation proposal prepared

- **Recorded:** 2026-10-07T07:07:54+02:00
- **Type:** Proposed implementation scope / design handoff
- **Status:** Proposal drafted; awaiting explicit implementation approval
- **Files proposed:** canonical V5 `system/brain/knowledge-contract.md` (MOC template/coverage semantics) and `system/AGENTS.md` (retrieval workflow); refresh those two reviewed files plus `SOURCE-REVISION.txt` in the Python host. No app source, tests, Python knowledge records/index, Pi settings, or adapter code in scope.
- **Acceptance proposed:** fresh-session read-only Pi checks for mapped retrieval, map-omitted in-scope retrieval, inactive/wrong-scope filtering, and complete no-match vs. incomplete/unavailable scan. No Bash/MCP/data/app/tests; use tool traces as evidence.
- **Rationale:** codify the approved hierarchical direction without per-record manual index prompts, custom catalog, auto-capture, semantic/vector engine, or Jev. Native search remains the initial baseline until measured costs/misses justify more.
- **Next:** Await explicit approval for this exact bounded file set and validation plan; do not edit Python or V5 system files beyond it before approval.

### V5-20261007-061 — Map-omission retrieval passed; candidate snippets surfaced before filtering

- **Recorded:** 2026-10-07T08:12:34+02:00
- **Type:** Synthetic host retrieval test / design finding
- **Status:** Map-omission discovery passed; candidate-content exposure remains unresolved
- **Test:** Fresh Python Pi session, using only the temporary synthetic knowledge fixture for retrieval and built-in read-only tools. Started at the fixture index/map, enumerated the records directory, and searched for export-retention matches. No app/tests/commands or protected data were accessed. Pi also read the workspace `AgenticLab/AGENTS.md` as operating instructions; knowledge retrieval itself stayed in the fixture.
- **Result:** Found `risk-export-retention` at `.tmp-v5-moc-fixture/AgenticLab/knowledge/records/risk-export-retention.md`, omitted from the MOC; its scope was `project:synthetic-expense`, status `active`. Excluded the inactive decoy and the active `project:other-expense-app` decoy. The unrelated date record was listed but not read. Pi read metadata for the three matching files and full content only for the selected active/in-scope file.
- **Finding:** Native `grep` output itself included matching body lines from the inactive and wrong-scope decoys before Pi read their metadata and filtered them. The fixture contained synthetic content only; no real knowledge/data was exposed. Therefore, “full body read only after filtering” is insufficient if search snippets already enter model context. C02 now records non-exposure of rejected candidate text as an acceptance requirement and marks native grep as unresolved for mixed-scope/status corpora.
- **Cleanup:** Removed the temporary fixture after the test. The Python host snapshot remains at V5 revision `aef687a072cacc5e7b772065ac21950e6352afb9`; no application/runtime search code changed. V5 documentation changes remain uncommitted.
- **Next:** Determine whether native Pi search supports path-only/metadata-only results or can operate on a pre-filtered path set; otherwise compare the smallest read-only candidate-search capability. Do not implement a catalog/search engine until a separate bounded scope is approved.

### V5-20261007-062 — Pi grep has no paths-only output; prefiltered-file search is viable to test

- **Recorded:** 2026-10-07T08:16:09+02:00
- **Type:** Native tool capability inspection / design proposal
- **Status:** Candidate safe retrieval sequence identified; synthetic validation pending
- **Inspection:** Read the installed Pi 1.0.4 CLI reference and examined its bundled `grep` tool schema/implementation. `grep` accepts one file or directory path, a pattern, optional glob/case/literal/context/limit settings, and returns matching lines with paths/line numbers. It exposes no filename-only output mode; `context=0` still returns the matched line.
- **Candidate sequence:** `find` the complete records inventory → read metadata headers → filter by collection/scope/status → invoke native `grep` separately on eligible files → read full content only for plausible matches. This prevents grep snippets from ineligible records entering model context; completeness requires searching every eligible record, and the call/context overhead may grow with the number of files.
- **Boundary:** No application/runtime changes or new search/catalog tool. C02 records this as a proposed native approach, not a selected production mechanism. No Python project data or protected paths were accessed.
- **Next:** Validate the two-phase sequence on a fresh temporary fixture and compare trace/call cost to the previous run. Consider custom read-only search only if this safe native approach is incomplete or too costly at representative scale; seek separate approval before implementation.

### V5-20261007-063 — Two-phase native-search validation blocked by unavailable tools

- **Recorded:** 2026-10-07T08:20:56+02:00
- **Type:** Synthetic test attempt / environment limitation
- **Status:** Inconclusive; no record search performed
- **Trace:** In a fresh Pi session, Pi read the workspace `AGENTS.md`, fixture `INDEX.md` (after an initial lowercase `index.md` path typo returned ENOENT), and the export MOC. It then reported that only `read` and a Bash tool were available; standalone `ls`, `find`, and `grep` were absent. Pi did not use Bash, list/read records, or perform content search.
- **Outcome:** The prefiltered-file search method was not tested. No real knowledge/data was accessed. Removed the temporary synthetic fixture after the attempt. C02 now requires verifying the read-only tool allowlist before recreating the fixture and explicitly forbids substituting Bash.
- **Next:** Retry only when a fresh Pi process actually exposes `read`, `ls`, `find`, and `grep`; otherwise leave the safe native-flow test blocked. No runtime/search implementation is authorized.

### V5-20261007-064 — Prefiltered native grep avoids excluded-candidate snippets

- **Recorded:** 2026-10-07T08:28:04+02:00
- **Type:** Synthetic host retrieval test / method validation
- **Status:** Passed on a four-record fixture; larger-corpus cost remains untested
- **Test:** Fresh Python Pi process launched with only `read`, `ls`, `find`, and `grep` (no MCP). Started from the synthetic fixture INDEX/MOC, enumerated records, read lines 1–12 from all four records, filtered metadata, then searched each eligible record individually. No Bash, app/tests, real knowledge, `data/`, or `.env` access.
- **Result:** Two eligible files were searched: active in-scope `decision-expense-date-format.md` (no match) and active in-scope `risk-export-retention.md` (match). The latter was read in full and selected. The inactive in-scope and active other-scope records were excluded before body search; their paths were not passed to grep and no snippets from them reached model context. The selected record says to check whether a 30-day retention policy applies; it does not establish that one does.
- **Cost/evidence:** Four metadata-header reads and two per-file grep calls, in addition to index/map/inventory and the selected full read. No token/context measurement or larger-scale claim. Pi also read `AgenticLab/AGENTS.md` as workspace instructions. The temporary fixture was removed after the test.
- **Conclusion/next:** The native two-phase procedure meets the non-exposure requirement on this small synthetic corpus. C02 now records the method and its evidence limits. Next, assess call/context cost and scan completeness on a larger, nested synthetic corpus; do not build a custom catalog/search engine without a separate bounded scope.

### V5-20261007-065 — Progressive disclosure retained as a distinct read-side candidate

- **Recorded:** 2026-10-07T08:35:28+02:00
- **Type:** Architecture clarification / design direction
- **Status:** Added to C02 as a candidate; no runtime or contract change
- **Decision:** Keep progressive disclosure separate from search/candidate discovery. After scope/status filtering and locating a relevant section, a reader may begin with a bounded section/range and expand as needed; this can reduce model-context tokens for long documents. It does not replace complete corpus search or support no-match claims after early stopping.
- **Constraint:** Prefer document headings and targeted line ranges over a universal 100–150-line rule; ordinary atomic records should remain concise. Validate only when a long synthetic or explicitly approved document makes token/context savings measurable. No new backlog item, search implementation, or fixed chunk policy is warranted now.
- **Next:** Continue the two-phase native-search baseline and its planned larger-corpus completeness/call-cost assessment. Defer progressive-read experimentation until a representative long document is in scope.

### V5-20261007-066 — Nested ten-record scan confirms filtered native-search flow

- **Recorded:** 2026-10-07T08:41:37+02:00
- **Type:** Synthetic host retrieval test / bounded call-count assessment
- **Status:** Passed for nested inventory and candidate filtering; not a scale benchmark
- **Test:** Fresh Python Pi session with `read`, `ls`, `find`, and `grep`, no MCP/Bash. Used only the synthetic `.tmp-v5-moc-scale-fixture/AgenticLab/knowledge/` corpus. `find` enumerated all 10 records across nested category folders; Pi read the first 12 metadata lines from each before filtering.
- **Result:** Eight active `project:synthetic-expense` records were searched individually; the inactive same-scope decoy and active `project:other-expense-app` decoy were not grepped. The omitted active retention risk was found. Broad `export|retention` matching returned four unrelated export snippets from eligible active records, but Pi did not read those files in full; only the plausible retention record was fully read. No cap/truncation was reported.
- **Cost/limits:** 10 metadata reads + 8 per-file grep calls, plus index/map/inventory and the selected full read. This illustrates the native flow's linear call profile, not latency/token cost or practical limits at larger corpora. The fixture was removed after the test; no real knowledge/data was accessed.
- **Next:** Retain the two-phase native method for the current tiny corpus; defer further scale tests and custom search until real corpus growth or measured cost justifies them. Progressive disclosure remains a separate, untested option for long documents.

### V5-20261007-067 — Natural-query test exposed instruction-following gaps

- **Recorded:** 2026-10-07T08:59:07+02:00
- **Type:** Instruction-driven retrieval test / limitation
- **Status:** Partial safety success; body-search/completeness path not validated
- **Test:** Fresh Python Pi process loaded the updated `AgenticLab/AGENTS.md`. The synthetic target's filename, title, and metadata did not contain the query terms. Pi enumerated the four record paths and read lines 1–12 of each before body reads; it did not call `grep`.
- **Trace/result:** The metadata reads were split into 32 small `read` calls (one-line/short-range reads), then Pi read the full selected body and also the unrelated active date record body. It did not read bodies for the inactive or wrong-scope decoys. It returned the correct synthetic caveat: the record says to check whether a 30-day retention policy applies, not that the policy is established.
- **Finding:** Metadata-before-body ordering prevented excluded-body exposure, but the sequence was inefficient and did not perform complete body search. The explicit two-phase tests therefore do not establish that current instructions reliably cause the default agent to search every eligible file. In the approved scope, clarified both system instructions: one header read per file (V0 lines 1–10) and mandatory per-eligible-file search when the MOC calls for corpus search or the query may be body-only. A fresh re-test is pending.
- **Snapshot/boundary:** Refreshed only Python `AgenticLab/AGENTS.md` and `AgenticLab/brain/knowledge-contract.md`; byte comparison passed. `SOURCE-REVISION.txt` remains the prior committed base `aef687a...` because the new canonical docs are uncommitted and commit/push were not authorized. No app/code/data paths were touched. The temporary fixture remains for the approved re-test.
- **Next:** Restart Pi to load the refined instructions and rerun the same natural query. Confirm one bounded metadata read per file, grep on every eligible path (including a body-only match), no excluded-body reads, and no irrelevant full-body read. Clean the fixture afterward.

### V5-20261007-068 — Refined instructions bounded header reads but did not trigger grep

- **Recorded:** 2026-10-07T09:03:13+02:00
- **Type:** Instruction-driven retrieval re-test / limitation
- **Status:** Metadata-read boundary passed; complete body search not demonstrated
- **Test:** Fresh Python Pi process loaded the further-refined `AgenticLab/AGENTS.md` and knowledge contract. The body-only synthetic target had a generic filename/title/metadata; the query asked for a CSV-export retention rule.
- **Trace/result:** Pi enumerated four records and made exactly one bounded `read` of lines 1–10 per record, filtered status/scope, and read only `risk-policy-check.md` in full. It did not read the excluded inactive/wrong-scope bodies and did not read the unrelated active date body. It did not invoke `grep` or otherwise search every eligible record, despite the map's corpus-search route. The answer accurately said the record asks to check whether a 30-day policy applies, rather than asserting one exists.
- **Finding:** The instruction refinement fixed header-read granularity and preserved excluded-body non-exposure, but did not make the model perform complete per-file content search. This is a default orchestration/adherence gap; the explicitly prompted two-phase native procedure still works, but these instructions alone do not prove complete search. C02 now distinguishes those evidence levels and requires tool-trace proof before any no-match/completeness claim.
- **Cleanup/boundary:** Removed the synthetic fixture after the test. No protected paths, application code, or runtime search code were touched. The Python instruction snapshot matches V5 working-tree files; `SOURCE-REVISION.txt` remains the base commit marker `aef687a...` because commit/push were not authorized.
- **Next:** Keep native two-phase search as the explicit completeness procedure for the tiny current corpus. Do not continue prompt wording iterations or add a custom catalog absent real corpus growth/missed retrieval evidence; revisit deterministic orchestration only through a separate bounded scope if this gap becomes material.

### V5-20261007-069 — C01 default-first/workflow boundary refined

- **Recorded:** 2026-10-07T09:08:51+02:00
- **Type:** Product operating-model design / documentation
- **Status:** Candidate contract clarified; no router or workflow implementation selected
- **Direction:** After the user accepted the minimal knowledge foundation and asked to continue, refined C01 to distinguish direct default work, a reusable capability/skill, a recommendation for a named workflow, and explicit user invocation of that workflow. A recommendation does not invoke a workflow; both modes share scope, authorization, safety, knowledge, and verification rules. The default agent remains accountable; specialist isolation/delegation remains a separate C07 decision.
- **Boundary:** C01 stays `framed` and not implementation-ready. No automatic routing, workflow port, agent roster, runtime change, or app modification. No commit/push.
- **Next:** Select one representative user journey and evaluate whether a workflow recommendation materially helps without unnecessary interruptions before promoting any concrete behavior to `selected`.

### V5-20261007-070 — User identified implementation and research PBI journeys

- **Recorded:** 2026-10-07T09:26:11+02:00
- **Type:** User-provided product scenario / C01 design refinement
- **Status:** Scenarios added to C01; no workflow/router implementation selected
- **Journeys:** (1) Implementation-ready PBI: user deliberately invokes `/plan` with description/acceptance criteria; an approved plan may then be passed to `/implement`. Do not add a redundant workflow recommendation prompt after explicit invocation. (2) Research PBI: acceptance criteria define investigation/findings, not code; remain in default/free work, gather scoped knowledge/evidence, and do not infer `/plan` or implementation from PBI shape alone. A possible implementation follow-up is offered separately for user choice. Added a default-session implementation-PBI variant with no workflow command to isolate when recommendation/clarification might earn its interruption.
- **Sources reviewed read-only:** V4 `prompts/delivery/plan.md`, `implement.md`, `MANUAL.md` §4.1, and `brain/protocol.md` Domain Lens Adoption; selective Kafka-related notes in the populated V3 Neo backup. V4 `/plan` is a multi-stage, gated plan flow; `/implement` runs an approved plan through phase checkpoints. Domain Lens is a contextual reasoning stance, not full persona/output-format/phase-gate invocation. The inspected backup contains a post-merge audit note related to PBI 156142 explicitly describing direct inspection with no project code change; the original research PBI/acceptance text was not located in the files inspected. No knowledge was copied/imported.
- **Outcome:** Updated C01 to distinguish explicit workflow invocation, research-oriented default work, and the narrower ambiguous-mode recommendation case. PBI plus acceptance criteria alone are not workflow-selection evidence. No implementation or tests; no commit/push.
- **Next:** Review these three cases as qualitative operating-model tests, focusing on unnecessary prompts and the need for any clarifying question. Keep domain-lens selection/loading in C03/C08; do not port V4 injection mechanics by implication.

### V5-20261007-071 — DiaWorkspace documentation lineage reviewed selectively

- **Recorded:** 2026-10-07T09:40:38+02:00
- **Type:** Read-only source review / C01 context clarification
- **Status:** Completed; no DiaWorkspace files changed or imported
- **Finding:** The active DiaWorkspace has a phased research artifact `docs/features/155600-kafka-integration/research-v2.md` labelled PBI 156138, while the same feature folder's implementation report describes the Kafka replacement implementation (PBI 155600 lineage). `DOCS-Pedro/Kafka/156142-architect-design.md` preserves PBI 156142's original description/acceptance criteria and a `/plan` design paused at Phase 4; related notes include PBI drafts, backend Q&A, and handoffs. `docs/features/157432` separates execution plan, implementation status/handoff, final documentation, and local-dev runbook. `docs/workflow.md` and `AGENTS.md` describe the intended plan → validate → implement → document lifecycle. V4 Domain Lens (MANUAL §4.1 / protocol §3) is reasoning priorities and blind-spot context in default work, not full persona/workflow invocation.
- **Caveat:** Folder names are not reliable PBI provenance: use each document's own PBI/status fields. The inspected research-v2 artifact has a research goal and phased study but not the original research ticket/acceptance text verbatim. The populated V3 Neo backup's PBI 156142 note is a separate post-merge code audit explicitly produced without code changes. This refines, rather than erases, entry 070's earlier note that the original research PBI text had not yet been found.
- **Outcome:** Updated C01's representative-journey note with the observed lineage and an evaluation set for (1) explicit `/plan`, (2) research PBI in default mode, and (3) an implementation PBI presented in default mode with no workflow command. No V4 prompts/knowledge were copied into V5. No implementation, tests, commit, or push.
- **Next:** Use those three cases for a qualitative C01 design walkthrough; keep this a V5.2 design/prototyping activity and keep DiaWorkspace/DOCS-Pedro as read-only comparison sources.

### V5-20261007-072 — C01 workflow-recommendation tabletop completed

- **Recorded:** 2026-10-07T09:43:30+02:00
- **Type:** Design-only qualitative assessment
- **Status:** Provisional transition rule recorded; not validated in a live V5 runtime
- **Tabletop outcome:** (1) Explicit `/plan` invocation starts the workflow without a redundant recommendation prompt; its own required inputs/approval gates still apply. (2) Research intent with acceptance criteria stays in default/free work, gathers scoped evidence, and does not silently turn into implementation. (3) For an implementation PBI in default chat, recommend `/plan` at most once when its multi-phase/cross-domain/gated nature materially benefits from structure; for bounded single-domain work, stay direct; clarify intent once if research-vs-implementation is genuinely ambiguous.
- **Evaluation lens:** compare the extra interruption against avoided mismatch/rework, user corrections, and whether the delivered result matches the stated PBI outcome. This is reasoned design guidance from the user's V4 journeys, not observed V5 runtime performance or a numeric threshold.
- **Boundary/next:** C01 remains `framed`; no router, classifier, V4 prompt port, or code change. Next validate the provisional rule against one redacted/synthetic journey before selecting runtime behavior.

### V5-20261007-073 — Priority checkpoint: pause C01 test for V4 delivery-prompt review

- **Recorded:** 2026-10-07T10:05:58+02:00
- **Type:** Phase-order / priority checkpoint
- **Status:** Active design focus changed; no prompt or runtime implementation authorized
- **Paused work:** After the C02 knowledge-interface urgency was addressed, C01 had reached a provisional three-case workflow-recommendation tabletop (explicit `/plan`, research PBI in default mode, implementation PBI in default mode without a workflow command). No live V5 runtime test had been run.
- **Priority shift and reason:** The user identified that some V4 delivery prompts are valuable in daily work and wants their capabilities understood before V5 workflow boundaries/handoffs are finalized. The review will prioritize `/plan`, `/implement`, and `/premortem`; `/implementation-report`, `/debug`, `/test`, and `/review-pr` remain lower-priority candidates. This is a capability/value review, not a verbatim port.
- **System-prompt deferral:** `agents-startup`, `review-memory`, `system-health`, and `warmup` are explicitly preserved as a deferred review set in `backlog/README.md`, mapped to likely V5 candidates. They are not rejected or lost.
- **Resume trigger:** Once the delivery-prompt review has recorded a V5 disposition for the prioritized prompts, resume the C01 three-case qualitative check before selecting runtime behavior or implementation. Reopen the system-prompt set sooner only if a delivery-prompt dependency requires it.
- **Outcome/boundary:** Updated `FIRST-SLICE-PLAN.md`, `V5.2-roadmap.md`, C01, and `backlog/README.md` to expose the current priority and return trigger. No DiaWorkspace/V4 files changed, no prompts copied, no runtime/code changes, no commit or push.

### V5-20261007-074 — Persona-phase knowledge provenance added to delivery-prompt audit

- **Recorded:** 2026-10-07T10:14:41+02:00
- **Type:** User-provided design constraint / audit refinement
- **Status:** Added to C02 and prompt-review queue; mechanism unresolved
- **User input:** The user estimates that persona invocations were responsible for roughly 40% of V4 knowledge provenance because each invoked persona recorded relevant knowledge. Treat this as a significant user estimate, not a measured percentage.
- **Audit implication:** V5 prompt simplification must assess knowledge-capture coverage and provenance separately from persona ownership, prompt count, and durable writes. Identify what unique findings each planning/implementation/premortem stage captured; consider a task-local, source-linked candidate-learning handoff with consolidation, while preserving user approval for durable writes. Do not assume per-phase forced writes or persona-owned memory are necessary, and do not remove capture opportunities without a substitute.
- **Outcome/boundary:** Added a design note to C02 and capture/provenance as an evaluation dimension in the delivery-prompt review queue. No V4 prompt or knowledge was copied, and no runtime/prompt implementation was changed.
- **Next:** Include provenance capture and missed-learning risk in the `/plan`, `/implement`, and `/premortem` capability audit before proposing V5 drafts.

### V5-20261007-075 — Separate `/warmup` seed from ongoing delivery capture

- **Recorded:** 2026-10-07T10:25:51+02:00
- **Type:** V4 knowledge-lifecycle clarification / prompt-audit refinement
- **Status:** Capture stages distinguished; `/warmup` remains deferred for full review
- **User clarification:** V4 `/warmup` is run after system initialization to seed initial knowledge in one cold-start pass. Later, delivery workflows invoke domain personas that record relevant findings from their work. The user's rough estimate that delivery prompts supplied about 40% of knowledge provenance refers to the latter ongoing capture, not the one-time warmup.
- **Audit implication:** Assess initial bootstrap and ongoing delivery-phase capture as separate mechanisms. The delivery-prompt review must trace what each persona phase discovers, where it records evidence, and whether removing the phase write loses a reusable finding. Do not attribute warmup's baseline coverage to delivery prompts or treat either process's raw write count as value.
- **Outcome/boundary:** Clarified the C02 provenance note and prompt-review queue. `/warmup` remains on the deferred system-prompt list for later, after delivery-prompt dispositions. No V4 files changed/imported and no runtime prompt changes made.
- **Next:** Continue the provenance-aware audit of `/plan`, `/implement`, and `/premortem`; preserve source, scope, uncertainty, and candidate status without assuming persona-owned V5 memory.

### V5-20261007-076 — Synthetic delivery-prompt pilot prepared; plan approved

- **Recorded:** 2026-10-07T11:02:17+02:00
- **Type:** Synthetic prompt-prototype test / progress checkpoint
- **Status:** Research and plan cases exercised; approved fixture implementation test pending
- **Fixture:** Created `.tmp-v5-delivery-prompt-pilot/` in the Python host with a synthetic CSV exporter/importer, explicit contract, research/implementation PBI scenarios, and non-installed V5 prompt drafts. This does not modify the real application or install runtime prompts. Two baseline fixture unit tests pass using temporary files and standard-library Python only.
- **Research case:** A fresh read-only Pi session stayed in default/research mode, traced exporter/importer behavior, cited the contract/source/tests, distinguished verified fixture facts from external-consumer uncertainty, and returned a task-local candidate without persisting knowledge.
- **Plan case:** First plan output deferred relevant source inspection; after correction, Pi inspected fixture sources and separated verified facts from a PBI-derived proposal. User approved the plan. No fixture files were changed and no commands/tests ran in Pi.
- **Safety/approval boundary:** No real app, `data/`, `.env`, database, V4 prompt, or persistent knowledge record was accessed or changed. The remaining implementation test is explicitly limited to synthetic fixture paths; Pi should not run commands, and focused fixture tests can be run separately.
- **Next:** Test the approved `/implement` draft against the fixture, verify scoped edits and task-local learning provenance, run only the synthetic fixture's focused tests, then run the read-only premortem draft. Remove the temporary fixture and log the final outcome. No commit/push.

### V5-20261007-077 — Synthetic `/implement` run completed without extra gates

- **Recorded:** 2026-10-07T11:07:05+02:00
- **Type:** Synthetic delivery-prompt prototype / approval-count observation
- **Status:** Implementation prompt behavior and focused fixture tests passed; premortem test pending
- **Trace summary:** After the approved plan, the user explicitly invoked the implementation draft. Pi made the scoped fixture edits in one go and did not ask for a redundant kickoff confirmation, per-phase `continue`, or write approval. No durable knowledge write was requested or performed; edits were confined to `.tmp-v5-delivery-prompt-pilot/`.
- **Changes/verification:** The fixture exporter gained a keyword-only `include_header=False`; tests cover opt-in header order, default headerless round-trip, and comma/quote handling. The importer and model were unchanged. I ran only the synthetic fixture unit suite outside Pi: 3/3 passed; no app/database tests or data access.
- **Capture finding:** The implementation report returned two overlapping compatibility candidates that repeat the approved plan's candidate. This shows discovery/provenance was retained, but cross-phase deduplication was not demonstrated. C02 now calls for a consolidation step that carries plan candidates forward and merges new findings before final review.
- **Next:** Run the read-only premortem draft against the changed fixture, then evaluate the capture handoff across plan → implement → premortem. Remove the temporary fixture afterward. No V4/V5 runtime prompt files, real app files, or permanent knowledge were changed; no commit/push.

### V5-20261007-078 — Synthetic premortem stays read-only; provenance filter needs refinement

- **Recorded:** 2026-10-07T11:09:19+02:00
- **Type:** Synthetic prompt-prototype test / premortem result
- **Status:** Read-only behavior passed; cross-stage capture design finding recorded
- **Trace/result:** On a fresh read-only Pi session, the V5 premortem draft inspected only the synthetic fixture's prompt, source, contract, and tests. It made no edits, ran no commands, and persisted no knowledge. It distinguished the opt-in-header/legacy-importer incompatibility as an expected limitation and surfaced a conditional partial-destination risk if writing fails after the destination is opened. The latter is not a PBI requirement and remains an unverified, out-of-scope risk unless a caller contract requires atomic export.
- **Capture/provenance finding:** The premortem again proposed the already documented header-compatibility point as a reusable candidate. Together with overlapping plan/implementation candidates, this shows that source citations alone do not prevent redundant candidates; V5 needs an end-of-task comparison against both prior task-local candidates and authoritative source/contract knowledge. Preserve newly discovered risks with their evidence, but don't promote a restatement of an existing fixture contract.
- **Verification/cleanup:** The synthetic fixture suite passes 3/3 via isolated `python3 -m unittest discover -s tests -v`; no application/database tests ran. Removed `.tmp-v5-delivery-prompt-pilot/`. No real app, `data/`, `.env`, V4 files, or persistent knowledge were changed.
- **Next:** Conclude the first synthetic prompt pilot as partial success: correct mode selection, plan approval, scoped implementation, no redundant implement gates, and read-only premortem; capture deduplication needs refinement. No prompt files are installed; assess the single consolidation rule in the design report before any second prototype. No commit/push.

### V5-20261007-079 — Core delivery-prompt prototype closed with explicit limits

- **Recorded:** 2026-10-07T11:11:32+02:00
- **Type:** Design/prototype checkpoint
- **Status:** `/plan`, `/implement`, `/premortem` draft loop exercised once on a synthetic feature; not a runtime installation
- **Result:** Research-only default mode, explicit plan, approved implementation, and read-only premortem all behaved within the synthetic fixture boundary. One plan approval was requested; explicit `/implement` added no kickoff/per-phase prompts; no write approval was triggered because no durable knowledge was written. Three focused synthetic tests passed.
- **Limits:** One small, effectively single-phase task; no live V5 workflow commands, multi-phase checkpoint test, default-entry implementation recommendation case, or persistent-write approval test. The prompt flow preserved candidate learning but duplicated the plan's compatibility insight in implementation/premortem output; end-of-task consolidation against prior candidates and canonical sources is required before considering a durable capture design.
- **Next priority:** Review lower-priority delivery candidates (`/implementation-report`, `/debug`, `/test`, `/review-pr`) with the same value/gates/provenance lens, then revisit C01's default-entry recommendation case. System-prompt candidates remain deferred until the delivery review is dispositioned. No V4 prompt edits/imports, real app/data access, commits, or pushes.

### V5-20261007-080 — Lower-priority delivery prompts parked; resume default-first V5 work

- **Recorded:** 2026-10-07T11:17:09+02:00
- **Type:** User priority decision / roadmap sequencing
- **Status:** Secondary prompt review parked with triggers; current work returns to V5 design
- **User direction:** Skip `/implementation-report`, `/debug`, `/test`, and `/review-pr` for now, while keeping them visible for revisit when a real use case arises. Continue V5 work rather than expanding the V4 prompt audit.
- **Outcome:** Updated `backlog/README.md` with specific revisit triggers for the secondary delivery prompts and system prompt set. Updated C01 and the first-slice/roadmap handoff to reflect that the core three-prompt synthetic prototype is complete, its multi-phase/provenance-dedup limitations, and the next C01 default-entry implementation-PBI recommendation case.
- **Next:** Test that remaining C01 case with a bounded synthetic scenario; then decide whether a small V5 operating-model/runtime slice is warranted. No additional V4 prompts reviewed, no runtime or app code changed, no commit/push.

### V5-20261007-081 — Workflow recommendation noted as a distinct Jev candidate

- **Recorded:** 2026-10-07T11:23:35+02:00
- **Type:** Bounded-decision candidate / C09 follow-up
- **Status:** Documented as deferred; no Jev/API/runtime selected
- **Question:** Whether a default-session implementation PBI should be handled directly, receive one workflow recommendation (e.g. `/plan`), or prompt a clarification is a plausible atomic decision-support point. It is distinct from Jev-style knowledge-candidate review and should not be combined into one decision model.
- **Boundary:** Complete the C01 default-entry synthetic comparison under the simplest transparent rule first. Consider Jev only if actual use reveals repeated ambiguity or costly misroutes. Any later support must be advisory/shadow first, permit abstention, never invoke a workflow or authorize actions, and measure false interruptions, missed recommendations, user corrections, cost/latency.
- **Outcome:** Added the bounded possibility and revisit trigger to C09. No classifier, service, prompt change, or runtime routing was implemented.

### V5-20261007-082 — Jev explicitly deferred; continue with transparent C01 rule

- **Recorded:** 2026-10-07T11:27:20+02:00
- **Type:** User decision / priority clarification
- **Status:** Jev parked; C01 default-entry question remains active design work
- **User direction:** No Jev for now. Continue V5 without a Jev layer in workflow selection or memory review.
- **Outcome:** Marked C09 `parked` in the portfolio and clarified its revisit trigger. The C01 recommendation case should first be handled with a simple transparent rule and evaluated for interruption value; no classifier or advisory call is part of the current work.
- **Next:** Use a bounded synthetic multi-phase implementation scenario to examine whether a single `/plan` recommendation is worthwhile in default chat. Keep user invocation/approval authoritative; any system prompt/runtime update needs its own bounded scope.

### V5-20261007-083 — Default/workflow recommendation tabletop followed the rule

- **Recorded:** 2026-10-07T11:35:30+02:00
- **Type:** Operating-model scenario test / instruction check
- **Status:** Scenario classification matched the provisional C01 rule; no runtime workflow invoked
- **Test:** Fresh Python Pi session evaluated five synthetic situations: explicit `/plan`; research PBI with acceptance criteria; bounded single-file change; cross-domain async integration PBI in default chat; ambiguous research-vs-implementation intent. The V5 operating instructions were updated beforehand to permit a concise recommendation only when mode was not chosen and a workflow materially helped.
- **Result:** No extra recommendation for explicit `/plan`, research, or the bounded task; one `/plan` recommendation for the cross-domain case; one outcome clarification for ambiguous intent. No tools, files, workflows, or Jev were used in the tabletop.
- **Limit:** This shows the current instructions can classify a prompt that explicitly asks for a tabletop. It does not demonstrate recommendation behavior on a natural task, value to the user, or actual workflow availability. No interruption or accuracy claims beyond the described response count.
- **Next:** The remaining useful V5 prototype is a bounded `/plan` workflow capability that the default agent can recommend/invoke explicitly; define its exact system files, activation, plan approval, and no-implementation boundary before runtime changes. Jev remains parked.

### V5-20261007-084 — Canonical V5 `/plan` prompt manually exercised

- **Recorded:** 2026-10-07T11:45:35+02:00
- **Type:** Opt-in workflow prompt prototype / synthetic test
- **Status:** Plan prompt behavior passed the bounded fixture check; no implementation approved
- **Scope:** Added `system/prompts/delivery/plan.md` as an opt-in, non-runtime-registered prototype; updated system README/AGENTS to describe the prompt and invocation boundary; copied the prompt and matching operating instructions into the Python host. Created `.tmp-v5-plan-prompt-pilot/` with a synthetic PBI, contract, source, tests, and a copy of the prompt. No `.pi/settings.json` registration, app code, data, `.env`, or V4 files touched.
- **Trace/result:** Fresh Python Pi session manually invoked the plan draft, read the PBI and relevant fixture source/docs/tests, distinguished verified fixture facts from PBI-derived design requirements, proposed a bounded file/test plan, and ended with one consolidated approval question. It returned `no new candidate` because the compatibility rule was already explicit in the fixture contract. No edits, execution, or durable writes occurred.
- **Limit:** This verifies prompt text via manual loading, not a registered `/plan` command or end-to-end workflow. No actual implementation or tests were performed; the synthetic PBI plan remains unapproved. `SOURCE-REVISION.txt` remains the committed base marker `aef687a...` because current system/snapshot changes are uncommitted and no commit/push was authorized.
- **Next:** Review the proposed plan with the user. If approved, run the synthetic `/implement` stage only within the fixture, then assess handoff/candidate reconciliation. Keep Jev parked and do not install slash-command registration without separate scope.

### V5-20261007-085 — Manual `/plan` → `/implement` prototype validated in fixture

- **Recorded:** 2026-10-07T11:52:21+02:00
- **Type:** Synthetic prompt-prototype test / plan-to-implementation sequence
- **Status:** Passed for scoped fixture edits and tests; not a registered workflow command
- **Trace/result:** User approved the plan in Pi, then invoked the V5 implementation draft separately. Pi edited only `.tmp-v5-plan-prompt-pilot/src/exporter.py` and `tests/test_exporter.py`, added the optional header while preserving the default, and left importer/models unchanged. It requested no extra kickoff, per-phase confirmation, or knowledge-write approval. Candidate handoff was `none` because the plan had already established no new learning beyond the fixture contract.
- **Verification:** I inspected the changed fixture files and ran only its isolated standard-library unit suite: 4/4 passed. No application, database, `data/`, `.env`, or real knowledge was accessed. Removed the temporary fixture after validation.
- **Finding/limit:** The prompt flow works for this one small, essentially single-phase change and keeps plan approval separate from implementation invocation. Multi-phase stop behavior and persistent-write approval were not tested. This prompt file was manually loaded; Pi slash-command registration is not implemented. No Jev, app changes, commit, or push.
- **Next:** Use the result as the current bounded prompt foundation; do not add lower-priority prompts or a Jev layer. Resume the C01 default-entry recommendation question only if it will decide whether a V5 runtime/workflow change is worthwhile; otherwise move to the next selected V5 capability.

### V5-20261007-086 — Default-entry implementation PBI probe proposed bounded discovery

- **Recorded:** 2026-10-07T12:01:40+02:00
- **Type:** C01 default-mode routing test / limitation
- **Status:** First-response probe complete; workflow recommendation after discovery remains untested
- **Scenario/result:** In a fresh Python Pi session, a synthetic cross-domain implementation PBI was presented in default mode with a request for what to do first and no permission to inspect, edit, or execute. Pi proposed a read-only surface map and validation review; it did not recommend `/plan`, ask a question, inspect code, or edit anything.
- **Interpretation/limit:** This supports a bounded, reversible discovery step as a low-interruption first response, but does not show whether a later workflow suggestion after source discovery would prevent rework. No workflow was invoked, no Jev was used, and no real project/protected data changed.
- **Outcome/next:** C01 records bounded discovery followed by reassessment as a candidate sequence, not a proven routing rule. Post-discovery workflow recommendation remains open; do not add runtime routing without real evidence and a separate bounded scope.

### V5-20261007-087 — Native `/plan` template loaded, but fixture-only scope was breached

- **Recorded:** 2026-10-07T12:39:38+02:00
- **Type:** Prompt-prototype test / scope-compliance limitation
- **Status:** Prompt output not approved; do not treat the fixture-only test as a clean pass
- **Trace:** Pi 1.0.4 loaded `/plan` via the one-process `--prompt-template` option. It read the synthetic PBI, prompt, and source files, but also listed the real `AgenticLab/knowledge` directory after the user restricted the task to the fixture. It did not read any record contents, access `data/`/`.env`, edit files, or execute commands. It skipped the fixture `docs/csv-contract.md` and proposed the compatibility fact from source, duplicating the documented contract.
- **Finding:** Native prompt-template registration is confirmed for one process, and the scope section correctly distinguishes planning from future implementation. However, source selection and knowledge-candidate dedup were not reliable under the explicit fixture boundary; the generated plan is not approval-ready. No implementation should proceed from it.
- **Cleanup/boundary:** Removed `.tmp-v5-plan-prompt-pilot/` after the test. No real record contents or protected data were accessed; no project/V4 files were changed.
- **Next:** Stop iterating on prompt wording. Treat the file as an unregistered prompt prototype; consider stronger isolation for future synthetic tests rather than broadening access or weakening the fixture-only boundary. No Jev, code, commit, or push.

### V5-20261007-088 — Prompt registry checkpoint confirmed; move design focus to C03

- **Recorded:** 2026-10-07T13:15:52+02:00
- **Type:** User priority clarification / design-phase handoff
- **Status:** Core prompt assets available per Pi process; no persistent registration or further prompt tuning selected
- **User clarification:** The plan, implement, and premortem prompts are all available in Pi's prompt registry when launched with the one-shot CLI `--prompt-template` flags. This satisfies the current prompt-availability checkpoint. The user does not want more repeated prompt testing/fine-tuning now; secondary delivery prompts remain parked, and Jev is explicitly deferred.
- **Outcome:** Updated README, C01, FIRST-SLICE-PLAN, and V5.2-roadmap to distinguish session-scoped prompt availability from persistent `.pi/settings.json` registration and to mark delivery-prompt review paused. C03's next-design statement now scopes context engineering as staged selection for default and explicit workflows, retaining scope/provenance and avoiding unconditional context, fixed budgets, or a custom retrieval service.
- **Next:** Continue with a C03 design pass. Treat the fixture-only `/plan` boundary miss as a limitation; do not restart prompt wording loops or add a loader/config change without new need and a separate bounded scope. No V4 changes/imports, app/data changes, commit, or push.

### V5-20261007-089 — C03 context assembly framed as next design pass

- **Recorded:** 2026-10-07T13:28:00+02:00
- **Type:** Context-engineering design / handoff
- **Status:** Minimal context-assembly model drafted in C03; not selected for runtime implementation
- **Design scope:** Define how default work and explicitly invoked workflows stage user task/scope, shared operating rules, current source, relevant scoped knowledge, optional domain perspective/procedure, approved plan/checkpoint state, and task-local learning provenance. Keep retrieval, workflow state, and domain lens as separate context sources.
- **Non-goals:** No unconditional digest/memory floor, general context planner, fixed token budget, automatic domain classifier, semantic/vector search, or custom retrieval service. Progressive disclosure remains an optional payload technique for genuinely long sources, not a completeness substitute.
- **Boundary/next:** C03 remains a design candidate. Review the context-source order and outcome/cost evaluation before selecting a synthetic or real task test. The prompt set stays at its per-process Pi prototype; no further prompt refinement or Jev work is active. No code, app, data, prompt registration, commit, or push.

### V5-20261007-090 — C03 workload coverage and V5-root context caveat recorded

- **Recorded:** 2026-10-07T14:53:47+02:00
- **Type:** Context-engineering design clarification
- **Status:** Workload families broadened; no implementation selected
- **User concern:** The initial three C01 examples are not the full C03 context workload. More task families include direct work, research, diagnosis, explicit planning, approved implementation/resume, test/review/premortem, and workspace bootstrap.
- **Outcome:** Added a non-exhaustive workload/context table to C03, keeping each family a test dimension rather than a mandatory workflow. Distinguished `/warmup` bootstrap from ordinary context. Also noted the canonical V5 source root has no root `AGENTS.md`; `system/AGENTS.md` assumes a deployed `AgenticLab/` directory and should not be loaded unchanged as developer-root instructions. A suitable V5-root Pi context entrypoint/launch method needs design before root-based behavioral tests.
- **Next:** Continue C03 design review using these task families and clarify V5 source-root context delivery before any Pi test from that root. No prompt files or code were changed in this C03 pass.

### V5-20261007-091 — Clarify global Pi installation versus project context discovery

- **Recorded:** 2026-10-07T15:04:06+02:00
- **Type:** Context clarification / correction
- **Status:** C03 caveat corrected; no startup mechanism selected
- **User clarification:** Pi is installed globally and can be run from any workspace; it is not installed separately in V4/V5 project folders.
- **Correction:** A root `AGENTS.md` is not required to launch Pi. The working directory selects session grouping and project resources/context. V4 lacks root `AGENTS.md` because its adapter supplies context through `session-guard` and prompt registration through `prompt-loader`. V5 `system/AGENTS.md` is target-payload guidance, not automatically discovered from the canonical V5 root and not suitable to inject unchanged there. A source-repo root instruction or explicit per-process context is an optional onboarding choice, not a Pi installation prerequisite.
- **Outcome/next:** Clarified C03 to separate Pi availability from context loading. Continue C03 without treating root `AGENTS.md` as a blocker; define context delivery only if a concrete workflow needs it. No V4/Pi config or V5 runtime changes.

### V5-20261007-092 — Separate source scaffolding, installed host, and global Pi

- **Recorded:** 2026-10-07T15:14:48+02:00
- **Type:** Setup-boundary clarification / correction
- **Status:** V5 host setup is a manual experiment; generalized bootstrap remains open
- **User clarification:** V4 is the system's source/scaffolding workspace, opened in Zed; Pi is the globally installed binary launched from that workspace's terminal. A delivery workspace is separately initialized with AgenticLab.
- **Correction:** V4 adapter source files do not activate merely because Pi is launched at the V4 root. The V4 `/agents-startup` flow installs a wrapper under the delivery workspace's `.pi/extensions/`, where session-guard and prompt-loader can run. The Python expense-tracker host has a workspace-root `AGENTS.md`, copied `AgenticLab/` payload, project-local Pi extension setting, scope/source-revision files, and minimal project knowledge; this is an experimental manual installation, not a setup wizard.
- **V5 boundary:** The intended distributable is the runtime payload under V5 `system/`, copied/exported as workspace-local `AgenticLab/`; do not copy the whole V5 development repository/backlog into a delivery workspace. Setup, update/refresh, host selection, and initialization tooling remain open in C11. Updated C11 to identify Python as an experimental host, not a production/reference host.
- **Next:** Decide whether V5 should retain this manual payload-copy initialization as the first host path and what minimum initialization steps must be documented before designing automation. No data/.env accessed; no Pi or host configuration changed.

### V5-20261007-093 — C03 context sufficiency and retrieval boundary

- **Recorded:** 2026-10-07T15:31:09+02:00
- **Type:** Context-engineering design clarification
- **Outcome:** Added a concise sufficiency/stop rule to C03 and referenced C02's existing complete-scan/outcome contract rather than duplicating its procedure. The existing workload families remain coverage examples, not mandatory workflows or fixed file bundles.
- **Boundary:** Documentation-only; no runtime, Pi configuration, delivery-prompt, Jev, or host/data changes. No commit or push.

### V5-20261007-094 — C04 governance boundaries clarified

- **Recorded:** 2026-10-07T18:22:11+02:00
- **Type:** Governance design review / documentation clarification
- **Decision:** An explicit request authorizes bounded, reversible work within stated scope without redundant confirmation; reconfirm on material scope/risk changes. Separate confirmation applies to destructive, security-sensitive, irreversible, external-impact, explicitly hard-gated actions, and durable knowledge writes. C04 remains framed; no implementation slice was selected.
- **Finding:** The operating contract already denies authority to records/project content and model confidence, but did not explicitly cover external content and tool output. Added that boundary to the operating contract. C04 retains fail-stop/reduce-scope behavior when hard enforcement is unavailable; no V4 thresholds or secret-detection mechanism was imported.
- **Boundary:** Documentation-only. No runtime, Pi configuration, host/data access, commit, or push.

### V5-20261007-095 — Make design-session documentation practice visible at roadmap entry

- **Recorded:** 2026-10-07T18:26:01+02:00
- **Type:** V5 development-process clarification
- **Outcome:** Added a compact V5 design-session documentation convention near the top of `V5.2-roadmap.md`: update the relevant design doc and append a concise DEV-LOG entry for durable outcomes; update roadmap/plan only for material status or next-step changes; keep logs append-only and avoid routine/duplicate narration.
- **Boundary:** Documentation-only. No runtime or Pi configuration changes, commit, or push.

### V5-20261007-096 — C05 continuity review finds no checkpoint gap for design work

- **Recorded:** 2026-10-07T18:29:53+02:00
- **Type:** Continuity/observability design review
- **Finding:** The roadmap, first-slice handoff, candidate records, and append-only DEV-LOG suffice to resume V5 design work. This does not demonstrate recovery of interrupted target-project work; no checkpoint/restart test has been performed. Keep checkpoints task-triggered, distinct from approvals and durable knowledge; defer general telemetry.
- **Outcome:** C05 remains a candidate; no implementation slice or next portfolio priority was selected. Updated C05 and the current roadmap/plan handoff to reflect the C03→C04→C05 review progress and leave the next priority open.
- **Boundary:** Documentation-only. No runtime, Pi configuration, Python host/data access, commit, or push.

### V5-20261007-097 — C11 selected for bounded bootstrap design review

- **Recorded:** 2026-10-07T18:44:39+02:00
- **Type:** Bootstrap/distribution design review and candidate sequencing
- **User direction:** Keep the relative candidate-relevance/review guide for phase transitions and proceed with C11; this selects a design review, not setup tooling or implementation.
- **C11 clarification:** Confirmed the prototype boundary as canonical V5 `system/` payload exported/copied into a delivery workspace as `AgenticLab/`, with workspace-local entrypoint, Pi registration, scope, source revision, and initial knowledge. The Python host demonstrates a manual prototype, not an automated initializer. C11 now focuses on the smallest documented manual bootstrap path and leaves payload versioning, collisions/pre-existing state, refresh preservation, and trust/unavailable-hook behavior open.
- **Outcome:** Added the non-authorizing review guide to `backlog/README.md`; updated C11, `FIRST-SLICE-PLAN.md`, and `V5.2-roadmap.md` to record the current design-review focus while leaving implementation priority open.
- **Boundary:** Documentation-only. No runtime, Pi configuration, Python host/data access, commit, or push.

### V5-20261007-098 — C11 minimum manual bootstrap flow outlined

- **Recorded:** 2026-10-07T18:45:29+02:00
- **Type:** Bootstrap design review
- **Finding:** The V5 drop-in use case is supported by a manual prototype: export/copy the runtime payload from `system/` as target-local `AgenticLab/`, then initialize target-owned scope, revision, knowledge, and host wiring. This is distinct from copying the V5 development repository or installing Pi globally.
- **Outcome:** C11 now records a minimal manual bootstrap design—preflight, reviewed payload staging, local-state initialization, project-local Pi wiring, fresh-session verification, and separately reviewed refresh. Collision/version/update handling and clean/existing workspace validation remain open. No installer/reset tool was selected.
- **Boundary:** Documentation-only. No runtime, Pi or host configuration, protected project data, commit, or push.

### V5-20261007-099 — Experimental host snapshot needs file-level provenance

- **Recorded:** 2026-10-07T18:49:14+02:00
- **Type:** C11 distribution/refresh boundary evidence
- **Finding:** A read-only comparison found the Python host marker at `aef687a` while V5 `HEAD` is `4855118`; runtime files in the host are a mix of matching and differing copies. The differing files include `AgenticLab/AGENTS.md`, both brain contracts, `README.md`, and `prompts/delivery/plan.md`. The cause/ownership was not inspected or resolved. The V5 worktree also has uncommitted design changes.
- **Decision/next:** A commit marker alone does not establish an exact payload snapshot. Classify divergence and define a reproducible clean payload identity plus file manifest before refresh; never blanket-overwrite the host copy. Any later comparison/test must continue to exclude project knowledge and protected application data.
- **Boundary:** Read-only inventory/content comparison of runtime files only; no project knowledge or `data/`/`.env` inspected, no host changes, no commit or push.

### V5-20261007-100 — Classify observed host/runtime file differences

- **Recorded:** 2026-10-07T18:50:18+02:00
- **Type:** C11 snapshot-provenance design clarification
- **Finding:** Read-only diffs show the host `AGENTS.md` has a merged line; its knowledge contract has older/duplicated completeness wording; its README lacks the prompt-files entry; and `plan.md` differs only by the final newline. The operating-contract delta is the external-content/tool-output rule currently uncommitted in V5. These are consistent with mixed/stale snapshot versions, not evidence that the paths are project-owned; provenance remains unconfirmed.
- **Outcome:** C11 now records the specific comparison and requires a clean, reproducible source snapshot plus file-level preview/ownership handling before refresh. Do not overwrite the existing host copy based on its marker alone.
- **Boundary:** Read-only comparison of listed runtime docs/prompts; no project knowledge, `data/`, `.env`, or host files changed. No commit or push.

### V5-20261007-101 — Confirm host marker does not identify complete installed payload

- **Recorded:** 2026-10-07T18:51:17+02:00
- **Type:** C11 version-provenance clarification
- **Finding:** Compared host runtime files directly against the recorded `aef687a` source payload. The adapter files and README match that revision, while `AGENTS.md` and both brain contracts differ; delivery prompts exist in the host although absent at that revision. Against current source, other runtime paths differ as summarized in C11. This demonstrates that `SOURCE-REVISION.txt` alone does not identify a single coherent payload snapshot.
- **Outcome:** C11 now treats the Python copy as an unreconciled experiment, not a safe refresh target. Resolve file provenance/ownership and define a clean revision plus manifest before refresh; preserve all host state until then.
- **Boundary:** Read-only comparison of system runtime files only; no knowledge contents, `data/`, `.env`, or host files changed. No commit or push.

### V5-20261007-102 — Refresh experimental host to approved committed payload

- **Recorded:** 2026-10-07T18:54:51+02:00
- **Type:** User-approved experimental-host snapshot cleanup
- **Source:** Clean committed V5 revision `4855118a5473e20612a48b2b047ab69a72387ff2`; uncommitted V5 design changes were excluded.
- **Change:** Refreshed only files under host `AgenticLab/` that are present in the committed `system/` payload, excluding development tests; set `AgenticLab/SOURCE-REVISION.txt` to the full revision. Verified every copied runtime file byte-identical to that revision. Preserved root `AGENTS.md`, `.pi/settings.json`, `AgenticLab/PROJECT-SCOPE.md`, and the entire project `knowledge/` tree. Did not delete host-only files.
- **Rollback:** A temporary copy of the replaced runtime files and old marker is at `/tmp/agenticlab-v5-host-backup-yjA9lo`.
- **Boundary:** No Python application files changed; no `data/`, `.env`, or knowledge contents read. No tests run, no commit or push.

### V5-20261007-103 — C11 workspace ownership and refresh policy proposed

- **Recorded:** 2026-10-07T20:12:13+02:00
- **Type:** Bootstrap/update design review
- **Outcome:** Added a proposed ownership matrix to C11 separating V5-managed runtime files, workspace integration, project-owned scope/knowledge, revision metadata, and unknown/obsolete paths. Refresh now has conservative cases: exact same revision is a no-op; clean managed files allow a previewed update; missing/ambiguous provenance or local divergence stops for reconciliation; no obsolete/unknown paths are deleted automatically.
- **Open:** Validate the current file inclusion set, pre-existing workspace conflict behavior, and whether a generated checksum manifest adds value over a clean commit plus deterministic file set. No automated bootstrap or reset tooling selected.
- **Boundary:** Documentation-only; no host files changed in this design pass, no protected data read, no commit or push.

### V5-20261007-104 — C11 tabletop checks manual bootstrap boundaries

- **Recorded:** 2026-10-07T21:05:58+02:00
- **Type:** Bootstrap design review
- **Scenarios:** Empty workspace; existing project root instructions and Pi settings; recognized clean prior AgenticLab snapshot; missing marker/divergent runtime file; unavailable project trust/approval extension.
- **Finding:** A conservative manual flow can handle these design cases by previewing proposed additions, preserving host/project state, stopping on unknown divergence, and refusing durable writes if the gate is unavailable. This is a tabletop design check only; it does not validate actual file operations or Pi loading.
- **Recommendation:** A documented manual setup path is sufficient for initial V5 delivery use; no installer/reset tool now. Repeatable setup/update claims require a separately approved synthetic empty/populated workspace test. C11 design pass is complete pending the user's next priority choice.
- **Boundary:** Documentation-only; no fixture created, no Python-host files changed, no `data/`/`.env`/knowledge contents accessed, no commit or push.

### V5-20261007-105 — Add operator-facing manual first-install guidance

- **Recorded:** 2026-10-07T21:11:05+02:00
- **Type:** C11 documentation deliverable
- **Change:** Expanded `system/README.md` with an experimental first-install checklist: choose a clean committed source snapshot; preflight a new target workspace; copy only the runtime payload; initialize target-local scope and empty knowledge; preserve/merge root instructions and project Pi settings; verify trust/extension capability honestly; separate refresh from install and stop on divergence.
- **C11:** Linked the operator-facing steps from the candidate. Installer/reset tooling and repeatable file-operation support remain unselected; synthetic fixture validation is still required before making broader setup/update claims.
- **Boundary:** Documentation-only in the V5 source tree. The Python host remains at committed payload `4855118`; it was not refreshed with these uncommitted README changes. No runtime behavior, protected data, commit, or push.

### V5-20261007-106 — Gate C11 fixture validation on a clean approved source

- **Recorded:** 2026-10-07T21:18:45+02:00
- **Type:** C11 validation sequencing / decision trace
- **Decision:** Do not use the current dirty V5 working tree as a distributable/test baseline. First require an approved clean V5 commit containing the runbook; then conduct a separately scoped synthetic empty- and populated-workspace fixture test.
- **Rationale/revisit rule:** The test should identify setup-operation and preservation failures before claiming the runbook is repeatable. A pass supports the manual first-use path without an installer. A failure triggers a targeted documentation/design correction; it does not automatically authorize an installer or reset tool. C08 is revisited only if the fixture exposes a concrete host capability gap.
- **Outcome:** Recorded this sequence in C11, the candidate review guide, and the roadmap/first-slice handoff. Extended the session documentation convention to capture rationale, assumptions/revisit triggers, and next safe action.
- **Boundary:** Documentation-only. No fixture or host changes, no protected data access, no commit or push.

### V5-20261008-107 — TencentDB Agent Memory concept comparison

- **Recorded:** 2026-10-08T06:36:29+02:00
- **Type:** External prior-art review
- **Source/boundary:** User-provided TencentCloud/TencentDB-Agent-Memory README excerpt; no independent implementation or benchmark audit.
- **Finding:** The only modestly useful concept is a reusable Skill as a versioned, scope-triggered package with companion resources, execution steps, and validation—not just prompt text. This reinforces existing C06 distinctions and does not justify a new schema/catalog. Asset owner/version/status and staged retrieval overlap C02/C03; multi-agent loadouts/ACLs and the service/proxy/vector/graph stack do not meet current V5 scope/evidence needs.
- **Outcome:** Added a bounded prior-art note to C06. No changes to the knowledge interface or V5 architecture; no code/infrastructure adoption.
- **Boundary:** Documentation-only. No external project code installed, no protected data accessed, no commit or push.

### V5-20261008-108 — Reconcile handoff revision references before commit review

- **Recorded:** 2026-10-08T08:42:50+02:00
- **Type:** Documentation review correction
- **Finding:** `FIRST-SLICE-PLAN.md` still described the older `61286fa` payload as current, despite the approved `4855118` refresh. This could make the proposed documentation commit ambiguous about which payload was tested and which one is installed.
- **Outcome:** Reworded the handoff to label `61286fa` as the earlier Pi read-path test baseline and `4855118` as the current byte-verified host snapshot, explicitly noting that the latter has not had a post-refresh behavioral test. Updated the roadmap's host revision reference consistently.
- **Boundary:** Documentation-only. No host/data changes, tests, commit, or push.

### V5-20261008-109 — Validate C11 manual setup with synthetic fixtures

- **Recorded:** 2026-10-08T08:50:39+02:00
- **Type:** C11 bounded synthetic file-operation validation
- **Source:** `git archive` of committed payload `ccc56e48ae34f84d7c559b559b02a027ceaefd18`; fixtures were created from scratch under `/tmp` and removed after the pass.
- **Cases/results:** (1) Empty workspace: copied the documented non-test payload, initialized synthetic scope/index, root pointer, local Pi extension setting, and source marker; payload byte checks and JSON parsing passed. (2) Existing root instructions/settings without `AgenticLab/`: additive pointer/extension preserved synthetic sentinels and existing settings. (3) Divergent `AgenticLab/`: preflight stopped and the before/after tree fingerprint was identical; synthetic knowledge sentinel remained intact.
- **Limit:** No Pi process was launched; trust/approval UI, extension loading, and refresh of a clean prior instance remain untested. This is not evidence for an installer or general update support.
- **Outcome:** The manual first-install file path passed these bounded preservation/stop checks. Keep the manual path; no installer/reset tool selected. Updated C11, candidate guide, and handoffs with the result.
- **Boundary:** No Python host or app files changed; no `data/`, `.env`, or real knowledge contents accessed; no commit or push.

### V5-20261008-110 — Prepare disposable workspace for fresh Pi smoke check

- **Recorded:** 2026-10-08T09:08:28+02:00
- **Type:** C11 Pi-load verification setup
- **Fixture:** `/tmp/agenticlab-v5-pi-smoke-IQR1sJ/workspace`, staged from committed payload `417a030ea0f6cbabf195c9007828280a12253b39`. Contains only the V5 non-test payload and synthetic project scope/index, root `AGENTS.md` pointer, and project-local `.pi/settings.json` extension path.
- **Preflight:** Payload bytes, source marker, JSON, and extension-path target were checked. No tests or application files were staged.
- **Pending:** Pi has not been launched and the project extension has not been trusted. User confirmation in the Pi UI is required before executing the local extension; no global trust/settings were changed.
- **Boundary:** No Python host/data or external workspace accessed. The temporary fixture is retained for the user's smoke check; remove it after verification.

### V5-20261008-111 — Synthetic Pi startup discovers root context and extension

- **Recorded:** 2026-10-08T09:16:04+02:00
- **Type:** C11 runtime smoke observation
- **Observed:** User launched Pi 1.1.0 from the trusted synthetic workspace. Startup listed `~/.pi/agent/AGENTS.md` and the workspace-root `AGENTS.md` under Context, and `knowledge-write-gate.ts` under Extensions.
- **Interpretation:** Confirms project-root context discovery and extension registration/loading in this trusted Pi 1.1.0 workspace. It does not confirm that the model follows the root pointer to `AgenticLab/AGENTS.md`, nor gate/write behavior or approval UI.
- **Next:** Perform a read-only turn asking Pi to follow the pointer and read only the synthetic AgenticLab instructions, project scope, and index. No writes or outside-workspace reads.
- **Boundary:** No files changed by Pi; no write-gate action performed; no host, `data/`, `.env`, or real knowledge accessed.

### V5-20261008-112 — Verify root pointer and synthetic scope in Pi

- **Recorded:** 2026-10-08T09:17:12+02:00
- **Type:** C11 read-only Pi context smoke
- **Observed:** In the trusted synthetic workspace, Pi followed the root `AGENTS.md` pointer and read exactly `AgenticLab/AGENTS.md`, `AgenticLab/PROJECT-SCOPE.md`, and `AgenticLab/knowledge/INDEX.md`. It reported the synthetic-only scope and no seeded project records; no Bash, extra reads, or edits occurred.
- **Conclusion:** Root pointer-following and synthetic scope/index orientation passed on Pi 1.1.0. Extension registration is visible at startup, but gate behavior, approval UI, and refresh remain untested.
- **Boundary:** No host/application files, protected data, or real project knowledge accessed; no writes, commit, or push.

### V5-20261008-113 — Stage Evershop as next V5.2 experiment host

- **Recorded:** 2026-10-08T09:52:12+02:00
- **Type:** C11 host selection and manual workspace setup
- **User direction:** Use `/home/peet/Projects/Practice/evershop-dev/` for the next V5.2 experimentation phase; retain its existing V5.1 AgenticLab only as a named backup.
- **Git audit:** Evershop `main` at `9e9387b` had no tracked changes. Existing `AgenticLab/` was untracked and not covered by `.gitignore`; tracked Evershop `.gitignore` and remote configuration were left unchanged. Added local `.git/info/exclude` entries for new `AgenticLab/`, root `AGENTS.md`, and `.pi/` to prevent accidental Evershop publication.
- **Change:** Moved the prior untracked AgenticLab folder intact to `/home/peet/Projects/Practice/AgenticLab-v5.1-Backup/`. Installed a fresh non-test V5 system payload in Evershop `AgenticLab/` from committed source `7e4be9c91b5df5b1cad1dca4729d268db5e61e1e`; initialized an Evershop-scoped boundary and empty knowledge index, recorded source revision, and added workspace-root instruction pointer plus project-local Pi extension setting. No V5.1 records/prototypes were imported.
- **Next:** User must start Pi from the Evershop root and decide whether to trust this project-local extension. Begin with read-only scope/context verification; no app/tests, `.env`, or `data/`. Revisit C08 only if a concrete host-capability gap appears.
- **Boundary:** No Evershop tracked source or `.gitignore` changes, no GitHub commit/push to Evershop, no `.env`/`data`/knowledge record contents accessed, and no Pi process/trust initiated.

### V5-20261008-114 — Clarify evaluation evidence versus a runtime metrics database

- **Recorded:** 2026-10-08T10:02:27+02:00
- **Type:** C05 evaluation/observability design clarification
- **User concern:** Prior V5 evaluation work collected layered metrics that supported decisions and could calibrate future mechanisms; avoid losing this capability while simplifying runtime observability.
- **Finding:** V5.1 has a file-based evaluation lifecycle (plans/preregistration, baselines/candidates, fixtures, metrics, analyzed results, decisions/revisit triggers) plus workspace-local privacy-minimized run summaries. V5.2 currently summarizes selected results in its roadmap but has no canonical evaluation directory, run registry, collector, or metrics database. `DEV-LOG.md` records design history; it is not a benchmark store.
- **Recommendation:** Preserve evaluation/calibration as a development-plane capability distinct from runtime telemetry, task checkpoints, and project knowledge. Start with versioned file-based plans/results and scoped per-run summaries only for approved, decision-driven experiments; no always-on collection or database until file-based cross-run analysis proves insufficient. Keep raw/project-specific traces local and privacy-minimized.
- **Outcome:** Added this distinction and a proposed next Evershop evaluation-record flow to C05. No database, collector, or migration of V5.1 evaluation data selected.
- **Boundary:** Documentation-only. No evaluation/run data read in this pass beyond the already-reviewed V5.1 evaluation README and plan; no protected project data, commit, or push.

### V5-20261008-115 — Defer Jev calibration data until an explicit pilot trigger

- **Recorded:** 2026-10-08T10:09:12+02:00
- **Type:** Evaluation/calibration boundary
- **User clarification:** Prior evaluation metrics are valuable for decisions and future calibration (Jev is an example), but broad collection is not the current task.
- **Decision:** Do not collect general or continuous metrics now. Preserve the evaluation-record capability separately from runtime telemetry. For Jev, collect only after real use meets C09's recurring bounded-decision trigger and the user explicitly selects a pilot; preregister its question, baseline, outcome labels, stopping/sample criteria, costs/attention, and privacy/retention before the first run.
- **Outcome:** Made the calibration trigger explicit in C05 and C09. No database, collector, or runtime behavior selected.
- **Boundary:** Documentation-only; no evaluation data or project data accessed, no commit or push.

### V5-20261008-116 — Complete Evershop first-session context smoke

- **Recorded:** 2026-10-08T10:17:43+02:00
- **Type:** C11 target-workspace Pi startup/context validation
- **Observed:** In Evershop Pi 1.1.0, startup listed the workspace-root `AGENTS.md` and the project-local `knowledge-write-gate.ts` extension. The read-only task then followed the root pointer and read only `AgenticLab/AGENTS.md`, `AgenticLab/PROJECT-SCOPE.md`, and `AgenticLab/knowledge/INDEX.md`; the agent summarized Evershop scope and the empty index. No Bash, writes, app/tests, or backup/data access were reported.
- **Conclusion:** The Evershop V5.2 instance passes the startup/context orientation check. Extension discovery is confirmed, but write-gate/approval behavior is not. This does not itself trigger broad C08 work.
- **Boundary:** Read-only synthetic/project-scope files only; no `data/`, `.env`, project knowledge records, Evershop source, or backup contents accessed; no writes or commit/push.
