# Prairie Cricket Farms — Full-Stack E-commerce Redesign

A complete redesign and rebuild of the Prairie Cricket Farms brand website.
New visual identity, design system, and production-ready e-commerce experience — built from scratch.

**Role:** Design + Development &nbsp;·&nbsp; **Stack:** Next.js · GSAP · Supabase &nbsp;·&nbsp; **Year:** 2025–2026

**[→ View Case Study](https://prairie-cricket-farms.vercel.app/case-study.html)**

---

## Overview

Prairie Cricket Farms is a Canadian family-owned brand producing sustainable cricket protein products — powders, snacks, and supplements — from their farm in Manitoba.

The brand's mission is compelling, but the existing digital presence didn't match the quality of the product. This project set out to fix that: a new visual identity, a scalable design system, and a complete e-commerce experience — all designed and coded from the ground up using a premium wellness brand as a design reference.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | SCSS Modules + shared design tokens |
| Animation | GSAP 3.14 + ScrollTrigger |
| Smooth Scroll | Lenis (synced with GSAP ticker) |
| Authentication | Supabase (Email + Google OAuth) |
| Carousel | keen-slider |
| Typography | Bodoni Moda (display) · Inter (body) — Google Fonts |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Getting Started

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file in the `web/` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Without these, auth-related pages (login / signup / account) will not function. All other pages work without env vars.

---

## Project Structure

```
web/src/
├── app/
│   ├── page.tsx                # Home page
│   ├── globals.scss            # Global reset, CSS variables, blur overlays
│   ├── about/                  # /about
│   ├── nutrition/              # /nutrition
│   ├── process/                # /process
│   ├── recipes/                # /recipes + /recipes/[slug]
│   ├── contact/                # /contact
│   ├── shop/                   # /shop + /shop/[handle]
│   ├── products/[handle]/      # Product detail
│   ├── account/                # Profile · Subscription · Wishlist
│   └── auth/                   # Login · Signup · OAuth callback
├── components/
│   ├── layout/                 # Header · Footer · LenisProvider
│   ├── cart/                   # CartDrawer (portal)
│   ├── account/                # AccountDrawer (portal)
│   ├── home/                   # 18 homepage sections
│   ├── shop/                   # CollectionHero · ProductCard · ProductGrid · ShopFaq
│   ├── product/                # ProductHero · ProductFeature · StickyCartBar
│   ├── about/                  # AboutHero · AboutSplit · AboutMission
│   ├── nutrition/              # NutritionBenefits · NutritionEco · NutritionDetails
│   ├── recipes/                # RecipesHero · RecipeCard · RecipeDetail
│   ├── process/                # ProcessSteps · ProcessAudience
│   ├── contact/                # ContactHero · ContactForm
│   └── shared/                 # Button
├── context/
│   ├── CartContext.tsx          # Global cart state + useCart hook
│   └── AuthContext.tsx          # Global auth state + useAuth hook
├── data/                        # products.ts · navigation.ts · recipes.ts
├── lib/                         # gsap-config.ts · supabase.ts · supabase-server.ts
├── styles/
│   ├── _tokens.scss             # All design tokens (colors, spacing, z-index, transitions)
│   └── _mixins.scss             # Token forwarding + utility mixins (breakpoints, typography, layout)
└── types/                       # Shared TypeScript types
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — 18-section landing page |
| `/shop` | Shop All — full product grid |
| `/shop/[handle]` | Collections — supplements, skincare, bestsellers, bundles |
| `/products/[handle]` | Product detail — image slider, ATC, sticky cart bar |
| `/about` | Brand story with sticky split layout |
| `/nutrition` | Nutritional benefits, eco impact, FAQ |
| `/recipes` | Recipe grid + detail with sticky image layout |
| `/process` | 5-step cricket farming process |
| `/contact` | Contact form with split layout |
| `/account` | Profile, subscriptions, wishlist (auth-protected) |

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `$color-brand-green` | `#00de5a` | CTA buttons, badges, accents |
| `$color-dark` | `#14171a` | Button backgrounds, dark sections |
| `$color-bg-primary` | `#fffdf5` | Page background |
| `$color-text` | `#37352f` | Body text |
| `$color-copper-dark` | `#8a5029` | Secondary accent (WCAG AA for text) |

All primary UI combinations meet **WCAG AAA** contrast standards (ratio ≥ 7:1).

### Typography

- **Display headings:** Bodoni Moda, `font-style: normal`
- **Section titles:** Inter uppercase, 500 weight
- **Body text:** Inter 400, 16px base
- **Buttons:** Inter uppercase 500, 13px

### Breakpoints

```scss
@include sm   // 480px+
@include md   // 768px+
@include lg   // 1024px+
@include xl   // 1280px+
@include xxl  // 1440px+
```

### Component Usage

```scss
@use "../../styles/mixins" as *;
// → all $tokens + @include mixins available in one import
```

---

## Key Implementation Notes

**Smooth scroll & animation sync**
Lenis + GSAP ticker integration. Use RAF loops — not `window.scroll` events — for scroll position detection to stay in sync with Lenis.

**Cart & Account drawers**
Both use `createPortal(jsx, document.body)` to avoid Lenis stacking context issues. Body blur is achieved via `filter: blur(25px)` on page content through `html.cart-open` / `html.account-open` classes — `backdrop-filter` has known Chrome rendering bugs when combined with Lenis opacity transitions.

**Sticky parallax sections**
`.sticky-reveal` uses `position: sticky`. IntersectionObserver is unreliable for sticky elements — use `previousElementSibling.getBoundingClientRect()` instead.

**Sticky cart bar**
Uses a `requestAnimationFrame` loop to track hero visibility and hide before the sticky parallax section. `window.scroll` events don't fire reliably with Lenis.

**Image optimization**
`unoptimized: true` in development (instant asset updates, no cache issues), auto WebP conversion + caching in production — toggled via `NODE_ENV`.

**Header transform rule**
Never apply CSS `transform` to the header element — it overwrites the scroll-hide `translateY(-100%)` and causes the nav to snap into view unexpectedly. Use `filter` only.

---

## Scope

This project is **production-ready**. The Shopify account is fully configured — products, collections, checkout, and payment settings are all set up.

To go live, two steps remain:

1. Connect a custom domain
2. Wire the Shopify Storefront API to replace static data (`src/data/`) with live product and order feeds

All other functionality — auth (Supabase), cart UI, account pages, animations, responsive layouts — is complete and deployable as-is.

---

## Image Naming Convention

All assets follow the `pcf-{usage}-{description}.{ext}` format under `public/images/`:

```
public/images/
├── hero/              pcf-hero-main.jpg
├── products/carousel/ p1–p5-default.jpg · p1–p5-hover.jpg
├── testimonials/      t1–t7-poster.jpg
├── community/         c1–c9-poster.jpg
├── eco/               eco-land · eco-energy · eco-food · eco-water
├── process/           audience-active · families · nondairy · pets
└── contact/           pcf-contact-founders.jpg
```

---

## Accessibility

- WCAG AAA contrast on all primary UI
- `prefers-reduced-motion` — CSS global override + GSAP runtime check
- `:focus-visible` green outline applied globally
- Semantic HTML with ARIA labels throughout
- iOS Safari `100svh` progressive enhancement (4 locations)

---

## License

This project is for portfolio and demonstration purposes only.
Prairie Cricket Farms is a real brand. This codebase is an independent redesign concept and is not affiliated with or endorsed by Prairie Cricket Farms.

---

*Designed & developed by Moon — 2025–2026*
