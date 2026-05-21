'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Project, SubService } from '@/types/project';
import { fetchProject, updateSubServices } from '@/lib/mock/projects';
import SubServiceList from '@/components/projects/SubServiceList';

export default function SubServicesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [crews, setCrews] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const data = await fetchProject(id);
    setProject(data || null);
    // Mock crews
    setCrews([{ id: 'crew1', name: 'Estrich Team A' }, { id: 'crew2', name: 'Heizung Team' }, { id: 'crew3', name: 'Elektro Team' }]);
    setIsLoading(false);
  };

  const handleUpdate = async (subServices: SubService[]) => {
    if (project) {
      await updateSubServices(project.id, subServices);
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
          <h1 className="text-2xl font-bold text-white">Sub-Leistungen</h1>
          <p className="text-gray-400 text-sm">{project.name}</p>
        </div>
      </div>
      <SubServiceList subServices={project.subServices} crews={crews} onUpdate={handleUpdate} />
    </div>
  );
}