'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import { fetchOrder, addActualCost } from '@/lib/mock/orders';
export default function CostsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [order, setOrder] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [newCost, setNewCost] = useState({ category: 'material', description: '', amount: 0, date: new Date().toISOString().split('T')[0] });
  useEffect(() => { fetchOrder(id).then(setOrder); }, [id]);
  const handleAdd = async () => {
    await addActualCost(id, newCost);
    setShowForm(false);
    const updated = await fetchOrder(id);
    setOrder(updated);
  };
  if (!order) return <div>Laden...</div>;
  return (
    <div className="space-y-6"><div className="flex items-center gap-4"><Link href={`/orders/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Ist-Kosten</h1></div><button onClick={() => setShowForm(true)} className="ml-auto px-3 py-1.5 glass rounded-lg"><Plus className="h-4 w-4 inline" /> Kosten hinzufügen</button></div>
    <div className="glass-card p-5"><table className="w-full text-sm"><thead><tr><th>Datum</th><th>Kategorie</th><th>Beschreibung</th><th>Betrag</th></tr></thead><tbody>{order.actualCostsList.map(c => <tr key={c.id}><td>{c.date}</td><td>{c.category}</td><td>{c.description}</td><td>€{c.amount}</td></tr>)}</tbody></table><div className="mt-4 text-right font-bold">Gesamt: €{order.actualCosts.toLocaleString()}</div></div>
    {showForm && <div className="glass-card p-5"><h3>Neue Kosten</h3><select value={newCost.category} onChange={e => setNewCost({...newCost, category: e.target.value})} className="w-full p-2 bg-white/5 border rounded my-2"><option value="material">Material</option><option value="labor">Arbeit</option><option value="subcontractor">Subunternehmer</option></select><input placeholder="Beschreibung" value={newCost.description} onChange={e => setNewCost({...newCost, description: e.target.value})} className="w-full p-2 bg-white/5 border rounded my-2" /><input type="number" placeholder="Betrag" value={newCost.amount} onChange={e => setNewCost({...newCost, amount: parseFloat(e.target.value)||0})} className="w-full p-2 bg-white/5 border rounded my-2" /><button onClick={handleAdd} className="px-4 py-2 bg-blue-600 rounded-lg">Speichern</button></div>}</div>
  );
}