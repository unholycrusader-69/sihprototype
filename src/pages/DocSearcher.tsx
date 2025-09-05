import React, { useState } from 'react';
import { Search, Filter, FileText, Image, File, Calendar, User, Download } from 'lucide-react';
import { SearchResult } from '../types';
import { useApp } from '../contexts/AppContext';
import { StatsPanel } from '../components/StatsPanel';

export function DocSearcher() {
  const { darkMode, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLanguage, setSearchLanguage] = useState<'en' | 'ml' | 'both'>('both');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [isSearching, setIsSearching] = useState(false);

  const mockStats = {
    uploads: 1247,
    conversions: 892,
    searches: 3456,
    activeUsers: 342
  };

  // Mock search results
  const searchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Safety Protocol Manual 2025',
      content: 'Comprehensive safety guidelines for metro operations including emergency procedures...',
      type: 'pdf',
      department: 'Safety & Security',
      lastModified: new Date(Date.now() - 86400000),
      relevanceScore: 95
    },
    {
      id: '2',
      title: 'Track Maintenance Schedule',
      content: 'Monthly maintenance schedule for all metro lines with detailed inspection points...',
      type: 'excel',
      department: 'Maintenance',
      lastModified: new Date(Date.now() - 172800000),
      relevanceScore: 88
    },
    {
      id: '3',
      title: 'Station Blueprint - Edapally',
      content: 'Architectural drawings and technical specifications for Edapally station...',
      type: 'scan',
      department: 'Engineering',
      lastModified: new Date(Date.now() - 259200000),
      relevanceScore: 82
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'word':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'excel':
        return <File className="w-5 h-5 text-green-500" />;
      case 'scan':
        return <Image className="w-5 h-5 text-purple-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <StatsPanel stats={mockStats} />
        
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-2`}>
            {language === 'en' ? 'Document Searcher' : 'ഡോക്യുമെന്റ് സെർച്ചർ'}
          </h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'en' 
              ? 'Search across all documents with bilingual support' 
              : 'ദ്വിഭാഷാ പിന്തുണയോടെ എല്ലാ ഡോക്യുമെന്റുകളിലും തിരയുക'}
          </p>
        </div>

        {/* Search Interface */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-8`}>
          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            {/* Main Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search documents in English or Malayalam...' : 'ഇംഗ്ലീഷിലോ മലയാളത്തിലോ ഡോക്യുമെന്റുകൾ തിരയുക...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
                />
              </div>
            </div>

            {/* Language Filter */}
            <div>
              <select
                value={searchLanguage}
                onChange={(e) => setSearchLanguage(e.target.value as 'en' | 'ml' | 'both')}
                className={`w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
              >
                <option value="both">Both Languages</option>
                <option value="en">English Only</option>
                <option value="ml">Malayalam Only</option>
              </select>
            </div>

            {/* Search Button */}
            <div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {isSearching ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                File Type
              </label>
              <select
                value={fileTypeFilter}
                onChange={(e) => setFileTypeFilter(e.target.value)}
                className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF Documents</option>
                <option value="word">Word Documents</option>
                <option value="excel">Excel Files</option>
                <option value="scan">Scanned Images</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Department
              </label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
              >
                <option value="all">All Departments</option>
                <option value="safety">Safety & Security</option>
                <option value="maintenance">Maintenance</option>
                <option value="engineering">Engineering</option>
                <option value="operations">Operations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-4">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-4`}>
            Search Results ({searchResults.length})
          </h2>
          
          {searchResults.map((result) => (
            <div
              key={result.id}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getFileIcon(result.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} hover:text-[#00BFA6] cursor-pointer`}>
                      {result.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 bg-[#00BFA6] text-white rounded">
                        {result.relevanceScore}% match
                      </span>
                      <button className="p-2 text-[#00BFA6] hover:bg-[#00BFA6]/10 rounded-lg transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                    {result.content}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {result.department}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {result.lastModified.toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`px-2 py-1 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded text-xs`}>
                      {result.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}