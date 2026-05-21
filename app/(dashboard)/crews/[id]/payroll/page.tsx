'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { Crew, CrewSettlement } from '@/types/crew';
import { fetchCrew, fetchCrewSettlements, approveSettlement } from '@/lib/mock/crews';

export default function CrewPayrollPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [crew, setCrew] = useState<Crew | null>(null);
  const [settlements, setSettlements] = useState<CrewSettlement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { load(); }, [id]);
  const load = async () => { const c = await fetchCrew(id); setCrew(c || null); const s = await fetchCrewSettlements(id); setSettlements(s); setIsLoading(false); };
  const handleApprove = async (settlementId: string) => { await approveSettlement(settlementId); load(); };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!crew) return <div>Team nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href={`/crews/${crew.id}`}><button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button></Link><div><h1 className="text-2xl font-bold text-white">Lohnvorbereitung - {crew.name}</h1><p className="text-gray-400 text-sm">Abrechnungen für Lohn- und Gehaltsabrechnung</p></div><div className="ml-auto"><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm"><Download className="h-4 w-4" /> CSV Export</button></div></div>
      {settlements.length === 0 ? <p className="text-gray-400">Keine Abrechnungen vorhanden.</p> : settlements.map(s => (
        <div key={s.id} className="glass-card p-5">
          <div className="flex justify-between items-start"><div><h3 className="text-white font-semibold">{s.period}</h3><p className="text-sm text-gray-400">{s.assignments.length} Einsätze</p></div><span className={`text-xs px-2 py-1 rounded-full ${s.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{s.status === 'approved' ? 'Freigegeben' : 'In Prüfung'}</span></div>
          <div className="grid grid-cols-2 gap-3 mt-3"><div><span className="text-gray-400">Stunden:</span> {s.totalHours} h</div><div><span className="text-gray-400">Betrag:</span> €{s.totalAmount.toLocaleString()}</div></div>
          {s.status === 'pending' && <button onClick={() => handleApprove(s.id)} className="mt-3 px-4 py-1.5 bg-green-600 rounded-lg text-sm">Freigeben</button>}
        </div>
      ))}
    </div>
  );
}