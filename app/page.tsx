import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "./components/product-card";
import { activeProducts, brl, featuredProducts } from "./lib/products";

export const metadata = {
  title: "Nordly — tecnologia que vale o preço",
  description: "Mouses, áudio, controles, teclados, hardware e acessórios de marcas reconhecidas, escolhidos com critérios claros.",
};

const hero = activeProducts.find((product) => product.slug === "gamesir-kaleid")!;
const categories = [
  { label: "Mouses", slug: "mouses", copy: "Precisão para jogar e criar", image: "/products/hyperx-haste-2.jpg" },
  { label: "Áudio", slug: "audio", copy: "Voz, jogo e chamadas mais limpos", image: "/products/fifine-am8.png" },
  { label: "Controles", slug: "controles", copy: "Hall Effect para Xbox e PC", image: "/products/gamesir-g7-se.png" },
  { label: "Teclados", slug: "teclados", copy: "ABNT2, mecânicos e hot-swap", image: "/products/redragon-kumara.png" },
  { label: "Notebook", slug: "notebook", copy: "Mais portas e ergonomia", image: "/products/ugreen-revodok.png" },
  { label: "Hardware", slug: "hardware", copy: "Upgrade com modelo verificável", image: "/products/orico-m2pv-c3.jpg" },
];

export default function Home() {
  return <main>
    <section className="commerce-hero">
      <div className="container commerce-hero-grid">
        <div className="commerce-hero-copy">
          <span className="eyebrow">DESTAQUE DA SEMANA</span>
          <p className="hero-brand">{hero.brand}</p>
          <h1>{hero.name}</h1>
          <p>{hero.benefit}</p>
          <ul>{hero.features.slice(0, 3).map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
          <div className="hero-buy"><div><small>à vista no Pix</small><strong>{brl(hero.pixPrice)}</strong><span>ou {brl(hero.price)} em até 6×</span></div><Link className="button button-lime" href={`/produto/${hero.slug}`}>Ver produto <span>→</span></Link></div>
        </div>
        <Link className="commerce-hero-art" href={`/produto/${hero.slug}`} aria-label={`Ver ${hero.name}`}><span>{hero.badge}</span><Image src={hero.image} alt={hero.media[0].alt} width={820} height={760} priority /></Link>
      </div>
    </section>

    <section className="trust-strip"><div className="container"><span>✓ Produtos e modelos verificáveis</span><span>↻ Compra segura e suporte humano</span><span>▱ Parcelamento em até 6×</span><span>⌁ Prazo informado antes de comprar</span></div></section>

    <section className="section container">
      <div className="section-heading"><div><span className="eyebrow">COMPRE POR CATEGORIA</span><h2>Seu próximo upgrade começa aqui</h2></div><Link href="/catalogo">Ver catálogo completo →</Link></div>
      <div className="visual-category-grid">{categories.map((category) => <Link href={`/catalogo?category=${category.slug}`} className="visual-category" key={category.slug}><Image src={category.image} alt="" width={520} height={360} /><span><strong>{category.label}</strong><small>{category.copy}</small></span><b>↗</b></Link>)}</div>
    </section>

    <section className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">MAIS DESEJADOS</span><h2>Escolhas que entregam mais pelo preço</h2><p>Modelos reais, especificação conferida e benefício fácil de entender.</p></div><Link href="/catalogo">Ver todos →</Link></div><ProductGrid items={featuredProducts.slice(0, 8)} /></div></section>

    <section className="deal-banner container">
      <div><span className="eyebrow eyebrow-light">SETUP SEM EXCESSO</span><h2>Do teclado ao áudio.<br />Tudo conversa com o seu uso.</h2><p>Filtre por plataforma, tipo de produto, característica ou faixa de preço — sem percorrer listas intermináveis.</p><Link className="button button-light" href="/catalogo?use=gaming">Montar meu setup →</Link></div>
      <div className="deal-products"><Image src="/products/redragon-fizz.png" alt="Teclado Redragon Fizz" width={520} height={380} /><Image src="/products/logitech-g203.png" alt="Mouse Logitech G203" width={360} height={320} /></div>
    </section>

    <section className="section container"><div className="section-heading"><div><span className="eyebrow">ATÉ R$ 200</span><h2>Upgrades compactos, impacto grande</h2></div><Link href="/catalogo?price=ate-200">Explorar faixa →</Link></div><ProductGrid items={activeProducts.filter((product) => product.tags.includes("ate-200")).slice(0, 4)} /></section>

    <section className="service-grid container"><article><span>01</span><h3>Ficha sem mistério</h3><p>Modelo, conexão e compatibilidade aparecem antes da compra.</p></article><article><span>02</span><h3>Sem produto fantasma</h3><p>A vitrine só publica itens identificáveis e com imagem rastreada.</p></article><article><span>03</span><h3>Ajuda para decidir</h3><p>Use filtros combinados ou busque do jeito que você fala.</p></article></section>

    <section className="newsletter"><div className="container"><div><span className="eyebrow eyebrow-light">RADAR NORDLY</span><h2>Preço bom, sem ruído.</h2><p>Receba novos produtos e quedas de preço selecionadas.</p></div><form><label className="sr-only" htmlFor="newsletter-email">Seu melhor e-mail</label><input id="newsletter-email" type="email" placeholder="seu@email.com" /><button className="button button-lime" type="button">Quero receber</button><small>Envio responsável. Cancele quando quiser.</small></form></div></section>
  </main>;
}
