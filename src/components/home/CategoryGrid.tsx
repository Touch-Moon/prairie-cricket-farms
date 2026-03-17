import Image from "next/image";
import Link from "next/link";
import styles from "./CategoryGrid.module.scss";

const CATEGORIES = [
  {
    image: "/images/categories/cat-1.jpg",
    heading: "Cricket Protein Powder",
    copy: "Boost your daily nutrition with our premium cricket protein powder. High in complete protein, B12, and essential amino acids.",
    cta: "Shop Protein Powder",
    href: "/shop/supplements",
  },
  {
    image: "/images/categories/cat-2.jpg",
    heading: "Protein Snack Bars",
    copy: "Fuel on the go with our cricket protein bars. Packed with natural ingredients, fibre, and sustainable protein in every bite.",
    cta: "Shop Snack Bars",
    href: "/shop/snacks",
  },
  {
    image: "/images/categories/cat-3.jpg",
    heading: "Cricket Flour",
    copy: "Bake smarter with our finely milled cricket flour. A nutrient-dense, sustainable swap for everyday cooking and baking.",
    cta: "Shop Cricket Flour",
    href: "/shop/supplements",
  },
];

export default function CategoryGrid() {
  return (
    <section className={styles.categoryGridSection}>
      <div className={styles.categoryGridInner}>
        {CATEGORIES.map((cat) => (
          <div key={cat.heading} className={styles.categoryCard}>
            <Link href={cat.href} className={styles.categoryImageWrap}>
              <Image
                src={cat.image}
                alt={cat.heading}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.categoryImage}
              />
            </Link>
            <div className={styles.categoryCardBody}>
              <h3 className={styles.categoryCardHeading}>{cat.heading}</h3>
              <p className={styles.categoryCardCopy}>{cat.copy}</p>
              <Link href={cat.href} className={styles.categoryCardBtn}>
                {cat.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
