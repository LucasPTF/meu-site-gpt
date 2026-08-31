"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "../lib/products";
import { brl } from "../lib/products";
import { useStore } from "./store-provider";

function ProductVisual({ product }: { product: Product }) {
  if (product.image) return <Image src={product.image} alt={product.name} width={520} height={520} loading="lazy" />;
  return (
    <div className="product-placeholder" aria-label={`Representação ilustrativa de ${product.name}`}>
      <span>{product.brand}</span><strong>{product.shortName}</strong><i>imagem ilustrativa</i>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite } = useStore();
  const favorite = favorites.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-image" style={{ background: product.accent }}>
        {product.badge && <span className="badge">{product.badge}</span>}
        <button className={`favorite ${favorite ? "favorite-active" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`}>{favorite ? "♥" : "♡"}</button>
        <Link href={`/produto/${product.slug}`}><ProductVisual product={product} /></Link>
      </div>
      <div className="product-body">
        <p className="product-brand">{product.brand} · {product.category}</p>
        <Link href={`/produto/${product.slug}`} className="product-name">{product.name}</Link>
        <p className="review-empty">☆ Avaliações internas após compras verificadas</p>
        <div className="product-price"><strong>{brl(product.pixPrice)}</strong><span>no Pix</span></div>
        <p className="installments">ou {brl(product.price)} em até 6×</p>
        <div className="product-card-foot"><span>Margem pré-CAC <b>{product.margin.toFixed(1)}%</b></span><span>Score <b>{product.score.toFixed(1)}</b></span></div>
        <button className="button button-dark button-full" onClick={() => addToCart(product.id)}>Adicionar ao carrinho</button>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
