import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SearchModal } from './components/SearchModal';
import { AIChatbot } from './components/AIChatbot';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Calendar } from './pages/Calendar';
import { ExamMarks } from './pages/ExamMarks';
import { FullExamReports } from './pages/FullExamReports';
import { PaymentManagement } from './pages/PaymentManagement';
import { CommunityChat } from './pages/CommunityChat';
import { Subjects } from './pages/Subjects';
import { Exams } from './pages/Exams';
import { Teachers } from './pages/Teachers';
import { Students } from './pages/Students';
import { Parents } from './pages/Parents';
import { RoleManagement } from './pages/RoleManagement';
import { SalaryManagement } from './pages/SalaryManagement';
import { DBStatus } from './pages/DBStatus';

const MainAppLayout = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authScreen, setAuthScreen] = useState('login'); // 'login' or 'register'
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    if (authScreen === 'register') {
      return <Register onNavigateToLogin={() => setAuthScreen('login')} />;
    }
    return <Login onNavigateToRegister={() => setAuthScreen('register')} />;
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <Calendar />;
      case 'marks':
        return <ExamMarks />;
      case 'full-reports':
        return <FullExamReports />;
      case 'payments':
        return <PaymentManagement />;
      case 'chat':
        return <CommunityChat />;
      case 'subjects':
        return <Subjects />;
      case 'exams':
        return <Exams />;
      case 'teachers':
        return <Teachers />;
      case 'students':
        return <Students />;
      case 'parents':
        return <Parents />;
      case 'role-management':
        return <RoleManagement />;
      case 'salary':
      case 'billing':
        return <SalaryManagement />;
      case 'db-status':
        return <DBStatus />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-expanded' : ''}`}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="main-wrapper">
        <Header
          activeTab={activeTab}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        {renderActivePage()}
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(tab) => setActiveTab(tab)}
      />

      {/* Floating AI Assistant Widget */}
      <AIChatbot />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainAppLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
