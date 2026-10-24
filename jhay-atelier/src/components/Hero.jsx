import React from 'react';
import { ArrowRight, Sparkles, Award, Scissors, ShieldCheck, MapPin } from 'lucide-react';

export default function Hero({ onOpenBooking, onScrollToCollections, onGoToStore }) {
  return (
    <section className="hero-section">
      <div className="hero-background-glow"></div>
      
      <div className="luxury-container hero-container">
        <div className="hero-grid">
          
          {/* Left Column: Editorial Headline & Brand Story */}
          <div className="hero-content">
            
            <div className="hero-badge shimmer-badge anim-fade-up">
              <Sparkles size={13} className="badge-sparkle" />
              <span>EXCLUSIVE WOMEN&apos;S FASHION &amp; BESPOKE DRESSES</span>
            </div>

            <div className="script-subtitle script-font anim-fade-up stagger-1">
              Elegance, Perfectly Tailored.
            </div>

            <h1 className="hero-headline anim-fade-up stagger-2">
              WHERE ELEGANCE IS <br />
              <span className="gold-gradient-text">TAILORED TO PERFECTION.</span>
            </h1>

            <p className="hero-description anim-fade-up stagger-3">
              Designed exclusively for women. At <strong className="brand-highlight">JHAY ATELIER</strong>,
              we craft showstopping evening dresses, tailored suits, and celebration gowns sculpted
              to fit your body shape — proudly made in <strong className="brand-highlight">Uyo, Akwa Ibom</strong>.
            </p>

            <div className="hero-actions anim-fade-up stagger-4">
              <button 
                className="btn-primary gold-gradient-bg tap-scale"
                onClick={onGoToStore}
                id="hero-shop-store-btn"
              >
                <span>Shop the Store</span>
                <ArrowRight size={16} />
              </button>

              <button 
                className="btn-secondary tap-scale"
                onClick={onOpenBooking}
              >
                <Scissors size={16} className="btn-icon" />
                <span>Order Custom Dress</span>
              </button>
            </div>

            {/* Uyo Location Pill */}
            <div className="hero-location-pill anim-fade-up stagger-4">
              <MapPin size={13} />
              <span>Uyo, Akwa Ibom &bull; Nigeria &bull; Worldwide Delivery</span>
            </div>



            {/* Editorial Badges */}
            <div className="hero-stats anim-fade-up stagger-6">
              <div className="stat-card">
                <Scissors size={18} className="stat-icon" />
                <div>
                  <h4>Custom Fit</h4>
                  <p>Sewn to your body measurements</p>
                </div>
              </div>
              <div className="stat-card">
                <Award size={18} className="stat-icon" />
                <div>
                  <h4>Pure Silk</h4>
                  <p>Mulberry silks &amp; rich velvets</p>
                </div>
              </div>
              <div className="stat-card">
                <ShieldCheck size={18} className="stat-icon" />
                <div>
                  <h4>Gift Box</h4>
                  <p>Delivered in signature black box</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="hero-visual-wrapper anim-fade-right stagger-2">
            <div className="hero-image-frame">
              <img 
                src="/images/hero-gown.jpg" 
                alt="JHAY ATELIER One-Shoulder Draped Champagne Silk Evening Dress" 
                className="hero-main-img"
              />
              <div className="hero-image-overlay"></div>
              
              {/* Floating Luxury Detail Tag */}
              <div className="floating-couture-tag">
                <span className="tag-subtitle">BESTSELLER DRESS</span>
                <span className="tag-title">The Champagne Élysée Dress</span>
                <span className="tag-detail">Pure Silk &bull; Hand-Beaded Pearls &bull; Flowing Cape</span>
              </div>

              {/* Official Floating Medallion Seal */}
              <div className="floating-official-logo-seal tap-scale">
                <img 
                  src="/images/jhay-atelier-logo.jpg" 
                  alt="JHAY ATELIER Official Seal" 
                  className="hero-seal-img" 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
