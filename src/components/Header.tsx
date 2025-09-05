import React from 'react';
import logo from '../assets/logo.jpg';
import { useApp } from '../contexts/AppContext';
import { Globe, Eye, User, LogOut, Moon, Sun, Volume2, VolumeX } from 'lucide-react';

export function Header() {
  const { 
    language, 
    setLanguage, 
    colorBlindMode, 
    setColorBlindMode, 
    darkMode, 
    setDarkMode,
    voiceNarration,
    setVoiceNarration,
    currentUser, 
    setIsAuthenticated 
  } = useApp();

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <header className={`${darkMode ? 'bg-gray-900' : 'bg-[#0D1B2A]'} text-white px-6 py-4 flex justify-between items-center shadow-lg`}>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#00BFA6] rounded-full flex items-center justify-center">
            <img 
            src={logo} 
            alt="KMRL Logo" 
            className="w-10 h-10 object-contain" 
          />
        </div>
        <h1 className="text-xl font-bold text-[#00BFA6]">KMRL DocFlow</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Language Toggle */}
        <button 
          onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/10 hover:bg-white/20'} transition-all duration-200`}
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'മല'}</span>
        </button>

        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            darkMode 
              ? 'bg-yellow-500 text-gray-900' 
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="text-sm font-medium">DM</span>
        </button>

        {/* Color Blind Mode Toggle */}
        <button 
          onClick={() => setColorBlindMode(!colorBlindMode)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            colorBlindMode 
              ? 'bg-[#FFD500] text-[#0D1B2A]' 
              : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">CB</span>
        </button>

        {/* Voice Narration Toggle */}
        <button 
          onClick={() => setVoiceNarration(!voiceNarration)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            voiceNarration 
              ? 'bg-green-500 text-white' 
              : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          {voiceNarration ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="text-sm font-medium">VN</span>
        </button>

        {/* User Menu */}
        {currentUser && (
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-gray-300">{currentUser.department}</p>
            </div>
            <div className="w-10 h-10 bg-[#00BFA6] rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <button 
              onClick={handleLogout}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-white/10'} rounded-lg transition-colors duration-200`}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}