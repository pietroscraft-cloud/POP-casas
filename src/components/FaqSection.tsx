import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Como funciona o preenchimento do formulário das campanhas?',
    answer:
      'Ao preencher o formulário oficial da campanha escolhida (Mooca, Tatuapé ou Vila Ema), sua solicitação entra imediatamente na fila prioritária de atendimento. Um consultor especialista na região entrará em contato em até 2 horas úteis para apresentar as opções de plantas disponíveis, valores atualizados e agendar sua visita.',
  },
  {
    question: 'Posso utilizar meu FGTS na aquisição do imóvel?',
    answer:
      'Sim. O saldo do FGTS pode ser utilizado como parte do pagamento na entrega das chaves para amortizar o saldo devedor do financiamento bancário, respeitando as normas vigentes do Sistema Financeiro da Habitação (SFH). Nossa assessoria auxilia em todo o processo burocrático.',
  },
  {
    question: 'Qual é o índice de correção monetária aplicado durante as obras?',
    answer:
      'Durante o período de construção do edifício, o saldo é corrigido mensalmente pelo INCC (Índice Nacional de Custo da Construção) apurado pela FGV. Não há cobrança de juros remuneratórios bancários até a entrega oficial das chaves.',
  },
  {
    question: 'Como é garantida a segurança jurídica e a entrega do imóvel?',
    answer:
      'Todos os empreendimentos contam com Patrimônio de Afetação constituído em cartório, o que garante a segregação total dos recursos da obra em relação a outros projetos da incorporadora. Além disso, as obras são financiadas e auditadas rigorosamente pelas principais instituições financeiras do país.',
  },
  {
    question: 'É possível personalizar acabamentos da planta durante a construção?',
    answer:
      'Sim. Em períodos pré-determinados do cronograma de obras, os compradores têm acesso ao programa de personalização, podendo optar por integração de living, kits de acabamentos especiais, fechamento de varanda e preparação para automação residencial.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Perguntas & Esclarecimentos
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light text-neutral-50 [text-wrap:balance]">
            Tire suas dúvidas antes de formalizar o cadastro.
          </h2>
          <p className="mt-4 text-sm text-neutral-400 max-w-xl mx-auto">
            Transparência total em cada etapa da sua jornada de compra ou investimento.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-neutral-900/40 border border-white/10 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-900/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-neutral-100">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
