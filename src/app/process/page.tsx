import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutImage from "@/components/about/AboutImage";
import ProcessSteps from "@/components/process/ProcessSteps";
import ProcessAudience from "@/components/process/ProcessAudience";
import QuizBanner from "@/components/home/QuizBanner";
import CommunityBanner from "@/components/home/CommunityBanner";
import CommunityGrid from "@/components/home/CommunityGrid";
import NewsletterSignup from "@/components/home/NewsletterSignup";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "From farm to powder — see how Prairie Cricket Farms sustainably raises and mills 100% pure cricket protein in Manitoba, Canada.",
  openGraph: {
    title: "Our Process | Prairie Cricket Farms",
    description:
      "Sustainably farmed in Manitoba, Canada. See how 100% pure cricket powder is made.",
    url: "https://prairiecricketfarms.com/process",
    images: [{ url: "/images/hero/pcf-hero-main.jpg", width: 1200, height: 630 }],
  },
};

export default function ProcessPage() {
  return (
    <div className="main-content">
      <div style={{ position: "relative", zIndex: 1, background: "var(--color-bg, #fffdf5)" }}>

        {/* 1. Hero */}
        <AboutHero
          eyebrow="Sustainably Farmed in Manitoba, Canada"
          heading={
            <>
              The whole process;
              <br />
              Crickets and all
            </>
          }
          description="From farm to fine powder — here's how we raise, harvest, and craft our 100% pure cricket protein. Efficient, clean, and with little to no waste."
        />

        {/* 2. Full-width farm image */}
        <AboutImage
          src="/images/process/pcf-process-farm.jpg"
          alt="Indoor cricket farm — rows of stacked trays in a clean, climate-controlled facility"
        />

        {/* 3. Quick Facts — How cricket farming works + 5 steps */}
        <ProcessSteps />

        {/* 3. Product callout */}
        <QuizBanner
          heading="100% Pure Cricket Powder"
          copy="The Prairie Cricket Farms pure cricket powder is made from 100% finely milled roasted crickets. Nothing added. Nothing removed. Just pure, sustainable protein the way nature intended."
          cta={{ label: "Shop Now", href: "/shop" }}
        />

        {/* 4. Who is cricket protein for? — 4 audience categories */}
        <ProcessAudience />

      </div>

      <div className="sticky-reveal">
        <CommunityBanner />
      </div>
      <div className="after-reveal">
        <CommunityGrid />
        <NewsletterSignup />
      </div>
    </div>
  );
}
