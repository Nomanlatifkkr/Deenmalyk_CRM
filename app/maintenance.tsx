'use client';

import { Wrench, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="h-24 w-24 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center animate-pulse">
            <Wrench className="h-12 w-12 text-amber-400" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Wartungsarbeiten</h1>
        <p className="text-gray-400 mb-2">
          Unser System wird derzeit gewartet und ist vorübergehend nicht erreichbar.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Wir sind in Kürze wieder für Sie da.
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Voraussichtliche Dauer: ca. 30 Minuten</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Mail className="h-4 w-4" />
            <span className="text-sm">Bei Fragen: <a href="mailto:support@crmsystem.de" className="text-blue-400 hover:underline">support@crmsystem.de</a></span>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 glass rounded-lg text-gray-300 hover:text-white transition"
          >
            Seite neu laden
          </button>
        </div>
      </div>
    </div>
  );
}