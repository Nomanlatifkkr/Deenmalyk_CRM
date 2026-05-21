'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">CRM System</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#home" className="text-gray-300 hover:text-white transition">Startseite</Link>
            <Link href="/#features" className="text-gray-300 hover:text-white transition">Funktionen</Link>
            <Link href="/#services" className="text-gray-300 hover:text-white transition">Leistungen</Link>
            <Link href="/#contact" className="text-gray-300 hover:text-white transition">Kontakt</Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="px-4 py-2 text-gray-300 hover:text-white transition"
            >
              Anmelden
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition"
            >
              Jetzt starten
            </Link>
          </div>

          {/* Mobile Button */}
          <button className="md:hidden p-2 glass rounded-lg" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              <Link href="/#home" className="text-gray-300 hover:text-white px-3 py-2" onClick={() => setIsOpen(false)}>Startseite</Link>
              <Link href="/#features" className="text-gray-300 hover:text-white px-3 py-2" onClick={() => setIsOpen(false)}>Funktionen</Link>
              <Link href="/#services" className="text-gray-300 hover:text-white px-3 py-2" onClick={() => setIsOpen(false)}>Leistungen</Link>
              <Link href="/#contact" className="text-gray-300 hover:text-white px-3 py-2" onClick={() => setIsOpen(false)}>Kontakt</Link>
              <div className="pt-3 flex space-x-3">
                <Link 
                  href="/login" 
                  className="flex-1 px-4 py-2 text-gray-300 border border-white/10 rounded-lg text-center hover:bg-white/5 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Anmelden
                </Link>
                <Link 
                  href="/register" 
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white text-center hover:from-blue-700 hover:to-purple-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Registrieren
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}