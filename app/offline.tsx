'use client';

import { WifiOff, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {
      window.location.reload();
    } else {
      alert('Keine Internetverbindung. Bitte prüfen Sie Ihre Netzwerkeinstellungen.');
    }
  };

  if (isOnline) {
    // If online but on offline page, redirect to dashboard
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard';
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="h-24 w-24 mx-auto bg-gray-500/20 rounded-full flex items-center justify-center">
            <WifiOff className="h-12 w-12 text-gray-400" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Keine Verbindung</h1>
        <p className="text-gray-400 mb-2">
          Sie sind offline. Bitte überprüfen Sie Ihre Internetverbindung.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Einige Funktionen sind möglicherweise eingeschränkt.
        </p>

        <button
          onClick={handleRetry}
          className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90 transition"
        >
          <RefreshCw className="h-4 w-4" />
          Verbindung prüfen
        </button>
      </div>
    </div>
  );
}