# Nordly — ecommerce tech com curadoria internacional

Base operacional de uma marca brasileira de tecnologia. A versão atual é um sandbox seguro: catálogo, carrinho, checkout, pedido, tracking, painel e banco estão estruturados, mas nenhum pagamento ou pedido de fornecedor real é executado.

## Executar

1. Instale Node.js 22.13 ou superior.
2. Rode `npm install`.
3. Rode `npm run dev` e abra o endereço local exibido.
4. Para validar produção, rode `npm run build` e `npm test`.

## Catálogo e preço

- Produtos ficam em `app/lib/products.ts`.
- Cada SKU registra preço cheio, Pix, custo operacional estimado, margem pré-CAC, CAC máximo, fornecedor, backup, SLA, risco e score.
- Para mudar uma margem, atualize custo/preço e confirme que `(preço - custo operacional) / preço` permanece dentro da regra da categoria.
- Nunca ative um SKU com custo desconhecido, fornecedor sem qualificação ou compliance pendente.
- Para pausar um SKU em produção, altere `products.status` no banco; a UI desta validação usa catálogo tipado e deverá ser migrada para leitura do banco antes da abertura pública.

## Fornecedores e automação

- A arquitetura prevista usa `SupplierAdapter` para CJ, AutoDS e outras integrações oficiais.
- O primeiro adapter real recomendado é CJ v2 em sandbox, porque a documentação pública cobre produto, estoque, frete, pedido, tracking e simulação.
- Configure segredos apenas no ambiente hospedado. Nunca coloque token no navegador.
- A compra automática só pode ser habilitada depois de testes de estoque, variante, preço, margem, SLA, tracking, endereço, fraude, idempotência e fallback manual.
- Para substituir fornecedor, mantenha o SKU interno e altere o `supplier_product` principal; preserve o anterior no histórico e no log de auditoria.

## Gateway

- O checkout atual cria apenas pedidos sandbox no D1 e termina em `manual_review`.
- Para Mercado Pago, adicione credenciais de teste no ambiente hospedado, crie o pagamento no servidor e valide assinatura de webhook.
- Persista `provider_payment_id`, `external_event_id` e chave de idempotência antes de qualquer transição de status.
- Só habilite produção após testes de Pix, cartão aprovado/recusado, webhook duplicado, cancelamento, reembolso e chargeback.

## Operação diária

- O painel sandbox fica em `/admin`.
- A revisão manual deve mostrar preço/custo atuais, margem, estoque, SLA, compliance, endereço e risco de fraude.
- Tracking fica em `/rastrear`; eventos reais devem vir do adapter e ser guardados em `tracking_events`.
- Kill rules: pausar SKU por margem abaixo do mínimo, estoque instável, fornecedor indisponível, devolução/reclamação alta, SLA ruim, tracking falho ou compliance vencido.

## Banco e ambientes

- O schema D1 está em `db/schema.ts`; migrations ficam em `drizzle/`.
- Separe development, staging e production. Staging usa gateway e fornecedor em sandbox.
- Configure backups/exports periódicos, retenção, restauração testada e logs sem dados pessoais desnecessários.
- Antes do lançamento, substitua o domínio de exemplo, canais de contato, razão social/CNPJ e textos jurídicos revisados.

## Pesquisa

O relatório navegável está em `/pesquisa`. Fontes, data, concorrentes, descartes e integridade dos dados também estão documentados ali.

