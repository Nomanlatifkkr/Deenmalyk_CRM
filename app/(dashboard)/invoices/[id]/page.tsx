'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit, Send, Eye, FileText, CreditCard, Bell, Receipt, AlertTriangle, Paperclip, History } from 'lucide-react';
import { fetchInvoice, sendInvoice, updateInvoice } from '@/lib/mock/invoices';
export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [invoice, setInvoice] = useState<any>(null);
  useEffect(() => { fetchInvoice(id).then(setInvoice); }, [id]);
  if (!invoice) return <div className="flex justify-center h-64"><div className="animate-spin h-8 w-8" /></div>;
  const handleSend = async () => { await sendInvoice(id); setInvoice(await fetchInvoice(id)); alert('Rechnung gesendet'); };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-4"><Link href="/invoices"><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">{invoice.invoiceNumber}</h1><p className="text-gray-400">{invoice.customerName}</p></div></div>
        <div className="flex gap-2 flex-wrap"><Link href={`/invoices/${id}/edit`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><Edit className="h-4 w-4" /> Bearbeiten</button></Link><Link href={`/invoices/${id}/send`}><button onClick={handleSend} className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><Send className="h-4 w-4" /> Senden</button></Link><Link href={`/invoices/${id}/preview`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><Eye className="h-4 w-4" /> Vorschau</button></Link><Link href={`/invoices/${id}/pdf`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><FileText className="h-4 w-4" /> PDF</button></Link><Link href={`/invoices/${id}/payments`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><CreditCard className="h-4 w-4" /> Zahlungen</button></Link><Link href={`/invoices/${id}/reminders`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><Bell className="h-4 w-4" /> Erinnerung</button></Link><Link href={`/invoices/${id}/credit-note`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><Receipt className="h-4 w-4" /> Gutschrift</button></Link><Link href={`/invoices/${id}/attachments`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><Paperclip className="h-4 w-4" /> Anhänge</button></Link><Link href={`/invoices/${id}/logs`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><History className="h-4 w-4" /> Logs</button></Link></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4"><p className="text-gray-400">Ausgestellt am</p><p>{new Date(invoice.issueDate).toLocaleDateString()}</p><p className="text-gray-400 mt-2">Fällig am</p><p>{new Date(invoice.dueDate).toLocaleDateString()}</p></div>
        <div className="glass-card p-4"><p className="text-gray-400">Status</p><p className="font-semibold">{invoice.status}</p><p className="text-gray-400 mt-2">Gesamtbetrag</p><p className="text-xl font-bold text-green-400">€{invoice.total.toLocaleString()}</p></div>
      </div>
      <div className="glass-card p-5"><h3 className="text-white font-semibold mb-2">Positionen</h3><table className="w-full text-sm"><thead><tr className="border-b"><th className="text-left">Beschreibung</th><th className="text-right">Menge</th><th className="text-right">Preis</th><th className="text-right">Gesamt</th></tr></thead><tbody>{invoice.items.map((item: any) => <tr key={item.id} className="border-b"><td>{item.description}</td><td className="text-right">{item.quantity} {item.unit}</td><td className="text-right">€{item.unitPrice.toFixed(2)}</td><td className="text-right">€{item.total.toFixed(2)}</td></tr>)}</tbody><tfoot><tr><td colSpan={3} className="text-right">Netto:</td><td className="text-right">€{invoice.subtotal.toFixed(2)}</td></tr><tr><td colSpan={3} className="text-right">MwSt ({invoice.taxRate}%):</td><td className="text-right">€{invoice.taxAmount.toFixed(2)}</td></tr><tr className="font-bold"><td colSpan={3} className="text-right">Brutto:</td><td className="text-right">€{invoice.total.toFixed(2)}</td></tr></tfoot></table></div>
    </div>
  );
}