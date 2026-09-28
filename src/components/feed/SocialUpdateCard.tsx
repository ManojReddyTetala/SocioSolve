'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ProjectUpdate } from '@/types';
import { 
  Megaphone, 
  Heart, 
  MessageSquare, 
  TrendingUp, 
  FolderGit2, 
  ArrowRight,
  Send,
  Sparkles
} from 'lucide-react';

export default function SocialUpdateCard({ update }: { update: ProjectUpdate }) {
  const { toggleLike, addComment } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(update.id, 'UPDATE', commentText);
    setCommentText('');
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-200 p-5 sm:p-6 space-y-3.5 shadow-sm hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={update.author.avatar}
            alt={update.author.name}
            className="w-10 h-10 rounded-2xl object-cover ring-2 ring-emerald-100"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{update.author.name}</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                📢 Field Milestone
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{update.author.role} • {new Date(update.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="text-[11px] text-slate-500 font-medium">
          Project: <strong className="text-slate-900">{update.projectTitle}</strong>
        </div>

        <h3 className="font-black text-sm sm:text-base text-slate-900 leading-snug">
          {update.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {update.content}
        </p>

        {update.metricsHighlight && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{update.metricsHighlight}</span>
          </div>
        )}
      </div>

      {/* Engagement Actions */}
      <div className="pt-3 border-t border-emerald-100 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleLike(update.id, 'UPDATE')}
            className={`h-10 px-3 rounded-xl font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              update.hasLiked
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-emerald-50/60 hover:bg-emerald-100/60 text-slate-700 border border-emerald-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${update.hasLiked ? 'fill-rose-600 scale-110' : ''} transition-transform`} />
            <span>{update.likesCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="h-10 px-3 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/60 text-slate-700 font-bold border border-emerald-200 flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>{update.comments.length} comments</span>
          </button>
        </div>

        <Link
          href={`/workspace/${update.projectId}`}
          className="h-10 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 active:scale-95 shadow-xs"
        >
          <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>View Workspace →</span>
        </Link>
      </div>

      {/* Collapsible Comments */}
      {showComments && (
        <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs animate-fade-in">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {update.comments.map(c => (
              <div key={c.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{c.authorName} ({c.authorOrg})</span>
                  <span className="text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-slate-700 mt-0.5">{c.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Cheer the team or ask about pilot data..."
              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
