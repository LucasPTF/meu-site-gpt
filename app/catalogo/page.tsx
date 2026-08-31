"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ProductGrid } from "../components/product-card";
import { useStore } from "../components/store-provider";
import { activeProducts, matchesSearch, tagDefinitions, type Product, type TagGroup } from "../lib/products";

const filterGroups: { key: TagGroup; label: string }[] = [
  { key: "category", label: "Categoria" }, { key: "type", label: "Tipo de produto" },
  { key: "use", label: "Uso" }, { key: "compatibility", label: "Compatibilidade" },
  { key: "feature", label: "Características" }, { key: "price", label: "Faixa de preço" },
];

const legacyCategory: Record<string, string> = { "áudio": "audio", audio: "audio", controles: "controles", teclados: "teclados", notebook: "notebook", hardware: "hardware", setup: "setup", mouses: "mouses" };
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

  const selected = useMemo(() => {
    const values = Object.fromEntries(filterGroups.map(({ key }) => [key, params.getAll(key)])) as Record<TagGroup, string[]>;
    const oldCategory = params.get("categoria");
    if (oldCategory) values.category.push(legacyCategory[oldCategory.toLocaleLowerCase("pt-BR")] || oldCategory);
    const oldMax = Number(params.get("max") || 0);
    if (oldMax && oldMax <= 200) values.price.push("ate-200");
    return values;
  }, [params]);

  const matchesFilters = (product: Product) => filterGroups.every(({ key }) => {
    const values = selected[key];
    return !values.length || values.some((value) => product.tags.includes(value));
  });

  const filtered = useMemo(() => {
    const items = activeProducts.filter((product) => matchesFilters(product) && matchesSearch(product, query) && (!onlyFavorites || favorites.includes(product.id)));
    return [...items].sort((a, b) => {
      if (sort === "price-asc") return a.pixPrice - b.pixPrice;
      if (sort === "price-desc") return b.pixPrice - a.pixPrice;
      if (sort === "name") return a.name.localeCompare(b.name, "pt-BR");
      return Number(b.featured) - Number(a.featured) || b.operations.score - a.operations.score;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, query, onlyFavorites, favorites, sort]);

  const updateValue = (group: TagGroup, value: string) => {
    const next = new URLSearchParams(params.toString());
    next.delete("categoria"); next.delete("max");
    const values = next.getAll(group);
    next.delete(group);
    (values.includes(value) ? values.filter((item) => item !== value) : [...values, value]).forEach((item) => next.append(group, item));
    window.location.assign(`/catalogo?${next.toString()}`);
  };

  const removeChip = (group: TagGroup, value: string) => updateValue(group, value);
  const activeChips = filterGroups.flatMap(({ key }) => selected[key].map((value) => ({ group: key, value, label: tagDefinitions.find((tag) => tag.slug === value)?.label || value })));

  const filters = <div className="filter-panel">
    <div className="filter-head"><h2>Filtrar produtos</h2>{activeChips.length > 0 && <Link href={query ? `/catalogo?q=${encodeURIComponent(query)}` : "/catalogo"}>Limpar tudo</Link>}</div>
    {filterGroups.map(({ key, label }) => {
      const tags = tagDefinitions.filter((tag) => tag.group === key && activeProducts.some((product) => product.tags.includes(tag.slug)));
      return <fieldset className="filter-group" key={key}><legend>{label}</legend>{tags.map((tag) => {
        const count = activeProducts.filter((product) => product.tags.includes(tag.slug)).length;
        return <label key={tag.slug}><input type="checkbox" checked={selected[key].includes(tag.slug)} onChange={() => updateValue(key, tag.slug)} /><span>{tag.label}</span><small>{count}</small></label>;
      })}</fieldset>;
    })}
  </div>;

  return <main>
    <section className="catalog-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Início</Link> / Catálogo</div><span className="eyebrow">{activeProducts.length} PRODUTOS SELECIONADOS</span><h1>{onlyFavorites ? "Seus favoritos" : query ? `Resultados para “${query}”` : "Tecnologia para o seu jeito de usar"}</h1><p>Combine categorias, uso, compatibilidade e características para chegar no produto certo.</p></div></section>
    <div className="container catalog-layout">
      <aside className="filters" aria-label="Filtros do catálogo">{filters}</aside>
      <section className="catalog-products">
        <div className="mobile-filter-row"><button className="button button-outline" onClick={() => setDrawerOpen(true)}>Filtros {activeChips.length > 0 && `(${activeChips.length})`}</button></div>
        {activeChips.length > 0 && <div className="filter-chips">{activeChips.map((chip) => <button key={`${chip.group}-${chip.value}`} onClick={() => removeChip(chip.group, chip.value)}>{chip.label} ×</button>)}</div>}
        <div className="catalog-toolbar"><p><strong>{filtered.length}</strong> produto{filtered.length === 1 ? "" : "s"}</p><label>Ordenar por <select value={sort} onChange={(event) => { const next = new URLSearchParams(params.toString()); next.set("sort", event.target.value); window.location.assign(`/catalogo?${next.toString()}`); }}><option value="featured">Destaques</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option><option value="name">Nome A–Z</option></select></label></div>
        {filtered.length ? <ProductGrid items={filtered} /> : <div className="empty-state"><h2>Nenhum produto combina com esses filtros.</h2><p>Remova um filtro ou faça uma busca mais ampla.</p><Link className="button button-dark" href="/catalogo">Limpar filtros</Link></div>}
      </section>
    </div>
    {drawerOpen && <div className="filter-drawer-backdrop"><button className="filter-drawer-scrim" onClick={() => setDrawerOpen(false)} aria-label="Fechar filtros" /><aside className="filter-drawer"><div className="drawer-head"><strong>Filtros</strong><button onClick={() => setDrawerOpen(false)} aria-label="Fechar filtros">×</button></div>{filters}<button className="button button-lime button-full" onClick={() => setDrawerOpen(false)}>Ver {filtered.length} produtos</button></aside></div>}
  </main>;
}
