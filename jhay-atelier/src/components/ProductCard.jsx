import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Plus, Check } from 'lucide-react';
import { CURRENCIES } from '../data/atelierData';

export default function ProductCard({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenBooking,
  isCompact = true
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const curr = CURRENCIES[currency] || CURRENCIES.USD;
  const formattedPrice = (product.priceUSD * curr.rate).toLocaleString(undefined, {
    maximumFractionDigits: 0
  });

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize: product.sizes[0]
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div 
      className={`product-card ${isCompact ? 'compact-card' : 'standard-card'} animate-card-fade`}
      onClick={() => onQuickView(product)}
    >
      <div className="product-media-wrapper">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
        />

        {/* Minimal Luxury Badge */}
        {product.badge && (
          <div className="product-badge mobile-badge-pill">
            <span>{product.badge.replace('Haute Couture Signature', 'Signature').replace('Atelier Limited (12 Editions)', 'Limited (12)')}</span>
          </div>
        )}

        {/* Wishlist Button with Heart Animation */}
        <button 
          className={`wishlist-btn tap-scale ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
          aria-label="Wishlist toggle"
        >
          <Heart size={15} fill={isWishlisted ? '#C8A45D' : 'none'} color={isWishlisted ? '#C8A45D' : '#ffffff'} />
        </button>

        {/* Floating Quick Add Button on Mobile / Desktop */}
        <button 
          className={`quick-add-bubble tap-scale ${addedAnimation ? 'added' : ''}`}
          onClick={handleAdd}
          title="Add to Shopping Bag"
          aria-label="Add to Bag"
        >
          {addedAnimation ? <Check size={14} /> : <Plus size={16} />}
        </button>

        {/* Desktop Quick View Overlay */}
        <div className="product-hover-actions">
          <button 
            className="hover-action-btn quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details (Compact Mobile Layout) */}
      <div className="product-info compact-info">
        
        {/* Color Swatch Dots */}
        <div className="product-colors compact-colors" onClick={(e) => e.stopPropagation()}>
          {product.colors.map((color) => (
            <button
              key={color.name}
              className={`color-swatch-dot mini-dot ${selectedColor.name === color.name ? 'selected' : ''}`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              onClick={() => setSelectedColor(color)}
              aria-label={color.name}
            />
          ))}
          <span className="selected-color-name mini-color-name">{selectedColor.name}</span>
        </div>

        <h3 className="product-title compact-title">{product.name}</h3>
        <p className="product-tagline compact-tagline">{product.tagline}</p>

        <div className="product-price-row compact-price-row">
          <div className="product-price">
            <span className="currency-symbol">{curr.symbol}</span>
            <span className="price-amount">{formattedPrice}</span>
          </div>

          <button 
            className={`add-bag-button mini-add-btn tap-scale ${addedAnimation ? 'added' : ''}`}
            onClick={handleAdd}
            aria-label="Add to Bag"
          >
            {addedAnimation ? (
              <>
                <Check size={12} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={12} />
                <span>Bag</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
