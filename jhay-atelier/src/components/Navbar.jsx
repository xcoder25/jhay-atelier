import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Heart, Calendar, Menu, X, Globe, Sparkles, ChevronRight, Phone, MapPin, ChevronDown } from 'lucide-react';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);
  const currRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    const handler = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
      if (currRef.current && !currRef.current.contains(e.target)) {
        setCurrencyDropdownOpen(false);
      }
    };
    if (drawerOpen || currencyDropdownOpen) {
      document.addEventListener('mousedown', handler);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [drawerOpen, currencyDropdownOpen]);

  // Close drawer on route navigation
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-marquee-track">
          <div className="announcement-marquee-inner">
            <span className="announcement-tag">
              <Sparkles size={11} className="sparkle-icon" /> WOMEN&apos;S COUTURE &middot; UYO
            </span>
            <span className="announcement-text">
              Free Delivery on Orders Over &#8358;2,000,000 &bull; Uyo Flagship Atelier &bull; Video Fittings Available
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
              Free Delivery on Orders Over &#8358;2,000,000 &bull; Uyo Flagship Atelier &bull; Video Fittings Available
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

      {/* Main Nav Bar */}
      <nav className="main-nav">
        <div className="nav-container luxury-container">

          {/* LEFT: Hamburger (mobile) + Desktop Links */}
          <div className="nav-left-group">
            {/* Hamburger — mobile only */}
            <button
              className="hamburger-btn tap-scale"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={drawerOpen}
            >
              <Menu size={20} />
            </button>

            {/* Desktop nav links */}
            <div className="nav-links left-links">
              <a href="#collections" className="nav-link">Dresses &amp; Outfits</a>
              <a href="#collections" className="nav-link">Evening Gowns</a>
              <a href="#atelier" className="nav-link">How It Works</a>
              <a href="#lookbook" className="nav-link">Reviews</a>
            </div>
          </div>

          {/* CENTER: Logo (absolutely centered) */}
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

          {/* RIGHT: Currency + Wishlist + Bag + CTA */}
          <div className="nav-actions">
            {/* Currency Switcher */}
            <div className="currency-selector-wrapper" ref={currRef}>
              <button
                className="currency-trigger tap-scale"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                aria-label="Change currency"
              >
                <Globe size={12} />
                <span className="currency-label">{currentCurrency}</span>
                <ChevronDown size={10} />
              </button>
              {currencyDropdownOpen && (
                <div className="currency-dropdown animate-card-fade">
                  {Object.keys(CURRENCIES).map((currKey) => (
                    <button
                      key={currKey}
                      className={`currency-option${currentCurrency === currKey ? ' active' : ''}`}
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

            {/* Wishlist */}
            <button
              className="action-icon-btn nav-wishlist-btn tap-scale"
              onClick={onOpenWishlist}
              aria-label="Wishlist"
            >
              <Heart size={17} />
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
            </button>

            {/* Shopping Bag */}
            <button
              className="action-icon-btn bag-btn tap-scale"
              onClick={onOpenCart}
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && <span className="action-badge pulse">{cartCount}</span>}
            </button>

            {/* Book CTA — desktop only */}
            <button
              className="book-consultation-btn gold-gradient-bg tap-scale"
              onClick={onOpenBooking}
            >
              <Calendar size={13} />
              <span>Book Fitting</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-In Drawer */}
      {drawerOpen && (
        <div className="drawer-backdrop" onClick={closeDrawer} aria-hidden="true" />
      )}
      <div
        ref={drawerRef}
        className={`mobile-drawer${drawerOpen ? ' mobile-drawer--open' : ''}`}
        aria-hidden={!drawerOpen}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-brand-row">
            <img
              src="/images/jhay-atelier-logo.jpg"
              alt="JHAY ATELIER"
              className="drawer-logo-img"
            />
            <div className="drawer-brand-text">
              <span className="drawer-brand-name">JHAY ATELIER</span>
              <span className="drawer-brand-sub">TAILORED FOR HER.</span>
              <span className="drawer-location"><MapPin size={10} /> Uyo, Akwa Ibom &bull; Nigeria</span>
            </div>
          </div>
          <button className="drawer-close-btn tap-scale" onClick={closeDrawer} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* Currency Pills */}
        <div className="drawer-currency-row">
          <span className="drawer-section-label">Currency</span>
          <div className="drawer-currency-pills">
            {Object.keys(CURRENCIES).map((currKey) => (
              <button
                key={currKey}
                className={`drawer-curr-pill${currentCurrency === currKey ? ' active' : ''}`}
                onClick={() => onCurrencyChange(currKey)}
              >
                {currKey}
              </button>
            ))}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="drawer-links">
          <a href="#collections" onClick={closeDrawer} className="drawer-link">
            <span>All Women&apos;s Outfits</span>
            <ChevronRight size={16} />
          </a>
          <a href="#collections" onClick={closeDrawer} className="drawer-link">
            <span>Evening &amp; Gala Dresses</span>
            <ChevronRight size={16} />
          </a>
          <a href="#atelier" onClick={closeDrawer} className="drawer-link">
            <span>How Custom Tailoring Works</span>
            <ChevronRight size={16} />
          </a>
          <a href="#lookbook" onClick={closeDrawer} className="drawer-link">
            <span>Real Client Reviews</span>
            <ChevronRight size={16} />
          </a>
          <a href="#contact" onClick={closeDrawer} className="drawer-link">
            <span>Uyo Studio &amp; Contact</span>
            <ChevronRight size={16} />
          </a>
        </nav>

        {/* CTAs */}
        <div className="drawer-cta-section">
          <button
            className="drawer-book-btn gold-gradient-bg tap-scale"
            onClick={() => { closeDrawer(); onOpenBooking(); }}
          >
            <Calendar size={15} />
            <span>Book a Fitting Session</span>
          </button>
          <a
            href={`tel:${BRAND_INFO.contact.phone}`}
            className="drawer-call-btn tap-scale"
          >
            <Phone size={14} />
            <span>WhatsApp / Call: {BRAND_INFO.contact.phone}</span>
          </a>
        </div>
      </div>

    </header>
  );
}
