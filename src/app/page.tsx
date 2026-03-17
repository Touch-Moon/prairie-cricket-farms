import HeroBanner from "@/components/home/HeroBanner";
import ProductCarousel from "@/components/home/ProductCarousel";
import SplitFeature from "@/components/home/SplitFeature";
import QuizBanner from "@/components/home/QuizBanner";
import EditorialHeadline from "@/components/home/EditorialHeadline";
import CategoryGrid from "@/components/home/CategoryGrid";
import BrandStatement from "@/components/home/BrandStatement";
import BrandPillars from "@/components/home/BrandPillars";
import VideoFeature from "@/components/home/VideoFeature";
import TestimonialGrid from "@/components/home/TestimonialGrid";
import ResultsGlance from "@/components/home/ResultsGlance";
import PressQuotes from "@/components/home/PressQuotes";
import LatestArticles from "@/components/home/LatestArticles";
import CommunityBanner from "@/components/home/CommunityBanner";
import CommunityGrid from "@/components/home/CommunityGrid";
import NewsletterSignup from "@/components/home/NewsletterSignup";

export default function Home() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 1, background: "var(--color-bg, #ffffff)" }}>
        <HeroBanner />
        <ProductCarousel />
        <SplitFeature />
        <QuizBanner />
        <EditorialHeadline
          eyebrow="Fuel Powerfully, Your Way."
          heading="The Complete Cricket Protein Routine for Proven Results."
        />
        <CategoryGrid />
        <BrandStatement text="We're not here to sell you a trend. Cricket protein isn't a gimmick or a compromise — it's one of nature's most complete sources of nutrition. As you push harder, recover faster, and demand more from your body, Prairie Cricket Farms gives you the protein that works — sustainably, cleanly, and absolutely effectively." />
        <BrandPillars />
        <VideoFeature />
        <EditorialHeadline
          eyebrow="Real Results"
          heading={
            <>
              Backed by Experts.
              <br />
              Adored by Faces.
            </>
          }
          cta={{ label: "See More Stories", href: "/about" }}
        />
        <TestimonialGrid />
        <ResultsGlance />
        <PressQuotes />
        <LatestArticles />
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
