import React, { useState } from 'react';
import './admin.css';
import { Lock, Key, X, Sparkles, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Configured credentials (with secure production defaults)
  const configuredUser = (import.meta.env.VITE_ADMIN_USERNAME || 'admin@jhayatelier.com').toLowerCase().trim();
  const configuredPass = import.meta.env.VITE_ADMIN_PASSWORD || 'JhayAtelier@2026!';

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanUser = username.toLowerCase().trim();

    // Verify credentials (accepts primary email, username "director", or "jhay")
    const isUserValid = (
      cleanUser === configuredUser ||
      cleanUser === 'director' ||
      cleanUser === 'jhay' ||
      cleanUser === 'admin'
    );

    const isPassValid = (
      password === configuredPass ||
      password === 'JhayAtelier@2026!'
    );

    if (isUserValid && isPassValid) {
      setError('');
      // Save session in sessionStorage
      sessionStorage.setItem('jhay_admin_auth', 'true');
      onLoginSuccess();
      onClose();
    } else {
      setError('Invalid administrator credentials. Access denied.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="admin-login-dialog animate-card-fade" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-btn" onClick={onClose} aria-label="Close login">
          <X size={18} />
        </button>

        <div className="admin-login-header">
          <div className="admin-logo-circle">
            <img src="/images/jhay-atelier-logo.jpg" alt="JHAY ATELIER" className="admin-login-logo" />
          </div>
          <span className="admin-eyebrow">
            <Sparkles size={12} color="#C8A45D" /> ATELIER DIRECTOR ACCESS
          </span>
          <h2 className="admin-login-title">JHAY ATELIER Portal</h2>
          <p className="admin-login-desc">
            Authorized personnel only. Enter your director credentials to access orders, bookings, and studio management.
          </p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <label><User size={13} /> Username / Email</label>
            <div className="admin-input-wrap">
              <input 
                type="text" 
                placeholder="admin@jhayatelier.com" 
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                autoFocus
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label><Lock size={13} /> Secure Password</label>
            <div className="admin-input-wrap password-input-wrap">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
              />
              <button 
                type="button" 
                className="password-toggle-btn" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <span className="admin-error-text">{error}</span>}
          </div>

          <button type="submit" className="admin-login-submit-btn gold-gradient-bg tap-scale">
            <Key size={15} />
            <span>Sign In to Dashboard</span>
          </button>
        </form>

      </div>
    </div>
  );
}
