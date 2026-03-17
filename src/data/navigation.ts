import type { NavItem } from "@/types";

export interface NavDropdownItem {
  label: string;
  href: string;
  badge?: "bestseller" | "new" | "sale";
  badgeText?: string;
}

export interface MegaMenuGroup {
  heading?: string;
  items: NavDropdownItem[];
}

export interface MegaMenuPromo {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  href: string;
}

export interface MegaMenuColumn {
  groups: MegaMenuGroup[];
}

export interface MegaMenuCard {
  image: string;
  alt: string;
  title: string;
  cta: string;
  href: string;
}

export interface NavItemWithChildren {
  label: string;
  href: string;
  mobileOnly?: boolean;
  children?: NavDropdownItem[];
  megaMenu?: {
    columns: MegaMenuColumn[];
    promos?: MegaMenuPromo[]; // 1~N개 promo 카드 (megaColumns 마지막 컬럼들)
    cards?: MegaMenuCard[]; // Community-style image cards
  };
}

// ── Main Navigation ───────────────────────────────────────────
export const mainNav: NavItemWithChildren[] = [
  {
    label: "Our Shop",
    href: "/shop",
    children: [
      { label: "Shop All", href: "/shop" },
      { label: "Cricket Powder (Large)", href: "/products/cricket-powder-large", badge: "bestseller" },
      { label: "Cricket Powder (Standard)", href: "/products/cricket-powder-standard" },
      { label: "Unseasoned Roasted Crickets", href: "/products/unseasoned-roasted-crickets" },
      { label: "Dill Pickle Roasted Crickets", href: "/products/dill-pickle-roasted-crickets" },
      { label: "Smokey BBQ Roasted Crickets", href: "/products/smokey-bbq-roasted-crickets" },
      { label: "Salt & Vinegar Roasted Crickets", href: "/products/salt-vinegar-roasted-crickets" },
    ],
    megaMenu: {
      columns: [
        {
          groups: [
            {
              items: [
                { label: "Shop All", href: "/shop" },
              ],
            },
            {
              heading: "SUPPLEMENTS",
              items: [
                { label: "Cricket Powder (Large)", href: "/products/cricket-powder-large", badge: "bestseller" },
                { label: "Cricket Powder (Standard)", href: "/products/cricket-powder-standard" },
              ],
            },
            {
              heading: "SNACKS",
              items: [
                { label: "Unseasoned Roasted Crickets", href: "/products/unseasoned-roasted-crickets" },
                { label: "Dill Pickle Roasted Crickets", href: "/products/dill-pickle-roasted-crickets" },
                { label: "Smokey BBQ Roasted Crickets", href: "/products/smokey-bbq-roasted-crickets" },
                { label: "Salt & Vinegar Roasted Crickets", href: "/products/salt-vinegar-roasted-crickets" },
              ],
            },
          ],
        },
      ],
      promos: [
        {
          image: "/images/hero/pcf-hero-products.jpg",
          alt: "Cricket Protein Powder",
          title: "Cricket Protein Powder",
          subtitle: "SHOP SUPPLEMENTS",
          href: "/shop/supplements",
        },
        {
          image: "/images/products/carousel/p1-default.jpg",
          alt: "Roasted Crickets Snacks",
          title: "Roasted Crickets",
          subtitle: "SHOP SNACKS",
          href: "/shop/snacks",
        },
        {
          image: "/images/products/carousel/p3-default.jpg",
          alt: "Bestsellers",
          title: "Our Bestsellers",
          subtitle: "SHOP BESTSELLERS",
          href: "/shop/bestsellers",
        },
      ],
    },
  },
  {
    label: "Why Us",
    href: "/about",
  },
  {
    label: "Nutrition",
    href: "/nutrition",
  },
  {
    label: "Recipes",
    href: "/recipes",
  },
  {
    label: "Contact",
    href: "/contact",
    mobileOnly: true,
  },
];

// ── Mobile Quick Nav ──────────────────────────────────────────
export const mobileQuickNav: NavDropdownItem[] = [
  { label: "Supplements", href: "/shop/supplements" },
  { label: "Snacks", href: "/shop/snacks" },
  { label: "Bestsellers", href: "/shop/bestsellers" },
];

// ── Secondary Nav ─────────────────────────────────────────────
export const secondaryNav: NavItem[] = [
  { label: "Account", href: "/account" },
];

// ── Announcement Bar Messages ─────────────────────────────────
export const announcements: string[] = [
  "Subscribe & Save 40%",
  "Free delivery on all orders",
  "New: Smokey BBQ Roasted Crickets",
];

// ── Footer ────────────────────────────────────────────────────
export const footerNav = {
  shop: [
    { label: "Shop All", href: "/shop" },
    { label: "Cricket Protein Powder", href: "/shop/supplements" },
    { label: "Roasted Cricket Snacks", href: "/shop/snacks" },
    { label: "Bestsellers", href: "/shop/bestsellers" },
  ] as NavItem[],
  explore: [
    { label: "About Us", href: "/about" },
    { label: "Nutritional Facts", href: "/nutrition" },
    { label: "Our Process", href: "/process" },
    { label: "Recipes", href: "/recipes" },
  ] as NavItem[],
  account: [
    { label: "My Account", href: "/account" },
    { label: "Wishlist", href: "/account/wishlist" },
    { label: "Subscription", href: "/account/subscription" },
    { label: "Contact Us", href: "/contact" },
  ] as NavItem[],
};
