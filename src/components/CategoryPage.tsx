import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, 
  Search, 
  SlidersHorizontal, 
  X, 
  Check, 
  Star, 
  ArrowUpDown, 
  ArrowLeft, 
  Sparkles,
  Pill,
  Apple,
  Activity,
  HeartHandshake,
  Leaf,
  Stethoscope,
  Droplets,
  ShieldAlert,
  Smile,
  Heart,
  Grid,
  List,
  Eye,
  Volume2,
  ShieldCheck,
  Info,
  AlertCircle
} from 'lucide-react';
import { Product, LocationData } from '../types';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from './ProductCard';

interface CategoryPageProps {
  categoryId: string;
  subCategoryFilter?: string;
  onSelectCategory: (catId: string, subCat?: string) => void;
  onNavigateHome: () => void;
  onNavigateAllCategories: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
  cartItems: Record<string, number>;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  allProducts: Product[];
  currentLocation: LocationData;
}

const iconMap: Record<string, React.ReactNode> = {
  Pill: <Pill className="w-6 h-6" />,
  Apple: <Apple className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  Leaf: <Leaf className="w-6 h-6" />,
  Stethoscope: <Stethoscope className="w-6 h-6" />,
  Droplets: <Droplets className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />,
  Smile: <Smile className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />
};

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  subCategoryFilter,
  onSelectCategory,
  onNavigateHome,
  onNavigateAllCategories,
  onSelectProduct,
  onAddToCart,
  onUpdateQuantity,
  onBuyNow,
  cartItems,
  wishlistIds,
  onToggleWishlist,
  allProducts,
  currentLocation
}) => {
  const currentCategory = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(subCategoryFilter || 'all');
  const [inCategorySearch, setInCategorySearch] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSpecialtyPill, setSelectedSpecialtyPill] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [rxOnly, setRxOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState<number>(12);

  // Sync subcategory when prop changes
  React.useEffect(() => {
    if (subCategoryFilter) {
      setSelectedSubCategory(subCategoryFilter);
    } else {
      setSelectedSubCategory('all');
    }
  }, [subCategoryFilter, categoryId]);

  // Check if viewing Eye & Ear category
  const isEyeEarSection = selectedSubCategory === 'Eye & Ear Drops' || (categoryId === 'medicines' && selectedSubCategory === 'all');

  // Extract all distinct brands for this category
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    allProducts
      .filter(p => p.category === categoryId)
      .forEach(p => brands.add(p.brand));
    return Array.from(brands);
  }, [allProducts, categoryId]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      // Category match
      const matchCategory = p.category === categoryId;
      if (!matchCategory) return false;

      // Subcategory match
      if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) {
        return false;
      }

      // Specialty filter pills (Dry Eye, Ear Wax, Antibiotics, etc.)
      if (selectedSpecialtyPill !== 'all') {
        const titleAndDesc = `${p.name} ${p.genericName || ''} ${p.description || ''} ${p.uses?.join(' ') || ''}`.toLowerCase();
        if (selectedSpecialtyPill === 'lubricant' && !titleAndDesc.includes('lubricant') && !titleAndDesc.includes('carboxymethylcellulose') && !titleAndDesc.includes('polyethylene glycol') && !titleAndDesc.includes('tears')) {
          return false;
        }
        if (selectedSpecialtyPill === 'allergy' && !titleAndDesc.includes('allergy') && !titleAndDesc.includes('olopatadine') && !titleAndDesc.includes('redness') && !titleAndDesc.includes('naphazoline')) {
          return false;
        }
        if (selectedSpecialtyPill === 'antibiotic' && !titleAndDesc.includes('antibacterial') && !titleAndDesc.includes('antibiotic') && !titleAndDesc.includes('moxifloxacin') && !titleAndDesc.includes('tobramycin') && !titleAndDesc.includes('ciprofloxacin')) {
          return false;
        }
        if (selectedSpecialtyPill === 'ear' && !titleAndDesc.includes('ear') && !p.name.toLowerCase().includes('ear') && !titleAndDesc.includes('wax') && !titleAndDesc.includes('otogesic') && !titleAndDesc.includes('soluwax')) {
          return false;
        }
        if (selectedSpecialtyPill === 'vitamins' && !titleAndDesc.includes('lutein') && !titleAndDesc.includes('vision') && !titleAndDesc.includes('capsule') && !titleAndDesc.includes('supplement') && !titleAndDesc.includes('macular')) {
          return false;
        }
        if (selectedSpecialtyPill === 'rx' && !p.requiresPrescription) {
          return false;
        }
        if (selectedSpecialtyPill === 'otc' && p.requiresPrescription) {
          return false;
        }
      }

      // Search inside category
      if (inCategorySearch.trim()) {
        const q = inCategorySearch.toLowerCase();
        const matchSearch = p.name.toLowerCase().includes(q) ||
          (p.genericName && p.genericName.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q);
        if (!matchSearch) return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // Price filter
      if (p.price > priceRange) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      // In stock filter
      if (inStockOnly && !p.inStock) {
        return false;
      }

      // Rx filter
      if (rxOnly && !p.requiresPrescription) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      // Default: popularity / best sellers first
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [
    allProducts, 
    categoryId, 
    selectedSubCategory, 
    selectedSpecialtyPill,
    inCategorySearch, 
    selectedBrands, 
    priceRange, 
    minRating, 
    inStockOnly, 
    rxOnly, 
    sortBy
  ]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedSubCategory('all');
    setSelectedSpecialtyPill('all');
    setInCategorySearch('');
    setSelectedBrands([]);
    setPriceRange(3000);
    setMinRating(0);
    setInStockOnly(false);
    setRxOnly(false);
    setSortBy('popularity');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-6 animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-4 overflow-x-auto py-1">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[#0b4d34] transition-colors whitespace-nowrap cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button 
            onClick={onNavigateAllCategories}
            className="hover:text-[#0b4d34] transition-colors whitespace-nowrap cursor-pointer"
          >
            All Categories
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[#0b4d34] font-bold whitespace-nowrap">
            {currentCategory.name}
          </span>
          {selectedSubCategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-800 font-semibold whitespace-nowrap">
                {selectedSubCategory}
              </span>
            </>
          )}
        </nav>

        {/* Category Hero Banner */}
        <div className="bg-gradient-to-r from-[#0b4d34] via-[#0d5f40] to-[#127c54] rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-emerald-700/60 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-emerald-100 mb-3 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
                <span>Verified Pharmaceutical Store</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2">
                {currentCategory.name}
              </h1>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                {currentCategory.bannerHeadline || `Explore genuine, clinically approved ${currentCategory.name} products with guaranteed fast delivery to ${currentLocation.pincode} (${currentLocation.locality}).`}
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 shrink-0 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                {iconMap[currentCategory.iconName] || <Pill className="w-6 h-6" />}
              </div>
              <div>
                <span className="text-xs text-emerald-200 block font-medium">Available Catalog</span>
                <span className="text-xl font-black text-white">{currentCategory.itemCount}+ Products</span>
                <span className="text-[11px] text-emerald-300 block">Up to 25% Off Today</span>
              </div>
            </div>
          </div>

          {/* Subcategories Horizontal Scroll */}
          <div className="mt-6 pt-5 border-t border-emerald-600/50 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedSubCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubCategory === 'all'
                  ? 'bg-white text-[#0b4d34] shadow-xs'
                  : 'bg-emerald-800/80 hover:bg-emerald-700 text-white border border-emerald-600/60'
              }`}
            >
              All {currentCategory.name}
            </button>
            {currentCategory.subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSubCategory === sub
                    ? 'bg-[#ea580c] text-white shadow-xs'
                    : 'bg-emerald-800/80 hover:bg-emerald-700 text-white border border-emerald-600/60'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid & Filters Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Sidebar Filters (Desktop) */}
          <aside className="w-full lg:w-72 shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-24 space-y-6 shadow-2xs">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 font-black text-slate-800 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-[#0b4d34]" />
                  <span>Filter Products</span>
                </div>
                {(selectedBrands.length > 0 || inCategorySearch || selectedSubCategory !== 'all' || minRating > 0 || inStockOnly || rxOnly) && (
                  <button 
                    onClick={handleResetFilters}
                    className="text-xs text-[#ea580c] font-bold hover:underline cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* In-category search */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Search in {currentCategory.name}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inCategorySearch}
                    onChange={(e) => setInCategorySearch(e.target.value)}
                    placeholder="Search brand, composition..."
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b4d34]"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  {inCategorySearch && (
                    <button 
                      onClick={() => setInCategorySearch('')}
                      className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Subcategories List */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Subcategories
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedSubCategory('all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer ${
                      selectedSubCategory === 'all' 
                        ? 'bg-emerald-50 text-[#0b4d34] font-bold' 
                        : 'text-slate-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>All Subcategories</span>
                    {selectedSubCategory === 'all' && <Check className="w-3.5 h-3.5 text-[#0b4d34]" />}
                  </button>
                  {currentCategory.subcategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubCategory(sub)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer ${
                        selectedSubCategory === sub 
                          ? 'bg-emerald-50 text-[#0b4d34] font-bold' 
                          : 'text-slate-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="truncate">{sub}</span>
                      {selectedSubCategory === sub && <Check className="w-3.5 h-3.5 text-[#0b4d34]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Checklist */}
              {availableBrands.length > 0 && (
                <div className="pt-3 border-t border-gray-100">
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Brands ({availableBrands.length})
                  </label>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {availableBrands.map(brand => (
                      <label 
                        key={brand}
                        className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="rounded text-[#0b4d34] focus:ring-[#0b4d34] accent-[#0b4d34] cursor-pointer"
                        />
                        <span className="truncate">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Max Price Range Slider */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    Max Price
                  </label>
                  <span className="text-xs font-extrabold text-[#0b4d34]">
                    ₹{priceRange}
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={3000}
                  step={50}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#0b4d34] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₹50</span>
                  <span>₹3,000+</span>
                </div>
              </div>

              {/* Customer Rating Filter */}
              <div className="pt-3 border-t border-gray-100">
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Customer Rating
                </label>
                <div className="space-y-1">
                  {[4, 3, 0].map((star) => (
                    <button
                      key={star}
                      onClick={() => setMinRating(star)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer ${
                        minRating === star ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {star > 0 ? (
                          <>
                            <div className="flex items-center text-amber-500">
                              {[...Array(star)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span>{star}★ & above</span>
                          </>
                        ) : (
                          <span>All Ratings</span>
                        )}
                      </div>
                      {minRating === star && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fast Flags */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-[#0b4d34] accent-[#0b4d34]"
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rxOnly}
                    onChange={(e) => setRxOnly(e.target.checked)}
                    className="rounded text-[#0b4d34] accent-[#0b4d34]"
                  />
                  <span>Prescription (Rx) Required</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Main Product Grid Container */}
          <div className="flex-1">
            
            {/* Specialty Quick Filter Tabs for Eye & Ear Drops */}
            {isEyeEarSection && (
              <div className="bg-white rounded-2xl border border-emerald-100 p-4 mb-6 shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
                    <span>Quick Specialty Categories:</span>
                  </span>
                  {selectedSpecialtyPill !== 'all' && (
                    <button
                      onClick={() => setSelectedSpecialtyPill('all')}
                      className="text-[11px] font-bold text-[#ea580c] hover:underline"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: 'all', label: 'All Eye & Ear Care', icon: null },
                    { id: 'lubricant', label: '💧 Dry Eye & Lubricants', icon: null },
                    { id: 'allergy', label: '🌸 Allergy & Redness', icon: null },
                    { id: 'antibiotic', label: '🛡️ Antibiotic Drops (Rx)', icon: null },
                    { id: 'ear', label: '👂 Ear Wax & Pain Drops', icon: null },
                    { id: 'vitamins', label: '💊 Eye Vitamins & Lutein', icon: null },
                    { id: 'otc', label: '🟢 OTC (No Prescription)', icon: null },
                    { id: 'rx', label: '📋 Prescription (Rx)', icon: null },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedSpecialtyPill(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedSpecialtyPill === tab.id
                          ? 'bg-[#0b4d34] text-white shadow-xs'
                          : 'bg-emerald-50/70 hover:bg-emerald-100 text-[#0b4d34] border border-emerald-200/60'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Top Toolbar: Count, Mobile Filter Button, Sorting */}
            <div className="bg-white rounded-2xl border border-gray-200 p-3.5 sm:p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center justify-between sm:justify-start gap-3">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#0b4d34]" />
                  <span>Filters</span>
                </button>

                <div className="text-xs sm:text-sm text-slate-600">
                  Showing <strong className="text-slate-900">{filteredProducts.length}</strong> products in <span className="font-bold text-[#0b4d34]">{currentCategory.name}</span>
                </div>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-slate-500 font-semibold whitespace-nowrap flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-bold text-slate-800 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#0b4d34] cursor-pointer"
                >
                  <option value="popularity">Popularity & Bestsellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Biggest Discount (%)</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.slice(0, displayCount).map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelectProduct={() => onSelectProduct(product)}
                      onAddToCart={() => onAddToCart(product, 1)}
                      onUpdateQuantity={(newQty) => onUpdateQuantity(product.id, newQty)}
                      onBuyNow={onBuyNow ? (p) => onBuyNow(p, 1) : undefined}
                      quantityInCart={cartItems[product.id] || 0}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onToggleWishlist={() => onToggleWishlist(product)}
                      onQuickView={() => onSelectProduct(product)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {filteredProducts.length > displayCount && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setDisplayCount(prev => prev + 12)}
                      className="bg-white hover:bg-emerald-50 text-[#0b4d34] border-2 border-[#0b4d34] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      Load More Products ({filteredProducts.length - displayCount} remaining)
                    </button>
                  </div>
                )}

                {/* Dedicated Clinical Guidelines & Advisory Strip for Eye & Ear Care */}
                {isEyeEarSection && (
                  <div className="mt-12 bg-white rounded-2xl border border-emerald-200/80 p-6 shadow-2xs space-y-4">
                    <div className="flex items-center gap-2 text-[#0b4d34]">
                      <ShieldCheck className="w-5 h-5" />
                      <h3 className="text-base font-black text-slate-800">
                        Ophthalmic & Otic Administration Guidelines
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                        <h4 className="font-bold text-[#0b4d34] mb-1 flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          <span>30-Day Discard Rule</span>
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          Sterile ophthalmic dropper bottles must be discarded 30 days after first opening. Keep container tightly closed to prevent microbial contamination.
                        </p>
                      </div>

                      <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-100">
                        <h4 className="font-bold text-amber-800 mb-1 flex items-center gap-1.5">
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Safe Ear Drop Instillation</span>
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          Warm bottle in hands before use. Tilt head sideways for 5 minutes after instilling. Do not insert cotton buds deeply into ear canal.
                        </p>
                      </div>

                      <div className="bg-rose-50/50 p-3.5 rounded-xl border border-rose-100">
                        <h4 className="font-bold text-rose-800 mb-1 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Prescription Verification</span>
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          Antibiotic & steroid drops labeled [Rx Required] are dispensed only against a valid prescription verified by our certified pharmacists.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#0b4d34] mx-auto flex items-center justify-center mb-4">
                  <Pill className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  No products matched your filters
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
                  Try adjusting your price range, clearing brand filters, or searching with another term.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#0b4d34] hover:bg-[#083a27] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Drawer Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" 
            onClick={() => setIsMobileFilterOpen(false)} 
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h4 className="font-bold text-slate-800 text-base">Filter Products</h4>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subcategories */}
              <div className="mb-5">
                <label className="text-xs font-bold text-slate-700 block mb-2">Subcategories</label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedSubCategory('all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                      selectedSubCategory === 'all' ? 'bg-emerald-50 text-[#0b4d34] font-bold' : 'text-slate-600'
                    }`}
                  >
                    All Subcategories
                  </button>
                  {currentCategory.subcategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubCategory(sub)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                        selectedSubCategory === sub ? 'bg-emerald-50 text-[#0b4d34] font-bold' : 'text-slate-600'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">Max Price</label>
                  <span className="text-xs font-bold text-[#0b4d34]">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={3000}
                  step={50}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#0b4d34]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="w-1/2 bg-gray-100 text-slate-700 text-xs font-bold py-2.5 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 bg-[#0b4d34] text-white text-xs font-bold py-2.5 rounded-xl"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
