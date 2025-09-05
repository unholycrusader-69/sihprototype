import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, MapPin, Award } from 'lucide-react';
import { Expert } from '../types';

export function ExpertiseLogger() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Demo expert data
  const experts: Expert[] = [
    {
      id: '1',
      name: 'Dr. Priya Menon',
      email: 'priya.menon@kmrl.kerala.gov.in',
      department: 'Engineering',
      role: 'Senior Track Engineer',
      skills: ['Track Maintenance', 'Signal Systems', 'Safety Protocols'],
      projects: ['Line 2 Extension', 'Smart Signaling Upgrade'],
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      phone: '+91 9876543210'
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@kmrl.kerala.gov.in',
      department: 'Operations',
      role: 'Operations Manager',
      skills: ['Train Operations', 'Emergency Response', 'Staff Management'],
      projects: ['Peak Hour Optimization', 'Emergency Evacuation Procedures'],
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      phone: '+91 9876543211'
    },
    {
      id: '3',
      name: 'Kavitha Nair',
      email: 'kavitha.nair@kmrl.kerala.gov.in',
      department: 'Safety & Security',
      role: 'Chief Safety Officer',
      skills: ['Risk Assessment', 'Compliance Auditing', 'Security Systems'],
      projects: ['Station Security Upgrade', 'COVID Safety Protocols'],
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      phone: '+91 9876543212'
    },
    {
      id: '4',
      name: 'Arjun Pillai',
      email: 'arjun.pillai@kmrl.kerala.gov.in',
      department: 'Maintenance',
      role: 'Technical Specialist',
      skills: ['Electrical Systems', 'HVAC', 'Preventive Maintenance'],
      projects: ['Station Climate Control', 'Power System Optimization'],
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      phone: '+91 9876543213'
    }
  ];

  const departments = ['all', 'Engineering', 'Operations', 'Safety & Security', 'Maintenance', 'Human Resources'];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         expert.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || expert.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0D1B2A] mb-2">Expertise Logger</h1>
        <p className="text-gray-600">Find the right expert for your project or query</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, skills, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent appearance-none"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Expert Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map((expert) => (
          <div key={expert.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#0D1B2A] text-lg">{expert.name}</h3>
                  <p className="text-[#00BFA6] font-semibold">{expert.role}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{expert.department}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex items-center space-x-1 mb-2">
                  <Award className="w-4 h-4 text-[#FFD500]" />
                  <span className="text-sm font-semibold text-gray-700">Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {expert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#00BFA6]/10 text-[#00BFA6] text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Projects */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Projects</h4>
                <ul className="space-y-1">
                  {expert.projects.map((project, index) => (
                    <li key={index} className="text-xs text-gray-600">• {project}</li>
                  ))}
                </ul>
              </div>

              {/* Contact Actions */}
              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white rounded-lg transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">Call</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExperts.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No experts found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or department filter</p>
        </div>
      )}
    </div>
  );
}