'use client';

import { useState } from 'react';
import { Plus, Save, X, Trash2, Edit } from 'lucide-react';
import { SubService } from '@/types/project';

interface SubServiceListProps {
  subServices: SubService[];
  crews: { id: string; name: string }[];
  onUpdate: (subServices: SubService[]) => Promise<void>;
}

export default function SubServiceList({ subServices, crews, onUpdate }: SubServiceListProps) {
  const [items, setItems] = useState<SubService[]>(subServices);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    const newItem: SubService = {
      id: `temp-${Date.now()}`,
      name: '',
      description: '',
      quantity: 0,
      unit: 'Stück',
      unitPrice: 0,
      totalPrice: 0,
      status: 'pending',
    };
    setItems([...items, newItem]);
    setIsEditing(true);
  };

  const handleChange = (index: number, field: keyof SubService, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      updated[index].totalPrice = updated[index].quantity * updated[index].unitPrice;
    }
    setItems(updated);
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const valid = items.filter(i => i.name && i.quantity > 0 && i.unitPrice > 0);
    await onUpdate(valid);
    setIsEditing(false);
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">Sub-Leistungen</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
            <Edit className="h-4 w-4" /> Bearbeiten
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(false)} className="text-sm text-gray-400">Abbrechen</button>
            <button onClick={handleSave} disabled={isLoading} className="flex items-center gap-1 text-sm text-green-400">
              <Save className="h-4 w-4" /> Speichern
            </button>
          </div>
        )}
      </div>

      {items.length === 0 && !isEditing && <p className="text-gray-500 text-sm">Keine Sub-Leistungen definiert.</p>}

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={item.id} className="glass p-4 rounded-lg">
            {isEditing ? (
              <div className="space-y-2">
                <input placeholder="Name" value={item.name} onChange={(e) => handleChange(idx, 'name', e.target.value)} className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" />
                <textarea placeholder="Beschreibung" value={item.description || ''} onChange={(e) => handleChange(idx, 'description', e.target.value)} className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" rows={1} />
                <div className="grid grid-cols-3 gap-2">
                  <input type="number" placeholder="Menge" value={item.quantity} onChange={(e) => handleChange(idx, 'quantity', parseFloat(e.target.value) || 0)} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" />
                  <input type="text" placeholder="Einheit" value={item.unit} onChange={(e) => handleChange(idx, 'unit', e.target.value)} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" />
                  <input type="number" placeholder="€/Einheit" value={item.unitPrice} onChange={(e) => handleChange(idx, 'unitPrice', parseFloat(e.target.value) || 0)} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" />
                </div>
                <div className="flex justify-between items-center">
                  <select value={item.assignedCrewId || ''} onChange={(e) => handleChange(idx, 'assignedCrewId', e.target.value)} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm">
                    <option value="">Team zuweisen</option>
                    {crews.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <span className="text-white text-sm">€{item.totalPrice.toFixed(2)}</span>
                  <button onClick={() => handleRemove(idx)} className="text-red-400"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.quantity} {item.unit} × €{item.unitPrice.toFixed(2)}</p>
                  {item.assignedCrewId && <p className="text-xs text-blue-400">Team: {crews.find(c => c.id === item.assignedCrewId)?.name}</p>}
                </div>
                <span className="text-white font-semibold">€{item.totalPrice.toLocaleString()}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <button onClick={handleAdd} className="flex items-center gap-1 text-sm text-blue-400 mt-2">
          <Plus className="h-4 w-4" /> Sub-Leistung hinzufügen
        </button>
      )}
    </div>
  );
}