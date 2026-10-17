# AgenticLab V5 Alpha baseline — v0.1

- **Baseline ID:** `ALPHA-BASELINE-001`
- **Version:** `0.1` (initial descriptive snapshot)
- **Frozen:** 2026-10-17
- **Workspace:** `V5-alpha-sandbox` (fresh EverShop copy)
**Purpose:** Establish a first measured reference for AgenticLab V5 initialization and two bounded UI delivery tasks.

## What this baseline means

This is a **descriptive first-use baseline**, not a validated performance baseline or a comparison against plain Pi. It records the setup and task outcomes observed in one delivery workspace, together with privacy-minimized session metrics.

The strongest supported claim is that AgenticLab V5 guided a supervised initialization and two bounded EverShop UI PBIs through isolated acceptance tests. The evidence does not establish a general quality, productivity, or cost advantage.

## Conditions and provenance

- **Target:** `/home/peet/Projects/V5-alpha-sandbox/`, a fresh EverShop copy.
- **AgenticLab payload:** local test build based on `8280a9a0035aca185c9e9d50b729d5da85e9be9b`; not a clean published revision.
- **Pi:** 1.2.0 for the recorded runs; model/provider `openrouter-custom` / `openai/gpt-6-luna`, thinking level `medium` in the extracted sessions.
- **Browser validation:** system Chromium 152; Playwright and harness dependencies were temporary, lock-versioned, and installed outside the EverShop repository with lifecycle scripts disabled. Sass was added after a separate approval. The temporary symlink, dependency tree, and generated bundles were removed after the final PBI 2 run.
- **Records:** [`ALPHA-INIT-001`](../results/ALPHA-INIT-001.md), [`ALPHA-PBI1-001`](../results/ALPHA-PBI1-001.md), [`ALPHA-PBI2-001`](../results/ALPHA-PBI2-001.md), [session metrics](../metrics/ALPHA-20261016-PI-SESSION-METRICS.csv), and [tool round-trip metrics](../metrics/ALPHA-20261016-TOOL-ROUNDTRIPS.csv).

## Delivery flows observed

| Flow | Pi/session measures | Outcome | Interpretation boundary |
|---|---|---|---|
| **Initialization (`ALPHA-INIT-001`)** | Isolated worker session: 8 user messages, 13 assistant messages, 17 calls (13 reads, 4 writes), 4 read tool results flagged `isError`; 282,782 total tokens; $0.011769 Pi-reported cost. First user prompt to final setup response: 23m34s elapsed. | Four approved setup files were written/read back; fresh Pi discovered context, extension, and prompt; explicit read-only scope/profile availability check passed. Orientation remained partial. | The session span includes pauses; it is not active or hands-on time. A tool `isError` flag is not a task failure. No app/source/test/DB validation. |
| **Initialization activation check** | Separate fresh-session check: 1 user message, 3 assistant messages, 4 reads; 22,280 tokens; $0.001416; 2m24s elapsed. | Pointer/profile files were available and read when explicitly requested. | Does not prove autonomous loading on an unrelated task. This check is separated from both PBI windows. |
| **PBI 1 — quantity selector** | Delivery Pi window: 9 user messages, 62 assistant messages, 116 calls (83 reads, 10 writes, 22 edits, 1 Bash); 27 tool results flagged `isError`; 5,634,109 tokens; $0.131847; 7h16m54s elapsed window. | Isolated quantity-selector/cart UI-dispatcher suite passed **6/6** after harness corrections. Three direct Playwright commands were issued from the coordinator session; two had nonzero tool status and the final run passed. | The Playwright suite did not run inside the Evershop delivery Pi session. Tests used mocked surrounding cart/service state; no running storefront, backend, or PostgreSQL. |
| **PBI 2 — image viewer** | Delivery Pi window: 14 user messages, 72 assistant messages, 89 calls (42 reads, 11 writes, 25 edits, 11 Bash); 13 tool results flagged `isError`; 17,999,351 tokens; $0.419908; 5h33m47s elapsed window. Eleven Playwright command calls occurred in the delivery session; nine had nonzero tool status and two exited cleanly. | Final post-cleanup suite passed **4/4**, using the actual `Media` component and real `react-slick`. The modal navigation fix sets `waitForAnimate: false`. | Isolated static browser fixture, not the running EverShop storefront or backend. Test-command error flags are not the count of failed test cases. |

The two PBI suites therefore ended with **10/10 final isolated acceptance cases passing**. This count is descriptive only; it is not a reliability rate, quality score, or comparison across task difficulty.

## Setup and coordinator accounting

Coordinator/master Pi windows are kept separate from delivery-worker costs:

| Window | Measures | Use |
|---|---|---|
| Initialization preflight through activation check | 15 user messages, 112 assistant messages, 120 calls; 46,154,790 tokens; $1.004984. | Coordinator/preflight/reporting window, not the isolated initializer's worker cost. |
| PBI 1 calendar window | 29 user messages, 135 assistant messages, 134 calls; 107,593,488 tokens; $2.463213. | Includes coordination, planning/review/document work, and external validation activity; keep separate from the delivery Pi cost. |
| PBI 2 calendar window | 32 user messages, 157 assistant messages, 154 calls; 50,511,137 tokens; $1.192780. | **Mixed and not attributable:** includes operational Herdr handling/research. Do not add it to PBI 2 or AgenticLab totals. Herdr is outside this experiment. |

The full Evershop Pi session reports 209 tool calls, 23,655,740 tokens, and $0.553171 across the activation check and both PBIs. Its run windows account for all 209 calls. The separate initializer worker session cost is not part of that Evershop-session total.

## Measurement caveats

- Run windows are bounded by session prompts and responses. Wall-clock spans include idle gaps, approval waits, and pauses; active time and user hands-on time are unavailable.
- Costs and tokens are Pi-reported usage aggregates. Cached input is kept separate in the source CSV. They are not invoices or direct measures of effort.
- `tool_result_isError` counts are raw flags, not test failures. The metrics record test-command attempts separately from final case outcomes.
- The PBI 2 coordinator window contains Herdr-related activity. Herdr was used only as an operational session-control channel; it is not an AgenticLab mechanism or evaluation result.
- No control/baseline run with plain Pi was conducted. No full application build, running EverShop app, full Jest/E2E suite, backend, or PostgreSQL persistence test was performed.
- The complete source diffs were not independently audited. The local test payload is not a clean published revision.
- Raw Pi session bodies were not copied into the metrics files. Exact session IDs remain in the local handoff and Pi session store.

## Candidate tuning themes

These themes are evidence-informed candidates, not approved code or prompt changes:

1. Preflight the full test dependency/style/browser path before implementation.
2. Make isolated harness startup and temporary-output cleanup robust.
3. Keep tests behavior-first and diagnostic instrumentation out of production source.
4. Preserve the bounded remediation/approval gate while reducing repetitive handoffs.
5. Improve metric capture boundaries, especially separating setup, delivery-worker, and coordinator effort.

## Versioning policy

- Treat v0.1 as an immutable snapshot of the first observed Alpha runs. Do not rewrite its values when future results arrive.
- Add future run measurements to the metrics dataset with their own run IDs, session role, boundary, and conditions; link the corresponding result report.
- Create a new baseline version (v0.2, etc.) only after reviewing new comparable evidence or changing metric definitions. Record the reason and preserve v0.1.
- Any comparative-effectiveness claim requires a separately preregistered baseline/control or paired run under declared conditions.
