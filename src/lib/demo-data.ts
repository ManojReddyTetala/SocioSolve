import { User, Organization, Challenge, Project, Solution, Evaluation, ImpactMetric, Notification } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_cp_1',
    name: 'Suryanarayana Raju',
    email: 'water.association@eastgodavari.org',
    role: 'CHALLENGE_PROVIDER',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    title: 'Lead Coordinator',
    organizationId: 'org_cp_1',
    organizationName: 'East Godavari Farmer & Water Association',
    location: 'East Godavari, Andhra Pradesh',
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'user_sp_1',
    name: 'Dr. Ramesh K. Varma',
    email: 'r.varma@abcu.edu.in',
    role: 'SOLUTION_PARTNER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Professor & Head of IoT & AI Innovation Lab',
    organizationId: 'org_sp_1',
    organizationName: 'ABC Engineering University',
    location: 'Visakhapatnam, Andhra Pradesh',
    skills: ['IoT', 'Machine Learning', 'Embedded Systems', 'Agriculture Tech', 'Computer Vision'],
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'user_sp_2',
    name: 'Pooja Hegde',
    email: 'pooja.h@agritechsolutions.io',
    role: 'SOLUTION_PARTNER',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'CTO & Co-Founder',
    organizationId: 'org_sp_2',
    organizationName: 'AgriTech Solutions',
    location: 'Hyderabad, Telangana',
    skills: ['Soil Moisture Sensors', 'Predictive Analytics', 'Mobile App Development', 'Hardware Deployment'],
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'user_exp_1',
    name: 'Dr. Meenakshi Sundaram',
    email: 'm.sundaram@icar.gov.in',
    role: 'EXPERT',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    title: 'Senior Agricultural Scientist & Water Resource Evaluator',
    organizationId: 'org_exp_1',
    organizationName: 'National Agronomy Council / ICAR',
    location: 'New Delhi / Hyderabad',
    skills: ['Agronomy', 'Irrigation Systems', 'Impact Assessment', 'Social Feasibility'],
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'user_admin_1',
    name: 'Ananya Sharma',
    email: 'admin@sociosolve.gov.in',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'National Platform Administrator',
    organizationName: 'SocioSolve Central Governance',
    location: 'New Delhi',
    verificationStatus: 'VERIFIED',
  }
];

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 'org_cp_1',
    name: 'East Godavari Farmer & Water Association',
    type: 'COMMUNITY',
    tagline: 'Empowering 5,000+ local farming households in the Godavari delta basin.',
    description: 'A registered grassroots association representing smallholder paddy, sugarcane, and horticultural farmers across 14 rural mandals.',
    logo: '🌾',
    location: 'East Godavari, Andhra Pradesh',
    skills: ['Community Mobilization', 'Field Access', 'Crop Knowledge', 'Local Governance'],
    resources: ['Direct access to 400+ acres for pilots', '12 Local training centers', 'Community trust'],
    website: 'https://eastgodavarifarmers.org',
    projectsCompleted: 4,
    verificationStatus: 'VERIFIED',
    collaborationInterests: ['Water Conservation', 'Smart Irrigation', 'Pest Surveillance', 'Solar Pumping']
  },
  {
    id: 'org_sp_1',
    name: 'ABC Engineering University',
    type: 'UNIVERSITY',
    tagline: 'Center for Excellence in Rural IoT, Edge AI & Embedded Systems.',
    description: 'Premier engineering and research institution with specialized labs in agricultural telemetry, sensor networks, and edge ML compute.',
    logo: '🏛️',
    location: 'Visakhapatnam, Andhra Pradesh',
    skills: ['IoT', 'Machine Learning', 'Embedded Systems', 'Agriculture Technology', 'Computer Vision'],
    resources: ['IoT Prototyping Cleanroom Lab', '25+ PhD Scholars', 'AI/ML Compute Cluster (NVIDIA A100)', 'Field testing telemetry van'],
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
    tagline: 'Smart hardware and telemetry devices designed for rugged Indian field conditions.',
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
    tagline: 'Pioneering sustainable crop science and soil moisture research.',
    description: 'State agricultural university with 8 regional agricultural research stations and extensive crop agronomy field datasets.',
    logo: '🌾',
    location: 'Guntur, Andhra Pradesh',
    skills: ['Agronomy', 'Soil Science', 'Crop Pathology', 'Irrigation Scheduling', 'Pest Control'],
    resources: ['Soil testing laboratory', 'Agronomy experimental farms', 'Extension worker network'],
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
    tagline: 'Circular economy and decentralized sustainable waste processing systems.',
    description: 'Leading industrial partner providing funding, equipment, and recycling logistics infrastructure.',
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
    tagline: 'Delivering affordable primary healthcare and telemedicine to remote tribal hamlets.',
    description: 'Grassroots health organization operating mobile diagnostic vans and community nurse networks across 80+ villages.',
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
    whyItMatters: 'Groundwater depletion is threatening the livelihoods of 5,000+ farming families. Excessive flooding also leaches vital soil nutrients and increases fungal root rot, cutting paddy and crop yields by 15-20%.',
    targetDemographic: 'Small and marginal paddy, sugarcane, and maize farmers',
    peopleAffected: 5000,
    peopleAffectedLabel: '5,000+ farmers',
    location: {
      state: 'Andhra Pradesh',
      district: 'East Godavari',
      villageOrCity: 'Kakinada & Rajahmundry Mandals',
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
    ]
  },
  {
    id: 'ch_rural_healthcare',
    title: 'Rural Remote Healthcare & Diagnostic Triage',
    problemStatement: 'Tribal and remote villages in Alluri Sitharama Raju district are located 40+ km away from the nearest Community Health Centre, causing delays in maternal screening and chronic disease management.',
    whyItMatters: 'Over 12,000 residents lack access to basic vitals screening, leading to high complication rates in high-risk pregnancies and unmanaged hypertension.',
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
    activeProjectId: 'proj_rural_healthcare'
  },
  {
    id: 'ch_plastic_waste',
    title: 'Decentralized Plastic Waste Collection & Upcycling',
    problemStatement: 'Over 8 tons of single-use multi-layer plastic waste accumulates monthly in rural pilgrimage hubs without municipal collection, leading to open burning.',
    whyItMatters: 'Toxic dioxin emissions from plastic burning severely harm air quality, contaminate local water tanks, and injure stray cattle.',
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
    progressPercent: 20
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
    progressPercent: 30
  },
  {
    id: 'ch_crop_disease',
    title: 'AI-Powered Early Crop Pest & Blight Detection',
    problemStatement: 'Chilli and paddy crop blights cause sudden 50% yield losses because farmers identify leaf infections only after irreversible fungal damage occurs.',
    whyItMatters: 'Small farmers lose up to ₹40,000 per acre in pesticide misuse and crop failure, driving acute debt.',
    targetDemographic: 'Chilli, cotton, and paddy farmers',
    peopleAffected: 7200,
    peopleAffectedLabel: '7,200+ farmers',
    location: {
      state: 'Andhra Pradesh',
      district: 'Guntur',
      villageOrCity: 'Tenali & Mangalagiri',
      coordinates: [16.2437, 80.6400]
    },
    category: 'Agriculture',
    subcategories: ['Computer Vision', 'Plant Pathology', 'Mobile AI'],
    priority: 'High',
    skillsRequired: ['Computer Vision', 'Deep Learning', 'Plant Pathology', 'Mobile App Development'],
    resourcesRequired: ['Annotated crop disease image datasets', 'Agronomist validation', 'Offline mobile model'],
    submittedBy: {
      userId: 'user_cp_5',
      userName: 'G. Sambasiva Rao',
      organizationName: 'Guntur Chilli Growers Syndicate',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      contactEmail: 'chilli.growers@guntur.org'
    },
    status: 'PENDING_VERIFICATION',
    createdAt: '2026-09-26T15:40:00Z',
    updatedAt: '2026-09-26T15:40:00Z',
    partnerCount: 0,
    progressPercent: 5
  },
  {
    id: 'ch_women_safety',
    title: 'Smart Street Lighting & Distress Telemetry for Women Commuters',
    problemStatement: 'Unlit 3km arterial roads connecting suburban industrial zones with bus terminals create severe safety hazards for night-shift female textile workers.',
    whyItMatters: 'Over 3,400 women commute in fear daily; lack of rapid response infrastructure restricts female workforce participation.',
    targetDemographic: 'Women factory and retail employees',
    peopleAffected: 3400,
    peopleAffectedLabel: '3,400+ women workers',
    location: {
      state: 'Andhra Pradesh',
      district: 'Visakhapatnam',
      villageOrCity: 'Gajuwaka Industrial Belt',
      coordinates: [17.6905, 83.2185]
    },
    category: 'Women & Child Welfare',
    subcategories: ['Public Safety', 'Smart Lighting', 'IoT Emergency Response'],
    priority: 'High',
    skillsRequired: ['IoT', 'Smart Streetlights', 'GPS Tracking', 'Mobile SOS Gateway'],
    resourcesRequired: ['Solar LED smart poles', 'Police emergency dispatcher API integration'],
    submittedBy: {
      userId: 'user_cp_6',
      userName: 'K. Lakshmi Devi',
      organizationName: 'Mahila Shramik Welfare Samiti',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      contactEmail: 'mahila.shramik@vizag.org'
    },
    status: 'PENDING_VERIFICATION',
    createdAt: '2026-09-27T08:15:00Z',
    updatedAt: '2026-09-27T08:15:00Z',
    partnerCount: 0,
    progressPercent: 5
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
        title: 'Train predictive irrigation scheduling ML model on 5-year weather data',
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
      },
      {
        id: 'task_6',
        title: 'Impact measurement & power consumption audit across 3 pilot villages',
        assignedTo: {
          name: 'Suryanarayana Raju',
          organization: 'East Godavari Farmer Assn',
          avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
        },
        status: 'TODO',
        dueDate: '2026-10-15',
        priority: 'Medium'
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
        title: 'Working Prototype & Algorithm',
        description: 'Predictive algorithm achieves 91% accuracy in irrigation trigger timing.',
        status: 'COMPLETED',
        targetDate: '2026-09-24',
        completedDate: '2026-09-23'
      },
      {
        id: 'm4',
        title: 'Controlled Pilot in 3 Villages',
        description: 'Deploy 45 sensor nodes across 124 acres in Mandapeta, Alamuru, and Ravulapalem.',
        status: 'IN_PROGRESS',
        targetDate: '2026-10-10'
      },
      {
        id: 'm5',
        title: 'Scale Deployment & District Rollout',
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
        content: 'We can provide 20 additional weatherproof telemetry housings and LoRaWAN gateways for field testing free under our startup pilot quota.',
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
    technologyUsed: ['LoRaWAN 865-867MHz (India Frequency Band)', 'Capacitive Soil Moisture Sensors', 'ESP32 Deep-Sleep Telemetry Controller', 'Random Forest & LSTM Evapotranspiration Predictor', 'FastAPI & Next.js Telemetry Portal', 'Twilio / NIC Vernacular SMS Gateway'],
    expectedImpact: '18% to 25% reduction in groundwater extraction, ₹2,400 monthly electricity/diesel savings per farmer, and 12% improvement in crop yield due to prevention of root aeration stress.',
    estimatedCost: '₹2,100 per sensor node (one unit covers 3-5 acres); ₹12,000 for high-gain solar gateway (covers 10km radius village cluster).',
    scalability: 'Highly modular architecture. One gateway supports up to 250 sensor nodes. Can be deployed seamlessly across any agricultural agro-climatic zone with local soil profile calibration.',
    sustainability: 'Operates entirely on mini 5W solar panels with supercapacitors and LiFePO4 backup (zero grid dependency). Local youth trained as village telemetry maintenance partners.',
    implementationPlan: 'Phase 1 (Completed): Cleanroom calibration & baseline telemetry. Phase 2 (Current): 45-node pilot in 3 Mandapeta villages. Phase 3: District agricultural department subsidy integration for 5,000 farmers.',
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
    comments: 'Exceptional engineering design tailored specifically to Indian smallholder realities. Use of LoRaWAN over cellular SIMs eliminates monthly recurring data SIM costs for poor farmers. Dual-depth capacitive sensing effectively prevents false dry readings in heavy clay-alluvial soil. Highly suitable for immediate controlled pilot in selected agricultural communities of East Godavari.',
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

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    userId: 'user_cp_1',
    roleTarget: 'CHALLENGE_PROVIDER',
    title: 'Challenge Verified & Published',
    message: 'Your challenge "Smart Irrigation for Rural Farmers" has been verified and published by Platform Admin.',
    type: 'CHALLENGE_APPROVED',
    read: false,
    link: '/challenges/ch_smart_irrigation',
    createdAt: '2026-09-11T10:00:00Z'
  },
  {
    id: 'notif_2',
    userId: 'user_sp_1',
    roleTarget: 'SOLUTION_PARTNER',
    title: 'High AI Match Challenge Discovered',
    message: 'New 94% match challenge: "Smart Irrigation for Rural Farmers" aligns with your IoT and ML labs.',
    type: 'INVITATION_RECEIVED',
    read: false,
    link: '/matching/ch_smart_irrigation',
    createdAt: '2026-09-12T08:30:00Z'
  },
  {
    id: 'notif_3',
    userId: 'user_cp_1',
    roleTarget: 'CHALLENGE_PROVIDER',
    title: 'Partnership Established',
    message: 'ABC Engineering University & AgriTech Solutions joined your challenge workspace.',
    type: 'INVITATION_RECEIVED',
    read: false,
    link: '/workspace/proj_smart_irrigation',
    createdAt: '2026-09-15T11:00:00Z'
  },
  {
    id: 'notif_4',
    userId: 'ALL',
    title: 'Expert Review Completed',
    message: 'Dr. Meenakshi Sundaram evaluated the Smart IoT Irrigation System: "RECOMMEND PILOT" (Rating: 4.6 / 5.0).',
    type: 'EVALUATION_COMPLETED',
    read: false,
    link: '/evaluations/sol_smart_irrigation',
    createdAt: '2026-09-25T11:30:00Z'
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
