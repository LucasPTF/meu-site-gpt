import Link from "next/link";

export function Footer() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div><div className="logo logo-footer"><span className="logo-mark">N</span><span>NORDLY</span></div><p>Tecnologia de marcas reconhecidas, organizada para você comparar menos e escolher melhor.</p><span className="data-chip">Catálogo com modelos e fontes rastreáveis</span></div>
    <div><h3>Comprar</h3><Link href="/catalogo">Catálogo</Link><Link href="/catalogo?feature=hall-effect">Hall Effect</Link><Link href="/catalogo?price=ate-200">Até R$ 200</Link><Link href="/carrinho">Carrinho</Link></div>
    <div><h3>Ajuda</h3><Link href="/rastrear">Rastrear pedido</Link><Link href="/politicas#envio">Envio</Link><Link href="/politicas#trocas">Trocas e reembolso</Link><Link href="/conta">Minha conta</Link></div>
    <div><h3>Nordly</h3><Link href="/pesquisa">Como escolhemos</Link><Link href="/politicas#privacidade">Privacidade</Link><small>Atendimento e canais oficiais serão publicados antes do início das vendas.</small></div>
  </div><div className="container footer-bottom"><span>© 2026 Nordly.</span><span>Disponibilidade, frete e prazo são confirmados no checkout.</span></div></footer>;
}
