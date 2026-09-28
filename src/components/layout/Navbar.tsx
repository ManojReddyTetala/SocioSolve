'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  Bell, 
  Sparkles, 
  Building2, 
  ExternalLink,
  PlusCircle,
  Menu,
  X,
  Compass,
  FolderGit2,
  BarChart3,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, notifications, markNotificationRead, markAllNotificationsRead, challenges, projects } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredChallenges = searchQuery.trim() 
    ? challenges.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.location.district.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks = [
    { label: 'Explore Challenges', href: '/challenges', icon: <Compass className="w-4 h-4" /> },
    { label: 'AI Matching', href: '/matching/ch_smart_irrigation', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Workspaces', href: '/workspace/proj_smart_irrigation', icon: <FolderGit2 className="w-4 h-4" /> },
    { label: 'Partners & Labs', href: '/organizations', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Impact', href: '/impact', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="bg-white border-b border-slate-200/90 sticky top-[33px] z-30 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-indigo-100" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg tracking-tight text-slate-900">Socio<span className="text-indigo-600">Solve</span></span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">SIH</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">Societal Challenge Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 ml-2 text-xs font-semibold text-slate-600">
              {navLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50 font-bold'
                        : 'hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {currentUser.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    pathname === '/admin'
                      ? 'text-emerald-700 bg-emerald-50 font-bold'
                      : 'text-emerald-600 hover:bg-emerald-50 font-semibold'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Governance</span>
                </Link>
              )}

              {currentUser.role === 'EXPERT' && (
                <Link
                  href="/evaluations/sol_smart_irrigation"
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    pathname.startsWith('/evaluations')
                      ? 'text-purple-700 bg-purple-50 font-bold'
                      : 'text-purple-600 hover:bg-purple-50 font-semibold'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Assigned Review</span>
                </Link>
              )}
            </nav>
          </div>

          {/* Search Trigger */}
          <div className="flex-1 max-w-xs hidden md:block">
            <button
              onClick={() => setShowSearchModal(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all text-left shadow-inner"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search challenges, skills...</span>
              </span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-white rounded border border-slate-200 shadow-sm">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Submit Challenge CTA */}
            <Link
              href="/submit-challenge"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all hover:shadow hover:shadow-indigo-200"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit Challenge</span>
            </Link>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50 animate-fade-in">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xs text-slate-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-100 text-indigo-700 font-bold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Mark read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400">No notifications</div>
                    ) : (
                      notifications.slice(0, 5).map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationRead(notif.id);
                            if (notif.link) {
                              router.push(notif.link);
                              setShowNotifications(false);
                            }
                          }}
                          className={`p-3 hover:bg-slate-50 transition-colors cursor-pointer text-left ${
                            !notif.read ? 'bg-indigo-50/40' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                            {!notif.read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1 shrink-0"></span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Card / Switcher Button */}
            <Link
              href="/auth"
              className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-90 transition-opacity"
              title="Click to change role or view profile"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200"
              />
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[120px]">{currentUser.name}</div>
                <div className="text-[10px] text-indigo-600 font-semibold">{currentUser.role.replace('_', ' ')}</div>
              </div>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-4 border-t border-slate-200 bg-white space-y-1.5 text-xs">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
            {currentUser.role === 'ADMIN' && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 font-bold text-emerald-700 bg-emerald-50 rounded-lg"
              >
                Admin Governance
              </Link>
            )}
            <Link
              href="/submit-challenge"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center px-4 py-2.5 font-bold text-white bg-indigo-600 rounded-xl mt-2"
            >
              + Submit Challenge
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <Search className="w-4 h-4 text-indigo-600" />
              <input
                type="text"
                autoFocus
                placeholder="Search challenges by title, skills (e.g. IoT, ML), state..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-sm outline-none text-slate-900 placeholder:text-slate-400"
              />
              <button
                onClick={() => {
                  setShowSearchModal(false);
                  setSearchQuery('');
                }}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {searchQuery.trim() === '' ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  <Compass className="w-8 h-8 mx-auto mb-2 text-indigo-400/60" />
                  <p className="font-medium">Type keywords like "irrigation", "healthcare", "IoT", "Andhra Pradesh"</p>
                </div>
              ) : filteredChallenges.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs">
                  <p className="font-medium">No matches found for "{searchQuery}"</p>
                </div>
              ) : (
                filteredChallenges.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setShowSearchModal(false);
                      setSearchQuery('');
                      router.push(`/challenges/${c.id}`);
                    }}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">{c.category}</span>
                        <span className="text-xs text-slate-500">{c.location.district}, {c.location.state}</span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 mt-1">{c.title}</h4>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">{c.problemStatement}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-3" />
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between">
              <span>Press ESC to dismiss</span>
              <span className="font-semibold text-indigo-600">Realtime Index</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
