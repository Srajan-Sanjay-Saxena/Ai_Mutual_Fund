'use client'

import { Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EnhancedFundCard } from '../components/EnhancedFundCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import { enhancedMockFunds } from '../data/enhancedMockFunds';

export default function Funds() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('returns');
  const [filterRisk, setFilterRisk] = useState('all');

  const filteredAndSortedFunds = useMemo(() => {
    let funds = [...enhancedMockFunds];

    // Search filter
    if (searchTerm) {
      funds = funds.filter(
        (fund) =>
          fund.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fund.amc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Risk filter
    if (filterRisk !== 'all') {
      funds = funds.filter((fund) => fund.riskLevel === filterRisk);
    }

    // Sort
    funds.sort((a, b) => {
      switch (sortBy) {
        case 'returns':
          return b.threeYearCAGR - a.threeYearCAGR;
        case 'ai-forecast':
          return b.aiForecastedROI - a.aiForecastedROI;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return funds;
  }, [searchTerm, sortBy, filterRisk]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-white mb-2">AI-Recommended Funds for Your Profile</h1>
        <p className="text-gray-400">
          Showing {filteredAndSortedFunds.length} funds based on your investment preferences
        </p>
      </div>

      {/* Filters */}
      <div className="bg-[#1A2332] border border-gray-800 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              placeholder="Search funds or AMC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#0F1419] border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-gray-400" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-[#0F1419] border-gray-700 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A2332] border-gray-700">
                <SelectItem value="returns" className="text-white">
                  Returns
                </SelectItem>
                <SelectItem value="ai-forecast" className="text-white">
                  AI Forecast
                </SelectItem>
                <SelectItem value="rating" className="text-white">
                  Rating
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRisk} onValueChange={setFilterRisk}>
              <SelectTrigger className="w-48 bg-[#0F1419] border-gray-700 text-white">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A2332] border-gray-700">
                <SelectItem value="all" className="text-white">
                  All Risk Levels
                </SelectItem>
                <SelectItem value="Low" className="text-white">
                  Low
                </SelectItem>
                <SelectItem value="Moderate" className="text-white">
                  Moderate
                </SelectItem>
                <SelectItem value="Moderately High" className="text-white">
                  Moderately High
                </SelectItem>
                <SelectItem value="High" className="text-white">
                  High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Fund Cards Grid */}
      {filteredAndSortedFunds.length === 0 ? (
        <div className="bg-[#1A2332] border border-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">No funds match your search criteria</p>
          <Button
            onClick={() => {
              setSearchTerm('');
              setFilterRisk('all');
            }}
            variant="outline"
            className="mt-4 border-gray-700 text-white hover:bg-gray-800"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAndSortedFunds.map((fund) => (
            <EnhancedFundCard key={fund.id} fund={fund} />
          ))}
        </div>
      )}
    </div>
  );
}
