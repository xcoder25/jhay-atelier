import React, { useState, useEffect, useRef } from 'react';
import { Home, Sparkles, Heart, ShoppingBag, Calendar } from 'lucide-react';

export default function MobileNav({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenBooking,
  onScrollToTop,
  onGoToStore,
  currentView
}) {
  const [activeTab, setActiveTab] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [ripple, setRipple] = useState(null);
  const navRef = useRef(null);

  // Auto-hide on scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const triggerRipple = (id, e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ id, x, y, key: Date.now() });
    setTimeout(() => setRipple(null), 600);
  };

  const handleTabClick = (tab, callback, e) => {
    setActiveTab(tab);
    triggerRipple(tab, e);
    if (callback) callback();
  };

  return (
    <nav
      ref={navRef}
      className={`mobile-bottom-bar${isVisible ? '' : ' mobile-bottom-bar--hidden'}`}
      aria-label="Mobile Navigation"
    >
      {/* Animated indicator pill */}
      <div className="mobile-nav-indicator" />

      <div className="mobile-bottom-inner">
        
        {/* Home / Top */}
        <button 
          className={`mobile-bottom-item${activeTab === 'home' ? ' active' : ''}`}
          onClick={(e) => handleTabClick('home', onScrollToTop, e)}
          aria-label="Atelier Home"
        >
          {ripple?.id === 'home' && (
            <span className="nav-ripple" style={{ left: ripple.x, top: ripple.y, '--key': ripple.key }} key={ripple.key} />
          )}
          <div className="icon-wrapper">
            <Home size={19} />
            {activeTab === 'home' && <span className="active-dot" />}
          </div>
          <span>Atelier</span>
        </button>

        {/* Store Tab */}
        <button 
          className={`mobile-bottom-item${activeTab === 'store' || currentView === 'store' ? ' active' : ''}`}
          onClick={(e) => handleTabClick('store', onGoToStore, e)}
          aria-label="Shop the Store"
          id="mobile-nav-store"
        >
          {ripple?.id === 'store' && (
            <span className="nav-ripple" style={{ left: ripple.x, top: ripple.y }} key={ripple.key} />
          )}
          <div className="icon-wrapper">
            <Sparkles size={19} />
            {(activeTab === 'store' || currentView === 'store') && <span className="active-dot" />}
          </div>
          <span>Store</span>
        </button>

        {/* Center Bespoke Booking CTA */}
        <button 
          className={`mobile-center-fitting-btn gold-gradient-bg${activeTab === 'booking' ? ' booking-active' : ''}`}
          onClick={(e) => handleTabClick('booking', onOpenBooking, e)}
          aria-label="Book Atelier Fitting"
        >
          <div className="fitting-btn-inner">
            <Calendar size={18} />
            <span className="fitting-pulse-ring" />
          </div>
          <span className="fitting-text">Fitting</span>
        </button>

        {/* Wishlist */}
        <button 
          className={`mobile-bottom-item${activeTab === 'wishlist' ? ' active' : ''}`}
          onClick={(e) => handleTabClick('wishlist', onOpenWishlist, e)}
          aria-label="Wishlist"
        >
          {ripple?.id === 'wishlist' && (
            <span className="nav-ripple" style={{ left: ripple.x, top: ripple.y }} key={ripple.key} />
          )}
          <div className="icon-wrapper">
            <Heart size={19} className={wishlistCount > 0 ? 'heart-filled' : ''} />
            {wishlistCount > 0 && <span className="mobile-badge animate-badge">{wishlistCount}</span>}
            {activeTab === 'wishlist' && <span className="active-dot" />}
          </div>
          <span>Wishlist</span>
        </button>

        {/* Bag */}
        <button 
          className={`mobile-bottom-item${activeTab === 'bag' ? ' active' : ''}`}
          onClick={(e) => handleTabClick('bag', onOpenCart, e)}
          aria-label="Shopping Bag"
        >
          {ripple?.id === 'bag' && (
            <span className="nav-ripple" style={{ left: ripple.x, top: ripple.y }} key={ripple.key} />
          )}
          <div className="icon-wrapper">
            <ShoppingBag size={19} />
            {cartCount > 0 && <span className="mobile-badge pulse animate-badge">{cartCount}</span>}
            {activeTab === 'bag' && <span className="active-dot" />}
          </div>
          <span>Bag</span>
        </button>

      </div>

      {/* Bottom safe-area fill */}
      <div className="mobile-nav-safe-fill" />
    </nav>
  );
}
