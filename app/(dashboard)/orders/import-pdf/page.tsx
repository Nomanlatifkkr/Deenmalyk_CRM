'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload } from 'lucide-react';
export default function ImportPdfPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    // Mock: auto-create order from PDF content
    alert('PDF wird verarbeitet... Auftrag wird erstellt.');
    router.push('/orders');
    setLoading(false);
  };
  return (
    <div className="space-y-6"><div className="flex items-center gap-4"><Link href="/orders"><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5 text-gray-400" /></button></Link><div><h1 className="text-2xl font-bold text-white">PDF Import</h1><p className="text-gray-400">Auftrag aus PDF automatisch erstellen</p></div></div>
    <div className="glass-card p-8 text-center"><input type="file" accept=".pdf" onChange={e => setFile(e.target.files?.[0] || null)} className="mb-4 text-white" /><button onClick={handleUpload} disabled={loading || !file} className="px-6 py-2 bg-blue-600 rounded-lg text-white"><Upload className="h-4 w-4 inline mr-2" />{loading ? 'Wird verarbeitet...' : 'PDF hochladen'}</button></div></div>
  );
}