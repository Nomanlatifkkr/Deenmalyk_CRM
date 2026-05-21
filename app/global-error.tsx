'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <div className="h-24 w-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-12 w-12 text-red-400" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ein unerwarteter Fehler ist aufgetreten
            </h1>
            <p className="text-gray-400 mb-6">
              Unser Team wurde benachrichtigt. Bitte versuchen Sie es später erneut.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90 transition"
              >
                Erneut versuchen
              </button>
              <Link href="/dashboard">
                <button className="flex items-center gap-2 px-5 py-2.5 glass rounded-lg text-gray-300 hover:text-white transition">
                  <Home className="h-4 w-4" />
                  Zum Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}