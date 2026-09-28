'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import SocialChallengeCard from '@/components/feed/SocialChallengeCard';
import SocialIdeaCard from '@/components/feed/SocialIdeaCard';
import SocialUpdateCard from '@/components/feed/SocialUpdateCard';
import { 
  Sparkles, 
  Plus, 
  Globe, 
  Lightbulb, 
  Megaphone, 
  MapPin, 
  Users, 
  Building2, 
  FolderGit2, 
  TrendingUp, 
  Flame, 
  ArrowRight, 
  UserCheck, 
  CheckCircle2, 
  Share2,
  Zap,
  Layers,
  ChevronRight,
  Bookmark,
  Handshake,
  MessageSquare,
  Activity,
  HeartHandshake,
  Check,
  Compass
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { 
    currentUser, 
    challenges, 
    solutionIdeas, 
    projectUpdates, 
    organizations,
    openCreateModal, 
    toggleConnect,
    connectedUserIds,
    allUsers,
    stats,
    showToast 
  } = useApp();

  const [activeFeedTab, setActiveFeedTab] = useState<'ALL' | 'CHALLENGES' | 'IDEAS' | 'UPDATES'>('ALL');
  const [activeContextChallengeId, setActiveContextChallengeId] = useState<string>('ch_smart_irrigation');

  // Filter feed items
  const sortedChallenges = [...challenges].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const sortedIdeas = [...solutionIdeas].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const sortedUpdates = [...projectUpdates].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Active challenge for contextual right sidebar
  const activeChallenge = challenges.find(c => c.id === activeContextChallengeId) || challenges[0];

  // Dynamic Live Activity Items for Left Sidebar
  const liveActivityItems = [
    {
      id: 'act_1',
      icon: '✨',
      text: '3 people are building on your idea',
      target: '/profile',
      time: 'Just now',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    },
    {
      id: 'act_2',
      icon: '💬',
      text: '2 discussions need your response',
      target: '/workspace/proj_smart_irrigation',
      time: '12m ago',
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    },
    {
      id: 'act_3',
      icon: '🛠️',
      text: '1 project needs your sensor skill',
      target: '/challenges/ch_smart_irrigation',
      time: '1h ago',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    }
  ];

  // Live Community Pulse Feed for Right Sidebar
  const communityCoCreatingFeed = [
    {
      id: 'co_1',
      user: 'Ananya Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      action: 'added a co-create idea',
      topic: 'Telugu Voice Gateway',
      time: '2m ago'
    },
    {
      id: 'co_2',
      user: 'Dr. Ramesh K. Varma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      action: 'joined solver team on',
      topic: 'Smart Irrigation',
      time: '8m ago'
    },
    {
      id: 'co_3',
      user: 'Pooja Hegde',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      action: 'shared field telemetry data',
      topic: 'Mandapeta Pilot',
      time: '14m ago'
    },
    {
      id: 'co_4',
      user: 'Suryanarayana Raju',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
      action: 'validated baseline survey with',
      topic: '200 Farmers',
      time: '25m ago'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 py-2">
      
      {/* ========================================================
          LEFT COLUMN: "MY SOCIOSOLVE" PANEL (Sticky, 3 cols)
          ======================================================== */}
      <aside className="lg:col-span-3 hidden md:block">
        <div className="sticky top-20 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto pr-0.5 custom-scrollbar">
          
          {/* Profile Summary Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-sm transition-all">
            <div className="h-14 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 relative">
              <span className="absolute top-2 right-2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs">
                {currentUser.role === 'CHALLENGE_PROVIDER' ? 'Provider' : currentUser.role === 'SOLUTION_PARTNER' ? 'Solver' : currentUser.role}
              </span>
            </div>
            
            <div className="p-4 pt-0 relative space-y-3 text-center">
              <Link href="/profile" className="inline-block -mt-7 relative group">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-md mx-auto group-hover:scale-105 transition-transform"
                />
              </Link>

              <div className="space-y-0.5">
                <Link href="/profile" className="font-black text-sm text-slate-900 hover:text-indigo-600 transition-colors block truncate">
                  {currentUser.name}
                </Link>
                <p className="text-[11px] text-slate-500 line-clamp-1 leading-tight font-normal">
                  {currentUser.title}
                </p>
                <p className="text-[10px] text-indigo-600 font-bold truncate">
                  {currentUser.organizationName || 'SocioSolve Member'}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-1 pt-2.5 border-t border-slate-100 text-center">
                <Link href="/projects" className="p-1 rounded-xl hover:bg-slate-50 transition-colors block">
                  <div className="font-black text-slate-900 text-xs">{currentUser.projectsContributed || 4}</div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold">Projects</div>
                </Link>
                <Link href="/explore" className="p-1 rounded-xl hover:bg-slate-50 transition-colors block">
                  <div className="font-black text-slate-900 text-xs">{currentUser.challengesSubmitted || 2}</div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold">Challenges</div>
                </Link>
                <Link href="/impact" className="p-1 rounded-xl hover:bg-slate-50 transition-colors block">
                  <div className="font-black text-emerald-600 text-xs">{currentUser.impactScore || 94}</div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold">Impact</div>
                </Link>
              </div>
            </div>
          </div>

          {/* MY SOCIOSOLVE Navigation Panel */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-3.5 shadow-xs space-y-1 text-xs font-semibold">
            <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider px-2 py-1 flex items-center justify-between">
              <span>My SocioSolve</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            </div>
            
            <Link
              href="/profile"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>👤</span>
                <span>My Profile</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/explore?filter=saved"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>📌</span>
                <span>Saved Challenges</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                {challenges.filter(c => c.isSaved).length || 1}
              </span>
            </Link>

            <Link
              href="/profile#ideas"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>💡</span>
                <span>My Co-Created Ideas</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                {solutionIdeas.length}
              </span>
            </Link>

            <Link
              href="/network"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>🤝</span>
                <span>My Collaborations</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-sky-100 text-sky-800">
                {connectedUserIds.length}
              </span>
            </Link>

            <Link
              href="/projects"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>🚀</span>
                <span>My Workspaces</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                1 Active
              </span>
            </Link>
          </div>

          {/* DYNAMIC LIVE ACTIVITY / COLLABORATION PULSE */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-3.5 shadow-xs space-y-2 text-xs">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] uppercase font-extrabold text-slate-700 tracking-wider">
                  Live Activity
                </span>
              </div>
              <span className="text-[9px] font-bold text-slate-400">Real-time</span>
            </div>

            <div className="space-y-1.5">
              {liveActivityItems.map(item => (
                <Link
                  key={item.id}
                  href={item.target}
                  className="p-2.5 rounded-2xl bg-slate-50/80 hover:bg-indigo-50/70 border border-slate-100 hover:border-indigo-200 transition-all flex items-start gap-2 block group"
                >
                  <span className="text-sm shrink-0 mt-0.5">{item.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-slate-800 group-hover:text-indigo-900 leading-tight">
                      {item.text}
                    </p>
                    <span className="text-[9px] text-slate-400 mt-0.5 block">{item.time}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* DISCOVER Section */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-3.5 shadow-xs space-y-1 text-xs font-semibold">
            <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider px-2 py-1">
              Discover
            </div>
            
            <Link
              href="/explore"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span>Explore Challenges</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">{challenges.length}</span>
            </Link>

            <Link
              href="/network"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                <span>People & Labs</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">{allUsers.length}</span>
            </Link>

            <Link
              href="/impact"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Platform Impact</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">Verified</span>
            </Link>
          </div>

        </div>
      </aside>

      {/* ========================================================
          CENTER COLUMN: Main Scrolling Feed (6 cols)
          ======================================================== */}
      <main className="lg:col-span-6 space-y-5">
        
        {/* Universal Create Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
            />
            <button
              onClick={() => openCreateModal('CHALLENGE')}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 text-xs font-medium text-left border border-slate-200 transition-all"
            >
              What societal challenge or solution idea are you seeing?
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => openCreateModal('CHALLENGE')}
                className="px-3 py-1.5 rounded-xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-1.5 transition-colors"
              >
                <Globe className="w-4 h-4 text-indigo-600" />
                <span>🌍 Challenge</span>
              </button>

              <button
                onClick={() => openCreateModal('IDEA')}
                className="px-3 py-1.5 rounded-xl text-slate-600 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>💡 Idea</span>
              </button>

              <button
                onClick={() => openCreateModal('UPDATE')}
                className="px-3 py-1.5 rounded-xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1.5 transition-colors"
              >
                <Megaphone className="w-4 h-4 text-emerald-600" />
                <span>📢 Update</span>
              </button>
            </div>

            <button
              onClick={() => openCreateModal('CHALLENGE')}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-sm flex items-center gap-1 transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post</span>
            </button>
          </div>
        </div>

        {/* Feed Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 text-xs font-bold">
          <button
            onClick={() => setActiveFeedTab('ALL')}
            className={`px-3.5 py-1.5 rounded-2xl whitespace-nowrap transition-all ${
              activeFeedTab === 'ALL'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            ✨ For You (All)
          </button>

          <button
            onClick={() => setActiveFeedTab('CHALLENGES')}
            className={`px-3.5 py-1.5 rounded-2xl whitespace-nowrap transition-all ${
              activeFeedTab === 'CHALLENGES'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🌾 Challenges ({challenges.length})
          </button>

          <button
            onClick={() => setActiveFeedTab('IDEAS')}
            className={`px-3.5 py-1.5 rounded-2xl whitespace-nowrap transition-all ${
              activeFeedTab === 'IDEAS'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            💡 Solution Ideas ({solutionIdeas.length})
          </button>

          <button
            onClick={() => setActiveFeedTab('UPDATES')}
            className={`px-3.5 py-1.5 rounded-2xl whitespace-nowrap transition-all ${
              activeFeedTab === 'UPDATES'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            📢 Field Updates ({projectUpdates.length})
          </button>
        </div>

        {/* Social Feed List */}
        <div className="space-y-4">
          {activeFeedTab === 'ALL' && (
            <>
              {/* Challenge 1: Smart Irrigation */}
              <div onMouseEnter={() => setActiveContextChallengeId('ch_smart_irrigation')}>
                <SocialChallengeCard challenge={sortedChallenges[0]} />
              </div>

              {/* Project Update 1 */}
              {sortedUpdates[0] && <SocialUpdateCard update={sortedUpdates[0]} />}

              {/* Solution Idea 1 */}
              {sortedIdeas[0] && <SocialIdeaCard idea={sortedIdeas[0]} />}

              {/* Remaining Challenges with context activation */}
              {sortedChallenges.slice(1).map(c => (
                <div key={c.id} onMouseEnter={() => setActiveContextChallengeId(c.id)}>
                  <SocialChallengeCard challenge={c} />
                </div>
              ))}
            </>
          )}

          {activeFeedTab === 'CHALLENGES' && (
            sortedChallenges.map(c => (
              <div key={c.id} onMouseEnter={() => setActiveContextChallengeId(c.id)}>
                <SocialChallengeCard challenge={c} />
              </div>
            ))
          )}

          {activeFeedTab === 'IDEAS' && (
            sortedIdeas.map(i => (
              <SocialIdeaCard key={i.id} idea={i} />
            ))
          )}

          {activeFeedTab === 'UPDATES' && (
            sortedUpdates.map(u => (
              <SocialUpdateCard key={u.id} update={u} />
            ))
          )}
        </div>

      </main>

      {/* ========================================================
          RIGHT COLUMN: "LIVE SOCIOSOLVE PULSE" (Sticky, 3 cols)
          ======================================================== */}
      <aside className="lg:col-span-3 hidden xl:block">
        <div className="sticky top-20 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto pr-0.5 custom-scrollbar">
          
          {/* 1. DYNAMIC CONTEXTUAL CARD (Responds to feed context) */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white rounded-3xl p-5 border border-slate-800 shadow-md space-y-3.5 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>✨ Project Pulse</span>
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {activeChallenge.activeProjectId ? 'Active Workspace' : 'Seeking Solvers'}
              </span>
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-white leading-snug">
                {activeChallenge.title}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                {activeChallenge.location.district}, {activeChallenge.location.state} • {activeChallenge.peopleAffectedLabel}
              </p>
            </div>

            {/* Metrics breakdown */}
            <div className="grid grid-cols-3 gap-1.5 py-2 px-3 rounded-2xl bg-white/5 border border-white/10 text-center text-xs">
              <div>
                <div className="font-black text-white text-xs">{activeChallenge.coCreatorsCount || 8}</div>
                <div className="text-[9px] text-indigo-300">Co-creators</div>
              </div>
              <div>
                <div className="font-black text-amber-300 text-xs">{activeChallenge.ideasCount || 3}</div>
                <div className="text-[9px] text-slate-300">Ideas</div>
              </div>
              <div>
                <div className="font-black text-emerald-400 text-xs">{activeChallenge.partnerCount || 3}</div>
                <div className="text-[9px] text-slate-300">Partners</div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-300">
                <span>Next: Field Testing</span>
                <span className="text-emerald-400">{activeChallenge.progressPercent || 62}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-1.5 rounded-full"
                  style={{ width: `${activeChallenge.progressPercent || 62}%` }}
                />
              </div>
            </div>

            {activeChallenge.activeProjectId ? (
              <Link
                href={`/workspace/${activeChallenge.activeProjectId}`}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Open Workspace →</span>
              </Link>
            ) : (
              <Link
                href={`/challenges/${activeChallenge.id}`}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Co-create on this Challenge →</span>
              </Link>
            )}
          </div>

          {/* 2. PEOPLE ARE CO-CREATING (Live Community Action Module) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                <h4 className="font-extrabold text-slate-900 text-xs">People Are Co-Creating</h4>
              </div>
              <span className="text-[10px] font-bold text-indigo-600">Live</span>
            </div>

            <div className="space-y-2.5">
              {communityCoCreatingFeed.map(item => (
                <div key={item.id} className="flex items-start gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <img
                    src={item.avatar}
                    alt={item.user}
                    className="w-7 h-7 rounded-xl object-cover shrink-0 mt-0.5"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-slate-700 leading-tight">
                      <strong className="text-slate-900 font-bold">{item.user}</strong> {item.action}{' '}
                      <span className="text-indigo-600 font-semibold">{item.topic}</span>
                    </p>
                    <span className="text-[9px] text-slate-400 mt-0.5 block">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. PEOPLE YOU MAY NEED / RECOMMENDED PARTNERS */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 text-xs">People You May Need</h4>
              <Link href="/network" className="text-[10px] font-bold text-indigo-600 hover:underline">View all</Link>
            </div>

            <div className="space-y-3">
              {allUsers.filter(u => u.id !== currentUser.id).slice(0, 3).map(user => {
                const isConn = connectedUserIds.includes(user.id);

                return (
                  <div key={user.id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{user.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{user.organizationName || user.title}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleConnect(user.id)}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all shrink-0 active:scale-95 ${
                        isConn
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                      }`}
                    >
                      {isConn ? 'Connected ✓' : '+ Connect'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. RECENT IMPACT TEASER */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-xs space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 text-xs">Recent Verified Impact</h4>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">Field Tested</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
              <div className="text-lg font-black text-emerald-800">18% Water Saved</div>
              <p className="text-[11px] text-emerald-950 leading-tight font-medium">
                1,240 farmers in Mandapeta delta achieved ₹2.4L pumping cost reduction.
              </p>
            </div>

            <Link
              href="/impact"
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 block text-center pt-1"
            >
              Explore Platform Impact Telemetry →
            </Link>
          </div>

        </div>
      </aside>

    </div>
  );
}
