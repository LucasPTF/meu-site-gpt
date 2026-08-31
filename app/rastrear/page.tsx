"use client";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function TrackPage() {
  const params = useSearchParams();
  const [order, setOrder] = useState(params.get("pedido") || "");
  const [searched, setSearched] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSearched(true); };
  return <main className="container track-shell"><span className="eyebrow">ACOMPANHE SUA ENTREGA</span><h1>Rastrear pedido</h1><p>Digite o número recebido na confirmação da compra.</p><form className="track-form" onSubmit={submit}><label className="sr-only" htmlFor="order">Número do pedido</label><input id="order" value={order} onChange={(event) => setOrder(event.target.value)} placeholder="Ex.: ND-AB12CD34" required /><button className="button button-dark">Consultar</button></form>{searched && <div className="empty-state"><h2>Pedido não localizado.</h2><p>As vendas ainda não foram iniciadas e não há pedidos ativos para rastrear.</p></div>}</main>;
}
