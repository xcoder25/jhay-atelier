import React, { useState } from 'react';
import { Sparkles, Search, Grid, LayoutGrid } from 'lucide-react';
import ProductCard from './ProductCard';
import { COLLECTIONS, PRODUCTS } from '../data/atelierData';

export default function CollectionSection({
  currency,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenBooking
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCompactGrid, setIsCompactGrid] = useState(true); // default compact mobile grid

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="collections" className="collections-section">
      <div className="luxury-container">
        
        {/* Section Header */}
        <div className="section-header-block anim-fade-up">
          <div className="section-eyebrow">
            <Sparkles size={12} className="sparkle-icon" />
            <span>WOMEN’S BESPOKE &amp; READY-TO-WEAR COLLECTION</span>
          </div>
          <h2 className="section-title">Dresses &amp; Outfits for Every Occasion</h2>
          <p className="section-subtitle">
            From glamorous evening galas and luxury weddings to chic dinner parties, each piece is tailored to celebrate female silhouettes.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="collection-filter-bar mobile-filter-bar anim-fade-up stagger-1">
          
          {/* Horizontally Scrollable Category Chips */}
          <div className="category-tabs-scroll-wrapper">
            <div className="category-tabs horizontal-scroll-chips">
              {COLLECTIONS.map((category) => (
                <button
                  key={category.id}
                  className={`category-tab-btn chip-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar & View Grid Toggles */}
          <div className="filter-actions-row">
            <div className="collection-search-box mobile-search-box">
              <Search size={14} className="search-icon" />
              <input 
                type="text"
                placeholder="Search evening dresses, velvet gowns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>&times;</button>
              )}
            </div>

            {/* Grid Toggle: 2-Col Compact vs Large Editorial */}
            <div className="grid-toggle-pills" title="Toggle Grid View">
              <button 
                className={`grid-pill-btn ${isCompactGrid ? 'active' : ''}`}
                onClick={() => setIsCompactGrid(true)}
                aria-label="2-column compact grid"
              >
                <Grid size={15} />
              </button>
              <button 
                className={`grid-pill-btn ${!isCompactGrid ? 'active' : ''}`}
                onClick={() => setIsCompactGrid(false)}
                aria-label="1-column large editorial view"
              >
                <LayoutGrid size={15} />
              </button>
            </div>
          </div>

        </div>

        {/* Product Count indicator */}
        <div className="collection-count-strip">
          <span>Showing {filteredProducts.length} Couture Creations</span>
        </div>

        {/* Product Grid (Compact 2-col on mobile by default) */}
        <div className={`product-grid ${isCompactGrid ? 'grid-compact-mode' : 'grid-large-mode'}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onOpenBooking={onOpenBooking}
                isCompact={isCompactGrid}
              />
            ))
          ) : (
            <div className="no-products-found">
              <p>No creations match your search criteria.</p>
              <button 
                className="btn-secondary"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Custom Dress Banner below grid */}
        <div className="bespoke-commission-strip mobile-bespoke-strip anim-scale-in">
          <div className="bespoke-strip-content">
            <div className="bespoke-strip-text">
              <span className="script-font script-accent">Custom Dressmaking</span>
              <h3>Need a custom outfit made for your special event?</h3>
              <p>Have a specific dress style, color, or neckline in mind? Chat directly with our head designer to create a dress tailored to your exact measurements.</p>
            </div>
            <button 
              className="gold-gradient-bg bespoke-strip-btn tap-scale"
              onClick={onOpenBooking}
            >
              <span>Order Custom Dress</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
