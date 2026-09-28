'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Flame, 
  HelpCircle,
  X,
  Play,
  RotateCcw
} from 'lucide-react';

interface JourneyStep {
  id: string;
  number: number;
  label: string;
  role: string;
  path: string;
  matchPatterns: string[];
}

export default function DemoJourneyGuide() {
  const pathname = usePathname();
  const router = useRouter();
  const { challenges, projects, switchRole, resetDemoData } = useApp();
  const [minimized, setMinimized] = useState(false);

  const steps: JourneyStep[] = [
    {
      id: 'submit',
      number: 1,
      label: '1. Submit Challenge',
      role: 'CHALLENGE_PROVIDER',
      path: '/submit-challenge',
      matchPatterns: ['/submit-challenge']
    },
    {
      id: 'verify',
      number: 2,
      label: '2. Admin Verify',
      role: 'ADMIN',
      path: '/admin',
      matchPatterns: ['/admin']
    },
    {
      id: 'match',
      number: 3,
      label: '3. AI Matchmaking',
      role: 'SOLUTION_PARTNER',
      path: '/matching/ch_smart_irrigation',
      matchPatterns: ['/matching']
    },
    {
      id: 'collaborate',
      number: 4,
      label: '4. Workspace',
      role: 'SOLUTION_PARTNER',
      path: '/workspace/proj_smart_irrigation',
      matchPatterns: ['/workspace']
    },
    {
      id: 'solution',
      number: 5,
      label: '5. Submit Solution',
      role: 'SOLUTION_PARTNER',
      path: '/solutions/submit/proj_smart_irrigation',
      matchPatterns: ['/solutions']
    },
    {
      id: 'evaluate',
      number: 6,
      label: '6. Expert Review',
      role: 'EXPERT',
      path: '/evaluations/sol_smart_irrigation',
      matchPatterns: ['/evaluations']
    },
    {
      id: 'impact',
      number: 7,
      label: '7. Impact Telemetry',
      role: 'ALL',
      path: '/impact',
      matchPatterns: ['/impact']
    }
  ];

  // Find active step
  const activeStepIndex = steps.findIndex(s => 
    s.matchPatterns.some(pattern => pathname.startsWith(pattern))
  );

  const currentStep = activeStepIndex !== -1 ? steps[activeStepIndex] : null;
  const nextStep = activeStepIndex !== -1 && activeStepIndex < steps.length - 1 ? steps[activeStepIndex + 1] : null;

  const handleGoToStep = (step: JourneyStep) => {
    if (step.role !== 'ALL') {
      switchRole(step.role as any);
    }
    router.push(step.path);
  };

  if (minimized) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xl border border-slate-700 hover:bg-slate-800 transition-all hover:scale-105"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>SIH Demo Guide</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-600 text-white">
            {activeStepIndex !== -1 ? `Step ${activeStepIndex + 1}/7` : 'Start'}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-xl w-full">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-slate-700/90 animate-fade-in space-y-2.5">
        
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-amber-300" />
              <span>SIH Demo Flow</span>
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">• 1-Click Guided Walkthrough</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMinimized(true)}
              className="text-slate-400 hover:text-white p-1 rounded-md text-xs font-semibold hover:bg-slate-800"
              title="Minimize guide"
            >
              Minimize
            </button>
          </div>
        </div>

        {/* 7-Step Pill Bar */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {steps.map((s, idx) => {
            const isCurrent = idx === activeStepIndex;
            const isPast = activeStepIndex !== -1 && idx < activeStepIndex;

            return (
              <button
                key={s.id}
                onClick={() => handleGoToStep(s)}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all truncate flex flex-col items-center justify-center ${
                  isCurrent
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-sm'
                    : isPast
                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
                title={`Click to jump to Step ${s.number}: ${s.label}`}
              >
                <span>{isPast ? '✓' : `S${s.number}`}</span>
                <span className="hidden sm:inline truncate max-w-full text-[9px] font-medium opacity-80">
                  {s.label.split(' ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Current / Next Action CTA */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <div className="text-slate-300 text-[11px] truncate mr-2">
            {currentStep ? (
              <span>Current: <strong className="text-white">{currentStep.label}</strong></span>
            ) : (
              <span>Explore: <strong className="text-white">Smart Irrigation Lifecycle</strong></span>
            )}
          </div>

          {nextStep ? (
            <button
              onClick={() => handleGoToStep(nextStep)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1 shrink-0 hover:scale-105"
            >
              <span>Next: {nextStep.label.split('.')[1]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => handleGoToStep(steps[0])}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1 shrink-0"
            >
              <span>Restart Flow</span>
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
