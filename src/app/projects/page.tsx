'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  FolderGit2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Users, 
  ArrowRight, 
  PlusCircle, 
  Calendar, 
  CheckSquare, 
  TrendingUp,
  FileCheck,
  Search,
  ExternalLink
} from 'lucide-react';

type ProjectStatusFilter = 'ALL' | 'PROTOTYPE_DEV' | 'EVALUATION' | 'PILOT_DEPLOYMENT' | 'COMPLETED';

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, currentUser, challenges, openCreateModal } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatusFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => {
    if (selectedStatus !== 'ALL' && p.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.challengeTitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const devCount = projects.filter(p => p.status === 'PROTOTYPE_DEV').length;
  const evalCount = projects.filter(p => p.status === 'EVALUATION').length;
  const pilotCount = projects.filter(p => p.status === 'PILOT_DEPLOYMENT').length;
  const completedCount = projects.filter(p => p.status === 'COMPLETED').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <FolderGit2 className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Collaborative Projects & Workspaces
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Active cross-sector innovation teams developing and piloting solutions for grassroots challenges.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openCreateModal('UPDATE')}
              className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <span>📢 Post Project Update</span>
            </button>
            <Link
              href="/matching/ch_smart_irrigation"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Form New Team</span>
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl text-left">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Prototype Dev</span>
            <div className="text-xl font-black text-slate-900 mt-0.5">{devCount} Active</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl text-left">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Expert Review</span>
            <div className="text-xl font-black text-purple-600 mt-0.5">{evalCount} Under Review</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl text-left">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Pilot Deployment</span>
            <div className="text-xl font-black text-indigo-600 mt-0.5">{pilotCount} Live in Field</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl text-left">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Completed</span>
            <div className="text-xl font-black text-emerald-600 mt-0.5">{completedCount} Solved</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search projects by title, challenge, or technology..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'ALL', label: 'All Projects' },
              { id: 'PROTOTYPE_DEV', label: 'In Development' },
              { id: 'EVALUATION', label: 'Under Review' },
              { id: 'PILOT_DEPLOYMENT', label: 'Pilot Deployment' },
              { id: 'COMPLETED', label: 'Completed' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedStatus(f.id as ProjectStatusFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStatus === f.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-sm font-semibold text-slate-600">No active projects match this filter.</p>
            <button
              onClick={() => { setSelectedStatus('ALL'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-indigo-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProjects.map(proj => {
            const completedTasks = proj.tasks.filter(t => t.status === 'DONE').length;
            const currentMilestone = proj.milestones.find(m => m.status === 'IN_PROGRESS') || proj.milestones[0];

            return (
              <div
                key={proj.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all p-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Meta */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {proj.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {proj.progressPercent}% Progress
                    </span>
                  </div>

                  {/* Title & Challenge */}
                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                      Addressing: <span className="text-slate-700 font-semibold">{proj.challengeTitle}</span>
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 h-full rounded-full transition-all duration-500"
                      style={{ width: `${proj.progressPercent}%` }}
                    />
                  </div>

                  {/* Active Team Members */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Project Solvers & Mentors:</span>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {proj.members.map((member, i) => (
                          <img
                            key={i}
                            src={member.avatar}
                            alt={member.name}
                            title={`${member.name} (${member.role}) - ${member.organization}`}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                        {completedTasks}/{proj.tasks.length} Tasks
                      </span>
                    </div>
                  </div>

                  {/* Next Milestone Card */}
                  {currentMilestone && (
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-bold uppercase tracking-wider">Current Sprint Milestone</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {currentMilestone.targetDate}
                        </span>
                      </div>
                      <p className="font-bold text-slate-800 mt-1">{currentMilestone.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{currentMilestone.description}</p>
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/solutions/submit/${proj.id}`}
                      className="text-xs font-semibold text-slate-600 hover:text-indigo-600 px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 flex items-center gap-1 transition-all"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Submit Solution</span>
                    </Link>
                  </div>

                  <Link
                    href={`/workspace/${proj.id}`}
                    className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Open Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
