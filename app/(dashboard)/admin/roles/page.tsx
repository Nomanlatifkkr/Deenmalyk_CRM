'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Eye, Edit, Trash2, Shield } from 'lucide-react';
import { Role } from '@/types/role';
import { fetchRoles, deleteRole } from '@/lib/mock/roles';

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchRoles();
    setRoles(data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string, isSystem: boolean) => {
    if (isSystem) {
      alert('Systemrollen können nicht gelöscht werden.');
      return;
    }
    if (!confirm('Rolle wirklich löschen?')) return;
    await deleteRole(id);
    await load();
  };

  const filtered = roles.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Rollenverwaltung</h1>
          <p className="text-gray-400 mt-1">Benutzerrollen und deren Berechtigungen verwalten</p>
        </div>
        <Link href="/admin/roles/new">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90">
            <Plus className="h-4 w-4" /> Neue Rolle
          </button>
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Rollen durchsuchen..."
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
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Rolle</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Beschreibung</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Typ</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Berechtigungen</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((role) => (
                <tr key={role.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-white">{role.name}</td>
                  <td className="px-6 py-4 text-gray-300">{role.description}</td>
                  <td className="px-6 py-4">
                    {role.isSystemRole ? (
                      <span className="text-xs px-2 py-0.5 glass rounded-full text-blue-400">System</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 glass rounded-full text-gray-400">Benutzerdefiniert</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {role.permissions.includes('*') ? 'Vollzugriff' : `${role.permissions.length} Berechtigungen`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/roles/${role.id}`}>
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg" title="Details">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      <Link href={`/admin/roles/${role.id}/permissions`}>
                        <button className="p-1.5 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg" title="Berechtigungen">
                          <Shield className="h-4 w-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(role.id, role.isSystemRole || false)}
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
              <p className="text-gray-400">Keine Rollen gefunden</p>
            </div>
          )}
        </div>
        <div className="px-6 py-3 border-t border-white/10 text-xs text-gray-400">
          {filtered.length} von {roles.length} Rollen
        </div>
      </div>
    </div>
  );
}