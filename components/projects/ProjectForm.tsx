'use client';

import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

interface ProjectFormProps {
  project?: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  customers: { id: string; name: string }[];
}

export default function ProjectForm({ project, onSubmit, onCancel, customers }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    customerId: '',
    startDate: '',
    totalValue: 0,
    plannedCosts: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || '',
        customerId: project.customerId,
        startDate: project.startDate,
        totalValue: project.totalValue,
        plannedCosts: project.plannedCosts,
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit(formData);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">{project ? 'Projekt bearbeiten' : 'Neues Projekt anlegen'}</h2>
          <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Projektname *</label>
            <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Beschreibung</label>
            <textarea rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Kunde *</label>
            <select required value={formData.customerId} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
              <option value="">Bitte wählen</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Startdatum</label>
              <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Projektvolumen (€)</label>
              <input type="number" value={formData.totalValue} onChange={(e) => setFormData({ ...formData, totalValue: parseFloat(e.target.value) || 0 })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Geplante Kosten (€)</label>
              <input type="number" value={formData.plannedCosts} onChange={(e) => setFormData({ ...formData, plannedCosts: parseFloat(e.target.value) || 0 })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
            </div>
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