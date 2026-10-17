# Reviewed EverShop PBIs

Reviewed, copy-ready PBI text for the clean EverShop v2.2.1 workspace. Scope, test setup, and evaluation are agreed separately before work begins.

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
