'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, Send, Sparkles } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate sending reset email
      if (email && email.includes('@')) {
        setIsSubmitted(true)
      } else {
        setError('Bitte geben Sie eine gültige E-Mail-Adresse ein')
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.')
    } finally {
      setIsLoading(false)
    }
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
        <h1 className="text-3xl font-bold text-white mb-2">Passwort vergessen?</h1>
        <p className="text-gray-400">
          Kein Problem! Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen.
        </p>
      </div>

      {/* Form Card */}
      <div className="glass-card p-8">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder="max@beispiel.de"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Link senden
                </>
              )}
            </button>

            <div className="text-center">
              <Link href="/login" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition">
                <ArrowLeft className="h-4 w-4" />
                Zurück zum Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">E-Mail gesendet!</h2>
            <p className="text-gray-400">
              Wir haben einen Link zum Zurücksetzen Ihres Passworts an gesendet:
              <br />
              <span className="text-blue-400 font-medium">{email}</span>
            </p>
            <p className="text-sm text-gray-500">
              Bitte überprüfen Sie auch Ihren Spam-Ordner.
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