'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Lock, Phone, Building2, Sparkles, Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName) newErrors.firstName = 'Vorname ist erforderlich'
    if (!formData.lastName) newErrors.lastName = 'Nachname ist erforderlich'
    if (!formData.email) {
      newErrors.email = 'E-Mail ist erforderlich'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse'
    }
    if (!formData.password) {
      newErrors.password = 'Passwort ist erforderlich'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Passwort muss mindestens 6 Zeichen lang sein'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwörter stimmen nicht überein'
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Sie müssen die AGB akzeptieren'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Registration data:', formData)
      router.push('/login?registered=true')
    } catch (err) {
      setErrors({ submit: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative z-10 w-full max-w-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white">Konto erstellen</h1>
        <p className="text-gray-400 text-sm">Registrieren Sie sich für Ihr CRM-Konto</p>
      </div>

      {/* Registration Form */}
      <div className="glass-card p-6 max-h-[85vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Vorname *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2 bg-white/10 border ${errors.firstName ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition`}
                  placeholder="Max"
                />
              </div>
              {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nachname *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={`w-full px-3 py-2 bg-white/10 border ${errors.lastName ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition`}
                placeholder="Mustermann"
              />
              {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              E-Mail-Adresse *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full pl-9 pr-3 py-2 bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition`}
                placeholder="max@beispiel.de"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Telefonnummer
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                placeholder="+49 123 456789"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Unternehmen
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                placeholder="Ihr Unternehmen"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Passwort *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full pl-9 pr-9 py-2 bg-white/10 border ${errors.password ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Passwort bestätigen *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full pl-9 pr-9 py-2 bg-white/10 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Terms */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-400">
                Ich akzeptiere die{' '}
                <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                  Allgemeinen Geschäftsbedingungen
                </Link>
                {' '}und{' '}
                <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                  Datenschutzbestimmungen
                </Link>
              </span>
            </label>
            {errors.acceptTerms && <p className="text-red-400 text-xs mt-1">{errors.acceptTerms}</p>}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm text-center">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                Registrieren
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Bereits registriert?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Hier anmelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}