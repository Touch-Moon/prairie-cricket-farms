import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className={styles.reviews}>
      <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`${styles.star} ${i < Math.floor(rating) ? styles.starFilled : ""}`}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>
      <span className={styles.reviewCount}>({count.toLocaleString()})</span>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    title,
    handle,
    badge,
    image,
    hoverImage,
    price,
    compareAtPrice,
    rating,
    reviewCount,
  } = product;

  return (
    <Link href={`/products/${handle}`} className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.imageDefault}
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt=""
            fill
            className={styles.imageHover}
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            aria-hidden="true"
          />
        )}
        {badge && <span className={styles.productBadge}>{badge}</span>}
      </div>

      <div className={styles.productCardContent}>
        <h3 className={styles.productTitle}>{title}</h3>
        <div className={styles.pricing}>
          <span className={styles.price}>${price}</span>
          {compareAtPrice && (
            <s className={styles.compareAt}>${compareAtPrice}</s>
          )}
        </div>
        <StarRating rating={rating} count={reviewCount} />
      </div>
    </Link>
  );
}
