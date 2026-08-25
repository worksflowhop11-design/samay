import React, { useState } from 'react';
import { X, Tag, Copy, Check, Percent, Sparkles } from 'lucide-react';
import { COUPONS } from '../data/categories';

interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (code: string) => void;
}

export const OffersModal: React.FC<OffersModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const bankOffers = [
    {
      bank: 'HDFC Bank',
      offer: 'Flat ₹150 Cashback on Debit & Credit cards',
      minOrder: 'Min order ₹1,000',
      code: 'HDFCMEDI'
    },
    {
      bank: 'ICICI Bank',
      offer: 'Instant 10% Discount up to ₹200',
      minOrder: 'Min order ₹1,200',
      code: 'ICICICARE'
    },
    {
      bank: 'CRED Pay',
      offer: 'Get up to 500 CRED coins + ₹75 cashback',
      minOrder: 'Min order ₹500',
      code: 'CREDPAY'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ea580c] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg">Exclusive Offers & Coupons</h3>
              <p className="text-xs text-slate-500 font-medium">
                Save big on medications and wellness essentials
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5">
              Available Store Coupons
            </h4>
            <div className="space-y-3">
              {COUPONS.map((coupon) => (
                <div
                  key={coupon.code}
                  className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 relative overflow-hidden"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-[#0b4d34] bg-white px-2.5 py-0.5 rounded-lg border border-emerald-300 shadow-2xs">
                        {coupon.code}
                      </span>
                      <span className="text-xs font-extrabold text-[#ea580c]">
                        {coupon.discountPercent > 0 ? `${coupon.discountPercent}% OFF` : 'Special Discount'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{coupon.description}</p>
                    <p className="text-[10px] text-slate-500">Min. cart value ₹{coupon.minOrder}</p>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onApplyCoupon(coupon.code);
                        onClose();
                      }}
                      className="bg-[#0b4d34] hover:bg-[#083a27] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
                    >
                      Apply Code
                    </button>
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="text-[10px] font-bold text-slate-600 hover:text-[#0b4d34] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {copiedCode === coupon.code ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode === coupon.code ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5">
              Partner Bank Discounts
            </h4>
            <div className="space-y-2.5">
              {bankOffers.map((bank, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-800">{bank.bank}</div>
                    <div className="text-slate-600 text-[11px]">{bank.offer} • {bank.minOrder}</div>
                  </div>
                  <span className="font-mono font-bold text-slate-700 bg-white px-2 py-1 rounded border border-gray-300 text-[11px]">
                    {bank.code}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
