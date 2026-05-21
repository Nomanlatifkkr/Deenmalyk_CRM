'use client';

import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Crew } from '@/types/crew';

interface CrewFormProps {
  crew?: Crew | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function CrewForm({ crew, onSubmit, onCancel }: CrewFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'main' as 'main' | 'sub',
    contactPerson: '',
    phone: '',
    email: '',
    isActive: true,
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (crew) {
      setFormData({
        name: crew.name,
        type: crew.type,
        contactPerson: crew.contactPerson || '',
        phone: crew.phone || '',
        email: crew.email || '',
        isActive: crew.isActive,
        notes: crew.notes || '',
      });
    }
  }, [crew]);

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
          <h2 className="text-xl font-semibold text-white">{crew ? 'Team bearbeiten' : 'Neues Team anlegen'}</h2>
          <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-lg"><X className="h-5 w-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div><label className="block text-sm text-gray-300 mb-1">Teamname *</label><input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
          <div><label className="block text-sm text-gray-300 mb-1">Typ</label><select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value as any})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"><option value="main">Hauptteam</option><option value="sub">Subunternehmer</option></select></div>
          <div><label className="block text-sm text-gray-300 mb-1">Ansprechpartner</label><input value={formData.contactPerson} onChange={(e) => setFormData({...formData, contactPerson: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="block text-sm text-gray-300 mb-1">Telefon</label><input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
          <div><label className="block text-sm text-gray-300 mb-1">E-Mail</label><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div></div>
          <div><label className="flex items-center gap-2"><input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600" /><span className="text-sm text-gray-300">Aktiv</span></label></div>
          <div><label className="block text-sm text-gray-300 mb-1">Notizen</label><textarea rows={2} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
          <div className="flex justify-end gap-3 pt-4"><button type="button" onClick={onCancel} className="px-4 py-2 glass rounded-lg text-gray-300">Abbrechen</button><button type="submit" disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">{isLoading ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Speichern</>}</button></div>
        </form>
      </div>
    </div>
  );
}