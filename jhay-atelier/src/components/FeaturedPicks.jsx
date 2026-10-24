import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/atelierData';

// Show only the first 4 products as featured picks on the landing page
const FEATURED = PRODUCTS.slice(0, 4);

export default function FeaturedPicks({
  currency,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenBooking,
  onGoToStore
}) {
  return (
    <section id="collections" className="featured-picks-section anim-fade-up">
      <div className="luxury-container">

        {/* Header */}
        <div className="section-header-block">
          <div className="section-eyebrow">
            <Sparkles size={12} className="sparkle-icon" />
            <span>WOMEN'S BESPOKE &amp; READY-TO-WEAR</span>
          </div>
          <h2 className="section-title">Featured Couture Picks</h2>
          <p className="section-subtitle">
            Handcrafted in Uyo for women who command every room. Each piece is made to
            fit your exact silhouette.
          </p>
        </div>

        {/* 4-card featured grid */}
        <div className="product-grid grid-compact-mode featured-grid">
          {FEATURED.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onOpenBooking={onOpenBooking}
              isCompact={true}
            />
          ))}
        </div>

        {/* CTA → Store */}
        <div className="featured-store-cta">
          <p className="featured-cta-text">
            Showing <strong>4 of {PRODUCTS.length}</strong> pieces — see the complete collection in our store.
          </p>
          <button
            className="btn-primary gold-gradient-bg tap-scale featured-view-all-btn"
            onClick={onGoToStore}
            id="featured-view-all-btn"
          >
            <span>View All {PRODUCTS.length} Pieces in Store</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
