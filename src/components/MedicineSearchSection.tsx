import React, { useState } from 'react';
import { Pill, FileUp, Search, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface MedicineSearchSectionProps {
  onSearch: (query: string) => void;
  onOpenPrescriptionModal: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export const MedicineSearchSection: React.FC<MedicineSearchSectionProps> = ({
  onSearch,
  onOpenPrescriptionModal,
  onSelectCategory
}) => {
  const [quickQuery, setQuickQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      onSearch(quickQuery.trim());
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-4 sm:mt-6">
      {/* Large White Rounded Action Card */}
      <div className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-lg border border-gray-100/90 transition-all hover:shadow-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          
          {/* Left Action Box: Order Medicines */}
          <div 
            onClick={() => onSelectCategory('medicines')}
            className="flex items-center gap-3.5 w-full lg:w-auto p-2.5 sm:px-4 sm:py-3 rounded-2xl hover:bg-emerald-50/60 transition-all cursor-pointer group shrink-0 border border-transparent hover:border-emerald-200"
            id="order-medicines-quick-action"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0b4d34] group-hover:bg-[#0b4d34] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs shrink-0">
              <Pill className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-black text-slate-800 group-hover:text-[#0b4d34] leading-tight flex items-center gap-1.5">
                <span>Order Medicines</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#0b4d34]" />
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-emerald-700 mt-0.5">
                Save upto 25%
              </p>
            </div>
          </div>

          {/* Center: Large Search Field */}
          <div className="w-full flex-1 max-w-2xl">
            <form onSubmit={handleSubmit} className="flex items-center w-full">
              <div className="relative flex-1">
                <input
                  id="medicine-quick-search-input"
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Search for medicines, health products..."
                  className="w-full pl-4 sm:pl-5 pr-4 py-3 sm:py-3.5 bg-gray-50/80 hover:bg-gray-50 focus:bg-white border-2 border-gray-200 focus:border-[#ea580c] rounded-l-2xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none transition-all placeholder:text-gray-400 shadow-inner"
                />
              </div>
              <button
                type="submit"
                id="medicine-quick-search-submit-btn"
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold px-6 sm:px-9 py-3 sm:py-3.5 rounded-r-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* Right Action Box: Upload Prescription */}
          <div 
            onClick={onOpenPrescriptionModal}
            className="flex items-center gap-3.5 w-full lg:w-auto p-2.5 sm:px-4 sm:py-3 rounded-2xl hover:bg-emerald-50/60 transition-all cursor-pointer group shrink-0 border border-transparent hover:border-emerald-200"
            id="upload-prescription-quick-action"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0b4d34] group-hover:bg-[#0b4d34] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs shrink-0">
              <FileUp className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-black text-slate-800 group-hover:text-[#0b4d34] leading-tight flex items-center gap-1.5">
                <span>Upload Prescription</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#0b4d34]" />
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                Quick & Easy
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
