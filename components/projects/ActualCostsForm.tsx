'use client';

import { useState } from 'react';
import { Plus, Save, X, Trash2 } from 'lucide-react';
import { ActualCost } from '@/types/project';

interface ActualCostsFormProps {
  costs: ActualCost[];
  onAdd: (cost: Omit<ActualCost, 'id'>) => Promise<void>;
}

const categories = [
  { value: 'material', label: 'Material' },
  { value: 'labor', label: 'Arbeitskosten' },
  { value: 'subcontractor', label: 'Subunternehmer' },
  { value: 'equipment', label: 'Geräte / Maschinen' },
  { value: 'other', label: 'Sonstige' },
];

export default function ActualCostsForm({ costs, onAdd }: ActualCostsFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: 'material' as ActualCost['category'],
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    invoiceNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onAdd(formData);
    setFormData({ category: 'material', description: '', amount: 0, date: new Date().toISOString().split('T')[0], invoiceNumber: '' });
    setShowForm(false);
    setIsLoading(false);
  };

  const totalCosts = costs.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">Erfasste Ist-Kosten</h3>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="flex items-center gap-1 text-sm text-blue-400">
            <Plus className="h-4 w-4" /> Kosten hinzufügen
          </button>
        )}
      </div>

      {costs.length === 0 && !showForm && <p className="text-gray-500 text-sm">Keine Ist-Kosten erfasst.</p>}

      <div className="space-y-2">
        {costs.map((cost) => (
          <div key={cost.id} className="glass p-3 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-white text-sm font-medium">{cost.description}</p>
              <div className="flex gap-2 text-xs text-gray-400">
                <span>{categories.find(c => c.value === cost.category)?.label}</span>
                <span>•</span>
                <span>{cost.date}</span>
                {cost.invoiceNumber && <span>• Rechnung: {cost.invoiceNumber}</span>}
              </div>
            </div>
            <span className="text-white font-semibold">€{cost.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass p-4 rounded-lg space-y-3 mt-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400">Kategorie</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as any })} className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm">
                {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400">Datum</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-400">Beschreibung</label>
              <input required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-400">Betrag (€)</label>
              <input type="number" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })} className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-400">Rechnungsnr.</label>
              <input value={formData.invoiceNumber} onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })} className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-3 py-1 glass rounded-lg text-xs text-gray-300">Abbrechen</button>
            <button type="submit" disabled={isLoading} className="px-3 py-1 bg-blue-600 rounded-lg text-xs text-white">{isLoading ? '...' : 'Hinzufügen'}</button>
          </div>
        </form>
      )}

      <div className="border-t border-white/10 pt-3 flex justify-between text-sm">
        <span className="text-gray-400">Gesamt Ist-Kosten:</span>
        <span className="text-white font-bold">€{totalCosts.toLocaleString()}</span>
      </div>
    </div>
  );
}