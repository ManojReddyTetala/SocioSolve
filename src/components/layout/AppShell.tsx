'use client';

import React from 'react';
import Navbar from './Navbar';
import ToastContainer from '../ui/ToastContainer';
import Link from 'next/link';
import { Sparkles, Shield, Heart } from 'lucide-react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* 1. Global Unified Navbar */}
      <Navbar />

      {/* 2. Main Content Container (Centered, Unified, No Role Sidebars) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* 3. Global Footer */}
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
                A unified digital ecosystem connecting grassroots societal challenges with universities, researchers, startups, and industry to co-create measurable impact.
              </p>
              <div className="text-[11px] text-slate-400 font-medium">
                Built for Smart India Hackathon (SIH26088)
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Platform Navigation</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><Link href="/" className="hover:text-indigo-600 transition-colors">Home Feed</Link></li>
                <li><Link href="/explore" className="hover:text-indigo-600 transition-colors">Explore Challenges & Solvers</Link></li>
                <li><Link href="/network" className="hover:text-indigo-600 transition-colors">Innovation Network</Link></li>
                <li><Link href="/projects" className="hover:text-indigo-600 transition-colors">Active Projects</Link></li>
                <li><Link href="/impact" className="hover:text-indigo-600 transition-colors">Verified Impact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Continuous Lifecycle</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><span className="text-slate-500">1. Post Grassroots Challenge</span></li>
                <li><span className="text-slate-500">2. AI Skill & Resource Extraction</span></li>
                <li><span className="text-slate-500">3. Multi-Institutional Team Formation</span></li>
                <li><span className="text-slate-500">4. Collaborative Workspace & R&D</span></li>
                <li><span className="text-slate-500">5. 7-Factor Rubric Expert Review</span></li>
                <li><span className="text-slate-500">6. Field Pilot & Live Telemetry</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Trust & Governance</h4>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Verified Open Platform</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  All users share the same platform. Permissions allow contextual moderation, expert peer evaluation, and collaboration without separate portals.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 SocioSolve Platform. Open Public Good Prototype for SIH.</p>
            <div className="flex items-center gap-4">
              <span>Community Guidelines</span>
              <span>•</span>
              <span>Privacy</span>
              <span>•</span>
              <span className="font-semibold text-indigo-600">Smart India Hackathon</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Toast notification stack */}
      <ToastContainer />
    </div>
  );
}
