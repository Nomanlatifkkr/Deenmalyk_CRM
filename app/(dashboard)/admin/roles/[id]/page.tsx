'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Shield, Calendar } from 'lucide-react';
import { Role } from '@/types/role';
import { fetchRole, deleteRole } from '@/lib/mock/roles';

export default function RoleDetailPage({ params }: { params: Promise<{ id: string }> }) {
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

  const handleDelete = async () => {
    if (role?.isSystemRole) {
      alert('Systemrollen können nicht gelöscht werden.');
      return;
    }
    if (!confirm('Rolle wirklich löschen?')) return;
    await deleteRole(id);
    router.push('/admin/roles');
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!role) return <div className="text-center py-12">Rolle nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/roles">
            <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{role.name}</h1>
            <p className="text-gray-400 text-sm">{role.isSystemRole ? 'Systemrolle' : 'Benutzerdefinierte Rolle'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/roles/${role.id}/permissions`}>
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-purple-400 hover:text-purple-300"><Shield className="h-4 w-4" /> Berechtigungen</button>
          </Link>
          {!role.isSystemRole && (
            <>
              <Link href={`/admin/roles/${role.id}/edit`}>
                <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-white"><Edit className="h-4 w-4" /> Bearbeiten</button>
              </Link>
              <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /> Löschen</button>
            </>
          )}
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500">Beschreibung</p>
            <p className="text-white">{role.description}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Berechtigungen</p>
            <p className="text-white text-sm">{role.permissions.includes('*') ? 'Vollzugriff (alle Berechtigungen)' : `${role.permissions.length} Berechtigungen`}</p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-gray-500">Erstellt am</p>
              <p className="text-white text-sm">{new Date(role.createdAt).toLocaleDateString('de-DE')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Letzte Änderung</p>
              <p className="text-white text-sm">{new Date(role.updatedAt).toLocaleDateString('de-DE')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}