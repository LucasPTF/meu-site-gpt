"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { getCartProducts, useStore } from "../components/store-provider";
import { brl, products } from "../lib/products";

export default function CheckoutPage(){
  const { cart, clearCart } = useStore();
  const lines=getCartProducts(cart,products);
  const [payment,setPayment]=useState("pix");
  const [status,setStatus]=useState<{type:string;message:string;order?:string}|null>(null);
  const total=lines.reduce((sum,line)=>sum+(payment==="pix"?line.product.pixPrice:line.product.price)*line.quantity,0);
  const submit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(!lines.length){setStatus({type:"error",message:"Seu carrinho está vazio."});return}
    setStatus({type:"",message:"Criando pedido de teste e validando as regras..."});
    const form=new FormData(event.currentTarget);
    const idempotencyKey=crypto.randomUUID();
    try{
      const response=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json","Idempotency-Key":idempotencyKey},body:JSON.stringify({customer:{name:form.get("name"),email:form.get("email"),cep:form.get("cep"),address:form.get("address"),city:form.get("city"),state:form.get("state")},paymentMethod:payment,items:lines.map(line=>({productId:line.product.id,quantity:line.quantity,unitPrice:payment==="pix"?line.product.pixPrice:line.product.price})),total})});
      const data=await response.json() as {orderId?:string;error?:string;mode?:string};
      if(!response.ok) throw new Error(data.error||"Não foi possível criar o pedido sandbox.");
      setStatus({type:"success",message:`Pedido ${data.orderId} criado em SANDBOX. Nenhuma cobrança ou compra no fornecedor foi realizada.`,order:data.orderId});
      clearCart();
    }catch(error){setStatus({type:"error",message:error instanceof Error?error.message:"Erro inesperado"})}
  };
  return <main className="container checkout-page"><div className="breadcrumbs"><Link href="/">Início</Link> / <Link href="/carrinho">Carrinho</Link> / Checkout</div><span className="eyebrow">CHECKOUT SEGURO · SANDBOX</span><h1>Finalizar pedido de teste</h1><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><section className="form-section"><h2>1. Identificação e entrega</h2><div className="form-grid"><div className="field field-full"><label htmlFor="name">Nome completo</label><input required id="name" name="name" autoComplete="name" /></div><div className="field field-full"><label htmlFor="email">E-mail</label><input required type="email" id="email" name="email" autoComplete="email" /></div><div className="field"><label htmlFor="cep">CEP</label><input required id="cep" name="cep" inputMode="numeric" placeholder="00000-000" /></div><div className="field"><label htmlFor="state">Estado</label><select required id="state" name="state" defaultValue="SP"><option>SP</option><option>RJ</option><option>MG</option><option>PR</option><option>SC</option><option>RS</option><option>BA</option><option>PE</option><option>GO</option><option>DF</option></select></div><div className="field field-full"><label htmlFor="address">Endereço e número</label><input required id="address" name="address" autoComplete="street-address" /></div><div className="field field-full"><label htmlFor="city">Cidade</label><input required id="city" name="city" /></div></div></section><section className="form-section"><h2>2. Pagamento demonstrativo</h2><div className="payment-options"><label className="payment-option" htmlFor="payment-pix"><input id="payment-pix" aria-label="Pix sandbox" type="radio" name="payment" checked={payment==="pix"} onChange={()=>setPayment("pix")}/><span><b>Pix sandbox</b><br/><small>5% de desconto simulado</small></span></label><label className="payment-option" htmlFor="payment-card"><input id="payment-card" aria-label="Cartão sandbox" type="radio" name="payment" checked={payment==="card"} onChange={()=>setPayment("card")}/><span><b>Cartão sandbox</b><br/><small>Até 6×, sem dados reais</small></span></label></div></section>{status&&<div className={`checkout-status ${status.type}`}>{status.message}{status.order&&<> <Link href={`/rastrear?pedido=${status.order}`}>Acompanhar pedido →</Link></>}</div>}<button className="button button-lime button-full" type="submit" disabled={!lines.length}>Criar pedido sandbox</button></form><aside className="summary-card"><h2>Resumo do pedido</h2>{lines.map(line=><div className="summary-line" key={line.product.id}><span>{line.quantity}× {line.product.shortName}</span><strong>{brl((payment==="pix"?line.product.pixPrice:line.product.price)*line.quantity)}</strong></div>)}<div className="summary-line summary-total"><span>Total</span><strong>{brl(total)}</strong></div><div className="summary-note"><b>Proteção operacional ativa:</b> o pedido passa por endereço, estoque, preço, margem, SLA, fraude e compliance antes de qualquer autorização. Nesta versão ele termina em revisão manual.</div></aside></div></main>
}
