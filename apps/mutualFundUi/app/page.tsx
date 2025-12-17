'use client';

import React, { useState, useMemo } from 'react';
import { PerformanceChart } from './components/PerformanceChart';
import { InputSidebar } from './components/InputSidebar';
import { generateEnhancedChartData } from './data/enhancedMockFunds';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, Target } from 'lucide-react';

export default function Dashboard() {
  const [amcPreference, setAmcPreference] = useState('all');
  const [assetCategory, setAssetCategory] = useState('equity');
  const [investmentType, setInvestmentType] = useState('sip');
  const [investmentAmount, setInvestmentAmount] = useState(5000);
  const [tenure, setTenure] = useState(5);

  const chartData = useMemo(() => generateEnhancedChartData(), []);

  const stats = [
    {
      label: 'Historical Growth',
      value: '+58%',
      change: '+12.3%',
      icon: TrendingUp,
      color: 'text-[#00C853]',
      bgColor: 'bg-green-900/20',
      isPositive: true,
    },
    {
      label: 'AI Predicted Growth',
      value: '+74%',
      change: '+16%',
      icon: Target,
      color: 'text-[#FFAB00]',
      bgColor: 'bg-yellow-900/20',
      isPositive: true,
    },
    {
      label: 'Predicted Value',
      value: '₹2.75L',
      change: 'From ₹25K',
      icon: Wallet,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      isPositive: true,
    },
  ];

  return (
    <div className="flex gap-6">
      {/* Left Sidebar */}
      <div className="flex-shrink-0">
        <InputSidebar
          amcPreference={amcPreference}
          setAmcPreference={setAmcPreference}
          assetCategory={assetCategory}
          setAssetCategory={setAssetCategory}
          investmentType={investmentType}
          setInvestmentType={setInvestmentType}
          investmentAmount={investmentAmount}
          setInvestmentAmount={setInvestmentAmount}
          tenure={tenure}
          setTenure={setTenure}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>{'>'}</span>
          <span className="text-[#FFAB00]">AI Recommendations</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} border border-gray-800 rounded-lg p-5`}
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`size-8 ${stat.color}`} />
                <div className="flex items-center gap-1 text-sm">
                  {stat.isPositive ? (
                    <ArrowUpRight className="size-4 text-[#00C853]" />
                  ) : (
                    <ArrowDownRight className="size-4 text-red-500" />
                  )}
                  <span className={stat.isPositive ? 'text-[#00C853]' : 'text-red-500'}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className={`text-2xl ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-[#1A2332] rounded-lg border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl text-white mb-1">Portfolio Growth Trajectory</h2>
                <p className="text-sm text-gray-400">Historical NAV Performance vs AI Predicted Path</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#1A237E] rounded-full"></div>
                  <span className="text-sm text-gray-400">Historical NAV Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FFAB00] rounded-full"></div>
                  <span className="text-sm text-gray-400">AI Predicted Path</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <PerformanceChart data={chartData} />
          </div>
        </div>

        {/* Investment Summary */}
        <div className="bg-[#1A2332] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg text-white mb-4">Your Investment Parameters</h3>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-2">Investment Type</div>
              <div className="text-white uppercase tracking-wide">{investmentType}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Amount</div>
              <div className="text-white">₹{investmentAmount.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Tenure</div>
              <div className="text-white">{tenure} Years</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Category</div>
              <div className="text-white capitalize">{assetCategory}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

