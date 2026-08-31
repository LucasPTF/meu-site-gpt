import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "../../components/product-card";
import { brl, getProduct, getRelatedProducts } from "../../lib/products";
import { BundleButton, ProductActions } from "./product-actions";
import { ProductGallery } from "./product-gallery";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product, 4);
  const bundle = related.slice(0, 2);

  return <main className="container product-page">
    <div className="breadcrumbs"><Link href="/">Início</Link> / <Link href={`/catalogo?category=${product.categorySlug}`}>{product.category}</Link> / {product.model}</div>
    <section className="product-detail">
      <div className="gallery-column">{product.badge && <span className="badge gallery-badge">{product.badge}</span>}<ProductGallery media={product.media} accent={product.accent} /></div>
      <div className="product-info">
        <p className="product-brand">{product.brand} · {product.productType}</p>
        <h1>{product.name}</h1>
        <p className="product-lead">{product.benefit}</p>
        <p className="review-empty">Novo na Nordly · ainda sem avaliações de compras verificadas</p>
        <div className="buy-reassurance"><span>✓ Modelo conferido</span><span>✓ Compatibilidade descrita</span><span>✓ Preço sem desconto fictício</span></div>
        <div className="price-panel"><small>à vista no Pix</small><strong>{brl(product.pixPrice)}</strong><p>ou {brl(product.price)} em até 6×</p></div>
        <label className="variant-field">Modelo / versão<select aria-label="Modelo ou versão" defaultValue={product.model}><option>{product.model}</option></select></label>
        <ProductActions productId={product.id} />
        <div className="delivery-note"><span>⌁ <b>Envio:</b> estimativa de {product.sla}; disponibilidade confirmada antes do pagamento</span><span>↻ <b>Trocas:</b> até 7 dias após o recebimento, conforme a legislação aplicável</span><span>◇ <b>Garantia:</b> {product.warranty}</span></div>
      </div>
    </section>

    <section className="buyer-highlights"><div><span>POR QUE VALE A PENA</span><strong>{product.benefit}</strong></div>{product.features.slice(0, 3).map((feature) => <div key={feature}><span>DESTAQUE</span><strong>{feature}</strong></div>)}</section>

    <section className="product-content-grid">
      <article><span className="eyebrow">PRINCIPAIS BENEFÍCIOS</span><h2>Feito para funcionar no seu setup</h2><p>{product.description}</p><ul className="check-list">{product.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul></article>
      <article className="spec-table"><h2>Especificações</h2>{product.specifications.map((spec) => <div key={spec.label}><span>{spec.label}</span><strong>{spec.value}</strong></div>)}<div><span>Modelo</span><strong>{product.model}</strong></div></article>
      <article className="compat-card"><h2>Compatibilidade</h2><div>{product.compatibility.map((item) => <span key={item}>{item}</span>)}</div><h3>Conteúdo da embalagem</h3><ul>{product.contents.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article className="source-card"><h2>Informação rastreável</h2><p>Nome, modelo, especificações e imagens foram vinculados à página oficial do fabricante.</p><a href={product.media[0].sourceUrl} target="_blank" rel="noreferrer">Consultar fonte oficial ↗</a></article>
    </section>

    <section className="section shipping-section"><div className="section-heading"><div><span className="eyebrow">COMPRA INFORMADA</span><h2>Prazo, garantia e trocas</h2></div></div><div className="service-grid product-services"><article><h3>Prazo e envio</h3><p>{product.sla}. O prazo final e a disponibilidade aparecem antes de qualquer cobrança.</p></article><article><h3>Garantia</h3><p>{product.warranty}</p></article><article><h3>Trocas</h3><p>Solicitações seguem o Código de Defesa do Consumidor e as condições publicadas em Políticas.</p><Link href="/politicas">Ler políticas →</Link></article></div></section>

    <section className="section faq-section"><div className="section-heading"><div><span className="eyebrow">DÚVIDAS FREQUENTES</span><h2>Antes de escolher</h2></div></div><div className="faq-list">
      <details><summary>Este é exatamente o modelo anunciado?</summary><p>Sim. A página informa marca e modelo e mantém a fonte oficial associada ao cadastro.</p></details>
      <details><summary>Como confirmo a compatibilidade?</summary><p>Confira a seção de compatibilidade e as especificações. Em caso de dúvida, não finalize até a confirmação do suporte.</p></details>
      <details><summary>Quando o pedido será enviado?</summary><p>A estimativa atual é de {product.sla}; estoque, frete e prazo final serão confirmados antes do pagamento.</p></details>
    </div></section>

    <section className="section bundle-section"><div className="section-heading"><div><span className="eyebrow">COMPRE JUNTO</span><h2>Uma combinação coerente com este produto</h2></div></div><ProductGrid items={bundle} /><div className="bundle-action"><strong>{brl([product, ...bundle].reduce((sum, item) => sum + item.pixPrice, 0))} no Pix, sem desconto inventado</strong><BundleButton productIds={[product.id, ...bundle.map((item) => item.id)]} /></div></section>

    <section className="section review-section"><div className="section-heading"><div><span className="eyebrow">AVALIAÇÕES</span><h2>Opiniões de quem comprou</h2></div></div><div className="empty-state"><h3>Ainda não há avaliações publicadas.</h3><p>Quando existirem compras verificadas, as avaliações aprovadas aparecerão aqui.</p></div></section>

    <section className="section related-section"><div className="section-heading"><div><span className="eyebrow">RELACIONADOS POR TAG</span><h2>Continue explorando</h2></div><Link href={`/catalogo?category=${product.categorySlug}`}>Ver categoria →</Link></div><ProductGrid items={related} /></section>
  </main>;
}
