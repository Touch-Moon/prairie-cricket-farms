import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import NutritionBenefits from "@/components/nutrition/NutritionBenefits";
import EditorialHeadline from "@/components/home/EditorialHeadline";
import QuizBanner from "@/components/home/QuizBanner";
import NutritionEco from "@/components/nutrition/NutritionEco";
import NutritionDetails from "@/components/nutrition/NutritionDetails";
import CommunityBanner from "@/components/home/CommunityBanner";
import CommunityGrid from "@/components/home/CommunityGrid";
import NewsletterSignup from "@/components/home/NewsletterSignup";

export const metadata: Metadata = {
  title: "Cricket Nutrition",
  description:
    "Discover the nutritional power of cricket protein. High in protein, B12, iron, and omega-3s — with a fraction of the environmental footprint of traditional protein sources.",
  openGraph: {
    title: "Cricket Nutrition | Prairie Cricket Farms",
    description:
      "High protein, B12, iron, omega-3s — cricket protein is nature's most complete superfood.",
    url: "https://prairiecricketfarms.com/nutrition",
    images: [{ url: "/images/hero/pcf-hero-main.jpg", width: 1200, height: 630 }],
  },
};

export default function NutritionPage() {
  return (
    <div className="main-content">
      <div style={{ position: "relative", zIndex: 1, background: "var(--color-bg, #fffdf5)" }}>
        <AboutHero
          eyebrow="Cricket Nutrition"
          heading={
            <>
              The Sustainable
              <br />
              Future of Protein
            </>
          }
        />
        <NutritionBenefits />
        <QuizBanner
          heading="Allergy Notice:"
          copy={"While crickets are amazing nutritionally, they do tend to cause allergic reactions in some folks who have preexisting allergies to shellfish and/or crustaceans.\nPlease consult with your doctor before consuming any Prairie Cricket Farms products to be safe."}
          cta={null}
        />
        <NutritionEco />
        <NutritionDetails />
        <QuizBanner
          heading="Something to note!"
          copy="Due to the nutrient-packed nature of our powder, it's not as dissolvable as conventional powders. To reap the benefits AND get the best taste and texture payoff, we suggest mixing or blending into a solid food or thick liquid."
          cta={null}
        />
        <EditorialHeadline
          eyebrow="The Sustainable Choice"
          heading={
            <>
              Ready to make
              <br />
              the switch?
            </>
          }
          cta={{ label: "Shop Cricket Protein", href: "/shop" }}
        />
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
