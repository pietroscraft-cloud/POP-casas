import React, { useState } from 'react';
import { Compass, Train, Coffee, TrendingUp, Check } from 'lucide-react';
import { CAMPAIGNS, Campaign } from '../data/campaigns';

interface NeighborhoodComparisonProps {
  onSelectCampaign: (slug: 'mooca' | 'tatuape' | 'vila-ema') => void;
}

export const NeighborhoodComparison: React.FC<NeighborhoodComparisonProps> = ({
  onSelectCampaign,
}) => {
  const [activeTab, setActiveTab] = useState<'mooca' | 'tatuape' | 'vila-ema'>('mooca');

  const neighborhoodDetails = {
    mooca: {
      title: 'Mooca',
      subtitle: 'Tradição, Gastronomia e Convivência Familiar',
      description:
        'Um dos bairros mais carismáticos de São Paulo. A Mooca combina a atmosfera acolhedora de vilas históricas italianas com a modernização de novas avenidas, parques e os melhores restaurantes da cidade. Ideal para quem busca raízes fortes, segurança e aconchego.',
      features: [
        'Polo gastronômico incomparável (San Gennaro, Di Cunto, cantinas históricas)',
        'Clube Atlético Juventus e praças arborizadas a poucos metros',
        'Acesso imediato à Radial Leste, Av. do Estado e Salim Farah Maluf',
        'Bairro consolidado com baixíssima volatilidade e valorização perene',
      ],
      profile: 'Famílias que valorizam espaço, raízes e convivência comunitária de qualidade.',
      campaignSlug: 'mooca' as const,
    },
    tatuape: {
      title: 'Tatuapé',
      subtitle: 'O Epicentro do Luxo e Sofisticação da Zona Leste',
      description:
        'Referência máxima em infraestrutura de alto padrão na capital paulista. O Tatuapé reúne os maiores e mais valiosos edifícios da Zona Leste, shoppings premiados, boutiques exclusivas e os restaurantes mais prestigiados da Rua Itapura e Anália Franco.',
      features: [
        'Proximidade do Parque Ceret e Shopping Anália Franco',
        'Centro corporativo com hospitais de excelência (São Luiz e Cema)',
        'Vida noturna premium, empórios gourmets e academias de grife',
        'Maior potencial de revenda e liquidez imediata para alto padrão',
      ],
      profile: 'Profissionais e investidores que exigem exclusividade máxima, vistas abertas e status.',
      campaignSlug: 'tatuape' as const,
    },
    'vila-ema': {
      title: 'Vila Ema',
      subtitle: 'Mobilidade Inteligente, Tranquilidade e Alto Custo-Benefício',
      description:
        'Em plena ascensão urbana, a Vila Ema se transformou em uma das regiões mais cobiçadas por jovens casais e investidores. A integração perfeita com a Linha 15-Prata permite acesso direto e descomplicado à Av. Paulista em minutos.',
      features: [
        'Acesso a pé à Estação São Lucas / Oratório do Monotrilho',
        'Valor do m² atrativo com margem de valorização superior à média da cidade',
        'Comércio vibrante e autossuficiente na Av. Vila Ema',
        'Bairro predominantemente residencial, calmo e com excelente retorno de aluguel',
      ],
      profile: 'Primeiro imóvel de alto padrão, jovens casais ou investidores focados em renda de aluguel.',
      campaignSlug: 'vila-ema' as const,
    },
  };

  const current = neighborhoodDetails[activeTab];

  return (
    <section id="bairros" className="py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Análise Geográfica & Estilo de Vida
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light text-neutral-50 [text-wrap:balance]">
            Qual endereço reflete melhor os seus objetivos?
          </h2>
          <p className="mt-4 text-sm text-neutral-400">
            A Zona Leste possui vocações distintas. Conheça as particularidades de cada bairro antes de preencher o formulário de reserva.
          </p>
        </div>

        {/* Tab Controls (Segmented control) */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-900/80 border border-white/10 rounded-lg max-w-lg mb-10">
          <button
            onClick={() => setActiveTab('mooca')}
            className={`flex-1 py-2.5 px-4 text-xs font-semibold tracking-wider uppercase rounded-md transition-colors ${
              activeTab === 'mooca'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Mooca
          </button>
          <button
            onClick={() => setActiveTab('tatuape')}
            className={`flex-1 py-2.5 px-4 text-xs font-semibold tracking-wider uppercase rounded-md transition-colors ${
              activeTab === 'tatuape'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Tatuapé
          </button>
          <button
            onClick={() => setActiveTab('vila-ema')}
            className={`flex-1 py-2.5 px-4 text-xs font-semibold tracking-wider uppercase rounded-md transition-colors ${
              activeTab === 'vila-ema'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Vila Ema
          </button>
        </div>

        {/* Tab Content Box */}
        <div className="bg-neutral-900/40 border border-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
                  {current.title} · Panorama Regional
                </span>
                <h3 className="font-display text-2xl lg:text-3xl text-neutral-50 mt-1">
                  {current.subtitle}
                </h3>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                {current.description}
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                  Pontos Fortes da Região:
                </span>
                {current.features.map((feat, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-neutral-950/80 border border-white/10 rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                  Perfil Ideal de Comprador:
                </span>
                <p className="text-xs text-neutral-200 leading-relaxed font-light">
                  {current.profile}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                  Empreendimento em Destaque:
                </span>
                <div className="text-neutral-100 font-display text-lg">
                  {CAMPAIGNS.find((c) => c.slug === current.campaignSlug)?.name}
                </div>
                <div className="text-xs text-amber-300 font-mono">
                  {CAMPAIGNS.find((c) => c.slug === current.campaignSlug)?.priceFrom}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      onSelectCampaign(current.campaignSlug);
                      const el = document.getElementById('campanhas');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors text-center block"
                  >
                    Ver Projeto de {current.title}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
