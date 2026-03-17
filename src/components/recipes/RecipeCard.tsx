"use client";

import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/data/recipes";
import styles from "./RecipeCard.module.scss";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.title}</h3>
        <div className={styles.meta}>
          <span className={styles.metaItem}>{recipe.prepTime}</span>
          <span className={styles.metaDivider}>·</span>
          <span className={styles.metaItem}>{recipe.difficulty}</span>
        </div>
      </div>
    </Link>
  );
}
