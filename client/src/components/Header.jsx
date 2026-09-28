import React, { useState } from 'react';
import { Search, Bell, ChevronRight, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Header = ({ activeTab, onOpenSearch }) => {
  const { user, logout, activeRoleView } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'calendar': return 'Academic Event Calendar';
      case 'marks': return 'Student Exam Marks';
      case 'full-reports': return 'Full Exam Reports (Grades 1-13)';
      case 'payments': return 'Tuition Payment Management';
      case 'chat': return 'Community Chat & Q&A';
      case 'subjects': return 'Subjects Catalog';
      case 'exams': return 'Exams & Grading';
      case 'teachers': return 'Faculty Directory';
      case 'students': return 'Student Roster';
      case 'parents': return 'Parent Network';
      case 'role-management': return 'Access Control Matrix';
      case 'salary':
      case 'billing': return 'Salary Management';
      case 'db-status': return 'PostgreSQL Metrics';
      default: return 'Overview';
    }
  };

  return (
    <header className="top-header">
      {/* Breadcrumb Trail */}
      <div className="breadcrumb-trail">
        <span>Dashboard</span>
        <ChevronRight size={14} />
        <span className="current">{getBreadcrumbTitle()}</span>
      </div>

      {/* Header Controls */}
      <div className="header-controls">
        {/* Search Bar */}
        <div className="search-box" onClick={onOpenSearch}>
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Jump to student or staff..."
            readOnly
          />
        </div>

        {/* Dark/Light Mode Theme Toggle Button */}
        <button
          className="icon-btn"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#fde047" />}
        </button>

        {/* Notification Bell */}
        <button className="icon-btn" title="Notifications">
          <Bell size={18} />
          <span className="notification-badge"></span>
        </button>

        {/* User Profile Pill & Logout Dropdown */}
        <div style={{ position: 'relative' }}>
          <div
            className="user-profile-pill"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="user-name-box">
              <div className="user-name">{user ? user.name : 'ADMIN'}</div>
              <div className="user-role-title">
                {activeRoleView === 'OWNER' ? 'School Owner' : activeRoleView}
              </div>
            </div>
            <div className="avatar-badge">
              {user ? user.avatar : 'AD'}
            </div>
          </div>

          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '115%',
                background: theme === 'dark' ? '#161e2e' : 'white',
                border: '1px solid ' + (theme === 'dark' ? '#374151' : '#e2e8f0'),
                borderRadius: '8px',
                padding: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                minWidth: '180px',
                zIndex: 50,
              }}
            >
              <div
                style={{
                  padding: '0.5rem',
                  fontSize: '0.75rem',
                  color: theme === 'dark' ? '#9ca3af' : '#64748b',
                  borderBottom: '1px solid ' + (theme === 'dark' ? '#1f2937' : '#f1f5f9'),
                  marginBottom: '0.25rem',
                }}
              >
                Logged in as <strong>{user ? user.email : 'owner@school.edu'}</strong>
              </div>
              <button
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
                onClick={logout}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
