'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Shield, Mail, Calendar, User as UserIcon } from 'lucide-react';
import { User } from '@/types/user';
import { fetchUser, deleteUser, roleDefinitions } from '@/lib/mock/users';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const data = await fetchUser(id);
    setUser(data || null);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm('Benutzer wirklich löschen?')) return;
    await deleteUser(id);
    router.push('/admin/users');
  };

  const getRoleName = (roleId: string) => roleDefinitions.find(r => r.id === roleId)?.name || roleId;

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!user) return <div className="text-center py-12">Benutzer nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/users/${user.id}/edit`}>
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-white"><Edit className="h-4 w-4" /> Bearbeiten</button>
          </Link>
          <Link href={`/admin/users/${user.id}/permissions`}>
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-purple-400 hover:text-purple-300"><Shield className="h-4 w-4" /> Berechtigungen</button>
          </Link>
          <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /> Löschen</button>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <UserIcon className="h-5 w-5 text-blue-400" />
              <div><p className="text-xs text-gray-500">Vollständiger Name</p><p className="text-white">{user.firstName} {user.lastName}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <div><p className="text-xs text-gray-500">E-Mail</p><p className="text-white">{user.email}</p></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-400" />
              <div><p className="text-xs text-gray-500">Rolle</p><p className="text-white">{getRoleName(user.role)}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-400" />
              <div><p className="text-xs text-gray-500">Letzter Login</p><p className="text-white">{user.lastLogin ? new Date(user.lastLogin).toLocaleString('de-DE') : '—'}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}