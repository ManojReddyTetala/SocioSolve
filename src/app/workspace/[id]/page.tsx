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
  ChevronRight,
  GitBranch,
  ThumbsUp,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Check,
  Vote,
  Layers,
  ArrowRight,
  Activity,
  HeartHandshake
} from 'lucide-react';
import CoCreateModal from '@/components/modals/CoCreateModal';
import { SolutionCanvasCard, WorkspaceDiscussion, WorkspaceDecision } from '@/types';

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
    showToast,
    voteOpinion,
    addWorkspaceDiscussion,
    turnDiscussionIntoDecision,
    voteDecision,
    finalizeDecision,
    convertDecisionToTask,
    addCanvasCard,
    deleteCanvasCard,
    updateTeamPulse
  } = useApp();

  const project = projects.find(p => p.id === id) || projects[0];
  const challenge = challenges.find(c => c.id === project.challengeId) || challenges[0];
  const existingSolution = solutions.find(s => s.projectId === project.id);

  // Tabs
  const [activeTab, setActiveTab] = useState<'stream' | 'decisions' | 'canvas' | 'tasks' | 'milestones' | 'documents'>('stream');

  // Stream Form State
  const [streamType, setStreamType] = useState<WorkspaceDiscussion['type']>('IDEA');
  const [streamTitle, setStreamTitle] = useState('');
  const [streamContent, setStreamContent] = useState('');
  const [streamFilter, setStreamFilter] = useState<'ALL' | 'IDEA' | 'OPINION' | 'HELP' | 'DECISION'>('ALL');

  // Decision Modal / Inline Form State
  const [showNewDecisionModal, setShowNewDecisionModal] = useState(false);
  const [decisionTitle, setDecisionTitle] = useState('');
  const [decisionOption1, setDecisionOption1] = useState('');
  const [decisionOption2, setDecisionOption2] = useState('');
  const [decisionOption3, setDecisionOption3] = useState('');
  const [activeDiscussionForDecision, setActiveDiscussionForDecision] = useState<WorkspaceDiscussion | null>(null);

  // Finalize Decision Modal State
  const [finalizingDecision, setFinalizingDecision] = useState<WorkspaceDecision | null>(null);
  const [selectedFinalOption, setSelectedFinalOption] = useState('');
  const [finalizeReason, setFinalizeReason] = useState('');

  // Convert to Task State
  const [convertingDecision, setConvertingDecision] = useState<WorkspaceDecision | null>(null);
  const [taskTitleFromDec, setTaskTitleFromDec] = useState('');
  const [taskAssigneeFromDec, setTaskAssigneeFromDec] = useState(currentUser.name);
  const [taskDueDateFromDec, setTaskDueDateFromDec] = useState('2026-10-15');
  const [taskPriorityFromDec, setTaskPriorityFromDec] = useState<'High' | 'Medium' | 'Low'>('High');

  // Canvas State
  const [addingCardSection, setAddingCardSection] = useState<SolutionCanvasCard['section'] | null>(null);
  const [newCardText, setNewCardText] = useState('');

  // Task Form State
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(currentUser.name);
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-10-15');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  // Team Pulse Modal State
  const [showPulseModal, setShowPulseModal] = useState(false);
  const [myPulseStatus, setMyPulseStatus] = useState<'ON_TRACK' | 'NEED_HELP' | 'BLOCKED'>('ON_TRACK');
  const [myPulseNeedText, setMyPulseNeedText] = useState('');

  // Co-Create Modal Trigger
  const [showCoCreateModal, setShowCoCreateModal] = useState(false);
  const [coCreateParentId, setCoCreateParentId] = useState<string | undefined>(undefined);

  // Calculations
  const completedTasks = project.tasks.filter(t => t.status === 'DONE').length;
  const discussionsList = project.workspaceDiscussions || [];
  const decisionsList = project.workspaceDecisions || [];
  const canvasCardsList = project.canvasCards || [];
  const teamPulseList = project.teamPulse || [];

  // Stream Post Handler
  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streamContent.trim()) return;
    addWorkspaceDiscussion(project.id, streamType, streamTitle.trim() || undefined, streamContent.trim());
    setStreamTitle('');
    setStreamContent('');
  };

  // Create Decision Handler
  const handleCreateDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decisionTitle.trim()) return;
    const opts = [decisionOption1, decisionOption2, decisionOption3].filter(o => o.trim().length > 0);
    if (!opts.length) return;

    if (activeDiscussionForDecision) {
      turnDiscussionIntoDecision(project.id, activeDiscussionForDecision.id, decisionTitle, opts);
    } else {
      turnDiscussionIntoDecision(project.id, 'none', decisionTitle, opts);
    }

    setDecisionTitle('');
    setDecisionOption1('');
    setDecisionOption2('');
    setDecisionOption3('');
    setActiveDiscussionForDecision(null);
    setShowNewDecisionModal(false);
  };

  // Finalize Decision Submit
  const handleFinalizeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalizingDecision || !selectedFinalOption) return;
    finalizeDecision(project.id, finalizingDecision.id, selectedFinalOption, finalizeReason || 'Consensus reached during team sprint review.');
    setFinalizingDecision(null);
    setSelectedFinalOption('');
    setFinalizeReason('');
  };

  // Convert Decision to Task Submit
  const handleConvertDecisionToTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertingDecision || !taskTitleFromDec.trim()) return;
    convertDecisionToTask(
      project.id, 
      convertingDecision.id, 
      taskTitleFromDec, 
      taskAssigneeFromDec, 
      taskDueDateFromDec, 
      taskPriorityFromDec
    );
    setConvertingDecision(null);
    setTaskTitleFromDec('');
  };

  // Canvas Add Card Submit
  const handleAddCanvasCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addingCardSection || !newCardText.trim()) return;
    addCanvasCard(project.id, addingCardSection, newCardText);
    setNewCardText('');
    setAddingCardSection(null);
  };

  // Pulse Submit
  const handleUpdatePulseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTeamPulse(project.id, myPulseStatus, myPulseNeedText || undefined);
    setShowPulseModal(false);
  };

  // Create Task Submit
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

  // Filtered Stream
  const filteredDiscussions = discussionsList.filter(d => {
    if (streamFilter === 'ALL') return true;
    if (streamFilter === 'IDEA') return d.type === 'IDEA';
    if (streamFilter === 'OPINION') return d.type === 'OPINION';
    if (streamFilter === 'HELP') return d.type === 'HELP';
    if (streamFilter === 'DECISION') return !!d.decisionId;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. Project Workspace Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Co-create Workspace</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {project.status === 'PROTOTYPE_DEV' ? 'Active Prototype Dev' : project.status.replace('_', ' ')}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {project.name}
            </h1>

            {/* Prominent Solving Challenge connection */}
            <div className="flex items-center gap-2 text-xs pt-1 flex-wrap">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">Solving Challenge:</span>
              <Link 
                href={`/challenges/${challenge.id}`} 
                className="font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-xl transition-colors inline-flex items-center gap-1.5 border border-indigo-200/70"
              >
                <span>🌾 {challenge.title}</span>
                <span className="text-slate-400 font-normal">({challenge.location.district}, {challenge.location.state})</span>
              </Link>
            </div>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('canvas')}
              className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-purple-200"
            >
              <Layers className="w-4 h-4" />
              <span>Solution Canvas ({canvasCardsList.length})</span>
            </button>

            <Link
              href="/impact"
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-emerald-200"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Impact Telemetry</span>
            </Link>

            <Link
              href={`/solutions/submit/${project.id}`}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
            >
              <FileCheck2 className="w-4 h-4 text-indigo-200" />
              <span>{existingSolution ? 'View Solution Proposal' : 'Submit Solution Proposal'}</span>
            </Link>
          </div>
        </div>

        {/* Lifecycle Progress Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Co-Creation Lifecycle Progress</span>
            <span className="text-indigo-600 font-extrabold">{project.progressPercent}% Completed</span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${project.progressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-xs">
            <div className="p-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
              <span className="font-bold text-[11px]">1. Problem Defined</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
              <span className="font-bold text-[11px]">2. Co-Create Ideas</span>
            </div>
            <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-300 text-indigo-900 font-bold flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-bold animate-pulse">●</span>
              <span className="font-bold text-[11px]">3. Prototyping</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[9px] font-bold">○</span>
              <span className="font-bold text-[11px]">4. Field Pilot</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[9px] font-bold">○</span>
              <span className="font-bold text-[11px]">5. Scaled Impact</span>
            </div>
          </div>
        </div>

        {/* Member Avatars and + Invite button */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Team:</span>
            <div className="flex items-center -space-x-2">
              {project.members.map((m, idx) => (
                <img
                  key={idx}
                  src={m.avatar}
                  alt={m.name}
                  title={`${m.name} (${m.role})`}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700 ml-1">{project.members.length} Active Co-Creators</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCoCreateParentId(undefined);
                setShowCoCreateModal(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 border border-indigo-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Invite / Add Co-Creator</span>
            </button>

            <button
              onClick={() => setShowPulseModal(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 border border-emerald-200 transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Update My Pulse</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-3 overflow-x-auto pb-0.5">
        <button
          onClick={() => setActiveTab('stream')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'stream'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>💬 Ideas & Stream ({discussionsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('decisions')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'decisions'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Vote className="w-4 h-4" />
          <span>🧠 Decisions ({decisionsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('canvas')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'canvas'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>🧩 Solution Canvas ({canvasCardsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'tasks'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>✅ Sprint Tasks ({completedTasks}/{project.tasks.length})</span>
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
          <span>📍 Roadmap ({project.milestones.length})</span>
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
          <span>📁 Files ({project.documents.length})</span>
        </button>
      </div>

      {/* 3. Three-Pane Body Grid (Left/Center content + Right Pulse sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left / Center Main Content (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TAB: IDEAS & COLLABORATION STREAM */}
          {activeTab === 'stream' && (
            <div className="space-y-4 animate-fade-in text-xs">
              
              {/* Post Input Box */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-slate-900">Post Contribution to Stream:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(['IDEA', 'OPINION', 'HELP', 'QUESTION', 'UPDATE', 'RESOURCE'] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setStreamType(type)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                          streamType === type
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {type === 'IDEA' && '💡 Idea'}
                        {type === 'OPINION' && '💬 Opinion'}
                        {type === 'HELP' && '🆘 Ask for Help'}
                        {type === 'QUESTION' && '❓ Question'}
                        {type === 'UPDATE' && '📢 Update'}
                        {type === 'RESOURCE' && '📦 Resource'}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handlePostDiscussion} className="space-y-2.5">
                  <input
                    type="text"
                    value={streamTitle}
                    onChange={e => setStreamTitle(e.target.value)}
                    placeholder="Short summary title (optional)..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 outline-none focus:border-indigo-500 text-xs font-semibold"
                  />
                  <textarea
                    required
                    rows={3}
                    value={streamContent}
                    onChange={e => setStreamContent(e.target.value)}
                    placeholder={`Share an ${streamType.toLowerCase()}, propose technical approaches, or raise considerations...`}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 text-xs leading-relaxed"
                  />
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[11px] text-slate-400 font-medium">
                      Posting as <strong className="text-slate-700">{currentUser.name}</strong>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post to Stream</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Stream Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {(['ALL', 'IDEA', 'OPINION', 'HELP', 'DECISION'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setStreamFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                      streamFilter === filter
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {filter === 'ALL' && `All (${discussionsList.length})`}
                    {filter === 'IDEA' && '💡 Ideas'}
                    {filter === 'OPINION' && '💬 Opinions'}
                    {filter === 'HELP' && '🆘 Help Needed'}
                    {filter === 'DECISION' && '🧠 Decisions'}
                  </button>
                ))}
              </div>

              {/* Discussions Stream */}
              <div className="space-y-4">
                {filteredDiscussions.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 space-y-2">
                    <p>No contributions in this filter yet.</p>
                    <p className="text-[11px]">Be the first to post an idea, ask for help, or share a recommendation above!</p>
                  </div>
                ) : (
                  filteredDiscussions.map(disc => {
                    const opinions = disc.opinions || { support: 0, needDiscussion: 0, concern: 0 };
                    const userVote = opinions.userVote;
                    const linkedDecision = decisionsList.find(d => d.id === disc.decisionId);

                    return (
                      <div 
                        key={disc.id}
                        className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-sm transition-all space-y-3.5"
                      >
                        {/* Post Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={disc.author.avatar}
                              alt={disc.author.name}
                              className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-extrabold text-xs text-slate-900 truncate">{disc.author.name}</span>
                                <span className="text-[10px] text-slate-400 truncate">({disc.author.org})</span>
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {new Date(disc.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              disc.type === 'IDEA' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                              disc.type === 'HELP' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                              disc.type === 'OPINION' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {disc.type === 'IDEA' && '💡 Idea'}
                              {disc.type === 'HELP' && '🆘 Help'}
                              {disc.type === 'OPINION' && '💬 Opinion'}
                              {disc.type === 'QUESTION' && '❓ Question'}
                              {disc.type === 'UPDATE' && '📢 Update'}
                              {disc.type === 'RESOURCE' && '📦 Resource'}
                            </span>
                          </div>
                        </div>

                        {/* Title & Content */}
                        <div className="space-y-1 pl-1">
                          {disc.title && (
                            <h4 className="font-black text-sm text-slate-900 leading-snug">
                              {disc.title}
                            </h4>
                          )}
                          <p className="text-xs text-slate-700 leading-relaxed font-normal">
                            {disc.content}
                          </p>
                        </div>

                        {/* Linked Decision Badge if exists */}
                        {linkedDecision && (
                          <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-black text-indigo-900 flex items-center gap-1">
                                <Vote className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Poll Decision: {linkedDecision.title}</span>
                              </span>
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                linkedDecision.status === 'DECIDED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {linkedDecision.status === 'DECIDED' ? 'Decided ✓' : 'Voting Open'}
                              </span>
                            </div>

                            {linkedDecision.status === 'DECIDED' ? (
                              <div className="text-[11px] text-emerald-800 font-semibold">
                                ✓ Resolved: <strong>{linkedDecision.selectedOptionText}</strong>
                              </div>
                            ) : (
                              <div className="space-y-1.5 pt-1">
                                {linkedDecision.options.map(opt => (
                                  <button
                                    key={opt.id}
                                    onClick={() => voteDecision(project.id, linkedDecision.id, opt.id)}
                                    className={`w-full p-2 rounded-xl text-left font-semibold text-xs flex items-center justify-between border transition-all ${
                                      linkedDecision.userVotedOptionId === opt.id
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span>{opt.text}</span>
                                    <span className="text-[10px] font-bold opacity-80">{opt.votesCount} votes</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Structured Opinions Action Bar */}
                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between gap-2">
                          
                          {/* Structured 3-way Opinions */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                              onClick={() => voteOpinion(project.id, disc.id, 'support')}
                              className={`px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 transition-all ${
                                userVote === 'support'
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>👍 Support ({opinions.support})</span>
                            </button>

                            <button
                              onClick={() => voteOpinion(project.id, disc.id, 'needDiscussion')}
                              className={`px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 transition-all ${
                                userVote === 'needDiscussion'
                                  ? 'bg-amber-500 text-white shadow-xs'
                                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                              }`}
                            >
                              <HelpCircle className="w-3 h-3" />
                              <span>🤔 Discuss ({opinions.needDiscussion})</span>
                            </button>

                            <button
                              onClick={() => voteOpinion(project.id, disc.id, 'concern')}
                              className={`px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 transition-all ${
                                userVote === 'concern'
                                  ? 'bg-rose-600 text-white shadow-xs'
                                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                              }`}
                            >
                              <AlertTriangle className="w-3 h-3" />
                              <span>⚠️ Concern ({opinions.concern})</span>
                            </button>
                          </div>

                          {/* Action triggers: Turn into Decision / Build upon / Convert to Task */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {!disc.decisionId && (
                              <button
                                onClick={() => {
                                  setActiveDiscussionForDecision(disc);
                                  setDecisionTitle(`Decision on: ${disc.title || disc.content.slice(0, 40)}`);
                                  setShowNewDecisionModal(true);
                                }}
                                className="px-2.5 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] border border-indigo-200 flex items-center gap-1"
                              >
                                <Vote className="w-3 h-3" />
                                <span>Turn into Decision</span>
                              </button>
                            )}

                            {disc.type === 'IDEA' && (
                              <button
                                onClick={() => {
                                  setCoCreateParentId(disc.id);
                                  setShowCoCreateModal(true);
                                }}
                                className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[11px] border border-amber-200 flex items-center gap-1"
                              >
                                <Lightbulb className="w-3 h-3 text-amber-600" />
                                <span>Build on this</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Inline Replies if any */}
                        {disc.replies && disc.replies.length > 0 && (
                          <div className="pl-4 border-l-2 border-slate-100 space-y-2 pt-1">
                            {disc.replies.map(r => (
                              <div key={r.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                                <div className="flex items-center justify-between text-[10px]">
                                  <span className="font-bold text-slate-800">{r.authorName} ({r.authorOrg})</span>
                                  <span className="text-slate-400">{new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p className="text-slate-700">{r.content}</p>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB: DECISIONS ENGINE */}
          {activeTab === 'decisions' && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 flex items-center justify-between gap-3 shadow-sm">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Collaborative Decision Engine</h3>
                  <p className="text-[11px] text-slate-500">Transform contentious debates into structured team voting & trackable task actions.</p>
                </div>
                <button
                  onClick={() => {
                    setActiveDiscussionForDecision(null);
                    setDecisionTitle('');
                    setShowNewDecisionModal(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Propose Decision</span>
                </button>
              </div>

              <div className="space-y-4">
                {decisionsList.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400">
                    No decisions proposed yet. Click "+ Propose Decision" to start a team vote!
                  </div>
                ) : (
                  decisionsList.map(dec => {
                    const isDecided = dec.status === 'DECIDED';
                    const totalVotes = dec.options.reduce((acc, o) => acc + o.votesCount, 0);

                    return (
                      <div
                        key={dec.id}
                        className={`p-6 rounded-3xl border bg-white shadow-xs space-y-4 transition-all ${
                          isDecided ? 'border-emerald-200 ring-1 ring-emerald-500/10' : 'border-indigo-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                isDecided ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {isDecided ? 'Resolved & Decided ✓' : 'Voting Open 🗳️'}
                              </span>
                              <span className="text-[11px] text-slate-400">{totalVotes} Total Votes Cast</span>
                            </div>
                            <h4 className="font-extrabold text-base text-slate-900">{dec.title}</h4>
                            {dec.description && <p className="text-slate-600 text-xs">{dec.description}</p>}
                          </div>

                          {!isDecided && (
                            <button
                              onClick={() => {
                                setFinalizingDecision(dec);
                                setSelectedFinalOption(dec.options[0]?.id || '');
                              }}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 shrink-0"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Seal Decision</span>
                            </button>
                          )}
                        </div>

                        {/* Decision Options Poll */}
                        <div className="space-y-2 pt-1">
                          {dec.options.map(opt => {
                            const isSelectedOption = isDecided && opt.id === dec.selectedOptionId;
                            const isUserVoted = opt.id === dec.userVotedOptionId;
                            const votePercent = totalVotes > 0 ? Math.round((opt.votesCount / totalVotes) * 100) : 0;

                            return (
                              <div
                                key={opt.id}
                                className={`p-3.5 rounded-2xl border transition-all ${
                                  isSelectedOption
                                    ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/20'
                                    : isUserVoted
                                    ? 'bg-indigo-50/70 border-indigo-300'
                                    : 'bg-slate-50/50 border-slate-200'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1.5">
                                  <div className="flex items-center gap-2">
                                    {!isDecided && (
                                      <button
                                        onClick={() => voteDecision(project.id, dec.id, opt.id)}
                                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                          isUserVoted ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 hover:border-indigo-600'
                                        }`}
                                      >
                                        {isUserVoted && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                      </button>
                                    )}
                                    <span className="font-bold text-xs text-slate-900">{opt.text}</span>
                                    {isSelectedOption && (
                                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-emerald-600 text-white">
                                        Chosen Decision
                                      </span>
                                    )}
                                  </div>
                                  <span className="font-extrabold text-xs text-slate-700">{opt.votesCount} votes ({votePercent}%)</span>
                                </div>

                                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className={`h-1.5 rounded-full transition-all ${
                                      isSelectedOption ? 'bg-emerald-600' : 'bg-indigo-600'
                                    }`}
                                    style={{ width: `${votePercent}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Rationale and Convert to Task if decided */}
                        {isDecided && (
                          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                            <div>
                              <span className="font-bold text-slate-700">Rationale: </span>
                              <span className="text-slate-600">{dec.decisionReason || 'Consensus reached during team technical review.'}</span>
                            </div>

                            <button
                              onClick={() => {
                                setConvertingDecision(dec);
                                setTaskTitleFromDec(`Implement Decision: ${dec.selectedOptionText}`);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
                            >
                              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                              <span>+ Create Task from Decision</span>
                            </button>
                          </div>
                        )}

                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB: SOLUTION CANVAS (8-Box Lean Canvas) */}
          {activeTab === 'canvas' && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 flex items-center justify-between gap-3 shadow-sm">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Societal Solution Canvas</h3>
                  <p className="text-[11px] text-slate-500">Live collaborative lean architecture blueprint spanning all 8 core dimensions.</p>
                </div>

                <Link
                  href={`/solutions/submit/${project.id}`}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span>Export to Solution Proposal →</span>
                </Link>
              </div>

              {/* 8-Box Canvas Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Problem */}
                <div className="p-4 rounded-3xl bg-rose-50/40 border border-rose-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-xs text-rose-950 uppercase tracking-wider">1. The Problem</h4>
                      <button 
                        onClick={() => setAddingCardSection('problem')}
                        className="text-rose-700 hover:text-rose-900 font-bold text-xs"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {canvasCardsList.filter(c => c.section === 'problem').map(card => (
                        <div key={card.id} className="p-3 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-1 group">
                          <div className="flex justify-between items-start gap-1">
                            <p className="text-slate-800 leading-relaxed font-medium">{card.text}</p>
                            <button onClick={() => deleteCanvasCard(project.id, card.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[9px] text-slate-400">— {card.authorName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Users */}
                <div className="p-4 rounded-3xl bg-amber-50/40 border border-amber-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-xs text-amber-950 uppercase tracking-wider">2. Target Users</h4>
                      <button 
                        onClick={() => setAddingCardSection('users')}
                        className="text-amber-700 hover:text-amber-900 font-bold text-xs"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {canvasCardsList.filter(c => c.section === 'users').map(card => (
                        <div key={card.id} className="p-3 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-1 group">
                          <div className="flex justify-between items-start gap-1">
                            <p className="text-slate-800 leading-relaxed font-medium">{card.text}</p>
                            <button onClick={() => deleteCanvasCard(project.id, card.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[9px] text-slate-400">— {card.authorName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Current Approach */}
                <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider">3. Current Approach</h4>
                      <button 
                        onClick={() => setAddingCardSection('currentApproach')}
                        className="text-indigo-600 hover:text-indigo-800 font-bold text-xs"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {canvasCardsList.filter(c => c.section === 'currentApproach').map(card => (
                        <div key={card.id} className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1 group">
                          <div className="flex justify-between items-start gap-1">
                            <p className="text-slate-800 leading-relaxed font-medium">{card.text}</p>
                            <button onClick={() => deleteCanvasCard(project.id, card.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[9px] text-slate-400">— {card.authorName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Ideas Pool */}
                <div className="p-4 rounded-3xl bg-amber-50/40 border border-amber-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-xs text-amber-950 uppercase tracking-wider">4. Ideas Pool</h4>
                      <button 
                        onClick={() => setAddingCardSection('ideas')}
                        className="text-amber-700 hover:text-amber-900 font-bold text-xs"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {canvasCardsList.filter(c => c.section === 'ideas').map(card => (
                        <div key={card.id} className="p-3 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-1 group">
                          <div className="flex justify-between items-start gap-1">
                            <p className="text-slate-800 leading-relaxed font-medium">{card.text}</p>
                            <button onClick={() => deleteCanvasCard(project.id, card.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[9px] text-slate-400">— {card.authorName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. Proposed Solution */}
                <div className="p-4 rounded-3xl bg-indigo-50/50 border border-indigo-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-xs text-indigo-950 uppercase tracking-wider">5. Proposed Solution</h4>
                      <button 
                        onClick={() => setAddingCardSection('proposedSolution')}
                        className="text-indigo-700 hover:text-indigo-900 font-bold text-xs"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {canvasCardsList.filter(c => c.section === 'proposedSolution').map(card => (
                        <div key={card.id} className="p-3 rounded-2xl bg-white border border-indigo-200 shadow-2xs space-y-1 group">
                          <div className="flex justify-between items-start gap-1">
                            <p className="text-slate-800 leading-relaxed font-medium">{card.text}</p>
                            <button onClick={() => deleteCanvasCard(project.id, card.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[9px] text-slate-400">— {card.authorName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 6. Technology Stack */}
                <div className="p-4 rounded-3xl bg-blue-50/40 border border-blue-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-xs text-blue-950 uppercase tracking-wider">6. Tech Stack</h4>
                      <button 
                        onClick={() => setAddingCardSection('technology')}
                        className="text-blue-700 hover:text-blue-900 font-bold text-xs"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {canvasCardsList.filter(c => c.section === 'technology').map(card => (
                        <div key={card.id} className="p-3 rounded-2xl bg-white border border-blue-200 shadow-2xs space-y-1 group">
                          <div className="flex justify-between items-start gap-1">
                            <p className="text-slate-800 leading-relaxed font-medium">{card.text}</p>
                            <button onClick={() => deleteCanvasCard(project.id, card.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[9px] text-slate-400">— {card.authorName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 7. Key Risks */}
                <div className="p-4 rounded-3xl bg-amber-50/40 border border-amber-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-xs text-amber-950 uppercase tracking-wider">7. Risks & Mitigations</h4>
                      <button 
                        onClick={() => setAddingCardSection('risks')}
                        className="text-amber-700 hover:text-amber-900 font-bold text-xs"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {canvasCardsList.filter(c => c.section === 'risks').map(card => (
                        <div key={card.id} className="p-3 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-1 group">
                          <div className="flex justify-between items-start gap-1">
                            <p className="text-slate-800 leading-relaxed font-medium">{card.text}</p>
                            <button onClick={() => deleteCanvasCard(project.id, card.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[9px] text-slate-400">— {card.authorName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 8. Expected Impact */}
                <div className="p-4 rounded-3xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-xs text-emerald-950 uppercase tracking-wider">8. Expected Impact</h4>
                      <button 
                        onClick={() => setAddingCardSection('expectedImpact')}
                        className="text-emerald-700 hover:text-emerald-900 font-bold text-xs"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {canvasCardsList.filter(c => c.section === 'expectedImpact').map(card => (
                        <div key={card.id} className="p-3 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-1 group">
                          <div className="flex justify-between items-start gap-1">
                            <p className="text-slate-800 leading-relaxed font-medium">{card.text}</p>
                            <button onClick={() => deleteCanvasCard(project.id, card.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[9px] text-slate-400">— {card.authorName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB: TASKS */}
          {activeTab === 'tasks' && (
            <div className="space-y-4 animate-fade-in text-xs">
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

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
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

          {/* TAB: MILESTONES */}
          {activeTab === 'milestones' && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Roadmap & Pilot Milestones</h3>
                  <p className="text-xs text-slate-500">Track sensor deployments and field verification stages.</p>
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

          {/* TAB: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">Technical Schematics & Project Documentation</h3>
                    <p className="text-xs text-slate-500">Sensor schematics, baseline data sheets, and evaluation proposals.</p>
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
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
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
                        className="p-2 rounded-lg bg-white border border-slate-200 hover:text-indigo-600 text-slate-600 shadow-xs transition-colors"
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

        </div>

        {/* Right Sidebar: Project Pulse, Current Milestone, Active Decisions (1 col) */}
        <div className="space-y-5">
          
          {/* 1. Team Pulse Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="font-extrabold text-slate-900">Live Team Pulse</h3>
              </div>
              <button
                onClick={() => setShowPulseModal(true)}
                className="text-indigo-600 hover:text-indigo-800 font-bold text-[11px]"
              >
                + Update
              </button>
            </div>

            <div className="space-y-3">
              {teamPulseList.map(item => (
                <div
                  key={item.userId}
                  className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={item.userAvatar}
                        alt={item.userName}
                        className="w-7 h-7 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{item.userName}</div>
                        <div className="text-[10px] text-slate-400 truncate">{item.userRole}</div>
                      </div>
                    </div>

                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                      item.status === 'ON_TRACK' ? 'bg-emerald-100 text-emerald-800' :
                      item.status === 'NEED_HELP' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {item.status === 'ON_TRACK' && '🟢 On Track'}
                      {item.status === 'NEED_HELP' && '🟡 Need Help'}
                      {item.status === 'BLOCKED' && '🔴 Blocked'}
                    </span>
                  </div>

                  {item.needText && (
                    <p className="text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-100">
                      "{item.needText}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Current Milestone Tracker */}
          <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-5 rounded-3xl border border-indigo-950 shadow-md space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300">
                Current Sprint Milestone
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200">
                Milestone 4
              </span>
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-white">Controlled Field Pilot in 3 Villages</h4>
              <p className="text-slate-300 text-[11px] mt-1">Deploy 45 sensor nodes across Mandapeta, Alamuru, and Ravulapalem.</p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
              <span>Target: Oct 10, 2026</span>
              <span className="text-emerald-400 font-bold">18% Water Saved</span>
            </div>
          </div>

          {/* 3. Challenge Fast-Link Box */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
            <h3 className="font-extrabold text-slate-900">Challenge Context</h3>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {challenge.problemStatement}
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Location:</span>
              <span className="font-bold text-slate-900">{challenge.location.district}, {challenge.location.state}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Beneficiaries:</span>
              <span className="font-bold text-slate-900">{challenge.peopleAffectedLabel}</span>
            </div>
          </div>

        </div>

      </div>

      {/* MODALS */}

      {/* 1. Propose / Create Decision Modal */}
      {showNewDecisionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-xs">
            <h3 className="font-extrabold text-base text-slate-900">Propose Team Decision Poll</h3>
            <form onSubmit={handleCreateDecision} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Decision Title *</label>
                <input
                  type="text"
                  required
                  value={decisionTitle}
                  onChange={e => setDecisionTitle(e.target.value)}
                  placeholder="e.g. Backhaul Gateway Connectivity Protocol"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Option 1 *</label>
                <input
                  type="text"
                  required
                  value={decisionOption1}
                  onChange={e => setDecisionOption1(e.target.value)}
                  placeholder="Option 1"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Option 2 *</label>
                <input
                  type="text"
                  required
                  value={decisionOption2}
                  onChange={e => setDecisionOption2(e.target.value)}
                  placeholder="Option 2"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Option 3 (Optional)</label>
                <input
                  type="text"
                  value={decisionOption3}
                  onChange={e => setDecisionOption3(e.target.value)}
                  placeholder="Option 3"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewDecisionModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Launch Poll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Finalize / Seal Decision Modal */}
      {finalizingDecision && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-xs">
            <h3 className="font-extrabold text-base text-slate-900">Seal Team Decision</h3>
            <p className="text-slate-500">{finalizingDecision.title}</p>
            <form onSubmit={handleFinalizeSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Winning Option *</label>
                <select
                  value={selectedFinalOption}
                  onChange={e => setSelectedFinalOption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none"
                >
                  {finalizingDecision.options.map(opt => (
                    <option key={opt.id} value={opt.id}>
                      {opt.text} ({opt.votesCount} votes)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Decision Rationale</label>
                <textarea
                  rows={2}
                  value={finalizeReason}
                  onChange={e => setFinalizeReason(e.target.value)}
                  placeholder="Summarize why this choice was selected..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setFinalizingDecision(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Confirm & Seal Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Convert Decision to Task Modal */}
      {convertingDecision && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-xs">
            <h3 className="font-extrabold text-base text-slate-900">Create Sprint Task from Decision</h3>
            <form onSubmit={handleConvertDecisionToTaskSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={taskTitleFromDec}
                  onChange={e => setTaskTitleFromDec(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assignee</label>
                <select
                  value={taskAssigneeFromDec}
                  onChange={e => setTaskAssigneeFromDec(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none"
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
                    value={taskDueDateFromDec}
                    onChange={e => setTaskDueDateFromDec(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={taskPriorityFromDec}
                    onChange={e => setTaskPriorityFromDec(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setConvertingDecision(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Add Canvas Card Modal */}
      {addingCardSection && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-xs">
            <h3 className="font-extrabold text-base text-slate-900">Add Solution Canvas Card</h3>
            <p className="text-slate-500 uppercase font-bold text-[10px]">Section: {addingCardSection}</p>
            <form onSubmit={handleAddCanvasCardSubmit} className="space-y-3">
              <textarea
                required
                rows={4}
                value={newCardText}
                onChange={e => setNewCardText(e.target.value)}
                placeholder="Enter core bullet point or design rationale for this canvas section..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500"
              />
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddingCardSection(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Team Pulse Modal */}
      {showPulseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-xs">
            <h3 className="font-extrabold text-base text-slate-900">Update Your Team Pulse</h3>
            <form onSubmit={handleUpdatePulseSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Status *</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMyPulseStatus('ON_TRACK')}
                    className={`p-2.5 rounded-xl font-bold border transition-all text-center ${
                      myPulseStatus === 'ON_TRACK' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🟢 On Track
                  </button>
                  <button
                    type="button"
                    onClick={() => setMyPulseStatus('NEED_HELP')}
                    className={`p-2.5 rounded-xl font-bold border transition-all text-center ${
                      myPulseStatus === 'NEED_HELP' ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🟡 Need Help
                  </button>
                  <button
                    type="button"
                    onClick={() => setMyPulseStatus('BLOCKED')}
                    className={`p-2.5 rounded-xl font-bold border transition-all text-center ${
                      myPulseStatus === 'BLOCKED' ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🔴 Blocked
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Current Focus / What Help do you need?</label>
                <input
                  type="text"
                  value={myPulseNeedText}
                  onChange={e => setMyPulseNeedText(e.target.value)}
                  placeholder="e.g. Testing dual-spike sensor housings in Mandapeta..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPulseModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Update Pulse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Add Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-xs">
            <h3 className="font-extrabold text-base text-slate-900">Create Sprint Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Calibrate LoRaWAN antenna frequency"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assignee</label>
                <select
                  value={newTaskAssignee}
                  onChange={e => setNewTaskAssignee(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
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
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. CoCreate Modal */}
      <CoCreateModal
        challenge={challenge}
        isOpen={showCoCreateModal}
        initialParentId={coCreateParentId}
        onClose={() => {
          setShowCoCreateModal(false);
          setCoCreateParentId(undefined);
        }}
      />

    </div>
  );
}
