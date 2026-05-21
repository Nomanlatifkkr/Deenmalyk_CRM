'use client'

import { useCompany } from '@/lib/context/CompanyContext'
import Link from 'next/link'
import { Building2, Check, ArrowRight, TrendingUp, Users, FileText } from 'lucide-react'

const companies = [
  {
    id: 'heating',
    name: 'Heizungsbau Süddeutschland',
    shortName: 'Heizungsbau',
    color: 'from-red-500 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
    stats: {
      orders: 48,
      revenue: '€245.000',
      employees: 12,
    },
    description: 'Spezialist für Heizungsinstallation, Kesseldienst und Fußbodenheizung'
  },
  {
    id: 'screed',
    name: 'Estrichbau Süddeutschland',
    shortName: 'Estrichbau',
    color: 'from-blue-500 to-cyan-500',
    bgGradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    stats: {
      orders: 62,
      revenue: '€312.000',
      employees: 18,
    },
    description: 'Spezialist für Estrichverlegung, Bodenausgleich und Industrieböden'
  },
  {
    id: 'electrical',
    name: 'Elektrotechnik Süddeutschland',
    shortName: 'Elektrotechnik',
    color: 'from-yellow-500 to-amber-500',
    bgGradient: 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20',
    borderColor: 'border-yellow-500/30',
    stats: {
      orders: 35,
      revenue: '€189.000',
      employees: 8,
    },
    description: 'Spezialist für Elektroinstallation, Verteilerschrank und Smart Home Systeme'
  },
]

export default function CompanySwitchPage() {
  const { currentCompany, setCurrentCompany } = useCompany()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Unternehmen wechseln</h1>
        <p className="text-gray-400 mt-1">
          Wählen Sie das Unternehmen aus, mit dem Sie arbeiten möchten
        </p>
      </div>

      {/* Company Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {companies.map((company) => {
          const isActive = currentCompany === company.id
          return (
            <div
              key={company.id}
              onClick={() => setCurrentCompany(company.id)}
              className={`relative cursor-pointer rounded-2xl transition-all duration-300 ${
                isActive
                  ? `ring-2 ring-offset-2 ring-offset-gray-900 ring-${company.color.split(' ')[1]} ${company.bgGradient} border ${company.borderColor}`
                  : 'glass-card hover:scale-105'
              }`}
            >
              {isActive && (
                <div className="absolute top-4 right-4">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
              
              <div className="p-6">
                {/* Icon & Name */}
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center mb-4`}>
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{company.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{company.description}</p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs text-gray-500">Aufträge</p>
                    <p className="text-lg font-semibold text-white">{company.stats.orders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Umsatz (MTD)</p>
                    <p className="text-lg font-semibold text-white">{company.stats.revenue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mitarbeiter</p>
                    <p className="text-lg font-semibold text-white">{company.stats.employees}</p>
                  </div>
                </div>

                {/* Active Indicator Button */}
                {!isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentCompany(company.id)
                    }}
                    className={`mt-6 w-full py-2 rounded-lg bg-gradient-to-br ${company.color} text-white font-semibold text-sm hover:opacity-90 transition`}
                  >
                    Dieses Unternehmen auswählen
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Info Box */}
      <div className="glass-card p-5 mt-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Unternehmenübergreifende Daten</h3>
            <p className="text-gray-400 text-sm">
              Kunden, Lieferanten und Materialien werden über alle Unternehmen hinweg gemeinsam genutzt. 
              Angebote, Aufträge und Rechnungen werden für das jeweils ausgewählte Unternehmen erstellt 
              und erhalten unternehmensspezifische, fortlaufende Nummern.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}