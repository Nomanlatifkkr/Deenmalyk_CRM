'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { fetchComplaint, updateComplaint } from '@/lib/mock/complaints';
import { Complaint } from '@/types/complaint';

export default function EditComplaintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    reductionAmount: 0,
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const c = await fetchComplaint(id);
    if (c) {
      setComplaint(c);
      setFormData({
        title: c.title,
        description: c.description,
        priority: c.priority,
        reductionAmount: c.reductionAmount,
        notes: c.notes || '',
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateComplaint(id, formData);
    setSaving(false);
    router.push(`/complaints/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center h-64 items-center">
        <div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Reklamation nicht gefunden</p>
        <Link href="/complaints" className="text-blue-400 hover:underline mt-2 inline-block">Zurück zur Liste</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/complaints/${id}`}>
          <button className="p-2 glass rounded-lg hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Reklamation bearbeiten</h1>
          <p className="text-gray-400 text-sm">{complaint.complaintNumber} – {complaint.title}</p>
        </div>
      </div>

      <div className="glass-card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Titel *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Beschreibung *</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Priorität</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Minderungsbetrag (€)</label>
              <input
                type="number"
                step="100"
                value={formData.reductionAmount}
                onChange={(e) => setFormData({ ...formData, reductionAmount: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Notizen (intern)</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Link href={`/complaints/${id}`}>
              <button type="button" className="px-4 py-2 glass rounded-lg text-gray-300 hover:text-white transition">
                Abbrechen
              </button>
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2 hover:opacity-90 transition disabled:opacity-50"
            >
              {saving ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Speichern</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}