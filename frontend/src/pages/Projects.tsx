import React from 'react';
import { FolderKanban, Plus, Users, ArrowRight } from 'lucide-react';
import { mockProjects } from '../mock/data';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Projects</h1>
          <p className="text-xs text-slate-400 mt-1">
            Workspaces projects, sprint cycles, and cross-team initiatives
          </p>
        </div>
        <button
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm shadow-indigo-600/30 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProjects.map((project) => {
          const completionPct = Math.round(
            (project.completedTaskCount / (project.taskCount || 1)) * 100
          );

          return (
            <div
              key={project.id}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center font-bold text-sm text-indigo-300">
                      {project.key}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{project.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Project Lead: {project.leadName}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    Key: {project.key}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress bar */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Task Completion</span>
                    <span className="font-semibold text-white">
                      {project.completedTaskCount} / {project.taskCount} tasks ({completionPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4 text-slate-400">
                  <span className="flex items-center gap-1">
                    <FolderKanban className="w-3.5 h-3.5" />
                    {project.taskCount} tasks
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    4 members
                  </span>
                </div>
                <Link
                  to="/board"
                  className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
                >
                  View Board <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
