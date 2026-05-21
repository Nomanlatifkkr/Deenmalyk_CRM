'use client'

import { Building2, HardHat, Calendar, FileText, Zap, Layout, Smartphone, Shield } from 'lucide-react'

const features = [
  {
    icon: Building2,
    title: 'Multi-Unternehmens-Support',
    desc: 'Verwalten Sie 3 Unternehmen von einer Plattform'
  },
  {
    icon: HardHat,
    title: 'Team-Verwaltung',
    desc: 'Haupt- & Sub-Teams mit bereichsbezogener Preisgestaltung'
  },
  {
    icon: Calendar,
    title: 'Intelligente Terminplanung',
    desc: 'Automatische Terminierung mit Drag-and-Drop-Kalender'
  },
  {
    icon: FileText,
    title: 'PDF-Verarbeitung',
    desc: 'Automatisches Auslesen von Aufträgen aus PDF'
  },
  {
    icon: Zap,
    title: 'KI-Automatisierung',
    desc: 'ChatGPT-Integration für Arbeitsabläufe'
  },
  {
    icon: Layout,
    title: 'Modulares System',
    desc: 'Funktionen einfach aktivieren/deaktivieren'
  },
  {
    icon: Smartphone,
    title: 'Mobil optimiert',
    desc: 'Zugriff von jedem Gerät'
  },
  {
    icon: Shield,
    title: 'Sicher & Zuverlässig',
    desc: 'Tägliche Backups & 99,9% Verfügbarkeit'
  }
]

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Leistungsstarke <span className="gradient-text">Funktionen</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Alles, was Sie für die effiziente Verwaltung Ihres Bauunternehmens benötigen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}