'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchInvoice } from '@/lib/mock/invoices';
export default function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [invoice, setInvoice] = useState<any>(null);
  useEffect(() => { fetchInvoice(id).then(setInvoice); }, [id]);
  if (!invoice) return <div>Laden...</div>;
  return (<div className="space-y-6"><div className="flex items-center gap-4"><Link href={`/invoices/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><h1 className="text-2xl font-bold text-white">Vorschau</h1></div><div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto"><h2 className="text-xl font-bold">Rechnung {invoice.invoiceNumber}</h2><p>{invoice.customerName}</p><table className="w-full"><thead><tr><th>Leistung</th><th>Menge</th><th>Preis</th><th>Gesamt</th></tr></thead><tbody>{invoice.items.map((item: any) => <tr key={item.id}><td>{item.description}</td><td>{item.quantity}</td><td>€{item.unitPrice}</td><td>€{item.total}</td></tr>)}</tbody></table><p>Gesamt: €{invoice.total}</p></div></div>);
}