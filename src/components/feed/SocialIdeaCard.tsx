'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { SolutionIdea } from '@/types';
import { 
  Lightbulb, 
  Heart, 
  MessageSquare, 
  Sparkles, 
  Send, 
  ArrowRight,
  Share2
} from 'lucide-react';

export default function SocialIdeaCard({ idea }: { idea: SolutionIdea }) {
  const { currentUser, toggleLike, addComment } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(idea.id, 'IDEA', commentText);
    setCommentText('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 space-y-3.5 shadow-sm hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={idea.author.avatar}
            alt={idea.author.name}
            className="w-10 h-10 rounded-2xl object-cover ring-2 ring-slate-100"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{idea.author.name}</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                💡 Solution Idea
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{idea.author.organization} • {new Date(idea.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {idea.challengeTitle && (
          <div className="text-[11px] text-slate-500 font-medium">
            Proposed for: <strong className="text-slate-800">{idea.challengeTitle}</strong>
          </div>
        )}

        <h3 className="font-black text-sm sm:text-base text-slate-900 leading-snug">
          {idea.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {idea.summary}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {idea.technology.map((tech, idx) => (
            <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Engagement Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleLike(idea.id, 'IDEA')}
            className={`h-10 px-3 rounded-xl font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              idea.hasLiked
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${idea.hasLiked ? 'fill-rose-600 scale-110' : ''} transition-transform`} />
            <span>{idea.likesCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="h-10 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-slate-500" />
            <span>{idea.comments.length} comments</span>
          </button>
        </div>

        <Link
          href={`/matching/ch_smart_irrigation`}
          className="h-10 px-3.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors flex items-center gap-1.5 border border-indigo-200 active:scale-95"
        >
          <span>Connect with Solver</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Collapsible Comments */}
      {showComments && (
        <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs animate-fade-in">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {idea.comments.map(c => (
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
              placeholder="Comment on this solution idea..."
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
