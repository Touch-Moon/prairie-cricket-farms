import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.scss";

interface ProductGridProps {
  /** collection handle to filter by — undefined = show all */
  collection?: string;
}

export default function ProductGrid({ collection }: ProductGridProps) {
  const filtered = collection
    ? products.filter((p) => p.collections?.includes(collection))
    : products;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <ul className={styles.grid} role="list">
          {filtered.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
