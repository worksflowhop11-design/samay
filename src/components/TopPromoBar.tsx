import React, { useState } from 'react';
import { Copy, Check, Smartphone, Package, Headphones } from 'lucide-react';

interface TopPromoBarProps {
  onOpenAppModal: () => void;
  onOpenTrackingModal: () => void;
  onOpenSupportModal: () => void;
}

export const TopPromoBar: React.FC<TopPromoBarProps> = ({
  onOpenAppModal,
  onOpenTrackingModal,
  onOpenSupportModal
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('PHARM20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#0b4d34] text-white text-xs md:text-sm font-medium py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left Side Promo Offer */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 font-normal text-emerald-100">
            <span className="text-base" role="img" aria-label="gift">🎁</span>
            <span>Flat <strong className="text-white font-bold">20% OFF</strong> on your first order</span>
          </div>

          <button
            id="copy-code-pill-btn"
            onClick={handleCopyCode}
            aria-label="Copy coupon code PHARM20"
            className="inline-flex items-center gap-1 bg-white text-[#0b4d34] font-bold px-3 py-0.5 rounded-full text-xs hover:bg-emerald-50 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span>Use Code:</span>
            <span className="text-orange-600 font-extrabold tracking-wide">PHARM20</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-700 ml-0.5" />
            ) : (
              <Copy className="w-3 h-3 text-gray-500 ml-0.5" />
            )}
          </button>

          {copied && (
            <span className="text-[11px] text-emerald-300 font-semibold animate-pulse">
              Code copied!
            </span>
          )}
        </div>

        {/* Right Side Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-emerald-100 text-xs">
          <button
            id="top-nav-download-app-btn"
            onClick={onOpenAppModal}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Download App</span>
          </button>

          <button
            id="top-nav-track-order-btn"
            onClick={onOpenTrackingModal}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </button>

          <button
            id="top-nav-need-help-btn"
            onClick={onOpenSupportModal}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Need Help?</span>
          </button>
        </div>
      </div>
    </div>
  );
};
