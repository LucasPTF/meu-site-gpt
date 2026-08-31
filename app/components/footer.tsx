import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo logo-footer"><span className="logo-mark">N</span><span>NORDLY</span></div>
          <p>Curadoria brasileira de tecnologia global. Produtos comparados por valor real, margem saudável e risco operacional.</p>
          <span className="data-chip">Pesquisa atualizada em 30 ago 2026</span>
        </div>
        <div><h3>Comprar</h3><Link href="/catalogo">Catálogo</Link><Link href="/catalogo?papel=HERO">Destaques</Link><Link href="/carrinho">Carrinho</Link><Link href="/rastrear">Rastrear pedido</Link></div>
        <div><h3>Transparência</h3><Link href="/pesquisa">Pesquisa e fontes</Link><Link href="/politicas#envio">Envio</Link><Link href="/politicas#trocas">Trocas e reembolso</Link><Link href="/politicas#privacidade">Privacidade</Link></div>
        <div><h3>Operação</h3><Link href="/admin">Painel sandbox</Link><Link href="/conta">Minha conta</Link><a href="mailto:atendimento@nordly.example">Atendimento</a><small>Canal demonstrativo — domínio a definir.</small></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Nordly — projeto em validação comercial.</span><span>Preços e SLAs são estimativas, não ofertas vinculantes.</span></div>
    </footer>
  );
}

