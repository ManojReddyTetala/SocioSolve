'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ChallengeCategory } from '@/types';
import { 
  X, 
  Sparkles, 
  Globe, 
  Lightbulb, 
  Megaphone, 
  MapPin, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  Upload,
  Users
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

export default function CreateModal() {
  const { 
    isCreateModalOpen, 
    closeCreateModal, 
    createModalDefaultTab,
    submitChallenge, 
    submitSolutionIdea, 
    submitProjectUpdate,
    challenges,
    projects,
    currentUser 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'CHALLENGE' | 'IDEA' | 'UPDATE'>(createModalDefaultTab || 'CHALLENGE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Challenge Form State
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeProblem, setChallengeProblem] = useState('');
  const [challengeWhyItMatters, setChallengeWhyItMatters] = useState('');
  const [challengeTargetDemographic, setChallengeTargetDemographic] = useState('Smallholder paddy farmers');
  const [challengePeopleAffected, setChallengePeopleAffected] = useState(5000);
  const [challengeState, setChallengeState] = useState('Andhra Pradesh');
  const [challengeDistrict, setChallengeDistrict] = useState('East Godavari');
  const [challengeCategory, setChallengeCategory] = useState<ChallengeCategory>('Agriculture');
  const [challengeSkills, setChallengeSkills] = useState('IoT, Machine Learning, Agriculture, Embedded Systems');

  // Solution Idea State
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaSummary, setIdeaSummary] = useState('');
  const [ideaTech, setIdeaTech] = useState('LoRaWAN, ESP32, Predictive ML, Mobile App');
  const [ideaChallengeId, setIdeaChallengeId] = useState<string>(challenges[0]?.id || '');

  // Project Update State
  const [updateProjectId, setUpdateProjectId] = useState<string>(projects[0]?.id || '');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateMetrics, setUpdateMetrics] = useState('1,240 Farmers Reached • 18% Water Saved');

  if (!isCreateModalOpen) return null;

  const handleQuickPreFillChallenge = () => {
    setChallengeTitle('Smart Irrigation for Rural Farmers');
    setChallengeProblem('Farmers in rural East Godavari rely on fixed irrigation schedules, resulting in unnecessary groundwater consumption (up to 40% excess) and inflated electricity pumping costs.');
    setChallengeWhyItMatters('Groundwater depletion threatens livelihoods of 5,000+ farming families and cuts crop yields by 15-20% due to root rot.');
    setChallengeTargetDemographic('Smallholder paddy & sugarcane farmers');
    setChallengePeopleAffected(5000);
    setChallengeState('Andhra Pradesh');
    setChallengeDistrict('East Godavari');
    setChallengeCategory('Agriculture');
    setChallengeSkills('IoT, Machine Learning, Agriculture, Embedded Systems');
  };

  const handleQuickPreFillIdea = () => {
    setIdeaTitle('Solar-Powered LoRaWAN Telemetry with Vernacular Telugu Voice SMS');
    setIdeaSummary('Deploy capacitive soil moisture sensors linked to a high-gain LoRa gateway that triggers automated Telugu phone advisories when soil moisture drops.');
    setIdeaTech('LoRaWAN 865MHz, Capacitive Sensors, ESP32, Twilio/NIC Gateway');
  };

  const handleQuickPreFillUpdate = () => {
    setUpdateTitle('Milestone 4 Verification: 18% Water Reduction Measured in Mandapeta!');
    setUpdateContent('Field telemetry across 45 pilot acres demonstrated an 18% reduction in pumping water volume and ₹2.4 Lakhs aggregate farmer savings.');
    setUpdateMetrics('1,240 Farmers Reached • 18% Water Saved • ₹2.4L Savings');
  };

  const handleSubmitChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeTitle.trim()) return;
    setIsSubmitting(true);
    await submitChallenge({
      title: challengeTitle,
      problemStatement: challengeProblem,
      whyItMatters: challengeWhyItMatters,
      targetDemographic: challengeTargetDemographic,
      peopleAffected: challengePeopleAffected,
      peopleAffectedLabel: `${challengePeopleAffected.toLocaleString()}+ affected`,
      location: {
        state: challengeState,
        district: challengeDistrict,
        villageOrCity: 'Mandapeta & Rajahmundry Mandals'
      },
      category: challengeCategory,
      skillsRequired: challengeSkills.split(',').map(s => s.trim()).filter(Boolean),
      resourcesRequired: ['Soil moisture telemetry probes', 'Farmland testing plots', 'Vernacular mobile advisory']
    });
    setIsSubmitting(false);
  };

  const handleSubmitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle.trim()) return;
    submitSolutionIdea({
      title: ideaTitle,
      summary: ideaSummary,
      technology: ideaTech.split(',').map(s => s.trim()).filter(Boolean),
      challengeId: ideaChallengeId || undefined
    });
  };

  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTitle.trim()) return;
    submitProjectUpdate({
      projectId: updateProjectId,
      title: updateTitle,
      content: updateContent,
      metricsHighlight: updateMetrics
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 space-y-5 animate-fade-in max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Universal Creation Hub</span>
            <h2 className="text-xl font-extrabold text-slate-900">Post to SocioSolve</h2>
          </div>

          <button
            onClick={closeCreateModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Creation Tabs */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('CHALLENGE')}
            className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 text-xs font-bold ${
              activeTab === 'CHALLENGE'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>🌍 Challenge</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('IDEA')}
            className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 text-xs font-bold ${
              activeTab === 'IDEA'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>💡 Solution Idea</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('UPDATE')}
            className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 text-xs font-bold ${
              activeTab === 'UPDATE'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>📢 Project Update</span>
          </button>
        </div>

        {/* Tab 1: Post Challenge */}
        {activeTab === 'CHALLENGE' && (
          <form onSubmit={handleSubmitChallenge} className="space-y-4 text-xs animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Report a ground problem to find university & startup solvers.</span>
              <button
                type="button"
                onClick={handleQuickPreFillChallenge}
                className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-200 flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-amber-600 fill-amber-600" />
                <span>⚡ Pre-Fill</span>
              </button>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Challenge Title *</label>
              <input
                type="text"
                required
                value={challengeTitle}
                onChange={e => setChallengeTitle(e.target.value)}
                placeholder="e.g. Smart Irrigation for Rural Farmers"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Problem Description *</label>
              <textarea
                rows={3}
                required
                value={challengeProblem}
                onChange={e => setChallengeProblem(e.target.value)}
                placeholder="Explain the bottleneck faced by the community..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Domain *</label>
                <select
                  value={challengeCategory}
                  onChange={e => setChallengeCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none bg-white"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">People Affected *</label>
                <input
                  type="number"
                  value={challengePeopleAffected}
                  onChange={e => setChallengePeopleAffected(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">District, State *</label>
                <input
                  type="text"
                  value={`${challengeDistrict}, ${challengeState}`}
                  onChange={e => {
                    const parts = e.target.value.split(',');
                    setChallengeDistrict(parts[0]?.trim() || '');
                    setChallengeState(parts[1]?.trim() || 'Andhra Pradesh');
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Required Skills *</label>
                <input
                  type="text"
                  value={challengeSkills}
                  onChange={e => setChallengeSkills(e.target.value)}
                  placeholder="IoT, ML, Agriculture..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">AI will automatically analyze and match partners upon posting.</span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Analyzing & Posting...' : 'Post Challenge'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Solution Idea */}
        {activeTab === 'IDEA' && (
          <form onSubmit={handleSubmitIdea} className="space-y-4 text-xs animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Propose a technical concept, algorithm, or hardware prototype.</span>
              <button
                type="button"
                onClick={handleQuickPreFillIdea}
                className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-200 flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-amber-600 fill-amber-600" />
                <span>⚡ Pre-Fill</span>
              </button>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Solution Idea Title *</label>
              <input
                type="text"
                required
                value={ideaTitle}
                onChange={e => setIdeaTitle(e.target.value)}
                placeholder="e.g. Solar LoRaWAN Telemetry with Voice SMS"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Concept Summary *</label>
              <textarea
                rows={3}
                required
                value={ideaSummary}
                onChange={e => setIdeaSummary(e.target.value)}
                placeholder="Describe how this technology solves the societal issue..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Link to Existing Challenge (Optional)</label>
              <select
                value={ideaChallengeId}
                onChange={e => setIdeaChallengeId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none bg-white"
              >
                <option value="">-- General Solution Idea --</option>
                {challenges.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Technology Stack (Comma separated)</label>
              <input
                type="text"
                value={ideaTech}
                onChange={e => setIdeaTech(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Share Idea</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Project Update */}
        {activeTab === 'UPDATE' && (
          <form onSubmit={handleSubmitUpdate} className="space-y-4 text-xs animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Broadcast milestone progress and field results to the platform.</span>
              <button
                type="button"
                onClick={handleQuickPreFillUpdate}
                className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-200 flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-amber-600 fill-amber-600" />
                <span>⚡ Pre-Fill</span>
              </button>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Select Active Project *</label>
              <select
                value={updateProjectId}
                onChange={e => setUpdateProjectId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none bg-white font-bold"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Update Headline *</label>
              <input
                type="text"
                required
                value={updateTitle}
                onChange={e => setUpdateTitle(e.target.value)}
                placeholder="e.g. 18% Water Reduction Measured in Pilot"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Update Narrative *</label>
              <textarea
                rows={3}
                required
                value={updateContent}
                onChange={e => setUpdateContent(e.target.value)}
                placeholder="Describe what was achieved, testing numbers, partner contributions..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Metrics Highlight Badge</label>
              <input
                type="text"
                value={updateMetrics}
                onChange={e => setUpdateMetrics(e.target.value)}
                placeholder="e.g. 1,240 Farmers • 18% Water Saved"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none font-medium"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>Broadcast Update</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
