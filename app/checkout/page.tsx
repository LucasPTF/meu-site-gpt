"use client";
import Link from "../components/static-link";
import { getCartProducts, useStore } from "../components/store-provider";
import { brl, products } from "../lib/products";

export default function CheckoutPage() {
  const { cart } = useStore();
  const lines = getCartProducts(cart, products);
  const total = lines.reduce((sum, line) => sum + line.product.pixPrice * line.quantity, 0);
  return <main className="container checkout-page"><div className="breadcrumbs"><Link href="/">Início</Link> / <Link href="/carrinho">Carrinho</Link> / Checkout</div><span className="eyebrow">CHECKOUT NORDLY</span><h1>Finalize sua compra</h1><div className="checkout-layout">
    <section className="checkout-form"><div className="form-section checkout-unavailable"><span>⌁</span><h2>Pagamentos temporariamente indisponíveis</h2><p>A vitrine e o carrinho já estão funcionando. O pagamento será liberado quando a conta comercial, o provedor de pagamentos e os dados fiscais da loja estiverem ativos.</p><p>Nenhum dado pessoal ou de cartão será coletado até lá.</p><Link className="button button-dark" href="/catalogo">Continuar comprando</Link></div></section>
    <aside className="summary-card"><h2>Resumo do pedido</h2>{lines.length ? lines.map((line) => <div className="summary-line" key={line.product.id}><span>{line.quantity}× {line.product.shortName}</span><strong>{brl(line.product.pixPrice * line.quantity)}</strong></div>) : <p className="summary-note">Seu carrinho está vazio.</p>}<div className="summary-line summary-total"><span>Total no Pix</span><strong>{brl(total)}</strong></div><div className="summary-note">Frete, disponibilidade e prazo final serão confirmados antes do pagamento.</div></aside>
  </div></main>;
}
