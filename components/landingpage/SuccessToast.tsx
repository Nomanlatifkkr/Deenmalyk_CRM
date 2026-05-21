'use client'

import { useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'

interface SuccessToastProps {
  message: string
  onClose: () => void
}

export function SuccessToast({ message, onClose }: SuccessToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 backdrop-blur rounded-lg shadow-2xl border border-green-400/30">
        <div className="flex items-center gap-3 px-4 py-3">
          <CheckCircle className="h-5 w-5 text-white" />
          <span className="text-white font-medium">{message}</span>
          <button onClick={onClose} className="ml-2 p-1 hover:bg-white/10 rounded transition">
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}