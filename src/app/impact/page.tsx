'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  BarChart3, 
  Droplets, 
  Users, 
  MapPin, 
  TrendingUp, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  Layers, 
  Info,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Building2,
  FolderGit2
} from 'lucide-react';

export default function ImpactPage() {
  const { impacts, stats, updateImpactMetrics, currentUser } = useApp();
  const smartIrrigationImpact = impacts[0];

  const [farmersCount, setFarmersCount] = useState<number>(smartIrrigationImpact?.farmersOrBeneficiariesReached || 1240);
  const [savingsCount, setSavingsCount] = useState<number>(smartIrrigationImpact?.costSavingsINR || 240000);
  const [isLiveAdjusting, setIsLiveAdjusting] = useState(false);

  const handleUpdate = () => {
    updateImpactMetrics(smartIrrigationImpact.id, farmersCount, savingsCount);
    setIsLiveAdjusting(false);
  };

  const beforeAfterWaterData = [
    { stage: 'Before Pilot (Baseline)', waterUsage: 100, fill: '#94a3b8' },
    { stage: 'After IoT Telemetry (Current)', waterUsage: 82, fill: '#10b981' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Impact Hero Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg border border-indigo-700/50">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-emerald-300">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Verified Real-World Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Societal, Economic & Ecological Impact
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
            See how grassroots challenges crowdsourced across India are turning into measurable, verified outcomes through university and industry partnerships.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsLiveAdjusting(!isLiveAdjusting)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-300" />
              <span>{isLiveAdjusting ? 'Close Sensor Simulator' : '⚡ Simulate Field Sensor Update'}</span>
            </button>
          </div>
        </div>

        {/* Global Impact Numbers Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10 relative z-10">
          <div>
            <div className="text-xs text-indigo-200 font-semibold uppercase tracking-wider">Challenges Solved</div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">1,240+</div>
          </div>
          <div>
            <div className="text-xs text-indigo-200 font-semibold uppercase tracking-wider">Active Projects</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">356</div>
          </div>
          <div>
            <div className="text-xs text-indigo-200 font-semibold uppercase tracking-wider">Citizens Impacted</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-1">42,000+</div>
          </div>
          <div>
            <div className="text-xs text-indigo-200 font-semibold uppercase tracking-wider">Economic Savings</div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-300 mt-1">₹38.4L</div>
          </div>
        </div>
      </div>

      {/* Live Simulator Drawer (for demonstrating reactive telemetry to SIH judges) */}
      {isLiveAdjusting && (
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-xl space-y-4 animate-fade-in text-xs">
          <div className="font-bold flex items-center justify-between">
            <span className="flex items-center gap-2 text-indigo-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>IoT Soil Sensor Live Stream Telemetry Adjuster</span>
            </span>
            <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2.5 py-0.5 rounded-full border border-indigo-400/30">
              Interactive Test Tool
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Active Farmers Reached:</span>
                <span className="text-emerald-400 font-bold">{farmersCount.toLocaleString()} farmers</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="50"
                value={farmersCount}
                onChange={e => setFarmersCount(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Farmer Cost Savings:</span>
                <span className="text-indigo-300 font-bold">₹{(savingsCount / 100000).toFixed(2)} Lakhs</span>
              </div>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="10000"
                value={savingsCount}
                onChange={e => setSavingsCount(parseInt(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={() => setIsLiveAdjusting(false)}
              className="px-3 py-1.5 rounded-xl text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md"
            >
              Apply Live Update
            </button>
          </div>
        </div>
      )}

      {/* 2. Featured Field Pilot Telemetry (Smart Irrigation Case Study) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                🌾 Active Field Pilot
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> East Godavari District, Andhra Pradesh
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              Smart Irrigation Automation for Paddy & Sugarcane Farmers
            </h2>
          </div>

          <Link
            href="/workspace/proj_smart_irrigation"
            className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Open Project Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Beneficiaries</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {smartIrrigationImpact.farmersOrBeneficiariesReached.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Across 3 rural villages</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Water Reduction</span>
            <div className="text-2xl font-black text-emerald-600 mt-0.5">
              {smartIrrigationImpact.resourceSavingsPercentage}%
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Groundwater conserved</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Direct Savings</span>
            <div className="text-2xl font-black text-indigo-600 mt-0.5">
              ₹{(smartIrrigationImpact.costSavingsINR / 100000).toFixed(2)}L
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">In electricity & diesel pumps</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Sensor Telemetry</span>
            <div className="text-2xl font-black text-purple-600 mt-0.5">
              24/7 Live
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">LoRaWAN Gateway Active</p>
          </div>
        </div>

        {/* Recharts Telemetry Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          {/* Timeline Chart */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900">Farmer Adoption & Water Conserved Timeline</h3>
              <span className="text-[10px] text-slate-400">Monthly Progress</span>
            </div>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={smartIrrigationImpact.progressTimeline}>
                  <defs>
                    <linearGradient id="colorFarmers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="beneficiaries" name="Farmers Connected" stroke="#6366f1" fillOpacity={1} fill="url(#colorFarmers)" />
                  <Area type="monotone" dataKey="resourceSaved" name="Water Saved (kL)" stroke="#10b981" fillOpacity={1} fill="url(#colorWater)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Baseline vs Current Water Usage Bar */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900">Water Consumption Index (Baseline vs Current)</h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">18% Reduction</span>
            </div>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={beforeAfterWaterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="stage" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} domain={[0, 120]} />
                  <Tooltip />
                  <Bar dataKey="waterUsage" name="Water Index (%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Additional Impact Case Studies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
              Healthcare & AI
            </span>
            <span className="text-xs text-slate-400">Araku Valley, AP</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">Remote Tele-Diagnostics for Tribal Primary Health Centers</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            AI edge kit assisting frontline ASHA workers in detecting anemia and diabetic retinopathy in remote hilly terrains without reliable internet.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>👩‍⚕️ 4,800 Patients Screened</span>
            <span className="text-emerald-600">6 Primary Clinics</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700">
              Solar & Livelihood
            </span>
            <span className="text-xs text-slate-400">Kakinada Coast, AP</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">Solar-Powered Micro Cold Storage for Coastal Fisherfolk</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Phase-change material cooling lockers reducing fish post-harvest spoilage by 42% for small-boat artisanal fishermen.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>🐟 350 Fisherfolk Benefited</span>
            <span className="text-emerald-600">42% Spoilage Cut</span>
          </div>
        </div>
      </div>
    </div>
  );
}
