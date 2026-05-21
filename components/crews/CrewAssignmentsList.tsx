'use client';

import { Calendar, Clock, MapPin, Euro } from 'lucide-react';
import { CrewAssignment } from '@/types/crew';

interface CrewAssignmentsListProps {
  assignments: CrewAssignment[];
}

export default function CrewAssignmentsList({ assignments }: CrewAssignmentsListProps) {
  if (assignments.length === 0) return <p className="text-gray-400 text-sm">Keine Einsätze zugewiesen.</p>;
  return (
    <div className="space-y-3">
      {assignments.map((a) => (
        <div key={a.id} className="glass p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white font-medium">{a.projectName}</p>
              <p className="text-sm text-gray-400">{a.orderNumber} {a.subServiceName && `• ${a.subServiceName}`}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              a.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' : a.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
            }`}>{a.status === 'scheduled' ? 'Geplant' : a.status === 'in_progress' ? 'In Arbeit' : 'Abgeschlossen'}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-1 text-gray-400"><Calendar className="h-3 w-3" />{new Date(a.date).toLocaleDateString('de-DE')}</div>
            <div className="flex items-center gap-1 text-gray-400"><Clock className="h-3 w-3" />{a.hours} h</div>
            <div className="flex items-center gap-1 text-gray-400"><MapPin className="h-3 w-3" />{a.area}</div>
            <div className="flex items-center gap-1 text-gray-400"><Euro className="h-3 w-3" />€{a.total.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}