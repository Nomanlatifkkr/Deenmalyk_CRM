'use client'

import { Building2, Edit, Image, FileText } from 'lucide-react'
import { Company } from '@/types/types'

interface CompanyCardProps {
  company: Company
  onEdit: (company: Company) => void
  onLogo: (company: Company) => void
  onInvoice: (company: Company) => void
}

export default function CompanyCard({ company, onEdit, onLogo, onInvoice }: CompanyCardProps) {
  const colorMap: Record<string, string> = {
    heating: 'from-red-500 to-orange-500',
    screed: 'from-blue-500 to-cyan-500',
    electrical: 'from-yellow-500 to-amber-500',
  }
  const gradient = colorMap[company.id] || 'from-gray-500 to-gray-600'

  const previewNumber = `${company.invoiceNumberConfig.prefix}${String(company.invoiceNumberConfig.nextNumber).padStart(company.invoiceNumberConfig.padding, '0')}${company.invoiceNumberConfig.suffix}`

  return (
    <div className="glass-card p-5 hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
          {company.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={company.logo} alt={company.name} className="h-10 w-10 object-contain" />
          ) : (
            <Building2 className="h-6 w-6 text-white" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{company.name}</h3>
          <p className="text-sm text-gray-400">Steuernr.: {company.taxId}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-xs px-2 py-0.5 glass rounded-full">{company.invoiceNumberConfig.prefix}</span>
            <span className="text-xs px-2 py-0.5 glass rounded-full">Nächste: {previewNumber}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(company)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg glass text-sm text-gray-300 hover:text-white transition"
        >
          <Edit className="h-4 w-4" />
          Bearbeiten
        </button>
        <button
          onClick={() => onLogo(company)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg glass text-sm text-gray-300 hover:text-white transition"
        >
          <Image className="h-4 w-4" />
          Logo
        </button>
        <button
          onClick={() => onInvoice(company)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg glass text-sm text-gray-300 hover:text-white transition"
        >
          <FileText className="h-4 w-4" />
          Rechnungsnr.
        </button>
      </div>
    </div>
  )
}