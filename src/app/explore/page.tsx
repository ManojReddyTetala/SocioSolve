'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ChallengeCategory } from '@/types';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Users, 
  Building2, 
  FolderGit2, 
  TrendingUp, 
  PlusCircle, 
  SlidersHorizontal, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Heart,
  MessageSquare,
  ShieldCheck,
  Send,
  ExternalLink
} from 'lucide-react';

type ExploreTab = 'CHALLENGES' | 'PEOPLE' | 'ORGANIZATIONS' | 'PROJECTS' | 'IMPACT';

const CATEGORIES: ('All' | ChallengeCategory)[] = [
  'All',
  'Agriculture',
  'Healthcare',
  'Environment',
  'Education',
  'Accessibility',
  'Rural Development',
  'Public Infrastructure'
];

export default function ExplorePage() {
  const router = useRouter();
  const { 
    challenges, 
    allUsers, 
    organizations, 
    projects, 
    impacts, 
    currentUser, 
    connectedUserIds, 
    toggleConnect, 
    expressInterest, 
    openCreateModal,
    createConversation 
  } = useApp();

  const [activeTab, setActiveTab] = useState<ExploreTab>('CHALLENGES');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ChallengeCategory>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');

  // Filtered Challenges
  const filteredChallenges = challenges.filter(c => {
    if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
    if (selectedPriority !== 'All' && c.priority !== selectedPriority) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.problemStatement.toLowerCase().includes(q) ||
        c.location.district.toLowerCase().includes(q) ||
        c.location.state.toLowerCase().includes(q) ||
        c.skillsRequired.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Filtered People
  const filteredPeople = allUsers.filter(u => {
    if (u.id === currentUser.id) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.title.toLowerCase().includes(q) ||
        (u.organizationName && u.organizationName.toLowerCase().includes(q)) ||
        (u.skills && u.skills.some(s => s.toLowerCase().includes(q))) ||
        (u.location && u.location.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Filtered Organizations
  const filteredOrgs = organizations.filter(o => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.name.toLowerCase().includes(q) ||
        o.tagline.toLowerCase().includes(q) ||
        o.skills.some(s => s.toLowerCase().includes(q)) ||
        o.resources.some(r => r.toLowerCase().includes(q)) ||
        o.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Projects
  const filteredProjects = projects.filter(p => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.challengeTitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStartChat = (userId: string) => {
    const convId = createConversation(userId);
    router.push('/messages');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero / Discovery Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-indigo-700/50">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Societal Problem Solving Network</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Explore Challenges, Innovators & Solutions
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
            Search across community challenges, university researchers, student solvers, industry partners, and active field pilots.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => openCreateModal('CHALLENGE')}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Challenge</span>
            </button>
            <button
              onClick={() => openCreateModal('IDEA')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl backdrop-blur-sm transition-all border border-white/10"
            >
              💡 Share Solution Idea
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter & Tabs Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search keywords, tech (IoT, AI, Solar), districts (East Godavari), organizations (ABC Engg)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-900 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Explore Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100">
          <button
            onClick={() => setActiveTab('CHALLENGES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'CHALLENGES'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>🌾 Challenges</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'CHALLENGES' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {filteredChallenges.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('PEOPLE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'PEOPLE'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Innovators & Solvers</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'PEOPLE' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {filteredPeople.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ORGANIZATIONS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'ORGANIZATIONS'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Labs & Orgs</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'ORGANIZATIONS' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {filteredOrgs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('PROJECTS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'PROJECTS'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Active Projects</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'PROJECTS' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {filteredProjects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('IMPACT')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'IMPACT'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Verified Impact</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'IMPACT' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {impacts.length}
            </span>
          </button>
        </div>

        {/* Category Pills (for Challenges) */}
        {activeTab === 'CHALLENGES' && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Sector:
            </span>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-300 font-bold shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab Content Display */}

      {/* 1. CHALLENGES TAB */}
      {activeTab === 'CHALLENGES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredChallenges.length === 0 ? (
            <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-slate-200">
              <p className="text-sm font-semibold text-slate-600">No challenges matched your query.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-3 text-xs font-bold text-indigo-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredChallenges.map(c => {
              const isInterested = c.hasExpressedInterest || c.interestedUsers?.some(u => u.userId === currentUser.id);
              return (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Meta bar */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {c.category}
                        </span>
                        {c.priority === 'High' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 flex items-center gap-1 border border-rose-100">
                            <Flame className="w-3 h-3 text-rose-500" /> High Need
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {c.location.district}, {c.location.state}
                      </span>
                    </div>

                    {/* Title & Statement */}
                    <div>
                      <Link href={`/challenges/${c.id}`}>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                          {c.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                        {c.problemStatement}
                      </p>
                    </div>

                    {/* Skills required badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {c.skillsRequired.slice(0, 4).map(skill => (
                        <span key={skill} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {skill}
                        </span>
                      ))}
                      {c.skillsRequired.length > 4 && (
                        <span className="text-[10px] text-slate-400">+{c.skillsRequired.length - 4} more</span>
                      )}
                    </div>

                    {/* People Affected & Submitter */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Users className="w-3.5 h-3.5 text-indigo-500" />
                        {c.peopleAffectedLabel}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        by {c.submittedBy.userName} ({c.submittedBy.organizationName})
                      </span>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => expressInterest(c.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                        isInterested
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isInterested ? 'text-emerald-600' : 'text-indigo-500'}`} />
                      <span>{isInterested ? 'Interested' : "I'm Interested"}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/matching/${c.id}`}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Match</span>
                      </Link>
                      <Link
                        href={`/challenges/${c.id}`}
                        className="text-xs font-bold text-white bg-slate-900 hover:bg-indigo-600 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 2. PEOPLE & SOLVERS TAB */}
      {activeTab === 'PEOPLE' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPeople.map(person => {
            const isConnected = connectedUserIds.includes(person.id);
            return (
              <div
                key={person.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all p-5 flex flex-col justify-between text-center group"
              >
                <div>
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-indigo-300 transition-all shadow-sm"
                    />
                    {person.verificationStatus === 'VERIFIED' && (
                      <span className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      </span>
                    )}
                  </div>

                  <Link href={`/profile/${person.id}`}>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {person.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{person.title}</p>
                  <p className="text-[11px] text-indigo-600 font-medium">{person.organizationName}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> {person.location}
                  </p>

                  {/* Skills */}
                  {person.skills && person.skills.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1 mt-3">
                      {person.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Connect / Message Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-center gap-2">
                  <button
                    onClick={() => toggleConnect(person.id)}
                    className={`flex-1 text-xs font-bold py-1.5 px-3 rounded-xl transition-all ${
                      isConnected
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                    }`}
                  >
                    {isConnected ? '✓ Connected' : '+ Connect'}
                  </button>
                  <button
                    onClick={() => handleStartChat(person.id)}
                    className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-slate-200"
                    title="Send direct message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. ORGANIZATIONS & LABS TAB */}
      {activeTab === 'ORGANIZATIONS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrgs.map(org => (
            <div
              key={org.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-slate-900">{org.name}</h3>
                      {org.verificationStatus === 'VERIFIED' && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{org.tagline}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 mt-1 inline-block">
                      {org.type}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {org.description}
                </p>

                {/* Available testbeds & skills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Testbeds & Resources:</span>
                  <div className="flex flex-wrap gap-1">
                    {org.resources.map(res => (
                      <span key={res} className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {org.location}
                </span>
                <Link
                  href={`/matching/ch_smart_irrigation`}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Explore Matches</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. ACTIVE PROJECTS TAB */}
      {activeTab === 'PROJECTS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {proj.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-bold text-indigo-600">{proj.progressPercent}% Complete</span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900">{proj.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Solving: {proj.challengeTitle}</p>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all"
                    style={{ width: `${proj.progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex -space-x-2">
                    {proj.members.map((m, idx) => (
                      <img
                        key={idx}
                        src={m.avatar}
                        alt={m.name}
                        title={`${m.name} (${m.role})`}
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {proj.tasks.filter(t => t.status === 'DONE').length}/{proj.tasks.length} Tasks Finished
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {proj.milestones.find(m => m.status === 'IN_PROGRESS')?.title || 'Next milestone in progress'}
                </span>
                <Link
                  href={`/workspace/${proj.id}`}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. VERIFIED IMPACT TAB */}
      {activeTab === 'IMPACT' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Citizens Impacted</div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {impacts.reduce((sum, i) => sum + i.farmersOrBeneficiariesReached, 0).toLocaleString()}+
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">Across 18+ rural clusters</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-400 uppercase">Economic Savings</div>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                ₹{(impacts.reduce((sum, i) => sum + i.costSavingsINR, 0) / 100000).toFixed(1)} Lakhs
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Direct farmer & community savings</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-400 uppercase">Active Pilot Deployments</div>
              <div className="text-2xl font-black text-indigo-600 mt-1">
                {impacts.length} Verified
              </div>
              <p className="text-[11px] text-slate-500 mt-1">With live sensor telemetry</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900">Featured Deployment: Smart Irrigation Telemetry</h3>
            {impacts.map(metric => (
              <div key={metric.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">{metric.challengeTitle}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" /> {metric.location}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold text-slate-700">
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                      👨‍🌾 {metric.farmersOrBeneficiariesReached} Farmers
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-emerald-700">
                      💧 {metric.resourceSavingsPercentage}% Water Saved
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-indigo-700">
                      💰 ₹{(metric.costSavingsINR / 1000).toFixed(0)}k Saved
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/impact"
                    className="px-4 py-2 text-xs font-bold text-indigo-600 bg-white hover:bg-indigo-50 rounded-xl border border-indigo-200 transition-all"
                  >
                    View Live Telemetry →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
