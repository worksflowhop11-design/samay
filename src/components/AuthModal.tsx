import React, { useState } from 'react';
import { X, Smartphone, Mail, ShieldCheck, Check, ArrowRight, User, Loader2 } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onLoginSuccess: (updatedUser: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLoginSuccess,
  onLogout
}) => {
  const [method, setMethod] = useState<'mobile' | 'email'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'mobile' && (!mobileNumber || mobileNumber.length < 10)) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (method === 'email' && !emailInput) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
      setOtpInput('123456'); // Auto-fill demo OTP for delightful quick test!
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const profile: UserProfile = {
        name: userName.trim() || (method === 'mobile' ? `User ${mobileNumber.slice(-4)}` : emailInput.split('@')[0]),
        phone: mobileNumber || '9876543210',
        email: emailInput || 'care@medicare.com',
        coins: 150, // Welcome bonus
        isLoggedIn: true,
        savedAddresses: user.savedAddresses
      };
      onLoginSuccess(profile);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b4d34] text-white flex items-center justify-center shadow-xs">
              <User className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg">
                {user.isLoggedIn ? 'My Account' : 'Sign In / Sign Up'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {user.isLoggedIn ? 'Manage profile & rewards' : 'Access orders, prescriptions & rewards'}
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
        <div className="p-5 space-y-4">
          {user.isLoggedIn ? (
            /* Logged in state view */
            <div className="space-y-4">
              <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base">{user.name}</h4>
                  <p className="text-xs text-slate-600 font-medium">{user.phone} • {user.email}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                    🪙 {user.coins} Coins
                  </span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">MediCare+ Club Member</div>
                <p>Enjoy 3X coins on every order & priority express dispatch.</p>
              </div>

              <div className="pt-2 flex justify-between gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-[#0b4d34] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#083a27] transition-all"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-rose-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : !otpStep ? (
            /* Send OTP Form */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="flex rounded-xl bg-gray-100 p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setMethod('mobile')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    method === 'mobile' ? 'bg-white text-[#0b4d34] shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Mobile OTP
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    method === 'email' ? 'bg-white text-[#0b4d34] shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Email
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {method === 'mobile' ? 'Mobile Number (10-Digit)' : 'Email Address'}
                </label>
                {method === 'mobile' ? (
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-xs font-bold text-slate-600">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="98765 43210"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-xl text-sm font-semibold focus:ring-2 focus:ring-[#0b4d34]"
                    />
                  </div>
                ) : (
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#0b4d34]"
                  />
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Your Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#0b4d34]"
                />
              </div>

              <div className="text-[11px] text-slate-500 flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>We never share your personal health or contact details. By continuing, you agree to our Terms.</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0b4d34] hover:bg-[#083a27] text-white font-extrabold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Verify OTP Form */
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in">
              <div className="text-center">
                <div className="text-xs text-slate-500">
                  Enter 6-digit OTP sent to <strong className="text-slate-800">{mobileNumber ? `+91 ${mobileNumber}` : emailInput}</strong>
                </div>
                <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
                  (Demo OTP auto-filled: 123456)
                </div>
              </div>

              <div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center tracking-[0.5em] text-xl font-black py-2.5 border border-emerald-400 rounded-xl focus:ring-2 focus:ring-[#0b4d34] bg-emerald-50/40"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || otpInput.length < 6}
                className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Verify & Login</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Change mobile number
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
