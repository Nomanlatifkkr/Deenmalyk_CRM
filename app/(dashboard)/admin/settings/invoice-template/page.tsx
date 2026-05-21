'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, FileText, Layout, Palette } from 'lucide-react';

interface TemplateSettings {
  primaryColor: string;
  secondaryColor: string;
  showLogo: boolean;
  showTaxDetails: boolean;
  showBankAccount: boolean;
  footerText: string;
}

export default function InvoiceTemplatePage() {
  const [settings, setSettings] = useState<TemplateSettings>({
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    showLogo: true,
    showTaxDetails: true,
    showBankAccount: true,
    footerText: 'Vielen Dank für Ihren Auftrag!',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('settings_invoice_template');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('settings_invoice_template', JSON.stringify(settings));
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/settings">
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Rechnungsvorlage</h1>
          <p className="text-gray-400 mt-1">Design und Layout Ihrer Rechnungen anpassen</p>
        </div>
      </div>

      {saveSuccess && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-500/90 backdrop-blur rounded-lg px-4 py-2 text-white text-sm">Vorlage gespeichert</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Palette className="h-5 w-5" /> Design-Einstellungen</h2>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Primärfarbe</label>
            <div className="flex items-center gap-3">
              <input type="color" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="h-10 w-20 rounded border border-white/20 bg-white/5 cursor-pointer" />
              <input type="text" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Sekundärfarbe</label>
            <div className="flex items-center gap-3">
              <input type="color" value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} className="h-10 w-20 rounded border border-white/20 bg-white/5 cursor-pointer" />
              <input type="text" value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={settings.showLogo} onChange={(e) => setSettings({ ...settings, showLogo: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600" />
              <span className="text-sm text-gray-300">Logo anzeigen</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={settings.showTaxDetails} onChange={(e) => setSettings({ ...settings, showTaxDetails: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600" />
              <span className="text-sm text-gray-300">Steuerdetails anzeigen</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={settings.showBankAccount} onChange={(e) => setSettings({ ...settings, showBankAccount: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600" />
              <span className="text-sm text-gray-300">Bankverbindung anzeigen</span>
            </label>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Fußzeilentext</label>
            <textarea rows={2} value={settings.footerText} onChange={(e) => setSettings({ ...settings, footerText: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
          </div>
          <button onClick={handleSave} disabled={isSaving} className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2">
            {isSaving ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Vorlage speichern</>}
          </button>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4"><Eye className="h-5 w-5" /> Vorschau</h2>
          <div className="bg-white rounded-lg p-4 shadow-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
            <div className="text-center mb-3">
              <div className="text-xl font-bold" style={{ color: settings.primaryColor }}>Rechnung</div>
            </div>
            <table className="w-full text-xs" style={{ color: '#333' }}>
              <thead><tr><th className="text-left">Pos.</th><th className="text-left">Leistung</th><th className="text-right">Menge</th><th className="text-right">Einzelpreis</th><th className="text-right">Gesamt</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Heizungsinstallation</td><td className="text-right">50 m²</td><td className="text-right">85,00 €</td><td className="text-right">4.250,00 €</td></tr>
              </tbody>
            </table>
            <div className="text-right mt-3 text-xs">Gesamt: <strong>4.250,00 €</strong></div>
            <div className="mt-3 pt-2 border-t text-xs text-gray-500">{settings.footerText}</div>
          </div>
        </div>
      </div>
    </div>
  );
}