import { recipes } from "@/data/recipes";
import RecipeCard from "./RecipeCard";
import styles from "./RecipeGrid.module.scss";

export default function RecipeGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <ul className={styles.grid} role="list">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
