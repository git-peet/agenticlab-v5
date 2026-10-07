# AgenticLab V5 System Payload

This directory contains the small, distributable V5 system surface. It is separate from the development roadmap, candidate backlog, evaluation history, and `DEV-LOG.md`; those developer artifacts must not be copied into a project installation.

## Contents

- `AGENTS.md` — shared operating entry instructions; in a host workspace, the workspace-root `AGENTS.md` points here.
- `brain/` — portable operating and knowledge contracts.
- `prompts/delivery/` — opt-in, user-invoked workflow prompt prototypes (`plan.md`, `implement.md`, `premortem.md`). They are not auto-loaded in default work. Pi can test selected prompts explicitly with `--prompt-template AgenticLab/prompts/delivery/<name>.md`; this does not require a custom loader or a persistent `.pi/settings.json` change.
- `adapters/pi/` — the optional Pi workspace integration. `adapters/pi/tests/` contains development-only policy tests and is not copied into the host snapshot.

## Host instance

For the first experiment, copy the runtime files (excluding development-only tests) into a workspace-local `AgenticLab/` directory, then keep project-specific configuration and knowledge in that instance. Record the source V5 revision in `AgenticLab/SOURCE-REVISION.txt`. Refreshes must not overwrite project knowledge or project-specific configuration. Do not edit the host copy as the canonical source.

Pi's root `AGENTS.md` context file is not trust-gated and is not a security control. The project `.pi` extension registration is trust-gated. If the user declines project trust, or the approval extension is unavailable, do not persist AgenticLab knowledge through the agent.

This is an experimental V5 slice, not a complete adapter framework or security sandbox. See `brain/knowledge-contract.md` and the adapter source before making claims about memory approval or shell protection.
