'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchOrders, updateOrder } from '@/lib/mock/orders';
import { Order } from '@/types/order';
const columns = ['draft', 'confirmed', 'in_progress', 'completed'];
const columnTitles = { draft: 'Entwurf', confirmed: 'Bestätigt', in_progress: 'In Arbeit', completed: 'Abgeschlossen' };
export default function BoardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { load(); }, []);
  const load = async () => { setOrders(await fetchOrders()); };
  const moveOrder = async (orderId: string, newStatus: string) => {
    await updateOrder(orderId, { status: newStatus as any });
    load();
  };
  return (
    <div className="space-y-6"><h1 className="text-2xl font-bold text-white">Kanban Board</h1><div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {columns.map(col => (
        <div key={col} className="glass-card p-4"><h2 className="text-white font-semibold mb-3">{columnTitles[col]}</h2><div className="space-y-2">
          {orders.filter(o => o.status === col).map(o => (
            <div key={o.id} className="p-3 glass rounded-lg"><Link href={`/orders/${o.id}`}><p className="text-white font-medium">{o.orderNumber}</p><p className="text-xs text-gray-400">{o.title}</p></Link><button onClick={() => moveOrder(o.id, col === 'completed' ? 'confirmed' : 'in_progress')} className="mt-2 text-xs text-blue-400">→</button></div>
          ))}
        </div></div>
      ))}
    </div></div>
  );
}