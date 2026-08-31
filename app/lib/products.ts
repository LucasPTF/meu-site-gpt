export type TagGroup = "category" | "type" | "use" | "compatibility" | "feature" | "price";

export type TagDefinition = {
  slug: string;
  label: string;
  group: TagGroup;
};

export type ProductMedia = {
  src: string;
  alt: string;
  sourceUrl: string;
  sourceLabel: string;
};

export type Product = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  name: string;
  shortName: string;
  category: string;
  categorySlug: string;
  productType: string;
  price: number;
  pixPrice: number;
  accent: string;
  badge?: string;
  benefit: string;
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  compatibility: string[];
  contents: string[];
  warranty: string;
  sla: string;
  tags: string[];
  media: ProductMedia[];
  image: string;
  active: boolean;
  featured: boolean;
  operations: {
    role: "HERO" | "CORE" | "COMPLEMENTAR";
    marketRange: string;
    operatingCost: number | null;
    preCac: number | null;
    margin: number | null;
    score: number;
    supplierScore: number | null;
    supplier: string;
    backup: string;
    risk: "Baixo" | "Médio";
    compliance: "APROVADO" | "ATENÇÃO";
    status: "qualified" | "pending";
  };
};

export const tagDefinitions: TagDefinition[] = [
  { slug: "audio", label: "Áudio", group: "category" },
  { slug: "controles", label: "Controles", group: "category" },
  { slug: "mouses", label: "Mouses", group: "category" },
  { slug: "teclados", label: "Teclados", group: "category" },
  { slug: "notebook", label: "Notebook", group: "category" },
  { slug: "hardware", label: "Hardware", group: "category" },
  { slug: "setup", label: "Setup", group: "category" },
  { slug: "microfone", label: "Microfone", group: "type" },
  { slug: "mixer", label: "Mixer", group: "type" },
  { slug: "headset", label: "Headset", group: "type" },
  { slug: "controle", label: "Controle", group: "type" },
  { slug: "mouse", label: "Mouse", group: "type" },
  { slug: "teclado", label: "Teclado", group: "type" },
  { slug: "memoria-ram", label: "Memória RAM", group: "type" },
  { slug: "hub-usb-c", label: "Hub USB-C", group: "type" },
  { slug: "case-nvme", label: "Case NVMe", group: "type" },
  { slug: "suporte-notebook", label: "Suporte para notebook", group: "type" },
  { slug: "luminaria", label: "Luminária", group: "type" },
  { slug: "cabo-usb-c", label: "Cabo USB-C", group: "type" },
  { slug: "gaming", label: "Gaming", group: "use" },
  { slug: "streaming", label: "Streaming", group: "use" },
  { slug: "home-office", label: "Home office", group: "use" },
  { slug: "upgrade", label: "Upgrade", group: "use" },
  { slug: "mobilidade", label: "Mobilidade", group: "use" },
  { slug: "xbox", label: "Xbox", group: "compatibility" },
  { slug: "pc", label: "PC", group: "compatibility" },
  { slug: "playstation", label: "PlayStation", group: "compatibility" },
  { slug: "mac", label: "Mac", group: "compatibility" },
  { slug: "usb-c", label: "USB-C", group: "compatibility" },
  { slug: "abnt2", label: "ABNT2", group: "compatibility" },
  { slug: "com-fio", label: "Com fio", group: "feature" },
  { slug: "hall-effect", label: "Hall Effect", group: "feature" },
  { slug: "hot-swap", label: "Hot-swap", group: "feature" },
  { slug: "rgb", label: "RGB", group: "feature" },
  { slug: "portatil", label: "Portátil", group: "feature" },
  { slug: "ate-200", label: "Até R$ 200", group: "price" },
  { slug: "200-300", label: "R$ 200 a R$ 300", group: "price" },
  { slug: "acima-300", label: "Acima de R$ 300", group: "price" },
];

type ProductSeed = Omit<Product, "image" | "active" | "featured"> & { featured?: boolean };

const makeProduct = (product: ProductSeed): Product => ({
  ...product,
  image: product.media[0].src,
  active: true,
  featured: product.featured ?? false,
});

export const products: Product[] = [
  makeProduct({
    id: "gamesir-g7-se", slug: "gamesir-g7-se", brand: "GameSir", model: "G7 SE", name: "Controle GameSir G7 SE com Hall Effect", shortName: "G7 SE Hall Effect", category: "Controles", categorySlug: "controles", productType: "Controle com fio", price: 279.9, pixPrice: 265.91, accent: "#e4f7ef", badge: "ESCOLHA NORDLY", featured: true,
    benefit: "Precisão sem drift para jogar no Xbox e no PC.", description: "Controle oficialmente licenciado para Xbox, com analógicos e gatilhos Hall Effect e dois botões traseiros mapeáveis.",
    features: ["Analógicos e gatilhos Hall Effect", "Dois botões traseiros mapeáveis", "Conector de áudio de 3,5 mm", "Cabo USB-C removível de 3 m"],
    specifications: [{ label: "Conexão", value: "USB-C com fio" }, { label: "Cabo", value: "3 metros, removível" }, { label: "Recursos", value: "Hall Effect e 2 botões traseiros" }], compatibility: ["Xbox Series X|S", "Xbox One", "Windows 10/11"], contents: ["Controle G7 SE", "Cabo USB-C de 3 m", "Manual"], warranty: "90 dias de garantia contratual, além da garantia legal aplicável.", sla: "4 a 8 dias úteis", tags: ["controles", "controle", "gaming", "xbox", "pc", "usb-c", "com-fio", "hall-effect", "200-300"],
    media: [{ src: "/products/gamesir-g7-se.png", alt: "Controle GameSir G7 SE branco visto de frente", sourceUrl: "https://gamesir.com/products/gamesir-g7-se", sourceLabel: "GameSir" }],
    operations: { role: "HERO", marketRange: "R$ 236–302", operatingCost: 176.4, preCac: 103.5, margin: 37, score: 8.8, supplierScore: 8.7, supplier: "GameSir — estoque Brasil (qualificação)", backup: "Loja oficial GameSir", risk: "Baixo", compliance: "APROVADO", status: "qualified" },
  }),
  makeProduct({
    id: "gamesir-kaleid", slug: "gamesir-kaleid", brand: "GameSir", model: "Kaleid", name: "Controle GameSir Kaleid RGB para Xbox", shortName: "Kaleid RGB", category: "Controles", categorySlug: "controles", productType: "Controle com fio", price: 349.9, pixPrice: 332.41, accent: "#e9f8f5", badge: "RGB + HALL EFFECT", featured: true,
    benefit: "Hall Effect, acabamento transparente e RGB em um controle oficial para Xbox.", description: "Controle com fio oficialmente licenciado para Xbox, com sticks Hall Effect, gatilhos de efeito Hall e iluminação RGB.",
    features: ["Sticks e gatilhos Hall Effect", "Iluminação RGB", "Dois botões traseiros", "Cabo USB-C de 3 m"], specifications: [{ label: "Conexão", value: "USB-C com fio" }, { label: "Cabo", value: "3 metros" }, { label: "Licença", value: "Designed for Xbox" }], compatibility: ["Xbox Series X|S", "Xbox One", "Windows 10/11"], contents: ["Controle Kaleid", "Cabo USB-C", "Manual"], warranty: "90 dias de garantia contratual, além da garantia legal aplicável.", sla: "5 a 10 dias úteis", tags: ["controles", "controle", "gaming", "xbox", "pc", "usb-c", "com-fio", "hall-effect", "rgb", "acima-300"],
    media: [{ src: "/products/gamesir-kaleid.png", alt: "Controle GameSir Kaleid transparente com iluminação RGB", sourceUrl: "https://gamesir.com/products/gamesir-kaleid-xbox-controller", sourceLabel: "GameSir" }],
    operations: { role: "CORE", marketRange: "R$ 325–399", operatingCost: null, preCac: null, margin: null, score: 8.4, supplierScore: null, supplier: "Fornecedor local pendente", backup: "GameSir oficial", risk: "Médio", compliance: "APROVADO", status: "pending" },
  }),
  makeProduct({
    id: "fifine-am8", slug: "fifine-am8", brand: "FIFINE", model: "AM8", name: "Microfone dinâmico FIFINE AM8 USB/XLR", shortName: "AM8 USB/XLR", category: "Áudio", categorySlug: "audio", productType: "Microfone", price: 299.9, pixPrice: 284.91, accent: "#f0eaff", badge: "MAIS PROCURADO", featured: true,
    benefit: "Comece no USB e evolua para XLR sem trocar de microfone.", description: "Microfone dinâmico cardioide para streaming, podcast e chamadas, com USB-C, XLR, monitoramento por fone e controle de ganho.",
    features: ["USB-C plug and play", "Saída XLR", "Monitoramento em tempo real", "Padrão cardioide"], specifications: [{ label: "Conexões", value: "USB-C e XLR" }, { label: "Padrão", value: "Cardioide dinâmico" }, { label: "Monitoramento", value: "Saída 3,5 mm" }], compatibility: ["Windows", "macOS", "Interfaces XLR"], contents: ["Microfone AM8", "Cabo USB-C", "Suporte de mesa", "Manual"], warranty: "90 dias de garantia contratual, além da garantia legal aplicável.", sla: "5 a 12 dias úteis", tags: ["audio", "microfone", "streaming", "pc", "mac", "usb-c", "com-fio", "rgb", "200-300"],
    media: [{ src: "/products/fifine-am8.png", alt: "Microfone FIFINE AM8 preto visto de frente", sourceUrl: "https://fifinemicrophone.com/products/fifine-ampligame-am8-microphone", sourceLabel: "FIFINE" }],
    operations: { role: "HERO", marketRange: "R$ 255–379", operatingCost: 178.2, preCac: 121.7, margin: 40.6, score: 8.7, supplierScore: 8.5, supplier: "FIFINE Official (qualificação)", backup: "Distribuidor nacional", risk: "Baixo", compliance: "APROVADO", status: "qualified" },
  }),
  makeProduct({
    id: "fifine-sc3", slug: "fifine-sc3", brand: "FIFINE", model: "SC3", name: "Mixer de áudio FIFINE SC3", shortName: "Mixer SC3", category: "Áudio", categorySlug: "audio", productType: "Mixer", price: 329.9, pixPrice: 313.41, accent: "#eee8ff", badge: "PARA STREAM", featured: true,
    benefit: "Controle microfone, game e chat sem abrir mais uma janela.", description: "Mixer USB compacto para streaming com entrada XLR, controles físicos, sound pads e monitoramento por fone.", features: ["Entrada XLR", "Quatro faders independentes", "Sound pads programáveis", "Monitoramento por fone"], specifications: [{ label: "Conexão", value: "USB-C" }, { label: "Entrada", value: "XLR/6,35 mm" }, { label: "Controles", value: "4 faders e sound pads" }], compatibility: ["Windows", "macOS", "Microfones XLR"], contents: ["Mixer SC3", "Cabos USB", "Manual"], warranty: "90 dias de garantia contratual, além da garantia legal aplicável.", sla: "5 a 12 dias úteis", tags: ["audio", "mixer", "streaming", "pc", "mac", "usb-c", "com-fio", "rgb", "acima-300"], media: [{ src: "/products/fifine-sc3.png", alt: "Mixer de áudio FIFINE SC3 preto visto de frente", sourceUrl: "https://fifinemicrophone.com/products/fifine-ampligame-sc3-audio-mixer", sourceLabel: "FIFINE" }], operations: { role: "CORE", marketRange: "R$ 291–426", operatingCost: 194.6, preCac: 135.3, margin: 41, score: 7.9, supplierScore: 8.4, supplier: "FIFINE Official (qualificação)", backup: "Distribuidor nacional", risk: "Baixo", compliance: "APROVADO", status: "qualified" },
  }),
  makeProduct({
    id: "hyperx-cloud-stinger-2-core", slug: "hyperx-cloud-stinger-2-core", brand: "HyperX", model: "Cloud Stinger 2 Core", name: "Headset HyperX Cloud Stinger 2 Core", shortName: "Cloud Stinger 2 Core", category: "Áudio", categorySlug: "audio", productType: "Headset com fio", price: 199.9, pixPrice: 189.91, accent: "#f5ecee", badge: "CONFORTO ESSENCIAL",
    benefit: "Som e comunicação para jogar sem depender de bateria.", description: "Headset com fio leve, drivers de 40 mm, controle de áudio no fone e microfone que silencia ao ser levantado.", features: ["Drivers de 40 mm", "Microfone flip-to-mute", "Controle de volume no fone", "Conexão com fio"], specifications: [{ label: "Drivers", value: "40 mm" }, { label: "Conexão", value: "3,5 mm" }, { label: "Microfone", value: "Flexível, flip-to-mute" }], compatibility: ["PC", "Xbox", "PlayStation"], contents: ["Headset", "Manual"], warranty: "Garantia do fabricante conforme canal de fornecimento.", sla: "4 a 8 dias úteis", tags: ["audio", "headset", "gaming", "pc", "xbox", "playstation", "com-fio", "ate-200"], media: [{ src: "/products/hyperx-cloud-stinger-2-core.jpg", alt: "Headset HyperX Cloud Stinger 2 Core preto", sourceUrl: "https://row.hyperx.com/pt/products/hyperx-cloud-stinger-2-core-wired-gaming-headset", sourceLabel: "HyperX" }], operations: { role: "CORE", marketRange: "R$ 170–220", operatingCost: null, preCac: null, margin: null, score: 8.1, supplierScore: null, supplier: "Distribuidor nacional pendente", backup: "HyperX Brasil", risk: "Baixo", compliance: "APROVADO", status: "pending" },
  }),
  makeProduct({
    id: "logitech-g203", slug: "logitech-g203", brand: "Logitech G", model: "G203 LIGHTSYNC", name: "Mouse Logitech G203 LIGHTSYNC", shortName: "G203 LIGHTSYNC", category: "Mouses", categorySlug: "mouses", productType: "Mouse com fio", price: 129.9, pixPrice: 119.9, accent: "#eee8ff", badge: "ÓTIMO PRIMEIRO MOUSE", featured: true,
    benefit: "Sensor preciso, seis botões e RGB em um clássico acessível.", description: "Mouse gamer com fio, seis botões programáveis, iluminação LIGHTSYNC RGB e sensor ajustável de 200 a 8.000 DPI.", features: ["200 a 8.000 DPI", "Seis botões", "LIGHTSYNC RGB", "Taxa de resposta de 1.000 Hz"], specifications: [{ label: "Sensor", value: "200–8.000 DPI" }, { label: "Peso", value: "85 g" }, { label: "Botões", value: "6 programáveis" }], compatibility: ["Windows", "macOS", "ChromeOS"], contents: ["Mouse G203", "Documentação"], warranty: "Garantia do fabricante conforme canal de fornecimento.", sla: "2 a 6 dias úteis", tags: ["mouses", "mouse", "gaming", "pc", "mac", "com-fio", "rgb", "ate-200"], media: [{ src: "/products/logitech-g203.png", alt: "Mouse Logitech G203 lilás visto de cima", sourceUrl: "https://www.logitechg.com/en-gb/shop/p/g203-lightsync-rgb-gaming-mouse", sourceLabel: "Logitech G" }], operations: { role: "HERO", marketRange: "R$ 110–150", operatingCost: null, preCac: null, margin: null, score: 8.5, supplierScore: null, supplier: "Varejo nacional pendente", backup: "Logitech Brasil", risk: "Baixo", compliance: "APROVADO", status: "pending" },
  }),
  makeProduct({
    id: "hyperx-pulsefire-haste-2", slug: "hyperx-pulsefire-haste-2", brand: "HyperX", model: "Pulsefire Haste 2", name: "Mouse HyperX Pulsefire Haste 2", shortName: "Pulsefire Haste 2", category: "Mouses", categorySlug: "mouses", productType: "Mouse com fio", price: 294.1, pixPrice: 249.99, accent: "#f4f4f1", badge: "LEVE E RÁPIDO",
    benefit: "Só 53 gramas e leitura de até 26.000 DPI para movimentos rápidos.", description: "Mouse gamer com fio ultraleve, sensor HyperX 26K e taxa de polling de até 8.000 Hz.", features: ["Peso de 53 g", "Sensor de até 26.000 DPI", "Polling de até 8.000 Hz", "Cabo HyperFlex 2"], specifications: [{ label: "Sensor", value: "Até 26.000 DPI" }, { label: "Peso", value: "53 g" }, { label: "Polling", value: "Até 8.000 Hz" }], compatibility: ["PC", "Xbox", "PlayStation"], contents: ["Mouse", "Grips", "Skates extras", "Manual"], warranty: "Garantia do fabricante conforme canal de fornecimento.", sla: "2 a 6 dias úteis", tags: ["mouses", "mouse", "gaming", "pc", "xbox", "playstation", "com-fio", "200-300"], media: [{ src: "/products/hyperx-haste-2.jpg", alt: "Mouse HyperX Pulsefire Haste 2 branco", sourceUrl: "https://row.hyperx.com/collections/gaming-mice/products/hyperx-pulsefire-haste-2-gaming-mouse", sourceLabel: "HyperX" }], operations: { role: "CORE", marketRange: "R$ 250–295", operatingCost: null, preCac: null, margin: null, score: 8.4, supplierScore: null, supplier: "Distribuidor nacional pendente", backup: "HyperX Brasil", risk: "Baixo", compliance: "APROVADO", status: "pending" },
  }),
  makeProduct({
    id: "redragon-kumara-k552", slug: "redragon-kumara-k552", brand: "Redragon", model: "Kumara K552-2", name: "Teclado Redragon Kumara K552-2 ABNT2", shortName: "Kumara K552-2", category: "Teclados", categorySlug: "teclados", productType: "Teclado mecânico", price: 188.22, pixPrice: 159.99, accent: "#f7e9e8", badge: "ABNT2 + HOT-SWAP", featured: true,
    benefit: "Mecânico TKL com layout brasileiro e switches trocáveis.", description: "Teclado mecânico compacto TKL com padrão ABNT2, sistema hot-swap DIY e iluminação vermelha.", features: ["Layout ABNT2", "Formato TKL", "Hot-swap DIY", "Switch Brown"], specifications: [{ label: "Layout", value: "ABNT2" }, { label: "Formato", value: "TKL" }, { label: "Switch", value: "Brown mecânico" }], compatibility: ["Windows", "Linux"], contents: ["Teclado Kumara", "Extrator", "Manual"], warranty: "Garantia do fabricante conforme canal de fornecimento.", sla: "2 a 6 dias úteis", tags: ["teclados", "teclado", "gaming", "pc", "abnt2", "com-fio", "hot-swap", "ate-200"], media: [{ src: "/products/redragon-kumara.png", alt: "Teclado mecânico Redragon Kumara K552-2 ABNT2", sourceUrl: "https://www.redragon.com.br/kumarasingle-brown", sourceLabel: "Redragon Brasil" }], operations: { role: "HERO", marketRange: "R$ 160–190", operatingCost: null, preCac: null, margin: null, score: 8.5, supplierScore: null, supplier: "Varejo nacional pendente", backup: "Redragon Brasil", risk: "Baixo", compliance: "APROVADO", status: "pending" },
  }),
  makeProduct({
    id: "redragon-fizz-k617", slug: "redragon-fizz-k617", brand: "Redragon", model: "Fizz K617-RGB", name: "Teclado Redragon Fizz K617 RGB ABNT2", shortName: "Fizz K617 RGB", category: "Teclados", categorySlug: "teclados", productType: "Teclado mecânico", price: 172.35, pixPrice: 163.73, accent: "#ece8f5", badge: "60% ABNT2",
    benefit: "Formato 60%, RGB e cabo removível para liberar espaço na mesa.", description: "Teclado mecânico 60% com padrão ABNT2, hot-swap DIY, RGB e conexão USB-C removível.", features: ["Layout ABNT2", "Formato 60%", "Hot-swap DIY", "RGB e USB-C removível"], specifications: [{ label: "Layout", value: "ABNT2" }, { label: "Formato", value: "60%" }, { label: "Conexão", value: "USB-C removível" }], compatibility: ["Windows", "Linux"], contents: ["Teclado Fizz", "Cabo USB-C", "Extrator", "Manual"], warranty: "Garantia do fabricante conforme canal de fornecimento.", sla: "2 a 6 dias úteis", tags: ["teclados", "teclado", "gaming", "pc", "abnt2", "usb-c", "com-fio", "hot-swap", "rgb", "ate-200"], media: [{ src: "/products/redragon-fizz.png", alt: "Teclado mecânico Redragon Fizz K617 ABNT2", sourceUrl: "https://www.redragon.com.br/fizzrgb", sourceLabel: "Redragon Brasil" }], operations: { role: "CORE", marketRange: "R$ 164–190", operatingCost: null, preCac: null, margin: null, score: 8.2, supplierScore: null, supplier: "Varejo nacional pendente", backup: "Redragon Brasil", risk: "Baixo", compliance: "APROVADO", status: "pending" },
  }),
  makeProduct({
    id: "kingston-fury-beast-ddr4-16gb", slug: "kingston-fury-beast-ddr4-16gb", brand: "Kingston FURY", model: "KF432C16BB1/16", name: "Memória Kingston FURY Beast DDR4 16 GB", shortName: "FURY Beast 16 GB", category: "Hardware", categorySlug: "hardware", productType: "Memória RAM", price: 899.9, pixPrice: 854.91, accent: "#eceef0", badge: "DDR4 3200 CL16",
    benefit: "Upgrade de 16 GB com especificação clara e part number verificável.", description: "Módulo de memória de 16 GB DDR4-3200 CL16 para desktops compatíveis, com dissipador de baixo perfil.", features: ["16 GB em um módulo", "DDR4-3200", "Latência CL16", "Dissipador de baixo perfil"], specifications: [{ label: "Capacidade", value: "16 GB (1 × 16 GB)" }, { label: "Velocidade", value: "DDR4-3200" }, { label: "Latência", value: "CL16" }, { label: "Tensão", value: "1,35 V" }], compatibility: ["Desktop DDR4", "Intel XMP"], contents: ["1 módulo de memória"], warranty: "Garantia do fabricante conforme canal de fornecimento.", sla: "3 a 8 dias úteis", tags: ["hardware", "memoria-ram", "upgrade", "pc", "acima-300"], media: [{ src: "/products/kingston-fury-beast.png", alt: "Módulo Kingston FURY Beast DDR4 preto", sourceUrl: "https://www.kingston.com/br/memory/search?partid=KF432C16BB1%2F16", sourceLabel: "Kingston" }], operations: { role: "CORE", marketRange: "Preço local volátil", operatingCost: null, preCac: null, margin: null, score: 7.6, supplierScore: null, supplier: "Distribuidor autorizado pendente", backup: "Kingston Brasil", risk: "Médio", compliance: "APROVADO", status: "pending" },
  }),
  makeProduct({
    id: "ugreen-revodok-105", slug: "ugreen-revodok-105", brand: "UGREEN", model: "Revodok 105", name: "Hub USB-C UGREEN Revodok 105 5 em 1", shortName: "Revodok 105", category: "Notebook", categorySlug: "notebook", productType: "Hub USB-C", price: 169.9, pixPrice: 161.41, accent: "#e6f0fb", badge: "TOP HOME OFFICE", featured: true,
    benefit: "HDMI, carregamento e portas USB em uma peça que cabe no bolso.", description: "Hub compacto com HDMI 4K, Power Delivery de até 100 W e três portas USB para trabalho, estudo e apresentações.", features: ["HDMI até 4K a 30 Hz", "Power Delivery até 100 W", "Três portas USB-A", "Corpo compacto"], specifications: [{ label: "Vídeo", value: "HDMI 4K a 30 Hz" }, { label: "Carga", value: "PD até 100 W" }, { label: "Dados", value: "USB-A até 5 Gbps" }], compatibility: ["Windows", "macOS", "Linux", "Dispositivos USB-C com vídeo"], contents: ["Hub Revodok 105", "Manual"], warranty: "90 dias de garantia contratual, além da garantia legal aplicável.", sla: "4 a 10 dias úteis", tags: ["notebook", "hub-usb-c", "home-office", "mobilidade", "pc", "mac", "usb-c", "portatil", "ate-200"], media: [{ src: "/products/ugreen-revodok.png", alt: "Hub UGREEN Revodok 105 cinza", sourceUrl: "https://www.ugreen.com/products/usa-15495", sourceLabel: "UGREEN" }], operations: { role: "HERO", marketRange: "R$ 149–219", operatingCost: 99.1, preCac: 70.8, margin: 41.7, score: 8.5, supplierScore: 9, supplier: "UGREEN Official (qualificação)", backup: "Distribuidor nacional UGREEN", risk: "Baixo", compliance: "APROVADO", status: "qualified" },
  }),
  makeProduct({
    id: "orico-m2pv-c3", slug: "orico-m2pv-c3", brand: "ORICO", model: "M2PV-C3", name: "Case NVMe ORICO M2PV-C3 10 Gbps", shortName: "M2PV-C3 10 Gbps", category: "Hardware", categorySlug: "hardware", productType: "Case NVMe", price: 179.9, pixPrice: 170.91, accent: "#eaedef", badge: "UPGRADE FÁCIL",
    benefit: "Transforme um SSD NVMe parado em armazenamento externo rápido.", description: "Case de alumínio e ABS para SSD M.2 NVMe, com USB-C de 10 Gbps e suporte a unidades de até 8 TB.", features: ["USB 3.1 Gen 2 de 10 Gbps", "Suporte a até 8 TB", "Cabos USB-C e USB-A", "Corpo em alumínio e ABS"], specifications: [{ label: "Interface", value: "USB-C 10 Gbps" }, { label: "SSD", value: "M.2 NVMe" }, { label: "Capacidade", value: "Até 8 TB" }], compatibility: ["Windows", "macOS", "Linux"], contents: ["Case M2PV-C3", "Cabo USB-C para USB-C", "Cabo USB-A para USB-C", "Thermal pad"], warranty: "90 dias de garantia contratual, além da garantia legal aplicável.", sla: "5 a 12 dias úteis", tags: ["hardware", "case-nvme", "upgrade", "mobilidade", "pc", "mac", "usb-c", "portatil", "ate-200"], media: [{ src: "/products/orico-m2pv-c3.jpg", alt: "Case NVMe ORICO M2PV-C3 preto", sourceUrl: "https://www.orico.cc/index/product/detail/2335.html", sourceLabel: "ORICO" }], operations: { role: "HERO", marketRange: "R$ 150–210", operatingCost: 101.8, preCac: 78.1, margin: 43.4, score: 8.2, supplierScore: 8.3, supplier: "ORICO Official (qualificação)", backup: "Distribuidor ORICO Brasil", risk: "Baixo", compliance: "APROVADO", status: "qualified" },
  }),
  makeProduct({
    id: "ugreen-stand", slug: "ugreen-stand", brand: "UGREEN", model: "LP258", name: "Suporte ajustável UGREEN para notebook", shortName: "Stand até 17,3”", category: "Notebook", categorySlug: "notebook", productType: "Suporte para notebook", price: 159.9, pixPrice: 151.91, accent: "#edf1ef", badge: "DOBRÁVEL",
    benefit: "Eleva a tela, libera a mesa e acompanha você na mochila.", description: "Suporte dobrável com cinco níveis de altura para notebooks de 8 a 17,3 polegadas e carga de até 5 kg.", features: ["Cinco níveis de ajuste", "Para notebooks de 8 a 17,3”", "Suporta até 5 kg", "Dobrável e portátil"], specifications: [{ label: "Ajuste", value: "5 níveis" }, { label: "Compatibilidade", value: "8 a 17,3 polegadas" }, { label: "Carga", value: "Até 5 kg" }], compatibility: ["Notebooks de 8 a 17,3 polegadas"], contents: ["Suporte dobrável"], warranty: "Garantia do fabricante conforme canal de fornecimento.", sla: "4 a 10 dias úteis", tags: ["notebook", "suporte-notebook", "home-office", "mobilidade", "portatil", "ate-200"], media: [{ src: "/products/ugreen-stand.png", alt: "Suporte ajustável UGREEN para notebook em alumínio", sourceUrl: "https://eu.ugreen.com/en-ch/products/ugreen-laptop-stand-for-desk-adjustable", sourceLabel: "UGREEN" }], operations: { role: "CORE", marketRange: "R$ 146–173", operatingCost: 88.5, preCac: 71.4, margin: 44.7, score: 7.7, supplierScore: 8.9, supplier: "UGREEN Official (qualificação)", backup: "Distribuidor nacional", risk: "Baixo", compliance: "APROVADO", status: "qualified" },
  }),
  makeProduct({
    id: "baseus-iwok2", slug: "baseus-iwok2", brand: "Baseus", model: "i-Wok 2", name: "Luminária de monitor Baseus i-Wok 2", shortName: "i-Wok 2 Light Bar", category: "Setup", categorySlug: "setup", productType: "Luminária", price: 219.9, pixPrice: 208.91, accent: "#fff0db", badge: "TOP SETUP", featured: true,
    benefit: "Ilumina teclado e mesa sem jogar reflexo direto na tela.", description: "Luminária USB para monitor com luz assimétrica, ajuste contínuo de brilho e temperatura de cor entre 2700 K e 6500 K.", features: ["Iluminação assimétrica", "Temperatura de 2700 K a 6500 K", "CRI Ra≥95", "Alimentação USB-C"], specifications: [{ label: "Temperatura", value: "2700–6500 K" }, { label: "CRI", value: "Ra≥95" }, { label: "Alimentação", value: "USB-C 5 V/1 A" }], compatibility: ["Monitores com borda superior compatível"], contents: ["Luminária i-Wok 2", "Cabo USB-C", "Manual"], warranty: "90 dias de garantia contratual, além da garantia legal aplicável.", sla: "5 a 12 dias úteis", tags: ["setup", "luminaria", "home-office", "gaming", "usb-c", "200-300"], media: [{ src: "/products/baseus-iwok2.jpg", alt: "Luminária Baseus i-Wok 2 preta para monitor", sourceUrl: "https://pl.baseus.com/products/baseus-i-wok2-lampka-led-na-monitor-do-pulpitu-oswietlenie-ekranu-czarny-dgiw000101", sourceLabel: "Baseus" }], operations: { role: "HERO", marketRange: "R$ 199–289", operatingCost: 129.4, preCac: 90.5, margin: 41.2, score: 8.1, supplierScore: 8.4, supplier: "Baseus Official (qualificação)", backup: "Distribuidor nacional Baseus", risk: "Baixo", compliance: "APROVADO", status: "qualified" },
  }),
  makeProduct({
    id: "ugreen-uno-100w", slug: "ugreen-uno-100w", brand: "UGREEN", model: "Uno 35501", name: "Cabo UGREEN Uno USB-C 100 W", shortName: "Uno USB-C 100 W", category: "Setup", categorySlug: "setup", productType: "Cabo USB-C", price: 79.9, pixPrice: 75.91, accent: "#e6f1ef", badge: "100 W + E-MARKER",
    benefit: "Um cabo reforçado para carregar notebook, tablet e celular.", description: "Cabo USB-C para USB-C trançado, com potência de até 100 W, e-marker e transferência de dados a 480 Mbps.", features: ["Potência de até 100 W", "Chip e-marker", "Revestimento trançado", "Dados a 480 Mbps"], specifications: [{ label: "Potência", value: "Até 100 W" }, { label: "Dados", value: "480 Mbps" }, { label: "Conectores", value: "USB-C para USB-C" }], compatibility: ["Notebooks USB-C", "Tablets USB-C", "Smartphones USB-C"], contents: ["Cabo UGREEN Uno"], warranty: "Garantia do fabricante conforme canal de fornecimento.", sla: "4 a 10 dias úteis", tags: ["setup", "cabo-usb-c", "home-office", "mobilidade", "usb-c", "portatil", "ate-200"], media: [{ src: "/products/ugreen-uno.png", alt: "Cabo UGREEN Uno USB-C com conector robô", sourceUrl: "https://eu.ugreen.com/products/ugreen-uno-usb-c-cable-100w", sourceLabel: "UGREEN" }], operations: { role: "COMPLEMENTAR", marketRange: "R$ 46–81", operatingCost: null, preCac: null, margin: null, score: 7.8, supplierScore: null, supplier: "Distribuidor nacional pendente", backup: "UGREEN oficial", risk: "Baixo", compliance: "APROVADO", status: "pending" },
  }),
];

export const activeProducts = products.filter((product) => product.active);
export const featuredProducts = activeProducts.filter((product) => product.featured);
export const heroProducts = activeProducts.filter((product) => product.operations.role === "HERO");
export const coreProducts = activeProducts.filter((product) => product.operations.role === "CORE");
export const complementaryProducts = activeProducts.filter((product) => product.operations.role === "COMPLEMENTAR");

export const brl = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const normalizeText = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();

const synonyms: Record<string, string[]> = {
  fone: ["headset", "audio"], joystick: ["controle", "gamepad"], teclado: ["keyboard"], mouse: ["mice"],
  ram: ["memoria", "ddr4"], dock: ["hub", "adaptador"], microfone: ["mic"], notebook: ["laptop"],
};

export const searchableText = (product: Product) => normalizeText([
  product.name, product.shortName, product.brand, product.model, product.category, product.productType,
  ...product.tags, ...product.features, ...product.compatibility, ...product.specifications.flatMap((item) => [item.label, item.value]),
].join(" "));

const canonicalText = (product: Product) => normalizeText([
  product.name, product.shortName, product.brand, product.model, product.category, product.productType,
  ...product.tags, ...product.compatibility,
].join(" "));

export const matchesSearch = (product: Product, query: string) => {
  const words = normalizeText(query).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const haystack = searchableText(product);
  const canonical = canonicalText(product);
  return words.every((word) => haystack.includes(word) || (synonyms[word] ?? []).some((candidate) => canonical.includes(candidate)));
};

export const getProduct = (slug: string) => activeProducts.find((product) => product.slug === slug);

export const getRelatedProducts = (product: Product, limit = 4) => activeProducts
  .filter((candidate) => candidate.id !== product.id)
  .map((candidate) => ({ candidate, score: candidate.tags.filter((tag) => product.tags.includes(tag)).length * 2 + candidate.compatibility.filter((item) => product.compatibility.includes(item)).length }))
  .sort((a, b) => b.score - a.score || b.candidate.operations.score - a.candidate.operations.score)
  .slice(0, limit)
  .map(({ candidate }) => candidate);

export const tagGroups = tagDefinitions.reduce<Record<TagGroup, TagDefinition[]>>((groups, tag) => {
  groups[tag.group].push(tag);
  return groups;
}, { category: [], type: [], use: [], compatibility: [], feature: [], price: [] });
