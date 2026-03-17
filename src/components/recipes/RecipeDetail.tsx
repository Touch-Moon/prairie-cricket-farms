"use client";

import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/data/recipes";
import styles from "./RecipeDetail.module.scss";

interface RecipeDetailProps {
  recipe: Recipe;
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  return (
    <article className={styles.article}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.inner}>

          {/* LEFT: sticky image panel */}
          <div className={styles.imagePanel}>
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className={styles.img}
              priority
            />
          </div>

          {/* RIGHT: scrollable info panel */}
          <div className={styles.infoPanel}>
            <div className={styles.infoPanelInner}>

              <Link href="/recipes" className={styles.backLink}>
                ← All Recipes
              </Link>

              <span className={styles.badge}>{recipe.category}</span>
              <h1 className={styles.title}>{recipe.title}</h1>

              <ul className={styles.metaList}>
                <li className={styles.metaItem}>
                  <span className={styles.metaLabel}>Prep Time</span>
                  <span className={styles.metaValue}>{recipe.prepTime}</span>
                </li>
                <li className={styles.metaItem}>
                  <span className={styles.metaLabel}>Difficulty</span>
                  <span className={styles.metaValue}>{recipe.difficulty}</span>
                </li>
                {recipe.servings && (
                  <li className={styles.metaItem}>
                    <span className={styles.metaLabel}>Servings</span>
                    <span className={styles.metaValue}>{recipe.servings}</span>
                  </li>
                )}
              </ul>

              {/* Ingredients */}
              <div className={styles.ingredients}>
                <h2 className={styles.sectionLabel}>Ingredients</h2>
                <ul className={styles.ingredientList}>
                  {recipe.ingredients.map((item, i) => (
                    <li key={i} className={styles.ingredientItem}>
                      {item}
                    </li>
                  ))}
                </ul>
                {recipe.ingredientComment && (
                  <p className={styles.ingredientComment}>
                    {`"${recipe.ingredientComment}"`}
                  </p>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>


    </article>
  );
}
