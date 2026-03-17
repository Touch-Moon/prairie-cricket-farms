"use client";

import { useState } from "react";
// ProductFeature의 스타일을 직접 재사용
import styles from "../product/ProductFeature.module.scss";

export default function NutritionDetails() {
  const [openFact, setOpenFact] = useState<string>("q1");

  const toggleFact = (id: string) => {
    setOpenFact(openFact === id ? "" : id);
  };

  return (
    <>
      {/* ── PCF Quick Facts ── */}
      <section className={styles.nutritionSection}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <h2 className={styles.heading}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.right}>

            {/* Q1 */}
            <div className={`${styles.accItem} ${openFact === "q1" ? styles.accOpen : ""}`}>
              <button className={styles.accTrigger} onClick={() => toggleFact("q1")}>
                <span className={styles.accLabel}>What is 100% Cricket Powder?</span>
                <svg className={styles.accIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5"
                    className={openFact === "q1" ? styles.accIconV : ""} />
                  <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <div className={styles.accBody}>
                <div className={styles.accBodyInner}>
                  <div className={styles.accContent}>
                    <p className={styles.itemDesc}>
                      The Prairie Cricket Farms pure cricket powder is made from 100% finely milled
                      roasted crickets. Our powder contains very similar protein content to that of
                      whey (12 grams of protein in only 2.5 tbsps) with the added benefit of being
                      a better option for your gut as it naturally contains prebiotic fibre and is
                      free of dairy. Another amazing benefit of cricket powder is that from start to
                      finish, its production has far less impact on the environment than more
                      traditional protein sources.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className={`${styles.accItem} ${openFact === "q2" ? styles.accOpen : ""}`}>
              <button className={styles.accTrigger} onClick={() => toggleFact("q2")}>
                <span className={styles.accLabel}>How does Cricket Farming work?</span>
                <svg className={styles.accIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5"
                    className={openFact === "q2" ? styles.accIconV : ""} />
                  <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <div className={styles.accBody}>
                <div className={styles.accBodyInner}>
                  <div className={styles.accContent}>
                    <p className={styles.itemDesc}>
                      Crickets are raised to prime harvesting age, frozen, boiled, roasted, and
                      milled to a fine powder. This practice is efficient and clean, and is a
                      process with extremely low emissions and little to no waste.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Q3 */}
            <div className={`${styles.accItem} ${openFact === "q3" ? styles.accOpen : ""}`}>
              <button className={styles.accTrigger} onClick={() => toggleFact("q3")}>
                <span className={styles.accLabel}>What are the main benefits of cricket powder?</span>
                <svg className={styles.accIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5"
                    className={openFact === "q3" ? styles.accIconV : ""} />
                  <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <div className={styles.accBody}>
                <div className={styles.accBodyInner}>
                  <div className={styles.accContent}>
                    <p className={styles.itemDesc}>
                      <strong>#1 More protein per serving.</strong><br />
                      Yes, the rumours are true! With only 2.5 tbsps (19g) of cricket powder,
                      you&apos;re getting 12 grams of protein.
                    </p>
                    <p className={styles.itemDesc}>
                      <strong>#2 More than just protein.</strong><br />
                      Our powder offers more naturally occurring nutrients than conventional
                      protein-only powders on the market.
                    </p>
                    <ul className={styles.mainList}>
                      <li>Vitamin B12</li>
                      <li>Zinc</li>
                      <li>Manganese</li>
                      <li>Omega 3 &amp; 6 fatty acids</li>
                      <li>Dairy-free Calcium</li>
                      <li>Iron</li>
                    </ul>
                    <p className={styles.itemDesc}>
                      <strong>#3 Access to bio-available nutrients lacking in both animal- and plant-based diets.</strong><br />
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

            {/* Q4 */}
            <div className={`${styles.accItem} ${openFact === "q4" ? styles.accOpen : ""}`}>
              <button className={styles.accTrigger} onClick={() => toggleFact("q4")}>
                <span className={styles.accLabel}>How and when should it be consumed? How do I use the powder?!</span>
                <svg className={styles.accIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5"
                    className={openFact === "q4" ? styles.accIconV : ""} />
                  <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <div className={styles.accBody}>
                <div className={styles.accBodyInner}>
                  <div className={styles.accContent}>
                    <ul className={styles.mainList}>
                      <li>Cricket powder can be consumed at all times of the day.</li>
                      <li>
                        Cricket powder is best consumed when mixed into food or drink — while
                        you&apos;re welcome to mix with water only, the naturally nutty flavour
                        tastes best when mixed into smoothies, baked goods, and other recipes.
                      </li>
                      <li>
                        Use as a flour replacement in baking (recommended mix: 25% cricket powder
                        + 75% regular flour) to add extra protein to cookies, muffins, cakes, etc.
                        <ul className={styles.subList}>
                          <li>
                            Ex: Recipe calls for 1 cup flour → replace with ¼ cup Prairie Cricket
                            Farms Cricket Powder + ¾ cup flour or gluten free alternative
                          </li>
                        </ul>
                      </li>
                      <li>Mix into smoothies or yogurt to add protein to your daily favourites</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
