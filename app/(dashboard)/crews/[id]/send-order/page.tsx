'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Crew } from '@/types/crew';
import { fetchCrew } from '@/lib/mock/crews';
import SendOrderModal from '@/components/crews/SendOrderModal';

export default function SendOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [crew, setCrew] = useState<Crew | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => { load(); }, [id]);
  const load = async () => { const c = await fetchCrew(id); setCrew(c || null); setIsLoading(false); };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!crew) return <div>Team nicht gefunden</div>;

  return <SendOrderModal isOpen={showModal} crew={crew} onClose={() => window.location.href = `/crews/${crew.id}`} />;
}