import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Eye, EyeOff, Train } from 'lucide-react';

export function Login() {
  const { setIsAuthenticated, setCurrentUser, setUserRole, language, setLanguage, darkMode } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'employee' | 'admin'>('employee');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setCurrentUser({
        name: loginType === 'admin' ? 'Admin User' : 'Rajesh Kumar',
        email: credentials.email,
        department: loginType === 'admin' ? 'Administration' : 'Operations & Maintenance'
      });
      setUserRole(loginType);
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${darkMode ? 'from-gray-900 to-gray-700' : 'from-[#0D1B2A] to-[#00BFA6]'} flex items-center justify-center px-4`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl p-8 w-full max-w-md`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center">
              <Train className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#0D1B2A]'} mb-2`}>KMRL DocFlow</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Document Management System</p>
          
          {/* Login Type Toggle */}
          <div className="flex justify-center mt-4 mb-4">
            <div className={`flex ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-1`}>
              <button
                onClick={() => setLoginType('employee')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  loginType === 'employee' 
                    ? 'bg-[#00BFA6] text-white shadow' 
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Employee
              </button>
              <button
                onClick={() => setLoginType('admin')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  loginType === 'admin' 
                    ? 'bg-[#00BFA6] text-white shadow' 
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
          
          {/* Language Selection */}
          <div className="flex justify-center mt-4">
            <div className={`flex ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-1`}>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  language === 'en' 
                    ? 'bg-[#00BFA6] text-white shadow' 
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  language === 'ml' 
                    ? 'bg-[#00BFA6] text-white shadow' 
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                മലയാളം
              </button>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              {language === 'en' ? 'Email ID' : 'ഇമെയിൽ ഐഡി'}
            </label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              className={`w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent transition-all duration-200`}
              placeholder={loginType === 'admin' ? 'admin@kmrl.kerala.gov.in' : 'employee@kmrl.kerala.gov.in'}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              {language === 'en' ? 'Password' : 'പാസ്‌വേഡ്'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className={`w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent transition-all duration-200`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>{language === 'en' ? 'Signing In...' : 'സൈൻ ഇൻ ചെയ്യുന്നു...'}</span>
              </div>
            ) : (
              language === 'en' ? 'Sign In' : 'സൈൻ ഇൻ'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className={`mt-6 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
          <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Demo Credentials:</h3>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Email: {loginType}@kmrl.kerala.gov.in
          </p>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Password: demo123</p>
        </div>
      </div>
    </div>
  );
}