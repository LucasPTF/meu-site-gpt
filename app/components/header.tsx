"use client";

import Link from "./static-link";
import { FormEvent, useState } from "react";
import { useStore } from "./store-provider";

const quickLinks = [
  ["Ofertas", "price=ate-100&price=100-200"], ["Fones", "type=headset"], ["Microfones", "type=microfone"],
  ["Mouses", "category=mouses"], ["Teclados", "category=teclados"], ["Controles", "category=controles"],
  ["Hardware", "category=hardware"], ["Setup", "category=setup"],
];

const megaGroups = [
  { title: "Áudio", links: [["Fones e headsets", "type=headset"], ["Microfones", "type=microfone"], ["Interfaces e mixers", "type=mixer"]] },
  { title: "Gaming", links: [["Mouses", "category=mouses"], ["Teclados", "category=teclados"], ["Controles", "category=controles"]] },
  { title: "Hardware", links: [["Memória RAM", "type=memoria-ram"], ["Cases NVMe", "type=case-nvme"], ["Hubs", "type=hub-usb-c"]] },
  { title: "Setup", links: [["Suportes", "type=suporte-notebook"], ["Iluminação", "type=luminaria"], ["Cabos", "type=cabo-usb-c"]] },
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
    <div className="announcement"><div className="container"><span>Modelos verificáveis e preços claros</span><Link href="/catalogo?price=ate-100">Achados até R$ 100 →</Link></div></div>
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
        <div className="mega-menu">
          <Link className="category-all" href="/catalogo">Todos os produtos</Link>
          <div className="mega-panel">
            {megaGroups.map((group) => <section key={group.title}><strong>{group.title}</strong>{group.links.map(([label, queryString]) => <Link key={label} href={`/catalogo?${queryString}`}>{label}</Link>)}</section>)}
            <Link className="mega-all" href="/catalogo">Explorar catálogo completo →</Link>
          </div>
        </div>
        {quickLinks.map(([label, queryString]) => <Link className={label === "Ofertas" ? "nav-offer" : ""} key={label} href={`/catalogo?${queryString}`}>{label}</Link>)}
      </nav>
    </header>
  </>;
}
