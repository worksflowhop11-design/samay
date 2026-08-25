import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  ShoppingCart, 
  User, 
  Tag, 
  FileText, 
  Menu, 
  X,
  Pill,
  Apple,
  Activity,
  Sparkles,
  HeartHandshake,
  Leaf,
  Stethoscope,
  Droplets,
  ShieldAlert,
  Smile,
  Heart,
  ShieldCheck,
  ArrowRight,
  Layers,
  Check
} from 'lucide-react';
import { LocationData, Product, UserProfile } from '../types';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';

interface MainHeaderProps {
  currentLocation: LocationData;
  cartCount: number;
  onOpenCartDrawer: () => void;
  onOpenLocationModal: () => void;
  onOpenPrescriptionModal: () => void;
  onOpenOffersModal: () => void;
  onOpenAuthModal: () => void;
  onSearchSubmit: (query: string, categoryId?: string) => void;
  onSelectCategory: (categoryId: string, subCategory?: string) => void;
  onNavigateAllCategories?: () => void;
  user: UserProfile;
  onSelectProduct: (product: Product) => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Pill: <Pill className="w-4 h-4" />,
  Apple: <Apple className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  HeartHandshake: <HeartHandshake className="w-4 h-4" />,
  Leaf: <Leaf className="w-4 h-4" />,
  Stethoscope: <Stethoscope className="w-4 h-4" />,
  Droplets: <Droplets className="w-4 h-4" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4" />,
  Smile: <Smile className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />
};

export const MainHeader: React.FC<MainHeaderProps> = ({
  currentLocation,
  cartCount,
  onOpenCartDrawer,
  onOpenLocationModal,
  onOpenPrescriptionModal,
  onOpenOffersModal,
  onOpenAuthModal,
  onSearchSubmit,
  onSelectCategory,
  onNavigateAllCategories,
  user,
  onSelectProduct,
  isMobileMenuOpen,
  onToggleMobileMenu
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [categoryFilterTerm, setCategoryFilterTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('medicines');

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Live autocompletion search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      const matchQuery = 
        p.name.toLowerCase().includes(query) ||
        p.genericName?.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.subCategory.toLowerCase().includes(query);

      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;

      return matchQuery && matchCategory;
    }).slice(0, 5);

    setSearchResults(filtered);
  }, [searchQuery, selectedCategory]);

  // Click outside listener for search & category dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchExecute = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim(), selectedCategory === 'all' ? undefined : selectedCategory);
      setIsSearchFocused(false);
    }
  };

  const handleSelectCategoryFromDropdown = (catId: string, subCategory?: string) => {
    setSelectedCategory(catId);
    setIsCategoryDropdownOpen(false);
    onSelectCategory(catId, subCategory);
  };

  const currentCategoryData = CATEGORIES.find(c => c.id === selectedCategory);
  const activeTabCategory = CATEGORIES.find(c => c.id === activeCategoryTab) || CATEGORIES[0];

  const filteredCategoriesList = CATEGORIES.filter(c => 
    c.name.toLowerCase().includes(categoryFilterTerm.toLowerCase()) ||
    c.subcategories.some(s => s.toLowerCase().includes(categoryFilterTerm.toLowerCase()))
  );

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 lg:gap-5">
          
          {/* Mobile Menu Hamburger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-slate-700 hover:bg-gray-100 rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* 1. BRAND LOGO */}
          <div 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onSelectCategory('all');
            }}
            className="flex items-center cursor-pointer select-none group shrink-0"
            id="header-brand-logo"
          >
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-2xl sm:text-[28px] font-black tracking-tight text-[#1B5E20] group-hover:text-[#144818] transition-colors">
                  MediCare
                </span>
                <span className="text-2xl sm:text-[28px] font-black text-[#ea580c] leading-none ml-0.5">
                  +
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 tracking-[0.24em] uppercase -mt-1 ml-0.5">
                PHARMACY
              </span>
            </div>
          </div>

          {/* 2. LOCATION SELECTOR PILL */}
          <button
            id="header-location-selector-pill"
            onClick={onOpenLocationModal}
            className="hidden sm:inline-flex items-center gap-2 bg-[#F5F5F5] hover:bg-gray-200/80 px-3 py-2 rounded-xl border border-gray-200/70 transition-all cursor-pointer group shrink-0"
            title="Click to change delivery PIN code"
          >
            <div className="w-6 h-6 rounded-full bg-[#1B5E20] flex items-center justify-center text-white shrink-0 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <div className="text-left flex items-center gap-1.5 text-xs sm:text-sm">
              <span className="font-extrabold text-[#ea580c]">
                {currentLocation.pincode}
              </span>
              <span className="font-semibold text-slate-800 truncate max-w-[100px] md:max-w-[130px]">
                {currentLocation.locality}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-y-0.5" />
          </button>

          {/* 3. CENTER SEARCH BAR WITH ALL CATEGORIES DROPDOWN */}
          <div ref={searchContainerRef} className="flex-1 max-w-2xl relative">
            <form 
              onSubmit={handleSearchExecute}
              className="flex items-center w-full border border-gray-300 hover:border-gray-400 focus-within:!border-[#ea580c] rounded-xl overflow-visible bg-white shadow-2xs transition-all relative"
            >
              {/* Category Dropdown inside Search Bar */}
              <div ref={categoryDropdownRef} className="relative hidden md:block border-r border-gray-200 shrink-0">
                <button
                  type="button"
                  id="search-category-filter-btn"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className={`px-3.5 py-2.5 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer rounded-l-xl ${
                    selectedCategory !== 'all' 
                      ? 'bg-emerald-50 text-[#1B5E20]' 
                      : 'text-slate-700 hover:text-[#1B5E20] bg-gray-50/70 hover:bg-gray-100/70'
                  }`}
                  title="Filter search by category"
                >
                  <span className="truncate max-w-[110px]">
                    {selectedCategory === 'all' ? 'All Categories' : currentCategoryData?.name || 'Categories'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180 text-[#1B5E20]' : ''}`} />
                </button>

                {/* Rich Category Mega-Menu Dropdown Panel */}
                {isCategoryDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* Header with Quick All Categories & Search */}
                    <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory('all');
                            setIsCategoryDropdownOpen(false);
                            onSelectCategory('all');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                            selectedCategory === 'all' 
                              ? 'bg-[#0b4d34] text-white' 
                              : 'bg-gray-100 text-slate-700 hover:bg-emerald-50 hover:text-[#0b4d34]'
                          }`}
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>All Categories</span>
                          {selectedCategory === 'all' && <Check className="w-3 h-3 ml-1" />}
                        </button>
                      </div>

                      {onNavigateAllCategories && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsCategoryDropdownOpen(false);
                            onNavigateAllCategories();
                          }}
                          className="text-[11px] font-bold text-[#0b4d34] hover:text-[#ea580c] flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>Full Directory</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Interactive 2-Column Mega Menu: Left Categories List / Right Subcategories Preview */}
                    <div className="grid grid-cols-12 gap-3 h-[320px]">
                      {/* Left: Category items list */}
                      <div className="col-span-5 border-r border-gray-100 pr-1.5 overflow-y-auto space-y-1 scrollbar-thin">
                        {CATEGORIES.map((cat) => {
                          const isSelected = selectedCategory === cat.id;
                          const isTabActive = activeCategoryTab === cat.id;

                          return (
                            <div
                              key={cat.id}
                              onMouseEnter={() => setActiveCategoryTab(cat.id)}
                              onClick={() => handleSelectCategoryFromDropdown(cat.id)}
                              className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer group ${
                                isSelected
                                  ? 'bg-emerald-50 text-[#0b4d34] font-bold'
                                  : isTabActive
                                  ? 'bg-gray-100/80 text-slate-900 font-semibold'
                                  : 'text-slate-700 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className={`shrink-0 ${isSelected || isTabActive ? 'text-[#0b4d34]' : 'text-slate-400 group-hover:text-[#0b4d34]'}`}>
                                  {iconMap[cat.iconName] || <Pill className="w-4 h-4" />}
                                </span>
                                <span className="truncate">{cat.name}</span>
                              </div>
                              <ChevronDown className="-rotate-90 w-3 h-3 text-slate-300 group-hover:text-slate-600 shrink-0" />
                            </div>
                          );
                        })}
                      </div>

                      {/* Right: Subcategories panel for the active hovered category */}
                      <div className="col-span-7 pl-1 flex flex-col justify-between overflow-y-auto">
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[#0b4d34]">
                                {iconMap[activeTabCategory.iconName] || <Pill className="w-4 h-4" />}
                              </span>
                              <h4 className="text-xs font-bold text-slate-900 truncate">
                                {activeTabCategory.name}
                              </h4>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {activeTabCategory.itemCount}+ products
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-500 mb-2.5 leading-snug">
                            {activeTabCategory.bannerHeadline}
                          </p>

                          <div className="space-y-1 max-h-[190px] overflow-y-auto pr-1">
                            {activeTabCategory.subcategories.map((sub) => (
                              <button
                                key={sub}
                                type="button"
                                onClick={() => handleSelectCategoryFromDropdown(activeTabCategory.id, sub)}
                                className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-[#0b4d34] hover:bg-emerald-50/70 transition-colors flex items-center justify-between group cursor-pointer"
                              >
                                <span className="truncate">{sub}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#0b4d34] transition-opacity shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Bottom CTA for active category */}
                        <div className="pt-2 mt-2 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => handleSelectCategoryFromDropdown(activeTabCategory.id)}
                            className="w-full bg-[#0b4d34] hover:bg-[#083a27] text-white text-xs font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <span>Browse All {activeTabCategory.name}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Reset Bar */}
                    {selectedCategory !== 'all' && (
                      <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-xs px-1">
                        <span className="text-slate-500">
                          Filtered by: <strong className="text-[#0b4d34]">{currentCategoryData?.name}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory('all');
                            setIsCategoryDropdownOpen(false);
                            onSelectCategory('all');
                          }}
                          className="text-[#ea580c] hover:underline font-bold text-[11px] cursor-pointer"
                        >
                          Clear Filter
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Text Input */}
              <div className="flex-1 flex items-center relative">
                <input
                  id="main-header-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder={
                    selectedCategory === 'all' 
                      ? "Search medicines, health products, brands..." 
                      : `Search in ${currentCategoryData?.name || 'Category'}...`
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none placeholder:text-gray-400"
                />

                {/* Selected Category Pill in search input (if selected) */}
                {selectedCategory !== 'all' && (
                  <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-[#0b4d34] text-[10px] font-bold px-2 py-0.5 rounded-md mr-1 shrink-0">
                    <span className="max-w-[80px] truncate">{currentCategoryData?.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory('all');
                      }}
                      className="hover:text-rose-600 cursor-pointer"
                      title="Clear category filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="p-1.5 text-gray-400 hover:text-gray-600 mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Orange Search Button */}
              <button
                type="submit"
                id="main-header-search-submit-btn"
                aria-label="Submit search"
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 sm:px-5 py-2.5 transition-all flex items-center justify-center shrink-0 cursor-pointer rounded-r-lg"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                <span className="hidden xl:inline-block ml-1.5 text-xs font-bold">Search</span>
              </button>
            </form>

            {/* Live Autocomplete Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 divide-y divide-gray-100">
                <div className="p-2.5 bg-gray-50 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>
                    Matching Medicines & Products ({searchResults.length})
                    {selectedCategory !== 'all' && ` in ${currentCategoryData?.name}`}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">Instant Dispatch</span>
                </div>
                {searchResults.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="p-3 hover:bg-emerald-50/50 flex items-center gap-3 cursor-pointer transition-colors group"
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-10 h-10 object-cover rounded-lg border border-gray-200 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs sm:text-sm font-bold text-slate-800 truncate group-hover:text-[#0b4d34]">
                          {prod.name}
                        </h5>
                        {prod.requiresPrescription && (
                          <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-1.5 py-0.2 rounded border border-rose-200">
                            Rx
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        {prod.brand} • {prod.packSize}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                        ₹{prod.price}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        {prod.discountPercent}% OFF
                      </span>
                    </div>
                  </div>
                ))}
                <div 
                  onClick={() => handleSearchExecute()}
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-center text-xs font-bold text-[#0b4d34] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View all results for "{searchQuery}"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}
          </div>

          {/* 4. RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-5 shrink-0">
            
            {/* Upload Prescription */}
            <button
              id="header-upload-rx-btn"
              onClick={onOpenPrescriptionModal}
              className="hidden md:inline-flex items-center gap-2 text-slate-700 hover:text-[#0b4d34] px-2.5 py-1.5 rounded-xl hover:bg-emerald-50/70 transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0b4d34] group-hover:bg-[#0b4d34] group-hover:text-white flex items-center justify-center transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-left hidden lg:block">
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#0b4d34] block leading-tight">
                  Upload
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-tight">
                  Prescription
                </span>
              </div>
            </button>

            {/* Offers */}
            <button
              id="header-offers-btn"
              onClick={onOpenOffersModal}
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#ea580c] px-2.5 py-1.5 rounded-xl hover:bg-orange-50/70 transition-all cursor-pointer group"
            >
              <div className="relative">
                <Tag className="w-5 h-5 text-slate-600 group-hover:text-[#ea580c] transition-colors" />
                <span className="w-2 h-2 rounded-full bg-[#ea580c] absolute -top-0.5 -right-0.5 animate-ping" />
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-[#ea580c] hidden xl:inline">
                Offers
              </span>
            </button>

            {/* Cart with Counter Badge */}
            <button
              id="header-cart-btn"
              onClick={onOpenCartDrawer}
              className="relative inline-flex items-center gap-2 bg-white hover:bg-emerald-50/80 p-2 sm:px-3 sm:py-2 rounded-xl border border-gray-200 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-slate-700 group-hover:text-[#0b4d34]" />
                <span className="absolute -top-2.5 -right-2.5 bg-[#0b4d34] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs border border-white">
                  {cartCount}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-[#0b4d34] hidden sm:inline">
                Cart
              </span>
            </button>

            {/* Sign In / Profile */}
            <button
              id="header-auth-btn"
              onClick={onOpenAuthModal}
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#0b4d34] p-1.5 sm:px-2.5 sm:py-2 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-slate-600 group-hover:bg-[#0b4d34] group-hover:text-white transition-colors">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left hidden lg:block">
                <span className="text-xs font-bold text-slate-800 block leading-tight">
                  {user.isLoggedIn ? user.name.split(' ')[0] : 'Sign In /'}
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-tight">
                  {user.isLoggedIn ? `${user.coins} Coins` : 'Sign Up'}
                </span>
              </div>
            </button>

          </div>

        </div>

        {/* Mobile PIN Location & Upload Bar */}
        <div className="sm:hidden mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 text-xs text-slate-700 font-medium"
          >
            <MapPin className="w-3.5 h-3.5 text-[#0b4d34]" />
            <span>Delivering to:</span>
            <strong className="text-[#ea580c]">{currentLocation.pincode}</strong>
            <span className="text-slate-500 truncate max-w-[120px]">({currentLocation.locality})</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <button
            onClick={onOpenPrescriptionModal}
            className="text-[11px] font-bold text-[#0b4d34] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1"
          >
            <FileText className="w-3 h-3" />
            <span>Upload Rx</span>
          </button>
        </div>

      </div>
    </header>
  );
};
