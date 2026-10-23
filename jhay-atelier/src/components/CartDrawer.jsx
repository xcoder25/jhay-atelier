import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { CURRENCIES } from '../data/atelierData';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onOpenBooking
}) {
  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  const subtotalUSD = cart.reduce((acc, item) => acc + (item.priceUSD * item.quantity), 0);
  const formattedSubtotal = (subtotalUSD * curr.rate).toLocaleString(undefined, {
    maximumFractionDigits: 0
  });

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <ShoppingBag size={20} className="gold-icon" />
            <h3 className="drawer-title">Your Shopping Bag</h3>
            <span className="cart-item-count">({cart.reduce((a, b) => a + b.quantity, 0)})</span>
          </div>
          <button className="drawer-close-btn tap-scale" onClick={onClose} aria-label="Close bag">
            <X size={20} />
          </button>
        </div>

        {/* Signature Box Luxury Note */}
        <div className="signature-packaging-banner">
          <Gift size={16} className="gift-icon" />
          <div className="packaging-text">
            <strong>Gift Presentation:</strong> Delivered in our iconic JHAY ATELIER matte black box with champagne gold ribbon.
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart-view">
              <ShoppingBag size={48} className="empty-bag-icon" />
              <h4>Your Shopping Bag is Empty</h4>
              <p>Explore our women’s dresses and select your favorite outfit.</p>
              <button 
                className="btn-primary gold-gradient-bg start-shopping-btn tap-scale"
                onClick={onClose}
              >
                Shop Dresses
              </button>
            </div>
          ) : (
            cart.map((item, index) => {
              const itemTotal = (item.priceUSD * curr.rate * item.quantity).toLocaleString(undefined, {
                maximumFractionDigits: 0
              });

              return (
                <div key={`${item.id}-${item.selectedColor.name}-${item.selectedSize}-${index}`} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.name}</h4>
                    
                    <div className="cart-item-specs">
                      <span className="spec-badge">
                        <span className="color-indicator" style={{ backgroundColor: item.selectedColor.hex }}></span>
                        {item.selectedColor.name}
                      </span>
                      <span className="spec-badge size-badge">{item.selectedSize}</span>
                    </div>

                    {item.customNotes && (
                      <p className="cart-item-notes">Notes: {item.customNotes}</p>
                    )}

                    <div className="cart-item-bottom-row">
                      <div className="cart-qty-control">
                        <button 
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(index, item.quantity + 1)}>
                          +
                        </button>
                      </div>

                      <div className="cart-item-price">
                        {curr.symbol}{itemTotal}
                      </div>

                      <button 
                        className="cart-item-delete"
                        onClick={() => onRemoveItem(index)}
                        title="Remove piece"
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

        {/* Drawer Footer / Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span className="subtotal-label">Subtotal Estimate</span>
              <span className="subtotal-val">{curr.symbol}{formattedSubtotal}</span>
            </div>
            
            <p className="drawer-shipping-info">
              Shipping &amp; courier options calculated at checkout.
            </p>

            <button 
              className="checkout-btn gold-gradient-bg tap-scale"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className="drawer-security-note">
              <ShieldCheck size={14} />
              <span>Free size adjustments if your dress needs any fitting tweaks</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
