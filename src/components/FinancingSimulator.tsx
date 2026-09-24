import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, CheckCircle, Info } from 'lucide-react';
import { CAMPAIGNS, Campaign } from '../data/campaigns';

interface FinancingSimulatorProps {
  initialCampaign?: Campaign;
  onOpenForm: (campaign: Campaign) => void;
}

export const FinancingSimulator: React.FC<FinancingSimulatorProps> = ({
  initialCampaign,
  onOpenForm,
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(
    initialCampaign || CAMPAIGNS[0]
  );
  const [customPrice, setCustomPrice] = useState<number>(
    initialCampaign?.rawPrice || CAMPAIGNS[0].rawPrice
  );
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [constructionPeriodMonths, setConstructionPeriodMonths] = useState<number>(36);
  const [financingYears, setFinancingYears] = useState<number>(30);

  useEffect(() => {
    if (initialCampaign) {
      setSelectedCampaign(initialCampaign);
      setCustomPrice(initialCampaign.rawPrice);
    }
  }, [initialCampaign]);

  const handleCampaignChange = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setCustomPrice(campaign.rawPrice);
  };

  // Calculations
  const downPaymentTotal = (customPrice * downPaymentPercent) / 100;
  // 10% cash entry, remaining 10% split across construction months
  const initialCashEntry = downPaymentTotal * 0.35;
  const remainingConstructionBalance = downPaymentTotal * 0.65;
  const monthlyConstructionInstallment =
    remainingConstructionBalance / (constructionPeriodMonths || 1);

  const financedBalance = customPrice - downPaymentTotal;
  // Approximation using Price amortization table (approx 9.9% a.a. + TR)
  const monthlyInterestRate = 0.099 / 12;
  const totalMonths = financingYears * 12;
  const monthlyFinancingInstallment =
    (financedBalance *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  return (
    <section id="simulador" className="py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            <span>Planejamento Financeiro</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light text-neutral-50 [text-wrap:balance]">
            Simule o fluxo de pagamento do seu imóvel.
          </h2>
          <p className="mt-4 text-sm text-neutral-400">
            Durante o período de obras, a entrada é diluída em parcelas mensais suaves, sem juros remuneratórios (apenas correção INCC). Escolha o empreendimento e ajuste os prazos:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls form */}
          <div className="lg:col-span-7 bg-neutral-900/50 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
            {/* Step 1: Select Development */}
            <div>
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-3">
                1. Selecione o Empreendimento
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {CAMPAIGNS.map((camp) => (
                  <button
                    key={camp.id}
                    onClick={() => handleCampaignChange(camp)}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      selectedCampaign.id === camp.id
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-white/10 bg-neutral-950/60 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold text-amber-300">{camp.neighborhood}</div>
                    <div className="text-[11px] truncate text-neutral-300">{camp.name}</div>
                    <div className="text-[11px] font-mono mt-1 text-neutral-400">
                      {camp.priceFrom}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Property Value Slider */}
            <div className="pt-2 border-t border-white/5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Valor Estimado da Unidade
                </label>
                <span className="font-mono text-base font-semibold text-neutral-100 tabular-nums">
                  {formatBRL(customPrice)}
                </span>
              </div>
              <input
                type="range"
                min={300000}
                max={2500000}
                step={25000}
                value={customPrice}
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 font-mono mt-1">
                <span>R$ 300 mil</span>
                <span>R$ 1.4 milhão</span>
                <span>R$ 2.5 milhões</span>
              </div>
            </div>

            {/* Step 3: Down payment slider */}
            <div className="pt-2 border-t border-white/5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Entrada durante obras ({downPaymentPercent}%)
                </label>
                <span className="font-mono text-base font-semibold text-amber-300 tabular-nums">
                  {formatBRL(downPaymentTotal)}
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 font-mono mt-1">
                <span>15% (Mínimo padrão)</span>
                <span>30%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Step 4: Months in construction */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
              <div>
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                  Prazo de Obras (Meses)
                </label>
                <select
                  value={constructionPeriodMonths}
                  onChange={(e) => setConstructionPeriodMonths(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-white/15 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400 font-mono"
                >
                  <option value={24}>24 meses</option>
                  <option value={30}>30 meses</option>
                  <option value={36}>36 meses</option>
                  <option value={42}>42 meses</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                  Financiamento Pós-Chaves
                </label>
                <select
                  value={financingYears}
                  onChange={(e) => setFinancingYears(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-white/15 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400 font-mono"
                >
                  <option value={20}>20 anos (240 meses)</option>
                  <option value={25}>25 anos (300 meses)</option>
                  <option value={30}>30 anos (360 meses)</option>
                  <option value={35}>35 anos (420 meses)</option>
                </select>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-neutral-950/80 rounded-lg border border-white/5 text-[11px] text-neutral-400">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Você pode utilizar o saldo do seu <strong>FGTS</strong> na entrega das chaves ou amortizar parte do fluxo diretamente com a construtora.
              </span>
            </div>
          </div>

          {/* Results summary card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900 to-neutral-950 border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                Resumo da Simulação Estimada
              </span>
              <h3 className="font-display text-2xl text-neutral-50 mt-1">
                {selectedCampaign.name}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Localização: {selectedCampaign.neighborhood} · Entrega {selectedCampaign.deliveryDate}
              </p>
            </div>

            <div className="space-y-4 border-t border-b border-white/10 py-5">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-neutral-400">Ato Inicial (Sinal):</span>
                <span className="font-mono text-base font-semibold text-neutral-100 tabular-nums">
                  {formatBRL(initialCashEntry)}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-neutral-400 block">Mensais durante a Obra:</span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {constructionPeriodMonths}x parcelas
                  </span>
                </div>
                <span className="font-mono text-lg font-bold text-amber-300 tabular-nums">
                  {formatBRL(monthlyConstructionInstallment)}
                  <span className="text-xs text-neutral-400 font-normal"> /mês</span>
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-neutral-400 block">Financiamento na Entrega:</span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    Saldo ({100 - downPaymentPercent}%)
                  </span>
                </div>
                <span className="font-mono text-sm text-neutral-300 tabular-nums">
                  {formatBRL(financedBalance)}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-neutral-400 block">Parcela Estimada Financiada:</span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    Taxa média de mercado
                  </span>
                </div>
                <span className="font-mono text-base font-semibold text-neutral-200 tabular-nums">
                  {formatBRL(monthlyFinancingInstallment)}
                  <span className="text-xs text-neutral-400 font-normal"> /mês</span>
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onOpenForm(selectedCampaign)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md"
              >
                <span>Solicitar Proposta Formal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={selectedCampaign.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-2 text-center text-xs text-neutral-400 hover:text-amber-300 transition-colors"
              >
                Acessar diretamente formulário do Google ({selectedCampaign.neighborhood}) →
              </a>
            </div>

            <p className="text-[10px] text-neutral-500 leading-normal">
              *Valores referenciais para fins ilustrativos. O fluxo definitivo é personalizado conforme a renda declarada e a tabela vigente da incorporadora.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
