import React from 'react';
import { 
  ArrowRight, 
  Star, 
  ShoppingBag, 
  Check, 
  Plus, 
  Sparkles,
  Pill,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopByCategoriesAndBestsellersProps {
  onSelectCategory: (categoryId: string, subCategory?: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartItems: Record<string, number>;
  onExploreBestsellers: () => void;
}

export const ShopByCategoriesAndBestsellers: React.FC<ShopByCategoriesAndBestsellersProps> = ({
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  cartItems,
  onExploreBestsellers
}) => {
  // Category cards corresponding to the reference image
  const categoryCards = [
    {
      id: 'medicines',
      name: 'Medicines',
      itemCount: 1426,
      description: 'Allopathic, Generic & Prescription Medicines',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80',
      bgLight: 'bg-emerald-50/50'
    },
    {
      id: 'vitamins',
      name: 'Vitamins & Supplements',
      itemCount: 964,
      description: 'Daily Vitamins & Health Supplements',
      image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&auto=format&fit=crop&q=80',
      bgLight: 'bg-teal-50/50'
    },
    {
      id: 'nutrition',
      name: 'Diet & Nutrition',
      itemCount: 626,
      description: 'Protein, Nutrition Drinks & Health Foods',
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&auto=format&fit=crop&q=80',
      bgLight: 'bg-amber-50/50'
    },
    {
      id: 'devices',
      name: 'Health Devices',
      itemCount: 340,
      description: 'Monitors, Devices & Home Healthcare',
      image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&auto=format&fit=crop&q=80',
      bgLight: 'bg-blue-50/50'
    },
    {
      id: 'personal-care',
      name: 'Personal Care',
      itemCount: 1318,
      description: 'Daily Hygiene & Personal Essentials',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80',
      bgLight: 'bg-purple-50/50'
    },
    {
      id: 'skin-care',
      name: 'Skin Care',
      itemCount: 718,
      description: 'Face Care, Body Care & Skin Essentials',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop&q=80',
      bgLight: 'bg-rose-50/50'
    },
    {
      id: 'baby-care',
      name: 'Baby Care',
      itemCount: 856,
      description: 'Baby Food, Diapers & Baby Essentials',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&auto=format&fit=crop&q=80',
      bgLight: 'bg-sky-50/50'
    },
    {
      id: 'ayurveda',
      name: 'Ayurveda',
      itemCount: 680,
      description: 'Herbal, Natural & Ayurvedic Products',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
      bgLight: 'bg-emerald-50/50'
    },
    {
      id: 'health-corner',
      name: 'Health Corner',
      itemCount: 120,
      description: 'Tips, Blogs & Expert Health Advice',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop&q=80',
      bgLight: 'bg-indigo-50/50'
    }
  ];

  // Bestsellers list matching reference layout
  const bestsellers = [
    {
      rank: 1,
      product: PRODUCTS.find(p => p.id === 'med-1') || PRODUCTS[0],
      name: 'Dolo 650 Tablet',
      composition: 'Paracetamol 650mg (15 Tablets)',
      rating: 4.8,
      reviews: 1420,
      price: 28.50,
      mrp: 35.00,
      discount: 18
    },
    {
      rank: 2,
      product: PRODUCTS.find(p => p.id === 'med-3') || PRODUCTS[2] || PRODUCTS[0],
      name: 'Pantoprazole Tablet',
      composition: 'Pantoprazole 40mg (10 Tablets)',
      rating: 4.7,
      reviews: 980,
      price: 84.00,
      mrp: 105.00,
      discount: 20
    },
    {
      rank: 3,
      product: PRODUCTS.find(p => p.id === 'nut-2') || PRODUCTS[3] || PRODUCTS[0],
      name: 'Calcium + Vitamin D3',
      composition: 'Supports Strong Bones (30 Tabs)',
      rating: 4.6,
      reviews: 820,
      price: 210.00,
      mrp: 250.00,
      discount: 16
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-8 sm:mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6">
        
        {/* =========================================
            LEFT / CENTER: SHOP BY CATEGORIES (Col 1-9)
           ========================================= */}
        <div className="lg:col-span-9">
          
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="space-y-0.5">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Shop by Categories
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Browse authentic medicines, wellness products & healthcare essentials
              </p>
            </div>
          </div>

          {/* Categories Grid (3 Columns on tablet/desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {categoryCards.map((cat) => (
              <div
                key={cat.id}
                id={`cat-card-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className="bg-white hover:bg-emerald-50/30 rounded-2xl border border-gray-200/80 p-3.5 sm:p-4 transition-all duration-200 hover:shadow-md cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Category Image */}
                  <div className="w-full h-24 sm:h-28 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-3 relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-bold text-[#1B5E20] shadow-2xs">
                      {cat.itemCount}+
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#1B5E20] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2 mt-1 leading-snug">
                    {cat.description}
                  </p>
                </div>

                {/* Explore Link */}
                <div className="pt-3 mt-2 border-t border-gray-100/80 flex items-center justify-between text-xs font-bold text-[#1B5E20]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* =========================================
            RIGHT COLUMN: BESTSELLERS WIDGET (Col 10-12)
           ========================================= */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-4 sm:p-5 h-full flex flex-col justify-between">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ea580c] animate-pulse" />
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Bestsellers
                  </h3>
                </div>
                <button
                  onClick={onExploreBestsellers}
                  className="text-xs font-bold text-[#1B5E20] hover:text-[#144818] flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Ranked Items List */}
              <div className="space-y-4">
                {bestsellers.map((item) => {
                  const inCartQty = cartItems[item.product.id] || 0;

                  return (
                    <div
                      key={item.rank}
                      id={`bestseller-item-${item.rank}`}
                      className="p-3 rounded-xl border border-gray-100 hover:border-emerald-200 bg-gray-50/40 hover:bg-emerald-50/30 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        
                        {/* Rank Badge */}
                        <div className="w-6 h-6 rounded-full bg-[#1B5E20] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
                          {item.rank}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 
                            onClick={() => onSelectProduct(item.product)}
                            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#1B5E20] cursor-pointer truncate transition-colors"
                          >
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {item.composition}
                          </p>

                          {/* Rating & Review */}
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="flex items-center gap-0.5 bg-emerald-100/80 text-[#1B5E20] text-[10px] font-black px-1.5 py-0.2 rounded">
                              <span>{item.rating}</span>
                              <Star className="w-2.5 h-2.5 fill-current" />
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium">
                              ({item.reviews.toLocaleString()})
                            </span>
                          </div>

                          {/* Price and Cart Action */}
                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-100">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                                ₹{item.price.toFixed(2)}
                              </span>
                              <span className="text-[10px] text-slate-400 line-through">
                                ₹{item.mrp.toFixed(2)}
                              </span>
                              <span className="text-[10px] text-emerald-700 font-bold">
                                {item.discount}% OFF
                              </span>
                            </div>

                            {/* Add to Cart button */}
                            <button
                              id={`bestseller-add-btn-${item.product.id}`}
                              onClick={() => onAddToCart(item.product)}
                              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                                inCartQty > 0 
                                  ? 'bg-[#1B5E20] text-white' 
                                  : 'bg-emerald-50 text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white'
                              }`}
                              title={inCartQty > 0 ? `${inCartQty} in cart` : 'Add to cart'}
                            >
                              {inCartQty > 0 ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Plus className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-3 mt-4 border-t border-gray-100">
              <button
                onClick={onExploreBestsellers}
                className="w-full bg-[#1B5E20] hover:bg-[#144818] text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View All Bestsellers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
