# V5 First Vertical Slice — Proposed Bounded Plan

**Status:** Exercises 5 and 6 code changes are implemented; all six controller tests and both root smoke tests pass. The Pi write gate is published and staged; a fresh-session, user-prompted lookup through the index using Pi-native file reads returned the decision and current-source verification, with no edits. This does not establish a custom V5 retrieval engine or confirm that the linked record file itself was opened. A later natural-task attempt did not retrieve knowledge and queried the real SQLite database read-only, outside the agreed boundary; no write is reported and DB size/mtime/ctime remained unchanged. Treat that retrieval test as failed/invalid and do not repeat it. The first vertical slice is paused while the read interface and safe evaluation boundary are designed.

**Prepared:** 2026-10-06

**Current handoff / checkpoint:** The V5 first vertical slice's host-continuity phase and first fresh-session, Pi-native file-read check are complete; no custom V5 retrieval mechanism has been implemented or evaluated. The next phase is a bounded knowledge-interface design before more capture/gate work; C02 contains a qualitative value/recoverability matrix, a backup-derived V4 capability map, proposed retrieval jobs, read-mechanism options, and a candidate hybrid flow; all are drafts for review, none selected. First map the useful V4 capabilities/interactions and their costs; preserve demonstrated outcomes while redesigning mechanisms rather than blindly porting or pruning them. Assess whether current models can cheaply re-derive a fact before storing it. Keep data sources distinct: Python `/home/peet/Projects/Practice/Python/Py-Desktop-Expense_Tracker/` is the V5 experimental host; the active DiaWorkspace `AgenticLab/` is a dirty Git repo with largely empty hot MOCs and must not be overwritten; its populated V3 Neo baseline is the separate read-only backup at `/home/peet/Projects/Full Laptop Backup/Agents/AgenticLab V3 Neo Backup/AgenticLab/`. The backup is for selective comparison only—no copying/import. Two successful prompts were required for one Python decision (record write and index update); the user clarified that interruption count, not wording, is the main friction concern. The explicit fresh-session lookup confirms index discovery/source verification but not direct record-file access or autonomous retrieval. A later natural-task attempt did not consult the index/record and queried the real DB read-only, so it failed the retrieval activation check and violated the no-read boundary. The read-side design must make activation, candidate selection, fetch/delivery, and verification observable rather than relying on the answer's self-report. Python changes remain uncommitted/unpushed; the real expense database was read in read-only mode by the later natural-task Pi session but not modified. Do not repeat this access. The Python root `AGENTS.md` now states the V5 no-data-access boundary, but it is an instruction, not a sandbox; the next read-only activation test should also disable Bash/MCP tools.

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
- The host snapshot is staged at the Python project root: `AgenticLab/` contains the reviewed V5 system payload plus a project-local scope note and knowledge index. The index now links to the approved date-format record; root `AGENTS.md` is a thin pointer; `.pi/settings.json` loads the project-local write gate. `AgenticLab/SOURCE-REVISION.txt` records the V5 payload commit. No application source/config or real DB contents were included.
- **Git connection:** V5 system payload, shell gate, and preview-schema fix are committed and pushed to `origin/main`; current payload revision is `e710071e299e2544e76c11e406c98f936020b20f`. GitHub no-reply identity is configured in this repository only; global Git identity is unchanged. Python application changes remain separate and unpublished.
- **Agreed initial harness:** Pi, using only workspace-local configuration/integration for this experiment; no global Pi configuration. Verify the exact load/invocation method and adapter capability before implementing it. This is not an adapter implementation approval.

## 3. Proposed real task sequence

The Python workspace is a V5 experiment host, not a learning project. The user approved the sequence: isolate the test database (Exercise 5), then correct the date-format mismatch (Exercise 6) to test V5 context, decision provenance, and continuity. Both bounded code changes are implemented; a fresh-session index-based retrieval and source verification returned the approved format without editing files. The pasted response does not confirm whether Pi opened the linked record itself.

### Exercise 5 — isolate the test database (completed)

**Baseline risk, resolved below:** before Exercise 5, the tests constructed `ExpenseTrackerController`, which constructed `ExpenseModel` against fixed `data/expenses.db`; `test_add_expense_valid` could insert and commit there after the date parser was fixed. The bundled controller tests were not run against the real database. Current tests inject a temporary database per test.

**Implemented Exercise 5 boundary (focused validation passed):**

- `src/data.py`: `ExpenseModel` accepts an optional database path, defaulting to the existing `DB_FILE`, and connects only to the selected path.
- `src/controller.py`: `ExpenseTrackerController` accepts an optional model, preserving its existing no-argument/default production behavior.
- `src/tests/test_expense_tracker.py`: create a fresh `tempfile.TemporaryDirectory()` per test; instantiate `ExpenseModel` with a database file inside it; inject that model into the controller; close the connection and clean up in teardown. Add a focused persistence assertion using synthetic values and the temporary database.
- Do not change `src/gui.py`, `src/preferences.py`, `src/main.py`, `data/expenses.db`, `requirements.txt`, or unrelated tests in this task. `Preferences` has its own direct database connection, but these controller tests do not instantiate it; GUI testing is outside this isolation scope.
- Added project `.gitignore` entries for `.venv/`, `__pycache__/`, and Python bytecode so the test environment/cache are not committed.

**Validation status:** The active system Python 3.14 lacked `pip` and the pinned 2024 packages were not compatible with it. With the user's approval, installed Python 3.12.15 via mise without changing mise configuration, created the project-local `.venv`, decoded the UTF-16 `requirements.txt` to a temporary UTF-8 file (original left unchanged), and installed its pinned packages in the venv using PyPI because the configured package index lacked `ttkthemes`. `pip check` passed. The focused isolation test passed: `python -m unittest tests.test_expense_tracker.TestExpenseTrackerController.test_test_database_is_isolated`. GUI/application modules imported successfully without calling `main()` or launching a window. All six controller unit tests now pass after the date fix. The two root CI smoke tests also pass. During this code/test validation, the real SQLite file was not opened or changed; its size and modification metadata were unchanged at that time. A later, separate Pi retrieval attempt queried it read-only and is recorded as a boundary incident in the current handoff.

### Exercise 6 — consistent date handling (implemented; first V5 continuity check complete)

Read-only inspection confirmed the current clone's mismatch:

- `src/gui.py` converts the date widget to `YYYY-MM-DD`.
- `src/controller.py` documents `YYYY-MM-DD`, but `validate_date` parses and returns `%m/%d/%Y`; its error text mentions yet another format.
- `src/data.py` stores the resulting string in a SQLite `TEXT` field.
- The bundled valid-add test uses `2024-06-21`, consistent with the GUI and learning-plan recommendation, but is not an assertion-rich integration test.

The user selected `YYYY-MM-DD` because it matches the GUI, existing test fixture, and learning-plan recommendation; using `DD-MM-YYYY` would require broader GUI/filter/storage/test documentation changes. Exercise 6 was implemented within the approved scope: controller validation now strictly accepts canonical ISO dates, normalizes the empty-date default to ISO, and reports the matching format. Tests verify persistence of a valid date, rejection of an impossible date (`2025-02-30`), and rejection of a noncanonical date (`2024-6-1`). All six controller tests pass against per-test temporary databases. The approved decision was saved and indexed through Pi's gate; in a fresh session Pi found it via the index and verified current GUI/controller/tests without editing. The response does not establish whether it opened the linked record file.

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

## 5. V5 skeleton and Pi workspace integration (implemented scope)

The user approved this bounded skeleton. The system payload is committed in V5 and a reviewed snapshot is staged in the Python host. Session-only project trust was used; a rejected synthetic write was blocked, the approved date decision was saved, the shell-read correction was verified, and the current Pi `edits[]` before/after preview was reviewed live. Persistent trust remains unselected.

### Canonical source in V5

Distributable AgenticLab assets are kept under the dedicated `system/` directory so developer-only files (`backlog/`, roadmap, `DEV-LOG.md`, evaluation notes) are not copied into a project installation. The initial payload was implemented in commit `6996224719be65c09624de15a6b95970156ac154`; the current payload, including shell-gate and Pi 1.0.4 edit-preview fixes, is at `e710071e299e2544e76c11e406c98f936020b20f`. The current system source is:

```text
AgenticLab-v5/
  system/
    README.md                  # what the workspace snapshot contains
    AGENTS.md                  # AgenticLab operating entry instructions
    brain/
      operating-contract.md    # scope, default/workflow boundary, approvals
      knowledge-contract.md    # one scoped decision/experience record shape
    adapters/pi/
      knowledge-write-gate.ts  # project-local, narrowly scoped write confirmation
      tests/                   # path, allow/block, and no-UI fail-closed cases
```

Do not create a generalized plugin framework, database, vector index, or broad prompt library in this slice. Keep the knowledge record human-readable (Markdown) and project data out of canonical system sources.

### Python workspace snapshot

A reviewed snapshot of that source revision has been staged in the Python project:

```text
Python project root/
  AGENTS.md                   # thin pointer to AgenticLab/AGENTS.md
  .pi/settings.json           # explicitly loads the project-local extension after trust
  AgenticLab/                 # reviewed copy of V5 system payload + revision marker
    AGENTS.md
    brain/
    adapters/pi/
    knowledge/                # project-specific records; not overwritten on refresh
```

The project `.pi/settings.json` lists the extension path relative to `.pi` (`../AgenticLab/adapters/pi/knowledge-write-gate.ts`); a local path check confirms it resolves to the staged extension. In the first Pi session, the user chose **Trust (this session only)**; later, a new Pi process loaded the refreshed extension after session-only trust. The folder is not persistently trusted, so Pi asks again in a new process. No symlink is used: the host copy is a versioned instance; canonical edits occur only in V5. The project knowledge index now links to the approved date-format record. No installer exists; the snapshot was staged explicitly and runtime sources were diff-checked.

Pi 1.0.4 behavior relevant to this proposal (read from the installed `configuration.md`, `security.md`, `extensions.md`, `settings.md`, and `cli.md`, plus the `permission-gate.ts`/`protected-paths.ts` examples): project context `AGENTS.md` loads without project trust and is not a security boundary; project `.pi` extensions/settings are trust-gated; `tool_call` handlers can block built-in tool calls; `ctx.hasUI` distinguishes interactive confirmation availability; extensions run with the Pi process's OS permissions. These are documented capabilities. The user granted session-only trust in the first V5 workspace session and confirmed the extension loaded; later live checks verified denied writes, an approved record write, shell-reference blocking, and the edit confirmation preview. The user must review/trust the project-local adapter. No global Pi settings are changed. If project trust is declined or the extension is unavailable, durable AgenticLab writes are unavailable; instructions alone must not claim enforcement.

### Memory-write approval boundary

The Pi adapter uses `tool_call` to request UI confirmation for built-in `write`/`edit` calls targeting project knowledge; it blocks if no UI is available, the user rejects, or confirmation fails. Bash commands that visibly reference the knowledge subtree are now blocked outright with a message to use Pi's file tools; they no longer produce a misleading write-approval prompt for a read. Twelve Node tests cover path scoping/traversal, unrelated calls, file-write preview/approval/rejection, shell-reference blocking, and fail-closed behavior.

In Pi TUI, the user rejected a synthetic file write; Pi returned `Project knowledge change was not approved`, and a file-read confirmed the marker file was absent. A later read-only `find` via `bash` exposed a false-positive prompt. The V5 source and Python snapshot were corrected: shell commands visibly referencing project knowledge are now blocked with a clear instruction to use Pi's file tools, without a misleading confirmation dialog; this behavior was verified live. A later `INDEX.md` edit confirmation lacked proposed text, so the user rejected it. Root cause: Pi 1.0.4 supplies edit replacements under `edits[]`; the earlier gate only inspected legacy top-level `newText`. V5 now renders before/after text from `edits[]` and blocks any knowledge write/edit for which it cannot build a reviewable preview. Twelve Node tests pass; after a Pi restart the user reviewed the live preview and approved the scoped index update. The saved decision is indexed and was retrieved via that index in a fresh session, with current-source verification and no edits; the pasted answer does not show whether the record file itself was opened. The shell check remains lexical and does **not** sandbox the OS or reliably intercept obfuscated/indirect shell writes. It is not comprehensive write protection.

**Deferred Jev connection:** The decision to propose/present a memory candidate or combine candidates for user review is a promising bounded Jev-style advisory point. Revisit it in [`backlog/candidates/C09-jev-decisions.md`](backlog/candidates/C09-jev-decisions.md) after real record proposals show whether the current review interaction is repetitive or intrusive. No Jev call or classifier is part of this slice; it cannot authorize or replace the human confirmation gate.

### First-slice behavior

- Default-agent work is the exercised path; explicit workflow invocation remains an architectural seam, not a V4 prompt port in this slice.
- The user selected `YYYY-MM-DD` for the date mismatch; the controller/test change is implemented and the decision record was approved, saved, and read back. The knowledge index was updated through the gate and read back; a fresh session found the decision and verified it against current code/tests without editing.
- A scoped candidate record was proposed, reviewed, saved through the gate, indexed, and retrieved in a fresh Pi session for the Python project; the answer checked current source. Explicit evidence that the linked record file itself was opened is not present in the pasted response.
- Exercise 6 updates controller date validation and focused tests; all six controller tests and both root CI smoke tests pass. Tests use temporary DBs; the real DB metadata is unchanged.
- Evaluate qualitative outcomes: was the record found when relevant, accurate/current, and helpful without re-explanation? On later natural use, count approval interruptions per task/decision and distinguish necessary persistence from redundant index/metadata writes or false positives. Note total review effort and user corrections; one run is not a statistical claim.

### Proposed implementation work units

1. **V5 system payload — implemented:** `system/` operating/knowledge contracts and Pi approval gate are in canonical V5; twelve policy/gate tests pass. The current Pi edit schema now receives an explicit before/after preview; missing previews fail closed.
2. **Workspace integration — staged; gate behavior verified live:** root `AGENTS.md`, `.pi/settings.json`, and the reviewed `AgenticLab/` snapshot are in the Python host. Pi loaded the extension after session-only trust; a rejected write was blocked and the marker remained absent, an approved date decision was saved, and the corrected shell-reference block was verified without a confirmation dialog. No global settings changed. Persistent trust remains untested.
3. **Exercise 6 code task and first continuity check — complete:** `YYYY-MM-DD` date validation and relevant controller tests are implemented; all six controller tests and both root smoke tests pass in `.venv`; the real DB metadata is unchanged. The fresh-session index retrieval and current-source check passed; qualitative usefulness review remains.
4. **Review:** fresh-session recall check; report limitations and decide whether this slice earns expansion.

## 6. Phases and gates

### Phase 0 — Confirm decisions (no code)

**Complete:** canonical V5 source repo; GitHub remote connection; Python as experimental host; reviewed snapshot distribution; Pi as initial harness; Exercise 5 before Exercise 6. The snapshot files and relative extension path have been staged and checked. The user granted project trust for one session, verified the extension was listed at startup, and tested a rejected write. Persistent trust remains a user choice.

### Phase 1 — Safe project test boundary

**Exercise 5 code change and focused behavioral validation complete.** All controller tests now construct a model pointed at a per-test temporary DB; the focused synthetic persistence test passed in `.venv` using Python 3.12.15. Exercise 6 is also complete; all six controller tests and both root CI smoke tests pass. No dependencies were installed globally, and no production database was accessed during code/test validation.

### Phase 2 — Minimal V5 skeleton in the canonical repo

**Implemented and published:** a small `system/` payload, Markdown knowledge contract, and Pi-local write confirmation extension. Twelve Node policy/handler tests pass. In Pi TUI, the user rejected a synthetic write and confirmed no file was created; an approved date record was saved. The shell-reference correction was verified live. A later preview defect was fixed for Pi's `edits[]` schema; the user restarted Pi and verified the live before/after confirmation preview. Persistent trust remains untested. The adapter's limits are explicit; this is not a full security sandbox. The copy is staged in the Python host.

### Phase 3 — Test V5 continuity in the host project

**Project code, knowledge indexing, and first fresh-session retrieval complete; qualitative review remains.** The date-format decision has been saved and indexed through the Pi gate. The user restarted Pi with revision `e710071`, reviewed the visible old/proposed-text preview, approved the index change, and confirmed the index by reading it back. A fresh session then found the indexed decision and checked it against GUI/controller/tests without edits. The pasted answer does not explicitly confirm opening the linked record itself. The date implementation is complete; no further Python edits are implied.

### Phase 4 — Review and decide (no automatic expansion)

The first trial showed index-based retrieval and source verification, and exposed an architectural dependency: the knowledge interface must be designed before expanding the capture/index workflow. **Next:** map the useful V4 retrieval capabilities/interactions and their costs, then review the proposed retrieval jobs and structure comparison in C02; resolve growth assumptions, category cardinality, and cross-record query needs. This is a design step only; no map, link system, custom writer, or gate change is selected. One experience is qualitative evidence, not a statistical memory-benefit claim.

## 7. Scope exclusions and stop conditions

- No changes outside the selected files in V5 and the approved Python task scope.
- No reading/querying/copying the real expense database; no app launch before the test/data safety boundary is reviewed.
- Do not modify/convert `requirements.txt` or install dependencies globally. The pinned UTF-16 requirements are installed in the project-local `.venv` after temporary decoding; ask before changing declared requirements or adding packages.
- No global Pi config changes, external API/model calls, vector DB, external service, raw session mining, V4 memory import, automatic memory promotion, or additional harness port.
- Stop on unexpected database side effects, unclear approval, test isolation failure, a material project-scope change, or a need for infrastructure outside the agreed first slice.

## 8. Remaining gates

1. The user granted session-only project trust and verified the deny path, approved write, and corrected shell-reference block. Decide whether to retain session-only trust (Pi asks again in a new process) or explicitly save persistent trust for this project. Do not trust the parent folder or alter global trust/settings.
2. Live `edits[]` before/after preview was verified; the user approved the scoped index update and confirmed it by readback. A fresh session retrieved the decision from the index and verified current source without edits. The response’s tool trace does not explicitly show whether Pi opened the linked record file.
3. All six controller tests and the two root smoke tests pass using `.venv`; real database metadata is unchanged. Do not repeat tests with the system Python or touch `data/expenses.db`.
4. The Python source changes, `.gitignore`, and host snapshot/config are uncommitted in the Python project. Any commit/push to that repository is a separate decision; nothing from it is pushed to the V5 remote.

**Current state:** Exercises 5 and 6 are implemented; six controller tests and two root smoke tests pass in the project-local Python 3.12 `.venv`, and the real DB metadata is unchanged. V5 `system/` payload and Pi gate are implemented, tested (12/12), published, and staged in the Python workspace. Pi session-only trust loaded the refreshed extension; denied write, approved date-record write, and corrected shell-reference blocking were verified live. The user rejected a no-preview edit confirmation. The V5 fix handles Pi 1.0.4 `edits[]`, blocks missing previews, passes 12 tests, and is staged at `e710071`; live before/after preview was subsequently verified. The index now points to the saved decision, and a fresh session returned the format and checked current source without edits; the pasted response does not show whether the linked record file itself was opened. Persistent trust and app launch also remain untested. Python changes and host snapshot are uncommitted.
