import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  Sparkles, 
  Activity, 
  Stethoscope, 
  Smile, 
  Heart, 
  HeartHandshake, 
  Leaf, 
  ShieldCheck, 
  Truck, 
  PackageCheck, 
  ArrowRight, 
  ChevronRight,
  FileText,
  Clock,
  Compass
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface HomepageHeroGridProps {
  onSelectCategory: (categoryId: string, subCategory?: string) => void;
  onNavigateAllCategories: () => void;
  onOpenPrescriptionModal: () => void;
  onOpenTrackingModal: () => void;
  onExploreProducts: () => void;
}

export const HomepageHeroGrid: React.FC<HomepageHeroGridProps> = ({
  onSelectCategory,
  onNavigateAllCategories,
  onOpenPrescriptionModal,
  onOpenTrackingModal,
  onExploreProducts
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalSlides = 3;

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, totalSlides]);

  // Top 8 Categories for Left Sidebar
  const sidebarCategories = [
    { id: 'medicines', name: 'Medicines', icon: Pill, bg: 'bg-emerald-100 text-emerald-800' },
    { id: 'vitamins', name: 'Vitamins & Supplements', icon: Sparkles, bg: 'bg-teal-100 text-teal-800' },
    { id: 'nutrition', name: 'Diet & Nutrition', icon: Activity, bg: 'bg-amber-100 text-amber-800' },
    { id: 'devices', name: 'Health Devices', icon: Stethoscope, bg: 'bg-blue-100 text-blue-800' },
    { id: 'personal-care', name: 'Personal Care', icon: Smile, bg: 'bg-purple-100 text-purple-800' },
    { id: 'skin-care', name: 'Skin Care', icon: Heart, bg: 'bg-rose-100 text-rose-800' },
    { id: 'baby-care', name: 'Baby Care', icon: HeartHandshake, bg: 'bg-sky-100 text-sky-800' },
    { id: 'ayurveda', name: 'Ayurveda', icon: Leaf, bg: 'bg-green-100 text-green-800' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        
        {/* =========================================
            1. LEFT CATEGORY SIDEBAR (Col 1-3, hidden on mobile/tablet)
           ========================================= */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-3.5 h-full flex flex-col justify-between">
            <div className="space-y-1">
              <div className="px-2 py-1.5 mb-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Departments
              </div>
              {sidebarCategories.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`sidebar-cat-link-${item.id}`}
                    onClick={() => onSelectCategory(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:text-[#1B5E20] hover:bg-emerald-50/70 transition-all text-xs font-semibold cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{item.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1B5E20] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Bottom: View All Categories */}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <button
                id="sidebar-view-all-cats-btn"
                onClick={onNavigateAllCategories}
                className="w-full bg-emerald-50/80 hover:bg-emerald-100/80 text-[#1B5E20] text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            2. CENTER MAIN HERO CAROUSEL (Col 4-9 on desktop)
           ========================================= */}
        <div 
          className="lg:col-span-6 flex flex-col"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-[#EBF7F0] via-[#E2F3E8] to-[#D8EFE2] border border-emerald-100 shadow-xs h-full min-h-[380px] sm:min-h-[420px] flex items-center p-6 sm:p-8">
            
            {/* Subtle background glow */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />

            {/* SLIDE 1: Primary Indian Pharmacy Showcase */}
            {currentSlide === 0 && (
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 animate-in fade-in duration-300">
                {/* Left Text and CTAs */}
                <div className="max-w-xs sm:max-w-sm space-y-3.5 text-center md:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.1]">
                    <span className="text-[#1B5E20] block">Your Health,</span>
                    <span className="text-[#ea580c] block mt-0.5">Our Priority</span>
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Wide range of medicines & healthcare products delivered to your doorstep.
                  </p>

                  {/* 3 Trust Tags with Checkmarks */}
                  <div className="space-y-1.5 pt-1 text-xs font-bold text-slate-800">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <div className="w-4 h-4 rounded-full bg-[#1B5E20] text-white flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-200" />
                      </div>
                      <span>100% Genuine Medicines</span>
                    </div>

                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <div className="w-4 h-4 rounded-full bg-[#1B5E20] text-white flex items-center justify-center shrink-0">
                        <Truck className="w-2.5 h-2.5 text-emerald-200" />
                      </div>
                      <span>Fast & Safe Delivery</span>
                    </div>

                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <div className="w-4 h-4 rounded-full bg-[#1B5E20] text-white flex items-center justify-center shrink-0">
                        <PackageCheck className="w-2.5 h-2.5 text-emerald-200" />
                      </div>
                      <span>Easy Returns</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <button
                      id="hero-shop-now-btn"
                      onClick={onExploreProducts}
                      className="bg-[#1B5E20] hover:bg-[#144818] text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto md:mx-0 cursor-pointer group"
                    >
                      <span>Shop Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right Product Pedestal with Floating 20% OFF Badge */}
                <div className="relative w-48 sm:w-56 lg:w-60 shrink-0">
                  {/* Floating Circular Badge: Flat 20% OFF */}
                  <div className="absolute -top-3 -right-2 sm:-right-4 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#1B5E20] text-white flex flex-col items-center justify-center text-center shadow-lg border-2 border-white z-20 animate-pulse">
                    <span className="text-[10px] sm:text-xs font-bold leading-tight uppercase">Flat</span>
                    <span className="text-sm sm:text-base font-black leading-none text-emerald-300">20%</span>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase leading-tight">OFF</span>
                  </div>

                  {/* Clean 3D Pharmacy Product Cluster Visual */}
                  <div className="relative bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-white/90 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80"
                      alt="Medicines and Health Products on Pedestal"
                      className="w-full h-44 sm:h-52 object-cover rounded-xl"
                    />
                    <div className="mt-2 text-center">
                      <span className="text-[10px] font-bold text-[#1B5E20] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 inline-block">
                        Accu-Chek • Cetaphil • ON Whey
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 2: Express Delivery */}
            {currentSlide === 1 && (
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 animate-in fade-in duration-300">
                <div className="max-w-xs sm:max-w-sm space-y-3.5 text-center md:text-left">
                  <span className="inline-block bg-orange-100 text-[#ea580c] font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                    ⚡ 2-Hour Express Delivery
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                    Emergency Care, <span className="text-[#ea580c]">Delivered Fast</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Prescription medicines delivered in temperature-controlled boxes right to your doorstep.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onOpenPrescriptionModal}
                      className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 mx-auto md:mx-0 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Upload Rx Now</span>
                    </button>
                  </div>
                </div>

                <div className="relative w-48 sm:w-56 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80"
                    alt="Express Delivery"
                    className="w-full h-44 sm:h-52 object-cover rounded-2xl shadow-md border-2 border-white"
                  />
                </div>
              </div>
            )}

            {/* SLIDE 3: Vitamins & Nutrition */}
            {currentSlide === 2 && (
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 animate-in fade-in duration-300">
                <div className="max-w-xs sm:max-w-sm space-y-3.5 text-center md:text-left">
                  <span className="inline-block bg-teal-100 text-teal-900 font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                    🌿 Daily Immunity & Wellness
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                    Vitamins, Minerals & <span className="text-[#1B5E20]">Herbal Care</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Pure Chyawanprash, Gold Standard Whey, Vitamin C & Omega 3 Fish Oil at best prices.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => onSelectCategory('vitamins')}
                      className="bg-[#1B5E20] hover:bg-[#144818] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 mx-auto md:mx-0 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Explore Vitamins</span>
                    </button>
                  </div>
                </div>

                <div className="relative w-48 sm:w-56 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"
                    alt="Vitamins and Nutrition"
                    className="w-full h-44 sm:h-52 object-cover rounded-2xl shadow-md border-2 border-white"
                  />
                </div>
              </div>
            )}

            {/* Carousel Bottom Dots */}
            <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`transition-all rounded-full ${
                    currentSlide === idx
                      ? 'w-6 h-2 bg-[#1B5E20]'
                      : 'w-2 h-2 bg-emerald-200 hover:bg-emerald-300'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* =========================================
            3. RIGHT STACKED QUICK ACTION CARDS (Col 10-12)
           ========================================= */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-3 sm:gap-3.5">
          
          {/* Card 1: Upload Prescription */}
          <div 
            id="hero-quick-upload-rx-card"
            onClick={onOpenPrescriptionModal}
            className="bg-white hover:bg-emerald-50/40 rounded-2xl border border-gray-200/80 shadow-xs p-4 transition-all duration-200 cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#1B5E20] border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-[#1B5E20] group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-[#1B5E20] transition-colors leading-tight">
                  Upload Prescription
                </h3>
                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Upload and get medicines delivered to your door
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1B5E20] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
          </div>

          {/* Card 2: Express Delivery */}
          <div 
            id="hero-quick-express-delivery-card"
            onClick={onExploreProducts}
            className="bg-white hover:bg-emerald-50/40 rounded-2xl border border-gray-200/80 shadow-xs p-4 transition-all duration-200 cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#1B5E20] border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-[#1B5E20] group-hover:text-white transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-[#1B5E20] transition-colors leading-tight">
                  Express Delivery
                </h3>
                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Get your order delivered in 24–48 hours
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1B5E20] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
          </div>

          {/* Card 3: Order Tracking */}
          <div 
            id="hero-quick-order-tracking-card"
            onClick={onOpenTrackingModal}
            className="bg-white hover:bg-emerald-50/40 rounded-2xl border border-gray-200/80 shadow-xs p-4 transition-all duration-200 cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#1B5E20] border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-[#1B5E20] group-hover:text-white transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-[#1B5E20] transition-colors leading-tight">
                  Order Tracking
                </h3>
                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Track your order in real time
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1B5E20] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
          </div>

        </div>

      </div>
    </section>
  );
};
