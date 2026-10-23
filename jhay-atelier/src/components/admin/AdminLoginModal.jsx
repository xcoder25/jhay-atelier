import React, { useState } from 'react';
import './admin.css';
import { Lock, Key, X, Sparkles, ShieldCheck } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Default Owner PIN: 7777 or password "admin"
    if (pin === '7777' || pin.toLowerCase() === 'admin' || pin === 'jhay2026') {
      setError('');
      onLoginSuccess();
      onClose();
    } else {
      setError('Incorrect Owner PIN. (Use default PIN: 7777)');
    }
  };

  const handleQuickDemo = () => {
    setPin('7777');
    setError('');
    onLoginSuccess();
    onClose();
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
            <Sparkles size={12} color="#C8A45D" /> OWNER &amp; ATELIER DIRECTOR ACCESS
          </span>
          <h2 className="admin-login-title">JHAY ATELIER Command Portal</h2>
          <p className="admin-login-desc">
            Manage real-time client orders, private fitting schedules, catalog pricing, and studio operations.
          </p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <label><Lock size={13} /> Enter Owner Access PIN</label>
            <div className="pin-input-wrap">
              <input 
                type="password" 
                maxLength={10}
                placeholder="Enter 4-digit PIN..." 
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                autoFocus
              />
            </div>
            {error && <span className="admin-error-text">{error}</span>}
          </div>

          <button type="submit" className="admin-login-submit-btn gold-gradient-bg tap-scale">
            <Key size={15} />
            <span>Enter Atelier Portal</span>
          </button>

          <button 
            type="button" 
            className="demo-owner-shortcut-btn tap-scale"
            onClick={handleQuickDemo}
          >
            <ShieldCheck size={14} color="#C8A45D" />
            <span>Instant Owner Access (Demo PIN: 7777)</span>
          </button>
        </form>

      </div>
    </div>
  );
}
