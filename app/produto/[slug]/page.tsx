import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductActions } from "./product-actions";
import { ProductGrid } from "../../components/product-card";
import { brl, getProduct, products } from "../../lib/products";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  const fallback = related.length >= 3 ? related : products.filter((item) => item.id !== product.id).slice(0, 4);
  return <main className="container product-page">
    <div className="breadcrumbs"><Link href="/">Início</Link> / <Link href={`/catalogo?categoria=${product.category}`}>{product.category}</Link> / {product.shortName}</div>
    <section className="product-detail">
      <div className="product-gallery" style={{ background: product.accent }}>{product.badge && <span className="badge">{product.badge}</span>}{product.image ? <Image src={product.image} alt={product.name} width={780} height={780} priority /> : <div className="product-placeholder"><span>{product.brand}</span><strong>{product.shortName}</strong><i>imagem ilustrativa</i></div>}</div>
      <div className="product-info"><p className="product-brand">{product.brand} · {product.category} · {product.role}</p><h1>{product.name}</h1><p className="product-lead">{product.benefit}</p><div className="review-callout">☆ Ainda sem avaliações internas. Publicaremos apenas opiniões de compras verificadas.</div><div className="price-panel"><strong>{brl(product.pixPrice)}</strong><span>no Pix</span><p>ou {brl(product.price)} em até 6× sem juros no sandbox</p></div><ProductActions productId={product.id} /><div className="delivery-note"><span>⌁ <b>Origem:</b> fornecedor em qualificação; confirmar antes da venda</span><span>◷ <b>Prazo estimado:</b> {product.sla}, exibido por origem</span><span>↻ <b>Pós-venda:</b> 7 dias de arrependimento + garantia legal aplicável</span><span>◇ <b>Compliance:</b> {product.compliance} — produto com fio/passivo</span></div></div>
    </section>
    <div className="product-meta-grid"><div className="meta-card"><span>Score final</span><strong>{product.score.toFixed(1)} / 10</strong></div><div className="meta-card"><span>Margem pré-CAC</span><strong>{product.margin.toFixed(1)}%</strong></div><div className="meta-card"><span>CAC máximo</span><strong>{brl(product.preCac)}</strong></div><div className="meta-card"><span>Faixa de mercado</span><strong>{product.marketRange}</strong></div></div>
    <section className="product-tabs"><div className="info-panel"><h2>Por que entrou</h2><p>{product.description}</p><ul>{product.features.map((feature)=><li key={feature}>✓ {feature}</li>)}</ul></div><div className="info-panel"><h2>Conta e fornecimento</h2><ul><li>Custo operacional estimado: <b>{brl(product.operatingCost)}</b></li><li>Margem pré-CAC estimada: <b>{brl(product.preCac)}</b></li><li>Fornecedor principal: <b>{product.supplier}</b></li><li>Backup: <b>{product.backup}</b></li><li>Supplier score: <b>{product.supplierScore.toFixed(1)} / 10</b></li></ul><div className="source-box"><strong>Integridade dos dados</strong>Preço de venda, custo e margem são <b>ESTIMATIVAS</b> da pesquisa de 30/08/2026. Estoque, frete final e fornecedor precisam de checagem em tempo real antes da autorização.{product.sourceUrl && <> <a href={product.sourceUrl} target="_blank" rel="noreferrer">{product.sourceLabel}</a>.</>}</div></div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">COMBINA COM</span><h2>Complete sem perder a conta</h2></div></div><ProductGrid items={fallback} /></section>
  </main>;
}
