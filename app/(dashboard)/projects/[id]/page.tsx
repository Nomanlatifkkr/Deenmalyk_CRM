'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Euro, TrendingUp, TrendingDown, FolderKanban, ClipboardList, Receipt, CheckCircle } from 'lucide-react';
import { Project } from '@/types/project';
import { fetchProject } from '@/lib/mock/projects';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const data = await fetchProject(id);
    setProject(data || null);
    setIsLoading(false);
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!project) return <div className="text-center py-12">Projekt nicht gefunden</div>;

  const margin = project.actualCosts > 0 ? project.totalValue - project.actualCosts : project.totalValue - project.plannedCosts;
  const marginPercent = (margin / project.totalValue) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/projects">
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{project.name}</h1>
          <p className="text-gray-400 text-sm">#{project.projectNumber} • {project.customerName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Status</p><p className="text-lg font-semibold text-white">{project.status === 'planning' ? 'Planung' : project.status === 'in_progress' ? 'In Bearbeitung' : 'Abgeschlossen'}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Start / Ende</p><p className="text-white">{new Date(project.startDate).toLocaleDateString('de-DE')}{project.endDate ? ` - ${new Date(project.endDate).toLocaleDateString('de-DE')}` : ''}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Volumen</p><p className="text-lg font-semibold text-white">€{project.totalValue.toLocaleString()}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Deckungsbeitrag</p><div className={`flex items-center gap-1 ${margin > 0 ? 'text-green-400' : 'text-red-400'}`}>{margin > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}<span className="text-lg font-semibold">{marginPercent.toFixed(1)}%</span></div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5"><h3 className="text-white font-semibold mb-3">Kostenübersicht</h3><div className="space-y-2"><div className="flex justify-between"><span className="text-gray-400">Geplante Kosten</span><span>€{project.plannedCosts.toLocaleString()}</span></div><div className="flex justify-between"><span className="text-gray-400">Ist-Kosten</span><span className="text-yellow-400">€{project.actualCosts.toLocaleString()}</span></div><div className="flex justify-between pt-2 border-t border-white/10"><span className="text-gray-400">Verbleibendes Budget</span><span className={project.actualCosts < project.plannedCosts ? 'text-green-400' : 'text-red-400'}>€{(project.plannedCosts - project.actualCosts).toLocaleString()}</span></div></div></div>
        <div className="glass-card p-5"><h3 className="text-white font-semibold mb-3">Fortschritt</h3><div className="relative h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${(project.actualCosts / project.plannedCosts) * 100}%` }} /></div><p className="text-sm text-gray-400 mt-2">{((project.actualCosts / project.plannedCosts) * 100).toFixed(1)}% der geplanten Kosten verbraucht</p></div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={`/projects/${project.id}/sub-services`}><button className="flex items-center gap-2 px-4 py-2 glass rounded-lg"><ClipboardList className="h-4 w-4" /> Sub-Leistungen ({project.subServices.length})</button></Link>
        <Link href={`/projects/${project.id}/actual-costs`}><button className="flex items-center gap-2 px-4 py-2 glass rounded-lg"><Receipt className="h-4 w-4" /> Ist-Kosten erfassen</button></Link>
        {project.status !== 'completed' && <Link href={`/projects/${project.id}/complete`}><button className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400"><CheckCircle className="h-4 w-4" /> Projekt abschließen</button></Link>}
      </div>
    </div>
  );
}