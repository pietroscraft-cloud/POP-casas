import React, { useState } from 'react';
import { SiteBackground } from './components/SiteBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CampaignsSection } from './components/CampaignsSection';
import { NeighborhoodComparison } from './components/NeighborhoodComparison';
import { FinancingSimulator } from './components/FinancingSimulator';
import { DifferentialsSection } from './components/DifferentialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CampaignModal } from './components/CampaignModal';
import { QuickContactModal } from './components/QuickContactModal';
import { Campaign, CAMPAIGNS } from './data/campaigns';

export default function App() {
  const [selectedSlug, setSelectedSlug] = useState<'mooca' | 'tatuape' | 'vila-ema'>('mooca');
  const [modalCampaign, setModalCampaign] = useState<Campaign | null>(null);
  const [quickContactOpen, setQuickContactOpen] = useState(false);
  const [simulationCampaign, setSimulationCampaign] = useState<Campaign>(CAMPAIGNS[0]);

  const handleSelectCampaign = (slug: 'mooca' | 'tatuape' | 'vila-ema') => {
    setSelectedSlug(slug);
    const camp = CAMPAIGNS.find((c) => c.slug === slug);
    if (camp) setSimulationCampaign(camp);
    const el = document.getElementById('campanhas');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenSimulation = (campaign: Campaign) => {
    setSimulationCampaign(campaign);
    const el = document.getElementById('simulador');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-neutral-100 flex flex-col relative selection:bg-amber-400 selection:text-neutral-950 font-sans">
      {/* Intentional architectural background layer */}
      <SiteBackground />

      {/* Top Bar Navigation */}
      <Header onOpenQuickContact={() => setQuickContactOpen(true)} />

      {/* Main Content Flow */}
      <main className="flex-1">
        <Hero onSelectCampaign={handleSelectCampaign} />

        <CampaignsSection
          selectedSlug={selectedSlug}
          onSelectSlug={(slug) => {
            setSelectedSlug(slug);
            const camp = CAMPAIGNS.find((c) => c.slug === slug);
            if (camp) setSimulationCampaign(camp);
          }}
          onOpenModal={(camp) => setModalCampaign(camp)}
          onOpenSimulation={handleOpenSimulation}
        />

        <NeighborhoodComparison onSelectCampaign={handleSelectCampaign} />

        <FinancingSimulator
          initialCampaign={simulationCampaign}
          onOpenForm={(camp) => setModalCampaign(camp)}
        />

        <DifferentialsSection />

        <FaqSection />
      </main>

      {/* Refined Footer */}
      <Footer />

      {/* Embedded Form / Direct Form Modal */}
      <CampaignModal
        campaign={modalCampaign}
        onClose={() => setModalCampaign(null)}
      />

      {/* Quick WhatsApp / Direct Consultant Contact Modal */}
      <QuickContactModal
        isOpen={quickContactOpen}
        onClose={() => setQuickContactOpen(false)}
        defaultCampaignSlug={selectedSlug}
      />
    </div>
  );
}
