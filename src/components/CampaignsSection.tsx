import React, { useState } from 'react';
import {
  ExternalLink,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  Maximize2,
  FileText,
  Share2,
  Check,
} from 'lucide-react';
import { CAMPAIGNS, Campaign } from '../data/campaigns';

interface CampaignsSectionProps {
  selectedSlug: string;
  onSelectSlug: (slug: 'mooca' | 'tatuape' | 'vila-ema') => void;
  onOpenModal: (campaign: Campaign) => void;
  onOpenSimulation: (campaign: Campaign) => void;
}

export const CampaignsSection: React.FC<CampaignsSectionProps> = ({
  selectedSlug,
  onSelectSlug,
  onOpenModal,
  onOpenSimulation,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeCampaign =
    CAMPAIGNS.find((c) => c.slug === selectedSlug) || CAMPAIGNS[0];

  const handleCopyLink = (campaign: Campaign) => {
    navigator.clipboard.writeText(campaign.formUrl);
    setCopiedId(campaign.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="campanhas" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Campanhas Ativas & Cadastro Exclusivo
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-light text-neutral-50 [text-wrap:balance]">
              Três endereços singulares. Escolha o seu próximo patamar.
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Cada campanha possui formulário oficial próprio com prioridade para escolha de unidades, tabelas de lançamento e atendimento direto da equipe de incorporação.
          </p>
        </div>

        {/* Interactive Campaign Filter Tabs (functional segmented control) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-900/80 border border-white/10 rounded-lg max-w-xl mb-12">
          {CAMPAIGNS.map((camp) => {
            const isActive = camp.slug === activeCampaign.slug;
            return (
              <button
                key={camp.slug}
                onClick={() => onSelectSlug(camp.slug)}
                className={`flex-1 min-w-[140px] px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-md ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {camp.neighborhood}
              </button>
            );
          })}
        </div>

        {/* Featured Campaign Spotlight */}
        <div className="bg-neutral-900/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Col with image and fallback */}
            <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[580px] overflow-hidden bg-neutral-900 group">
              <img
                src={activeCampaign.imageUrl}
                alt={activeCampaign.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

              {/* Badgeless subtle status text */}
              <div className="absolute top-6 left-6 flex items-center gap-3 text-xs text-neutral-300">
                <span className="font-medium text-amber-300 bg-neutral-950/80 px-3 py-1 rounded backdrop-blur-sm border border-white/10">
                  {activeCampaign.stage}
                </span>
                <span className="bg-neutral-950/80 px-3 py-1 rounded backdrop-blur-sm border border-white/10 text-neutral-300 font-mono">
                  Entrega: {activeCampaign.deliveryDate}
                </span>
              </div>

              {/* Quick specs at base of image */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-4 text-xs text-neutral-200">
                <div className="bg-neutral-950/85 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 font-mono tabular-nums">
                  {activeCampaign.areaRange}
                </div>
                <div className="bg-neutral-950/85 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                  {activeCampaign.bedrooms}
                </div>
                <div className="bg-neutral-950/85 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                  {activeCampaign.parking}
                </div>
              </div>
            </div>

            {/* Campaign Content and Action Deck */}
            <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>São Paulo · {activeCampaign.neighborhood}</span>
                </div>

                <h3 className="font-display text-3xl lg:text-4xl text-neutral-50 mb-3">
                  {activeCampaign.name}
                </h3>

                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                  {activeCampaign.description}
                </p>

                {/* Key architectural highlights */}
                <div className="space-y-2 mb-8">
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                    Diferenciais Construtivos do Projeto
                  </h4>
                  {activeCampaign.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Amenities overview */}
                <div className="p-4 rounded-lg bg-neutral-950/60 border border-white/5 mb-8">
                  <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    Lazer & Conveniência Exclusiva
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
                    {activeCampaign.amenities.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-neutral-900 border border-white/10 px-2.5 py-1 rounded text-neutral-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location indicator */}
                <div className="text-xs text-neutral-400 mb-8 border-l-2 border-amber-400/60 pl-3">
                  <strong className="text-neutral-200 block mb-0.5">Localização Estratégica:</strong>
                  {activeCampaign.locationHighlight}
                </div>
              </div>

              {/* Price & Primary CTA Block */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider block">
                      Valores a partir de
                    </span>
                    <span className="font-display text-2xl lg:text-3xl font-normal text-amber-300 tabular-nums">
                      {activeCampaign.priceFrom}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenSimulation(activeCampaign)}
                      className="px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-white/15 rounded transition-colors whitespace-nowrap"
                    >
                      Simular Fluxo
                    </button>
                    <button
                      onClick={() => handleCopyLink(activeCampaign)}
                      className="p-2.5 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-white/15 rounded transition-colors"
                      title="Copiar link do formulário da campanha"
                    >
                      {copiedId === activeCampaign.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Direct link to the campaign's exact Google Form */}
                  <a
                    href={activeCampaign.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded shadow-md transition-colors whitespace-nowrap"
                  >
                    <span>Acessar Formulário Oficial</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Open in embedded modal for seamless in-app preview */}
                  <button
                    onClick={() => onOpenModal(activeCampaign)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 border border-white/10 rounded transition-colors whitespace-nowrap"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Visualizar no Site</span>
                  </button>
                </div>

                <p className="text-[11px] text-neutral-400 text-center font-light">
                  Formulário oficial do Google Forms garantindo confidencialidade direta da incorporadora.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Campaign Overview Grid for complete side-by-side transparency */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-display text-2xl md:text-3xl text-neutral-100">
              Panorama Completo das 3 Campanhas
            </h3>
            <p className="text-xs text-neutral-400 mt-2">
              Compare as características essenciais e acerte na sua escolha imobiliária.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAMPAIGNS.map((camp) => (
              <div
                key={camp.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                  camp.slug === activeCampaign.slug
                    ? 'border-amber-400/50 bg-neutral-900/80 shadow-lg'
                    : 'border-white/10 bg-neutral-900/40 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-neutral-950">
                    <img
                      src={camp.imageUrl}
                      alt={camp.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm border border-white/10 px-2.5 py-0.5 rounded text-[11px] text-amber-300 font-medium">
                      {camp.neighborhood}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="font-display text-xl text-neutral-100">{camp.name}</h4>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                        {camp.tagline}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-neutral-300 border-t border-b border-white/10 py-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Metragens:</span>
                        <span className="font-mono tabular-nums">{camp.areaRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Dormitórios:</span>
                        <span>{camp.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Estágio:</span>
                        <span className="text-amber-400">{camp.stage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Investimento:</span>
                        <span className="font-mono tabular-nums font-semibold text-neutral-100">
                          {camp.priceFrom}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                        Destaque:
                      </span>
                      <p className="text-xs text-neutral-300 font-light">
                        {camp.locationHighlight}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2">
                  <a
                    href={camp.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold tracking-wider uppercase text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors whitespace-nowrap"
                  >
                    <span>Formulário {camp.neighborhood}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        onSelectSlug(camp.slug);
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }}
                      className="py-2 text-[11px] font-medium text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded transition-colors"
                    >
                      Ver Detalhes
                    </button>
                    <button
                      onClick={() => onOpenSimulation(camp)}
                      className="py-2 text-[11px] font-medium text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded transition-colors"
                    >
                      Simulador
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
