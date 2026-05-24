'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchOrder, updateOrder } from '@/lib/mock/orders';
import OrderForm from '@/components/orders/OrderForm';
export default function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { load(); }, [id]);
  const load = async () => {
    const o = await fetchOrder(id);
    setOrder(o);
    const stored = localStorage.getItem('customers');
    setCustomers(stored ? JSON.parse(stored) : [{ id: 'c1', name: 'ABC Construction GmbH' }]);
    setLoading(false);
  };
  const handleSubmit = async (data: any) => {
    await updateOrder(id, data);
    router.push(`/orders/${id}`);
  };
  if (loading) return <div className="flex justify-center h-64"><div className="animate-spin h-8 w-8" /></div>;
  if (!order) return <div>Nicht gefunden</div>;
  return (
    <div className="space-y-6"><div className="flex items-center gap-4"><Link href={`/orders/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Auftrag bearbeiten</h1><p className="text-gray-400">{order.orderNumber}</p></div></div>
    <OrderForm order={order} customers={customers} onSubmit={handleSubmit} onCancel={() => router.push(`/orders/${id}`)} />
    </div>
  );
}