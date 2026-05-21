'use client';

import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { User, RoleDefinition } from '@/types/user';
import { roleDefinitions } from '@/lib/mock/users';

interface PermissionsFormProps {
  user: User;
  onSubmit: (permissions: string[]) => Promise<void>;
  onCancel: () => void;
}

const modulePermissions = [
  { module: 'Kunden', key: 'customers', permissions: ['read', 'write'] },
  { module: 'Lieferanten', key: 'suppliers', permissions: ['read', 'write'] },
  { module: 'Material', key: 'materials', permissions: ['read', 'write'] },
  { module: 'Leistungen', key: 'services', permissions: ['read', 'write'] },
  { module: 'Aufträge', key: 'orders', permissions: ['read', 'write'] },
  { module: 'Angebote', key: 'offers', permissions: ['read', 'write'] },
  { module: 'Rechnungen', key: 'invoices', permissions: ['read', 'write'] },
  { module: 'Kalender', key: 'calendar', permissions: ['read', 'write'] },
  { module: 'Teams', key: 'crews', permissions: ['read', 'write'] },
  { module: 'Berichte', key: 'reports', permissions: ['read'] },
  { module: 'Einstellungen', key: 'settings', permissions: ['read', 'write'] },
];

export default function PermissionsForm({ user, onSubmit, onCancel }: PermissionsFormProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rolePerms, setRolePerms] = useState<string[]>([]);

  useEffect(() => {
    // Initialize selected from user permissions
    const initial: Record<string, boolean> = {};
    modulePermissions.forEach(mod => {
      mod.permissions.forEach(perm => {
        const key = `${mod.key}:${perm}`;
        initial[key] = user.permissions.includes(key) || user.permissions.includes('*');
      });
    });
    setSelected(initial);
    // Get role default permissions
    const roleDef = roleDefinitions.find(r => r.id === user.role);
    setRolePerms(roleDef?.permissions || []);
  }, [user]);

  const handleToggle = (permKey: string) => {
    setSelected(prev => ({ ...prev, [permKey]: !prev[permKey] }));
  };

  const handleSelectAll = () => {
    const allTrue: Record<string, boolean> = {};
    Object.keys(selected).forEach(key => { allTrue[key] = true; });
    setSelected(allTrue);
  };

  const handleDeselectAll = () => {
    const allFalse: Record<string, boolean> = {};
    Object.keys(selected).forEach(key => { allFalse[key] = false; });
    setSelected(allFalse);
  };

  const handleSubmit = async () => {
    const permissions = Object.entries(selected)
      .filter(([, val]) => val)
      .map(([key]) => key);
    setIsLoading(true);
    await onSubmit(permissions);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-3xl w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-5 border-b border-white/10 bg-gray-900/95">
          <h2 className="text-xl font-semibold text-white">Berechtigungen - {user.firstName} {user.lastName}</h2>
          <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-sm text-gray-300">Rolle: <span className="text-white font-semibold">{roleDefinitions.find(r => r.id === user.role)?.name}</span></p>
            <p className="text-xs text-gray-500 mt-1">Standardberechtigungen der Rolle werden automatisch vererbt. Sie können hier zusätzliche Rechte vergeben oder einschränken.</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button onClick={handleSelectAll} className="text-xs text-blue-400 hover:text-blue-300">Alle auswählen</button>
              <button onClick={handleDeselectAll} className="text-xs text-gray-400 hover:text-gray-300">Alle abwählen</button>
            </div>
          </div>
          <div className="space-y-4">
            {modulePermissions.map(module => (
              <div key={module.key} className="border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">{module.module}</h3>
                <div className="flex flex-wrap gap-4">
                  {module.permissions.map(perm => {
                    const permKey = `${module.key}:${perm}`;
                    const isRoleDefault = rolePerms.includes(permKey) || rolePerms.includes('*');
                    return (
                      <label key={permKey} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selected[permKey] || false}
                          onChange={() => handleToggle(permKey)}
                          className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600"
                        />
                        <span className="text-sm text-gray-300">
                          {perm === 'read' ? 'Lesen' : 'Schreiben'}
                          {isRoleDefault && <span className="text-xs text-gray-500 ml-1">(Rolle)</span>}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onCancel} className="px-4 py-2 glass rounded-lg text-gray-300">Abbrechen</button>
            <button onClick={handleSubmit} disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
              {isLoading ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Berechtigungen speichern</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}