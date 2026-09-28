'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { Shield, Sparkles, Building2, UserCheck, RefreshCw, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RoleBanner() {
  const router = useRouter();
  const { currentUser, switchRole, resetDemoData, challenges } = useApp();

  const pendingCount = challenges.filter(c => c.status === 'PENDING_VERIFICATION').length;

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string; targetPath: string }[] = [
    {
      role: 'CHALLENGE_PROVIDER',
      label: 'Challenge Provider',
      icon: <Building2 className="w-3.5 h-3.5" />,
      desc: 'Grassroots & NGOs',
      targetPath: '/submit-challenge'
    },
    {
      role: 'SOLUTION_PARTNER',
      label: 'Solution Partner',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      desc: 'Universities & Startups',
      targetPath: '/challenges'
    },
    {
      role: 'EXPERT',
      label: 'Expert / Evaluator',
      icon: <UserCheck className="w-3.5 h-3.5" />,
      desc: 'Domain Scientists',
      targetPath: '/evaluations/sol_smart_irrigation'
    },
    {
      role: 'ADMIN',
      label: 'Platform Admin',
      icon: <Shield className="w-3.5 h-3.5" />,
      desc: 'Governance & Verify',
      targetPath: '/admin'
    }
  ];

  const handleRoleSelect = (role: UserRole, targetPath: string) => {
    switchRole(role);
  };

  return (
    <div className="bg-slate-900 text-slate-200 text-xs px-3 sm:px-6 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5 select-none sticky top-0 z-50 backdrop-blur-md bg-slate-900/95 transition-all">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold text-[11px] border border-indigo-500/30">
          <Layers className="w-3 h-3 text-indigo-400" />
          <span>SIH26088 Prototype</span>
        </span>
        <span className="text-slate-400 hidden lg:inline text-[11px]">Active Persona:</span>
        <span className="font-semibold text-white bg-slate-800/90 px-2.5 py-0.5 rounded-md border border-slate-700/80 text-[11px] flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="truncate">{currentUser.name}</span>
          <span className="text-slate-400 font-normal hidden md:inline">({currentUser.organizationName || currentUser.title})</span>
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-slate-400 text-[11px] font-medium hidden xl:inline">Switch Persona View:</span>
        <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 rounded-lg border border-slate-700/80">
          {roles.map(r => {
            const isActive = currentUser.role === r.role;
            return (
              <button
                key={r.role}
                onClick={() => handleRoleSelect(r.role, r.targetPath)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm font-bold ring-1 ring-indigo-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title={`Switch persona to ${r.label} (${r.desc})`}
              >
                {r.icon}
                <span className="hidden sm:inline">{r.label}</span>
                <span className="sm:hidden">{r.label.split(' ')[0]}</span>
                {r.role === 'ADMIN' && pendingCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center -ml-0.5">
                    {pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={resetDemoData}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
          title="Reset data back to pristine demo state"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}
