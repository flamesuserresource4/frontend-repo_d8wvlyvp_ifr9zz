import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StatusOverview from './components/StatusOverview';
import ProjectBoard from './components/ProjectBoard';

// Demo data for a single team with multiple projects
const initialProjects = [
  { id: 'p1', name: 'Website Redesign', mentor: 'Ava Martin', status: 'On Track' },
  { id: 'p2', name: 'Mobile App v2', mentor: 'James Lee', status: 'At Risk' },
  { id: 'p3', name: 'Data Platform', mentor: 'Priya Patel', status: 'Behind' },
];

const initialTasks = [
  { id: 't1', projectId: 'p1', title: 'Audit current pages', status: 'To Do', assignee: 'Alex', tags: ['UX'] },
  { id: 't2', projectId: 'p1', title: 'Define color system', status: 'In Progress', assignee: 'Dana', tags: ['Design'] },
  { id: 't3', projectId: 'p1', title: 'Landing page wireframe', status: 'Review', assignee: 'Chris', tags: ['UX', 'Review'] },
  { id: 't4', projectId: 'p1', title: 'Hero section build', status: 'Done', assignee: 'Alex', tags: ['Frontend'] },
  { id: 't5', projectId: 'p2', title: 'Auth flow', status: 'To Do', assignee: 'Sam', tags: ['Mobile'] },
  { id: 't6', projectId: 'p3', title: 'Set up ETL job', status: 'In Progress', assignee: 'Lee', tags: ['Data'] },
];

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjects[0]?.id || null);
  const [search, setSearch] = useState('');

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) || null,
    [projects, selectedProjectId]
  );

  const visibleTasks = useMemo(() => {
    const q = search.toLowerCase();
    return tasks.filter((t) => {
      const inProject = selectedProject ? t.projectId === selectedProject.id : true;
      const inSearch = !q ||
        t.title.toLowerCase().includes(q) ||
        (t.assignee || '').toLowerCase().includes(q) ||
        (t.tags || []).some((tag) => tag.toLowerCase().includes(q));
      return inProject && inSearch;
    });
  }, [tasks, selectedProject, search]);

  const handleAddProject = () => {
    const name = prompt('Project name');
    if (!name) return;
    const id = `p${Date.now()}`;
    setProjects((prev) => [...prev, { id, name, mentor: 'Unassigned', status: 'On Track' }]);
    setSelectedProjectId(id);
  };

  const handleAddTask = () => {
    if (!selectedProject) return;
    const title = prompt('Task title');
    if (!title) return;
    const id = `t${Date.now()}`;
    setTasks((prev) => [
      ...prev,
      { id, projectId: selectedProject.id, title, status: 'To Do', assignee: '', tags: [] },
    ]);
  };

  const handleUpdateTask = (id, patch) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 text-gray-900">
      <div className="h-full grid grid-rows-[auto_auto_1fr] md:grid-rows-[auto_1fr] md:grid-cols-[260px_1fr]">
        <div className="row-start-2 md:row-start-1 md:row-span-2 md:col-start-1">
          <Sidebar
            projects={projects}
            selectedId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
            onAddProject={handleAddProject}
          />
        </div>

        <div className="row-start-1 md:col-start-2">
          <Header
            project={selectedProject}
            onAddTask={handleAddTask}
            search={search}
            setSearch={setSearch}
          />
        </div>

        <div className="row-start-3 md:row-start-2 md:col-start-2 flex flex-col min-h-0">
          <StatusOverview project={selectedProject} tasks={visibleTasks} />
          <ProjectBoard
            tasks={visibleTasks}
            onCreateTask={(t) => {
              if (!selectedProject) return;
              const id = `t${Date.now()}`;
              setTasks((prev) => [
                ...prev,
                {
                  id,
                  projectId: selectedProject.id,
                  title: t.title,
                  status: t.status,
                  assignee: '',
                  tags: [],
                },
              ]);
            }}
            onUpdateTask={handleUpdateTask}
          />
        </div>
      </div>
    </div>
  );
}
