'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { createComplaintFromOrder } from '@/lib/mock/complaints';
import ComplaintForm from '@/components/complaints/ComplaintForm';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
}

interface SelectedOrder {
  id: string;
  number: string;
}

export default function NewComplaintPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] =
    useState<SelectedOrder | null>(null);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem('orders');

      if (storedOrders) {
        const parsedOrders: Order[] = JSON.parse(storedOrders);
        setOrders(parsedOrders);
      } else {
        setOrders([
          {
            id: 'ord1',
            orderNumber: 'SC-2412',
            customerName: 'ABC Construction GmbH',
          },
        ]);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);

      setOrders([
        {
          id: 'ord1',
          orderNumber: 'SC-2412',
          customerName: 'ABC Construction GmbH',
        },
      ]);
    }
  }, []);

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder({
      id: order.id,
      number: order.orderNumber,
    });

    setShowForm(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (!selectedOrder) return;

      await createComplaintFromOrder(selectedOrder.id, data);

      router.push('/complaints');
    } catch (error) {
      console.error('Error creating complaint:', error);
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
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/complaints">
          <button className="glass rounded-lg p-2">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-white">
            Neue Reklamation
          </h1>

          <p className="text-gray-400">
            Wählen Sie den betroffenen Auftrag aus
          </p>
        </div>
      </div>

      {/* Orders Card */}
      <div className="glass-card overflow-hidden">
        <div className="border-b border-white/10 p-5">
          <h2 className="font-semibold text-white">
            Aufträge
          </h2>
        </div>

        <div className="divide-y divide-white/10">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="flex cursor-pointer items-center justify-between p-4 transition hover:bg-white/5"
                onClick={() => handleSelectOrder(order)}
              >
                <div>
                  <span className="font-medium text-white">
                    {order.orderNumber}
                  </span>

                  <p className="text-sm text-gray-400">
                    {order.customerName}
                  </p>
                </div>

                <button className="text-sm text-blue-400 hover:text-blue-300">
                  Auswählen
                </button>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-400">
              Keine Aufträge gefunden
            </div>
          )}
        </div>
      </div>
    </div>
  );
}