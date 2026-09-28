'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  FileCheck2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Zap, 
  UserCheck,
  ChevronRight
} from 'lucide-react';

export default function SubmitSolutionPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string;
  const { projects, challenges, submitSolution, solutions, switchRole } = useApp();

  const project = projects.find(p => p.id === projectId) || projects[0];
  const challenge = challenges.find(c => c.id === project.challengeId) || challenges[0];
  const existingSol = solutions.find(s => s.projectId === project.id);

  const [formData, setFormData] = useState({
    title: existingSol?.title || 'Soil-Moisture Predictive IoT Telemetry System (AgriFlow-AP)',
    problemAddressed: existingSol?.problemAddressed || 'Groundwater depletion and excessive pumping costs caused by rigid, uncalibrated irrigation cycles in East Godavari paddy and maize belts.',
    proposedSolution: existingSol?.proposedSolution || 'A localized solar-powered soil moisture telemetry network paired with an edge ML micro-prediction model. Dual-depth sensors at 15cm and 45cm detect root-zone water saturation. Data is transmitted via Long Range (LoRaWAN) to a solar gateway, running automated moisture trend forecasting that sends vernacular Telugu SMS & voice call advisories to farmers indicating exact pump durations needed.',
    technologyUsedText: existingSol?.technologyUsed?.join(', ') || 'LoRaWAN 865-867MHz (India Band), Capacitive Soil Moisture Probes, ESP32 Deep-Sleep Node, Random Forest Evapotranspiration Predictor, FastAPI Telemetry Portal, Twilio/NIC Vernacular SMS Gateway',
    expectedImpact: existingSol?.expectedImpact || '18% to 25% reduction in groundwater extraction, ₹2,400 monthly electricity/diesel savings per farmer, and 12% improvement in crop yield due to prevention of root aeration stress.',
    estimatedCost: existingSol?.estimatedCost || '₹2,100 per sensor node (one unit covers 3-5 acres); ₹12,000 for high-gain solar gateway (covers 10km radius village cluster).',
    scalability: existingSol?.scalability || 'Highly modular architecture. One gateway supports up to 250 sensor nodes. Can be deployed seamlessly across any agricultural agro-climatic zone with local soil profile calibration.',
    sustainability: existingSol?.sustainability || 'Operates entirely on mini 5W solar panels with supercapacitors and LiFePO4 backup (zero grid dependency). Local youth trained as village telemetry maintenance partners.',
    implementationPlan: existingSol?.implementationPlan || 'Phase 1: Sensor calibration & lab validation. Phase 2: 45-node pilot in 3 Mandapeta villages. Phase 3: District agricultural subsidy scale-up for 5,000 farmers.',
    prototypeUrl: existingSol?.prototypeUrl || 'https://demo.agriflow-iot.org'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSolution({
      projectId: project.id,
      challengeId: challenge.id,
      title: formData.title,
      problemAddressed: formData.problemAddressed,
      proposedSolution: formData.proposedSolution,
      technologyUsed: formData.technologyUsedText.split(',').map(s => s.trim()).filter(Boolean),
      expectedImpact: formData.expectedImpact,
      estimatedCost: formData.estimatedCost,
      scalability: formData.scalability,
      sustainability: formData.sustainability,
      implementationPlan: formData.implementationPlan,
      prototypeUrl: formData.prototypeUrl
    });
    setSubmitted(true);
  };

  const handleOpenExpertEvaluation = () => {
    router.push('/evaluations/sol_smart_irrigation');
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-10 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-purple-50 shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs uppercase tracking-wider">
            Status: Under Review
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Solution Submitted for Review</h1>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Your co-developed solution <strong className="text-slate-900">"{formData.title}"</strong> is now awaiting evaluation by domain specialists.
          </p>
        </div>

        {/* 1-Click Direct Next Step */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleOpenExpertEvaluation}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <UserCheck className="w-4 h-4" />
            <span>Open Solution Review →</span>
          </button>

          <button
            onClick={() => router.push(`/workspace/${project.id}`)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            Return to Workspace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/workspace/proj_smart_irrigation" className="hover:text-indigo-600">Workspace</Link>
            <span>/</span>
            <span className="text-indigo-600 font-bold">Submit Solution Dossier</span>
          </div>
          <Link
            href={`/workspace/${project.id}`}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            ← Back to Workspace
          </Link>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Formal Solution Submission (Step 5/7)
        </h1>
        <p className="text-xs text-slate-500">
          Document the technical feasibility, cost model, and scalability for domain scientist evaluation.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        
        <div className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Solution Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Problem Addressed *</label>
            <textarea
              rows={2}
              required
              value={formData.problemAddressed}
              onChange={e => setFormData({ ...formData, problemAddressed: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Proposed Technical Solution & Architecture *</label>
            <textarea
              rows={3}
              required
              value={formData.proposedSolution}
              onChange={e => setFormData({ ...formData, proposedSolution: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Technology Stack (Comma separated) *</label>
            <input
              type="text"
              required
              value={formData.technologyUsedText}
              onChange={e => setFormData({ ...formData, technologyUsedText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Expected Measurable Impact *</label>
              <textarea
                rows={2}
                required
                value={formData.expectedImpact}
                onChange={e => setFormData({ ...formData, expectedImpact: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Estimated Unit Cost *</label>
              <textarea
                rows={2}
                required
                value={formData.estimatedCost}
                onChange={e => setFormData({ ...formData, estimatedCost: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Scalability Strategy *</label>
              <textarea
                rows={2}
                required
                value={formData.scalability}
                onChange={e => setFormData({ ...formData, scalability: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Sustainability Model *</label>
              <textarea
                rows={2}
                required
                value={formData.sustainability}
                onChange={e => setFormData({ ...formData, sustainability: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Live Telemetry Dashboard / Prototype URL</label>
            <input
              type="url"
              value={formData.prototypeUrl}
              onChange={e => setFormData({ ...formData, prototypeUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* 1-Click Submission Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/workspace/${project.id}`}
            className="text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Submit Solution for Evaluation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
