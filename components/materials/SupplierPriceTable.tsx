'use client';

import { useState } from 'react';
import { Plus, Save, X, Edit, Trash2 } from 'lucide-react';
import { SupplierPrice, Supplier } from '@/types/materials/types';

interface SupplierPriceTableProps {
  prices: SupplierPrice[];
  suppliers: Supplier[];
  onUpdate: (prices: SupplierPrice[]) => Promise<void>;
  readOnly?: boolean;
}

export default function SupplierPriceTable({ prices, suppliers, onUpdate, readOnly = false }: SupplierPriceTableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPrices, setEditPrices] = useState<SupplierPrice[]>(prices);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    const newPrice: SupplierPrice = {
      supplierId: '',
      supplierName: '',
      price: 0,
      currency: 'EUR',
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: '',
    };
    setEditPrices([...editPrices, newPrice]);
  };

  const handleRemove = (index: number) => {
    setEditPrices(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...editPrices];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'supplierId') {
      const selected = suppliers.find(s => s.id === value);
      if (selected) updated[index].supplierName = selected.name;
    }
    setEditPrices(updated);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const validPrices = editPrices.filter(p => p.supplierId && p.price > 0);
    await onUpdate(validPrices);
    setIsEditing(false);
    setIsLoading(false);
  };

  if (!readOnly && !isEditing) {
    return (
      <div className="glass-card p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Lieferantenpreise</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm text-blue-400 hover:text-blue-300"
          >
            <Edit className="h-4 w-4" /> Preise bearbeiten
          </button>
        </div>
        {prices.length === 0 ? (
          <p className="text-gray-500 text-sm">Keine Preise hinterlegt</p>
        ) : (
          <div className="space-y-2">
            {prices.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <span className="text-white font-medium">{p.supplierName}</span>
                  <span className="text-gray-400 text-sm ml-2">{p.currency} {p.price.toFixed(2)}</span>
                </div>
                {p.lastUpdated && <span className="text-xs text-gray-500">Stand: {p.lastUpdated}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Editing mode
  return (
    <div className="glass-card p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Lieferantenpreise bearbeiten</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="p-1.5 glass rounded-lg text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {editPrices.map((price, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-5">
              <select
                value={price.supplierId}
                onChange={(e) => handleChange(idx, 'supplierId', e.target.value)}
                className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                required
              >
                <option value="">Lieferant wählen</option>
                {suppliers.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-3">
              <input
                type="number"
                step="0.01"
                value={price.price}
                onChange={(e) => handleChange(idx, 'price', parseFloat(e.target.value))}
                placeholder="Preis"
                className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
              />
            </div>
            <div className="col-span-3">
              <input
                type="date"
                value={price.lastUpdated}
                onChange={(e) => handleChange(idx, 'lastUpdated', e.target.value)}
                className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
              />
            </div>
            <div className="col-span-1">
              <button
                onClick={() => handleRemove(idx)}
                className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="col-span-12">
              <textarea
                value={price.notes || ''}
                onChange={(e) => handleChange(idx, 'notes', e.target.value)}
                placeholder="Notizen (z.B. Staffelpreise)"
                className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-xs"
                rows={1}
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 mt-2"
        >
          <Plus className="h-4 w-4" /> Weitere Preiszeile hinzufügen
        </button>
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-white/10">
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1.5 glass rounded-lg text-gray-300 text-sm"
          >
            Verwerfen
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white text-sm flex items-center gap-1"
          >
            <Save className="h-3.5 w-3.5" /> Speichern
          </button>
        </div>
      </div>
    </div>
  );
}