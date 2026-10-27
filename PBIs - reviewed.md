# EverShop PBIs — Reviewed and Proposed

PBIs 1–3 are reviewed, copy-ready text for the clean EverShop v2.2.1 workspace. PBIs 4–6 are draft suggestions for the next AgenticLab C02 prototype cycle, not yet selected or authorized. Scope, test setup, and evaluation are agreed separately before work begins.

## PBI 1 — Accessible quantity selector

### User story

As a shopper, I want an accessible way to set product quantity on the product page and in the cart, so I can choose the amount I want and understand when an entry is invalid.

### Acceptance criteria

- A reusable quantity selector is integrated into product detail and cart views.
- Quantities are whole numbers with a minimum of 1. Preserve the product page's current lack of a maximum unless a business limit is specified; preserve the cart's current maximum of 99.
- The shopper can type a quantity and use increment/decrement controls with a keyboard.
- Invalid, empty, fractional, or out-of-range values are clearly reported and cannot be submitted. Invalid values are not silently clamped.
- Adding a product uses the latest committed valid quantity.
- Cart quantity changes use the existing cart update flow, show loading state, and provide feedback on failure without losing the last valid quantity.
- Inputs, buttons, and validation feedback have appropriate accessible names/semantics.
- Isolated browser tests cover valid and invalid input, bounds, recovery, keyboard use, loading, add/update callbacks, and failure handling without requiring the running EverShop app or PostgreSQL.

## PBI 2 — Accessible product-image viewer

### User story

As a shopper using a keyboard or assistive technology, I want to open and navigate product images and close the viewer without losing my place.

### Acceptance criteria

- The main product image can be opened using a keyboard.
- The fullscreen viewer is exposed as a named dialog.
- Focus moves into the viewer when it opens, stays appropriately managed while open, and returns to the opener when it closes.
- Escape closes the viewer; image navigation and close controls are keyboard-operable and clearly named.
- Closing the viewer restores the page's previous scroll behavior.
- Event listeners and delayed slider work are cleaned up on close and unmount.
- Isolated browser tests cover opening, navigation, focus, Escape/close, scroll restoration, and cleanup without requiring the running EverShop app or PostgreSQL.

## PBI 3 — Persistent customer wishlist

### User story

As a signed-in customer, I want to save products to a wishlist and revisit them later, so I can keep track of products I may want to buy.

### Acceptance criteria

- A signed-in customer can add and remove products from a wishlist that persists across sessions.
- Wishlist reads and writes are scoped to the authenticated customer; one customer cannot read or modify another customer's wishlist.
- Duplicate saves are handled consistently.
- Missing, deleted, or unavailable products are handled safely when displaying saved items.
- The storefront provides understandable loading, empty, populated, and error states, with a way to return to a saved product.
- Service/API tests verify persistence and customer isolation against an isolated disposable PostgreSQL database; they do not use a shared development or production database.
- User-facing tests cover the main wishlist flow.

---

## Proposed PBIs for the next AgenticLab C02 prototype cycle

**Status:** Draft suggestions only. These PBIs are not yet selected or authorized for implementation. Agree the application scope, database/test setup, and workflow before starting each one. Do not force a knowledge candidate; record only a genuinely new, verified finding.

## PBI 4 — Inventory reservation concurrency regression

### User story

As a delivery engineer, I want concurrent inventory reservations tested beyond the existing two-request case, so we can verify stock safety under realistic contention and understand the current cross-warehouse locking behavior.

### Acceptance criteria

- Before running database tests, agree on and verify an isolated disposable PostgreSQL target. Never use a shared development or production database.
- Test three-way and five-way simultaneous reservations for the same product and warehouse, with initial stock chosen to exercise both success and rejection paths.
- Assert that successful reservations do not exceed available stock, no stock quantity becomes negative, and rejected requests leave state consistent.
- Test same-product reservations across two warehouses and different-product reservations; report observed serialization/contention without changing the locking strategy unless separately approved.
- Preserve the existing two-way behavior and run its regression case.
- Start with the existing advisory-lock knowledge route, verify its claim against current source, and distinguish verified findings from inference.
- If testing reveals a new, reusable constraint or risk, include it in the task-local handoff. Stage/promote it only through the reviewed C02 workflow; a candidate is not required for PBI completion.

**C02 value:** Strong retrieval test for the existing concurrency record and a natural opportunity to validate candidate staging if new evidence actually emerges.

**Dependency / stop condition:** If a safe disposable PostgreSQL target cannot be verified and explicitly authorized, stop before running integration tests. Consider PBI 6 as a prerequisite rather than weakening the database boundary.

## PBI 5 — Wishlist guest-to-account transition

### User story

As a shopper, I want wishlist items saved before sign-in to be handled predictably when I sign in, so I do not lose intended saves or see another customer's private list.

### Acceptance criteria

- Resolve the product decision before implementation: merge guest and account lists, replace one with the other, or keep them separate. Do not infer the policy from implementation convenience.
- Test the approved behavior for sign-in, duplicate products, sign-out, and switching between two accounts.
- Verify that no account can read or modify another account's list.
- Preserve the behavior and persistence guarantees already accepted for PBI 3.
- Use an isolated database for persistence/isolation tests; mock-only UI tests do not establish persistence or authorization.
- Carry the approved merge/ownership decision in the task-local knowledge handoff; stage it only if it meets the C02 candidate criteria and the user-approved write path is enabled.

**C02 value:** Exercises a real cross-session/account boundary and may produce a reusable, user-approved decision about wishlist ownership and merge semantics.

**Dependency / stop condition:** Requires an approved isolated database test path for persistence and account-isolation claims.

## PBI 6 — Disposable database test fixture (conditional prerequisite)

### User story

As a delivery engineer, I want database integration tests to use a verifiably disposable database, so tests cannot read or modify shared, development, or production data.

### Acceptance criteria

- Require explicit test-only database configuration; fail closed if the target cannot be verified as disposable.
- Give each test run an isolated database/schema identity and ensure concurrent runs cannot share it accidentally.
- Cleanup may remove only resources created by that run; injected setup/test/cleanup failures leave shared targets untouched and report any owned residue.
- Add synthetic guard tests for missing, ambiguous, shared, and production-shaped targets before using the fixture with application tests.
- Do not read `.env`, protected `data/`, or database contents to discover a test target; use an explicitly approved configuration path.

**C02 value:** Provides a reusable, safety-critical test procedure that can unblock PBI 4 and PBI 5 without weakening the delivery workspace's data boundary.

**Sequencing note:** PBI 4 is the preferred first real-project validation if an isolated database path already exists. Otherwise, do PBI 6 first; do not start PBI 4 or PBI 5's persistence tests until the fixture is verified and separately authorized.
