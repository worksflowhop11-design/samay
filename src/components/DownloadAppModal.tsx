import React, { useState } from 'react';
import { X, Smartphone, QrCode, Check, Send, Apple, Play } from 'lucide-react';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Configured placeholder App Store URLs
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.medicare.pharmacy';
const APP_STORE_URL = 'https://apps.apple.com/app/medicare-pharmacy/id1234567890';

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [linkSent, setLinkSent] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'all' | 'android' | 'ios'>('all');

  if (!isOpen) return null;

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setLinkSent(true);
      setTimeout(() => setLinkSent(false), 4000);
      setPhoneNumber('');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-app-modal-title"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b4d34] text-white flex items-center justify-center shadow-xs">
              <Smartphone className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 id="download-app-modal-title" className="font-extrabold text-slate-800 text-lg">
                Get MediCare+ App
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Get Extra 5% OFF on your first in-app order
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4">
          
          {/* QR Code Container */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 inline-block mx-auto">
            <div className="w-36 h-36 bg-white p-2.5 rounded-xl border border-gray-200 flex flex-col items-center justify-center relative shadow-sm">
              <QrCode className="w-28 h-28 text-[#0b4d34]" />
              <div className="text-[9px] font-bold text-slate-700 mt-1">Scan with Camera</div>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
            Scan the QR code with your mobile camera to download the MediCare+ app for Android or iOS.
          </p>

          {/* Store Download Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all text-left shadow-xs group"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Get it on</div>
                <div className="text-xs font-bold text-white truncate">Google Play</div>
              </div>
            </a>

            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all text-left shadow-xs group"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Apple className="w-4 h-4 fill-current text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Download on</div>
                <div className="text-xs font-bold text-white truncate">App Store</div>
              </div>
            </a>
          </div>

          {/* SMS Link Alternative */}
          <div className="border-t border-gray-100 pt-3">
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Or receive download link via SMS:
            </span>
            <form onSubmit={handleSendLink} className="flex gap-2">
              <input
                type="tel"
                maxLength={10}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 10-digit mobile"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0b4d34] outline-hidden"
              />
              <button
                type="submit"
                className="bg-[#0b4d34] hover:bg-[#083a27] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
              >
                <Send className="w-3 h-3" />
                <span>Send</span>
              </button>
            </form>
            {linkSent && (
              <p className="text-xs text-emerald-700 font-bold mt-2 flex items-center justify-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>App download link sent via SMS!</span>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
