"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./LatestArticles.module.scss";

const ARTICLES = [
  {
    title: "Nutty Oatmeal Smoothie",
    date: "5 min · Easy",
    tags: ["Smoothie"],
    image: "https://www.prairiecricketfarms.com/wp-content/uploads/2023/02/nuttyoatmeal_smoothie3-scaled.jpg",
    href: "/recipes/nutty-oatmeal-smoothie",
  },
  {
    title: "Chocolate Protein Bars",
    date: "20 min · Easy",
    tags: ["Snack"],
    image: "https://www.prairiecricketfarms.com/wp-content/uploads/2021/08/20210806_100304-scaled.jpeg",
    href: "/recipes/chocolate-protein-bars",
  },
  {
    title: "Banana Walnut Muffins",
    date: "35 min · Easy",
    tags: ["Baking"],
    image: "https://www.prairiecricketfarms.com/wp-content/uploads/2021/04/Banana-Walnut-scaled.jpg",
    href: "/recipes/banana-walnut-muffins",
  },
];

export default function LatestArticles() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll(`.${styles.articleRow}`);
    if (!rows?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.articleRowVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.articlesSection}>
      <div className={styles.articlesContainer}>
        {/* Header */}
        <div className={styles.articlesHeader}>
          <h2 className={styles.articlesHeading}>Latest Recipes</h2>
          <Link href="/recipes" className={styles.readMore}>
            See All Recipes
          </Link>
        </div>

        {/* Article list */}
        <div ref={listRef} className={styles.articlesList}>
          {ARTICLES.map((article, i) => (
            <Link
              key={article.title}
              href={article.href}
              className={styles.articleRow}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Text */}
              <div className={styles.articleText}>
                <div className={styles.tags}>
                  {article.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <time className={styles.date}>{article.date}</time>
              </div>

              {/* Thumbnail */}
              <div className={styles.articleImageWrap}>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 767px) 120px, 200px"
                  className={styles.articleImage}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
