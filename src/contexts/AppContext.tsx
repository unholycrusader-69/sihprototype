import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userRole: 'admin' | 'employee' | null;
  setUserRole: (role: 'admin' | 'employee' | null) => void;
  language: 'en' | 'ml';
  setLanguage: (value: 'en' | 'ml') => void;
  colorBlindMode: boolean;
  setColorBlindMode: (value: boolean) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  voiceNarration: boolean;
  setVoiceNarration: (value: boolean) => void;
  currentUser: {
    name: string;
    email: string;
    department: string;
  } | null;
  setCurrentUser: (user: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'employee' | null>(null);
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [voiceNarration, setVoiceNarration] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      userRole,
      setUserRole,
      language,
      setLanguage,
      colorBlindMode,
      setColorBlindMode,
      darkMode,
      setDarkMode,
      voiceNarration,
      setVoiceNarration,
      currentUser,
      setCurrentUser
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}