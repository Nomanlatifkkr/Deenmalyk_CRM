'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Filter, Search, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data
const orderStats = {
  totalOrders: 156,
  completedOrders: 112,
  inProgress: 32,
  pending: 12,
  totalValue: 2450000,
  avgOrderValue: 15705,
};

const monthlyOrders = [
  { month: 'Jan', orders: 24, value: 380000 },
  { month: 'Feb', orders: 28, value: 420000 },
  { month: 'Mär', orders: 32, value: 510000 },
  { month: 'Apr', orders: 35, value: 560000 },
  { month: 'Mai', orders: 37, value: 580000 },
];

const orderStatusData = [
  { name: 'Abgeschlossen', value: 112, color: '#22c55e' },
  { name: 'In Bearbeitung', value: 32, color: '#3b82f6' },
  { name: 'Offen', value: 12, color: '#eab308' },
];

const topCustomers = [
  { name: 'ABC Bau GmbH', orders: 18, value: 285000 },
  { name: 'Hochtief AG', orders: 14, value: 342000 },
  { name: 'Stuttgart Projekt', orders: 12, value: 198000 },
];

export default function OrdersReportPage() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/reports">
          <button className="p-2 glass rounded-lg hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Auftragsberichte</h1>
          <p className="text-gray-400 mt-1">Analyse Ihrer Auftragsdaten</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 glass rounded-lg text-sm">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card p-4">
          <p className="text-xs text-gray-400">Gesamtaufträge</p>
          <p className="text-2xl font-bold text-white">{orderStats.totalOrders}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-gray-400">Abgeschlossen</p>
          <p className="text-2xl font-bold text-green-400">{orderStats.completedOrders}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-gray-400">In Bearbeitung</p>
          <p className="text-2xl font-bold text-blue-400">{orderStats.inProgress}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-gray-400">Auftragswert</p>
          <p className="text-2xl font-bold text-white">€{(orderStats.totalValue / 1000).toFixed(0)}k</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-gray-400">Ø Auftragswert</p>
          <p className="text-2xl font-bold text-white">€{orderStats.avgOrderValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Orders Chart */}
        <div className="glass-card p-5">
          <h3 className="text-white font-semibold mb-4">Monatliche Aufträge</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="orders" fill="#3b82f6" name="Anzahl" />
              <Bar dataKey="value" fill="#8b5cf6" name="Wert (€)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie */}
        <div className="glass-card p-5">
          <h3 className="text-white font-semibold mb-4">Auftragsstatus</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {orderStatusData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Customers Table */}
      <div className="glass-card overflow-hidden">
        <h3 className="text-white font-semibold p-5 pb-0">Top-Kunden nach Auftragswert</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Kunde</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Aufträge</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Gesamtwert</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {topCustomers.map((c, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="px-6 py-3 text-white">{c.name}</td>
                  <td className="px-6 py-3 text-gray-300">{c.orders}</td>
                  <td className="px-6 py-3 text-white">€{c.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}