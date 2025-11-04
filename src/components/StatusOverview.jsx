import React from 'react';
import { CheckCircle, Circle, AlertCircle, Clock } from 'lucide-react';

export default function StatusOverview({ project, tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'Done').length;
  const progress = total ? Math.round((done / total) * 100) : 0;

  const counts = {
    todo: tasks.filter((t) => t.status === 'To Do').length,
    inprogress: tasks.filter((t) => t.status === 'In Progress').length,
    review: tasks.filter((t) => t.status === 'Review').length,
    done,
  };

  return (
    <section className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card icon={<Circle className="h-4 w-4 text-gray-600" />} label="To Do" value={counts.todo} />
        <Card icon={<Clock className="h-4 w-4 text-blue-600" />} label="In Progress" value={counts.inprogress} />
        <Card icon={<AlertCircle className="h-4 w-4 text-yellow-600" />} label="Review" value={counts.review} />
        <Card icon={<CheckCircle className="h-4 w-4 text-green-600" />} label="Done" value={`${counts.done} (${progress}%)`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="p-4 rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Mentor</p>
            <p className="text-base font-medium text-gray-900">{project?.mentor || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Project Health</p>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              project?.status === 'On Track' ? 'bg-green-100 text-green-700' : project?.status === 'At Risk' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-700'
            }`}>
              {project?.status || '—'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ icon, label, value }) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">{icon}</div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
