'use client';

import { useState } from 'react';
import { Save, Bell, Mail } from 'lucide-react';
import { UserProfile } from '@/types/profile';
import { updateUserProfile } from '@/lib/mock/profile';

interface NotificationSettingsProps {
  user: UserProfile;
  onUpdate: () => void;
}

export default function NotificationSettings({ user, onUpdate }: NotificationSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: { ...user.emailNotifications },
    pushNotifications: user.pushNotifications,
  });

  const handleSave = async () => {
    setIsLoading(true);
    await updateUserProfile(settings);
    setIsLoading(false);
    onUpdate();
  };

  const toggleEmail = (key: keyof typeof settings.emailNotifications) => {
    setSettings({
      ...settings,
      emailNotifications: { ...settings.emailNotifications, [key]: !settings.emailNotifications[key] },
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-white font-semibold flex items-center gap-2 mb-3">
          <Mail className="h-5 w-5 text-blue-400" /> E-Mail Benachrichtigungen
        </h3>
        <div className="space-y-2">
          <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-white/5">
            <span className="text-gray-300">Neuer Auftrag erstellt</span>
            <input
              type="checkbox"
              checked={settings.emailNotifications.orderCreated}
              onChange={() => toggleEmail('orderCreated')}
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-white/5">
            <span className="text-gray-300">Auftrag abgeschlossen</span>
            <input
              type="checkbox"
              checked={settings.emailNotifications.orderCompleted}
              onChange={() => toggleEmail('orderCompleted')}
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-white/5">
            <span className="text-gray-300">Rechnung erstellt</span>
            <input
              type="checkbox"
              checked={settings.emailNotifications.invoiceCreated}
              onChange={() => toggleEmail('invoiceCreated')}
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-white/5">
            <span className="text-gray-300">Angebot läuft ab</span>
            <input
              type="checkbox"
              checked={settings.emailNotifications.offerExpiring}
              onChange={() => toggleEmail('offerExpiring')}
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-white/5">
            <span className="text-gray-300">System-Updates</span>
            <input
              type="checkbox"
              checked={settings.emailNotifications.systemUpdates}
              onChange={() => toggleEmail('systemUpdates')}
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-white font-semibold flex items-center gap-2 mb-3">
          <Bell className="h-5 w-5 text-blue-400" /> Push-Benachrichtigungen
        </h3>
        <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-white/5">
          <span className="text-gray-300">Push-Benachrichtigungen aktivieren</span>
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={() => setSettings({ ...settings, pushNotifications: !settings.pushNotifications })}
            className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600"
          />
        </label>
      </div>

      <div className="flex justify-end pt-4">
        <button onClick={handleSave} disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
          {isLoading ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Einstellungen speichern</>}
        </button>
      </div>
    </div>
  );
}