# Project Scope — C03 Experimental Phase

- **Workspace:** `/home/peet/Projects/c03-experimental-phase/`
- **Purpose:** Use the C03 AgenticLab prototype in a real, bounded EverShop PBI workflow. This is a disposable experiment; it is not authorization to port changes to canonical AgenticLab or an installed payload.
- **Current baseline:** EverShop is running at `http://localhost:3000/` against the disposable `evershop_c03_smoke` database. The homepage has 15 seeded products and a published `collection_products` widget showing the `homepage` collection. The C03 startup guide is `AgenticLab/EVERSHOP-START-GUIDE.md`.

## Planning — read-only discovery is allowed

For a user-selected PBI, `/plan` may inspect the reviewed PBI text, AgenticLab instructions/knowledge, and relevant current source, tests, and package configuration to identify evidence, exact paths, and feasible validation. Use `readKnowledgeRecords` before source inspection as directed by `AgenticLab/AGENTS.md`. Read-only `find`, `rg`, `git status`, and file reads are permitted during planning; they are not implementation or validation runs. If knowledge has no match, record that and continue with current-source evidence where needed.

PBI status in `/home/peet/Projects/AgenticLab-v5/PBIs - reviewed.md`: PBIs 1–3 are reviewed; PBIs 4–5 are draft suggestions; PBI6 is a conditional test-fixture prerequisite. Do not infer selection or treat draft acceptance criteria as verified. Surface conflicts between a PBI and current source rather than silently expanding scope.

Planning does not authorize edits, tests, database access, migrations, installs, or app restarts. The plan must list intended files and validation commands. The user approves the plan, then separately invokes `/implement` before implementation.

## Implementation and validation

After approved plan plus explicit `/implement`, change only the plan-listed files and run only the plan-listed tests/commands. If inspection reveals a material new dependency, path, behavior, or test requirement, report it and request one plan amendment; do not stop for routine read-only inspection or each ordinary in-scope command.

## Data, environment, and network boundaries

- Never read `.env`, secrets, protected `data/`, backups, production/customer data, or shared/development databases.
- The earlier target `postgres://postgres:postgres@127.0.0.1:5432/postgres` is tainted/unverified; never reuse it.
- Preserve the current storefront baseline database. PBI database tests must use a separately identified, verified disposable target named in the approved plan. Do not run DB-backed tests against the populated homepage baseline unless the plan explicitly calls for a disposable reset.
- No global Pi/system changes. Dependency installation, image pulls, or external network access must be named in the plan and approved at the task level; list required hosts once rather than requesting approval for each request. Do not use unrelated hosts.
- The current `postgres:16` container is ephemeral (`--rm`, no volume); stopping it deletes the DB. The seeded `media/catalog/**` files remain local and are ignored by Git.

## Experiment and delivery

- C03 metrics under `.pi/metrics/` are local, temporary experiment data; do not commit or promote them without explicit approval.
- The experimental Git remote is `origin` (`https://github.com/git-peet/c03-experiment.git`). Commits or pushes require an explicit user request. Never push to canonical AgenticLab or an installed payload without separate review and approval.
- Keep status, incidents, and operational runbook details in `C03-HANDOFF.md` and `AgenticLab/EVERSHOP-START-GUIDE.md`, not as accumulating one-off restrictions in this scope file.
