import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Lock, Mail } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { mockUsers } from '../mock/data';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('sarah.connor@sprintflow.dev');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 600);
  };

  const handleQuickLogin = (userEmail: string) => {
    setEmail(userEmail);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 400);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10 space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-xl shadow-indigo-600/30 mb-2">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back to SprintFlow</h1>
          <p className="text-xs text-slate-400">Enterprise project and sprint management platform</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                Remember me
              </label>
              <a href="#" className="text-indigo-400 hover:text-indigo-300">
                Forgot password?
              </a>
            </div>

            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Sign In <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          {/* Quick Demo Role Switcher */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                Quick Login As Demo Persona:
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin(mockUsers[0].email)}
                className="px-2 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] text-slate-200 border border-slate-700 transition-colors cursor-pointer text-center"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin(mockUsers[1].email)}
                className="px-2 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] text-slate-200 border border-slate-700 transition-colors cursor-pointer text-center"
              >
                Project Mgr
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin(mockUsers[2].email)}
                className="px-2 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] text-slate-200 border border-slate-700 transition-colors cursor-pointer text-center"
              >
                Developer
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500">
          Protected by enterprise JWT authentication & Spring Security.
        </p>
      </div>
    </div>
  );
};
