import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  FileText, 
  ChevronDown, 
  ChevronRight, 
  Tag, 
  Truck, 
  Smartphone, 
  HelpCircle, 
  User, 
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
  Phone,
  Mail,
  Layers
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { LocationData, UserProfile } from '../types';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: LocationData;
  onOpenLocationModal: () => void;
  onOpenPrescriptionModal: () => void;
  onOpenOffersModal: () => void;
  onOpenTrackingModal: () => void;
  onOpenSupportModal: () => void;
  onOpenAppModal: () => void;
  onOpenAuthModal: () => void;
  onSelectCategory: (categoryId: string, subCategory?: string) => void;
  onNavigateAllCategories: () => void;
  user: UserProfile;
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

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onOpenLocationModal,
  onOpenPrescriptionModal,
  onOpenOffersModal,
  onOpenTrackingModal,
  onOpenSupportModal,
  onOpenAppModal,
  onOpenAuthModal,
  onSelectCategory,
  onNavigateAllCategories,
  user
}) => {
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleCategory = (catId: string) => {
    setExpandedCategoryId(prev => prev === catId ? null : catId);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Drawer Content */}
      <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
        
        {/* Drawer Header */}
        <div className="bg-[#0b4d34] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center">
                MediCare<span className="text-[#ea580c] text-xl ml-0.5">+</span>
              </span>
              <span className="text-[8px] font-bold text-emerald-200 uppercase tracking-widest -mt-1">
                Pharmacy Mobile Menu
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User / Auth Strip */}
        <div className="p-3.5 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#0b4d34] text-white flex items-center justify-center font-bold text-sm">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                {user.isLoggedIn ? user.name : 'Welcome, Guest'}
              </p>
              <p className="text-[11px] text-emerald-800 font-medium">
                {user.isLoggedIn ? `${user.coins} MediCare Coins` : 'Login for special pharmacy discounts'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenAuthModal();
            }}
            className="bg-[#0b4d34] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer"
          >
            {user.isLoggedIn ? 'Account' : 'Sign In'}
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 divide-y divide-gray-100">
          
          {/* 1. Quick Location & Prescription Actions */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenLocationModal();
              }}
              className="w-full bg-gray-50 hover:bg-gray-100 p-2.5 rounded-xl border border-gray-200/80 flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ea580c]" />
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Delivering to</div>
                  <div className="text-xs font-bold text-slate-800">
                    {currentLocation.pincode} • {currentLocation.locality}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenPrescriptionModal();
              }}
              className="w-full bg-emerald-50 hover:bg-emerald-100/80 p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0b4d34]" />
                <div>
                  <div className="text-xs font-bold text-[#0b4d34]">Upload Prescription</div>
                  <div className="text-[10px] text-emerald-700">Order medicines in 3 minutes</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#0b4d34]" />
            </button>
          </div>

          {/* 2. Pharmacy Categories Accordion */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Shop By Category ({CATEGORIES.length})
              </span>
              <button
                onClick={() => {
                  onClose();
                  onNavigateAllCategories();
                }}
                className="text-[11px] font-bold text-[#0b4d34] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => {
                const isExpanded = expandedCategoryId === cat.id;

                return (
                  <div key={cat.id} className="rounded-xl border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between p-2.5 bg-gray-50/70 hover:bg-gray-100/70 transition-colors">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectCategory(cat.id);
                        }}
                        className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-[#0b4d34] text-left flex-1 cursor-pointer truncate"
                      >
                        <span className="text-[#0b4d34]">
                          {iconMap[cat.iconName] || <Pill className="w-4 h-4" />}
                        </span>
                        <span className="truncate">{cat.name}</span>
                      </button>

                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                        aria-label={`Expand ${cat.name}`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-[#0b4d34]' : ''}`} />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="p-2 bg-white border-t border-gray-100 space-y-1">
                        {cat.subcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              onClose();
                              onSelectCategory(cat.id, sub);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-[#0b4d34] hover:bg-emerald-50 flex items-center justify-between cursor-pointer"
                          >
                            <span>{sub}</span>
                            <ChevronRight className="w-3 h-3 text-slate-300" />
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            onClose();
                            onSelectCategory(cat.id);
                          }}
                          className="w-full mt-1 bg-emerald-50 hover:bg-emerald-100 text-[#0b4d34] text-[11px] font-bold py-1.5 rounded-lg text-center cursor-pointer"
                        >
                          View all in {cat.name}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Essential Customer Services */}
          <div className="pt-4 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Services & Help
            </span>

            <button
              onClick={() => {
                onClose();
                onOpenOffersModal();
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#ea580c] hover:bg-orange-50 cursor-pointer"
            >
              <Tag className="w-4 h-4 text-[#ea580c]" />
              <span>Pharmacy Discounts & Offers</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenTrackingModal();
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0b4d34] hover:bg-emerald-50 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#0b4d34]" />
              <span>Track Active Orders</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenAppModal();
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0b4d34] hover:bg-emerald-50 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-[#0b4d34]" />
              <span>Download MediCare+ App</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenSupportModal();
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0b4d34] hover:bg-emerald-50 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#0b4d34]" />
              <span>24/7 Support & Pharmacist Help</span>
            </button>
          </div>

          {/* 4. Contact Footer */}
          <div className="pt-4 pb-2 text-xs text-slate-500 space-y-1.5">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#0b4d34]" />
              <a href="tel:+918471009009" className="hover:underline font-semibold">
                +91 847 100 9009
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#0b4d34]" />
              <a href="mailto:care@medicare.com" className="hover:underline font-semibold">
                care@medicare.com
              </a>
            </div>
            <p className="text-[10px] text-slate-400 pt-2">
              © 2026 MediCare+ Pharmacy. All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
