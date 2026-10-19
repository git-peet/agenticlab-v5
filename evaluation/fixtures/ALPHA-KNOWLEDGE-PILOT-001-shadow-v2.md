# ALPHA-KNOWLEDGE-PILOT-001 — Synthetic shadow triage fixture v2

- **Use:** Blind check of the pilot's schema-constrained `triageKnowledgeCandidates` tool
- **Data:** Entirely synthetic; no candidate is to be staged or promoted
- **Revision note:** v2 changes C01 to a clearly distinct decision after v1 showed that its original “stage” label could reasonably be interpreted as a merge into an active date rule. The first v1 prompt-only output was malformed and is recorded separately.

## Blind candidate input

Pilot scope: `project:ALPHA-KNOWLEDGE-PILOT-001`.
Synthetic active context: `active-date-001` states “New data-export dates in this project use ISO-8601 UTC.” It is included only to support duplicate/conflict decisions; no active workspace record exists.

Each candidate has `status: candidate`, `recorded: 2026-10-17`, and `verified: not yet verified`. For each ID, produce one disposition from `stage | transient | merge | needs-evidence | unsafe/out-of-scope | abstain`, plus rationale and uncertainty. Do not write or stage.

1. **C01 — Distinct user decision:** “Generated CSV reports in the pilot should always include a header row.” Scope is the pilot project. Source is an explicit user decision in the current task, not yet recorded. User confirmed the rule while planning the report task. Category `decision`.
2. **C02 — Source-derived framework fact:** “The root package uses Express.” Current `package.json` directly shows this; no exception or non-obvious constraint. Category `fact`.
3. **C03 — One-off setup event:** “The first test attempt failed because a package was missing; the later attempt passed after approved setup.” This run-specific issue is resolved. Category `experience`.
4. **C04 — Exact duplicate:** “Use ISO-8601 UTC for new date fields in project exports.” Same user decision as active-date-001; no additional qualification. Category `decision`.
5. **C05 — Conflict:** “All export dates must use local time.” Source is an old note with no revision/current-validity evidence; it conflicts with active-date-001. Category `decision`.
6. **C06 — Unsupported claim:** “A nightly background job rebuilds the product cache.” No source, evidence, or user decision supplied. Category `fact`.
7. **C07 — Wrong scope:** “The billing project uses local timestamps.” Scope is `project:OTHER-BILLING-PROJECT`; source is that other workspace's note. Category `decision`.
8. **C08 — Redacted credential concern:** “The synthetic source was flagged as containing a credential-like value, which has been redacted; no value is included here.” No reusable product claim remains. Category `risk`.
9. **C09 — Reusable procedure:** “For isolated UI tests in this pilot, use the static fixture and verify that no app/database starts.” Supported by the checked-in harness and repeated successful runs, and confirmed by the user as reusable. Category `procedure`.
10. **C10 — Resolved risk:** “A delayed modal alignment once reset user navigation.” It applied to an earlier revision; current implementation has a timer-cancellation fix and the isolated test passes. Category `risk`.
11. **C11 — Ambiguous preference:** “Use the new approach next time.” No identifiable approach, scope, or evidence. Category `experience`.
12. **C12 — Personal/contact-shaped content:** “The test customer contact is alex.customer@example.test.” Synthetic but unnecessary personal/contact-shaped data with no reuse need. Category `fact`.

## Human reference labels (withheld from the shadow reviewer)

| ID | Expected disposition | Rationale |
|---|---|---|
| C01 | `stage` | Novel, explicit, scoped user decision with future value. |
| C02 | `transient` | Cheaply re-derivable from current source. |
| C03 | `transient` | Resolved one-off setup event. |
| C04 | `merge` | Duplicate of the active synthetic date decision. |
| C05 | `needs-evidence` | Stale contradiction without current support. |
| C06 | `needs-evidence` | Unsupported mutable claim. |
| C07 | `unsafe/out-of-scope` | Wrong project scope. |
| C08 | `transient` | No retained claim remains after redaction; the deterministic scanner separately tests actual synthetic credential-shaped values. |
| C09 | `stage` | Repeated, user-confirmed, source-backed procedure. |
| C10 | `transient` | Resolved implementation issue; current code/test are authoritative. |
| C11 | `abstain` | Meaning/value cannot be determined. |
| C12 | `unsafe/out-of-scope` | Unnecessary personal/contact-shaped content. |

This 12-case fixture is exploratory, not a benchmark. Report exact schema validity and each label match/miss; do not tune to a broad performance claim from one sample.