"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "./account.module.scss";

const MOCK_ORDERS = [
  {
    id: "#PCF-10042",
    date: "Mar 10, 2026",
    items: "Cricket Powder (Large) × 2",
    total: "$99.98",
    status: "delivered",
  },
  {
    id: "#PCF-10031",
    date: "Feb 18, 2026",
    items: "Dill Pickle Crickets × 1, Smokey BBQ Crickets × 1",
    total: "$19.98",
    status: "delivered",
  },
  {
    id: "#PCF-10019",
    date: "Jan 25, 2026",
    items: "Cricket Powder (Standard) × 1, Unseasoned Crickets × 2",
    total: "$43.97",
    status: "delivered",
  },
];

export default function AccountPage() {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there";

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Hi, {displayName} 👋</h1>
        <p>Here&apos;s a summary of your account activity.</p>
      </div>

      {/* 통계 */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Orders</p>
          <p className={styles.statValue}>3</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Spent</p>
          <p className={styles.statValue}>$163.93</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Active Sub</p>
          <p className={styles.statValue}>1</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Wishlist</p>
          <p className={styles.statValue}>4</p>
        </div>
      </div>

      {/* 최근 주문 */}
      <div className={styles.accountSection}>
        <h2>Recent Orders</h2>
        <div className={styles.orderList}>
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderInfo}>
                <p className={styles.orderId}>{order.id}</p>
                <p className={styles.orderMeta}>
                  {order.date} · {order.items}
                </p>
              </div>
              <div className={styles.orderRight}>
                <p className={styles.orderTotal}>{order.total}</p>
                <span className={`${styles.badge} ${styles[order.status]}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 프로필 편집 */}
      <ProfileSection user={user} />
    </>
  );
}

function ProfileSection({ user }: { user: ReturnType<typeof useAuth>["user"] }) {
  return (
    <div className={styles.accountSection}>
      <h2>Profile Information</h2>
      <div className={styles.profileForm}>
        <div className={styles.field}>
          <label>First Name</label>
          <input
            type="text"
            defaultValue={user?.user_metadata?.full_name?.split(" ")[0] || ""}
            placeholder="First name"
          />
        </div>
        <div className={styles.field}>
          <label>Last Name</label>
          <input
            type="text"
            defaultValue={user?.user_metadata?.full_name?.split(" ")[1] || ""}
            placeholder="Last name"
          />
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Email</label>
          <input type="email" value={user?.email || ""} disabled readOnly />
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Phone (optional)</label>
          <input type="tel" placeholder="+1 (555) 000-0000" />
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <button className={styles.saveBtn}><span className={styles.mask}><span className={styles.slide} data-content="Save Changes">Save Changes</span></span></button>
        </div>
      </div>
    </div>
  );
}
