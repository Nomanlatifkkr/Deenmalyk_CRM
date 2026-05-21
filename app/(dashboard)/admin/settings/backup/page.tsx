'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, RefreshCw, Clock, Database, Trash2, Save } from 'lucide-react';

interface BackupSettings {
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  backupTime: string;
  retentionDays: number;
  lastBackup?: string;
}

export default function BackupSettingsPage() {
  const [settings, setSettings] = useState<BackupSettings>({
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00',
    retentionDays: 30,
    lastBackup: '2024-05-19 02:00:00',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('settings_backup');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('settings_backup', JSON.stringify(settings));
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 500);
  };

  const handleManualBackup = () => {
    alert('Manuelles Backup wird erstellt... (Demo)');
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/settings">
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Backup & Wiederherstellung</h1>
          <p className="text-gray-400 mt-1">Konfigurieren Sie automatische Backups Ihrer Daten</p>
        </div>
      </div>

      {saveSuccess && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-500/90 backdrop-blur rounded-lg px-4 py-2 text-white text-sm">Einstellungen gespeichert</div>
      )}

      <div className="glass-card p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-blue-400" />
            <div>
              <h2 className="text-white font-semibold">Letztes Backup</h2>
              <p className="text-xs text-gray-400">{settings.lastBackup || 'Kein Backup vorhanden'}</p>
            </div>
          </div>
          <button onClick={handleManualBackup} className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm">
            <RefreshCw className="h-4 w-4" /> Jetzt Backup erstellen
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Automatische Backups</p>
              <p className="text-xs text-gray-400">Tägliche, wöchentliche oder monatliche Sicherungen</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={settings.autoBackup} onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })} className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.autoBackup && (
            <>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Häufigkeit</label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value as any })}
                  className="w-full sm:w-64 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                >
                  <option value="daily">Täglich</option>
                  <option value="weekly">Wöchentlich</option>
                  <option value="monthly">Monatlich</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Uhrzeit (UTC)</label>
                <input type="time" value={settings.backupTime} onChange={(e) => setSettings({ ...settings, backupTime: e.target.value })} className="w-full sm:w-64 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Aufbewahrungsdauer (Tage)</label>
                <input type="number" value={settings.retentionDays} onChange={(e) => setSettings({ ...settings, retentionDays: parseInt(e.target.value) || 30 })} className="w-full sm:w-64 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button onClick={handleSave} disabled={isSaving} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
            {isSaving ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Speichern</>}
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-white font-semibold mb-3">Backups verwalten</h3>
        <div className="space-y-2">
          {['2024-05-19_02-00-full.sql', '2024-05-18_02-00-full.sql', '2024-05-17_02-00-full.sql'].map((backup, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Database className="h-4 w-4 text-gray-500" />
                <span className="text-white text-sm">{backup}</span>
                <span className="text-xs text-gray-500">{(idx === 0 ? 'Heute' : idx === 1 ? 'Gestern' : 'Vor 2 Tagen')}, 02:00</span>
              </div>
              <div className="flex gap-2">
                <button className="p-1 text-blue-400 hover:text-blue-300"><Download className="h-4 w-4" /></button>
                <button className="p-1 text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}