import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CollectionHero from "@/components/shop/CollectionHero";
import ShopPromo from "@/components/shop/ShopPromo";
import ProductGrid from "@/components/shop/ProductGrid";
import ResultsGlance from "@/components/home/ResultsGlance";
import EditorialHeadline from "@/components/home/EditorialHeadline";
import TestimonialGrid from "@/components/home/TestimonialGrid";
import ShopFaq from "@/components/shop/ShopFaq";
import CommunityBanner from "@/components/home/CommunityBanner";
import CommunityGrid from "@/components/home/CommunityGrid";
import NewsletterSignup from "@/components/home/NewsletterSignup";

// ── Collection config ─────────────────────────────────────────

interface CollectionConfig {
  eyebrow: string;
  heading: React.ReactNode;
  description: string;
  editorialEyebrow: string;
  editorialHeading: string;
}

const collectionMap: Record<string, CollectionConfig> = {
  skincare: {
    eyebrow: "Protein Skincare",
    heading: <>Skin That Speaks<br />For Itself.</>,
    description:
      "Cricket-derived collagen and bioactive peptides that work from the inside out. One scoop a day for skin that glows, holds, and renews.",
    editorialEyebrow: "Real Results",
    editorialHeading: "Backed by Experts. Adored by Faces.",
  },
  supplements: {
    eyebrow: "Cricket Protein Supplements",
    heading: <>Better Protein.<br />Better Results.</>,
    description:
      "Premium cricket-based supplements for every goal. Sustainably sourced, scientifically formulated, and designed for real results.",
    editorialEyebrow: "Absolute Results",
    editorialHeading: "Backed by Experts. Adored by Faces.",
  },
  bestsellers: {
    eyebrow: "Bestsellers",
    heading: <>Our Most Loved<br />Products.</>,
    description:
      "The formulas our community reaches for every single day. Tried, tested, and trusted by thousands.",
    editorialEyebrow: "Real Results",
    editorialHeading: "Backed by Experts. Adored by Faces.",
  },
  bundles: {
    eyebrow: "Bundles",
    heading: <>More Together.<br />Save More.</>,
    description:
      "Curated combinations of our best-loved cricket protein products. Stack your benefits and save.",
    editorialEyebrow: "Real Results",
    editorialHeading: "Backed by Experts. Adored by Faces.",
  },
  snacks: {
    eyebrow: "Roasted Cricket Snacks",
    heading: <>Crunch With<br />Purpose.</>,
    description:
      "Whole roasted crickets in bold, crave-worthy flavours. High-protein, sustainably farmed, and impossibly crunchy.",
    editorialEyebrow: "Snack Smarter",
    editorialHeading: "Backed by Experts. Adored by Faces.",
  },
};

// ── Static params ─────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(collectionMap).map((handle) => ({ handle }));
}

// ── Metadata ──────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const config = collectionMap[handle];
  if (!config) return { title: "Not Found" };

  return {
    title: `${config.eyebrow} | Prairie Cricket Farms`,
    description: config.description,
  };
}

// ── Page ──────────────────────────────────────────────────────

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const config = collectionMap[handle];

  if (!config) notFound();

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, background: "var(--color-bg, #ffffff)" }}>
        <CollectionHero
          eyebrow={config.eyebrow}
          heading={config.heading}
          description={config.description}
        />
        <ProductGrid collection={handle} />
        <ShopPromo />
        <ResultsGlance />
        <EditorialHeadline
          eyebrow={config.editorialEyebrow}
          heading={config.editorialHeading}
          cta={{ label: "See More Stories", href: "/about" }}
        />
        <TestimonialGrid />
        <ShopFaq />
      </div>
      <div className="sticky-reveal">
        <CommunityBanner />
      </div>
      <div className="after-reveal">
        <CommunityGrid />
        <NewsletterSignup />
      </div>
    </>
  );
}
