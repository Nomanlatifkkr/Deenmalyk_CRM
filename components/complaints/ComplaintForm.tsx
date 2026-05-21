'use client';

import { useState } from 'react';
import { X, Save } from 'lucide-react';

interface ComplaintFormProps {
  isOpen: boolean;
  orderId?: string;
  orderNumber?: string;
  onSubmit: (data: any) => Promise<void>;
  onClose: () => void;
}

export default function ComplaintForm({ isOpen, orderId, orderNumber, onSubmit, onClose }: ComplaintFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    reductionAmount: 0,
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit({ ...formData, orderId });
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-lg w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Neue Reklamation zu {orderNumber}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="h-5 w-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Titel *</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Beschreibung *</label>
            <textarea rows={3} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Priorität</label>
              <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Minderungsbetrag (€)</label>
              <input type="number" step="100" value={formData.reductionAmount} onChange={e => setFormData({...formData, reductionAmount: parseFloat(e.target.value)||0})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Notizen (intern)</label>
            <textarea rows={2} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 glass rounded-lg text-gray-300">Abbrechen</button>
            <button type="submit" disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
              {isLoading ? 'Wird erstellt...' : <><Save className="h-4 w-4" /> Reklamation erstellen</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}