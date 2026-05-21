'use client';

import Link from 'next/link';
import { FileText, Euro, BarChart3, Calendar, Users, TrendingUp, PieChart, Download } from 'lucide-react';

const reportCategories = [
  {
    title: 'Auftragsberichte',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    href: '/reports/orders',
    description: 'Auftragsübersichten, Status, Auslastung',
  },
  {
    title: 'Finanzberichte',
    icon: Euro,
    color: 'from-green-500 to-emerald-500',
    href: '/reports/financial',
    description: 'Umsatz, Kosten, Deckungsbeiträge',
  },
  {
    title: 'Kennzahlen',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    href: '/reports/key-figures',
    description: 'KPIs, Trends, Performance-Metriken',
  },
  {
    title: 'Kapazitätsplanung',
    icon: Calendar,
    color: 'from-orange-500 to-red-500',
    href: '/reports/capacity',
    description: 'Auslastung, freie Kapazitäten',
  },
  {
    title: 'Team-Abrechnungen',
    icon: Users,
    color: 'from-teal-500 to-green-500',
    href: '/reports/crew-settlements',
    description: 'Stunden, Lohnvorbereitung',
  },
];

const quickStats = [
  { label: 'Umsatz (MTD)', value: '€312.000', change: '+8.3%', positive: true },
  { label: 'Aufträge (lfd.)', value: '42', change: '+12%', positive: true },
  { label: 'Auslastung', value: '78%', change: '+5%', positive: true },
  { label: 'Ø Deckungsbeitrag', value: '27%', change: '+2%', positive: true },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Berichte & Analysen</h1>
        <p className="text-gray-400 mt-1">Umfassende Auswertungen für Ihr Unternehmen</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => (
          <div key={idx} className="glass-card p-4">
            <p className="text-xs text-gray-400">{stat.label}</p>
            <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
            <span className={`text-xs ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</span>
          </div>
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reportCategories.map((cat) => (
          <Link key={cat.title} href={cat.href}>
            <div className="glass-card p-5 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4`}>
                <cat.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{cat.title}</h3>
              <p className="text-sm text-gray-400">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}