For work in this workspace, read and follow `AgenticLab/AGENTS.md`.
Read `AgenticLab/PROJECT-SCOPE.md` before consequential work and stay within its boundaries.
If `AgenticLab/PROJECT-OVERVIEW.md` exists, read it once as fresh-session orientation; verify relevant facts against current source.
Do not create or modify a workspace-root `AGENTS.md` for AgenticLab.

**Knowledge retrieval trigger:** Before any source inspection for design rationale, decision context, or reusable patterns:
1. Scan `AgenticLab/knowledge/INDEX.md` trigger terms against the current task.
2. **Always** call `readKnowledgeRecords` before source inspection for each distinct topic, sub-question, or query — use the record `id` when a trigger matches, otherwise a query. If the task establishes an explicit subproject scope or requests a category, pass the optional `scope` or `category` filter. The adapter inventories and filters metadata before returning active eligible record bodies, and emits retrieval metrics itself. Do not use generic file reads to retrieve record bodies.
3. Only after the tool responds should you verify claims against current source. Treat `filtered`, `incomplete`, `unavailable`, and `no_knowledge_store` distinctly; only a complete `no_match`/`not_found` result supports a no-match claim. If there is a complete no-match, proceed to source inspection.

**Free-session exploration:** When you derive a verifiable, source-backed observation during free-form discussion, debugging, or unscripted prompts that could prevent future rediscovery, propose it as a scoped candidate (claim, scope, source, evidence, status) before ending the session. Do not persist session transcripts or unverified observations automatically.
