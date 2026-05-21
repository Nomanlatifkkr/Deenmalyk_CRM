'use client'

import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Bereit <span className="gradient-text">zu starten?</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Schließen Sie sich hunderten von Bauunternehmen an, die unsere Plattform nutzen
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold text-lg flex items-center justify-center mx-auto hover:from-blue-700 hover:to-purple-700 transition">
            Kostenlose Testversion starten
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}