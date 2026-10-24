import React from 'react';
import Hero from '../components/Hero';
import FeaturedPicks from '../components/FeaturedPicks';
import Footer from '../components/Footer';
import { BRAND_INFO, TESTIMONIALS } from '../data/atelierData';
import { MapPin, Phone, Clock, Calendar, Sparkles, Star, ArrowRight } from 'lucide-react';

export default function StorefrontPage({
  currency,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenBooking,
  scrollToCollections,
  onOpenAdminLogin,
  onGoToStore
}) {
  return (
    <div className="storefront-page-root animate-card-fade">

      {/* ── 1. HERO SECTION ────────────────────────────────────────── */}
      <Hero
        onOpenBooking={onOpenBooking}
        onScrollToCollections={scrollToCollections}
        onGoToStore={onGoToStore}
      />

      {/* ── 2. FEATURED PICKS (4 items + View All CTA) ───────────── */}
      <FeaturedPicks
        currency={currency}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onOpenBooking={onOpenBooking}
        onGoToStore={onGoToStore}
      />

      {/* ── 3. CLIENT TESTIMONIALS ───────────────────────────────── */}
      <section id="lookbook" className="patrons-section anim-fade-up">
        <div className="luxury-container">

          <div className="section-header-block patrons-header">
            <div className="section-eyebrow">
              <Sparkles size={12} className="sparkle-icon" />
              <span>REAL CLIENT STORIES &bull; UYO FLAGSHIP</span>
            </div>
            <h2 className="section-title">Words From Our Distinguished Patrons</h2>
            <p className="section-subtitle">
              From state banquets and milestone celebrations to high-society weddings across Nigeria and beyond.
            </p>
          </div>

          {/* Scroll carousel — horizontal swipe on mobile, 3-col on desktop */}
          <div className="patrons-scroll-track">
            {TESTIMONIALS.map((t, index) => (
              <div key={index} className="patron-card">
                {/* Giant open-quote decoration */}
                <span className="patron-open-quote" aria-hidden="true">&ldquo;</span>

                {/* Stars */}
                <div className="patron-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#C8A45D" color="#C8A45D" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="patron-quote">{t.quote}</p>

                {/* Author row */}
                <div className="patron-author-row">
                  <div className="patron-avatar" aria-hidden="true">
                    {t.author.charAt(0)}
                  </div>
                  <div className="patron-author-info">
                    <span className="patron-author-name">{t.author}</span>
                    <span className="patron-author-sub">
                      <MapPin size={10} /> {t.location}
                    </span>
                  </div>
                  <span className="patron-event-badge">{t.event}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile scroll hint dots */}
          <div className="patrons-scroll-hint" aria-hidden="true">
            {TESTIMONIALS.map((_, i) => (
              <span key={i} className={`scroll-dot ${i === 0 ? 'scroll-dot--active' : ''}`} />
            ))}
          </div>

        </div>
      </section>


      {/* ── 5. UYO FLAGSHIP STUDIO INVITATION ───────────────────── */}
      <section id="contact-studio" className="studio-invitation-section anim-fade-up">
        <div className="luxury-container">
          <div className="studio-card gold-border">

            <div className="studio-info-col">
              <div className="section-eyebrow">
                <Sparkles size={12} className="sparkle-icon" />
                <span>EXPERIENCE HAUTE COUTURE IN PERSON</span>
              </div>
              <h2 className="studio-title">Visit The Uyo Flagship Atelier</h2>
              <p className="studio-desc">
                Step into our sanctuary of pure European silks, structured French corsetry, and artisanal hand-beading. Enjoy a private styling consultation and bespoke measurement fitting with our head couturier — or let us come to you with our <strong>Mobile Fitting</strong> service.
              </p>

              <div className="studio-details-list">
                <div className="detail-item">
                  <MapPin size={18} className="gold-icon" />
                  <div>
                    <strong>Flagship Address:</strong>
                    <span>{BRAND_INFO.contact.address}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Clock size={18} className="gold-icon" />
                  <div>
                    <strong>Private Studio Hours:</strong>
                    <span>{BRAND_INFO.contact.hours}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Phone size={18} className="gold-icon" />
                  <div>
                    <strong>Direct Concierge Line / WhatsApp:</strong>
                    <span>{BRAND_INFO.contact.phone} &bull; {BRAND_INFO.contact.email}</span>
                  </div>
                </div>

              </div>

              <div className="studio-actions-row">
                <button
                  className="btn-primary gold-gradient-bg tap-scale"
                  onClick={onOpenBooking}
                >
                  <Calendar size={15} />
                  <span>Schedule Private Fitting</span>
                </button>

                <a
                  href={`https://wa.me/${BRAND_INFO.contact.phone.replace(/[^0-9]/g, '')}?text=Hello%20JHAY%20ATELIER%2C%20I%20would%20like%20to%20plan%20a%20visit%20to%20the%20Uyo%20atelier.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary tap-scale"
                >
                  <span>Chat With Concierge</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. FOOTER ──────────────────────────────────────────────── */}
      <Footer onOpenBooking={onOpenBooking} onOpenAdminLogin={onOpenAdminLogin} />

    </div>
  );
}


