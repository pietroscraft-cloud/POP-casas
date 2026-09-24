import heroBg from '../assets/images/hero_architecture_bg_1790208965715.jpg';
import moocaImg from '../assets/images/imovel_mooca_1790208979656.jpg';
import tatuapeImg from '../assets/images/imovel_tatuape_1790208990595.jpg';
import vilaEmaImg from '../assets/images/imovel_vila_ema_1790209005144.jpg';

export interface Campaign {
  id: string;
  slug: 'mooca' | 'tatuape' | 'vila-ema';
  name: string;
  referenceCode: string;
  propertyType: string;
  address: string;
  neighborhood: string;
  cityState: string;
  tagline: string;
  description: string;
  formUrl: string;
  imageUrl: string;
  // Price and financial specifics (QuintoAndar / ZAP Imóveis model)
  priceFrom: string;
  rawPrice: number;
  pricePerSquareMeter: string;
  estimatedCondo: string;
  estimatedIptu: string;
  estimatedRent: string; // QuintoAndar benchmark
  downPaymentMin: string;
  constructionInstallmentMin: string;
  // Physical specs
  areaRange: string;
  minArea: number;
  bedrooms: string;
  bedroomsCount: number;
  bathrooms: string;
  parking: string;
  subwayDistance: string;
  stage: string;
  deliveryDate: string;
  tags: string[];
  keyFeatures: string[];
  amenities: string[];
  locationHighlight: string;
  neighborhoodVibe: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'campanha-mooca',
    slug: 'mooca',
    name: 'Palazzo Mooca Residencial',
    referenceCode: 'POP-MOO-2027',
    propertyType: 'Apartamento de 2 e 3 Quartos',
    address: 'Rua Juventus, 480',
    neighborhood: 'Mooca',
    cityState: 'São Paulo - SP',
    tagline: 'O encontro perfeito entre a tradição acolhedora e a arquitetura contemporânea',
    description:
      'Localizado no coração mais nobre da Mooca, o empreendimento resgata o charme das origens italianas aliado a acabamentos de alto padrão, amplas varandas gourmet com churrasqueira a carvão e um complexo de lazer completo para toda a família.',
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf6OSz2hva_TMxTNcVYZh5AGs2PevhDExRhKnPI_vOG3gSkqQ/viewform?usp=header',
    imageUrl: moocaImg,
    priceFrom: 'R$ 640.000',
    rawPrice: 640000,
    pricePerSquareMeter: 'R$ 9.410/m²',
    estimatedCondo: 'R$ 490/mês',
    estimatedIptu: 'R$ 145/mês',
    estimatedRent: 'R$ 3.850/mês',
    downPaymentMin: 'R$ 44.800',
    constructionInstallmentMin: 'R$ 2.450/mês',
    areaRange: '68m² a 112m²',
    minArea: 68,
    bedrooms: '2 a 3 Quartos (1 ou 2 Suítes)',
    bedroomsCount: 2,
    bathrooms: '2 a 3 Banheiros',
    parking: '1 ou 2 Vagas demarcadas',
    subwayDistance: '6 min do Metrô Bresser-Mooca',
    stage: 'Obras Aceleradas',
    deliveryDate: 'Junho de 2027',
    tags: [
      'Varanda com Churrasqueira',
      'Aceita FGTS',
      'Venda Direta Construtora',
      'Piscina Aquecida',
      'Pet Friendly',
      'Perto do Metrô',
    ],
    keyFeatures: [
      'Varanda gourmet ampla com churrasqueira a carvão',
      'Ponto individual para tomada de recarga de carro elétrico',
      'Persianas blackout 100% integradas nos dormitórios',
      'Tratamento acústico de laje para atenuação de ruídos',
      'Cozinha integrada com ventilação e iluminação natural',
    ],
    amenities: [
      'Piscina climatizada adulto com raia de 25m e infantil',
      'Espaço gastronômico Forneria Mooca com forno de pizza',
      'Fitness center moderno equipado com Life Fitness',
      'Quadra recreativa e espaço Beach Tennis',
      'Espaço Pet com circuito agility e pet wash',
    ],
    locationHighlight: 'A 500m do Clube Atlético Juventus e a 4 min do Hospital São Cristóvão e Mooca Plaza Shopping.',
    neighborhoodVibe: 'Tradição gastronômica, ruas calmas e arborizadas, excelente segurança comunitária e infraestrutura completa.',
    stats: [
      { label: 'Valorização média estimada', value: '+22% a.a.' },
      { label: 'Distância do Metrô Bresser', value: '6 min' },
      { label: 'Plantas inteligentes', value: '4 opções' },
    ],
  },
  {
    id: 'campanha-tatuape',
    slug: 'tatuape',
    name: 'Vanguard Tower Tatuapé',
    referenceCode: 'POP-TAT-3012',
    propertyType: 'Apartamento Alto Padrão de 3 e 4 Suítes',
    address: 'Rua Serra de Japi, 1250',
    neighborhood: 'Tatuapé',
    cityState: 'São Paulo - SP',
    tagline: 'O ápice da sofisticação e vista panorâmica no vetor de maior prestígio da Zona Leste',
    description:
      'Uma torre monumental pensada para quem exige exclusividade máxima. Apartamentos amplos com pé-direito duplo no living, suítes master com closet e banheira, rooftop panorâmico com piscina de borda infinita e infraestrutura inteligente para automação total.',
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScPVxyt5rVmXJ_8imnLf7esA4jHR6Qd2NAjt7CpqMnPTACkJw/viewform?usp=header',
    imageUrl: tatuapeImg,
    priceFrom: 'R$ 1.180.000',
    rawPrice: 1180000,
    pricePerSquareMeter: 'R$ 10.260/m²',
    estimatedCondo: 'R$ 890/mês',
    estimatedIptu: 'R$ 280/mês',
    estimatedRent: 'R$ 6.900/mês',
    downPaymentMin: 'R$ 82.600',
    constructionInstallmentMin: 'R$ 4.200/mês',
    areaRange: '115m² a 210m²',
    minArea: 115,
    bedrooms: '3 a 4 Suítes amplas',
    bedroomsCount: 3,
    bathrooms: '3 a 5 Banheiros',
    parking: '2 a 3 Vagas + Depósito privativo',
    subwayDistance: '4 min do Metrô Tatuapé / Carrão',
    stage: 'Lançamento Exclusivo',
    deliveryDate: 'Dezembro de 2027',
    tags: [
      'Pé-Direito Duplo',
      'Rooftop 360°',
      'Hall Privativo',
      'Ao Lado do Ceret',
      'Depósito Privativo',
      'Quadra de Tênis',
    ],
    keyFeatures: [
      'Pé-direito duplo de 5,60m no living principal',
      'Hall privativo exclusivo com elevador biométrico',
      'Infraestrutura para aspiração central e ar-condicionado VRF',
      'Fechaduras digitais inteligentes integradas à automação',
      'Terraço panorâmico com guarda-corpo envidraçado',
    ],
    amenities: [
      'Rooftop 360° com piscina de borda infinita aquecida',
      'Spa relaxante com sauna seca e hidromassagem',
      'Adega privativa climatizada com lockers individuais',
      'Coworking executivo com salas de conferência acústicas',
      'Quadra de tênis oficial em saibro iluminada',
    ],
    locationHighlight: 'Ao lado do Parque Ceret e a 3 min do Shopping Anália Franco e polo gastronômico da Rua Itapura.',
    neighborhoodVibe: 'O epicentro do alto padrão da Zona Leste, alta gastronomia, boutiques de luxo e liquidez imediata.',
    stats: [
      { label: 'Valorização histórica do bairro', value: '+34% triênio' },
      { label: 'Acesso ao Shopping Anália Franco', value: '3 min' },
      { label: 'Privacidade exclusiva', value: '2 por andar' },
    ],
  },
  {
    id: 'campanha-vila-ema',
    slug: 'vila-ema',
    name: 'Origem Parque Vila Ema',
    referenceCode: 'POP-EMA-1044',
    propertyType: 'Apartamento de 1 e 2 Quartos',
    address: 'Av. Vila Ema, 2180',
    neighborhood: 'Vila Ema',
    cityState: 'São Paulo - SP',
    tagline: 'Conectividade moderna, áreas verdes e o melhor custo-benefício para viver ou investir',
    description:
      'Desenvolvido com foco no bem-estar e na mobilidade urbana, o Origem Parque fica a passos da estação do Monotrilho Linha 15-Prata. Plantas versáteis com máximo aproveitamento de espaço, condomínio econômico com energia solar e áreas compartilhadas de alta conveniência.',
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSd8F3mIg2XRlHs9oom9tZ2GpMM0f_PL82tjNyybGLpwbbEODg/viewform?usp=header',
    imageUrl: vilaEmaImg,
    priceFrom: 'R$ 385.000',
    rawPrice: 385000,
    pricePerSquareMeter: 'R$ 8.750/m²',
    estimatedCondo: 'R$ 290/mês',
    estimatedIptu: 'R$ 85/mês',
    estimatedRent: 'R$ 2.450/mês',
    downPaymentMin: 'R$ 26.950',
    constructionInstallmentMin: 'R$ 1.390/mês',
    areaRange: '44m² a 68m²',
    minArea: 44,
    bedrooms: '1 e 2 Quartos (opção com Suíte)',
    bedroomsCount: 1,
    bathrooms: '1 a 2 Banheiros',
    parking: '1 Vaga coberta (ou opção sem vaga)',
    subwayDistance: '3 min a pé da Estação Oratório / São Lucas',
    stage: 'Pré-Lançamento com Condições Especiais',
    deliveryDate: 'Novembro de 2026',
    tags: [
      'A 250m do Monotrilho',
      'Minha Casa Minha Vida Elegível',
      'Varanda Gourmet',
      'Condomínio Econômico',
      'Mercadinho 24h',
      'Alto Retorno de Locação',
    ],
    keyFeatures: [
      'Janelas amplas com ventilação cruzada e luz natural abundante',
      'Ponto de ar-condicionado entregue na sala e dormitório',
      'Varanda gourmet com bancada em granito instalada',
      'Bacias sanitárias com sistema dual-flush econômico',
      'Medição individualizada de água, gás e energia',
    ],
    amenities: [
      'Piscina adulto e infantil com deck solarium',
      'Espaço Delivery com lockers refrigerados inteligentes',
      'Bicicletário com bancada de oficina e calibrador',
      'Espaço Funcional ao ar livre e salão de festas lounge',
      'Mercadinho autônomo 24h dentro do condomínio',
    ],
    locationHighlight: 'A apenas 250m da Estação São Lucas / Oratório (Linha 15-Prata), com ligação rápida à Linha 2-Verde (Paulista).',
    neighborhoodVibe: 'Região tranquila e residencial com forte expansão, comércio tradicional e mobilidade expressa.',
    stats: [
      { label: 'Caminhada até o Monotrilho', value: '3 min' },
      { label: 'Tempo até a Av. Paulista', value: '25 min' },
      { label: 'Rendimento estimado para locação', value: '0,65% a.m.' },
    ],
  },
];

export { heroBg };
