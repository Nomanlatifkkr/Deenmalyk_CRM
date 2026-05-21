'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createProject } from '@/lib/mock/projects';
import ProjectForm from '@/components/projects/ProjectForm';

export default function NewProjectPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    // Fetch customers from localStorage
    const stored = localStorage.getItem('customers');
    if (stored) {
      const customersData = JSON.parse(stored);
      setCustomers(customersData.map((c: any) => ({ id: c.id, name: c.name })));
    } else {
      setCustomers([{ id: '1', name: 'ABC Construction GmbH' }, { id: '2', name: 'Bauwerk AG' }]);
    }
  }, []);

  const handleSubmit = async (data: any) => {
    const newProject = {
      ...data,
      status: 'planning' as const,
      subServices: [],
      actualCostsList: [],
      actualCosts: 0,
      actualMargin: data.totalValue - data.plannedCosts,
    };
    await createProject(newProject);
    router.push('/projects');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/projects">
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Neues Projekt anlegen</h1>
          <p className="text-gray-400 mt-1">Erfassen Sie die Projektdaten</p>
        </div>
      </div>
      <ProjectForm
        project={null}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/projects')}
        customers={customers}
      />
    </div>
  );
}