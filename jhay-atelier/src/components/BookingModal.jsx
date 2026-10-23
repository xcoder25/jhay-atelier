import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Sparkles, Check, Phone, Mail, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_INFO } from '../data/atelierData';

export default function BookingModal({ isOpen, onClose, onRecordBooking }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Custom Evening or Gala Dress',
    location: 'Lagos Studio (Victoria Island)',
    date: '2026-11-05',
    time: '14:00',
    occasion: 'Gala / Wedding',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `JA-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);

    if (onRecordBooking) {
      onRecordBooking({
        bookingRef: ref,
        ...formData,
        status: 'Confirmed',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C8A45D', '#DFBA6E', '#F8F6F2', '#0F4C45']
      });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="booking-modal-dialog" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-btn" onClick={onClose} aria-label="Close booking modal">
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
              Thank you, <strong>{formData.name}</strong>. Our Senior Couturier has received your bespoke appointment request.
            </p>

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
                <div><strong>Occasion:</strong> {formData.occasion}</div>
              </div>
              <div className="card-footer">
                <span>Personal Concierge: +234 801 234 5678</span>
              </div>
            </div>

            <p className="success-note">
              A private calendar invitation and atelier preparatory guide has been dispatched to <em>{formData.email}</em>.
            </p>

            <button 
              className="btn-primary gold-gradient-bg"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          <div className="booking-form-wrap">
            <div className="booking-header">
              <div className="booking-eyebrow">
                <Sparkles size={13} className="sparkle-icon" />
                <span>CUSTOM DRESS &amp; FITTING APPOINTMENT</span>
              </div>
              <h2 className="booking-title">Book Your Fitting or Styling Chat</h2>
              <p className="booking-sub">
                Meet with our women’s design team in our Lagos studio, London showroom, or via a convenient 15-minute video call.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              
              <div className="form-row">
                <div className="form-group">
                  <label><User size={13} /> Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Zainab Cole"
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
                    placeholder="+234 ... or +44 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Occasion &amp; Event Date</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sister's Wedding, Gala Dinner (Dec 2026)"
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
                    <option value="Online Measurement & Sizing Help (Video Call)">Online Measurement &amp; Sizing Help (Video Call)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label><MapPin size={13} /> Where Would You Like to Meet?</label>
                  <select 
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  >
                    <option value="Lagos Studio (Victoria Island)">Lagos Studio (Victoria Island)</option>
                    <option value="London Mayfair Showroom">London Mayfair Showroom</option>
                    <option value="Online Video Call (WhatsApp / Zoom)">Online Video Call (WhatsApp / Zoom)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><Calendar size={13} /> Desired Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label><Clock size={13} /> Preferred Time</label>
                  <select 
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  >
                    <option value="11:00">11:00 AM (Morning)</option>
                    <option value="14:00">2:00 PM (Afternoon)</option>
                    <option value="16:30">4:30 PM (Late Afternoon)</option>
                    <option value="18:30">6:30 PM (Evening)</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Tell Us What You Have in Mind (Colors, Dress Styles, or Measurements):</label>
                <textarea 
                  rows="3"
                  placeholder="e.g. I want an emerald green floor-length dress with sleeves for an upcoming awards night. My measurements are Bust 38, Waist 30, Hips 42."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="booking-submit-btn gold-gradient-bg tap-scale">
                <span>Confirm Fitting Reservation (Free)</span>
              </button>

              <p className="privacy-reassurance">
                &bull; 100% Free consultation. No payment required to schedule.
              </p>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
