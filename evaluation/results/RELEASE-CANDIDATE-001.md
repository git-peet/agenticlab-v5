# RELEASE-CANDIDATE-001 — Result

- **Date:** 2026-11-27
- **Plan:** [`../plans/RELEASE-CANDIDATE-001.md`](../plans/RELEASE-CANDIDATE-001.md)
- **Capability matrix:** [`../RELEASE-CAPABILITY-MATRIX.md`](../RELEASE-CAPABILITY-MATRIX.md)
- **Payload under review:** `d07ff5d`
- **Outcome:** **Ready with limitations** for an **experimental V5.2 release candidate**. Not a stable product release.

## Summary

The current published payload passes its static and external acceptance checks, initializes cleanly in a fresh workspace, loads the expected prompts and extension, preserves workspace-owned state through refresh, and completes a bounded `/plan` → `/implement` smoke without a gate failure. Governance claims are coherent when explicitly split into semantic principles, deterministic adapter/gates, and unsupported areas.

No release blocker was found. The remaining limitations are known and must be published rather than hidden.

## Acceptance suite

Command:

```bash
node /home/peet/Projects/AgenticLab-tools/release/acceptance.mjs
```

Result: **PASS**, 15 checks.

Verified:

- payload HEAD is `d07ff5d`;
- 10 payload `.mjs` files pass `node --check`;
- policy JSON parses;
- no tests/fixtures/local identifiers/absolute home paths in the payload;
- prompt frontmatter parses;
- current canonical docs reference `d07ff5d`;
- capability matrix, C14, and release plan exist;
- external AgenticLab-tools suites: **66/66 passing**.

## Fresh workspace smoke

Workspace:

```text
/home/peet/Projects/ReleaseCandidate
```

Created from sanitized `fastapi-python` HEAD plus clean payload `d07ff5d`. No dependency install, service start, database, or network access was used.

### Initialization

- `SOURCE-REVISION.json` recorded `d07ff5d`, 22 payload-owned files.
- `.pi/settings.json` registered `/initialize-workspace`, `/refresh-payload`, `/plan`, `/implement`, `/premortem`.
- Extension registration confirmed in a fresh trusted Pi session:
  - `readKnowledgeRecords`;
  - triage/stage/promote/reject tools;
  - context metric recorder.
- No workflow auto-ran.
- The agent observed shell-gate enforcement during read-only probing.

### Adapter-policy probes

Run directly against the installed payload:

| Probe | Result |
|---|---|
| exact in-scope write | allowed |
| near-miss write | blocked: `target 'README.md' is not an exact approved path` |
| `.env.example` read shape | allowed |
| `.env` content read | blocked with sensitive-file reason |
| payload refresh preview | `noop`, 22 unchanged |

### `/plan` → `/implement` smoke

Task: create `docs/release-candidate-smoke.md` with a short, read-only description of the safe checks used in the smoke.

- checkpoint scope: doc + standard implementation log;
- write succeeded;
- planned validation passed;
- implementation log written before checkpoint disposition;
- checkpoint B deleted after explicit authorization;
- final tracked workspace change: only `docs/release-candidate-smoke.md`.

Metrics from the smoke task:

- 291 s;
- 31 tool calls;
- 2 retrieval calls, both `no_match` because the fresh corpus was empty;
- 973,370 tokens;
- $0.0184;
- no gate blocks.

The workspace and its evidence were archived to:

```text
Archive/V5-Experiments/ReleaseCandidate-smoke-2026-11-27.tar.gz
```

Archive verified: 1,022 KB, 367 files, no `.env`, `.git`, `node_modules`, or `.venv`.

## Limitations to publish

- This is an **experimental release candidate**, not a product release.
- Deterministic controls are narrow: knowledge writes/promotion, sensitive paths, `/implement` action scope, refresh, and candidate subject guard.
- Commit/push/install/network/destructive/migration approvals remain semantic; no general command interception is claimed.
- Gates are lexical/tool-scoped, not a shell parser or OS sandbox.
- Default work is primarily semantic-only.
- Retrieval activation and precision are mixed; no causal delivery benefit is proven.
- `capture-policy.json` is intentionally protected from direct shell reads; the agent could not verify its key via shell during the smoke. Archived artifact read confirms `project: release-candidate`, `scope: project:release-candidate`, staging enabled, metrics enabled.
- The smoke did not install dependencies, start services, access a database, or run the application.
- `/premortem` remains registered but lightly exercised.

## Decision

Use the rating **Ready with limitations**.

Allowed release claim:

> V5.2 has a governance-safe experimental payload baseline with scoped memory, initialization/refresh, opt-in delivery workflows, and narrow deterministic safety controls. It is not a stable product release and does not claim general productivity or safety superiority over plain Pi.

Not allowed:

- stable/product release claim;
- full governance parity with V4;
- general sandbox claim;
- C13/C12/C09 publication;
- broad memory benefit claim.

## Next safe action

Prepare release-facing documentation from the capability matrix and this result. Any actual publication, tag, or release announcement requires separate explicit approval.
