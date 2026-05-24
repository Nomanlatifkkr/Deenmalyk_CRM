'use client';

import Link from 'next/link';
import { FileText, Calendar, Euro, TrendingUp, TrendingDown } from 'lucide-react';
import { Order } from '@/types/order';

interface OrderCardProps {
  order: Order;
}

const statusConfig = {
  draft: { label: 'Entwurf', color: 'text-gray-400' },
  confirmed: { label: 'Bestätigt', color: 'text-blue-400' },
  in_progress: { label: 'In Arbeit', color: 'text-yellow-400' },
  completed: { label: 'Abgeschlossen', color: 'text-green-400' },
  cancelled: { label: 'Storniert', color: 'text-red-400' },
};

export default function OrderCard({ order }: OrderCardProps) {
  const margin = order.actualCosts > 0 ? order.orderValue - order.actualCosts : order.orderValue - order.plannedCosts;
  const marginPercent = (margin / order.orderValue) * 100;
  const isPositive = margin > 0;

  return (
    <div className="glass-card p-5 hover:scale-[1.02] transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-mono text-gray-400">{order.orderNumber}</span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[order.status].color} bg-white/5`}>
          {statusConfig[order.status].label}
        </span>
      </div>
      <Link href={`/orders/${order.id}`}>
        <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition mt-2">{order.title}</h3>
      </Link>
      <p className="text-sm text-gray-400 mt-1">{order.customerName}</p>
      <div className="mt-3 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Volumen:</span>
          <span className="text-white">€{order.orderValue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Kosten (Plan/Ist):</span>
          <span>€{order.plannedCosts.toLocaleString()} / €{order.actualCosts.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Deckungsbeitrag:</span>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            €{margin.toLocaleString()} ({marginPercent.toFixed(0)}%)
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={`/orders/${order.id}`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm">Details</Link>
        {order.status !== 'completed' && (
          <Link href={`/orders/${order.id}/scheduling`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm">Planung</Link>
        )}
      </div>
    </div>
  );
}