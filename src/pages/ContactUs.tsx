import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Users, Building, Handshake } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function ContactUs() {
  const { darkMode } = useApp();
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', department: '', subject: '', message: '' });
  };

  const stakeholders = [
    {
      title: 'Government Officials',
      description: 'Kerala State Government and Transport Department officials',
      icon: Building,
      benefits: ['Policy compliance', 'Regulatory reporting', 'Transparency']
    },
    {
      title: 'Metro Staff',
      description: 'Operations, maintenance, and administrative personnel',
      icon: Users,
      benefits: ['Streamlined workflows', 'Easy document access', 'Collaboration tools']
    },
    {
      title: 'Technology Partners',
      description: 'IT vendors and system integrators',
      icon: Handshake,
      benefits: ['API integration', 'Custom solutions', 'Technical support']
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-16`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-4`}>
            KMRL Document Management Solution
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
            Revolutionizing document workflows for Kochi Metro Rail Limited with intelligent automation, 
            seamless collaboration, and enterprise-grade security.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3 bg-[#00BFA6] text-white rounded-lg hover:bg-[#00BFA6]/90 transition-colors duration-200"
            >
              Get Started
            </button>
            <button
              onClick={() => setActiveTab('partnerships')}
              className={`px-6 py-3 border-2 border-[#00BFA6] text-[#00BFA6] rounded-lg hover:bg-[#00BFA6] hover:text-white transition-colors duration-200`}
            >
              Partnership Opportunities
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'contact', label: 'Contact & Support' },
              { id: 'problem', label: 'Problem Overview' },
              { id: 'solution', label: 'Our Solution' },
              { id: 'stakeholders', label: 'Stakeholders' },
              { id: 'partnerships', label: 'Partnerships' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-[#00BFA6] text-[#00BFA6]'
                    : darkMode
                    ? 'border-transparent text-gray-400 hover:text-gray-300'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-6`}>
                Get in Touch
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#00BFA6] rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'}`}>Phone Support</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>+91 484 123 4567</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Mon-Fri, 9 AM - 6 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#FFD500] rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#0D1B2A]" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'}`}>Email Support</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>support@kmrl.kerala.gov.in</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#0D1B2A] rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'}`}>Office Address</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      KMRL Headquarters<br />
                      Kochi Metro Rail Limited<br />
                      Kochi, Kerala 682001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-6`}>
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
                    required
                  />
                </div>
                
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className={`w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="operations">Operations</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="safety">Safety & Security</option>
                  <option value="engineering">Engineering</option>
                  <option value="admin">Administration</option>
                </select>

                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className={`w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
                  required
                />

                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className={`w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent`}
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-[#00BFA6] text-white py-3 px-6 rounded-lg hover:bg-[#00BFA6]/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Problem Overview Tab */}
        {activeTab === 'problem' && (
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-8 text-center`}>
              The Document Management Challenge
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} p-6 rounded-lg border-l-4 border-red-500`}>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-red-300' : 'text-red-800'} mb-4`}>
                  Current Pain Points
                </h3>
                <ul className={`space-y-2 ${darkMode ? 'text-red-200' : 'text-red-700'}`}>
                  <li>• 1000+ documents processed daily</li>
                  <li>• Manual sorting and categorization</li>
                  <li>• Language barriers (English/Malayalam)</li>
                  <li>• Version control issues</li>
                  <li>• Slow information retrieval</li>
                  <li>• Compliance tracking difficulties</li>
                </ul>
              </div>

              <div className={`${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} p-6 rounded-lg border-l-4 border-yellow-500`}>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-800'} mb-4`}>
                  Business Impact
                </h3>
                <ul className={`space-y-2 ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
                  <li>• Delayed decision making</li>
                  <li>• Increased operational costs</li>
                  <li>• Compliance risks</li>
                  <li>• Staff productivity loss</li>
                  <li>• Information silos</li>
                  <li>• Customer service delays</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Solution Tab */}
        {activeTab === 'solution' && (
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-8 text-center`}>
              Our Comprehensive Solution
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Intelligent Document Processing',
                  description: 'AI-powered OCR and classification for automatic document sorting and indexing',
                  benefits: ['99% accuracy', 'Multi-format support', 'Bilingual processing']
                },
                {
                  title: 'Advanced Search & Discovery',
                  description: 'Semantic search across all documents with natural language queries',
                  benefits: ['Instant results', 'Context-aware', 'Cross-language search']
                },
                {
                  title: 'Collaborative Workflows',
                  description: 'Real-time editing, approval workflows, and version control',
                  benefits: ['Real-time sync', 'Audit trails', 'Role-based access']
                }
              ].map((solution, index) => (
                <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-4`}>
                    {solution.title}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {solution.description}
                  </p>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#00BFA6] rounded-full"></div>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stakeholders Tab */}
        {activeTab === 'stakeholders' && (
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-8 text-center`}>
              Key Stakeholders & Benefits
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {stakeholders.map((stakeholder, index) => {
                const Icon = stakeholder.icon;
                return (
                  <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 text-center`}>
                    <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-2`}>
                      {stakeholder.title}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      {stakeholder.description}
                    </p>
                    <div className="space-y-2">
                      {stakeholder.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-[#FFD500] rounded-full"></div>
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Partnerships Tab */}
        {activeTab === 'partnerships' && (
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-8 text-center`}>
              Partnership & Outsourcing Opportunities
            </h2>
            
            <div className="space-y-8">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-4`}>
                  Technology Integration Partners
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  We're seeking technology partners to enhance our document management capabilities with cutting-edge AI, 
                  machine learning, and cloud infrastructure solutions.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-2`}>
                      Areas of Collaboration:
                    </h4>
                    <ul className={`space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>• AI/ML model development</li>
                      <li>• Cloud infrastructure</li>
                      <li>• Security solutions</li>
                      <li>• Mobile applications</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-2`}>
                      Partnership Benefits:
                    </h4>
                    <ul className={`space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>• Long-term contracts</li>
                      <li>• Government backing</li>
                      <li>• Scalable opportunities</li>
                      <li>• Reference projects</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-4`}>
                  Outsourcing Services
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  KMRL offers specialized document management services to other government agencies and 
                  transportation authorities looking to modernize their document workflows.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    'Document digitization',
                    'OCR processing',
                    'Data entry services',
                    'Compliance auditing',
                    'Training programs',
                    'System integration'
                  ].map((service, index) => (
                    <div key={index} className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg text-center`}>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}