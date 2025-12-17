'use client'

import React from 'react';
import { TrendingUp, Wallet, PieChart, Clock } from 'lucide-react';

export default function Portfolio() {
  const portfolioStats = [
    {
      label: 'Total Invested',
      value: '₹2,50,000',
      icon: Wallet,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
    },
    {
      label: 'Current Value',
      value: '₹3,15,420',
      icon: TrendingUp,
      color: 'text-[#00C853]',
      bgColor: 'bg-green-900/20',
    },
    {
      label: 'Total Returns',
      value: '+26.17%',
      icon: PieChart,
      color: 'text-[#FFAB00]',
      bgColor: 'bg-yellow-900/20',
    },
    {
      label: 'Time Period',
      value: '2.5 Years',
      icon: Clock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20',
    },
  ];

  const holdings = [
    {
      name: 'Axis Bluechip Fund',
      invested: 50000,
      current: 65200,
      returns: 30.4,
      units: 245.67,
    },
    {
      name: 'HDFC Top 100 Fund',
      invested: 75000,
      current: 92850,
      returns: 23.8,
      units: 512.34,
    },
    {
      name: 'SBI Blue Chip Fund',
      invested: 125000,
      current: 157370,
      returns: 25.9,
      units: 823.91,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-white mb-2">My Portfolio</h1>
        <p className="text-gray-400">Track and manage your investments</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {portfolioStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} border border-gray-800 rounded-lg p-5`}
          >
            <stat.icon className={`size-8 ${stat.color} mb-3`} />
            <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
            <div className={`text-2xl ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Holdings Table */}
      <div className="bg-[#1A2332] border border-gray-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl text-white">Your Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0F1419]">
              <tr>
                <th className="text-left p-4 text-sm text-gray-400">Fund Name</th>
                <th className="text-right p-4 text-sm text-gray-400">Invested</th>
                <th className="text-right p-4 text-sm text-gray-400">Current Value</th>
                <th className="text-right p-4 text-sm text-gray-400">Returns</th>
                <th className="text-right p-4 text-sm text-gray-400">Units</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-800 hover:bg-[#0F1419] transition-colors"
                >
                  <td className="p-4 text-white">{holding.name}</td>
                  <td className="p-4 text-right text-gray-300">
                    ₹{holding.invested.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-right text-white">
                    ₹{holding.current.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-right text-[#00C853]">
                    +{holding.returns.toFixed(1)}%
                  </td>
                  <td className="p-4 text-right text-gray-300">
                    {holding.units.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
