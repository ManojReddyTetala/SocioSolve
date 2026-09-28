'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import RoleBanner from './RoleBanner';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import DemoJourneyGuide from './DemoJourneyGuide';
import ToastContainer from '../ui/ToastContainer';
import Link from 'next/link';
import { Heart, Sparkles, Shield, ArrowUpRight, Github } from 'lucide-react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Landing page has a special full-width experience, other pages can optionally show sidebar
  const isLandingPage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* 1. Top Quick Role Switcher Banner */}
      <RoleBanner />

      {/* 2. Global Navbar */}
      <Navbar />

      {/* 3. Main Area */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {!isLandingPage && <Sidebar />}

        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* 4. Global Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg text-slate-900">SocioSolve</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                A digital ecosystem connecting societal challenges with universities, researchers, startups, and industry to co-create measurable impact.
              </p>
              <div className="text-[11px] text-slate-400 font-medium">
                Built for Smart India Hackathon (SIH26088)
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Platform Links</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><Link href="/challenges" className="hover:text-indigo-600 transition-colors">Explore Challenges</Link></li>
                <li><Link href="/submit-challenge" className="hover:text-indigo-600 transition-colors">Submit a Challenge</Link></li>
                <li><Link href="/organizations" className="hover:text-indigo-600 transition-colors">Universities & Industry Labs</Link></li>
                <li><Link href="/impact" className="hover:text-indigo-600 transition-colors">Public Impact Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Key Demo Workflows</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><Link href="/challenges/ch_smart_irrigation" className="hover:text-indigo-600 transition-colors">Smart Irrigation Case Study</Link></li>
                <li><Link href="/matching/ch_smart_irrigation" className="hover:text-indigo-600 transition-colors">AI Match Engine (94%)</Link></li>
                <li><Link href="/workspace/proj_smart_irrigation" className="hover:text-indigo-600 transition-colors">Collaboration Workspace</Link></li>
                <li><Link href="/evaluations/sol_smart_irrigation" className="hover:text-indigo-600 transition-colors">Expert Solution Review</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Governance & Trust</h4>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Public Ecosystem</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  All challenge data is subject to verification by accredited administrators and academic peer evaluation.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 SocioSolve Platform. Open Public Good Prototype.</p>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span className="font-semibold text-indigo-600">Smart India Hackathon</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Demo Journey Guide for Judges */}
      <DemoJourneyGuide />

      {/* Floating Toast notification stack */}
      <ToastContainer />
    </div>
  );
}
