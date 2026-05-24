'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Sparkles } from 'lucide-react';
import { fetchOffers } from '@/lib/mock/offers';
import { Offer } from '@/types/offer';
import OfferCard from '@/components/offers/OfferCard';

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  useEffect(() => { load(); }, []);
  const load = async () => { setOffers(await fetchOffers()); setLoading(false); };
  const filtered = offers.filter(o => (o.title.toLowerCase().includes(search.toLowerCase()) || o.offerNumber.includes(search)) && (filter === 'all' || o.status === filter));
  if (loading) return <div className="flex justify-center h-64"><div className="animate-spin h-8 w-8" /></div>;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-white">Angebote</h1><p className="text-gray-400">Verwalten, erstellen und konvertieren</p></div>
        <div className="flex gap-2">
          <Link href="/offers/auto-generate"><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><Sparkles className="h-4 w-4" /> KI‑Generierung</button></Link>
          <Link href="/offers/new/checklist"><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg">Checkliste</button></Link>
          <Link href="/offers/new"><button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white"><Plus className="h-4 w-4" /> Angebot erstellen</button></Link>
        </div>
      </div>
      <div className="flex gap-3"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" /><input type="text" placeholder="Suchen..." value={search} onChange={e => setSearch(e.target.value)} className="w-64 pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div><select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 bg-white/5 border rounded text-white"><option value="all">Alle</option><option value="draft">Entwurf</option><option value="sent">Gesendet</option><option value="accepted">Akzeptiert</option><option value="converted">Konvertiert</option></select></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">{filtered.map(o => <OfferCard key={o.id} offer={o} />)}</div>
      {filtered.length === 0 && <div className="text-center py-12 text-gray-400">Keine Angebote</div>}
    </div>
  );
}