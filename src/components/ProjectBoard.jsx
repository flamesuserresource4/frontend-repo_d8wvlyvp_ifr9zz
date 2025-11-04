import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

const STATUSES = ['To Do', 'In Progress', 'Review', 'Done'];

export default function ProjectBoard({ tasks, onCreateTask, onUpdateTask }) {
  const columns = useMemo(() => {
    const map = Object.fromEntries(STATUSES.map((s) => [s, []]));
    tasks.forEach((t) => map[t.status]?.push(t));
    return map;
  }, [tasks]);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-x-auto">
        <div className="min-w-[1024px] grid grid-cols-4 gap-4 p-4">
          {STATUSES.map((status) => (
            <Column
              key={status}
              title={status}
              tasks={columns[status]}
              onCreate={(title) => onCreateTask({ title, status })}
              onMove={(id, newStatus) => onUpdateTask(id, { status: newStatus })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Column({ title, tasks, onCreate, onMove }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const submit = () => {
    const v = input.trim();
    if (!v) return;
    onCreate(v);
    setInput('');
    setOpen(false);
  };

  return (
    <div className="bg-gray-50/60 rounded-xl border border-gray-200 flex flex-col">
      <div className="p-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <button onClick={() => setOpen((s) => !s)} className="p-1 rounded-md hover:bg-gray-200/60">
          <Plus className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      {open && (
        <div className="px-3 pb-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`New ${title} task`}
            className="w-full px-2 py-1.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 flex gap-2">
            <button onClick={submit} className="px-2.5 py-1.5 text-xs rounded-md bg-blue-600 text-white">Add</button>
            <button onClick={() => setOpen(false)} className="px-2.5 py-1.5 text-xs rounded-md border">Cancel</button>
          </div>
        </div>
      )}
      <div className="p-2 space-y-2 overflow-y-auto" style={{ maxHeight: '60vh' }}>
        {tasks.map((t) => (
          <Card key={t.id} task={t} onMove={onMove} />
        ))}
        {!tasks.length && (
          <div className="text-xs text-gray-500 px-3 py-6 text-center">No tasks</div>
        )}
      </div>
    </div>
  );
}

function Card({ task, onMove }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-gray-900">{task.title}</p>
          {task.assignee && (
            <p className="mt-1 text-xs text-gray-500">Assigned to {task.assignee}</p>
          )}
        </div>
        <select
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
          className="text-xs px-2 py-1 rounded-md border border-gray-300 bg-white"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      {task.tags && task.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
