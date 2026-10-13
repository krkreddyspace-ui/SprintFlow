import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { currentMockUser, mockWorkspace } from '../mock/data';

interface TopNavProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="h-16 bg-slate-950/70 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between z-20 shrink-0">
      {/* Left: Breadcrumbs & Current Context */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-slate-400">Workspace</span>
        <span className="text-xs text-slate-600">/</span>
        <span className="text-xs font-semibold text-slate-200">{mockWorkspace.name}</span>
      </div>

      {/* Center: Global Search Input */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search issues, sprints, projects (e.g. SF-101)..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions & User Meta */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
        </button>

        <button
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer"
          title="Help & Documentation"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-slate-800 mx-1" />

        {/* User Avatar with Status Indicator */}
        <div className="flex items-center gap-2 pl-1 cursor-pointer">
          <div className="relative">
            <img
              src={currentMockUser.avatarUrl}
              alt={currentMockUser.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-200 leading-none">
              {currentMockUser.name}
            </span>
            <span className="text-[10px] text-slate-400 mt-1 leading-none">
              {currentMockUser.role.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
