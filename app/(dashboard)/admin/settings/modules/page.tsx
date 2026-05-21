'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Package, Thermometer, Ruler, Zap, Wrench, Users, Truck, Calendar, HardHat, FileText, FileCheck, Receipt, BarChart3 } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
  category: 'core' | 'screed' | 'heating' | 'electrical';
}

const defaultModules: Module[] = [
  // Core modules
  { id: 'customers', name: 'Kundenverwaltung', description: 'Kundenstammdaten inkl. §13b', icon: Users, enabled: true, category: 'core' },
  { id: 'suppliers', name: 'Lieferanten', description: 'Lieferantenstammdaten', icon: Truck, enabled: true, category: 'core' },
  { id: 'materials', name: 'Material', description: 'Materialstamm & Preise', icon: Package, enabled: true, category: 'core' },
  { id: 'services', name: 'Leistungen', description: 'Servicekatalog', icon: Wrench, enabled: true, category: 'core' },
  { id: 'orders', name: 'Aufträge', description: 'Auftragsverwaltung', icon: FileText, enabled: true, category: 'core' },
  { id: 'offers', name: 'Angebote', description: 'Angebotserstellung', icon: FileCheck, enabled: true, category: 'core' },
  { id: 'invoices', name: 'Rechnungen', description: 'Rechnungswesen', icon: Receipt, enabled: true, category: 'core' },
  { id: 'calendar', name: 'Kalender & Planung', description: 'Terminplanung', icon: Calendar, enabled: true, category: 'core' },
  { id: 'crews', name: 'Teams', description: 'Teamverwaltung', icon: HardHat, enabled: true, category: 'core' },
  { id: 'reports', name: 'Berichte', description: 'Auswertungen & KPIs', icon: BarChart3, enabled: true, category: 'core' },
  // Screed modules (always on for screed company)
  { id: 'screed_orders', name: 'Estrich Aufträge', description: 'Spezifische Estrich-Aufträge', icon: Ruler, enabled: true, category: 'screed' },
  { id: 'screed_materials', name: 'Estrich Material', description: 'Estrichspezifische Materialien', icon: Ruler, enabled: true, category: 'screed' },
  // Heating modules
  { id: 'heating_orders', name: 'Heizungsaufträge', description: 'Heizungsspezifische Aufträge', icon: Thermometer, enabled: true, category: 'heating' },
  { id: 'heating_subsidies', name: 'Förderungen', description: 'Automatische Förderberechnung', icon: Thermometer, enabled: true, category: 'heating' },
  // Electrical modules
  { id: 'electrical_orders', name: 'Elektroaufträge', description: 'Elektrospezifische Aufträge', icon: Zap, enabled: true, category: 'electrical' },
];

export default function ModulesSettingsPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('settings_modules');
    if (stored) {
      setModules(JSON.parse(stored));
    } else {
      setModules(defaultModules);
      localStorage.setItem('settings_modules', JSON.stringify(defaultModules));
    }
    setIsLoading(false);
  }, []);

  const handleToggle = (id: string) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('settings_modules', JSON.stringify(modules));
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const coreModules = modules.filter(m => m.category === 'core');
  const screedModules = modules.filter(m => m.category === 'screed');
  const heatingModules = modules.filter(m => m.category === 'heating');
  const electricalModules = modules.filter(m => m.category === 'electrical');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/settings">
          <button className="p-2 glass rounded-lg hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Module verwalten</h1>
          <p className="text-gray-400 mt-1">Aktivieren oder deaktivieren Sie einzelne Module des Systems</p>
        </div>
      </div>

      {saveSuccess && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-500/90 backdrop-blur rounded-lg px-4 py-2 text-white text-sm">
          Einstellungen gespeichert
        </div>
      )}

      <div className="space-y-8">
        {/* Core Modules */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Kernmodule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreModules.map(module => (
              <div key={module.id} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <module.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{module.name}</p>
                    <p className="text-xs text-gray-500">{module.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={module.enabled} onChange={() => handleToggle(module.id)} className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Screed Modules */}
        {screedModules.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Estrichbau</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {screedModules.map(module => (
                <div key={module.id} className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <module.icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{module.name}</p>
                      <p className="text-xs text-gray-500">{module.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={module.enabled} onChange={() => handleToggle(module.id)} className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Heating Modules */}
        {heatingModules.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Heizungsbau</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {heatingModules.map(module => (
                <div key={module.id} className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <module.icon className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{module.name}</p>
                      <p className="text-xs text-gray-500">{module.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={module.enabled} onChange={() => handleToggle(module.id)} className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Electrical Modules */}
        {electricalModules.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Elektrotechnik</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {electricalModules.map(module => (
                <div key={module.id} className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <module.icon className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{module.name}</p>
                      <p className="text-xs text-gray-500">{module.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={module.enabled} onChange={() => handleToggle(module.id)} className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2"
        >
          {isSaving ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Einstellungen speichern</>}
        </button>
      </div>
    </div>
  );
}