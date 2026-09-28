'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AIService } from '@/lib/ai-service';
import { 
  Sparkles, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  FolderGit2, 
  Check, 
  Flame, 
  UserCheck,
  ChevronRight
} from 'lucide-react';

export default function MatchingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { challenges, organizations, invitePartner, respondToInvite, currentUser } = useApp();

  const challenge = challenges.find(c => c.id === id) || challenges[0];
  const recommendedPartners = AIService.recommendPartners(challenge, organizations);

  const handleInstantAccept = (orgId: string) => {
    respondToInvite(challenge.id, orgId, true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Breadcrumb */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
              <Link href="/challenges" className="hover:text-indigo-600">Challenges</Link>
              <span>/</span>
              <Link href={`/challenges/${challenge.id}`} className="hover:text-indigo-600 truncate max-w-[180px]">{challenge.title}</Link>
              <span>/</span>
              <span className="text-indigo-600 font-bold">AI Partner Matching</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              AI Partner Matching Engine
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Matching university labs, researchers, deeptech startups, and industry sponsors to <strong className="text-slate-800">"{challenge.title}"</strong>.
            </p>
          </div>

          <Link
            href={`/challenges/${challenge.id}`}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            ← Back to Challenge
          </Link>
        </div>

        {/* Required Skills tags */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-bold text-slate-500 text-[11px] uppercase mr-1">Required Competencies:</span>
          {challenge.skillsRequired.map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 text-[11px] flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. Direct Workspace Launch Callout (if active) */}
      {challenge.activeProjectId && (
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 p-5 rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md border border-emerald-800 animate-fade-in">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase">
                Active Consortium
              </span>
              <h3 className="font-bold text-sm text-white">Collaboration Workspace is Ready</h3>
            </div>
            <p className="text-xs text-emerald-200">
              ABC Engineering University & AgriTech Solutions are active in the project workspace.
            </p>
          </div>

          <Link
            href={`/workspace/${challenge.activeProjectId}`}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-1.5 shrink-0 hover:scale-105"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Open Collaboration Workspace →</span>
          </Link>
        </div>
      )}

      {/* 3. Recommended Partners List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-base text-slate-900">Recommended Institutions & Labs</h2>
          <span className="text-xs text-slate-500 font-medium">Ranked by capability & infrastructure compatibility</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {recommendedPartners.map((item, idx) => {
            const org = item.organization;
            const existingMatch = challenge.matchedPartners?.find(p => p.organizationId === org.id);
            const isAccepted = existingMatch?.status === 'ACCEPTED';
            const isInvited = existingMatch?.status === 'INVITED';

            return (
              <div
                key={org.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                  item.matchScore >= 90
                    ? 'border-indigo-300 ring-2 ring-indigo-500/20 shadow-indigo-50/50'
                    : 'border-slate-200'
                }`}
              >
                {/* Org details & Match explanation */}
                <div className="space-y-2.5 flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl shrink-0">
                      {org.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{org.name}</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                          {org.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{org.location}</span>
                        {org.researchersCount && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{org.researchersCount} Researchers</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {org.tagline}
                  </p>

                  {/* Why Match Rationale */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-[10px] font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      <span>Why This Partner Matches:</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-700">
                      {item.reasons.map((reason, rIdx) => (
                        <li key={rIdx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Match Score & 1-Click Action Buttons */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <div className="text-2xl sm:text-3xl font-black text-indigo-600">
                      {item.matchScore}%
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      AI Compatibility
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAccepted ? (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Active Partner</span>
                        </span>
                        <Link
                          href={`/workspace/${challenge.activeProjectId || 'proj_smart_irrigation'}`}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center gap-1"
                        >
                          <FolderGit2 className="w-3.5 h-3.5" />
                          <span>Workspace →</span>
                        </Link>
                      </div>
                    ) : isInvited ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleInstantAccept(org.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept & Enter Workspace</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => invitePartner(challenge.id, org.id)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Invite Partner</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
