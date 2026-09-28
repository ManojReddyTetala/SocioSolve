'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  Building2, 
  UserPlus, 
  UserCheck, 
  Filter, 
  Send,
  Award,
  BookOpen,
  Briefcase
} from 'lucide-react';

type NetworkFilter = 'ALL' | 'RESEARCHERS' | 'STUDENTS' | 'INDUSTRY' | 'EXPERTS' | 'COMMUNITY';

export default function NetworkPage() {
  const router = useRouter();
  const { 
    currentUser, 
    allUsers, 
    connectedUserIds, 
    toggleConnect, 
    createConversation,
    challenges 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<NetworkFilter>('ALL');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');

  const allSkills = Array.from(
    new Set(allUsers.flatMap(u => u.skills || []))
  ).slice(0, 10);

  const filteredUsers = allUsers.filter(u => {
    if (u.id === currentUser.id) return false;

    // Filter by role/type
    if (selectedFilter === 'EXPERTS' && u.role !== 'EXPERT') return false;
    if (selectedFilter === 'RESEARCHERS' && !u.title.toLowerCase().includes('research') && !u.title.toLowerCase().includes('professor') && !u.title.toLowerCase().includes('dr.')) return false;
    if (selectedFilter === 'STUDENTS' && !u.title.toLowerCase().includes('student') && !u.title.toLowerCase().includes('lead')) return false;
    if (selectedFilter === 'INDUSTRY' && u.role !== 'SOLUTION_PARTNER' && !u.organizationName?.toLowerCase().includes('tech') && !u.organizationName?.toLowerCase().includes('solutions')) return false;
    if (selectedFilter === 'COMMUNITY' && u.role !== 'CHALLENGE_PROVIDER') return false;

    // Filter by skill
    if (selectedSkill !== 'All' && (!u.skills || !u.skills.includes(selectedSkill))) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = u.name.toLowerCase().includes(q);
      const matchTitle = u.title.toLowerCase().includes(q);
      const matchOrg = u.organizationName?.toLowerCase().includes(q);
      const matchSkill = u.skills?.some(s => s.toLowerCase().includes(q));
      const matchLocation = u.location?.toLowerCase().includes(q);
      if (!matchName && !matchTitle && !matchOrg && !matchSkill && !matchLocation) return false;
    }

    return true;
  });

  const handleMessage = (userId: string) => {
    createConversation(userId);
    router.push('/messages');
  };

  // Helper to compute simulated AI match score based on current user's profile and skills
  const getAIMatchScore = (user: typeof allUsers[0]) => {
    const userSkills = user.skills || [];
    const mySkills = currentUser.skills || ['IoT Sensors', 'Soil Analytics', 'Solar Energy'];
    const overlap = userSkills.filter(s => mySkills.some(ms => ms.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(ms.toLowerCase())));
    if (overlap.length >= 2) return 96;
    if (overlap.length === 1) return 88;
    return 82;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Users className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Innovation Network
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Connect with university researchers, student solvers, industry specialists, and domain evaluators across India.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase">My Connections</div>
              <div className="text-lg font-black text-indigo-600">{connectedUserIds.length}</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase">Network Size</div>
              <div className="text-lg font-black text-slate-900">{allUsers.length * 14}+</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by name, research area, university, or technology..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-900"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'ALL', label: 'All Innovators' },
                { id: 'RESEARCHERS', label: 'Faculty / Researchers' },
                { id: 'STUDENTS', label: 'Students' },
                { id: 'INDUSTRY', label: 'Industry R&D' },
                { id: 'EXPERTS', label: 'Domain Experts' },
                { id: 'COMMUNITY', label: 'Grassroots NGOs' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id as NetworkFilter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedFilter === f.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400 mr-1">Skills:</span>
            <button
              onClick={() => setSelectedSkill('All')}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium ${
                selectedSkill === 'All' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Skills
            </button>
            {allSkills.map(skill => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                  selectedSkill === skill
                    ? 'bg-indigo-100 text-indigo-700 font-bold'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Innovators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredUsers.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-sm font-semibold text-slate-600">No innovators matched your search.</p>
            <button
              onClick={() => { setSelectedFilter('ALL'); setSelectedSkill('All'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-indigo-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredUsers.map(user => {
            const isConnected = connectedUserIds.includes(user.id);
            const matchScore = getAIMatchScore(user);

            return (
              <div
                key={user.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Why Fit & Verification */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      <span>Fit: {user.skills?.[0] || 'Community Solver'}</span>
                    </span>

                    {user.verificationStatus === 'VERIFIED' ? (
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Community Member</span>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-indigo-200 transition-all shadow-sm"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link href={`/profile/${user.id}`}>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {user.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-600 truncate mt-0.5">{user.title}</p>
                      <p className="text-[11px] font-medium text-indigo-600 truncate">{user.organizationName}</p>
                    </div>
                  </div>

                  {/* Bio snippet */}
                  {user.bio && (
                    <p className="text-xs text-slate-500 line-clamp-2 mt-3 leading-relaxed">
                      {user.bio}
                    </p>
                  )}

                  {/* Skills */}
                  {user.skills && user.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {user.skills.slice(0, 3).map(s => (
                        <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {s}
                        </span>
                      ))}
                      {user.skills.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{user.skills.length - 3}</span>
                      )}
                    </div>
                  )}

                  {/* Location & Impact score */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 truncate max-w-[140px]">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" /> {user.location}
                    </span>
                    <span className="font-semibold text-slate-700">
                      ★ {user.impactScore || 85} Impact
                    </span>
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => toggleConnect(user.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isConnected
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleMessage(user.id)}
                    className="p-2 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-all"
                    title="Send Direct Message"
                  >
                    <Send className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/profile/${user.id}`}
                    className="p-2 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-all text-xs font-semibold"
                    title="View Profile"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
