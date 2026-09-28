'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FolderGit2, 
  ShieldCheck, 
  AlertCircle, 
  Share2, 
  Send, 
  FileText,
  Clock,
  Layers,
  Flame,
  Check
} from 'lucide-react';

export default function ChallengeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { challenges, organizations, invitePartner, respondToInvite, currentUser, verifyChallenge } = useApp();

  const challenge = challenges.find(c => c.id === id) || challenges[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'ai-insights' | 'partners' | 'workspace'>('overview');

  const timelineSteps = [
    { label: 'Submitted', date: 'Sep 10', status: 'COMPLETED' },
    { label: 'Verified', date: 'Sep 11', status: 'COMPLETED' },
    { label: 'AI Match', date: 'Sep 12', status: 'COMPLETED' },
    { label: 'Collaboration', date: 'Sep 15', status: 'COMPLETED' },
    { label: 'Solution Submission', date: 'Sep 24', status: 'COMPLETED' },
    { label: 'Pilot Deployment', date: 'Sep 27', status: challenge.status === 'PILOT_DEPLOYMENT' ? 'IN_PROGRESS' : 'UPCOMING' },
    { label: 'Impact Verified', date: 'Target Oct', status: 'UPCOMING' }
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-100">
              🌾 {challenge.category}
            </span>
            {challenge.subcategories?.slice(0, 2).map((sub, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs">
                {sub}
              </span>
            ))}
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
              challenge.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {challenge.priority} Priority
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {challenge.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {challenge.title}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Challenge Reference: <span className="font-mono text-slate-700 font-bold">#{challenge.id}</span>
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Location</div>
              <div className="font-bold text-slate-900">{challenge.location.district}, {challenge.location.state}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Users className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">People Affected</div>
              <div className="font-bold text-slate-900">{challenge.peopleAffectedLabel}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Building2 className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Submitted By</div>
              <div className="font-bold text-slate-900">{challenge.submittedBy.organizationName}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Submission Date</div>
              <div className="font-bold text-slate-900">{new Date(challenge.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link
              href={`/matching/${challenge.id}`}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>AI Partner Matching (94% Match)</span>
            </Link>

            {challenge.activeProjectId && (
              <Link
                href={`/workspace/${challenge.activeProjectId}`}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition-all"
              >
                <FolderGit2 className="w-4 h-4 text-emerald-400" />
                <span>Open Collaboration Workspace →</span>
              </Link>
            )}
          </div>

          {currentUser.role === 'ADMIN' && challenge.status === 'PENDING_VERIFICATION' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => verifyChallenge(challenge.id, 'PUBLISHED')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
              >
                Approve & Publish
              </button>
              <button
                onClick={() => verifyChallenge(challenge.id, 'CHANGES_REQUESTED')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-white font-bold text-xs hover:bg-amber-600"
              >
                Request Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Progress Timeline Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">End-to-End Lifecycle Progress</h3>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            {challenge.progressPercent}% Complete
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {timelineSteps.map((step, idx) => {
            const isDone = step.status === 'COMPLETED';
            const isCurrent = step.status === 'IN_PROGRESS';

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                    : isCurrent
                    ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20 text-indigo-900 font-bold'
                    : 'bg-slate-50 border-slate-100 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrent ? (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
                  )}
                </div>
                <div className="text-[11px] font-bold truncate">{step.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{step.date}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Main Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 cols): Details, Problem, Why it Matters, Resources */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Statement Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-extrabold text-base text-slate-900">The Problem</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {challenge.problemStatement}
            </p>
          </div>

          {/* Why It Matters Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-extrabold text-base text-slate-900">Why It Matters</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {challenge.whyItMatters}
            </p>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Target Beneficiaries</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                {challenge.targetDemographic} ({challenge.peopleAffectedLabel}) located across {challenge.location.villageOrCity}.
              </p>
            </div>
          </div>

          {/* Required Skills & Resources Needed */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-2">Required Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {challenge.skillsRequired.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 mb-2">Resources & Field Testing Needed</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {challenge.resourcesRequired.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            {challenge.fundingRequired && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Estimated Seed Pilot Funding</span>
                <span className="font-extrabold text-slate-900">{challenge.fundingRequired}</span>
              </div>
            )}
          </div>

          {/* Duplicate / Similar Challenges Detection Widget */}
          {challenge.aiAnalysis?.similarChallenges && challenge.aiAnalysis.similarChallenges.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Similar Challenges in Other Regions</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  AI Duplicate Prevention
                </span>
              </div>

              <div className="space-y-3">
                {challenge.aiAnalysis.similarChallenges.map((sim, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{sim.title}</span>
                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-[10px]">
                          {sim.similarityScore}% Similar
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5">Location: {sim.location}</div>
                    </div>

                    <Link
                      href="/challenges"
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-indigo-400 font-semibold text-slate-700 text-xs transition-colors shrink-0"
                    >
                      Compare / Merge
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (1 col): AI Analysis Badge + Recommended Partners */}
        <div className="space-y-6">
          {/* AI Intelligence Insights Box */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white p-6 rounded-3xl border border-indigo-950 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">AI Intelligence Report</span>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                {challenge.aiAnalysis?.estimatedImpactScore || 92}/100 Impact
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {challenge.aiAnalysis?.impactSummary || 'High societal significance with strong scalability across regional agro-climatic basins.'}
            </p>

            <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
              <div className="text-[11px] font-bold text-indigo-300 uppercase">Suggested Solution Vectors</div>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {challenge.aiAnalysis?.suggestedProjectTypes?.map((typ, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-400">•</span>
                    <span>{typ}</span>
                  </li>
                )) || <li>IoT telemetry & predictive analytics engine</li>}
              </ul>
            </div>
          </div>

          {/* Recommended Solution Partners Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900">Recommended Partners</h3>
              <Link
                href={`/matching/${challenge.id}`}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-3">
              {/* Partner 1: ABC Engineering University */}
              <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-slate-900">ABC Engineering University</div>
                  <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-extrabold text-[10px]">
                    94% Match
                  </span>
                </div>
                <div className="text-[11px] text-slate-600">
                  ✓ IoT & Edge AI Lab <br />
                  ✓ 42 Research Scholars <br />
                  ✓ Previous rural pilots in AP
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600">Active in Workspace</span>
                  <Link
                    href="/workspace/proj_smart_irrigation"
                    className="px-2.5 py-1 rounded bg-slate-900 text-white font-bold text-[10px] hover:bg-slate-800"
                  >
                    Open Workspace
                  </Link>
                </div>
              </div>

              {/* Partner 2: AgriTech Solutions */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-slate-900">AgriTech Solutions</div>
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-extrabold text-[10px]">
                    89% Match
                  </span>
                </div>
                <div className="text-[11px] text-slate-600">
                  ✓ LoRaWAN Soil Telemetry Hardware <br />
                  ✓ Field installation team in AP
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600">Active in Workspace</span>
                  <Link
                    href="/workspace/proj_smart_irrigation"
                    className="px-2.5 py-1 rounded bg-slate-900 text-white font-bold text-[10px] hover:bg-slate-800"
                  >
                    Open Workspace
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
