'use client'

import { Menu, Bell, User, LogOut, Settings as SettingsIcon } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CompanySelector from './CompanySelector'

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const router = useRouter()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = () => {
    // Clear auth state (to be implemented)
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Menu button (mobile) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg glass text-gray-400 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Center / Right: Company selector + user menu */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Company selector */}
            <CompanySelector />

            {/* Notifications */}
            <button className="p-2 rounded-lg glass text-gray-400 hover:text-white relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg glass hover:bg-white/5 transition"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden sm:inline text-sm text-white">Max Mustermann</span>
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 glass rounded-lg border border-white/10 shadow-xl z-50">
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profil
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <SettingsIcon className="h-4 w-4" />
                        Einstellungen
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5"
                      >
                        <LogOut className="h-4 w-4" />
                        Abmelden
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}