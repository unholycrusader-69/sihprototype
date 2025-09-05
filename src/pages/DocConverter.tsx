import React, { useState, useRef } from 'react';
import { Upload, FileText, Image, Download, Trash2, CheckCircle, XCircle, Loader } from 'lucide-react';
import { Document } from '../types';
import { useApp } from '../contexts/AppContext';
import { StatsPanel } from '../components/StatsPanel';

export function DocConverter() {
  const { darkMode } = useApp();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [conversionSettings, setConversionSettings] = useState({
    fromFormat: 'auto',
    toFormat: 'pdf',
    quality: 'high',
    ocrEnabled: true
  });

  const mockStats = {
    uploads: 1247,
    conversions: 892,
    searches: 3456,
    activeUsers: 342
  };

  const formatOptions = [
    { value: 'auto', label: 'Auto-detect' },
    { value: 'pdf', label: 'PDF Document' },
    { value: 'word', label: 'Word Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'image', label: 'Image/Scan' },
    { value: 'text', label: 'Plain Text' }
  ];

  const outputFormats = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'word', label: 'Word Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'text', label: 'Plain Text' },
    { value: 'csv', label: 'CSV File' }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const newDocuments: Document[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type || 'unknown',
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      uploadedAt: new Date(),
      status: 'processing',
      fromFormat: conversionSettings.fromFormat,
      toFormat: conversionSettings.toFormat
    }));

    setDocuments(prev => [...prev, ...newDocuments]);

    // Simulate conversion process
    newDocuments.forEach(doc => {
      setTimeout(() => {
        setDocuments(prev => prev.map(d => 
          d.id === doc.id 
            ? { ...d, status: Math.random() > 0.1 ? 'converted' : 'failed' }
            : d
        ));
      }, Math.random() * 3000 + 2000);
    });
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader className="w-5 h-5 text-[#00BFA6] animate-spin" />;
      case 'converted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getFileTypeIcon = (type: string) => {
    if (type.includes('image')) {
      return <Image className="w-6 h-6 text-blue-500" />;
    }
    return <FileText className="w-6 h-6 text-gray-500" />;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <StatsPanel stats={mockStats} />
        
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-2`}>Document Converter</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Convert PDFs, images, Word documents, and Excel files into unified readable formats</p>
        </div>

        {/* Conversion Settings */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-8`}>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-4`}>Conversion Settings</h2>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                From Format
              </label>
              <select
                value={conversionSettings.fromFormat}
                onChange={(e) => setConversionSettings({...conversionSettings, fromFormat: e.target.value})}
                className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
              >
                {formatOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-2xl text-[#00BFA6] font-bold">→</div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                To Format
              </label>
              <select
                value={conversionSettings.toFormat}
                onChange={(e) => setConversionSettings({...conversionSettings, toFormat: e.target.value})}
                className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
              >
                {outputFormats.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Quality
              </label>
              <select
                value={conversionSettings.quality}
                onChange={(e) => setConversionSettings({...conversionSettings, quality: e.target.value})}
                className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
              >
                <option value="high">High Quality</option>
                <option value="medium">Medium Quality</option>
                <option value="fast">Fast Processing</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={conversionSettings.ocrEnabled}
                onChange={(e) => setConversionSettings({...conversionSettings, ocrEnabled: e.target.checked})}
                className="w-4 h-4 text-[#00BFA6] border-gray-300 rounded focus:ring-[#00BFA6]"
              />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Enable OCR (Text extraction from images)
              </span>
            </label>
          </div>
        </div>

        {/* Upload Area */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-8`}>
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-[#00BFA6] bg-[#00BFA6]/5' 
                : darkMode 
                  ? 'border-gray-600 hover:border-[#00BFA6] hover:bg-gray-700' 
                  : 'border-gray-300 hover:border-[#00BFA6] hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-2`}>
                  Drag and drop files here
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Supports PDF, JPG, PNG, DOCX, XLSX files up to 50MB each
                </p>
                <button
                  type="button"
                  onClick={handleFileSelect}
                  className="px-6 py-3 bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Select Files
                </button>
              </div>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
            onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
            className="hidden"
          />
        </div>

        {/* Document List */}
        {documents.length > 0 && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-6`}>Processing Queue</h2>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className={`flex items-center justify-between p-4 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg hover:shadow-md transition-all duration-200`}>
                  <div className="flex items-center space-x-4">
                    {getFileTypeIcon(doc.type)}
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'}`}>{doc.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {doc.size} • Uploaded {doc.uploadedAt.toLocaleTimeString()}
                      </p>
                      {doc.fromFormat && doc.toFormat && (
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          Converting: {doc.fromFormat} → {doc.toFormat}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(doc.status)}
                      <span className={`text-sm font-medium ${
                        doc.status === 'converted' ? 'text-green-600' :
                        doc.status === 'failed' ? 'text-red-600' :
                        'text-[#00BFA6]'
                      }`}>
                        {doc.status === 'processing' ? 'Converting...' :
                         doc.status === 'converted' ? 'Ready' :
                         'Failed'}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {doc.status === 'converted' && (
                        <button className="p-2 text-[#00BFA6] hover:bg-[#00BFA6]/10 rounded-lg transition-colors duration-200">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => removeDocument(doc.id)}
                        className={`p-2 text-red-500 ${darkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'} rounded-lg transition-colors duration-200`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}