'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  Users,
  Truck,
  Package,
  Wrench,
  FileText,
  FileCheck,
  Receipt,
  Calendar,
  HardHat,
  AlertTriangle,
  FolderKanban,
  BarChart3,
  Settings,
  ChevronLeft,
  Sparkles,
  Thermometer,
  Zap,
  ChevronDown,
  ChevronUp,
  Shield,
  UserCog,
} from 'lucide-react'

interface NavItem {
  name: string
  href?: string
  icon: any
  subItems?: NavItem[]
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { 
    name: 'Unternehmen', 
    icon: Building2,
    subItems: [
      { name: 'Übersicht', href: '/companies', icon: Building2 },
      { name: 'Wechseln', href: '/dashboard/company-switch', icon: Building2 },
      { name: 'Tageskennzahlen', href: '/dashboard/key-figures', icon: BarChart3 },
    ]
  },
  { name: 'Kunden', href: '/customers', icon: Users },
  { name: 'Lieferanten', href: '/suppliers', icon: Truck },
  { name: 'Material', href: '/materials', icon: Package },
  { name: 'Leistungen', href: '/services', icon: Wrench },
  { name: 'Aufträge', href: '/orders', icon: FileText },
  { name: 'Angebote', href: '/offers', icon: FileCheck },
  { name: 'Rechnungen', href: '/invoices', icon: Receipt },
  { name: 'Kalender', href: '/calendar', icon: Calendar },
  { name: 'Teams', href: '/crews', icon: HardHat },
  { name: 'Reklamationen', href: '/complaints', icon: AlertTriangle },
  { name: 'Projekte', href: '/projects', icon: FolderKanban },
  { name: 'Berichte', href: '/reports', icon: BarChart3 },
  {
    name: 'Administration',
    icon: Shield,
    subItems: [
      { name: 'Benutzer', href: '/admin/users', icon: Users },
      { name: 'Rollen', href: '/admin/roles', icon: UserCog },
      {
        name: 'Einstellungen',
        icon: Settings,
        subItems: [
          { name: 'Module', href: '/admin/settings/modules', icon: Settings },
          { name: 'Backup', href: '/admin/settings/backup', icon: Settings },
          { name: 'Rechnungsvorlage', href: '/admin/settings/invoice-template', icon: Settings },
          { name: 'Branding', href: '/admin/settings/branding', icon: Settings },
        ]
      }
    ]
  },
]

const companyModules: NavItem[] = [
  { name: 'Heizungsbau', href: '/heating', icon: Thermometer },
  { name: 'Elektrotechnik', href: '/electrical', icon: Zap },
]

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Unternehmen: true,
    Administration: false,
    Einstellungen: false,
  })

  const toggleSubmenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isOpen = openMenus[item.name]
    const active = item.href ? isActive(item.href) : false

    if (hasSubItems) {
      return (
        <div key={item.name} className="space-y-1">
          <button
            onClick={() => toggleSubmenu(item.name)}
            className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
              active
                ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-white/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              {item.name}
            </div>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {isOpen && (
            <div className={`${depth === 0 ? 'ml-6' : 'ml-4'} space-y-1`}>
              {item.subItems!.map(sub => renderNavItem(sub, depth + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href!}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
          active
            ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-white/10'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <item.icon className="h-5 w-5" />
        {item.name}
      </Link>
    )
  }

  return (
    <>
      {/* Desktop sidebar - full height with scroll */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col lg:h-screen">
        <div className="flex flex-col flex-1 glass border-r border-white/10 bg-black/30 backdrop-blur-xl h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 shrink-0">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">CRM System</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-1">
              {navItems.map(item => renderNavItem(item))}
            </div>
            <div className="mt-6 px-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                Module
              </div>
              <div className="space-y-1">
                {companyModules.map(item => renderNavItem(item))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar - slide-over */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`fixed inset-y-0 left-0 w-72 bg-black/90 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 h-full ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 shrink-0">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">CRM System</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-1">
              {navItems.map(item => renderNavItem(item))}
            </div>
            <div className="mt-6 px-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                Module
              </div>
              <div className="space-y-1">
                {companyModules.map(item => renderNavItem(item))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}