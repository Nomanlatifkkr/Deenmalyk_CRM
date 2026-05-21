'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit, MapPin, Euro, Phone, Mail, Calendar } from 'lucide-react';
import { Crew } from '@/types/crew';
import { fetchCrew, fetchCrewAssignments } from '@/lib/mock/crews';
import CrewAssignmentsList from '@/components/crews/CrewAssignmentsList';

export default function CrewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [crew, setCrew] = useState<Crew | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { load(); }, [id]);
  const load = async () => { const c = await fetchCrew(id); setCrew(c || null); const a = await fetchCrewAssignments(id); setAssignments(a); setIsLoading(false); };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!crew) return <div className="text-center py-12">Team nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4"><Link href="/crews"><button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button></Link><div><h1 className="text-2xl font-bold text-white">{crew.name}</h1><p className="text-gray-400 text-sm">#{crew.crewNumber}</p></div></div>
        <Link href={`/crews/${crew.id}/edit`}><button className="flex items-center gap-2 px-4 py-2 glass rounded-lg"><Edit className="h-4 w-4" /> Bearbeiten</button></Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-5 space-y-3 lg:col-span-1">
          <h3 className="text-white font-semibold">Kontakt</h3>
          {crew.contactPerson && <p><span className="text-gray-400">Ansprechpartner:</span> {crew.contactPerson}</p>}
          {crew.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-400" />{crew.phone}</p>}
          {crew.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-400" />{crew.email}</p>}
          <div className="pt-3 border-t border-white/10"><h4 className="text-white text-sm font-medium mb-2">Gebietsabhängige Preise</h4>{crew.areaCosts.map(a => <div key={a.area} className="flex justify-between text-sm"><span>{a.area}</span><span>€{a.hourlyRate}/h</span></div>)}</div>
          <div className="pt-3"><Link href={`/crews/${crew.id}/costs`}><button className="w-full py-1.5 glass rounded-lg text-sm">Preise bearbeiten</button></Link></div>
          <div className="pt-3"><Link href={`/crews/${crew.id}/send-order`}><button className="w-full py-1.5 glass rounded-lg text-sm">Auftrag senden</button></Link></div>
        </div>
        <div className="glass-card p-5 lg:col-span-2">
          <h3 className="text-white font-semibold mb-3">Aktuelle Einsätze</h3>
          <CrewAssignmentsList assignments={assignments} />
          {assignments.length > 0 && <div className="mt-4"><Link href={`/crews/${crew.id}/assignments`}><button className="text-sm text-blue-400">Alle Einsätze anzeigen</button></Link></div>}
        </div>
      </div>
    </div>
  );
}