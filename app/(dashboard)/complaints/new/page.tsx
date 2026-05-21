'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createComplaintFromOrder } from '@/lib/mock/complaints';
import ComplaintForm from '@/components/complaints/ComplaintForm';

export default function NewComplaintPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState<{ id: string; number: string } | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // fetch orders from localStorage or mock
    const stored = localStorage.getItem('orders');
    if (stored) setOrders(JSON.parse(stored));
    else setOrders([{ id: 'ord1', orderNumber: 'SC-2412', customerName: 'ABC Construction GmbH' }]);
  }, []);

  const handleSelectOrder = (order: any) => {
    setSelectedOrder({ id: order.id, number: order.orderNumber });
    setShowForm(true);
  };

  const handleSubmit = async (data: any) => {
    if (selectedOrder) {
      await createComplaintFromOrder(selectedOrder.id, data);
      router.push('/complaints');
    }
  };

  if (showForm && selectedOrder) {
    return (
      <ComplaintForm
        isOpen={true}
        orderId={selectedOrder.id}
        orderNumber={selectedOrder.number}
        onSubmit={handleSubmit}
        onClose={() => router.push('/complaints')}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/complaints"><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5 text-gray-400" /></button></Link>
        <div><h1 className="text-2xl font-bold text-white">Neue Reklamation</h1><p className="text-gray-400">Wählen Sie den betroffenen Auftrag aus</p></div>
      </div>
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-white/10"><h2 className="text-white font-semibold">Aufträge</h2></div>
        <div className="divide-y divide-white/10">
          {orders.map(order => (
            <div key={order.id} className="p-4 hover:bg-white/5 cursor-pointer flex justify-between items-center" onClick={() => handleSelectOrder(order)}>
              <div><span className="text-white font-medium">{order.orderNumber}</span><p className="text-sm text-gray-400">{order.customerName}</p></div>
              <button className="text-blue-400 text-sm">Auswählen</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}