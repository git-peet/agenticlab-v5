# ALPHA-INIT-002 — Fresh EverShop workspace initialization

- **Preregistration:** [`../plans/ALPHA-INIT-002.md`](../plans/ALPHA-INIT-002.md)
- **Status:** Setup/readback passed; `/plan` availability verified; full orientation remains partial
- **Run date:** 2026-10-17
- **Workspace:** `/home/peet/Projects/V5-alpha-tune001/`
- **EverShop source:** package metadata version 2.2.1; no Git metadata, so exact source commit is unavailable
- **AgenticLab payload:** `3e779dc31aa581efe07a6426b27767c2a77d4d88`

## Summary

The user approved the complete four-file initialization preview. Pi created and read back exactly `AgenticLab/PROJECT-SCOPE.md`, `AgenticLab/PROJECT-OVERVIEW.md`, `.pi/settings.json`, and `.pi/APPEND_SYSTEM.md`; direct reads confirmed they match the preview. The overview is explicitly partial and records the unknown EverShop source commit. No other files were changed in the reported initialization step.

Pi was restarted by resuming its saved session in a fresh process. The user selected **Trust (this session only)** for `/home/peet/Projects/V5-alpha-tune001/`, not the parent folder. A subsequent `/help` sent through Herdr's agent-prompt interface was handled as ordinary user text and elicited a model-written command list; it is **not** evidence that the slash-command registry itself was directly tested. Later, the tuned `/plan` prompt was successfully invoked in this fresh process and produced a structured PBI 2 plan; this directly verifies `/plan` availability. The other three prompts are present in `.pi/settings.json` but were not individually invoked in this check.

## Acceptance and boundaries

| Check | Result | Evidence/limit |
|---|---|---|
| Exact four-file preview and user approval | Pass | User approved the complete preview before writes. |
| Setup writes and readback | Pass | Pi reported writing only four named files; direct reads match the approved preview. |
| Partial orientation/source provenance | Pass with limitation | EverShop v2.2.1 package metadata; no `.git`, so exact source commit is unknown. Overview limits itself to `README.md`, `package.json`, and `CONTRIBUTING.md`. |
| Project-local trust | Pass for this session | User selected Trust (this session only); parent folder was not trusted. |
| Prompt registration/availability | `/plan` verified; remaining prompts configured | `.pi/settings.json` contains all four prompt paths; an actual `/plan` invocation produced a structured plan. `/initialize-workspace`, `/implement`, and `/premortem` were not individually invoked in this check. |
| App/database/test/dependency use | None reported | No app, PostgreSQL, `.env`, root `data/`, tests, or dependency installation. |
| Scope | Pass based on reports/readback | No host application files beyond the four approved setup targets were changed. No full tree diff was performed. |

## Interpretation and next step

This establishes that the approved AgenticLab payload setup was applied and read back in the new workspace, and that the tuned `/plan` command is available in the fresh trusted process. It does not establish general orientation quality or that every registered prompt works. The PBI 2 replay plan has been generated and awaits user approval before implementation; Herdr remains only an operational channel.

## Data handling

This result uses the Pi report retrieved from the exact Herdr pane and direct reads of the four approved target files. No raw session transcript or application data was copied here. The source copy has no Git metadata; `data/` and `.env` were not inspected.
