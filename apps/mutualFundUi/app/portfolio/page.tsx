'use client'

import React from 'react';
import { ProtectedPage } from '../components/ProtectedPage';
import { TrendingUp, Wallet, PieChart, Clock } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoadingSpinner } from '../components/LoadingSpinner';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const API_ENDPOINT = '/api/v1/ai-mutual-fund-system';

export default function Portfolio() {
  const { data: session } = useSession();
  
  const { data: investments, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE}${API_ENDPOINT}/trading/holdings`, {
        withCredentials: true
      });
      return response.data.data || [];
    },
    enabled: !!session?.user?.id,
  });

  const portfolioStats = React.useMemo(() => {
    if (!investments?.length) {
      return [
        { label: 'Total Invested', value: '₹0', icon: Wallet, color: 'text-blue-400', bgColor: 'bg-blue-900/20' },
        { label: 'Current Value', value: '₹0', icon: TrendingUp, color: 'text-[#00C853]', bgColor: 'bg-green-900/20' },
        { label: 'Total Returns', value: '0%', icon: PieChart, color: 'text-[#FFAB00]', bgColor: 'bg-yellow-900/20' },
        { label: 'Active Funds', value: '0', icon: Clock, color: 'text-purple-400', bgColor: 'bg-purple-900/20' },
      ];
    }

    const totalInvested = investments.reduce((sum: number, inv: any) => sum + (inv.quantity * inv.avgPrice), 0);
    const currentValue = investments.reduce((sum: number, inv: any) => sum + (inv.quantity * inv.currentPrice), 0);
    const returns = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested) * 100 : 0;

    return [
      {
        label: 'Total Invested',
        value: `₹${totalInvested.toLocaleString('en-IN')}`,
        icon: Wallet,
        color: 'text-blue-400',
        bgColor: 'bg-blue-900/20',
      },
      {
        label: 'Current Value',
        value: `₹${currentValue.toLocaleString('en-IN')}`,
        icon: TrendingUp,
        color: 'text-[#00C853]',
        bgColor: 'bg-green-900/20',
      },
      {
        label: 'Total Returns',
        value: `${returns >= 0 ? '+' : ''}${returns.toFixed(2)}%`,
        icon: PieChart,
        color: returns >= 0 ? 'text-[#00C853]' : 'text-red-500',
        bgColor: 'bg-yellow-900/20',
      },
      {
        label: 'Active Funds',
        value: investments.length.toString(),
        icon: Clock,
        color: 'text-purple-400',
        bgColor: 'bg-purple-900/20',
      },
    ];
  }, [investments]);

  return (
    <ProtectedPage>
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
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : !investments?.length ? (
          <div className="p-12 text-center">
            <p className="text-gray-400 text-lg mb-4">No investments yet</p>
            <p className="text-gray-500">Start investing to see your portfolio here</p>
          </div>
        ) : (
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
                {investments.map((investment: any, index: number) => {
                  const invested = investment.quantity * investment.avgPrice;
                  const currentValue = investment.quantity * investment.currentPrice;
                  const returns = invested > 0 ? ((currentValue - invested) / invested) * 100 : 0;
                  
                  return (
                    <tr
                      key={index}
                      className="border-t border-gray-800 hover:bg-[#0F1419] transition-colors"
                    >
                      <td className="p-4 text-white">{investment.name || investment.symbol}</td>
                      <td className="p-4 text-right text-gray-300">
                        ₹{invested.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4 text-right text-white">
                        ₹{currentValue.toLocaleString('en-IN')}
                      </td>
                      <td className={`p-4 text-right ${returns >= 0 ? 'text-[#00C853]' : 'text-red-500'}`}>
                        {returns >= 0 ? '+' : ''}{returns.toFixed(1)}%
                      </td>
                      <td className="p-4 text-right text-gray-300">
                        {investment.quantity.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </ProtectedPage>
  );
}
