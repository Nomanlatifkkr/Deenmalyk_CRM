'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createCrew } from '@/lib/mock/crews';
import CrewForm from '@/components/crews/CrewForm';

export default function NewCrewPage() {
  const router = useRouter();
  const handleSubmit = async (data: any) => { await createCrew({ ...data, areaCosts: [] }); router.push('/crews'); };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href="/crews"><button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button></Link><div><h1 className="text-2xl font-bold text-white">Neues Team anlegen</h1><p className="text-gray-400 mt-1">Erfassen Sie die Teamdaten</p></div></div>
      <CrewForm crew={null} onSubmit={handleSubmit} onCancel={() => router.push('/crews')} />
    </div>
  );
}