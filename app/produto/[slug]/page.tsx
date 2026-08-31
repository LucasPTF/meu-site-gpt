import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "../../components/product-card";
import { brl, getProduct, getRelatedProducts } from "../../lib/products";
import { ProductActions } from "./product-actions";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product, 4);
  return <main className="container product-page">
    <div className="breadcrumbs"><Link href="/">Início</Link> / <Link href={`/catalogo?category=${product.categorySlug}`}>{product.category}</Link> / {product.model}</div>
    <section className="product-detail">
      <div className="product-gallery" style={{ background: product.accent }}>
        {product.badge && <span className="badge">{product.badge}</span>}
        <Image src={product.image} alt={product.media[0].alt} width={900} height={900} priority />
        <small>Imagem do produto · fonte: {product.media[0].sourceLabel}</small>
      </div>
      <div className="product-info">
        <p className="product-brand">{product.brand} · {product.productType}</p><h1>{product.name}</h1><p className="product-lead">{product.benefit}</p>
        <div className="buy-reassurance"><span>✓ Modelo conferido</span><span>✓ Compatibilidade descrita</span><span>✓ Compra protegida</span></div>
        <div className="price-panel"><small>à vista no Pix</small><strong>{brl(product.pixPrice)}</strong><p>ou {brl(product.price)} em até 6×</p></div>
        <ProductActions productId={product.id} />
        <div className="delivery-note"><span>⌁ <b>Envio:</b> prazo estimado de {product.sla}</span><span>↻ <b>Devolução:</b> até 7 dias após o recebimento, conforme a legislação aplicável</span><span>◇ <b>Garantia:</b> {product.warranty}</span></div>
      </div>
    </section>

    <section className="buyer-highlights"><div><span>O QUE RESOLVE</span><strong>{product.benefit}</strong></div>{product.features.slice(0, 3).map((feature) => <div key={feature}><span>DESTAQUE</span><strong>{feature}</strong></div>)}</section>

    <section className="product-content-grid">
      <article><span className="eyebrow">VISÃO GERAL</span><h2>Feito para funcionar no seu setup</h2><p>{product.description}</p><ul className="check-list">{product.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul></article>
      <article className="spec-table"><h2>Especificações</h2>{product.specifications.map((spec) => <div key={spec.label}><span>{spec.label}</span><strong>{spec.value}</strong></div>)}<div><span>Modelo</span><strong>{product.model}</strong></div></article>
      <article className="compat-card"><h2>Compatibilidade</h2><div>{product.compatibility.map((item) => <span key={item}>{item}</span>)}</div><h3>Na caixa</h3><ul>{product.contents.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article className="source-card"><h2>Informação rastreável</h2><p>Nome, modelo, especificações e imagem foram vinculados à página do fabricante.</p><a href={product.media[0].sourceUrl} target="_blank" rel="noreferrer">Consultar fonte oficial ↗</a></article>
    </section>

    <section className="section related-section"><div className="section-heading"><div><span className="eyebrow">COMBINA COM</span><h2>Complete o seu setup</h2></div><Link href={`/catalogo?category=${product.categorySlug}`}>Ver categoria →</Link></div><ProductGrid items={related} /></section>
  </main>;
}
