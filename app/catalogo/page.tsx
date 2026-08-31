"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "../components/product-card";
import { useStore } from "../components/store-provider";
import { products } from "../lib/products";

export default function CatalogPage() {
  const params = useSearchParams();
  const { favorites } = useStore();
  const category = params.get("categoria");
  const role = params.get("papel");
  const query = (params.get("q") || "").toLocaleLowerCase("pt-BR");
  const max = Number(params.get("max") || 0);
  const onlyFavorites = params.get("favoritos") === "1";
  const filtered = products.filter((product) => {
    if (category && product.category !== category) return false;
    if (role && product.role !== role) return false;
    if (max && product.pixPrice > max) return false;
    if (onlyFavorites && !favorites.includes(product.id)) return false;
    if (query && !`${product.name} ${product.brand} ${product.category}`.toLocaleLowerCase("pt-BR").includes(query)) return false;
    return true;
  });
  const title = onlyFavorites ? "Seus favoritos" : category || (query ? `Busca por “${params.get("q")}”` : "Catálogo curado");

  return <main>
    <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Início</Link> / Catálogo</div><span className="eyebrow">15 SKUS · LANÇAMENTO CONTROLADO</span><h1>{title}</h1><p>Seleção inicial enxuta, com custo operacional estimado, margem pré-CAC e risco publicados. Produtos sem fio ficam de fora até validação de homologação.</p></div></section>
    <div className="container catalog-layout">
      <aside className="filters" aria-label="Filtros"><h2>Filtrar catálogo</h2><div className="filter-group"><strong>CATEGORIA</strong>{["Áudio","Controles","Teclados","Notebook","Hardware","Setup","Acessórios"].map((item)=><Link key={item} href={`/catalogo?categoria=${item}`}>{item}</Link>)}</div><div className="filter-group"><strong>PAPEL</strong><Link href="/catalogo?papel=HERO">Hero products</Link><Link href="/catalogo?papel=CORE">Core products</Link><Link href="/catalogo?papel=COMPLEMENTAR">Complementares</Link></div><div className="filter-group"><strong>ORÇAMENTO</strong><Link href="/catalogo?max=100">Até R$ 100</Link><Link href="/catalogo?max=300">Até R$ 300</Link><Link href="/catalogo?max=500">Até R$ 500</Link></div><div className="filter-group"><Link href="/catalogo">Limpar filtros</Link></div></aside>
      <section className="catalog-products"><div className="catalog-toolbar"><p>{filtered.length} produto{filtered.length === 1 ? "" : "s"} encontrado{filtered.length === 1 ? "" : "s"}</p><select aria-label="Ordenar produtos" defaultValue="score"><option value="score">Maior score</option><option value="price-asc">Menor preço</option><option value="margin">Maior margem</option></select></div>{filtered.length ? <ProductGrid items={filtered} /> : <div className="empty-state"><h2>Nada por aqui ainda.</h2><p>Limpe os filtros ou favorite alguns produtos para montar sua lista.</p><Link className="button button-dark" href="/catalogo">Ver catálogo completo</Link></div>}</section>
    </div>
  </main>;
}

