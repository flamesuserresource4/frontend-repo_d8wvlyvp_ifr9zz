import React from 'react';
import { Plus, Search, Settings, Users } from 'lucide-react';

export default function Header({ project, onAddTask, search, setSearch }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">
            {project?.name || 'Select a project'}
          </h1>
          <p className="text-sm text-gray-500 truncate">
            Mentor: <span className="font-medium text-gray-700">{project?.mentor || '—'}</span> • Status: <span className="font-medium">{project?.status || '—'}</span>
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 w-1/2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks, assignees, tags..."
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAddTask}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Task</span>
          </button>
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Users className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
