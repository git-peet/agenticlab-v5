# AgenticLab V5 System Payload

This directory contains the small, distributable V5 system surface. It is separate from the development roadmap, candidate backlog, evaluation history, and `DEV-LOG.md`; those developer artifacts must not be copied into a project installation.

## Contents

- `AGENTS.md` — shared operating entry instructions; in a host workspace, the workspace-root `AGENTS.md` points here.
- `brain/` — portable operating and knowledge contracts.
- `prompts/delivery/` — opt-in, user-invoked workflow prompt prototypes (`plan.md`, `implement.md`, `premortem.md`). They are not auto-loaded in default work. Pi can test selected prompts explicitly with `--prompt-template AgenticLab/prompts/delivery/<name>.md`; this does not require a custom loader or a persistent `.pi/settings.json` change.
- `adapters/pi/` — the optional Pi workspace integration. `adapters/pi/tests/` contains development-only policy tests and is not copied into the host snapshot.

## Manual first installation (experimental)

This is a documented manual path for a **new delivery workspace**. It is not an installer or update procedure.

1. **Choose a source snapshot.** Use a named, clean V5 source commit and confirm that the `system/` payload files match it. Record the full commit hash. Do not package the whole `AgenticLab-v5/` development repository.
2. **Preflight the target workspace.** Confirm the target project identity and scope. If `<workspace>/AgenticLab/` already exists, stop; do not rerun first-install steps or overwrite it. Check only setup paths (`AgenticLab/`, workspace-root `AGENTS.md`, and `.pi/settings.json`). Before writing, show the exact proposed creates/merges and obtain approval. Preserve existing host instructions/settings; stop if a safe merge is unclear.
3. **Copy the runtime payload** from the selected `system/` snapshot into `<workspace>/AgenticLab/`:
   - `AGENTS.md`, `README.md`, and `brain/`
   - runtime files under `adapters/pi/`, excluding development-only `adapters/pi/tests/`
   - `prompts/delivery/` (these prompts remain opt-in; they are not auto-loaded)
   - exclude the V5 backlog, development logs, and other development-only material

   Write the full source commit hash to `AgenticLab/SOURCE-REVISION.txt` only after verifying the staged payload against that source commit. Do not use a live symlink.
4. **Initialize target-owned state.** Confirm the project/subproject scope with the user, create `AgenticLab/PROJECT-SCOPE.md`, and initialize an empty `AgenticLab/knowledge/INDEX.md` and required directories. Do not import V4 knowledge, another workspace's records, or V5 design history. If scope or knowledge files already exist, preserve them and stop for review rather than reseeding.
5. **Wire Pi locally.** If the workspace has no root `AGENTS.md`, create one with a pointer such as:

   ```markdown
   For AgenticLab V5 operating instructions, read and follow `AgenticLab/AGENTS.md`.
   ```

   If a root `AGENTS.md` already exists, preserve its instructions and propose a narrow addition. Project-local `.pi/settings.json` may register the extension with this path, relative to `.pi/settings.json`:

   ```json
   {
     "extensions": ["../AgenticLab/adapters/pi/knowledge-write-gate.ts"]
   }
   ```

   Merge this entry with existing settings rather than replacing them. Never alter global Pi configuration. Pi itself is globally installed; start it from the delivery workspace root.
6. **Verify capability honestly.** In a fresh Pi process, confirm the workspace instructions and—if project trust is granted—the extension load. If trust is declined or the approval extension is unavailable, do not persist AgenticLab knowledge by another route. Use only synthetic files for any write-gate check; this setup procedure does not require launching the target app or running its tests.

A workspace-root `AGENTS.md` is instruction context, not a security boundary. Pi extensions are executable code and run with the permissions of the Pi process. Do not claim a hard guarantee beyond the host adapter's verified behavior.

## Refresh boundary

This first-install procedure does not refresh an existing `AgenticLab/` copy. Before a future refresh, compare it with its recorded source commit, preview every changed path, preserve project scope/knowledge and host-owned instructions/settings, and stop on any local divergence or unclear ownership. Do not delete unknown or obsolete files automatically. Reset/deletion is a separate operation requiring its own scope and approval.

This remains an experimental V5 slice, not a complete adapter framework, installer, or security sandbox. See `brain/knowledge-contract.md` and the adapter source before making claims about memory approval or shell protection.
