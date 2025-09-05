import React from 'react';
import { TrendingUp, FileText, Search, Users } from 'lucide-react';
import { DailyStats } from '../types';
import { useApp } from '../contexts/AppContext';

interface StatsPanelProps {
  stats: DailyStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const { darkMode } = useApp();

  const statItems = [
    {
      label: 'Daily Uploads',
      value: stats.uploads,
      icon: FileText,
      color: 'bg-[#00BFA6]',
      change: '+12%'
    },
    {
      label: 'Conversions',
      value: stats.conversions,
      icon: TrendingUp,
      color: 'bg-[#FFD500]',
      change: '+8%'
    },
    {
      label: 'Searches',
      value: stats.searches,
      icon: Search,
      color: 'bg-blue-500',
      change: '+15%'
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: Users,
      color: 'bg-purple-500',
      change: '+5%'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-green-500 font-medium">{item.change}</span>
            </div>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-1`}>
              {item.value.toLocaleString()}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}