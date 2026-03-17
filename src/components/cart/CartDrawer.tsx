"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import styles from "./CartDrawer.module.scss";

// ─── Payment method icon SVG ───────────────────────────────────────
const PAYMENT_ICONS = [
  { id: "amex",    label: "American Express" },
  { id: "applepay", label: "Apple Pay" },
  { id: "visa",    label: "Visa" },
  { id: "mc",      label: "Mastercard" },
  { id: "paypal",  label: "PayPal" },
  { id: "gpay",    label: "Google Pay" },
];

// Trash icon
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Close icon
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="3" y1="3" x2="15" y2="15" strokeLinecap="round" />
    <line x1="15" y1="3" x2="3" y2="15" strokeLinecap="round" />
  </svg>
);

// Arrow icon
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="5,2 10,7 5,12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="9,2 4,7 9,12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Upsell products (Complete your routine) ─────────────────────────
// Show 2 recommended products fixed from products.ts
const UPSELL_PRODUCTS = products.slice(2, 4).map((p) => ({
  id: p.id,
  title: p.title,
  image: p.image,
  price: p.price,
  compareAtPrice: p.compareAtPrice,
  handle: p.handle,
}));

// ─── Payment icon SVG (inline) ──────────────────────────────────
function PaymentBadge({ id }: { id: string }) {
  const configs: Record<string, { bg: string; label: string; content: React.ReactNode }> = {
    amex: {
      bg: "#2E77BC",
      label: "Amex",
      content: <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Arial">AMEX</text>,
    },
    applepay: {
      bg: "#000",
      label: "Apple Pay",
      content: <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="7" fontWeight="500" fontFamily="Arial">Pay</text>,
    },
    visa: {
      bg: "#1A1F71",
      label: "Visa",
      content: <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Arial" fontStyle="italic">VISA</text>,
    },
    mc: {
      bg: "white",
      label: "Mastercard",
      content: (
        <>
          <circle cx="17" cy="16" r="9" fill="#EB001B" />
          <circle cx="29" cy="16" r="9" fill="#F79E1B" />
          <path d="M23 9.5a9 9 0 0 1 0 13 9 9 0 0 1 0-13z" fill="#FF5F00" />
        </>
      ),
    },
    paypal: {
      bg: "#003087",
      label: "PayPal",
      content: <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700" fontFamily="Arial">PayPal</text>,
    },
    gpay: {
      bg: "white",
      label: "Google Pay",
      content: <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="#3C4043" fontSize="7" fontWeight="600" fontFamily="Arial">GPay</text>,
    },
  };

  const c = configs[id];
  return (
    <svg width="46" height="30" viewBox="0 0 46 30" role="img" aria-label={c.label} className={styles.payIcon}>
      <rect width="46" height="30" rx="4" fill={c.bg} stroke="#e5e5e5" strokeWidth="1" />
      {c.content}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// CartDrawer Component
// ═══════════════════════════════════════════════════════════════
export default function CartDrawer() {
  const { items, isOpen, totalCount, totalPrice, checkoutUrl, closeCart, removeItem } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Prevent SSR - render portal on client only
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  // ESC key close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  // Body scroll lock + html.cart-open class toggle when drawer opens (for page blur)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("cart-open");
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("cart-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("cart-open");
    };
  }, [isOpen]);

  // Promo badge - show only when items exist
  const hasItems = items.length > 0;

  if (!mounted) return null;

  return createPortal(
    <>
      {/* ── Tint layer (opacity 페이드 + 클릭 닫기) ─── */}
      <div
        className={`${styles.tintLayer} ${isOpen ? styles.tintLayerVisible : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ─────────────────────────────── */}
      <div
        ref={drawerRef}
        className={`cart-drawer drawer ${styles.drawer} ${isOpen ? `active ${styles.drawerOpen}` : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* ── Header ─────────────────────────────────── */}
        <div className={styles.cartDrawerHeader}>
          <h2 className={styles.cartDrawerHeading}>
            Bag {totalCount > 0 && <span className={styles.cartItemCount}>({totalCount})</span>}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={closeCart}
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.cartDivider} />

        {/* ── Body ────────────────────────────────────── */}
        <div className={styles.cartItemContainer}>
          {!hasItems ? (
            /* 빈 카트 */
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>Your bag is empty.</p>
              <Link href="/shop" className={styles.emptyLink} onClick={closeCart}>
                Shop All Products
              </Link>
            </div>
          ) : (
            <>
              {/* ── Cart Items ──────────────────────────── */}
              <ul className={styles.itemList}>
                {items.map((item) => {
                  return (
                    <li key={item.id} className={styles.cartItem}>
                      {/* 썸네일 */}
                      <div className={styles.itemThumb}>
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="80px"
                            className={styles.itemThumbImg}
                          />
                        ) : (
                          <div className={styles.itemThumbPlaceholder} />
                        )}
                      </div>

                      {/* 정보 */}
                      <div className={styles.itemInfo}>
                        <p className={styles.itemTitle}>{item.title}</p>
                        {item.variantTitle && item.variantTitle !== "Default Title" && (
                          <p className={styles.itemVariant}>{item.variantTitle}</p>
                        )}

                        {/* 구독 빈도 셀렉트 */}
                        <div className={styles.frequencyRow}>
                          <select
                            className={styles.frequencySelect}
                            defaultValue="Every 14 days"
                            aria-label="Delivery frequency"
                          >
                            <option>Every 7 days</option>
                            <option>Every 14 days</option>
                            <option>Every 30 days</option>
                            <option>One-time purchase</option>
                          </select>
                        </div>

                        {/* 가격 */}
                        <div className={styles.itemPriceRow}>
                          <span className={styles.itemPrice}>
                            ${parseFloat(item.price).toFixed(2)} CAD
                          </span>
                        </div>
                      </div>

                      {/* 삭제 */}
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.title}`}
                      >
                        <TrashIcon />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* ── Promo / Congrats 카드 ───────────────── */}
              <div className={styles.promoCard}>
                <div className={styles.promoImage}>
                  <Image
                    src="/images/products/carousel/p3-default.jpg"
                    alt="Bundle offer"
                    fill
                    sizes="96px"
                    className={styles.promoImg}
                  />
                </div>
                <div className={styles.promoText}>
                  <p className={styles.promoTitle}>Congratulations!</p>
                  <p className={styles.promoDesc}>
                    You&apos;ve unlocked bundle pricing discounts on our Snack products
                    when purchased together.
                  </p>
                  <Link href="/shop/bestsellers" className={styles.promoLink} onClick={closeCart}>
                    SHOP BESTSELLERS
                  </Link>
                </div>
              </div>

              {/* ── Complete your routine (업셀) ─────────── */}
              <div className={styles.upsellSection}>
                <div className={styles.upsellHeader}>
                  <p className={styles.upsellTitle}>Complete your routine</p>
                  <div className={styles.upsellNav}>
                    <button className={styles.upsellNavBtn} aria-label="Previous">
                      <ChevronLeft />
                    </button>
                    <button className={styles.upsellNavBtn} aria-label="Next">
                      <ChevronRight />
                    </button>
                  </div>
                </div>

                {UPSELL_PRODUCTS.map((up) => (
                  <div key={up.id} className={styles.upsellItem}>
                    <div className={styles.upsellThumb}>
                      <Image
                        src={up.image}
                        alt={up.title}
                        fill
                        sizes="72px"
                        className={styles.upsellThumbImg}
                      />
                    </div>
                    <div className={styles.upsellInfo}>
                      <p className={styles.upsellName}>{up.title}</p>
                      <span className={styles.priceBadge}>✦ PRICE UNLOCKED</span>
                      <div className={styles.upsellPriceRow}>
                        <span className={styles.upsellPrice}>${up.price} CAD</span>
                        {up.compareAtPrice && (
                          <span className={styles.upsellCompare}>${up.compareAtPrice} CAD</span>
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/products/${up.handle}`}
                      className={styles.upsellAdd}
                      onClick={closeCart}
                    >
                      VIEW
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Footer (Total + Checkout) ─────────────── */}
        {hasItems && (
          <div className={styles.cartDrawerFooter}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalPrice}>${totalPrice.toFixed(2)} CAD</span>
            </div>
            <p className={styles.discountNote}>Discount codes applied at checkout</p>

            {checkoutUrl ? (
              <a href={checkoutUrl} className={styles.checkoutBtn}>
                CHECKOUT
              </a>
            ) : (
              <button className={styles.checkoutBtn} disabled>
                CHECKOUT
              </button>
            )}

            {/* 결제 수단 아이콘 */}
            <div className={styles.paymentIcons}>
              {PAYMENT_ICONS.map((p) => (
                <PaymentBadge key={p.id} id={p.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
