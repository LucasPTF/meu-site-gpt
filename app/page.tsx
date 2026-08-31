import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "./components/product-card";
import { activeProducts, brl, featuredProducts, getProduct } from "./lib/products";

export const metadata = {
  title: "Nordly — tecnologia que vale o preço",
  description: "Mouses, áudio, controles, teclados, hardware e acessórios de marcas reconhecidas, escolhidos com critérios claros.",
};

const hero = getProduct("gamesir-kaleid")!;
const categories = [
  { label: "Fones", href: "/catalogo?type=headset", copy: "Som e comunicação sem complicação", image: "/products/hyperx-cloud-stinger-2-core.webp" },
  { label: "Microfones", href: "/catalogo?type=microfone", copy: "Voz limpa para criar e trabalhar", image: "/products/fifine-am8.webp" },
  { label: "Mouses", href: "/catalogo?category=mouses", copy: "Precisão para jogar e criar", image: "/products/hyperx-haste-2.webp" },
  { label: "Teclados", href: "/catalogo?category=teclados", copy: "ABNT2, mecânicos e hot-swap", image: "/products/redragon-kumara.webp" },
  { label: "Controles", href: "/catalogo?category=controles", copy: "Hall Effect para Xbox e PC", image: "/products/gamesir-g7-se.webp" },
  { label: "Hardware", href: "/catalogo?category=hardware", copy: "RAM, NVMe e upgrades verificáveis", image: "/products/orico-m2pv-c3.webp" },
  { label: "Notebook", href: "/catalogo?category=notebook", copy: "Mais portas e ergonomia", image: "/products/ugreen-revodok.webp" },
  { label: "Setup", href: "/catalogo?category=setup", copy: "Iluminação, cabos e organização", image: "/products/baseus-iwok2.webp" },
];

const purposes = [
  { label: "Gaming", href: "/catalogo?use=gaming", copy: "Controle, mouse, teclado e áudio para jogar." },
  { label: "Streaming", href: "/catalogo?use=streaming", copy: "Microfones e mixer para voz e conteúdo." },
  { label: "Home office", href: "/catalogo?use=home-office", copy: "Ergonomia, conexão e produtividade." },
  { label: "Upgrade de PC", href: "/catalogo?use=upgrade-pc", copy: "Memória, NVMe e acessórios para evoluir." },
];

const comboDefinitions = [
  { title: "Teclado + mouse", copy: "ABNT2 e precisão para um setup equilibrado.", ids: ["redragon-kumara-k552", "logitech-g203"] },
  { title: "Controle + suporte", copy: "Jogue no Xbox e mantenha a mesa organizada.", ids: ["gamesir-g7-se", "ugreen-stand"] },
  { title: "Notebook + hub", copy: "Mais ergonomia e conexões para trabalhar.", ids: ["ugreen-stand", "ugreen-revodok-105"] },
];

export default function Home() {
  return <main>
    <section className="commerce-hero">
      <div className="container commerce-hero-grid">
        <div className="commerce-hero-copy">
          <span className="eyebrow">DESTAQUE DA SEMANA</span>
          <p className="hero-brand">{hero.brand}</p>
          <h1>Tecnologia que vale cada real.</h1>
          <p>{hero.name}: {hero.benefit}</p>
          <ul>{hero.features.slice(0, 3).map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
          <div className="hero-buy"><div><small>à vista no Pix</small><strong>{brl(hero.pixPrice)}</strong><span>ou {brl(hero.price)} em até 6×</span></div><Link className="button button-lime" href={`/produto/${hero.slug}`}>Comprar agora <span>→</span></Link></div>
          <Link className="hero-secondary-link" href="/catalogo?sort=featured">Ver mais vendidos →</Link>
        </div>
        <Link className="commerce-hero-art" href={`/produto/${hero.slug}`} aria-label={`Ver ${hero.name}`}><span>{hero.badge}</span><Image src={hero.image} alt={hero.media[0].alt} width={820} height={760} priority sizes="(max-width: 760px) 100vw, 50vw" /></Link>
      </div>
    </section>

    <section className="trust-strip"><div className="container"><span>✓ Modelos verificáveis</span><span>◇ Pix e cartão quando o pagamento for liberado</span><span>⌁ Prazo visível por produto</span><span>↻ Trocas conforme a legislação</span></div></section>

    <section className="section container">
      <div className="section-heading"><div><span className="eyebrow">COMPRE POR CATEGORIA</span><h2>Encontre seu próximo upgrade</h2></div><Link href="/catalogo">Ver catálogo completo →</Link></div>
      <div className="visual-category-grid">{categories.map((category) => <Link href={category.href} className="visual-category" key={category.label}><Image src={category.image} alt="" width={520} height={360} loading="lazy" sizes="(max-width: 760px) 100vw, 33vw" /><span><strong>{category.label}</strong><small>{category.copy}</small></span><b>↗</b></Link>)}</div>
    </section>

    <section className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">MAIS DESEJADOS</span><h2>Escolhas que entregam mais pelo preço</h2></div><Link href="/catalogo?sort=featured">Ver todos →</Link></div><ProductGrid items={featuredProducts.slice(0, 8)} /></div></section>

    <section className="section container"><div className="section-heading"><div><span className="eyebrow">ACHADOS</span><h2>Produtos até R$ 100</h2></div><Link href="/catalogo?price=ate-100">Explorar faixa →</Link></div><ProductGrid items={activeProducts.filter((product) => product.tags.includes("ate-100"))} /></section>

    <section className="deal-banner container">
      <div><span className="eyebrow eyebrow-light">SETUP SEM EXCESSO</span><h2>Do teclado ao áudio.<br />Tudo conversa com o seu uso.</h2><p>Filtre por plataforma, tipo, conexão, marca ou preço.</p><Link className="button button-light" href="/catalogo?use=gaming">Montar meu setup →</Link></div>
      <div className="deal-products"><Image src="/products/redragon-fizz.webp" alt="Teclado Redragon Fizz" width={520} height={380} loading="lazy" /><Image src="/products/logitech-g203.webp" alt="Mouse Logitech G203" width={360} height={320} loading="lazy" /></div>
    </section>

    <section className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">ATÉ R$ 300</span><h2>Upgrade acessível, escolha objetiva</h2></div><Link href="/catalogo?precoMax=300">Ver tudo até R$ 300 →</Link></div><ProductGrid items={activeProducts.filter((product) => product.pixPrice <= 300).slice(0, 8)} /></div></section>

    <section className="section container"><div className="section-heading"><div><span className="eyebrow">UPGRADE ATÉ R$ 500</span><h2>Mais recursos sem pular de orçamento</h2></div><Link href="/catalogo?precoMax=500">Explorar até R$ 500 →</Link></div><ProductGrid items={activeProducts.filter((product) => product.pixPrice > 300 && product.pixPrice <= 500)} /></section>

    <section className="section purpose-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">COMPRE PELO SEU USO</span><h2>O que você quer melhorar hoje?</h2></div></div><div className="purpose-grid">{purposes.map((purpose) => <Link key={purpose.label} href={purpose.href}><strong>{purpose.label}</strong><p>{purpose.copy}</p><span>Ver produtos →</span></Link>)}</div></div></section>

    <section className="section container"><div className="section-heading"><div><span className="eyebrow">COMBOS INTELIGENTES</span><h2>Produtos que fazem sentido juntos</h2><p>Combinações montadas por uso e compatibilidade, sem desconto inventado.</p></div></div><div className="combo-grid">{comboDefinitions.map((combo) => {
      const items = combo.ids.map((id) => activeProducts.find((product) => product.id === id)!).filter(Boolean);
      return <article key={combo.title}><div className="combo-images">{items.map((item) => <Image key={item.id} src={item.image} alt={item.media[0].alt} width={280} height={240} loading="lazy" />)}</div><h3>{combo.title}</h3><p>{combo.copy}</p><strong>{brl(items.reduce((sum, item) => sum + item.pixPrice, 0))} no Pix</strong><Link href={`/catalogo?use=${items[0].tags.find((tag) => ["gaming", "home-office", "streaming"].includes(tag)) ?? "gaming"}`}>Ver combinação →</Link></article>;
    })}</div></section>

    <section className="service-grid container"><article><span>01</span><h3>Ficha sem mistério</h3><p>Modelo, conexão e compatibilidade aparecem antes da compra.</p></article><article><span>02</span><h3>Sem produto fantasma</h3><p>A vitrine só publica itens identificáveis e com mídia rastreada.</p></article><article><span>03</span><h3>Ajuda para decidir</h3><p>Use filtros combinados ou busque do jeito que você fala.</p></article></section>

    <section className="newsletter"><div className="container"><div><span className="eyebrow eyebrow-light">RADAR NORDLY</span><h2>Preço bom, sem ruído.</h2><p>Novidades serão liberadas quando o canal de e-mail estiver conectado.</p></div><Link className="button button-lime" href="/catalogo">Continuar explorando</Link></div></section>
  </main>;
}
