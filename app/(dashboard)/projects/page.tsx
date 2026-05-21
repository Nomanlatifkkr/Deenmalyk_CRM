'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { Project } from '@/types/project';
import { fetchProjects } from '@/lib/mock/projects';
import ProjectCard from '@/components/projects/ProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchProjects();
    setProjects(data);
    setIsLoading(false);
  };

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.projectNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projekte</h1>
          <p className="text-gray-400 mt-1">Übersicht aller Bauprojekte mit Kosten und Leistungen</p>
        </div>
        <Link href="/projects/new">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold">
            <Plus className="h-4 w-4" /> Neues Projekt
          </button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Projekte suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(project => <ProjectCard key={project.id} project={project} />)}
      </div>

      {filtered.length === 0 && <div className="text-center py-12 text-gray-400">Keine Projekte gefunden</div>}
    </div>
  );
}