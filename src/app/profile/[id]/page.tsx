'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  Building2, 
  Sparkles, 
  Award, 
  FolderGit2, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Send, 
  UserPlus, 
  UserCheck, 
  ArrowLeft 
} from 'lucide-react';

export default function UserPublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const { allUsers, connectedUserIds, toggleConnect, createConversation, challenges, projects } = useApp();

  const user = allUsers.find(u => u.id === userId) || allUsers[0];
  const isConnected = connectedUserIds.includes(user.id);

  const handleMessage = () => {
    createConversation(user.id);
    router.push('/messages');
  };

  // Associated challenges or projects
  const userChallenges = challenges.filter(c => c.submittedBy.userId === user.id);
  const userProjects = projects.filter(p => p.members.some(m => m.userId === user.id));

  return (
    <div className="space-y-6 pb-12">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Network</span>
      </button>

      {/* Main Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-36 sm:h-44 bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 relative">
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
            {user.role.replace('_', ' ')}
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white shadow-lg bg-white"
                />
                {user.verificationStatus === 'VERIFIED' && (
                  <span className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">{user.name}</h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">{user.title}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> {user.organizationName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {user.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => toggleConnect(user.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isConnected
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                }`}
              >
                {isConnected ? <UserCheck className="w-4 h-4 text-emerald-600" /> : <UserPlus className="w-4 h-4" />}
                <span>{isConnected ? 'Connected' : 'Connect'}</span>
              </button>

              <button
                onClick={handleMessage}
                className="px-4 py-2.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-bold text-xs rounded-xl transition-all border border-slate-200 flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Message</span>
              </button>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl border-t border-slate-100 pt-4">
              {user.bio}
            </p>
          )}

          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Expertise & Focus Areas
              </span>
              <div className="flex flex-wrap gap-1.5">
                {user.skills.map(s => (
                  <span key={s} className="text-xs font-semibold px-3 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/60">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 text-center">
            <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl">
              <div className="text-xs text-slate-400 font-bold uppercase">Impact Score</div>
              <div className="text-xl font-black text-indigo-600 mt-0.5">{user.impactScore || 88}/100</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl">
              <div className="text-xs text-slate-400 font-bold uppercase">Projects</div>
              <div className="text-xl font-black text-slate-900 mt-0.5">{userProjects.length}</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl">
              <div className="text-xs text-slate-400 font-bold uppercase">Challenges Posted</div>
              <div className="text-xl font-black text-slate-900 mt-0.5">{userChallenges.length}</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl">
              <div className="text-xs text-slate-400 font-bold uppercase">Connections</div>
              <div className="text-xl font-black text-slate-900 mt-0.5">{user.connectionsCount || 34}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contributions Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-base text-slate-900">Active Collaborations & Contributions</h2>
        
        {userProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {userProjects.map(p => (
              <div key={p.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    {p.status.replace('_', ' ')}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">{p.name}</h3>
                  <p className="text-xs text-slate-500">{p.progressPercent}% Completed</p>
                </div>
                <Link
                  href={`/workspace/${p.id}`}
                  className="px-3.5 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl"
                >
                  Workspace →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-4">No public projects currently listed.</p>
        )}
      </div>
    </div>
  );
}
