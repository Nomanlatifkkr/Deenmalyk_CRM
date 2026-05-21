'use client';

import Link from 'next/link';
import { FolderKanban, Calendar, Euro, TrendingUp, TrendingDown } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

const statusConfig = {
  planning: { label: 'Planung', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' },
  in_progress: { label: 'In Bearbeitung', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  completed: { label: 'Abgeschlossen', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  cancelled: { label: 'Storniert', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const margin = project.totalValue - (project.actualCosts > 0 ? project.actualCosts : project.plannedCosts);
  const marginPercent = (margin / project.totalValue) * 100;
  const isPositive = margin > 0;

  return (
    <div className="glass-card p-5 hover:scale-[1.02] transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <FolderKanban className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-mono text-gray-400">{project.projectNumber}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${statusConfig[project.status].color}`}>
          {statusConfig[project.status].label}
        </span>
      </div>
      <Link href={`/projects/${project.id}`}>
        <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition mb-2">{project.name}</h3>
      </Link>
      <p className="text-sm text-gray-400 mb-3">{project.customerName}</p>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Volumen:</span>
          <span className="text-white">€{project.totalValue.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Kosten (Plan/Ist):</span>
          <span className="text-white">€{project.plannedCosts.toLocaleString()} / €{project.actualCosts.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Deckungsbeitrag:</span>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>€{margin.toLocaleString()} ({marginPercent.toFixed(1)}%)</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-white/10">
          <Calendar className="h-3 w-3" />
          <span>Start: {new Date(project.startDate).toLocaleDateString('de-DE')}</span>
          {project.endDate && <span> • Ende: {new Date(project.endDate).toLocaleDateString('de-DE')}</span>}
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={`/projects/${project.id}`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm text-gray-300 hover:text-white">
          Details
        </Link>
        {project.status !== 'completed' && (
          <Link href={`/projects/${project.id}/sub-services`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm text-gray-300 hover:text-white">
            Sub-Leistungen
          </Link>
        )}
      </div>
    </div>
  );
}