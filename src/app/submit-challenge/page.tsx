'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ChallengeCategory } from '@/types';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  FileText, 
  Upload, 
  ShieldCheck, 
  Layers,
  Zap,
  ChevronRight
} from 'lucide-react';

const CATEGORIES: ChallengeCategory[] = [
  'Agriculture',
  'Healthcare',
  'Education',
  'Environment',
  'Accessibility',
  'Women & Child Welfare',
  'Rural Development',
  'Public Infrastructure'
];

export default function SubmitChallengePage() {
  const router = useRouter();
  const { submitChallenge, currentUser } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedChallengeId, setSubmittedChallengeId] = useState<string | null>(null);
  const [aiProgressStage, setAiProgressStage] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    title: 'Smart Irrigation for Rural Farmers',
    problemStatement: 'Farmers in rural East Godavari rely on fixed irrigation schedules, resulting in unnecessary groundwater consumption (up to 40% excess) and increased pumping costs.',
    whyItMatters: 'Groundwater depletion is threatening the livelihoods of 5,000+ farming families. Excessive flooding leaches vital soil nutrients and cuts crop yields by 15-20%.',
    targetDemographic: 'Smallholder paddy & sugarcane farmers',
    peopleAffected: 5000,
    state: 'Andhra Pradesh',
    district: 'East Godavari',
    villageOrCity: 'Mandapeta & Rajahmundry Mandals',
    category: 'Agriculture' as ChallengeCategory,
    skillsRequiredText: 'IoT, Machine Learning, Embedded Systems, Agriculture, Mobile Development',
    resourcesRequiredText: 'Soil moisture telemetry sensors, Farmland pilot plots, Telugu mobile advisory SMS',
    fundingRequired: '₹3,50,000 for 10-farm pilot setup',
    priority: 'High' as const,
    evidenceFiles: ['Soil_Moisture_Baseline_Survey.pdf', 'East_Godavari_Paddy_Field_Photos.zip']
  });

  const handleQuickPrefill = () => {
    setFormData({
      title: 'Smart Irrigation for Rural Farmers',
      problemStatement: 'Farmers in rural East Godavari rely on fixed irrigation schedules, resulting in unnecessary groundwater consumption (up to 40% excess) and increased pumping costs.',
      whyItMatters: 'Groundwater depletion is threatening the livelihoods of 5,000+ farming families. Excessive flooding leaches vital soil nutrients and cuts crop yields by 15-20%.',
      targetDemographic: 'Smallholder paddy & sugarcane farmers',
      peopleAffected: 5000,
      state: 'Andhra Pradesh',
      district: 'East Godavari',
      villageOrCity: 'Mandapeta & Rajahmundry Mandals',
      category: 'Agriculture',
      skillsRequiredText: 'IoT, Machine Learning, Embedded Systems, Agriculture, Mobile Development',
      resourcesRequiredText: 'Soil moisture telemetry sensors, Farmland pilot plots, Telugu mobile advisory SMS',
      fundingRequired: '₹3,50,000 for 10-farm pilot setup',
      priority: 'High',
      evidenceFiles: ['Soil_Moisture_Baseline_Survey.pdf', 'East_Godavari_Paddy_Field_Photos.zip']
    });
    setCurrentStep(4);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setAiProgressStage('Analyzing problem semantics & domain classification...');

    setTimeout(() => setAiProgressStage('Extracting technical skills (IoT, ML, Agriculture)...'), 300);
    setTimeout(() => setAiProgressStage('Scanning cross-state duplicate clusters...'), 600);
    setTimeout(() => setAiProgressStage('Generating university & industry match vectors...'), 900);

    const skillsArray = formData.skillsRequiredText.split(',').map(s => s.trim()).filter(Boolean);
    const resourcesArray = formData.resourcesRequiredText.split(',').map(s => s.trim()).filter(Boolean);

    try {
      const created = await submitChallenge({
        title: formData.title,
        problemStatement: formData.problemStatement,
        whyItMatters: formData.whyItMatters,
        targetDemographic: formData.targetDemographic,
        peopleAffected: Number(formData.peopleAffected),
        peopleAffectedLabel: `${formData.peopleAffected}+ farmers`,
        location: {
          state: formData.state,
          district: formData.district,
          villageOrCity: formData.villageOrCity
        },
        category: formData.category,
        skillsRequired: skillsArray,
        resourcesRequired: resourcesArray,
        fundingRequired: formData.fundingRequired,
        priority: formData.priority
      });

      setIsSubmitting(false);
      setSubmittedChallengeId(created.id);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  // Success Confirmation Screen with Direct Smart Next Action
  if (submittedChallengeId) {
    return (
      <div className="max-w-2xl mx-auto py-10 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50 shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs uppercase tracking-wider">
            Step 1 Complete • Pending Admin Verification
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Challenge Submitted Successfully</h1>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Your challenge <strong className="text-slate-900">"{formData.title}"</strong> has been processed by platform AI.
          </p>
        </div>

        {/* AI Analysis Summary Preview */}
        <div className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-md text-left space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Automated Classification</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              92/100 Impact Score
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Domain</span>
              <span className="font-bold text-slate-900">{formData.category} / Smart Farming</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Required Skills</span>
              <span className="font-bold text-indigo-600">IoT, ML, Telemetry</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 font-medium">
            <strong>Top Compatible Partners:</strong> ABC Engineering University (94%), AgriTech Solutions (89%)
          </div>
        </div>

        {/* 1-Click Direct Next Step */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => router.push(`/matching/${submittedChallengeId}`)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <span>Continue to Partner Matching (94%)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => router.push(`/challenges/${submittedChallengeId}`)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            View Challenge Dossier
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header with Quick Fill Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Submit Societal Challenge</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">Step {currentStep}/4</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Document an unaddressed grassroots problem for university & industry matching.
          </p>
        </div>

        <button
          type="button"
          onClick={handleQuickPrefill}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition-all self-start sm:self-center shadow-sm"
          title="Auto-fill with primary Smart Irrigation case study"
        >
          <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
          <span>⚡ 1-Click Demo Pre-Fill</span>
        </button>
      </div>

      {/* Stepper Progress Indicator */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
          {[
            { num: 1, label: '1. Problem' },
            { num: 2, label: '2. Location' },
            { num: 3, label: '3. Resources' },
            { num: 4, label: '4. AI Review' }
          ].map(s => (
            <button
              key={s.num}
              type="button"
              onClick={() => setCurrentStep(s.num)}
              className={`py-2 px-1 rounded-xl transition-all ${
                currentStep === s.num
                  ? 'bg-indigo-600 text-white font-black shadow-sm'
                  : currentStep > s.num
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-50 text-slate-400'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stepper Form Body */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        
        {/* Step 1: Problem */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Step 1 — Problem Definition</h2>
              <p className="text-xs text-slate-500">Provide an exact, factual breakdown of the challenge.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Challenge Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Smart Irrigation for Rural Farmers"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 focus:border-indigo-500 outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Problem Description *</label>
                <textarea
                  rows={3}
                  value={formData.problemStatement}
                  onChange={e => setFormData({ ...formData, problemStatement: e.target.value })}
                  placeholder="Explain what the current bottleneck is..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 focus:border-indigo-500 outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Why This Matters (Consequences) *</label>
                <textarea
                  rows={2}
                  value={formData.whyItMatters}
                  onChange={e => setFormData({ ...formData, whyItMatters: e.target.value })}
                  placeholder="Why is it urgent? What happens if not solved?"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 focus:border-indigo-500 outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Group *</label>
                  <input
                    type="text"
                    value={formData.targetDemographic}
                    onChange={e => setFormData({ ...formData, targetDemographic: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Affected *</label>
                  <input
                    type="number"
                    value={formData.peopleAffected}
                    onChange={e => setFormData({ ...formData, peopleAffected: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location & Category */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Step 2 — Location & Thematic Domain</h2>
              <p className="text-xs text-slate-500">Specify geographic coordinates and category for expert routing.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">District *</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Village / Mandal / Area *</label>
                <input
                  type="text"
                  value={formData.villageOrCity}
                  onChange={e => setFormData({ ...formData, villageOrCity: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Domain Category *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`p-2 rounded-xl border text-center text-xs font-bold transition-all truncate ${
                        formData.category === cat
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-500'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Resources & Skills */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Step 3 — Technical Skills & Field Support</h2>
              <p className="text-xs text-slate-500">What skills and equipment are needed to solve this?</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Required Skills (Comma separated) *</label>
                <input
                  type="text"
                  value={formData.skillsRequiredText}
                  onChange={e => setFormData({ ...formData, skillsRequiredText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Field Testing Resources *</label>
                <textarea
                  rows={2}
                  value={formData.resourcesRequiredText}
                  onChange={e => setFormData({ ...formData, resourcesRequiredText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Estimated Seed Pilot Funding</label>
                <input
                  type="text"
                  value={formData.fundingRequired}
                  onChange={e => setFormData({ ...formData, fundingRequired: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review & AI Trigger */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Step 4 — Final Review & AI Structuring</h2>
              <p className="text-xs text-slate-500">Review your challenge details before submitting for automated AI analysis.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-sm">{formData.title}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[11px]">
                  {formData.category}
                </span>
              </div>

              <p className="text-slate-700 font-normal leading-relaxed">{formData.problemStatement}</p>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Location: </span>
                  <strong className="text-slate-900">{formData.district}, {formData.state}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Beneficiaries: </span>
                  <strong className="text-slate-900">{formData.peopleAffected}+ farmers</strong>
                </div>
              </div>
            </div>

            {isSubmitting && (
              <div className="p-4 rounded-2xl bg-indigo-900 text-white space-y-2 animate-fade-in text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin"></span>
                  <span className="font-bold uppercase tracking-wider text-indigo-200 text-[11px]">AI Intelligence Pipeline Running</span>
                </div>
                <div className="text-slate-200 font-medium">
                  {aiProgressStage}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div></div>}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Analyzing...' : 'Submit Challenge to Platform'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
