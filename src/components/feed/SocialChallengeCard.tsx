'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Challenge } from '@/types';
import { 
  Heart, 
  MessageSquare, 
  HandHeart, 
  Bookmark, 
  Share2, 
  Sparkles, 
  MapPin, 
  Users, 
  ArrowRight, 
  FolderGit2, 
  CheckCircle2, 
  Flame, 
  Send,
  UserCheck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Layers
} from 'lucide-react';

import CoCreateModal from '../modals/CoCreateModal';

export default function SocialChallengeCard({ challenge }: { challenge: Challenge }) {
  const router = useRouter();
  const { 
    currentUser, 
    expressInterest, 
    toggleLike, 
    addComment, 
    toggleSaveChallenge, 
    startCollaboration,
    showToast 
  } = useApp();

  const [showComments, setShowComments] = useState(false);
  const [showInterested, setShowInterested] = useState(false);
  const [showCoCreateModal, setShowCoCreateModal] = useState(false);
  const [coCreateTab, setCoCreateTab] = useState<'IDEA' | 'SKILL' | 'SOMEONE' | 'TEAM'>('IDEA');
  const [commentText, setCommentText] = useState('');

  const isSmartIrrigation = challenge.id === 'ch_smart_irrigation';
  const interestedList = challenge.interestedUsers || [];
  const commentsList = challenge.comments || [];
  const ideaNodesList = challenge.ideaNodes || [];
  const skillContribsList = challenge.skillContributions || [];
  const coCreatorsCount = challenge.coCreatorsCount || (interestedList.length + ideaNodesList.length + skillContribsList.length);
  const ideasCount = challenge.ideasCount || ideaNodesList.length || 1;
  const skillsCount = challenge.skillContributorsCount || skillContribsList.length || 2;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(challenge.id, 'CHALLENGE', commentText);
    setCommentText('');
  };

  const openCoCreate = (tab: 'IDEA' | 'SKILL' | 'SOMEONE' | 'TEAM' = 'IDEA') => {
    setCoCreateTab(tab);
    setShowCoCreateModal(true);
  };

  return (
    <div className={`bg-white rounded-3xl border transition-all shadow-sm hover:shadow-md ${
      isSmartIrrigation ? 'border-indigo-300 ring-2 ring-indigo-500/15' : 'border-slate-200/90'
    }`}>
      
      {/* 1. Post Header: Author, Verification, Priority, Time */}
      <div className="p-5 sm:p-6 pb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={`/profile/${challenge.submittedBy.userId}`} className="shrink-0">
            <img
              src={challenge.submittedBy.userAvatar}
              alt={challenge.submittedBy.userName}
              className="w-11 h-11 rounded-2xl object-cover ring-2 ring-slate-100 hover:ring-indigo-300 transition-all"
            />
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link href={`/profile/${challenge.submittedBy.userId}`} className="font-extrabold text-sm text-slate-900 hover:text-indigo-600 transition-colors truncate">
                {challenge.submittedBy.organizationName}
              </Link>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                ✓ Verified Provider
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <span>Submitted by {challenge.submittedBy.userName}</span>
              <span>•</span>
              <span>{new Date(challenge.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
            challenge.priority === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {challenge.priority === 'High' ? '🔴 High Priority' : '🟡 Medium Priority'}
          </span>
        </div>
      </div>

      {/* 2. Challenge Body */}
      <div className="px-5 sm:px-6 space-y-3">
        <Link href={`/challenges/${challenge.id}`} className="block group">
          <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
            {challenge.title}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {challenge.problemStatement}
        </p>

        {/* Tags & Geographic Metadata */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 font-semibold text-slate-700 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{challenge.location.district}, {challenge.location.state}</span>
          </span>

          <span className="px-2.5 py-1 rounded-xl bg-indigo-50 font-bold text-indigo-700 border border-indigo-100 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            <span>{challenge.peopleAffectedLabel}</span>
          </span>

          <span className="px-2.5 py-1 rounded-xl bg-slate-100 font-bold text-slate-700">
            🌾 {challenge.category}
          </span>

          {challenge.activeProjectId && (
            <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Active Pilot Deployment</span>
            </span>
          )}
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1.5 text-xs text-indigo-600 font-semibold">
          {challenge.skillsRequired.slice(0, 4).map((s, idx) => (
            <span key={idx} className="hover:underline cursor-pointer">
              #{s.replace(/\s+/g, '')}
            </span>
          ))}
          {challenge.subcategories?.slice(0, 2).map((sub, idx) => (
            <span key={idx} className="text-slate-500 hover:underline cursor-pointer">
              #{sub.replace(/\s+/g, '')}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Distinct Co-Create Summary Badge */}
      <div className="mx-5 sm:mx-6 my-3 p-2.5 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-purple-50/60 to-emerald-50/60 border border-indigo-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 flex-wrap font-bold text-slate-700">
          <span className="text-indigo-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>✨ {coCreatorsCount} co-creators</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-amber-700">💡 {ideasCount} ideas</span>
          <span className="text-slate-300">•</span>
          <span className="text-blue-700">🛠️ {skillsCount} skill contributors</span>
        </div>

        <button
          onClick={() => openCoCreate('IDEA')}
          className="px-2.5 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[11px] shadow-sm flex items-center gap-1 transition-transform active:scale-95"
        >
          <span>+ Add Idea / Skill</span>
        </button>
      </div>

      {/* 4. Social Metrics Bar (Comments & Interest summary) */}
      <div className="px-5 sm:px-6 pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowComments(!showComments)}
            className="hover:text-indigo-600 transition-colors"
          >
            {commentsList.length} comments
          </button>
          <span>•</span>
          <button
            onClick={() => setShowInterested(!showInterested)}
            className="hover:text-indigo-600 transition-colors font-bold text-slate-700 flex items-center gap-1"
          >
            <span>🤝 {interestedList.length} interested</span>
            {showInterested ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        <div className="text-[11px] text-slate-400 font-medium">
          {challenge.partnerCount} Active Partners
        </div>
      </div>

      {/* 5. Perfectly Balanced Action Bar (Like, Comment, Co-create, Join/Workspace, Save) */}
      <div className="p-3 sm:px-5 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl">
        <div className="grid grid-cols-[1fr_1fr_1.1fr_1.1fr_40px] items-center gap-1.5 sm:gap-2">
          
          {/* 1. Like */}
          <button
            onClick={() => toggleLike(challenge.id, 'CHALLENGE')}
            className={`h-10 px-2 sm:px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
              challenge.hasLiked
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
            title="Like this challenge"
          >
            <Heart className={`w-4 h-4 shrink-0 transition-transform ${challenge.hasLiked ? 'fill-rose-600 scale-110' : ''}`} />
            <span className="truncate">{challenge.likesCount || 0}</span>
          </button>

          {/* 2. Comment */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="h-10 px-2 sm:px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            title="View or add comments"
          >
            <MessageSquare className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="hidden sm:inline truncate">Comment</span>
          </button>

          {/* 3. ✨ Co-create (Signature Action) */}
          <button
            onClick={() => openCoCreate('IDEA')}
            className="h-10 px-2 sm:px-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs shadow-xs shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all active:scale-95 hover:shadow-sm"
            title="Co-create an idea, skill, or partnership"
          >
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
            <span className="truncate">Co-create</span>
          </button>

          {/* 4. 🤝 Join Team / 🚀 Workspace */}
          {challenge.activeProjectId ? (
            <Link
              href={`/workspace/${challenge.activeProjectId}`}
              className="h-10 px-2 sm:px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              title="Enter active collaboration workspace"
            >
              <FolderGit2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">Workspace</span>
            </Link>
          ) : (
            <button
              onClick={() => openCoCreate('TEAM')}
              className="h-10 px-2 sm:px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              title="Join collaborative solver team"
            >
              <Users className="w-4 h-4 text-white shrink-0" />
              <span className="truncate">Join Team</span>
            </button>
          )}

          {/* 5. Save / Bookmark */}
          <button
            onClick={() => toggleSaveChallenge(challenge.id)}
            className={`h-10 w-10 rounded-xl border flex items-center justify-center transition-all shrink-0 active:scale-95 ${
              challenge.isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title="Save challenge to bookmarks"
          >
            <Bookmark className={`w-4 h-4 ${challenge.isSaved ? 'fill-amber-600' : ''}`} />
          </button>

        </div>
      </div>

      {/* 6. Collapsible Interested Users Drawer */}
      {showInterested && (
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 rounded-b-3xl space-y-3 animate-fade-in text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">Interested Solvers & Co-Creators ({interestedList.length})</h4>
              <p className="text-[11px] text-slate-500">Students, researchers, and startups ready to collaborate.</p>
            </div>

            <button
              onClick={() => openCoCreate('TEAM')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-sm flex items-center gap-1 active:scale-95"
            >
              <span>+ Join Co-Creators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {interestedList.length === 0 ? (
            <div className="py-3 text-center text-slate-400 text-xs">
              Be the first to express interest or co-create on this challenge!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {interestedList.map((user, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-900 truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{user.organizationName}</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase shrink-0">
                    {user.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 7. Collapsible Inline Comments Drawer */}
      {showComments && (
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 rounded-b-3xl space-y-3 animate-fade-in text-xs">
          <div className="space-y-2.5 max-h-64 overflow-y-auto">
            {commentsList.length === 0 ? (
              <div className="py-3 text-center text-slate-400 text-xs">No comments yet. Share your thoughts or ideas!</div>
            ) : (
              commentsList.map(c => (
                <div key={c.id} className="p-3 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={c.authorAvatar} alt={c.authorName} className="w-6 h-6 rounded-md object-cover" />
                      <div>
                        <span className="font-bold text-slate-900">{c.authorName}</span>
                        <span className="text-slate-400 text-[10px] ml-1.5">({c.authorOrg})</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-slate-700 font-normal leading-relaxed pl-8">{c.content}</p>
                </div>
              ))
            )}
          </div>

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-1">
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Write a constructive comment or proposed approach..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 outline-none focus:border-indigo-500 shadow-inner"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post</span>
            </button>
          </form>
        </div>
      )}

      {/* 8. Co-Create Modal */}
      <CoCreateModal
        challenge={challenge}
        isOpen={showCoCreateModal}
        initialTab={coCreateTab}
        onClose={() => setShowCoCreateModal(false)}
      />

    </div>
  );
}
