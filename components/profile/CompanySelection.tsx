'use client';

import { useState } from 'react';
import { Save, Building2 } from 'lucide-react';
import { UserProfile } from '@/types/profile';
import { updateUserProfile } from '@/lib/mock/profile';

interface CompanySelectionProps {
  user: UserProfile;
  onUpdate: () => void;
}

const companies = [
  { id: 'heating', name: 'Heizungsbau Süddeutschland', color: 'from-red-500 to-orange-500' },
  { id: 'screed', name: 'Estrichbau Süddeutschland', color: 'from-blue-500 to-cyan-500' },
  { id: 'electrical', name: 'Elektrotechnik Süddeutschland', color: 'from-yellow-500 to-amber-500' },
];

export default function CompanySelection({ user, onUpdate }: CompanySelectionProps) {
  const [selectedCompany, setSelectedCompany] = useState(user.defaultCompany);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await updateUserProfile({ defaultCompany: selectedCompany });
    setIsLoading(false);
    onUpdate();
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <p className="text-gray-400 text-sm">
        Wählen Sie Ihr Standardunternehmen. Dieses wird beim Login automatisch ausgewählt.
      </p>
      <div className="space-y-3">
        {companies.map((company) => (
          <label
            key={company.id}
            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition ${
              selectedCompany === company.id
                ? 'glass border border-blue-500/50 bg-blue-500/10'
                : 'glass hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${company.color} flex items-center justify-center`}>
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-white">{company.name}</span>
            </div>
            <input
              type="radio"
              name="defaultCompany"
              value={company.id}
              checked={selectedCompany === company.id}
              onChange={() => setSelectedCompany(company.id)}
              className="w-4 h-4 text-blue-600 bg-white/5 border-white/20 focus:ring-blue-500"
            />
          </label>
        ))}
      </div>
      <div className="flex justify-end pt-4">
        <button onClick={handleSave} disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
          {isLoading ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Standard speichern</>}
        </button>
      </div>
    </div>
  );
}