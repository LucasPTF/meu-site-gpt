"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useStore } from "./store-provider";

const categories = [
  ["Mouses", "mouses"], ["Áudio", "audio"], ["Controles", "controles"], ["Teclados", "teclados"],
  ["Notebook", "notebook"], ["Hardware", "hardware"], ["Setup", "setup"],
];

export function Header({ showEnvironment = false }: { showEnvironment?: boolean }) {
  const { cartCount, favorites } = useStore();
  const [query, setQuery] = useState("");
  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    if (query.trim()) window.location.assign(`/catalogo?q=${encodeURIComponent(query.trim())}`);
  };

  return <>
    {showEnvironment && <div className="environment-bar"><strong>Ambiente de desenvolvimento</strong><span>Recursos de compra não processam pagamentos reais.</span></div>}
    <header className="site-header">
      <div className="header-main container">
        <Link href="/" className="logo" aria-label="Nordly — página inicial"><span className="logo-mark">N</span><span>NORDLY</span></Link>
        <form className="search-form" role="search" onSubmit={submitSearch}>
          <label className="sr-only" htmlFor="site-search">Buscar produtos</label>
          <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por produto, modelo, marca ou uso" />
          <button type="submit" aria-label="Buscar">⌕</button>
        </form>
        <nav className="header-actions" aria-label="Atalhos">
          <Link href="/conta"><span>◎</span><small>Conta</small></Link>
          <Link href="/catalogo?favoritos=1"><span>♡</span><small>Favoritos</small>{favorites.length > 0 && <b>{favorites.length}</b>}</Link>
          <Link href="/carrinho"><span>▱</span><small>Carrinho</small>{cartCount > 0 && <b>{cartCount}</b>}</Link>
        </nav>
      </div>
      <nav className="category-nav container" aria-label="Categorias principais">
        <Link className="category-all" href="/catalogo">Todos os produtos</Link>
        {categories.map(([label, slug]) => <Link key={slug} href={`/catalogo?category=${slug}`}>{label}</Link>)}
        <Link className="nav-highlight" href="/pesquisa">Como escolhemos</Link>
      </nav>
    </header>
  </>;
}
