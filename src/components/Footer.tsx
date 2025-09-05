import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';

export function Footer() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '', email: '' });

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate feedback submission
    alert('Thank you for your feedback! We will review it shortly.');
    setFeedback({ type: '', message: '', email: '' });
    setFeedbackOpen(false);
  };

  return (
    <footer className="bg-[#0D1B2A] text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-[#00BFA6] mb-4">Contact & Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#00BFA6]" />
                <span className="text-sm">+91 484 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#00BFA6]" />
                <span className="text-sm">support@kmrl.kerala.gov.in</span>
              </div>
            </div>
          </div>

          {/* Quick Feedback */}
          <div>
            <h3 className="font-bold text-[#00BFA6] mb-4">Quick Feedback</h3>
            <button
              onClick={() => setFeedbackOpen(!feedbackOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#00BFA6] hover:bg-[#00BFA6]/80 rounded-lg transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Report Issue</span>
            </button>
          </div>

          {/* System Info */}
          <div>
            <h3 className="font-bold text-[#00BFA6] mb-4">System Status</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">All systems operational</span>
            </div>
          </div>
        </div>

        {/* Feedback Modal */}
        {feedbackOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white text-gray-900 p-6 rounded-lg w-full max-w-md mx-4">
              <h3 className="text-lg font-bold mb-4 text-[#0D1B2A]">Submit Feedback</h3>
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={feedback.type}
                    onChange={(e) => setFeedback({...feedback, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent"
                    required
                  >
                    <option value="">Select feedback type</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="issue">General Issue</option>
                    <option value="praise">Positive Feedback</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={feedback.message}
                    onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent"
                    rows={4}
                    placeholder="Describe your feedback..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    value={feedback.email}
                    onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent"
                    placeholder="your.email@kmrl.kerala.gov.in"
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setFeedbackOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#00BFA6] text-white rounded-lg hover:bg-[#00BFA6]/80 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-300">
            © 2025 Kochi Metro Rail Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}