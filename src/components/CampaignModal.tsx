import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  MessageSquare,
  ShieldCheck,
  Maximize2,
  Minimize2,
  RotateCcw,
  FileText,
  Building2,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Campaign, CAMPAIGNS } from '../data/campaigns';

interface CampaignModalProps {
  campaign: Campaign | null;
  onClose: () => void;
  onSelectCampaign?: (campaign: Campaign) => void;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({
  campaign: initialCampaign,
  onClose,
  onSelectCampaign,
}) => {
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(initialCampaign);
  const [activeTab, setActiveTab] = useState<'form' | 'rapido' | 'dossie'>('form');
  const [copied, setCopied] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Quick form states
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPreference, setLeadPreference] = useState('');
  const [leadFgts, setLeadFgts] = useState('sim');
  const [leadMessage, setLeadMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setCurrentCampaign(initialCampaign);
    setIframeLoading(true);
    setFormSubmitted(false);
  }, [initialCampaign]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!currentCampaign) return null;

  // Convert normal form URL to embed URL (?embedded=true)
  const embedUrl = currentCampaign.formUrl.includes('?')
    ? currentCampaign.formUrl.replace(/\?.*$/, '?embedded=true')
    : `${currentCampaign.formUrl}?embedded=true`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCampaign.formUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReloadIframe = () => {
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleSwitchCampaign = (camp: Campaign) => {
    setCurrentCampaign(camp);
    setIframeLoading(true);
    setFormSubmitted(false);
    if (onSelectCampaign) onSelectCampaign(camp);
  };

  const handleQuickFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    setFormSubmitted(true);

    const text = encodeURIComponent(
      `*Cadastro Pop Casas - ${currentCampaign.name} (${currentCampaign.neighborhood})*\n\n` +
        `👤 *Nome:* ${leadName}\n` +
        `📱 *WhatsApp:* ${leadPhone}\n` +
        `✉️ *E-mail:* ${leadEmail || 'Não informado'}\n` +
        `🏠 *Perfil:* ${leadPreference || currentCampaign.bedrooms}\n` +
        `💰 *Utiliza FGTS:* ${leadFgts}\n` +
        (leadMessage ? `📝 *Observação:* ${leadMessage}\n` : '') +
        `🔗 *Link do Formulário:* ${currentCampaign.formUrl}`
    );

    const whatsappUrl = `https://wa.me/5511999999999?text=${text}`;

    // Small delay to show feedback, then offer WhatsApp or direct completion
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  const whatsappInquiryUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(
    `Olá! Estou visualizando o ${currentCampaign.name} no site da Pop Casas e gostaria de receber a tabela de preços e metragens disponíveis.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-100 transition-all duration-300 ${
          isFullscreen
            ? 'w-[98vw] h-[96vh] max-w-none max-h-none'
            : 'max-w-5xl h-[90vh] max-h-[880px]'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-neutral-950/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-bold shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                <span>Pop Casas · {currentCampaign.neighborhood}</span>
                <span className="text-neutral-500 font-mono">|</span>
                <span className="text-neutral-400 font-normal">{currentCampaign.stage}</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl text-neutral-100 font-medium">
                {currentCampaign.name}
              </h3>
            </div>
          </div>

          {/* Quick switcher between the 3 properties */}
          <div className="hidden sm:flex items-center p-1 bg-neutral-900 border border-white/10 rounded-lg text-xs">
            {CAMPAIGNS.map((c) => {
              const active = c.slug === currentCampaign.slug;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSwitchCampaign(c)}
                  className={`px-3 py-1.5 rounded font-medium transition-colors ${
                    active
                      ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {c.neighborhood}
                </button>
              );
            })}
          </div>

          {/* Header Action Icons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg transition-colors border border-white/5"
              title="Copiar link oficial do Google Forms"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hidden md:inline-flex p-2 text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg transition-colors border border-white/5"
              title={isFullscreen ? 'Restaurar tamanho' : 'Modo tela cheia'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg transition-colors border border-white/5"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Tabs (Visualizar no Site Options) */}
        <div className="px-4 sm:px-6 py-2.5 bg-neutral-950/60 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-neutral-900/90 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-colors ${
                activeTab === 'form'
                  ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Formulário Oficial (Google)</span>
            </button>

            <button
              onClick={() => setActiveTab('rapido')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-colors ${
                activeTab === 'rapido'
                  ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Ficha Rápida no Site</span>
            </button>

            <button
              onClick={() => setActiveTab('dossie')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-colors ${
                activeTab === 'dossie'
                  ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Dossiê & Ficha Técnica</span>
            </button>
          </div>

          {/* Direct External Action Bar */}
          <div className="flex items-center gap-2">
            {activeTab === 'form' && (
              <button
                onClick={handleReloadIframe}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-neutral-400 hover:text-white bg-neutral-900 border border-white/10 rounded transition-colors"
                title="Recarregar formulário"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Recarregar</span>
              </button>
            )}

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30 font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <a
              href={currentCampaign.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold transition-colors shadow-sm"
            >
              <span>Abrir em Nova Guia</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Tab 1: Google Form Iframe Mode */}
        {activeTab === 'form' && (
          <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-neutral-950/70 flex flex-col items-center relative">
            {/* Informative alert banner */}
            <div className="w-full max-w-4xl mb-3 px-4 py-2 bg-neutral-900/90 border border-white/10 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Visualizando o formulário oficial protegido da campanha <strong>{currentCampaign.neighborhood}</strong>.
                </span>
              </div>
              <div className="text-neutral-400 text-[11px]">
                Se preferir um envio expresso, use a aba{' '}
                <button
                  onClick={() => setActiveTab('rapido')}
                  className="text-amber-400 underline font-medium"
                >
                  Ficha Rápida
                </button>
              </div>
            </div>

            {/* Embedded Iframe Container */}
            <div className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl min-h-[580px] flex-1">
              {iframeLoading && (
                <div className="absolute inset-0 z-10 bg-neutral-900/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-neutral-300 p-6 text-center">
                  <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-medium text-neutral-200">
                    Carregando formulário oficial da {currentCampaign.neighborhood}...
                  </p>
                  <p className="text-xs text-neutral-400 max-w-sm">
                    Conectando com segurança aos servidores do Google Forms.
                  </p>
                </div>
              )}

              <iframe
                key={iframeKey}
                src={embedUrl}
                title={`Formulário oficial Pop Casas - ${currentCampaign.name}`}
                className="w-full h-full min-h-[640px] border-0"
                onLoad={() => setIframeLoading(false)}
              >
                Carregando formulário oficial...
              </iframe>
            </div>

            {/* Footer helper */}
            <div className="mt-3 text-center text-xs text-neutral-400 max-w-lg pb-1">
              Caso seu navegador bloqueie iframes com proteções de privacidade,{' '}
              <a
                href={currentCampaign.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline font-semibold inline-flex items-center gap-1"
              >
                clique para abrir o Google Forms em tela inteira
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: Ficha Rápida no Site (Native Fast Form) */}
        {activeTab === 'rapido' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-neutral-950/60 flex flex-col items-center justify-start">
            <div className="w-full max-w-2xl bg-neutral-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
              {formSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-2xl text-neutral-50">
                    Pré-Reserva Recebida com Prioridade!
                  </h4>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Obrigado, <strong className="text-amber-300">{leadName}</strong>! Um consultor especializado no empreendimento <strong>{currentCampaign.name}</strong> entrará em contato com você via WhatsApp ({leadPhone}).
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Falar no WhatsApp Agora</span>
                    </a>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors"
                    >
                      Novo Cadastro
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Envio Expresso Pop Casas</span>
                  </div>
                  <h4 className="font-display text-2xl text-neutral-50">
                    Ficha de Interesse · {currentCampaign.name}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 mb-6">
                    Preencha seus dados abaixo para receber tabela de valores, plantas detalhadas e condições de lançamento com prioridade de escolha.
                  </p>

                  <form onSubmit={handleQuickFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1.5">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="Seu nome"
                          className="w-full bg-neutral-950 border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1.5">
                          WhatsApp com DDD *
                        </label>
                        <input
                          type="tel"
                          required
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full bg-neutral-950 border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1.5">
                          E-mail
                        </label>
                        <input
                          type="email"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="voce@email.com"
                          className="w-full bg-neutral-950 border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1.5">
                          Pretende Usar FGTS?
                        </label>
                        <select
                          value={leadFgts}
                          onChange={(e) => setLeadFgts(e.target.value)}
                          className="w-full bg-neutral-950 border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
                        >
                          <option value="sim">Sim, quero utilizar meu saldo</option>
                          <option value="nao">Não pretendo usar</option>
                          <option value="duvida">Tenho dúvidas / Quero consultar</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1.5">
                        Tipologia de Interesse ({currentCampaign.neighborhood})
                      </label>
                      <input
                        type="text"
                        value={leadPreference}
                        onChange={(e) => setLeadPreference(e.target.value)}
                        placeholder={`Ex: ${currentCampaign.bedrooms} (${currentCampaign.areaRange})`}
                        className="w-full bg-neutral-950 border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1.5">
                        Mensagem ou Dúvida Específica (opcional)
                      </label>
                      <textarea
                        rows={3}
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        placeholder="Ex: Gostaria de saber o valor do andar médio e fluxo de entrada durante as obras."
                        className="w-full bg-neutral-950 border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Enviar Ficha e Receber Material Completo</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-neutral-400 text-center font-light">
                      Ao enviar, você garante prioridade de escolha e atendimento sem intermediários.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Dossiê & Ficha Técnica */}
        {activeTab === 'dossie' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-neutral-950/60">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Hero Image + Quick Overview */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 h-64 sm:h-80 bg-neutral-950 group">
                <img
                  src={currentCampaign.imageUrl}
                  alt={currentCampaign.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold bg-neutral-950/80 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                      {currentCampaign.neighborhood}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-neutral-50 mt-2">
                      {currentCampaign.name}
                    </h3>
                    <p className="text-xs text-neutral-300 max-w-xl mt-1">
                      {currentCampaign.tagline}
                    </p>
                  </div>
                  <div className="text-right sm:text-right">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">
                      Valores a partir de
                    </span>
                    <span className="font-display text-2xl sm:text-3xl text-amber-300 font-bold font-mono tabular-nums">
                      {currentCampaign.priceFrom}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-neutral-900/80 border border-white/10 rounded-xl">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">
                    Metragem
                  </span>
                  <span className="font-mono text-base font-semibold text-neutral-100 mt-1 block">
                    {currentCampaign.areaRange}
                  </span>
                </div>
                <div className="p-4 bg-neutral-900/80 border border-white/10 rounded-xl">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">
                    Dormitórios
                  </span>
                  <span className="text-sm font-semibold text-neutral-100 mt-1 block">
                    {currentCampaign.bedrooms}
                  </span>
                </div>
                <div className="p-4 bg-neutral-900/80 border border-white/10 rounded-xl">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">
                    Vagas
                  </span>
                  <span className="text-sm font-semibold text-neutral-100 mt-1 block">
                    {currentCampaign.parking}
                  </span>
                </div>
                <div className="p-4 bg-neutral-900/80 border border-white/10 rounded-xl">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">
                    Previsão de Entrega
                  </span>
                  <span className="font-mono text-sm font-semibold text-amber-400 mt-1 block">
                    {currentCampaign.deliveryDate}
                  </span>
                </div>
              </div>

              {/* Differentials & Amenities side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-neutral-900/80 border border-white/10 rounded-xl space-y-4">
                  <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Diferenciais Construtivos
                  </h4>
                  <div className="space-y-2.5">
                    {currentCampaign.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-neutral-900/80 border border-white/10 rounded-xl space-y-4">
                  <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Áreas de Lazer & Serviços
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentCampaign.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="bg-neutral-950 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-neutral-300"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                      Localização Estratégica:
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {currentCampaign.locationHighlight}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons inside dossier */}
              <div className="p-6 bg-neutral-900/90 border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="font-display text-lg text-neutral-100">
                    Deseja prosseguir com a reserva?
                  </h5>
                  <p className="text-xs text-neutral-400">
                    Escolha preencher o formulário oficial do Google ou preencha a ficha rápida.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab('rapido')}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-200 transition-colors"
                  >
                    Ficha Rápida
                  </button>
                  <button
                    onClick={() => setActiveTab('form')}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    Formulário Oficial
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
