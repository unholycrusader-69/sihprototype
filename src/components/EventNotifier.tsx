import React from 'react';
import { FileText, Bell, RefreshCw, Clock } from 'lucide-react';
import { Event } from '../types';
import { useApp } from '../contexts/AppContext';

interface EventNotifierProps {
  events: Event[];
}

export function EventNotifier({ events }: EventNotifierProps) {
  const { darkMode } = useApp();
  
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'notice':
        return Bell;
      default:
        return RefreshCw;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'text-blue-500';
      case 'notice':
        return 'text-[#FFD500]';
      default:
        return 'text-[#00BFA6]';
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'}`}>Recent Activity</h2>
        <button className="text-[#00BFA6] hover:text-[#00BFA6]/80 transition-colors duration-200">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {events.map((event) => {
          const Icon = getEventIcon(event.type);
          const colorClass = getEventColor(event.type);
          
          return (
            <div
              key={event.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border ${darkMode ? 'border-gray-700 hover:border-[#00BFA6]/30' : 'border-gray-100 hover:border-[#00BFA6]/30'} hover:shadow-md transition-all duration-200`}
            >
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} ${colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-1`}>{event.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{event.description}</p>
                <div className={`flex items-center space-x-4 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{event.timestamp.toLocaleString()}</span>
                  </div>
                  <span className={`px-2 py-1 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded`}>
                    {event.department}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}