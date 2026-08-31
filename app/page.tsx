import Link from "next/link";
import Image from "next/image";
import { ProductGrid } from "./components/product-card";
import { complementaryProducts, coreProducts, heroProducts } from "./lib/products";

export const metadata = {
  title: "Nordly — tecnologia que vale o preço",
  description: "Curadoria brasileira de tecnologia global com preço calculado, risco analisado e transparência de envio.",
};

const categoryCards = [
  { name: "Áudio", copy: "Voz limpa sem estourar o orçamento", mark: "AU", tone: "lilac" },
  { name: "Controles", copy: "Hall Effect e resposta precisa", mark: "GO", tone: "mint" },
  { name: "Teclados", copy: "Compactos, hot-swap e ABNT2", mark: "KB", tone: "rose" },
  { name: "Notebook", copy: "Mais portas, altura e produtividade", mark: "NB", tone: "blue" },
  { name: "Setup", copy: "Organização que muda a mesa", mark: "ST", tone: "sand" },
  { name: "Hardware", copy: "Upgrade simples e reaproveitamento", mark: "HW", tone: "slate" },
];

export default function Home() {
  return (
    <main>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow"><i /> Curadoria tech, sem chute</span>
          <h1>Seu próximo upgrade tem que <em>valer o preço.</em></h1>
          <p>A gente compara especificação, preço no Brasil, custo total e risco de entrega antes de colocar um produto aqui.</p>
          <div className="hero-actions"><Link className="button button-lime" href="/catalogo">Explorar a curadoria <span>→</span></Link><Link className="text-link" href="/pesquisa">Ver os critérios de seleção</Link></div>
          <div className="hero-proof"><span><b>15</b> SKUs iniciais</span><span><b>30%+</b> meta pré-CAC</span><span><b>0</b> reviews inventados</span></div>
        </div>
        <div className="hero-stage">
          <div className="stage-orbit stage-orbit-one" />
          <div className="stage-orbit stage-orbit-two" />
          <div className="stage-card stage-main"><span>HERO PICK 01</span><Image src="/products/gamesir-g7-se.png" alt="Controle GameSir G7 SE" width={560} height={560} priority /><b>GameSir G7 SE</b><small>Hall Effect · Xbox + PC</small></div>
          <div className="stage-card stage-small stage-top"><Image src="/products/fifine-am8.png" alt="Microfone FIFINE AM8" width={260} height={260} /><span>Voz limpa.<br />Do USB ao XLR.</span></div>
          <div className="stage-card stage-small stage-bottom"><Image src="/products/ugreen-revodok.png" alt="Hub UGREEN Revodok" width={260} height={260} /><span>5 portas.<br />58 gramas.</span></div>
          <div className="stage-score"><span>SCORE</span><strong>8.8</strong><small>/ 10</small></div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container"><span>✓ Preço calculado por margem</span><span>⌁ Prazo mostrado por origem</span><span>↻ Troca e revisão manual</span><span>◇ Produtos sem fio só com compliance</span></div>
      </section>

      <section className="section container">
        <div className="section-heading"><div><span className="eyebrow">POR ONDE COMEÇAR</span><h2>Encontre pelo seu objetivo</h2></div><Link href="/catalogo">Ver todas as categorias →</Link></div>
        <div className="category-grid">
          {categoryCards.map((category) => <Link key={category.name} className={`category-card ${category.tone}`} href={`/catalogo?categoria=${category.name}`}><span className="category-mark">{category.mark}</span><div><strong>{category.name}</strong><small>{category.copy}</small></div><b>↗</b></Link>)}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">OS 5 MAIS FORTES</span><h2>Destaques da curadoria</h2><p>Produtos com melhor combinação de demanda, margem, clareza de benefício e logística.</p></div><Link href="/catalogo?papel=HERO">Ver análise completa →</Link></div>
          <ProductGrid items={heroProducts} />
        </div>
      </section>

      <section className="section container budget-section">
        <div className="budget-copy"><span className="eyebrow">POR FAIXA DE PREÇO</span><h2>Um setup melhor, dentro do seu limite.</h2><p>Preço de prateleira não conta a história toda. A seleção considera vida útil, compatibilidade e o custo de errar.</p></div>
        <div className="budget-cards">
          <Link href="/catalogo?max=100"><span>ACHADOS</span><strong>até <b>R$ 100</b></strong><small>Organização e acessórios que resolvem.</small><i>→</i></Link>
          <Link href="/catalogo?max=300"><span>SETUP</span><strong>até <b>R$ 300</b></strong><small>Os upgrades com maior impacto percebido.</small><i>→</i></Link>
          <Link href="/catalogo?max=500"><span>PERFORMANCE</span><strong>até <b>R$ 500</b></strong><small>Áudio, controle e produtividade.</small><i>→</i></Link>
        </div>
      </section>

      <section className="feature-banner container">
        <div className="feature-art"><div className="feature-glow" /><Image src="/products/fifine-am8.png" alt="Microfone FIFINE AM8" width={700} height={700} /><span className="spec-chip spec-one">USB-C</span><span className="spec-chip spec-two">XLR</span><span className="spec-chip spec-three">Cardioide</span></div>
        <div className="feature-copy"><span className="eyebrow eyebrow-light">DESTAQUE DE ÁUDIO</span><h2>Comece no USB.<br />Evolua sem trocar o microfone.</h2><p>O AM8 resolve a entrada para streaming e continua útil quando você migrar para uma interface XLR.</p><ul><li>Conexão USB-C plug and play</li><li>Saída XLR para o próximo nível</li><li>Monitoramento sem atraso</li></ul><Link className="button button-light" href="/produto/fifine-am8">Ver análise e preço <span>→</span></Link></div>
      </section>

      <section className="section container">
        <div className="section-heading"><div><span className="eyebrow">CATÁLOGO CORE</span><h2>Escolhas seguras para começar</h2></div><Link href="/catalogo?papel=CORE">Ver produtos core →</Link></div>
        <ProductGrid items={coreProducts} />
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">COMPLETE O SETUP</span><h2>Complementos com margem saudável</h2></div><Link href="/catalogo?papel=COMPLEMENTAR">Ver complementares →</Link></div>
          <ProductGrid items={complementaryProducts} />
        </div>
      </section>

      <section className="method-section container">
        <div className="method-intro"><span className="eyebrow">NOSSO FILTRO</span><h2>Vender menos coisa.<br />Escolher melhor.</h2><p>Produto viral não basta. Se a conta, o prazo ou o pós-venda não fecham, ele fica fora.</p><Link className="text-link" href="/pesquisa">Abrir relatório de pesquisa →</Link></div>
        <ol className="method-steps"><li><b>01</b><span><strong>Demanda verificável</strong><small>Preço, oferta e sinais públicos em mais de uma fonte.</small></span></li><li><b>02</b><span><strong>Conta que fecha</strong><small>Frete, tributos, taxas, reservas e margem pré-CAC.</small></span></li><li><b>03</b><span><strong>Risco administrável</strong><small>Compliance, fornecedor, tracking, avaria e devolução.</small></span></li><li><b>04</b><span><strong>Benefício explicável</strong><small>Valor claro em uma frase, sem promessa vazia.</small></span></li></ol>
      </section>

      <section className="newsletter"><div className="container"><div><span className="eyebrow eyebrow-light">RADAR NORDLY</span><h2>Achado bom não precisa de barulho.</h2><p>Receba comparativos, quedas de preço e novos produtos aprovados.</p></div><form><label className="sr-only" htmlFor="newsletter-email">Seu melhor e-mail</label><input id="newsletter-email" type="email" placeholder="seu@email.com" /><button className="button button-lime" type="button">Quero receber</button><small>Envio responsável. Cancele quando quiser.</small></form></div></section>
    </main>
  );
}
