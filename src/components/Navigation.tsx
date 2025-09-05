import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Search, FileText, Users, Bell, Edit3, Phone } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface NavigationProps {
  onNavigate: (page: string) => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const { darkMode } = useApp();
  const location = useLocation();
  const currentPage = location.pathname.slice(1) || 'home';

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Doc Searcher', icon: Search },
    { id: 'collaborate', label: 'Collaborate', icon: Edit3 },
    { id: 'converter', label: 'Doc Converter', icon: FileText },
    { id: 'expertise', label: 'Expertise Logger', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'contact', label: 'Contact Us', icon: Phone },
  ];

  return (
    <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-t-2 border-[#00BFA6]`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center space-x-8 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#00BFA6] text-white shadow-lg' 
                    : darkMode 
                      ? 'text-gray-300 hover:text-[#00BFA6] hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-[#00BFA6] hover:bg-gray-50'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}