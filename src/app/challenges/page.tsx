'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ChallengeCategory } from '@/types';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

const CATEGORIES: ('All' | ChallengeCategory)[] = [
  'All',
  'Agriculture',
  'Healthcare',
  'Environment',
  'Education',
  'Women & Child Welfare',
  'Public Infrastructure'
];

export default function ChallengesPage() {
  const { challenges, currentUser } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'All' | ChallengeCategory>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChallenges = challenges.filter(c => {
    if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
    if (selectedPriority !== 'All' && c.priority !== selectedPriority) return false;
    if (selectedStatus !== 'All' && c.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchDesc = c.problemStatement.toLowerCase().includes(q);
      const matchLocation = c.location.district.toLowerCase().includes(q) || c.location.state.toLowerCase().includes(q);
      const matchSkill = c.skillsRequired.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchLocation && !matchSkill) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header with Title and Submit CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Discover Challenges</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              {filteredChallenges.length} Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse verified grassroots societal challenges seeking university research & industry solutions.
          </p>
        </div>

        <Link
          href="/submit-challenge"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Submit New Challenge</span>
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by keywords, IoT, ML, Agriculture, East Godavari..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-900"
            />
          </div>

          {/* Priority filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedPriority}
              onChange={e => setSelectedPriority(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 outline-none cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="ACTIVE_COLLABORATION">Active Collaboration</option>
              <option value="PILOT_DEPLOYMENT">Pilot Deployment</option>
              <option value="PENDING_VERIFICATION">Pending Verification</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid */}
      {filteredChallenges.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No challenges matched your filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing some search terms or category selections.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSelectedPriority('All'); setSelectedStatus('All'); }}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(c => {
            const isSmartIrrigation = c.id === 'ch_smart_irrigation';

            return (
              <div
                key={c.id}
                className={`bg-white rounded-2xl border flex flex-col justify-between p-5 transition-all hover:shadow-lg relative group ${
                  isSmartIrrigation ? 'border-indigo-300 ring-2 ring-indigo-500/20 shadow-sm' : 'border-slate-200'
                }`}
              >
                {isSmartIrrigation && (
                  <div className="absolute -top-3 right-3 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold shadow flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span>Primary Demo</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {c.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {c.priority} Priority
                    </span>
                  </div>

                  <Link href={`/challenges/${c.id}`}>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {c.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{c.location.district}, {c.location.state}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {c.problemStatement}
                  </p>

                  {/* Skills tags */}
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Required Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {c.skillsRequired.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {s}
                        </span>
                      ))}
                      {c.skillsRequired.length > 3 && (
                        <span className="text-[10px] text-slate-400 self-center">+{c.skillsRequired.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="font-semibold text-slate-800">{c.peopleAffectedLabel}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="font-medium text-indigo-600">{c.partnerCount}</span>
                      <span>Partners</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/matching/${c.id}`}
                      className="px-2.5 py-2 text-center text-xs font-bold rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Match (AI)</span>
                    </Link>

                    <Link
                      href={`/challenges/${c.id}`}
                      className="px-2.5 py-2 text-center text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
