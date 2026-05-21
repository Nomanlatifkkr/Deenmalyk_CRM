'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createRole } from '@/lib/mock/roles';
import RoleForm from '@/components/admin/roles/RoleForm';

export default function NewRolePage() {
  const router = useRouter();

  const handleSubmit = async (data: { name: string; description: string }) => {
    await createRole({ ...data, permissions: [] });
    router.push('/admin/roles');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/roles">
          <button className="p-2 glass rounded-lg hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Neue Rolle anlegen</h1>
          <p className="text-gray-400 mt-1">Definieren Sie eine neue Benutzerrolle</p>
        </div>
      </div>
      <RoleForm
        role={null}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/roles')}
      />
    </div>
  );
}