'use client';

import Link from 'next/link';
import { Shield, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="h-24 w-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <Shield className="h-12 w-12 text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Zugriff verweigert</h1>
        <p className="text-gray-400 mb-2">
          Sie haben keine Berechtigung, auf diese Seite zuzugreifen.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Bitte kontaktieren Sie Ihren Administrator, wenn Sie Zugriff benötigen.
        </p>

        <Link href="/dashboard">
          <button className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90 transition">
            <Home className="h-4 w-4" />
            Zum Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}