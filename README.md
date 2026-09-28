# SocioSolve — Societal Challenge Collaboration Platform (SIH26088)

> **“Turn societal challenges into collaborative solutions.”**

A unified digital ecosystem connecting grassroots communities, NGOs, and local governance bodies with universities, researchers, deeptech startups, and industry to co-create measurable societal impact.

---

## 🌟 Key Features & Master Workflow

The platform demonstrates the complete end-to-end lifecycle of a societal problem:

```text
┌─────────────────────────┐
│ 1. Challenge Provider   │ ➔ Submits grassroots problem (e.g. Smart Irrigation for Rural Farmers)
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 2. Platform Admin       │ ➔ Verifies submission, detects cross-state duplicates & publishes
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 3. AI Analysis Engine   │ ➔ Extracts skills (IoT, ML), estimates impact score (92/100) & matches partners
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 4. University & Industry│ ➔ ABC Engineering University (94%) & AgriTech Solutions (89%) accept invites
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 5. Co-Creation Workspace│ ➔ Shared tasks, milestones, live discussions & hardware telemetry specs
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 6. Solution Dossier     │ ➔ Submits formal AgriFlow-AP architecture & low-cost telemetry model
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 7. Domain Expert Review │ ➔ ICAR / Agronomy expert evaluates across 7 rubrics & Recommends Pilot
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 8. Pilot & Impact Track │ ➔ Live telemetry: 1,240 farmers reached, 3 villages, 18% water reduction (₹2.4L savings)
└─────────────────────────┘
```

---

## 🎭 4 Built-In Roles (1-Click Switcher)

You can switch personas at any point using the top role banner:

| Persona | Active Profile | Key Capabilities |
| :--- | :--- | :--- |
| **Challenge Provider** | *Suryanarayana Raju (East Godavari Farmer Assn)* | 6-Step Challenge Submission Wizard, Realtime AI feedback, Workspace sponsor |
| **Solution Partner** | *Dr. Ramesh K. Varma (ABC Engineering University)* | AI Matchmaking (94%), Collaborative Workspace, Task Manager, Solution Dossier |
| **Domain Expert** | *Dr. Meenakshi Sundaram (ICAR / Agronomy Council)* | 7-Factor Structured Rubric, Qualitative feedback, Pilot Recommendation |
| **Platform Admin** | *Ananya Sharma (Central Governance)* | Challenge Verification, Cross-state duplicate detection & merging, Governance Analytics |

---

## 🚀 Running the Prototype Locally

The project is built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Recharts**.

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 📂 Project Architecture

```text
src/
├── app/
│   ├── layout.tsx                     # Global Root Layout with AppProvider
│   ├── page.tsx                       # Landing Page with Hero, Stats & Workflow
│   ├── challenges/
│   │   ├── page.tsx                   # Discover Challenges with Faceted Filters
│   │   └── [id]/page.tsx              # Challenge Details, AI Analysis & Matches
│   ├── submit-challenge/page.tsx      # 6-Step Multi-Step Challenge Submission Wizard
│   ├── matching/[id]/page.tsx         # University & Industry AI Match Engine
│   ├── workspace/[id]/page.tsx        # Project Collaboration Workspace & Live Chat
│   ├── solutions/submit/[id]/page.tsx # Formal Solution Proposal Submission
│   ├── evaluations/[id]/page.tsx      # 7-Rubric Domain Expert Review Portal
│   ├── impact/page.tsx                # Live Impact Telemetry & Platform Analytics
│   ├── admin/page.tsx                 # Administrator Verification & Duplicate Moderation
│   ├── organizations/page.tsx         # Verified Universities, Startups & Labs Directory
│   └── auth/page.tsx                  # Role Selection & Authentication
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                 # Global Navbar with Search, Alerts & Switcher
│   │   ├── Sidebar.tsx                # Role-Aware Navigation Sidebar
│   │   ├── RoleBanner.tsx             # 1-Click Persona Switcher Ribbon
│   │   └── AppShell.tsx               # Responsive Layout Shell & Footer
│   └── ui/
│       └── ToastContainer.tsx         # Reactive Floating Notification System
├── context/
│   └── AppContext.tsx                 # Persistent State Management & Role Lifecycles
├── lib/
│   ├── ai-service.ts                  # AI Challenge Analysis, Skill Extraction & Matcher
│   └── demo-data.ts                   # Realistic Demo Data for SIH26088
└── types/
    └── index.ts                       # Complete TypeScript Interfaces
```

---

## 🏆 Smart India Hackathon Case Study

- **Problem Statement ID:** SIH26088
- **Title:** A digital platform to crowdsource societal challenges and facilitate collaborative problem solving through universities and industry partnerships.
- **Primary Showcase:** *Smart Irrigation for Rural Farmers (East Godavari, Andhra Pradesh)*.
