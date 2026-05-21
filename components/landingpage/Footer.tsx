import { Sparkles, Globe, X, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="glass border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">CRM System</span>
            </div>
            <p className="text-gray-400 text-sm">
              Intelligente Baumanagement-Plattform für moderne Unternehmen.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#home" className="hover:text-white transition">Startseite</a></li>
              <li><a href="#features" className="hover:text-white transition">Funktionen</a></li>
              <li><a href="#services" className="hover:text-white transition">Leistungen</a></li>
              <li><a href="#contact" className="hover:text-white transition">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+49 123 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@crmsystem.de</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Süddeutschland</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Folgen Sie uns</h3>
            <div className="flex space-x-3">
              <button className="p-2 glass rounded-lg hover:bg-white/10 transition">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>&copy; 2024 CRM System. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}