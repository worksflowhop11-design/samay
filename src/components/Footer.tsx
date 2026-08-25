import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  Truck, 
  CreditCard, 
  FileText,
  Lock
} from 'lucide-react';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenPrescriptionModal: () => void;
  onOpenTrackOrderModal: () => void;
  onOpenSupportModal: () => void;
  onOpenOffersModal: () => void;
  onOpenAppModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPrescriptionModal,
  onOpenTrackOrderModal,
  onOpenSupportModal,
  onOpenOffersModal,
  onOpenAppModal
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 sm:mt-20 border-t-4 border-[#0b4d34]">
      
      {/* Top Banner / Trust Strip */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/60">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white">100% Genuine Medicines</div>
              <div className="text-slate-400 text-[11px]">Sourced directly from licensed pharma companies</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/60">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white">19,000+ PIN Codes</div>
              <div className="text-slate-400 text-[11px]">Nationwide express delivery coverage</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/60">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white">Secure Encrypted Payments</div>
              <div className="text-slate-400 text-[11px]">256-bit SSL encrypted checkout</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/60">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white">24/7 Pharmacist Help</div>
              <div className="text-slate-400 text-[11px]">+91 847 100 9009 • care@medicare.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0b4d34] flex items-center justify-center text-white font-black text-lg shadow-sm">
                +
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-black text-xl text-white tracking-tight">MediCare</span>
                <span className="text-[#ea580c] font-black text-xl">+</span>
                <span className="text-xs text-emerald-400 font-bold uppercase ml-1">Pharmacy</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              MediCare+ Pharmacy is your trusted healthcare destination. Delivering authentic prescription medicines, health devices, daily vitamins, and clinical wellness products straight to your doorstep across India.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Helpline: +91 847 100 9009 (24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Support: care@medicare.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={onOpenSupportModal} className="hover:text-white transition-colors cursor-pointer">About Us</button></li>
              <li><button onClick={onOpenSupportModal} className="hover:text-white transition-colors cursor-pointer">Careers</button></li>
              <li><button onClick={onOpenSupportModal} className="hover:text-white transition-colors cursor-pointer">Contact Us</button></li>
              <li><button onClick={onOpenAppModal} className="hover:text-white transition-colors cursor-pointer">Mobile App</button></li>
              <li><button onClick={onOpenOffersModal} className="hover:text-white transition-colors cursor-pointer">Offers & Deals</button></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={onOpenSupportModal} className="hover:text-white transition-colors cursor-pointer">Help Center & FAQs</button></li>
              <li><button onClick={onOpenTrackOrderModal} className="hover:text-white transition-colors cursor-pointer">Track Order Status</button></li>
              <li><button onClick={onOpenPrescriptionModal} className="hover:text-white transition-colors cursor-pointer">Upload Prescription</button></li>
              <li><button onClick={onOpenSupportModal} className="hover:text-white transition-colors cursor-pointer">Return & Refund Policy</button></li>
              <li><button onClick={onOpenSupportModal} className="hover:text-white transition-colors cursor-pointer">Shipping & Delivery Info</button></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onSelectCategory('medicines')} className="hover:text-white transition-colors cursor-pointer">Prescription Medicines</button></li>
              <li><button onClick={() => onSelectCategory('vitamins')} className="hover:text-white transition-colors cursor-pointer">Vitamins & Nutrition</button></li>
              <li><button onClick={() => onSelectCategory('devices')} className="hover:text-white transition-colors cursor-pointer">Health Devices & BP Monitors</button></li>
              <li><button onClick={() => onSelectCategory('personal_care')} className="hover:text-white transition-colors cursor-pointer">Personal Care & Derma</button></li>
              <li><button onClick={() => onSelectCategory('baby_care')} className="hover:text-white transition-colors cursor-pointer">Baby Care Essentials</button></li>
              <li><button onClick={() => onSelectCategory('ayurveda')} className="hover:text-white transition-colors cursor-pointer">Ayurveda & Herbs</button></li>
              <li><button onClick={() => onSelectCategory('diabetes')} className="hover:text-white transition-colors cursor-pointer">Diabetes Care</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 MediCare+ Pharmacy Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#terms" onClick={(e) => { e.preventDefault(); onOpenSupportModal(); }} className="hover:text-slate-300">Terms of Service</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); onOpenSupportModal(); }} className="hover:text-slate-300">Privacy Policy</a>
            <a href="#security" onClick={(e) => { e.preventDefault(); onOpenSupportModal(); }} className="hover:text-slate-300">Prescription Policy</a>
            <a href="#security" onClick={(e) => { e.preventDefault(); onOpenSupportModal(); }} className="hover:text-slate-300">Drug Safety</a>
          </div>
        </div>

      </div>

    </footer>
  );
};
