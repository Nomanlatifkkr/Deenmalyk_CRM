'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createUser } from '@/lib/mock/users';
import UserForm from '@/components/admin/users/UserForm';

export default function NewUserPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    // Ensure isActive is set
    await createUser({ ...data, isActive: data.isActive ?? true, permissions: [] });
    router.push('/admin/users');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <button className="p-2 glass rounded-lg hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Neuen Benutzer anlegen</h1>
          <p className="text-gray-400 mt-1">Erfassen Sie die Benutzerdaten und wählen Sie eine Rolle</p>
        </div>
      </div>
      <UserForm
        user={null}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/users')}
      />
    </div>
  );
}