import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  KanbanSquare,
  Layers,
  BarChart3,
  Plus,
  ChevronDown,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { mockWorkspace, currentMockUser } from '../mock/data';
import { Badge } from '../components/common/Badge';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenCreateTask: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  onOpenCreateTask,
}) => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Projects', path: '/projects', icon: FolderKanban },
    { label: 'Kanban Board', path: '/board', icon: KanbanSquare },
    { label: 'Sprint Backlog', path: '/backlog', icon: Layers },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  return (
    <aside
      className={cn(
        'relative flex flex-col bg-slate-950 border-r border-slate-800/80 transition-all duration-300 ease-in-out z-30 select-none shrink-0',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand & Logo Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-base tracking-tight text-white leading-none">
                SprintFlow
              </span>
              <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase mt-1">
                Enterprise Agile
              </span>
            </div>
          )}
        </div>

        {/* Toggle Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer hidden md:flex"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Workspace Switcher */}
      <div className="p-3 border-b border-slate-800/60">
        <button
          className={cn(
            'w-full flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-left transition-colors cursor-pointer',
            isCollapsed && 'justify-center p-2'
          )}
          title={mockWorkspace.name}
        >
          <div className="w-6 h-6 rounded bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-[10px] font-bold text-indigo-300 shrink-0">
            AC
          </div>
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">
                  {mockWorkspace.name}
                </p>
                <p className="text-[10px] text-slate-400">{mockWorkspace.membersCount} members</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </>
          )}
        </button>
      </div>

      {/* Quick Action: New Issue Button */}
      <div className="p-3">
        <button
          onClick={onOpenCreateTask}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all shadow-sm shadow-indigo-600/30 hover:shadow-indigo-600/40 cursor-pointer',
            isCollapsed ? 'p-2.5' : 'py-2 px-3'
          )}
          title="Create New Issue"
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && <span>New Issue</span>}
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <p className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
            Menu
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group',
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900',
                  isCollapsed && 'justify-center px-2.5'
                )
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Current User Footnote */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
        <div
          className={cn(
            'flex items-center gap-3 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60',
            isCollapsed && 'justify-center p-1.5'
          )}
        >
          <img
            src={currentMockUser.avatarUrl}
            alt={currentMockUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/40 shrink-0"
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {currentMockUser.name}
              </p>
              <div className="mt-0.5">
                <Badge role={currentMockUser.role} />
              </div>
            </div>
          )}
          {!isCollapsed && (
            <button
              className="text-slate-400 hover:text-rose-400 p-1 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
