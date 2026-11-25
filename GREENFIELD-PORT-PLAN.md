# Greenfield Variant Port Plan — AgenticLab v5

**Goal:** Create a working greenfield variant of AgenticLab v5 by copying and adapting the C03-clean-payload.

**Status:** `proposal` — never executed. Kept at the repository root intentionally as an open direction; it is not an approved plan and authorizes nothing. Recorded 2026-11-08; paths below are local and historical.

**Target location:** `/home/peet/Projects/V5-greenfield`

---

## Core principle (from discussion)

- **Clean payload = pre-initialization state.** Everything that exists before running `/initialize-workspace`.
- Anything in exp4's `AgenticLab/` that isn't in the clean payload is initialization output (PROJECT-SCOPE.md, PROJECT-OVERVIEW.md, `config/knowledge-capture-policy.json`, `.pi/` wiring, `INDEX.md`, `records/`).
- **Warmup: left out.** No knowledge to seed in greenfield.
- **Knowledge interface: same as delivery.** Only difference — starts empty, accumulates after implementations.
- **Project-specific mechanisms: left out.** Only greenfield-value patterns added.

---

## Phase 0 — Prerequisites (Done)

- [x] C03-clean-payload validated and pushed (commits `ddfeb7d`, `7a2a81b`, `95f4b83`, `68a1df2`, `d5e3efd`)
- [x] C03-clean-payload contains V5-native core infrastructure:
  - `adapters/pi/` — knowledge capture, write-gate, metrics
  - `brain/` — `knowledge-contract.md`, `operating-contract.md`
  - `prompts/delivery/` — `/plan`, `/implement`, `/premortem`
  - `config/knowledge-capture-policy.template.json`
  - `prompts/system/initialize-workspace.md`
  - `AGENTS.md` — operating instructions
- [x] Greenfield backlog item exists in V4 (`knowledge/improvements/backlog/agents-empty-startup-greenfield-variant.md`) — **design reference only**

---

## Phase 1 — Copy & Structure (not yet executed — repo not created)

| Step | Action | Notes |
|------|--------|-------|
| 1.1 | Create target directory: `mkdir -p /home/peet/Projects/V5-greenfield` | |
| 1.2 | Copy entire C03-clean-payload → V5-greenfield | `cp -r /home/peet/Projects/C03-clean-payload/* /home/peet/Projects/V5-greenfield/` |
| 1.3 | Initialize git repo in V5-greenfield | `git init; git add -A; git commit -m "chore: copy clean payload as greenfield base"` |
| 1.4 | Verify copy integrity | `diff -r /home/peet/Projects/C03-clean-payload /home/peet/Projects/V5-greenfield` (excluding .git) |

---

## Phase 2 — Greenfield Startup Prompt (`agents-empty-startup.md`)

Create the greenfield startup prompt as a **new system prompt**, V5-native. No V3/V4 references.

| Step | Action | Notes |
|------|--------|-------|
| 2.1 | Create `prompts/system/agents-empty-startup.md` | V5-native conventions only |
| 2.2 | Harness detection (pi, Copilot, Cursor, other) | Same pattern as delivery, but greenfield context |
| 2.3 | Simplified questionnaire (6 questions): | |
| | • Project name/type | |
| | • Primary language | |
| | • Framework(s) | |
| | • Build tool | |
| | • Assignment / Goal (optional) | |
| | • Stable project key (for knowledge scope) | |
| 2.4 | Skip `/warmup` — no knowledge to seed | Documented as intentional greenfield divergence |
| 2.5 | Skip Graphify/structural graphs — no existing code | Documented as intentional greenfield divergence |
| 2.6 | Hand off to `/plan` | Memory grows from session work |
| 2.7 | Frontmatter: `name: /agents-empty-startup`, description, argument-hint | |
| 2.8 | Register in Pi `prompt-loader.ts` (if present) | |
| 2.9 | **No V3/V4 paths, version labels, or brain modules** | Only V5 paths |

---

## Phase 3 — Adapter Routing & Wiring

| Step | Action | Notes |
|------|--------|-------|
| 3.1 | Pi adapter: `adapters/pi/prompt-loader.ts` | Add `agents-empty-startup` to prompt registry |
| 3.2 | Copilot adapter: add routing row | `/agents-empty-startup` → `AgenticLab/prompts/system/agents-empty-startup.md` |
| 3.3 | Copilot adapter: create wrapper file | `adapters/github-copilot/prompts/agents-empty-startup.prompt.md` |
| 3.4 | Cursor adapter: add routing entry | `@AgenticLab/prompts/system/agents-empty-startup.md` |
| 3.5 | Verify all three adapters register greenfield variant | No V3/V4 leftovers |

---

## Phase 4 — Validation Guide (`GREENFIELDVAL.md`)

V5-native validation guide for greenfield variant.

| Step | Action | Notes |
|------|--------|-------|
| 4.1 | Create `GREENFIELDVAL.md` in V5-greenfield root | C03-clean-payload paths |
| 4.2 | Surfaces: | |
| | • Surface A — Prompt inventory (greenfield variant) | `prompts/system/agents-empty-startup.md` |
| | • Surface B — Greenfield vs delivery parity | Document intentional divergences (skip warmup, skip Graphify, simplify questionnaire) |
| | • Surface C–H — Routing, session protocol, no dev refs, variant parallelism | |
| | • Checks G1–G15+ — Automated validation commands | C03-clean-payload paths |
| 4.3 | Known intentional gaps section | Empty knowledge state at start is by design |

---

## Phase 5 — Initialization Flow Integration

`initialize-workspace.md` works the same for greenfield as delivery — no changes needed.

| Step | Action | Notes |
|------|--------|-------|
| 5.1 | Verify `initialize-workspace.md` creates all scaffold files | `INDEX.md`, `knowledge/records/.gitkeep`, `config/knowledge-capture-policy.json`, `.pi/` wiring |
| 5.2 | Test greenfield initialization end-to-end | Copy V5-greenfield to temp workspace, run `/agents-empty-startup`, then `/initialize-workspace` |
| 5.3 | Confirm knowledge starts empty | `records/` empty, `INDEX.md` has no records linked |

---

## Phase 6 — Documentation & Quickstart

| Step | Action | Notes |
|------|--------|-------|
| 6.1 | Update `README.md` | Document both variants: delivery and greenfield |
| 6.2 | Update `QUICKSTART.md` (or create) | Greenfield path: copy payload → `/agents-empty-startup` → `/initialize-workspace` → `/plan` |
| 6.3 | Update `MANUAL.md §8` | Mention greenfield variant alongside delivery variant |

---

## Phase 7 — Validation & Smoke Test

| Step | Action | Notes |
|------|--------|-------|
| 7.1 | Run GREENFIELDVAL.md checks manually | G1–G15+ |
| 7.2 | Run adapter regression suite | `node --test adapters/pi/tests/*.test.mjs` (57 passed/2 skipped baseline) |
| 7.3 | Run `node --check` on all `.mjs`/`.ts` files | |
| 7.4 | Run `git diff --check` | |
| 7.5 | End-to-end greenfield smoke test: | |
| | • Fresh temp workspace | |
| | • Copy V5-greenfield payload as `AgenticLab/` | |
| | • Run `/agents-empty-startup` (harness detection, questionnaire) | |
| | • Run `/initialize-workspace` (preview + approve) | |
| | • Restart Pi, grant trust | |
| | • Run `/plan` with a sample PBI | |
| | • Verify knowledge capture works (candidate → stage → promote) | |
| | • Verify knowledge starts empty, accumulates after /implement | |

---

## Phase 8 — Commit & Push

| Step | Action | Notes |
|------|--------|-------|
| 8.1 | Split into logical commits | |
| | • `feat(greenfield): add agents-empty-startup prompt` | |
| | • `feat(greenfield): add adapter routing for greenfield variant` | |
| | • `docs(greenfield): add GREENFIELDVAL.md validation guide` | |
| | • `docs(greenfield): update README/QUICKSTART/MANUAL for greenfield` | |
| | • `chore(greenfield): validation and smoke test fixes` | |
| 8.2 | Push to origin (if remote exists) | `git push -u origin main` |

---

## Dependencies & Risks

| Risk | Mitigation |
|------|------------|
| Pi `prompt-loader.ts` not in clean payload | If missing, add minimal loader or document manual invocation pattern |
| `GREENFIELDVAL.md` checks need V5 paths | Update all shell commands to C03-clean-payload structure |
| Greenfield questionnaire fields | Keep V5 clean payload's initialization questions; simplify where greenfield-specific |
| Knowledge contract semantics for empty start | Verify `knowledge-contract.md` supports zero-record state |
| Adapter regression suite baseline | 57 passed / 2 skipped in C03-clean-payload — must not regress |

---

## Estimated Effort

| Phase | Est. Time |
|-------|-----------|
| Phase 1: Copy & Structure | 15 min |
| Phase 2: Greenfield Prompt | 60–90 min |
| Phase 3: Adapter Routing | 30–45 min |
| Phase 4: Validation Guide | 45–60 min |
| Phase 5: Initialization Integration | 30 min |
| Phase 6: Documentation | 30 min |
| Phase 7: Validation & Smoke Test | 60–90 min |
| Phase 8: Commit & Push | 15 min |
| **Total** | **~4–5 hours** |

---

## Go/No-Go Criteria

**Proceed to Phase 2+ when:**
- [ ] Target directory created and clean payload copied
- [ ] Git repo initialized with clean baseline commit

**Proceed to Phase 7 when:**
- [ ] All adapter routes registered (Pi, Copilot, Cursor)
- [ ] `GREENFIELDVAL.md` checks pass manually
- [ ] `initialize-workspace.md` creates complete scaffold in test run

**Ship when:**
- [ ] End-to-end smoke test passes (greenfield workspace → `/plan` → knowledge capture)
- [ ] Knowledge starts empty, accumulates after `/implement`
- [ ] Adapter regression suite: 57 passed / 2 skipped (or better)
- [ ] `node --check` clean, `git diff --check` clean

---

## Reference Files (V5-native only)

| File | Location |
|------|----------|
| Clean payload base | `/home/peet/Projects/C03-clean-payload/` |
| Clean payload initialize-workspace | `/home/peet/Projects/C03-clean-payload/prompts/system/initialize-workspace.md` |
| Clean payload AGENTS.md | `/home/peet/Projects/C03-clean-payload/AGENTS.md` |
| Clean payload knowledge-contract | `/home/peet/Projects/C03-clean-payload/brain/knowledge-contract.md` |
| Clean payload operating-contract | `/home/peet/Projects/C03-clean-payload/brain/operating-contract.md` |
| Clean payload adapters/pi | `/home/peet/Projects/C03-clean-payload/adapters/pi/` |
| Clean payload delivery prompts | `/home/peet/Projects/C03-clean-payload/prompts/delivery/` |