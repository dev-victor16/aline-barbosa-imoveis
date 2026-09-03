/**
 * ALINE BARBOSA IMÓVEIS - BASE DE DADOS OFICIAL 2026
 * Informações institucionais, certificações e catálogo autêntico de imóveis.
 */

const ALINE_BARBOSA_INFO = {
  name: "Aline Barbosa Corretora de Imóveis",
  owner: "Aline Barbosa",
  creci: "CRECI/MG 38.616",
  cnai: "CNAI 39797",
  specialty: "Corretora de Imóveis & Perita Judicial Avaliadora",
  phoneFormatted: "(31) 98606-3842",
  phoneFixed: "(31) 3052-5681",
  phoneRaw: "5531986063842",
  email: "alineimoveismg@gmail.com",
  address: "Rua Waldir César Branquinho, 166 - Conjunto Túnel de Ibirité",
  neighborhood: "Conjunto Túnel de Ibirité",
  city: "Belo Horizonte / Ibirité",
  state: "MG",
  cep: "30662-600",
  hours: "Segunda à Sexta das 09h às 17h",
  description: "Especialista em compra, venda, locação, administração e perícia judicial imobiliária com laudos técnicos NBR 14.653 da ABNT e selo certificador COFECI.",
  citiesServed: ["Belo Horizonte (Barreiro)", "Ibirité", "Sarzedo", "Betim", "Contagem", "Igarapé"]
};

const BANK_PARTNERS = [
  {
    id: "caixa",
    name: "Caixa Econômica Federal",
    badge: "Líder em Habitação",
    rateAnnual: 9.99,
    minDownPaymentPct: 20,
    maxYears: 35,
    logo: "assets/img/banks/caixa.svg"
  },
  {
    id: "bb",
    name: "Banco do Brasil",
    badge: "Condições Especiais",
    rateAnnual: 10.20,
    minDownPaymentPct: 20,
    maxYears: 35,
    logo: "assets/img/banks/banco-do-brasil.svg"
  },
  {
    id: "itau",
    name: "Itaú",
    badge: "Aprovação em 1 Hora",
    rateAnnual: 10.49,
    minDownPaymentPct: 20,
    maxYears: 30,
    logo: "assets/img/banks/itau.svg"
  },
  {
    id: "santander",
    name: "Santander",
    badge: "Financiamento Flexível",
    rateAnnual: 10.65,
    minDownPaymentPct: 20,
    maxYears: 35,
    logo: "assets/img/banks/santander.svg"
  },
  {
    id: "bradesco",
    name: "Bradesco",
    badge: "Crédito Imobiliário Ágil",
    rateAnnual: 10.55,
    minDownPaymentPct: 20,
    maxYears: 30,
    logo: "assets/img/banks/bradesco.svg"
  }
];

const PROPERTIES_DATA = [
  {
    id: "prop-590",
    code: "#590",
    title: "Casa Espetacular com Quintal Amplo e Acabamento Nobre",
    type: "casa",
    purpose: "venda",
    price: 760000,
    priceFormatted: "R$ 760.000",
    city: "Ibirité",
    neighborhood: "Industrial de Ibirité",
    dorms: 3,
    baths: 2,
    suites: 1,
    garages: 3,
    area: 400,
    tag: "Oportunidade",
    featured: true,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202504292239379507.png",
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202504292239394465.jpg",
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202504292239416464.jpg",
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202504292239448653.jpg"
    ],
    description: "Sabe aquele lugar gostoso, arejado, com pouco movimento e que transpira tranquilidade? É tudo o que você vai encontrar nessa charmosa casa em Ibirité!\n\nSão 400m² de área com 3 dormitórios amplos (sendo 1 suíte confortável), sala espaçosa para dois ambientes, cozinha moderna com bancadas em granito, banheiros com blindex e vaga coberta para até 3 veículos.\n\nLocalização privilegiada com fácil acesso ao Barreiro e centro de Ibirité. Aceita financiamento bancário Caixa e uso do FGTS!",
    amenities: ["Quintal Privativo", "Suíte Master", "Garagem para 3 Carros", "Espaço Gourmet", "Aceita Financiamento", "Portão Eletrônico"]
  },
  {
    id: "prop-548",
    code: "#548",
    title: "Casa Duplex Individual no Masterville com Terraço",
    type: "casa",
    purpose: "venda",
    price: 470000,
    priceFormatted: "R$ 470.000",
    city: "Sarzedo",
    neighborhood: "Masterville",
    dorms: 2,
    baths: 2,
    suites: 0,
    garages: 2,
    area: 160,
    tag: "Casa Nova",
    featured: true,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202410252228179181.jpg",
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202410252228179181.jpg"
    ],
    description: "Casa individual à venda em Sarzedo no cobiçado bairro Masterville. Imóvel duplex moderno com área total aproximada de 160m².\n\nPossui 2 quartos arejados, sala ampla para 2 ambientes, cozinha americana revestida, 2 banheiros e 2 vagas de garagem.\n\nExcelente padrão construtivo em rua tranquila e de fácil acesso ao comércio local.",
    amenities: ["Entrada Individual", "Área de Serviço Separada", "Piso em Porcelanato", "Pronto para Morar", "Bairro Planejado"]
  },
  {
    id: "prop-490",
    code: "#490",
    title: "Mansão Residencial de 6 Quartos no Parque Durval de Barros",
    type: "casa",
    purpose: "venda",
    price: 1200000,
    priceFormatted: "R$ 1.200.000",
    city: "Ibirité",
    neighborhood: "Parque Durval de Barros",
    dorms: 6,
    baths: 3,
    suites: 1,
    garages: 3,
    area: 411,
    tag: "Alto Padrão",
    featured: true,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/20231023223615949358.jpg"
    ],
    description: "Imóvel de grande porte e alta imponência no bairro Duval de Barros em Ibirité. Terreno de 411m² com construção sólida de dois pavimentos.\n\nComposto por 6 dormitórios (1 suíte com hidromassagem), 3 banheiros, salas sociais integradas, varanda colonial, área externa gourmet com churrasqueira e vaga para até 3 carros.\n\nIdeal para famílias grandes ou clínicas/empresas que buscam localização estratégica próxima à divisa com Belo Horizonte.",
    amenities: ["Espaço Gourmet", "Churrasqueira", "Varanda Panorâmica", "6 Dormitórios", "Localização Nobre"]
  },
  {
    id: "prop-484",
    code: "#484",
    title: "Casa Duplex Moderna no Lindéia (Região do Barreiro)",
    type: "casa",
    purpose: "venda",
    price: 750000,
    priceFormatted: "R$ 750.000",
    city: "Belo Horizonte",
    neighborhood: "Lindéia (Barreiro)",
    dorms: 3,
    baths: 3,
    suites: 1,
    garages: 4,
    area: 180,
    tag: "Destaque BH",
    featured: true,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/20231001181725176463.jpg"
    ],
    description: "Casa individual de alto padrão construtivo no bairro Lindéia, região do Barreiro em Belo Horizonte. Imóvel duplex com 180m² de área construída.\n\nAcabamentos de primeira linha com porcelanato polido e rebaixamento em gesso. 3 quartos amplos (suíte com closet), sala com pé-direito elevado, cozinha planejada e garagem coberta para 4 carros.\n\nDocumentação 100% regularizada para financiamento bancário imediato.",
    amenities: ["Garagem 4 Carros", "Suíte com Closet", "Região do Barreiro", "Porcelanato", "Financiamento Bancário"]
  },
  {
    id: "prop-464",
    code: "#464",
    title: "Casa Individual Duplex com 3 Banheiros no Masterville",
    type: "casa",
    purpose: "venda",
    price: 450000,
    priceFormatted: "R$ 450.000",
    city: "Sarzedo",
    neighborhood: "Masterville",
    dorms: 2,
    baths: 3,
    suites: 1,
    garages: 2,
    area: 154,
    tag: "Pronto para Morar",
    featured: false,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/20230703120536852369.jpg"
    ],
    description: "Casa individual no Masterville em Sarzedo. Imóvel com 154m² de área construída, 2 quartos (1 suíte com sacada), 3 banheiros, acabamento diferenciado, área externa privativa nos fundos e 2 vagas de garagem.\n\nBairro residencial tranquilo com infraestrutura completa.",
    amenities: ["Suíte com Sacada", "3 Banheiros", "Quintal nos Fundos", "Entrada Facilitada"]
  },
  {
    id: "prop-413",
    code: "#413",
    title: "Casa Aconchegante no Bela Vista (Durval de Barros)",
    type: "casa",
    purpose: "venda",
    price: 550000,
    priceFormatted: "R$ 550.000",
    city: "Ibirité",
    neighborhood: "Bela Vista",
    dorms: 3,
    baths: 2,
    suites: 1,
    garages: 1,
    area: 140,
    tag: "Oportunidade",
    featured: false,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/20230215131927454883.jpg"
    ],
    description: "Excelente casa com 3 dormitórios (1 suíte) no bairro Bela Vista, próximo a Durval de Barros. Sala arejada, cozinha com armários, área de serviço coberta e garagem.\n\nLocalização de fácil acesso a transporte público, escolas e comércio da região.",
    amenities: ["Suíte", "Cozinha com Armários", "Fácil Acesso a BH", "Documentação Pronta"]
  },
  {
    id: "prop-562",
    code: "#562",
    title: "Chácara Urbana com 300m² Construídos em Icaivera",
    type: "casa",
    purpose: "venda",
    price: 550000,
    priceFormatted: "R$ 550.000",
    city: "Betim",
    neighborhood: "Icaivera",
    dorms: 3,
    baths: 2,
    suites: 1,
    garages: 4,
    area: 300,
    tag: "Espaço & Conforto",
    featured: false,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202412041911146717.jpg"
    ],
    description: "More em Betim no Bairro Icaivera com o conforto de uma casa ampla! Terreno de 360m² com aproximadamente 300m² construídos. 3 quartos (1 suíte), varandão colonial, jardim, garagem para 4 carros e muito espaço para sua família.",
    amenities: ["Terreno de 360m²", "Garagem para 4 Carros", "Varanda Colonial", "Área Verde"]
  },
  {
    id: "prop-561",
    code: "#561",
    title: "Casa Linear no Bairro Riacho da Mata (Centro de Sarzedo)",
    type: "casa",
    purpose: "venda",
    price: 600000,
    priceFormatted: "R$ 600.000",
    city: "Sarzedo",
    neighborhood: "Centro",
    dorms: 2,
    baths: 2,
    suites: 0,
    garages: 3,
    area: 231,
    tag: "Casa Linear",
    featured: false,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202412041843487651.jpg"
    ],
    description: "Casa linear à venda em Sarzedo no Bairro Riacho da Mata/Centro. Imóvel com área total de 231m², constituído por 2 quartos, sala de estar espaçosa, 2 banheiros e 3 vagas de garagem. Excelente oportunidade para quem busca praticidade sem escadas.",
    amenities: ["Sem Escadas (Linear)", "3 Vagas de Garagem", "Centro de Sarzedo", "Quintal Amplo"]
  },
  {
    id: "prop-554",
    code: "#554",
    title: "Imóvel Comercial e Residencial de Esquina no Industrial",
    type: "comercial",
    purpose: "venda",
    price: 1300000,
    priceFormatted: "R$ 1.300.000",
    city: "Contagem",
    neighborhood: "Industrial",
    dorms: 3,
    baths: 3,
    suites: 1,
    garages: 3,
    area: 540,
    tag: "Comercial / Misto",
    featured: true,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202411011651597928.jpg"
    ],
    description: "Imóvel de esquina com 540m² de área total no Bairro Industrial em Contagem. Ponto estratégico para empresas, depósitos, distribuidoras ou investimento com renda garantida de aluguel residencial e comercial.",
    amenities: ["Lote de Esquina", "Ponto Comercial Nobre", "Área de 540m²", "Alta Rentabilidade"]
  },
  {
    id: "prop-549",
    code: "#549",
    title: "Casa em Condomínio Fechado no Centro de Sarzedo",
    type: "casa",
    purpose: "venda",
    price: 310000,
    priceFormatted: "R$ 310.000",
    city: "Sarzedo",
    neighborhood: "Centro",
    dorms: 3,
    baths: 1,
    suites: 0,
    garages: 4,
    area: 161,
    tag: "Condomínio",
    featured: false,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202410252244245745.jpg"
    ],
    description: "Imóvel com área total de 161m² no Bairro Condomínio Sarzedo. A casa possui 3 dormitórios, 1 banheiro, sala para 2 ambientes, 4 vagas de garagem e total segurança de condomínio fechado com portaria.",
    amenities: ["Condomínio Fechado", "Portaria 24h", "4 Vagas", "Preço Acessível"]
  },
  {
    id: "prop-543",
    code: "#543",
    title: "Casa Linear Ampla com 217m² no Tirol (Barreiro)",
    type: "casa",
    purpose: "venda",
    price: 720000,
    priceFormatted: "R$ 720.000",
    city: "Belo Horizonte",
    neighborhood: "Tirol (Barreiro)",
    dorms: 3,
    baths: 2,
    suites: 0,
    garages: 1,
    area: 217,
    tag: "Barreiro BH",
    featured: false,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202410151043508572.jpg"
    ],
    description: "Casa de 3 dormitórios à venda em Belo Horizonte no tradicional Bairro Tirol. Casa linear com 3 dormitórios amplos, sala arejada, cozinha espaçosa, quintal e área externa de convivência.",
    amenities: ["Bairro Tirol", "Região do Barreiro", "Casa Linear", "Quintal Amplo"]
  },
  {
    id: "prop-4008680",
    code: "#4008680",
    title: "Casa de Alto Padrão com Suíte no Bairro São Pedro",
    type: "casa",
    purpose: "venda",
    price: 520000,
    priceFormatted: "R$ 520.000",
    city: "Ibirité",
    neighborhood: "São Pedro",
    dorms: 3,
    baths: 2,
    suites: 1,
    garages: 2,
    area: 165,
    tag: "Alto Padrão",
    featured: true,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/202510191401247792.jpeg"
    ],
    description: "Casa de Alto Padrão à venda no Bairro São Pedro em Ibirité/MG. Se você está em busca de um imóvel que une elegância, conforto e localização valorizada, acabou de encontrar! 3 dormitórios (1 suíte), 2 banheiros e 2 vagas de garagem.",
    amenities: ["Acabamento Nobre", "Suíte Master", "São Pedro Ibirité", "Financiamento Caixa"]
  },
  // Locações
  {
    id: "prop-loc-4324277",
    code: "#4324277",
    title: "Apartamento para Locação no Masterville em Sarzedo",
    type: "apartamento",
    purpose: "locacao",
    price: 1250,
    priceFormatted: "R$ 1.250/mês",
    city: "Sarzedo",
    neighborhood: "Masterville",
    dorms: 2,
    baths: 1,
    suites: 0,
    garages: 1,
    area: 55,
    tag: "Locação Facilitada",
    featured: true,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/thumb15-2026081810532630.jpg"
    ],
    description: "Apartamento para locação em Sarzedo no bairro Masterville. 2 quartos, sala, cozinha com área de serviço conjugada, 1 banheiro e 1 vaga demarcada. Condomínio tranquilo. Aluguel sem burocracia com CredPago.",
    amenities: ["Aluguel Sem Fiador", "CredPago", "Condomínio Organizado", "Vaga Demarcada"]
  },
  {
    id: "prop-loc-4221693",
    code: "#4221693",
    title: "Apartamento Moderno para Aluguel no Cidade Verde",
    type: "apartamento",
    purpose: "locacao",
    price: 1100,
    priceFormatted: "R$ 1.100/mês",
    city: "Betim",
    neighborhood: "Cidade Verde",
    dorms: 2,
    baths: 1,
    suites: 0,
    garages: 1,
    area: 50,
    tag: "Pronto para Morar",
    featured: false,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/thumb15-202604301026052198.jpg"
    ],
    description: "Excelente apartamento de 2 quartos para locação em Betim, no bairro Cidade Verde. Ambiente arejado, bem iluminado e próximo ao transporte coletivo.",
    amenities: ["CredPago", "Excelente Custo-Benefício", "Betim"]
  },
  {
    id: "prop-loc-4320781",
    code: "#4320781",
    title: "Loja Comercial para Alugar no Lindéia (Barreiro)",
    type: "comercial",
    purpose: "locacao",
    price: 2400,
    priceFormatted: "R$ 2.400/mês",
    city: "Belo Horizonte",
    neighborhood: "Lindéia (Barreiro)",
    dorms: 0,
    baths: 1,
    suites: 0,
    garages: 2,
    area: 85,
    tag: "Ponto Comercial",
    featured: true,
    images: [
      "https://imgs1.cdn-imobibrasil.com.br/imagens/imoveis/thumb15-202608141331095154.jpg"
    ],
    description: "Loja comercial em excelente ponto de passagem no Lindéia, região do Barreiro em BH. 85m² de piso, porta de aço automática, 1 banheiro e recuo frontal para estacionamento de clientes.",
    amenities: ["Porta Automática", "Ponto Comercial", "Barreiro BH", "Alta Visibilidade"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ALINE_BARBOSA_INFO,
    BANK_PARTNERS,
    PROPERTIES_DATA
  };
}
