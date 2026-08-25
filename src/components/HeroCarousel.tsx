import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Headphones, 
  ChevronLeft, 
  ChevronRight, 
  Coins, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

interface HeroCarouselProps {
  onExploreProducts: () => void;
  onOpenPrescriptionModal: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onExploreProducts,
  onOpenPrescriptionModal
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalSlides = 3;

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, totalSlides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <section 
      id="main-hero-carousel-section"
      className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-r from-[#ebf7f0] via-[#e2f3e8] to-[#d8efe2] border border-emerald-100/80 shadow-xs min-h-[360px] md:min-h-[420px] lg:min-h-[450px] flex items-center">
        
        {/* Subtle decorative botanical background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />
        
        {/* Decorative Leaf SVG Watermark */}
        <svg className="absolute left-2 bottom-4 w-28 h-28 text-emerald-600/10 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C20 30 10 70 50 100 C90 70 80 30 50 0 Z" />
        </svg>
        <svg className="absolute right-12 top-6 w-36 h-36 text-emerald-600/10 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C20 30 10 70 50 100 C90 70 80 30 50 0 Z" />
        </svg>

        {/* SLIDE 1: Exact Reference Layout */}
        {currentSlide === 0 && (
          <div className="w-full h-full p-5 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 relative z-10 animate-in fade-in duration-500">
            
            {/* Left: Friendly Healthcare Model */}
            <div className="hidden md:flex items-end justify-center w-56 lg:w-72 xl:w-80 shrink-0 self-end -mb-8 lg:-mb-10">
              <div className="relative">
                {/* Clean healthcare model image with soft crop and natural glow */}
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=700&auto=format&fit=crop&q=80"
                  alt="MediCare Health Ambassador"
                  className="w-56 lg:w-64 xl:w-72 h-auto object-cover rounded-2xl drop-shadow-xl select-none"
                />
                
                {/* Certified Pharmacy Badge */}
                <div className="absolute -bottom-2 -left-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-emerald-100 flex items-center gap-1.5 text-xs font-bold text-[#0b4d34]">
                  <Award className="w-4 h-4 text-orange-500" />
                  <span>Licensed e-Pharmacy</span>
                </div>
              </div>
            </div>

            {/* Center Content: Exact Typography and Spacing */}
            <div className="flex-1 max-w-xl text-center lg:text-left space-y-4">
              
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1]">
                <span className="text-[#0b4d34] block">Your Health,</span>
                <span className="text-[#ea580c] block mt-1">Our Priority</span>
              </h1>

              {/* Promotional Dark Green Pill Badge */}
              <div className="inline-block">
                <div className="bg-[#0b4d34] text-white font-extrabold text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2 rounded-full shadow-md tracking-wide">
                  UP TO 25% OFF on 2000+ Healthcare Products
                </div>
              </div>

              {/* 3 Circular Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-slate-800">
                
                {/* 1. 100% Genuine Medicines */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0b4d34] text-white flex items-center justify-center shadow-xs shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight text-left">
                    100% Genuine<br /><span className="font-normal text-slate-600">Medicines</span>
                  </span>
                </div>

                {/* 2. Fast & Secure Delivery */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0b4d34] text-white flex items-center justify-center shadow-xs shrink-0">
                    <Truck className="w-5 h-5 text-emerald-300" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight text-left">
                    Fast & Secure<br /><span className="font-normal text-slate-600">Delivery</span>
                  </span>
                </div>

                {/* 3. Expert Health Support */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0b4d34] text-white flex items-center justify-center shadow-xs shrink-0">
                    <Headphones className="w-5 h-5 text-emerald-300" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight text-left">
                    Expert Health<br /><span className="font-normal text-slate-600">Support</span>
                  </span>
                </div>

              </div>

            </div>

            {/* Right: Pharmacy Shopping Basket & 3X Coins Card */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              
              {/* Green Pharmacy Basket Illustration */}
              <div className="relative hidden sm:block w-44 lg:w-56 xl:w-64">
                <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-200/80 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80"
                    alt="MediCare+ Pharmacy Basket"
                    className="w-full h-36 lg:h-44 object-cover rounded-xl"
                  />
                  <div className="mt-2 text-center">
                    <span className="inline-block bg-[#0b4d34] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                      MediCare+ Certified
                    </span>
                  </div>
                </div>
              </div>

              {/* Far Right: Floating 3X MediCare Coins Card (From Screenshot) */}
              <div className="bg-white/95 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-emerald-200/90 shadow-xl w-36 sm:w-44 text-center relative overflow-hidden group hover:border-[#ea580c] transition-all">
                <div className="absolute top-0 right-0 bg-[#ea580c] text-white text-[9px] font-black px-2 py-0.5 rounded-bl-lg">
                  REWARDS
                </div>
                
                <div className="text-left mb-2">
                  <div className="text-xs font-black text-slate-700">Get</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#ea580c] leading-none">
                    3X
                  </div>
                  <div className="text-xs sm:text-sm font-black text-[#0b4d34] leading-tight">
                    MediCare Coins
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    on every order
                  </div>
                </div>

                {/* 3D Gold Coins Graphic */}
                <div className="flex items-center justify-center my-1">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-md border-2 border-amber-200 animate-bounce">
                      <Coins className="w-5 h-5 text-amber-900" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={onExploreProducts}
                  className="mt-2 text-[10px] font-bold text-[#0b4d34] hover:text-[#ea580c] flex items-center justify-center gap-1 w-full"
                >
                  <span>Redeem in Cart</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* SLIDE 2: Superfast 2-Hour Delivery Slide */}
        {currentSlide === 1 && (
          <div className="w-full h-full p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 animate-in fade-in duration-500">
            <div className="max-w-xl text-center md:text-left space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider bg-orange-100 text-[#ea580c] px-3.5 py-1 rounded-full">
                ⚡ Express Delivery Network
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Doorstep Delivery in <span className="text-[#ea580c]">2 Hours</span> for Emergency Care
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Never run out of essential chronic and daily medicines. Monitored cold-chain storage with live GPS order tracking.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                <button
                  onClick={onExploreProducts}
                  className="bg-[#0b4d34] hover:bg-[#083a27] text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Order Medicines Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenPrescriptionModal}
                  className="bg-white hover:bg-gray-50 text-[#0b4d34] border border-[#0b4d34] font-bold px-5 py-3 rounded-xl text-sm transition-all cursor-pointer"
                >
                  Upload Prescription
                </button>
              </div>
            </div>

            <div className="w-64 sm:w-80 relative">
              <img
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80"
                alt="Express Medicine Delivery"
                className="w-full h-56 object-cover rounded-2xl shadow-xl border-2 border-white"
              />
              <div className="absolute -bottom-3 -right-3 bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-xs font-bold text-slate-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Express Dispatch Ready</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: Ayurveda & Immunity Special */}
        {currentSlide === 2 && (
          <div className="w-full h-full p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 animate-in fade-in duration-500">
            <div className="max-w-xl text-center md:text-left space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-[#0b4d34] px-3.5 py-1 rounded-full">
                🌿 100% Pure Ayurveda Range
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Ancient Ayurvedic Healing, <span className="text-[#0b4d34]">Modern Scientific Purity</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Royal Gold Chyawanprash, Pure Himalayan Shilajit, KSM-66 Ashwagandha & organic herbal wellness formulations.
              </p>
              <div className="pt-2">
                <button
                  onClick={onExploreProducts}
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Ayurveda Store</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-64 sm:w-80 relative">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"
                alt="Pure Ayurveda and Herbal Wellness"
                className="w-full h-56 object-cover rounded-2xl shadow-xl border-2 border-white"
              />
            </div>
          </div>
        )}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md transition-all opacity-70 hover:opacity-100 z-20 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md transition-all opacity-70 hover:opacity-100 z-20 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Bottom Center Carousel Indicators (Matching reference: active pill + dots) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all rounded-full ${
                currentSlide === idx
                  ? 'w-6 h-2 bg-[#0b4d34]'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Small *T&C Apply footnote at bottom right as seen in reference */}
        <span className="absolute bottom-2 right-4 text-[10px] text-slate-400 font-medium">
          *T&C Apply
        </span>

      </div>
    </section>
  );
};
