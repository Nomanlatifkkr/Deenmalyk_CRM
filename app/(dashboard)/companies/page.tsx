'use client'

import { useEffect, useState } from 'react'
import { Building2 } from 'lucide-react'
import CompanyCard from '@/components/companies/CompanyCard'
import EditCompanyModal from '@/components/companies/EditCompanyModal'
import LogoUploadModal from '@/components/companies/LogoUploadModal'
import InvoiceSettingsModal from '@/components/companies/InvoiceSettingsModal'
import { fetchCompanies, updateCompany, updateLogo, removeLogo, updateInvoiceConfig } from '@/lib/mockData'
import { Company } from '@/types/types'

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Modal states
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [logoModalOpen, setLogoModalOpen] = useState(false)
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)

  useEffect(() => {
    const load = async () => {
      const data = await fetchCompanies()
      setCompanies(data)
      setIsLoading(false)
    }
    load()
  }, [])

  const handleEdit = (company: Company) => {
    setSelectedCompany(company)
    setEditModalOpen(true)
  }

  const handleLogo = (company: Company) => {
    setSelectedCompany(company)
    setLogoModalOpen(true)
  }

  const handleInvoice = (company: Company) => {
    setSelectedCompany(company)
    setInvoiceModalOpen(true)
  }

  const handleSaveEdit = async (id: string, data: Partial<Company>) => {
    const updated = await updateCompany(id, data)
    setCompanies(prev => prev.map(c => c.id === id ? updated : c))
  }

  const handleUploadLogo = async (id: string, file: File) => {
    // Convert file to base64 for demo (real app: upload to server)
    const reader = new FileReader()
    return new Promise<void>((resolve, reject) => {
      reader.onloadend = async () => {
        const base64 = reader.result as string
        const updated = await updateLogo(id, base64)
        setCompanies(prev => prev.map(c => c.id === id ? updated : c))
        resolve()
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveLogo = async (id: string) => {
    const updated = await removeLogo(id)
    setCompanies(prev => prev.map(c => c.id === id ? updated : c))
  }

  const handleSaveInvoiceConfig = async (id: string, config: any) => {
    const updated = await updateInvoiceConfig(id, config)
    setCompanies(prev => prev.map(c => c.id === id ? updated : c))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          <Building2 className="h-7 w-7 text-blue-400" />
          Unternehmen verwalten
        </h1>
        <p className="text-gray-400 mt-1">
          Verwalten Sie Ihre drei Unternehmen - bearbeiten Sie Details, Logos und Rechnungsnummern
        </p>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onEdit={handleEdit}
            onLogo={handleLogo}
            onInvoice={handleInvoice}
          />
        ))}
      </div>

      {/* Modals */}
      <EditCompanyModal
        isOpen={editModalOpen}
        company={selectedCompany}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
      />

      <LogoUploadModal
        isOpen={logoModalOpen}
        company={selectedCompany}
        onClose={() => setLogoModalOpen(false)}
        onUpload={handleUploadLogo}
        onRemove={handleRemoveLogo}
      />

      <InvoiceSettingsModal
        isOpen={invoiceModalOpen}
        company={selectedCompany}
        onClose={() => setInvoiceModalOpen(false)}
        onSave={handleSaveInvoiceConfig}
      />
    </div>
  )
}