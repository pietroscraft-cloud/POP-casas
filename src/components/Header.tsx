import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenQuickContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuickContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-neutral-950/90 backdrop-blur-md border-white/10 shadow-lg'
          : 'bg-neutral-950/40 backdrop-blur-sm border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-display text-2xl md:text-3xl tracking-wider text-neutral-100 hover:text-amber-300 transition-colors uppercase"
        >
          POP CASAS
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a
            href="#campanhas"
            className="hover:text-amber-300 transition-colors hover:underline underline-offset-8"
          >
            Empreendimentos
          </a>
          <a
            href="#bairros"
            className="hover:text-amber-300 transition-colors hover:underline underline-offset-8"
          >
            Localizações
          </a>
          <a
            href="#simulador"
            className="hover:text-amber-300 transition-colors hover:underline underline-offset-8"
          >
            Simulador
          </a>
          <a
            href="#diferenciais"
            className="hover:text-amber-300 transition-colors hover:underline underline-offset-8"
          >
            Diferenciais
          </a>
          <a
            href="#faq"
            className="hover:text-amber-300 transition-colors hover:underline underline-offset-8"
          >
            Perguntas
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onOpenQuickContact) {
                onOpenQuickContact();
              } else {
                const el = document.getElementById('campanhas');
                el?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors whitespace-nowrap shadow-sm"
          >
            <span>Falar com Consultor</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-neutral-300">
            <a
              href="#campanhas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300 transition-colors"
            >
              Empreendimentos
            </a>
            <a
              href="#bairros"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300 transition-colors"
            >
              Localizações
            </a>
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300 transition-colors"
            >
              Simulador Financeiro
            </a>
            <a
              href="#diferenciais"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300 transition-colors"
            >
              Diferenciais de Construção
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300 transition-colors"
            >
              Perguntas Frequentes
            </a>
          </nav>
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenQuickContact) onOpenQuickContact();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors"
            >
              <span>Falar com Consultor</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
