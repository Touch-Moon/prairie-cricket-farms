"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import styles from "./ProductTabs.module.scss";

interface ProductTabsProps {
  product: Product;
}

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DescriptionContent = ({ product: _product }: { product: Product }) => (
  <div className={styles.descGrid}>
    {/* Left column */}
    <div className={styles.descCol}>
      <h3 className={styles.descHeading}>Why it&apos;s great</h3>
      <ul className={styles.descList}>
        <li>
          Excellent Daily source of
          <ul>
            <li>Vitamin B12 (56% daily value)</li>
            <li>Zinc (27% daily value)</li>
            <li>Manganese (26% daily value)</li>
          </ul>
        </li>
        <li>Full of fibre and supports a healthy gut</li>
        <li>Sustainable protein with 9 essential amino acids</li>
        <li>Dairy-Free, Gluten-Free, Nut-Free, Sugar-Free, Egg-Free &amp; Keto-friendly</li>
        <li>Canadian farmed, processed and packed</li>
      </ul>

      <div className={styles.descDivider}>
        <span className={styles.descDividerLine} />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        <span className={styles.descDividerLine} />
      </div>

      <h3 className={styles.descHeading}>How to Enjoy</h3>
      <ul className={styles.descList}>
        <li>Snack It</li>
        <li>Mix It</li>
        <li>Sprinkle It</li>
      </ul>
      <p className={styles.descBody}>
        The perfect crunch you&apos;ve been looking for. This nutrient-packed snack is
        the perfect addition to any trail mix blend, salad topper, and even good solo
        for an on-the-go treat.
      </p>
    </div>

    {/* Vertical divider */}
    <div className={styles.descVertDivider} />

    {/* Right column */}
    <div className={styles.descCol}>
      <h3 className={styles.descHeading}>A Sustainable Source of Protein</h3>

      <p className={styles.descSubheading}>What does sustainable mean to us?</p>
      <p className={styles.descBody}>
        Here at Prairie Cricket Farms, we value planet-friendly, environmentally-conscious
        practices, and are proud to extend the ability to live more sustainably to our
        community of customers.
      </p>
      <p className={styles.descBody}>
        As a protein source, crickets are a more sustainable option overall when compared
        to alternatives.
      </p>

      <p className={styles.descSubheading}>Some quick facts on sustainability:</p>
      <ul className={styles.descList}>
        <li>
          Crickets use less Water, Land and Feed than traditional protein sources
          <ul>
            <li>
              Crickets are cold blooded, therefore they use less feed. Physiologically they
              pull all of their energy into their mass so they don&apos;t waste any heating
              their bodies.
            </li>
          </ul>
        </li>
        <li>
          Cricket Farming in general is almost zero waste
          <ul>
            <li>
              We use circular farming practices in which we are able to use everything.
              From the fertilizer from the cricket manure to their feed, everything is
              used and nothing is wasted.
            </li>
          </ul>
        </li>
      </ul>

      <p className={styles.descBody}>
        Using cricket powder as a protein source in your daily diet is an extremely
        low-impact way for you to increase your protein consumption while reaping the
        major benefits of a protein and nutrient-packed supplement.
      </p>

      <p className={styles.descCallout}>
        Increase the positive effects on your body while reducing your environmental
        impact. Choose crickets!
      </p>

      <p className={styles.descCtaLabel}><em>Explore our Protein Powder</em></p>

      <Link href="/products/cricket-powder-large" className={styles.descCtaBtn}>
        Click Here
      </Link>
    </div>
  </div>
);

export default function ProductTabs({ product }: ProductTabsProps) {
  const [openTab, setOpenTab] = useState<string | null>("description");

  const tabs: Tab[] = [
    {
      id: "description",
      label: "Description",
      content: <DescriptionContent product={product} />,
    },
    {
      id: "ingredients",
      label: "Ingredients",
      content: (
        <div className={styles.tabContent}>
          {product.ingredients ? (
            <>
              <p><strong>Ingredients</strong></p>
              <p>{product.ingredients}</p>
              {product.nutritionNote && (
                <>
                  <p><strong>Nutrition (per serving)</strong></p>
                  <p>{product.nutritionNote}</p>
                </>
              )}
              <p className={styles.allergyNote}>
                <strong>Allergen notice:</strong> Contains cricket (insect protein). Not suitable for those with shellfish or dust mite allergies.
              </p>
            </>
          ) : (
            <p>Ingredient information not available.</p>
          )}
        </div>
      ),
    },
    {
      id: "howtouse",
      label: "How To Use",
      content: (
        <div className={styles.tabContent}>
          {product.howToUse ? (
            <p>{product.howToUse}</p>
          ) : (
            <p>Usage information not available.</p>
          )}
        </div>
      ),
    },
  ];

  const toggle = (id: string) => {
    setOpenTab(openTab === id ? null : id);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.accordion}>
          {tabs.map((tab) => {
            const isOpen = openTab === tab.id;
            return (
              <div key={tab.id} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
                <button
                  className={styles.trigger}
                  onClick={() => toggle(tab.id)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.triggerLabel}>{tab.label}</span>
                  <svg
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" className={styles.chevronV} />
                    <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <div className={styles.body}>
                  <div className={styles.bodyInner}>
                    {tab.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
