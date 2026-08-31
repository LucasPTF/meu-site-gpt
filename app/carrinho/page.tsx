"use client";
import Link from "next/link";
import Image from "next/image";
import { getCartProducts, useStore } from "../components/store-provider";
import { brl, products } from "../lib/products";

export default function CartPage(){
  const { cart, updateQuantity, removeFromCart } = useStore();
  const lines = getCartProducts(cart, products);
  const subtotal = lines.reduce((sum,line)=>sum + line.product.price * line.quantity,0);
  const pixTotal = lines.reduce((sum,line)=>sum + line.product.pixPrice * line.quantity,0);
  if(!lines.length) return <main className="container cart-page"><div className="empty-state"><span className="eyebrow">SEU CARRINHO</span><h2>Ainda está vazio.</h2><p>Comece pelos cinco produtos com melhor score da pesquisa.</p><Link className="button button-lime" href="/catalogo?papel=HERO">Ver destaques</Link></div></main>;
  return <main className="container cart-page"><div className="breadcrumbs"><Link href="/">Início</Link> / Carrinho</div><h1>Seu carrinho</h1><div className="cart-layout"><div className="cart-lines">{lines.map(({product,quantity})=><article className="cart-line" key={product.id}><div className="cart-thumb" style={{background:product.accent}}>{product.image?<Image src={product.image} alt="" width={180} height={180}/>:<div className="product-placeholder"><strong>{product.shortName}</strong></div>}</div><div><p>{product.brand} · {product.category}</p><h3>{product.name}</h3><div className="qty-controls"><button onClick={()=>updateQuantity(product.id,quantity-1)} aria-label="Diminuir quantidade">−</button><span>{quantity}</span><button onClick={()=>updateQuantity(product.id,quantity+1)} aria-label="Aumentar quantidade">+</button></div><button className="remove-link" onClick={()=>removeFromCart(product.id)}>Remover</button></div><strong>{brl(product.price*quantity)}</strong></article>)}</div><aside className="summary-card"><h2>Resumo</h2><div className="summary-line"><span>Subtotal</span><strong>{brl(subtotal)}</strong></div><div className="summary-line"><span>Desconto Pix</span><strong>− {brl(subtotal-pixTotal)}</strong></div><div className="summary-line summary-total"><span>Total no Pix</span><strong>{brl(pixTotal)}</strong></div><div className="summary-note">Frete e prazo dependem do CEP, estoque e origem confirmados. No sandbox, o cálculo é demonstrativo.</div><Link className="button button-lime button-full" href="/checkout">Ir para o checkout</Link><Link className="button button-outline button-full" style={{marginTop:10}} href="/catalogo">Continuar comprando</Link></aside></div></main>
}
