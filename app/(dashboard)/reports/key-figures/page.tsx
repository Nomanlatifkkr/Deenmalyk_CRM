'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, TrendingUp, TrendingDown } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts';

const weeklyKPIs = [
  { day: 'Mo', revenue: 14200, utilization: 72, orders: 4 },
  { day: 'Di', revenue: 15800, utilization: 78, orders: 5 },
  { day: 'Mi', revenue: 16500, utilization: 82, orders: 6 },
  { day: 'Do', revenue: 17200, utilization: 85, orders: 7 },
  { day: 'Fr', revenue: 18100, utilization: 88, orders: 8 },
  { day: 'Sa', revenue: 9800, utilization: 65, orders: 3 },
];

const currentKPIs = {
  revenue: 312000,
  revenueChange: 8.3,
  costs: 228000,
  costsChange: 5.6,
  margin: 84000,
  marginChange: 12.8,
  utilization: 85,
  utilizationChange: 5.4,
  avgOrderValue: 15705,
  orderCount: 156,
  customerCount: 89,
};

const utilizationData = [
  { name: 'Heizungsbau', value: 78 },
  { name: 'Estrichbau', value: 85 },
  { name: 'Elektrotechnik', value: 68 },
];

export default function KeyFiguresPage() {
  const [period, setPeriod] = useState('week');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/reports">
          <button className="p-2 glass rounded-lg hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Kennzahlen-Dashboard</h1>
          <p className="text-gray-400 mt-1">Wichtige Leistungsindikatoren im Überblick</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 glass rounded-lg text-sm">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Period selector */}
      <div className="flex gap-2 p-1 glass rounded-xl w-fit">
        {['today', 'week', 'month', 'year'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 rounded-lg text-sm transition ${
              period === p
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {p === 'today' ? 'Heute' : p === 'week' ? 'Woche' : p === 'month' ? 'Monat' : 'Jahr'}
          </button>
        ))}
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-xs text-gray-400">Umsatz</p>
          <p className="text-xl font-bold text-white">€{currentKPIs.revenue.toLocaleString()}</p>
          <span className="text-xs text-green-400">+{currentKPIs.revenueChange}%</span>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-gray-400">Kosten</p>
          <p className="text-xl font-bold text-white">€{currentKPIs.costs.toLocaleString()}</p>
          <span className="text-xs text-red-400">+{currentKPIs.costsChange}%</span>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-gray-400">Deckungsbeitrag</p>
          <p className="text-xl font-bold text-white">€{currentKPIs.margin.toLocaleString()}</p>
          <span className="text-xs text-green-400">+{currentKPIs.marginChange}%</span>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-gray-400">Auslastung</p>
          <p className="text-xl font-bold text-white">{currentKPIs.utilization}%</p>
          <span className="text-xs text-green-400">+{currentKPIs.utilizationChange}%</span>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-gray-400">Ø Auftragswert</p>
          <p className="text-lg font-bold text-white">€{currentKPIs.avgOrderValue.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-gray-400">Aufträge (lfd.)</p>
          <p className="text-lg font-bold text-white">{currentKPIs.orderCount}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-gray-400">Aktive Kunden</p>
          <p className="text-lg font-bold text-white">{currentKPIs.customerCount}</p>
        </div>
      </div>

      {/* Daily Trend Chart */}
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-4">Tägliche Entwicklung (aktuelle Woche)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={weeklyKPIs}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis yAxisId="left" stroke="#888" />
            <YAxis yAxisId="right" orientation="right" stroke="#888" />
            <Tooltip />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#22c55e" fill="#22c55e20" name="Umsatz (€)" />
            <Area yAxisId="right" type="monotone" dataKey="utilization" stroke="#3b82f6" fill="#3b82f620" name="Auslastung (%)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Utilization by Company */}
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-4">Auslastung nach Unternehmen</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" barSize={20} data={utilizationData}>
            <RadialBar
              minAngle={15}
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              clockWise
              dataKey="value"
            />
            <Legend iconSize={10} wrapperStyle={{ color: '#888' }} />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}