'use client'

import { useState } from 'react'
import { X, Save } from 'lucide-react'
import { Company } from '@/types/types'

interface EditCompanyModalProps {
  isOpen: boolean
  company: Company | null
  onClose: () => void
  onSave: (id: string, data: Partial<Company>) => Promise<void>
}

export default function EditCompanyModal({ isOpen, company, onClose, onSave }: EditCompanyModalProps) {
  const [formData, setFormData] = useState<Partial<Company>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Initialize form when company changes
  useState(() => {
    if (company) {
      setFormData({
        name: company.name,
        legalName: company.legalName,
        taxId: company.taxId,
        commercialRegister: company.commercialRegister,
        address: { ...company.address },
        contact: { ...company.contact },
      })
    }
  }, [company])

  if (!isOpen || !company) return null

  const handleChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const key = field.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [key]: value } as Company['address'],
      }))
    } else if (field.startsWith('contact.')) {
      const key = field.split('.')[1]
      setFormData(prev => ({
        ...prev,
        contact: { ...prev.contact, [key]: value } as Company['contact'],
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await onSave(company.id, formData)
    setIsLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-5 border-b border-white/10 bg-gray-900/95">
          <h2 className="text-xl font-semibold text-white">{company.name} bearbeiten</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Firmenname *</label>
              <input
                required
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Rechtlicher Name</label>
              <input
                value={formData.legalName || ''}
                onChange={(e) => handleChange('legalName', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Steuernummer</label>
              <input
                value={formData.taxId || ''}
                onChange={(e) => handleChange('taxId', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Handelsregister</label>
              <input
                value={formData.commercialRegister || ''}
                onChange={(e) => handleChange('commercialRegister', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Straße + Hausnummer</label>
              <input
                value={formData.address?.street || ''}
                onChange={(e) => handleChange('address.street', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">PLZ</label>
              <input
                value={formData.address?.postalCode || ''}
                onChange={(e) => handleChange('address.postalCode', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Stadt</label>
              <input
                value={formData.address?.city || ''}
                onChange={(e) => handleChange('address.city', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Telefon</label>
              <input
                value={formData.contact?.phone || ''}
                onChange={(e) => handleChange('contact.phone', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">E-Mail</label>
              <input
                value={formData.contact?.email || ''}
                onChange={(e) => handleChange('contact.email', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 glass rounded-lg text-gray-300">Abbrechen</button>
            <button type="submit" disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
              {isLoading ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Speichern</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}