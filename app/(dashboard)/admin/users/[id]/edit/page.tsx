'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { User } from '@/types/user';
import { fetchUser, updateUser } from '@/lib/mock/users';
import UserForm from '@/components/admin/users/UserForm';

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const data = await fetchUser(id);
    setUser(data || null);
    setIsLoading(false);
  };

  const handleSubmit = async (formData: any) => {
    if (user) {
      await updateUser(user.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
        isActive: formData.isActive,
      });
      router.push(`/admin/users/${user.id}`);
    }
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!user) return <div className="text-center py-12">Benutzer nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/users/${user.id}`}>
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Benutzer bearbeiten</h1>
          <p className="text-gray-400 text-sm">{user.firstName} {user.lastName}</p>
        </div>
      </div>
      <UserForm
        user={user}
        onSubmit={handleSubmit}
        onCancel={() => router.push(`/admin/users/${user.id}`)}
      />
    </div>
  );
}