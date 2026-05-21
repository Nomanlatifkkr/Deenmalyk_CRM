'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Euro, Users } from 'lucide-react';
import { CrewSettlement } from '@/types/crew';
import { fetchCrewSettlements, approveSettlement } from '@/lib/mock/crews';

export default function SettlementsPage() {
  const [settlements, setSettlements] = useState<CrewSettlement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { load(); }, []);
  const load = async () => { const data = await fetchCrewSettlements(); setSettlements(data); setIsLoading(false); };
  const handleApprove = async (id: string) => { await approveSettlement(id); load(); };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;

  const totalAmount = settlements.reduce((s, a) => s + a.totalAmount, 0);
  const totalHours = settlements.reduce((s, a) => s + a.totalHours, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href="/crews"><button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button></Link><div><h1 className="text-2xl font-bold text-white">Team-Abrechnungen</h1><p className="text-gray-400 mt-1">Übersicht aller Abrechnungen für Lohnvorbereitung</p></div></div>
      <div className="grid grid-cols-2 gap-4"><div className="glass-card p-4"><Euro className="h-5 w-5 text-green-400 mb-1" /><p className="text-xs text-gray-400">Gesamtbetrag</p><p className="text-xl font-bold text-white">€{totalAmount.toLocaleString()}</p></div><div className="glass-card p-4"><Users className="h-5 w-5 text-blue-400 mb-1" /><p className="text-xs text-gray-400">Gesamtstunden</p><p className="text-xl font-bold text-white">{totalHours} h</p></div></div>
      <div className="space-y-3">{settlements.map(s => (<div key={s.id} className="glass-card p-4"><div className="flex justify-between"><span className="text-white font-semibold">{s.crewName}</span><span className="text-xs text-gray-400">{s.period}</span></div><div className="flex justify-between mt-2"><span className="text-gray-400">{s.totalHours} h</span><span className="text-white">€{s.totalAmount.toLocaleString()}</span><span className={`text-xs px-2 py-0.5 rounded-full ${s.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{s.status === 'approved' ? 'Freigegeben' : 'Offen'}</span></div>{s.status === 'pending' && <button onClick={() => handleApprove(s.id)} className="mt-2 w-full py-1.5 glass rounded-lg text-sm text-green-400">Freigeben</button>}<Link href={`/crews/${s.crewId}/payroll`}><button className="mt-2 w-full py-1.5 glass rounded-lg text-sm">Details</button></Link></div>))}</div>
    </div>
  );
}