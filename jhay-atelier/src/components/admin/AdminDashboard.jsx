import React, { useState, useEffect } from 'react';
import './admin.css';
import { 
  TrendingUp, ShoppingBag, Calendar, Package, DollarSign, 
  Users, CheckCircle2, Clock, MapPin, Phone, Mail, 
  ArrowLeft, Plus, Trash2, Edit3, Globe, Sparkles, AlertCircle,
  ExternalLink, Search, RefreshCw, Eye, Download, Send, Check,
  MessageSquare, Bell, Filter
} from 'lucide-react';
import { CURRENCIES, BRAND_INFO } from '../../data/atelierData';
import {
  getAdminEmail,
  setAdminEmail,
  sendBookingToAdmin,
  sendTestEmailToAdmin,
  generateMailtoLink
} from '../../emailNotificationService';

export default function AdminDashboard({
  orders,
  bookings,
  products,
  firestoreReady,
  onUpdateOrderStatus,
  onUpdateBookingStatus,
  onAddProduct,
  onUpdateProductPrice,
  onUpdateProduct,
  onDeleteProduct,
  onBackToStore,
  onLogout,
  currency,
  onCurrencyChange
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'fittings' | 'catalog' | 'settings'

  // Admin Notification Email configuration state
  const [adminEmail, setAdminEmailState] = useState(() => getAdminEmail());
  const [isEditingAdminEmail, setIsEditingAdminEmail] = useState(false);
  const [tempAdminEmail, setTempAdminEmail] = useState(adminEmail);
  const [emailTestStatus, setEmailTestStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [emailTestMessage, setEmailTestMessage] = useState('');
  const [resendingBookingRef, setResendingBookingRef] = useState(null);

  // Fittings filtering & search state
  const [fittingsSearch, setFittingsSearch] = useState('');
  const [fittingsStatusFilter, setFittingsStatusFilter] = useState('all');

  const [liveStreamEvents, setLiveStreamEvents] = useState([
    { id: 1, time: '2 mins ago', type: 'order', text: 'New Order placed for The Champagne Élysée One-Shoulder Dress (Size M)' },
    { id: 2, time: '14 mins ago', type: 'fitting', text: 'Private Fitting booked by Zainab Adeleke (Uyo Flagship Atelier)' },
    { id: 3, time: '45 mins ago', type: 'inquiry', text: 'WhatsApp styling inquiry received from London Mayfair client (+44 7911...)' },
    { id: 4, time: '1 hour ago', type: 'production', text: 'Master Dressmaker completed hand-beading on Emerald Royale Velvet Gown' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddOutfitModal, setShowAddOutfitModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newOutfit, setNewOutfit] = useState({
    name: '',
    category: 'gowns',
    tagline: '',
    priceUSD: 1850,
    badge: 'New Arrival',
    image: '/images/hero-gown.jpg',
    description: ''
  });

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  // Real-time metrics calculation
  const totalRevenueUSD = orders.reduce((acc, order) => {
    const orderTotal = order.items ? order.items.reduce((sum, item) => sum + (item.priceUSD * (item.quantity || 1)), 0) : order.totalUSD || 0;
    return acc + orderTotal;
  }, 0);

  const formattedRevenue = (totalRevenueUSD * curr.rate).toLocaleString(undefined, { maximumFractionDigits: 0 });

  // Simulate incoming real-time activity stream every 45s
  useEffect(() => {
    const timer = setInterval(() => {
      const mockNames = ['Lady Folashade', 'Duchess Amina', 'Vivienne Cole', 'Dr. Ngozi Bello', 'Tara Gold'];
      const mockDresses = ['The Emerald Royale Velvet Gown', 'The Champagne Élysée Dress', 'The Tuxedo Noir Suit Dress'];
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      const randomDress = mockDresses[Math.floor(Math.random() * mockDresses.length)];

      const newEvent = {
        id: Date.now(),
        time: 'Just now',
        type: Math.random() > 0.5 ? 'order' : 'fitting',
        text: Math.random() > 0.5 
          ? `VIP client ${randomName} viewed ${randomDress}` 
          : `New consultation inquiry from ${randomName} for upcoming Gala`
      };

      setLiveStreamEvents((prev) => [newEvent, ...prev.slice(0, 7)]);
    }, 45000);

    return () => clearInterval(timer);
  }, []);

  const handleCreateOutfit = (e) => {
    e.preventDefault();
    if (!newOutfit.name || !newOutfit.priceUSD) return;

    onAddProduct({
      id: `ja-custom-${Date.now()}`,
      ...newOutfit,
      priceUSD: Number(newOutfit.priceUSD),
      colors: [
        { name: "Champagne Gold", hex: "#C8A45D" },
        { name: "Deep Emerald", hex: "#0F4C45" },
        { name: "Classic Black", hex: "#111111" }
      ],
      sizes: ["UK 8 / US 4 (S)", "UK 10 / US 6 (M)", "UK 12 / US 8 (L)", "Custom Size (Tailored to your body)"],
      features: [
        "100% Noble European Silk Satin",
        "Hand-stitched in our Victoria Island Studio",
        "Free bespoke fit guarantee"
      ]
    });

    setShowAddOutfitModal(false);
    setNewOutfit({
      name: '',
      category: 'gowns',
      tagline: '',
      priceUSD: 1850,
      badge: 'New Arrival',
      image: '/images/hero-gown.jpg',
      description: ''
    });
  };

  const handleSaveEditProduct = (e) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name || !editingProduct.priceUSD) return;

    if (onUpdateProduct) {
      onUpdateProduct(editingProduct.id, {
        name: editingProduct.name,
        category: editingProduct.category,
        priceUSD: Number(editingProduct.priceUSD),
        tagline: editingProduct.tagline || '',
        badge: editingProduct.badge || '',
        image: editingProduct.image || '/images/hero-gown.jpg',
        description: editingProduct.description || ''
      });
    }
    setEditingProduct(null);
  };

  return (
    <div className="admin-portal-root">
      
      {/* Top Admin Bar */}
      <header className="admin-topbar">
        <div className="luxury-container admin-topbar-inner">
          
          <div className="admin-brand-cluster">
            <img src="/images/jhay-atelier-logo.jpg" alt="JHAY ATELIER" className="admin-header-logo" />
            <div className="admin-brand-meta">
              <div className="admin-brand-title">JHAY ATELIER <span className="owner-badge">OWNER PORTAL</span></div>
              <div className="admin-live-pulse-strip">
                <span className={`live-pulsating-dot ${firestoreReady ? '' : 'pulse-amber'}`}></span>
                <span className="live-stream-label">
                  {firestoreReady ? 'FIREBASE REALTIME — CONNECTED' : 'CONNECTING TO FIREBASE...'}
                </span>
              </div>
            </div>
          </div>

          <div className="admin-topbar-actions">
            {/* Currency switcher */}
            <div className="admin-currency-selector">
              <Globe size={13} />
              <select value={currency} onChange={(e) => onCurrencyChange(e.target.value)}>
                {Object.keys(CURRENCIES).map((k) => (
                  <option key={k} value={k}>{CURRENCIES[k].label}</option>
                ))}
              </select>
            </div>

            <button 
              className="admin-action-btn back-store-btn tap-scale"
              onClick={onBackToStore}
            >
              <Eye size={14} />
              <span>View Storefront</span>
            </button>

            <button 
              className="admin-action-btn logout-btn tap-scale"
              onClick={onLogout}
            >
              <ArrowLeft size={14} />
              <span>Exit Portal</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Body */}
      <div className="luxury-container admin-main-container">
        
        {/* Navigation Tabs (Mobile-Scrollable) */}
        <div className="admin-tabs-nav-bar">
          <button 
            className={`admin-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <TrendingUp size={16} />
            <span>Overview &amp; Metrics</span>
          </button>

          <button 
            className={`admin-nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={16} />
            <span>Client Orders</span>
            <span className="admin-tab-pill">{orders.length}</span>
          </button>

          <button 
            className={`admin-nav-tab ${activeTab === 'fittings' ? 'active' : ''}`}
            onClick={() => setActiveTab('fittings')}
          >
            <Calendar size={16} />
            <span>Bespoke Fittings</span>
            <span className="admin-tab-pill">{bookings.length}</span>
          </button>

          <button 
            className={`admin-nav-tab ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <Package size={16} />
            <span>Outfits &amp; Pricing</span>
            <span className="admin-tab-pill">{products.length}</span>
          </button>

          <button 
            className={`admin-nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Edit3 size={16} />
            <span>Studio Settings</span>
          </button>
        </div>

        {/* ===================================================================
            TAB 1: OVERVIEW & REAL-TIME ACTIVITY
            =================================================================== */}
        {activeTab === 'overview' && (
          <div className="admin-tab-content animate-card-fade">
            
            {/* 4 Key Stat Cards */}
            <div className="admin-metrics-grid">
              <div className="metric-card gold-border">
                <div className="metric-header">
                  <span>Total Sales Revenue</span>
                  <DollarSign size={18} className="gold-icon" />
                </div>
                <div className="metric-val">{curr.symbol}{formattedRevenue}</div>
                <div className="metric-sub text-green">&uarr; Real-time verified sales</div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <span>Client Orders</span>
                  <ShoppingBag size={18} className="gold-icon" />
                </div>
                <div className="metric-val">{orders.length} Orders</div>
                <div className="metric-sub">{orders.filter(o => o.status !== 'Delivered').length} in active studio sewing</div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <span>Bespoke Fittings</span>
                  <Calendar size={18} className="gold-icon" />
                </div>
                <div className="metric-val">{bookings.length} Scheduled</div>
                <div className="metric-sub">Lagos, London &amp; Video Consults</div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <span>Active Outfits Catalog</span>
                  <Package size={18} className="gold-icon" />
                </div>
                <div className="metric-val">{products.length} Designs</div>
                <div className="metric-sub">100% Handcrafted Mulberry Silks</div>
              </div>
            </div>

            {/* Split: Live Studio Activity Feed + Quick Access Outfits */}
            <div className="admin-split-grid">
              
              {/* Real-time Activity Feed */}
              <div className="admin-card-panel">
                <div className="panel-title-row">
                  <div className="panel-title-group">
                    <Sparkles size={16} color="#C8A45D" />
                    <h3 className="panel-title">Real-Time Atelier Activity</h3>
                  </div>
                  <span className="live-status-tag">AUTO-SYNCING</span>
                </div>

                <div className="live-events-stream">
                  {liveStreamEvents.map((evt) => (
                    <div key={evt.id} className="live-event-item">
                      <div className={`event-dot-indicator ${evt.type}`}></div>
                      <div className="event-body">
                        <p className="event-text">{evt.text}</p>
                        <span className="event-time">{evt.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions & Recent Orders Preview */}
              <div className="admin-card-panel">
                <div className="panel-title-row">
                  <h3 className="panel-title">Quick Studio Tasks</h3>
                  <button 
                    className="add-outfit-mini-btn gold-gradient-bg tap-scale"
                    onClick={() => setShowAddOutfitModal(true)}
                  >
                    <Plus size={14} /> Add New Outfit
                  </button>
                </div>

                <div className="quick-orders-preview">
                  <h4 className="preview-heading">Recent Orders in Production:</h4>
                  {orders.slice(0, 3).map((o, idx) => (
                    <div key={idx} className="order-preview-row">
                      <div className="order-row-left">
                        <strong>{o.orderNumber || `JA-ORD-0${idx+1}`}</strong>
                        <span>{o.customerName || (o.items && o.items[0]?.name)}</span>
                      </div>
                      <div className="order-row-right">
                        <span className={`status-pill ${o.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                          {o.status || 'In Production'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="studio-contact-quick-box">
                  <p><strong>Site Owner Direct Concierge:</strong> +234 801 234 5678</p>
                  <span>Orders placed by clients automatically trigger real-time updates here.</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ===================================================================
            TAB 2: CLIENT ORDERS (REAL-TIME STORE ORDERS)
            =================================================================== */}
        {activeTab === 'orders' && (
          <div className="admin-tab-content animate-card-fade">
            <div className="tab-header-banner">
              <div>
                <h2>Real-Time Client Orders</h2>
                <p>Manage cutting, sewing, gift box packaging, and shipping status.</p>
              </div>
            </div>

            <div className="orders-table-wrapper">
              {orders.length === 0 ? (
                <div className="admin-empty-state">
                  <ShoppingBag size={48} color="#C8A45D" />
                  <h4>No Client Orders Yet</h4>
                  <p>When a client places an order on the storefront, it will instantly appear here.</p>
                </div>
              ) : (
                <div className="admin-orders-grid">
                  {orders.map((ord, idx) => {
                    const totalConverted = (ord.totalUSD * curr.rate).toLocaleString(undefined, { maximumFractionDigits: 0 });

                    return (
                      <div key={idx} className="admin-order-card">
                        
                        <div className="admin-order-header">
                          <div>
                            <span className="order-card-ref">{ord.orderNumber || `JA-00${idx+1}`}</span>
                            <span className="order-card-date">{ord.date || 'Recent'}</span>
                          </div>
                          
                          <select 
                            value={ord.status || 'In Production'}
                            onChange={(e) => onUpdateOrderStatus(idx, e.target.value)}
                            className="order-status-select"
                          >
                            <option value="Queued for Cutting">Queued for Cutting</option>
                            <option value="In Production">In Production</option>
                            <option value="Hand-Embroidering">Hand-Embroidering</option>
                            <option value="Ready in Gift Box">Ready in Gift Box</option>
                            <option value="Shipped / Out for Delivery">Shipped / Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>

                        <div className="admin-order-client-info">
                          <p><strong>Customer:</strong> {ord.customerName || 'Lady Vivienne'}</p>
                          <p><strong>Email:</strong> {ord.email || 'client@vip.com'}</p>
                          <p><strong>Phone:</strong> {ord.phone || '+234 801 234 5678'}</p>
                          <p><strong>Address:</strong> {ord.address || 'Victoria Island, Lagos'}</p>
                        </div>

                        <div className="admin-order-items">
                          <h5>Items Ordered:</h5>
                          {ord.items && ord.items.map((it, i) => (
                            <div key={i} className="admin-order-item-line">
                              <span>{it.name} ({it.selectedColor?.name || 'Silk'}, {it.selectedSize}) x {it.quantity || 1}</span>
                              <span className="item-price">{curr.symbol}{((it.priceUSD * (it.quantity||1)) * curr.rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                          ))}
                        </div>

                        <div className="admin-order-footer">
                          <span className="order-total-label">Total Amount:</span>
                          <span className="order-total-amount">{curr.symbol}{totalConverted}</span>
                        </div>

                        {/* WhatsApp Client Quick Button */}
                        <div className="admin-order-actions-row">
                          <a 
                            href={`https://wa.me/${ord.phone?.replace(/[^0-9]/g, '') || '2348012345678'}?text=Hello%20${encodeURIComponent(ord.customerName || 'Ma')}%2C%20this%20is%20JHAY%20ATELIER%20regarding%20your%20dress%20order%20${ord.orderNumber}.`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="whatsapp-msg-btn tap-scale"
                          >
                            <Phone size={13} /> Chat on WhatsApp
                          </a>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ===================================================================
            TAB 3: BESPOKE FITTINGS & VIDEO CALLS
            =================================================================== */}
        {activeTab === 'fittings' && (() => {
          // Filter bookings
          const filteredBookings = bookings.filter((b) => {
            const matchesStatus = fittingsStatusFilter === 'all' || (b.status || 'Confirmed').toLowerCase() === fittingsStatusFilter.toLowerCase();
            const q = fittingsSearch.toLowerCase().trim();
            const matchesSearch = !q ||
              (b.name && b.name.toLowerCase().includes(q)) ||
              (b.email && b.email.toLowerCase().includes(q)) ||
              (b.phone && b.phone.includes(q)) ||
              (b.bookingRef && b.bookingRef.toLowerCase().includes(q)) ||
              (b.service && b.service.toLowerCase().includes(q)) ||
              (b.location && b.location.toLowerCase().includes(q)) ||
              (b.occasion && b.occasion.toLowerCase().includes(q));
            return matchesStatus && matchesSearch;
          });

          const handleSaveEmail = (e) => {
            e.preventDefault();
            if (tempAdminEmail && tempAdminEmail.includes('@')) {
              setAdminEmail(tempAdminEmail);
              setAdminEmailState(tempAdminEmail.trim());
              setIsEditingAdminEmail(false);
            }
          };

          const handleTestNotification = async () => {
            setEmailTestStatus('sending');
            const res = await sendTestEmailToAdmin(adminEmail);
            if (res.success) {
              setEmailTestStatus('success');
              setEmailTestMessage(`✓ Verified! Notification successfully dispatched to ${adminEmail}`);
              setTimeout(() => setEmailTestStatus('idle'), 6000);
            } else {
              setEmailTestStatus('error');
              setEmailTestMessage(`Warning: ${res.error || 'Check internet connection'}`);
              setTimeout(() => setEmailTestStatus('idle'), 6000);
            }
          };

          const handleResendToEmail = async (b) => {
            setResendingBookingRef(b.bookingRef || b._id);
            const res = await sendBookingToAdmin(b);
            if (res.success) {
              alert(`✓ Booking ${b.bookingRef} successfully dispatched to ${adminEmail}`);
            } else {
              alert(`Notice: ${res.error || 'Booking was recorded, but email server returned a warning.'}`);
            }
            setResendingBookingRef(null);
          };

          const handleExportCSV = () => {
            if (bookings.length === 0) {
              alert("No bookings to export yet.");
              return;
            }
            const headers = ["Reference", "Client Name", "Phone", "Email", "Service", "Location", "Date", "Time", "Occasion", "Status", "Notes"];
            const rows = bookings.map(b => [
              `"${b.bookingRef || ''}"`,
              `"${(b.name || '').replace(/"/g, '""')}"`,
              `"${(b.phone || '').replace(/"/g, '""')}"`,
              `"${(b.email || '').replace(/"/g, '""')}"`,
              `"${(b.service || '').replace(/"/g, '""')}"`,
              `"${(b.location || '').replace(/"/g, '""')}"`,
              `"${b.date || ''}"`,
              `"${b.time || ''}"`,
              `"${(b.occasion || '').replace(/"/g, '""')}"`,
              `"${b.status || 'Confirmed'}"`,
              `"${(b.notes || '').replace(/"/g, '""')}"`
            ]);
            const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `JHAY_ATELIER_Fittings_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          };

          return (
            <div className="admin-tab-content animate-card-fade">
              
              {/* Header Banner */}
              <div className="tab-header-banner">
                <div>
                  <h2>Bespoke Appointments &amp; Fitting Schedules</h2>
                  <p>All clients who booked private fittings in Uyo, Lagos, or online video consultations.</p>
                </div>
                <div className="tab-banner-actions">
                  <button 
                    className="admin-secondary-btn tap-scale"
                    onClick={handleExportCSV}
                    title="Export appointment list as CSV"
                  >
                    <Download size={14} />
                    <span>Export Schedule (CSV)</span>
                  </button>
                </div>
              </div>

              {/* ── AUTOMATIC ADMIN EMAIL NOTIFICATION STATUS CALLOUT ── */}
              <div className="admin-email-sync-card">
                <div className="email-sync-header">
                  <div className="email-sync-indicator">
                    <span className="live-pulsating-dot"></span>
                    <Mail size={16} color="#C8A45D" />
                    <h4>Admin Booking Auto-Dispatch</h4>
                  </div>
                  <div className="email-sync-badge">
                    <CheckCircle2 size={13} color="#22c55e" />
                    <span>ACTIVE ON SITE</span>
                  </div>
                </div>

                <div className="email-sync-body">
                  <p className="email-sync-description">
                    Every time a client submits a bespoke fitting reservation, full customer measurements, date, and contact details are <strong>automatically delivered to your admin email</strong> and synchronized here in real time.
                  </p>

                  <div className="email-config-row">
                    <div className="email-current-display">
                      <span className="label">Receiving Inbox:</span>
                      {isEditingAdminEmail ? (
                        <form onSubmit={handleSaveEmail} className="email-edit-inline-form">
                          <input 
                            type="email"
                            required
                            value={tempAdminEmail}
                            onChange={(e) => setTempAdminEmail(e.target.value)}
                            placeholder="admin@jhayatelier.com"
                            className="email-edit-input"
                          />
                          <button type="submit" className="save-email-btn gold-gradient-bg tap-scale">Save</button>
                          <button type="button" onClick={() => setIsEditingAdminEmail(false)} className="cancel-email-btn tap-scale">Cancel</button>
                        </form>
                      ) : (
                        <div className="email-value-group">
                          <strong className="email-address-text">{adminEmail}</strong>
                          <button 
                            className="change-email-link-btn tap-scale"
                            onClick={() => {
                              setTempAdminEmail(adminEmail);
                              setIsEditingAdminEmail(true);
                            }}
                          >
                            <Edit3 size={12} /> Change
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="email-test-actions">
                      <button
                        className="test-email-dispatch-btn tap-scale"
                        onClick={handleTestNotification}
                        disabled={emailTestStatus === 'sending'}
                      >
                        <Send size={13} />
                        <span>{emailTestStatus === 'sending' ? 'Sending Test...' : 'Send Test Notification'}</span>
                      </button>
                    </div>
                  </div>

                  {emailTestMessage && (
                    <div className={`email-test-toast ${emailTestStatus}`}>
                      {emailTestMessage}
                    </div>
                  )}
                </div>
              </div>

              {/* ── SEARCH & FILTER CONTROLS ── */}
              <div className="fittings-controls-bar">
                <div className="fittings-search-wrap">
                  <Search size={15} />
                  <input 
                    type="text"
                    placeholder="Search by client name, phone, email, reference, or dress..."
                    value={fittingsSearch}
                    onChange={(e) => setFittingsSearch(e.target.value)}
                  />
                  {fittingsSearch && (
                    <button className="clear-search-btn" onClick={() => setFittingsSearch('')}>&times;</button>
                  )}
                </div>

                <div className="fittings-filter-pills">
                  {['all', 'Confirmed', 'Measurements Taken', 'Toile Prepared', 'Completed', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      className={`fittings-filter-pill${fittingsStatusFilter === st ? ' active' : ''}`}
                      onClick={() => setFittingsStatusFilter(st)}
                    >
                      {st === 'all' ? `All (${bookings.length})` : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── FITTINGS LIST GRID ── */}
              <div className="fittings-list-container">
                {filteredBookings.length === 0 ? (
                  <div className="admin-empty-state">
                    <Calendar size={48} color="#C8A45D" />
                    <h4>No Appointments Found</h4>
                    <p>
                      {bookings.length === 0 
                        ? 'When clients book a fitting on the site, their reservation details will appear here automatically.'
                        : 'No appointments match the selected search or filter.'}
                    </p>
                  </div>
                ) : (
                  <div className="fittings-grid">
                    {filteredBookings.map((b, idx) => (
                      <div key={b._id || b.bookingRef || idx} className="fitting-card">
                        
                        <div className="fitting-header">
                          <div className="fitting-ref-group">
                            <span className="fitting-ref">{b.bookingRef || `JA-VIP-${idx+1}`}</span>
                            <span className="fitting-date-badge">
                              <Calendar size={12} /> {b.date} at {b.time}
                            </span>
                          </div>

                          <select 
                            value={b.status || 'Confirmed'}
                            onChange={(e) => onUpdateBookingStatus(idx, e.target.value)}
                            className="fitting-status-select"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Measurements Taken">Measurements Taken</option>
                            <option value="Toile Prepared">Toile Prepared</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div className="fitting-body">
                          <h4 className="fitting-client-name">{b.name}</h4>
                          <div className="fitting-meta-row">
                            <span><MapPin size={13} /> {b.location}</span>
                            <span><Sparkles size={13} /> {b.service}</span>
                          </div>

                          {b.occasion && (
                            <div className="fitting-occasion-tag">
                              <strong>Occasion / Event:</strong> {b.occasion}
                            </div>
                          )}

                          {b.notes && (
                            <div className="fitting-notes-box">
                              <strong>Client Notes / Measurements:</strong>
                              <p>&ldquo;{b.notes}&rdquo;</p>
                            </div>
                          )}

                          <div className="fitting-contacts">
                            <div><strong>Phone:</strong> {b.phone}</div>
                            <div><strong>Email:</strong> {b.email}</div>
                          </div>

                        </div>

                        {/* WhatsApp / Call / Resend Email Actions */}
                        <div className="fitting-actions-row">
                          <a 
                            href={`https://wa.me/${b.phone?.replace(/[^0-9]/g, '') || '2348012345678'}?text=Hello%20${encodeURIComponent(b.name)}%2C%20this%20is%20JHAY%20ATELIER.%20We%20have%20received%20your%20fitting%20reservation%20(${b.bookingRef})%20for%20${b.date}%20at%20${b.time}.`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="whatsapp-msg-btn tap-scale"
                            title="Open WhatsApp chat with client"
                          >
                            <Phone size={13} /> WhatsApp
                          </a>

                          <a 
                            href={`tel:${b.phone}`}
                            className="call-client-btn tap-scale"
                            title="Call client phone"
                          >
                            Call
                          </a>

                          <a
                            href={`mailto:${b.email}?subject=Your%20JHAY%20ATELIER%20Bespoke%20Fitting%20Reservation%20(${b.bookingRef})&body=Dear%20${encodeURIComponent(b.name)}%2C%0A%0AWe%20are%20delighted%20to%20confirm%20your%20appointment%20with%20JHAY%20ATELIER%20on%20${b.date}%20at%20${b.time}%20at%20${encodeURIComponent(b.location)}.%0A%0AWarm%20regards%2C%0AJHAY%20ATELIER%20Couture`}
                            className="email-client-btn tap-scale"
                            title="Email client directly"
                          >
                            <Mail size={13} /> Email Client
                          </a>

                          <button
                            className="resend-email-btn tap-scale"
                            onClick={() => handleResendToEmail(b)}
                            disabled={resendingBookingRef === (b.bookingRef || b._id)}
                            title={`Resend full details to ${adminEmail}`}
                          >
                            <Send size={12} />
                            <span>{resendingBookingRef === (b.bookingRef || b._id) ? 'Sending...' : 'Email to Admin'}</span>
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          );
        })()}

        {/* ===================================================================
            TAB 4: OUTFITS CATALOG & PRICING MANAGER
            =================================================================== */}
        {activeTab === 'catalog' && (
          <div className="admin-tab-content animate-card-fade">
            
            <div className="catalog-header-bar">
              <div>
                <h2>Women’s Outfits &amp; Pricing Manager</h2>
                <p>Add new designs, adjust prices, or update descriptions.</p>
              </div>
              <button 
                className="add-outfit-btn gold-gradient-bg tap-scale"
                onClick={() => setShowAddOutfitModal(true)}
              >
                <Plus size={16} /> Add New Dress / Outfit
              </button>
            </div>

            <div className="admin-catalog-grid">
              {products.map((prod) => {
                const convertedPrice = (prod.priceUSD * curr.rate).toLocaleString(undefined, { maximumFractionDigits: 0 });

                return (
                  <div key={prod.id} className="admin-catalog-card">
                    <div className="catalog-card-media">
                      <img src={prod.image} alt={prod.name} />
                      <span className="catalog-badge">{prod.badge || 'Ready to Wear'}</span>
                    </div>

                    <div className="catalog-card-details">
                      <h4 className="catalog-item-title">{prod.name}</h4>
                      <p className="catalog-item-tagline">{prod.tagline}</p>
                      
                      <div className="catalog-price-edit-row">
                        <label>Price in USD ($):</label>
                        <input 
                          type="number" 
                          defaultValue={prod.priceUSD} 
                          onBlur={(e) => onUpdateProductPrice(prod.id, Number(e.target.value))}
                          className="price-edit-input"
                        />
                        <span className="converted-preview">≈ {curr.symbol}{convertedPrice}</span>
                      </div>

                      <div className="catalog-bottom-actions">
                        <button 
                          type="button"
                          className="edit-outfit-btn tap-scale"
                          onClick={() => setEditingProduct({ ...prod })}
                        >
                          <Edit3 size={14} /> Edit Outfit
                        </button>
                        <button 
                          className="delete-outfit-btn tap-scale"
                          onClick={() => {
                            if (window.confirm(`Delete "${prod.name}" from the store catalog?`)) {
                              onDeleteProduct(prod.id);
                            }
                          }}
                        >
                          <Trash2 size={14} /> Remove Outfit
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ===================================================================
            TAB 5: STUDIO SETTINGS & ANNOUNCEMENT BAR
            =================================================================== */}
        {activeTab === 'settings' && (
          <div className="admin-tab-content animate-card-fade">
            <div className="tab-header-banner">
              <div>
                <h2>Studio &amp; Brand Settings</h2>
                <p>Customize your storefront announcement bar and concierge contact details.</p>
              </div>
            </div>

            <div className="settings-cards-grid">
              <div className="settings-panel">
                <h3>Studio Contact Numbers</h3>
                <div className="form-group">
                  <label>WhatsApp &amp; Phone Line</label>
                  <input type="text" defaultValue={BRAND_INFO.contact.phone} />
                </div>
                <div className="form-group">
                  <label>Concierge Email</label>
                  <input type="email" defaultValue={BRAND_INFO.contact.email} />
                </div>
                <div className="form-group">
                  <label>Lagos Studio Address</label>
                  <input type="text" defaultValue={BRAND_INFO.contact.address} />
                </div>
              </div>

              <div className="settings-panel">
                <h3>Storefront Announcement Bar</h3>
                <div className="form-group">
                  <label>Top Announcement Message</label>
                  <input 
                    type="text" 
                    defaultValue="Complimentary Worldwide Shipping on Orders Over $1,500 • Lagos Studio & Video Fittings" 
                  />
                </div>
                <p className="settings-tip">
                  This banner appears at the very top of the mobile screen for every client visiting the store.
                </p>
                <button className="gold-gradient-bg save-settings-btn tap-scale">
                  Save Studio Settings
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Modal: Add New Outfit */}
      {showAddOutfitModal && (
        <div className="modal-backdrop" onClick={() => setShowAddOutfitModal(false)}>
          <div className="add-outfit-dialog animate-card-fade" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>Add New Women's Outfit to Store</h3>
              <button onClick={() => setShowAddOutfitModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleCreateOutfit} className="add-outfit-form">
              <div className="form-group">
                <label>Outfit Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. The Sapphire Silk Gala Dress"
                  value={newOutfit.name}
                  onChange={(e) => setNewOutfit({ ...newOutfit, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select 
                    value={newOutfit.category}
                    onChange={(e) => setNewOutfit({ ...newOutfit, category: e.target.value })}
                  >
                    <option value="gowns">Evening &amp; Gala Dresses</option>
                    <option value="suits">Women's Tailored Suits</option>
                    <option value="cocktail">Cocktail &amp; Dinner Dresses</option>
                    <option value="bridal">Bridal &amp; Wedding Guest</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price in USD ($) *</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="2200"
                    value={newOutfit.priceUSD}
                    onChange={(e) => setNewOutfit({ ...newOutfit, priceUSD: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Short Tagline *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Asymmetric Draped Silk Dress with Gold Waistline"
                  value={newOutfit.tagline}
                  onChange={(e) => setNewOutfit({ ...newOutfit, tagline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Select Photo Asset</label>
                <select 
                  value={newOutfit.image}
                  onChange={(e) => setNewOutfit({ ...newOutfit, image: e.target.value })}
                >
                  <option value="/images/hero-gown.jpg">The Champagne Silk Cape Dress</option>
                  <option value="/images/emerald-gown.jpg">The Emerald Velvet Evening Dress</option>
                  <option value="/images/noir-gown.jpg">The Noir Tuxedo Suit Dress</option>
                  <option value="/images/atelier-craft.jpg">The Archival Gold-Embroidered Gown</option>
                </select>
              </div>

              <div className="form-group">
                <label>Or Custom Image URL</label>
                <input 
                  type="text" 
                  placeholder="https://... or /images/custom.jpg"
                  value={newOutfit.image}
                  onChange={(e) => setNewOutfit({ ...newOutfit, image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Outfit Description</label>
                <textarea 
                  rows="3" 
                  placeholder="Describe the fabric, fit, and occasions for this outfit..."
                  value={newOutfit.description}
                  onChange={(e) => setNewOutfit({ ...newOutfit, description: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="gold-gradient-bg publish-outfit-btn tap-scale">
                Publish to Storefront
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Existing Outfit */}
      {editingProduct && (
        <div className="modal-backdrop" onClick={() => setEditingProduct(null)}>
          <div className="add-outfit-dialog animate-card-fade" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>Edit Outfit Details</h3>
              <button onClick={() => setEditingProduct(null)}>&times;</button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="add-outfit-form">
              <div className="form-group">
                <label>Outfit Name *</label>
                <input 
                  type="text" 
                  required 
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select 
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  >
                    <option value="gowns">Evening &amp; Gala Dresses</option>
                    <option value="suits">Women's Tailored Suits</option>
                    <option value="cocktail">Cocktail &amp; Dinner Dresses</option>
                    <option value="bridal">Bridal &amp; Wedding Guest</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price in USD ($) *</label>
                  <input 
                    type="number" 
                    required 
                    value={editingProduct.priceUSD}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceUSD: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Badge / Ribbon</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Best Seller, Exclusive, New Arrival"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Preset Photo Asset</label>
                  <select 
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  >
                    <option value="/images/hero-gown.jpg">The Champagne Silk Cape Dress</option>
                    <option value="/images/emerald-gown.jpg">The Emerald Velvet Evening Dress</option>
                    <option value="/images/noir-gown.jpg">The Noir Tuxedo Suit Dress</option>
                    <option value="/images/atelier-craft.jpg">The Archival Gold-Embroidered Gown</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Image URL (or enter link to image)</label>
                <input 
                  type="text" 
                  placeholder="https://... or /images/..."
                  value={editingProduct.image || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Short Tagline *</label>
                <input 
                  type="text" 
                  value={editingProduct.tagline || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Outfit Description</label>
                <textarea 
                  rows="3" 
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="submit" className="gold-gradient-bg publish-outfit-btn tap-scale" style={{ flex: 1 }}>
                  Save Outfit Changes
                </button>
                <button 
                  type="button" 
                  onClick={() => setEditingProduct(null)} 
                  className="tap-scale"
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#ccc',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
