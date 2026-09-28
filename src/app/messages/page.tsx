'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Send, 
  Search, 
  Sparkles, 
  FolderGit2, 
  UserCheck, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  ExternalLink,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';

const QUICK_PROMPTS = [
  "Let's schedule a sprint sync for the IoT prototype.",
  "Can you share the soil moisture calibration test logs?",
  "The draft proposal is ready for expert review.",
  "We tested the sensor array in East Godavari today with 18% water savings!"
];

export default function MessagesPage() {
  const { conversations, messages, currentUser, sendDirectMessage } = useApp();
  const [selectedConversationId, setSelectedConversationId] = useState<string>(
    conversations[0]?.id || 'conv_1'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');

  const activeConversation = conversations.find(c => c.id === selectedConversationId) || conversations[0];
  const conversationMessages = messages.filter(m => m.conversationId === selectedConversationId);

  const filteredConversations = conversations.filter(c => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    sendDirectMessage(selectedConversationId, inputText.trim());
    setInputText('');
  };

  const handleQuickPrompt = (prompt: string) => {
    sendDirectMessage(selectedConversationId, prompt);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[calc(100vh-140px)] flex flex-col md:flex-row">
      {/* Left Sidebar: Conversations List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col shrink-0 bg-slate-50/50">
        {/* Search header */}
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-extrabold text-base text-slate-900">Messages & Discussions</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
              {conversations.length} Active
            </span>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 border border-transparent focus:border-indigo-500 focus:bg-white outline-none text-slate-900 transition-all"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredConversations.map(conv => {
            const isSelected = conv.id === selectedConversationId;
            return (
              <button
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={`w-full text-left p-4 transition-all flex items-start gap-3 hover:bg-slate-100/70 ${
                  isSelected ? 'bg-indigo-50/80 border-l-4 border-indigo-600' : ''
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.avatar}
                    alt={conv.title}
                    className="w-11 h-11 rounded-2xl object-cover ring-1 ring-slate-200 shadow-xs"
                  />
                  {conv.type === 'PROJECT' && (
                    <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-0.5 rounded-md shadow-xs">
                      <FolderGit2 className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {conv.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {conv.lastMessageTime}
                    </span>
                  </div>

                  <p className="text-[11px] text-indigo-600 font-medium truncate mt-0.5">
                    {conv.subtitle}
                  </p>

                  <p className="text-xs text-slate-500 truncate mt-1">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Active Chat Room */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Active Conversation Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-3">
              <img
                src={activeConversation.avatar}
                alt={activeConversation.title}
                className="w-10 h-10 rounded-2xl object-cover ring-1 ring-slate-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-sm sm:text-base text-slate-900">
                    {activeConversation.title}
                  </h2>
                  {activeConversation.type === 'PROJECT' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      Project Team Channel
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Direct Chat
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{activeConversation.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeConversation.type === 'PROJECT' && (
                <Link
                  href="/workspace/proj_smart_irrigation"
                  className="px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl border border-indigo-200 transition-all flex items-center gap-1"
                >
                  <span>Project Workspace</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
            {conversationMessages.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-indigo-300" />
                <p>Start the conversation! Say hello or discuss the project milestones.</p>
              </div>
            ) : (
              conversationMessages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isMe && (
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-7 h-7 rounded-xl object-cover ring-1 ring-slate-200 shrink-0 mb-1"
                      />
                    )}

                    <div className={`max-w-md sm:max-w-lg ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                      {!isMe && (
                        <span className="text-[10px] font-semibold text-slate-500 mb-1 pl-1">
                          {msg.senderName}
                        </span>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isMe
                            ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                            : 'bg-white text-slate-900 rounded-bl-xs border border-slate-200/90 shadow-xs'
                        }`}
                      >
                        {msg.text}
                      </div>

                      <div className="flex items-center gap-1 mt-1 px-1">
                        <span className="text-[10px] text-slate-400">{msg.createdAt}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-indigo-400" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-500" /> Quick Reply:
            </span>
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleQuickPrompt(prompt)}
                className="text-[11px] font-medium text-slate-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 px-2.5 py-1 rounded-lg whitespace-nowrap transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message or project note..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none text-slate-900 transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-12 text-slate-400 text-xs">
          Select a conversation from the left to start chatting.
        </div>
      )}
    </div>
  );
}
