import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Calendar, Menu, X, Globe, Sparkles, ChevronRight, Phone, MapPin } from 'lucide-react';
import { BRAND_INFO, CURRENCIES } from '../data/atelierData';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenBooking,
  onOpenWishlist,
  currentCurrency,
  onCurrencyChange,
  onOpenAdminLogin
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      {/* Top Luxury Announcement — Marquee Ticker */}
      <div className="announcement-bar">
        <div className="announcement-marquee-track">
          <div className="announcement-marquee-inner">
            <span className="announcement-tag">
              <Sparkles size={11} className="sparkle-icon" /> WOMEN&apos;S COUTURE &middot; UYO
            </span>
            <span className="announcement-text">
              Complimentary Nationwide Delivery on Orders Over &#8358;2,000,000 &bull; Uyo Flagship Atelier &bull; Video Fittings Available
            </span>
            <span className="announcement-sep">&#10022;</span>
            <span className="announcement-tag">
              <Sparkles size={11} className="sparkle-icon" /> BESPOKE TAILORING
            </span>
            <span className="announcement-text">
              Now Taking Orders for 2025 Events &bull; Book Your Fitting Today &bull; Uyo, Akwa Ibom &#127475;&#127468;
            </span>
            <span className="announcement-sep">&#10022;</span>
            {/* Seamless loop repeat */}
            <span className="announcement-tag">
              <Sparkles size={11} className="sparkle-icon" /> WOMEN&apos;S COUTURE &middot; UYO
            </span>
            <span className="announcement-text">
              Complimentary Nationwide Delivery on Orders Over &#8358;2,000,000 &bull; Uyo Flagship Atelier &bull; Video Fittings Available
            </span>
            <span className="announcement-sep">&#10022;</span>
            <span className="announcement-tag">
              <Sparkles size={11} className="sparkle-icon" /> BESPOKE TAILORING
            </span>
            <span className="announcement-text">
              Now Taking Orders for 2025 Events &bull; Book Your Fitting Today &bull; Uyo, Akwa Ibom &#127475;&#127468;
            </span>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <nav className="main-nav">
        <div className="luxury-container nav-container">
          
          {/* Left: Mobile Menu Toggle & Desktop Navigation Links */}
          <div className="nav-left-group">
            <button 
              className="mobile-toggle-btn tap-scale"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Desktop Navigation Links */}
            <div className="nav-links left-links">
              <a href="#collections" className="nav-link">Dresses &amp; Outfits</a>
              <a href="#collections" className="nav-link">Evening Gowns</a>
              <a href="#atelier" className="nav-link">How It Works</a>
              <a href="#lookbook" className="nav-link">Reviews</a>
            </div>
          </div>

          {/* Center: Official JHAY ATELIER Medallion Logo */}
          <a href="#" className="brand-logo-container tap-scale" aria-label="JHAY ATELIER Home">
            <div className="official-logo-medallion-wrap">
              <img 
                src="/images/jhay-atelier-logo.jpg" 
                alt="JHAY ATELIER Official Logo" 
                className="official-logo-medallion"
              />
              <div className="logo-glow-ring"></div>
            </div>
            <div className="brand-text-block">
              <span className="brand-title">JHAY ATELIER</span>
              <span className="brand-subtitle">TAILORED FOR HER.</span>
            </div>
          </a>

          {/* Right Action Icons & CTA */}
          <div className="nav-actions">
            
            {/* Currency Quick Switcher */}
            <div className="currency-selector-wrapper">
              <button 
                className="currency-trigger tap-scale"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                title="Select Currency"
                aria-label="Change currency"
              >
                <Globe size={13} />
                <span className="currency-label">{currentCurrency}</span>
              </button>

              {currencyDropdownOpen && (
                <div className="currency-dropdown animate-card-fade">
                  {Object.keys(CURRENCIES).map((currKey) => (
                    <button
                      key={currKey}
                      className={`currency-option ${currentCurrency === currKey ? 'active' : ''}`}
                      onClick={() => {
                        onCurrencyChange(currKey);
                        setCurrencyDropdownOpen(false);
                      }}
                    >
                      {CURRENCIES[currKey].label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Button (hidden on mobile phones to prioritize bottom bar) */}
            <button 
              className="action-icon-btn nav-wishlist-btn tap-scale" 
              onClick={onOpenWishlist}
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
            </button>

            {/* Shopping Bag Button */}
            <button 
              className="action-icon-btn bag-btn tap-scale" 
              onClick={onOpenCart}
              title="View Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="action-badge pulse">{cartCount}</span>}
            </button>

            {/* Book Consultation Button (Desktop) */}
            <button 
              className="book-consultation-btn gold-gradient-bg tap-scale"
              onClick={onOpenBooking}
            >
              <Calendar size={14} />
              <span>Book Fitting</span>
            </button>

          </div>

        </div>

        {/* Mobile / iPhone Fullscreen Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay animate-slide-down">
            
            {/* Header of Mobile Menu with Official Logo */}
            <div className="mobile-menu-header">
              <img 
                src="/images/jhay-atelier-logo.jpg" 
                alt="JHAY ATELIER" 
                className="mobile-menu-logo"
              />
              <span className="mobile-menu-brand-name">JHAY ATELIER</span>
              <span className="mobile-menu-brand-sub">TAILORED FOR HER.</span>
              <span className="mobile-menu-location">
                <MapPin size={11} /> Uyo, Akwa Ibom &bull; Nigeria
              </span>
            </div>

            {/* Currency Selector Bar inside Mobile Menu */}
            <div className="mobile-currency-bar">
              <span className="mobile-currency-title">Currency:</span>
              <div className="mobile-currency-pills">
                {Object.keys(CURRENCIES).map((currKey) => (
                  <button
                    key={currKey}
                    className={`mobile-curr-btn ${currentCurrency === currKey ? 'active' : ''}`}
                    onClick={() => {
                      onCurrencyChange(currKey);
                    }}
                  >
                    {currKey}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="mobile-menu-links">
              <a href="#collections" onClick={() => setMobileMenuOpen(false)}>
                <span>All Women&apos;s Outfits</span>
                <ChevronRight size={16} />
              </a>
              <a href="#collections" onClick={() => setMobileMenuOpen(false)}>
                <span>Evening &amp; Gala Dresses</span>
                <ChevronRight size={16} />
              </a>
              <a href="#atelier" onClick={() => setMobileMenuOpen(false)}>
                <span>How Custom Tailoring Works</span>
                <ChevronRight size={16} />
              </a>
              <a href="#lookbook" onClick={() => setMobileMenuOpen(false)}>
                <span>Real Client Reviews</span>
                <ChevronRight size={16} />
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <span>Uyo Studio &amp; Contact</span>
                <ChevronRight size={16} />
              </a>
            </div>

            {/* Mobile CTA Box */}
            <div className="mobile-cta-box">
              <button 
                className="mobile-book-btn gold-gradient-bg tap-scale"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
              >
                <Calendar size={16} />
                <span>Book a Fitting Session</span>
              </button>

              <a 
                href={`tel:${BRAND_INFO.contact.phone}`} 
                className="mobile-call-concierge tap-scale"
              >
                <Phone size={14} />
                <span>WhatsApp / Call: {BRAND_INFO.contact.phone}</span>
              </a>

              <button
                type="button"
                className="mobile-owner-access-btn tap-scale"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
              >
                <span>Owner &amp; Atelier Director Login &rarr;</span>
              </button>
            </div>

          </div>
        )}

      </nav>
    </header>
  );
}
