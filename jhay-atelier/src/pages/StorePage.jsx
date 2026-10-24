import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Grid,
  LayoutGrid,
  X,
  ShoppingBag,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { COLLECTIONS, PRODUCTS } from '../data/atelierData';

// Pre-compute count per category for tab badges
const CATEGORY_COUNTS = COLLECTIONS.reduce((acc, cat) => {
  acc[cat.id] = cat.id === 'all'
    ? PRODUCTS.length
    : PRODUCTS.filter((p) => p.category === cat.id).length;
  return acc;
}, {});

export default function StorePage({
  currency,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenBooking
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCompactGrid, setIsCompactGrid] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger hero entrance animation
    const t = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Filter + sort
  const filteredProducts = PRODUCTS
    .filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortOrder === 'price-desc') return b.priceUSD - a.priceUSD;
      return 0;
    });

  const activeLabel = COLLECTIONS.find((c) => c.id === activeCategory)?.name || 'All Outfits';

  return (
    <div className="store-page-root">

      {/* ── STORE HERO BANNER ───────────────────────────────────── */}
      <section className={`store-hero-banner ${animateIn ? 'store-hero--visible' : ''}`}>
        <div className="store-hero-bg-glow" />
        <div className="store-hero-grid-lines" aria-hidden="true" />

        <div className="luxury-container store-hero-inner">
          <div className="store-hero-eyebrow">
            <Sparkles size={12} className="sparkle-icon" />
            <span>JHAY ATELIER — WOMEN'S BESPOKE &amp; READY-TO-WEAR</span>
          </div>

          <h1 className="store-hero-title">
            The <span className="gold-gradient-text">Atelier</span> Store
          </h1>
          <p className="store-hero-subtitle">
            Every piece is handcrafted in Uyo to celebrate female silhouettes — from red-carpet
            evening gowns to bespoke bridal creations.
          </p>

          <div className="store-hero-meta-pills">
            <span className="store-meta-pill">
              <ShoppingBag size={12} /> {PRODUCTS.length} Couture Pieces
            </span>
            <span className="store-meta-pill">
              <Sparkles size={12} /> Pure Silk &amp; Velvet
            </span>
            <span className="store-meta-pill">
              ✦ Worldwide Delivery
            </span>
          </div>
        </div>

        {/* Decorative gold divider line */}
        <div className="store-hero-divider" aria-hidden="true">
          <span />
          <Sparkles size={14} className="sparkle-icon" />
          <span />
        </div>
      </section>

      {/* ── MAIN STORE CONTENT ────────────────────────────────────── */}
      <section className="store-content-section">
        <div className="luxury-container">

          {/* ── CATEGORY FILTER TABS ────────────────────────────── */}
          <div className="store-filter-panel">

            {/* Scrollable category chips */}
            <div className="store-category-scroll-wrap">
              <div className="store-category-tabs">
                {COLLECTIONS.map((cat) => (
                  <button
                    key={cat.id}
                    className={`store-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.name}
                    <span className={`store-cat-count ${activeCategory === cat.id ? 'store-cat-count--active' : ''}`}>
                      {CATEGORY_COUNTS[cat.id]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search + Sort + Grid row */}
            <div className="store-tools-row">

              {/* Search */}
              <div className="store-search-box">
                <Search size={14} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search gowns, velvet, bridal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  aria-label="Search products"
                  id="store-search-input"
                />
                {searchQuery && (
                  <button
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="store-right-tools">
                {/* Sort dropdown */}
                <div className="store-sort-wrap">
                  <select
                    className="store-sort-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    aria-label="Sort products"
                    id="store-sort-select"
                  >
                    <option value="default">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <ChevronDown size={13} className="sort-chevron" />
                </div>

                {/* Grid toggles */}
                <div className="grid-toggle-pills" title="Toggle Grid View">
                  <button
                    className={`grid-pill-btn ${isCompactGrid ? 'active' : ''}`}
                    onClick={() => setIsCompactGrid(true)}
                    aria-label="Compact 2-column grid"
                    id="store-grid-compact"
                  >
                    <Grid size={15} />
                  </button>
                  <button
                    className={`grid-pill-btn ${!isCompactGrid ? 'active' : ''}`}
                    onClick={() => setIsCompactGrid(false)}
                    aria-label="Large editorial grid"
                    id="store-grid-large"
                  >
                    <LayoutGrid size={15} />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* ── RESULTS COUNT BAR ───────────────────────────────── */}
          <div className="store-results-bar">
            <span className="store-results-label">
              <strong>{filteredProducts.length}</strong> piece{filteredProducts.length !== 1 ? 's' : ''} in&nbsp;
              <em>{activeLabel}</em>
            </span>
            {(searchQuery || activeCategory !== 'all') && (
              <button
                className="store-clear-filters-btn"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSortOrder('default'); }}
              >
                <X size={12} /> Clear Filters
              </button>
            )}
          </div>

          {/* ── PRODUCT GRID ────────────────────────────────────── */}
          {filteredProducts.length > 0 ? (
            <div className={`product-grid ${isCompactGrid ? 'grid-compact-mode' : 'grid-large-mode'}`}>
              {filteredProducts.map((product) => (
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
              ))}
            </div>
          ) : (
            <div className="no-products-found store-empty-state">
              <Sparkles size={32} className="sparkle-icon" />
              <h3>No Creations Found</h3>
              <p>Try adjusting your filters or search term.</p>
              <button
                className="btn-secondary"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSortOrder('default'); }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* ── BESPOKE COMMISSION STRIP ─────────────────────────── */}
          <div className="bespoke-commission-strip mobile-bespoke-strip store-bespoke-strip anim-scale-in">
            <div className="bespoke-strip-content">
              <div className="bespoke-strip-text">
                <span className="script-font script-accent">Custom Dressmaking</span>
                <h3>Can't find exactly what you want?</h3>
                <p>
                  Describe your dream dress — the color, silhouette, neckline — and our head
                  designer will create it to your exact measurements.
                </p>
              </div>
              <button
                className="gold-gradient-bg bespoke-strip-btn tap-scale"
                onClick={onOpenBooking}
                id="store-bespoke-btn"
              >
                <span>Order Custom Dress</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
