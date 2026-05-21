'use client';

import Link from 'next/link';
import { Settings, Puzzle, Database, FileText, Palette, Shield, Bell, CreditCard } from 'lucide-react';

const settingsModules = [
  { name: 'Module', href: '/admin/settings/modules', icon: Puzzle, description: 'Module aktivieren/deaktivieren', color: 'from-blue-500 to-cyan-500' },
  { name: 'Backup', href: '/admin/settings/backup', icon: Database, description: 'Backup-Einstellungen & Wiederherstellung', color: 'from-green-500 to-emerald-500' },
  { name: 'Rechnungsvorlage', href: '/admin/settings/invoice-template', icon: FileText, description: 'Rechnungsdesign und Layout', color: 'from-purple-500 to-pink-500' },
  { name: 'Branding', href: '/admin/settings/branding', icon: Palette, description: 'Logo, Farben, Unternehmensdesign', color: 'from-orange-500 to-red-500' },
  { name: 'Berechtigungen', href: '/admin/roles', icon: Shield, description: 'Rollen und Zugriffsrechte', color: 'from-indigo-500 to-purple-500' },
  { name: 'Benachrichtigungen', href: '/admin/settings/notifications', icon: Bell, description: 'E-Mail, SMS, WhatsApp', color: 'from-yellow-500 to-amber-500' },
  { name: 'Abrechnung', href: '/admin/settings/billing', icon: CreditCard, description: 'Abonnement & Zahlungsmethoden', color: 'from-teal-500 to-green-500' },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          <Settings className="h-7 w-7 text-gray-400" />
          Einstellungen
        </h1>
        <p className="text-gray-400 mt-1">Konfigurieren Sie Ihr CRM-System nach Ihren Wünschen</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {settingsModules.map((module) => (
          <Link key={module.name} href={module.href}>
            <div className="glass-card p-5 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4`}>
                <module.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{module.name}</h3>
              <p className="text-sm text-gray-400">{module.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}