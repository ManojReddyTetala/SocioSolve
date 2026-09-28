import { 
  User, 
  Organization, 
  Challenge, 
  Project, 
  Solution, 
  Evaluation, 
  ImpactMetric, 
  Notification, 
  SolutionIdea, 
  ProjectUpdate,
  Conversation,
  DirectMessage,
  CoCreateIdeaNode,
  SkillContribution,
  IntroducedPartner,
  WorkspaceDiscussion,
  WorkspaceDecision,
  SolutionCanvasCard,
  TeamPulseItem
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_cp_1',
    name: 'Suryanarayana Raju',
    email: 'water.association@eastgodavari.org',
    role: 'CHALLENGE_PROVIDER',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    title: 'Lead Coordinator • Grassroots Water Rights Advocate',
    bio: 'Championing sustainable water access and precision irrigation for 5,000+ smallholder farmers in the Godavari delta basin.',
    organizationId: 'org_cp_1',
    organizationName: 'East Godavari Farmer & Water Association',
    location: 'East Godavari, Andhra Pradesh',
    skills: ['Community Mobilization', 'Water Management', 'Agronomy', 'Paddy Cultivation'],
    interests: ['Smart Irrigation', 'Groundwater Conservation', 'Solar Pumping', 'Farmer Tech'],
    connectionsCount: 342,
    followersCount: 1280,
    projectsContributed: 4,
    challengesSubmitted: 2,
    impactScore: 94,
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'user_sp_1',
    name: 'Dr. Ramesh K. Varma',
    email: 'r.varma@abcu.edu.in',
    role: 'SOLUTION_PARTNER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Professor & Head of IoT, Embedded Systems & Edge ML Lab',
    bio: 'Dedicated to deploying frugal IoT and predictive Edge AI telemetry systems for rural agrarian and healthcare challenges.',
    organizationId: 'org_sp_1',
    organizationName: 'ABC Engineering University',
    location: 'Visakhapatnam, Andhra Pradesh',
    skills: ['IoT', 'Machine Learning', 'Embedded Systems', 'Agriculture Tech', 'Computer Vision'],
    interests: ['Rural Telemetry', 'Soil Sensors', 'Frugal Innovation', 'Edge AI'],
    connectionsCount: 512,
    followersCount: 3400,
    projectsContributed: 19,
    challengesSubmitted: 1,
    impactScore: 98,
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'user_sp_2',
    name: 'Pooja Hegde',
    email: 'pooja.h@agritechsolutions.io',
    role: 'SOLUTION_PARTNER',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'CTO & Co-Founder, AgriTech Solutions',
    bio: 'Building low-cost solar LoRaWAN capacitive soil moisture sensors and telemetry infrastructure for Indian agriculture.',
    organizationId: 'org_sp_2',
    organizationName: 'AgriTech Solutions',
    location: 'Hyderabad, Telangana',
    skills: ['Soil Moisture Sensors', 'Predictive Analytics', 'IoT Hardware', 'Mobile App Development'],
    interests: ['Precision Agriculture', 'LoRaWAN Networks', 'Hardware Prototyping'],
    connectionsCount: 420,
    followersCount: 2150,
    projectsContributed: 11,
    challengesSubmitted: 0,
    impactScore: 91,
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'user_exp_1',
    name: 'Dr. Meenakshi Sundaram',
    email: 'm.sundaram@icar.gov.in',
    role: 'EXPERT',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    title: 'Senior Agricultural Scientist & Water Resource Evaluator',
    bio: 'Evaluating agricultural technology innovations, field pilot feasibility, and sustainable natural resource management for ICAR.',
    organizationId: 'org_exp_1',
    organizationName: 'National Agronomy Council / ICAR',
    location: 'New Delhi / Hyderabad',
    skills: ['Agronomy', 'Irrigation Systems', 'Impact Assessment', 'Social Feasibility', 'Peer Evaluation'],
    interests: ['Sustainable Farming', 'Water Resource Policy', 'Agricultural R&D'],
    connectionsCount: 680,
    followersCount: 4900,
    projectsContributed: 35,
    challengesSubmitted: 0,
    impactScore: 99,
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'user_admin_1',
    name: 'Ananya Sharma',
    email: 'admin@sociosolve.gov.in',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'National Platform Lead • SocioSolve Governance',
    bio: 'Connecting grassroots societal problem statements with national university research labs and industry solvers.',
    organizationName: 'SocioSolve Central Governance',
    location: 'New Delhi',
    skills: ['Platform Governance', 'Public Policy', 'Societal Impact', 'Innovation Ecosystems'],
    interests: ['Smart India Hackathon', 'Public Good Tech', 'Cross-State Innovation'],
    connectionsCount: 920,
    followersCount: 8500,
    projectsContributed: 128,
    challengesSubmitted: 0,
    impactScore: 100,
    verificationStatus: 'VERIFIED',
  }
];

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 'org_cp_1',
    name: 'East Godavari Farmer & Water Association',
    type: 'COMMUNITY',
    tagline: 'Empowering 5,000+ smallholder paddy and sugarcane farming families in the Godavari delta.',
    description: 'A registered grassroots association representing smallholder paddy, sugarcane, and horticultural farmers across 14 rural mandals.',
    logo: '🌾',
    location: 'East Godavari, Andhra Pradesh',
    skills: ['Community Mobilization', 'Field Access', 'Crop Knowledge', 'Local Governance'],
    resources: ['Direct access to 400+ acres for field pilots', '12 Local training centers', 'Community trust'],
    website: 'https://eastgodavarifarmers.org',
    projectsCompleted: 4,
    verificationStatus: 'VERIFIED',
    collaborationInterests: ['Water Conservation', 'Smart Irrigation', 'Pest Surveillance', 'Solar Pumping']
  },
  {
    id: 'org_sp_1',
    name: 'ABC Engineering University',
    type: 'UNIVERSITY',
    tagline: 'Center of Excellence in Rural IoT, Edge AI & Embedded Systems Prototyping.',
    description: 'Premier engineering and research institution with specialized labs in agricultural telemetry, sensor networks, and edge ML compute.',
    logo: '🏛️',
    location: 'Visakhapatnam, Andhra Pradesh',
    skills: ['IoT', 'Machine Learning', 'Embedded Systems', 'Agriculture Technology', 'Computer Vision'],
    resources: ['IoT Prototyping Cleanroom Lab', '42 PhD Scholars', 'AI Compute Cluster (NVIDIA A100)', 'Field telemetry mobile van'],
    website: 'https://abcu.edu.in/innovation',
    researchersCount: 42,
    projectsCompleted: 19,
    verificationStatus: 'VERIFIED',
    collaborationInterests: ['Rural Tech', 'Smart Agriculture', 'Water Optimization', 'Smart Infrastructure']
  },
  {
    id: 'org_sp_2',
    name: 'AgriTech Solutions',
    type: 'STARTUP',
    tagline: 'Solar-powered LoRaWAN soil moisture sensors and telemetry hardware.',
    description: 'An agri-deeptech startup specializing in solar-powered LoRaWAN soil moisture probes and automated valve actuators.',
    logo: '🌱',
    location: 'Hyderabad, Telangana',
    skills: ['Soil Moisture Sensors', 'Predictive Irrigation', 'IoT Hardware', 'Mobile Development', 'Field Deployment'],
    resources: ['Hardware manufacturing line', 'Field installation team in AP/TS', 'Cloud telemetry platform'],
    website: 'https://agritechsolutions.io',
    projectsCompleted: 11,
    verificationStatus: 'VERIFIED',
    collaborationInterests: ['Precision Agriculture', 'Water Management', 'Solar Irrigation']
  },
  {
    id: 'org_sp_3',
    name: 'Andhra Agricultural University',
    type: 'UNIVERSITY',
    tagline: 'Pioneering crop science, soil telemetry, and drought-resistant agronomy.',
    description: 'State agricultural university with 8 regional research stations and extensive crop agronomy field datasets.',
    logo: '🌾',
    location: 'Guntur, Andhra Pradesh',
    skills: ['Agronomy', 'Soil Science', 'Crop Pathology', 'Irrigation Scheduling'],
    resources: ['Soil chemistry laboratory', 'Agronomy experimental farms', 'Extension worker network'],
    website: 'https://aau.res.in',
    researchersCount: 65,
    projectsCompleted: 28,
    verificationStatus: 'VERIFIED',
    collaborationInterests: ['Soil Health', 'Drought-Resistant Crops', 'Precision Water Management']
  },
  {
    id: 'org_sp_4',
    name: 'GreenCycle Industries',
    type: 'INDUSTRY',
    tagline: 'Decentralized sustainable waste processing and circular recycling systems.',
    description: 'Leading industrial partner providing CSR grant funding, automated recycling equipment, and supply chain logistics.',
    logo: '♻️',
    location: 'Bengaluru, Karnataka',
    skills: ['Material Science', 'Waste Sorting AI', 'Supply Chain Logistics', 'Industrial Scale-up'],
    resources: ['CSR Sustainability Grant Fund (₹50L)', 'Automated shredding units', 'Recycling plants'],
    website: 'https://greencycleind.com',
    projectsCompleted: 15,
    verificationStatus: 'VERIFIED',
    collaborationInterests: ['Plastic Waste', 'Urban Cleanliness', 'E-Waste Recycling']
  },
  {
    id: 'org_sp_5',
    name: 'Rural Health Foundation',
    type: 'NGO',
    tagline: 'Delivering affordable primary healthcare and telemedicine vans to tribal hamlets.',
    description: 'Grassroots health organization operating mobile diagnostic vans and community nurse networks across 80+ tribal villages.',
    logo: '🩺',
    location: 'Rajahmundry, Andhra Pradesh',
    skills: ['Telemedicine', 'Community Healthcare', 'Diagnostic Screening', 'Public Health Policy'],
    resources: ['3 Mobile clinical vans', '45 Trained auxiliary nurses', 'Point-of-care test kits'],
    website: 'https://ruralhealthfoundation.org',
    projectsCompleted: 9,
    verificationStatus: 'VERIFIED',
    collaborationInterests: ['Remote Diagnostics', 'Maternal Health', 'Nutrition Tracking']
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch_smart_irrigation',
    title: 'Smart Irrigation for Rural Farmers',
    problemStatement: 'Farmers in rural East Godavari rely on fixed, manual irrigation schedules, resulting in unnecessary groundwater consumption (up to 40% excess) and inflated electricity/diesel pumping costs during dry seasons.',
    whyItMatters: 'Groundwater depletion is threatening the livelihoods of 5,000+ farming families. Excessive flooding also leaches vital soil nutrients and cuts paddy and crop yields by 15-20%.',
    targetDemographic: 'Small and marginal paddy, sugarcane, and maize farmers',
    peopleAffected: 5000,
    peopleAffectedLabel: '5,000+ farmers',
    location: {
      state: 'Andhra Pradesh',
      district: 'East Godavari',
      villageOrCity: 'Mandapeta & Rajahmundry Mandals',
      coordinates: [16.9891, 82.2475]
    },
    category: 'Agriculture',
    subcategories: ['Water Conservation', 'Smart Farming', 'IoT & Rural Tech'],
    priority: 'High',
    skillsRequired: ['IoT', 'Machine Learning', 'Embedded Systems', 'Agriculture', 'Mobile Development'],
    resourcesRequired: ['Soil moisture telemetry sensors', 'Field testing access (paddy/maize plots)', 'Agricultural extension guidance', 'Low-cost solar telemetry controllers'],
    equipmentRequired: ['Capacitive soil moisture sensors', 'LoRaWAN gateway', 'Microcontroller boards (ESP32/STM32)'],
    fundingRequired: '₹3,50,000 for 10-farm pilot setup',
    submittedBy: {
      userId: 'user_cp_1',
      userName: 'Suryanarayana Raju',
      organizationName: 'East Godavari Farmer & Water Association',
      userAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
      contactEmail: 'water.association@eastgodavari.org'
    },
    status: 'PILOT_DEPLOYMENT',
    createdAt: '2026-09-10T09:30:00Z',
    updatedAt: '2026-09-27T16:00:00Z',
    partnerCount: 3,
    progressPercent: 78,
    activeProjectId: 'proj_smart_irrigation',
    likesCount: 38,
    hasLiked: true,
    hasExpressedInterest: true,
    isSaved: true,
    comments: [
      {
        id: 'c1',
        authorId: 'user_sp_1',
        authorName: 'Dr. Ramesh K. Varma',
        authorRole: 'Professor & IoT Lab Lead',
        authorOrg: 'ABC Engineering University',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'Our lab has developed a low-cost dual-depth capacitive probe running on solar mini-panels. We would love to collaborate on field testing in Mandapeta.',
        createdAt: '2026-09-11T14:20:00Z',
        likes: 12
      },
      {
        id: 'c2',
        authorId: 'user_sp_2',
        authorName: 'Pooja Hegde',
        authorRole: 'CTO',
        authorOrg: 'AgriTech Solutions',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        content: 'We can provide 20 weatherproof LoRa gateways and automated solenoid valves for the pilot free of cost.',
        createdAt: '2026-09-12T09:45:00Z',
        likes: 8
      }
    ],
    interestedUsers: [
      {
        userId: 'user_sp_1',
        name: 'Dr. Ramesh K. Varma',
        role: 'SOLUTION_PARTNER',
        organizationName: 'ABC Engineering University',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        skills: ['IoT', 'ML', 'Embedded Systems'],
        expressedAt: '2026-09-11T12:00:00Z',
        type: 'RESEARCHER'
      },
      {
        userId: 'user_sp_2',
        name: 'Pooja Hegde',
        role: 'SOLUTION_PARTNER',
        organizationName: 'AgriTech Solutions',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        skills: ['Soil Moisture Sensors', 'IoT Hardware'],
        expressedAt: '2026-09-12T08:30:00Z',
        type: 'INDUSTRY'
      },
      {
        userId: 'user_stud_1',
        name: 'Kavitha Narayanan',
        role: 'SOLUTION_PARTNER',
        organizationName: 'Student Innovator • IIIT-H',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        skills: ['React Native', 'Vernacular Voice AI', 'FastAPI'],
        expressedAt: '2026-09-13T10:15:00Z',
        type: 'STUDENT'
      }
    ],
    aiAnalysis: {
      detectedCategory: 'Agriculture',
      subcategories: ['Water Conservation', 'Smart Farming', 'Edge AI'],
      extractedSkills: ['IoT', 'Machine Learning', 'Embedded Systems', 'Agriculture', 'Mobile Development'],
      requiredResources: ['Soil moisture sensors', 'LoRaWAN telemetry network', 'Farmer mobile alert app', 'Pilot agricultural testing acreage'],
      estimatedImpactScore: 92,
      impactSummary: 'High societal and environmental significance. Potential 18-30% water savings and ~₹2,000/acre input cost reduction across Godavari basin.',
      suggestedProjectTypes: ['Sensor-based field monitoring', 'Predictive crop irrigation scheduling engine', 'SMS/Voice vernacular alerts'],
      potentialCollaborators: ['ABC Engineering University', 'AgriTech Solutions', 'Andhra Agricultural University'],
      similarChallenges: [
        {
          id: 'ch_sim_1',
          title: 'Smart Water Management for Farmers in Krishna Delta',
          location: 'Andhra Pradesh',
          similarityScore: 78
        },
        {
          id: 'ch_sim_2',
          title: 'IoT-based Irrigation Monitoring & Canal Sluice Automation',
          location: 'Telangana',
          similarityScore: 64
        }
      ]
    },
    matchedPartners: [
      {
        organizationId: 'org_sp_1',
        matchScore: 94,
        matchReasons: ['Expertise in IoT & embedded telemetry', 'Active ML research lab with edge compute', 'Experience with rural field trials in AP'],
        status: 'ACCEPTED'
      },
      {
        organizationId: 'org_sp_2',
        matchScore: 89,
        matchReasons: ['Proven commercial-grade soil moisture hardware', 'LoRaWAN field deployment capability', 'Dedicated mobile app stack'],
        status: 'ACCEPTED'
      },
      {
        organizationId: 'org_sp_3',
        matchScore: 82,
        matchReasons: ['Extensive soil science & agronomy dataset', 'Field validation protocol expertise'],
        status: 'ACCEPTED'
      }
    ],
    coCreatorsCount: 8,
    ideasCount: 3,
    skillContributorsCount: 5,
    ideaNodes: [
      {
        id: 'node_1',
        challengeId: 'ch_smart_irrigation',
        title: 'Solar-Assisted LoRaWAN Telemetry Nodes',
        description: 'Deploy low-power dual-depth capacitive sensors paired with a solar transmitter to collect volumetric water content every 15 minutes.',
        author: {
          userId: 'user_sp_1',
          name: 'Dr. Ramesh K. Varma',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          org: 'ABC Engineering University'
        },
        createdAt: '2026-09-12T10:00:00Z',
        likesCount: 14
      },
      {
        id: 'node_2',
        challengeId: 'ch_smart_irrigation',
        parentId: 'node_1',
        title: 'Vernacular Telugu Voice/SMS Automated Trigger',
        description: 'Build upon Node #1 by routing telemetry thresholds into an IVR call server that speaks the exact recommended diesel pump hours in Telugu.',
        author: {
          userId: 'user_stud_1',
          name: 'Kavitha Narayanan',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          org: 'IIIT Hyderabad'
        },
        createdAt: '2026-09-13T14:30:00Z',
        likesCount: 9
      },
      {
        id: 'node_3',
        challengeId: 'ch_smart_irrigation',
        parentId: 'node_1',
        title: 'Community Solar Gateway Multi-Tenant Relay',
        description: 'Install one high-gain omnidirectional antenna on the Gram Panchayat water tank so 200+ farm plots share one single uplink.',
        author: {
          userId: 'user_sp_2',
          name: 'Pooja Hegde',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          org: 'AgriTech Solutions'
        },
        createdAt: '2026-09-14T09:15:00Z',
        likesCount: 11
      }
    ],
    skillContributions: [
      {
        id: 'sk_1',
        challengeId: 'ch_smart_irrigation',
        userId: 'user_sp_1',
        userName: 'Dr. Ramesh K. Varma',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        userOrg: 'ABC Engineering University',
        skills: ['Embedded C', 'LoRaWAN', 'Edge ML', 'Telemetry'],
        createdAt: '2026-09-11T12:00:00Z'
      },
      {
        id: 'sk_2',
        challengeId: 'ch_smart_irrigation',
        userId: 'user_sp_2',
        userName: 'Pooja Hegde',
        userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        userOrg: 'AgriTech Solutions',
        skills: ['Hardware Prototyping', 'PCB Design', 'Solar Enclosures'],
        createdAt: '2026-09-12T08:30:00Z'
      },
      {
        id: 'sk_3',
        challengeId: 'ch_smart_irrigation',
        userId: 'user_stud_1',
        userName: 'Kavitha Narayanan',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        userOrg: 'IIIT Hyderabad',
        skills: ['Voice AI', 'Telugu NLP', 'FastAPI Backend'],
        createdAt: '2026-09-13T10:15:00Z'
      }
    ],
    introductions: [
      {
        id: 'intro_1',
        challengeId: 'ch_smart_irrigation',
        targetId: 'org_sp_1',
        targetName: 'ABC Engineering University',
        targetType: 'University Lab',
        targetAvatar: '🏛️',
        recommendedBy: 'Suryanarayana Raju',
        reason: 'Leading IoT & Agronomy research lab with field van in Godavari delta.',
        createdAt: '2026-09-11T09:00:00Z'
      }
    ]
  },
  {
    id: 'ch_rural_healthcare',
    title: 'Rural Remote Healthcare & Diagnostic Triage',
    problemStatement: 'Tribal hamlets in Alluri Sitharama Raju district are located 40+ km away from the nearest Community Health Centre, causing tragic delays in maternal screening and hypertension triage.',
    whyItMatters: 'Over 12,000 tribal residents lack access to basic vitals screening, leading to high complication rates in high-risk pregnancies.',
    targetDemographic: 'Tribal residents, pregnant women, and elderly villagers',
    peopleAffected: 12000,
    peopleAffectedLabel: '12,000+ residents',
    location: {
      state: 'Andhra Pradesh',
      district: 'Alluri Sitharama Raju',
      villageOrCity: 'Paderu & Rampachodavaram Hamlets',
      coordinates: [18.0833, 82.6667]
    },
    category: 'Healthcare',
    subcategories: ['Telemedicine', 'Diagnostic AI', 'Maternal Health'],
    priority: 'High',
    skillsRequired: ['Telemedicine', 'Edge AI', 'Mobile Development', 'Biomedical Sensors', 'Public Health'],
    resourcesRequired: ['Portable diagnostic kits', 'Offline-first mobile software', 'Local health worker training'],
    submittedBy: {
      userId: 'user_cp_2',
      userName: 'Dr. Sudha Reddy',
      organizationName: 'Rural Health Foundation',
      userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      contactEmail: 'contact@ruralhealthfoundation.org'
    },
    status: 'ACTIVE_COLLABORATION',
    createdAt: '2026-09-14T11:20:00Z',
    updatedAt: '2026-09-26T10:00:00Z',
    partnerCount: 2,
    progressPercent: 45,
    activeProjectId: 'proj_rural_healthcare',
    likesCount: 24,
    hasLiked: false,
    hasExpressedInterest: false,
    comments: [],
    interestedUsers: [
      {
        userId: 'user_sp_1',
        name: 'Dr. Ramesh K. Varma',
        role: 'SOLUTION_PARTNER',
        organizationName: 'ABC Engineering University',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        skills: ['Edge AI', 'Biomedical Sensors'],
        expressedAt: '2026-09-16T11:00:00Z',
        type: 'RESEARCHER'
      }
    ]
  },
  {
    id: 'ch_plastic_waste',
    title: 'Decentralized Plastic Waste Collection & Upcycling',
    problemStatement: 'Over 8 tons of single-use multi-layer plastic waste accumulates monthly in coastal pilgrimage hubs without municipal collection, resulting in open burning and beach pollution.',
    whyItMatters: 'Toxic dioxin emissions severely degrade air quality and wash microplastics into coastal fish breeding estuaries.',
    targetDemographic: '18 coastal and temple village communities',
    peopleAffected: 25000,
    peopleAffectedLabel: '25,000+ citizens',
    location: {
      state: 'Andhra Pradesh',
      district: 'Kakinada',
      villageOrCity: 'Annavaram & Coastal belt',
      coordinates: [17.2798, 82.4042]
    },
    category: 'Environment',
    subcategories: ['Waste Management', 'Circular Economy', 'Clean Energy'],
    priority: 'Medium',
    skillsRequired: ['Material Science', 'Computer Vision Sorting', 'Supply Chain Logistics', 'Mechanical Engineering'],
    resourcesRequired: ['Plastic shredders', 'Community collection bins', 'Recycler buyback contracts'],
    submittedBy: {
      userId: 'user_cp_3',
      userName: 'K. Venkat Rao',
      organizationName: 'Swachh Coastal Youth Forum',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      contactEmail: 'swachh.coastal@gmail.com'
    },
    status: 'PUBLISHED',
    createdAt: '2026-09-18T14:15:00Z',
    updatedAt: '2026-09-22T08:00:00Z',
    partnerCount: 1,
    progressPercent: 20,
    likesCount: 19,
    hasLiked: false,
    hasExpressedInterest: false,
    comments: []
  },
  {
    id: 'ch_digital_literacy',
    title: 'Vernacular Digital Literacy Platform for Rural Schools',
    problemStatement: 'Rural government primary school students fall behind in STEM foundational skills due to English-only digital tools and erratic internet connectivity.',
    whyItMatters: 'Over 8,500 children across 42 ZP schools risk severe learning poverty and exclusion from future high-skill opportunities.',
    targetDemographic: 'Students aged 8-14 in Zilla Parishad schools',
    peopleAffected: 8500,
    peopleAffectedLabel: '8,500+ students',
    location: {
      state: 'Andhra Pradesh',
      district: 'West Godavari',
      villageOrCity: 'Bhimavaram Rural',
      coordinates: [16.5449, 81.5212]
    },
    category: 'Education',
    subcategories: ['EdTech', 'Vernacular AI', 'Gamified Learning'],
    priority: 'Medium',
    skillsRequired: ['EdTech', 'Telugu NLP', 'Offline-first PWA', 'Interactive Pedagogy'],
    resourcesRequired: ['Tablets/Smart TV apps', 'Curriculum mapping with SCERT', 'Teacher mentors'],
    submittedBy: {
      userId: 'user_cp_4',
      userName: 'B. Padmavati',
      organizationName: 'Pratham Shiksha Foundation',
      userAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      contactEmail: 'padma@prathamshiksha.org'
    },
    status: 'PUBLISHED',
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-09-21T12:00:00Z',
    partnerCount: 2,
    progressPercent: 30,
    likesCount: 15,
    hasLiked: false,
    hasExpressedInterest: false,
    comments: []
  }
];

export const INITIAL_SOLUTION_IDEAS: SolutionIdea[] = [
  {
    id: 'idea_1',
    challengeId: 'ch_smart_irrigation',
    challengeTitle: 'Smart Irrigation for Rural Farmers',
    title: 'Solar-Assisted LoRaWAN Soil Telemetry with Vernacular Voice SMS Alerts',
    summary: 'Deploying dual-depth capacitive moisture sensors linked to a shared village LoRaWAN gateway. When root-zone water hits depletion threshold, farmers receive an automated Telugu voice advisory.',
    author: {
      userId: 'user_sp_1',
      name: 'Dr. Ramesh K. Varma',
      organization: 'ABC Engineering University',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    technology: ['LoRaWAN', 'ESP32', 'LSTM ML', 'Twilio Voice'],
    likesCount: 29,
    hasLiked: true,
    createdAt: '2026-09-12T14:30:00Z',
    comments: [
      {
        id: 'ic1',
        authorId: 'user_cp_1',
        authorName: 'Suryanarayana Raju',
        authorRole: 'Farmer Coordinator',
        authorOrg: 'East Godavari Farmer Assn',
        authorAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
        content: 'Telugu voice calls will be transformative for our elderly farmers who cannot read smartphone text!',
        createdAt: '2026-09-12T16:00:00Z',
        likes: 7
      }
    ]
  },
  {
    id: 'idea_2',
    challengeId: 'ch_rural_healthcare',
    challengeTitle: 'Rural Remote Healthcare & Diagnostic Triage',
    title: 'Offline-First Diagnostic Tablet with Edge ECG and SpO2 Telemetry',
    summary: 'A portable battery-operated diagnostic briefcase carried by ASHA workers that records vitals offline and automatically syncs with PHC doctors when near cellular towers.',
    author: {
      userId: 'user_sp_2',
      name: 'Pooja Hegde',
      organization: 'AgriTech Solutions',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    technology: ['Edge AI', 'Biomedical Probes', 'PWA Offline'],
    likesCount: 18,
    hasLiked: false,
    createdAt: '2026-09-17T11:00:00Z',
    comments: []
  }
];

export const INITIAL_PROJECT_UPDATES: ProjectUpdate[] = [
  {
    id: 'update_1',
    projectId: 'proj_smart_irrigation',
    projectTitle: 'Godavari Precision Soil-Telemetry Project',
    author: {
      userId: 'user_sp_1',
      name: 'Dr. Ramesh K. Varma',
      role: 'Academic Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    title: 'Milestone 4 Field Pilot: 18% Water Reduction Measured Across 3 Villages!',
    content: 'We successfully concluded 4 weeks of continuous sensor telemetry across 45 pilot acres in Mandapeta, Alamuru, and Ravulapalem. Farmers reduced diesel pumping hours by 22% with zero crop stress!',
    metricsHighlight: '1,240 Farmers Reached • 18% Water Saved • ₹2.4L Cost Reduction',
    likesCount: 54,
    hasLiked: true,
    createdAt: '2026-09-26T15:30:00Z',
    comments: [
      {
        id: 'uc1',
        authorId: 'user_exp_1',
        authorName: 'Dr. Meenakshi Sundaram',
        authorRole: 'ICAR Evaluator',
        authorOrg: 'National Agronomy Council',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        content: 'Impressive field validation data. Looking forward to district-wide scale deployment protocols.',
        createdAt: '2026-09-27T08:00:00Z',
        likes: 9
      }
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_smart_irrigation',
    challengeId: 'ch_smart_irrigation',
    challengeTitle: 'Smart Irrigation for Rural Farmers',
    name: 'Godavari Precision Soil-Telemetry Project',
    description: 'A multi-stakeholder pilot combining LoRaWAN capacitive soil moisture sensors, weather telemetry, and predictive edge ML to automate rural irrigation schedules.',
    status: 'PILOT_DEPLOYMENT',
    progressPercent: 78,
    members: [
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
      },
      {
        userId: 'user_cp_1',
        name: 'Suryanarayana Raju',
        role: 'Community Field Coordinator',
        organization: 'East Godavari Farmer & Water Association',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
      }
    ],
    tasks: [
      {
        id: 'task_1',
        title: 'Problem validation & baseline groundwater survey',
        assignedTo: {
          name: 'Suryanarayana Raju',
          organization: 'East Godavari Farmer Assn',
          avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
        },
        status: 'DONE',
        dueDate: '2026-09-12',
        priority: 'High'
      },
      {
        id: 'task_2',
        title: 'Calibrate capacitive soil moisture probes for Godavari alluvium soil',
        assignedTo: {
          name: 'Pooja Hegde',
          organization: 'AgriTech Solutions',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
        },
        status: 'DONE',
        dueDate: '2026-09-16',
        priority: 'High'
      },
      {
        id: 'task_3',
        title: 'Deploy solar LoRaWAN gateway in trial pilot village (Mandapeta)',
        assignedTo: {
          name: 'Pooja Hegde',
          organization: 'AgriTech Solutions',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
        },
        status: 'IN_PROGRESS',
        dueDate: '2026-09-30',
        priority: 'High'
      },
      {
        id: 'task_4',
        title: 'Train predictive irrigation scheduling ML model on weather data',
        assignedTo: {
          name: 'Dr. Ramesh K. Varma',
          organization: 'ABC Engineering University',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        },
        status: 'DONE',
        dueDate: '2026-09-20',
        priority: 'Medium'
      },
      {
        id: 'task_5',
        title: 'Integrate vernacular Telugu SMS/IVR alert gateway for farmers',
        assignedTo: {
          name: 'Dr. Ramesh K. Varma',
          organization: 'ABC Engineering University',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        },
        status: 'IN_PROGRESS',
        dueDate: '2026-10-05',
        priority: 'High'
      }
    ],
    milestones: [
      {
        id: 'm1',
        title: 'Problem Definition & Field Survey',
        description: 'Completed comprehensive baseline survey of 200 farmers in East Godavari basin.',
        status: 'COMPLETED',
        targetDate: '2026-09-12',
        completedDate: '2026-09-12'
      },
      {
        id: 'm2',
        title: 'Sensor Hardware & Telemetry R&D',
        description: 'Built low-cost ₹1,800 dual-depth sensor node with 2-year battery lifespan.',
        status: 'COMPLETED',
        targetDate: '2026-09-18',
        completedDate: '2026-09-18'
      },
      {
        id: 'm3',
        title: 'Working Prototype & ML Scheduling',
        description: 'Predictive algorithm achieves 91% accuracy in irrigation trigger timing.',
        status: 'COMPLETED',
        targetDate: '2026-09-24',
        completedDate: '2026-09-23'
      },
      {
        id: 'm4',
        title: 'Controlled Field Pilot in 3 Villages',
        description: 'Deploy 45 sensor nodes across 124 acres in Mandapeta, Alamuru, and Ravulapalem.',
        status: 'IN_PROGRESS',
        targetDate: '2026-10-10'
      },
      {
        id: 'm5',
        title: 'District Scale Rollout',
        description: 'Expansion to 5,000 farmers backed by district agricultural subsidy.',
        status: 'UPCOMING',
        targetDate: '2026-11-30'
      }
    ],
    discussions: [
      {
        id: 'msg_1',
        senderId: 'user_sp_1',
        senderName: 'Dr. Ramesh K. Varma',
        senderRole: 'Academic Lead',
        senderOrg: 'ABC Engineering University',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'We completed the first sensor prototype calibration in our university cleanroom lab. Edge ML inferences take under 120ms on the ESP32 node.',
        timestamp: '2026-09-22T10:14:00Z'
      },
      {
        id: 'msg_2',
        senderId: 'user_sp_2',
        senderName: 'Pooja Hegde',
        senderRole: 'Hardware Lead',
        senderOrg: 'AgriTech Solutions',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        content: 'We can provide 20 additional weatherproof telemetry housings and LoRa gateways for field testing free under our startup pilot quota.',
        timestamp: '2026-09-22T14:30:00Z'
      },
      {
        id: 'msg_3',
        senderId: 'user_cp_1',
        senderName: 'Suryanarayana Raju',
        senderRole: 'Community Lead',
        senderOrg: 'East Godavari Farmer Assn',
        senderAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
        content: 'Three farmer clusters in Mandapeta village (total 45 acres) are eager and ready for sensor probe installation this week!',
        timestamp: '2026-09-23T09:00:00Z'
      }
    ],
    documents: [
      {
        id: 'doc_1',
        name: 'Godavari_Smart_Irrigation_Proposal.pdf',
        fileType: 'PDF Document',
        size: '3.4 MB',
        uploadedBy: 'Dr. Ramesh K. Varma',
        uploadedAt: '2026-09-15'
      },
      {
        id: 'doc_2',
        name: 'Sensor_Hardware_Schematics_v2.pdf',
        fileType: 'Schematic / PDF',
        size: '1.8 MB',
        uploadedBy: 'Pooja Hegde',
        uploadedAt: '2026-09-20'
      },
      {
        id: 'doc_3',
        name: 'Baseline_Water_Usage_Data_2025.xlsx',
        fileType: 'Excel Spreadsheet',
        size: '890 KB',
        uploadedBy: 'Suryanarayana Raju',
        uploadedAt: '2026-09-18'
      }
    ],
    workspaceDiscussions: [
      {
        id: 'disc_1',
        projectId: 'proj_smart_irrigation',
        type: 'IDEA',
        title: 'Calibrate Dual Capacitive Probes at 15cm & 45cm Depths',
        content: 'By sensing both topsoil aeration (15cm) and root-zone water saturation (45cm), our edge ML algorithm can eliminate false triggers from morning dew while preventing deep percolation waste.',
        author: {
          userId: 'user_sp_1',
          name: 'Dr. Ramesh K. Varma',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          role: 'Academic Lead',
          org: 'ABC Engineering University'
        },
        opinions: {
          support: 14,
          needDiscussion: 1,
          concern: 0,
          userVote: 'support'
        },
        replies: [
          {
            id: 'rep_1',
            authorId: 'user_sp_2',
            authorName: 'Pooja Hegde',
            authorRole: 'Hardware Lead',
            authorOrg: 'AgriTech Solutions',
            authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
            content: 'Agreed. We fabricated a dual-spike 3D-printed housing that keeps both probes rigidly aligned.',
            createdAt: '2026-09-22T11:00:00Z',
            likes: 4
          }
        ],
        createdAt: '2026-09-22T10:15:00Z'
      },
      {
        id: 'disc_2',
        projectId: 'proj_smart_irrigation',
        type: 'OPINION',
        title: 'Advisory Channel: Vernacular Telugu Voice Calls vs Smartphone App',
        content: 'Over 65% of smallholder farmers in Mandapeta use basic feature phones. A pure Android app will exclude the most vulnerable elderly farmers. We strongly recommend an automated IVR Telugu voice call trigger when moisture dips below 28%.',
        author: {
          userId: 'user_cp_1',
          name: 'Suryanarayana Raju',
          avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
          role: 'Community Lead',
          org: 'East Godavari Farmer Assn'
        },
        opinions: {
          support: 19,
          needDiscussion: 2,
          concern: 1
        },
        decisionId: 'dec_1',
        convertedToTaskId: 'task_5',
        createdAt: '2026-09-23T08:30:00Z'
      },
      {
        id: 'disc_3',
        projectId: 'proj_smart_irrigation',
        type: 'HELP',
        title: 'Need Help: Solenoid Valve Corrosion in High-Salinity Groundwater',
        content: 'We noticed mineral crusting on the brass solenoid valves in Ravulapalem test borewell #4. Looking for recommendations on non-corrosive nylon or ceramic valve diaphragms.',
        author: {
          userId: 'user_sp_2',
          name: 'Pooja Hegde',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          role: 'Hardware Lead',
          org: 'AgriTech Solutions'
        },
        opinions: {
          support: 6,
          needDiscussion: 8,
          concern: 0
        },
        createdAt: '2026-09-25T14:00:00Z'
      }
    ],
    workspaceDecisions: [
      {
        id: 'dec_1',
        projectId: 'proj_smart_irrigation',
        title: 'Primary Farmer Notification & Advisory Architecture',
        description: 'Deciding the broadcast mechanism to ensure 100% reach among rural farmers with diverse digital literacy.',
        options: [
          { id: 'opt_1', text: 'Automated Telugu Voice Call (IVR) + Fallback SMS', votesCount: 16 },
          { id: 'opt_2', text: 'Android Smartphone App with Push Notifications', votesCount: 3 },
          { id: 'opt_3', text: 'WhatsApp Business Bot with Voice Notes', votesCount: 7 }
        ],
        status: 'DECIDED',
        selectedOptionId: 'opt_1',
        selectedOptionText: 'Automated Telugu Voice Call (IVR) + Fallback SMS',
        decisionReason: 'Guarantees access for 100% of smallholders regardless of smartphone ownership or literacy.',
        userVotedOptionId: 'opt_1',
        createdAt: '2026-09-23T10:00:00Z',
        decidedAt: '2026-09-24T12:00:00Z'
      },
      {
        id: 'dec_2',
        projectId: 'proj_smart_irrigation',
        title: 'Gateway Backhaul Connectivity Protocol',
        description: 'Selecting backhaul uplink from village water tower gateway to cloud telemetry hub.',
        options: [
          { id: 'opt_21', text: 'Solar 4G LTE IoT SIM Gateway', votesCount: 12 },
          { id: 'opt_22', text: 'Gram Panchayat Fiber BharatNet Relay', votesCount: 9 },
          { id: 'opt_23', text: 'Dual-SIM Multi-Carrier Fallback', votesCount: 15 }
        ],
        status: 'OPEN',
        userVotedOptionId: 'opt_23',
        createdAt: '2026-09-26T09:00:00Z'
      }
    ],
    canvasCards: [
      { id: 'c_prob_1', projectId: 'proj_smart_irrigation', section: 'problem', text: 'Uncalibrated flood irrigation wastes 30-40% groundwater and causes crop root hypoxia.', authorName: 'Suryanarayana Raju', createdAt: '2026-09-16' },
      { id: 'c_user_1', projectId: 'proj_smart_irrigation', section: 'users', text: '5,000+ smallholder paddy and maize farming families in Godavari delta.', authorName: 'Suryanarayana Raju', createdAt: '2026-09-16' },
      { id: 'c_curr_1', projectId: 'proj_smart_irrigation', section: 'currentApproach', text: 'Visual inspection of topsoil dryness; pumping 6 hours continuously on fixed calendar days.', authorName: 'Dr. Ramesh K. Varma', createdAt: '2026-09-16' },
      { id: 'c_idea_1', projectId: 'proj_smart_irrigation', section: 'ideas', text: 'Dual-depth capacitive probes connected to LoRaWAN gateway with solar battery backup.', authorName: 'Pooja Hegde', createdAt: '2026-09-17' },
      { id: 'c_sol_1', projectId: 'proj_smart_irrigation', section: 'proposedSolution', text: 'AgriFlow-AP: Automated soil telemetry sending Telugu voice SMS indicating exact pump minutes needed.', authorName: 'Dr. Ramesh K. Varma', createdAt: '2026-09-18' },
      { id: 'c_tech_1', projectId: 'proj_smart_irrigation', section: 'technology', text: 'LoRaWAN 865MHz, ESP32 DeepSleep, LSTM moisture predictor, FastAPI, Twilio Telugu Voice.', authorName: 'Dr. Ramesh K. Varma', createdAt: '2026-09-18' },
      { id: 'c_risk_1', projectId: 'proj_smart_irrigation', section: 'risks', text: 'Sensor damage during mechanical tractor tilling; mitigated by bright marker flags & PVC conduit.', authorName: 'Pooja Hegde', createdAt: '2026-09-19' },
      { id: 'c_imp_1', projectId: 'proj_smart_irrigation', section: 'expectedImpact', text: '18% to 25% groundwater conservation, ₹2,400 monthly energy savings per acre, 12% yield boost.', authorName: 'Dr. Meenakshi Sundaram', createdAt: '2026-09-20' }
    ],
    teamPulse: [
      { userId: 'user_sp_1', userName: 'Dr. Ramesh K. Varma', userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', userRole: 'Academic Lead & ML Architect', status: 'ON_TRACK', needText: 'Edge ML inference latency is 110ms; model ready for Mandapeta pilot.', updatedAt: 'Today' },
      { userId: 'user_sp_2', userName: 'Pooja Hegde', userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', userRole: 'Hardware & Telemetry Lead', status: 'NEED_HELP', needText: 'Testing nylon diaphragm solenoid valves to prevent saline borehole corrosion.', updatedAt: 'Today' },
      { userId: 'user_cp_1', userName: 'Suryanarayana Raju', userAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80', userRole: 'Community Coordinator', status: 'ON_TRACK', needText: '45 pilot farm plots demarcated; farmer orientation completed.', updatedAt: 'Yesterday' }
    ],
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-09-27T16:00:00Z'
  }
];

export const INITIAL_SOLUTIONS: Solution[] = [
  {
    id: 'sol_smart_irrigation',
    projectId: 'proj_smart_irrigation',
    challengeId: 'ch_smart_irrigation',
    title: 'Soil-Moisture Predictive IoT Telemetry System (AgriFlow-AP)',
    problemAddressed: 'Groundwater depletion and excessive pumping costs caused by rigid, uncalibrated irrigation cycles in East Godavari paddy and maize belts.',
    proposedSolution: 'A localized solar-powered soil moisture telemetry network paired with an edge ML micro-prediction model. Dual-depth sensors at 15cm and 45cm detect root-zone water saturation. Data is transmitted via Long Range (LoRaWAN) to a solar gateway, running automated moisture trend forecasting that sends vernacular Telugu SMS & voice call advisories to farmers indicating exact pump durations needed.',
    technologyUsed: ['LoRaWAN 865-867MHz (India Band)', 'Capacitive Soil Moisture Sensors', 'ESP32 Deep-Sleep Node', 'Random Forest & LSTM Predictor', 'FastAPI Telemetry Portal', 'Twilio / NIC Vernacular SMS Gateway'],
    expectedImpact: '18% to 25% reduction in groundwater extraction, ₹2,400 monthly electricity/diesel savings per farmer, and 12% improvement in crop yield due to prevention of root aeration stress.',
    estimatedCost: '₹2,100 per sensor node (one unit covers 3-5 acres); ₹12,000 for high-gain solar gateway (covers 10km radius village cluster).',
    scalability: 'Highly modular architecture. One gateway supports up to 250 sensor nodes. Can be deployed seamlessly across any agricultural agro-climatic zone with local soil profile calibration.',
    sustainability: 'Operates entirely on mini 5W solar panels with supercapacitors and LiFePO4 backup (zero grid dependency). Local youth trained as village telemetry maintenance partners.',
    implementationPlan: 'Phase 1: Sensor calibration & lab validation. Phase 2: 45-node pilot in 3 Mandapeta villages. Phase 3: District agricultural subsidy scale-up for 5,000 farmers.',
    prototypeUrl: 'https://demo.agriflow-iot.org',
    submittedAt: '2026-09-24T14:30:00Z',
    status: 'PILOT_RECOMMENDED'
  }
];

export const INITIAL_EVALUATIONS: Evaluation[] = [
  {
    id: 'eval_smart_irrigation',
    solutionId: 'sol_smart_irrigation',
    challengeId: 'ch_smart_irrigation',
    expert: {
      id: 'user_exp_1',
      name: 'Dr. Meenakshi Sundaram',
      domain: 'Agronomy & Sustainable Water Resources',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      organization: 'National Agronomy Council / ICAR'
    },
    criteria: {
      problemRelevance: 5,
      technicalFeasibility: 4.5,
      socialImpact: 5,
      costFeasibility: 4.5,
      scalability: 4.5,
      sustainability: 4,
      implementationReadiness: 4.5
    },
    overallScore: 4.6,
    comments: 'Exceptional engineering design tailored specifically to Indian smallholder realities. Use of LoRaWAN over cellular eliminates recurring data SIM costs for poor farmers. Dual-depth capacitive sensing effectively prevents false dry readings in heavy clay-alluvial soil. Highly suitable for immediate controlled pilot in selected agricultural communities of East Godavari.',
    recommendation: 'RECOMMEND_PILOT',
    createdAt: '2026-09-25T11:00:00Z'
  }
];

export const INITIAL_IMPACTS: ImpactMetric[] = [
  {
    id: 'impact_smart_irrigation',
    projectId: 'proj_smart_irrigation',
    challengeId: 'ch_smart_irrigation',
    challengeTitle: 'Smart Irrigation for Rural Farmers',
    location: 'East Godavari, Andhra Pradesh (Mandapeta, Alamuru, Ravulapalem)',
    farmersOrBeneficiariesReached: 1240,
    villagesCovered: 3,
    resourceSavingsPercentage: 18,
    resourceMetricLabel: 'Water Consumption Reduction',
    costSavingsINR: 240000,
    beforeValue: '100% (Baseline water pumpage: 18.4M Liters/season)',
    afterValue: '82% (Pilot water pumpage: 15.1M Liters/season)',
    progressTimeline: [
      { month: 'Jun', beneficiaries: 150, resourceSaved: 4 },
      { month: 'Jul', beneficiaries: 420, resourceSaved: 9 },
      { month: 'Aug', beneficiaries: 850, resourceSaved: 14 },
      { month: 'Sep', beneficiaries: 1240, resourceSaved: 18 }
    ],
    isDemoReported: true,
    lastUpdated: '2026-09-27T16:00:00Z'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    type: 'PROJECT',
    title: 'Godavari Precision Soil-Telemetry Project',
    subtitle: 'Active Consortium: ABC University, AgriTech Solutions, Farmer Assn',
    avatar: '🌾',
    unreadCount: 1,
    lastMessage: 'Mandapeta farm clusters are ready for probe installation this week!',
    lastMessageTime: '10:45 AM',
    participants: ['user_cp_1', 'user_sp_1', 'user_sp_2']
  },
  {
    id: 'conv_2',
    type: 'DIRECT',
    title: 'Dr. Ramesh K. Varma',
    subtitle: 'Professor • ABC Engineering University',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    unreadCount: 0,
    lastMessage: 'We calibrated the edge ML model for Godavari alluvium soil.',
    lastMessageTime: 'Yesterday',
    participants: ['user_cp_1', 'user_sp_1']
  },
  {
    id: 'conv_3',
    type: 'DIRECT',
    title: 'Pooja Hegde',
    subtitle: 'CTO • AgriTech Solutions',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    unreadCount: 0,
    lastMessage: '20 LoRa gateways dispatched for the village clusters.',
    lastMessageTime: 'Sep 24',
    participants: ['user_cp_1', 'user_sp_2']
  }
];

export const INITIAL_MESSAGES: DirectMessage[] = [
  {
    id: 'dm_1',
    conversationId: 'conv_1',
    senderId: 'user_sp_1',
    senderName: 'Dr. Ramesh K. Varma',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    text: 'We calibrated the edge ML model for Godavari alluvium soil. Telemetry latency is under 120ms.',
    createdAt: '2026-09-23T08:30:00Z'
  },
  {
    id: 'dm_2',
    conversationId: 'conv_1',
    senderId: 'user_sp_2',
    senderName: 'Pooja Hegde',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    text: '20 LoRa gateways dispatched for the village clusters. Weatherproof test enclosures verified.',
    createdAt: '2026-09-23T08:45:00Z'
  },
  {
    id: 'dm_3',
    conversationId: 'conv_1',
    senderId: 'user_cp_1',
    senderName: 'Suryanarayana Raju',
    senderAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    text: 'Mandapeta farm clusters are ready for probe installation this week!',
    createdAt: '2026-09-23T09:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    userId: 'user_cp_1',
    roleTarget: 'CHALLENGE_PROVIDER',
    title: 'New Collaboration Interest',
    message: 'Dr. Ramesh K. Varma (ABC Engineering University) expressed interest in "Smart Irrigation for Rural Farmers".',
    type: 'INTEREST_EXPRESSED',
    read: false,
    link: '/challenges/ch_smart_irrigation',
    createdAt: '2026-09-11T12:05:00Z'
  },
  {
    id: 'notif_2',
    userId: 'user_sp_1',
    roleTarget: 'SOLUTION_PARTNER',
    title: '94% AI Compatible Challenge',
    message: 'New challenge "Smart Irrigation for Rural Farmers" matches your IoT & ML Lab expertise.',
    type: 'INVITATION_RECEIVED',
    read: false,
    link: '/challenges/ch_smart_irrigation',
    createdAt: '2026-09-12T08:30:00Z'
  },
  {
    id: 'notif_3',
    userId: 'ALL',
    title: 'Expert Review Completed',
    message: 'Dr. Meenakshi Sundaram evaluated AgriFlow-AP: "RECOMMEND PILOT" (Rating: 4.6 / 5.0).',
    type: 'EVALUATION_COMPLETED',
    read: false,
    link: '/impact',
    createdAt: '2026-09-25T11:30:00Z'
  },
  {
    id: 'notif_4',
    userId: 'ALL',
    title: 'Field Impact Milestone Verified',
    message: '18% Groundwater reduction verified across 3 villages in East Godavari basin.',
    type: 'MILESTONE_UPDATED',
    read: false,
    link: '/impact',
    createdAt: '2026-09-27T16:00:00Z'
  }
];

export const PLATFORM_STATS = {
  totalChallenges: 1240,
  activeProjects: 356,
  participatingOrgs: 482,
  solutionsDeployed: 128,
  peopleImpacted: 42000,
  verifiedExperts: 164,
  statesCovered: 24,
  categoryBreakdown: [
    { name: 'Agriculture', count: 342, color: '#10b981' },
    { name: 'Healthcare', count: 284, color: '#06b6d4' },
    { name: 'Environment', count: 215, color: '#84cc16' },
    { name: 'Education', count: 178, color: '#6366f1' },
    { name: 'Women & Child', count: 112, color: '#ec4899' },
    { name: 'Public Infra', count: 109, color: '#f59e0b' }
  ],
  stateBreakdown: [
    { state: 'Andhra Pradesh', count: 248 },
    { state: 'Telangana', count: 194 },
    { state: 'Karnataka', count: 182 },
    { state: 'Maharashtra', count: 176 },
    { state: 'Tamil Nadu', count: 165 },
    { state: 'Odisha', count: 98 },
    { state: 'Other States', count: 177 }
  ],
  monthlyImpactTrend: [
    { month: 'Apr', deployed: 45, beneficiaries: 14000 },
    { month: 'May', deployed: 62, beneficiaries: 19500 },
    { month: 'Jun', deployed: 78, beneficiaries: 26000 },
    { month: 'Jul', deployed: 96, beneficiaries: 32000 },
    { month: 'Aug', deployed: 114, beneficiaries: 37500 },
    { month: 'Sep', deployed: 128, beneficiaries: 42000 }
  ]
};
