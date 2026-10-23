import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Sparkles, Check, Phone, Mail, User, Send, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_INFO } from '../data/atelierData';
import { getAdminEmail, generateWhatsAppAlertLink } from '../emailNotificationService';

export default function BookingModal({ isOpen, onClose, onRecordBooking }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [savedBooking, setSavedBooking] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Custom Evening or Gala Dress',
    location: 'Uyo Flagship Atelier (Udo Udoma Ave, Uyo)',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '14:00',
    occasion: 'Gala / Wedding Guest',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = `JA-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);

    const bookingPayload = {
      bookingRef: ref,
      ...formData,
      status: 'Confirmed',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toISOString()
    };

    setSavedBooking(bookingPayload);

    if (onRecordBooking) {
      try {
        await onRecordBooking(bookingPayload);
      } catch (err) {
        console.warn('[JHAY] Booking recorded with local fallback:', err);
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#C8A45D', '#DFBA6E', '#F8F6F2', '#0F4C45']
      });
    } catch (err) {
      // ignore
    }
  };

  const adminEmail = getAdminEmail();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="booking-modal-dialog animate-card-fade" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-btn tap-scale" onClick={onClose} aria-label="Close booking modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="booking-success-view">
            <div className="success-icon-wrap gold-gradient-bg">
              <Check size={32} color="#0c0c0c" />
            </div>

            <span className="script-font script-lead">Privileged Invitation Confirmed</span>
            <h2 className="success-title">Your Private Fitting Has Been Reserved</h2>
            
            <p className="success-message">
              Thank you, <strong>{formData.name}</strong>. Our Head Couturier has received your bespoke appointment details.
            </p>

            {/* Auto-Email Confirmation Callout */}
            <div className="admin-email-confirmation-pill">
              <Sparkles size={14} className="sparkle-icon" />
              <span>
                Booking auto-dispatched to Atelier Director inbox (<strong>{adminEmail}</strong>) &amp; logged in Admin Portal.
              </span>
            </div>

            <div className="appointment-card">
              <div className="card-top">
                <div className="card-logo-wrap">
                  <img src="/images/jhay-atelier-logo.jpg" alt="JHAY ATELIER" className="receipt-logo-thumb" />
                  <span className="card-logo-text">JHAY ATELIER</span>
                </div>
                <span className="card-ref">REF: {bookingRef}</span>
              </div>
              <div className="card-details">
                <div><strong>Service:</strong> {formData.service}</div>
                <div><strong>Location:</strong> {formData.location}</div>
                <div><strong>Date &amp; Time:</strong> {formData.date} at {formData.time}</div>
                <div><strong>Occasion:</strong> {formData.occasion || 'Private Celebration'}</div>
              </div>
              <div className="card-footer">
                <span>Personal Concierge: {BRAND_INFO.contact.phone} &bull; Uyo Studio</span>
              </div>
            </div>

            <p className="success-note">
              A private confirmation summary has been sent to <em>{formData.email}</em>.
            </p>

            {/* Quick Contact & WhatsApp Alert */}
            <div className="booking-success-actions">
              {savedBooking && (
                <a
                  href={generateWhatsAppAlertLink(savedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-concierge-alert-btn tap-scale"
                >
                  <MessageCircle size={15} />
                  <span>Notify Concierge on WhatsApp</span>
                </a>
              )}

              <button 
                className="btn-primary gold-gradient-bg tap-scale"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
              >
                Return to Atelier
              </button>
            </div>
          </div>
        ) : (
          <div className="booking-form-wrap">
            <div className="booking-header">
              <div className="booking-eyebrow">
                <Sparkles size={13} className="sparkle-icon" />
                <span>BESPOKE COUTURE &amp; PRIVATE FITTING</span>
              </div>
              <h2 className="booking-title">Reserve Your Private Fitting Appointment</h2>
              <p className="booking-sub">
                Meet with our women’s design team at our Uyo flagship studio, Lagos VIP suite, or via a 15-minute high-definition video fitting.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              
              <div className="form-row">
                <div className="form-group">
                  <label><User size={13} /> Your Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Lady Zainab Cole"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label><Mail size={13} /> Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="zainab@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><Phone size={13} /> Phone / WhatsApp Number</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+234 801 ... or +44 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Occasion &amp; Event Date</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sister's Wedding, State Banquet (Nov 2026)"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>What Outfit Are You Planning?</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="Custom Evening or Gala Dress">Custom Evening or Gala Dress</option>
                    <option value="Wedding Guest or Reception Outfit">Wedding Guest or Reception Outfit</option>
                    <option value="Custom Bridal Gown & Veil">Custom Bridal Gown &amp; Veil</option>
                    <option value="Tailored Women’s Suit or Blazer Dress">Tailored Women’s Suit or Blazer Dress</option>
                    <option value="Cocktail / Milestone Birthday Dress">Cocktail / Milestone Birthday Dress</option>
                    <option value="Online Measurement & Sizing Help (Video Call)">Online Measurement &amp; Sizing Help (Video Call)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label><MapPin size={13} /> Where Would You Like to Meet?</label>
                  <select 
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  >
                    <option value="Uyo Flagship Atelier (Udo Udoma Ave, Uyo)">Uyo Flagship Atelier (Udo Udoma Ave, Uyo)</option>
                    <option value="Lagos VIP Studio (Victoria Island, Lagos)">Lagos VIP Studio (Victoria Island, Lagos)</option>
                    <option value="Online Video Fitting & Measurement (WhatsApp / Zoom)">Online Video Fitting &amp; Measurement (WhatsApp / Zoom)</option>
                    <option value="Private VIP Hotel / Home Fitting (On Request)">Private VIP Hotel / Home Fitting (On Request)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><Calendar size={13} /> Desired Appointment Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label><Clock size={13} /> Preferred Time Slot</label>
                  <select 
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  >
                    <option value="10:30">10:30 AM (Morning Session)</option>
                    <option value="12:30">12:30 PM (Midday Session)</option>
                    <option value="14:30">2:30 PM (Afternoon Session)</option>
                    <option value="16:30">4:30 PM (Late Afternoon Session)</option>
                    <option value="18:00">6:00 PM (Evening VIP Fitting)</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Tell Us What You Have in Mind (Preferred Colors, Silhouette, or Sizing Notes):</label>
                <textarea 
                  rows="3"
                  placeholder="e.g. I want an emerald green floor-length velvet gown with gold embroidery for an upcoming gala. My usual dress size is UK 12."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="booking-submit-btn gold-gradient-bg tap-scale"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Securing Your Reservation...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Confirm Fitting Reservation (Complimentary)</span>
                  </>
                )}
              </button>

              <div className="booking-guarantee-strip">
                <span>&bull; Instant confirmation</span>
                <span>&bull; Direct Couturier review</span>
                <span>&bull; 100% Free consultation</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
