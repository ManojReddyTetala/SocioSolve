'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
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
  ArrowUpRight
} from 'lucide-react';

export default function ImpactPage() {
  const { impacts, stats, updateImpactMetrics } = useApp();
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
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Impact Telemetry</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                Project-reported & Field Measured
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Social, Economic & Environmental Impact
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Tracking real-world transformation from grassroots challenge submissions to field deployments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiveAdjusting(!isLiveAdjusting)}
              className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Sliders className="w-4 h-4" />
              <span>{isLiveAdjusting ? 'Close Adjuster' : 'Simulate Metric Update'}</span>
            </button>
          </div>
        </div>

        {/* Live Simulator Drawer */}
        {isLiveAdjusting && (
          <div className="p-4 rounded-2xl bg-indigo-900 text-white space-y-4 animate-fade-in text-xs">
            <div className="font-bold flex items-center gap-2 text-indigo-200">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Field Sensor Live Data Simulator (Judge Demonstration Tool)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-indigo-300 mb-1">
                  Beneficiaries Reached: {farmersCount.toLocaleString()} farmers
                </label>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={farmersCount}
                  onChange={e => setFarmersCount(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-indigo-300 mb-1">
                  Cost Savings: ₹{(savingsCount / 100000).toFixed(1)} Lakhs
                </label>
                <input
                  type="range"
                  min="100000"
                  max="1200000"
                  step="20000"
                  value={savingsCount}
                  onChange={e => setSavingsCount(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs"
              >
                Apply Live Sync
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Primary Case Study: Smart Irrigation for Rural Farmers */}
      <div className="bg-white rounded-3xl border border-indigo-200 p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">Featured Deployment Pilot</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Smart Irrigation for Rural Farmers
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{smartIrrigationImpact.location}</span>
            </div>
          </div>

          <Link
            href="/workspace/proj_smart_irrigation"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-center"
          >
            <span>Project Workspace</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Big KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-center">
            <div className="text-2xl sm:text-3xl font-black text-indigo-700">
              {smartIrrigationImpact.farmersOrBeneficiariesReached.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">Farmers Reached</div>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 text-center">
            <div className="text-2xl sm:text-3xl font-black text-sky-700">
              {smartIrrigationImpact.villagesCovered}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">Villages Covered</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              {smartIrrigationImpact.resourceSavingsPercentage}%
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">Water Reduction</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-700">
              ₹{(smartIrrigationImpact.costSavingsINR / 100000).toFixed(1)}L
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">Estimated Savings</div>
          </div>
        </div>

        {/* Before vs After & Timeline Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Before vs After Water Consumption Bar */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">Groundwater Extraction Comparison</h3>
                <p className="text-[11px] text-slate-500">Relative water pumping volume per paddy crop cycle</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                -18% Water Saved
              </span>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={beforeAfterWaterData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="stage" tick={{ fontSize: 10 }} width={140} />
                  <Tooltip formatter={(val: any) => [`${val}%`, 'Water Volume']} />
                  <Bar dataKey="waterUsage" radius={[0, 8, 8, 0]}>
                    {beforeAfterWaterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-[11px] text-slate-600 space-y-1 bg-white p-3 rounded-xl border border-slate-200">
              <div>• <strong>Before:</strong> {smartIrrigationImpact.beforeValue}</div>
              <div>• <strong>After Pilot:</strong> {smartIrrigationImpact.afterValue}</div>
            </div>
          </div>

          {/* Beneficiaries Growth Timeline Area Chart */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">Pilot Adoption Timeline</h3>
                <p className="text-[11px] text-slate-500">Farmers connected across Mandapeta mandals</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                Live Sensor Telemetry
              </span>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={smartIrrigationImpact.progressTimeline}>
                  <defs>
                    <linearGradient id="colorFarmers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="beneficiaries" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorFarmers)" name="Farmers Reached" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="text-[11px] text-slate-500 text-center">
              Field telemetry updated hourly via solar LoRaWAN gateway.
            </div>
          </div>
        </div>
      </div>

      {/* 3. Platform-Wide Aggregate Statistics */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Platform-Wide Aggregate Metrics</span>
            <h2 className="text-xl font-extrabold text-slate-900">National SocioSolve Ecosystem Impact</h2>
          </div>
          <span className="text-xs font-bold text-slate-500">42,000+ Total Beneficiaries</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Challenges by Category Bar Chart */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Challenges by Thematic Domain</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.categoryBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]}>
                    {stats.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Deployed Solutions Trend */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Solutions Deployed Over Time</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.monthlyImpactTrend}>
                  <defs>
                    <linearGradient id="colorDeployed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="deployed" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorDeployed)" name="Deployed Solutions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* State Breakdown Horizontal Bars */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">State-wise Distribution</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {stats.stateBreakdown.map(s => (
              <div key={s.state} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{s.state}</span>
                <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
