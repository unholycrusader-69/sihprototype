import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { DocConverter } from './pages/DocConverter';
import { DocSearcher } from './pages/DocSearcher';
import { CollaborativeEditor } from './pages/CollaborativeEditor';
import { ExpertiseLogger } from './pages/ExpertiseLogger';
import { Notifications } from './pages/Notifications';
import { ContactUs } from './pages/ContactUs';

function AppContent() {
  const { isAuthenticated, darkMode } = useApp();
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col`}>
      <Header />
      <Navigation onNavigate={handleNavigate} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<DocSearcher />} />
          <Route path="/collaborate" element={<CollaborativeEditor />} />
          <Route path="/converter" element={<DocConverter />} />
          <Route path="/expertise" element={<ExpertiseLogger />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;