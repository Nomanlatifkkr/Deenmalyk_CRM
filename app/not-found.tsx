'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-white mb-2">404</div>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Seite nicht gefunden</h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90 transition">
              <Home className="h-4 w-4" />
              Zum Dashboard
            </button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 glass rounded-lg text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </button>
        </div>

        {/* Search suggestion */}
        <div className="mt-8 text-sm text-gray-500">
          Oder suchen Sie direkt: 
          <Link href="/dashboard" className="text-blue-400 hover:underline ml-1">Dashboard</Link>
          <span className="mx-1">•</span>
          <Link href="/customers" className="text-blue-400 hover:underline">Kunden</Link>
          <span className="mx-1">•</span>
          <Link href="/orders" className="text-blue-400 hover:underline">Aufträge</Link>
        </div>
      </div>
    </div>
  );
}