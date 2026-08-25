import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  FileText, 
  Sparkles, 
  Check, 
  X, 
  Search,
  Droplets,
  HeartPulse,
  ShieldAlert,
  ShieldCheck,
  Bone
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES, HEALTH_CONCERN_TAGS } from '../data/categories';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  cartItems: Record<string, number>;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onBuyNow,
  wishlistIds,
  onToggleWishlist,
  onQuickView
}) => {
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'discount'>('popularity');
  const [rxFilter, setRxFilter] = useState<'all' | 'rx_only' | 'otc_only'>('all');
  const [selectedHealthConcern, setSelectedHealthConcern] = useState<string | null>(null);

  // Filtered and sorted products
  const processedProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category match
        const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
        
        // Search query match
        let matchSearch = true;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          matchSearch = 
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            (p.genericName && p.genericName.toLowerCase().includes(q)) ||
            p.subCategory.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
        }

        // Rx filter
        let matchRx = true;
        if (rxFilter === 'rx_only') matchRx = p.requiresPrescription;
        if (rxFilter === 'otc_only') matchRx = !p.requiresPrescription;

        // Health concern tag filter
        let matchConcern = true;
        if (selectedHealthConcern) {
          const concern = selectedHealthConcern.toLowerCase();
          if (concern === 'diabetes') matchConcern = p.subCategory.toLowerCase().includes('diabetes') || p.name.toLowerCase().includes('glycemic') || p.name.toLowerCase().includes('metformin');
          else if (concern === 'heart') matchConcern = p.subCategory.toLowerCase().includes('heart') || p.subCategory.toLowerCase().includes('bp') || p.name.toLowerCase().includes('cardio');
          else if (concern === 'stomach') matchConcern = p.subCategory.toLowerCase().includes('stomach') || p.subCategory.toLowerCase().includes('digestion');
          else if (concern === 'immunity') matchConcern = p.subCategory.toLowerCase().includes('immunity') || p.subCategory.toLowerCase().includes('multivitamin') || p.subCategory.toLowerCase().includes('chyawanprash');
          else if (concern === 'bone_joint') matchConcern = p.subCategory.toLowerCase().includes('calcium') || p.subCategory.toLowerCase().includes('pain') || p.subCategory.toLowerCase().includes('vitamin d3');
          else if (concern === 'skin') matchConcern = p.subCategory.toLowerCase().includes('skin') || p.subCategory.toLowerCase().includes('sunscreen') || p.subCategory.toLowerCase().includes('derma');
        }

        return matchCategory && matchSearch && matchRx && matchConcern;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        // Default popularity: rating + reviews
        return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
      });
  }, [products, selectedCategory, searchQuery, rxFilter, selectedHealthConcern, sortBy]);

  const activeCategoryInfo = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <section id="products-catalog-section" className="max-w-7xl mx-auto px-4 mt-8 sm:mt-12">
      
      {/* Section Header & Category Pills */}
      <div className="space-y-4">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : activeCategoryInfo
                  ? activeCategoryInfo.name
                  : 'Popular Medicines & Healthcare Products'}
              </h2>
              <span className="bg-emerald-100 text-[#0b4d34] text-xs font-bold px-2 py-0.5 rounded-full">
                {processedProducts.length} Products
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {activeCategoryInfo?.bannerHeadline || 'Authentic medications, certified wellness & clinical devices at guaranteed best prices'}
            </p>
          </div>

          {/* Controls: Rx Toggle & Sort */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            
            {/* Prescription Filter Toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setRxFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  rxFilter === 'all' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setRxFilter('rx_only')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  rxFilter === 'rx_only' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Rx Required</span>
              </button>
              <button
                onClick={() => setRxFilter('otc_only')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  rxFilter === 'otc_only' ? 'bg-[#0b4d34] text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                OTC Only
              </button>
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-gray-200 text-xs font-semibold text-slate-700 py-1.5 pl-3 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b4d34] cursor-pointer shadow-2xs"
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>

          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              onSelectCategory('all');
              setSelectedHealthConcern(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all' && !selectedHealthConcern
                ? 'bg-[#0b4d34] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onSelectCategory(c.id);
                setSelectedHealthConcern(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-[#0b4d34] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Health Concern Quick Filters */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-[#0b4d34] uppercase tracking-wider">
              Browse by Health Condition
            </span>
            {selectedHealthConcern && (
              <button
                onClick={() => setSelectedHealthConcern(null)}
                className="text-[11px] text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Clear Condition Filter</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {HEALTH_CONCERN_TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedHealthConcern(selectedHealthConcern === tag.id ? null : tag.id)}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                  selectedHealthConcern === tag.id
                    ? 'bg-[#0b4d34] text-white border-[#0b4d34] shadow-xs'
                    : `${tag.color} hover:shadow-2xs`
                }`}
              >
                <div>
                  <div className="text-xs font-bold truncate">{tag.name}</div>
                  <div className={`text-[10px] ${selectedHealthConcern === tag.id ? 'text-emerald-200' : 'opacity-70'}`}>
                    {tag.count}
                  </div>
                </div>
                {selectedHealthConcern === tag.id && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Active Search & Filter Banner */}
      {(searchQuery || selectedCategory !== 'all' || rxFilter !== 'all' || selectedHealthConcern) && (
        <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-500 font-medium">Applied Filters:</span>
          {searchQuery && (
            <span className="bg-orange-50 text-[#ea580c] border border-orange-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <span>Query: {searchQuery}</span>
              <button onClick={onClearSearch}><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="bg-emerald-50 text-[#0b4d34] border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <span>Category: {activeCategoryInfo?.name}</span>
              <button onClick={() => onSelectCategory('all')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {rxFilter !== 'all' && (
            <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <span>{rxFilter === 'rx_only' ? 'Prescription Only' : 'OTC Only'}</span>
              <button onClick={() => setRxFilter('all')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedHealthConcern && (
            <span className="bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <span>Condition: {selectedHealthConcern}</span>
              <button onClick={() => setSelectedHealthConcern(null)}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      {/* Product Grid */}
      {processedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mt-5">
          {processedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantityInCart={cartItems[product.id] || 0}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
              onBuyNow={onBuyNow ? (p) => onBuyNow(p, 1) : undefined}
              onSelectProduct={onQuickView}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-gray-200 mt-6 space-y-3">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#ea580c] mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matching medicines or products found</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            We couldn't find products matching your filters. Try clearing your search or switching to another category.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                onClearSearch();
                onSelectCategory('all');
                setRxFilter('all');
                setSelectedHealthConcern(null);
              }}
              className="bg-[#0b4d34] hover:bg-[#083a27] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
