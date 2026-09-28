import React, { useState } from 'react';
import { School, UserPlus, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Register = ({ onNavigateToLogin }) => {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('TEACHER');
  const [department, setDepartment] = useState('Mathematics');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password entry.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register({
        name,
        email,
        password,
        role,
        department,
      });

      if (result.success) {
        setSuccessMsg('Account created successfully! Redirecting to login portal...');
        setTimeout(() => {
          if (onNavigateToLogin) onNavigateToLogin();
        }, 1500);
      } else {
        setError(result.error || 'Registration failed. Email may already be registered.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-card" style={{ maxWidth: '520px' }}>
        <div className="login-brand">
          <div className="login-logo-box">
            <School size={26} />
          </div>
          <h1 className="login-title">Create an Account</h1>
          <p className="login-sub">Register for School Management Portal</p>
        </div>

        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: '#fee2e2',
              color: '#b91c1c',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: '#dcfce7',
              color: '#15803d',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Kamal Perera"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="e.g. kamal@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="form-label">Role</label>
              <select
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="TEACHER">Teacher</option>
                <option value="STUDENT">Student</option>
                <option value="PARENT">Parent</option>
                <option value="PRINCIPAL">Principal</option>
                <option value="REGISTRAR">Registrar Office</option>
                <option value="OWNER">School Owner</option>
              </select>
            </div>

            <div>
              <label className="form-label">Department / Grade</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Grade 10 / Science"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <UserPlus size={18} />
            <span>{isSubmitting ? 'Creating Account...' : 'Register Account'}</span>
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', textAlign: 'center' }}>
          <button
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
            onClick={onNavigateToLogin}
          >
            <ArrowLeft size={16} />
            <span>Already have an account? Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};
