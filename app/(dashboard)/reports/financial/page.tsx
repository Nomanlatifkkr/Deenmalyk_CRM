'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  ArrowLeft,
  Download,
  TrendingUp,
} from 'lucide-react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

interface MonthlyData {
  month: string;
  revenue: number;
  costs: number;
  margin: number;
}

interface YearlyData {
  revenue: number;
  costs: number;
  margin: number;
  marginPercent: number;
}

interface CostBreakdown {
  category: string;
  amount: number;
  percent: number;
}

const monthlyData: MonthlyData[] = [
  {
    month: 'Jan',
    revenue: 185000,
    costs: 138000,
    margin: 47000,
  },
  {
    month: 'Feb',
    revenue: 198000,
    costs: 145000,
    margin: 53000,
  },
  {
    month: 'Mär',
    revenue: 212000,
    costs: 158000,
    margin: 54000,
  },
  {
    month: 'Apr',
    revenue: 235000,
    costs: 172000,
    margin: 63000,
  },
  {
    month: 'Mai',
    revenue: 245000,
    costs: 182000,
    margin: 63000,
  },
];

const yearlyData: YearlyData = {
  revenue: 2850000,
  costs: 2120000,
  margin: 730000,
  marginPercent: 25.6,
};

const costBreakdown: CostBreakdown[] = [
  {
    category: 'Material',
    amount: 892000,
    percent: 42,
  },
  {
    category: 'Personal',
    amount: 745000,
    percent: 35,
  },
  {
    category: 'Subunternehmer',
    amount: 298000,
    percent: 14,
  },
  {
    category: 'Sonstige',
    amount: 185000,
    percent: 9,
  },
];

export default function FinancialReportPage() {
  const [period, setPeriod] = useState<'month' | 'year'>(
    'month'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/reports">
          <button className="glass rounded-lg p-2 transition hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-white">
            Finanzberichte
          </h1>

          <p className="mt-1 text-gray-400">
            Umsatz, Kosten und Deckungsbeiträge
          </p>
        </div>

        <div className="ml-auto flex gap-2">
          <button className="glass flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition hover:bg-white/10">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card p-5">
          <p className="text-sm text-gray-400">
            Umsatz (Jahresgesamtwert)
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            €{(yearlyData.revenue / 1000).toFixed(0)}k
          </p>

          <div className="mt-2 flex items-center gap-1 text-sm text-green-400">
            <TrendingUp className="h-4 w-4" />
            +8.3%
          </div>
        </div>

        <div className="glass-card p-5">
          <p className="text-sm text-gray-400">
            Kosten
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            €{(yearlyData.costs / 1000).toFixed(0)}k
          </p>

          <div className="mt-2 flex items-center gap-1 text-sm text-red-400">
            <TrendingUp className="h-4 w-4" />
            +5.2%
          </div>
        </div>

        <div className="glass-card p-5">
          <p className="text-sm text-gray-400">
            Deckungsbeitrag
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            €{(yearlyData.margin / 1000).toFixed(0)}k
          </p>

          <div className="mt-2 flex items-center gap-1 text-sm text-green-400">
            <TrendingUp className="h-4 w-4" />
            +12.5%
          </div>
        </div>

        <div className="glass-card p-5">
          <p className="text-sm text-gray-400">
            DB-Marge
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {yearlyData.marginPercent}%
          </p>

          <div className="mt-2 flex items-center gap-1 text-sm text-green-400">
            <TrendingUp className="h-4 w-4" />
            +2.1%
          </div>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="glass-card p-5">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Monatliche Entwicklung
        </h3>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <LineChart data={monthlyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#333"
            />

            <XAxis
              dataKey="month"
              stroke="#888"
            />

            <YAxis stroke="#888" />

            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                borderColor: '#374151',
                borderRadius: '8px',
              }}
              formatter={(value: number) =>
                `€${value.toLocaleString()}`
              }
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#22c55e"
              name="Umsatz"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="costs"
              stroke="#ef4444"
              name="Kosten"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="margin"
              stroke="#3b82f6"
              name="Deckungsbeitrag"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart */}
        <div className="glass-card p-5">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Kostenaufteilung
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={costBreakdown}
              layout="vertical"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#333"
              />

              <XAxis
                type="number"
                stroke="#888"
              />

              <YAxis
                dataKey="category"
                type="category"
                stroke="#888"
              />

              <Tooltip
                formatter={(value: number) =>
                  `€${value.toLocaleString()}`
                }
              />

              <Bar
                dataKey="amount"
                fill="#f59e0b"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Percentages */}
        <div className="glass-card p-5">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Kostenanteile
          </h3>

          <div className="space-y-4">
            {costBreakdown.map((item) => (
              <div key={item.category}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-300">
                    {item.category}
                  </span>

                  <span className="font-medium text-white">
                    {item.percent}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all"
                    style={{
                      width: `${item.percent}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}