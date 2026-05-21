'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { Crew } from '@/types/crew';
import { fetchCrews } from '@/lib/mock/crews';
import CrewCard from '@/components/crews/CrewCard';

export default function CrewsPage() {
  const [crews, setCrews] = useState<Crew[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { load(); }, []);
  const load = async () => { const data = await fetchCrews(); setCrews(data); setIsLoading(false); };
  const filtered = crews.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.crewNumber.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-white">Teams</h1><p className="text-gray-400 mt-1">Verwalten Sie Hauptteams und Subunternehmer</p></div>
        <Link href="/crews/new"><button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold"><Plus className="h-4 w-4" /> Neues Team</button></Link>
      </div>
      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" /><input type="text" placeholder="Teams suchen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full sm:w-80 pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map(crew => <CrewCard key={crew.id} crew={crew} />)}</div>
      {filtered.length === 0 && <div className="text-center py-12 text-gray-400">Keine Teams gefunden</div>}
    </div>
  );
}