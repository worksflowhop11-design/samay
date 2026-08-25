import React, { useState } from 'react';
import { TopPromoBar } from './components/TopPromoBar';
import { MainHeader } from './components/MainHeader';
import { SecondaryNav } from './components/SecondaryNav';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';
import { HomepageHeroGrid } from './components/HomepageHeroGrid';
import { PromoBannersGrid } from './components/PromoBannersGrid';
import { ShopByCategoriesAndBestsellers } from './components/ShopByCategoriesAndBestsellers';
import { TrustFeatures } from './components/TrustFeatures';
import { ProductGrid } from './components/ProductGrid';
import { CategoryPage } from './components/CategoryPage';
import { AllCategoriesPage } from './components/AllCategoriesPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { LocationSelectorModal } from './components/LocationSelectorModal';
import { PrescriptionUploadModal } from './components/PrescriptionUploadModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { OffersModal } from './components/OffersModal';
import { SupportModal } from './components/SupportModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { DEFAULT_LOCATION } from './services/postalLookup';
import { Product, CartItem, LocationData, Order, Prescription, UserProfile } from './types';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'all-categories' | 'product-detail'>('home');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('medicines');
  const [activeSubCategory, setActiveSubCategory] = useState<string | undefined>(undefined);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Global App States
  const [currentLocation, setCurrentLocation] = useState<LocationData>(DEFAULT_LOCATION);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Cart & Wishlist State
  const [cart, setCart] = useState<Record<string, number>>({
    'med-1': 1, // Pre-load 1 Paracetamol 650
    'nut-1': 1  // Pre-load 1 Multivitamin
  });
  const [wishlistIds, setWishlistIds] = useState<string[]>(['dev-1', 'pc-1']);

  // User Profile
  const [user, setUser] = useState<UserProfile>({
    name: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul.sharma@example.com',
    coins: 150,
    isLoggedIn: true,
    savedAddresses: [
      {
        id: 'addr-1',
        fullName: 'Rahul Sharma',
        phoneNumber: '9876543210',
        pincode: '560001',
        locality: 'MG Road',
        addressLine: 'Flat 402, Green Meadows Apartment, Main Road',
        city: 'Bangalore',
        state: 'Karnataka',
        addressType: 'Home'
      }
    ]
  });

  // Uploaded Prescriptions State
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 'RX-748921',
      fileName: 'Dr_Sharma_Prescription_Aug2026.pdf',
      patientName: 'Rahul Sharma',
      doctorName: 'Dr. Arvind Gupta (MD, Reg #54210)',
      uploadDate: '15 Aug 2026',
      status: 'Verified',
      orderOption: 'call_confirm',
      notes: 'Standard 30-day course'
    }
  ]);

  // Order History State
  const [orders, setOrders] = useState<Order[]>([
    {
      orderId: 'MC-849201',
      date: '16 Aug 2026, 09:30 AM',
      items: [
        { product: PRODUCTS[0], quantity: 2 },
        { product: PRODUCTS[3], quantity: 1 }
      ],
      itemCount: 3,
      subtotal: 1980,
      discount: 480,
      couponDiscount: 150,
      deliveryFee: 0,
      totalAmount: 1830,
      coinsEarned: 90,
      prescriptionAttached: true,
      prescriptionId: 'RX-748921',
      shippingAddress: {
        id: 'addr-1',
        fullName: 'Rahul Sharma',
        phoneNumber: '9876543210',
        pincode: '560001',
        locality: 'MG Road',
        addressLine: 'Flat 402, Green Meadows Apartment, Main Road',
        city: 'Bangalore',
        state: 'Karnataka',
        addressType: 'Home'
      },
      paymentMethod: 'UPI (Google Pay)',
      paymentStatus: 'Paid',
      orderStatus: 'Processing',
      estimatedDeliveryDate: 'Today in 2 Hours',
      deliverySlot: 'Express 2-Hour Delivery'
    }
  ]);

  // Checkout metadata
  const [checkoutCoupon, setCheckoutCoupon] = useState<string | null>(null);
  const [checkoutCoins, setCheckoutCoins] = useState<number>(0);

  // Modal Visibility States
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState(false);
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<Product | null>(null);

  // Navigation Handlers
  const handleNavigateHome = () => {
    setCurrentView('home');
    setActiveProduct(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCategory = (categoryId: string, subCategory?: string) => {
    if (categoryId === 'all') {
      setCurrentView('all-categories');
    } else {
      setActiveCategoryId(categoryId);
      setActiveSubCategory(subCategory);
      setCurrentView('category');
    }
    setActiveProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAllCategories = () => {
    setCurrentView('all-categories');
    setActiveProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetail = (product: Product) => {
    setActiveProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + quantity
    }));
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    setCart(prev => {
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = newQty;
      }
      return updated;
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    handleAddToCart(product, quantity);
    setIsCheckoutModalOpen(true);
  };

  // Convert cart object to CartItem array
  const cartItemList: CartItem[] = Object.entries(cart)
    .map(([productId, quantity]) => {
      const product = PRODUCTS.find(p => p.id === productId);
      return product ? { product, quantity } : null;
    })
    .filter((item): item is CartItem => item !== null);

  const cartTotalItemCount = cartItemList.reduce((acc, i) => acc + i.quantity, 0);

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev =>
      prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]
    );
  };

  // Search handler
  const handleSearch = (query: string, categoryId?: string) => {
    setSearchQuery(query);
    if (categoryId && categoryId !== 'all') {
      setActiveCategoryId(categoryId);
      setActiveSubCategory(undefined);
      setCurrentView('category');
    } else {
      if (currentView !== 'home' && currentView !== 'category') {
        setCurrentView('home');
      }
    }
    setTimeout(() => {
      const element = document.getElementById('products-catalog-section') || document.getElementById('category-products-grid');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Prescription uploaded
  const handlePrescriptionUploaded = (newRx: Prescription) => {
    setPrescriptions(prev => [newRx, ...prev]);
  };

  // Order placed
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCart({}); // Empty cart after successful order
    setUser(prev => ({
      ...prev,
      coins: prev.coins + newOrder.coinsEarned
    }));
  };

  const handleProceedToCheckout = (coupon: string | null, coins: number) => {
    setCheckoutCoupon(coupon);
    setCheckoutCoins(coins);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  // Related products for PDP
  const getRelatedProducts = (prod: Product) => {
    return PRODUCTS.filter(p => p.id !== prod.id && (p.category === prod.category || p.subCategory === prod.subCategory)).slice(0, 4);
  };

  const getFrequentlyBoughtTogether = (prod: Product) => {
    return PRODUCTS.filter(p => p.id !== prod.id).slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Top Promotional Bar */}
      <TopPromoBar
        onOpenAppModal={() => setIsAppModalOpen(true)}
        onOpenTrackingModal={() => setIsTrackOrderModalOpen(true)}
        onOpenSupportModal={() => setIsSupportModalOpen(true)}
      />

      {/* 2. Main Header (Sticky) */}
      <MainHeader
        currentLocation={currentLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        onOpenOffersModal={() => setIsOffersModalOpen(true)}
        onOpenCartDrawer={() => setIsCartOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        cartCount={cartTotalItemCount}
        allProducts={PRODUCTS}
        onSelectProduct={handleOpenProductDetail}
        onSearchSubmit={handleSearch}
        user={user}
        onSelectCategory={handleNavigateCategory}
        onNavigateAllCategories={handleNavigateAllCategories}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* 3. Secondary Category Navigation with Mega Dropdowns */}
      <SecondaryNav
        activeCategory={activeCategoryId}
        onSelectCategory={handleNavigateCategory}
        onNavigateAllCategories={handleNavigateAllCategories}
        onOpenOffersModal={() => setIsOffersModalOpen(true)}
      />

      {/* Dynamic View Router */}
      <main className="flex-1 pb-12">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <>
            {/* 1. Hero Grid: Left Sidebar Categories + Center Carousel + Right Quick Actions */}
            <HomepageHeroGrid
              onSelectCategory={handleNavigateCategory}
              onNavigateAllCategories={handleNavigateAllCategories}
              onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
              onOpenTrackingModal={() => setIsTrackOrderModalOpen(true)}
              onExploreProducts={() => {
                const el = document.getElementById('products-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Promotional 3-Banner Row + Right Sale Card */}
            <PromoBannersGrid
              onSelectCategory={handleNavigateCategory}
              onOpenOffersModal={() => setIsOffersModalOpen(true)}
              onExploreProducts={() => {
                const el = document.getElementById('products-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 3. Shop by Categories 9-Card Grid + Right Bestsellers Widget */}
            <ShopByCategoriesAndBestsellers
              onSelectCategory={handleNavigateCategory}
              onSelectProduct={handleOpenProductDetail}
              onAddToCart={handleAddToCart}
              cartItems={cart}
              onExploreBestsellers={() => {
                const el = document.getElementById('products-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 4. Trust & Reliability 5-Feature Service Strip */}
            <TrustFeatures />

            {/* 5. Complete Product Catalog Section with Live Filters & Search */}
            <ProductGrid
              products={PRODUCTS}
              selectedCategory={activeCategoryId}
              onSelectCategory={handleNavigateCategory}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              cartItems={cart}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onBuyNow={handleBuyNow}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={handleOpenProductDetail}
            />
          </>
        )}

        {/* VIEW 2: DEDICATED CATEGORY PAGE */}
        {currentView === 'category' && (
          <CategoryPage
            categoryId={activeCategoryId}
            subCategoryFilter={activeSubCategory}
            onSelectCategory={handleNavigateCategory}
            onNavigateHome={handleNavigateHome}
            onNavigateAllCategories={handleNavigateAllCategories}
            onSelectProduct={handleOpenProductDetail}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onBuyNow={handleBuyNow}
            cartItems={cart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            allProducts={PRODUCTS}
            currentLocation={currentLocation}
          />
        )}

        {/* VIEW 3: ALL CATEGORIES DIRECTORY */}
        {currentView === 'all-categories' && (
          <AllCategoriesPage
            onSelectCategory={handleNavigateCategory}
            onNavigateHome={handleNavigateHome}
          />
        )}

        {/* VIEW 4: FULL PRODUCT DETAIL PAGE (PDP) */}
        {currentView === 'product-detail' && activeProduct && (
          <ProductDetailPage
            product={activeProduct}
            onNavigateHome={handleNavigateHome}
            onNavigateCategory={handleNavigateCategory}
            onSelectProduct={handleOpenProductDetail}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onBuyNow={handleBuyNow}
            quantityInCart={cart[activeProduct.id] || 0}
            isWishlisted={wishlistIds.includes(activeProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            currentLocation={currentLocation}
            relatedProducts={getRelatedProducts(activeProduct)}
            frequentlyBoughtTogether={getFrequentlyBoughtTogether(activeProduct)}
          />
        )}

      </main>

      {/* 8. Comprehensive Pharmacy Footer */}
      <Footer
        onSelectCategory={handleNavigateCategory}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        onOpenTrackOrderModal={() => setIsTrackOrderModalOpen(true)}
        onOpenSupportModal={() => setIsSupportModalOpen(true)}
        onOpenOffersModal={() => setIsOffersModalOpen(true)}
        onOpenAppModal={() => setIsAppModalOpen(true)}
      />

      {/* MODALS & DRAWERS */}
      
      {/* Location Selector (India Post API live lookup) */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onLocationSelect={(loc) => setCurrentLocation(loc)}
      />

      {/* Prescription Upload & Verification Modal */}
      <PrescriptionUploadModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        onPrescriptionUploaded={handlePrescriptionUploaded}
      />

      {/* Quick View Product Modal */}
      <ProductDetailModal
        product={selectedProductForQuickView}
        isOpen={selectedProductForQuickView !== null}
        onClose={() => setSelectedProductForQuickView(null)}
        quantityInCart={selectedProductForQuickView ? cart[selectedProductForQuickView.id] || 0 : 0}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProductForQuickView ? wishlistIds.includes(selectedProductForQuickView.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenPrescriptionModal={() => {
          setSelectedProductForQuickView(null);
          setIsPrescriptionModalOpen(true);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItemList}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currentLocation={currentLocation}
        user={user}
        onProceedToCheckout={handleProceedToCheckout}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cartItemList}
        currentLocation={currentLocation}
        appliedCoupon={checkoutCoupon}
        coinsUsed={checkoutCoins}
        user={user}
        uploadedPrescriptions={prescriptions}
        onOrderPlaced={handleOrderPlaced}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        onLoginSuccess={(updated) => setUser(updated)}
        onLogout={() => setUser({ name: 'Guest User', phone: '', email: '', coins: 0, isLoggedIn: false, savedAddresses: [] })}
      />

      {/* Track Order Modal */}
      <OrderTrackingModal
        isOpen={isTrackOrderModalOpen}
        onClose={() => setIsTrackOrderModalOpen(false)}
        orders={orders}
      />

      {/* Offers & Coupons Modal */}
      <OffersModal
        isOpen={isOffersModalOpen}
        onClose={() => setIsOffersModalOpen(false)}
        onApplyCoupon={(code) => {
          setCheckoutCoupon(code);
          setIsCartOpen(true);
        }}
      />

      {/* 24/7 Support Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />

      {/* Download Mobile App Modal */}
      <DownloadAppModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentLocation={currentLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        onOpenOffersModal={() => setIsOffersModalOpen(true)}
        onOpenTrackingModal={() => setIsTrackOrderModalOpen(true)}
        onOpenSupportModal={() => setIsSupportModalOpen(true)}
        onOpenAppModal={() => setIsAppModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSelectCategory={handleNavigateCategory}
        onNavigateAllCategories={handleNavigateAllCategories}
        user={user}
      />

    </div>
  );
}
