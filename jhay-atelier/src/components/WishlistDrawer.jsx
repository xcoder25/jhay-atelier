import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { CURRENCIES } from '../data/atelierData';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  currency,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView
}) {
  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <Heart size={20} className="gold-icon" fill="#C8A45D" />
            <h3 className="drawer-title">Saved Creations</h3>
            <span className="cart-item-count">({wishlist.length})</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="cart-items-container">
          {wishlist.length === 0 ? (
            <div className="empty-cart-view">
              <Heart size={44} className="empty-bag-icon" />
              <h4>Your Wishlist is Empty</h4>
              <p>Explore our creations and tap the heart icon to save your favorite couture looks.</p>
              <button 
                className="btn-primary gold-gradient-bg start-shopping-btn"
                onClick={onClose}
              >
                Browse Creations
              </button>
            </div>
          ) : (
            wishlist.map((item) => {
              const formattedPrice = (item.priceUSD * curr.rate).toLocaleString(undefined, {
                maximumFractionDigits: 0
              });

              return (
                <div key={item.id} className="cart-item-card wishlist-item-card">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="cart-item-thumb cursor-pointer"
                    onClick={() => {
                      onClose();
                      onQuickView(item);
                    }}
                  />
                  
                  <div className="cart-item-details">
                    <h4 
                      className="cart-item-title cursor-pointer"
                      onClick={() => {
                        onClose();
                        onQuickView(item);
                      }}
                    >
                      {item.name}
                    </h4>
                    
                    <p className="cart-item-notes">{item.tagline}</p>
                    <div className="cart-item-price">{curr.symbol}{formattedPrice}</div>

                    <div className="wishlist-actions-row">
                      <button 
                        className="move-to-bag-btn gold-gradient-bg"
                        onClick={() => {
                          onAddToCart({
                            ...item,
                            selectedColor: item.colors[0],
                            selectedSize: item.sizes[0]
                          });
                          onRemoveFromWishlist(item.id);
                        }}
                      >
                        <ShoppingBag size={14} /> Move to Bag
                      </button>

                      <button 
                        className="cart-item-delete"
                        onClick={() => onRemoveFromWishlist(item.id)}
                        title="Remove from saved"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
