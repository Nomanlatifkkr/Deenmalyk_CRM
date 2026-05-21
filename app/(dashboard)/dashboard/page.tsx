'use client'

import { useCompany } from '@/lib/context/CompanyContext'
import { Building2, Users, FileText, Receipt, TrendingUp, Clock, CheckCircle, AlertCircle, FileCheck } from 'lucide-react'

// Mock data - will be replaced with real API calls
const getDashboardData = (companyId: string) => {
  const data = {
    heating: {
      revenue: 245000,
      costs: 182000,
      contributionMargin: 63000,
      utilization: 78,
      openOrders: 12,
      completedOrders: 48,
      pendingInvoices: 8,
    },
    screed: {
      revenue: 312000,
      costs: 228000,
      contributionMargin: 84000,
      utilization: 85,
      openOrders: 15,
      completedOrders: 62,
      pendingInvoices: 11,
    },
    electrical: {
      revenue: 189000,
      costs: 141000,
      contributionMargin: 48000,
      utilization: 68,
      openOrders: 9,
      completedOrders: 35,
      pendingInvoices: 6,
    },
  }
  return data[companyId as keyof typeof data] || data.screed
}

const recentActivities = [
  { id: 1, type: 'order', title: 'Auftrag #SC-2412', status: 'in_progress', date: '2024-05-18' },
  { id: 2, type: 'offer', title: 'Angebot #AN-453', status: 'sent', date: '2024-05-17' },
  { id: 3, type: 'invoice', title: 'Rechnung #RE-982', status: 'paid', date: '2024-05-16' },
  { id: 4, type: 'complaint', title: 'Reklamation #RB-07', status: 'open', date: '2024-05-15' },
]

export default function DashboardPage() {
  const { currentCompany } = useCompany()
  const data = getDashboardData(currentCompany)

  const companyNames: Record<string, string> = {
    heating: 'Heizungsbau Süddeutschland',
    screed: 'Estrichbau Süddeutschland',
    electrical: 'Elektrotechnik Süddeutschland',
  }

  const stats = [
    { name: 'Umsatz (MTD)', value: `€${data.revenue.toLocaleString()}`, icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
    { name: 'Kosten (MTD)', value: `€${data.costs.toLocaleString()}`, icon: Clock, color: 'from-red-500 to-rose-600' },
    { name: 'Deckungsbeitrag', value: `€${data.contributionMargin.toLocaleString()}`, icon: CheckCircle, color: 'from-blue-500 to-indigo-600' },
    { name: 'Auslastung', value: `${data.utilization}%`, icon: Building2, color: 'from-purple-500 to-pink-600' },
  ]

  const orderStats = [
    { name: 'Offene Aufträge', value: data.openOrders, icon: FileText, color: 'text-yellow-500' },
    { name: 'Abgeschlossene Aufträge', value: data.completedOrders, icon: CheckCircle, color: 'text-green-500' },
    { name: 'Offene Rechnungen', value: data.pendingInvoices, icon: Receipt, color: 'text-orange-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Willkommen zurück, Max • Aktives Unternehmen: <span className="text-blue-400">{companyNames[currentCompany]}</span>
        </p>
      </div>

      {/* Key Figures Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orderStats.map((stat) => (
          <div key={stat.name} className="glass-card p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.name}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass-card p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Letzte Aktivitäten</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <div>
                  <p className="text-white font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activity.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                  activity.status === 'sent' ? 'bg-yellow-500/20 text-yellow-400' :
                  activity.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {activity.status === 'in_progress' ? 'In Bearbeitung' :
                   activity.status === 'sent' ? 'Gesendet' :
                   activity.status === 'paid' ? 'Bezahlt' : 'Offen'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Schnellaktionen</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 glass rounded-lg text-center hover:bg-white/5 transition">
              <FileText className="h-6 w-6 text-blue-400 mx-auto mb-1" />
              <span className="text-xs text-gray-300">Neuer Auftrag</span>
            </button>
            <button className="p-3 glass rounded-lg text-center hover:bg-white/5 transition">
              <Receipt className="h-6 w-6 text-green-400 mx-auto mb-1" />
              <span className="text-xs text-gray-300">Neue Rechnung</span>
            </button>
            <button className="p-3 glass rounded-lg text-center hover:bg-white/5 transition">
              <FileCheck className="h-6 w-6 text-purple-400 mx-auto mb-1" />
              <span className="text-xs text-gray-300">Neues Angebot</span>
            </button>
            <button className="p-3 glass rounded-lg text-center hover:bg-white/5 transition">
              <Users className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
              <span className="text-xs text-gray-300">Neuer Kunde</span>
            </button>
          </div>
        </div>
      </div>

      {/* Utilization Chart placeholder (simple) */}
      <div className="glass-card p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Auslastung (Woche)</h2>
        <div className="h-32 flex items-end gap-2">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map((day, idx) => (
            <div key={day} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all"
                style={{ height: `${Math.random() * 80 + 20}%` }}
              />
              <span className="text-xs text-gray-500 mt-2">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}