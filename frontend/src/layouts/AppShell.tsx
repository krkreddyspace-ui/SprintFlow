import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { mockProjects, mockUsers, mockTasks } from '../mock/data';
import type { Task, TaskPriority, TaskType } from '../types';

interface AppShellProps {
  onTaskCreated?: (newTask: Task) => void;
}

export const AppShell: React.FC<AppShellProps> = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Quick Create Issue Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(mockProjects[0]?.id || '');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [type, setType] = useState<TaskType>('TASK');
  const [assigneeId, setAssigneeId] = useState(mockUsers[2]?.id || '');
  const [storyPoints, setStoryPoints] = useState(3);

  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignedUser = mockUsers.find((u) => u.id === assigneeId) || null;
    const newTask: Task = {
      id: `task-${Date.now()}`,
      key: `SF-${mockTasks.length + 101}`,
      projectId,
      sprintId: 'sp-14',
      title: title.trim(),
      description: description.trim(),
      status: 'TODO',
      priority,
      type,
      storyPoints: Number(storyPoints) || 1,
      assignee: assignedUser,
      reporter: mockUsers[0],
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      labels: ['frontend', 'feature'],
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockTasks.unshift(newTask);
    setTitle('');
    setDescription('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenCreateTask={() => setIsCreateModalOpen(true)}
      />

      {/* Main Workspace Frame */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopNav searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Scrollable Page Canvas */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-8">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>

      {/* Quick Create Issue Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Issue"
        description="Add a task, story, or bug to the active sprint backlog"
        size="lg"
      >
        <form onSubmit={handleCreateIssue} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">Project</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {mockProjects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.key})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">Issue Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TaskType)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="STORY">Story (Feature)</option>
                <option value="TASK">Task (Chore)</option>
                <option value="BUG">Bug (Defect)</option>
                <option value="EPIC">Epic</option>
              </select>
            </div>
          </div>

          <Input
            label="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Implement refresh token rotation in Spring Security"
            required
          />

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Detailed acceptance criteria, reproduction steps, or context..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">Story Points</label>
              <input
                type="number"
                min="1"
                max="21"
                value={storyPoints}
                onChange={(e) => setStoryPoints(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">Assignee</label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Unassigned</option>
                {mockUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role.replace('_', ' ')})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Issue
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
