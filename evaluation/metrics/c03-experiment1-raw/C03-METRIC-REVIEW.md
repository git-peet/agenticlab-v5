# C03 Metric Log Review

**Workspace:** `/home/peet/Projects/c03-experimental-phase/`
**Review date:** 2026-10-24

## Current log status

`.pi/metrics/c03-context-experiment.jsonl` contains 63 physical records. The 46 reviewed scenario outcomes (23 earlier calibration rows, live-source W2/W3/W4 runs `c03-v014`–`c03-v016`, integrated-tool W2/W3/W4 runs `c03-v017`–`c03-v019`, discovery-first W2 `c03-v020`, workflow-handoff W4 `c03-v021`, additional W2 `c03-v022`, child-scope W3/W4 `c03-v024`–`c03-v025`, synthetic D1/T1 `c03-v026`–`c03-v027`, path-scope W3 `c03-v028`, live-source D1 `c03-v029`, T1 reviews `c03-v030`–`c03-v034`, and minimal-context W2 `c03-v035`, retrieval-exhausted D1 `c03-v036`, and two-phase handoff W4 `c03-v037`) are current evidence. Run `c03-v023` is preserved as a stale-runtime diagnostic: it occurred before the updated scope-support extension was reloaded and is not evidence about the current implementation. Sixteen additional rows from the earlier hardcoded stub are also invalid and must not be counted.

### Stale-runtime diagnostic

- **Run:** `c03-v023` (W3, child scope)
- The interactive Pi process had not been restarted after the subproject-scope code change, so its loaded extension still required exact workspace scope. The tool returned unavailable/partial before retrieval. After `/quit` and `pi --continue`, the same child-scope scenario passed as `c03-v024`.
- **Disposition:** Retain as an operational reload diagnostic; do not use as a current-code scenario outcome.

### Invalid test-generated rows

- **Count:** 16
- **Run ID prefix:** `c03-v011-prototype-`
- **Cause:** The former context-assembly stub hardcoded retrieval/task outcomes from `workloadFamily` and wrote to the real experimental metrics path as a side effect. Its tests invoked that stub, repeatedly appending duplicate synthetic W2/W3 outcomes.
- **Disposition:** Preserved in the log for auditability, explicitly invalidated here. Do not use these rows for scorecards, calibration totals, or downstream decisions. They were not produced by retrieval and are not evidence of task success.

No rows have been deleted or rewritten. Future tests must use temporary fixtures and must not append to `.pi/metrics/c03-context-experiment.jsonl`.

## Corrective implementation

The stub has been replaced by the generic `assembleContext()` helper in `AgenticLab/adapters/pi/context-assembly.mjs` and `createContextAssembler()` adapter. They are dependency-injected; the generic helper performs no filesystem/network access or metric writes, invokes knowledge retrieval before current-source retrieval, filters ineligible candidates, and preserves no-match/filtered/incomplete/unavailable/storage-failure distinctions. Tests use the actual `readKnowledge` adapter against a temporary fixture plus an injected synthetic source retriever and leave the live metric log unchanged. Separate live-Pi runs W2/W3/W4 retrieved read-only source under `packages/evershop/src/**`; see `C03-SOURCE-VALIDATION.md`.
