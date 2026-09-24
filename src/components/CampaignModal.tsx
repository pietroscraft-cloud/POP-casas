import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Copy, Check, MessageSquare, ShieldCheck } from 'lucide-react';
import { Campaign } from '../data/campaigns';

interface CampaignModalProps {
  campaign: Campaign | null;
  onClose: () => void;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({ campaign, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!campaign) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(campaign.formUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de receber mais informações e a tabela de valores do empreendimento ${campaign.name} (${campaign.neighborhood}). Link do formulário: ${campaign.formUrl}`
  );
  const whatsappUrl = `https://wa.me/5511999999999?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-neutral-950/70">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
              <span>Campanha Oficial</span>
              <span aria-hidden="true">·</span>
              <span>{campaign.neighborhood}</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl text-neutral-100 mt-0.5">
              {campaign.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg transition-colors border border-white/5"
              title="Copiar link do formulário"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg transition-colors border border-white/5"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Notice / Action Strip */}
        <div className="px-4 sm:px-6 py-3 bg-neutral-950/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Preencha abaixo ou abra diretamente no Google Forms</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direto</span>
            </a>
            <a
              href={campaign.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold transition-colors shadow-sm"
            >
              <span>Abrir em Nova Guia</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Modal Body: Google Form Iframe & Fallback */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-neutral-950/60 flex flex-col items-center">
          <div className="w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-inner my-2">
            <iframe
              src={campaign.formUrl}
              title={`Formulário de cadastro ${campaign.name}`}
              className="w-full h-[620px] border-0"
              onError={() => setIframeError(true)}
            >
              Carregando formulário oficial...
            </iframe>
          </div>

          {/* Guarantee for users */}
          <div className="mt-4 mb-2 text-center text-xs text-neutral-400 max-w-lg">
            Caso o formulário demore a carregar no seu navegador,{' '}
            <a
              href={campaign.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline font-medium inline-flex items-center gap-1"
            >
              clique aqui para abrir a página oficial do Google Forms
              <ExternalLink className="w-3 h-3" />
            </a>
            . Seus dados são protegidos por sigilo profissional.
          </div>
        </div>
      </div>
    </div>
  );
};
