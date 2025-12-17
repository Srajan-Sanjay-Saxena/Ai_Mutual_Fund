'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, TrendingUp, Wallet, Settings, Bell, User } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/funds', icon: TrendingUp, label: 'Explore Funds' },
    { path: '/portfolio', icon: Wallet, label: 'My Portfolio' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="bg-[#1A2332] border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FFAB00] to-[#FF6D00] rounded-lg flex items-center justify-center">
              <TrendingUp className="size-6" />
            </div>
            <div>
              <h1 className="text-xl">WealthAI</h1>
              <p className="text-xs text-gray-400">AI-Powered Wealth Building</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Bell className="size-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFAB00] rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors">
              <User className="size-5" />
              <span className="text-sm">Profile</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#1A2332] border-r border-gray-800 fixed left-0 top-[73px] bottom-0 z-40">
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'bg-[#FFAB00] text-black font-medium'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}