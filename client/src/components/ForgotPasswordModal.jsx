import React, { useState } from 'react';
import { KeyRound, X, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export const ForgotPasswordModal = ({ isOpen, onClose, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: Request Email, 2: Enter OTP Code, 3: Enter New Password, 4: Success
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  if (!isOpen) return null;

  const handleRequestReset = (e) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Generate 6-digit OTP code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setStep(2);
    setInfoMsg(`📧 A 6-digit verification code has been dispatched to ${email}. (Demo OTP Code: ${code})`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');

    if (inputOtp.trim() !== generatedOtp) {
      setError('Invalid 6-digit verification code. Please check your email and try again.');
      return;
    }

    // OTP Verified! Unlock password reset step
    setStep(3);
    setInfoMsg('Identity verified successfully! Enter your new password below.');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Password reset success
    setStep(4);
  };

  const handleResetComplete = () => {
    setEmail('');
    setInputOtp('');
    setGeneratedOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setStep(1);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <KeyRound size={20} color="#4f46e5" />
            <h3 className="modal-title">Password Reset Verification</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              background: '#fee2e2',
              color: '#b91c1c',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {infoMsg && step !== 4 && (
          <div
            style={{
              padding: '0.75rem 0.85rem',
              background: '#e0e7ff',
              color: '#3730a3',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              marginBottom: '1rem',
              fontWeight: 600,
            }}
          >
            {infoMsg}
          </div>
        )}

        {/* Step 1: Request Email */}
        {step === 1 && (
          <form onSubmit={handleRequestReset}>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Enter your registered account email address. We will send a 6-digit OTP verification code to verify your identity.
            </p>

            <div className="form-group">
              <label className="form-label">Registered Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="e.g. teacher@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Send size={16} />
              <span>Send Verification Code</span>
            </button>

            <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.8125rem', color: '#64748b' }}>
              Don't have an account?{' '}
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                onClick={() => {
                  onClose();
                  if (onNavigateToRegister) onNavigateToRegister();
                }}
              >
                Register Here
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Verify 6-Digit Email OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label className="form-label">Enter 6-Digit Verification Code</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 849201"
                maxLength={6}
                value={inputOtp}
                onChange={(e) => setInputOtp(e.target.value)}
                style={{ letterSpacing: '4px', fontSize: '1.2rem', fontWeight: 700, textAlign: 'center' }}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} />
              <span>Verify Code</span>
            </button>
          </form>
        )}

        {/* Step 3: Enter New Password (Unlocked only after OTP verification) */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Update Password
            </button>
          </form>
        )}

        {/* Step 4: Success Confirmation */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ width: '48px', height: '48px', background: '#dcfce7', color: '#15803d', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <CheckCircle2 size={24} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Password Updated Successfully!</h4>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Your account password has been updated. You can now sign in with your new credentials.
            </p>
            <button className="btn-primary" onClick={handleResetComplete}>
              Return to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
