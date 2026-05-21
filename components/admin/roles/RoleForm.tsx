'use client';

import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Role } from '@/types/role';

interface RoleFormProps {
  role?: Role | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function RoleForm({ role, onSubmit, onCancel }: RoleFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
      });
    }
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit(formData);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-lg w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">
            {role ? 'Rolle bearbeiten' : 'Neue Rolle anlegen'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Rollenname *</label>
            <input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Beschreibung</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 glass rounded-lg text-gray-300">Abbrechen</button>
            <button type="submit" disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
              {isLoading ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Speichern</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}