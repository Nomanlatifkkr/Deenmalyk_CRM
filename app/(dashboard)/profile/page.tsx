'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Bell, Building2 } from 'lucide-react';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ChangePassword from '@/components/profile/ChangePassword';
import NotificationSettings from '@/components/profile/NotificationSettings';
import CompanySelection from '@/components/profile/CompanySelection';
import { fetchUserProfile } from '@/lib/mock/profile';
import { UserProfile } from '@/types/profile';

type TabType = 'info' | 'security' | 'notifications' | 'company';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await fetchUserProfile();
    setUser(data);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { id: 'info', label: 'Profil', icon: User },
    { id: 'security', label: 'Sicherheit', icon: Lock },
    { id: 'notifications', label: 'Benachrichtigungen', icon: Bell },
    { id: 'company', label: 'Unternehmen', icon: Building2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Mein Profil</h1>
        <p className="text-gray-400 mt-1">Verwalten Sie Ihre persönlichen Daten und Einstellungen</p>
      </div>

      <div className="glass-card overflow-hidden">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-white/10 bg-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'info' && <ProfileInfo user={user} onUpdate={loadUser} />}
          {activeTab === 'security' && <ChangePassword />}
          {activeTab === 'notifications' && <NotificationSettings user={user} onUpdate={loadUser} />}
          {activeTab === 'company' && <CompanySelection user={user} onUpdate={loadUser} />}
        </div>
      </div>
    </div>
  );
}