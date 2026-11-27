# RELEASE-CANDIDATE-001 — Execution Plan

**Status:** approved for execution; no push or release tag authorized.

## Objective

Determine whether published clean payload `d07ff5d` can be presented as a **governance-safe experimental release candidate** for V5.2, with explicit claims, limits, and a repeatable acceptance suite.

## Scope

1. Create a release capability matrix.
2. Create an external release acceptance suite.
3. Run one fresh-workspace release-candidate smoke.
4. Write a release-readiness report.
5. Commit completed artifacts locally.
6. Stop before push/publication.

## Non-goals

- No clean payload change.
- No new runtime mechanism.
- No C13/C12 implementation or publication.
- No documentation claim of stable/product release.
- No push, tag, or GitHub release.
- No dependency install, network access, service startup, or database changes without explicit approval.

## Step 1 — Capability matrix

Create:

```text
AgenticLab-v5/evaluation/RELEASE-CAPABILITY-MATRIX.md
```

For each capability, record:

- maturity;
- enforcement class: semantic, deterministic adapter, deterministic gate, absent;
- evidence;
- limits;
- release claim.

## Step 2 — Acceptance suite

Create external tooling under:

```text
AgenticLab-tools/release/
```

Expected files:

```text
README.md
acceptance.mjs
checks/payload-static.mjs
checks/docs-sync.mjs
```

The suite should verify:

- clean payload HEAD equals `d07ff5d`;
- `.mjs` syntax;
- policy JSON parses;
- prompt frontmatter parses or is absent where expected;
- no tests/fixtures/project IDs/absolute home paths in payload;
- canonical docs reference the payload revision;
- external payload and eval tests pass.

No test code goes into the payload.

## Step 3 — Fresh release-candidate smoke

Create a disposable workspace from:

- sanitized `fastapi-python` baseline;
- clean payload `d07ff5d`;
- initialized AgenticLab instance.

Run only read-only/local probes until a trusted fresh Pi session is available:

- initialization files present;
- prompts and extension registered;
- no workflow auto-run;
- exact in-scope path allowed / near-miss denied at adapter-policy level;
- sensitive path allow/deny;
- refresh no-op;
- optionally one `/plan` → `/implement` task if possible without dependency/network approval.

## Step 4 — Report

Create:

```text
AgenticLab-v5/evaluation/results/RELEASE-CANDIDATE-001.md
```

Outcome one of:

- Ready;
- Ready with limitations;
- Blocked.

List blockers only if found. Do not auto-fix.

## Step 5 — Commit and stop

Commit canonical docs/results and tools artifacts locally.

Do not push. Ask for explicit push approval.

## Decision points requiring user input

- dependency installation or network access in the fresh workspace;
- any payload/runtime change;
- a release blocker whose fix is not obviously documentation-only;
- push/tag/publication.
