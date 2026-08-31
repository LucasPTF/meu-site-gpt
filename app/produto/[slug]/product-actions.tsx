"use client";
import { useState } from "react";
import { useStore } from "../../components/store-provider";

export function ProductActions({ productId }: { productId: string }) {
  const { addToCart, toggleFavorite, favorites } = useStore();
  const [quantity, setQuantity] = useState(1);
  const buyNow = () => { addToCart(productId, quantity); window.location.assign("/checkout"); };
  return <><div className="quantity-row"><input aria-label="Quantidade" min="1" max="9" type="number" value={quantity} onChange={(event)=>setQuantity(Math.max(1, Number(event.target.value)))} /><button className="button button-dark" onClick={()=>addToCart(productId, quantity)}>Adicionar ao carrinho</button></div><button className="button button-lime button-full buy-now" onClick={buyNow}>Comprar agora</button><button className="button button-outline button-full" style={{marginTop: 10}} onClick={()=>toggleFavorite(productId)}>{favorites.includes(productId) ? "♥ Salvo nos favoritos" : "♡ Salvar nos favoritos"}</button></>;
}

export function BundleButton({ productIds }: { productIds: string[] }) {
  const { addToCart } = useStore();
  return <button className="button button-dark button-full" onClick={() => productIds.forEach((id) => addToCart(id))}>Adicionar combinação ao carrinho</button>;
}
