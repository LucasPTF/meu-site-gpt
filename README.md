# Nordly — ecommerce tech curado

Loja brasileira de tecnologia com catálogo enxuto, modelos verificáveis, imagens rastreáveis, filtros combináveis e experiência de compra responsiva.

## Desenvolvimento

1. Use Node.js 22.13 ou superior.
2. Instale com `npm install`.
3. Rode `npm run dev`.
4. Valide com `npm run lint` e `npm test`.

O build principal usa Vinext/Sites. A pasta `vercel-static` é a versão estática hidratada usada pela publicação da Vercel; gere-a com o servidor de produção na porta 4321 e `npm run export:vercel`.

## Catálogo

- A fonte compartilhada fica em `app/lib/products.ts`.
- A parte pública contém identidade, preço, benefício, especificações, compatibilidade, tags e mídia.
- A parte `operations` é consumida somente pelo painel interno `/admin` e pela proteção de pedido.
- Todo produto ativo precisa ter marca, modelo, tipo, categoria, faixa de preço, imagem local e URL de origem.
- Produtos wireless permanecem inativos até confirmação de homologação aplicável da ANATEL.

## Busca e filtros

- OR dentro de cada grupo e AND entre grupos.
- Estado persistido na URL.
- Busca normalizada por nome, marca, modelo, categoria, tipo, tags, recursos e compatibilidade.
- Sinônimos cobrem termos comuns como joystick/controle, fone/headset, RAM/memória e dock/hub.

## Dados

O schema D1 fica em `db/schema.ts`. As migrations incluem `tags`, `product_tags` e `product_media`, preservando dados operacionais separados do conteúdo de vitrine.

## Dependências externas para iniciar vendas

- identidade empresarial, domínio e canais oficiais;
- conta e webhooks do provedor de pagamentos;
- contratos, estoque e preços de fornecedores;
- cálculo de frete e tracking;
- revisão jurídica, fiscal e de privacidade;
- homologação ANATEL para qualquer futuro produto wireless.
