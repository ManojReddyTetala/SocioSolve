'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  Organization, 
  Challenge, 
  Project, 
  Solution, 
  Evaluation, 
  ImpactMetric, 
  Notification, 
  TaskItem, 
  MilestoneItem, 
  ProjectMessage, 
  EvaluationCriteria, 
  SolutionIdea, 
  ProjectUpdate, 
  Conversation, 
  DirectMessage, 
  InterestedUser, 
  PostComment,
  CoCreateIdeaNode,
  SkillContribution,
  IntroducedPartner,
  WorkspaceDiscussion,
  WorkspaceDecision,
  SolutionCanvasCard,
  TeamPulseItem
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_ORGANIZATIONS, 
  INITIAL_CHALLENGES, 
  INITIAL_PROJECTS, 
  INITIAL_SOLUTIONS, 
  INITIAL_EVALUATIONS, 
  INITIAL_IMPACTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_SOLUTION_IDEAS, 
  INITIAL_PROJECT_UPDATES, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES, 
  PLATFORM_STATS 
} from '../lib/demo-data';
import { AIService } from '../lib/ai-service';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Current user & role
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  allUsers: User[];
  connectedUserIds: string[];
  toggleConnect: (userId: string) => void;

  // Entities
  organizations: Organization[];
  challenges: Challenge[];
  solutionIdeas: SolutionIdea[];
  projectUpdates: ProjectUpdate[];
  projects: Project[];
  solutions: Solution[];
  evaluations: Evaluation[];
  impacts: ImpactMetric[];
  notifications: Notification[];
  conversations: Conversation[];
  messages: DirectMessage[];
  stats: typeof PLATFORM_STATS;

  // Social Feed Actions
  expressInterest: (challengeId: string) => void;
  toggleLike: (id: string, type: 'CHALLENGE' | 'IDEA' | 'UPDATE') => void;
  addComment: (id: string, type: 'CHALLENGE' | 'IDEA' | 'UPDATE', content: string) => void;
  toggleSaveChallenge: (challengeId: string) => void;
  sendDirectMessage: (conversationId: string, text: string) => void;
  createConversation: (targetUserId: string) => string;

  // Universal Create Actions
  isCreateModalOpen: boolean;
  createModalDefaultTab: 'CHALLENGE' | 'IDEA' | 'UPDATE';
  openCreateModal: (tab?: 'CHALLENGE' | 'IDEA' | 'UPDATE') => void;
  closeCreateModal: () => void;
  
  submitChallenge: (challengeData: Partial<Challenge>) => Promise<Challenge>;
  submitSolutionIdea: (data: { title: string; summary: string; technology: string[]; challengeId?: string; parentId?: string }) => void;
  submitProjectUpdate: (data: { projectId: string; title: string; content: string; metricsHighlight?: string }) => void;

  // Co-Create Pathways
  addCoCreateIdea: (challengeId: string, title: string, description: string, parentId?: string) => void;
  bringSkill: (challengeId: string, skills: string[]) => void;
  bringSomeone: (challengeId: string, targetId: string, reason: string) => void;
  joinTeam: (challengeId: string, focusArea?: string) => void;

  // Collaboration & Project Lifecycle
  startCollaboration: (challengeId: string, selectedUserIds?: string[]) => Project;
  verifyChallenge: (challengeId: string, status: 'PUBLISHED' | 'CHANGES_REQUESTED' | 'REJECTED', notes?: string) => void;
  invitePartner: (challengeId: string, organizationId: string) => void;
  respondToInvite: (challengeId: string, organizationId: string, accept: boolean) => void;

  // Project Workspace Actions & Decisions Engine
  addTask: (projectId: string, task: Omit<TaskItem, 'id'>) => void;
  toggleTaskStatus: (projectId: string, taskId: string) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  updateMilestoneStatus: (projectId: string, milestoneId: string, status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING') => void;
  postMessage: (projectId: string, content: string) => void;
  
  // Workspace Discussions, Opinions & Decisions
  voteOpinion: (projectId: string, discussionId: string, choice: 'support' | 'needDiscussion' | 'concern') => void;
  addWorkspaceDiscussion: (projectId: string, type: 'IDEA' | 'OPINION' | 'QUESTION' | 'CONCERN' | 'UPDATE' | 'RESOURCE' | 'HELP', title: string | undefined, content: string) => void;
  turnDiscussionIntoDecision: (projectId: string, discussionId: string, title: string, options: string[]) => void;
  voteDecision: (projectId: string, decisionId: string, optionId: string) => void;
  finalizeDecision: (projectId: string, decisionId: string, optionId: string, reason: string) => void;
  convertDecisionToTask: (projectId: string, decisionId: string, taskTitle: string, assigneeName: string, dueDate: string, priority: 'High' | 'Medium' | 'Low') => void;

  // Solution Canvas & Team Pulse
  addCanvasCard: (projectId: string, section: SolutionCanvasCard['section'], text: string) => void;
  deleteCanvasCard: (projectId: string, cardId: string) => void;
  updateTeamPulse: (projectId: string, status: 'ON_TRACK' | 'NEED_HELP' | 'BLOCKED', needText?: string) => void;

  // Solution & Evaluation Actions
  submitSolution: (solutionData: Omit<Solution, 'id' | 'submittedAt' | 'status'>) => void;
  submitEvaluation: (evaluationData: {
    solutionId: string;
    challengeId: string;
    criteria: EvaluationCriteria;
    comments: string;
    recommendation: 'RECOMMEND_PILOT' | 'REQUEST_CHANGES' | 'NEEDS_REFINEMENT' | 'REJECT';
  }) => void;
  
  // Impact Actions
  updateImpactMetrics: (impactId: string, newBeneficiaries: number, newSavings: number) => void;

  // Notifications & Toasts
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;

  // Demo state reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'sociosolve_social_v2';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [allUsers, setAllUsers] = useState<User[]>(INITIAL_USERS);
  const [connectedUserIds, setConnectedUserIds] = useState<string[]>(['user_sp_1', 'user_sp_2']);
  
  const [organizations, setOrganizations] = useState<Organization[]>(INITIAL_ORGANIZATIONS);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [solutionIdeas, setSolutionIdeas] = useState<SolutionIdea[]>(INITIAL_SOLUTION_IDEAS);
  const [projectUpdates, setProjectUpdates] = useState<ProjectUpdate[]>(INITIAL_PROJECT_UPDATES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [solutions, setSolutions] = useState<Solution[]>(INITIAL_SOLUTIONS);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(INITIAL_EVALUATIONS);
  const [impacts, setImpacts] = useState<ImpactMetric[]>(INITIAL_IMPACTS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<DirectMessage[]>(INITIAL_MESSAGES);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalDefaultTab, setCreateModalDefaultTab] = useState<'CHALLENGE' | 'IDEA' | 'UPDATE'>('CHALLENGE');

  // Load from LocalStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
        if (parsed.challenges) setChallenges(parsed.challenges);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.solutions) setSolutions(parsed.solutions);
        if (parsed.evaluations) setEvaluations(parsed.evaluations);
        if (parsed.impacts) setImpacts(parsed.impacts);
        if (parsed.solutionIdeas) setSolutionIdeas(parsed.solutionIdeas);
        if (parsed.projectUpdates) setProjectUpdates(parsed.projectUpdates);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.connectedUserIds) setConnectedUserIds(parsed.connectedUserIds);
      }
    } catch (e) {
      console.error('Failed to load from storage', e);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        currentUser,
        challenges,
        projects,
        solutions,
        evaluations,
        impacts,
        solutionIdeas,
        projectUpdates,
        notifications,
        connectedUserIds
      }));
    } catch (e) {
      console.error('Failed to save to storage', e);
    }
  }, [isClient, currentUser, challenges, projects, solutions, evaluations, impacts, solutionIdeas, projectUpdates, notifications, connectedUserIds]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast_' + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    const userForRole = allUsers.find(u => u.role === role) || INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(userForRole);
    showToast({
      type: 'info',
      title: `Operating as ${userForRole.name}`,
      message: `${userForRole.title} (${userForRole.organizationName || 'Member'})`
    });
  };

  const openCreateModal = (tab: 'CHALLENGE' | 'IDEA' | 'UPDATE' = 'CHALLENGE') => {
    setCreateModalDefaultTab(tab);
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const toggleConnect = (userId: string) => {
    const isConn = connectedUserIds.includes(userId);
    const targetUser = allUsers.find(u => u.id === userId);

    if (isConn) {
      setConnectedUserIds(prev => prev.filter(id => id !== userId));
      showToast({ type: 'info', title: 'Disconnected', message: `Removed connection with ${targetUser?.name || 'User'}` });
    } else {
      setConnectedUserIds(prev => [...prev, userId]);
      showToast({ type: 'success', title: 'Connection Established', message: `You are now connected with ${targetUser?.name || 'User'}!` });
    }
  };

  // Express Interest in Challenge
  const expressInterest = (challengeId: string) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        const isAlready = ch.hasExpressedInterest;
        const currentInterested = ch.interestedUsers || [];
        
        let updatedList: InterestedUser[];
        if (isAlready) {
          updatedList = currentInterested.filter(u => u.userId !== currentUser.id);
        } else {
          const newEntry: InterestedUser = {
            userId: currentUser.id,
            name: currentUser.name,
            role: currentUser.role,
            organizationName: currentUser.organizationName || currentUser.title,
            avatar: currentUser.avatar,
            skills: currentUser.skills || ['Innovation', 'Problem Solving'],
            expressedAt: new Date().toISOString(),
            type: currentUser.role === 'SOLUTION_PARTNER' ? 'RESEARCHER' : 'INDUSTRY'
          };
          updatedList = [newEntry, ...currentInterested];
        }

        return {
          ...ch,
          hasExpressedInterest: !isAlready,
          interestedUsers: updatedList
        };
      }
      return ch;
    }));

    const ch = challenges.find(c => c.id === challengeId);
    const isNow = !ch?.hasExpressedInterest;

    if (isNow && ch) {
      // Notify Challenge Provider
      const notif: Notification = {
        id: 'notif_' + Math.random().toString(36).substr(2, 9),
        userId: ch.submittedBy.userId,
        title: 'New Collaboration Interest!',
        message: `${currentUser.name} (${currentUser.organizationName || currentUser.title}) expressed interest in "${ch.title}".`,
        type: 'INTEREST_EXPRESSED',
        read: false,
        link: `/challenges/${ch.id}`,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);
    }

    showToast({
      type: isNow ? 'success' : 'info',
      title: isNow ? 'Interest Expressed!' : 'Interest Withdrawn',
      message: isNow 
        ? `Added to the collaboration roster for "${ch?.title}".` 
        : `Removed from interested roster.`
    });
  };

  // Like / React to Posts
  const toggleLike = (id: string, type: 'CHALLENGE' | 'IDEA' | 'UPDATE') => {
    if (type === 'CHALLENGE') {
      setChallenges(prev => prev.map(c => {
        if (c.id === id) {
          const has = c.hasLiked;
          return { ...c, hasLiked: !has, likesCount: (c.likesCount || 0) + (has ? -1 : 1) };
        }
        return c;
      }));
    } else if (type === 'IDEA') {
      setSolutionIdeas(prev => prev.map(i => {
        if (i.id === id) {
          const has = i.hasLiked;
          return { ...i, hasLiked: !has, likesCount: i.likesCount + (has ? -1 : 1) };
        }
        return i;
      }));
    } else if (type === 'UPDATE') {
      setProjectUpdates(prev => prev.map(u => {
        if (u.id === id) {
          const has = u.hasLiked;
          return { ...u, hasLiked: !has, likesCount: u.likesCount + (has ? -1 : 1) };
        }
        return u;
      }));
    }
  };

  // Add Comment to Post
  const addComment = (id: string, type: 'CHALLENGE' | 'IDEA' | 'UPDATE', content: string) => {
    if (!content.trim()) return;

    const newComment: PostComment = {
      id: 'comm_' + Math.random().toString(36).substr(2, 9),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.title,
      authorOrg: currentUser.organizationName || 'SocioSolve Member',
      authorAvatar: currentUser.avatar,
      content,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    if (type === 'CHALLENGE') {
      setChallenges(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, comments: [...(c.comments || []), newComment] };
        }
        return c;
      }));
    } else if (type === 'IDEA') {
      setSolutionIdeas(prev => prev.map(i => {
        if (i.id === id) {
          return { ...i, comments: [...i.comments, newComment] };
        }
        return i;
      }));
    } else if (type === 'UPDATE') {
      setProjectUpdates(prev => prev.map(u => {
        if (u.id === id) {
          return { ...u, comments: [...u.comments, newComment] };
        }
        return u;
      }));
    }

    showToast({
      type: 'success',
      title: 'Comment Posted',
      message: `Posted comment as ${currentUser.name}.`
    });
  };

  const toggleSaveChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        const isS = c.isSaved;
        showToast({
          type: 'info',
          title: isS ? 'Removed from Saved' : 'Challenge Saved',
          message: isS ? 'Removed from your bookmarks' : 'Added to your bookmarks'
        });
        return { ...c, isSaved: !isS };
      }
      return c;
    }));
  };

  // Direct Messages
  const sendDirectMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: DirectMessage = {
      id: 'dm_' + Math.random().toString(36).substr(2, 9),
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMsg]);
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text,
          lastMessageTime: 'Just now'
        };
      }
      return c;
    }));
  };

  const createConversation = (targetUserId: string): string => {
    const existing = conversations.find(c => c.participants.includes(targetUserId) && c.type === 'DIRECT');
    if (existing) return existing.id;

    const targetUser = allUsers.find(u => u.id === targetUserId);
    const newConv: Conversation = {
      id: 'conv_' + Math.random().toString(36).substr(2, 9),
      type: 'DIRECT',
      title: targetUser?.name || 'Direct Chat',
      subtitle: targetUser?.organizationName || targetUser?.title || 'Member',
      avatar: targetUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      unreadCount: 0,
      lastMessage: 'Conversation started',
      lastMessageTime: 'Just now',
      participants: [currentUser.id, targetUserId]
    };

    setConversations(prev => [newConv, ...prev]);
    return newConv.id;
  };

  // Submit Challenge Flow
  const submitChallenge = async (challengeData: Partial<Challenge>): Promise<Challenge> => {
    const aiAnalysis = await AIService.analyzeChallenge({
      title: challengeData.title || '',
      problemStatement: challengeData.problemStatement || '',
      whyItMatters: challengeData.whyItMatters || '',
      category: challengeData.category,
      location: challengeData.location
    });

    const newChallenge: Challenge = {
      id: 'ch_' + Math.random().toString(36).substr(2, 9),
      title: challengeData.title || 'Untitled Challenge',
      problemStatement: challengeData.problemStatement || '',
      whyItMatters: challengeData.whyItMatters || '',
      targetDemographic: challengeData.targetDemographic || 'Local Community Members',
      peopleAffected: challengeData.peopleAffected || 1000,
      peopleAffectedLabel: challengeData.peopleAffectedLabel || `${challengeData.peopleAffected || 1000}+ people affected`,
      location: challengeData.location || {
        state: 'Andhra Pradesh',
        district: 'East Godavari',
        villageOrCity: 'Rural Mandal'
      },
      category: (challengeData.category as any) || (aiAnalysis.detectedCategory as any),
      subcategories: aiAnalysis.subcategories,
      priority: challengeData.priority || 'High',
      skillsRequired: challengeData.skillsRequired?.length ? challengeData.skillsRequired : aiAnalysis.extractedSkills,
      resourcesRequired: challengeData.resourcesRequired?.length ? challengeData.resourcesRequired : aiAnalysis.requiredResources,
      fundingRequired: challengeData.fundingRequired || '₹2,50,000 for field trial pilot',
      submittedBy: {
        userId: currentUser.id,
        userName: currentUser.name,
        organizationName: currentUser.organizationName || currentUser.title,
        userAvatar: currentUser.avatar,
        contactEmail: currentUser.email
      },
      status: 'PUBLISHED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      partnerCount: 0,
      progressPercent: 20,
      likesCount: 1,
      hasLiked: true,
      comments: [],
      interestedUsers: [],
      hasExpressedInterest: false,
      aiAnalysis,
      matchedPartners: AIService.recommendPartners(
        { ...challengeData, skillsRequired: aiAnalysis.extractedSkills, location: challengeData.location } as any, 
        organizations
      ).map(m => ({
        organizationId: m.organization.id,
        matchScore: m.matchScore,
        matchReasons: m.reasons,
        status: 'EXPLORING'
      }))
    };

    setChallenges(prev => [newChallenge, ...prev]);

    showToast({
      type: 'success',
      title: 'Challenge Posted to Feed!',
      message: 'AI analyzed problem semantics & extracted required skills.'
    });

    closeCreateModal();
    return newChallenge;
  };

  const submitSolutionIdea = (data: { title: string; summary: string; technology: string[]; challengeId?: string; parentId?: string }) => {
    const linkedChallenge = challenges.find(c => c.id === data.challengeId);

    const newIdea: SolutionIdea = {
      id: 'idea_' + Math.random().toString(36).substr(2, 9),
      challengeId: data.challengeId,
      challengeTitle: linkedChallenge?.title,
      parentId: data.parentId,
      title: data.title,
      summary: data.summary,
      author: {
        userId: currentUser.id,
        name: currentUser.name,
        organization: currentUser.organizationName || currentUser.title,
        avatar: currentUser.avatar
      },
      technology: data.technology,
      likesCount: 1,
      hasLiked: true,
      comments: [],
      createdAt: new Date().toISOString()
    };

    setSolutionIdeas(prev => [newIdea, ...prev]);

    // If linked to challenge, also register as idea node
    if (data.challengeId) {
      addCoCreateIdea(data.challengeId, data.title, data.summary, data.parentId);
    }

    showToast({ type: 'success', title: 'Solution Idea Shared!', message: 'Your idea is now visible in the community feed & challenge idea tree.' });
    closeCreateModal();
  };

  const submitProjectUpdate = (data: { projectId: string; title: string; content: string; metricsHighlight?: string }) => {
    const proj = projects.find(p => p.id === data.projectId) || projects[0];

    const newUpdate: ProjectUpdate = {
      id: 'update_' + Math.random().toString(36).substr(2, 9),
      projectId: proj.id,
      projectTitle: proj.name,
      author: {
        userId: currentUser.id,
        name: currentUser.name,
        role: currentUser.title,
        avatar: currentUser.avatar
      },
      title: data.title,
      content: data.content,
      metricsHighlight: data.metricsHighlight,
      likesCount: 1,
      hasLiked: true,
      comments: [],
      createdAt: new Date().toISOString()
    };

    setProjectUpdates(prev => [newUpdate, ...prev]);
    showToast({ type: 'success', title: 'Project Update Broadcasted!', message: 'Milestone update posted to community feed.' });
    closeCreateModal();
  };

  // Start Collaboration -> Auto Create Project
  const startCollaboration = (challengeId: string, selectedUserIds?: string[]): Project => {
    const existing = projects.find(p => p.challengeId === challengeId);
    if (existing) return existing;

    const ch = challenges.find(c => c.id === challengeId);
    
    // Assemble members
    const members = [
      {
        userId: ch?.submittedBy.userId || currentUser.id,
        name: ch?.submittedBy.userName || currentUser.name,
        role: 'Community Sponsor',
        organization: ch?.submittedBy.organizationName || 'Community Association',
        avatar: ch?.submittedBy.userAvatar || currentUser.avatar
      },
      {
        userId: 'user_sp_1',
        name: 'Dr. Ramesh K. Varma',
        role: 'Academic Lead & ML Architect',
        organization: 'ABC Engineering University',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      {
        userId: 'user_sp_2',
        name: 'Pooja Hegde',
        role: 'Hardware & Telemetry Lead',
        organization: 'AgriTech Solutions',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      }
    ];

    const newProj: Project = {
      id: 'proj_' + Math.random().toString(36).substr(2, 9),
      challengeId,
      challengeTitle: ch?.title || 'Societal Collaborative Project',
      name: `${ch?.title || 'Project'} Initiative`,
      description: ch?.problemStatement || 'Co-developed prototype and field deployment.',
      status: 'PROTOTYPE_DEV',
      progressPercent: 50,
      members,
      tasks: [
        {
          id: 'task_1',
          title: 'Problem validation & field site demarcation',
          assignedTo: {
            name: ch?.submittedBy.userName || currentUser.name,
            organization: ch?.submittedBy.organizationName || 'Community Lead',
            avatar: ch?.submittedBy.userAvatar || currentUser.avatar
          },
          status: 'DONE',
          dueDate: '2026-10-05',
          priority: 'High'
        },
        {
          id: 'task_2',
          title: 'Sensor telemetry & circuit prototyping',
          assignedTo: {
            name: 'Pooja Hegde',
            organization: 'AgriTech Solutions',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
          },
          status: 'IN_PROGRESS',
          dueDate: '2026-10-15',
          priority: 'High'
        }
      ],
      milestones: [
        {
          id: 'm1',
          title: 'Problem Definition & Field Survey',
          description: 'Survey baseline requirements.',
          status: 'COMPLETED',
          targetDate: '2026-10-01'
        },
        {
          id: 'm2',
          title: 'Sensor Hardware & Edge ML',
          description: 'Functional prototype testing.',
          status: 'IN_PROGRESS',
          targetDate: '2026-10-15'
        },
        {
          id: 'm3',
          title: 'Controlled Village Pilot',
          description: 'Deploy across target communities.',
          status: 'UPCOMING',
          targetDate: '2026-11-01'
        }
      ],
      discussions: [
        {
          id: 'msg_1',
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: currentUser.title,
          senderOrg: currentUser.organizationName || 'Partner',
          senderAvatar: currentUser.avatar,
          content: 'Workspace created! Excited to co-create solutions with everyone.',
          timestamp: new Date().toISOString()
        }
      ],
      documents: [
        {
          id: 'doc_1',
          name: 'Project_Charter_and_Scope.pdf',
          fileType: 'PDF Document',
          size: '2.1 MB',
          uploadedBy: currentUser.name,
          uploadedAt: '2026-09-28'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProjects(prev => [newProj, ...prev]);
    setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, activeProjectId: newProj.id, status: 'ACTIVE_COLLABORATION', progressPercent: 50 } : c));
    
    showToast({
      type: 'success',
      title: 'Collaboration Workspace Activated!',
      message: `Project created with ${members.length} participating partners.`
    });

    return newProj;
  };

  const verifyChallenge = (challengeId: string, status: 'PUBLISHED' | 'CHANGES_REQUESTED' | 'REJECTED', notes?: string) => {
    setChallenges(prev => prev.map(ch => ch.id === challengeId ? { ...ch, status, updatedAt: new Date().toISOString() } : ch));
    showToast({
      type: status === 'PUBLISHED' ? 'success' : 'warning',
      title: `Challenge ${status.replace('_', ' ')}`,
      message: 'Status updated across platform discovery.'
    });
  };

  const invitePartner = (challengeId: string, organizationId: string) => {
    const org = organizations.find(o => o.id === organizationId);
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        const existing = ch.matchedPartners || [];
        const updated = existing.map(p => p.organizationId === organizationId ? { ...p, status: 'INVITED' as const } : p);
        if (!updated.some(p => p.organizationId === organizationId)) {
          updated.push({
            organizationId,
            matchScore: 88,
            matchReasons: ['Invited by Challenge Provider based on domain expertise'],
            status: 'INVITED'
          });
        }
        return { ...ch, matchedPartners: updated, updatedAt: new Date().toISOString() };
      }
      return ch;
    }));

    showToast({
      type: 'success',
      title: 'Invitation Sent',
      message: `Invited ${org?.name || 'Partner'} to collaborate.`
    });
  };

  const respondToInvite = (challengeId: string, organizationId: string, accept: boolean) => {
    const org = organizations.find(o => o.id === organizationId);
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        const nextStatus: 'ACCEPTED' | 'DECLINED' = accept ? 'ACCEPTED' : 'DECLINED';
        const partners = (c.matchedPartners || []).map(p => 
          p.organizationId === organizationId ? { ...p, status: nextStatus } : p
        );
        const acceptedCount = partners.filter(p => p.status === 'ACCEPTED').length;
        return {
          ...c,
          matchedPartners: partners,
          partnerCount: acceptedCount,
          status: accept ? 'ACTIVE_COLLABORATION' : c.status,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    if (accept) {
      startCollaboration(challengeId);
    }

    showToast({
      type: accept ? 'success' : 'info',
      title: accept ? 'Partnership Established!' : 'Invitation Declined',
      message: accept 
        ? `${org?.name || 'Partner'} accepted. Workspace active.` 
        : `Declined collaboration invitation.`
    });
  };

  const addTask = (projectId: string, task: Omit<TaskItem, 'id'>) => {
    const newTask: TaskItem = { ...task, id: 'task_' + Math.random().toString(36).substr(2, 9) };
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, tasks: [...p.tasks, newTask] } : p));
    showToast({ type: 'success', title: 'Task Added', message: `Added "${newTask.title}".` });
  };

  const toggleTaskStatus = (projectId: string, taskId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updatedTasks = p.tasks.map(t => {
          if (t.id === taskId) {
            const nextStatus: 'TODO' | 'IN_PROGRESS' | 'DONE' = 
              t.status === 'DONE' ? 'TODO' : t.status === 'TODO' ? 'IN_PROGRESS' : 'DONE';
            return { ...t, status: nextStatus };
          }
          return t;
        });
        return { ...p, tasks: updatedTasks };
      }
      return p;
    }));
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) } : p));
    showToast({ type: 'info', title: 'Task Removed', message: 'Task deleted.' });
  };

  const updateMilestoneStatus = (projectId: string, milestoneId: string, status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING') => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          milestones: p.milestones.map(m => m.id === milestoneId ? { ...m, status, completedDate: status === 'COMPLETED' ? new Date().toISOString().split('T')[0] : undefined } : m)
        };
      }
      return p;
    }));
    showToast({ type: 'success', title: 'Milestone Updated', message: `Status changed to ${status}.` });
  };

  const postMessage = (projectId: string, content: string) => {
    if (!content.trim()) return;
    const newMsg: ProjectMessage = {
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.title,
      senderOrg: currentUser.organizationName || 'Partner',
      senderAvatar: currentUser.avatar,
      content,
      timestamp: new Date().toISOString()
    };
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, discussions: [...p.discussions, newMsg] } : p));
  };

  const submitSolution = (solutionData: Omit<Solution, 'id' | 'submittedAt' | 'status'>) => {
    const newSol: Solution = {
      ...solutionData,
      id: 'sol_' + Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString(),
      status: 'SUBMITTED'
    };

    setSolutions(prev => [newSol, ...prev]);
    setChallenges(prev => prev.map(c => c.id === newSol.challengeId ? { ...c, status: 'UNDER_EVALUATION', progressPercent: 75 } : c));
    setProjects(prev => prev.map(p => p.id === newSol.projectId ? { ...p, status: 'EVALUATION' } : p));

    // Notify Experts
    const notif: Notification = {
      id: 'notif_' + Math.random().toString(36).substr(2, 9),
      userId: 'ALL',
      roleTarget: 'EXPERT',
      title: 'New Solution Ready for Review',
      message: `"${newSol.title}" submitted for expert panel evaluation.`,
      type: 'SYSTEM',
      read: false,
      link: `/evaluations/${newSol.id}`,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);

    showToast({ type: 'success', title: 'Solution Submitted', message: 'Routed to domain expert panel for evaluation.' });
  };

  const submitEvaluation = (data: {
    solutionId: string;
    challengeId: string;
    criteria: EvaluationCriteria;
    comments: string;
    recommendation: 'RECOMMEND_PILOT' | 'REQUEST_CHANGES' | 'NEEDS_REFINEMENT' | 'REJECT';
  }) => {
    const values = Object.values(data.criteria);
    const overallScore = Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1));

    const newEval: Evaluation = {
      id: 'eval_' + Math.random().toString(36).substr(2, 9),
      solutionId: data.solutionId,
      challengeId: data.challengeId,
      expert: {
        id: currentUser.id,
        name: currentUser.name,
        domain: currentUser.title,
        avatar: currentUser.avatar,
        organization: currentUser.organizationName || 'Evaluation Council'
      },
      criteria: data.criteria,
      overallScore,
      comments: data.comments,
      recommendation: data.recommendation,
      createdAt: new Date().toISOString()
    };

    setEvaluations(prev => [newEval, ...prev]);

    const isApproved = data.recommendation === 'RECOMMEND_PILOT';
    setSolutions(prev => prev.map(s => s.id === data.solutionId ? { ...s, status: isApproved ? 'PILOT_RECOMMENDED' : 'CHANGES_REQUESTED' } : s));
    setChallenges(prev => prev.map(c => c.id === data.challengeId ? { ...c, status: isApproved ? 'PILOT_DEPLOYMENT' : 'UNDER_EVALUATION', progressPercent: isApproved ? 85 : 70 } : c));
    setProjects(prev => prev.map(p => p.challengeId === data.challengeId ? { ...p, status: isApproved ? 'PILOT_DEPLOYMENT' : 'PROTOTYPE_DEV' } : p));

    showToast({
      type: isApproved ? 'success' : 'warning',
      title: isApproved ? 'Pilot Recommended!' : 'Feedback Logged',
      message: `Score: ${overallScore}/5.0. Project advanced to ${isApproved ? 'Pilot Deployment' : 'Refinement'}.`
    });
  };

  // ----------------------------------------------------
  // Co-Create Pathways
  // ----------------------------------------------------
  const addCoCreateIdea = (challengeId: string, title: string, description: string, parentId?: string) => {
    if (!title.trim()) return;

    const newNode: CoCreateIdeaNode = {
      id: 'node_' + Math.random().toString(36).substr(2, 9),
      challengeId,
      parentId,
      title,
      description,
      author: {
        userId: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        org: currentUser.organizationName || currentUser.title
      },
      createdAt: new Date().toISOString(),
      likesCount: 1
    };

    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        const existingNodes = ch.ideaNodes || [];
        return {
          ...ch,
          ideaNodes: [newNode, ...existingNodes],
          ideasCount: (ch.ideasCount || existingNodes.length) + 1,
          coCreatorsCount: (ch.coCreatorsCount || 0) + 1
        };
      }
      return ch;
    }));

    // If challenge has an active project, also add to workspace stream
    const targetChallenge = challenges.find(c => c.id === challengeId);
    if (targetChallenge?.activeProjectId) {
      addWorkspaceDiscussion(
        targetChallenge.activeProjectId,
        'IDEA',
        `Idea: ${title}`,
        description
      );
    }

    showToast({
      type: 'success',
      title: '✨ Co-Create Idea Logged',
      message: `Your idea "${title}" has been connected to the challenge idea tree.`
    });
  };

  const bringSkill = (challengeId: string, skills: string[]) => {
    if (!skills.length) return;

    const newContrib: SkillContribution = {
      id: 'sk_' + Math.random().toString(36).substr(2, 9),
      challengeId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userOrg: currentUser.organizationName || currentUser.title,
      skills,
      createdAt: new Date().toISOString()
    };

    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        const existingSkills = ch.skillContributions || [];
        return {
          ...ch,
          skillContributions: [newContrib, ...existingSkills],
          skillContributorsCount: (ch.skillContributorsCount || existingSkills.length) + 1,
          coCreatorsCount: (ch.coCreatorsCount || 0) + 1
        };
      }
      return ch;
    }));

    showToast({
      type: 'success',
      title: '🛠️ Skill Contribution Added!',
      message: `You pledged skills [${skills.join(', ')}] to help solve this challenge.`
    });
  };

  const bringSomeone = (challengeId: string, targetId: string, reason: string) => {
    const targetOrg = organizations.find(o => o.id === targetId);
    const targetUser = allUsers.find(u => u.id === targetId);
    const targetName = targetOrg?.name || targetUser?.name || 'Nominated Partner';
    const targetAvatar = targetOrg?.logo || targetUser?.avatar || '👥';
    const targetType = targetOrg ? `${targetOrg.type.replace('_', ' ')}` : (targetUser?.title || 'Expert');

    const newIntro: IntroducedPartner = {
      id: 'intro_' + Math.random().toString(36).substr(2, 9),
      challengeId,
      targetId,
      targetName,
      targetType,
      targetAvatar,
      recommendedBy: currentUser.name,
      reason,
      createdAt: new Date().toISOString()
    };

    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        const existingIntros = ch.introductions || [];
        return {
          ...ch,
          introductions: [newIntro, ...existingIntros],
          coCreatorsCount: (ch.coCreatorsCount || 0) + 1
        };
      }
      return ch;
    }));

    showToast({
      type: 'success',
      title: '👥 Partner Nominated!',
      message: `Introduced ${targetName} to collaborate on this challenge.`
    });
  };

  const joinTeam = (challengeId: string, focusArea: string = 'General Collaboration') => {
    let targetProject = projects.find(p => p.challengeId === challengeId);
    if (!targetProject) {
      targetProject = startCollaboration(challengeId);
    }

    const isMember = targetProject.members.some(m => m.userId === currentUser.id);
    if (!isMember) {
      const newMember = {
        userId: currentUser.id,
        name: currentUser.name,
        role: currentUser.title,
        organization: currentUser.organizationName || 'Collaborator',
        avatar: currentUser.avatar,
        focusArea
      };

      setProjects(prev => prev.map(p => {
        if (p.id === targetProject!.id) {
          return {
            ...p,
            members: [...p.members, newMember]
          };
        }
        return p;
      }));
    }

    // Mark user as interested / co-creator on challenge
    expressInterest(challengeId);

    showToast({
      type: 'success',
      title: '🚀 Joined Solver Team!',
      message: `You are now an active co-creator on the team focusing on "${focusArea}".`
    });
  };

  // ----------------------------------------------------
  // Workspace Discussions, Opinions & Decisions
  // ----------------------------------------------------
  const voteOpinion = (projectId: string, discussionId: string, choice: 'support' | 'needDiscussion' | 'concern') => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const discs = (p.workspaceDiscussions || []).map(d => {
          if (d.id === discussionId) {
            const currentOp = d.opinions || { support: 0, needDiscussion: 0, concern: 0 };
            const prevVote = currentOp.userVote;
            
            let updatedSupport = currentOp.support;
            let updatedNeedDiscussion = currentOp.needDiscussion;
            let updatedConcern = currentOp.concern;

            if (prevVote === choice) {
              // Toggle off
              if (choice === 'support') updatedSupport = Math.max(0, updatedSupport - 1);
              if (choice === 'needDiscussion') updatedNeedDiscussion = Math.max(0, updatedNeedDiscussion - 1);
              if (choice === 'concern') updatedConcern = Math.max(0, updatedConcern - 1);
              return {
                ...d,
                opinions: {
                  support: updatedSupport,
                  needDiscussion: updatedNeedDiscussion,
                  concern: updatedConcern,
                  userVote: undefined
                }
              };
            }

            // Remove previous vote if any
            if (prevVote === 'support') updatedSupport = Math.max(0, updatedSupport - 1);
            if (prevVote === 'needDiscussion') updatedNeedDiscussion = Math.max(0, updatedNeedDiscussion - 1);
            if (prevVote === 'concern') updatedConcern = Math.max(0, updatedConcern - 1);

            // Add new vote
            if (choice === 'support') updatedSupport += 1;
            if (choice === 'needDiscussion') updatedNeedDiscussion += 1;
            if (choice === 'concern') updatedConcern += 1;

            return {
              ...d,
              opinions: {
                support: updatedSupport,
                needDiscussion: updatedNeedDiscussion,
                concern: updatedConcern,
                userVote: choice
              }
            };
          }
          return d;
        });

        return { ...p, workspaceDiscussions: discs };
      }
      return p;
    }));
  };

  const addWorkspaceDiscussion = (
    projectId: string,
    type: 'IDEA' | 'OPINION' | 'QUESTION' | 'CONCERN' | 'UPDATE' | 'RESOURCE' | 'HELP',
    title: string | undefined,
    content: string
  ) => {
    if (!content.trim()) return;

    const newDiscussion: WorkspaceDiscussion = {
      id: 'disc_' + Math.random().toString(36).substr(2, 9),
      projectId,
      type,
      title,
      content,
      author: {
        userId: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.title,
        org: currentUser.organizationName || 'Collaborator'
      },
      opinions: {
        support: 1,
        needDiscussion: 0,
        concern: 0,
        userVote: 'support'
      },
      replies: [],
      createdAt: new Date().toISOString()
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          workspaceDiscussions: [newDiscussion, ...(p.workspaceDiscussions || [])]
        };
      }
      return p;
    }));

    showToast({
      type: 'success',
      title: 'Contribution Added to Stream',
      message: `Posted ${type.toLowerCase()} to project collaboration stream.`
    });
  };

  const turnDiscussionIntoDecision = (projectId: string, discussionId: string, title: string, optionsText: string[]) => {
    const validOptions = optionsText.filter(o => o.trim().length > 0);
    if (!validOptions.length) return;

    const newDecision: WorkspaceDecision = {
      id: 'dec_' + Math.random().toString(36).substr(2, 9),
      projectId,
      title,
      options: validOptions.map((opt, idx) => ({
        id: 'opt_' + (idx + 1),
        text: opt,
        votesCount: idx === 0 ? 1 : 0
      })),
      status: 'OPEN',
      userVotedOptionId: 'opt_1',
      createdAt: new Date().toISOString()
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const discs = (p.workspaceDiscussions || []).map(d => 
          d.id === discussionId ? { ...d, decisionId: newDecision.id } : d
        );
        return {
          ...p,
          workspaceDiscussions: discs,
          workspaceDecisions: [newDecision, ...(p.workspaceDecisions || [])]
        };
      }
      return p;
    }));

    showToast({
      type: 'success',
      title: '🧠 Decision Poll Created!',
      message: `Community voting is now open for "${title}".`
    });
  };

  const voteDecision = (projectId: string, decisionId: string, optionId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const decs = (p.workspaceDecisions || []).map(dec => {
          if (dec.id === decisionId && dec.status === 'OPEN') {
            const prevVoted = dec.userVotedOptionId;
            const updatedOpts = dec.options.map(opt => {
              let count = opt.votesCount;
              if (opt.id === prevVoted) count = Math.max(0, count - 1);
              if (opt.id === optionId) count += 1;
              return { ...opt, votesCount: count };
            });

            return {
              ...dec,
              options: updatedOpts,
              userVotedOptionId: optionId
            };
          }
          return dec;
        });

        return { ...p, workspaceDecisions: decs };
      }
      return p;
    }));

    showToast({
      type: 'info',
      title: 'Vote Recorded',
      message: 'Your vote on the team decision has been counted.'
    });
  };

  const finalizeDecision = (projectId: string, decisionId: string, optionId: string, reason: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const decs = (p.workspaceDecisions || []).map(dec => {
          if (dec.id === decisionId) {
            const chosen = dec.options.find(o => o.id === optionId);
            return {
              ...dec,
              status: 'DECIDED' as const,
              selectedOptionId: optionId,
              selectedOptionText: chosen?.text || '',
              decisionReason: reason,
              decidedAt: new Date().toISOString()
            };
          }
          return dec;
        });

        return { ...p, workspaceDecisions: decs };
      }
      return p;
    }));

    showToast({
      type: 'success',
      title: '🧠 Team Decision Finalized',
      message: 'Decision has been sealed and logged into the project roadmap.'
    });
  };

  const convertDecisionToTask = (
    projectId: string,
    decisionId: string,
    taskTitle: string,
    assigneeName: string,
    dueDate: string,
    priority: 'High' | 'Medium' | 'Low'
  ) => {
    const newTask: TaskItem = {
      id: 'task_' + Math.random().toString(36).substr(2, 9),
      title: taskTitle,
      assignedTo: {
        name: assigneeName,
        organization: currentUser.organizationName || 'Collaborator',
        avatar: currentUser.avatar
      },
      status: 'TODO',
      dueDate,
      priority,
      sourceDecisionId: decisionId
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const discs = (p.workspaceDiscussions || []).map(d => 
          d.decisionId === decisionId ? { ...d, convertedToTaskId: newTask.id } : d
        );
        return {
          ...p,
          tasks: [...p.tasks, newTask],
          workspaceDiscussions: discs
        };
      }
      return p;
    }));

    showToast({
      type: 'success',
      title: '✅ Decision Converted to Sprint Task',
      message: `Assigned "${taskTitle}" to ${assigneeName}.`
    });
  };

  // ----------------------------------------------------
  // Solution Canvas & Team Pulse
  // ----------------------------------------------------
  const addCanvasCard = (projectId: string, section: SolutionCanvasCard['section'], text: string) => {
    if (!text.trim()) return;

    const newCard: SolutionCanvasCard = {
      id: 'card_' + Math.random().toString(36).substr(2, 9),
      projectId,
      section,
      text,
      authorName: currentUser.name,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          canvasCards: [...(p.canvasCards || []), newCard]
        };
      }
      return p;
    }));

    showToast({
      type: 'success',
      title: '🧩 Canvas Card Added',
      message: `Added card to "${section}".`
    });
  };

  const deleteCanvasCard = (projectId: string, cardId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          canvasCards: (p.canvasCards || []).filter(c => c.id !== cardId)
        };
      }
      return p;
    }));
  };

  const updateTeamPulse = (projectId: string, status: 'ON_TRACK' | 'NEED_HELP' | 'BLOCKED', needText?: string) => {
    const newItem: TeamPulseItem = {
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userRole: currentUser.title,
      status,
      needText,
      updatedAt: 'Just now'
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const existing = (p.teamPulse || []).filter(item => item.userId !== currentUser.id);
        return {
          ...p,
          teamPulse: [newItem, ...existing]
        };
      }
      return p;
    }));

    showToast({
      type: status === 'ON_TRACK' ? 'success' : status === 'NEED_HELP' ? 'warning' : 'error',
      title: 'Pulse Updated',
      message: `Status set to ${status.replace('_', ' ')}.`
    });
  };

  const updateImpactMetrics = (impactId: string, newBeneficiaries: number, newSavings: number) => {
    setImpacts(prev => prev.map(imp => imp.id === impactId ? { ...imp, farmersOrBeneficiariesReached: newBeneficiaries, costSavingsINR: newSavings } : imp));
    showToast({
      type: 'success',
      title: 'Impact Metrics Synced',
      message: `Beneficiaries: ${newBeneficiaries.toLocaleString()} | Cost Savings: ₹${(newSavings / 100000).toFixed(1)}L`
    });
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast({ type: 'info', title: 'Notifications Cleared', message: 'All marked as read.' });
  };

  const resetDemoData = () => {
    setCurrentUser(INITIAL_USERS[0]);
    setAllUsers(INITIAL_USERS);
    setOrganizations(INITIAL_ORGANIZATIONS);
    setChallenges(INITIAL_CHALLENGES);
    setSolutionIdeas(INITIAL_SOLUTION_IDEAS);
    setProjectUpdates(INITIAL_PROJECT_UPDATES);
    setProjects(INITIAL_PROJECTS);
    setSolutions(INITIAL_SOLUTIONS);
    setEvaluations(INITIAL_EVALUATIONS);
    setImpacts(INITIAL_IMPACTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setConversations(INITIAL_CONVERSATIONS);
    setMessages(INITIAL_MESSAGES);
    setConnectedUserIds(['user_sp_1', 'user_sp_2']);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    showToast({ type: 'info', title: 'Demo State Reset', message: 'Reset to pristine demo state.' });
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      switchRole,
      allUsers,
      connectedUserIds,
      toggleConnect,
      organizations,
      challenges,
      solutionIdeas,
      projectUpdates,
      projects,
      solutions,
      evaluations,
      impacts,
      notifications,
      conversations,
      messages,
      stats: PLATFORM_STATS,
      expressInterest,
      toggleLike,
      addComment,
      toggleSaveChallenge,
      sendDirectMessage,
      createConversation,
      isCreateModalOpen,
      createModalDefaultTab,
      openCreateModal,
      closeCreateModal,
      submitChallenge,
      submitSolutionIdea,
      submitProjectUpdate,
      addCoCreateIdea,
      bringSkill,
      bringSomeone,
      joinTeam,
      startCollaboration,
      verifyChallenge,
      invitePartner,
      respondToInvite,
      addTask,
      toggleTaskStatus,
      deleteTask,
      updateMilestoneStatus,
      postMessage,
      voteOpinion,
      addWorkspaceDiscussion,
      turnDiscussionIntoDecision,
      voteDecision,
      finalizeDecision,
      convertDecisionToTask,
      addCanvasCard,
      deleteCanvasCard,
      updateTeamPulse,
      submitSolution,
      submitEvaluation,
      updateImpactMetrics,
      toasts,
      showToast,
      removeToast,
      markNotificationRead,
      markAllNotificationsRead,
      resetDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
