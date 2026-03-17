"use client";

import styles from "./NutritionFacts.module.scss";

const STATS = [
  { value: "69g", label: "Protein per 100g", sub: "Complete amino acid profile" },
  { value: "9.5mg", label: "Iron per 100g", sub: "4× more than spinach" },
  { value: "17.6μg", label: "Vitamin B12", sub: "Per 100g serving" },
  { value: "458", label: "Calories per 100g", sub: "High-density nutrition" },
];

const LABEL_ROWS = [
  { nutrient: "Calories",         value: "458",    unit: "kcal", indent: false, bold: true },
  { nutrient: "Protein",          value: "69",     unit: "g",    indent: false, bold: true },
  { nutrient: "Total Fat",        value: "21",     unit: "g",    indent: false, bold: false },
  { nutrient: "Saturated Fat",    value: "6",      unit: "g",    indent: true,  bold: false },
  { nutrient: "Total Carbs",      value: "3",      unit: "g",    indent: false, bold: false },
  { nutrient: "Dietary Fiber",    value: "7",      unit: "g",    indent: true,  bold: false },
  { nutrient: "Sugars",           value: "1",      unit: "g",    indent: true,  bold: false },
  { nutrient: "Calcium",          value: "76",     unit: "mg",   indent: false, bold: false },
  { nutrient: "Iron",             value: "9.5",    unit: "mg",   indent: false, bold: false },
  { nutrient: "Vitamin B12",      value: "17.6",   unit: "μg",   indent: false, bold: false },
  { nutrient: "Omega-3 (ALA)",    value: "1.9",    unit: "g",    indent: false, bold: false },
  { nutrient: "Zinc",             value: "9.1",    unit: "mg",   indent: false, bold: false },
];

export default function NutritionFacts() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left — stat callouts */}
        <div className={styles.colStats}>
          <p className={styles.eyebrow}>Per 100g Cricket Powder</p>
          <h2 className={styles.heading}>Numbers That Speak For Themselves</h2>
          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statCard}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statSub}>{s.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — nutrition label */}
        <div className={styles.colLabel}>
          <div className={styles.label}>
            <div className={styles.labelHeader}>
              <h3 className={styles.labelTitle}>Nutrition Facts</h3>
              <p className={styles.labelServing}>Serving size 100g (Cricket Powder)</p>
            </div>
            <div className={styles.labelDividerThick} />
            <table className={styles.table}>
              <tbody>
                {LABEL_ROWS.map((row) => (
                  <tr
                    key={row.nutrient}
                    className={`${styles.row} ${row.indent ? styles.rowIndent : ""} ${row.bold ? styles.rowBold : ""}`}
                  >
                    <td className={styles.cellName}>{row.nutrient}</td>
                    <td className={styles.cellValue}>{row.value}{row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.labelDividerThick} />
            <p className={styles.labelNote}>* Percent Daily Values are based on a 2,000 calorie diet.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
