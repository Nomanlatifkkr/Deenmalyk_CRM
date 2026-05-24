'use client';
import { useRouter } from 'next/navigation';
import { updateInvoice } from '@/lib/mock/invoices';
export default function ApprovalActionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const handleApprove = async () => { await updateInvoice(id, { status: 'approved' }); router.push(`/invoices/${id}`); };
  return (<div className="glass-card p-6 text-center"><button onClick={handleApprove} className="px-4 py-2 bg-green-600 rounded">Rechnung genehmigen</button></div>);
}