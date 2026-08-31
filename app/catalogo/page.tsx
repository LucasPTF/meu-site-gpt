"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ProductGrid } from "../components/product-card";
import { useStore } from "../components/store-provider";
import {
  activeProducts,
  brandSlug,
  filterProducts,
  publicFilterGroups,
  tagDefinitions,
  type CatalogSelection,
  type PublicFilterGroup,
} from "../lib/products";

const legacyCategory: Record<string, string> = {
  "áudio": "audio", audio: "audio", controles: "controles", teclados: "teclados",
  notebook: "notebook", hardware: "hardware", setup: "setup", mouses: "mouses", acessorios: "acessorios",
};
const subscribeToLocation = () => () => undefined;
const readLocation = () => window.location.search.slice(1);
const readServerLocation = () => "";

export default function CatalogPage() {
  const paramString = useSyncExternalStore(subscribeToLocation, readLocation, readServerLocation);
  const params = useMemo(() => new URLSearchParams(paramString), [paramString]);
  const { favorites } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const query = params.get("q") || "";
  const onlyFavorites = params.get("favoritos") === "1";
  const sort = params.get("sort") || "featured";
  const urlPriceMax = Number(params.get("precoMax") || 0);
  const [priceMax, setPriceMax] = useState(urlPriceMax || 1000);

  const selected = useMemo(() => {
    const values = Object.fromEntries(publicFilterGroups.map(({ key }) => [key, params.getAll(key)])) as Record<PublicFilterGroup, string[]>;
    const oldCategory = params.get("categoria");
    if (oldCategory) values.category.push(legacyCategory[oldCategory.toLocaleLowerCase("pt-BR")] || oldCategory);
    return values;
  }, [params]);

  const filtered = useMemo(() => {
    const items = filterProducts(activeProducts, selected, query).filter((product) =>
      (!urlPriceMax || product.pixPrice <= urlPriceMax) && (!onlyFavorites || favorites.includes(product.id)));
    return [...items].sort((a, b) => {
      if (sort === "price-asc") return a.pixPrice - b.pixPrice;
      if (sort === "price-desc") return b.pixPrice - a.pixPrice;
      if (sort === "name") return a.name.localeCompare(b.name, "pt-BR");
      return Number(b.featured) - Number(a.featured) || b.operations.score - a.operations.score;
    });
  }, [selected, query, urlPriceMax, onlyFavorites, favorites, sort]);

  const updateValue = (group: PublicFilterGroup, value: string) => {
    const next = new URLSearchParams(params.toString());
    next.delete("categoria");
    const values = next.getAll(group);
    next.delete(group);
    (values.includes(value) ? values.filter((item) => item !== value) : [...values, value]).forEach((item) => next.append(group, item));
    window.location.assign(`/catalogo?${next.toString()}`);
  };

  const labelFor = (group: PublicFilterGroup, value: string) => group === "brand"
    ? activeProducts.find((product) => brandSlug(product.brand) === value)?.brand ?? value
    : tagDefinitions.find((tag) => tag.slug === value)?.label ?? value;
  const activeChips = publicFilterGroups.flatMap(({ key }) =>
    selected[key].map((value) => ({ group: key, value, label: labelFor(key, value) })));
  if (urlPriceMax) activeChips.push({ group: "price", value: `max-${urlPriceMax}`, label: `Até R$ ${urlPriceMax}` });

  const optionsFor = (group: PublicFilterGroup) => group === "brand"
    ? [...new Map(activeProducts.map((product) => [brandSlug(product.brand), { slug: brandSlug(product.brand), label: product.brand }])).values()]
      .sort((a, b) => a.label.localeCompare(b.label, "pt-BR"))
    : tagDefinitions.filter((tag) => tag.group === group && activeProducts.some((product) => product.tags.includes(tag.slug)));

  const countFor = (group: PublicFilterGroup, value: string) => {
    const current = selected[group] ?? [];
    const candidate: CatalogSelection = { ...selected, [group]: current.includes(value) ? current : [...current, value] };
    return filterProducts(activeProducts, candidate, query).filter((product) => !urlPriceMax || product.pixPrice <= urlPriceMax).length;
  };

  const commitPriceMax = () => {
    const next = new URLSearchParams(params.toString());
    if (priceMax >= 1000) next.delete("precoMax"); else next.set("precoMax", String(priceMax));
    window.location.assign(`/catalogo?${next.toString()}`);
  };

  const clearPriceMax = () => {
    const next = new URLSearchParams(params.toString());
    next.delete("precoMax");
    window.location.assign(`/catalogo?${next.toString()}`);
  };

  const filters = <div className="filter-panel">
    <div className="filter-head"><h2>Filtrar produtos</h2>{activeChips.length > 0 && <Link href={query ? `/catalogo?q=${encodeURIComponent(query)}` : "/catalogo"}>Limpar tudo</Link>}</div>
    {publicFilterGroups.map(({ key, label }) => <fieldset className="filter-group" key={key}>
      <legend>{label}</legend>
      {optionsFor(key).map((tag) => {
        const count = countFor(key, tag.slug);
        if (count === 0 && !selected[key].includes(tag.slug)) return null;
        return <label key={tag.slug}><input type="checkbox" checked={selected[key].includes(tag.slug)} onChange={() => updateValue(key, tag.slug)} /><span>{tag.label}</span><small>{count}</small></label>;
      })}
    </fieldset>)}
    <fieldset className="filter-group price-slider">
      <legend>Preço máximo</legend>
      <output>{priceMax >= 1000 ? "Sem limite" : `Até R$ ${priceMax}`}</output>
      <input aria-label="Preço máximo" type="range" min="100" max="1000" step="50" value={priceMax}
        onChange={(event) => setPriceMax(Number(event.target.value))}
        onPointerUp={commitPriceMax}
        onKeyUp={(event) => { if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) commitPriceMax(); }} />
    </fieldset>
  </div>;

  return <main>
    <section className="catalog-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Início</Link> / Catálogo</div><span className="eyebrow">{activeProducts.length} PRODUTOS SELECIONADOS</span><h1>{onlyFavorites ? "Seus favoritos" : query ? `Resultados para “${query}”` : "Tecnologia para o seu jeito de usar"}</h1><p>Combine categorias, uso, compatibilidade e características para chegar no produto certo.</p></div></section>
    <div className="container catalog-layout">
      <aside className="filters" aria-label="Filtros do catálogo">{filters}</aside>
      <section className="catalog-products">
        <div className="mobile-filter-row"><button className="button button-outline" onClick={() => setDrawerOpen(true)}>Filtrar {activeChips.length > 0 && `(${activeChips.length})`}</button></div>
        {activeChips.length > 0 && <div className="filter-chips">{activeChips.map((chip) => chip.value.startsWith("max-")
          ? <button key={chip.value} onClick={clearPriceMax}>{chip.label} ×</button>
          : <button key={`${chip.group}-${chip.value}`} onClick={() => updateValue(chip.group, chip.value)}>{chip.label} ×</button>)}</div>}
        <div className="catalog-toolbar"><p><strong>{filtered.length}</strong> produto{filtered.length === 1 ? "" : "s"} encontrado{filtered.length === 1 ? "" : "s"}</p><label>Ordenar por <select value={sort} onChange={(event) => { const next = new URLSearchParams(params.toString()); next.set("sort", event.target.value); window.location.assign(`/catalogo?${next.toString()}`); }}><option value="featured">Destaques</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option><option value="name">Nome A–Z</option></select></label></div>
        {filtered.length ? <ProductGrid items={filtered} /> : <div className="empty-state"><h2>Nenhum produto combina com esses filtros.</h2><p>Remova um filtro ou faça uma busca mais ampla.</p><Link className="button button-dark" href="/catalogo">Limpar filtros</Link></div>}
      </section>
    </div>
    {drawerOpen && <div className="filter-drawer-backdrop"><button className="filter-drawer-scrim" onClick={() => setDrawerOpen(false)} aria-label="Fechar filtros" /><aside className="filter-drawer" aria-label="Filtros móveis"><div className="drawer-head"><strong>Filtros</strong><button onClick={() => setDrawerOpen(false)} aria-label="Fechar filtros">×</button></div>{filters}<button className="button button-lime button-full" onClick={() => setDrawerOpen(false)}>Mostrar {filtered.length} produtos</button></aside></div>}
  </main>;
}
