import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/layout/LenisProvider";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.scss";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prairie Cricket Farms — Sustainable Cricket Protein",
    template: "%s | Prairie Cricket Farms",
  },
  description:
    "Prairie Cricket Farms offers premium cricket-based protein products. Sustainable, nutritious, and delicious cricket protein powder, flour, and more.",
  metadataBase: new URL("https://prairiecricketfarms.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    siteName: "Prairie Cricket Farms",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodoni.variable} ${inter.variable}`}>
        <AuthProvider>
        <CartProvider>
          <LenisProvider>
            <Header />
            <main id="main-content" className="main-content">
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </LenisProvider>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
