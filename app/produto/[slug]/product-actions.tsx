"use client";
import { useState } from "react";
import { useStore } from "../../components/store-provider";

export function ProductActions({ productId }: { productId: string }) {
  const { addToCart, toggleFavorite, favorites } = useStore();
  const [quantity, setQuantity] = useState(1);
  return <><div className="quantity-row"><input aria-label="Quantidade" min="1" max="9" type="number" value={quantity} onChange={(event)=>setQuantity(Math.max(1, Number(event.target.value)))} /><button className="button button-dark" onClick={()=>addToCart(productId, quantity)}>Adicionar ao carrinho</button></div><button className="button button-outline button-full" style={{marginTop: 10}} onClick={()=>toggleFavorite(productId)}>{favorites.includes(productId) ? "♥ Salvo nos favoritos" : "♡ Salvar nos favoritos"}</button></>;
}

