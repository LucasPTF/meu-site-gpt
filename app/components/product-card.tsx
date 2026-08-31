"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "../lib/products";
import { brl, tagDefinitions } from "../lib/products";
import { useStore } from "./store-provider";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite } = useStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const favorite = favorites.includes(product.id);
  const publicTags = product.tags.map((slug) => tagDefinitions.find((tag) => tag.slug === slug)).filter((tag) => tag && !["category", "price", "shipping", "merchandising"].includes(tag.group)).slice(0, 3);
  return (
    <article className="product-card">
      <div className={`product-image ${imageLoaded ? "image-loaded" : "image-loading"}`} style={{ background: product.accent }}>
        {product.badge && <span className="badge">{product.badge}</span>}
        <button className={`favorite ${favorite ? "favorite-active" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`}>{favorite ? "♥" : "♡"}</button>
        <Link href={`/produto/${product.slug}`} aria-label={`Ver ${product.name}`}><Image src={product.image} alt={product.media[0].alt} width={620} height={620} loading="lazy" sizes="(max-width: 520px) 100vw, (max-width: 1050px) 50vw, 25vw" onLoad={() => setImageLoaded(true)} onError={(event) => { event.currentTarget.src = "/og-v2.png"; setImageLoaded(true); }} /></Link>
      </div>
      <div className="product-body">
        <p className="product-brand">{product.brand} · {product.category}</p>
        <Link href={`/produto/${product.slug}`} className="product-name">{product.name}</Link>
        <p className="product-benefit">{product.benefit}</p>
        {product.compareAtPrice && product.compareAtPrice > product.price && <p className="compare-price">de {brl(product.compareAtPrice)}</p>}
        <div className="product-price"><strong>{brl(product.pixPrice)}</strong><span>no Pix</span></div>
        <p className="installments">ou {brl(product.price)} em até 6×</p>
        <ul className="card-tags">{publicTags.map((tag) => <li key={tag!.slug}>{tag!.label}</li>)}</ul>
        <button className="button button-dark button-full" onClick={() => addToCart(product.id)}>Adicionar ao carrinho</button>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
