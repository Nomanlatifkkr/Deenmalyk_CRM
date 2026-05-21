'use client';

import Link from 'next/link';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ServerError() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/dashboard';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="mb-6">
          <div className="h-24 w-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Serverfehler (500)</h1>
        <p className="text-gray-400 mb-2">
          Ein interner Serverfehler ist aufgetreten. Unser Team wurde benachrichtigt.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Sie werden in {countdown} Sekunden automatisch zum Dashboard weitergeleitet.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90 transition">
              <Home className="h-4 w-4" />
              Zum Dashboard
            </button>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-5 py-2.5 glass rounded-lg text-gray-300 hover:text-white transition"
          >
            <RefreshCw className="h-4 w-4" />
            Neu laden
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-600">
          Fehlercode: 500 • Bitte kontaktieren Sie den Support, falls das Problem wiederholt auftritt.
        </p>
      </div>
    </div>
  );
}