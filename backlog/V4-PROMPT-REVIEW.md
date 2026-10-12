# V4 Prompt Inventory and V5 Disposition

**Recorded:** 2026-10-10
**Status:** Complete prompt-source review; recommendations only, not implementation authorization
**Source:** All 25 Markdown prompts under `/home/peet/Projects/AgenticLab-V4/prompts/` (9 delivery, 12 system, 4 utility). V4 text is historical evidence, not a V5 specification.

## Review lens

V5 is default-first with explicit user-invoked workflows; both paths share scope, authorization, verification, and knowledge contracts. V5 should preserve useful outcomes and stop conditions, not V4's fixed personas, memory topology, trigger machinery, adapter setup, or prompt choreography by default. Durable project knowledge needs source/scope and human approval. Routine startup must not rerun a codebase scan.

## Main recommendation

**Prepare one V5 first-use workspace initialization/orientation flow using the purposes of `/agents-startup` and `/warmup` as inputs. Do not port either prompt verbatim.** The user directly invokes the prompt by file path on the first Pi session (before `.pi/` exists); it confirms project scope, performs bounded read-only orientation, previews the project profile and local `.pi` wiring, then applies only approved setup changes. A fresh trusted Pi session activates the extension and registers `/initialize-workspace` for later explicit refresh; neither the first-use flow nor refresh runs automatically on startup.

The three concerns remain distinct:

1. Project identity, scope, and data boundaries (`PROJECT-SCOPE.md`).
2. AgenticLab operating contracts and project-local harness wiring (`AgenticLab/AGENTS.md`, `.pi/settings.json`, `.pi/APPEND_SYSTEM.md`).
3. Source-derived technical orientation: stack, module/package map, entry points and key flows, test approach, safe commands, and known unknowns.

The technical profile should be compact, source-cited, revision/date-stamped, and reviewed before persistence. The current draft places `PROJECT-OVERVIEW.md` beside `PROJECT-SCOPE.md` as a setup artifact, not a knowledge record; V5 knowledge records remain separately governed/retrieved. The first-run prompt prototype now exists at `system/prompts/system/initialize-workspace.md`, but it has not been validated in a delivery workspace. The V4 `/warmup` mechanisms that should **not** be assumed include an eight-agent scan, Graphify installation/builds, generated symbol/co-occurrence indexes, SEMANTIC_MAP population, an always-on DIGEST, and commit-driven automatic re-warming. No app/tests should run as a default orientation step; do not access `.env`, `data/`, dependencies, generated output, or other excluded paths. File writes remain inside the reviewed `AgenticLab/` and `.pi/` installation footprint; never scaffold/overwrite host application paths.

### Preserve from `/agents-startup`

- Detect first-use versus already-initialized state.
- Confirm project identity/scope and explain the exact setup/orientation actions before writes.
- Keep host-specific Pi setup local and capability-aware; show conflicts and stop rather than overwriting.
- Distinguish one-time initialization from ordinary fresh-session operation.

### Do not port from `/agents-startup`

- Mandatory installation across Pi/Copilot/Cursor, custom V4 loaders, root-level instruction-file creation, global Pi changes, token-budget tuning, Git-hook mutation, automatic Graphify setup, and the old `SYSTEM_CORE.md` layout.
- Its Path B ritual of loading all MOCs/maps/personas on every session. V5 already starts task-first and selectively reads knowledge.

### Preserve from `/warmup`

- Source-based discovery of high-value project landmarks: languages/frameworks, package/module responsibilities, entry points, important flows, test conventions, and costly/non-obvious constraints.
- Size/scope awareness, explicit coverage limitations, source verification, and a completion report that says what was and was not inspected.

### Do not port from `/warmup`

- Scanning every domain through eight fixed personas; copying ordinary code-derived facts into multiple persona MOCs; full-codebase co-occurrence analysis; mandatory flow diagrams, symbol indexes, semantic graphs, or DIGEST generation; automatic re-warmup on Git changes; and broad memory seeding without item-level review.

## Prompt-by-prompt disposition

### Delivery prompts

| V4 prompt | V5 disposition | Reason / trigger |
|---|---|---|
| `delivery/plan.md` | **Already adapted; retain the V5 prototype, not V4 text.** | V5 version is default-first, source/evidence-aware, avoids fixed persona chains and effort scoring, keeps planning separate from implementation, and consolidates approval. Continue evaluation against real tasks. |
| `delivery/implement.md` | **Already adapted; retain the V5 prototype.** | V5 requires an approved plan, limits work to its scope, validates only approved/safe checks, and keeps knowledge candidates task-local rather than forcing phase-by-phase memory/log/checkpoint writes. |
| `delivery/premortem.md` | **Already adapted; retain the V5 prototype.** | V5 version is a bounded, read-only review of specified existing code and avoids V4's automatic memory/log writes and fixed checklist volume. |
| `delivery/debug.md` | **Consider next, triggered by a real root-cause investigation.** | The diagnosis-versus-implementation boundary, evidence, competing hypotheses, and fix handoff are useful. Rebuild as a focused default-compatible diagnostic workflow; no mandatory Explorer/Debugger/Senior cascade or fixed eight-step ritual. |
| `delivery/fix.md` | **Do not port as a composite command.** | It merges build-error fixing and QA triage/diagnosis/implementation/review into a large router that overlaps `/debug`, `/implement`, `/test`, and `/review-pr`. Retain useful bounded triage/stop conditions within appropriate workflows. |
| `delivery/test.md` | **Candidate after a real post-implementation coverage use case.** | Requirement-derived gap analysis is useful, but clarify whether V5 needs test planning, writing, execution, or all three. Ordinary approved implementation should include its own task-specific validation; a separate flow must not invent behavior or run unsafe suites. |
| `delivery/review-pr.md` | **Candidate after a real PR review.** | Independent review, requirements-first scenarios, incremental scope, and risk-based routing may help. Adapt to V5's scoped evidence and optional independent judgment; do not require the full Explorer/Tester/Reviewer/UX chain for every change or assume Graphify. |
| `delivery/implementation-report.md` | **Need-triggered; not core.** | A stakeholder report can be generated from verified task state when requested. V5's normal completion summary is enough absent a recurring handoff/report need; do not add a Communicator persona/checkpoint dependency. |
| `delivery/resume-flow.md` | **Defer with checkpoint/recovery.** | Resume from a confirmed task checkpoint can help genuinely interrupted multi-phase work, but V5 has not yet shown that need. Revalidate current source and authorization; Pi's native `/resume` name is reserved and must not be reused. |

### System prompts

| V4 prompt | V5 disposition | Reason / trigger |
|---|---|---|
| `system/agents-startup.md` | **High-priority adaptation input** for one-time workspace initialization; combine its first-use role with `/warmup`'s orientation purpose. | Preserve setup-state detection, scope confirmation, visible previews, and host-local wiring. Do not make the V4 installer, hooks, graph setup, global tuning, or routine session-start choreography part of V5. |
| `system/warmup.md` | **High-priority adaptation input** for the one-time technical orientation described above. | Preserve project understanding, not its full memory-generation machinery. V5 currently has no equivalent; Alpha scope/index loading did not seed technical context. |
| `system/domain.md` | **Optional, need-triggered.** | Business-language domain/action maps may help on a complex product when real tasks repeatedly fail to navigate from user terms to code. Do not require it for initialization or automatically write semantic trigger maps. |
| `system/guided-tour.md` | **Optional human-facing deliverable.** | A linear onboarding tour serves teammates, not the machine-oriented fresh-session profile. Consider only when human onboarding is requested; derive it from verified sources, not mandatory warmup/persona memory. |
| `system/memory-sync.md` | **Potential explicit import procedure, not a general seed path.** | User-supplied decisions/specs may be converted into scoped candidates with provenance and review. Never mine/import V4 workspaces or silently promote pasted material. Consider when a real batch of external decisions needs filing. |
| `system/recover-session.md` | **Do not port its raw-JSONL scan.** | V5 avoids raw session-history mining; transcripts can expose sensitive content. Prefer Pi-native session continuation and, if interrupted real work justifies it, a task-aware checkpoint/recovery procedure with fresh authorization checks. |
| `system/refine.md` | **Defer until the V5 knowledge corpus grows.** | V5 has curated MOCs and atomic records, so later consolidation may be useful. Re-derive rules for the V5 schema; do not import V4 hot/cold tags, aging thresholds, SEMANTIC_MAP rewrite steps, or automatic promotion. |
| `system/retro.md` | **Defer; consider only after repeated real corrections/logs.** | Learning from repeated corrections is valuable, but V5 does not mandate V4 session logs, fixed cadence, digest refresh, or memory writes. Use targeted, human-approved synthesis if a repeated pattern appears. |
| `system/review-memory.md` | **Future V5 knowledge-audit candidate.** | Checking claims, scope, provenance, conflicts, and stale pointers can protect a real corpus. Rebuild a proportionate audit around V5's record contract when persistence/corpus maintenance is in use; omit V4 tier, DIGEST, graph, and 30-check assumptions. |
| `system/triage.md` | **Future candidate if reviewed candidates accumulate.** | Its explicit resolve/skip interaction aligns with human authority, but V5 records already distinguish candidate/active status and writes require approval. Do not create V4 tentative/lens-authored taxonomies or self-instrumenting counters without evidence. |
| `system/extract-skill.md` | **Defer under C06.** | Procedure promotion may help after repeated, validated use. Do not port the fixed three-instance threshold, V4 persona wiring, semantic-map schema, or global skill catalog. |
| `system/system-health.md` | **Do not port in V4 form.** | Its extensive prompt/adapter/memory inventory and runtime counters target V4's architecture and conflict with V5's evidence-first minimalism. Add a small install/capability check only for a concrete operational need. |

### Utility prompts

| V4 prompt | V5 disposition | Reason / trigger |
|---|---|---|
| `util/checkpoint.md` | **Candidate only after a real interruption/restart need.** | A concise task-state snapshot is useful, but V5's C05 says not to add a project checkpoint pre-emptively. A checkpoint must not authorize resumption. |
| `util/diff.md` | **Do not port as a Graphify-dependent utility now.** | Risk classification from graph reports/semantic maps is not part of the current V5 baseline; ordinary bounded diff review can use current source or a future `/review-pr` flow. Revisit if repeated change-impact misses justify a separate tool. |
| `util/take-note.md` | **Optional separate user-reference filing capability.** | It carefully separates user notes from agent memory and requests approval, which is conceptually sound. V5 has no user-notes collection yet; consider only when users ask to retain specs/PR reports outside project knowledge. |
| `util/remove-note.md` | **Only alongside an approved notes collection.** | Safe deletion plus index consistency is useful once `/take-note` exists, but destructive deletion must stay explicitly confirmed and collection-scoped. |

## Recommended consideration order

1. **First-use initialization/orientation** (adapt `/agents-startup` + `/warmup` purposes) — prompt prototype prepared; next validate it in a fresh delivery workspace. Check direct file-reference startup before `.pi/`, exact safe-source allowlist, combined approval preview, local Pi wiring, restart/trust, and fresh-session overview loading.
2. **`/debug`** — the next delivery-flow candidate when a real root-cause task can test whether a dedicated read-only diagnosis/handoff improves on default work.
3. **`/test` and `/review-pr`** — revisit separately on real post-implementation coverage and PR-review tasks; decide their boundaries from observed needs, not by porting the V4 chain.
4. **Checkpoint/resume and knowledge maintenance prompts** — revisit only after actual interruption or durable-corpus growth supplies evidence.
5. **All other prompts** — keep their outcomes visible as need-triggered possibilities; no broad prompt library, skill catalog, session-health system, or multi-agent runtime is a V5 prerequisite.

This is a recommendation about what to design/consider. It does not approve prompt implementation, adapter changes, new files in a delivery workspace, or V4 knowledge import. The three existing V5 delivery prototypes remain the only prompt prototypes currently available in the canonical payload.
