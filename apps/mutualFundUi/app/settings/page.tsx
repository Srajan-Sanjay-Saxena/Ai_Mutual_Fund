import React from 'react';
import { User, Bell, Shield, CreditCard } from 'lucide-react';

export default function Settings() {
  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: ['Personal Information', 'Contact Details', 'KYC Documents'],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: ['Email Alerts', 'Push Notifications', 'Investment Updates'],
    },
    {
      title: 'Security',
      icon: Shield,
      items: ['Change Password', 'Two-Factor Authentication', 'Login History'],
    },
    {
      title: 'Payment Methods',
      icon: CreditCard,
      items: ['Bank Accounts', 'UPI', 'Cards'],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {settingsSections.map((section, index) => (
          <div
            key={index}
            className="bg-[#1A2332] border border-gray-800 rounded-lg p-6 hover:border-[#FFAB00] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <section.icon className="size-6 text-[#FFAB00]" />
              <h3 className="text-lg text-white">{section.title}</h3>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
