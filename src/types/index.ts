export type UserRole = 'CHALLENGE_PROVIDER' | 'SOLUTION_PARTNER' | 'EXPERT' | 'ADMIN';

export type OrganizationType = 'UNIVERSITY' | 'INDUSTRY' | 'STARTUP' | 'NGO' | 'COMMUNITY' | 'GOVERNMENT_BODY' | 'RESEARCH_INSTITUTE';

export type ChallengeStatus = 
  | 'PENDING_VERIFICATION'
  | 'CHANGES_REQUESTED'
  | 'PUBLISHED'
  | 'ACTIVE_MATCHING'
  | 'ACTIVE_COLLABORATION'
  | 'SOLUTION_SUBMITTED'
  | 'UNDER_EVALUATION'
  | 'PILOT_DEPLOYMENT'
  | 'COMPLETED'
  | 'REJECTED';

export type ChallengeCategory = 
  | 'Agriculture'
  | 'Healthcare'
  | 'Education'
  | 'Environment'
  | 'Accessibility'
  | 'Women & Child Welfare'
  | 'Rural Development'
  | 'Public Infrastructure'
  | 'Employment'
  | 'Digital Inclusion'
  | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  organizationId?: string;
  organizationName?: string;
  location: string;
  skills?: string[];
  verificationStatus: 'VERIFIED' | 'PENDING' | 'UNVERIFIED';
}

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  tagline: string;
  description: string;
  logo: string;
  location: string;
  skills: string[];
  resources: string[];
  website: string;
  researchersCount?: number;
  projectsCompleted?: number;
  verificationStatus: 'VERIFIED' | 'PENDING';
  collaborationInterests: string[];
}

export interface AIAnalysisResult {
  detectedCategory: string;
  subcategories: string[];
  extractedSkills: string[];
  requiredResources: string[];
  estimatedImpactScore: number; // 0 - 100
  impactSummary: string;
  suggestedProjectTypes: string[];
  potentialCollaborators: string[];
  similarChallenges: {
    id: string;
    title: string;
    location: string;
    similarityScore: number; // e.g. 78%
  }[];
}

export interface Challenge {
  id: string;
  title: string;
  problemStatement: string;
  whyItMatters: string;
  targetDemographic: string;
  peopleAffected: number;
  peopleAffectedLabel: string;
  location: {
    state: string;
    district: string;
    villageOrCity: string;
    coordinates?: [number, number];
  };
  category: ChallengeCategory;
  subcategories: string[];
  priority: 'High' | 'Medium' | 'Low';
  skillsRequired: string[];
  resourcesRequired: string[];
  equipmentRequired?: string[];
  fundingRequired?: string;
  attachments?: { name: string; type: string; size: string; url?: string }[];
  submittedBy: {
    userId: string;
    userName: string;
    organizationName: string;
    userAvatar: string;
    contactEmail: string;
  };
  status: ChallengeStatus;
  createdAt: string;
  updatedAt: string;
  aiAnalysis?: AIAnalysisResult;
  partnerCount: number;
  progressPercent: number;
  matchedPartners?: {
    organizationId: string;
    matchScore: number;
    matchReasons: string[];
    status: 'INVITED' | 'ACCEPTED' | 'DECLINED' | 'EXPLORING';
  }[];
  activeProjectId?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  assignedTo: {
    name: string;
    organization: string;
    avatar: string;
  };
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface MilestoneItem {
  id: string;
  title: string;
  description: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
  targetDate: string;
  completedDate?: string;
}

export interface ProjectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  senderOrg: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface ProjectDocument {
  id: string;
  name: string;
  fileType: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Project {
  id: string;
  challengeId: string;
  challengeTitle: string;
  name: string;
  description: string;
  status: 'PROTOTYPE_DEV' | 'EVALUATION' | 'PILOT_DEPLOYMENT' | 'COMPLETED';
  members: {
    userId: string;
    name: string;
    role: string;
    organization: string;
    avatar: string;
  }[];
  tasks: TaskItem[];
  milestones: MilestoneItem[];
  discussions: ProjectMessage[];
  documents: ProjectDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface Solution {
  id: string;
  projectId: string;
  challengeId: string;
  title: string;
  problemAddressed: string;
  proposedSolution: string;
  technologyUsed: string[];
  expectedImpact: string;
  estimatedCost: string;
  scalability: string;
  sustainability: string;
  implementationPlan: string;
  prototypeUrl?: string;
  submittedAt: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'PILOT_RECOMMENDED' | 'CHANGES_REQUESTED' | 'APPROVED';
}

export interface EvaluationCriteria {
  problemRelevance: number; // 1 - 5
  technicalFeasibility: number;
  socialImpact: number;
  costFeasibility: number;
  scalability: number;
  sustainability: number;
  implementationReadiness: number;
}

export interface Evaluation {
  id: string;
  solutionId: string;
  challengeId: string;
  expert: {
    id: string;
    name: string;
    domain: string;
    avatar: string;
    organization: string;
  };
  criteria: EvaluationCriteria;
  overallScore: number;
  comments: string;
  recommendation: 'RECOMMEND_PILOT' | 'REQUEST_CHANGES' | 'NEEDS_REFINEMENT' | 'REJECT';
  createdAt: string;
}

export interface ImpactMetric {
  id: string;
  projectId: string;
  challengeId: string;
  challengeTitle: string;
  location: string;
  farmersOrBeneficiariesReached: number;
  villagesCovered: number;
  resourceSavingsPercentage: number;
  resourceMetricLabel: string;
  costSavingsINR: number;
  beforeValue: string;
  afterValue: string;
  progressTimeline: {
    month: string;
    beneficiaries: number;
    resourceSaved: number;
  }[];
  isDemoReported: boolean;
  lastUpdated: string;
}

export interface Notification {
  id: string;
  userId: string; // or 'ALL'
  roleTarget?: UserRole;
  title: string;
  message: string;
  type: 'CHALLENGE_APPROVED' | 'INVITATION_RECEIVED' | 'MESSAGE_POSTED' | 'EVALUATION_COMPLETED' | 'MILESTONE_UPDATED' | 'SYSTEM';
  read: boolean;
  link?: string;
  createdAt: string;
}
