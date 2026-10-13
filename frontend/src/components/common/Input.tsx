import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full bg-slate-900 border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
            leftIcon ? 'pl-9' : '',
            rightIcon ? 'pr-9' : '',
            error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700/80 hover:border-slate-600',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-rose-400 font-medium">{error}</span>}
      {!error && helperText && <span className="text-xs text-slate-500">{helperText}</span>}
    </div>
  );
};
