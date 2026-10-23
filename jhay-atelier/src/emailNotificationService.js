// ============================================================
// JHAY ATELIER — Admin Email & Booking Notification Service
// Handles automatic email dispatch to admin whenever a client books,
// plus fallback mailto and WhatsApp concierge notification links.
// ============================================================

import { BRAND_INFO } from './data/atelierData';

const DEFAULT_ADMIN_EMAIL = 'admin@jhayatelier.com';
const STORAGE_KEY_ADMIN_EMAIL = 'jhay_admin_email';

/**
 * Get current configured admin recipient email.
 * Priority: localStorage -> import.meta.env -> BRAND_INFO.contact.email -> DEFAULT
 */
export function getAdminEmail() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY_ADMIN_EMAIL);
    if (saved && saved.trim()) return saved.trim();
  }
  return (
    import.meta.env.VITE_ADMIN_EMAIL ||
    BRAND_INFO.contact.email ||
    DEFAULT_ADMIN_EMAIL
  );
}

/**
 * Save new admin recipient email to localStorage.
 */
export function setAdminEmail(email) {
  if (typeof window !== 'undefined' && email) {
    localStorage.setItem(STORAGE_KEY_ADMIN_EMAIL, email.trim().toLowerCase());
  }
}

/**
 * Send booking notification email automatically via FormSubmit AJAX API.
 * FormSubmit forwards the submission straight to the admin's inbox with zero backend required.
 */
export async function sendBookingToAdmin(booking) {
  const targetEmail = getAdminEmail();
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;

  const subject = `✨ [JHAY ATELIER] New Bespoke Fitting: ${booking.name} — ${booking.date} (${booking.bookingRef || 'Fitting'})`;

  const payload = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    'Booking Reference': booking.bookingRef || 'VIP-RESERVED',
    'Client Full Name': booking.name,
    'Client Email': booking.email,
    'Client Phone / WhatsApp': booking.phone,
    'Outfit / Service Desired': booking.service,
    'Fitting Location': booking.location,
    'Preferred Date': booking.date,
    'Preferred Time': booking.time,
    'Occasion / Event': booking.occasion || 'Private Event / Gala',
    'Client Measurements / Styling Notes': booking.notes || 'None provided by client',
    'Reservation Status': booking.status || 'Confirmed',
    'Received At': new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
    'Atelier Location': BRAND_INFO.contact.address
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`Email dispatch failed with status: ${res.status}`);
    }

    const data = await res.json();
    console.log('[JHAY] Auto email notification dispatched to admin:', targetEmail, data);
    return { success: true, targetEmail, data };
  } catch (err) {
    console.warn('[JHAY] Auto email dispatch warning:', err);
    return { success: false, targetEmail, error: err.message };
  }
}

/**
 * Send a test verification email to admin.
 */
export async function sendTestEmailToAdmin(customEmail = null) {
  const targetEmail = customEmail || getAdminEmail();
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;

  const payload = {
    _subject: `✨ [JHAY ATELIER] Verification Test Notification (${new Date().toLocaleTimeString()})`,
    _template: 'table',
    _captcha: 'false',
    'Test Status': 'Connection Verified',
    'Recipient Admin': targetEmail,
    'Atelier Hotline': BRAND_INFO.contact.phone,
    'Atelier Address': BRAND_INFO.contact.address,
    'Message': 'Your JHAY ATELIER booking notification system is connected and functioning properly! All client fitting appointments will be delivered automatically to this inbox.'
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { success: true, targetEmail, data };
  } catch (err) {
    return { success: false, targetEmail, error: err.message };
  }
}

/**
 * Generate mailto URI for instant client or admin email opening.
 */
export function generateMailtoLink(booking, targetEmail = null) {
  const to = targetEmail || getAdminEmail();
  const subject = encodeURIComponent(`Bespoke Fitting Confirmation: ${booking.bookingRef} — ${booking.name}`);
  const body = encodeURIComponent(
`JHAY ATELIER — BESPOKE FITTING APPOINTMENT
===========================================
Booking Reference: ${booking.bookingRef}
Client Name:       ${booking.name}
Client Phone:      ${booking.phone}
Client Email:      ${booking.email}

Service / Outfit:  ${booking.service}
Fitting Location:  ${booking.location}
Date & Time:       ${booking.date} at ${booking.time}
Occasion:          ${booking.occasion || 'N/A'}

Client Notes:
${booking.notes || 'None'}

Status:            ${booking.status || 'Confirmed'}
Studio Concierge:  ${BRAND_INFO.contact.phone}
Atelier Address:   ${BRAND_INFO.contact.address}
`
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

/**
 * Generate WhatsApp Concierge Alert Link
 */
export function generateWhatsAppAlertLink(booking) {
  const phone = BRAND_INFO.contact.phone.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(
`👑 *NEW ATELIER FITTING BOOKED* 👑
• *Ref:* ${booking.bookingRef}
• *Client:* ${booking.name} (${booking.phone})
• *Service:* ${booking.service}
• *Date:* ${booking.date} @ ${booking.time}
• *Location:* ${booking.location}
• *Occasion:* ${booking.occasion || 'N/A'}
• *Notes:* ${booking.notes || 'N/A'}
_Sent via JHAY ATELIER Website_`
  );
  return `https://wa.me/${phone}?text=${text}`;
}
