"use client";

import Image from "next/image";
import styles from "./StickyCartBar.module.scss";
import { useCart } from "@/context/CartContext";

interface StickyCartBarProps {
  visible: boolean;
  image: string;
  title: string;
  variantLabel?: string;
  price: string;
  added: boolean;
  onAddToCart: () => void;
}

export default function StickyCartBar({
  visible,
  image,
  title,
  variantLabel,
  price,
  added,
  onAddToCart,
}: StickyCartBarProps) {
  const { totalCount, openCart } = useCart();

  return (
    <div
      className={`${styles.stickyCartBar} ${visible ? styles.stickyCartBarVisible : ""}`}
      aria-hidden={!visible}
    >
      <div className={styles.stickyBarContent}>
        {/* 왼쪽: 썸네일 + 제품 정보 */}
        <div className={styles.stickyProductInfo}>
          <div className={styles.stickyProductThumb}>
            <Image
              src={image}
              alt={title}
              fill
              sizes="56px"
              className={styles.stickyProductThumbImage}
            />
          </div>
          <div className={styles.stickyProductMeta}>
            <span className={styles.name}>{title}</span>
            {variantLabel && (
              <span className={styles.variant}>{variantLabel}</span>
            )}
          </div>
        </div>

        {/* 오른쪽: CTA 버튼 + 카트 아이콘 */}
        <div className={styles.actions}>
          <button
            className={`${styles.cta} ${added ? styles.ctaAdded : ""}`}
            onClick={onAddToCart}
            tabIndex={visible ? 0 : -1}
          >
            {added ? "✓ Added!" : `ADD TO CART — $${price} CAD`}
          </button>
          {totalCount > 0 && (
            <button
              className={styles.cartIconBtn}
              onClick={openCart}
              tabIndex={visible ? 0 : -1}
              aria-label={`View cart (${totalCount} items)`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2h2l2.5 9h9l1.5-6H5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8.5" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="15.5" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <span className={styles.cartBadge}>{totalCount}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
