'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';
import { fetchInvoices } from '@/lib/mock/invoices';
import { Invoice } from '@/types/invoice';
import InvoiceCard from '@/components/invoices/InvoiceCard';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  useEffect(() => { load(); }, []);
  const load = async () => { setInvoices(await fetchInvoices()); setLoading(false); };
  const filtered = invoices.filter(i => (i.customerName.toLowerCase().includes(search.toLowerCase()) || i.invoiceNumber.includes(search)) && (statusFilter === 'all' || i.status === statusFilter));
  if (loading) return <div className="flex justify-center h-64"><div className="animate-spin h-8 w-8" /></div>;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-white">Rechnungen</h1><p className="text-gray-400">Verwalten, erstellen, versenden</p></div>
        <div className="flex gap-2">
          <Link href="/invoices/new"><button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white"><Plus className="h-4 w-4" /> Neue Rechnung</button></Link>
          <Link href="/invoices/approval"><button className="px-3 py-2 glass rounded-lg text-sm">Genehmigung</button></Link>
          <Link href="/invoices/overdue"><button className="px-3 py-2 glass rounded-lg text-sm">Überfällig</button></Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-3"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" /><input type="text" placeholder="Suchen..." value={search} onChange={e => setSearch(e.target.value)} className="w-64 pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-white/5 border rounded text-white"><option value="all">Alle</option><option value="draft">Entwurf</option><option value="pending_approval">Genehmigung</option><option value="sent">Gesendet</option><option value="paid">Bezahlt</option><option value="overdue">Überfällig</option></select></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">{filtered.map(i => <InvoiceCard key={i.id} invoice={i} />)}</div>
    </div>
  );
}