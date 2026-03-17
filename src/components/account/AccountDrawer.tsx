"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import styles from "./AccountDrawer.module.scss";

type View = "login" | "forgot" | "signup";

// ─── Icons ────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="3" y1="3" x2="15" y2="15" strokeLinecap="round" />
    <line x1="15" y1="3" x2="3" y2="15" strokeLinecap="round" />
  </svg>
);

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="11,3 5,9 11,15" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

// ─── Nav links (logged-in view) ───────────────────────────────
const ACCOUNT_LINKS = [
  { label: "Overview", href: "/account", icon: "M3 5h10M3 8h7M3 11h4" },
  { label: "Subscription", href: "/account/subscription", icon: "M8 3v3m0 0a2 2 0 100 4 2 2 0 000-4zM3 13c0-2.2 2.2-4 5-4s5 1.8 5 4" },
  { label: "Wishlist", href: "/account/wishlist", icon: "M8 13.5S2 9.5 2 5.5a3.5 3.5 0 017 0 3.5 3.5 0 017 0c0 4-6 8-6 8z" },
];

// ─── Props ─────────────────────────────────────────────────────
interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// ═══════════════════════════════════════════════════════════════
export default function AccountDrawer({ isOpen, onClose }: AccountDrawerProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>("login");

  // Shared form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  // ESC key close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // body scroll lock + html.account-open class
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("account-open");
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("account-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("account-open");
    };
  }, [isOpen]);

  // Full reset when drawer closes (React 18+ batches these updates automatically)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isOpen) {
      setName(""); setEmail(""); setPassword("");
      setError(""); setSuccess(""); setLoading(false);
      setView("login");
    }
  }, [isOpen]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // ── View transition helper ─────────────────────────────────────────────
  const goTo = (v: View) => {
    setError(""); setSuccess(""); setPassword("");
    setView(v);
  };

  // ── Login ───────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else { router.refresh(); onClose(); }
  };

  // ── Sign up ─────────────────────────────────────────────────
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSuccess(`We've sent a confirmation link to ${email}. Click it to activate your account.`);
  };

  // ── Google login/signup ─────────────────────────────────────────
  const handleGoogle = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/account` },
      });
      if (error) setError(error.message);
    } catch { setError("Google sign in failed. Please try again."); }
  };

  // ── Password reset ───────────────────────────────────────────
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/account`,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSuccess("Check your email — a password reset link has been sent.");
  };

  // ── Sign out ─────────────────────────────────────────────────
  const handleSignOut = async () => {
    await signOut(); onClose(); router.refresh();
  };

  const getInitial = (u: User) => (u.user_metadata?.full_name || u.email || "").charAt(0).toUpperCase();
  const displayName = (u: User) => u.user_metadata?.full_name || u.email?.split("@")[0] || "Member";

  // Views that need a back button in header
  const showBack = !user && (view === "forgot" || view === "signup");
  const backLabel = view === "forgot" ? "Login" : "Login";

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Tint layer */}
      <div
        className={`${styles.tintLayer} ${isOpen ? styles.tintLayerVisible : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Account"
      >
        {/* ── Header ───────────────────────────────────── */}
        <div className={styles.accountDrawerHeader}>
          {showBack ? (
            <button className={styles.backBtn} onClick={() => goTo("login")} aria-label="Back to login">
              <BackIcon />
              <span>{backLabel}</span>
            </button>
          ) : (
            <h2 className={styles.heading}>Account</h2>
          )}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <div className={styles.accountDivider} />

        {/* ── Body ─────────────────────────────────────── */}
        <div className={styles.accountDrawerBody}>

          {/* ════ Logged-in ════ */}
          {user ? (
            <div className={styles.loggedIn}>
              <div className={styles.userCard}>
                <div className={styles.avatar}>{getInitial(user)}</div>
                <div className={styles.userInfo}>
                  <p className={styles.userName}>{displayName(user)}</p>
                  <p className={styles.userEmail}>{user.email}</p>
                </div>
              </div>
              <nav className={styles.accountNav}>
                {ACCOUNT_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className={styles.accountNavItem} onClick={onClose}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d={link.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <button className={styles.signOutBtn} onClick={handleSignOut}>
                <span className={styles.mask}><span className={styles.slide} data-content="Sign Out">Sign Out</span></span>
              </button>
            </div>

          ) : view === "login" ? (
            /* ════ Login ════ */
            <div className={styles.loginView}>
              <h3 className={styles.loginHeading}>Login</h3>
              {error && <div className={styles.errorMsg}>{error}</div>}

              <form className={styles.accountForm} onSubmit={handleLogin}>
                <div className={styles.accountField}>
                  <label htmlFor="drawer-email">Email</label>
                  <input id="drawer-email" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required autoComplete="email" placeholder="you@example.com" disabled={loading} />
                </div>
                <div className={styles.accountField}>
                  <label htmlFor="drawer-password">Password</label>
                  <input id="drawer-password" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required autoComplete="current-password" placeholder="••••••••" disabled={loading} />
                </div>
                <button type="submit" className={styles.actionBtn} disabled={loading}>
                  <span className={styles.mask}><span className={styles.slide} data-content={loading ? "Signing in…" : "Login"}>{loading ? "Signing in…" : "Login"}</span></span>
                </button>
              </form>

              <div className={styles.orDivider}><span>or</span></div>

              <button className={styles.googleBtn} onClick={handleGoogle} type="button" disabled={loading}>
                <GoogleIcon />Continue with Google
              </button>

              <div className={styles.loginFooter}>
                <p className={styles.loginFooterText}>New to Prairie Cricket Farms? Join today!</p>
                <button type="button" className={styles.loginFooterLink} onClick={() => goTo("signup")}>
                  Create Account
                </button>
                <button type="button" className={styles.loginFooterLink} onClick={() => goTo("forgot")}>
                  Forgot Password
                </button>
              </div>
            </div>

          ) : view === "signup" ? (
            /* ════ Sign Up ════ */
            <div className={styles.loginView}>
              <h3 className={styles.loginHeading}>Create Account</h3>
              <p className={styles.forgotDesc}>Join Prairie Cricket Farms and track your orders, manage your subscription, and more.</p>

              {error && <div className={styles.errorMsg}>{error}</div>}
              {success && (
                <div className={styles.successMsg}>
                  <p>{success}</p>
                  <button type="button" className={styles.backToLoginBtn} onClick={() => goTo("login")} style={{ marginTop: "16px" }}>
                    Back to Login
                  </button>
                </div>
              )}

              {!success && (
                <form className={styles.accountForm} onSubmit={handleSignup}>
                  <div className={styles.accountField}>
                    <label htmlFor="drawer-name">Full Name</label>
                    <input id="drawer-name" type="text" value={name}
                      onChange={(e) => setName(e.target.value)}
                      required autoComplete="name" placeholder="Your name" disabled={loading} />
                  </div>
                  <div className={styles.accountField}>
                    <label htmlFor="drawer-signup-email">Email</label>
                    <input id="drawer-signup-email" type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required autoComplete="email" placeholder="you@example.com" disabled={loading} />
                  </div>
                  <div className={styles.accountField}>
                    <label htmlFor="drawer-signup-password">Password</label>
                    <input id="drawer-signup-password" type="password" value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required autoComplete="new-password" placeholder="At least 8 characters"
                      minLength={8} disabled={loading} />
                  </div>
                  <button type="submit" className={styles.actionBtn} disabled={loading}>
                    <span className={styles.mask}><span className={styles.slide} data-content={loading ? "Creating account…" : "Create Account"}>{loading ? "Creating account…" : "Create Account"}</span></span>
                  </button>
                </form>
              )}

              {!success && (
                <>
                  <div className={styles.orDivider}><span>or</span></div>
                  <button className={styles.googleBtn} onClick={handleGoogle} type="button" disabled={loading}>
                    <GoogleIcon />Continue with Google
                  </button>
                  <div className={styles.loginFooter}>
                    <p className={styles.loginFooterText}>Already have an account?</p>
                    <button type="button" className={styles.loginFooterLink} onClick={() => goTo("login")}>
                      Sign In
                    </button>
                  </div>
                </>
              )}
            </div>

          ) : (
            /* ════ Forgot Password ════ */
            <div className={styles.loginView}>
              <h3 className={styles.loginHeading}>Forgot Password</h3>
              <p className={styles.forgotDesc}>Enter your email and we&apos;ll send you a link to reset your password.</p>

              {error && <div className={styles.errorMsg}>{error}</div>}
              {success && <div className={styles.successMsg}>{success}</div>}

              {!success && (
                <form className={styles.accountForm} onSubmit={handleForgot}>
                  <div className={styles.accountField}>
                    <label htmlFor="drawer-forgot-email">Email</label>
                    <input id="drawer-forgot-email" type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required autoComplete="email" placeholder="you@example.com" disabled={loading} />
                  </div>
                  <button type="submit" className={styles.actionBtn} disabled={loading}>
                    <span className={styles.mask}><span className={styles.slide} data-content={loading ? "Sending…" : "Send Reset Link"}>{loading ? "Sending…" : "Send Reset Link"}</span></span>
                  </button>
                </form>
              )}

              {success && (
                <button type="button" className={styles.backToLoginBtn} onClick={() => goTo("login")}>
                  <span className={styles.mask}><span className={styles.slide} data-content="Back to Login">Back to Login</span></span>
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </>,
    document.body
  );
}
