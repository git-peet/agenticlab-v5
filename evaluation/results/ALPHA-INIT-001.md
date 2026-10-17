# ALPHA-INIT-001 — Interim observation: scope clarification friction

- **Preregistration:** [`../plans/ALPHA-INIT-001.md`](../plans/ALPHA-INIT-001.md)
- **Status:** Completed with limitations — first-use initialization/readiness smoke only; no delivery-benefit result
- **Run ID:** `ALPHA-INIT-001`
- **Run date:** 2026-10-15
- **Workspace label:** `V5-alpha-sandbox` (fresh Evershop copy)
- **Payload revision:** `8280a9a0035aca185c9e9d50b729d5da85e9be9b`
- **Pi CLI version:** 1.2.0

## Summary

The initialization has not completed. After the user confirmed a bounded, read-only top-level orientation, Pi read root `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`, and `package.json`, then asked the user to supply shallow package/directory names and root configuration filenames because the session had only a file-reading tool and the agreed scope did not permit shell listing commands.

The user reported that this felt like repeated access requests and contrasted it with V4's more streamlined startup. Treat this as an initial user-attention/friction observation. It does not establish a general failure rate or show that the protected-data boundary failed.

## Interim measures

| Measure | Observation | Evidence / limitation |
|---|---|---|
| Workspace/payload provenance | Target `V5-alpha-sandbox`; payload revision `8280a9a0035aca185c9e9d50b729d5da85e9be9b`; local Pi CLI 1.2.0 | Preflight in this session; runtime payload matched canonical `system/`. |
| Initial scope interaction | Pi first requested project identity, paths/scope, exclusions, and execution permission; user supplied/confirmed bounded top-level, read-only orientation | Conversation record; do not count as repeated access to source. |
| Additional clarification after scope confirmation | 1 reported request: provide package/directory names and root config filenames | Based on the user's pasted Pi output; the full Pi JSONL/tool trace was not captured or independently inspected. |
| Project sources reported read | `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`, root `package.json` | As reported by Pi in the pasted output. It stated it had not inspected package source. |
| Shell/app/test execution | None reported | Pi said it had not run commands. No app or tests were run in this session. |
| Writes / initialization preview | None reported / not reached | `PROJECT-SCOPE.md`, `PROJECT-OVERVIEW.md`, `.pi/settings.json`, and `.pi/APPEND_SYSTEM.md` remain absent at the last preflight. No complete preview was produced. |
| Protected data access | None reported | Pi stated it had not inspected host application files before scope confirmation; the later reads were root docs/manifests. No independent raw trace review yet. |

## Interpretation

- The run encountered an interaction snag before source orientation was complete: the user had approved a bounded top-level orientation, but the agent requested a further path inventory after discovering that no listing tool was available.
- The immediate cause appears to combine a host/tool capability limitation (read-only file read without directory listing) and the agent's choice to ask the user for an inventory rather than continue with a clearly partial orientation. The current evidence does not isolate which part of the prompt, tool configuration, or model behavior caused the extra turn.
- This is one observed clarification, not a hard safety failure. No access outside the stated read-only project orientation, writes, or execution has been reported.
- The user's desired experience is fewer serial permission questions: confirm scope once, proceed within it, and preserve the single complete preview/approval before setup writes. This is UX feedback to evaluate, not yet a general policy change.

## Open run / next safe action

The initialization prompt remains active and no files have been written. Before continuing, the user should tell Pi whether to proceed with the available documentation/manifests and mark the package inventory as partial, or provide/approve one specific non-shell method for a shallow listing. Do not search more broadly or infer an exhaustive package inventory. Once orientation completes, review the complete proposed scope/profile and `.pi` changes as preregistered; approve or reject them explicitly. Continue this same run record with later outcomes, failures, approvals, and verification. Do not claim initialization success until fresh-session activation is checked.

## Update 2 — Partial orientation and complete preview presented

**Evidence source:** user-pasted Pi response; no raw session/tool trace has been independently reviewed.

Pi presented a complete preview for four proposed creates: `AgenticLab/PROJECT-SCOPE.md`, `AgenticLab/PROJECT-OVERVIEW.md`, `.pi/settings.json`, and `.pi/APPEND_SYSTEM.md`. It reported reading only root `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`, and `package.json`; no package source or shell/app/test command was used. The profile is explicitly partial: actual package/config inventory and source revision remain unknown, while stack and workspace claims are attributed to repository guidance. Pi states that no files have been written and awaits explicit approval.

This satisfies the preregistered preview-before-write checkpoint, but not final initialization acceptance. The user has not approved the preview. Fresh-session activation, profile availability, actual write-path behavior, and complete initialization remain untested. The earlier extra inventory clarification remains the only observed user-attention friction so far; approval/restart interactions are not yet observed.

**Review note:** The proposed `PROJECT-SCOPE.md` excludes `data/` without specifying whether this means the repository-root data directory or all nested source paths named `data`. Clarify only if the user intends a narrower boundary; do not inspect such paths to resolve the ambiguity. The sentence “Initialization and orientation are read-only” should be understood as prohibiting host-project mutations; the separately listed AgenticLab/`.pi` setup writes remain gated by the complete preview and explicit approval.

## Update 3 — Revised scope/profile preview presented

**Evidence source:** user-pasted Pi response; no raw session/tool trace has been independently reviewed.

The revised preview now narrows the exclusion to the repository-root `data/` directory and explicitly says nested directories named `data` are not categorically excluded. It retains a partial overview with no package inventory or package-source inspection, and again previews only the four setup/profile file creates. It reports no commands and no writes. The user has not approved the preview; the run remains in progress.

**Review note:** The scope text says “Initialization and orientation are read-only” and later permits the four enumerated setup writes after approval. The later exception makes the intent understandable, but a single explicit formulation would be clearer: host-project inspection is read-only; only the four previewed AgenticLab/`.pi` setup files may be written, and only after approval. The overview's “Oriented: Date not verified” is also avoidable if the current date is available; otherwise it is a transparent unknown. No further project-path inventory is needed to resolve these wording issues.

## Update 4 — Scope wording acknowledged; approval still pending

**Evidence source:** user-pasted Pi exchange; no raw session/tool trace has been independently reviewed.

The user supplied the wording clarifying that host-project inspection is read-only and only the four previewed AgenticLab/`.pi` files may be written after approval. Pi acknowledged it and said no files had been written, then asked for approval. The pasted excerpt does not show the full regenerated contents of all four files with that wording applied, so this review cannot verify that the approval target is the exact final preview. Treat approval as **pending** until the complete final preview is visible. This adds one wording correction/confirmation and one expected approval request to the interaction record; no setup write has occurred.

## Update 5 — Complete preview reprinted; scope wording still inconsistent

**Evidence source:** user-pasted complete Pi preview; no raw session/tool trace has been independently reviewed.

The complete four-file preview is now visible, including the narrowed repository-root `data/` exclusion and the boundary statement that host-project inspection is read-only and setup writes require approval. No writes have occurred and user approval remains pending.

One inconsistency remains within the proposed `PROJECT-SCOPE.md`: it says “Initialization and orientation are read-only” before listing the four setup/profile files that initialization may write after approval. The later boundary section explains the intended exception, but that exception should also be unambiguous in the persisted scope file. This is a wording-only issue; no additional project inspection or package inventory is needed.

## Update 6 — Complete preview reprinted with consistent write boundary

**Evidence source:** user-pasted complete Pi preview; no raw session/tool trace has been independently reviewed.

The revised `PROJECT-SCOPE.md` now says host-project inspection during initialization is read-only and separately limits the only permitted initialization writes to the four previewed files after explicit approval. The final boundary section repeats this distinction. The preview remains partial and explicitly discloses the missing package/config inventory and unverified EverShop source revision. No further inspection was reported; no files have been written. The complete preview is now ready for the user's approval decision. Fresh-session activation remains untested and is a later run stage.

## Update 7 — Approved setup writes reported and read back

**Evidence sources:** user's approval and pasted Pi completion message; direct read-back of the four approved target files. No raw Pi JSONL/tool trace was inspected.

The user approved the complete revised preview. Pi reported creating exactly the four planned files. I read back `AgenticLab/PROJECT-SCOPE.md`, `AgenticLab/PROJECT-OVERVIEW.md`, `.pi/settings.json`, and `.pi/APPEND_SYSTEM.md`; their contents match the approved preview. The overview remains explicitly partial, with the Evershop repository revision and package/config inventory unknown. The settings point to the expected local extension and prompt. The preflight found these files absent before initialization, and no host-root `AGENTS.md` was proposed.

**Current outcome:** setup/profile writes and read-back checks pass based on the available evidence. Host-project safety beyond the reported run remains unverified because no full Pi tool trace or independent whole-workspace diff was reviewed. Fresh trusted-session activation/profile loading is still pending; the current Pi process has not restarted. Do not call initialization fully complete until that check passes.

## Update 8 — Fresh Pi startup: context and extension load; prompt conflict

**Evidence source:** user-pasted Pi 1.2.0 startup output. No raw session/tool trace was independently inspected.

The fresh process from the workspace root listed `.pi/APPEND_SYSTEM.md` under Context and `knowledge-write-gate.ts` under Extensions. This is evidence that Pi discovered the local append-system file and extension in that process; it does not yet prove the instructions were followed or that `PROJECT-SCOPE.md` and `PROJECT-OVERVIEW.md` were read. The `/initialize-workspace` template had a prompt conflict at line 1, column 14: its unquoted YAML `description` contains `once: confirm`, so Pi did not register the prompt. The package-update notice concerned `pi-zentui` and was not acted on.

**Acceptance status:** extension discovery passes provisionally; prompt registration fails; scope/profile following and availability remain unverified. The first-use prompt itself did complete through direct file reference, so no re-initialization is needed. Do not claim full Alpha activation until the frontmatter issue is corrected through an approved canonical change, the droppable payload is refreshed under a new revision, and a fresh process verifies registration and scope/profile availability.

## Update 9 — YAML fix applied to canonical and local payload copies

The user approved a bounded fix: quote the `description` scalar in `system/prompts/system/initialize-workspace.md` so YAML accepts its colon. The same one-line correction is now present in the generated `/home/peet/Projects/AgenticLab/` bundle and the installed `/home/peet/Projects/V5-alpha-sandbox/AgenticLab/` copy. Runtime files in both copies match the canonical `system/` tree (excluding development tests and the installed workspace's approved `PROJECT-SCOPE.md`/`PROJECT-OVERVIEW.md`). Both `SOURCE-REVISION.txt` files now identify a local test build based on `8280a9a`, not a clean published commit. `git diff --check` passes.

**Validation still pending:** the current Pi process started before this correction and still has the prompt-conflict state. No fresh Pi startup has yet verified slash-command registration after the fix. No initialization was rerun; no app/tests, Evershop source, protected data, or global Pi settings were touched. The next step is a fresh Pi restart and startup check, followed by read-only verification that the instructions and scope/profile pointers are available.

## Update 10 — Fresh Pi startup registers corrected prompt

**Evidence source:** user-pasted Pi 1.2.0 startup output; no raw session/tool trace was independently reviewed.

After the local prompt fix and restart, Pi lists `.pi/APPEND_SYSTEM.md` in Context, `/initialize-workspace` in Prompts, and `knowledge-write-gate.ts` in Extensions. No prompt-conflict error is reported. This passes the prompt-registration/startup-discovery check for this Pi version. The unrelated `pi-zentui` package update notice was not acted on.

**Still pending:** a read-only turn must follow the pointer to `AgenticLab/AGENTS.md` and verify that `PROJECT-SCOPE.md` and `PROJECT-OVERVIEW.md` are available and directed for fresh-session use; confirm the initializer did not run automatically. Extension listing establishes discovery, not a full gate behavior test. Do not rerun initialization or inspect host application source. The corrected packages are local drafts based on `8280a9a`, not a clean published revision.

## Update 11 — Prompt registration passes after local YAML fix

**Evidence source:** user-pasted fresh Pi 1.2.0 startup output; no raw session/tool trace was independently reviewed.

After the approved frontmatter correction was ported to canonical source and both local payload copies, the user restarted Pi. Startup now lists `/initialize-workspace` under Prompts, `.pi/APPEND_SYSTEM.md` under Context, and `knowledge-write-gate.ts` under Extensions, with no prompt conflict shown. This passes the startup registration/discovery check for Pi 1.2.0. The `pi-zentui` update notice remains unrelated and was not acted on.

**Still pending:** verify through a read-only turn that Pi follows the APPEND_SYSTEM pointer to `AgenticLab/AGENTS.md` and reads/uses the scope and overview, and confirm the initialization prompt did not run automatically. The running target package is a local patched build based on `8280a9a`; it is not a clean published revision. No commit/push or general release has occurred.

## Update 12 — Fresh-session pointer and profile availability check

**Evidence source:** user-pasted Pi startup and read-only follow-up output; no raw Pi JSONL/tool trace was independently reviewed.

The fresh Pi 1.2.0 startup listed `.pi/APPEND_SYSTEM.md` in Context, `/initialize-workspace` under Prompts, and `knowledge-write-gate.ts` under Extensions, with no prompt conflict. In the follow-up, the user explicitly asked Pi to follow the append-system instructions and read `AgenticLab/AGENTS.md`, `PROJECT-SCOPE.md`, and `PROJECT-OVERVIEW.md`; Pi reported reading all four and made no commands or changes. This confirms the setup files are readable and the project-local prompt/extension are discovered in a fresh process. The user request named the pointer targets, so this is not evidence that an ordinary task would autonomously read all of them without a cue.

**Run disposition:** `ALPHA-INIT-001` is complete as a bounded first-use initialization/readiness smoke: the approved four files were written and read back; fresh Pi discovered the append-system context, extension, and registered prompt; and the explicit read-only pointer/profile availability check passed. The orientation remains partial (package and root-config inventory unknown; Evershop source revision unverified). No host-project source, app, tests, `.env`, `data/`, Git internals, or global Pi settings were accessed by the documented steps. No delivery task or orientation-benefit comparison was performed.

## Metrics follow-up

A bounded metadata lookup identified the separate initialization Pi session in the `V5-alpha-sandbox` workspace by date, CWD, and `ALPHA-INIT-001`/initializer markers. Its privacy-minimized aggregate is in [`../metrics/ALPHA-20261016-PI-SESSION-METRICS.csv`](../metrics/ALPHA-20261016-PI-SESSION-METRICS.csv): 8 user messages, 13 assistant messages, 17 tool calls (13 reads, 4 writes), 4 tool results flagged `isError`, 282,782 total tokens, and $0.011769 reported model cost. The session file spans 26m42s; from its first user prompt at 12:25:51.668Z to final setup response at 12:49:25.425Z, the run window is 23m34s. The recorded user approval at 12:49:14.982Z precedes all four setup write calls at 12:49:14.993Z. `isError` is a raw tool-result flag, not a task-failure count.

A separate fresh-session activation check in the later `evershop-sandbox` session used 4 reads and reported 22,280 tokens/$0.001416 over a 2m24s window. The master coordinator's preflight-to-activation calendar window is separately recorded at 15 user messages, 112 assistant messages, 120 tool calls, 46.15M total tokens, and $1.004984. Treat that as coordinator/preflight/reporting activity, not initializer-worker cost. All windows include possible pauses; active/hands-on time is unknown. Raw session bodies were not copied; see [`../metrics/README.md`](../metrics/README.md).

## Data handling

This record summarizes user-provided Pi output, read-back of the four approved files, and privacy-minimized metrics from the exact identified initializer and fresh-activation sessions. No raw Pi session transcript, prompt/tool-result body, Evershop source, or protected data has been copied here. Any later trace review must remain limited to the exact run sessions and preregistered measures.
