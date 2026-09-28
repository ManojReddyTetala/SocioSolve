'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Challenge } from '@/types';
import { 
  Sparkles, 
  Users, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  UserPlus, 
  Check, 
  ShieldCheck 
} from 'lucide-react';

interface CollaborateModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
}

export default function CollaborateModal({ challenge, isOpen, onClose }: CollaborateModalProps) {
  const router = useRouter();
  const { startCollaboration, showToast, organizations, allUsers } = useApp();

  const [selectedUsers, setSelectedUsers] = useState<string[]>([
    'user_sp_1', 
    'user_sp_2'
  ]);

  if (!isOpen) return null;

  const interestedList = challenge.interestedUsers || [
    {
      userId: 'user_sp_1',
      name: 'Dr. Ramesh K. Varma',
      role: 'SOLUTION_PARTNER',
      organizationName: 'ABC Engineering University',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      skills: ['IoT Sensors', 'Soil Analytics'],
      expressedAt: '2 hours ago',
      type: 'RESEARCHER'
    },
    {
      userId: 'user_sp_2',
      name: 'Pooja Hegde',
      role: 'SOLUTION_PARTNER',
      organizationName: 'AgriTech Solutions',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      skills: ['Hardware', 'Solar Integration'],
      expressedAt: '5 hours ago',
      type: 'INDUSTRY'
    },
    {
      userId: 'user_sp_3',
      name: 'Aarav Sharma',
      role: 'SOLUTION_PARTNER',
      organizationName: 'IIT Madras Robotics Club',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      skills: ['Embedded C', 'LoRaWAN'],
      expressedAt: '1 day ago',
      type: 'STUDENT'
    }
  ];

  const recommendedPartners = [
    {
      id: 'org_abc_engg',
      name: 'ABC Engineering University',
      type: 'University Lab',
      why: 'Specialized in IoT sensors and agricultural automation with hardware testbed facilities',
      avatar: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'org_agritech',
      name: 'AgriTech Solutions Pvt Ltd',
      type: 'Industry R&D',
      why: 'Provides solar pump controllers and field-tested LoRa telemetry hardware',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'expert_1',
      name: 'Dr. Meenakshi Sundaram',
      type: 'Domain Specialist',
      why: 'Senior Agronomist specializing in East Godavari delta water management',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80'
    }
  ];

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleStartProject = () => {
    const proj = startCollaboration(challenge.id, selectedUsers);
    showToast({
      type: 'success',
      title: 'Collaboration Started!',
      message: `Project workspace created for "${challenge.title}".`
    });
    onClose();
    router.push(`/workspace/${proj.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-3 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-indigo-100 text-indigo-700">
                <Users className="w-4 h-4" />
              </span>
              <h2 className="font-extrabold text-base text-slate-900">Start Collaboration</h2>
            </div>
            <p className="text-xs text-slate-600 mt-1 line-clamp-1">
              Solving: <strong className="text-slate-900">{challenge.title}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* 1. People Already Interested */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>People already interested ({interestedList.length})</span>
              </span>
              <span className="text-[11px] text-indigo-600 font-semibold">Select team members</span>
            </div>

            <div className="space-y-2">
              {interestedList.map((user) => {
                const isSelected = selectedUsers.includes(user.userId);
                return (
                  <div
                    key={user.userId}
                    onClick={() => toggleUser(user.userId)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-indigo-50/60 border-indigo-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                      />

                      <div className="min-w-0">
                        <div className="font-bold text-xs text-slate-900 truncate">{user.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{user.organizationName}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0 uppercase">
                      {user.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Recommended Collaborators */}
          <div className="space-y-2.5">
            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Recommended partners for this challenge</span>
            </span>

            <div className="space-y-2">
              {recommendedPartners.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                >
                  <img
                    src={rec.avatar}
                    alt={rec.name}
                    className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="font-bold text-xs text-slate-900 truncate">{rec.name}</div>
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {rec.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{rec.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with One Clear CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleStartProject}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
          >
            <span>Start Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
