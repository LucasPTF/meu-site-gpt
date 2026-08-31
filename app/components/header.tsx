"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useStore } from "./store-provider";

const categories = ["Áudio", "Controles", "Teclados", "Notebook", "Hardware", "Setup"];

export function Header() {
  const { cartCount, favorites } = useStore();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/catalogo?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <div className="sandbox-bar">
        <span>Ambiente de validação</span>
        <strong>Checkout sandbox — nenhum pagamento ou pedido real será realizado</strong>
        <Link href="/pesquisa">Ver método</Link>
      </div>
      <header className="site-header">
        <div className="header-main container">
          <Link href="/" className="logo" aria-label="Nordly — página inicial">
            <span className="logo-mark">N</span>
            <span>NORDLY</span>
          </Link>
          <form className="search-form" role="search" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="site-search">Buscar produtos</label>
            <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por produto, categoria ou marca" />
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
          {categories.map((category) => <Link key={category} href={`/catalogo?categoria=${encodeURIComponent(category)}`}>{category}</Link>)}
          <Link className="nav-highlight" href="/pesquisa">Como selecionamos</Link>
        </nav>
      </header>
    </>
  );
}

