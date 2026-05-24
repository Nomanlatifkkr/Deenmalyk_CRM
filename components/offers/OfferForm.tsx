'use client';
import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Offer, OfferService } from '@/types/offer';

interface OfferFormProps {
  offer?: Offer | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function OfferForm({ offer, onSubmit, onCancel }: OfferFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customerId: '',
    validUntil: '',
    taxRate: 19,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title,
        description: offer.description || '',
        customerId: offer.customerId,
        validUntil: offer.validUntil,
        taxRate: offer.taxRate,
      });
    }
  }, [offer]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="max-w-lg w-full bg-gray-900 rounded-2xl border border-white/20">
        <div className="flex justify-between p-5 border-b border-white/10"><h2 className="text-xl font-semibold text-white">{offer ? 'Angebot bearbeiten' : 'Neues Angebot'}</h2><button onClick={onCancel}><X className="h-5 w-5" /></button></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div><label>Titel *</label><input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 bg-white/5 border rounded text-white" /></div>
          <div><label>Beschreibung</label><textarea rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 bg-white/5 border rounded text-white" /></div>
          <div><label>Kunde *</label><select required value={formData.customerId} onChange={e => setFormData({...formData, customerId: e.target.value})} className="w-full p-2 bg-white/5 border rounded text-white"><option value="">Wählen</option><option value="c1">ABC Construction GmbH</option><option value="c2">Bauwerk AG</option></select></div>
          <div><label>Gültig bis</label><input type="date" value={formData.validUntil} onChange={e => setFormData({...formData, validUntil: e.target.value})} className="w-full p-2 bg-white/5 border rounded text-white" /></div>
          <div><label>Steuersatz (%)</label><select value={formData.taxRate} onChange={e => setFormData({...formData, taxRate: parseInt(e.target.value)})} className="w-full p-2 bg-white/5 border rounded text-white"><option value="0">0% (z.B. §13b)</option><option value="19">19%</option></select></div>
          <div className="flex justify-end gap-3"><button type="button" onClick={onCancel} className="px-4 py-2 glass rounded-lg">Abbrechen</button><button type="submit" disabled={loading} className="px-5 py-2 bg-blue-600 rounded-lg text-white">{loading ? 'Speichert...' : <><Save className="h-4 w-4 inline" /> Speichern</>}</button></div>
        </form>
      </div>
    </div>
  );
}