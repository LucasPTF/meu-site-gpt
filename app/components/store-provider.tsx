"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../lib/products";

export type CartLine = { productId: string; quantity: number };

type StoreContextValue = {
  cart: CartLine[];
  favorites: string[];
  cartCount: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  clearCart: () => void;
  toast: string;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setCart(JSON.parse(localStorage.getItem("nordly-cart") || "[]"));
        setFavorites(JSON.parse(localStorage.getItem("nordly-favorites") || "[]"));
      } catch {
        setCart([]);
        setFavorites([]);
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const forceDocumentNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(target instanceof HTMLAnchorElement) || target.target === "_blank" || target.download) return;
      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(url.href);
    };
    document.addEventListener("click", forceDocumentNavigation, true);
    return () => document.removeEventListener("click", forceDocumentNavigation, true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("nordly-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("nordly-favorites", JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const value = useMemo<StoreContextValue>(() => ({
    cart,
    favorites,
    cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
    addToCart(productId, quantity = 1) {
      setCart((current) => {
        const existing = current.find((line) => line.productId === productId);
        if (existing) return current.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + quantity } : line);
        return [...current, { productId, quantity }];
      });
      announce("Produto adicionado ao carrinho");
    },
    updateQuantity(productId, quantity) {
      if (quantity <= 0) {
        setCart((current) => current.filter((line) => line.productId !== productId));
        return;
      }
      setCart((current) => current.map((line) => line.productId === productId ? { ...line, quantity } : line));
    },
    removeFromCart(productId) {
      setCart((current) => current.filter((line) => line.productId !== productId));
      announce("Produto removido");
    },
    toggleFavorite(productId) {
      setFavorites((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);
    },
    clearCart() { setCart([]); },
    toast,
  }), [cart, favorites, toast]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div className={`toast ${toast ? "toast-visible" : ""}`} role="status" aria-live="polite">{toast}</div>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore precisa estar dentro de StoreProvider");
  return value;
}

export function getCartProducts(cart: CartLine[], products: Product[]) {
  return cart.map((line) => ({ ...line, product: products.find((product) => product.id === line.productId) })).filter((line): line is CartLine & { product: Product } => Boolean(line.product));
}
