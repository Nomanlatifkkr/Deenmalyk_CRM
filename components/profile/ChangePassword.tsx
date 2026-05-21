'use client';

import { useState } from 'react';
import { Save, Eye, EyeOff } from 'lucide-react';
import { changePassword } from '@/lib/mock/profile';

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Neues Passwort und Bestätigung stimmen nicht überein');
      return;
    }
    if (formData.newPassword.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(formData.currentPassword, formData.newPassword);
      setSuccess(true);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setError(err.message || 'Fehler beim Ändern des Passworts');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-5">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Aktuelles Passwort</label>
        <div className="relative">
          <input
            type={showPasswords.current ? 'text' : 'password'}
            required
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">Neues Passwort</label>
        <div className="relative">
          <input
            type={showPasswords.new ? 'text' : 'password'}
            required
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">Passwort bestätigen</label>
        <div className="relative">
          <input
            type={showPasswords.confirm ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}
      {success && <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">Passwort erfolgreich geändert!</div>}

      <div className="flex justify-end">
        <button type="submit" disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
          {isLoading ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Passwort ändern</>}
        </button>
      </div>
    </form>
  );
}