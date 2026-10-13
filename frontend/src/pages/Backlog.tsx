import React, { useState } from 'react';
import { Layers, Flame } from 'lucide-react';
import { mockSprints, mockTasks as initialMockTasks } from '../mock/data';
import type { Task, Sprint } from '../types';
import { Badge } from '../components/common/Badge';

export const Backlog: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialMockTasks);
  const [sprints] = useState<Sprint[]>(mockSprints);

  const activeSprint = sprints.find((s) => s.status === 'ACTIVE') || sprints[0];
  const sprintTasks = tasks.filter((t) => t.sprintId === activeSprint.id);
  const backlogTasks = tasks.filter((t) => !t.sprintId);

  const moveTaskToSprint = (taskId: string, targetSprintId: string | null) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, sprintId: targetSprintId } : t))
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Sprint Backlog & Planning</h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize backlog stories, estimate story points, and commit issues to active sprints
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm shadow-indigo-600/30 cursor-pointer">
            Create Sprint
          </button>
        </div>
      </div>

      {/* Active Sprint Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800/60">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">{activeSprint.name}</h3>
                <span className="text-[10px] bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded-full font-medium">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{activeSprint.goal}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400">
              {sprintTasks.length} issues ·{' '}
              <span className="font-semibold text-indigo-300">
                {sprintTasks.reduce((acc, t) => acc + (t.storyPoints || 0), 0)} pts
              </span>
            </span>
            <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer border border-slate-700">
              Complete Sprint
            </button>
          </div>
        </div>

        {/* Sprint Task Rows */}
        <div className="divide-y divide-slate-800/60">
          {sprintTasks.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No issues currently assigned to this sprint. Move tasks from the backlog below.
            </div>
          ) : (
            sprintTasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 hover:bg-slate-800/40 flex items-center justify-between gap-4 transition-colors text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono font-bold text-indigo-400 shrink-0">{task.key}</span>
                  <span className="text-slate-200 truncate">{task.title}</span>
                  <Badge status={task.status} />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge priority={task.priority} />
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-medium text-slate-300">
                    {task.storyPoints} pts
                  </span>
                  <button
                    onClick={() => moveTaskToSprint(task.id, null)}
                    className="text-slate-500 hover:text-rose-400 text-[11px] underline cursor-pointer"
                    title="Send back to backlog"
                  >
                    Move to Backlog
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Product Backlog Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-white">Product Backlog</h3>
            <span className="text-xs text-slate-400">({backlogTasks.length} unassigned)</span>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {backlogTasks.reduce((acc, t) => acc + (t.storyPoints || 0), 0)} pts total
          </span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {backlogTasks.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              Product backlog is clean. All active stories have been planned into sprints!
            </div>
          ) : (
            backlogTasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 hover:bg-slate-800/40 flex items-center justify-between gap-4 transition-colors text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono font-bold text-indigo-400 shrink-0">{task.key}</span>
                  <span className="text-slate-200 truncate">{task.title}</span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge priority={task.priority} />
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-medium text-slate-300">
                    {task.storyPoints} pts
                  </span>
                  <button
                    onClick={() => moveTaskToSprint(task.id, activeSprint.id)}
                    className="px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-[11px] font-medium cursor-pointer transition-colors"
                  >
                    + Add to Sprint 14
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
