import React, { useState } from 'react';
import { X, ShieldCheck, Check, CreditCard, Lock, Truck, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRENCIES, BRAND_INFO } from '../data/atelierData';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  currency,
  onClearCart,
  onRecordOrder
}) {
  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;
  const subtotalUSD = cart.reduce((acc, item) => acc + (item.priceUSD * item.quantity), 0);
  const totalConverted = (subtotalUSD * curr.rate).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Nigeria',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvv: '•••'
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const ordNum = `JA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(ordNum);

    if (onRecordOrder) {
      onRecordOrder({
        orderNumber: ordNum,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.country}`,
        items: [...cart],
        totalUSD: subtotalUSD,
        status: 'In Production'
      });
    }

    setOrderComplete(true);
    onClearCart();

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#C8A45D', '#DFBA6E', '#F8F6F2', '#0F4C45']
      });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="checkout-modal-dialog" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-btn" onClick={onClose} aria-label="Close checkout">
          <X size={20} />
        </button>

        {orderComplete ? (
          <div className="order-complete-view">
            <div className="order-complete-icon gold-gradient-bg">
              <Check size={36} color="#0c0c0c" />
            </div>

            <span className="script-font script-lead">Thank You!</span>
            <h2 className="complete-title">Your Order Has Been Placed</h2>
            <p className="order-num-text">Order Reference: <strong>{orderNumber}</strong></p>
            
            <div className="complete-receipt-card">
              <div className="receipt-header">
                <div className="card-logo-wrap">
                  <img src="/images/jhay-atelier-logo.jpg" alt="JHAY ATELIER" className="receipt-logo-thumb" />
                  <span className="receipt-brand">{BRAND_INFO.name}</span>
                </div>
                <span className="receipt-status">CONFIRMED &bull; IN PRODUCTION</span>
              </div>
              <p className="receipt-msg">
                Your dress has been queued for our master dressmakers. We will craft your outfit with exquisite care, beautifully packaged in our signature matte black presentation box with champagne gold ribbon.
              </p>
              <div className="receipt-summary-row">
                <span>Total Paid:</span>
                <strong className="receipt-total">{curr.symbol}{totalConverted}</strong>
              </div>
              <div className="receipt-contact">
                <span>Customer Concierge &amp; WhatsApp: +234 801 234 5678 &bull; hello@jhayatelier.com</span>
              </div>
            </div>

            <button 
              className="btn-primary gold-gradient-bg tap-scale"
              onClick={() => {
                setOrderComplete(false);
                onClose();
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="checkout-content-grid">
            
            {/* Form Column */}
            <div className="checkout-form-col">
              <div className="checkout-header">
                <span className="checkout-eyebrow">FAST &amp; SECURE CHECKOUT</span>
                <h2 className="checkout-title">Your Delivery Details</h2>
              </div>

              <form onSubmit={handlePlaceOrder} className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Vivienne" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Cole" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="vivienne@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone (for Courier Tracking)</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+234 ... / +44 ..." 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Delivery Suite / Residence Address</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Penthouse 4B, 12 Grosvenor Square" 
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Uyo / Abuja / Lagos / London" 
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Country / Region</label>
                    <select 
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="payment-options-block">
                  <label className="section-mini-label">Payment Authorization</label>
                  <div className="payment-pills">
                    <button 
                      type="button" 
                      className={`payment-pill ${formData.paymentMethod === 'card' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    >
                      <CreditCard size={15} /> Card &bull; Apple Pay
                    </button>
                    <button 
                      type="button" 
                      className={`payment-pill ${formData.paymentMethod === 'wire' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, paymentMethod: 'wire' })}
                    >
                      Private Bank Wire Transfer
                    </button>
                  </div>

                  {formData.paymentMethod === 'card' ? (
                    <div className="card-mock-fields">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" defaultValue="4532 •••• •••• 8891" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Exp Date</label>
                          <input type="text" defaultValue="08/29" />
                        </div>
                        <div className="form-group">
                          <label>CVV / CVC</label>
                          <input type="text" defaultValue="883" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="wire-instructions-box">
                      <p>Atelier wire instructions will be dispatched to your email upon confirmation. Creation begins immediately upon bank receipt.</p>
                    </div>
                  )}
                </div>

                <button type="submit" className="place-order-btn gold-gradient-bg tap-scale">
                  <Lock size={15} />
                  <span>Place Your Order ({curr.symbol}{totalConverted})</span>
                </button>

                <div className="checkout-trust-notice">
                  <ShieldCheck size={14} /> 256-Bit Encrypted Secure Checkout &bull; Signature Gift Box Included
                </div>
              </form>
            </div>

            {/* Summary Column */}
            <div className="checkout-summary-col">
              <h3 className="summary-title">Acquisition Summary</h3>
              
              <div className="summary-items-list">
                {cart.map((item, idx) => (
                  <div key={idx} className="summary-item">
                    <img src={item.image} alt={item.name} className="summary-item-img" />
                    <div className="summary-item-info">
                      <h5>{item.name}</h5>
                      <span className="summary-meta">{item.selectedColor.name} &bull; {item.selectedSize}</span>
                      <span className="summary-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="summary-item-price">
                      {curr.symbol}{(item.priceUSD * curr.rate * item.quantity).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="sum-row">
                  <span>Subtotal</span>
                  <span>{curr.symbol}{totalConverted}</span>
                </div>
                <div className="sum-row">
                  <span>White-Glove Courier</span>
                  <span className="free-text">COMPLIMENTARY</span>
                </div>
                <div className="sum-row">
                  <span>Bespoke Black Box &amp; Ribbon</span>
                  <span className="free-text">INCLUDED</span>
                </div>
                <div className="sum-row grand-total">
                  <span>Total</span>
                  <span>{curr.symbol}{totalConverted}</span>
                </div>
              </div>

              <div className="summary-packaging-badge">
                <Gift size={18} color="#C8A45D" />
                <div>
                  <strong>Iconic Presentation Box</strong>
                  <p>Includes embossed garment bag, silk hanger, and personalized thank you note.</p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
