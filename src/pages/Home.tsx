import React from 'react';
import { AlertSystem } from '../components/AlertSystem';
import { EventNotifier } from '../components/EventNotifier';
import { Alert, Event } from '../types';
import { TrendingUp, FileText, Users } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { StatsPanel } from '../components/StatsPanel';

export function Home() {
  const { darkMode } = useApp();
  
  const mockStats = {
    uploads: 1247,
    conversions: 892,
    searches: 3456,
    activeUsers: 342
  };

  // Demo data
  const demoAlerts: Alert[] = [
    {
      id: '1',
      title: 'Track Maintenance Schedule Updated',
      message: 'Emergency maintenance on Line 1 between Aluva and Kalamassery stations scheduled for tomorrow 10 PM - 4 AM.',
      type: 'warning',
      timestamp: new Date(),
      department: 'Maintenance'
    },
    {
      id: '2',
      title: 'Safety Protocol Violation Report',
      message: 'Immediate attention required: Safety gear compliance issue reported at Edapally station. All staff must review updated safety guidelines.',
      type: 'extreme',
      timestamp: new Date(Date.now() - 3600000),
      department: 'Safety & Security'
    }
  ];

  const demoEvents: Event[] = [
    {
      id: '1',
      title: 'Monthly Safety Report Published',
      description: 'October 2025 safety metrics and compliance report now available in the document library.',
      timestamp: new Date(Date.now() - 1800000),
      type: 'document',
      department: 'Safety & Security'
    },
    {
      id: '2',
      title: 'Staff Training Schedule Updated',
      description: 'New technical training sessions added for December 2025. Registration opens Monday.',
      timestamp: new Date(Date.now() - 3600000),
      type: 'notice',
      department: 'Human Resources'
    },
    {
      id: '3',
      title: 'Equipment Procurement Guidelines',
      description: 'Updated procurement procedures for maintenance equipment effective immediately.',
      timestamp: new Date(Date.now() - 7200000),
      type: 'document',
      department: 'Procurement'
    },
    {
      id: '4',
      title: 'System Performance Metrics',
      description: 'Weekly system performance report shows 99.8% uptime across all lines.',
      timestamp: new Date(Date.now() - 10800000),
      type: 'update',
      department: 'Operations'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <StatsPanel stats={mockStats} />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Alert System */}
          <div className="lg:col-span-2">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-6`}>Alert System</h2>
              <AlertSystem alerts={demoAlerts} />
            </div>
          </div>

          {/* Event Notifier */}
          <div className="lg:col-span-3">
            <EventNotifier events={demoEvents} />
          </div>
        </div>
      </div>
    </div>
  );
}