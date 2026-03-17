# Changelog

All notable changes to Prairie Cricket Farms are documented here.

---

## [Unreleased]

---

## QA Rounds — Bug Fixes & Polish

### Round 6 — Branding & Dead Links (final)

**`src/components/shop/ShopPromo.tsx`**
- Fixed dead product link: `/products/the-greens` → `/products/cricket-powder-large`
- Updated heading and copy from "The Greens" Absolute Collagen branding → "Introducing Cricket Powder" (PCF branding)

**`src/components/layout/Footer.tsx`**
- Changed shipping country from "United States" → "Canada" (PCF is a Canadian brand)

---

### Round 5 — Navigation & Footer Branding

**`src/app/shop/[handle]/page.tsx`**
- Added missing `snacks` entry to `collectionMap` — `/shop/snacks` was returning 404
- Copy: "Roasted Cricket Snacks · Crunch With Purpose."

**`src/data/navigation.ts`**
- Replaced Absolute Collagen product terminology in `footerNav.products` with PCF brand names:
  - "Collagen Sachets" → "Cricket Protein Powder" → `/shop/supplements`
  - "Collagen Shots" → "Roasted Cricket Snacks" → `/shop/snacks`
  - Added "Bestsellers" → `/shop/bestsellers`

---

### Round 4 — Header Cart & Account Data

**`src/components/layout/Header.tsx`**
- Cart button was a `<Link href="/cart">` with hardcoded `(0)` — replaced with a `<button>` wired to `useCart()`:
  - Live `totalCount` display
  - `onClick` → `openCart()` (opens CartDrawer instead of navigating to dead `/cart` route)

**`src/app/account/page.tsx`**
- Updated `MOCK_ORDERS` to use real PCF product names and prices:
  - `#PCF-10042`: Cricket Powder (Large) × 2 — $99.98
  - `#PCF-10031`: Dill Pickle Crickets × 1, Smokey BBQ Crickets × 1 — $19.98
  - `#PCF-10019`: Cricket Powder (Standard) × 1, Unseasoned Crickets × 2 — $43.97
- Total Spent corrected: $225 → $163.93

**`src/context/CartContext.tsx`**
- Removed unused `meta?: Partial<CartItem>` parameter from `addItem` interface — was declared but never used in implementation

---

### Round 3 — Account Pages

**`src/app/account/subscription/page.tsx`**
- Subscription frequency select, "Save Changes", and "Skip Next Shipment" buttons now `disabled` after cancellation
- "Cancel Subscription" button hidden (conditional render) once subscription is cancelled
- Next shipment display shows cancellation message instead of date when cancelled
- Mock product name updated to match real PCF product data

**`src/app/account/wishlist/page.tsx`**
- Replaced static mock array with data derived from `src/data/products.ts` using real product handles
- `handleAddToCart` now calls `addItem(variantId, 1)` with the actual Shopify variant GID from `product.variants`
- Removed wishlist items pointing to non-existent product handles

**`src/app/auth/login/page.tsx`**
- Auth error query param (`?error=auth_failed`) was being silently ignored — now read in `useState` initialiser and displayed to the user

---

### UI Polish — Header Button Styles

**`src/components/layout/Header.module.scss`**

**BAG button browser default reset:**
- `<button>` elements render with browser-default grey background, border, and padding
- Added explicit reset to `.iconBtn`: `background: none; border: none; padding: 0; outline: none`
- BAG button now visually matches the SIGN IN link

**Hover underline animation unification:**
- SIGN IN and BAG(0) buttons previously used `transform: translateX(-100% → 0)` for the hover underline
- Nav links (OUR SHOP / OFFERS / QUIZ / WHY US / COMMUNITY) use `width: 0 → 100%`
- Unified `.iconBtnLabel::after` to use the same `width`-based animation pattern and easing (`cubic-bezier(0.62, 0.05, 0.01, 0.99)`) for consistent feel across the entire nav

---

## Features Completed

### Homepage
18 sections: HeroBanner · ProductCarousel · SplitFeature · QuizBanner · EditorialHeadline (×2) · CategoryGrid · BrandStatement · BrandPillars · VideoFeature · TestimonialGrid · ResultsGlance · PressQuotes · LatestArticles · CommunityBanner · CommunityGrid · NewsletterSignup · Footer

### Shop
- `/shop` — Shop All with full product grid
- `/shop/[handle]` — Dynamic collection pages (supplements · snacks · bestsellers · skincare)
- ProductCard with hover image swap, badges, ratings
- ShopPromo, ShopFaq (CSS grid accordion animation)

### Product Detail
- `/products/[handle]` — Image slider, variant selector, ATC → CartDrawer
- ProductFeature (sticky left + accordion right)
- ProductTabs (Description / Ingredients / How To Use)
- RelatedProducts grid
- StickyCartBar (RAF-based scroll detection, Lenis-compatible)

### Cart
- Global CartContext (items · totalCount · totalPrice · open/close)
- CartDrawer (portal, slide-in, blur overlay, ESC key, body scroll lock)
- ATC connected from ProductHero and StickyCartBar

### Auth & Account
- Supabase SSR auth (login · signup · OAuth callback · middleware protection)
- Account dashboard (mock orders + stats)
- Subscription management page
- Wishlist page (products derived from real data)
