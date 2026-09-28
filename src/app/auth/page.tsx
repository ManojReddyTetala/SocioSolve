'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { 
  Building2, 
  Sparkles, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { switchRole, currentUser } = useApp();

  const handleSelectRole = (role: UserRole) => {
    switchRole(role);
    if (role === 'CHALLENGE_PROVIDER') {
      router.push('/submit-challenge');
    } else if (role === 'SOLUTION_PARTNER') {
      router.push('/challenges');
    } else if (role === 'EXPERT') {
      router.push('/evaluations/sol_smart_irrigation');
    } else if (role === 'ADMIN') {
      router.push('/admin');
    }
  };

  const roleCards: {
    role: UserRole;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    badgeColor: string;
    examples: string;
  }[] = [
    {
      role: 'CHALLENGE_PROVIDER',
      title: 'Challenge Provider',
      subtitle: 'Grassroots, NGOs & Communities',
      description: '“I represent a community, NGO, government department, or social organization with real unaddressed societal problems.”',
      icon: '🌾',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      examples: 'Farmer Associations, Village Panchayats, Health NGOs, Tribal Welfare Councils'
    },
    {
      role: 'SOLUTION_PARTNER',
      title: 'University / Student / Startup',
      subtitle: 'Research Labs & Innovators',
      description: '“I want to collaborate on societal challenges, build working hardware/software prototypes, and deploy field pilots.”',
      icon: '🏛️',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      examples: 'Engineering Universities, Student Hackathon Teams, DeepTech Startups, Industry R&D'
    },
    {
      role: 'EXPERT',
      title: 'Domain Expert / Evaluator',
      subtitle: 'Scientists & Peer Evaluators',
      description: '“I want to review and evaluate proposed technical solutions against rigorous scientific and feasibility rubrics.”',
      icon: '🔬',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      examples: 'ICAR Scientists, Medical Specialists, Environmental Engineers, Policy Academics'
    },
    {
      role: 'ADMIN',
      title: 'Platform Administrator',
      subtitle: 'Governance & National Monitoring',
      description: '“I oversee challenge verification, moderate submissions, detect duplicate clusters, and track aggregate state metrics.”',
      icon: '🛡️',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      examples: 'Ministry Nodal Officers, State Innovation Councils, Platform Overseers'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
          <Lock className="w-3.5 h-3.5" />
          <span>Role-Based Single Sign-On</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Select Your Platform Role
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          All stakeholders operate within one connected ecosystem with customized toolsets and workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roleCards.map(card => {
          const isSelected = currentUser.role === card.role;

          return (
            <div
              key={card.role}
              onClick={() => handleSelectRole(card.role)}
              className={`p-6 sm:p-7 rounded-3xl border bg-white cursor-pointer transition-all hover:shadow-xl hover:scale-[1.01] flex flex-col justify-between space-y-5 relative group ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    {card.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                    {card.subtitle}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 italic mt-1 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
                  <span className="font-bold text-slate-700">Typical Personas: </span>
                  <span>{card.examples}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 group-hover:underline">
                  Launch {card.title} Experience →
                </span>
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
