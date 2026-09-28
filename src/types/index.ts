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
  bio?: string;
  organizationId?: string;
  organizationName?: string;
  location: string;
  skills?: string[];
  interests?: string[];
  connectionsCount?: number;
  followersCount?: number;
  projectsContributed?: number;
  challengesSubmitted?: number;
  impactScore?: number;
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
    similarityScore: number;
  }[];
}

export interface PostComment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorOrg: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface InterestedUser {
  userId: string;
  name: string;
  role: UserRole;
  organizationName: string;
  avatar: string;
  skills: string[];
  expressedAt: string;
  type: 'STUDENT' | 'INDUSTRY' | 'RESEARCHER' | 'NGO' | 'EXPERT';
}

export interface CoCreateIdeaNode {
  id: string;
  challengeId: string;
  parentId?: string;
  title: string;
  description: string;
  author: {
    userId: string;
    name: string;
    avatar: string;
    org: string;
  };
  createdAt: string;
  likesCount?: number;
}

export interface SkillContribution {
  id: string;
  challengeId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userOrg: string;
  skills: string[];
  createdAt: string;
}

export interface IntroducedPartner {
  id: string;
  challengeId: string;
  targetId: string;
  targetName: string;
  targetType: string;
  targetAvatar: string;
  recommendedBy: string;
  reason: string;
  createdAt: string;
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
  likesCount?: number;
  hasLiked?: boolean;
  comments?: PostComment[];
  interestedUsers?: InterestedUser[];
  hasExpressedInterest?: boolean;
  isSaved?: boolean;
  matchedPartners?: {
    organizationId: string;
    matchScore: number;
    matchReasons: string[];
    status: 'INVITED' | 'ACCEPTED' | 'DECLINED' | 'EXPLORING';
  }[];
  activeProjectId?: string;

  // Co-Create Summary Metrics & Collections
  coCreatorsCount?: number;
  ideasCount?: number;
  skillContributorsCount?: number;
  ideaNodes?: CoCreateIdeaNode[];
  skillContributions?: SkillContribution[];
  introductions?: IntroducedPartner[];
}

export interface SolutionIdea {
  id: string;
  challengeId?: string;
  challengeTitle?: string;
  parentId?: string;
  title: string;
  summary: string;
  author: {
    userId: string;
    name: string;
    organization: string;
    avatar: string;
  };
  technology: string[];
  likesCount: number;
  hasLiked?: boolean;
  comments: PostComment[];
  createdAt: string;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  projectTitle: string;
  author: {
    userId: string;
    name: string;
    role: string;
    avatar: string;
  };
  title: string;
  content: string;
  metricsHighlight?: string;
  likesCount: number;
  hasLiked?: boolean;
  comments: PostComment[];
  createdAt: string;
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
  sourceIdeaId?: string;
  sourceDecisionId?: string;
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
  url?: string;
}

export interface WorkspaceOpinion {
  support: number;
  needDiscussion: number;
  concern: number;
  userVote?: 'support' | 'needDiscussion' | 'concern';
  comments?: { userName: string; text: string; choice: string; time: string }[];
}

export interface WorkspaceDiscussion {
  id: string;
  projectId: string;
  type: 'IDEA' | 'OPINION' | 'QUESTION' | 'CONCERN' | 'UPDATE' | 'RESOURCE' | 'HELP';
  title?: string;
  content: string;
  author: {
    userId: string;
    name: string;
    avatar: string;
    role: string;
    org: string;
  };
  opinions?: WorkspaceOpinion;
  decisionId?: string;
  convertedToTaskId?: string;
  replies?: PostComment[];
  createdAt: string;
}

export interface WorkspaceDecision {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  options: { id: string; text: string; votesCount: number }[];
  status: 'OPEN' | 'DECIDED';
  selectedOptionId?: string;
  selectedOptionText?: string;
  decisionReason?: string;
  userVotedOptionId?: string;
  createdAt: string;
  decidedAt?: string;
}

export interface SolutionCanvasCard {
  id: string;
  projectId: string;
  section: 'problem' | 'users' | 'currentApproach' | 'ideas' | 'proposedSolution' | 'technology' | 'risks' | 'expectedImpact';
  text: string;
  authorName: string;
  createdAt: string;
}

export interface TeamPulseItem {
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  status: 'ON_TRACK' | 'NEED_HELP' | 'BLOCKED';
  needText?: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  challengeId: string;
  challengeTitle: string;
  name: string;
  description: string;
  status: 'PROTOTYPE_DEV' | 'EVALUATION' | 'PILOT_DEPLOYMENT' | 'COMPLETED';
  stageLabel?: string;
  progressPercent: number;
  members: {
    userId: string;
    name: string;
    role: string;
    organization: string;
    avatar: string;
    focusArea?: string;
  }[];
  tasks: TaskItem[];
  milestones: MilestoneItem[];
  discussions: ProjectMessage[];
  documents: ProjectDocument[];
  
  // Workspace specific rich entities
  workspaceDiscussions?: WorkspaceDiscussion[];
  workspaceDecisions?: WorkspaceDecision[];
  canvasCards?: SolutionCanvasCard[];
  teamPulse?: TeamPulseItem[];
  
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
  problemRelevance: number;
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
  userId: string;
  roleTarget?: UserRole;
  title: string;
  message: string;
  type: 'CHALLENGE_APPROVED' | 'INVITATION_RECEIVED' | 'MESSAGE_POSTED' | 'EVALUATION_COMPLETED' | 'MILESTONE_UPDATED' | 'INTEREST_EXPRESSED' | 'CONNECTED' | 'SYSTEM' | 'CO_CREATE_IDEA' | 'CO_CREATE_SKILL' | 'DECISION_MADE';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface DirectMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  type: 'DIRECT' | 'PROJECT';
  title: string;
  subtitle: string;
  avatar: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  participants: string[];
}
