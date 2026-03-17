"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import {
  createCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
  getCart,
  type ShopifyCart,
} from "@/lib/shopify";
import { products } from "@/data/products";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
export interface CartItem {
  id: string;           // Shopify cart line ID
  merchandiseId: string; // Shopify variant GID
  productId: string;
  title: string;
  variantTitle: string;
  image: string;
  price: string;
  quantity: number;
  handle: string;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalCount: number;
  totalPrice: number;
  checkoutUrl: string | null;
  loading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, qty: number) => Promise<void>;
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
const CART_ID_KEY = "shopify_cart_id";

function cartToItems(cart: ShopifyCart): CartItem[] {
  return cart.lines.edges.map(({ node }) => ({
    id: node.id,
    merchandiseId: node.merchandise.id,
    productId: node.merchandise.product.id,
    title: node.merchandise.product.title,
    variantTitle: node.merchandise.title,
    image: node.merchandise.image?.url ||
      products.find((p) => p.handle === node.merchandise.product.handle)?.image ||
      "",
    price: node.merchandise.price.amount,
    quantity: node.quantity,
    handle: node.merchandise.product.handle,
  }));
}

// ──────────────────────────────────────────────
// Context
// ──────────────────────────────────────────────
const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

// ──────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  // ── Cart state sync ──────────────────────────
  function syncCart(c: ShopifyCart) {
    setCart(c);
    setItems(cartToItems(c));
    setCheckoutUrl(c.checkoutUrl);
    localStorage.setItem(CART_ID_KEY, c.id);
  }

  // ── Restore existing cart ────────────────────────────
  useEffect(() => {
    const savedId = localStorage.getItem(CART_ID_KEY);
    if (!savedId) return;
    getCart(savedId)
      .then((c) => { if (c) syncCart(c); })
      .catch(() => localStorage.removeItem(CART_ID_KEY));
  }, []);

  // ── Get cart ID (create if not exists) ─────────────
  async function getOrCreateCartId(): Promise<string> {
    if (cart) return cart.id;
    const savedId = localStorage.getItem(CART_ID_KEY);
    if (savedId) return savedId;
    const newCart = await createCart();
    syncCart(newCart);
    return newCart.id;
  }

  // ── Add item ─────────────────────────────────
  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setLoading(true);
      try {
        const cartId = await getOrCreateCartId();
        const updated = await addCartLines(cartId, [{ merchandiseId, quantity }]);
        syncCart(updated);
        setIsOpen(true);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart]
  );

  // ── Update quantity ─────────────────────────────────
  const updateQuantity = useCallback(
    async (lineId: string, qty: number) => {
      if (!cart) return;
      setLoading(true);
      try {
        if (qty <= 0) {
          const updated = await removeCartLines(cart.id, [lineId]);
          syncCart(updated);
        } else {
          const updated = await updateCartLines(cart.id, [{ id: lineId, quantity: qty }]);
          syncCart(updated);
        }
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  // ── Remove item ───────────────────────────────
  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setLoading(true);
      try {
        const updated = await removeCartLines(cart.id, [lineId]);
        syncCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + parseFloat(i.price) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalCount,
        totalPrice,
        checkoutUrl,
        loading,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
