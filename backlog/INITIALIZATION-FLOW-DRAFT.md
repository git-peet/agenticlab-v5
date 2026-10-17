# First-Use Workspace Initialization and Project Orientation — Draft

**Status:** The first-use prompt prototype completed one fresh Evershop initialization/readiness smoke with partial orientation. The user approved persistent project-local registration of the three available delivery prompts as opt-in commands; canonical setup instructions, both local package copies, and target settings are updated. The user later confirmed `/initialize-workspace`, `/plan`, `/implement`, and `/premortem` are registered and ready in the Evershop Pi session; no workflow auto-ran.
**Purpose:** Propose a V5 first-use flow using the valuable functions of V4 `/agents-startup` and `/warmup`, while preserving V5's default-first, scoped, human-reviewed design.
**Prompt name:** `/initialize-workspace` is provisional.

## 1. Goal

Initialize AgenticLab's understanding of one delivery workspace once, so later fresh sessions begin with useful, compact, source-grounded project context instead of rediscovering basic structure. Keep project scope, Pi/harness operation, and technical project knowledge as distinct layers.

This flow is **explicitly invoked once per workspace** after a reviewed AgenticLab payload is installed. It is not run at every Pi startup. Later sessions load the approved compact overview; details and task-specific records are retrieved only when relevant. An explicit later refresh is a separate operation.

### Proposed Pi invocation

Implement the workflow as a **Pi prompt template**, not executable extension code:

- Store it in the payload as `AgenticLab/prompts/system/initialize-workspace.md`.
- The **first-run prompt itself** can create or carefully merge `.pi/settings.json` with the project-local knowledge-write extension and prompt paths for `initialize-workspace.md`, `delivery/plan.md`, `delivery/implement.md`, and `delivery/premortem.md`. These become `/initialize-workspace`, `/plan`, `/implement`, and `/premortem`; registering a prompt makes it available but never runs it. Preserve unrelated settings and never replace them.
- For the **initial invocation**, the user starts Pi from the workspace root and explicitly asks it to read/follow `AgenticLab/prompts/system/initialize-workspace.md`. This direct file reference works before `.pi/` exists. After the prompt creates the local wiring, a fresh Pi process and project-trust approval activate the extension and all registered prompt commands.
- `/initialize-workspace` is available for later explicit re-orientation/refresh; `/plan`, `/implement`, and `/premortem` remain opt-in workflows. `pi --prompt-template AgenticLab/prompts/delivery/<name>.md` remains a one-session fallback.

Do not put the flow in `.pi/APPEND_SYSTEM.md` as an always-running instruction or implement it as an extension just to create a command. The first invocation is the user's direct request to follow the prompt file; the flow may then create `.pi/` after showing a preview. It should detect an existing profile and stop rather than re-running orientation unless the user explicitly asks for refresh.

## 2. Three initialization layers

| Layer | Purpose | Proposed source/artifact | Authority |
|---|---|---|---|
| **1. Project identity and scope** | Identify the project/subproject, allowed work, and protected paths/data. | `AgenticLab/PROJECT-SCOPE.md` | Confirmed by the user; this sets boundaries, not technical facts. |
| **2. AgenticLab and harness setup** | Make the V5 contract and supported Pi integration available in this workspace. | `AgenticLab/AGENTS.md`; `.pi/settings.json`; `.pi/APPEND_SYSTEM.md` | Shared operating contract plus reviewed, project-local wiring. Never global Pi settings. |
| **3. Technical project orientation** | Give future sessions a concise map of how the codebase is organized and where to begin. | Leading artifact proposal: `AgenticLab/PROJECT-OVERVIEW.md`, beside but distinct from `PROJECT-SCOPE.md` | Derived from current sources, with citations, revision/date, and uncertainty; not authority over scope or current code. |

The proposed overview is deliberately separate from `PROJECT-SCOPE.md`, harness rules, and atomic decision/experience records. Ordinary code-derived facts belong in the overview only when they save meaningful repeated navigation; do not automatically turn every inspected fact into a durable record.

**Required recurring-context dependency:** the current V5 payload does not yet direct every fresh session to read such a profile. The eventual implementation must add a small, conditional instruction (read the approved overview if it exists, after scope and before task work) to the shared V5 operating instructions or an equivalent reviewed host-local context path. The one-time orientation prompt alone cannot make the summary available in future sessions.

### Project overview versus persistent knowledge

Both are persisted, but they solve different problems. “Project overview” is a **session-start profile**; “persistent knowledge” below means V5's **curated project records**. The overview is not a second record corpus, and persistent records are not a general startup digest.

| | Project overview/profile | Persistent knowledge records |
|---|---|---|
| **Purpose** | Save recurring orientation/navigation work: stack, major packages, entry points, important flows, test layout, and pointers. | Preserve valuable facts not cheaply recoverable from current source—especially user decisions and rationale, rejected alternatives, costly discoveries, validated gotchas, and reusable procedures. |
| **Evidence** | Primarily current repository sources; cite paths and the source revision/date. Mark inference, unknowns, and inspection coverage. | Each record has its own claim, applicability scope, source/evidence, status, and verification lifecycle under the knowledge contract. |
| **Loading** | One compact profile is read once in each fresh session, if present. It is a navigation aid, not proof of current behavior. | Retrieved selectively when task and scope could benefit; full corpus searches are for complete/no-match claims, not routine startup. |
| **Lifecycle** | Reviewed as a coherent snapshot; refresh explicitly when useful. On source drift, treat as an older map and verify relevant facts—do not auto-regenerate. | Candidate/active/inactive lifecycle, user-approved persistence/status changes, and record-level verification/supersession. |
| **Not for** | Secrets, exhaustive file inventories, every code fact, task state, policy, or durable decision rationale. | Duplicating source maps wholesale, session transcripts, or facts that are cheap to recover and unlikely to save future work. |

**Examples:** “This is a pnpm monorepo; the storefront starts in `apps/storefront`; tests use Vitest” belongs in the overview when verified and useful for navigation. “We chose provider-side idempotency because retries can repeat callbacks; alternative X was rejected because…” belongs in a scoped decision record. The overview may link to that record, but should not duplicate its rationale. Project access limits belong in `PROJECT-SCOPE.md`, not in either artifact as an informal substitute for authority.

The leading location proposal is `AgenticLab/PROJECT-OVERVIEW.md`, beside `PROJECT-SCOPE.md` but with a different job and no authority over scope. Treat it as a workspace-initialization profile, not a V5 knowledge record: show it in the initialization preview and require explicit approval before writing. Do not put it in the atomic `records/` corpus, assign record lifecycle metadata, or use this as a route around the separate knowledge-record approval contract. Later durable decisions/experiences remain in the knowledge interface.

## 3. Preconditions and stopping conditions

Before orientation begins:

1. The user explicitly invokes the one-time flow.
2. The reviewed `AgenticLab/` payload is present and its source revision is clear. This workflow does **not** install, refresh, or replace the payload; if it is absent or ambiguous, stop and use the reviewed payload-drop procedure.
3. Project scope may be absent or already present. Confirm it with the user before inspection; if absent, draft it from user input rather than inferring authority from source files.
4. Pi is launched from the workspace root. `.pi/` may be absent on the first run. Inspect only the known setup paths `AgenticLab/`, `.pi/settings.json`, and `.pi/APPEND_SYSTEM.md`; do not inspect arbitrary project files as an installation preflight.
5. The initial prompt is invoked by a direct user file reference. After proposed `.pi` files are approved and written, a fresh Pi process plus project trust is required before claiming the extension and registered slash command are active. If trust is declined/unavailable, report the capability gap; do not change global trust/settings.

Stop and ask before proceeding if the target workspace, project/subproject, protected paths, allowed source paths, or existing profile ownership are unclear. Never resolve a conflict by overwriting an existing scope/profile or host-owned `.pi` content.

## 4. Proposed one-time flow

### Phase 0 — Detect state and explain scope

Inspect only the known AgenticLab/Pi setup paths. Report whether this appears to be:

- **Uninitialized:** no technical overview exists and scope/setup are available.
- **Partially initialized:** scope, harness wiring, or overview is missing/incomplete.
- **Already oriented:** an overview exists; do not silently re-run or overwrite it.

If an overview already exists, report its recorded source revision/date and offer a separately scoped review/refresh only if the user asks. Do not infer that a changed commit automatically requires a new scan.

Before source inspection, present a short orientation plan: project/subproject, allowed paths, excluded paths, intended read-only methods, and what the resulting overview is expected to cover. Ask for correction/confirmation only where scope or the path allowlist is not already explicit in `PROJECT-SCOPE.md`.

### Phase 1 — Confirm project scope (Layer 1)

Read the existing `PROJECT-SCOPE.md` if present; if absent, confirm the project identity and draft it from the user's answers. Confirm or correct:

- workspace/project identity and any in-scope subprojects;
- areas relevant to the requested orientation;
- protected data/secrets/backups and generated/dependency directories to avoid;
- whether discovery is read-only (the default) and whether any execution is explicitly allowed (default: none).

Do not infer scope from code discovery or replace an existing `PROJECT-SCOPE.md`. Show the exact new/changed scope file in the complete initialization preview and wait for approval before writing.

### Phase 2 — Prepare harness wiring (Layer 2)

The user invoked this prompt directly by path, so the prompt can run before project `.pi/` settings exist. Prepare—but do not silently apply—a local Pi integration plan:

- `.pi/settings.json` registers the project-local knowledge-write extension and prompt paths for `initialize-workspace.md`, `delivery/plan.md`, `delivery/implement.md`, and `delivery/premortem.md`; Pi exposes them as `/initialize-workspace`, `/plan`, `/implement`, and `/premortem` after restart/trust, without auto-running any prompt;
- `.pi/APPEND_SYSTEM.md` points to `AgenticLab/AGENTS.md`, `AgenticLab/PROJECT-SCOPE.md`, and the overview if present;
- there is no workspace-root `AGENTS.md` creation/edit.

Include `.pi/` changes, scope creation/update, and the proposed overview in one exact initialization preview. After explicit user approval, write only these setup/profile files. Preserve existing `.pi` settings/instructions; stop if a safe merge is unclear. Do not create, move, or modify host application paths such as `src/`, `tests/`, project manifests, or build configuration as part of initialization. Tell the user to start a fresh Pi process and grant project trust; only then can the extension and all four registered slash commands be claimed as available. Registration does not run a prompt automatically.

### Phase 3 — Bounded read-only source orientation (Layer 3)

Use the confirmed allowlist and prefer direct, known sources over repository-wide searches. A first pass may inspect safe, relevant items such as:

- project README and architecture/contributor guidance;
- package/workspace manifests and language/framework configuration;
- top-level structure, limited to user-approved application paths;
- routing, application, service, or command entry points named by manifests/docs;
- test-runner configuration and representative tests, if included in the allowed paths;
- CI/build definitions only when safe and relevant to identifying the test/build approach.

Record exact paths and sources for material claims. Distinguish verified facts, reasonable inferences, and unknowns. Prefer a useful route map over an exhaustive file catalogue. If a monorepo or large surface exceeds the agreed inspection scope, stop with a partial-coverage report and offer scoped follow-up choices; do not silently expand the scan.

**Default exclusions:** `.env` and other secret-bearing files; protected `data/` paths and customer/production data; backups; dependency/vendor directories; generated/build outputs; caches; and unapproved tests or fixtures containing real data. Apply the workspace's exact scope rules rather than blanket-excluding every directory with a familiar name. Do not run the application, tests, migrations, installs, or arbitrary project commands by default. Reading a manifest's script is not permission to execute it.

### Phase 4 — Draft the technical overview

Proposed `PROJECT-OVERVIEW.md` contents:

```markdown
# Project Overview

- **Project/workspace:** [confirmed identity/scope]
- **Oriented:** [date]
- **Source revision:** [commit/hash if available; otherwise explain]
- **Coverage:** [paths inspected and notable exclusions]

## Stack and workspace layout
[Languages, frameworks, package/workspace boundaries, concise module map]

## Starting points and important flows
[Key entry points and a few useful source paths; no exhaustive symbol index]

## Build and test approach
[Commands/configuration found in source; mark as inspected, not run]
[Known isolation/safety constraints; do not claim commands are safe unless established]

## Known unknowns
[Material areas not inspected or facts needing user confirmation]

## Sources
[Paths supporting the summary; source revision/date]
```

Keep it short enough to be a practical fresh-session orientation. Do not set an arbitrary token limit yet; use the user's review and actual fresh-session utility to tune its size. Do not populate the old V4 persona memories, `SYSTEM_CORE.md`, DIGEST, symbol index, Graphify, or semantic graph as a by-product.

### Phase 5 — Review, approve, and persist

Present the complete overview draft, its exact target path, sources/revision, exclusions, coverage limitations, and any uncertain claims. Correct it from user feedback. Do not write until the user explicitly approves the overview.

**Write-path proposal:** save the profile as `AgenticLab/PROJECT-OVERVIEW.md`, separate from the V5 knowledge-record corpus. Show it alongside any new/changed `PROJECT-SCOPE.md` and `.pi/` settings in the complete initialization preview; wait for one explicit approval before writing those setup/profile artifacts. This is not authorization to create or promote memory records. Any non-derivable decision/risk uncovered during orientation is reported separately as a candidate and remains subject to the V5 knowledge contract and write gate.

### Phase 6 — Confirm availability in a fresh session

After an approved save, start a fresh Pi session and verify the intended behavior:

- project instructions still load through `.pi/APPEND_SYSTEM.md`;
- scope is read before consequential work;
- the compact overview is available at the start of ordinary work (the proposed V5 instruction is to read it once in each fresh session, not to re-scan the source tree);
- `/initialize-workspace`, `/plan`, `/implement`, and `/premortem` are available as user-invoked commands; none is auto-run;
- no application-root paths were created or changed by initialization;
- a small follow-up task can use the overview's pointers and verify current facts against source.

A successful read proves availability, not that the overview improved delivery. Record any stale, inaccurate, missing, or unnecessary content and revise only through an explicit reviewed update.

## 5. Later-session behavior

On ordinary fresh sessions, do **not** rerun initialization or source discovery. Load the shared operating/safety contract and confirmed scope; read the compact approved project overview once as instructed. For a task, verify relevant mutable facts against current code, then retrieve detailed records only if the task could benefit. The overview is a navigation aid, not current truth, task authorization, or a substitute for source inspection.

A later explicit refresh may be offered when the user requests it or a concrete task reveals meaningful drift. It should compare the recorded overview revision with current state, inspect only the changed/relevant allowed paths, produce a reviewed diff, and preserve host scope and `.pi` configuration. No Git hook, automatic commit-triggered scan, or startup-time warning is selected.

## 6. Failure and partial-completion behavior

- If scope cannot be confirmed: stop before codebase inspection.
- If the allowed path set is unclear or a protected path is encountered: stop and ask; do not infer permission from the requested overview.
- If tools or project trust are unavailable: report which layer could not be verified; do not claim setup is complete.
- If the scan is partial: label the overview partial, identify uninspected areas, and do not infer that an uninspected module/flow does not exist.
- If a claim lacks source support: omit it or mark it as an inference/unknown.
- If save approval is unavailable/rejected: leave the draft in the conversation only; do not use another persistence route.
- If a source or test command looks unsafe: list it as discovered, unverified, and not run.

## 7. Acceptance checks for the first prototype

1. A fresh synthetic workspace runs the flow once and produces a concise, source-cited overview from an explicit safe allowlist.
2. The overview separates confirmed project scope from inferred technical facts and lists coverage/unknowns.
3. The exact initialization changes are previewed; rejection leaves scope/profile/`.pi` files unchanged, and approval writes only those declared setup paths. Later knowledge-record writes remain behind the separate existing gate.
4. A second fresh session reads the approved overview without repeating repository discovery.
5. A task-relevant claim is checked against current source; an irrelevant task does not trigger broad memory/source scans.
6. A fixture with an existing `src/`, `tests/`, manifest, root `AGENTS.md`, and `.pi` content retains all host-owned paths unless individually approved setup changes are previewed.
7. No `.env`, protected `data/`, backups, dependencies, app execution, tests, database, or global Pi config is accessed/changed during the default orientation path.
8. The report identifies partial coverage honestly and never equates “not inspected” with “does not exist.”
9. A fresh trusted Pi session registers all prompt templates declared in project settings; delivery workflows remain opt-in and are not automatically invoked.

## 8. Decisions for review

1. Is the combined first-use workflow the right product shape, or should setup verification and technical orientation remain two separate invocations?
2. Is `AgenticLab/PROJECT-OVERVIEW.md` beside `PROJECT-SCOPE.md` the right location, with explicit setup approval distinct from memory-record gating?
3. Should the shared V5 operating instructions tell every fresh session to read the compact overview once, as proposed, or should a Pi adapter inject its contents directly? The draft prefers one small file read over a new injection extension.
4. Is the proposed profile scope right—stack, layout, entry points/flows, test approach, unknowns—or should a category be added/removed?
5. **Resolved:** invoke initialization by direct file reference before `.pi/` exists; after approved setup, register `/initialize-workspace` and the available delivery prompts as opt-in slash commands. Registration must not auto-run any workflow.
6. What exact path exclusions and inspection budget should the first test fixture use?

The user approved preparing this setup and later approved registering all currently available delivery prompt prototypes as opt-in slash commands during initialization. The first-use prompt and setup have been exercised in one fresh Evershop workspace. Canonical instructions, local payload copies, and the target `.pi/settings.json` now register `/initialize-workspace`, `/plan`, `/implement`, and `/premortem`; the user confirmed that these commands are registered and ready in a fresh Evershop Pi session. Registration does not automatically invoke workflows. This draft does not authorize overwrite/refresh or publication of a new source revision.
