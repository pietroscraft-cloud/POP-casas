import React from 'react';
import { Shield, Sparkles, Building2, Wallet } from 'lucide-react';

export const DifferentialsSection: React.FC = () => {
  const differentials = [
    {
      index: '01',
      title: 'Arquitetura Autoral & Acabamentos Nobres',
      description:
        'Projetos desenvolvidos por escritórios renomados com ênfase em iluminação natural, ventilação cruzada, terraços generosos e materiais nobres que envelhecem com beleza e sofisticação.',
      icon: Building2,
    },
    {
      index: '02',
      title: 'Sustentabilidade & Eficiência Condominial',
      description:
        'Instalação de placas fotovoltaicas para áreas comuns, captação e reuso de águas pluviais, sensores inteligentes e bacias com duplo acionamento, reduzindo sensivelmente a taxa de condomínio.',
      icon: Sparkles,
    },
    {
      index: '03',
      title: 'Segurança Armada & Biometria Integrada',
      description:
        'Guarita com vidros blindados, eclusa de segurança para pedestres e veículos, controle de acesso biométrico/facial e infraestrutura completa para monitoramento perimetral 24 horas.',
      icon: Shield,
    },
    {
      index: '04',
      title: 'Assessoria de Crédito Imobiliário Dedicada',
      description:
        'Equipe especializada que conduz todo o processo de aprovação de financiamento bancário junto à Caixa, Itaú, Bradesco, Santander e Banco do Brasil, garantindo as menores taxas de juros.',
      icon: Wallet,
    },
  ];

  return (
    <section id="diferenciais" className="py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Padrão Construtivo & Confiança
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light text-neutral-50 [text-wrap:balance]">
            Por que nossos empreendimentos são referência em valorização.
          </h2>
          <p className="mt-4 text-sm text-neutral-400">
            Cada detalhe da planta ao paisagismo é planejado para elevar a qualidade de vida e assegurar alta liquidez para o seu patrimônio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.index}
                className="bg-neutral-900/40 border border-white/10 rounded-xl p-6 flex flex-col justify-between backdrop-blur-sm hover:border-amber-400/40 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between text-neutral-500 mb-6">
                    <span className="font-mono text-sm tracking-wider text-amber-400 font-semibold">
                      {item.index}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-400 group-hover:text-amber-400 transition-colors" />
                  </div>

                  <h3 className="font-display text-lg text-neutral-100 mb-3 group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
