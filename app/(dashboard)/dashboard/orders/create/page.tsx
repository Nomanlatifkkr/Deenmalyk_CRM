'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Customer {
  id: string;
  name: string;
  customerNumber: string;
}

interface OrderItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function CreateOrderPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState({
    customerId: '',
    orderNumber: '',
    description: '',
    plannedStartDate: '',
    plannedEndDate: '',
  });
  const [items, setItems] = useState<OrderItem[]>([{ description: '', quantity: 1, unitPrice: 0 }]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    const stored = localStorage.getItem('customers');
    if (stored) {
      setCustomers(JSON.parse(stored));
    } else {
      // Mock customers if none exist
      const mockCustomers = [
        { id: '1', name: 'ABC Construction GmbH', customerNumber: 'C-1001' },
        { id: '2', name: 'Bauwerk AG', customerNumber: 'C-1002' },
      ];
      setCustomers(mockCustomers);
    }
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCustomer = customers.find(c => c.id === formData.customerId);
    
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: formData.orderNumber,
      customerId: formData.customerId,
      customerName: selectedCustomer?.name || '',
      status: 'draft',
      orderDate: new Date().toISOString().split('T')[0],
      plannedStartDate: formData.plannedStartDate,
      plannedEndDate: formData.plannedEndDate,
      totalAmount: calculateTotal(),
      plannedCosts: calculateTotal() * 0.65,
      actualCosts: 0,
      contributionMargin: 35,
      description: formData.description,
      items: items.map(item => ({
        ...item,
        total: item.quantity * item.unitPrice
      }))
    };
    
    // Get existing orders
    const stored = localStorage.getItem('orders');
    const existingOrders = stored ? JSON.parse(stored) : [];
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    router.push('/dashboard/orders');
  };

  const getCustomerName = () => {
    const customer = customers.find(c => c.id === formData.customerId);
    return customer ? customer.name : 'Select a customer';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard/orders">
            <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Order</h1>
            <p className="text-gray-500 text-sm mt-1">Create a new screed works order</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Information */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Order Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer *</label>
                  <select
                    required
                    value={formData.customerId}
                    onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                    className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Customer</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} ({customer.customerNumber})
                      </option>
                    ))}
                  </select>
                  {formData.customerId && (
                    <p className="text-xs text-green-600 mt-1">Selected: {getCustomerName()}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SC-2024-001"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Order description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planned Start Date</label>
                  <input
                    type="date"
                    value={formData.plannedStartDate}
                    onChange={(e) => setFormData({ ...formData, plannedStartDate: e.target.value })}
                    className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planned End Date</label>
                  <input
                    type="date"
                    value={formData.plannedEndDate}
                    onChange={(e) => setFormData({ ...formData, plannedEndDate: e.target.value })}
                    className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
              >
                <Plus className="h-4 w-4" /> Add Item
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-end">
                    <div className="col-span-5">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Item description"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price (€)</label>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-1">
                      <div className="text-sm font-medium text-gray-700 mb-1">Total</div>
                      <div className="py-2 text-sm font-semibold text-gray-900">
                        €{(item.quantity * item.unitPrice).toFixed(2)}
                      </div>
                    </div>
                    <div className="col-span-1">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4 text-right">
                <div className="text-lg font-semibold text-gray-900">
                  Total Amount: €{calculateTotal().toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Link href="/dashboard/orders">
              <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Cancel
              </button>
            </Link>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}