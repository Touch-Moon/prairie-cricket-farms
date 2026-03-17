import RecipesHero from "@/components/recipes/RecipesHero";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import RecipesTips from "@/components/recipes/RecipesTips";
import EditorialHeadline from "@/components/home/EditorialHeadline";

export const metadata = {
  title: "Recipes | Prairie Cricket Farms",
  description:
    "Discover delicious recipes made with cricket protein powder. High-protein, sustainable, and surprisingly tasty.",
};

export default function RecipesPage() {
  return (
    <>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "var(--color-bg, #fffdf5)",
        }}
        className="main-content"
      >
        <RecipesHero
          eyebrow="Cricket Protein Recipes"
          heading={
            <>
              The recipes you love,
              <br />
              the protein you need
            </>
          }
          description={
            <>
              We’re thrilled to be able to share some tried, true, and
              Steppler-family-tested recipes that we know your loved ones are
              going to enjoy.
              <br /><br />
              Don’t forget to share a mouth-watering pic and tag us on Instagram!
            </>
          }
        />
        <RecipeGrid />
        <RecipesTips />
        <EditorialHeadline
          eyebrow="Get in touch"
          heading={<>We&apos;re here to help!</>}
          description="Interested in understanding how to incorporate our products into your existing recipes? Reach out to us through our contact page – we'd be happy to make recommendations."
          cta={{ label: "Contact Us", href: "/contact" }}
        />
      </div>
    </>
  );
}
