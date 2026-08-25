import React, { useState } from 'react';
import { 
  ChevronRight, 
  Search, 
  ArrowRight, 
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
  ShieldCheck
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface AllCategoriesPageProps {
  onSelectCategory: (categoryId: string) => void;
  onNavigateHome: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Pill: <Pill className="w-8 h-8 text-[#0b4d34]" />,
  Apple: <Apple className="w-8 h-8 text-[#0b4d34]" />,
  Activity: <Activity className="w-8 h-8 text-[#0b4d34]" />,
  Sparkles: <Sparkles className="w-8 h-8 text-[#0b4d34]" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8 text-[#0b4d34]" />,
  Leaf: <Leaf className="w-8 h-8 text-[#0b4d34]" />,
  Stethoscope: <Stethoscope className="w-8 h-8 text-[#0b4d34]" />,
  Droplets: <Droplets className="w-8 h-8 text-[#0b4d34]" />,
  ShieldAlert: <ShieldAlert className="w-8 h-8 text-[#0b4d34]" />,
  Smile: <Smile className="w-8 h-8 text-[#0b4d34]" />,
  Heart: <Heart className="w-8 h-8 text-[#0b4d34]" />
};

export const AllCategoriesPage: React.FC<AllCategoriesPageProps> = ({
  onSelectCategory,
  onNavigateHome
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-6">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[#0b4d34] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0b4d34] font-bold">
            All Healthcare Categories
          </span>
        </nav>

        {/* Page Header */}
        <div className="bg-gradient-to-br from-[#0b4d34] to-[#063c27] rounded-3xl p-6 sm:p-10 text-white mb-10 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-700/50 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-emerald-100 mb-3 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Full Pharmacy Department Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
              Explore All Categories
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed mb-6">
              Browse our comprehensive selection of over 10,000+ prescription drugs, daily vitamins, clinical health devices, mother & baby care, and ayurvedic formulations.
            </p>

            {/* Quick Search */}
            <div className="relative max-w-lg">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search category or health condition..."
                className="w-full pl-10 pr-4 py-3 bg-white text-slate-900 rounded-2xl text-xs sm:text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="bg-white rounded-2xl border border-gray-200/90 p-5 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 group-hover:bg-[#0b4d34] flex items-center justify-center transition-colors">
                    <div className="group-hover:text-white transition-colors">
                      {iconMap[cat.iconName] || <Pill className="w-8 h-8 text-[#0b4d34]" />}
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold text-[#0b4d34] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    {cat.itemCount}+ Items
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0b4d34] transition-colors mb-1.5">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                  {cat.bannerHeadline || `Quality tested ${cat.name.toLowerCase()} formulations and everyday essentials.`}
                </p>

                {/* Subcategories Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cat.subcategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className="text-[10px] bg-gray-100 text-slate-600 font-medium px-2 py-0.5 rounded-md"
                    >
                      {sub}
                    </span>
                  ))}
                  {cat.subcategories.length > 3 && (
                    <span className="text-[10px] bg-gray-100 text-slate-400 font-medium px-2 py-0.5 rounded-md">
                      +{cat.subcategories.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0b4d34] group-hover:text-[#ea580c] transition-colors">
                <span>View Products</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
            <h3 className="text-base font-bold text-slate-800 mb-1">
              No categories found matching "{searchTerm}"
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Try checking your spelling or search with a generic keyword.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-[#0b4d34] text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
