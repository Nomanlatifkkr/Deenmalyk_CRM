'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createOrder } from '@/lib/mock/orders';
import OrderForm from '@/components/orders/OrderForm';
export default function NewOrderPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem('customers');
    if (stored) setCustomers(JSON.parse(stored));
    else setCustomers([{ id: 'c1', name: 'ABC Construction GmbH' }, { id: 'c2', name: 'Bauwerk AG' }]);
  }, []);
  const handleSubmit = async (data: any) => {
    const orderData = { ...data, status: 'draft', subServices: [], materialOrders: [], mediaFiles: [], actualCostsList: [] };
    await createOrder(orderData);
    router.push('/orders');
  };
  return (
    <div className="space-y-6"><div className="flex items-center gap-4"><Link href="/orders"><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5 text-gray-400" /></button></Link><div><h1 className="text-2xl font-bold text-white">Neuer Auftrag</h1></div></div>
    <OrderForm order={null} customers={customers} onSubmit={handleSubmit} onCancel={() => router.push('/orders')} />
    </div>
  );
}