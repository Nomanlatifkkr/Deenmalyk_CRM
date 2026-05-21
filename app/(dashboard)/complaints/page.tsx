'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';
import { fetchComplaints } from '@/lib/mock/complaints';
import { Complaint } from '@/types/complaint';
import ComplaintCard from '@/components/complaints/ComplaintCard';

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  const load = async () => { const data = await fetchComplaints(); setComplaints(data); setLoading(false); };
  const filtered = complaints.filter(c =>
    (c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.complaintNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.originalOrderNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || c.status === statusFilter)
  );
  if (loading) return <div className="flex justify-center h-64"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div><h1 className="text-2xl font-bold text-white">Reklamationen</h1><p className="text-gray-400">Verwalten Sie Kundenreklamationen und Nachbesserungen</p></div>
        <Link href="/complaints/new">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold"><Plus className="h-4 w-4" /> Neue Reklamation</button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" /><input type="text" placeholder="Suchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-64 pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"><option value="all">Alle Status</option><option value="open">Offen</option><option value="in_progress">In Arbeit</option><option value="completed">Erledigt</option></select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(c => <ComplaintCard key={c.id} complaint={c} />)}
      </div>
      {filtered.length === 0 && <div className="text-center py-12 text-gray-400">Keine Reklamationen gefunden</div>}
    </div>
  );
}