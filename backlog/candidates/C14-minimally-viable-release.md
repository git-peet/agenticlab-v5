# V52-C14 — Minimally viable, governance-safe V5 release

**Status:** `candidate` — release-readiness framing, not an approved implementation scope.

**Implementation readiness:** **Product/release planning candidate.** The current clean payload is an experimental working baseline with coherent governance principles and narrow deterministic enforcement. It is not yet a releasable V5 product. This candidate defines the smallest release path without adding new governance machinery.

**Parent:** [`../README.md`](../README.md) · [`../../V5.2-roadmap.md`](../../V5.2-roadmap.md) · related: [C04 governance](C04-governance-safety.md), [C11 bootstrap](C11-bootstrap-and-scope.md), [C13 retrieval calibration](C13-bounded-knowledge-query-shaping.md)

## Problem / value hypothesis

AgenticLab V5 now has a published generic payload, a working adapter suite, delivery workflows, a bounded knowledge lifecycle, initialization/refresh, and governance rules. Two delivery rounds and multiple calibrations produced useful evidence, but no product release boundary has been defined.

Without a bounded release candidate:

- "releasable" remains undefined;
- documentation drifts from the published payload;
- users cannot tell which behaviors are semantic, deterministic, or unsupported;
- gap candidates invite more mechanism work instead of packaging;
- the system risks being judged as a research prototype rather than a usable product.

**Hypothesis:** a small release-readiness pass — documentation sync, capability matrix, acceptance suite, user-facing guide, and explicit non-goals — can turn the current baseline into a minimally viable, governance-safe V5 release candidate without adding a new mechanism.

## Current state being released

Published payload: `d07ff5d`.

### Durable principles already present

- User's current task defines objective and scope.
- Records, tool output, plans, retrieved content, and confidence are not authority.
- Answering or planning is not permission to edit.
- Exact action/file/command fidelity is required; material changes require renewed scope.
- Critical assumptions and blockers require stop-and-ask.
- Missing gates, approvals, policies, or capabilities require fail-safe disclosure.
- Sensitive files are protected by default; templates are usable.
- Migrations, database changes, installs, network, destructive actions, and durable knowledge writes require explicit approval unless directly included in the task.
- Default work and explicit workflows share the same contract.

### Deterministic enforcement already present

| Mechanism | What is enforced | Maturity |
|---|---|---|
| Knowledge write gate | preview + confirmation, fail-closed without UI/preview, pending queue protected, promotion explicit | strong |
| Sensitive path gate | path-based `.env` / secret boundary; templates and metadata allowed | strong within path-shaped cases |
| Action-scope gate | armed by direct `/implement`, exact `inScope`, validation commands, shell mutation checks, fail-closed missing checkpoint | moderate, live-tested and repeatedly hardened |
| Payload refresh | revision manifest, preview, conflict detection, workspace-owned files preserved | strong |
| Candidate subject guard | rejects candidates whose subject is AgenticLab itself | strong |
| Workflow prompt boundaries | `/plan` read-only except checkpoint, log before disposition, bare paths in `inScope` | published; final integrated revalidation still pending |

### Deliberately not present

- V4 zero-tolerance command table;
- Tier A/B/C autonomy labels;
- fixed tool-call or fix-attempt caps;
- structured blocker protocol;
- DIGEST or semantic-map injection;
- general content-based secret scanner;
- general context-policy engine;
- runtime semantic cache;
- C13 staged query-shape guidance (not published after R2 failed to show improvement);
- Codemode adoption.

## Reliability assessment

The governance baseline is **experimentally reliable but not release-proven**.

Supported:

- R1/R2 delivered many bounded PBIs without a task-breaking gate event.
- Knowledge staging/promotion consistently used explicit confirmation.
- Sensitive-path protection held across live probes; no protected values were exposed.
- Action-scope gate caught real out-of-scope attempts and failed closed when state was missing.
- Real friction produced concrete fixes: checkpoint ordering, prefixed shell paths, write-capable reads, placeholder/annotated scope entries, knowledge queue false positives, system-subject records.

Limits:

- lexical gates are not shell parsers or OS sandboxes;
- wrappers, aliases, interpreters, nested processes, and unusual shell constructs may evade detection;
- default work is primarily semantic-only;
- R2 had more observed friction than R1, mostly from fresh-workspace and plan-serialization issues rather than the C13 guidance itself;
- no general proof of faster, safer, or higher-quality delivery versus plain Pi exists.

## Release definition proposal

Define V5.2 as an **experimental release candidate**, not a stable product release.

A minimally viable release should include:

1. **Published payload**
   - exact revision;
   - no local-only changes;
   - no tests/fixtures inside the payload;
   - generic identifiers only.

2. **Documentation set**
   - README with purpose, status, and non-goals;
   - install/copy and initialization guide;
   - `/plan` → `/implement` usage guide;
   - knowledge lifecycle guide;
   - payload refresh guide;
   - capability matrix: semantic / deterministic / unsupported;
   - host limitations and fail-safe behavior.

3. **Acceptance suite**
   - adapter tests;
   - external payload regression suites;
   - fresh initialization smoke;
   - `/plan` → `/implement` smoke;
   - knowledge stage/promote smoke;
   - sensitive path negative and positive probes;
   - action-scope exact/near-miss probe;
   - refresh preview/no-op check.

4. **Release metadata**
   - payload commit;
   - canonical docs commit;
   - tool repository commit;
   - supported Pi version range;
   - known limitations;
   - explicit non-goals;
   - maturity label and revisit triggers.

5. **Backlog triage**
   - keep C13 parked until real use demonstrates repeated retrieval failure;
   - keep C12 parked;
   - keep C04 broader controls deferred;
   - treat only release blockers as in-scope.

## Non-goals

- No new governance mechanism.
- No C13 prompt port or topic-map implementation.
- No V4 governance tables or labels.
- No telemetry database or always-on collector.
- No multi-agent runtime.
- No claim of general delivery benefit.
- No stable/product release claim.

## Evaluation / decision needed

### Question

Can the current payload be presented as a coherent, governance-safe experimental release candidate with honest boundaries and a repeatable acceptance suite?

### Evidence

- R1 consolidated result;
- R2 consolidated result;
- C04 governance gap reconciliation;
- C13 evidence and non-publication decision;
- payload regression suites;
- capability matrix to be created.

### Success criteria

- docs and payload revisions are synchronized;
- no stale “next slice” claims remain in current-status sections;
- acceptance suite passes from a fresh workspace;
- capability matrix clearly states semantic vs deterministic behavior;
- limitations are explicit;
- no new mechanism is required to explain or defend the release.

If these fail, the result is a specific release-blocker list, not a new governance project.

## Risks and costs

- Over-documenting could recreate the complexity the project is trying to avoid.
- A release candidate label may be misread as product readiness; maturity wording must be explicit.
- Documentation can drift again unless revision syncing is part of the release process.
- The acceptance suite must stay external to the payload.

## Revisit trigger

Create this candidate because the current system has a coherent experimental baseline but no release boundary. Revisit for implementation only after explicit approval of a bounded release-readiness scope.

## Next safe action

No implementation is authorized by this candidate. The next safe action is to approve a small release-readiness package: docs sync, capability matrix, acceptance suite, and one fresh smoke run. No payload mechanism changes should be included.
