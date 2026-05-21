'use client'

import { useState } from 'react'
import { Building2, ChevronDown, Check } from 'lucide-react'
import { useCompany } from '@/lib/context/CompanyContext'

const companies = [
  { id: 'heating', name: 'Heizungsbau Süddeutschland', color: 'from-red-500 to-orange-500' },
  { id: 'screed', name: 'Estrichbau Süddeutschland', color: 'from-blue-500 to-cyan-500' },
  { id: 'electrical', name: 'Elektrotechnik Süddeutschland', color: 'from-yellow-500 to-amber-500' },
]

export default function CompanySelector() {
  const { currentCompany, setCurrentCompany } = useCompany()
  const [isOpen, setIsOpen] = useState(false)

  const selected = companies.find(c => c.id === currentCompany) || companies[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-sm text-white hover:bg-white/5 transition"
      >
        <Building2 className="h-4 w-4" />
        <span className="hidden sm:inline max-w-[150px] truncate">{selected.name}</span>
        <span className="sm:hidden text-xs">{selected.name.split(' ')[0]}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 glass rounded-lg border border-white/10 shadow-xl z-50">
            <div className="py-1">
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => {
                    setCurrentCompany(company.id)
                    setIsOpen(false)
                  }}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${company.color}`} />
                    <span>{company.name}</span>
                  </div>
                  {currentCompany === company.id && <Check className="h-4 w-4 text-green-400" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}