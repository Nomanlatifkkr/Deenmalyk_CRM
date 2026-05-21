'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Eye, Edit, Trash2, Shield, User as UserIcon } from 'lucide-react';
import { User } from '@/types/user';
import { fetchUsers, deleteUser, roleDefinitions } from '@/lib/mock/users';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchUsers();
    setUsers(data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Benutzer wirklich löschen?')) return;
    await deleteUser(id);
    await load();
  };

  const getRoleName = (roleId: string) => {
    return roleDefinitions.find(r => r.id === roleId)?.name || roleId;
  };

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Benutzerverwaltung</h1>
          <p className="text-gray-400 mt-1">Benutzerkonten verwalten, Rollen zuweisen und Berechtigungen festlegen</p>
        </div>
        <Link href="/admin/users/new">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90">
            <Plus className="h-4 w-4" /> Neuer Benutzer
          </button>
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Suchen nach Name, E-Mail oder Rolle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80 pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">E-Mail</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Rolle</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Letzter Login</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-blue-400" />
                      <span className="text-white">{user.firstName} {user.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 glass rounded-full text-xs">{getRoleName(user.role)}</span>
                  </td>
                  <td className="px-6 py-4">
                    {user.isActive ? (
                      <span className="text-emerald-400 text-sm">Aktiv</span>
                    ) : (
                      <span className="text-red-400 text-sm">Inaktiv</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('de-DE') : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/users/${user.id}`}>
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg" title="Details">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      <Link href={`/admin/users/${user.id}/edit`}>
                        <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg" title="Bearbeiten">
                          <Edit className="h-4 w-4" />
                        </button>
                      </Link>
                      <Link href={`/admin/users/${user.id}/permissions`}>
                        <button className="p-1.5 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg" title="Berechtigungen">
                          <Shield className="h-4 w-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                        title="Löschen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Keine Benutzer gefunden</p>
            </div>
          )}
        </div>
        <div className="px-6 py-3 border-t border-white/10 text-xs text-gray-400">
          {filtered.length} von {users.length} Benutzern
        </div>
      </div>
    </div>
  );
}