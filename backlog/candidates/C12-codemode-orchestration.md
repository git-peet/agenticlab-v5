# V52-C12 — Codemode-assisted Pi tool orchestration and context shaping

**Status:** `candidate` — user-approved to preserve for future consideration; not selected for design or implementation

**Implementation readiness:** **Not ready for adoption.** Pi 1.2.0 provides Codemode, but no V5 comparison or task-level benefit has been demonstrated, and the previously exercised Evershop host used Pi 1.1.0.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C03 context engineering](C03-context-engineering.md), [C08 runtime and adapters](C08-runtime-adapters.md), [C09 Jev decisions](C09-jev-decisions.md)

## Purpose / value hypothesis

Explore whether Pi's built-in `codemode` capability can make selected multi-tool operations more efficient, bounded, or inspectable by letting a JavaScript script compose Pi tools, filter/aggregate their results, and return only task-relevant output to the model.

Potentially relevant V5 use cases include:

- complete, scope-safe project-knowledge retrieval: enumerate records, inspect bounded metadata, filter for eligible scope/status, then search eligible files without exposing excluded-record body snippets;
- repeated multi-source reads or large tool results where aggregation can reduce model-visible context;
- bounded parallel read-only calls when the calls are independent.

These are hypotheses. Codemode may reduce model-visible output or round trips without reducing underlying tool work, and its script-generation/approval overhead may outweigh that benefit on ordinary tasks.

## Evidence and limits

- The [official Pi Codemode documentation](https://pi.dev/docs/latest/codemode), corroborated against Pi 1.2.0's local `docs/codemode.md`, `docs/cli.md` (`Enable codemode`), `docs/settings.md` (`Tools`), and `docs/extensions.md` (`Tool exposure`), describes Codemode as a built-in, opt-in tool. The current local Pi binary is 1.2.0. It can be enabled for one invocation with `pi --tools +codemode` or through `defaultTools: ["+codemode"]`; neither has been configured for V5.
- Scripts run as JavaScript in a QuickJS sandbox without direct Node APIs, filesystem, network, or timers. External access is through Pi tools and the non-chat `models` API. Tool calls made by a script are real operations; calls completed before script failure are not rolled back.
- Pi's tool-execution documentation says nested calls pass through the usual `tool_call` and `tool_result` handlers and carry `parentToolCallId`. This is promising for preserving host approval gates, but the V5 knowledge gate has not been behaviorally tested through Codemode calls.
- V5 already has Pi-local, human-confirmed knowledge writes and bounded read instructions. Its two-phase knowledge-search contract filters metadata before body search because native grep may otherwise expose matched lines from ineligible records. Codemode could orchestrate that sequence, but scripts would still need exact scope, completeness, and error handling.
- No V5 task has compared direct native-tool use against Codemode for correctness, quality, latency, context/tokens, actual tool-call volume, or approval interruptions. Availability and API capability are not evidence of AgenticLab benefit. Pi 1.1.0 was used in earlier Evershop smokes; compatibility there is unverified.

**Evidence grade:** current Pi 1.2.0 documentation and installed CLI establish capability/availability only. Any V5 value, safety, cost, or performance claim remains untested.

## V5-shaped disposition

If revisited, treat Codemode as an **optional Pi adapter/runtime capability** serving a narrowly bounded, task-selected operation. Keep V5's operating, scope, knowledge, and authorization semantics in host-neutral contracts; provide a direct-tool fallback on hosts or tasks where Codemode is unavailable or not worthwhile. C03 owns context-selection questions; C08 owns Pi capability and adapter-boundary questions.

Codemode does not make V5's core depend on JavaScript scripts, and tool filtering is not a license to broaden task scope. A script's reads, writes, shell use, and model calls remain governed by the same scope and host controls as equivalent direct tool calls. The current V5 gate's behavior and approval experience must be verified through nested Codemode calls before relying on it.

## Evaluation if the trigger is met

Compare Codemode against direct native tools on one approved, representative task with the same workspace scope and tool permissions. Prefer a read-only task where the proposed benefit is fewer model round trips or smaller model-visible results; if evaluating writes, use a disposable fixture and verify both rejection and approval paths.

Record at least:

- correctness and completeness, including whether a no-match claim follows a complete eligible-scope scan;
- exact nested tool calls/paths and any excluded or unnecessary reads;
- model-visible input/output or other context-size evidence, total tool calls, wall time, and model cost where available;
- user-visible approval count and any false prompts;
- script failures, partial side effects, and the behavior of the direct-tool fallback.

Retain Codemode for that use only if it provides a material, repeatable benefit without weakening scope, write approval, or retrieval transparency. A single smoke test proves API activation, not product value.

## Explicit exclusions / non-goals

- No global or project-wide enablement, custom Codemode extension, general orchestration framework, or mandatory code-mode usage is selected.
- No direct filesystem/network access, automatic task router, unrestricted autonomous loop, or safety bypass is implied.
- Codemode's ability to invoke classifier models does **not** reopen C09 or authorize Jev; C09 remains parked by explicit user direction.
- Image generation, external MCP services, and semantic caching are not part of this candidate absent a separate concrete need.

## Revisit trigger / next safe action

Revisit only when a real approved task exposes a specific problem that Codemode might solve—for example, repeated serial read/tool round trips, large irrelevant tool outputs, or a retrieval-completeness/scope-filtering gap that direct tools handle poorly. First confirm the target Pi version and available tools, then propose one bounded A/B task and its safety/measurement plan. **This candidate is not authorization to enable Codemode or change runtime/configuration.**
