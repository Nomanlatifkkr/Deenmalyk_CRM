'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Euro } from 'lucide-react';
import { fetchOffer, updateOffer } from '@/lib/mock/offers';
import SubsidyCalculator from '@/components/offers/SubsidyCalculator';
import { Subsidy } from '@/types/offer';

export default function SubsidiesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [offer, setOffer] = useState<any>(null);
  const [subsidies, setSubsidies] = useState<Subsidy[]>([]);
  useEffect(() => { fetchOffer(id).then(setOffer); }, [id]);
  const handleSubsidies = async (newSubs: Subsidy[]) => {
    setSubsidies(newSubs);
    await updateOffer(id, { subsidies: newSubs });
  };
  if (!offer) return <div>Laden...</div>;
  const totalSubsidy = subsidies.reduce((sum, s) => sum + s.amount, 0);
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href={`/offers/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Förderungen</h1></div><button onClick={() => router.push(`/offers/${id}`)} className="ml-auto px-4 py-2 bg-green-600 rounded-lg"><Save className="h-4 w-4 inline" /> Speichern</button></div>
      <SubsidyCalculator services={offer.services} onSubsidies={handleSubsidies} />
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-2">Ermittelte Förderungen</h3>
        {subsidies.map(s => <div key={s.name} className="flex justify-between py-1"><span>{s.name}</span><span className="text-green-400">€{s.amount}</span><span className="text-xs text-gray-400">{s.description}</span></div>)}
        <div className="border-t border-white/10 pt-2 mt-2 flex justify-between font-bold"><span>Gesamtförderung</span><span className="text-green-400">€{totalSubsidy}</span></div>
      </div>
    </div>
  );
}