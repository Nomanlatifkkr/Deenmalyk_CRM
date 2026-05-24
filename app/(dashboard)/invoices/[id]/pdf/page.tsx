'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function PdfPage() {
  const router = useRouter();
  useEffect(() => {
    alert('PDF wird generiert (Demo) – hier würde ein Download starten');
    router.back();
  }, []);
  return null;
}