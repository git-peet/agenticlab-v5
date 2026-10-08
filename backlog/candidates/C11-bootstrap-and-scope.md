# V52-C11 — Project bootstrap, greenfield setup, and workspace isolation

**Status:** `candidate`; prototype payload boundary confirmed, reusable setup/update contract open

**Implementation readiness:** **Not ready for setup/reset tooling.** Python was an earlier experimental host; Evershop is now the selected V5.2 experiment workspace. General install, refresh, and collision behavior remain open.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C02 knowledge](C02-knowledge-lifecycle.md), [C08 runtime](C08-runtime-adapters.md)

## Purpose

Start AgenticLab in an existing project or a greenfield assignment without confusing system configuration, target-project knowledge, work history, and external/user-owned material. Prevent one workspace's memory/history from silently becoming another project's context.

**Confirmed prototype distribution shape:** `/home/peet/Projects/AgenticLab-v5/system/` is the source payload; export/copy its runtime files into a delivery workspace as `AgenticLab/`. Do not drop the whole V5 development repository/backlog into the host. Initialize the target workspace's root `AGENTS.md` pointer, project-local Pi registration, `PROJECT-SCOPE.md`, `SOURCE-REVISION.txt`, and initial local knowledge/index there. This shape has been manually prototyped in the Python experimental host, not automated.

**Snapshot comparison and reconciliation:** The Python host initially declared `aef687a`, but a read-only comparison found a mixed snapshot. With user approval, it was refreshed to clean committed source `4855118a5473e20612a48b2b047ab69a72387ff2`; every copied non-test runtime file was verified byte-identical, and workspace-owned scope/configuration/knowledge were preserved. Future refreshes still need a file-set/diff preview and ownership policy.

**Evershop V5.2 experiment host (2026-10-08):** The old Evershop workspace-local `AgenticLab/` was moved intact to sibling backup `/home/peet/Projects/Practice/AgenticLab-v5.1-Backup/`; its knowledge/evaluation material was not imported into the new instance. A fresh system payload from committed V5 source `7e4be9c91b5df5b1cad1dca4729d268db5e61e1e` is staged at `/home/peet/Projects/Practice/evershop-dev/AgenticLab/` with an empty knowledge index, Evershop scope boundary, full source revision, root `AGENTS.md` pointer, and project-local Pi settings. Local `.git/info/exclude` protects `AgenticLab/`, root `AGENTS.md`, and `.pi/`; the tracked Evershop `.gitignore` and remote remain unchanged. No V5.1 knowledge was imported.

**Pi startup check:** In the trusted Evershop workspace, Pi 1.1.0 listed the root `AGENTS.md` under Context and the project `knowledge-write-gate.ts` under Extensions. A follow-up read-only turn followed the root pointer, read exactly `AgenticLab/AGENTS.md`, `PROJECT-SCOPE.md`, and `knowledge/INDEX.md`, and reported the Evershop scope and empty index without Bash or edits. This confirms context and extension discovery on Pi 1.1.0; write-gate behavior and approval UI were not tested.
## Context and evidence

V4's startup combines project questionnaire, adapter/hook installation, topology, Graphify setup, and warmup. The audit recommends separating project profile, host integration, and bootstrap/context production; Graphify and warmup outputs are not universal runtime prerequisites. The V4 backlog proposes a greenfield startup path because code-analysis warmup has little to analyze in an empty project. It also identifies a possible workspace reset/seeded-state hazard, but its own correction notes that some alleged contamination was not verified in the audited copy. Thus reset safety is a valid boundary to design, not evidence that every V4 copy is contaminated.

V5's memory contract distinguishes session, feature, project, workspace, system, and external-reference scopes and forbids silent cross-project transfer. The clean V5 repository is the canonical development/source home. The Python expense tracker was an earlier experimental host; Evershop is now selected for the next V5.2 experiment, not as canonical V5 source.

**Historical sources (optional):** V4 `agents-empty-startup-greenfield-variant.md`, `project-memory-reset-check-gap.md`, `MANUAL.md` §§3 and 11, Neo audit Finding 9; V5 roadmap Priority 5 Q22, memory spec §5. Relevant evidence and uncertainty are summarized above.

## V5 direction

- Treat bootstrap as an explicit setup/knowledge-production process, not always-on work.
- Separate AgenticLab system design history from a target project's code, decisions, and learning.
- A greenfield workspace has no code facts to infer; begin from the user-provided objective and accumulate verified knowledge as work occurs.
- Keep the initial setup path as a reviewed, documented workspace-local copy/initialization flow; do not build an installer/reset tool until clean-workspace and existing-state behavior are specified.
- Keep Pi wiring project-local; do not alter global Pi configuration as part of workspace initialization.
- Any deployment/import/reset operation must show exactly what data is affected and require appropriate human approval. Recovery/reset never silently expands scope or deletes governed knowledge.

### Minimum manual bootstrap flow (design proposal)

1. **Preflight:** confirm target workspace/project identity and scope; inspect only setup paths to determine whether `AgenticLab/`, root `AGENTS.md`, and `.pi/settings.json` already exist. Report conflicts and proposed file operations before writing; never inspect protected project data as part of setup.
2. **Stage payload:** for the current prototype, copy the reviewed files under `system/` (`AGENTS.md`, `README.md`, `brain/`, `adapters/pi/` excluding `tests/`, and `prompts/delivery/`) into `<workspace>/AgenticLab/`. Record the full clean source commit. Re-review this inclusion list if the payload tree changes; exclude the V5 backlog and development logs, and do not use a live symlink.
3. **Initialize local state:** create the confirmed `PROJECT-SCOPE.md` and an empty knowledge index/required directories. Do not import V4, another workspace's knowledge, or V5 design history.
4. **Wire the host locally:** add or merge a workspace-root `AGENTS.md` entry for `AgenticLab/AGENTS.md` and the required project-local Pi extension setting. Preserve existing project instructions/settings; never alter global Pi configuration.
5. **Verify:** start a fresh Pi process from the target workspace root; confirm which instructions and extension loaded. If trust or the approval extension is unavailable, report the limitation and do not persist knowledge. Use synthetic test files for any write-gate check.

Treat refresh as a separate reviewed operation: compare source revisions and changed runtime paths, preview every replacement, preserve project scope/knowledge and host-owned instruction/configuration, and stop on conflicts. This is a manual runbook proposal, not an installer or authorization to overwrite/reset.

### File ownership and refresh policy (design proposal)

| File class | Examples | Proposed default |
|---|---|---|
| V5-managed payload | `AgenticLab/AGENTS.md`, `README.md`, `brain/`, `adapters/pi/`, `prompts/delivery/` | Owned by the named V5 source commit. Refresh only after comparing the installed copy with its recorded base and previewing the changed paths. Local divergence is a conflict, not permission to overwrite. |
| Workspace integration | Workspace-root `AGENTS.md`, `.pi/settings.json` | Host-owned. Preserve existing rules/settings; propose a narrow addition/merge with a preview. Stop on conflicting configuration. Never alter global Pi settings. |
| Project-owned state | `AgenticLab/PROJECT-SCOPE.md`, `AgenticLab/knowledge/` | Preserve across installs/refreshes. Initialize only when absent and after confirming project identity/scope. Never import from V4 or another workspace. |
| Provenance metadata | `AgenticLab/SOURCE-REVISION.txt` | Store the full clean source commit. Update only after the staged payload is verified against that commit. It identifies intended provenance but does not replace comparison/preview. |
| Unknown or obsolete paths | Host files not in the current payload set | Preserve and report; do not delete during refresh. Removal/reset is a separate explicitly approved operation. |

For a recognized, unmodified base, compute and show additions, replacements, and obsolete paths before a refresh; apply only the approved V5-managed changes and update provenance after verification. If the marker is absent/ambiguous or any managed file differs from its recorded base, stop for a file-level reconciliation rather than guessing whether it is a local edit or stale payload. Same revision plus exact files is a no-op. A failed or unavailable Pi trust/approval extension means no durable knowledge writes.

### Tabletop setup scenarios (design check, not runtime validation)

| Starting state | Expected safe behavior | What this checks |
|---|---|---|
| Empty delivery workspace | Confirm project identity/scope, show the complete creation list, then stage the payload and local metadata only after approval. | The basic drop-in path does not require V4/other-project knowledge or code-derived facts in a greenfield project. |
| Existing project with root `AGENTS.md` and `.pi/settings.json`, but no `AgenticLab/` | Preserve both files; present the exact pointer/extension additions as a reviewable patch. If a safe merge is unclear, stop and let the user integrate manually. | Existing host instructions/settings are not clobbered; Pi integration remains project-local. |
| Existing `AgenticLab/` whose runtime matches its recorded clean source commit | Preview added/replaced/obsolete runtime paths, preserve scope/knowledge, and update source provenance only after verified staging. | Safe refresh is tied to a known base and does not silently delete obsolete/unknown paths. |
| Existing `AgenticLab/` with a missing marker or any divergence from the recorded base | Do not refresh. Inventory managed paths and show differences for user-directed reconciliation. | Unknown/mixed snapshots are not guessed into a clean state. |
| Pi project trust or approval extension unavailable | Report that the extension-backed write gate is unavailable; do not persist knowledge by another route. | The system does not claim a hard guarantee it cannot enforce. |

These tabletop outcomes supported a manual runbook with a conservative stop-and-review path for conflicts.

### Bounded synthetic fixture validation (2026-10-08)

Using a `git archive` of committed payload `ccc56e48ae34f84d7c559b559b02a027ceaefd18`, disposable fixtures were created under `/tmp`; all were removed after the test. No application or project data was used.

- **Empty workspace:** copied the documented non-test payload file set; initialized a synthetic scope, empty index, root `AGENTS.md` pointer, project-local Pi extension setting, and full source marker. Byte comparisons and JSON parsing passed.
- **Existing host instructions/settings, no `AgenticLab/`:** added the documented pointer/extension while retaining sentinel rules, an unrelated existing extension, and other settings. Preservation and valid JSON checks passed.
- **Divergent existing `AgenticLab/`:** a synthetic managed-file divergence and knowledge sentinel were present. Preflight stopped; a before/after tree fingerprint matched, so no files changed.

**Limit:** This validates the file-operation interpretation for these fixtures only. No refresh of a recognized clean prior instance was exercised. It does not validate an installer or general update behavior. Reset/deletion remains outside the initial setup path.

### Fresh Pi startup smoke (2026-10-08; read-only context pass)

The user launched global Pi 1.1.0 from the retained synthetic workspace after granting project trust. Startup output listed the workspace-root `AGENTS.md` under `[Context]` and `knowledge-write-gate.ts` under `[Extensions]`. In a follow-up read-only turn, Pi followed the root pointer and read exactly `AgenticLab/AGENTS.md`, `AgenticLab/PROJECT-SCOPE.md`, and `AgenticLab/knowledge/INDEX.md`; it reported the synthetic-only scope and no seeded records. It used no Bash, accessed no other files, and made no edits. This confirms root-pointer following and local extension discovery on Pi 1.1.0. It does not test gate behavior, approval UI, or writes. Refresh of a clean prior instance also remains untested.

## Explicit exclusions

No V4 monolithic setup prompt, mandatory warmup, mandatory Graphify, automatic knowledge import, destructive reset command, or assumptions about the Python repo's current code state. Do not modify the Python project from this record.

## Preconditions / acceptance

The prototype has identified the canonical source (`AgenticLab-v5/system/`), target instance (`<workspace>/AgenticLab/`), workspace-local Pi/configuration and knowledge locations, and scope/source-revision files. The v0 inclusion list, ownership classes, and conflict stop-rules passed the bounded synthetic file-operation checks described above. The Pi 1.1.0 smoke confirms root `AGENTS.md` discovery, following its pointer to `AgenticLab/AGENTS.md`, reading the synthetic scope/index, and project-extension discovery. Gate behavior/approval UI and refresh of a recognized clean prior instance remain untested. Decide whether a generated checksum manifest adds value beyond a full commit plus deterministic file set only if repeated refresh needs justify it. Do not overwrite an existing `AgenticLab/`, root `AGENTS.md`, `.pi/settings.json`, or project knowledge without an explicit preview and approval.

Before automating setup or reset, test the documented manual flow against an empty workspace and a synthetic workspace with existing user-owned files. Enumerate every created/replaced file; confirm refresh preserves project scope and knowledge; verify the Pi integration in a fresh project session and report limitations if trust/hooks are unavailable. A reset preview must enumerate every affected file and category before any deletion proposal; never infer seeded knowledge from line count alone.

## Timing / next action

**Current recommendation:** A documented manual setup path is sufficient for first V5 delivery use; bounded file-operation checks and a read-only Pi 1.1.0 context smoke passed in both the synthetic fixture and the Evershop workspace. The user trusted only the Evershop project; root instructions and pointer-following were verified. Do not build an installer/reset tool now. Continue with a bounded read-only Evershop task; do not access `.env`/`data/`, run app/tests, or write. Revisit C08 only if this task exposes a concrete host capability gap; write-gate behavior/approval UI and refresh of a clean prior instance remain untested.
