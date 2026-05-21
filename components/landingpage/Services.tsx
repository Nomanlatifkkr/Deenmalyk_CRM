'use client'

import { useState } from 'react'
import { Thermometer, Ruler, Zap, CheckCircle, Calendar, User, Phone, MapPin, MessageSquare, X } from 'lucide-react'

const services = [
  {
    name: 'Heizungsbau',
    icon: Thermometer,
    color: 'from-red-500 to-orange-500',
    items: ['Heizungsinstallation', 'Kesseldienst', 'Fußbodenheizung']
  },
  {
    name: 'Estrichbau',
    icon: Ruler,
    color: 'from-blue-500 to-cyan-500',
    items: ['Estrichverlegung', 'Bodenausgleich', 'Industrieböden']
  },
  {
    name: 'Elektrotechnik',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    items: ['Elektroinstallation', 'Verteilerschrank', 'Smart Home Systeme']
  }
]

// Buchungsformular Modal
function BookingModal({ service, onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    projectSize: '',
    preferredDate: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData, service)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
              <service.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{service.name} buchen</h3>
              <p className="text-sm text-gray-400">Geben Sie Ihre Details für ein Angebot ein</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Vollständiger Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="Max Mustermann"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="max@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Telefonnummer *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="+49 123 456789"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Projektgröße *
              </label>
              <select
                required
                value={formData.projectSize}
                onChange={(e) => setFormData({ ...formData, projectSize: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Größe wählen</option>
                <option value="Klein (1.000€ - 10.000€)">Klein (1.000€ - 10.000€)</option>
                <option value="Mittel (10.000€ - 50.000€)">Mittel (10.000€ - 50.000€)</option>
                <option value="Groß (50.000€ - 100.000€)">Groß (50.000€ - 100.000€)</option>
                <option value="Enterprise (100.000€+)">Enterprise (100.000€+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Stadt/Ort *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="München, Deutschland"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Wunschtermin *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Vollständige Adresse *
            </label>
            <textarea
              required
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Straße, Hausnummer, PLZ, Ort..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Zusätzliche Informationen
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Teilen Sie uns mehr über Ihr Projekt mit..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-white/20 rounded-lg text-gray-300 hover:bg-white/5 transition"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 bg-gradient-to-br ${service.color} rounded-lg text-white font-semibold hover:opacity-90 transition`}
            >
              Anfrage senden
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Erfolgsbenachrichtigung
function SuccessToast({ message, onClose }: any) {
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-green-500/90 backdrop-blur rounded-lg px-6 py-3 shadow-lg border border-green-400/30">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-white" />
          <span className="text-white font-medium">{message}</span>
        </div>
      </div>
    </div>
  )
}

export function Services() {
  const [selectedService, setSelectedService] = useState<any>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleBookService = (service: any) => {
    setSelectedService(service)
  }

  const handleSubmitBooking = (formData: any, service: any) => {
    console.log('Buchung eingereicht:', { service, ...formData })
    
    setSelectedService(null)
    setShowSuccess(true)
    
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <>
      <section id="services" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Unsere <span className="gradient-text">Leistungen</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Spezialisierte Baudienstleistungen für jede Anforderung
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="glass-card p-8 hover:scale-105 transition-transform">
                <div className={`h-16 w-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white text-center mb-4">{service.name}</h3>
                
                <div className="space-y-2 mb-6">
                  {service.items.map((item, i) => (
                    <div key={i} className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => handleBookService(service)}
                  className={`w-full py-3 bg-gradient-to-br ${service.color} rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition`}
                >
                  <Calendar className="h-4 w-4" />
                  Leistung buchen
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSubmit={handleSubmitBooking}
        />
      )}

      {showSuccess && (
        <SuccessToast
          message="Buchungsanfrage gesendet! Wir melden uns innerhalb von 24 Stunden bei Ihnen."
          onClose={() => setShowSuccess(false)}
        />
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  )
}