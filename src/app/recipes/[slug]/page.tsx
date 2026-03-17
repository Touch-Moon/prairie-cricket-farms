import { notFound } from "next/navigation";
import { recipes, getRecipeBySlug } from "@/data/recipes";
import RecipeDetail from "@/components/recipes/RecipeDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

// Static params for all recipes
export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

// Dynamic metadata per recipe
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};
  return {
    title: `${recipe.title} | Prairie Cricket Farms`,
    description: `${recipe.title} — ${recipe.prepTime} · ${recipe.difficulty}. Made with 100% cricket protein powder.`,
  };
}

export default async function RecipeSlugPage({ params }: Props) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) notFound();

  return (
    <div className="main-content">
      <RecipeDetail recipe={recipe} />
    </div>
  );
}
