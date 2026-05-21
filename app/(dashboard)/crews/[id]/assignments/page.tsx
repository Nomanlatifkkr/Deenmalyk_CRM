'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Euro } from 'lucide-react';
import { Crew, CrewAssignment } from '@/types/crew';
import { fetchCrew, fetchCrewAssignments } from '@/lib/mock/crews';

export default function CrewAssignmentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [crew, setCrew] = useState<Crew | null>(null);
  const [assignments, setAssignments] = useState<CrewAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { load(); }, [id]);
  const load = async () => { const c = await fetchCrew(id); setCrew(c || null); const a = await fetchCrewAssignments(id); setAssignments(a); setIsLoading(false); };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!crew) return <div>Team nicht gefunden</div>;

  const totalHours = assignments.reduce((s, a) => s + a.hours, 0);
  const totalAmount = assignments.reduce((s, a) => s + a.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href={`/crews/${crew.id}`}><button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button></Link><div><h1 className="text-2xl font-bold text-white">Einsätze - {crew.name}</h1><p className="text-gray-400 text-sm">Alle zugewiesenen Aufträge und Sub-Leistungen</p></div></div>
      <div className="glass-card p-4 flex justify-between"><span className="text-gray-400">Gesamtstunden:</span><span className="text-white font-semibold">{totalHours} h</span><span className="text-gray-400">Gesamtwert:</span><span className="text-white font-semibold">€{totalAmount.toLocaleString()}</span></div>
      <div className="space-y-3">
        {assignments.map(a => (
          <div key={a.id} className="glass p-4 rounded-lg">
            <div className="flex justify-between"><span className="text-white font-medium">{a.projectName}</span><span className="text-xs text-gray-400">{a.orderNumber}</span></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm"><div className="flex items-center gap-1 text-gray-400"><Calendar className="h-3 w-3" />{new Date(a.date).toLocaleDateString('de-DE')}</div><div><Clock className="h-3 w-3 inline mr-1" />{a.hours} h</div><div><MapPin className="h-3 w-3 inline mr-1" />{a.area}</div><div><Euro className="h-3 w-3 inline mr-1" />€{a.total.toLocaleString()}</div></div>
            {a.subServiceName && <p className="text-xs text-blue-400 mt-1">{a.subServiceName}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}