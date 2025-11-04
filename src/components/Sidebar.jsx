import React from 'react';
import { Folder, Plus } from 'lucide-react';

export default function Sidebar({ projects, selectedId, onSelectProject, onAddProject }) {
  return (
    <aside className="h-full w-full md:w-64 border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Team Workspace</h2>
          <p className="text-xs text-gray-500">1 team • multiple projects</p>
        </div>
        <button
          onClick={onAddProject}
          className="p-2 rounded-md border border-gray-200 hover:bg-gray-50"
          title="Add Project"
        >
          <Plus className="h-4 w-4 text-gray-700" />
        </button>
      </div>

      <nav className="p-2 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100% - 72px)' }}>
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectProject(p.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition ${
              selectedId === p.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Folder className="h-4 w-4" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium truncate">{p.name}</span>
                <span className={`ml-2 text-xs rounded-full px-2 py-0.5 ${
                  p.status === 'On Track' ? 'bg-green-100 text-green-700' : p.status === 'At Risk' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>
                  {p.status}
                </span>
              </div>
              <div className="text-xs text-gray-500 truncate">Mentor: {p.mentor}</div>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}
