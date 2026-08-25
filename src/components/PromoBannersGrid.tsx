import React from 'react';
import { ArrowRight, Sparkles, Tag, ShieldCheck, Zap } from 'lucide-react';

interface PromoBannersGridProps {
  onSelectCategory: (catId: string) => void;
  onOpenOffersModal: () => void;
  onExploreProducts: () => void;
}

export const PromoBannersGrid: React.FC<PromoBannersGridProps> = ({
  onSelectCategory,
  onOpenOffersModal,
  onExploreProducts
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-6 sm:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        
        {/* =========================================
            LEFT 3 PROMOTIONAL BANNERS (Col 1-9)
           ========================================= */}
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-4">
          
          {/* Banner 1: Health Checkup Packages (Light Blue) */}
          <div 
            onClick={() => onSelectCategory('devices')}
            className="bg-[#EBF5FB] hover:bg-[#E1F0FA] rounded-2xl border border-[#D4E6F1] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-200 cursor-pointer group shadow-2xs min-h-[170px]"
          >
            <div className="relative z-10 max-w-[65%] space-y-1.5">
              <h3 className="text-sm sm:text-base font-extrabold text-[#1B4F72] leading-tight">
                Health Checkup Packages
              </h3>
              <p className="text-xs sm:text-sm font-black text-[#2874A6]">
                Up to 50% OFF
              </p>
              <div className="pt-2">
                <button 
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1B4F72] group-hover:text-[#154360] group-hover:underline"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Doctor Image Cutout */}
            <div className="absolute right-0 bottom-0 w-28 sm:w-32 h-full flex items-end justify-end pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80"
                alt="Doctor with Stethoscope"
                className="w-24 sm:w-28 h-36 object-cover object-top drop-shadow-md"
              />
            </div>
          </div>

          {/* Banner 2: Mega Deals of the Week (Light Lavender) */}
          <div 
            onClick={onOpenOffersModal}
            className="bg-[#F4ECF7] hover:bg-[#EBDFF0] rounded-2xl border border-[#E8DAEF] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-200 cursor-pointer group shadow-2xs min-h-[170px]"
          >
            <div className="relative z-10 max-w-[65%] space-y-1.5">
              <h3 className="text-sm sm:text-base font-extrabold text-[#512E5F] leading-tight">
                Mega Deals of the Week
              </h3>
              <p className="text-xs sm:text-sm font-black text-[#7D3C98]">
                Up to 60% OFF
              </p>
              <div className="pt-2">
                <button 
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#512E5F] group-hover:text-[#4A235A] group-hover:underline"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Pharmacy Basket Cutout */}
            <div className="absolute right-1 bottom-1 w-24 sm:w-28 h-28 flex items-end justify-end pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&auto=format&fit=crop&q=80"
                alt="Medicine Basket"
                className="w-20 sm:w-24 h-24 object-cover rounded-xl drop-shadow-md"
              />
            </div>
          </div>

          {/* Banner 3: Wellness Essentials (Light Olive / Mint) */}
          <div 
            onClick={() => onSelectCategory('nutrition')}
            className="bg-[#EAF2E8] hover:bg-[#DFEBDC] rounded-2xl border border-[#D5E5D0] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-200 cursor-pointer group shadow-2xs min-h-[170px]"
          >
            <div className="relative z-10 max-w-[65%] space-y-1.5">
              <h3 className="text-sm sm:text-base font-extrabold text-[#1E4620] leading-tight">
                Wellness Essentials
              </h3>
              <p className="text-xs sm:text-sm font-black text-[#2E7D32]">
                For a Better You
              </p>
              <div className="pt-2">
                <button 
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1E4620] group-hover:text-[#143015] group-hover:underline"
                >
                  <span>Explore Now</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Wellness & Fitness Items Cutout */}
            <div className="absolute right-1 bottom-1 w-24 sm:w-28 h-28 flex items-end justify-end pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=350&auto=format&fit=crop&q=80"
                alt="Wellness and Fitness items"
                className="w-20 sm:w-24 h-24 object-cover rounded-xl drop-shadow-md"
              />
            </div>
          </div>

        </div>

        {/* =========================================
            RIGHT SALE PROMOTION CARD (Col 10-12)
           ========================================= */}
        <div className="lg:col-span-3">
          <div className="bg-gradient-to-br from-[#FFF8E7] via-[#FFF3D6] to-[#FFEEC4] rounded-2xl border border-amber-200/90 p-4 sm:p-5 h-full flex flex-col justify-between relative overflow-hidden shadow-xs group">
            
            {/* Top Badge: Sale is Live! */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-[#ea580c] text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                <Zap className="w-3 h-3 fill-current" />
                <span>Sale is Live!</span>
              </span>
              <span className="text-[10px] text-amber-900 font-bold bg-amber-200/60 px-2 py-0.5 rounded-md">
                Limited Time
              </span>
            </div>

            {/* Text & Offer Details */}
            <div className="my-3 space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                Up to <span className="text-[#ea580c]">60%</span> OFF
              </div>
              <p className="text-xs font-bold text-slate-700 leading-snug">
                + Extra 10% Off on Prepaid Orders
              </p>
            </div>

            {/* Product image & Shop Now Button */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={onExploreProducts}
                className="bg-[#1B5E20] hover:bg-[#144818] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="w-16 h-14 rounded-lg overflow-hidden border border-amber-300/60 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80"
                  alt="Sale Products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
