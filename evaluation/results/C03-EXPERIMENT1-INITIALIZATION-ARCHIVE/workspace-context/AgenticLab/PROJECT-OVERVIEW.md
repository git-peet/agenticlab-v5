# Project Overview

- **Project:** C03 experimental phase — disposable playground based on the EverShop checkout at this workspace root (user-confirmed identity and description; checkout cleanliness not independently verified).
- **Oriented:** 2026-10-24
- **Source revision:** Workspace HEAD `a42472732a418433401e5046be1b7f6a8e2f1eba`. AgenticLab payload provenance is separately recorded in `AgenticLab/SOURCE-REVISION.txt`; no checkout-cleanliness check was performed.
- **Coverage:** Repository-level pass covering the README, contributor guide, workspace/package manifests, TypeScript/SWC/Jest configuration, limited package/source directory listings, and core startup/module-loading files.
- **Exclusions:** No feature-level survey, extension-source survey, test-body survey, or runtime/configuration-data inspection. No `.env`, secrets, root `data/`, backups, production/customer data, dependencies, generated output, or databases were accessed. No network or application/test/script execution.

## Stack and workspace layout

- The root manifest configures npm workspaces for `packages/*` and `extensions/*` (`package.json`).
- The inspected packages are EverShop core (`packages/evershop/`), a PostgreSQL query builder (`packages/postgres-query-builder/`), and an app generator (`packages/create-evershop-app/`); these package identities are stated in their manifests.
- The README describes EverShop as TypeScript-first, with React and GraphQL. The core package manifest describes Express and PostgreSQL and declares the corresponding dependencies (`README.md`, `packages/evershop/package.json`).
- Core source is grouped under `packages/evershop/src/`: `bin/`, `components/` (`admin/`, `common/`, `frontStore/`), `lib/`, `modules/`, and `types/` (limited directory listing).
- Root TypeScript configuration uses NodeNext modules and maps component/query-builder imports; the core package config targets `src/` and defines the `@evershop/evershop/*` alias (`tsconfig.json`, `packages/evershop/tsconfig.json`). SWC is configured for TypeScript/TSX (`packages/evershop/.swcrc`).

## Starting points and key flows

- The production start entry is `packages/evershop/src/bin/start/index.ts`; it calls `start()` from `packages/evershop/src/bin/lib/startUp.js`.
- The startup implementation combines core modules with enabled extensions, loads each module bootstrap, locks hooks/registries, validates configuration, runs migrations, and then starts the HTTP server and child processes (`packages/evershop/src/bin/lib/startUp.js`).
- The core module list is declared in `packages/evershop/src/bin/lib/loadModules.js`.
- The root build/compile scripts point into `packages/evershop`; the root `compile` script uses SWC to compile `src/` into `dist/` (`package.json`).

## Build and test approach

- **Inspected, not run:** `npm run compile` compiles the core source with SWC; `npm run build` launches the built `dist/bin/build` entry; `npm run dev` launches the built `dist/bin/dev` entry (`package.json`).
- **Inspected, not run:** `npm test` invokes Jest. `jest.config.js` matches unit tests under `dist/**/tests/**/unit/` and excludes `packages/evershop/src/`.
- **Safety note:** the configured `npm run lint` command includes `eslint --fix`, so it may change files (`package.json`). No commands were run during orientation.

## Known unknowns

- The repository wiki index was not present at `wiki/index.md`; this orientation therefore relies on the inspected README, manifests, configuration, and startup sources.
- No feature-specific architecture, individual module behavior, extension behavior, test isolation, or live runtime configuration was examined.
- The current HEAD was recorded, but checkout cleanliness and the relationship between this C03 workspace and any uncommitted host changes were not checked.
- The README and contributor guide describe general project workflows; they were not used to infer that those workflows are authorized in this C03 workspace.

## Sources

- `README.md`
- `CONTRIBUTING.md`
- `package.json`
- `packages/evershop/package.json`
- `packages/postgres-query-builder/package.json`
- `packages/create-evershop-app/package.json`
- `tsconfig.json`
- `packages/evershop/tsconfig.json`
- `packages/evershop/.swcrc`
- `jest.config.js`
- `packages/evershop/src/bin/start/index.ts`
- `packages/evershop/src/bin/lib/startUp.js`
- `packages/evershop/src/bin/lib/loadModules.js`
