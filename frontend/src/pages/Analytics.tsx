import React from 'react';
import { Zap, Target, Award } from 'lucide-react';
import { mockMetrics } from '../mock/data';

export const Analytics: React.FC = () => {
  const sprintHistory = [
    { sprint: 'Sprint 11', planned: 30, completed: 28 },
    { sprint: 'Sprint 12', planned: 32, completed: 31 },
    { sprint: 'Sprint 13', planned: 28, completed: 25 },
    { sprint: 'Sprint 14 (Active)', planned: 34, completed: 21 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Velocity & Delivery Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">
          Historical sprint velocity, completion forecasting, and delivery trends
        </p>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Average Velocity</span>
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{mockMetrics.velocity}</span>
            <span className="text-xs text-slate-400">story points / sprint</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">Based on last 4 completed iterations</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Predictability Index</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-400">92.4%</span>
            <span className="text-xs text-slate-400">commitment match</span>
          </div>
          <p className="mt-2 text-[11px] text-emerald-500/80">Excellent commitment-to-delivery ratio</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Overall Completion</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{mockMetrics.completionRate}%</span>
            <span className="text-xs text-slate-400">of quarterly goals</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">On track for Q4 milestone release</p>
        </div>
      </div>

      {/* Velocity Bar Chart Visualization */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-white">Sprint Velocity Breakdown</h3>
            <p className="text-xs text-slate-400">Planned Story Points vs. Completed Story Points</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded bg-slate-700 inline-block" /> Planned
            </span>
            <span className="flex items-center gap-1.5 text-indigo-400 font-medium">
              <span className="w-3 h-3 rounded bg-indigo-500 inline-block" /> Completed
            </span>
          </div>
        </div>

        {/* Visual Comparison Bars */}
        <div className="space-y-6 pt-4">
          {sprintHistory.map((item) => {
            const plannedWidth = Math.round((item.planned / 40) * 100);
            const completedWidth = Math.round((item.completed / 40) * 100);

            return (
              <div key={item.sprint} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200">{item.sprint}</span>
                  <span className="text-slate-400">
                    <span className="text-indigo-400 font-bold">{item.completed} pts</span> / {item.planned} planned
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {/* Planned Bar */}
                  <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-slate-600 h-full rounded-full transition-all"
                      style={{ width: `${plannedWidth}%` }}
                    />
                  </div>
                  {/* Completed Bar */}
                  <div className="w-full bg-slate-800/40 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all"
                      style={{ width: `${completedWidth}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
