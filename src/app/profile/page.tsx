'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  Building2, 
  Sparkles, 
  Award, 
  FolderGit2, 
  PlusCircle, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Edit3, 
  Flame,
  ArrowRight,
  Send,
  Calendar,
  Layers,
  Heart
} from 'lucide-react';

export default function CurrentUserProfilePage() {
  const { 
    currentUser, 
    challenges, 
    projects, 
    solutionIdeas, 
    projectUpdates,
    openCreateModal 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'CHALLENGES' | 'PROJECTS' | 'IDEAS' | 'UPDATES'>('CHALLENGES');

  // Filter items authored or contributed by currentUser
  const myChallenges = challenges.filter(c => c.submittedBy.userId === currentUser.id);
  const myProjects = projects.filter(p => p.members.some(m => m.userId === currentUser.id) || p.challengeId === 'ch_smart_irrigation');
  const myIdeas = solutionIdeas.filter(i => i.author.userId === currentUser.id);
  const myUpdates = projectUpdates.filter(u => u.author.userId === currentUser.id);

  return (
    <div className="space-y-6 pb-12">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Cover banner */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
            SIH 2024 Verified Member
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white shadow-lg bg-white"
                />
                {currentUser.verificationStatus === 'VERIFIED' && (
                  <span className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </span>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">{currentUser.name}</h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {currentUser.role.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">{currentUser.title}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> {currentUser.organizationName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {currentUser.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => openCreateModal('CHALLENGE')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Create Post</span>
              </button>
            </div>
          </div>

          {/* About / Bio */}
          {currentUser.bio && (
            <div className="border-t border-slate-100 pt-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                About
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                {currentUser.bio}
              </p>
            </div>
          )}

          {/* Skills Badges */}
          {currentUser.skills && currentUser.skills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Expertise & Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.skills.map(s => (
                  <span key={s} className="text-xs font-semibold px-3 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/60">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {currentUser.interests && currentUser.interests.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Collaboration Interests
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.interests.map(interest => (
                  <span key={interest} className="text-xs font-semibold px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 text-center">
            <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl">
              <div className="text-xs text-slate-400 font-bold uppercase">Impact Score</div>
              <div className="text-xl font-black text-indigo-600 mt-0.5">{currentUser.impactScore || 92}/100</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl">
              <div className="text-xs text-slate-400 font-bold uppercase">Challenges Submitted</div>
              <div className="text-xl font-black text-slate-900 mt-0.5">{myChallenges.length}</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl">
              <div className="text-xs text-slate-400 font-bold uppercase">Projects Active</div>
              <div className="text-xl font-black text-emerald-600 mt-0.5">{myProjects.length}</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl">
              <div className="text-xs text-slate-400 font-bold uppercase">Network Connections</div>
              <div className="text-xl font-black text-slate-900 mt-0.5">{currentUser.connectionsCount || 28}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('CHALLENGES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'CHALLENGES'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🌾 Challenges ({myChallenges.length})
          </button>
          <button
            onClick={() => setActiveTab('PROJECTS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'PROJECTS'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🚀 Projects ({myProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('IDEAS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'IDEAS'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            💡 Solution Ideas ({myIdeas.length})
          </button>
          <button
            onClick={() => setActiveTab('UPDATES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'UPDATES'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            📢 Field Updates ({myUpdates.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'CHALLENGES' && (
          <div className="space-y-3">
            {myChallenges.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No challenges posted yet under this profile.
              </div>
            ) : (
              myChallenges.map(c => (
                <div key={c.id} className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 flex items-center justify-between transition-all">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      {c.category}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">{c.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{c.problemStatement}</p>
                  </div>
                  <Link
                    href={`/challenges/${c.id}`}
                    className="px-3.5 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all"
                  >
                    View →
                  </Link>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'PROJECTS' && (
          <div className="space-y-3">
            {myProjects.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No active projects for this profile yet.
              </div>
            ) : (
              myProjects.map(p => (
                <div key={p.id} className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 flex items-center justify-between transition-all">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      {p.status.replace('_', ' ')}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">{p.name}</h3>
                    <p className="text-xs text-slate-500">{p.progressPercent}% Completed</p>
                  </div>
                  <Link
                    href={`/workspace/${p.id}`}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all"
                  >
                    Open Workspace →
                  </Link>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'IDEAS' && (
          <div className="space-y-3">
            {myIdeas.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No solution ideas posted yet.
              </div>
            ) : (
              myIdeas.map(idea => (
                <div key={idea.id} className="p-4 rounded-2xl border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">{idea.title}</h3>
                  <p className="text-xs text-slate-600">{idea.summary}</p>
                  <div className="flex flex-wrap gap-1">
                    {idea.technology.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'UPDATES' && (
          <div className="space-y-3">
            {myUpdates.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No project updates shared yet.
              </div>
            ) : (
              myUpdates.map(up => (
                <div key={up.id} className="p-4 rounded-2xl border border-slate-200 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">{up.title}</h3>
                  <p className="text-xs text-slate-600">{up.content}</p>
                  {up.metricsHighlight && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      {up.metricsHighlight}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
