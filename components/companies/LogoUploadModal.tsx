'use client'

import { useState, useRef } from 'react'
import { X, Upload, Trash2 } from 'lucide-react'
import { Company } from '@/types/types'

interface LogoUploadModalProps {
  isOpen: boolean
  company: Company | null
  onClose: () => void
  onUpload: (id: string, file: File) => Promise<void>
  onRemove: (id: string) => Promise<void>
}

export default function LogoUploadModal({ isOpen, company, onClose, onUpload, onRemove }: LogoUploadModalProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen || !company) return null

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Bitte nur Bilddateien (PNG, JPG, JPEG)')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Maximal 2MB')
      return
    }
    setIsLoading(true)
    await onUpload(company.id, file)
    setIsLoading(false)
    onClose()
  }

  const handleRemove = async () => {
    if (confirm('Logo wirklich entfernen?')) {
      setIsLoading(true)
      await onRemove(company.id)
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Logo - {company.shortName}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          {/* Current Logo Preview */}
          <div className="flex justify-center">
            {company.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={company.logo} alt={company.name} className="h-32 w-32 object-contain rounded-xl bg-white/5 p-2" />
            ) : (
              <div className="h-32 w-32 rounded-xl bg-white/5 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Kein Logo</span>
              </div>
            )}
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center transition ${
              isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-white/20'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragging(false)
              const file = e.dataTransfer.files[0]
              if (file) handleFile(file)
            }}
          >
            <Upload className="h-10 w-10 text-gray-500 mx-auto mb-2" />
            <p className="text-white mb-1">Logo hierher ziehen oder</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-400 hover:text-blue-300"
            >
              Datei auswählen
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <p className="text-xs text-gray-500 mt-2">PNG, JPG, max. 2MB</p>
          </div>

          {/* Remove Button */}
          {company.logo && (
            <button
              onClick={handleRemove}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2 glass rounded-lg text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
              Logo entfernen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}