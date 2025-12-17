import React from 'react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

interface InputSidebarProps {
  amcPreference: string;
  setAmcPreference: (value: string) => void;
  assetCategory: string;
  setAssetCategory: (value: string) => void;
  investmentType: string;
  setInvestmentType: (value: string) => void;
  investmentAmount: number;
  setInvestmentAmount: (value: number) => void;
  tenure: number;
  setTenure: (value: number) => void;
}

export function InputSidebar({
  amcPreference,
  setAmcPreference,
  assetCategory,
  setAssetCategory,
  investmentType,
  setInvestmentType,
  investmentAmount,
  setInvestmentAmount,
  tenure,
  setTenure,
}: InputSidebarProps) {
  return (
    <div className="w-80 bg-[#1A2332] border border-gray-800 rounded-lg h-fit overflow-y-auto p-6 space-y-6 sticky top-6">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <h2 className="text-lg text-white mb-1">Investment Profile</h2>
        <p className="text-sm text-gray-400">AI-POWERED WEALTH BUILDING</p>
      </div>
      
      {/* AMC Preference */}
      <div className="space-y-2">
        <Label htmlFor="amc-preference" className="text-gray-300 uppercase text-xs">AMC Preference</Label>
        <Select value={amcPreference} onValueChange={setAmcPreference}>
          <SelectTrigger id="amc-preference" className="bg-[#0F1419] border-gray-700 text-white">
            <SelectValue placeholder="Select AMC" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A2332] border-gray-700">
            <SelectItem value="all">All AMCs</SelectItem>
            <SelectItem value="sbi">SBI Mutual Fund</SelectItem>
            <SelectItem value="hdfc">HDFC Mutual Fund</SelectItem>
            <SelectItem value="icici">ICICI Prudential</SelectItem>
            <SelectItem value="axis">Axis Mutual Fund</SelectItem>
            <SelectItem value="nippon">Nippon India MF</SelectItem>
            <SelectItem value="kotak">Kotak Mutual Fund</SelectItem>
            <SelectItem value="aditya-birla">Aditya Birla SL MF</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Asset Category */}
      <div className="space-y-2">
        <Label htmlFor="asset-category" className="text-gray-300 uppercase text-xs">Asset Category</Label>
        <Select value={assetCategory} onValueChange={setAssetCategory}>
          <SelectTrigger id="asset-category" className="bg-[#0F1419] border-gray-700 text-white">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A2332] border-gray-700">
            <SelectItem value="equity" className="text-white">Equity</SelectItem>
            <SelectItem value="debt" className="text-white">Debt</SelectItem>
            <SelectItem value="hybrid" className="text-white">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Investment Type Toggle */}
      <div className="space-y-2">
        <Label className="text-gray-300 uppercase text-xs">Investment Mode</Label>
        <ToggleGroup 
          type="single" 
          value={investmentType} 
          onValueChange={(value) => value && setInvestmentType(value)}
          className="grid grid-cols-2 w-full gap-2"
        >
          <ToggleGroupItem 
            value="sip" 
            className="bg-[#0F1419] border-gray-700 data-[state=on]:bg-[#FFAB00] data-[state=on]:text-black data-[state=on]:border-[#FFAB00] text-white"
          >
            SIP
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="lumpsum" 
            className="bg-[#0F1419] border-gray-700 data-[state=on]:bg-[#FFAB00] data-[state=on]:text-black data-[state=on]:border-[#FFAB00] text-white"
          >
            Lumpsum
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Investment Amount Slider */}
      <div className="space-y-4">
        <Label htmlFor="investment-amount" className="text-gray-300 uppercase text-xs">Investment Amount (₹)</Label>
        <Slider
          id="investment-amount"
          min={investmentType === 'sip' ? 500 : 5000}
          max={investmentType === 'sip' ? 50000 : 1000000}
          step={investmentType === 'sip' ? 500 : 5000}
          value={[investmentAmount]}
          onValueChange={(values) => setInvestmentAmount(values[0]!)}
          className="[&_[role=slider]]:bg-[#FFAB00] [&_.bg-primary]:bg-[#FFAB00]"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">₹</span>
          <Input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
            className="flex-1 bg-[#0F1419] border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Planned Tenure Slider */}
      <div className="space-y-4">
        <Label htmlFor="tenure" className="text-gray-300 uppercase text-xs">Planned Tenure (Years)</Label>
        <Slider
          id="tenure"
          min={1}
          max={30}
          step={1}
          value={[tenure]}
          onValueChange={(values) => setTenure(values[0]!)}
          className="[&_[role=slider]]:bg-[#FFAB00] [&_.bg-primary]:bg-[#FFAB00]"
        />
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="flex-1 bg-[#0F1419] border-gray-700 text-white"
          />
          <span className="text-sm text-gray-400">years</span>
        </div>
      </div>

      {/* Generate Button */}
      <button className="w-full bg-[#FFAB00] hover:bg-[#FF9800] text-black py-3 px-4 rounded-lg transition-colors">
        Generate AI Recommendations
      </button>
    </div>
  );
}