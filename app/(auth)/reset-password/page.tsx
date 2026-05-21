'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Lock, Eye, EyeOff, KeyRound, Sparkles } from 'lucide-react'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.password) {
      newErrors.password = 'Passwort ist erforderlich'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Passwort muss mindestens 6 Zeichen lang sein'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwörter stimmen nicht überein'
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
      
      console.log('Password reset with token:', token, 'new password:', formData.password)
      setIsSubmitted(true)
      
      setTimeout(() => {
        router.push('/login?reset=success')
      }, 2000)
    } catch (err) {
      setErrors({ submit: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' })
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card p-8 text-center">
          <div className="h-16 w-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Ungültiger Link</h2>
          <p className="text-gray-400 mb-6">
            Dieser Link zum Zurücksetzen des Passworts ist ungültig oder abgelaufen.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition"
          >
            Neuen Link anfordern
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10 w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Neues Passwort</h1>
        <p className="text-gray-400">Bitte geben Sie Ihr neues Passwort ein</p>
      </div>

      <div className="glass-card p-8">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Neues Passwort *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-11 pr-11 py-3 bg-white/10 border ${errors.password ? 'border-red-500' : 'border-white/20'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Passwort bestätigen *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-11 pr-11 py-3 bg-white/10 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-sm text-center">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="h-5 w-5" />
                  Passwort zurücksetzen
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <KeyRound className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Passwort zurückgesetzt!</h2>
            <p className="text-gray-400">
              Ihr Passwort wurde erfolgreich geändert.
              <br />
              Sie werden in Kürze zum Login weitergeleitet.
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition"
            >
              Zum Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}