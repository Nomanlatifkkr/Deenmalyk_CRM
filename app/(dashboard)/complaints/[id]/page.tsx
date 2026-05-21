'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Calendar, Euro, AlertTriangle } from 'lucide-react';
import { fetchComplaint, deleteComplaint } from '@/lib/mock/complaints';
import { Complaint } from '@/types/complaint';

export default function ComplaintDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, [id]);
  const load = async () => { const c = await fetchComplaint(id); setComplaint(c || null); setLoading(false); };
  const handleDelete = async () => { if (confirm('Reklamation löschen?')) { await deleteComplaint(id); router.push('/complaints'); } };

  if (loading) return <div className="flex justify-center h-64"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!complaint) return <div className="text-center py-12">Reklamation nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/complaints"><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5 text-gray-400" /></button></Link>
          <div><h1 className="text-2xl font-bold text-white">{complaint.title}</h1><p className="text-gray-400">#{complaint.complaintNumber}</p></div>
        </div>
        <div className="flex gap-2">
          <Link href={`/complaints/${complaint.id}/edit`}><button className="flex items-center gap-2 px-4 py-2 glass rounded-lg"><Edit className="h-4 w-4" /> Bearbeiten</button></Link>
          <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-red-400"><Trash2 className="h-4 w-4" /> Löschen</button>
        </div>
      </div>
      <div className="glass-card p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-gray-400 text-sm">Auftrag</span><div><Link href={`/orders/${complaint.originalOrderId}`} className="text-blue-400">{complaint.originalOrderNumber}</Link></div></div>
          <div><span className="text-gray-400 text-sm">Kunde</span><div>{complaint.customerName}</div></div>
          <div><span className="text-gray-400 text-sm">Status</span><div className="capitalize">{complaint.status}</div></div>
          <div><span className="text-gray-400 text-sm">Priorität</span><div className="capitalize">{complaint.priority}</div></div>
          <div><span className="text-gray-400 text-sm">Minderung</span><div className="text-red-400">-€{complaint.reductionAmount.toLocaleString()}</div></div>
          <div><span className="text-gray-400 text-sm">Erstellt</span><div>{new Date(complaint.createdAt).toLocaleDateString('de-DE')}</div></div>
        </div>
        <div><span className="text-gray-400 text-sm">Beschreibung</span><p className="text-white mt-1">{complaint.description}</p></div>
        {complaint.notes && <div><span className="text-gray-400 text-sm">Notizen</span><p className="text-white mt-1">{complaint.notes}</p></div>}
        {complaint.scheduledDate && <div><Calendar className="h-4 w-4 inline mr-1" /><span>Geplant für: {new Date(complaint.scheduledDate).toLocaleDateString('de-DE')}</span></div>}
      </div>
      {complaint.status !== 'completed' && (
        <div className="flex justify-end">
          <Link href={`/complaints/${complaint.id}/complete`}>
            <button className="px-5 py-2 bg-green-600 rounded-lg text-white font-semibold">Reklamation abschließen</button>
          </Link>
        </div>
      )}
    </div>
  );
}