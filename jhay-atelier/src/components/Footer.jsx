import React, { useState } from 'react';
import { Phone, Mail, MapPin, Sparkles, Check, ArrowRight, Clock } from 'lucide-react';
import { BRAND_INFO } from '../data/atelierData';

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function TiktokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.76a4.85 4.85 0 01-1.02-.07z"/>
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function Footer({ onOpenBooking, onOpenAdminLogin }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="contact" className="site-footer">
      
      {/* Newsletter Invitation Bar */}
      <div className="newsletter-section">
        <div className="luxury-container">
          <div className="newsletter-card">
            <div className="newsletter-text-col">
              <span className="newsletter-tag">
                <Sparkles size={11} /> VIP FASHION CLUB · UYO
              </span>
              <h3 className="newsletter-title">Be The First To See New Outfits</h3>
              <p className="newsletter-desc">
                Subscribe to get first access to new dress drops, private sales, and styling tips for your upcoming events.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="newsletter-form">
              {subscribed ? (
                <div className="newsletter-success">
                  <Check size={18} color="#C8A45D" />
                  <span>Welcome to JHAY ATELIER. Your welcome gift guide has been sent to your email!</span>
                </div>
              ) : (
                <div className="newsletter-input-group">
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email address..." 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn gold-gradient-bg tap-scale">
                    <span>Subscribe</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="luxury-container footer-main-content">
        <div className="footer-grid">
          
          {/* Brand Identity */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <img 
                src="/images/jhay-atelier-logo.jpg" 
                alt="JHAY ATELIER" 
                className="footer-official-logo"
              />
              <div className="footer-brand-title-wrap">
                <span className="footer-brand-title">{BRAND_INFO.name}</span>
                <span className="footer-brand-tagline">TAILORED FOR HER.</span>
              </div>
            </div>

            <p className="footer-brand-bio">
              Where elegance is tailored to perfection. Luxury women's evening dresses, tailored suits, and custom celebration outfits — proudly crafted in <strong style={{color: 'var(--c-gold-light)'}}>Uyo, Akwa Ibom</strong>, Nigeria.
            </p>
          </div>

          {/* Atelier Studios & Contact — UPDATED TO UYO */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Our Studio</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Udo Udoma Avenue, Uyo, Akwa Ibom State</span>
              </li>
              <li>
                <Clock size={16} className="contact-icon" />
                <span>Mon – Sat: 10AM – 7PM (Appointment)</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <a href={`tel:${BRAND_INFO.contact.phone}`}>{BRAND_INFO.contact.phone}</a>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <a href={`mailto:${BRAND_INFO.contact.email}`}>{BRAND_INFO.contact.email}</a>
              </li>
            </ul>
            <a 
              href="https://maps.google.com/?q=Uyo+Akwa+Ibom+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-map-link"
            >
              <MapPin size={13} /> View on Google Maps →
            </a>
          </div>

          {/* Quick Links */}
          <div className="footer-col links-col">
            <h4 className="footer-heading">Women's Collections</h4>
            <ul className="footer-links-list">
              <li><a href="#collections">Evening &amp; Gala Dresses</a></li>
              <li><a href="#collections">Tailored Women's Suits</a></li>
              <li><a href="#collections">Cocktail &amp; Dinner Dresses</a></li>
              <li><a href="#collections">Bridal &amp; Wedding Guest</a></li>
              <li><a href="#atelier">How Custom Tailoring Works</a></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="footer-col concierge-col">
            <h4 className="footer-heading">Customer Styling &amp; Help</h4>
            <p className="concierge-desc">
              Need help picking the right size or want a custom color? Chat directly with our personal styling team in Uyo.
            </p>
            <button 
              className="footer-book-btn gold-gradient-bg tap-scale"
              onClick={onOpenBooking}
            >
              <span>Book Sizing Chat</span>
            </button>
            <div className="footer-social-links">
              <a href="#" className="social-link" title="Instagram">
                <InstagramIcon size={16} />
                <span>{BRAND_INFO.social.instagram}</span>
              </a>
              <a href={`https://wa.me/${BRAND_INFO.contact.phone.replace(/[^0-9]/g,'')}`} className="social-link whatsapp-link" title="WhatsApp" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={16} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <span 
              className="footer-copyright"
              onDoubleClick={onOpenAdminLogin}
              style={{ cursor: 'default', userSelect: 'none' }}
            >
              &copy; {new Date().getFullYear()} {BRAND_INFO.name}. All Rights Reserved.
            </span>
            <span className="script-font script-footer-accent">Elegance, Perfectly Tailored.</span>
          </div>
          <div className="footer-bottom-right">
            <span className="footer-location-badge">
              <MapPin size={11} /> Proudly based in Uyo, Akwa Ibom 🇳🇬
            </span>
          </div>
          <div className="footer-bottom-links">
            <a href="#">Privacy Charter</a>
            <span>&bull;</span>
            <a href="#">Terms &amp; Delivery</a>
          </div>
        </div>

      </div>

    </footer>
  );
}
