'use client';

import { useState } from 'react';
import { Save, X, Upload } from 'lucide-react';
import { UserProfile } from '@/types/profile';
import { updateUserProfile } from '@/lib/mock/profile';

interface ProfileInfoProps {
  user: UserProfile;
  onUpdate: () => void;
}

export default function ProfileInfo({ user, onUpdate }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || '',
    position: user.position || '',
    department: user.department || '',
    language: user.language,
    timezone: user.timezone,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await updateUserProfile(formData);
    setIsLoading(false);
    setIsEditing(false);
    onUpdate();
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:text-white"
          >
            Bearbeiten
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500">Vorname</p>
            <p className="text-white">{user.firstName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Nachname</p>
            <p className="text-white">{user.lastName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">E-Mail</p>
            <p className="text-white">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Telefon</p>
            <p className="text-white">{user.phone || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Position</p>
            <p className="text-white">{user.position || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Abteilung</p>
            <p className="text-white">{user.department || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Sprache</p>
            <p className="text-white">{user.language === 'de' ? 'Deutsch' : 'English'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Zeitzone</p>
            <p className="text-white">{user.timezone}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Vorname *</label>
          <input
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Nachname *</label>
          <input
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">E-Mail *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Telefon</label>
          <input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Position</label>
          <input
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Abteilung</label>
          <input
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Sprache</label>
          <select
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value as 'de' | 'en' })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Zeitzone</label>
          <select
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          >
            <option value="Europe/Berlin">Europe/Berlin (UTC+1)</option>
            <option value="Europe/London">Europe/London (UTC+0)</option>
            <option value="America/New_York">America/New_York (UTC-5)</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 glass rounded-lg text-gray-300">
          Abbrechen
        </button>
        <button type="submit" disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
          {isLoading ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Speichern</>}
        </button>
      </div>
    </form>
  );
}