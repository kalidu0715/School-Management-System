import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileCheck,
  GraduationCap,
  Users,
  HeartHandshake,
  ShieldCheck,
  CreditCard,
  Database,
  School,
  Calendar as CalendarIcon,
  Award,
  MessageSquare,
  FileText,
  DollarSign,
  X,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { activeRoleView, switchRoleView } = useAuth();

  const handleRoleChange = (e) => {
    switchRoleView(e.target.value);
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (onClose) onClose();
  };

  const isAcademicStaff = activeRoleView === 'OWNER' || activeRoleView === 'PRINCIPAL' || activeRoleView === 'TEACHER';
  const isPayrollAuthorized = activeRoleView === 'OWNER' || activeRoleView === 'REGISTRAR';

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
          {/* Brand Title & Close Button */}
          <div className="brand-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="brand-icon">
                <School size={16} />
              </div>
              <span>School Management</span>
            </div>

            <button
              className="icon-btn sidebar-close-btn"
              title="Hide Navigation Bar"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>

          {/* Academics Group */}
          <div className="sidebar-nav-group">
            <div className="sidebar-group-title">ACADEMICS</div>
            <div
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
            <div
              className={`nav-link ${activeTab === 'calendar' ? 'active' : ''}`}
              onClick={() => handleNavClick('calendar')}
            >
              <CalendarIcon size={18} />
              <span>Event Calendar</span>
            </div>
            <div
              className={`nav-link ${activeTab === 'marks' ? 'active' : ''}`}
              onClick={() => handleNavClick('marks')}
            >
              <Award size={18} />
              <span>Student Exam Marks</span>
            </div>
            {isAcademicStaff && (
              <div
                className={`nav-link ${activeTab === 'full-reports' ? 'active' : ''}`}
                onClick={() => handleNavClick('full-reports')}
              >
                <FileText size={18} />
                <span>Full Exam Reports (1-13)</span>
              </div>
            )}
            <div
              className={`nav-link ${activeTab === 'subjects' ? 'active' : ''}`}
              onClick={() => handleNavClick('subjects')}
            >
              <BookOpen size={18} />
              <span>Subjects Catalog</span>
            </div>
            <div
              className={`nav-link ${activeTab === 'exams' ? 'active' : ''}`}
              onClick={() => handleNavClick('exams')}
            >
              <FileCheck size={18} />
              <span>Exams & Grading</span>
            </div>
          </div>

          {/* Financial & Community Group */}
          <div className="sidebar-nav-group">
            <div className="sidebar-group-title">FINANCIAL & COMMUNITY</div>
            <div
              className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => handleNavClick('payments')}
            >
              <DollarSign size={18} />
              <span>Tuition Payments</span>
            </div>
            <div
              className={`nav-link ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => handleNavClick('chat')}
            >
              <MessageSquare size={18} />
              <span>Community Chat</span>
            </div>
            <div
              className={`nav-link ${activeTab === 'teachers' ? 'active' : ''}`}
              onClick={() => handleNavClick('teachers')}
            >
              <GraduationCap size={18} />
              <span>Teachers</span>
            </div>
            <div
              className={`nav-link ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => handleNavClick('students')}
            >
              <Users size={18} />
              <span>Students</span>
            </div>
            <div
              className={`nav-link ${activeTab === 'parents' ? 'active' : ''}`}
              onClick={() => handleNavClick('parents')}
            >
              <HeartHandshake size={18} />
              <span>Parents</span>
            </div>
          </div>

          {/* System Group */}
          <div className="sidebar-nav-group">
            <div className="sidebar-group-title">ADMINISTRATIVE</div>
            {isPayrollAuthorized && (
              <div
                className={`nav-link ${activeTab === 'salary' ? 'active' : ''}`}
                onClick={() => handleNavClick('salary')}
              >
                <CreditCard size={18} />
                <span>Salary Management</span>
              </div>
            )}
            {activeRoleView === 'OWNER' && (
              <div
                className={`nav-link ${activeTab === 'role-management' ? 'active' : ''}`}
                onClick={() => handleNavClick('role-management')}
              >
                <ShieldCheck size={18} />
                <span>Role Management</span>
              </div>
            )}
            {activeRoleView === 'OWNER' && (
              <div
                className={`nav-link ${activeTab === 'db-status' ? 'active' : ''}`}
                onClick={() => handleNavClick('db-status')}
              >
                <Database size={18} />
                <span>DB Status</span>
              </div>
            )}
          </div>
        </div>

        {/* Viewing As Role Selector Pill */}
        <div className="role-switcher-box">
          <label className="role-switcher-label">VIEWING PORTAL AS:</label>
          <select
            className="role-switcher-select"
            value={activeRoleView}
            onChange={handleRoleChange}
          >
            <option value="OWNER">School Owner / Admin</option>
            <option value="REGISTRAR">Registrar Office</option>
            <option value="PRINCIPAL">Principal</option>
            <option value="TEACHER">Teacher (Sajith)</option>
            <option value="STUDENT">Student (Ruwin)</option>
            <option value="PARENT">Parent (Amitha)</option>
          </select>
        </div>
      </aside>
    </>
  );
};
