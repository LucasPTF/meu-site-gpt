"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../lib/products";
import { brl } from "../lib/products";
import { useStore } from "./store-provider";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite } = useStore();
  const favorite = favorites.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-image" style={{ background: product.accent }}>
        {product.badge && <span className="badge">{product.badge}</span>}
        <button className={`favorite ${favorite ? "favorite-active" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`}>{favorite ? "♥" : "♡"}</button>
        <Link href={`/produto/${product.slug}`} aria-label={`Ver ${product.name}`}><Image src={product.image} alt={product.media[0].alt} width={620} height={620} loading="lazy" /></Link>
      </div>
      <div className="product-body">
        <p className="product-brand">{product.brand} · {product.category}</p>
        <Link href={`/produto/${product.slug}`} className="product-name">{product.name}</Link>
        <p className="product-benefit">{product.benefit}</p>
        <div className="product-price"><strong>{brl(product.pixPrice)}</strong><span>no Pix</span></div>
        <p className="installments">ou {brl(product.price)} em até 6×</p>
        <ul className="card-tags">{product.tags.slice(1, 4).map((tag) => <li key={tag}>{tag.replaceAll("-", " ")}</li>)}</ul>
        <button className="button button-dark button-full" onClick={() => addToCart(product.id)}>Adicionar ao carrinho</button>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
