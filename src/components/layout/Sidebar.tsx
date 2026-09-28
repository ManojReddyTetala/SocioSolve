'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  LayoutDashboard, 
  Compass, 
  Sparkles, 
  FolderGit2, 
  FileCheck2, 
  BarChart3, 
  Building2, 
  ShieldCheck, 
  PlusCircle, 
  MessageSquare,
  Users,
  Award,
  Layers,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { currentUser, challenges, projects } = useApp();

  const activeProjectsCount = projects.length;
  const pendingReviewCount = challenges.filter(c => c.status === 'PENDING_VERIFICATION').length;

  interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string | number;
  }

  let navItems: NavItem[] = [];

  if (currentUser.role === 'CHALLENGE_PROVIDER') {
    navItems = [
      { label: 'Provider Dashboard', href: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
      { label: '+ Submit Challenge', href: '/submit-challenge', icon: <PlusCircle className="w-4 h-4 text-emerald-500" /> },
      { label: 'My Challenges', href: '/challenges', icon: <Compass className="w-4 h-4" />, badge: challenges.length },
      { label: 'Active Workspaces', href: '/workspace/proj_smart_irrigation', icon: <FolderGit2 className="w-4 h-4" />, badge: activeProjectsCount },
      { label: 'Partner Recommendations', href: '/matching/ch_smart_irrigation', icon: <Sparkles className="w-4 h-4 text-indigo-500" /> },
      { label: 'Impact Tracker', href: '/impact', icon: <BarChart3 className="w-4 h-4" /> },
    ];
  } else if (currentUser.role === 'SOLUTION_PARTNER') {
    navItems = [
      { label: 'Partner Dashboard', href: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
      { label: 'Discover Challenges', href: '/challenges', icon: <Compass className="w-4 h-4" /> },
      { label: 'AI Match Recommendations', href: '/matching/ch_smart_irrigation', icon: <Sparkles className="w-4 h-4 text-indigo-500" />, badge: '94%' },
      { label: 'Collaboration Workspace', href: '/workspace/proj_smart_irrigation', icon: <FolderGit2 className="w-4 h-4" />, badge: activeProjectsCount },
      { label: 'Submit Solution', href: '/solutions/submit/proj_smart_irrigation', icon: <FileCheck2 className="w-4 h-4 text-emerald-500" /> },
      { label: 'Organizations & Labs', href: '/organizations', icon: <Building2 className="w-4 h-4" /> },
      { label: 'Impact Metrics', href: '/impact', icon: <BarChart3 className="w-4 h-4" /> },
    ];
  } else if (currentUser.role === 'EXPERT') {
    navItems = [
      { label: 'Expert Dashboard', href: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
      { label: 'Assigned Reviews', href: '/evaluations/sol_smart_irrigation', icon: <FileCheck2 className="w-4 h-4 text-purple-500" />, badge: 'Action Req' },
      { label: 'Explore Challenges', href: '/challenges', icon: <Compass className="w-4 h-4" /> },
      { label: 'Project Workspaces', href: '/workspace/proj_smart_irrigation', icon: <FolderGit2 className="w-4 h-4" /> },
      { label: 'Impact Verifications', href: '/impact', icon: <BarChart3 className="w-4 h-4" /> },
    ];
  } else if (currentUser.role === 'ADMIN') {
    navItems = [
      { label: 'Admin Command Center', href: '/admin', icon: <ShieldCheck className="w-4 h-4 text-indigo-500" /> },
      { label: 'Challenge Moderation', href: '/admin', icon: <CheckCircle2 className="w-4 h-4 text-amber-500" />, badge: pendingReviewCount },
      { label: 'Explore All Challenges', href: '/challenges', icon: <Compass className="w-4 h-4" /> },
      { label: 'University & Org Directory', href: '/organizations', icon: <Building2 className="w-4 h-4" /> },
      { label: 'Active Projects', href: '/workspace/proj_smart_irrigation', icon: <FolderGit2 className="w-4 h-4" />, badge: activeProjectsCount },
      { label: 'Platform Impact Analytics', href: '/impact', icon: <BarChart3 className="w-4 h-4" /> },
    ];
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shrink-0 min-h-[calc(100vh-6rem)] sticky top-[97px]">
      {/* Role Header Card */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg shrink-0">
            {currentUser.role === 'CHALLENGE_PROVIDER' && '🌾'}
            {currentUser.role === 'SOLUTION_PARTNER' && '🏛️'}
            {currentUser.role === 'EXPERT' && '🔬'}
            {currentUser.role === 'ADMIN' && '🛡️'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-600">
              {currentUser.role.replace('_', ' ')}
            </div>
            <h3 className="font-bold text-xs text-slate-900 truncate">
              {currentUser.organizationName || currentUser.title}
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Verified Active
            </span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Workspace Navigation
        </div>

        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4 px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Demo Quick Links
        </div>

        <Link
          href="/challenges/ch_smart_irrigation"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-indigo-500" />
          <span className="truncate">Smart Irrigation Challenge</span>
        </Link>
        <Link
          href="/matching/ch_smart_irrigation"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span className="truncate">AI Matching System</span>
        </Link>
        <Link
          href="/workspace/proj_smart_irrigation"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
        >
          <FolderGit2 className="w-3.5 h-3.5 text-indigo-500" />
          <span className="truncate">Project Collaboration</span>
        </Link>
        <Link
          href="/evaluations/sol_smart_irrigation"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
        >
          <FileCheck2 className="w-3.5 h-3.5 text-purple-500" />
          <span className="truncate">Expert Review Panel</span>
        </Link>
      </nav>

      {/* Demo helper card at bottom */}
      <div className="p-3 m-3 bg-gradient-to-br from-indigo-50 to-brand-50 rounded-2xl border border-indigo-100 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>SIH Demo Story</span>
        </div>
        <p className="text-[11px] text-indigo-700 leading-relaxed">
          Follow the "Smart Irrigation" lifecycle from Community challenge to 18% water savings!
        </p>
      </div>
    </aside>
  );
}
