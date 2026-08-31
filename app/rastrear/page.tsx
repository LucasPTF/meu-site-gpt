"use client";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function TrackPage(){
  const params=useSearchParams();
  const [order,setOrder]=useState(params.get("pedido")||"");
  const [searched,setSearched]=useState(Boolean(params.get("pedido")));
  const submit=(event:FormEvent)=>{event.preventDefault();setSearched(true)};
  return <main className="container track-shell"><span className="eyebrow">ACOMPANHAMENTO TRANSPARENTE</span><h1>Rastrear pedido</h1><p>Digite o identificador recebido no checkout sandbox. Em produção, os eventos virão do fornecedor e da transportadora com histórico de auditoria.</p><form className="track-form" onSubmit={submit}><label className="sr-only" htmlFor="order">Número do pedido</label><input id="order" value={order} onChange={(event)=>setOrder(event.target.value)} placeholder="Ex.: ND-AB12CD34" required/><button className="button button-dark">Consultar</button></form>{searched&&<section><div className="source-box"><strong>{order||"Pedido demonstrativo"}</strong>Modo SANDBOX · origem simulada · nenhum pacote foi enviado.</div><ol className="timeline"><li className="done"><i/><div><strong>Pedido confirmado</strong><small>Registro de teste criado com chave de idempotência.</small></div></li><li className="done"><i/><div><strong>Validação operacional</strong><small>Endereço, margem e compliance passaram; compra real bloqueada pelo modo sandbox.</small></div></li><li><i/><div><strong>Pedido no fornecedor</strong><small>Aguardando conexão oficial e aprovação manual.</small></div></li><li><i/><div><strong>Em trânsito</strong><small>Tracking será exibido quando disponível.</small></div></li><li><i/><div><strong>Entregue</strong><small>Confirmação da transportadora.</small></div></li></ol></section>}</main>
}

