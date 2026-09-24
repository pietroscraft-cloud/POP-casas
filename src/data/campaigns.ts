import heroBg from '../assets/images/hero_architecture_bg_1790208965715.jpg';
import moocaImg from '../assets/images/imovel_mooca_1790208979656.jpg';
import tatuapeImg from '../assets/images/imovel_tatuape_1790208990595.jpg';
import vilaEmaImg from '../assets/images/imovel_vila_ema_1790209005144.jpg';

export interface Campaign {
  id: string;
  slug: 'mooca' | 'tatuape' | 'vila-ema';
  name: string;
  neighborhood: string;
  tagline: string;
  description: string;
  formUrl: string;
  imageUrl: string;
  priceFrom: string;
  rawPrice: number;
  areaRange: string;
  bedrooms: string;
  parking: string;
  stage: string;
  deliveryDate: string;
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
    neighborhood: 'Mooca',
    tagline: 'O encontro perfeito entre a tradição acolhedora e a arquitetura contemporânea',
    description:
      'Localizado no coração mais nobre da Mooca, o empreendimento resgata o charme das origens italianas aliado a acabamentos de alto padrão, amplas varandas gourmet com churrasqueira a carvão e um complexo de lazer completo para toda a família.',
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf6OSz2hva_TMxTNcVYZh5AGs2PevhDExRhKnPI_vOG3gSkqQ/viewform?usp=header',
    imageUrl: moocaImg,
    priceFrom: 'R$ 640.000',
    rawPrice: 640000,
    areaRange: '68m² a 112m²',
    bedrooms: '2 a 3 Dorms (1 ou 2 Suítes)',
    parking: '1 ou 2 Vagas demarcadas',
    stage: 'Obras Aceleradas',
    deliveryDate: 'Junho de 2027',
    keyFeatures: [
      'Varanda gourmet ampla com churrasqueira',
      'Ponto para tomada de carro elétrico individual',
      'Persianas blackout 100% integradas',
      'Piso com tratamento acústico atenuado',
      'Cozinha com ventilação natural direta',
    ],
    amenities: [
      'Piscina aquecida com raia de 25m',
      'Espaço gastronômico Forneria Mooca',
      'Fitness center com equipamentos Life Fitness',
      'Quadra recreativa e Beach Tennis',
      'Espaço Pet com agility e pet wash',
    ],
    locationHighlight: 'A 500m da Rua Juventus e a 4 min do Hospital São Cristóvão e Mooca Plaza Shopping.',
    neighborhoodVibe: 'Tradição gastronômica, ruas arborizadas, segurança comunitária e facilidade de locomoção.',
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
    neighborhood: 'Tatuapé',
    tagline: 'O ápice da sofisticação e vista panorâmica no vetor de maior prestígio da Zona Leste',
    description:
      'Uma torre monumental pensada para quem exige exclusividade máxima. Apartamentos amplos com pé-direito duplo no living, suítes master com closet e banheira, rooftop panorâmico com piscina de borda infinita e infraestrutura inteligente para automação total.',
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScPVxyt5rVmXJ_8imnLf7esA4jHR6Qd2NAjt7CpqMnPTACkJw/viewform?usp=header',
    imageUrl: tatuapeImg,
    priceFrom: 'R$ 1.180.000',
    rawPrice: 1180000,
    areaRange: '115m² a 210m²',
    bedrooms: '3 a 4 Suítes amplas',
    parking: '2 a 3 Vagas + Depósito privativo',
    stage: 'Lançamento Exclusivo',
    deliveryDate: 'Dezembro de 2027',
    keyFeatures: [
      'Pé-direito duplo de 5,60m no living',
      'Hall privativo com elevador biométrico',
      'Infraestrutura para aspiração central e ar VRF',
      'Fechaduras digitais integradas à Alexa/Google',
      'Terraço panorâmico com guarda-corpo envidraçado',
    ],
    amenities: [
      'Rooftop 360° com piscina de borda infinita',
      'Spa relaxante com sauna seca e hidromassagem',
      'Adega privativa com lockers refrigerados',
      'Coworking executivo com salas de conferência acústicas',
      'Quadra de tênis oficial de saibro',
    ],
    locationHighlight: 'Ao lado do Parque Ceret e a 3 min do Shopping Anália Franco e polo gastronômico da Itapura.',
    neighborhoodVibe: 'O epicentro do alto padrão da Zona Leste, vida noturna premium, grifes e alta liquidez.',
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
    neighborhood: 'Vila Ema',
    tagline: 'Conectividade moderna, áreas verdes e o melhor custo-benefício para viver ou investir',
    description:
      'Desenvolvido com foco no bem-estar e na mobilidade urbana, o Origem Parque fica a passos da estação do Monotrilho Linha 15-Prata. Plantas versáteis com máximo aproveitamento de espaço, condomínio econômico com energia solar e áreas compartilhadas de alta conveniência.',
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSd8F3mIg2XRlHs9oom9tZ2GpMM0f_PL82tjNyybGLpwbbEODg/viewform?usp=header',
    imageUrl: vilaEmaImg,
    priceFrom: 'R$ 385.000',
    rawPrice: 385000,
    areaRange: '44m² a 68m²',
    bedrooms: '1 e 2 Dorms (opção com Suíte)',
    parking: '1 Vaga coberta (ou opção sem vaga)',
    stage: 'Pré-Lançamento com Condições Especiais',
    deliveryDate: 'Novembro de 2026',
    keyFeatures: [
      'Janelas amplas com ventilação cruzada e luz natural',
      'Ponto de ar-condicionado na sala e suíte',
      'Varanda gourmet com bancada em granito instalada',
      'Bacias sanitárias com sistema dual-flush econômico',
      'Medição individualizada de água e gás',
    ],
    amenities: [
      'Piscina adulto e infantil com deck solarium',
      'Espaço Delivery com lockers refrigerados inteligentes',
      'Bicicletário com oficina e calibrador de pneus',
      'Espaço Funcional ao ar livre e salão de festas lounge',
      'Mercadinho autônomo 24h dentro do condomínio',
    ],
    locationHighlight: 'A apenas 250m da Estação São Lucas / Oratório (Linha 15-Prata), com ligação rápida à Linha 2-Verde (Paulista).',
    neighborhoodVibe: 'Região tranquila e residencial com forte expansão, comércio tradicional e mobilidade metroviária expressa.',
    stats: [
      { label: 'Caminhada até o Monotrilho', value: '3 min' },
      { label: 'Tempo até a Av. Paulista', value: '25 min' },
      { label: 'Rendimento estimado para locação', value: '0,65% a.m.' },
    ],
  },
];

export { heroBg };
