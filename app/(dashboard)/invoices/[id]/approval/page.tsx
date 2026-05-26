'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';

import { updateInvoice } from '@/lib/mock/invoices';

interface ApprovalActionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ApprovalActionPage({
  params,
}: ApprovalActionPageProps) {
  // Fix: React.use() is wrong
  // Correct hook is use() imported from react
  const { id } = use(params);

  const router = useRouter();

  const handleApprove = async () => {
    try {
      await updateInvoice(id, {
        status: 'approved',
      });

      router.push(`/invoices/${id}`);
    } catch (error) {
      console.error('Failed to approve invoice:', error);
    }
  };

  return (
    <div className="glass-card p-6 text-center">
      <button
        onClick={handleApprove}
        className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
      >
        Rechnung genehmigen
      </button>
    </div>
  );
}