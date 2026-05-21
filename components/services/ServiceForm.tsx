'use client';

import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Service } from '@/types/service';

interface ServiceFormProps {
  service?: Service | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function ServiceForm({ service, onSubmit, onCancel }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    unit: '',
    defaultPrice: 0,
    currency: 'EUR',
    taxRate: 19,
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description || '',
        category: service.category,
        unit: service.unit,
        defaultPrice: service.defaultPrice,
        currency: service.currency,
        taxRate: service.taxRate,
        notes: service.notes || '',
      });
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit(formData);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-5 border-b border-white/10 bg-gray-900/95">
          <h2 className="text-xl font-semibold text-white">
            {service ? 'Leistung bearbeiten' : 'Neue Leistung anlegen'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Leistungsname *</label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Beschreibung</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Kategorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              >
                <option value="">Bitte wählen</option>
                <option value="Heizung">Heizung</option>
                <option value="Estrich">Estrich</option>
                <option value="Elektro">Elektro</option>
                <option value="Dämmung">Dämmung</option>
                <option value="Trockenbau">Trockenbau</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Einheit</label>
              <input
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="z.B. m², Stück, Stunde"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Preis (netto)</label>
              <input
                type="number"
                step="0.01"
                value={formData.defaultPrice}
                onChange={(e) => setFormData({ ...formData, defaultPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Währung</label>
              <input
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Steuersatz (%)</label>
              <select
                value={formData.taxRate}
                onChange={(e) => setFormData({ ...formData, taxRate: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              >
                <option value="0">0% (z.B. §13b)</option>
                <option value="7">7% (ermäßigt)</option>
                <option value="19">19% (Standard)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Notizen</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onCancel} className="px-4 py-2 glass rounded-lg text-gray-300">
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2"
            >
              {isLoading ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Speichern</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}