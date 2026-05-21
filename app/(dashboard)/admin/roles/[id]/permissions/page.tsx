'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Role } from '@/types/role';
import { fetchRole, updateRole } from '@/lib/mock/roles';
import RolePermissionsForm from '@/components/admin/roles/RolePermissionsForm';

export default function RolePermissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const data = await fetchRole(id);
    setRole(data || null);
    setIsLoading(false);
  };

  const handleSubmit = async (permissions: string[]) => {
    await updateRole(id, { permissions });
    router.push(`/admin/roles/${id}`);
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!role) return <div className="text-center py-12">Rolle nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/roles/${role.id}`}>
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Berechtigungen - {role.name}</h1>
          <p className="text-gray-400 text-sm">Legen Sie fest, welche Module und Aktionen diese Rolle hat.</p>
        </div>
      </div>
      <RolePermissionsForm
        role={role}
        onSubmit={handleSubmit}
        onCancel={() => router.push(`/admin/roles/${role.id}`)}
      />
    </div>
  );
}