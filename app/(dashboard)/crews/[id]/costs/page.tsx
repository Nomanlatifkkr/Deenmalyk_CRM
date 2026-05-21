'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Crew, AreaCost } from '@/types/crew';
import { fetchCrew, updateCrew } from '@/lib/mock/crews';
import CrewCostsForm from '@/components/crews/CrewCostsForm';

export default function CrewCostsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [crew, setCrew] = useState<Crew | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { load(); }, [id]);
  const load = async () => { const c = await fetchCrew(id); setCrew(c || null); setIsLoading(false); };
  const handleUpdate = async (costs: AreaCost[]) => { if (crew) { await updateCrew(crew.id, { areaCosts: costs }); router.push(`/crews/${crew.id}`); } };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!crew) return <div>Team nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href={`/crews/${crew.id}`}><button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button></Link><div><h1 className="text-2xl font-bold text-white">Preise pro Region</h1><p className="text-gray-400 text-sm">{crew.name}</p></div></div>
      <CrewCostsForm costs={crew.areaCosts} onUpdate={handleUpdate} />
    </div>
  );
}