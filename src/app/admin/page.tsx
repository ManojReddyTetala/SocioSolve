'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  Building2, 
  Users, 
  FolderGit2, 
  BarChart3, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

export default function AdminPage() {
  const { challenges, verifyChallenge, organizations, stats, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'moderation' | 'duplicates' | 'organizations' | 'analytics'>('moderation');

  const pendingChallenges = challenges.filter(c => c.status === 'PENDING_VERIFICATION');
  const publishedChallenges = challenges.filter(c => c.status !== 'PENDING_VERIFICATION');

  return (
    <div className="space-y-8">
      {/* 1. Admin Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl border border-emerald-200">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  National Governance Portal
                </span>
                <span className="text-[11px] text-slate-400">SIH26088 Platform Administration</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Admin Command Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/impact"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Platform Analytics</span>
            </Link>
          </div>
        </div>

        {/* 4 Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-center">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="text-2xl font-black text-amber-800">{pendingChallenges.length}</div>
            <div className="text-xs font-bold text-slate-600 mt-0.5">Pending Approvals</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200">
            <div className="text-2xl font-black text-indigo-700">{challenges.length}</div>
            <div className="text-xs font-bold text-slate-600 mt-0.5">Total Challenges</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <div className="text-2xl font-black text-emerald-700">{organizations.length}</div>
            <div className="text-xs font-bold text-slate-600 mt-0.5">Verified Institutions</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-2xl font-black text-slate-900">{stats.activeProjects}</div>
            <div className="text-xs font-bold text-slate-600 mt-0.5">Active Projects</div>
          </div>
        </div>
      </div>

      {/* 2. Admin Navigation Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-4">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'moderation'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Challenge Moderation ({pendingChallenges.length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('duplicates')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'duplicates'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Duplicate Detection Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('organizations')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'organizations'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Organization Verification</span>
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* Tab 1: Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Pending Verification Queue</h3>
                <p className="text-xs text-slate-500">Challenges submitted by community associations requiring administrative clearance.</p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {pendingChallenges.length} Actions Required
              </span>
            </div>

            {pendingChallenges.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl text-xs text-slate-500">
                All submitted challenges have been reviewed and published.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingChallenges.map(c => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-xs">
                            {c.category}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            📍 {c.location.district}, {c.location.state}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            c.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {c.priority} Priority
                          </span>
                        </div>

                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                          {c.title}
                        </h4>
                        <div className="text-xs text-slate-600">
                          Submitted by: <strong className="text-slate-800">{c.submittedBy.organizationName}</strong> ({c.submittedBy.userName})
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 self-start sm:self-center">
                        Affects: <strong className="text-slate-900">{c.peopleAffectedLabel}</strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-normal bg-white p-3.5 rounded-xl border border-slate-200">
                      {c.problemStatement}
                    </p>

                    {/* Verification Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <Link
                        href={`/challenges/${c.id}`}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        Inspect Full Submission Dossier →
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => verifyChallenge(c.id, 'REJECTED')}
                          className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => verifyChallenge(c.id, 'CHANGES_REQUESTED')}
                          className="px-3.5 py-2 rounded-xl border border-amber-300 text-amber-800 hover:bg-amber-50 font-bold text-xs transition-colors"
                        >
                          Request Changes
                        </button>
                        <button
                          onClick={() => verifyChallenge(c.id, 'PUBLISHED')}
                          className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all shadow-sm flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Publish</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Duplicate Detection Engine */}
      {activeTab === 'duplicates' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>AI Semantic Cross-State Duplicate Detector</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mt-1">Cross-Regional Similarity Clusters</h3>
              <p className="text-xs text-slate-500">Preventing fragmentation by identifying overlapping problems and proposing consortia.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-slate-900">Cluster 1: Rural Smart Irrigation & Soil Telemetry</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  78% Semantic Match
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-indigo-600">Challenge A (Target)</span>
                  <h4 className="font-bold text-slate-900">Smart Irrigation for Rural Farmers</h4>
                  <p className="text-slate-600 text-[11px]">Location: East Godavari, Andhra Pradesh</p>
                  <p className="text-slate-500 text-[11px] line-clamp-2">Fixed irrigation schedules causing 40% excess groundwater depletion in paddy fields.</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-sky-600">Challenge B (Similar)</span>
                  <h4 className="font-bold text-slate-900">Smart Water Management for Farmers</h4>
                  <p className="text-slate-600 text-[11px]">Location: Krishna Delta, Andhra Pradesh</p>
                  <p className="text-slate-500 text-[11px] line-clamp-2">Canal water overflow and manual sluice monitoring leading to water wastage.</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">Recommendation: Keep separate as regional pilots, share sensor telemetry research.</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => showToast({ type: 'info', title: 'Decision Recorded', message: 'Maintained as separate regional pilots.' })}
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 text-xs hover:bg-slate-50"
                  >
                    Keep Separate
                  </button>
                  <button
                    onClick={() => showToast({ type: 'success', title: 'Consortium Formed', message: 'Linked challenges for joint research.' })}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700"
                  >
                    Form Joint Consortium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Organization Directory Verification */}
      {activeTab === 'organizations' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">Registered Institutional Partners</h3>
            
            <div className="divide-y divide-slate-100">
              {organizations.map(org => (
                <div key={org.id} className="py-4 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{org.logo}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{org.name}</h4>
                      <div className="text-slate-500">{org.type} • {org.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      ✓ Verified Institution
                    </span>
                    <Link
                      href="/organizations"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
