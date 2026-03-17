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

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Shop Prairie Cricket Farms' complete range of cricket protein products. Sustainable, nutritious, and delicious.",
};

export default function ShopPage() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 1, background: "var(--color-bg, #ffffff)" }}>
        <CollectionHero
          eyebrow="Shop All"
          heading={<>Better Protein.<br />Better Results.</>}
          description="Premium cricket-based protein for every goal. Each product is designed to fuel your body sustainably — one simple step. Real results. No compromise."
        />
        <ProductGrid />
        <ShopPromo />
        <ResultsGlance reverse />
        <EditorialHeadline
          eyebrow="Real Results"
          heading={
            <>
              Backed by Science.
              <br />
              Loved by Customers.
            </>
          }
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
