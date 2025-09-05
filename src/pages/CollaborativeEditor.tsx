import React, { useState } from 'react';
import { Users, Save, History, Bell, Eye, Edit3, MessageCircle } from 'lucide-react';
import { CollaborativeDoc } from '../types';
import { useApp } from '../contexts/AppContext';
import { StatsPanel } from '../components/StatsPanel';

export function CollaborativeEditor() {
  const { darkMode, currentUser } = useApp();
  const [activeDoc, setActiveDoc] = useState<CollaborativeDoc | null>(null);
  const [content, setContent] = useState('');
  const [showVersions, setShowVersions] = useState(false);

  const mockStats = {
    uploads: 1247,
    conversions: 892,
    searches: 3456,
    activeUsers: 342
  };

  const mockDocs: CollaborativeDoc[] = [
    {
      id: '1',
      title: 'Safety Protocol Update 2025',
      content: 'Draft safety protocol updates for metro operations...',
      collaborators: ['Rajesh Kumar', 'Priya Menon', 'Kavitha Nair'],
      lastModified: new Date(Date.now() - 300000),
      version: 3,
      status: 'draft'
    },
    {
      id: '2',
      title: 'Maintenance Schedule Q1',
      content: 'Quarterly maintenance planning document...',
      collaborators: ['Arjun Pillai', 'Rajesh Kumar'],
      lastModified: new Date(Date.now() - 1800000),
      version: 2,
      status: 'review'
    }
  ];

  const handleDocSelect = (doc: CollaborativeDoc) => {
    setActiveDoc(doc);
    setContent(doc.content);
  };

  const handleSave = () => {
    if (activeDoc) {
      // Simulate save with notification
      alert('Document saved successfully! Collaborators have been notified.');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <StatsPanel stats={mockStats} />
        
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-2`}>
            Collaborative Document Editor
          </h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real-time collaborative editing with version control
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Document List */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'}`}>
                  Documents
                </h2>
                <button className="px-3 py-1 bg-[#00BFA6] text-white rounded-lg text-sm hover:bg-[#00BFA6]/90 transition-colors duration-200">
                  New Doc
                </button>
              </div>
              
              <div className="space-y-3">
                {mockDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => handleDocSelect(doc)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      activeDoc?.id === doc.id
                        ? 'bg-[#00BFA6] text-white'
                        : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="font-semibold text-sm mb-1">{doc.title}</h3>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={`px-2 py-1 rounded ${
                        doc.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        doc.status === 'review' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {doc.status}
                      </span>
                      <span>v{doc.version}</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                      <Users className="w-3 h-3" />
                      <span className="text-xs">{doc.collaborators.length} collaborators</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="lg:col-span-3">
            {activeDoc ? (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
                {/* Editor Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'}`}>
                        {activeDoc.title}
                      </h2>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Last modified: {activeDoc.lastModified.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowVersions(!showVersions)}
                        className={`p-2 ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg transition-colors duration-200`}
                      >
                        <History className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#00BFA6] text-white rounded-lg hover:bg-[#00BFA6]/90 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>

                  {/* Collaborators */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Active collaborators:
                      </span>
                    </div>
                    <div className="flex -space-x-2">
                      {activeDoc.collaborators.map((collaborator, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 bg-[#00BFA6] rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                          title={collaborator}
                        >
                          {collaborator.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {activeDoc.collaborators.length} online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="p-6">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={`w-full h-96 p-4 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent resize-none`}
                    placeholder="Start typing your document content..."
                  />
                  
                  {/* Editor Tools */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-4">
                      <button className={`flex items-center space-x-2 px-3 py-2 ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg transition-colors duration-200`}>
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">Comments</span>
                      </button>
                      <button className={`flex items-center space-x-2 px-3 py-2 ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg transition-colors duration-200`}>
                        <Bell className="w-4 h-4" />
                        <span className="text-sm">Notifications</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Auto-saved 2 minutes ago
                      </span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Version History Sidebar */}
                {showVersions && (
                  <div className="absolute right-0 top-0 w-80 h-full bg-white shadow-lg border-l border-gray-200 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-900">Version History</h3>
                      <button
                        onClick={() => setShowVersions(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                    <div className="space-y-3">
                      {[3, 2, 1].map((version) => (
                        <div key={version} className="p-3 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">Version {version}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(Date.now() - version * 3600000).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Updated safety protocols section
                          </p>
                          <button className="text-xs text-[#00BFA6] hover:underline">
                            Restore this version
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12 text-center`}>
                <Edit3 className={`w-16 h-16 ${darkMode ? 'text-gray-600' : 'text-gray-300'} mx-auto mb-4`} />
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Select a document to start editing
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Choose from existing documents or create a new one
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}