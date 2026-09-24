import React, { useState } from 'react';
import { X, Send, Phone, User, Mail, Building, CheckCircle2 } from 'lucide-react';
import { CAMPAIGNS } from '../data/campaigns';

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCampaignSlug?: string;
}

export const QuickContactModal: React.FC<QuickContactModalProps> = ({
  isOpen,
  onClose,
  defaultCampaignSlug = 'mooca',
}) => {
  const [selectedSlug, setSelectedSlug] = useState(defaultCampaignSlug);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const campaign = CAMPAIGNS.find((c) => c.slug === selectedSlug) || CAMPAIGNS[0];
    const message = encodeURIComponent(
      `Olá! Meu nome é ${name}. Gostaria de atendimento exclusivo para o empreendimento ${campaign.name} (${campaign.neighborhood}).\nTelefone: ${phone}\nE-mail: ${email || 'Não informado'}`
    );
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      onClose();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-neutral-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800/80 rounded-lg transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-display text-2xl text-neutral-50">Solicitação Enviada!</h3>
            <p className="text-xs text-neutral-300 max-w-xs mx-auto">
              Você está sendo redirecionado para o atendimento direto no WhatsApp com um especialista do empreendimento.
            </p>
          </div>
        ) : (
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Atendimento Dedicado
            </div>
            <h3 className="font-display text-2xl text-neutral-50 mb-2">
              Fale com um Consultor de Plantão
            </h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Tire dúvidas sobre fluxo de pagamento, financiamento e tabela de pré-lançamento.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1.5">
                  Empreendimento de Interesse
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CAMPAIGNS.map((c) => (
                    <button
                      type="button"
                      key={c.slug}
                      onClick={() => setSelectedSlug(c.slug)}
                      className={`py-2 px-2 text-xs rounded border transition-colors ${
                        selectedSlug === c.slug
                          ? 'border-amber-400 bg-amber-400/10 text-white font-medium'
                          : 'border-white/10 bg-neutral-950/60 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {c.neighborhood}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1.5">
                  Seu Nome Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos Eduardo"
                    className="w-full bg-neutral-950 border border-white/15 rounded-lg pl-10 pr-3 py-2.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1.5">
                  WhatsApp / Celular com DDD
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-neutral-950 border border-white/15 rounded-lg pl-10 pr-3 py-2.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1.5">
                  E-mail (opcional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="carlos@email.com"
                    className="w-full bg-neutral-950 border border-white/15 rounded-lg pl-10 pr-3 py-2.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Iniciar Atendimento Direto</span>
                </button>
              </div>

              <p className="text-[10px] text-neutral-500 text-center font-light">
                Não enviamos spam. Suas informações são protegidas pela LGPD.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
