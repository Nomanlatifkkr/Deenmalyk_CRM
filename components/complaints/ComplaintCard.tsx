'use client';

import Link from 'next/link';
import { AlertTriangle, Calendar, Euro, CheckCircle, Clock } from 'lucide-react';
import { Complaint } from '@/types/complaint';

interface ComplaintCardProps {
  complaint: Complaint;
}

const priorityConfig = {
  low: { label: 'Niedrig', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  medium: { label: 'Mittel', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' },
  high: { label: 'Hoch', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
};
const statusConfig = {
  open: { label: 'Offen', color: 'text-yellow-400' },
  in_progress: { label: 'In Arbeit', color: 'text-blue-400' },
  completed: { label: 'Erledigt', color: 'text-green-400' },
  cancelled: { label: 'Storniert', color: 'text-gray-400' },
};

export default function ComplaintCard({ complaint }: ComplaintCardProps) {
  return (
    <div className="glass-card p-5 hover:scale-[1.02] transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <span className="text-sm font-mono text-gray-400">{complaint.complaintNumber}</span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityConfig[complaint.priority].color}`}>
          {priorityConfig[complaint.priority].label}
        </span>
      </div>
      <Link href={`/complaints/${complaint.id}`}>
        <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition mt-2">{complaint.title}</h3>
      </Link>
      <p className="text-sm text-gray-400 mt-1 line-clamp-2">{complaint.description}</p>
      <div className="mt-3 flex justify-between items-center text-sm">
        <div>
          <span className="text-gray-500">Auftrag:</span>{' '}
          <Link href={`/orders/${complaint.originalOrderId}`} className="text-blue-400 hover:underline">
            {complaint.originalOrderNumber}
          </Link>
        </div>
        <div className="flex items-center gap-1 text-red-400">
          <Euro className="h-3 w-3" />
          -{complaint.reductionAmount.toLocaleString()} €
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center text-xs">
        <div className="flex items-center gap-1 text-gray-500">
          <Calendar className="h-3 w-3" />
          {new Date(complaint.createdAt).toLocaleDateString('de-DE')}
        </div>
        <span className={`flex items-center gap-1 ${statusConfig[complaint.status].color}`}>
          {complaint.status === 'completed' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
          {statusConfig[complaint.status].label}
        </span>
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={`/complaints/${complaint.id}`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm">Details</Link>
        {complaint.status !== 'completed' && (
          <Link href={`/complaints/${complaint.id}/complete`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm text-green-400">Abschließen</Link>
        )}
      </div>
    </div>
  );
}