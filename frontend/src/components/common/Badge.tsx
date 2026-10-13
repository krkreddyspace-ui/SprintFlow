import React from 'react';
import { cn } from '../../utils/cn';
import type { TaskPriority, TaskStatus, Role } from '../../types';
import { AlertCircle, ArrowUp, ArrowDown, Minus, CheckCircle2, Clock, CircleDot, PlayCircle } from 'lucide-react';

export interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'status' | 'priority' | 'role';
  status?: TaskStatus;
  priority?: TaskPriority;
  role?: Role;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  status,
  priority,
  role,
}) => {
  if (status) {
    const statusConfig: Record<TaskStatus, { label: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
      TODO: {
        label: 'To Do',
        bg: 'bg-slate-800/80',
        text: 'text-slate-300',
        border: 'border-slate-700',
        icon: <CircleDot className="w-3 h-3 text-slate-400" />,
      },
      IN_PROGRESS: {
        label: 'In Progress',
        bg: 'bg-amber-950/40',
        text: 'text-amber-300',
        border: 'border-amber-800/60',
        icon: <PlayCircle className="w-3 h-3 text-amber-400" />,
      },
      IN_REVIEW: {
        label: 'In Review',
        bg: 'bg-sky-950/40',
        text: 'text-sky-300',
        border: 'border-sky-800/60',
        icon: <Clock className="w-3 h-3 text-sky-400" />,
      },
      DONE: {
        label: 'Done',
        bg: 'bg-emerald-950/40',
        text: 'text-emerald-300',
        border: 'border-emerald-800/60',
        icon: <CheckCircle2 className="w-3 h-3 text-emerald-400" />,
      },
    };

    const cfg = statusConfig[status];
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border',
          cfg.bg,
          cfg.text,
          cfg.border,
          className
        )}
      >
        {cfg.icon}
        {children || cfg.label}
      </span>
    );
  }

  if (priority) {
    const priorityConfig: Record<TaskPriority, { label: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
      LOW: {
        label: 'Low',
        bg: 'bg-slate-800/60',
        text: 'text-slate-400',
        border: 'border-slate-700/60',
        icon: <ArrowDown className="w-3 h-3 text-slate-400" />,
      },
      MEDIUM: {
        label: 'Medium',
        bg: 'bg-blue-950/40',
        text: 'text-blue-300',
        border: 'border-blue-800/50',
        icon: <Minus className="w-3 h-3 text-blue-400" />,
      },
      HIGH: {
        label: 'High',
        bg: 'bg-orange-950/40',
        text: 'text-orange-300',
        border: 'border-orange-800/50',
        icon: <ArrowUp className="w-3 h-3 text-orange-400" />,
      },
      CRITICAL: {
        label: 'Critical',
        bg: 'bg-rose-950/50',
        text: 'text-rose-300',
        border: 'border-rose-800/60',
        icon: <AlertCircle className="w-3 h-3 text-rose-400" />,
      },
    };

    const cfg = priorityConfig[priority];
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border',
          cfg.bg,
          cfg.text,
          cfg.border,
          className
        )}
      >
        {cfg.icon}
        {children || cfg.label}
      </span>
    );
  }

  if (role) {
    const roleColors: Record<Role, string> = {
      ADMIN: 'bg-purple-950/40 text-purple-300 border-purple-800/50',
      PROJECT_MANAGER: 'bg-indigo-950/40 text-indigo-300 border-indigo-800/50',
      DEVELOPER: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50',
      VIEWER: 'bg-slate-800/60 text-slate-400 border-slate-700/60',
    };

    return (
      <span
        className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
          roleColors[role],
          className
        )}
      >
        {role.replace('_', ' ')}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700',
        className
      )}
    >
      {children}
    </span>
  );
};
