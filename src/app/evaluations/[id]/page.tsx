'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { EvaluationCriteria } from '@/types';
import { 
  UserCheck, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Building2, 
  ArrowRight, 
  BarChart3,
  ThumbsUp,
  RotateCcw
} from 'lucide-react';

export default function EvaluationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { solutions, challenges, submitEvaluation, evaluations, currentUser } = useApp();

  const solution = solutions.find(s => s.id === id) || solutions[0];
  const challenge = challenges.find(c => c.id === solution.challengeId) || challenges[0];
  const existingEval = evaluations.find(e => e.solutionId === solution.id);

  const [criteria, setCriteria] = useState<EvaluationCriteria>({
    problemRelevance: existingEval?.criteria.problemRelevance || 5,
    technicalFeasibility: existingEval?.criteria.technicalFeasibility || 4.5,
    socialImpact: existingEval?.criteria.socialImpact || 5,
    costFeasibility: existingEval?.criteria.costFeasibility || 4.5,
    scalability: existingEval?.criteria.scalability || 4.5,
    sustainability: existingEval?.criteria.sustainability || 4,
    implementationReadiness: existingEval?.criteria.implementationReadiness || 4.5
  });

  const [comments, setComments] = useState<string>(
    existingEval?.comments ||
    'Exceptional engineering design tailored specifically to smallholder realities in East Godavari. Use of LoRaWAN over cellular eliminates recurring SIM data costs. Dual-depth capacitive sensing effectively prevents false dry readings in heavy clay-alluvial soil. Highly suitable for immediate controlled pilot in selected agricultural communities.'
  );

  const [submitted, setSubmitted] = useState(false);

  const calculateOverall = () => {
    const vals = Object.values(criteria);
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  };

  const handleAction = (recommendation: 'RECOMMEND_PILOT' | 'REQUEST_CHANGES') => {
    submitEvaluation({
      solutionId: solution.id,
      challengeId: challenge.id,
      criteria,
      comments,
      recommendation
    });
    setSubmitted(true);
  };

  const criteriaList: { key: keyof EvaluationCriteria; label: string; desc: string }[] = [
    { key: 'problemRelevance', label: '1. Problem Relevance', desc: 'Direct alignment with ground pain point in East Godavari' },
    { key: 'technicalFeasibility', label: '2. Technical Feasibility', desc: 'LoRaWAN telemetry, edge ML inferences & sensor resilience' },
    { key: 'socialImpact', label: '3. Social Impact', desc: 'Reaching 5,000+ smallholder farmers and saving groundwater' },
    { key: 'costFeasibility', label: '4. Unit Economics', desc: '₹2,100 node cost & affordability for local panchayats' },
    { key: 'scalability', label: '5. Scalability', desc: 'Potential replication across all Godavari delta mandals' },
    { key: 'sustainability', label: '6. Sustainability', desc: 'Zero-grid solar operation and long-term maintenance' },
    { key: 'implementationReadiness', label: '7. Pilot Readiness', desc: 'Working prototype readiness for 3-village controlled trial' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Step 6/7 • Expert Scientific Evaluation</span>
            </span>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Evaluator: <strong className="text-slate-900">{currentUser.name}</strong> (ICAR / Agronomy)
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Review: {solution.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Target: <strong className="text-slate-800">{challenge.title}</strong> • Location: {challenge.location.district}, {challenge.location.state}
          </p>
        </div>
      </div>

      {/* Success Celebration Banner */}
      {submitted && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in shadow-xl border border-emerald-700">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase">
                Pilot Approved ✓
              </span>
              <h3 className="font-bold text-base text-white">Project Advanced to Pilot Deployment!</h3>
            </div>
            <p className="text-xs text-emerald-200 mt-1">
              Field sensors installed across 3 villages. Live water reduction telemetry is now active.
            </p>
          </div>

          <button
            onClick={() => router.push('/impact')}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-1.5 shrink-0 hover:scale-105"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Proceed to Step 7: Impact Telemetry →</span>
          </button>
        </div>
      )}

      {/* Solution Proposal Summary Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-sm font-extrabold text-slate-900">Submitted Technical Specifications</h2>
        
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase">Architecture Overview</span>
            <p className="text-slate-800 leading-relaxed font-normal mt-0.5">{solution.proposedSolution}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200 text-[11px]">
            <div>
              <span className="text-slate-400 font-semibold text-[10px] uppercase">Unit Cost</span>
              <div className="font-bold text-slate-900">{solution.estimatedCost}</div>
            </div>
            <div>
              <span className="text-slate-400 font-semibold text-[10px] uppercase">Expected Savings</span>
              <div className="font-bold text-emerald-600">{solution.expectedImpact}</div>
            </div>
            <div>
              <span className="text-slate-400 font-semibold text-[10px] uppercase">Demo Portal</span>
              <a href={solution.prototypeUrl} target="_blank" rel="noreferrer" className="font-bold text-indigo-600 hover:underline block truncate">
                {solution.prototypeUrl || 'https://demo.agriflow-iot.org'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Factor Structured Rubric */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">7-Factor Scientific Evaluation Rubric</h2>
            <p className="text-xs text-slate-500">Adjust sliders (1.0 to 5.0) to recalculate composite score.</p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-black text-purple-700">{calculateOverall()} / 5.0</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Composite Score</div>
          </div>
        </div>

        <div className="space-y-3.5">
          {criteriaList.map(item => {
            const val = criteria[item.key];

            return (
              <div key={item.key} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{item.label}</h4>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-black text-xs text-slate-900">{val.toFixed(1)}</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={val}
                  onChange={e => setCriteria({ ...criteria, [item.key]: parseFloat(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            );
          })}
        </div>

        {/* Written Assessment */}
        <div className="space-y-1.5 pt-1">
          <label className="block text-xs font-bold text-slate-700">Detailed Expert Critique & Ground Recommendations *</label>
          <textarea
            rows={3}
            value={comments}
            onChange={e => setComments(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-purple-500 leading-relaxed"
          />
        </div>

        {/* 1-Click Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => handleAction('REQUEST_CHANGES')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-amber-300 text-amber-800 hover:bg-amber-50 font-bold text-xs transition-colors flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Request Minor Changes</span>
          </button>

          <button
            onClick={() => handleAction('RECOMMEND_PILOT')}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs shadow-lg shadow-purple-700/30 transition-all flex items-center justify-center gap-2 hover:scale-105"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Recommend Pilot Deployment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
