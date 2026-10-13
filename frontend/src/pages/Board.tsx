import React, { useState } from 'react';
import {
  Filter,
  CheckCircle2,
  Clock,
  CircleDot,
  PlayCircle,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { mockTasks as initialMockTasks, mockSprints } from '../mock/data';
import type { Task, TaskStatus } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { cn } from '../utils/cn';

const COLUMNS: { status: TaskStatus; label: string; icon: React.ReactNode; color: string }[] = [
  {
    status: 'TODO',
    label: 'To Do',
    icon: <CircleDot className="w-4 h-4 text-slate-400" />,
    color: 'border-t-slate-500',
  },
  {
    status: 'IN_PROGRESS',
    label: 'In Progress',
    icon: <PlayCircle className="w-4 h-4 text-amber-400" />,
    color: 'border-t-amber-500',
  },
  {
    status: 'IN_REVIEW',
    label: 'In Review',
    icon: <Clock className="w-4 h-4 text-sky-400" />,
    color: 'border-t-sky-500',
  },
  {
    status: 'DONE',
    label: 'Done',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    color: 'border-t-emerald-500',
  },
];

export const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialMockTasks);
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const activeSprint = mockSprints[0];

  // Move task status
  const moveTask = (taskId: string, targetStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus, updatedAt: new Date().toISOString() } : t))
    );
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, status: targetStatus } : null));
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = filterPriority === 'ALL' || task.priority === filterPriority;
    const matchesSearch =
      task.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      task.key.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full space-y-6 max-w-7xl mx-auto">
      {/* Board Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Sprint Board</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/60">
              {activeSprint.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Drag, prioritize, and track issue workflow in real time
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Filter board..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36"
          />
        </div>
      </div>

      {/* 4-Column Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 items-start">
        {COLUMNS.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.status);
          const colStoryPoints = colTasks.reduce((acc, t) => acc + (t.storyPoints || 0), 0);

          return (
            <div
              key={col.status}
              className={cn(
                'bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col max-h-[calc(100vh-220px)] border-t-2',
                col.color
              )}
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {col.icon}
                  <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    {col.label}
                  </h3>
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-[11px] font-bold text-slate-300 flex items-center justify-center">
                    {colTasks.length}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded">
                  {colStoryPoints} pts
                </span>
              </div>

              {/* Tasks List */}
              <div className="p-3 space-y-3 overflow-y-auto flex-1">
                {colTasks.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-800/80 rounded-lg">
                    No issues in this column
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-lg p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
                    >
                      {/* Top: Issue Key & Priority */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                          {task.key}
                        </span>
                        <Badge priority={task.priority} />
                      </div>

                      {/* Title */}
                      <h4 className="text-xs font-medium text-slate-200 group-hover:text-white leading-relaxed">
                        {task.title}
                      </h4>

                      {/* Labels */}
                      {task.labels && task.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.labels.map((lbl) => (
                            <span
                              key={lbl}
                              className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded"
                            >
                              #{lbl}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Bottom Meta & Move Transitions */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {task.storyPoints && (
                            <span className="text-[10px] font-semibold bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded">
                              {task.storyPoints} pts
                            </span>
                          )}
                          {task.commentsCount > 0 && (
                            <span className="flex items-center gap-1 text-[10px] text-slate-400">
                              <MessageSquare className="w-3 h-3" />
                              {task.commentsCount}
                            </span>
                          )}
                        </div>

                        {/* Assignee Avatar */}
                        {task.assignee ? (
                          <img
                            src={task.assignee.avatarUrl}
                            alt={task.assignee.name}
                            title={task.assignee.name}
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-700"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-500 italic">Unassigned</span>
                        )}
                      </div>

                      {/* Quick Move Transition Buttons */}
                      <div
                        className="pt-1 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {col.status !== 'TODO' && (
                          <button
                            onClick={() => {
                              const prevIdx = COLUMNS.findIndex((c) => c.status === col.status) - 1;
                              moveTask(task.id, COLUMNS[prevIdx].status);
                            }}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center"
                            title="Move to previous column"
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                        )}
                        {col.status !== 'DONE' && (
                          <button
                            onClick={() => {
                              const nextIdx = COLUMNS.findIndex((c) => c.status === col.status) + 1;
                              moveTask(task.id, COLUMNS[nextIdx].status);
                            }}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center"
                            title="Move to next column"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Details Dialog Modal */}
      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          title={selectedTask.key}
          description="Issue specifications and status workflow"
          size="lg"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white">{selectedTask.title}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge status={selectedTask.status} />
                <Badge priority={selectedTask.priority} />
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {selectedTask.type}
                </span>
                <span className="text-xs bg-slate-800 text-indigo-300 px-2 py-0.5 rounded">
                  {selectedTask.storyPoints} Story Points
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Description
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedTask.description || 'No description provided.'}
              </p>
            </div>

            {/* Workflow Transition Buttons */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Update Status Transition
              </h4>
              <div className="flex flex-wrap gap-2">
                {COLUMNS.map((c) => (
                  <button
                    key={c.status}
                    onClick={() => moveTask(selectedTask.id, c.status)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer',
                      selectedTask.status === c.status
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Assignee & Reporter Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-800">
              <div>
                <span className="text-slate-500 block">Assignee</span>
                <span className="text-slate-200 font-medium">
                  {selectedTask.assignee ? selectedTask.assignee.name : 'Unassigned'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Reporter</span>
                <span className="text-slate-200 font-medium">{selectedTask.reporter.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Due Date</span>
                <span className="text-slate-200 font-medium">{selectedTask.dueDate || 'None'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Updated</span>
                <span className="text-slate-200 font-medium">
                  {new Date(selectedTask.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
