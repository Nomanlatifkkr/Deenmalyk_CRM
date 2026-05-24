'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { createInvoice } from '@/lib/mock/invoices';
import { InvoiceItem } from '@/types/invoice';

export default function NewInvoicePage() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState<InvoiceItem[]>([{ id: '1', description: '', quantity: 1, unit: 'Std', unitPrice: 0, total: 0 }]);
  const [form, setForm] = useState({ customerId: '', issueDate: new Date().toISOString().split('T')[0], dueDate: '', taxRate: 19, notes: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('customers');
    setCustomers(stored ? JSON.parse(stored) : [{ id: 'c1', name: 'ABC Construction GmbH' }]);
  }, []);

  const updateItem = (idx: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[idx].total = newItems[idx].quantity * newItems[idx].unitPrice;
    }
    setItems(newItems);
  };
  const addItem = () => setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, unit: 'Std', unitPrice: 0, total: 0 }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const customer = customers.find(c => c.id === form.customerId);
    const subtotal = items.reduce((sum, i) => sum + i.total, 0);
    const taxAmount = subtotal * (form.taxRate / 100);
    const total = subtotal + taxAmount;
    const invoiceData = {
      companyId: 'screed',
      customerId: form.customerId,
      customerName: customer?.name || '',
      customerAddress: '',
      issueDate: form.issueDate,
      dueDate: form.dueDate,
      items,
      subtotal,
      taxRate: form.taxRate,
      taxAmount,
      total,
      status: 'draft' as const,
      notes: form.notes,
    };
    await createInvoice(invoiceData);
    setLoading(false);
    router.push('/invoices');
  };

  return (
    <div className="space-y-6"><div className="flex items-center gap-4"><Link href="/invoices"><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Neue Rechnung</h1></div></div>
    <div className="glass-card p-6"><form onSubmit={handleSubmit} className="space-y-6"><div className="grid grid-cols-2 gap-4"><div><label>Kunde</label><select required value={form.customerId} onChange={e => setForm({...form, customerId: e.target.value})} className="w-full p-2 bg-white/5 border rounded"><option value="">Wählen</option>{customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div><div><label>Ausstellungsdatum</label><input type="date" required value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} className="w-full p-2 bg-white/5 border rounded" /></div><div><label>Fällig am</label><input type="date" required value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} className="w-full p-2 bg-white/5 border rounded" /></div><div><label>Steuersatz (%)</label><select value={form.taxRate} onChange={e => setForm({...form, taxRate: parseInt(e.target.value)})} className="w-full p-2 bg-white/5 border rounded"><option value="0">0%</option><option value="19">19%</option></select></div></div>
    <div><h3 className="text-white font-semibold mb-2">Positionen</h3>{items.map((item, idx) => <div key={item.id} className="flex flex-wrap gap-2 mb-2"><input placeholder="Beschreibung" value={item.description} onChange={e => updateItem(idx, 'description', e.target.value)} className="w-48 p-1 bg-white/5 border rounded text-sm" /><input type="number" placeholder="Menge" value={item.quantity} onChange={e => updateItem(idx, 'quantity', parseFloat(e.target.value)||0)} className="w-20 p-1 bg-white/5 border rounded text-sm" /><input placeholder="Einheit" value={item.unit} onChange={e => updateItem(idx, 'unit', e.target.value)} className="w-16 p-1 bg-white/5 border rounded text-sm" /><input type="number" placeholder="Preis" value={item.unitPrice} onChange={e => updateItem(idx, 'unitPrice', parseFloat(e.target.value)||0)} className="w-24 p-1 bg-white/5 border rounded text-sm" /><span className="text-white text-sm">€{item.total.toFixed(2)}</span><button type="button" onClick={() => removeItem(idx)}><Trash2 className="h-4 w-4 text-red-400" /></button></div>)}<button type="button" onClick={addItem} className="text-sm text-blue-400">+ Position hinzufügen</button></div>
    <div><label>Notizen</label><textarea rows={2} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full p-2 bg-white/5 border rounded" /></div>
    <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 rounded-lg text-white flex items-center gap-2"><Save className="h-4 w-4" /> {loading ? 'Erstelle...' : 'Rechnung erstellen'}</button></form></div></div>
  );
}