# ALPHA-PBI2-001 — Approved temporary test-environment addendum

- **Status:** Execution complete; temporary environment cleaned
- **Parent preregistration:** [`ALPHA-PBI2-001.md`](ALPHA-PBI2-001.md)
- **Approved:** 2026-10-16 by the user after Pi stopped because the local Playwright and real `react-slick` dependencies were unavailable.

## Temporary environment

- Install only the lock-versioned direct packages needed by the isolated harness into a unique directory under `/tmp`, with lifecycle scripts disabled. Versions from the fresh EverShop lockfile: `@playwright/test` 1.59.1, `@swc/core` 1.15.10, React/ReactDOM 19.2.7, `react-hook-form` 7.71.1, `react-slick` 0.31.0, `sass` 1.98.0 (added with separate user approval after the first remediation stopped), `slick-carousel` 1.8.1, and webpack 5.104.1. Temporary dependency resolution may create a lockfile only inside `/tmp`.
- Use the already installed system Chromium (`/usr/bin/chromium`, version 152) through a harness-config environment override if required. Do not download/install Playwright browser binaries.
- Before making a temporary project-root `node_modules` symlink, verify that the path does not exist and is not a symlink. If it exists or has unknown ownership, stop and ask. Create only a link to the exact `/tmp` dependency directory, then remove only that link after testing if it still points to that directory.
- Run only the approved isolated image-viewer Playwright config after Pi has implemented the approved plan. Do not run tests before the harness is complete. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` for the test run if the config supports that environment override; otherwise update the in-scope test config to use the already-present system binary, not a downloaded browser.

## Setup performed

On 2026-10-16, verified `/home/peet/Projects/V5-alpha-sandbox/node_modules` was absent, installed the lock-versioned direct dependencies under `/tmp/agenticlab-pbi2-deps.yYkMTh` with lifecycle scripts disabled, and created a temporary symlink at the absent root `node_modules` path. The user separately approved adding lock-pinned Sass 1.98.0 to this `/tmp` environment; Sass was installed with lifecycle scripts disabled. The final post-cleanup suite passed 4/4. After validation, confirmed no harness server/test process or port listener remained, removed the workspace symlink only while it still pointed to `/tmp/agenticlab-pbi2-deps.yYkMTh/node_modules`, removed that exact temporary dependency directory, and deleted the nine generated bundle directories created by the test server. No app, database, `.env`, or `data/` access occurred.

## Hard boundaries

No dependency install or generated file in the EverShop repository; no package/lockfile changes; no `npx`/`npm exec`; no app/server startup, migrations, database, `.env`, root `data/`, full Jest/E2E suite, browser download, global Pi settings, or network access except package retrieval required for the approved `/tmp` dependency setup. Keep all temporary dependency and generated test output under `/tmp`, and clean only paths created by this setup.

This amendment authorizes only the above disposable test environment. It does not authorize changing application scope, claiming database persistence, or implementing changes beyond the approved PBI 2 plan.
