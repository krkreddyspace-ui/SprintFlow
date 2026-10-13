import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  TrendingUp,
  ArrowRight,
  Flame,
} from 'lucide-react';
import {
  mockMetrics,
  mockSprints,
  mockProjects,
  mockActivityLogs,
  mockUsers,
} from '../mock/data';
import { Badge } from '../components/common/Badge';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const activeSprint = mockSprints.find((s) => s.status === 'ACTIVE') || mockSprints[0];
  const primaryProject = mockProjects[0];

  const sprintProgressPercent = Math.round(
    (activeSprint.completedStoryPoints / (activeSprint.totalStoryPoints || 1)) * 100
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Engineering Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time delivery metrics for {primaryProject.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/board"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm shadow-indigo-600/30"
          >
            Go to Active Board
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completed Tasks */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Completed Tasks</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/50 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{mockMetrics.completedTasks}</span>
            <span className="text-xs text-slate-400">/ {mockMetrics.totalTasks} total</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{mockMetrics.completionRate}% completion rate</span>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">In Progress</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/50 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{mockMetrics.inProgressTasks}</span>
            <span className="text-xs text-slate-400">active items</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400">
            <span>Flowing through active sprint</span>
          </div>
        </div>

        {/* Overdue Alert */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Overdue Risk</span>
            <div className="w-8 h-8 rounded-lg bg-rose-950/50 border border-rose-800/60 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-rose-400">{mockMetrics.overdueTasks}</span>
            <span className="text-xs text-slate-400">flagged tasks</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-400">
            <span>Requires PM escalation</span>
          </div>
        </div>

        {/* Sprint Velocity */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Sprint Velocity</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-950/50 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{mockMetrics.velocity}</span>
            <span className="text-xs text-slate-400">pts / sprint</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo-400">
            <span>Historical 3-sprint average</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Active Sprint Card & Team Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Sprint Spotlight */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800/50">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">{activeSprint.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeSprint.goal}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/40 text-emerald-300 border border-emerald-800/60">
              Active Sprint
            </span>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Sprint Story Point Progress</span>
              <span className="font-semibold text-white">
                {activeSprint.completedStoryPoints} of {activeSprint.totalStoryPoints} pts ({sprintProgressPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${sprintProgressPercent}%` }}
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              <span className="text-slate-500">Timeline: </span>
              <span className="text-slate-300">Oct 1 – Oct 15, 2026 (3 days left)</span>
            </div>
            <Link
              to="/backlog"
              className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
            >
              Manage Sprint Backlog →
            </Link>
          </div>
        </div>

        {/* Team Workload */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">Team Workload</h3>
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
                  />
                  <div>
                    <p className="text-xs font-medium text-slate-200">{user.name}</p>
                    <Badge role={user.role} />
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2 py-1 rounded">
                  {user.role === 'DEVELOPER' ? '3 active' : '1 active'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Stream */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
        <h3 className="text-base font-semibold text-white mb-4">Recent Audit & Activity Stream</h3>
        <div className="divide-y divide-slate-800/80">
          {mockActivityLogs.map((log) => (
            <div key={log.id} className="py-3 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={log.user.avatarUrl}
                  alt={log.user.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-200">{log.user.name} </span>
                  <span className="text-slate-400">{log.action} </span>
                  {log.taskKey && (
                    <span className="font-mono text-indigo-400 font-medium bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-800/50">
                      {log.taskKey}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[11px] text-slate-500 shrink-0">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
