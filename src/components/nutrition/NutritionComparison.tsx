"use client";

import styles from "./NutritionComparison.module.scss";

const ROWS = [
  { nutrient: "Protein",     cricket: "69g",    beef: "26g",   chicken: "31g",  whey: "80g"   },
  { nutrient: "Iron",        cricket: "9.5mg",  beef: "2.4mg", chicken: "1.3mg",whey: "0.4mg" },
  { nutrient: "Calcium",     cricket: "76mg",   beef: "11mg",  chicken: "15mg", whey: "120mg" },
  { nutrient: "Vitamin B12", cricket: "17.6μg", beef: "2μg",   chicken: "0.4μg",whey: "1.3μg" },
  { nutrient: "Omega-3",     cricket: "1.9g",   beef: "0.1g",  chicken: "0.1g", whey: "0.3g"  },
  { nutrient: "Calories",    cricket: "458",    beef: "292",   chicken: "165",  whey: "352"   },
];

const COLS: { key: keyof (typeof ROWS)[0]; label: string; highlight?: boolean }[] = [
  { key: "nutrient", label: "Per 100g"  },
  { key: "cricket",  label: "🦗 Cricket", highlight: true },
  { key: "beef",     label: "🥩 Beef"    },
  { key: "chicken",  label: "🍗 Chicken" },
  { key: "whey",     label: "🥛 Whey"   },
];

export default function NutritionComparison() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>How Does Cricket Stack Up?</p>
        <h2 className={styles.heading}>Cricket vs. The Competition</h2>
        <p className={styles.sub}>Per 100g comparison across common protein sources</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {COLS.map((col) => (
                  <th
                    key={col.key}
                    className={`${styles.th} ${col.highlight ? styles.thHighlight : ""}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.nutrient} className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  {COLS.map((col) => (
                    <td
                      key={col.key}
                      className={`${styles.td} ${col.key === "nutrient" ? styles.tdNutrient : ""} ${col.highlight ? styles.tdHighlight : ""}`}
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.disclaimer}>
          Values are approximate and based on publicly available nutritional data. Exact values may vary by product batch.
        </p>
      </div>
    </section>
  );
}
