# V5.2 Release Capability Matrix

**Purpose:** Define what an experimental V5.2 release candidate may claim, and with what confidence.
**Payload under review:** `d07ff5d`
**Maturity target:** governance-safe experimental release candidate, not a stable product release.
**Authority:** [`../V5.2-STATUS.md`](../V5.2-STATUS.md), [`../V5.2-roadmap.md`](../V5.2-roadmap.md), [`../backlog/README.md`](../backlog/README.md), candidate records, and `DEV-LOG.md`.

## Enforcement vocabulary

| Class | Meaning |
|---|---|
| **Semantic** | Contract/prompt rule. The agent is expected to follow it; the host does not deterministically enforce it. |
| **Deterministic adapter** | Policy implemented in AgenticLab's own adapter and tested with external tests. |
| **Deterministic gate** | Pi/tool event interception that can block an action before execution. Lexical and host-scoped, not an OS sandbox. |
| **Workflow contract** | Enforced by an explicit prompt/checkpoint path, not by default work. |
| **Absent** | Not implemented in this release candidate. |

## Capability matrix

| Area | Maturity | Enforcement | Evidence | Limits / release claim |
|---|---|---|---|---|
| Default work and explicit workflows | Implemented | Semantic + workflow contract | AGENTS.md, operating-contract.md, R1/R2 delivery work | Claim coexistence and opt-in workflows. Do not claim auto-routing. |
| User task defines scope/authority | Implemented | Semantic | AGENTS.md, operating-contract.md | Central principle; not host-enforced in every tool call. |
| Records/tool output/instructions are not authority | Implemented | Semantic | contracts, C02 retrieval history | Claim as contract, not deterministic filtering of all prompt injection. |
| Exact action/file/command fidelity | Bounded | Semantic + deterministic gate during `/implement` | action-scope gate, exp7, R1/R2 | Claim for `/implement` writes/shell at tested shapes. Default work remains semantic. |
| Material scope change / renewed confirmation | Implemented | Semantic | contracts, workflow stop conditions | Claim as behavior contract; not a structured protocol. |
| Critical assumptions and blockers | Partial | Semantic | operating-contract.md, R1/R2 stop events | Claim stop-and-ask. No structured blocker schema or cascade rule. |
| Fail-safe disclosure | Implemented | Semantic + fail-closed gates | knowledge write gate, action-scope gate | Claim that unavailable gates do not silently authorize persistence. |
| Sensitive files (`.env`, credentials, keys) | Implemented | Deterministic gate + semantic rule | sensitive-path-policy.mjs, external tests, live probes | Path-based lexical boundary. No content-based secret scanner. Templates allowed. |
| Knowledge candidate lifecycle | Implemented bounded slice | Deterministic adapter + UI confirmation | C02 validation, R1/R2 staging/promotion | Claim staging inactive, promotion explicit. Do not claim broad memory benefit. |
| Knowledge pending queue protection | Implemented | Deterministic adapter | queue guard, tests, live probes | Direct file access blocked; dedicated adapter required. |
| Knowledge subject boundary | Implemented | Deterministic adapter | system-subject guard, R1/R2 | Claim that system-installation records are rejected from project records. |
| Knowledge retrieval | Bounded | Adapter + semantic guidance | C02, R1/R2, retrieval probes | Claim scoped retrieval with explicit outcomes. Activation/precision mixed; no guarantee of causal benefit. |
| Context metrics | Thin slice | Deterministic adapter | C03 metrics, AgenticLab-tools | Content-free metrics only. No general policy engine. |
| Initialization | Implemented | Preview + approval + workspace-local files | exp6, exp9, R1/R2 | Claim first-use setup. Refresh/update edge cases remain. |
| Payload refresh | Implemented | Revision manifest + deterministic preview | R1/R2 refresh, external tests | Claim payload-owned changes only; conflict stop and workspace-owned preservation. |
| `/plan` | Implemented | Workflow contract | R1/R2 | Read-only for application source; transient checkpoint after approval. |
| `/implement` | Implemented bounded | Workflow contract + action-scope gate | R1/R2 | Approved scope only; log before checkpoint disposition; bare-path `inScope`. |
| `/premortem` | Registered, lightly exercised | Workflow contract | payload prompt; limited live use | Do not claim strong review maturity. |
| Commits/pushes/installs/network/migrations/destructive actions | Required approval | Semantic only | operating-contract.md, exp5/exp6 | Claim approval requirement as contract. No deterministic command-level enforcement. |
| Memory curation from V4 | Covered by C02 | Deterministic lifecycle + semantic contract | C02 records/lifecycle | Claim candidate→staging→promotion/rejection/correction. No V4 curation pipeline. |
| Zero-tolerance V4 table | Not included | Absent by design | C04 gap reconciliation | Do not claim command blacklist. |
| Tier A/B/C autonomy | Not included | Absent by design | C04 gap reconciliation | Do not claim tiers. |
| Fix-attempt/tool-call caps | Not included | Absent by design | C04 gap reconciliation | Do not claim loop governance. |
| Blocker schema/cascade | Not included | Semantic only | C04 gap reconciliation | Claim stop-and-ask only. |
| DIGEST/semantic-map injection | Not included | Absent by design | C03/C04 evidence | Do not claim always-on memory. |
| Content-based secret scanning | Not included | Absent | C04 gap reconciliation | Claim path-based protected-file boundary only. |
| General context-policy engine | Not included | Absent | C03.1/C03.2 | Do not claim context budgets or automatic policy. |
| Codemode orchestration | Not included | Absent | C12 | Do not claim runtime orchestration. |
| OS sandbox | Not included | Absent | adapter source and docs | Explicitly not a sandbox. |

## Release claim summary

An experimental V5.2 release candidate may claim:

- a coherent operating contract shared by default work and opt-in workflows;
- deterministic protection for knowledge writes/promotion, sensitive paths, payload refresh, and approved `/implement` action scope;
- a bounded knowledge lifecycle with inactive staging and explicit promotion;
- first-use initialization and reviewed payload refresh;
- content-free measurement and external regression suites;
- fail-closed behavior in the implemented gates.

It may **not** claim:

- full V4 governance parity;
- deterministic enforcement of every approval boundary;
- OS-level sandboxing;
- general context-policy automation;
- proven productivity, safety, or quality improvement versus plain Pi;
- stable product release readiness.

## Final disposition rule

If the acceptance suite passes but limitations remain, the outcome is **Ready with limitations** — sufficient for an experimental release candidate, not for a stable release. If any claimed capability above fails its acceptance check, the outcome is **Blocked** until explicitly fixed and revalidated.
