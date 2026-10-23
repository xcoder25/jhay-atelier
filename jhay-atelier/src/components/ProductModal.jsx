import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Check, Ruler, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { CURRENCIES } from '../data/atelierData';

export default function ProductModal({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onClose,
  onAddToCart,
  onOpenBooking
}) {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [customNotes, setCustomNotes] = useState('');
  const [showMeasureHelp, setShowMeasureHelp] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const curr = CURRENCIES[currency] || CURRENCIES.USD;
  const formattedPrice = (product.priceUSD * curr.rate).toLocaleString(undefined, {
    maximumFractionDigits: 0
  });

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize,
      customNotes: selectedSize.includes('Custom') ? customNotes : ''
    });
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="product-modal-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        <div className="product-modal-grid">
          
          {/* Image Side */}
          <div className="modal-image-col">
            <img src={product.image} alt={product.name} className="modal-product-image" />
            <div className="modal-image-badge">
              <Sparkles size={13} />
              <span>{product.badge || 'Haute Couture'}</span>
            </div>
          </div>

          {/* Details Side */}
          <div className="modal-info-col">
            <span className="modal-eyebrow">JHAY ATELIER &bull; WOMEN’S COLLECTION</span>
            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-tagline">{product.tagline}</p>

            <div className="modal-price-box">
              <span className="modal-price">{curr.symbol}{formattedPrice}</span>
              <span className="modal-price-note">Free signature gift box packaging &bull; Free size alterations if needed</span>
            </div>

            <p className="modal-desc">{product.description}</p>

            {/* Color Selection */}
            <div className="modal-section">
              <label className="modal-label">Choose Color: <strong>{selectedColor.name}</strong></label>
              <div className="color-swatches-row">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`modal-color-btn ${selectedColor.name === color.name ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="modal-section">
              <div className="size-header-row">
                <label className="modal-label">Select Your Dress Size:</label>
                <button 
                  className="size-guide-toggle"
                  onClick={() => setShowMeasureHelp(!showMeasureHelp)}
                >
                  <Ruler size={13} /> {showMeasureHelp ? 'Hide Size Guide' : 'How to Pick Your Size'}
                </button>
              </div>

              {showMeasureHelp && (
                <div className="measure-help-box">
                  <p><strong>Dress Sizing Guide:</strong></p>
                  <ul style={{ marginLeft: '1.2rem', marginTop: '0.35rem', lineHeight: '1.5' }}>
                    <li><strong>Small (UK 8 / US 4):</strong> Bust 34&quot;, Waist 26–27&quot;, Hips 36–37&quot;</li>
                    <li><strong>Medium (UK 10 / US 6):</strong> Bust 36&quot;, Waist 28–29&quot;, Hips 38–39&quot;</li>
                    <li><strong>Large (UK 12 / US 8):</strong> Bust 38&quot;, Waist 30–31&quot;, Hips 40–42&quot;</li>
                    <li><strong>Custom Size:</strong> Pick this option and enter your bust, waist, hips, and height below. Our tailor will cut the dress specifically for your body!</li>
                  </ul>
                </div>
              )}

              <div className="size-options-grid">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-pill-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {selectedSize.includes('Custom') && (
                <div className="custom-measure-input-box">
                  <label>Your Bust, Waist, Hips &amp; Height (in inches or cm):</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Bust: 36in, Waist: 29in, Hips: 41in, Height: 5ft 8in with 3in heels"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="custom-notes-input"
                  />
                </div>
              )}
            </div>

            {/* Feature Highlights */}
            <div className="modal-features-list">
              {product.features && product.features.map((feat, idx) => (
                <div key={idx} className="modal-feature-item">
                  <Check size={14} className="feature-check" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="modal-action-buttons">
              <button 
                className={`modal-add-btn gold-gradient-bg ${addedSuccess ? 'success' : ''}`}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>{addedSuccess ? 'Added to Bag' : 'Add to Bag'}</span>
              </button>

              <button 
                className={`modal-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product)}
                title="Save to Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? '#C8A45D' : 'none'} color={isWishlisted ? '#C8A45D' : '#ffffff'} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="modal-trust-row">
              <div className="trust-item">
                <Truck size={14} />
                <span>Fast Doorstep Delivery</span>
              </div>
              <div className="trust-item">
                <ShieldCheck size={14} />
                <span>100% Fit &amp; Quality Guarantee</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
