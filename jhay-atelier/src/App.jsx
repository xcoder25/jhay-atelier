import React, { useState, useEffect } from 'react';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import StorefrontPage from './pages/StorefrontPage';
import StorePage from './pages/StorePage';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import BookingModal from './components/BookingModal';
import CheckoutModal from './components/CheckoutModal';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLoginModal from './components/admin/AdminLoginModal';
import { PRODUCTS } from './data/atelierData';
import {
  seedProductsIfEmpty,
  subscribeOrders,
  subscribeBookings,
  subscribeProducts,
  addOrder,
  addBooking,
  addProduct,
  updateOrderStatus,
  updateBookingStatus,
  updateProductPrice,
  updateProduct,
  deleteProduct
} from './firestoreService';
import './App.css';

function App() {
  // Scroll-triggered entrance animations (IntersectionObserver)
  useScrollAnimations();

  // Currency (default to NGN for Uyo, Nigeria atelier)
  const [currency, setCurrency] = useState('NGN');

  // ── Firestore real-time state ───────────────────────────────
  const [products, setProducts] = useState(PRODUCTS); // optimistic default
  const [orders,   setOrders]   = useState([]);
  const [bookings, setBookings] = useState([]);
  const [firestoreReady, setFirestoreReady] = useState(false);

  // Seed products to Firestore on first load, then subscribe to all collections
  useEffect(() => {
    let unsubOrders, unsubBookings, unsubProducts;

    seedProductsIfEmpty()
      .then(() => {
        unsubProducts = subscribeProducts((prods) => {
          if (prods.length > 0) setProducts(prods);
          setFirestoreReady(true);
        });

        unsubOrders   = subscribeOrders((ords)  => setOrders(ords));
        unsubBookings = subscribeBookings((bkgs) => setBookings(bkgs));
      })
      .catch((err) => {
        console.warn("[JHAY] Firestore unavailable, using local fallback.", err);
        setFirestoreReady(true);
      });

    return () => {
      unsubOrders?.();
      unsubBookings?.();
      unsubProducts?.();
    };
  }, []);

  // ── Admin auth state (session persisted) ───────────────────
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(() => {
    return sessionStorage.getItem('jhay_admin_auth') === 'true';
  });
  const [isAdminView, setIsAdminView] = useState(() => {
    return sessionStorage.getItem('jhay_admin_auth') === 'true' && window.location.hash.toLowerCase() === '#admin';
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Hidden admin access: listens for #admin in URL and Ctrl+Shift+A shortcut
  useEffect(() => {
    const checkAdminRoute = () => {
      const isHashAdmin = window.location.hash.toLowerCase() === '#admin';
      const isSearchAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';
      if (isHashAdmin || isSearchAdmin) {
        if (sessionStorage.getItem('jhay_admin_auth') === 'true') {
          setIsOwnerAuthenticated(true);
          setIsAdminView(true);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };

    const handleKeyDown = (e) => {
      // Secret Admin Hotkey: Ctrl + Shift + A (or Cmd + Shift + A on macOS)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (sessionStorage.getItem('jhay_admin_auth') === 'true') {
          setIsAdminView((prev) => !prev);
          if (!isAdminView) {
            window.location.hash = '#admin';
          }
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminView]);

  // ── Page view state: 'landing' | 'store' ─────────────────────
  const [view, setView] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    return hash === '#store' ? 'store' : 'landing';
  });

  const goToStore = () => {
    setView('store');
    window.history.pushState(null, '', window.location.pathname + '#store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToLanding = () => {
    setView('landing');
    window.history.pushState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser back/forward nav
  useEffect(() => {
    const handlePop = () => {
      const hash = window.location.hash.toLowerCase();
      setView(hash === '#store' ? 'store' : 'landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // ── Storefront shopping state ───────────────────────────────
  const [cart,    setCart]    = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState(null);
  const [isCartOpen,     setIsCartOpen]     = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBookingOpen,  setIsBookingOpen]  = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // ── Cart operations ─────────────────────────────────────────
  const handleAddToCart = (productToAdd) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === productToAdd.id &&
          item.selectedColor.name === productToAdd.selectedColor.name &&
          item.selectedSize === productToAdd.selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { ...productToAdd, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty < 1) return;
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveFromCart = (index) => setCart((prev) => prev.filter((_, i) => i !== index));
  const handleClearCart      = ()      => setCart([]);

  // ── Firestore write — new order from storefront checkout ────
  const handleRecordOrder = async (newOrder) => {
    try {
      await addOrder(newOrder);
    } catch (err) {
      console.error("[JHAY] Failed to write order to Firestore:", err);
      // Fallback: keep locally if offline
      setOrders((prev) => [newOrder, ...prev]);
    }
  };

  // ── Firestore write — new booking from storefront scheduler ─
  const handleRecordBooking = async (newBooking) => {
    try {
      await addBooking(newBooking);
    } catch (err) {
      console.error("[JHAY] Failed to write booking to Firestore:", err);
      setBookings((prev) => [newBooking, ...prev]);
    }
  };

  // ── Admin: order status update via Firestore ────────────────
  const handleUpdateOrderStatus = async (index, newStatus) => {
    const order = orders[index];
    if (order?._id) {
      try {
        await updateOrderStatus(order._id, newStatus);
        return; // Firestore onSnapshot will push the update
      } catch (err) {
        console.error("[JHAY] Order status update failed:", err);
      }
    }
    // Fallback for mock orders without _id
    setOrders((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: newStatus };
      return updated;
    });
  };

  // ── Admin: booking status update via Firestore ──────────────
  const handleUpdateBookingStatus = async (index, newStatus) => {
    const booking = bookings[index];
    if (booking?._id) {
      try {
        await updateBookingStatus(booking._id, newStatus);
        return;
      } catch (err) {
        console.error("[JHAY] Booking status update failed:", err);
      }
    }
    setBookings((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: newStatus };
      return updated;
    });
  };

  // ── Admin: catalog ops via Firestore ────────────────────────
  const handleAddProduct = async (newProd) => {
    try {
      await addProduct(newProd);
    } catch (err) {
      console.error("[JHAY] Add product failed:", err);
      setProducts((prev) => [newProd, ...prev]);
    }
  };

  const handleUpdateProductPrice = async (prodId, newPrice) => {
    try {
      await updateProductPrice(prodId, newPrice);
    } catch (err) {
      console.error("[JHAY] Price update failed:", err);
      setProducts((prev) => prev.map((p) => (p.id === prodId ? { ...p, priceUSD: newPrice } : p)));
    }
  };

  const handleUpdateProduct = async (prodId, updatedFields) => {
    try {
      await updateProduct(prodId, updatedFields);
    } catch (err) {
      console.error("[JHAY] Product update failed:", err);
      setProducts((prev) => prev.map((p) => (p.id === prodId ? { ...p, ...updatedFields } : p)));
    }
  };

  const handleDeleteProduct = async (prodId) => {
    try {
      await deleteProduct(prodId);
    } catch (err) {
      console.error("[JHAY] Delete product failed:", err);
      setProducts((prev) => prev.filter((p) => p.id !== prodId));
    }
  };

  // ── Wishlist ─────────────────────────────────────────────────
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      return exists ? prev.filter((item) => item.id !== product.id) : [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  // ── Scroll helper ─────────────────────────────────────────────
  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Admin view gate ───────────────────────────────────────────
  if (isAdminView && isOwnerAuthenticated) {
    return (
      <AdminDashboard
        orders={orders}
        bookings={bookings}
        products={products}
        firestoreReady={firestoreReady}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onAddProduct={handleAddProduct}
        onUpdateProductPrice={handleUpdateProductPrice}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onBackToStore={() => {
          setIsAdminView(false);
          if (window.location.hash.toLowerCase() === '#admin') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        onLogout={() => {
          sessionStorage.removeItem('jhay_admin_auth');
          setIsOwnerAuthenticated(false);
          setIsAdminView(false);
          if (window.location.hash.toLowerCase() === '#admin') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        currency={currency}
        onCurrencyChange={setCurrency}
      />
    );
  }

  return (
    <div className="app-layout">
      <Navbar
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onGoToStore={goToStore}
        onGoToLanding={goToLanding}
        currentView={view}
      />

      <main>
        {view === 'store' ? (
          <StorePage
            currency={currency}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(prod) => setActiveQuickViewProduct(prod)}
            onAddToCart={handleAddToCart}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        ) : (
          <StorefrontPage
            currency={currency}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(prod) => setActiveQuickViewProduct(prod)}
            onAddToCart={handleAddToCart}
            onOpenBooking={() => setIsBookingOpen(true)}
            scrollToCollections={scrollToCollections}
            onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
            onGoToStore={goToStore}
          />
        )}
      </main>

      <ProductModal
        product={activeQuickViewProduct}
        currency={currency}
        isWishlisted={activeQuickViewProduct ? wishlist.some((i) => i.id === activeQuickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onClose={() => setActiveQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenBooking={() => {
          setActiveQuickViewProduct(null);
          setIsBookingOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenBooking={() => {
          setIsCartOpen(false);
          setIsBookingOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency={currency}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(prod) => setActiveQuickViewProduct(prod)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onRecordBooking={handleRecordBooking}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currency={currency}
        onClearCart={handleClearCart}
        onRecordOrder={handleRecordOrder}
      />

      <MobileNav
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        onScrollToTop={() => { goToLanding(); }}
        onGoToStore={goToStore}
        currentView={view}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          sessionStorage.setItem('jhay_admin_auth', 'true');
          setIsOwnerAuthenticated(true);
          setIsAdminView(true);
          window.location.hash = '#admin';
        }}
      />
    </div>
  );
}

export default App;
