'use client';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { OfferService } from '@/types/offer';
import { CatalogService, fetchCatalogServices } from '@/lib/mock/services';

export default function ServiceDragDrop({ services, onUpdate }: { services: OfferService[]; onUpdate: (services: OfferService[]) => void }) {
  const [catalog, setCatalog] = useState<CatalogService[]>([]);
  const [items, setItems] = useState(services);
  useEffect(() => { fetchCatalogServices().then(setCatalog); }, []);
  useEffect(() => { setItems(services); }, [services]);
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setItems(reordered);
    onUpdate(reordered);
  };
  const addFromCatalog = (catService: CatalogService) => {
    const newService: OfferService = {
      id: `temp-${Date.now()}`,
      serviceId: catService.id,
      serviceName: catService.name,
      description: catService.description,
      quantity: 1,
      unit: catService.unit,
      unitPrice: catService.defaultPrice,
      totalPrice: catService.defaultPrice,
    };
    const updated = [...items, newService];
    setItems(updated);
    onUpdate(updated);
  };
  const updateItem = (idx: number, field: keyof OfferService, value: any) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      updated[idx].totalPrice = updated[idx].quantity * updated[idx].unitPrice;
    }
    setItems(updated);
    onUpdate(updated);
  };
  const removeItem = (idx: number) => {
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
    onUpdate(updated);
  };
  return (
    <div className="space-y-4">
      <div><h3 className="text-white font-semibold mb-2">Leistungen aus Katalog</h3><div className="flex flex-wrap gap-2">{catalog.map(s => <button key={s.id} onClick={() => addFromCatalog(s)} className="px-3 py-1 glass rounded-lg text-sm">{s.name}</button>)}</div></div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="services">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {items.map((item, idx) => (
                <Draggable key={item.id} draggableId={item.id} index={idx}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} className="glass p-3 rounded-lg">
                      <div className="flex flex-wrap items-center gap-2">
                        <div {...provided.dragHandleProps}><GripVertical className="h-4 w-4 text-gray-500" /></div>
                        <input value={item.serviceName} onChange={e => updateItem(idx, 'serviceName', e.target.value)} className="w-32 p-1 bg-white/5 border rounded text-white text-sm" />
                        <input type="number" step="1" value={item.quantity} onChange={e => updateItem(idx, 'quantity', parseFloat(e.target.value)||0)} className="w-20 p-1 bg-white/5 border rounded text-white text-sm" />
                        <span>{item.unit}</span>
                        <input type="number" step="0.01" value={item.unitPrice} onChange={e => updateItem(idx, 'unitPrice', parseFloat(e.target.value)||0)} className="w-24 p-1 bg-white/5 border rounded text-white text-sm" />
                        <span className="text-white font-mono">€{item.totalPrice.toFixed(2)}</span>
                        <button onClick={() => removeItem(idx)}><Trash2 className="h-4 w-4 text-red-400" /></button>
                      </div>
                      <input value={item.description} onChange={e => updateItem(idx, 'description', e.target.value)} className="mt-1 w-full p-1 bg-white/5 border rounded text-white text-xs" placeholder="Beschreibung" />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}