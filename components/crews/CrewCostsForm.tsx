'use client';

import { useState } from 'react';
import { Plus, Save, X, Trash2 } from 'lucide-react';
import { AreaCost } from '@/types/crew';

interface CrewCostsFormProps {
  costs: AreaCost[];
  onUpdate: (costs: AreaCost[]) => Promise<void>;
}

export default function CrewCostsForm({ costs, onUpdate }: CrewCostsFormProps) {
  const [items, setItems] = useState<AreaCost[]>(costs);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    setItems([...items, { area: '', hourlyRate: 0, notes: '' }]);
    setIsEditing(true);
  };

  const handleChange = (index: number, field: keyof AreaCost, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const valid = items.filter(i => i.area && i.hourlyRate > 0);
    await onUpdate(valid);
    setIsEditing(false);
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">Gebietsabhängige Stundensätze</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="text-sm text-blue-400 hover:text-blue-300">Bearbeiten</button>
        ) : (
          <div className="flex gap-2"><button onClick={() => setIsEditing(false)} className="text-sm text-gray-400">Abbrechen</button><button onClick={handleSave} disabled={isLoading} className="text-sm text-green-400">{isLoading ? '...' : 'Speichern'}</button></div>
        )}
      </div>
      {items.length === 0 && !isEditing && <p className="text-gray-500 text-sm">Keine Preise hinterlegt.</p>}
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="glass p-3 rounded-lg">
            {isEditing ? (
              <div className="flex gap-2 items-center">
                <input placeholder="Region" value={item.area} onChange={(e) => handleChange(idx, 'area', e.target.value)} className="w-32 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" />
                <input type="number" placeholder="€/h" value={item.hourlyRate} onChange={(e) => handleChange(idx, 'hourlyRate', parseFloat(e.target.value) || 0)} className="w-24 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" />
                <input placeholder="Notiz" value={item.notes || ''} onChange={(e) => handleChange(idx, 'notes', e.target.value)} className="flex-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm" />
                <button onClick={() => handleRemove(idx)}><Trash2 className="h-4 w-4 text-red-400" /></button>
              </div>
            ) : (
              <div className="flex justify-between items-center"><span className="text-white">{item.area}</span><span className="text-gray-300">€{item.hourlyRate}/h</span>{item.notes && <span className="text-xs text-gray-500">{item.notes}</span>}</div>
            )}
          </div>
        ))}
      </div>
      {isEditing && <button onClick={handleAdd} className="flex items-center gap-1 text-sm text-blue-400 mt-2"><Plus className="h-4 w-4" /> Weitere Region</button>}
    </div>
  );
}