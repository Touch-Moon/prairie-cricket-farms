"use client";

import { useState } from "react";
import styles from "../account.module.scss";

const MOCK_SUBSCRIPTION = {
  id: "sub_pcf_001",
  product: "Protein-Packed Cricket Powder (Large)",
  variant: "300 g · ~30 servings",
  frequency: "Every 28 days",
  price: "$49.99 / delivery",
  nextShipment: "April 7, 2026",
  status: "active",
  paymentMethod: "Visa •••• 4242",
  address: "123 Prairie Rd, Saskatoon, SK S7N 0W4",
};

const FREQUENCIES = [
  "Every 14 days",
  "Every 28 days",
  "Every 56 days",
  "Every 84 days",
];

export default function SubscriptionPage() {
  const [sub] = useState(MOCK_SUBSCRIPTION);
  const [frequency, setFrequency] = useState(sub.frequency);
  const [saved, setSaved] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancelConfirm = () => {
    setCancelled(true);
    setShowCancel(false);
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Subscription</h1>
        <p>Manage your recurring orders and delivery schedule.</p>
      </div>

      {/* Active subscription */}
      <div className={styles.accountSection}>
        <h2>Active Subscription</h2>

        <div className={styles.subCard}>
          <div className={styles.subHeader}>
            <div>
              <p className={styles.subProduct}>{sub.product}</p>
              <p className={styles.subMeta}>{sub.variant}</p>
            </div>
            <span className={`${styles.badge} ${cancelled ? styles.cancelled : styles.delivered}`}>
              {cancelled ? "Cancelled" : "Active"}
            </span>
          </div>

          {/* Next shipment */}
          <div className={styles.nextShipment}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {cancelled
              ? <>Subscription cancelled — no future shipments</>
              : <>Next shipment: <strong>{sub.nextShipment}</strong>&nbsp;·&nbsp;{sub.price}</>
            }
          </div>

          {/* Change frequency */}
          <div className={styles.field}>
            <label>Delivery Frequency</label>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)} disabled={cancelled}>
              {FREQUENCIES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {saved && (
            <div className={styles.successMsg}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Frequency updated to {frequency}!
            </div>
          )}

          <div className={styles.subActions}>
            <button className={styles.subBtnOutline} onClick={handleSave} disabled={cancelled}><span className={styles.mask}><span className={styles.slide} data-content="Save Changes">Save Changes</span></span></button>
            <button className={styles.subBtnOutline} disabled={cancelled}><span className={styles.mask}><span className={styles.slide} data-content="Skip Next Shipment">Skip Next Shipment</span></span></button>
            {!cancelled && (
              <button className={styles.subBtnDanger} onClick={() => setShowCancel(true)}>
                <span className={styles.mask}><span className={styles.slide} data-content="Cancel Subscription">Cancel Subscription</span></span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Delivery information */}
      <div className={styles.accountSection}>
        <h2>Delivery Address</h2>
        <div className={styles.profileForm}>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label>Address</label>
            <input type="text" defaultValue={sub.address} />
          </div>
          <div className={styles.field}>
            <label>City</label>
            <input type="text" defaultValue="Saskatoon" />
          </div>
          <div className={styles.field}>
            <label>Postal Code</label>
            <input type="text" defaultValue="S7N 0W4" />
          </div>
          <div className={styles.field}>
            <label>Province</label>
            <input type="text" defaultValue="SK" />
          </div>
          <div className={styles.field}>
            <label>Country</label>
            <input type="text" defaultValue="Canada" />
          </div>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <button className={styles.saveBtn}><span className={styles.mask}><span className={styles.slide} data-content="Update Address">Update Address</span></span></button>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className={styles.accountSection}>
        <h2>Payment Method</h2>
        <div className={styles.subCard}>
          <div className={styles.subHeader}>
            <div>
              <p className={styles.subProduct}>{sub.paymentMethod}</p>
              <p className={styles.subMeta}>Expires 08/28</p>
            </div>
          </div>
          <div className={styles.subActions}>
            <button className={styles.subBtnOutline}><span className={styles.mask}><span className={styles.slide} data-content="Update Payment">Update Payment</span></span></button>
          </div>
        </div>
      </div>

      {/* Cancel confirmation modal */}
      {showCancel && (
        <CancelModal
          onClose={() => setShowCancel(false)}
          onConfirm={handleCancelConfirm}
        />
      )}
    </>
  );
}

function CancelModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff", borderRadius: 6, padding: "40px 32px",
          maxWidth: 420, width: "100%", textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", marginBottom: 8 }}>
          Cancel subscription?
        </h3>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>
          You&apos;ll lose your subscriber discount and won&apos;t receive future shipments.
          This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={onClose}
            style={{
              height: 48, padding: "0 24px", background: "#14171a",
              color: "#fff", border: "none", borderRadius: 2,
              fontSize: 13, fontWeight: 500, letterSpacing: "0.08em",
              textTransform: "uppercase", cursor: "pointer",
            }}
          >
            Keep Subscription
          </button>
          <button
            onClick={onConfirm}
            style={{
              height: 48, padding: "0 24px", background: "none",
              color: "#dc2626", border: "1px solid #fca5a5", borderRadius: 2,
              fontSize: 13, fontWeight: 500, cursor: "pointer",
            }}
          >
            Cancel Anyway
          </button>
        </div>
      </div>
    </div>
  );
}
