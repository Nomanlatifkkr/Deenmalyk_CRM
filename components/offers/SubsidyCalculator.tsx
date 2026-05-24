'use client';
import { useEffect } from 'react';
import { Subsidy } from '@/types/offer';

export default function SubsidyCalculator({ services, onSubsidies }: { services: any[]; onSubsidies: (subsidies: Subsidy[]) => void }) {
  useEffect(() => {
    const subs: Subsidy[] = [];
    const hasHeating = services.some(s => s.serviceName.includes('Heizung') || s.serviceName.includes('Wärmepumpe'));
    if (hasHeating) {
      subs.push({ name: 'BAFA Förderung Wärmepumpe', amount: 3500, description: 'Grundförderung für WP' });
      const sqm = services.reduce((sum, s) => s.unit === 'm²' ? sum + s.quantity : sum, 0);
      if (sqm > 100) subs.push({ name: 'Effizienzbonus', amount: 2500, description: 'Besonders effiziente Wärmepumpe' });
    }
    const hasScreed = services.some(s => s.serviceName.includes('Estrich'));
    if (hasScreed && services.reduce((sum, s) => sum + s.totalPrice, 0) > 10000) {
      subs.push({ name: 'BEG EM Förderung', amount: 1500, description: 'Energieeffizienz im Estrichbau' });
    }
    onSubsidies(subs);
  }, [services]);
  return null;
}