# Alpha Pi session metrics

These files contain privacy-minimized aggregates for the first two EverShop PBI runs. They are intended for later analysis, not as a replacement for the interpreted result records.

## Files

- [`ALPHA-20261016-PI-SESSION-METRICS.csv`](ALPHA-20261016-PI-SESSION-METRICS.csv): separate rows for the initialization worker session, fresh-session check, PBI delivery windows, coordinator windows, and the full Evershop session total.
- [`ALPHA-20261016-TOOL-ROUNDTRIPS.csv`](ALPHA-20261016-TOOL-ROUNDTRIPS.csv): per-tool counts and timestamp-derived call-to-result deltas.
- Current master/sandbox resume IDs are in the private/local [`SESSION-HANDOFF-2026-10-17.md`](../../SESSION-HANDOFF-2026-10-17.md). The initializer session ID is not copied here; its exact session file was identified by a date-and-CWD-limited metadata lookup and matched the initialization markers. No session body or transcript is copied here.

## Sources and window boundaries

The delivery-agent PBI source is the exact `evershop-sandbox` Pi session. The initialization run used a separate session in the same target workspace, identified by a bounded date/CWD/header scan and confirmed by its `ALPHA-INIT-001`/initializer markers. The fresh-session pointer check is a later window in the known `evershop-sandbox` session. PBI windows are defined by the user prompts in that session:

- PBI 1 starts at `2026-10-16T08:03:01.730Z` (the first PBI 1 `/plan`/`/implement`/`/premortem` prompt) and ends immediately before the next PBI 2 planning prompt at `2026-10-16T15:19:55.339Z`.
- PBI 2 starts at `2026-10-16T15:19:55.339Z` and ends at its final cleanup/verification response at `2026-10-16T20:53:42.832Z`.
- The initialization worker session's first user prompt is `2026-10-15T12:25:51.668Z`; its final setup response is `12:49:25.425Z`. The session header was created at `12:22:43.551Z` in `/home/peet/Projects/V5-alpha-sandbox`. A recorded user approval at `12:49:14.982Z` precedes the four setup write calls at `12:49:14.993Z`. The separate fresh-session availability check runs from `13:21:42.660Z` to `13:24:07.000Z`. The master coordinator's broader initialization window is `12:24:18Z`–`13:24:07Z` and is reported separately.

The `agenticlab-master` rows use those same UTC windows as **calendar-window coordination summaries**. They are intentionally separated from the delivery-Pi rows. The PBI 2 master window includes Herdr operations/research and other coordination activity; the user has explicitly clarified that Herdr is only an operational channel, not part of the AgenticLab experiment. Do not add that mixed master-window row to PBI 2's implementation cost or claim that it measures AgenticLab performance.

## Metric definitions and caveats

- `user_messages`, `assistant_messages`, and tool-call counts are counts of Pi session entries in the selected window. They are not counts of human minutes or useful work.
- `read_calls`, `write_calls`, `edit_calls`, `bash_calls`, and the web-tool columns count Pi tool-call blocks by tool name.
- `tool_result_isError_flags` counts `toolResult.isError == true`. It is a raw error signal; it is **not** a test-failure rate. It includes expected harness/build/test blockers and other tool-level failures.
- `input_tokens_uncached`, `cache_read_tokens`, and `cache_write_tokens` are kept separate. `total_tokens` is the Pi session's aggregate token usage, including those categories plus output. `reported_cost_usd` sums Pi's per-assistant-message `usage.cost.total` values; it is not an invoice or a comparison against another workflow.
- `playwright_commands_in_session` counts direct test-command calls in that Pi session, not every test run by the coordinating tool. PBI 1's Playwright suite was run outside the Evershop delivery session; PBI 2 had 11 Playwright command calls in its delivery session (9 tool results with nonzero status, 2 clean exits), with final post-cleanup acceptance 4/4.
- `acceptance_tests_passed/total` comes from the interpreted result record; it is not inferred from the session command count.
- `window_span_seconds` is elapsed calendar time between the chosen prompt boundaries. It includes pauses, approvals, and idle gaps; it is **not active time or hands-on time**.
- The tool round-trip file subtracts the assistant tool-call-entry timestamp from the corresponding tool-result-entry timestamp. These are approximate recorded intervals, not guaranteed execution time; parallel calls can overlap, and they should not be summed as labor hours.
- The full Evershop session aggregate includes the fresh-session initialization availability check plus PBI 1 and PBI 2. The separate initializer session and master coordinator windows are not part of that delivery-session aggregate.
- Coordinator-session values are kept separate because they include planning, review, document work, and operational handling. PBI 2's coordinator window is explicitly mixed and not attributable.

## Extraction method

Only the exact known master/PBI sessions, the one initializer session, and the fresh-session check were processed. To identify the isolated initializer session, a metadata-only lookup was limited to JSONL headers in the exact `V5-alpha-sandbox` session directory and Oct 15 run window; only the session matching the target CWD and initialization markers was aggregated. No other workspace/session bodies were inspected. Local scripts parsed JSONL metadata and usage fields, counted tool-call/result entries, calculated timestamp windows, and emitted aggregates. No prompt, source, tool-argument, or tool-result text was copied into these records.

## ALPHA-DELIVERY-001 (2026-11-24)

Produced by `AgenticLab-tools/session-metrics.mjs` rather than by hand, so the same schema can be
regenerated for any run:

- [`ALPHA-DELIVERY-001-SESSION-METRICS.csv`](ALPHA-DELIVERY-001-SESSION-METRICS.csv) — one row per
  declared window (five PBIs across four Pi sessions).
- [`ALPHA-DELIVERY-001-TOOL-ROUNDTRIPS.csv`](ALPHA-DELIVERY-001-TOOL-ROUNDTRIPS.csv) — call-to-result
  deltas per tool and window.
- [`ALPHA-DELIVERY-001-GATE-BLOCKS.csv`](ALPHA-DELIVERY-001-GATE-BLOCKS.csv) — governance refusals by
  category, tool, and count, with a truncated first-line reason. The earlier manual pass had no such
  column, so block behaviour was invisible in its numbers.

Two additions to the definitions above:

- `gate_blocks` counts tool results that a governance adapter refused, classified by the refusal's
  stable opening text. It is **not** an error rate and not a safety score: a wrong block is friction,
  a missing block is a hole, and only the run result can judge which occurred.
- Approval prompts and confirmations remain uncaptured. The confirm dialog leaves no trace in the
  session file, so their count and latency are operator-recorded or unavailable.

## ALPHA-KNOWLEDGE-TRANSFER-001 (2026-11-24)

Two-workspace activation test (control with an empty corpus, treatment with one relevant record).
Also generated by `AgenticLab-tools/session-metrics.mjs`:

- [`ALPHA-KNOWLEDGE-TRANSFER-001-SESSION-METRICS.csv`](ALPHA-KNOWLEDGE-TRANSFER-001-SESSION-METRICS.csv)
- [`ALPHA-KNOWLEDGE-TRANSFER-001-TOOL-ROUNDTRIPS.csv`](ALPHA-KNOWLEDGE-TRANSFER-001-TOOL-ROUNDTRIPS.csv)
- [`ALPHA-KNOWLEDGE-TRANSFER-001-GATE-BLOCKS.csv`](ALPHA-KNOWLEDGE-TRANSFER-001-GATE-BLOCKS.csv)

This run is why retrieval activation is now a derived column: `retrieval_calls`,
`retrieval_applicable`, `retrieval_no_match`, `retrieval_filtered`, and `retrieval_unavailable` come
from the adapter's own `status` field in the tool result, not from the model's narration.

The first version of this result was wrong because activation was counted by hand and the count
missed two calls: control 1 call / 0 matches, treatment 2 calls / 1 match. Counting activation by
hand is not acceptable; use the columns.

## ALPHA-KNOWLEDGE-APPLICATION-001 (2026-11-25)

Two treatment runs against an example-bearing record, with the earlier control reused as reference.
Retrieval columns made the activation question answerable without hand-counting:

- [`ALPHA-KNOWLEDGE-APPLICATION-001-SESSION-METRICS.csv`](ALPHA-KNOWLEDGE-APPLICATION-001-SESSION-METRICS.csv)
- [`ALPHA-KNOWLEDGE-APPLICATION-001-TOOL-ROUNDTRIPS.csv`](ALPHA-KNOWLEDGE-APPLICATION-001-TOOL-ROUNDTRIPS.csv)
- [`ALPHA-KNOWLEDGE-APPLICATION-001-GATE-BLOCKS.csv`](ALPHA-KNOWLEDGE-APPLICATION-001-GATE-BLOCKS.csv)

Both treatments retrieved the record (3 and 2 calls, 2 applicable matches each) and scored 7/7 on the
rubric, versus 4/7 for the reference control.

## ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001 (2026-11-25)

Single treatment run isolating the example from the wording change:

- [`ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001-SESSION-METRICS.csv`](ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001-SESSION-METRICS.csv)
- [`ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001-TOOL-ROUNDTRIPS.csv`](ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001-TOOL-ROUNDTRIPS.csv)
- [`ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001-GATE-BLOCKS.csv`](ALPHA-KNOWLEDGE-EXAMPLE-ISOLATION-001-GATE-BLOCKS.csv)

One retrieval call, one applicable match, 7/7 on the rubric: the fenced example transferred the
formatting rules that the identical verbose prose had not.

## AlphaProject PBI 0/1 (2026-11-25)

Raw metrics from the first two lab PBIs are preserved here, but not interpreted as a comparison:
both runs used a free model, so cost is unavailable, and PBI 1's span includes a long blocked
interval. Use the PBI run records in `AlphaProject/PBIs.md` for the narrow observations.

- [`ALPHA-PBI-0-session-metrics.csv`](ALPHA-PBI-0-session-metrics.csv),
  [`ALPHA-PBI-0-tool-roundtrips.csv`](ALPHA-PBI-0-tool-roundtrips.csv),
  [`ALPHA-PBI-0-gate-blocks.csv`](ALPHA-PBI-0-gate-blocks.csv)
- [`ALPHA-PBI-1-session-metrics.csv`](ALPHA-PBI-1-session-metrics.csv),
  [`ALPHA-PBI-1-tool-roundtrips.csv`](ALPHA-PBI-1-tool-roundtrips.csv),
  [`ALPHA-PBI-1-gate-blocks.csv`](ALPHA-PBI-1-gate-blocks.csv)

PBI 0 and 1 ran on `hy4-flash-free`; PBI 2 was the first paid `deepseek-v4.1-flash` lab run
($0.0868). The PBI 0/1 figures were corrected after fixing the extractor to honour declared
`--start`/`--end` windows and to attribute the dominant model in each window. A consolidated table
should be written only after the sequence, with model and window caveats intact.

## AlphaProject PBI 2/3 (2026-11-25)

First paid-model lab runs, usable for a cost comparison with earlier alpha runs:

- [`ALPHA-PBI-2-session-metrics.csv`](ALPHA-PBI-2-session-metrics.csv),
  [`ALPHA-PBI-2-tool-roundtrips.csv`](ALPHA-PBI-2-tool-roundtrips.csv),
  [`ALPHA-PBI-2-gate-blocks.csv`](ALPHA-PBI-2-gate-blocks.csv)
- [`ALPHA-PBI-3-session-metrics.csv`](ALPHA-PBI-3-session-metrics.csv),
  [`ALPHA-PBI-3-tool-roundtrips.csv`](ALPHA-PBI-3-tool-roundtrips.csv),
  [`ALPHA-PBI-3-gate-blocks.csv`](ALPHA-PBI-3-gate-blocks.csv)

PBI 2: 445 s, 68 calls, $0.0868. PBI 3: 459 s, 60 calls, $0.0700. Both used
`deepseek-v4.1-flash` and included relevant retrieval and promotions. A consolidated table remains
deferred until the PBI sequence closes.

## AlphaProject PBI 4 (2026-11-25)

PBI 4 (Conversations UI) paid-model lab metrics:

- [`ALPHA-PBI-4-session-metrics.csv`](ALPHA-PBI-4-session-metrics.csv),
  [`ALPHA-PBI-4-tool-roundtrips.csv`](ALPHA-PBI-4-tool-roundtrips.csv),
  [`ALPHA-PBI-4-gate-blocks.csv`](ALPHA-PBI-4-gate-blocks.csv)

316 s, 54 tool calls, $0.0687, `deepseek-v4.1-flash`, no gate blocks. A consolidated table remains
deferred until the sequence closes.

## Future runs

Add a row per run and session role, define the window boundaries before aggregation, preserve raw-session provenance locally, and mark missing measures as unavailable. Keep delivery-agent and coordinator numbers separate; include a coordinator total in a PBI cost only after the window has been reviewed for unrelated work. Do not add automatic collection or raw transcript storage without a separate approved scope.
