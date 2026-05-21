'use client';

import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface CompleteComplaintModalProps {
  isOpen: boolean;
  complaintNumber: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function CompleteComplaintModal({ isOpen, complaintNumber, onClose, onConfirm }: CompleteComplaintModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Reklamation abschließen</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="h-5 w-5 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-4 text-center">
          <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
          <p>Möchten Sie die Reklamation <span className="text-white font-semibold">{complaintNumber}</span> als abgeschlossen markieren?</p>
          <p className="text-xs text-gray-500">Nach Abschluss wird eine automatische Benachrichtigung an den Kunden gesendet.</p>
          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="flex-1 px-4 py-2 glass rounded-lg text-gray-300">Abbrechen</button>
            <button onClick={handleConfirm} disabled={isLoading} className="flex-1 px-4 py-2 bg-green-600 rounded-lg text-white font-semibold">
              {isLoading ? 'Wird abgeschlossen...' : 'Ja, abschließen'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}