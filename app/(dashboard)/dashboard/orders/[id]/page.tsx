'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Save, X, Trash2, Calendar, DollarSign, Package, Truck } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  status: string;
  orderDate: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  totalAmount: number;
  plannedCosts: number;
  actualCosts: number;
  contributionMargin: number;
  description?: string;
  items: OrderItem[];
}

interface OrderItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Unwrap params using React.use()
  const { id } = React.use(params);
  
  const [formData, setFormData] = useState({
    orderNumber: '',
    description: '',
    plannedStartDate: '',
    plannedEndDate: '',
    status: 'draft',
  });
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (id) {
      loadOrderFromLocalStorage();
    }
  }, [id]);

  const loadOrderFromLocalStorage = () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem('orders');
      const allOrders: Order[] = stored ? JSON.parse(stored) : [];
      const found = allOrders.find(o => o.id === id);
      
      if (found) {
        setOrder(found);
        setFormData({
          orderNumber: found.orderNumber,
          description: found.description || '',
          plannedStartDate: found.plannedStartDate || '',
          plannedEndDate: found.plannedEndDate || '',
          status: found.status,
        });
        setItems(found.items || []);
      }
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    
    const updatedOrder: Order = {
      ...order,
      orderNumber: formData.orderNumber,
      description: formData.description,
      plannedStartDate: formData.plannedStartDate,
      plannedEndDate: formData.plannedEndDate,
      status: formData.status as any,
      items: items,
      totalAmount: items.reduce((sum, item) => sum + item.total, 0),
    };
    
    // Update in localStorage
    const stored = localStorage.getItem('orders');
    let allOrders: Order[] = stored ? JSON.parse(stored) : [];
    allOrders = allOrders.map(o => o.id === id ? updatedOrder : o);
    localStorage.setItem('orders', JSON.stringify(allOrders));
    
    setOrder(updatedOrder);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!confirm('Delete this order?')) return;
    
    const stored = localStorage.getItem('orders');
    let allOrders: Order[] = stored ? JSON.parse(stored) : [];
    allOrders = allOrders.filter(o => o.id !== id);
    localStorage.setItem('orders', JSON.stringify(allOrders));
    
    router.push('/dashboard/orders');
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      confirmed: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    const labels: Record<string, string> = {
      draft: 'Draft',
      confirmed: 'Confirmed',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {labels[status] || status}
      </span>
    );
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }
    setItems(newItems);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading order details...</div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/orders">
              <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200">
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Order' : order.orderNumber}</h1>
              <p className="text-gray-500 text-sm">Order Details</p>
            </div>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button 
                  onClick={handleDelete} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <X className="h-4 w-4" /> Cancel
                </button>
                <button 
                  onClick={handleUpdate} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <Save className="h-4 w-4" /> Save
                </button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Order Information */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Order Information</h2>
            </div>
            <div className="p-6">
              {!isEditing ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div>{getStatusBadge(order.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-gray-900">{order.description || '-'}</p>
                  </div>
                </div>
              ) : (
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order Number *</label>
                      <input
                        type="text"
                        required
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                </form>
              )}
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Schedule</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Planned Start</p>
                    <p className="text-gray-900">{order.plannedStartDate ? new Date(order.plannedStartDate).toLocaleDateString() : '-'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Planned End</p>
                    <p className="text-gray-900">{order.plannedEndDate ? new Date(order.plannedEndDate).toLocaleDateString() : '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financials */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Financials</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">€{order.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Planned Costs</p>
                  <p className="text-2xl font-bold text-gray-900">€{order.plannedCosts.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contribution Margin</p>
                  <p className="text-2xl font-bold text-blue-600">{order.contributionMargin.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          {order.items && order.items.length > 0 && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Description</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Quantity</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Unit Price</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.items.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-3 text-sm text-gray-900">{item.description}</td>
                        <td className="px-6 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                        <td className="px-6 py-3 text-sm text-gray-900 text-right">€{item.unitPrice.toFixed(2)}</td>
                        <td className="px-6 py-3 text-sm font-semibold text-gray-900 text-right">€{item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 border-t border-gray-200">
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-sm font-semibold text-gray-900 text-right">Total:</td>
                      <td className="px-6 py-3 text-sm font-bold text-gray-900 text-right">€{order.totalAmount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}