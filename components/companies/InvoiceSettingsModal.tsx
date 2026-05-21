'use client'

import { useState } from 'react'
import { X, Save } from 'lucide-react'
import { Company } from '@/types/types'

interface InvoiceSettingsModalProps {
  isOpen: boolean
  company: Company | null
  onClose: () => void
  onSave: (id: string, config: Partial<Company['invoiceNumberConfig']>) => Promise<void>
}

export default function InvoiceSettingsModal({ isOpen, company, onClose, onSave }: InvoiceSettingsModalProps) {
  const [config, setConfig] = useState({
    prefix: '',
    nextNumber: 1,
    suffix: '',
    padding: 4,
  })
  const [isLoading, setIsLoading] = useState(false)

  useState(() => {
    if (company) {
      setConfig({
        prefix: company.invoiceNumberConfig.prefix,
        nextNumber: company.invoiceNumberConfig.nextNumber,
        suffix: company.invoiceNumberConfig.suffix,
        padding: company.invoiceNumberConfig.padding,
      })
    }
  }, [company])

  if (!isOpen || !company) return null

  const preview = `${config.prefix}${String(config.nextNumber).padStart(config.padding, '0')}${config.suffix}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await onSave(company.id, config)
    setIsLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-lg w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Rechnungsnummern - {company.shortName}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Präfix</label>
              <input
                value={config.prefix}
                onChange={(e) => setConfig({ ...config, prefix: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono"
                placeholder="HB"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Suffix</label>
              <input
                value={config.suffix}
                onChange={(e) => setConfig({ ...config, suffix: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono"
                placeholder="-2024"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nächste Nummer</label>
              <input
                type="number"
                value={config.nextNumber}
                onChange={(e) => setConfig({ ...config, nextNumber: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Stellen (mit Nullen)</label>
              <select
                value={config.padding}
                onChange={(e) => setConfig({ ...config, padding: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="3">3 (001)</option>
                <option value="4">4 (0001)</option>
                <option value="5">5 (00001)</option>
              </select>
            </div>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <p className="text-sm text-gray-400">Vorschau nächste Rechnung</p>
            <p className="text-2xl font-mono font-bold text-white">{preview}</p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 glass rounded-lg">Abbrechen</button>
            <button type="submit" disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
              {isLoading ? 'Speichern...' : <><Save className="h-4 w-4" /> Speichern</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}