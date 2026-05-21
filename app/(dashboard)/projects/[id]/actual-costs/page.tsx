'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Project } from '@/types/project';
import { fetchProject, addActualCost } from '@/lib/mock/projects';
import ActualCostsForm from '@/components/projects/ActualCostsForm';

export default function ActualCostsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
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

  const handleAdd = async (cost: any) => {
    if (project) {
      await addActualCost(project.id, cost);
      router.push(`/projects/${project.id}`);
    }
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!project) return <div>Projekt nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/projects/${project.id}`}>
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Ist-Kosten erfassen</h1>
          <p className="text-gray-400 text-sm">{project.name}</p>
        </div>
      </div>
      <ActualCostsForm costs={project.actualCostsList} onAdd={handleAdd} />
      <div className="flex justify-end">
        <Link href={`/projects/${project.id}`}>
          <button className="px-4 py-2 glass rounded-lg">Zurück zum Projekt</button>
        </Link>
      </div>
    </div>
  );
}