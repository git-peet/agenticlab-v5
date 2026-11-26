# ALPHA-C13-PROBE-001 — Result

- **Status:** preliminary probe; not a full evaluation
- **Date:** 2026-11-26
- **Workspace:** `/home/peet/Projects/AlphaProject`
- **Installed payload revision:** staged C13 `3b69eaa` (base `50290a9`)
- **Model:** `deepseek-v4.1-flash`
- **Mode:** read-only; no workflow invocation

## Question

Do the new C13 query-shape instructions improve first-query retrieval for topics that already have records?

```text
Use the workspace's normal retrieval guidance to answer two questions from project knowledge:
1. What did we learn about Playwright and disposable databases / ports in this project?
2. What did we learn about the generated API client and git hygiene?
```

No edits, installs, network, tests, services, protected data, or workflows were authorized.

## Observed result

The agent called `readKnowledgeRecords` six times.

| Query | Outcome |
|---|---|
| `Playwright disposable databases ports` | `ok`, 1 match |
| `generated API client git hygiene` | `ok`, 2 matches |
| `git hygiene untracked generated files review before commit` | complete `no_match` |
| `disposable database port conflict Playwright isolated backend` | `ok`, 2 matches |
| `port collision fixed port 8000 frontend host e2e` | complete `no_match` |
| `generated client committed to version control diff` | complete `no_match` |

Relevant records returned:

- `playwright-compose-targets-app-database`
- `client-generation-script-side-effects`

The agent answered from those records and explicitly declined to infer beyond complete no-match results.

## Metrics

- window: 12 s
- tool calls: 8 (6 retrieval calls)
- retrieval: 3 applicable, 3 `no_match`
- tokens: 57,980
- cost: $0.0029

## Interpretation

Supported:
- the agent used the prescribed short topic phrases;
- the first query for each of the two topics returned relevant records;
- no-match results were treated as valid and did not trigger guessing as an answer;
- the guidance is compatible with low-friction default work.

Not established:
- that total retrieval calls were reduced versus unguided behavior;
- that topic maps or a retrieval preflight are needed;
- any full-run efficiency effect.

The remaining three `no_match` calls were follow-up rephrasings after successful retrieval. This is the main candidate for a later topic-map or preflight test.

## Decision / next safe action

Record as a positive but narrow signal for C13 Level 1. Do not implement Level 3 topic maps or a preflight yet. R2 should compare the same PBI subset against R1 and record first-query success, total retrieval calls, applicable/no-match outcomes, cost, and task correctness.

No payload change is authorized by this probe beyond the staged prompt guidance already applied to AlphaProject.
