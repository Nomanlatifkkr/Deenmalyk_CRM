'use client';
import { useState } from 'react';
import { Save } from 'lucide-react';
export default function SettingsPage() {
  const [settings, setSettings] = useState({ prefix: 'RE', nextNumber: 1001, padding: 4 });
  const handleSave = () => { alert('Einstellungen gespeichert'); };
  return (<div className="glass-card p-6 space-y-4"><h2 className="text-white">Rechnungseinstellungen</h2><div><label>Präfix</label><input value={settings.prefix} onChange={e => setSettings({...settings, prefix: e.target.value})} className="w-full p-2 bg-white/5 border rounded" /></div><div><label>Nächste Nummer</label><input type="number" value={settings.nextNumber} onChange={e => setSettings({...settings, nextNumber: parseInt(e.target.value)})} className="w-full p-2 bg-white/5 border rounded" /></div><div><label>Stellen (Auffüllung)</label><select value={settings.padding} onChange={e => setSettings({...settings, padding: parseInt(e.target.value)})} className="w-full p-2 bg-white/5 border rounded"><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div><button onClick={handleSave} className="px-4 py-2 bg-blue-600 rounded"><Save className="h-4 w-4 inline" /> Speichern</button></div>);
}