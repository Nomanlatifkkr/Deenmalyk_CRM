'use client';

import { useState } from 'react';
import { X, Send, Mail, MessageCircle } from 'lucide-react';

interface SendOrderModalProps {
  isOpen: boolean;
  crew: { id: string; name: string; email?: string; phone?: string };
  onClose: () => void;
}

export default function SendOrderModal({ isOpen, crew, onClose }: SendOrderModalProps) {
  const [method, setMethod] = useState<'email' | 'whatsapp' | 'sms'>('email');
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSending(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onClose(); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Auftrag an {crew.name} senden</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="h-5 w-5 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-3 justify-center">
            {crew.email && <button onClick={() => setMethod('email')} className={`flex flex-col items-center gap-1 p-3 rounded-xl ${method === 'email' ? 'bg-blue-600' : 'glass'}`}><Mail className="h-5 w-5" /><span className="text-xs">E-Mail</span></button>}
            {crew.phone && <button onClick={() => setMethod('whatsapp')} className={`flex flex-col items-center gap-1 p-3 rounded-xl ${method === 'whatsapp' ? 'bg-green-600' : 'glass'}`}><MessageCircle className="h-5 w-5" /><span className="text-xs">WhatsApp</span></button>}
            {crew.phone && <button onClick={() => setMethod('sms')} className={`flex flex-col items-center gap-1 p-3 rounded-xl ${method === 'sms' ? 'bg-purple-600' : 'glass'}`}><MessageCircle className="h-5 w-5" /><span className="text-xs">SMS</span></button>}
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-sm text-gray-300">
            <p className="mb-2">Empfänger:</p>
            <p>{method === 'email' ? crew.email : crew.phone}</p>
          </div>
          <button onClick={handleSend} disabled={isSending} className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2">
            {isSending ? 'Senden...' : <><Send className="h-4 w-4" /> Jetzt senden</>}
          </button>
          {success && <p className="text-green-400 text-center text-sm">Auftrag erfolgreich gesendet!</p>}
        </div>
      </div>
    </div>
  );
}