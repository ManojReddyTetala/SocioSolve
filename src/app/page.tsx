'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Building2, 
  CheckCircle2, 
  Layers, 
  Compass, 
  BarChart3, 
  Flame, 
  ChevronRight,
  FolderGit2,
  FileCheck2,
  Send,
  SlidersHorizontal,
  Check
} from 'lucide-react';

export default function LandingPage() {
  const { challenges, stats, currentUser, switchRole } = useApp();

  const primaryChallenge = challenges.find(c => c.id === 'ch_smart_irrigation') || challenges[0];
  const otherChallenges = challenges.filter(c => c.id !== 'ch_smart_irrigation').slice(0, 3);

  return (
    <div className="space-y-12 py-2">
      {/* 1. Contextual Role Dashboard Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-4 sm:p-5 text-white border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-11 h-11 rounded-xl object-cover ring-2 ring-indigo-500/40"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/20">
                {currentUser.role.replace('_', ' ')}
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Session
              </span>
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">
              Welcome back, {currentUser.name}
            </h2>
            <p className="text-xs text-slate-300 font-normal">
              {currentUser.organizationName || currentUser.title} • {currentUser.location}
            </p>
          </div>
        </div>

        {/* Dynamic Contextual Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {currentUser.role === 'CHALLENGE_PROVIDER' && (
            <>
              <Link
                href="/submit-challenge"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>+ Submit Challenge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/workspace/proj_smart_irrigation"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
              >
                Open Active Project
              </Link>
            </>
          )}

          {currentUser.role === 'SOLUTION_PARTNER' && (
            <>
              <Link
                href="/matching/ch_smart_irrigation"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                <span>View 94% Match</span>
              </Link>
              <Link
                href="/workspace/proj_smart_irrigation"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
              >
                Project Workspace
              </Link>
            </>
          )}

          {currentUser.role === 'EXPERT' && (
            <>
              <Link
                href="/evaluations/sol_smart_irrigation"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Evaluate Smart Irrigation</span>
              </Link>
              <Link
                href="/impact"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
              >
                Impact Telemetry
              </Link>
            </>
          )}

          {currentUser.role === 'ADMIN' && (
            <>
              <Link
                href="/admin"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Governance</span>
              </Link>
              <Link
                href="/challenges"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
              >
                Moderate Challenges
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Smart India Hackathon • SIH26088</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Turn Societal Challenges Into <br className="hidden sm:block" />
            <span className="text-indigo-600">Collaborative Solutions.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            SocioSolve connects grassroots communities with universities, researchers, startups, and industry to co-create, evaluate, and deploy measurable solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/submit-challenge"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Submit a Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/challenges"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Explore Challenges</span>
            </Link>
          </div>

          {/* Core Lifecycle Workflow Diagram */}
          <div className="pt-8">
            <div className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 mb-3">
              One Unified Ecosystem Lifecycle
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-extrabold text-indigo-600 text-xs">1. Problem</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Grassroots Need</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-extrabold text-sky-600 text-xs">2. AI Match</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Uni & Startup 94%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-extrabold text-amber-600 text-xs">3. Collaborate</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Shared Workspace</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-extrabold text-purple-600 text-xs">4. Evaluate</div>
                <div className="text-[11px] text-slate-500 mt-0.5">7-Factor Scientific</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold col-span-2 sm:col-span-1">
                <div className="font-extrabold text-emerald-700 text-xs">5. Impact</div>
                <div className="text-[11px] text-emerald-700 mt-0.5">18% Water Saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Platform Statistics */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Verified Platform Stats</span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">Aggregate Innovation Indicators</h2>
          </div>
          <Link
            href="/impact"
            className="text-xs text-indigo-300 hover:text-white font-semibold flex items-center gap-1 self-start sm:self-center"
          >
            <span>View Full Impact Telemetry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 text-center">
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="text-2xl sm:text-3xl font-black text-white">{stats.totalChallenges.toLocaleString()}</div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Challenges</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="text-2xl sm:text-3xl font-black text-indigo-400">{stats.activeProjects}</div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Active Projects</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="text-2xl sm:text-3xl font-black text-sky-400">{stats.participatingOrgs}</div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Institutions</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{stats.solutionsDeployed}</div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Solutions Deployed</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 col-span-2 sm:col-span-1">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">42,000+</div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">People Benefited</div>
          </div>
        </div>
      </section>

      {/* 4. Primary Demo Showcase Spotlight */}
      <section className="bg-white rounded-3xl border-2 border-indigo-300 p-6 sm:p-8 shadow-md relative space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Primary SIH Demo Case Study</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-100">
              Agriculture / Water Conservation
            </span>
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Status: Pilot Deployment (18% Water Saved)
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {primaryChallenge.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {primaryChallenge.problemStatement}
          </p>
        </div>

        {/* Demo Quick Flow Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">Location</span>
            <div className="font-bold text-slate-800">East Godavari, Andhra Pradesh</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">Target Farmers</span>
            <div className="font-bold text-slate-800">5,000+ Farmers</div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 space-y-1">
            <span className="text-[10px] font-bold uppercase text-indigo-700">Top Match Partner</span>
            <div className="font-bold text-indigo-900">ABC Engineering Uni (94%)</div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-700">Verified Pilot Result</span>
            <div className="font-bold text-emerald-900">18% Water Reduction (₹2.4L)</div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Follow this case study step-by-step through submission, matching, evaluation, and impact.
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/matching/ch_smart_irrigation"
              className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Match (94%)</span>
            </Link>

            <Link
              href="/workspace/proj_smart_irrigation"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Enter Workspace →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Explore More Challenges Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Other Grassroots Challenges</h2>
            <p className="text-xs text-slate-500">Explore multidisciplinary problems across healthcare, waste, and education.</p>
          </div>
          <Link
            href="/challenges"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View all challenges</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {otherChallenges.map(c => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    {c.category}
                  </span>
                  <span className="text-xs text-slate-400">{c.location.district}</span>
                </div>

                <Link href={`/challenges/${c.id}`} className="block group">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {c.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {c.problemStatement}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {c.skillsRequired.slice(0, 3).map((s, idx) => (
                    <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold">{c.peopleAffectedLabel}</span>
                <Link
                  href={`/challenges/${c.id}`}
                  className="font-bold text-indigo-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
