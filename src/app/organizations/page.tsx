'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { OrganizationType } from '@/types';
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  Search, 
  Check, 
  ExternalLink, 
  Send,
  Users,
  Award
} from 'lucide-react';

const ORG_TYPES: ('All' | OrganizationType)[] = [
  'All',
  'UNIVERSITY',
  'STARTUP',
  'INDUSTRY',
  'NGO',
  'COMMUNITY'
];

export default function OrganizationsPage() {
  const { organizations, challenges, invitePartner } = useApp();
  const [selectedType, setSelectedType] = useState<'All' | OrganizationType>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrgs = organizations.filter(o => {
    if (selectedType !== 'All' && o.type !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = o.name.toLowerCase().includes(q);
      const matchLoc = o.location.toLowerCase().includes(q);
      const matchSkills = o.skills.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchLoc && !matchSkills) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Innovation Partners & Labs
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              {filteredOrgs.length} Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Directory of accredited universities, research centres, deeptech startups, and industry sponsors ready for societal challenge co-creation.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search universities by skills (e.g. IoT, ML), name, or state..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none text-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {ORG_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOrgs.map(org => {
          const isABC = org.id === 'org_sp_1';

          return (
            <div
              key={org.id}
              className={`bg-white rounded-3xl border p-6 sm:p-7 transition-all hover:shadow-lg flex flex-col justify-between space-y-5 ${
                isABC ? 'border-indigo-300 ring-2 ring-indigo-500/20 shadow-md' : 'border-slate-200'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl shrink-0">
                      {org.logo}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">{org.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                          {org.type}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{org.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    Verified
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {org.description}
                </p>

                {/* Skills */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Areas of Expertise</div>
                  <div className="flex flex-wrap gap-1.5">
                    {org.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available Resources */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Available Infrastructure & Labs</div>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {org.resources.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-slate-500">
                  {org.researchersCount ? (
                    <span><strong>{org.researchersCount}</strong> Researchers • <strong>{org.projectsCompleted}</strong> Projects</span>
                  ) : (
                    <span><strong>{org.projectsCompleted || 4}</strong> Completed Deployments</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/matching/ch_smart_irrigation`}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Invite to Challenge</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
