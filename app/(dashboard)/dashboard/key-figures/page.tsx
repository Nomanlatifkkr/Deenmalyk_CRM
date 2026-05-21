'use client'

import { useCompany } from '@/lib/context/CompanyContext'
import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Calendar,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Euro,
  PieChart,
  BarChart3
} from 'lucide-react'

// Mock data - will be replaced with API calls
const getKeyFigures = (companyId: string, period: string) => {
  const baseData: Record<string, any> = {
    heating: {
      today: {
        revenue: 12500,
        costs: 8900,
        contributionMargin: 3600,
        utilization: 78,
        ordersCompleted: 3,
        newOrders: 2,
      },
      week: {
        revenue: 84500,
        costs: 62100,
        contributionMargin: 22400,
        utilization: 76,
        ordersCompleted: 12,
        newOrders: 8,
      },
      month: {
        revenue: 245000,
        costs: 182000,
        contributionMargin: 63000,
        utilization: 74,
        ordersCompleted: 48,
        newOrders: 35,
      },
      year: {
        revenue: 2850000,
        costs: 2120000,
        contributionMargin: 730000,
        utilization: 72,
        ordersCompleted: 520,
        newOrders: 410,
      }
    },
    screed: {
      today: {
        revenue: 16800,
        costs: 12100,
        contributionMargin: 4700,
        utilization: 85,
        ordersCompleted: 4,
        newOrders: 3,
      },
      week: {
        revenue: 112000,
        costs: 81500,
        contributionMargin: 30500,
        utilization: 82,
        ordersCompleted: 18,
        newOrders: 11,
      },
      month: {
        revenue: 312000,
        costs: 228000,
        contributionMargin: 84000,
        utilization: 80,
        ordersCompleted: 62,
        newOrders: 45,
      },
      year: {
        revenue: 3650000,
        costs: 2680000,
        contributionMargin: 970000,
        utilization: 78,
        ordersCompleted: 680,
        newOrders: 520,
      }
    },
    electrical: {
      today: {
        revenue: 9800,
        costs: 7200,
        contributionMargin: 2600,
        utilization: 68,
        ordersCompleted: 2,
        newOrders: 1,
      },
      week: {
        revenue: 65200,
        costs: 48500,
        contributionMargin: 16700,
        utilization: 65,
        ordersCompleted: 9,
        newOrders: 6,
      },
      month: {
        revenue: 189000,
        costs: 141000,
        contributionMargin: 48000,
        utilization: 62,
        ordersCompleted: 35,
        newOrders: 28,
      },
      year: {
        revenue: 2150000,
        costs: 1610000,
        contributionMargin: 540000,
        utilization: 60,
        ordersCompleted: 420,
        newOrders: 310,
      }
    }
  }
  return baseData[companyId]?.[period] || baseData.screed.week
}

// Mock trends data (can be replaced with real previous period comparison)
const getTrends = (companyId: string) => {
  const trendsMap: Record<string, any> = {
    heating: { revenue: 12.5, costs: 8.2, contributionMargin: 18.3, utilization: 5.4 },
    screed: { revenue: 8.3, costs: 5.6, contributionMargin: 12.8, utilization: 3.2 },
    electrical: { revenue: 15.2, costs: 10.1, contributionMargin: 22.4, utilization: 7.8 },
  }
  return trendsMap[companyId] || { revenue: 0, costs: 0, contributionMargin: 0, utilization: 0 }
}

const companyNames: Record<string, string> = {
  heating: 'Heizungsbau',
  screed: 'Estrichbau',
  electrical: 'Elektrotechnik',
}

export default function KeyFiguresPage() {
  const { currentCompany } = useCompany()
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'year'>('week')
  
  const figures = getKeyFigures(currentCompany, period)
  const trends = getTrends(currentCompany)

  const periodLabels = {
    today: 'Heute',
    week: 'Diese Woche',
    month: 'Dieser Monat',
    year: 'Dieses Jahr',
  }

  const mainCards = [
    { 
      label: 'Umsatz', 
      value: `€${figures.revenue?.toLocaleString() || 0}`, 
      trend: trends.revenue, 
      icon: DollarSign, 
      color: 'from-green-500 to-emerald-600',
      isPositive: trends.revenue > 0,
    },
    { 
      label: 'Kosten', 
      value: `€${figures.costs?.toLocaleString() || 0}`, 
      trend: trends.costs, 
      icon: Clock, 
      color: 'from-red-500 to-rose-600',
      isPositive: trends.costs < 0,
    },
    { 
      label: 'Deckungsbeitrag', 
      value: `€${figures.contributionMargin?.toLocaleString() || 0}`, 
      trend: trends.contributionMargin, 
      icon: TrendingUp, 
      color: 'from-blue-500 to-indigo-600',
      isPositive: trends.contributionMargin > 0,
    },
    { 
      label: 'Auslastung', 
      value: `${figures.utilization || 0}%`, 
      trend: trends.utilization, 
      icon: PieChart, 
      color: 'from-purple-500 to-pink-600',
      isPositive: trends.utilization > 0,
    },
  ]

  const secondaryCards = [
    { label: 'Abgeschlossene Aufträge', value: figures.ordersCompleted || 0, icon: BarChart3, color: 'text-green-400' },
    { label: 'Neue Aufträge', value: figures.newOrders || 0, icon: TrendingUp, color: 'text-blue-400' },
    { label: 'DB Marge', value: `${Math.round(((figures.contributionMargin || 0) / (figures.revenue || 1)) * 100)}%`, icon: Euro, color: 'text-purple-400' },
  ]

  const handleExport = () => {
    console.log('Export key figures', { company: currentCompany, period, figures })
    alert('Export gestartet - wird als CSV heruntergeladen')
  }

  const handleRefresh = () => {
    alert('Daten werden aktualisiert...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Tageskennzahlen</h1>
          <p className="text-gray-400 mt-1">
            <span className="text-blue-400">{companyNames[currentCompany]}</span> • Echtzeit-Kennzahlen und Trends
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2 glass rounded-lg text-gray-400 hover:text-white transition"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-white transition"
          >
            <Download className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">Exportieren</span>
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 p-1 glass rounded-xl w-fit">
        {(['today', 'week', 'month', 'year'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              period === p
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {periodLabels[p]}
          </button>
        ))}
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {mainCards.map((card, idx) => (
          <div key={idx} className="glass-card p-5 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
              <div className={`flex items-center gap-1 ${card.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {card.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span className="text-sm font-semibold">{Math.abs(card.trend)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">{card.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
            <p className="text-xs text-gray-500 mt-2">vs. vorheriger {periodLabels[period]}</p>
          </div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {secondaryCards.map((card, idx) => (
          <div key={idx} className="glass-card p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{card.label}</p>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
            <card.icon className={`h-8 w-8 ${card.color}`} />
          </div>
        ))}
      </div>

      {/* Detailed Section: Margin Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contribution Margin Chart (visual placeholder) */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Deckungsbeitragsanalyse</h3>
            <span className="text-xs text-gray-500">in €</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Umsatz</span>
                <span className="text-white">€{figures.revenue?.toLocaleString() || 0}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Variable Kosten</span>
                <span className="text-white">€{figures.costs?.toLocaleString() || 0}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${((figures.costs || 0) / (figures.revenue || 1)) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Deckungsbeitrag</span>
                <span className="text-white">€{figures.contributionMargin?.toLocaleString() || 0}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${((figures.contributionMargin || 0) / (figures.revenue || 1)) * 100}%` }} />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10">
            <p className="text-sm text-gray-400">
              Deckungsbeitragsquote: <span className="text-blue-400 font-semibold">{Math.round(((figures.contributionMargin || 0) / (figures.revenue || 1)) * 100)}%</span>
            </p>
          </div>
        </div>

        {/* Utilization Trend */}
        <div className="glass-card p-5">
          <h3 className="text-white font-semibold mb-4">Auslastungstrend</h3>
          <div className="relative h-32 flex items-end gap-2">
            {[72, 78, 82, 85, 88, 85, 82].map((value, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all"
                  style={{ height: `${value}%` }}
                />
                <span className="text-xs text-gray-500 mt-2">{['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][idx]}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-400">
            <span>Ø Auslastung: {figures.utilization || 0}%</span>
            <span className="text-green-400">+5% vs. letzte Woche</span>
          </div>
        </div>
      </div>

      {/* Daily Comparison Table */}
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-4">Täglicher Vergleich (aktuelle Woche)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-gray-400 font-medium">Tag</th>
                <th className="text-right py-3 text-gray-400 font-medium">Umsatz</th>
                <th className="text-right py-3 text-gray-400 font-medium">Kosten</th>
                <th className="text-right py-3 text-gray-400 font-medium">DB</th>
                <th className="text-right py-3 text-gray-400 font-medium">Auslastung</th>
               </tr>
            </thead>
            <tbody>
              {[
                { day: 'Montag', revenue: 14200, costs: 10100, margin: 4100, utilization: 72 },
                { day: 'Dienstag', revenue: 15800, costs: 11200, margin: 4600, utilization: 78 },
                { day: 'Mittwoch', revenue: 16500, costs: 11800, margin: 4700, utilization: 82 },
                { day: 'Donnerstag', revenue: 17200, costs: 12100, margin: 5100, utilization: 85 },
                { day: 'Freitag', revenue: 18100, costs: 12800, margin: 5300, utilization: 88 },
                { day: 'Samstag', revenue: 9800, costs: 7200, margin: 2600, utilization: 65 },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-white/5">
                  <td className="py-3 text-white">{row.day}</td>
                  <td className="py-3 text-right text-green-400">€{row.revenue.toLocaleString()}</td>
                  <td className="py-3 text-right text-red-400">€{row.costs.toLocaleString()}</td>
                  <td className="py-3 text-right text-blue-400">€{row.margin.toLocaleString()}</td>
                  <td className="py-3 text-right text-white">{row.utilization}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export / Print hint */}
      <div className="text-center text-xs text-gray-500 pb-4">
        Datenstand: {new Date().toLocaleString('de-DE')} • Alle Angaben ohne Gewähr
      </div>
    </div>
  )
}