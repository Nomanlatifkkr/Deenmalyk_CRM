'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, X, Image as ImageIcon } from 'lucide-react';

interface BrandingSettings {
  companyName: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
}

export default function BrandingPage() {
  const [settings, setSettings] = useState<BrandingSettings>({
    companyName: 'CRM System',
    logoUrl: null,
    faviconUrl: null,
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('settings_branding');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('settings_branding', JSON.stringify(settings));
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 500);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setSettings({ ...settings, logoUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setSettings({ ...settings, faviconUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => setSettings({ ...settings, logoUrl: null });
  const removeFavicon = () => setSettings({ ...settings, faviconUrl: null });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/settings">
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Branding & Design</h1>
          <p className="text-gray-400 mt-1">Passen Sie das Erscheinungsbild Ihres CRM-Systems an</p>
        </div>
      </div>

      {saveSuccess && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-500/90 backdrop-blur rounded-lg px-4 py-2 text-white text-sm">Branding gespeichert</div>
      )}

      <div className="glass-card p-6 space-y-6">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Unternehmensname</label>
          <input type="text" value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} className="w-full sm:w-96 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Logo</label>
          <div className="flex items-center gap-4">
            {settings.logoUrl ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={settings.logoUrl} alt="Logo" className="h-16 w-16 object-contain bg-white/5 rounded-lg p-1" />
                <button onClick={removeLogo} className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full"><X className="h-3 w-3 text-white" /></button>
              </div>
            ) : (
              <div className="h-16 w-16 bg-white/5 rounded-lg flex items-center justify-center"><ImageIcon className="h-6 w-6 text-gray-500" /></div>
            )}
            <button onClick={() => logoInputRef.current?.click()} className="px-4 py-2 glass rounded-lg text-sm"><Upload className="h-4 w-4 inline mr-1" /> Logo hochladen</button>
            <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Favicon</label>
          <div className="flex items-center gap-4">
            {settings.faviconUrl ? (
              <div className="relative"><img src={settings.faviconUrl} alt="Favicon" className="h-8 w-8 object-contain" /><button onClick={removeFavicon} className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full"><X className="h-3 w-3 text-white" /></button></div>
            ) : (
              <div className="h-8 w-8 bg-white/5 rounded flex items-center justify-center"><ImageIcon className="h-4 w-4 text-gray-500" /></div>
            )}
            <button onClick={() => faviconInputRef.current?.click()} className="px-4 py-2 glass rounded-lg text-sm"><Upload className="h-4 w-4 inline mr-1" /> Favicon hochladen</button>
            <input ref={faviconInputRef} type="file" accept="image/*" className="hidden" onChange={handleFaviconUpload} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Primärfarbe</label>
            <div className="flex items-center gap-3"><input type="color" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="h-10 w-20 rounded border border-white/20" /><input type="text" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm" /></div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Sekundärfarbe</label>
            <div className="flex items-center gap-3"><input type="color" value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} className="h-10 w-20 rounded border border-white/20" /><input type="text" value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm" /></div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white text-sm mb-2">Vorschau</p>
            <div className="flex items-center gap-2">
              {settings.logoUrl ? <img src={settings.logoUrl} alt="Logo" className="h-8 w-8 object-contain" /> : <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><span className="text-white text-xs">CRM</span></div>}
              <span className="text-white font-semibold" style={{ color: settings.primaryColor }}>{settings.companyName}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={isSaving} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
            {isSaving ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Branding speichern</>}
          </button>
        </div>
      </div>
    </div>
  );
}