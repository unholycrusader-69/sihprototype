import React from 'react';
import { AlertTriangle, Info, Clock } from 'lucide-react';
import { Alert } from '../types';
import { useApp } from '../contexts/AppContext';

interface AlertSystemProps {
  alerts: Alert[];
}

export function AlertSystem({ alerts }: AlertSystemProps) {
  const { darkMode } = useApp();
  
  return (
    <div className="space-y-4">
      {/* Demo Alert Placards */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} border-l-4 border-red-500 p-4 rounded-r-lg`}>
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className={`font-bold ${darkMode ? 'text-red-300' : 'text-red-800'}`}>EXTREME ALERT EXAMPLE</h4>
              <p className={`text-sm ${darkMode ? 'text-red-200' : 'text-red-700'} mt-1`}>
                Safety incidents, system failures, emergency protocols
              </p>
            </div>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} border-l-4 border-[#FFD500] p-4 rounded-r-lg`}>
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-[#FFD500] mt-1 flex-shrink-0" />
            <div>
              <h4 className={`font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>WARNING ALERT EXAMPLE</h4>
              <p className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-700'} mt-1`}>
                Maintenance schedules, policy updates, routine notifications
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg border-l-4 ${
            alert.type === 'extreme'
              ? darkMode ? 'bg-red-900/20 border-red-500' : 'bg-red-50 border-red-500'
              : darkMode ? 'bg-yellow-900/20 border-[#FFD500]' : 'bg-yellow-50 border-[#FFD500]'
          } transition-all duration-300 hover:shadow-md`}
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle 
              className={`w-5 h-5 mt-1 flex-shrink-0 ${
                alert.type === 'extreme' ? 'text-red-500' : 'text-[#FFD500]'
              }`} 
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`font-bold ${
                  alert.type === 'extreme' 
                    ? darkMode ? 'text-red-300' : 'text-red-800' 
                    : darkMode ? 'text-yellow-300' : 'text-yellow-800'
                }`}>
                  {alert.title}
                </h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  alert.type === 'extreme' 
                    ? darkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-700'
                    : darkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {alert.department}
                </span>
              </div>
              <p className={`text-sm mt-2 ${
                alert.type === 'extreme' 
                  ? darkMode ? 'text-red-200' : 'text-red-700'
                  : darkMode ? 'text-yellow-200' : 'text-yellow-700'
              }`}>
                {alert.message}
              </p>
              <div className="flex items-center space-x-2 mt-3">
                <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {alert.timestamp.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}