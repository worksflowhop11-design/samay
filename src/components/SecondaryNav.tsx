import React, { useState } from 'react';
import { 
  Menu,
  ChevronDown, 
  Sparkles, 
  Percent,
  Pill, 
  Apple, 
  Activity, 
  Leaf, 
  HeartHandshake, 
  Smile, 
  Heart,
  Droplets,
  Stethoscope,
  ShieldAlert,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface SecondaryNavProps {
  activeCategory: string;
  onSelectCategory: (catId: string, subCategory?: string) => void;
  onNavigateAllCategories?: () => void;
  onOpenOffersModal?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Pill: <Pill className="w-3.5 h-3.5" />,
  Apple: <Apple className="w-3.5 h-3.5" />,
  Activity: <Activity className="w-3.5 h-3.5" />,
  Sparkles: <Sparkles className="w-3.5 h-3.5" />,
  HeartHandshake: <HeartHandshake className="w-3.5 h-3.5" />,
  Leaf: <Leaf className="w-3.5 h-3.5" />,
  Stethoscope: <Stethoscope className="w-3.5 h-3.5" />,
  Droplets: <Droplets className="w-3.5 h-3.5" />,
  ShieldAlert: <ShieldAlert className="w-3.5 h-3.5" />,
  Smile: <Smile className="w-3.5 h-3.5" />,
  Heart: <Heart className="w-3.5 h-3.5" />
};

export const SecondaryNav: React.FC<SecondaryNavProps> = ({
  activeCategory,
  onSelectCategory,
  onNavigateAllCategories,
  onOpenOffersModal
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);

  // Categories listed in the horizontal navigation
  const navCategories = [
    { id: 'medicines', name: 'Medicines' },
    { id: 'vitamins', name: 'Vitamins & Supplements' },
    { id: 'nutrition', name: 'Diet & Nutrition' },
    { id: 'devices', name: 'Health Devices' },
    { id: 'personal-care', name: 'Personal Care' },
    { id: 'baby-care', name: 'Baby Care' },
    { id: 'ayurveda', name: 'Ayurveda' },
    { id: 'health-corner', name: 'Health Corner' }
  ];

  return (
    <nav className="bg-white border-b border-gray-100 hidden lg:block relative z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          
          {/* Left: Solid Dark Green "Categories" Button */}
          <div className="relative">
            <button
              id="nav-categories-mega-btn"
              onClick={() => {
                if (onNavigateAllCategories) {
                  onNavigateAllCategories();
                } else {
                  setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
                }
              }}
              onMouseEnter={() => setIsCategoriesMenuOpen(true)}
              className="bg-[#1B5E20] hover:bg-[#144818] text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all shadow-xs cursor-pointer group"
            >
              <Menu className="w-4 h-4" />
              <span>Categories</span>
            </button>

            {/* Quick Dropdown on Hover/Click */}
            {isCategoriesMenuOpen && (
              <div 
                onMouseLeave={() => setIsCategoriesMenuOpen(false)}
                className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setIsCategoriesMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#1B5E20] hover:bg-emerald-50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-slate-400 group-hover:text-[#1B5E20]">
                          {iconMap[cat.iconName] || <Pill className="w-3.5 h-3.5" />}
                        </span>
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">({cat.itemCount}+)</span>
                    </button>
                  ))}
                </div>

                {onNavigateAllCategories && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setIsCategoriesMenuOpen(false);
                        onNavigateAllCategories();
                      }}
                      className="w-full bg-emerald-50 hover:bg-emerald-100 text-[#1B5E20] text-[11px] font-bold py-2 rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>View All Categories</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Center Links: Matches screenshot exactly */}
          <div className="flex items-center gap-1 xl:gap-2">
            {navCategories.map((item) => {
              const fullCategory = CATEGORIES.find(c => c.id === item.id);
              const isActive = activeCategory === item.id;
              const isHovered = hoveredCategory === item.id;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredCategory(item.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="relative py-1"
                >
                  <button
                    id={`nav-link-${item.id}`}
                    onClick={() => onSelectCategory(item.id)}
                    className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'text-[#1B5E20] bg-emerald-50 font-bold'
                        : isHovered
                        ? 'text-[#1B5E20] bg-gray-50'
                        : 'text-slate-700 hover:text-[#1B5E20]'
                    }`}
                  >
                    <span>{item.name}</span>
                  </button>

                  {/* Subcategory Hover Flyout */}
                  {isHovered && fullCategory && fullCategory.subcategories.length > 0 && (
                    <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 animate-in fade-in slide-in-from-top-1 z-50">
                      <div className="text-[11px] font-bold text-[#1B5E20] pb-1.5 mb-1.5 border-b border-gray-100 flex items-center justify-between">
                        <span>{fullCategory.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{fullCategory.itemCount}+ Items</span>
                      </div>
                      <div className="space-y-1">
                        {fullCategory.subcategories.slice(0, 5).map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              onSelectCategory(fullCategory.id, sub);
                              setHoveredCategory(null);
                            }}
                            className="w-full text-left px-2 py-1 rounded-lg text-xs font-medium text-slate-600 hover:text-[#1B5E20] hover:bg-emerald-50/70 transition-colors flex items-center justify-between group cursor-pointer"
                          >
                            <span className="truncate">{sub}</span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#1B5E20] transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: "Save More" Pill Button with percentage icon */}
          <div className="shrink-0">
            <button
              id="nav-save-more-btn"
              onClick={onOpenOffersModal}
              className="bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#E11D48] border border-[#FECDD3] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer group"
            >
              <Percent className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>Save More</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

