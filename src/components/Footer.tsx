import React from 'react';
import { ArrowUp, ExternalLink, ShieldCheck } from 'lucide-react';
import { CAMPAIGNS } from '../data/campaigns';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-neutral-950/90 text-neutral-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <Logo size="lg" showSubtitle={true} />
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Desenvolvimento imobiliário com foco em arquitetura autoral, valorização patrimonial e transparência em todas as etapas da sua aquisição.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Incorporações registradas em conformidade com a Lei 4.591/64</span>
            </div>
          </div>

          {/* Navigation mirror */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-neutral-300 font-semibold block">
              Navegação
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#campanhas" className="hover:text-amber-300 transition-colors">
                  Empreendimentos
                </a>
              </li>
              <li>
                <a href="#bairros" className="hover:text-amber-300 transition-colors">
                  Análise dos Bairros
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-amber-300 transition-colors">
                  Simulador de Parcelas
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-amber-300 transition-colors">
                  Diferenciais de Obra
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-300 transition-colors">
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Campaign Forms */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-neutral-300 font-semibold block">
              Formulários Oficiais das Campanhas
            </span>
            <ul className="space-y-2.5 text-xs">
              {CAMPAIGNS.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-amber-300 transition-colors"
                  >
                    <span>Formulário de Cadastro — {c.neighborhood} ({c.name})</span>
                    <ExternalLink className="w-3 h-3 text-amber-400/80" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Scroll to Top */}
          <div className="md:col-span-2 flex flex-col justify-between items-start md:items-end">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
              Topo da Página
            </span>
            <button
              onClick={scrollToTop}
              className="mt-4 p-3 bg-neutral-900 border border-white/10 rounded-lg text-neutral-400 hover:text-white hover:border-amber-400 transition-colors"
              aria-label="Voltar ao início"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-neutral-400 font-light">
          <p className="max-w-3xl leading-relaxed">
            As imagens e perspectivas artísticas contidas neste material são meramente ilustrativas e preliminares. Móveis e acabamentos decorativos não integram o contrato de venda, prevalecendo rigorosamente o Memorial Descritivo de cada empreendimento aprovado pela Prefeitura Municipal de São Paulo. Intermediação: Pop Casas Negócios Imobiliários Ltda. - CRECI 042.890-J.
          </p>
          <div className="whitespace-nowrap">
            © {new Date().getFullYear()} Pop Casas. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
