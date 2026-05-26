'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, TrendingUp, TrendingDown } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 185000, costs: 138000, margin: 47000 },
  { month: 'Feb', revenue: 198000, costs: 145000, margin: 53000 },
  { month: 'Mär', revenue: 212000, costs: 158000, margin: 54000 },
  { month: 'Apr', revenue: 235000, costs: 172000, margin: 63000 },
  { month: 'Mai', revenue: 245000, costs: 182000, margin: 63000 },
];

const yearlyData = {
  revenue: 2850000,
  costs: 2120000,
  margin: 730000,
  marginPercent: 25.6,
};

const costBreakdown = [
  { category: 'Material', amount: 892000, percent: 42 },
  { category: 'Personal', amount: 745000, percent: 35 },
  { category: 'Subunternehmer', amount: 298000, percent: 14 },
  { category: 'Sonstige', amount: 185000, percent: 9 },
];

export default function FinancialReportPage() {
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
          <h1 className="text-2xl font-bold text-white">Finanzberichte</h1>
          <p className="text-gray-400 mt-1">Umsatz, Kosten und Deckungsbeiträge</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 glass rounded-lg text-sm">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Annual Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <p className="text-sm text-gray-400">Umsatz (Jahresgesamtwert)</p>
          <p className="text-2xl font-bold text-white">€{(yearlyData.revenue / 1000).toFixed(0)}k</p>
          <div className="flex items-center gap-1 mt-1 text-green-400 text-sm">
            <TrendingUp className="h-3 w-3" /> +8.3%
          </div>
        </div>
        <div className="glass-card p-5">
          <p className="text-sm text-gray-400">Kosten</p>
          <p className="text-2xl font-bold text-white">€{(yearlyData.costs / 1000).toFixed(0)}k</p>
          <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
            <TrendingUp className="h-3 w-3" /> +5.2%
          </div>
        </div>
        <div className="glass-card p-5">
          <p className="text-sm text-gray-400">Deckungsbeitrag</p>
          <p className="text-2xl font-bold text-white">€{(yearlyData.margin / 1000).toFixed(0)}k</p>
          <div className="flex items-center gap-1 mt-1 text-green-400 text-sm">
            <TrendingUp className="h-3 w-3" /> +12.5%
          </div>
        </div>
        <div className="glass-card p-5">
          <p className="text-sm text-gray-400">DB-Marge</p>
          <p className="text-2xl font-bold text-white">{yearlyData.marginPercent}%</p>
          <div className="flex items-center gap-1 mt-1 text-green-400 text-sm">
            <TrendingUp className="h-3 w-3" /> +2.1%
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-4">Monatliche Entwicklung</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
              formatter={(value: number) => `€${value.toLocaleString()}`}
            />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#22c55e" name="Umsatz" strokeWidth={2} />
            <Line type="monotone" dataKey="costs" stroke="#ef4444" name="Kosten" strokeWidth={2} />
            <Line type="monotone" dataKey="margin" stroke="#3b82f6" name="Deckungsbeitrag" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-white font-semibold mb-4">Kostenaufteilung</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" />
              <YAxis dataKey="category" type="category" stroke="#888" />
              <Tooltip formatter={(value: number) => `€${value.toLocaleString()}`} />
              <Bar dataKey="amount" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-white font-semibold mb-4">Kostenanteile</h3>
          <div className="space-y-3">
            {costBreakdown.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{item.category}</span>
                  <span className="text-white">{item.percent}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}