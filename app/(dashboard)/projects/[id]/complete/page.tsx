'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Project } from '@/types/project';
import { fetchProject, completeProject } from '@/lib/mock/projects';
import CompleteProjectModal from '@/components/projects/CompleteProjectModal';

export default function CompleteProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const data = await fetchProject(id);
    setProject(data || null);
    setIsLoading(false);
  };

  const handleComplete = async () => {
    await completeProject(id);
    router.push(`/projects/${id}`);
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!project) return <div>Projekt nicht gefunden</div>;

  return (
    <>
      <CompleteProjectModal
        isOpen={showModal}
        projectName={project.name}
        onClose={() => router.push(`/projects/${project.id}`)}
        onConfirm={handleComplete}
      />
    </>
  );
}