import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const PREDEFINED_USERS = [
  {
    id: 'usr-1',
    name: 'ADMIN',
    email: 'owner@school.edu',
    password: 'password123',
    role: 'OWNER',
    roleLabel: 'School Owner / Admin',
    avatar: 'AD',
    department: 'Administration',
  },
  {
    id: 'usr-2',
    name: 'Principal',
    email: 'principal@school.edu',
    password: 'password123',
    role: 'PRINCIPAL',
    roleLabel: 'Principal',
    avatar: 'PR',
    department: 'Academic Operations',
  },
  {
    id: 'usr-3',
    name: 'Sajith',
    email: 'teacher@school.edu',
    password: 'password123',
    role: 'TEACHER',
    roleLabel: 'Teacher (Mathematics)',
    avatar: 'SA',
    department: 'Mathematics',
  },
  {
    id: 'usr-4',
    name: 'Ruwin',
    email: 'student@school.edu',
    password: 'password123',
    role: 'STUDENT',
    roleLabel: 'Student (Grade 10)',
    avatar: 'RU',
    department: 'Grade 10-A',
  },
  {
    id: 'usr-5',
    name: 'Amitha',
    email: 'parent@gmail.com',
    password: 'password123',
    role: 'PARENT',
    roleLabel: 'Parent (Ruwin)',
    avatar: 'AM',
    department: 'Guardian',
  },
  {
    id: 'usr-6',
    name: 'Registrar Office',
    email: 'registrar@school.edu',
    password: 'password123',
    role: 'REGISTRAR',
    roleLabel: 'Registrar Office',
    avatar: 'RO',
    department: 'Registrar & Student Records',
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sms_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [registeredAccounts, setRegisteredAccounts] = useState(() => {
    const saved = localStorage.getItem('sms_registered_accounts');
    return saved ? JSON.parse(saved) : PREDEFINED_USERS;
  });

  const [activeRoleView, setActiveRoleView] = useState(() => {
    return user ? user.role : 'OWNER';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sms_auth_user', JSON.stringify(user));
      setActiveRoleView(user.role);
    } else {
      localStorage.removeItem('sms_auth_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sms_registered_accounts', JSON.stringify(registeredAccounts));
  }, [registeredAccounts]);

  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. Try to find user in registered accounts pool
    const foundUser = registeredAccounts.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword
    );

    if (foundUser) {
      const userPayload = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        roleLabel: foundUser.roleLabel || foundUser.role,
        avatar: foundUser.avatar || foundUser.name.substring(0, 2).toUpperCase(),
        department: foundUser.department || 'General',
      };
      setUser(userPayload);
      setActiveRoleView(userPayload.role);
      return { success: true };
    }

    // 2. Fallback to API if backend is connected
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          setActiveRoleView(data.user.role);
          return { success: true };
        }
      }
    } catch (e) {
      // API offline
    }

    return {
      success: false,
      error: 'Invalid email or password. Please check your credentials or create an account.',
    };
  };

  const register = async ({ name, email, password, role, department }) => {
    const cleanEmail = email.trim().toLowerCase();

    // Check if email already exists
    const exists = registeredAccounts.some((u) => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password: password,
      role: role || 'STUDENT',
      roleLabel: role || 'STUDENT',
      avatar: name.substring(0, 2).toUpperCase(),
      department: department || 'General',
    };

    setRegisteredAccounts((prev) => [...prev, newUser]);

    // Send POST to API if connected
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
    } catch (e) {
      // API offline
    }

    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const switchRoleView = (newRole) => {
    setActiveRoleView(newRole);
    // Find matching account for new role or keep current
    const matchingAccount = registeredAccounts.find((u) => u.role === newRole);
    if (matchingAccount) {
      setUser({
        id: matchingAccount.id,
        name: matchingAccount.name,
        email: matchingAccount.email,
        role: matchingAccount.role,
        avatar: matchingAccount.avatar || matchingAccount.name.substring(0, 2).toUpperCase(),
        department: matchingAccount.department || 'General',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        activeRoleView,
        login,
        register,
        logout,
        switchRoleView,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
