'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { fetchOrder, updateOrder } from '@/lib/mock/orders';
export default function CrewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [order, setOrder] = useState<any>(null);
  const [subServices, setSubServices] = useState([]);
  const [crews, setCrews] = useState([{ id: '1', name: 'Estrich Team A' }, { id: '2', name: 'Heizung Team' }]);
  useEffect(() => { fetchOrder(id).then(o => { setOrder(o); setSubServices(o?.subServices || []); }); }, [id]);
  const handleAssign = async (idx: number, crewId: string) => {
    const updated = [...subServices];
    updated[idx].assignedCrewId = crewId;
    updated[idx].assignedCrewName = crews.find(c => c.id === crewId)?.name;
    setSubServices(updated);
  };
  const handleSave = async () => {
    await updateOrder(id, { subServices });
    alert('Gespeichert');
  };
  if (!order) return <div>Laden...</div>;
  return (
    <div className="space-y-6"><div className="flex items-center gap-4"><Link href={`/orders/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Teams zuweisen</h1></div><button onClick={handleSave} className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded-lg"><Save className="h-4 w-4" /> Speichern</button></div>
    <div className="glass-card p-5 space-y-3">{subServices.map((s, idx) => <div key={s.id} className="flex justify-between items-center"><span>{s.name}</span><select value={s.assignedCrewId || ''} onChange={e => handleAssign(idx, e.target.value)} className="px-2 py-1 bg-white/5 border rounded"><option value="">Kein Team</option>{crews.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>)}</div></div>
  );
}