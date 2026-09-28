import React, { useState } from 'react';
import { School, LogIn, UserPlus, KeyRound, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ForgotPasswordModal } from '../components/ForgotPasswordModal';

export const Login = ({ onNavigateToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || 'Invalid email or password. Please check your credentials or create a new account.');
      }
    } catch (err) {
      setError('Invalid email or password. Please check your credentials or create a new account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo-box">
            <School size={26} />
          </div>
          <h1 className="login-title">School Management System</h1>
          <p className="login-sub">Role-Based Enterprise Portal Access</p>
        </div>

        {error && (
          <div
            style={{
              padding: '0.85rem 1rem',
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              color: '#b91c1c',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              marginBottom: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              <AlertCircle size={16} />
              <span>Authentication Error</span>
            </div>
            <div>{error}</div>

            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                style={{
                  background: '#b91c1c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
                onClick={onNavigateToRegister}
              >
                <UserPlus size={12} />
                <span>Create New Account</span>
              </button>

              <button
                type="button"
                style={{
                  background: 'white',
                  color: '#b91c1c',
                  border: '1px solid #fca5a5',
                  borderRadius: '6px',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
                onClick={() => setIsForgotPasswordOpen(true)}
              >
                <KeyRound size={12} />
                <span>Forgot Password?</span>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. owner@school.edu or teacher@school.edu"
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                onClick={() => setIsForgotPasswordOpen(true)}
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <LogIn size={18} />
            <span>{isSubmitting ? 'Verifying Credentials...' : 'Sign In'}</span>
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '0.75rem' }}>
            Don't have an account yet?
          </p>
          <button
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', fontWeight: 700 }}
            onClick={onNavigateToRegister}
          >
            <UserPlus size={16} color="#4f46e5" />
            <span>Create New User Account</span>
          </button>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onNavigateToRegister={onNavigateToRegister}
      />
    </div>
  );
};
