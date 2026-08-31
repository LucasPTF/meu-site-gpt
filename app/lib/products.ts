export type ProductRole = "HERO" | "CORE" | "COMPLEMENTAR";

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  shortName: string;
  category: string;
  role: ProductRole;
  price: number;
  pixPrice: number;
  marketRange: string;
  operatingCost: number;
  preCac: number;
  margin: number;
  score: number;
  supplierScore: number;
  supplier: string;
  backup: string;
  sla: string;
  risk: "Baixo" | "Médio";
  compliance: "APROVADO" | "ATENÇÃO";
  image?: string;
  accent: string;
  badge?: string;
  description: string;
  benefit: string;
  features: string[];
  sourceUrl?: string;
  sourceLabel?: string;
};

export const products: Product[] = [
  {
    id: "gamesir-g7-se",
    slug: "gamesir-g7-se",
    brand: "GameSir",
    name: "Controle G7 SE com Hall Effect",
    shortName: "G7 SE Hall Effect",
    category: "Controles",
    role: "HERO",
    price: 279.9,
    pixPrice: 265.91,
    marketRange: "R$ 236–302",
    operatingCost: 176.4,
    preCac: 103.5,
    margin: 37,
    score: 8.8,
    supplierScore: 8.7,
    supplier: "GameSir — estoque Brasil (qualificação)",
    backup: "Loja oficial GameSir / AliExpress",
    sla: "4–8 dias úteis",
    risk: "Baixo",
    compliance: "APROVADO",
    image: "/products/gamesir-g7-se.png",
    accent: "#dff8ea",
    badge: "TOP CUSTO-BENEFÍCIO",
    benefit: "Precisão sem drift e compatibilidade direta com Xbox e PC.",
    description:
      "Controle com fio licenciado para Xbox e PC, com analógicos e gatilhos Hall Effect, dois botões traseiros e cabo USB-C removível de 3 m.",
    features: ["Hall Effect nos analógicos e gatilhos", "Xbox Series, Xbox One e Windows 10/11", "2 botões traseiros mapeáveis", "Conector de áudio 3,5 mm"],
    sourceUrl: "https://gamesir.com/products/gamesir-g7-se/buy",
    sourceLabel: "Ficha oficial GameSir",
  },
  {
    id: "fifine-am8",
    slug: "fifine-am8",
    brand: "FIFINE",
    name: "Microfone dinâmico AM8 USB/XLR",
    shortName: "AM8 USB/XLR",
    category: "Áudio",
    role: "HERO",
    price: 299.9,
    pixPrice: 284.91,
    marketRange: "R$ 255–379",
    operatingCost: 178.2,
    preCac: 121.7,
    margin: 40.6,
    score: 8.7,
    supplierScore: 8.5,
    supplier: "FIFINE Official (qualificação)",
    backup: "Distribuidor nacional em homologação",
    sla: "5–12 dias úteis",
    risk: "Baixo",
    compliance: "APROVADO",
    image: "/products/fifine-am8.png",
    accent: "#efe7ff",
    badge: "MAIS PROCURADO",
    benefit: "Voz mais limpa no stream hoje, caminho XLR para evoluir amanhã.",
    description:
      "Microfone dinâmico cardioide para streaming, podcast e chamadas, com conexão USB-C e XLR, monitoramento por fone e controle de ganho.",
    features: ["USB-C plug and play", "Saída XLR para interfaces", "Monitoramento em tempo real", "Padrão cardioide para reduzir ruído lateral"],
    sourceUrl: "https://fifinemicrophone.com/products/fifine-ampligame-am8-microphone",
    sourceLabel: "Ficha oficial FIFINE",
  },
  {
    id: "ugreen-revodok-105",
    slug: "ugreen-revodok-105",
    brand: "UGREEN",
    name: "Hub USB-C Revodok 105 5 em 1",
    shortName: "Revodok 105",
    category: "Notebook",
    role: "HERO",
    price: 169.9,
    pixPrice: 161.41,
    marketRange: "R$ 149–219",
    operatingCost: 99.1,
    preCac: 70.8,
    margin: 41.7,
    score: 8.5,
    supplierScore: 9,
    supplier: "UGREEN Official (qualificação)",
    backup: "Distribuidor nacional UGREEN",
    sla: "4–10 dias úteis",
    risk: "Baixo",
    compliance: "APROVADO",
    image: "/products/ugreen-revodok.png",
    accent: "#e5f0ff",
    badge: "TOP HOME OFFICE",
    benefit: "HDMI, carregamento e portas USB em uma peça que cabe no bolso.",
    description:
      "Hub compacto com HDMI 4K, Power Delivery de até 100 W e três portas USB para trabalho, estudo e apresentações.",
    features: ["HDMI até 4K a 30 Hz", "Power Delivery até 100 W", "1× USB-A 5 Gbps + 2× USB-A", "Windows, macOS, Linux e dispositivos USB-C"],
    sourceUrl: "https://www.ugreen.com/products/usa-15495",
    sourceLabel: "Ficha oficial UGREEN",
  },
  {
    id: "orico-m2pv-c3",
    slug: "orico-m2pv-c3",
    brand: "ORICO",
    name: "Case NVMe M2PV-C3 10 Gbps",
    shortName: "Case NVMe 10 Gbps",
    category: "Hardware",
    role: "HERO",
    price: 179.9,
    pixPrice: 170.91,
    marketRange: "R$ 150–210",
    operatingCost: 101.8,
    preCac: 78.1,
    margin: 43.4,
    score: 8.2,
    supplierScore: 8.3,
    supplier: "ORICO Official (qualificação)",
    backup: "Distribuidor ORICO Brasil",
    sla: "5–12 dias úteis",
    risk: "Baixo",
    compliance: "APROVADO",
    accent: "#e8edf2",
    badge: "UPGRADE FÁCIL",
    benefit: "Transforme um SSD NVMe parado em armazenamento externo rápido.",
    description:
      "Case de alumínio para SSD M.2 NVMe com USB-C de 10 Gbps, dissipação térmica e suporte aos tamanhos 2230 a 2280.",
    features: ["USB-C até 10 Gbps", "NVMe M-Key e B+M-Key", "Corpo em alumínio", "Windows, macOS e Linux"],
    sourceUrl: "https://www.orico.cc/index/product/detail/2335.html",
    sourceLabel: "Ficha oficial ORICO",
  },
  {
    id: "baseus-iwok2",
    slug: "baseus-iwok2",
    brand: "Baseus",
    name: "Light bar de monitor i-Wok 2",
    shortName: "i-Wok 2 Light Bar",
    category: "Setup",
    role: "HERO",
    price: 219.9,
    pixPrice: 208.91,
    marketRange: "R$ 199–289",
    operatingCost: 129.4,
    preCac: 90.5,
    margin: 41.2,
    score: 8.1,
    supplierScore: 8.4,
    supplier: "Baseus Official (qualificação)",
    backup: "Distribuidor nacional Baseus",
    sla: "5–12 dias úteis",
    risk: "Baixo",
    compliance: "APROVADO",
    image: "/products/baseus-iwok2.jpg",
    accent: "#fff0db",
    badge: "TOP SETUP",
    benefit: "Ilumina teclado e mesa sem jogar reflexo direto na tela.",
    description:
      "Luminária USB para monitor com iluminação assimétrica, ajuste contínuo de brilho e temperatura de cor entre 2700 K e 6500 K.",
    features: ["Iluminação assimétrica", "Temperatura de 2700 K a 6500 K", "CRI Ra≥95", "Alimentação USB-C 5 V/1 A"],
    sourceUrl: "https://pl.baseus.com/products/baseus-i-wok2-lampka-led-na-monitor-do-pulpitu-oswietlenie-ekranu-czarny-dgiw000101",
    sourceLabel: "Ficha oficial Baseus",
  },
  {
    id: "fifine-sc3", slug: "fifine-sc3", brand: "FIFINE", name: "Mixer de áudio SC3", shortName: "Mixer SC3", category: "Áudio", role: "CORE", price: 329.9, pixPrice: 313.41, marketRange: "R$ 291–426", operatingCost: 194.6, preCac: 135.3, margin: 41, score: 7.9, supplierScore: 8.4, supplier: "FIFINE Official (qualificação)", backup: "Distribuidor nacional", sla: "5–12 dias úteis", risk: "Baixo", compliance: "APROVADO", image: "/products/fifine-sc3.png", accent: "#f0e8ff", benefit: "Controle de microfone, game e chat sem abrir mil janelas.", description: "Mixer USB compacto para streaming com entrada XLR, controles físicos e monitoramento.", features: ["Entrada XLR", "Controles independentes", "Monitoramento por fone", "USB-C"], sourceUrl: "https://fifinemicrophone.com/products/fifine-ampligame-sc3-audio-mixer", sourceLabel: "Ficha oficial FIFINE" },
  { id: "eyooso-z11", slug: "eyooso-z11", brand: "E-YOOSO", name: "Teclado mecânico Z11 ABNT2", shortName: "Z11 ABNT2 60%", category: "Teclados", role: "CORE", price: 169.9, pixPrice: 161.41, marketRange: "R$ 149–199", operatingCost: 101.2, preCac: 68.7, margin: 40.4, score: 7.8, supplierScore: 7.8, supplier: "Distribuidor nacional (qualificação)", backup: "Loja oficial internacional", sla: "4–10 dias úteis", risk: "Baixo", compliance: "APROVADO", accent: "#ffe8e6", benefit: "Layout brasileiro compacto, cabo removível e switches trocáveis.", description: "Teclado 60% com fio, layout ABNT2, hot-swap e cabo USB-C removível.", features: ["Layout ABNT2", "Hot-swap", "61 teclas", "USB-C removível"] },
  { id: "ugreen-stand", slug: "ugreen-stand", brand: "UGREEN", name: "Suporte ajustável para notebook", shortName: "Stand 17,3\"", category: "Notebook", role: "CORE", price: 159.9, pixPrice: 151.91, marketRange: "R$ 146–173", operatingCost: 88.5, preCac: 71.4, margin: 44.7, score: 7.7, supplierScore: 8.9, supplier: "UGREEN Official (qualificação)", backup: "Distribuidor nacional", sla: "4–10 dias úteis", risk: "Baixo", compliance: "APROVADO", accent: "#e5f0ff", benefit: "Tela mais alta, mesa mais livre e postura melhor ajustada.", description: "Suporte dobrável e ajustável para notebooks de até 17,3 polegadas.", features: ["Ajuste de altura", "Dobrável", "Base antiderrapante", "Até 17,3 polegadas"] },
  { id: "orico-hub-4", slug: "orico-hub-4", brand: "ORICO", name: "Hub USB 3.0 de 4 portas", shortName: "Hub USB 4 portas", category: "Notebook", role: "CORE", price: 89.9, pixPrice: 85.41, marketRange: "R$ 79–119", operatingCost: 49.8, preCac: 40.1, margin: 44.6, score: 7.5, supplierScore: 8.2, supplier: "ORICO Official (qualificação)", backup: "CJ Sourcing (cotação)", sla: "6–14 dias úteis", risk: "Baixo", compliance: "APROVADO", accent: "#e8edf2", benefit: "Mais portas para periféricos sem ocupar espaço na mochila.", description: "Hub compacto com quatro portas USB-A para notebook e desktop.", features: ["4 portas USB-A", "Plug and play", "Cabo integrado", "Formato compacto"] },
  { id: "maono-pm461", slug: "maono-pm461", brand: "Maono", name: "Microfone USB PM461TR", shortName: "PM461TR USB", category: "Áudio", role: "CORE", price: 189.9, pixPrice: 180.41, marketRange: "R$ 169–239", operatingCost: 111.6, preCac: 78.3, margin: 41.2, score: 7.4, supplierScore: 7.9, supplier: "Maono Official (qualificação)", backup: "Distribuidor nacional", sla: "5–12 dias úteis", risk: "Baixo", compliance: "APROVADO", accent: "#e7f7f4", benefit: "Áudio de entrada melhor para aula, reunião e conteúdo.", description: "Microfone USB cardioide com ajuste de ganho e tripé de mesa.", features: ["USB plug and play", "Padrão cardioide", "Controle de ganho", "Tripé incluso"] },
  { id: "deskmat-xl", slug: "deskmat-xl", brand: "NORDLY", name: "Deskmat XL Control 900 × 400", shortName: "Deskmat XL", category: "Setup", role: "COMPLEMENTAR", price: 59.9, pixPrice: 56.91, marketRange: "R$ 49–79", operatingCost: 27.4, preCac: 32.5, margin: 54.3, score: 7.6, supplierScore: 7.6, supplier: "CJ Sourcing (cotação)", backup: "Fornecedor nacional", sla: "7–16 dias úteis", risk: "Baixo", compliance: "APROVADO", accent: "#e8f7ee", benefit: "Mais área de mouse e menos ruído visual na mesa.", description: "Mousepad de mesa com superfície control, base emborrachada e borda costurada.", features: ["900 × 400 mm", "Borda costurada", "Base antiderrapante", "Superfície control"] },
  { id: "cable-kit", slug: "cable-kit", brand: "NORDLY", name: "Kit organização de cabos 12 peças", shortName: "Kit de cabos", category: "Setup", role: "COMPLEMENTAR", price: 39.9, pixPrice: 37.91, marketRange: "R$ 29–49", operatingCost: 17.9, preCac: 22, margin: 55.1, score: 7.3, supplierScore: 7.5, supplier: "Fornecedor nacional (cotação)", backup: "CJ Sourcing", sla: "4–10 dias úteis", risk: "Baixo", compliance: "APROVADO", accent: "#fff3df", benefit: "Cabos no lugar sem furar a mesa.", description: "Conjunto de presilhas, velcros e canaletas autoadesivas para organizar o setup.", features: ["12 peças", "Aplicação sem ferramentas", "Velcros reutilizáveis", "Adesivo removível"] },
  { id: "headset-stand", slug: "headset-stand", brand: "NORDLY", name: "Suporte de headset em alumínio", shortName: "Suporte de headset", category: "Setup", role: "COMPLEMENTAR", price: 79.9, pixPrice: 75.91, marketRange: "R$ 69–99", operatingCost: 36.8, preCac: 43.1, margin: 53.9, score: 7.2, supplierScore: 7.4, supplier: "CJ Sourcing (cotação)", backup: "Fornecedor nacional", sla: "7–16 dias úteis", risk: "Baixo", compliance: "APROVADO", accent: "#eeeaff", benefit: "Headset protegido e mesa mais limpa.", description: "Suporte estável em alumínio com base antiderrapante.", features: ["Alumínio", "Base antiderrapante", "Montagem rápida", "Sem RGB"] },
  { id: "controller-stand", slug: "controller-stand", brand: "NORDLY", name: "Suporte universal para controle", shortName: "Suporte de controle", category: "Controles", role: "COMPLEMENTAR", price: 59.9, pixPrice: 56.91, marketRange: "R$ 49–79", operatingCost: 28.2, preCac: 31.7, margin: 52.9, score: 7.1, supplierScore: 7.4, supplier: "Fornecedor nacional (cotação)", backup: "CJ Sourcing", sla: "4–10 dias úteis", risk: "Baixo", compliance: "APROVADO", accent: "#e8f0ff", benefit: "Controle sempre à mão e fora da superfície da mesa.", description: "Suporte compacto compatível com controles Xbox, PlayStation e PC.", features: ["Compatibilidade ampla", "Base estável", "Proteção em silicone", "Formato compacto"] },
  { id: "ugreen-cable", slug: "ugreen-cable", brand: "UGREEN", name: "Cabo USB-C trançado 100 W", shortName: "USB-C 100 W", category: "Acessórios", role: "COMPLEMENTAR", price: 69.9, pixPrice: 66.41, marketRange: "R$ 59–89", operatingCost: 33.2, preCac: 36.7, margin: 52.5, score: 7.5, supplierScore: 8.9, supplier: "UGREEN Official (qualificação)", backup: "Distribuidor nacional", sla: "4–10 dias úteis", risk: "Baixo", compliance: "APROVADO", accent: "#e7f7f4", benefit: "Um cabo resistente para notebook, tablet e celular.", description: "Cabo USB-C para USB-C trançado com potência de até 100 W.", features: ["Até 100 W", "Revestimento trançado", "USB-C para USB-C", "Chip e-marker"] },
];

export const heroProducts = products.filter((product) => product.role === "HERO");
export const coreProducts = products.filter((product) => product.role === "CORE");
export const complementaryProducts = products.filter((product) => product.role === "COMPLEMENTAR");

export const brl = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);

