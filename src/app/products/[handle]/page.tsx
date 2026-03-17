import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductHero from "@/components/product/ProductHero";
import EditorialHeadline from "@/components/home/EditorialHeadline";
import TestimonialGrid from "@/components/home/TestimonialGrid";
import ShopFaq from "@/components/shop/ShopFaq";
import QuizBanner from "@/components/home/QuizBanner";
import CommunityBanner from "@/components/home/CommunityBanner";
import CommunityGrid from "@/components/home/CommunityGrid";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductFeature from "@/components/product/ProductFeature";

// ── Static params ─────────────────────────────────────────────

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

// ── Metadata ──────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = products.find((p) => p.handle === handle);
  if (!product) return { title: "Not Found" };

  return {
    title: `${product.title} | Prairie Cricket Farms`,
    description: product.description,
  };
}

// ── Page ──────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = products.find((p) => p.handle === handle);

  if (!product) notFound();

  const related = products
    .filter((p) => p.handle !== handle)
    .slice(0, 4);

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, background: "var(--color-bg, #ffffff)" }}>
        <ProductHero product={product} />
        <ProductFeature product={product} />
        <QuizBanner
          heading="Something to note!"
          copy="Due to the nutrient-packed nature of our powder, it's not as dissolvable as conventional powders. To reap the benefits AND get the best taste and texture payoff, we suggest mixing or blending into a solid food or thick liquid."
          cta={null}
        />
        {related.length > 0 && <RelatedProducts products={related} />}
        <EditorialHeadline
          eyebrow="Real Results"
          heading="Fuelled by Crickets. Loved by Customers."
          cta={{ label: "Read More Stories", href: "/about" }}
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
