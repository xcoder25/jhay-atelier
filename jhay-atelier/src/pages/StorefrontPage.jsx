import React from 'react';
import Hero from '../components/Hero';
import CollectionSection from '../components/CollectionSection';
import AtelierCraft from '../components/AtelierCraft';
import Footer from '../components/Footer';
import { BRAND_INFO, TESTIMONIALS } from '../data/atelierData';
import { MapPin, Phone, Clock, Calendar, Sparkles, Star, Quote, ArrowRight } from 'lucide-react';

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

      {/* ── 2. HAUTE COUTURE COLLECTIONS & CATALOG ─────────────────── */}
      <CollectionSection
        currency={currency}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onOpenBooking={onOpenBooking}
      />

      {/* ── 3. ATELIER SAVOIR-FAIRE & CRAFTSMANSHIP ─────────────────── */}
      <AtelierCraft onOpenBooking={onOpenBooking} />

      {/* ── 4. CLIENT TESTIMONIALS & REVIEWS SECTION ───────────────── */}
      <section id="lookbook" className="reviews-section anim-fade-up">
        <div className="luxury-container">
          
          <div className="section-header-block">
            <div className="section-eyebrow">
              <Sparkles size={12} className="sparkle-icon" />
              <span>REAL CLIENT STORIES &bull; UYO FLAGSHIP</span>
            </div>
            <h2 className="section-title">Words From Our Distinguished Patrons</h2>
            <p className="section-subtitle">
              From state banquets and milestone celebrations to high-society weddings across Nigeria and beyond.
            </p>
          </div>

          <div className="reviews-grid">
            {TESTIMONIALS.map((t, index) => (
              <div key={index} className="review-card">
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C8A45D" color="#C8A45D" />
                  ))}
                </div>
                <p className="review-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="review-author-meta">
                  <span className="author-name">{t.author}</span>
                  <span className="author-location">
                    <MapPin size={11} /> {t.location} &bull; {t.event}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. UYO FLAGSHIP ATELIER VISIT INVITATION ────────────────── */}
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
                Step into our sanctuary of pure European silks, structured French corsetry, and artisanal hand-beading. Enjoy a private styling consultation and bespoke measurement fitting with our head couturier.
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
