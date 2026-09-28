# 📖 School Management System - Educational Code Explanation Guide

This guide breaks down key code implementations added to the project, explaining **how** they work step-by-step to help you learn React, CSS Design Systems, and Role-Based Access Control (RBAC).

---

## 📑 Table of Contents
1. [Dark & Light Mode Theme System](#1-dark--light-mode-theme-system)
2. [Role-Based Access Control (RBAC) & Conditional Rendering](#2-role-based-access-control-rbac--conditional-rendering)
3. [Exam & Grading Management System](#3-exam--grading-management-system)
4. [Parent Ideas & Complaints Modal System](#4-parent-ideas--complaints-modal-system)

---

## 1. 🌙 Dark & Light Mode Theme System

### How it Works:
We use a **3-part system**:
1. **`ThemeContext.jsx`**: Manages the theme state (`'light'` or `'dark'`), saves it to `localStorage`, and updates the HTML root attribute `data-theme="dark"`.
2. **`global.css`**: Defines CSS color variables for light mode, and overrides them under `[data-theme="dark"]`.
3. **`Header.jsx`**: Provides a Sun/Moon button to toggle theme.

---

### Step 1: `client/src/context/ThemeContext.jsx`
```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 1. Read saved theme from localStorage, default to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sms_theme') || 'light';
  });

  // 2. Whenever 'theme' state changes, set attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sms_theme', theme);
  }, [theme]);

  // 3. Helper function to switch light <-> dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

---

### Step 2: `client/src/styles/global.css`
```css
/* Light Mode Variables (Default) */
:root {
  --bg-app: #f4f5f8;
  --bg-card: #ffffff;
  --text-main: #1e293b;
  --border-light: #e5e7eb;
}

/* Dark Mode Overrides applied when <html data-theme="dark"> */
[data-theme="dark"] {
  --bg-app: #0b0f19;
  --bg-card: #161e2e;
  --bg-sidebar: #111827;
  --border-light: #1f2937;
  --text-main: #f9fafb;
}

/* Apply CSS Variables to elements */
body {
  background-color: var(--bg-app);
  color: var(--text-main);
}

[data-theme="dark"] .top-header {
  background: #111827;
  border-bottom-color: #1f2937;
}

[data-theme="dark"] .data-table th {
  background: #1f2937;
  color: #9ca3af;
}
```

---

### Step 3: Header Toggle Button in `client/src/components/Header.jsx`
```jsx
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="icon-btn"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#fde047" />}
    </button>
  );
};
```

---

## 2. 🔐 Role-Based Access Control (RBAC) & Conditional Rendering

### How it Works:
We retrieve the logged-in role (`activeRoleView`) from `useAuth()`. Then, we use standard JavaScript boolean expressions in JSX (`{condition && <Element />}`) to hide or show buttons and pages.

---

### Example A: Restricting Sidebar Links in `Sidebar.jsx`
```jsx
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { activeRoleView } = useAuth();

  return (
    <aside className="sidebar">
      {/* 1. Role Management: Only visible to School Owner */}
      {activeRoleView === 'OWNER' && (
        <div onClick={() => setActiveTab('role-management')}>
          <span>Role Management</span>
        </div>
      )}

      {/* 2. Salary Management: Visible to Admin (Owner) & Principal */}
      {(activeRoleView === 'OWNER' || activeRoleView === 'PRINCIPAL') && (
        <div onClick={() => setActiveTab('salary')}>
          <span>Salary Management</span>
        </div>
      )}

      {/* 3. DB Status: Only visible to School Owner */}
      {activeRoleView === 'OWNER' && (
        <div onClick={() => setActiveTab('db-status')}>
          <span>DB Status</span>
        </div>
      )}
    </aside>
  );
};
```

---

### Example B: Restricting Widgets on Dashboard in `Dashboard.jsx`
```jsx
const { activeRoleView } = useAuth();
const isOwnerOrPrincipal = activeRoleView === 'OWNER' || activeRoleView === 'PRINCIPAL';
const isOwner = activeRoleView === 'OWNER';

return (
  <div className="content-body">
    <StatCards />

    {/* Recent Cross-Role Activity: Hidden for Students, Teachers & Parents */}
    {isOwnerOrPrincipal && <ActivityTable />}

    {/* PostgreSQL Health Cluster: Visible ONLY to School Owner */}
    {isOwner && (
      <div className="bottom-grid">
        <DBHealthCard />
        <AuthLogsCard />
      </div>
    )}
  </div>
);
```

---

### Example C: Page Guard inside `RoleManagement.jsx`
If a user directly navigates to a protected page, we render an access restriction screen:
```jsx
export const RoleManagement = () => {
  const { activeRoleView } = useAuth();
  const isOwner = activeRoleView === 'OWNER';

  // Guard Clause
  if (!isOwner) {
    return (
      <div className="content-body" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Access Restricted</h2>
        <p>Role Management is strictly restricted to the School Owner role.</p>
      </div>
    );
  }

  return <div>{/* Full Role Table */}</div>;
};
```

---

## 3. 📝 Exam & Grading Management System

### How it Works:
In `Exams.jsx`, we check if the user is a **Teacher, Principal, or School Owner**. If so, we display the **"+ Add New Exam & Grading"** button. Clicking it opens a modal where new exam entries (Title, Subject, Date, Instructor, Grading Criteria) are added to the React state.

---

### Code in `client/src/pages/Exams.jsx`:
```jsx
export const Exams = () => {
  const { activeRoleView } = useAuth();

  // Role Permission Check
  const canAddExam = activeRoleView === 'PRINCIPAL' || activeRoleView === 'TEACHER' || activeRoleView === 'OWNER';

  const [exams, setExams] = useState([
    {
      id: 'ex-1',
      title: 'Spring 2026 Math Final',
      subject: 'Mathematics (MATH-201)',
      grade: 'Grade 11-B',
      date: '2026-03-15',
      status: 'Submitted',
      teacher: 'Sajith',
      gradingScale: 'A+ (90-100), A (80-89), B (70-79)',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="content-body">
      <div className="page-title-row">
        <h1>Examinations & Grade Submissions</h1>

        {/* Button conditionally rendered */}
        {canAddExam && (
          <button className="btn-force-sync" onClick={() => setIsModalOpen(true)}>
            + Add New Exam & Grading
          </button>
        )}
      </div>

      {/* Modal Form for adding new exams */}
      {isModalOpen && (
        <ModalForm onSubmit={(newExamData) => setExams([...exams, newExamData])} />
      )}
    </div>
  );
};
```

---

## 4. 💡 Parent Ideas & Complaints Modal System

### How it Works:
When viewing as a **Parent**, `Parents.jsx` renders an **"+ Add Idea / Complaint"** button. Submitting the modal pushes the feedback into state, which is automatically displayed in both the parent's portal and the Admin/Principal dashboard inbox!

```jsx
// In Parents.jsx
<button className="btn-force-sync" style={{ background: '#7e22ce' }} onClick={() => setIsFeedbackModalOpen(true)}>
  + Add Idea / Complaint
</button>
```

---

### Key Learning Summary:
1. **React State (`useState`)**: Stores dynamic data (e.g. notices, exams, feedback items).
2. **React Context (`useContext`)**: Stores global app configuration shared across components (e.g., active logged-in user, current theme mode).
3. **CSS Variables (`var(--name)`)**: Enables instant theme switching without duplicating stylesheets.
4. **Conditional Rendering (`{condition && <Component />}`)**: Enforces security and role permissions on UI elements.
