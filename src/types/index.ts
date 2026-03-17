export interface ProductVariant {
  label: string;
  size: string;
  price: string;
  badge?: string;
  handle?: string; // 다른 제품으로 연결 시
  image?: string;
  shopifyVariantId?: string; // Shopify variant GID (gid://shopify/ProductVariant/...)
}

export interface Product {
  id: number;
  title: string;
  handle: string;
  description: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  hoverImage?: string;
  images: string[];
  tags: string[];
  badge?: string;
  productLine: ProductLine;
  flavor: string;
  benefit: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  collections?: string[];
  // 제품 상세 페이지용
  benefits?: string[];
  howToUse?: string;
  ingredients?: string;
  nutritionNote?: string;
  variants?: ProductVariant[];
}

export type ProductLine =
  | "supplement"
  | "snack"
  | "greens"
  | "pinks"
  | "oranges"
  | "yellows"
  | "lavenders"
  | "corals"
  | "purples"
  | "blues"
  | "hydration"
  | "bundle"
  | "accessory";

export interface Collection {
  title: string;
  handle: string;
  description: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  product: string;
  date: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  founder: string;
  founderQuote: string;
  socialLinks: {
    instagram: string;
    tiktok: string;
  };
}
