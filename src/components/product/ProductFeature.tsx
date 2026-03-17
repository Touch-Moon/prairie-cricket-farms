"use client";

import { useState } from "react";
import type { Product } from "@/types";
import styles from "./ProductFeature.module.scss";

interface ProductFeatureProps {
  product: Product;
}

const FEATURE_ITEMS: { title: string; subItems?: string[] }[] = [
  {
    title: "Excellent Daily source of",
    subItems: [
      "Vitamin B12 (56% daily value)",
      "Zinc (27% daily value)",
      "Manganese (26% daily value)",
    ],
  },
  { title: "Full of fibre and supports a healthy gut" },
  { title: "Sustainable protein with 9 essential amino acids" },
  { title: "Dairy-Free, Gluten-Free, Nut-Free, Sugar-Free, Egg-Free & Keto-friendly" },
  { title: "Canadian farmed, processed and packed" },
];

export default function ProductFeature({ product }: ProductFeatureProps) {
  const [openTab, setOpenTab] = useState<string>("description");
  const [openFact, setOpenFact] = useState<string>("");

  const toggle = (id: string) => {
    setOpenTab(openTab === id ? "" : id);
  };

  const toggleFact = (id: string) => {
    setOpenFact(openFact === id ? "" : id);
  };

  return (
    <>
    <section className={styles.productFeatureSection}>
      <div className={styles.productFeatureInner}>
        {/* Left */}
        <div className={styles.featureLeft}>
          <h2 className={styles.featureHeading}>
            NUTRIENT-DENSE.{" "}
            <br />
            SUSTAINABLY{" "}
            <br />
            SOURCED.
          </h2>
          <p className={styles.featureSubheading}>
            Every serving delivers a complete protein profile alongside
            essential vitamins and minerals — all from one sustainable,
            single ingredient.
          </p>
        </div>

        {/* Right — Accordion */}
        <div className={styles.featureRight}>

          {/* ── Description ── */}
          <div className={`${styles.accItem} ${openTab === "description" ? styles.accOpen : ""}`}>
            <button className={styles.accTrigger} onClick={() => toggle("description")}>
              <span className={styles.accLabel}>Description</span>
              <svg className={styles.accIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" className={openTab === "description" ? styles.accIconV : ""} />
                <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className={styles.accBody}>
              <div className={styles.accBodyInner}>
                <div className={styles.accContent}>

                  <h3 className={styles.itemHeading}>Why it&apos;s great</h3>
                  <ul className={styles.mainList}>
                    {FEATURE_ITEMS.map((item, i) => (
                      <li key={i}>
                        {item.title}
                        {item.subItems && (
                          <ul className={styles.subList}>
                            {item.subItems.map((s, j) => (
                              <li key={j}>{s}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>

                  <h3 className={styles.itemHeading}>How to Enjoy</h3>
                  <ul className={styles.mainList}>
                    <li>Snack It</li>
                    <li>Mix It</li>
                    <li>Sprinkle It</li>
                  </ul>
                  <p className={styles.itemDesc}>
                    The perfect crunch you&apos;ve been looking for. This nutrient-packed snack is
                    the perfect addition to any trail mix blend, salad topper, and even good solo
                    for an on-the-go treat.
                  </p>

                  <h3 className={styles.itemHeading}>A Sustainable Source of Protein</h3>
                  <div className={styles.sustainableIntro}>
                    <p className={styles.itemSubheading}>What does sustainable mean to us?</p>
                    <p className={styles.itemDesc}>
                      Here at Prairie Cricket Farms, we value planet-friendly, environmentally-conscious
                      practices, and are proud to extend the ability to live more sustainably to our
                      community of customers.
                    </p>
                    <p className={styles.itemDesc}>
                      As a protein source, crickets are a more sustainable option overall when compared
                      to alternatives.
                    </p>
                  </div>
                  <p className={styles.itemSubheading}>Some quick facts on sustainability:</p>
                  <ul className={styles.mainList}>
                    <li>
                      Crickets use less Water, Land and Feed than traditional protein sources
                      <ul className={styles.subList}>
                        <li>Crickets are cold blooded, therefore they use less feed. Physiologically they pull all of their energy into their mass so they don&apos;t waste any heating their bodies.</li>
                      </ul>
                    </li>
                    <li>
                      Cricket Farming in general is almost zero waste
                      <ul className={styles.subList}>
                        <li>We use circular farming practices in which we are able to use everything. From the fertilizer from the cricket manure to their feed, everything is used and nothing is wasted.</li>
                      </ul>
                    </li>
                  </ul>
                  <p className={styles.itemDesc}>
                    Using cricket powder as a protein source in your daily diet is an extremely
                    low-impact way for you to increase your protein consumption while reaping the
                    major benefits of a protein and nutrient-packed supplement.
                  </p>
                  <p className={styles.itemCallout}>
                    Increase the positive effects on your body while reducing your environmental
                    impact. Choose crickets!
                  </p>

                </div>
              </div>
            </div>
          </div>

          {/* ── Ingredients ── */}
          <div className={`${styles.accItem} ${openTab === "ingredients" ? styles.accOpen : ""}`}>
            <button className={styles.accTrigger} onClick={() => toggle("ingredients")}>
              <span className={styles.accLabel}>Ingredients</span>
              <svg className={styles.accIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" className={openTab === "ingredients" ? styles.accIconV : ""} />
                <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className={styles.accBody}>
              <div className={styles.accBodyInner}>
                <div className={styles.accContent}>
                  {product.ingredients && (
                    <>
                      <p className={styles.itemSubheading}>Ingredients</p>
                      <p className={styles.itemDesc}>{product.ingredients}</p>
                    </>
                  )}
                  {product.nutritionNote && (
                    <>
                      <p className={styles.itemSubheading}>Nutrition (per serving)</p>
                      <p className={styles.itemDesc}>{product.nutritionNote}</p>
                    </>
                  )}
                  <p className={styles.allergyNote}>
                    <strong>Allergen notice:</strong> Contains cricket (insect protein). Not suitable for those with shellfish or dust mite allergies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── How To Use ── */}
          <div className={`${styles.accItem} ${openTab === "howtouse" ? styles.accOpen : ""}`}>
            <button className={styles.accTrigger} onClick={() => toggle("howtouse")}>
              <span className={styles.accLabel}>How To Use</span>
              <svg className={styles.accIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" className={openTab === "howtouse" ? styles.accIconV : ""} />
                <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className={styles.accBody}>
              <div className={styles.accBodyInner}>
                <div className={styles.accContent}>
                  {product.howToUse
                    ? <p className={styles.itemDesc}>{product.howToUse}</p>
                    : <p className={styles.itemDesc}>Usage information not available.</p>
                  }
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* ── Nutritional Information Section ── */}
    <section className={styles.productFeatureSection}>
      <div className={styles.productFeatureInner}>
        {/* Left */}
        <div className={styles.featureLeft}>
          <h2 className={styles.featureHeading}>NUTRITIONAL INFORMATION</h2>
        </div>

        {/* Right */}
        <div className={styles.featureRight}>
          <div className={styles.nutritionGrid}>
            <div className={styles.nutritionCol}>
              <p className={styles.itemSubheading}>Ingredients</p>
              <p className={styles.nutritionBody}>
                Crickets, Seasoning (sugars (glucose solids, sugar), salt, whey powder (milk), sodium acetate, acetic acid, garlic powder, citric acid, onion powder, spice, disodium inosinate, disodium guanylate), olive oil.
              </p>
              <p className={styles.nutritionBody}><strong>Contains:</strong> Milk.</p>
              <p className={styles.nutritionBody}>
                <strong>Allergy Warning:</strong> If you have a shellfish or crustacean allergy, you may also be allergic to crickets. Please consult your doctor.
              </p>
            </div>
            <div className={styles.nutritionCol}>
              <p className={styles.itemSubheading}>Ingrédients</p>
              <p className={styles.nutritionBody}>
                Grillons, Assaisonnement (sucres (solides de glucose, sucre), sel, lactosérum en poudre (lait), acétate de sodium, acide acétique, poudre d&apos;ail, acide citrique, poudre d&apos;onion, épice, inosinate disodique, guanylate disodique), huile d&apos;olive.
              </p>
              <p className={styles.nutritionBody}><strong>Contient:</strong> Lait.</p>
              <p className={styles.nutritionBody}>
                <strong>Avertissement d&apos;allergies:</strong> Si vous avez une allergie aux crustacés ou aux fruits de mer, vous pouvez également être allergique aux grillons. Veuillez consulter votre médecin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── PCF Quick Facts Section ── */}
    <section className={styles.productFeatureSection}>
      <div className={styles.productFeatureInner}>
        {/* Left */}
        <div className={styles.featureLeft}>
          <h2 className={styles.featureHeading}>PCF QUICK FACTS</h2>
        </div>

        {/* Right — Accordion + Static */}
        <div className={styles.featureRight}>

          {/* ── Group title ── */}
          <h3 className={styles.itemHeading}>What are the main benefits of cricket powder?</h3>

          {/* ── 1. More protein per serving ── */}
          <div className={`${styles.accItem} ${openFact === "protein" ? styles.accOpen : ""}`}>
            <button className={styles.accTrigger} onClick={() => toggleFact("protein")}>
              <span className={styles.accLabel}>More protein per serving.</span>
              <svg className={styles.accIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" className={openFact === "protein" ? styles.accIconV : ""} />
                <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className={styles.accBody}>
              <div className={styles.accBodyInner}>
                <div className={styles.accContent}>
                  <p className={styles.itemDesc}>
                    Yes, the rumours are true! With only 2.5 tbsps (19g) of cricket powder, you&apos;re getting 12 grams of protein.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. More than just protein ── */}
          <div className={`${styles.accItem} ${openFact === "nutrients" ? styles.accOpen : ""}`}>
            <button className={styles.accTrigger} onClick={() => toggleFact("nutrients")}>
              <span className={styles.accLabel}>More than just protein.</span>
              <svg className={styles.accIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" className={openFact === "nutrients" ? styles.accIconV : ""} />
                <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className={styles.accBody}>
              <div className={styles.accBodyInner}>
                <div className={styles.accContent}>
                  <p className={styles.itemDesc}>
                    Our powder offers more naturally occurring nutrients than conventional protein-only powders on the market.
                  </p>
                  <ul className={styles.mainList}>
                    <li>Vitamin B12</li>
                    <li>Zinc</li>
                    <li>Manganese</li>
                    <li>Omega 3 &amp; 6 fatty acids</li>
                    <li>Dairy-free Calcium</li>
                    <li>Iron</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Bio-available nutrients ── */}
          <div className={`${styles.accItem} ${openFact === "bioavailable" ? styles.accOpen : ""}`}>
            <button className={styles.accTrigger} onClick={() => toggleFact("bioavailable")}>
              <span className={styles.accLabel}>Access to bio-available nutrients lacking in both animal- and plant-based diets.</span>
              <svg className={styles.accIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" className={openFact === "bioavailable" ? styles.accIconV : ""} />
                <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className={styles.accBody}>
              <div className={styles.accBodyInner}>
                <div className={styles.accContent}>
                  <p className={styles.itemDesc}>
                    Cricket powder really is the best of both worlds. Naturally included in our powder is:
                  </p>
                  <ul className={styles.mainList}>
                    <li>Fibre that may be lacking from animal-based diets</li>
                    <li>Vitamin B12 that may be lacking from plant-based diets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ── How and when — static ── */}
          <h3 className={styles.itemHeading}>How and when should cricket powder be consumed?</h3>
          <p className={styles.itemDescAlt}>
            Cricket powder can be consumed at all times of the day. It&apos;s best consumed when mixed into food or drink — while you&apos;re welcome to mix with water only, the naturally nutty flavour tastes best when mixed into smoothies, baked goods, and other recipes.
          </p>
          <ul className={styles.mainList}>
            <li>
              Use as a flour replacement in baking (recommended mix: 25% cricket powder + 75% regular flour) to add extra protein to cookies, muffins, cakes, etc.
              <ul className={styles.subList}>
                <li>Ex: Recipe calls for 1 cup flour → replace with ¼ cup Prairie Cricket Farms Cricket Powder + ¾ cup flour or gluten free alternative</li>
              </ul>
            </li>
            <li>Mix into smoothies or yogurt to add protein to your daily favourites</li>
          </ul>

        </div>
      </div>
    </section>
    </>
  );
}
