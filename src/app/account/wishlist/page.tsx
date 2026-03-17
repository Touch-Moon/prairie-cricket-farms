"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import styles from "../account.module.scss";

// products.ts에서 위시리스트 제품 4개를 handle로 매칭
const WISHLIST_HANDLES = [
  "cricket-powder-large",
  "dill-pickle-roasted-crickets",
  "smokey-bbq-roasted-crickets",
  "salt-vinegar-roasted-crickets",
];

const MOCK_WISHLIST = WISHLIST_HANDLES.map((handle, idx) => {
  const p = products.find((prod) => prod.handle === handle)!;
  // 가장 비싼 variant (보통 Large)의 GID 사용
  const variant = p.variants?.[p.variants.length - 1];
  return {
    id: idx + 1,
    name: p.title,
    subtitle: variant ? variant.size : "",
    price: `$${p.price}`,
    image: p.image,
    handle: p.handle,
    variantId: variant?.shopifyVariantId || "",
  };
});

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(MOCK_WISHLIST);
  const { addItem } = useCart();

  const handleRemove = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item: (typeof MOCK_WISHLIST)[0]) => {
    addItem(item.variantId, 1);
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Wishlist</h1>
        <p>{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
      </div>

      <div className={styles.wishlistGrid}>
        {wishlist.length === 0 ? (
          <div className={styles.emptyWishlistState}>
            <div className={styles.emptyIcon}>🦗</div>
            <h3>Your wishlist is empty</h3>
            <p>Save products you love and find them here.</p>
            <Link href="/shop" className={styles.shopLink}><span className={styles.mask}><span className={styles.slide} data-content="Browse Products">Browse Products</span></span></Link>
          </div>
        ) : (
          wishlist.map((item) => (
            <div key={item.id} className={styles.wishCard}>
              <Link href={`/products/${item.handle}`} className={styles.wishImg}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={375}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </Link>

              <button
                className={styles.wishRemove}
                onClick={() => handleRemove(item.id)}
                aria-label="Remove from wishlist"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              <div className={styles.wishInfo}>
                <p className={styles.wishName}>{item.name}</p>
                <p className={styles.wishPrice}>{item.price}</p>
              </div>

              <button
                className={styles.wishAtc}
                onClick={() => handleAddToCart(item)}
              >
                <span className={styles.mask}><span className={styles.slide} data-content="Add to Bag">Add to Bag</span></span>
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
