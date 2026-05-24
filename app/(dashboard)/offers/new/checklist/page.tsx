'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { ChecklistAnswers } from '@/types/offer';
import { autoGenerateOffer } from '@/lib/mock/offers';

export default function ChecklistPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<ChecklistAnswers>({ squareMeters: 0, assemblyHeight: 0 });
  const [customerId, setCustomerId] = useState('c1');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newOffer = await autoGenerateOffer(answers, customerId);
    setLoading(false);
    router.push(`/offers/${newOffer.id}/services`);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href="/offers"><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Angebot per Checkliste</h1><p className="text-gray-400">Beantworten Sie Fragen – Angebot wird automatisch erstellt</p></div></div>
      <div className="glass-card p-6"><form onSubmit={handleSubmit} className="space-y-4">
        <div><label>Kunde</label><select value={customerId} onChange={e => setCustomerId(e.target.value)} className="w-full p-2 bg-white/5 border rounded"><option value="c1">ABC Construction GmbH</option><option value="c2">Bauwerk AG</option></select></div>
        <div><label>Quadratmeter (m²) *</label><input type="number" required value={answers.squareMeters} onChange={e => setAnswers({...answers, squareMeters: parseInt(e.target.value)||0})} className="w-full p-2 bg-white/5 border rounded" /></div>
        <div><label>Montagehöhe (m)</label><input type="number" step="0.1" value={answers.assemblyHeight} onChange={e => setAnswers({...answers, assemblyHeight: parseFloat(e.target.value)||0})} className="w-full p-2 bg-white/5 border rounded" /></div>
        <div><label>Bodenbelag</label><select value={answers.floorType} onChange={e => setAnswers({...answers, floorType: e.target.value})} className="w-full p-2 bg-white/5 border rounded"><option value="">Standard</option><option value="screed">Estrich</option></select></div>
        <button type="submit" disabled={loading} className="px-5 py-2 bg-blue-600 rounded-lg text-white"><CheckCircle className="h-4 w-4 inline mr-1" /> {loading ? 'Erstelle...' : 'Angebot erstellen'}</button>
      </form></div>
    </div>
  );
}