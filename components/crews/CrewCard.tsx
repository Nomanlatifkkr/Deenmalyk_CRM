'use client';

import Link from 'next/link';
import { HardHat, MapPin, Phone, Mail, Euro } from 'lucide-react';
import { Crew } from '@/types/crew';

interface CrewCardProps {
  crew: Crew;
}

export default function CrewCard({ crew }: CrewCardProps) {
  const areaSummary = crew.areaCosts.map(a => `${a.area}: €${a.hourlyRate}/h`).join(' • ');

  return (
    <div className="glass-card p-5 hover:scale-[1.02] transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <HardHat className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-mono text-gray-400">{crew.crewNumber}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${crew.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {crew.isActive ? 'Aktiv' : 'Inaktiv'}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{crew.name}</h3>
      <p className="text-sm text-gray-400 mb-3">{crew.type === 'main' ? 'Hauptteam' : 'Subunternehmer'}</p>
      {crew.contactPerson && <p className="text-sm text-gray-300">Ansprechpartner: {crew.contactPerson}</p>}
      <div className="mt-3 space-y-1 text-sm">
        {crew.phone && <div className="flex items-center gap-2 text-gray-400"><Phone className="h-3 w-3" />{crew.phone}</div>}
        {crew.email && <div className="flex items-center gap-2 text-gray-400"><Mail className="h-3 w-3" />{crew.email}</div>}
        <div className="flex items-start gap-2 text-gray-400"><MapPin className="h-3 w-3 mt-0.5" /><span className="text-xs">{areaSummary || 'Keine Preise hinterlegt'}</span></div>
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={`/crews/${crew.id}`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm text-gray-300 hover:text-white">Details</Link>
        {crew.isActive && <Link href={`/crews/${crew.id}/assignments`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm text-gray-300 hover:text-white">Einsätze</Link>}
      </div>
    </div>
  );
}