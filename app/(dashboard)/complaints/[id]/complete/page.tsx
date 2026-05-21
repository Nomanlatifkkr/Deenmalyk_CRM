'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchComplaint, completeComplaint } from '@/lib/mock/complaints';
import CompleteComplaintModal from '@/components/complaints/CompleteComplaintModal';

export default function CompleteComplaintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [complaint, setComplaint] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, [id]);
  const load = async () => { const c = await fetchComplaint(id); setComplaint(c); setLoading(false); };
  const handleComplete = async () => { await completeComplaint(id); router.push(`/complaints/${id}`); };
  if (loading) return <div className="flex justify-center h-64"><div className="animate-spin h-8 w-8" /></div>;
  if (!complaint) return <div>Reklamation nicht gefunden</div>;

  return <CompleteComplaintModal isOpen={true} complaintNumber={complaint.complaintNumber} onClose={() => router.push(`/complaints/${id}`)} onConfirm={handleComplete} />;
}