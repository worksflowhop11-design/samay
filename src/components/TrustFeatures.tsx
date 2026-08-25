import React from 'react';
import { ShieldCheck, Truck, Lock, PackageCheck, Headphones } from 'lucide-react';

export const TrustFeatures: React.FC = () => {
  const features = [
    {
      id: 'genuine',
      icon: <ShieldCheck className="w-5 h-5 text-[#1B5E20]" />,
      title: '100% Genuine Medicines',
      subtitle: 'Sourced Directly from Trusted Partners'
    },
    {
      id: 'delivery',
      icon: <Truck className="w-5 h-5 text-[#1B5E20]" />,
      title: 'Fast & Reliable Delivery',
      subtitle: 'On time, every time'
    },
    {
      id: 'payment',
      icon: <Lock className="w-5 h-5 text-[#1B5E20]" />,
      title: 'Secure Payments',
      subtitle: '100% Secure Payments'
    },
    {
      id: 'returns',
      icon: <PackageCheck className="w-5 h-5 text-[#1B5E20]" />,
      title: 'Easy Returns',
      subtitle: '7 days easy return policy'
    },
    {
      id: 'support',
      icon: <Headphones className="w-5 h-5 text-[#1B5E20]" />,
      title: '24/7 Customer Support',
      subtitle: 'We are here to help you anytime'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-8 sm:mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {features.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs hover:shadow-xs transition-shadow flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1B5E20] flex items-center justify-center shrink-0 border border-emerald-100">
              {f.icon}
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                {f.title}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5">
                {f.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

