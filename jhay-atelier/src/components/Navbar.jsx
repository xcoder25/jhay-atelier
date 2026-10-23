import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Heart,
  Calendar,
  Menu,
  X,
  Globe,
  ChevronRight,
  Phone,
  MapPin,
  ChevronDown,
  Clock,
  Sparkles
} from 'lucide-react';
import { BRAND_INFO, CURRENCIES } from '../data/atelierData';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenBooking,
  onOpenWishlist,
  currentCurrency,
  onCurrencyChange
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

  // Close drawer & dropdown on outside click
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

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      
      {/* ── TOP EDITORIAL STRIP (STATIC & LUXURIOUS — NO MOVING TICKER) ── */}
      <div className="editorial-topbar">
        <div className="editorial-topbar-inner luxury-container">
          
          <div className="editorial-topbar-left">
            <span className="editorial-pill">
              <MapPin size={11} className="gold-icon" />
              <span>Flagship Atelier: Udo Udoma Ave, Uyo, Akwa Ibom</span>
            </span>
          </div>

          <div className="editorial-topbar-center">
            <span className="editorial-motto">HAUTE COUTURE &bull; BESPOKE TAILORING FOR HER</span>
          </div>

          <div className="editorial-topbar-right">
            <a
              href={`https://wa.me/${BRAND_INFO.contact.phone.replace(/[^0-9]/g, '')}?text=Hello%20JHAY%20ATELIER%2C%20I%20would%20like%20to%20inquire%20about%20a%20bespoke%20order.`}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-concierge-link"
            >
              <Phone size={11} className="gold-icon" />
              <span>Concierge: {BRAND_INFO.contact.phone}</span>
            </a>
            <span className="editorial-hours">
              <Clock size={11} />
              <span>Mon &ndash; Sat: 10AM &ndash; 7PM</span>
            </span>
          </div>

        </div>
      </div>

      {/* ── MAIN HAUTE COUTURE NAV BAR ──────────────────────────── */}
      <nav className="main-nav" aria-label="Main Navigation">
        <div className="nav-container luxury-container">

          {/* LEFT: Mobile Hamburger & Desktop Navigation Links */}
          <div className="nav-left-group">
            <button
              className="hamburger-btn tap-scale"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={drawerOpen}
            >
              <Menu size={22} />
            </button>

            <div className="nav-links left-links">
              <a href="#collections" className="nav-link">
                <span>Collections</span>
              </a>
              <a href="#collections" className="nav-link">
                <span>Evening Gala</span>
              </a>
              <a href="#atelier" className="nav-link">
                <span>The Craft</span>
              </a>
              <a href="#lookbook" className="nav-link">
                <span>Reviews</span>
              </a>
              <a href="#contact" className="nav-link">
                <span>Uyo Studio</span>
              </a>
            </div>
          </div>

          {/* CENTER: Grand Official Emblem Logo */}
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
              <span className="brand-subtitle">
                <span>TAILORED FOR HER</span>
                <span className="sub-dot">&bull;</span>
                <span className="sub-location">UYO</span>
              </span>
            </div>
          </a>

          {/* RIGHT: Currency Switcher, Wishlist, Bag & Book CTA */}
          <div className="nav-actions">
            
            {/* Currency Selector */}
            <div className="currency-selector-wrapper" ref={currRef}>
              <button
                className="currency-trigger tap-scale"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                aria-label="Change currency"
                aria-expanded={currencyDropdownOpen}
              >
                <Globe size={13} className="currency-globe-icon" />
                <span className="currency-label">{currentCurrency}</span>
                <ChevronDown size={11} className={`currency-chevron${currencyDropdownOpen ? ' rotated' : ''}`} />
              </button>

              {currencyDropdownOpen && (
                <div className="currency-dropdown animate-card-fade">
                  <div className="currency-dropdown-header">Select Currency</div>
                  {Object.keys(CURRENCIES).map((currKey) => (
                    <button
                      key={currKey}
                      className={`currency-option${currentCurrency === currKey ? ' active' : ''}`}
                      onClick={() => {
                        onCurrencyChange(currKey);
                        setCurrencyDropdownOpen(false);
                      }}
                    >
                      <span className="curr-sym">{CURRENCIES[currKey].symbol}</span>
                      <span className="curr-code">{CURRENCIES[currKey].label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              className="action-icon-btn nav-wishlist-btn tap-scale"
              onClick={onOpenWishlist}
              aria-label={`Wishlist (${wishlistCount} items)`}
              title="Saved Creations"
            >
              <Heart size={18} className={wishlistCount > 0 ? 'icon-filled-gold' : ''} />
              {wishlistCount > 0 && <span className="action-badge animate-badge">{wishlistCount}</span>}
            </button>

            {/* Shopping Bag */}
            <button
              className="action-icon-btn bag-btn tap-scale"
              onClick={onOpenCart}
              aria-label={`Shopping Bag (${cartCount} items)`}
              title="Shopping Bag"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="action-badge pulse animate-badge">{cartCount}</span>}
            </button>

            {/* Book Fitting CTA Button */}
            <button
              className="book-consultation-btn gold-gradient-bg tap-scale"
              onClick={onOpenBooking}
              aria-label="Book an Atelier Fitting"
            >
              <Calendar size={14} />
              <span>Book Fitting</span>
            </button>

          </div>
        </div>
      </nav>

      {/* ── MOBILE SLIDE-IN LUXURY DRAWER (NO ADMIN CONTROLS) ────── */}
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
            <div className="drawer-logo-wrap">
              <img
                src="/images/jhay-atelier-logo.jpg"
                alt="JHAY ATELIER"
                className="drawer-logo-img"
              />
            </div>
            <div className="drawer-brand-text">
              <span className="drawer-brand-name">JHAY ATELIER</span>
              <span className="drawer-brand-sub">TAILORED FOR HER</span>
              <span className="drawer-location">
                <MapPin size={10} /> Udo Udoma Ave, Uyo &bull; Nigeria
              </span>
            </div>
          </div>
          <button className="drawer-close-btn tap-scale" onClick={closeDrawer} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* Currency Switcher Pills */}
        <div className="drawer-currency-row">
          <div className="drawer-section-label-group">
            <Globe size={12} />
            <span className="drawer-section-label">Currency</span>
          </div>
          <div className="drawer-currency-pills">
            {Object.keys(CURRENCIES).map((currKey) => (
              <button
                key={currKey}
                className={`drawer-curr-pill${currentCurrency === currKey ? ' active' : ''}`}
                onClick={() => onCurrencyChange(currKey)}
              >
                {CURRENCIES[currKey].symbol} {currKey}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="drawer-links" aria-label="Mobile Drawer Navigation">
          <a href="#collections" onClick={closeDrawer} className="drawer-link">
            <div className="drawer-link-left">
              <span className="drawer-link-number">01</span>
              <span>All Outfits &amp; Dresses</span>
            </div>
            <ChevronRight size={16} />
          </a>

          <a href="#collections" onClick={closeDrawer} className="drawer-link">
            <div className="drawer-link-left">
              <span className="drawer-link-number">02</span>
              <span>Evening &amp; Gala Couture</span>
            </div>
            <ChevronRight size={16} />
          </a>

          <a href="#atelier" onClick={closeDrawer} className="drawer-link">
            <div className="drawer-link-left">
              <span className="drawer-link-number">03</span>
              <span>How Custom Tailoring Works</span>
            </div>
            <ChevronRight size={16} />
          </a>

          <a href="#lookbook" onClick={closeDrawer} className="drawer-link">
            <div className="drawer-link-left">
              <span className="drawer-link-number">04</span>
              <span>Client Reviews &amp; Lookbook</span>
            </div>
            <ChevronRight size={16} />
          </a>

          <a href="#contact" onClick={closeDrawer} className="drawer-link">
            <div className="drawer-link-left">
              <span className="drawer-link-number">05</span>
              <span>Uyo Studio Location &amp; Hours</span>
            </div>
            <ChevronRight size={16} />
          </a>
        </nav>

        {/* CTAs */}
        <div className="drawer-cta-section">
          <button
            className="drawer-book-btn gold-gradient-bg tap-scale"
            onClick={() => {
              closeDrawer();
              onOpenBooking();
            }}
          >
            <Calendar size={16} />
            <span>Book a Fitting Session</span>
          </button>

          <a
            href={`https://wa.me/${BRAND_INFO.contact.phone.replace(/[^0-9]/g, '')}?text=Hello%20JHAY%20ATELIER%2C%20I%20would%20like%20to%20inquire%20about%20a%20bespoke%20couture%20dress.`}
            target="_blank"
            rel="noopener noreferrer"
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
