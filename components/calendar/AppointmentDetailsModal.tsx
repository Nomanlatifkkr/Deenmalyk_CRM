'use client';

import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Appointment, Crew } from '@/types/calendar';

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  appointment: Appointment | null;
  crews: Crew[];
  onClose: () => void;
  onSave: (data: Partial<Appointment>) => Promise<void>;
}

export default function AppointmentDetailsModal({
  isOpen,
  appointment,
  crews,
  onClose,
  onSave,
}: AppointmentDetailsModalProps) {
  const [formData, setFormData] = useState({
    start: '',
    end: '',
    crewId: '',
    status: 'scheduled' as Appointment['status'],
    location: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (appointment) {
      setFormData({
        start: appointment.start.slice(0, 16),
        end: appointment.end.slice(0, 16),
        crewId: appointment.crewId,
        status: appointment.status,
        location: appointment.location || '',
        description: appointment.description || '',
      });
    }
  }, [appointment]);

  if (!isOpen || !appointment) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSave({
      start: new Date(formData.start).toISOString(),
      end: new Date(formData.end).toISOString(),
      crewId: formData.crewId,
      crewName: crews.find(c => c.id === formData.crewId)?.name || '',
      status: formData.status,
      location: formData.location,
      description: formData.description,
    });
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-lg w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Termin bearbeiten</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Auftragsnummer</label>
            <input value={appointment.orderNumber || '—'} disabled className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white opacity-70" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Start</label>
              <input type="datetime-local" value={formData.start} onChange={e => setFormData({...formData, start: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Ende</label>
              <input type="datetime-local" value={formData.end} onChange={e => setFormData({...formData, end: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Team</label>
            <select value={formData.crewId} onChange={e => setFormData({...formData, crewId: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
              {crews.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
              <option value="scheduled">Geplant</option>
              <option value="in_progress">In Arbeit</option>
              <option value="completed">Abgeschlossen</option>
              <option value="cancelled">Storniert</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Ort</label>
            <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Notiz</label>
            <textarea rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 glass rounded-lg text-gray-300">Abbrechen</button>
            <button type="submit" disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
              {isLoading ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Speichern</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}