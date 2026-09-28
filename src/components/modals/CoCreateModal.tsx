'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Challenge, CoCreateIdeaNode } from '@/types';
import { 
  X, 
  Lightbulb, 
  Wrench, 
  Users, 
  Rocket, 
  Sparkles, 
  Check, 
  ArrowRight,
  GitBranch,
  ShieldCheck,
  Plus
} from 'lucide-react';

interface CoCreateModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'IDEA' | 'SKILL' | 'SOMEONE' | 'TEAM';
  initialParentId?: string;
}

const COMMON_SKILLS_PRESETS = [
  'IoT Telemetry',
  'Embedded C / ESP32',
  'Edge AI & ML',
  'Soil Sensors',
  'Mobile App (React Native)',
  'FastAPI / Backend',
  'Solar Electronics',
  'Hardware CAD & 3D Print',
  'Agronomy & Soil Science',
  'Community Mobilization',
  'Field Testing Protocols'
];

export default function CoCreateModal({
  challenge,
  isOpen,
  onClose,
  initialTab = 'IDEA',
  initialParentId
}: CoCreateModalProps) {
  const router = useRouter();
  const { 
    currentUser, 
    organizations, 
    allUsers, 
    addCoCreateIdea, 
    bringSkill, 
    bringSomeone, 
    joinTeam,
    projects
  } = useApp();

  const [activeTab, setActiveTab] = useState<'IDEA' | 'SKILL' | 'SOMEONE' | 'TEAM'>(initialTab);

  // 1. Idea Form State
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDesc, setIdeaDesc] = useState('');
  const [selectedParentId, setSelectedParentId] = useState<string | undefined>(initialParentId);

  // 2. Skill Form State
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    challenge.skillsRequired.slice(0, 2)
  );
  const [customSkillInput, setCustomSkillInput] = useState('');

  // 3. Someone Form State
  const [targetPartnerId, setTargetPartnerId] = useState(organizations[0]?.id || '');
  const [nominationReason, setNominationReason] = useState('');

  // 4. Join Team Form State
  const [focusArea, setFocusArea] = useState('Hardware & Prototyping');

  if (!isOpen) return null;

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else {
      setSelectedSkills(prev => [...prev, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customSkillInput.trim()) {
      e.preventDefault();
      if (!selectedSkills.includes(customSkillInput.trim())) {
        setSelectedSkills(prev => [...prev, customSkillInput.trim()]);
      }
      setCustomSkillInput('');
    }
  };

  // Handlers
  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle.trim()) return;
    addCoCreateIdea(challenge.id, ideaTitle, ideaDesc, selectedParentId);
    setIdeaTitle('');
    setIdeaDesc('');
    onClose();
  };

  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkills.length) return;
    bringSkill(challenge.id, selectedSkills);
    onClose();
  };

  const handleSomeoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPartnerId) return;
    bringSomeone(challenge.id, targetPartnerId, nominationReason || 'Recommended for specialized technical domain competence.');
    onClose();
  };

  const handleJoinTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinTeam(challenge.id, focusArea);
    onClose();

    const proj = projects.find(p => p.challengeId === challenge.id);
    if (proj) {
      router.push(`/workspace/${proj.id}`);
    } else {
      router.push('/workspace/proj_smart_irrigation');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/30 text-indigo-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
                Co-Create on Societal Challenge
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
              {challenge.title}
            </h2>
            <p className="text-xs text-slate-300 line-clamp-1 font-normal">
              {challenge.problemStatement}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Pathway Tabs */}
        <div className="grid grid-cols-4 p-2 bg-slate-100 border-b border-slate-200 gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('IDEA')}
            className={`py-2.5 px-2 rounded-2xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all text-center ${
              activeTab === 'IDEA'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-[11px] sm:text-xs">1. Add Idea</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('SKILL')}
            className={`py-2.5 px-2 rounded-2xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all text-center ${
              activeTab === 'SKILL'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Wrench className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-[11px] sm:text-xs">2. Bring Skill</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('SOMEONE')}
            className={`py-2.5 px-2 rounded-2xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all text-center ${
              activeTab === 'SOMEONE'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Users className="w-4 h-4 text-purple-500 shrink-0" />
            <span className="text-[11px] sm:text-xs">3. Bring Someone</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('TEAM')}
            className={`py-2.5 px-2 rounded-2xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all text-center ${
              activeTab === 'TEAM'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Rocket className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-[11px] sm:text-xs">4. Join Team</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 text-xs">
          
          {/* TAB 1: ADD IDEA */}
          {activeTab === 'IDEA' && (
            <form onSubmit={handleIdeaSubmit} className="space-y-4">
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Propose an Approach or Build on Existing Ideas</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Your idea will be linked to this challenge's tree and stream so innovators can branch and collaborate.
                </p>
              </div>

              {/* Build Upon Parent Idea Link */}
              {challenge.ideaNodes && challenge.ideaNodes.length > 0 && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Build upon an existing idea (Optional)</span>
                  </label>
                  <select
                    value={selectedParentId || ''}
                    onChange={e => setSelectedParentId(e.target.value || undefined)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-500"
                  >
                    <option value="">-- Independent Root Idea --</option>
                    {challenge.ideaNodes.map(node => (
                      <option key={node.id} value={node.id}>
                        💡 {node.title} (by {node.author.name})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Idea Title *</label>
                <input
                  type="text"
                  required
                  value={ideaTitle}
                  onChange={e => setIdeaTitle(e.target.value)}
                  placeholder="e.g. Solar Capacitive Telemetry with Telugu SMS Alerts"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Proposed Solution & Approach *</label>
                <textarea
                  required
                  rows={3}
                  value={ideaDesc}
                  onChange={e => setIdeaDesc(e.target.value)}
                  placeholder="Describe how your approach solves the root problem, hardware/software involved, and how farmers or beneficiaries will interact with it..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Post Co-Create Idea</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: BRING SKILL */}
          {activeTab === 'SKILL' && (
            <form onSubmit={handleSkillSubmit} className="space-y-4">
              <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-blue-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-xs">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>Contribute Your Domain Expertise</span>
                </div>
                <p className="text-[11px] text-blue-800">
                  Select the skills and toolsets you can pledge to this project. Team leads can invite you for specific task sprints.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-2">
                  Select Skills you can contribute ({selectedSkills.length} selected):
                </label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
                  {COMMON_SKILLS_PRESETS.map((skill, idx) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Add custom skill tag (Press Enter)</label>
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={e => setCustomSkillInput(e.target.value)}
                  onKeyDown={handleAddCustomSkill}
                  placeholder="e.g. PCB Fabrication, LoRaWAN Gateway, Llama 3 Fine-tuning"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={selectedSkills.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
                >
                  <Check className="w-4 h-4 text-indigo-200" />
                  <span>Pledge {selectedSkills.length} Skills</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: BRING SOMEONE */}
          {activeTab === 'SOMEONE' && (
            <form onSubmit={handleSomeoneSubmit} className="space-y-4">
              <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-purple-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-xs">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Nominate a Researcher, Lab, or Industry Partner</span>
                </div>
                <p className="text-[11px] text-purple-800">
                  Know someone with the ideal research lab, hardware capabilities, or ground access? Introduce them directly.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Partner / Organization to Introduce *</label>
                <select
                  value={targetPartnerId}
                  onChange={e => setTargetPartnerId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-500"
                >
                  <optgroup label="Universities & Research Labs">
                    {organizations.filter(o => o.type === 'UNIVERSITY' || o.type === 'RESEARCH_INSTITUTE').map(org => (
                      <option key={org.id} value={org.id}>🏛️ {org.name} ({org.location})</option>
                    ))}
                  </optgroup>
                  <optgroup label="Industry & Startups">
                    {organizations.filter(o => o.type === 'INDUSTRY' || o.type === 'STARTUP').map(org => (
                      <option key={org.id} value={org.id}>🏢 {org.name} ({org.location})</option>
                    ))}
                  </optgroup>
                  <optgroup label="Community & NGOs">
                    {organizations.filter(o => o.type === 'COMMUNITY' || o.type === 'NGO').map(org => (
                      <option key={org.id} value={org.id}>🌾 {org.name} ({org.location})</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Why are they ideal for this challenge? *</label>
                <textarea
                  required
                  rows={3}
                  value={nominationReason}
                  onChange={e => setNominationReason(e.target.value)}
                  placeholder="e.g. Dr. Ramesh's lab has pre-calibrated soil sensor prototypes and 42 PhD scholars ready for immediate field pilot deployment in Godavari delta..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/20 active:scale-95 transition-all"
                >
                  <Users className="w-4 h-4 text-purple-200" />
                  <span>Introduce Partner</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: JOIN TEAM */}
          {activeTab === 'TEAM' && (
            <form onSubmit={handleJoinTeamSubmit} className="space-y-4">
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-xs">
                  <Rocket className="w-4 h-4 text-emerald-600" />
                  <span>Join the Active Collaborative Solver Team</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Become a registered co-creator on this project and immediately access sprint tasks, live telemetry streams, and solution canvas.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Your Primary Focus Area *</label>
                <select
                  value={focusArea}
                  onChange={e => setFocusArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="Hardware Prototyping & Sensor Nodes">🛠️ Hardware Prototyping & Sensor Nodes</option>
                  <option value="Edge AI, Machine Learning & Telemetry">🧠 Edge AI, Machine Learning & Telemetry</option>
                  <option value="Mobile App & Vernacular Farmer UI">📱 Mobile App & Vernacular Farmer UI</option>
                  <option value="Field Pilot Deployment & Agronomy">🌾 Field Pilot Deployment & Agronomy</option>
                  <option value="Evaluation, Impact & Governance">📊 Evaluation, Impact & Governance</option>
                </select>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20"
                />
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{currentUser.title} • {currentUser.organizationName || 'Member'}</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                >
                  <Rocket className="w-4 h-4 text-emerald-200" />
                  <span>Join Team & Open Workspace →</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
