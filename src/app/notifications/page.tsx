'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Bell, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  FolderGit2, 
  Award, 
  Users, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  CheckCheck
} from 'lucide-react';

type NotifFilter = 'ALL' | 'UNREAD' | 'COLLABORATIONS' | 'EVALUATIONS';

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [filter, setFilter] = useState<NotifFilter>('ALL');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'UNREAD') return !n.read;
    if (filter === 'COLLABORATIONS') return n.type === 'INVITATION_RECEIVED' || n.type === 'INTEREST_EXPRESSED' || n.type === 'CONNECTED';
    if (filter === 'EVALUATIONS') return n.type === 'EVALUATION_COMPLETED' || n.type === 'CHALLENGE_APPROVED';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'INTEREST_EXPRESSED':
      case 'CONNECTED':
        return <Users className="w-4 h-4 text-indigo-600" />;
      case 'INVITATION_RECEIVED':
        return <FolderGit2 className="w-4 h-4 text-emerald-600" />;
      case 'EVALUATION_COMPLETED':
        return <Award className="w-4 h-4 text-purple-600" />;
      case 'CHALLENGE_APPROVED':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Bell className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notification Center</h1>
              {unreadCount > 0 && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Updates on expressed interests, team invites, expert reviews, and field milestones.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="px-4 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl border border-indigo-200 transition-all flex items-center gap-1.5 self-start sm:self-center"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark all as read</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100 overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Updates' },
            { id: 'UNREAD', label: `Unread (${unreadCount})` },
            { id: 'COLLABORATIONS', label: 'Collaborations & Solvers' },
            { id: 'EVALUATIONS', label: 'Evaluations & Approvals' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as NotifFilter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-400/80" />
            <p className="font-semibold text-slate-600">You're all caught up!</p>
            <p className="mt-0.5">No notifications matching this filter.</p>
          </div>
        ) : (
          filteredNotifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationRead(notif.id);
                if (notif.link) router.push(notif.link);
              }}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
                !notif.read
                  ? 'bg-indigo-50/40 border-indigo-200 hover:border-indigo-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-2.5 rounded-2xl bg-white shadow-xs border border-slate-200/80 shrink-0">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span>{notif.title}</span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    )}
                  </h3>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" /> {notif.createdAt}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {notif.message}
                </p>

                {notif.link && (
                  <div className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800">
                    <span>Open details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
