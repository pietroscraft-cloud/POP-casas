import React from 'react';
import { ArrowDown, MapPin, Sparkles } from 'lucide-react';
import { CAMPAIGNS } from '../data/campaigns';

interface HeroProps {
  onSelectCampaign: (slug: 'mooca' | 'tatuape' | 'vila-ema') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCampaign }) => {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Subtle kicker */}
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-400 font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Lançamentos Residenciais Exclusivos em São Paulo</span>
          <span aria-hidden="true">·</span>
          <span className="text-neutral-400">Zona Leste Nobre</span>
        </div>

        {/* Display Headline */}
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-neutral-50 leading-[1.08] [text-wrap:balance]">
            Arquitetura autoral e alto padrão nos bairros mais cobiçados da cidade.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl">
            Descubra três experiências de moradia cuidadosamente projetadas para o seu estilo de vida: a tradição acolhedora da <strong className="text-amber-300 font-medium">Mooca</strong>, a imponência e vista do <strong className="text-amber-300 font-medium">Tatuapé</strong>, e a tranquilidade conectada da <strong className="text-amber-300 font-medium">Vila Ema</strong>.
          </p>
        </div>

        {/* Quick Campaign Switcher / Selector Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {CAMPAIGNS.map((camp) => (
            <div
              key={camp.slug}
              onClick={() => onSelectCampaign(camp.slug)}
              className="group cursor-pointer text-left p-6 rounded-lg bg-neutral-900/60 hover:bg-neutral-900/90 border border-white/10 hover:border-amber-400/50 backdrop-blur-sm transition-colors duration-200"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  {camp.neighborhood}
                </span>
                <span className="text-neutral-500 font-mono tracking-wider">{camp.stage}</span>
              </div>

              <h2 className="font-display text-2xl text-neutral-100 group-hover:text-amber-300 transition-colors">
                {camp.name}
              </h2>

              <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {camp.tagline}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-neutral-300 font-mono tabular-nums font-medium">
                  {camp.priceFrom}
                </span>
                <span className="text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
                  Explorar Detalhes →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Micro-metrics & trust bar */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-neutral-400">
          <div>
            <div className="text-2xl lg:text-3xl font-display text-neutral-100 font-light tabular-nums">
              3 Projetos
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1">
              Curadoria de Lançamentos
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-display text-neutral-100 font-light tabular-nums">
              R$ 385 mil
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1">
              Valores a partir de
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-display text-neutral-100 font-light tabular-nums">
              100% Digital
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1">
              Cadastro e Reserva Online
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-display text-neutral-100 font-light tabular-nums">
              Direto com Incorporadora
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1">
              Condições Pré-Lançamento
            </div>
          </div>
        </div>

        {/* Scroll affordance */}
        <div className="mt-12 flex justify-center">
          <a
            href="#campanhas"
            className="flex flex-col items-center gap-2 text-xs text-neutral-400 hover:text-amber-300 transition-colors"
          >
            <span>Conheça as três campanhas</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
