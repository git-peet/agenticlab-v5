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
