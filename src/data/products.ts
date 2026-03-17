import type { Product } from "@/types";

export const products: Product[] = [
  // ── Supplements ───────────────────────────────────────────────
  {
    id: 1,
    title: "Protein-Packed Cricket Powder (Large)",
    handle: "cricket-powder-large",
    description:
      "Our large-size 100% finely milled roasted cricket powder. The most sustainable, complete protein source you can add to your daily routine. One scoop delivers a full amino acid profile alongside B12, iron, and omega-3 fatty acids.",
    price: "49.99",
    image: "/images/products/carousel/p1-default.jpg",
    hoverImage: "/images/products/carousel/p1-hover.jpg",
    images: [
      "/images/products/carousel/p1-default.jpg",
      "/images/products/carousel/p1-hover.jpg",
    ],
    tags: ["Supplement", "Powder", "Large"],
    badge: "BEST VALUE",
    productLine: "supplement",
    flavor: "Unflavored",
    benefit: "High Protein",
    rating: 4.9,
    reviewCount: 128,
    available: true,
    collections: ["supplements", "bestsellers"],
    benefits: [
      "Complete protein — all 9 essential amino acids",
      "65% protein by weight, more than chicken or beef",
      "Naturally high in B12, iron & omega-3 fatty acids",
      "Low in fat and carbohydrates",
      "14× less greenhouse gas than beef protein",
    ],
    howToUse:
      "Add 1–2 scoops (10–20 g) to smoothies, yogurt, oatmeal, baked goods, or any recipe that could use a protein boost. Mix well with water or your favourite liquid. Best results with daily use.",
    ingredients:
      "100% finely milled roasted cricket (Acheta domesticus) powder.",
    nutritionNote:
      "Per 10 g serving: Calories 50 kcal · Protein 6.5 g · Fat 1.4 g · Carbohydrates 0.5 g · Iron 1.8 mg (10% DV) · Vitamin B12 0.6 µg (25% DV)",
    variants: [
      { label: "Large (300 g)", size: "300 g · ~30 servings", price: "49.99", badge: "BEST VALUE", handle: "cricket-powder-large", image: "/images/products/carousel/p1-default.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428365689198" },
      { label: "Standard (150 g)", size: "150 g · ~15 servings", price: "23.99", handle: "cricket-powder-standard", image: "/images/products/carousel/p2-default.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428365721966" },
    ],
  },
  {
    id: 2,
    title: "Protein-Packed Cricket Powder (Standard)",
    handle: "cricket-powder-standard",
    description:
      "The same premium 100% finely milled roasted cricket powder in a standard size — perfect for first-timers or those who want to try before committing to the large bag.",
    price: "23.99",
    image: "/images/products/carousel/p2-default.jpg",
    hoverImage: "/images/products/carousel/p2-hover.jpg",
    images: [
      "/images/products/carousel/p2-default.jpg",
      "/images/products/carousel/p2-hover.jpg",
    ],
    tags: ["Supplement", "Powder", "Standard"],
    productLine: "supplement",
    flavor: "Unflavored",
    benefit: "High Protein",
    rating: 4.8,
    reviewCount: 214,
    available: true,
    collections: ["supplements"],
    benefits: [
      "Complete protein — all 9 essential amino acids",
      "65% protein by weight, more than chicken or beef",
      "Naturally high in B12, iron & omega-3 fatty acids",
      "Low in fat and carbohydrates",
      "14× less greenhouse gas than beef protein",
    ],
    howToUse:
      "Add 1–2 scoops (10–20 g) to smoothies, yogurt, oatmeal, baked goods, or any recipe that could use a protein boost. Mix well with water or your favourite liquid. Best results with daily use.",
    ingredients:
      "100% finely milled roasted cricket (Acheta domesticus) powder.",
    nutritionNote:
      "Per 10 g serving: Calories 50 kcal · Protein 6.5 g · Fat 1.4 g · Carbohydrates 0.5 g · Iron 1.8 mg (10% DV) · Vitamin B12 0.6 µg (25% DV)",
    variants: [
      { label: "Large (300 g)", size: "300 g · ~30 servings", price: "49.99", badge: "BEST VALUE", handle: "cricket-powder-large", image: "/images/products/carousel/p1-default.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428365689198" },
      { label: "Standard (150 g)", size: "150 g · ~15 servings", price: "23.99", handle: "cricket-powder-standard", image: "/images/products/carousel/p2-default.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428365721966" },
    ],
  },

  // ── Snacks ───────────────────────────────────────────────────
  {
    id: 3,
    title: "Unseasoned Roasted Crickets",
    handle: "unseasoned-roasted-crickets",
    description:
      "Clean, whole roasted crickets with zero seasoning. A natural, crunchy snack loaded with protein — versatile enough to top any dish or enjoy straight from the bag.",
    price: "9.99",
    image: "/images/products/carousel/p3-default.jpg",
    hoverImage: "/images/products/carousel/p3-hover.jpg",
    images: [
      "/images/products/carousel/p3-default.jpg",
      "/images/products/carousel/p3-hover.jpg",
    ],
    tags: ["Snack", "Roasted", "Whole"],
    productLine: "snack",
    flavor: "Unseasoned",
    benefit: "Protein Snack",
    rating: 4.6,
    reviewCount: 87,
    available: true,
    collections: ["snacks"],
    benefits: [
      "Over 60% protein by weight",
      "Naturally high in B12 & iron",
      "Omega-3 & omega-6 fatty acids",
      "Gluten-free, no artificial additives",
      "14× less water use than beef production",
    ],
    howToUse:
      "Enjoy straight from the bag as a crunchy snack. Sprinkle over salads, grain bowls, or avocado toast. Toss into trail mix, granola, or use as a pizza topping. No cooking required.",
    ingredients:
      "Roasted whole cricket (Acheta domesticus).",
    nutritionNote:
      "Per 10 g serving: Calories 63 kcal · Protein 6.2 g · Fat 2.0 g · Carbohydrates 0.3 g · Iron 1.5 mg (8% DV) · Vitamin B12 0.5 µg (21% DV)",
    variants: [
      { label: "Small (25 g)", size: "25 g · snack size", price: "3.99", handle: "unseasoned-roasted-crickets", image: "/images/products/carousel/p3-default.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428369523054" },
      { label: "Large (60 g)", size: "60 g · sharing size", price: "9.99", badge: "BEST VALUE", handle: "unseasoned-roasted-crickets", image: "/images/products/carousel/p3-default.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428369555822" },
    ],
  },
  {
    id: 4,
    title: "Dill Pickle Roasted Crickets",
    handle: "dill-pickle-roasted-crickets",
    description:
      "Tangy, bold dill pickle flavored roasted crickets. A crunchy, high-protein snack that satisfies your craving for something sour and savoury — with a sustainable twist.",
    price: "9.99",
    image: "/images/products/carousel/p4-default.jpg",
    hoverImage: "/images/products/carousel/p4-hover.jpg",
    images: [
      "/images/products/carousel/p4-default.jpg",
      "/images/products/carousel/p4-hover.jpg",
    ],
    tags: ["Snack", "Roasted", "Flavored"],
    badge: "BESTSELLER",
    productLine: "snack",
    flavor: "Dill Pickle",
    benefit: "Protein Snack",
    rating: 4.7,
    reviewCount: 163,
    available: true,
    collections: ["snacks", "bestsellers"],
    benefits: [
      "Over 60% protein by weight",
      "Real dill, garlic & vinegar seasoning",
      "Naturally high in B12 & iron",
      "Gluten-free, no artificial colours",
      "Sustainably farmed in Manitoba, Canada",
    ],
    howToUse:
      "Eat straight from the bag as a bold, tangy snack. Pair with beer or cider. Add to charcuterie boards, grain bowls, or wraps for extra crunch and protein.",
    ingredients:
      "Roasted whole cricket (Acheta domesticus), dill pickle seasoning (salt, vinegar powder, dill weed, garlic powder, onion powder).",
    nutritionNote:
      "Per 10 g serving: Calories 60 kcal · Protein 5.9 g · Fat 2.1 g · Carbohydrates 0.8 g · Iron 1.4 mg (8% DV) · Vitamin B12 0.5 µg (21% DV)",
    variants: [
      { label: "Small (25 g)", size: "25 g · snack size", price: "3.99", handle: "dill-pickle-roasted-crickets", image: "/images/products/carousel/p4-default.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428371816814" },
      { label: "Large (60 g)", size: "60 g · sharing size", price: "9.99", badge: "BESTSELLER", handle: "dill-pickle-roasted-crickets", image: "/images/products/carousel/p4-default.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428371849582" },
    ],
  },
  {
    id: 5,
    title: "Smokey BBQ Roasted Crickets",
    handle: "smokey-bbq-roasted-crickets",
    description:
      "Rich, smokey BBQ flavored roasted crickets with a classic backyard taste. A high-protein, sustainably sourced snack that delivers bold flavour without the guilt.",
    price: "9.99",
    image: "/images/products/carousel/p5-default.jpg",
    hoverImage: "/images/products/carousel/p5-hover.jpg",
    images: [
      "/images/products/carousel/p5-default.jpg",
      "/images/products/carousel/p5-hover.jpg",
    ],
    tags: ["Snack", "Roasted", "Flavored"],
    badge: "BESTSELLER",
    productLine: "snack",
    flavor: "Smokey BBQ",
    benefit: "Protein Snack",
    rating: 4.8,
    reviewCount: 201,
    available: true,
    collections: ["snacks", "bestsellers"],
    benefits: [
      "Over 60% protein by weight",
      "Smokey, sweet BBQ seasoning",
      "Naturally high in B12 & iron",
      "No artificial flavours or preservatives",
      "Farmed with 80% less land than livestock",
    ],
    howToUse:
      "Snack straight from the bag. Crumble over nachos or tacos for a protein-packed topping. Mix into trail mix with nuts and dried fruit. Great as a campfire snack.",
    ingredients:
      "Roasted whole cricket (Acheta domesticus), BBQ seasoning (salt, sugar, smoked paprika, garlic powder, onion powder, tomato powder, black pepper).",
    nutritionNote:
      "Per 10 g serving: Calories 62 kcal · Protein 5.8 g · Fat 2.0 g · Carbohydrates 1.2 g · Iron 1.4 mg (8% DV) · Vitamin B12 0.5 µg (21% DV)",
    variants: [
      { label: "Small (25 g)", size: "25 g · snack size", price: "3.99", handle: "smokey-bbq-roasted-crickets", image: "/images/products/carousel/p5-default.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428374438254" },
      { label: "Large (60 g)", size: "60 g · sharing size", price: "9.99", badge: "BESTSELLER", handle: "smokey-bbq-roasted-crickets", image: "/images/products/carousel/p5-default.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428374471022" },
    ],
  },
  {
    id: 6,
    title: "Salt & Vinegar Roasted Crickets",
    handle: "salt-vinegar-roasted-crickets",
    description:
      "Sharp, tangy salt & vinegar flavored roasted crickets with an addictive crunch. All the flavour of your favourite chip — with a fraction of the environmental footprint.",
    price: "9.99",
    image: "/images/products/carousel/p6-default.jpg",
    hoverImage: "/images/products/carousel/p6-hover.jpg",
    images: [
      "/images/products/carousel/p6-default.jpg",
      "/images/products/carousel/p6-hover.jpg",
    ],
    tags: ["Snack", "Roasted", "Flavored"],
    badge: "NEW",
    productLine: "snack",
    flavor: "Salt & Vinegar",
    benefit: "Protein Snack",
    rating: 4.7,
    reviewCount: 145,
    available: true,
    collections: ["snacks"],
    benefits: [
      "Over 60% protein by weight",
      "Classic salt & malt vinegar seasoning",
      "Naturally high in B12 & iron",
      "Gluten-free, no artificial colours",
      "Sustainably farmed in Manitoba, Canada",
    ],
    howToUse:
      "Eat straight from the bag for a punchy, tangy snack. Pair with dips or hummus. Sprinkle over fish & chips for extra crunch. Perfect with a cold drink.",
    ingredients:
      "Roasted whole cricket (Acheta domesticus), salt & vinegar seasoning (salt, malt vinegar powder, citric acid).",
    nutritionNote:
      "Per 10 g serving: Calories 59 kcal · Protein 5.9 g · Fat 1.9 g · Carbohydrates 0.9 g · Iron 1.4 mg (8% DV) · Vitamin B12 0.5 µg (21% DV)",
    variants: [
      { label: "Small (25 g)", size: "25 g · snack size", price: "3.99", handle: "salt-vinegar-roasted-crickets", image: "/images/products/jars/corals.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428396163438" },
      { label: "Large (60 g)", size: "60 g · sharing size", price: "9.99", badge: "NEW", handle: "salt-vinegar-roasted-crickets", image: "/images/products/jars/corals.jpg", shopifyVariantId: "gid://shopify/ProductVariant/53428396196206" },
    ],
  },
];

export const productLineColors: Record<string, string> = {
  supplement: "#00c853",
  snack: "#b06634",
  greens: "#6B9B37",
  pinks: "#E8A0B4",
  oranges: "#F5A623",
  yellows: "#F7D055",
  lavenders: "#B8A9D4",
  corals: "#F4A68F",
  purples: "#7B5EA7",
  blues: "#6B9CC5",
  hydration: "#72D4E8",
};
