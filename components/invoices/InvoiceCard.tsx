'use client';
import Link from 'next/link';
import { FileText, Euro, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Invoice } from '@/types/invoice';

export default function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    draft: { label: 'Entwurf', color: 'text-gray-400', icon: FileText },
    pending_approval: { label: 'Genehmigung ausstehend', color: 'text-yellow-400', icon: Clock },
    approved: { label: 'Genehmigt', color: 'text-blue-400', icon: CheckCircle },
    sent: { label: 'Gesendet', color: 'text-purple-400', icon: Clock },
    paid: { label: 'Bezahlt', color: 'text-green-400', icon: CheckCircle },
    overdue: { label: 'Überfällig', color: 'text-red-400', icon: AlertCircle },
  };
  const config = statusConfig[invoice.status] || statusConfig.draft;
  const isOverdue = invoice.status === 'overdue' || (invoice.status === 'sent' && new Date(invoice.dueDate) < new Date());
  const dueDate = new Date(invoice.dueDate).toLocaleDateString('de-DE');
  return (
    <div className="glass-card p-5 hover:scale-[1.02] transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2"><FileText className="h-5 w-5 text-blue-400" /><span className="text-sm font-mono">{invoice.invoiceNumber}</span></div>
        <span className={`text-xs px-2 py-0.5 rounded-full bg-white/5 ${config.color}`}>{config.label}</span>
      </div>
      <Link href={`/invoices/${invoice.id}`}><h3 className="text-lg font-semibold text-white hover:text-blue-400 mt-2">{invoice.customerName}</h3></Link>
      <p className="text-sm text-gray-400">€{invoice.total.toLocaleString()}</p>
      <div className="mt-3 flex justify-between text-sm"><span className="text-gray-500">Fällig:</span><span className={isOverdue ? 'text-red-400' : 'text-white'}>{dueDate}</span></div>
      <div className="mt-4 flex gap-2">
        <Link href={`/invoices/${invoice.id}`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm">Details</Link>
        {invoice.status === 'draft' && <Link href={`/invoices/${invoice.id}/edit`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm">Bearbeiten</Link>}
      </div>
    </div>
  );
}