'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  CheckSquare, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Plus, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  FileCheck2, 
  Upload, 
  Download,
  AlertCircle,
  BarChart3,
  Trash2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { 
    projects, 
    addTask, 
    toggleTaskStatus, 
    updateMilestoneStatus, 
    postMessage, 
    currentUser,
    challenges,
    solutions,
    showToast
  } = useApp();

  const project = projects.find(p => p.id === id) || projects[0];
  const challenge = challenges.find(c => c.id === project.challengeId) || challenges[0];
  const existingSolution = solutions.find(s => s.projectId === project.id);

  const [activeTab, setActiveTab] = useState<'tasks' | 'milestones' | 'discussions' | 'documents'>('tasks');
  const [newMessage, setNewMessage] = useState('');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(currentUser.name);
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-10-15');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    postMessage(project.id, newMessage);
    setNewMessage('');
    showToast({
      type: 'info',
      title: 'Message Posted',
      message: `Posted update as ${currentUser.name} (${currentUser.organizationName || currentUser.title})`
    });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(project.id, {
      title: newTaskTitle,
      assignedTo: {
        name: newTaskAssignee,
        organization: currentUser.organizationName || 'Collaborator',
        avatar: currentUser.avatar
      },
      status: 'TODO',
      dueDate: newTaskDueDate,
      priority: newTaskPriority
    });
    setNewTaskTitle('');
    setShowNewTaskModal(false);
  };

  const completedTasks = project.tasks.filter(t => t.status === 'DONE').length;
  const taskProgressPercent = Math.round((completedTasks / Math.max(1, project.tasks.length)) * 100);

  return (
    <div className="space-y-6">
      {/* 1. Project Workspace Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                Co-Creation Workspace
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {project.status.replace('_', ' ')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {project.name}
            </h1>
            <p className="text-xs text-slate-500">
              Linked Challenge: <Link href={`/challenges/${challenge.id}`} className="font-bold text-slate-800 hover:text-indigo-600">{challenge.title}</Link> ({challenge.location.district}, {challenge.location.state})
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/impact"
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-emerald-200"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Impact Dashboard</span>
            </Link>

            <Link
              href={`/solutions/submit/${project.id}`}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <FileCheck2 className="w-4 h-4 text-indigo-200" />
              <span>{existingSolution ? 'View Submitted Solution' : 'Submit Solution Proposal'}</span>
            </Link>

            {existingSolution && (
              <Link
                href={`/evaluations/sol_smart_irrigation`}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>Expert Review</span>
              </Link>
            )}
          </div>
        </div>

        {/* Workspace Team Roster */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
            Multi-Stakeholder Collaboration Team
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.members.map((member, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-slate-900 truncate">{member.name}</h4>
                  <div className="text-[11px] text-indigo-600 font-semibold truncate">{member.role}</div>
                  <div className="text-[10px] text-slate-400 truncate">{member.organization}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Workspace Tabs Navigation */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-4 overflow-x-auto pb-0.5">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'tasks'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Sprint Tasks ({completedTasks}/{project.tasks.length} Done)</span>
        </button>

        <button
          onClick={() => setActiveTab('milestones')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'milestones'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Project Roadmap ({project.milestones.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('discussions')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'discussions'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Live Discussion ({project.discussions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'documents'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Technical Files ({project.documents.length})</span>
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* Tab 1: Tasks */}
      {activeTab === 'tasks' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Sprint Tasks & Action Items</h3>
              <p className="text-[11px] text-slate-500">Click checkboxes to toggle status (Todo $\rightarrow$ In Progress $\rightarrow$ Done)</p>
            </div>
            <button
              onClick={() => setShowNewTaskModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Task</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
            {project.tasks.map(task => {
              const isDone = task.status === 'DONE';
              const isInProgress = task.status === 'IN_PROGRESS';

              return (
                <div
                  key={task.id}
                  className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleTaskStatus(project.id, task.id)}
                      className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : isInProgress
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-600'
                          : 'border-slate-300 hover:border-indigo-500 text-transparent'
                      }`}
                      title="Click to toggle status"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                    </button>

                    <div className="min-w-0">
                      <h4 className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span>Assigned: <strong className="text-slate-700">{task.assignedTo.name}</strong></span>
                        <span>•</span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      task.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {task.priority}
                    </span>

                    <button
                      onClick={() => toggleTaskStatus(project.id, task.id)}
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border transition-all ${
                        isDone
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : isInProgress
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                          : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      {task.status.replace('_', ' ')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Milestones */}
      {activeTab === 'milestones' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Implementation Roadmap & Pilot Milestones</h3>
              <p className="text-xs text-slate-500">Track field installations and verification stages.</p>
            </div>

            <div className="space-y-3.5">
              {project.milestones.map((m, idx) => {
                const isCompleted = m.status === 'COMPLETED';
                const isInProgress = m.status === 'IN_PROGRESS';

                return (
                  <div
                    key={m.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isCompleted
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : isInProgress
                        ? 'bg-indigo-50/40 border-indigo-300 ring-2 ring-indigo-500/10'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                          isCompleted ? 'bg-emerald-600 text-white' : isInProgress ? 'bg-indigo-600 text-white' : 'bg-slate-300 text-slate-700'
                        }`}>
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">{m.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 pl-7">{m.description}</p>
                    </div>

                    <div className="flex items-center gap-3 pl-7 sm:pl-0 shrink-0">
                      <span className="text-[11px] text-slate-500">Target: {m.targetDate}</span>
                      <select
                        value={m.status}
                        onChange={e => updateMilestoneStatus(project.id, m.id, e.target.value as any)}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none cursor-pointer"
                      >
                        <option value="COMPLETED">Completed ✓</option>
                        <option value="IN_PROGRESS">In Progress 🔄</option>
                        <option value="UPCOMING">Upcoming ○</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Discussions */}
      {activeTab === 'discussions' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[520px]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">Project Coordination Chat</h3>
                <p className="text-[11px] text-slate-500">Active persona: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.organizationName || currentUser.title})</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ● Live Channel
              </span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {project.discussions.map(msg => {
                const isMe = msg.senderId === currentUser.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
                  >
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-8 h-8 rounded-xl object-cover shrink-0"
                    />
                    <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                      isMe
                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between gap-2 text-[10px] opacity-80 font-semibold">
                        <span>{msg.senderName} ({msg.senderOrg})</span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="leading-relaxed font-normal">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex gap-2 bg-slate-50/50">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder={`Post update as ${currentUser.name}...`}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 outline-none focus:border-indigo-500 shadow-inner"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 4: Documents */}
      {activeTab === 'documents' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Project Telemetry & Documentation Files</h3>
                <p className="text-xs text-slate-500">Shared schematics, baseline field data, and research reports.</p>
              </div>
              <button
                onClick={() => showToast({ type: 'info', title: 'Upload Simulator', message: 'Document upload logged to project repository.' })}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs hover:bg-indigo-100 flex items-center gap-1.5 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.documents.map(doc => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">{doc.name}</h4>
                      <div className="text-[11px] text-slate-500 mt-0.5">{doc.fileType} • {doc.size}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast({ type: 'success', title: 'File Downloaded', message: `Downloaded ${doc.name}` })}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:text-indigo-600 text-slate-600 shadow-sm transition-colors"
                    title="Download document"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Task */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
            <h3 className="font-extrabold text-base text-slate-900">Create New Project Task</h3>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Calibrate LoRaWAN antenna frequency"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assignee</label>
                <select
                  value={newTaskAssignee}
                  onChange={e => setNewTaskAssignee(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                >
                  {project.members.map((m, idx) => (
                    <option key={idx} value={m.name}>{m.name} ({m.organization})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={e => setNewTaskDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
