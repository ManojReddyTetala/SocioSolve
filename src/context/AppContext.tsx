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
  EvaluationCriteria
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

  // Entities
  organizations: Organization[];
  challenges: Challenge[];
  projects: Project[];
  solutions: Solution[];
  evaluations: Evaluation[];
  impacts: ImpactMetric[];
  notifications: Notification[];
  stats: typeof PLATFORM_STATS;

  // Actions
  submitChallenge: (challengeData: Partial<Challenge>) => Promise<Challenge>;
  verifyChallenge: (challengeId: string, status: 'PUBLISHED' | 'CHANGES_REQUESTED' | 'REJECTED', notes?: string) => void;
  invitePartner: (challengeId: string, organizationId: string) => void;
  respondToInvite: (challengeId: string, organizationId: string, accept: boolean) => void;
  createProjectFromChallenge: (challengeId: string) => Project;
  
  // Project Workspace Actions
  addTask: (projectId: string, task: Omit<TaskItem, 'id'>) => void;
  toggleTaskStatus: (projectId: string, taskId: string) => void;
  updateMilestoneStatus: (projectId: string, milestoneId: string, status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING') => void;
  postMessage: (projectId: string, content: string) => void;
  
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

const LOCAL_STORAGE_KEY = 'sociosolve_state_v1';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [allUsers, setAllUsers] = useState<User[]>(INITIAL_USERS);
  const [organizations, setOrganizations] = useState<Organization[]>(INITIAL_ORGANIZATIONS);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [solutions, setSolutions] = useState<Solution[]>(INITIAL_SOLUTIONS);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(INITIAL_EVALUATIONS);
  const [impacts, setImpacts] = useState<ImpactMetric[]>(INITIAL_IMPACTS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from LocalStorage on mount
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
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.organizations) setOrganizations(parsed.organizations);
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
  }, []);

  // Save to LocalStorage whenever critical states change
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
        notifications,
        organizations
      }));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [isClient, currentUser, challenges, projects, solutions, evaluations, impacts, notifications, organizations]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast_' + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    const userForRole = allUsers.find(u => u.role === role) || INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(userForRole);
    showToast({
      type: 'info',
      title: `Switched Role to ${role.replace('_', ' ')}`,
      message: `Operating as ${userForRole.name} (${userForRole.organizationName || userForRole.title})`
    });
  };

  // Submit Challenge Flow with AI Analysis
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
      fundingRequired: challengeData.fundingRequired || '₹2,50,000 for local trial pilot',
      submittedBy: {
        userId: currentUser.id,
        userName: currentUser.name,
        organizationName: currentUser.organizationName || 'Community Association',
        userAvatar: currentUser.avatar,
        contactEmail: currentUser.email
      },
      status: 'PENDING_VERIFICATION',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      partnerCount: 0,
      progressPercent: 10,
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

    // Create Notification for Admin
    const adminNotif: Notification = {
      id: 'notif_' + Math.random().toString(36).substr(2, 9),
      userId: 'ALL',
      roleTarget: 'ADMIN',
      title: 'New Challenge Pending Verification',
      message: `"${newChallenge.title}" submitted by ${newChallenge.submittedBy.organizationName}.`,
      type: 'SYSTEM',
      read: false,
      link: `/challenges/${newChallenge.id}`,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [adminNotif, ...prev]);

    showToast({
      type: 'success',
      title: 'Challenge Submitted Successfully',
      message: 'Status is Pending Verification. AI analysis and match profiles generated.'
    });

    return newChallenge;
  };

  // Admin Verification
  const verifyChallenge = (challengeId: string, status: 'PUBLISHED' | 'CHANGES_REQUESTED' | 'REJECTED', notes?: string) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        return {
          ...ch,
          status,
          updatedAt: new Date().toISOString()
        };
      }
      return ch;
    }));

    const ch = challenges.find(c => c.id === challengeId);
    const title = status === 'PUBLISHED' ? 'Challenge Approved & Published' : `Challenge ${status.replace('_', ' ')}`;

    // Add notification to Provider
    if (ch) {
      const notif: Notification = {
        id: 'notif_' + Math.random().toString(36).substr(2, 9),
        userId: ch.submittedBy.userId,
        title: title,
        message: status === 'PUBLISHED' 
          ? `Your challenge "${ch.title}" is now live and open for University & Industry matching!`
          : `Admin note: ${notes || 'Action taken by administration'}`,
        type: 'CHALLENGE_APPROVED',
        read: false,
        link: `/challenges/${ch.id}`,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);
    }

    showToast({
      type: status === 'PUBLISHED' ? 'success' : 'warning',
      title,
      message: `Challenge status updated to ${status}.`
    });
  };

  // Invite Partner Flow
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
        return {
          ...ch,
          matchedPartners: updated,
          updatedAt: new Date().toISOString()
        };
      }
      return ch;
    }));

    // Add Notification to Solution Partner
    const notif: Notification = {
      id: 'notif_' + Math.random().toString(36).substr(2, 9),
      userId: 'ALL',
      roleTarget: 'SOLUTION_PARTNER',
      title: 'Collaboration Invitation Received',
      message: `You have been invited to collaborate on "${challenges.find(c => c.id === challengeId)?.title || 'Challenge'}".`,
      type: 'INVITATION_RECEIVED',
      read: false,
      link: `/challenges/${challengeId}`,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);

    showToast({
      type: 'success',
      title: 'Collaboration Invitation Sent',
      message: `Invited ${org?.name || 'Partner'} to collaborate.`
    });
  };

  // Respond to Invite
  const respondToInvite = (challengeId: string, organizationId: string, accept: boolean) => {
    let targetProject: Project | undefined;
    const ch = challenges.find(c => c.id === challengeId);
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
          status: accept ? ('ACTIVE_COLLABORATION' as const) : c.status,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    if (accept && ch) {
      targetProject = createProjectFromChallenge(challengeId);
    }

    showToast({
      type: accept ? 'success' : 'info',
      title: accept ? 'Partnership Established!' : 'Invitation Declined',
      message: accept 
        ? `${org?.name || 'Partner'} accepted the invitation. Collaboration Workspace created.` 
        : `Declined collaboration invitation.`
    });
  };

  const createProjectFromChallenge = (challengeId: string): Project => {
    const existing = projects.find(p => p.challengeId === challengeId);
    if (existing) return existing;

    const ch = challenges.find(c => c.id === challengeId);
    const newProj: Project = {
      id: 'proj_' + Math.random().toString(36).substr(2, 9),
      challengeId,
      challengeTitle: ch?.title || 'Societal Challenge Workspace',
      name: `${ch?.title || 'Project'} Collaborative Initiative`,
      description: ch?.problemStatement || 'Co-developed prototype and field deployment.',
      status: 'PROTOTYPE_DEV',
      members: [
        {
          userId: currentUser.id,
          name: currentUser.name,
          role: 'Project Contributor',
          organization: currentUser.organizationName || 'Partner',
          avatar: currentUser.avatar
        },
        {
          userId: ch?.submittedBy.userId || 'user_cp_1',
          name: ch?.submittedBy.userName || 'Community Leader',
          role: 'Community Field Sponsor',
          organization: ch?.submittedBy.organizationName || 'Community Association',
          avatar: ch?.submittedBy.userAvatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
        }
      ],
      tasks: [
        {
          id: 'task_init_1',
          title: 'Initial architecture & sensor requirements review',
          assignedTo: {
            name: currentUser.name,
            organization: currentUser.organizationName || 'University Lab',
            avatar: currentUser.avatar
          },
          status: 'IN_PROGRESS',
          dueDate: '2026-10-05',
          priority: 'High'
        },
        {
          id: 'task_init_2',
          title: 'Field site demarcation and local permissions',
          assignedTo: {
            name: ch?.submittedBy.userName || 'Community Lead',
            organization: ch?.submittedBy.organizationName || 'Community Association',
            avatar: ch?.submittedBy.userAvatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
          },
          status: 'TODO',
          dueDate: '2026-10-10',
          priority: 'Medium'
        }
      ],
      milestones: [
        {
          id: 'm_1',
          title: 'Problem Definition & Field Survey',
          description: 'Demarcate pilot test area and baseline requirements.',
          status: 'IN_PROGRESS',
          targetDate: '2026-10-15'
        },
        {
          id: 'm_2',
          title: 'Hardware / Solution Prototype',
          description: 'Build initial functional working model.',
          status: 'UPCOMING',
          targetDate: '2026-10-30'
        },
        {
          id: 'm_3',
          title: 'Pilot Deployment & Evaluation',
          description: 'Controlled field pilot in target community.',
          status: 'UPCOMING',
          targetDate: '2026-11-20'
        }
      ],
      discussions: [
        {
          id: 'msg_init',
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: currentUser.title,
          senderOrg: currentUser.organizationName || 'Partner',
          senderAvatar: currentUser.avatar,
          content: 'Workspace created! Excited to collaborate with the community on deploying this solution.',
          timestamp: new Date().toISOString()
        }
      ],
      documents: [
        {
          id: 'doc_init',
          name: 'Project_Charter_and_Scope.pdf',
          fileType: 'PDF Document',
          size: '1.2 MB',
          uploadedBy: currentUser.name,
          uploadedAt: '2026-09-28'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProjects(prev => [newProj, ...prev]);
    setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, activeProjectId: newProj.id, status: 'ACTIVE_COLLABORATION' } : c));
    return newProj;
  };

  // Workspace Actions
  const addTask = (projectId: string, task: Omit<TaskItem, 'id'>) => {
    const newTask: TaskItem = {
      ...task,
      id: 'task_' + Math.random().toString(36).substr(2, 9)
    };
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          tasks: [...p.tasks, newTask],
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
    showToast({
      type: 'success',
      title: 'Task Created',
      message: `Assigned "${newTask.title}" to ${newTask.assignedTo.name}.`
    });
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
        return {
          ...p,
          tasks: updatedTasks,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  const updateMilestoneStatus = (projectId: string, milestoneId: string, status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING') => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updatedMilestones = p.milestones.map(m => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status,
              completedDate: status === 'COMPLETED' ? new Date().toISOString().split('T')[0] : undefined
            };
          }
          return m;
        });
        return {
          ...p,
          milestones: updatedMilestones,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
    showToast({
      type: 'success',
      title: 'Milestone Updated',
      message: `Milestone status changed to ${status}.`
    });
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
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          discussions: [...p.discussions, newMsg],
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  // Submit Solution Flow
  const submitSolution = (solutionData: Omit<Solution, 'id' | 'submittedAt' | 'status'>) => {
    const newSol: Solution = {
      ...solutionData,
      id: 'sol_' + Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString(),
      status: 'SUBMITTED'
    };

    setSolutions(prev => [newSol, ...prev]);

    // Update challenge and project status
    setChallenges(prev => prev.map(c => {
      if (c.id === newSol.challengeId) {
        return {
          ...c,
          status: 'UNDER_EVALUATION',
          progressPercent: 75,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    setProjects(prev => prev.map(p => {
      if (p.id === newSol.projectId) {
        return {
          ...p,
          status: 'EVALUATION',
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));

    // Notify Experts
    const notif: Notification = {
      id: 'notif_' + Math.random().toString(36).substr(2, 9),
      userId: 'ALL',
      roleTarget: 'EXPERT',
      title: 'New Solution Ready for Evaluation',
      message: `Solution "${newSol.title}" has been submitted for expert panel evaluation.`,
      type: 'SYSTEM',
      read: false,
      link: `/evaluations/${newSol.id}`,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);

    showToast({
      type: 'success',
      title: 'Solution Submitted for Expert Review',
      message: 'Notification dispatched to domain evaluators and scientists.'
    });
  };

  // Submit Expert Evaluation Flow
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

    // Update solution and challenge status
    const isApproved = data.recommendation === 'RECOMMEND_PILOT';
    setSolutions(prev => prev.map(s => {
      if (s.id === data.solutionId) {
        return {
          ...s,
          status: isApproved ? 'PILOT_RECOMMENDED' : 'CHANGES_REQUESTED'
        };
      }
      return s;
    }));

    setChallenges(prev => prev.map(c => {
      if (c.id === data.challengeId) {
        return {
          ...c,
          status: isApproved ? 'PILOT_DEPLOYMENT' : 'UNDER_EVALUATION',
          progressPercent: isApproved ? 85 : 70,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    setProjects(prev => prev.map(p => {
      if (p.challengeId === data.challengeId) {
        return {
          ...p,
          status: isApproved ? 'PILOT_DEPLOYMENT' : 'PROTOTYPE_DEV',
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));

    // Notify Provider and Partners
    const notif: Notification = {
      id: 'notif_' + Math.random().toString(36).substr(2, 9),
      userId: 'ALL',
      title: isApproved ? 'Pilot Recommended by Expert Evaluator' : 'Evaluation Feedback Received',
      message: `${currentUser.name} rated the solution ${overallScore}/5.0: "${data.comments.slice(0, 80)}..."`,
      type: 'EVALUATION_COMPLETED',
      read: false,
      link: `/impact`,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);

    showToast({
      type: isApproved ? 'success' : 'warning',
      title: isApproved ? 'Pilot Recommended!' : 'Feedback Submitted',
      message: `Score: ${overallScore}/5.0. Project advanced to ${isApproved ? 'Pilot Deployment' : 'Refinement'}.`
    });
  };

  const updateImpactMetrics = (impactId: string, newBeneficiaries: number, newSavings: number) => {
    setImpacts(prev => prev.map(imp => {
      if (imp.id === impactId) {
        return {
          ...imp,
          farmersOrBeneficiariesReached: newBeneficiaries,
          costSavingsINR: newSavings,
          lastUpdated: new Date().toISOString()
        };
      }
      return imp;
    }));
    showToast({
      type: 'success',
      title: 'Impact Metrics Updated',
      message: `Beneficiaries: ${newBeneficiaries.toLocaleString()} | Cost Savings: ₹${(newSavings / 100000).toFixed(1)}L`
    });
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notifications marked as read.'
    });
  };

  const resetDemoData = () => {
    setCurrentUser(INITIAL_USERS[0]);
    setAllUsers(INITIAL_USERS);
    setOrganizations(INITIAL_ORGANIZATIONS);
    setChallenges(INITIAL_CHALLENGES);
    setProjects(INITIAL_PROJECTS);
    setSolutions(INITIAL_SOLUTIONS);
    setEvaluations(INITIAL_EVALUATIONS);
    setImpacts(INITIAL_IMPACTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    showToast({
      type: 'info',
      title: 'Demo State Reset',
      message: 'Reset back to initial pristine demo state.'
    });
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      switchRole,
      allUsers,
      organizations,
      challenges,
      projects,
      solutions,
      evaluations,
      impacts,
      notifications,
      stats: PLATFORM_STATS,
      submitChallenge,
      verifyChallenge,
      invitePartner,
      respondToInvite,
      createProjectFromChallenge,
      addTask,
      toggleTaskStatus,
      updateMilestoneStatus,
      postMessage,
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
