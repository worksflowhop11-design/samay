import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Coins, 
  Truck, 
  FileText, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { CartItem, LocationData, UserProfile } from '../types';
import { COUPONS } from '../data/categories';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currentLocation: LocationData;
  user: UserProfile;
  onProceedToCheckout: (appliedCoupon: string | null, coinsUsed: number) => void;
  onOpenPrescriptionModal: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentLocation,
  user,
  onProceedToCheckout,
  onOpenPrescriptionModal
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [useCoins, setUseCoins] = useState(false);

  if (!isOpen) return null;

  // Price calculations
  const mrpTotal = cartItems.reduce((acc, item) => acc + (item.product.mrp * item.quantity), 0);
  const itemTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalSavings = mrpTotal - itemTotal;

  // Free delivery calculation (Free above ₹499)
  const FREE_DELIVERY_THRESHOLD = 499;
  const rawDeliveryFee = itemTotal >= FREE_DELIVERY_THRESHOLD || appliedCouponCode === 'FREESHIP' ? 0 : 40;
  const amountNeededForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - itemTotal);

  // Coupon discount calculation
  let couponDiscount = 0;
  if (appliedCouponCode) {
    const coupon = COUPONS.find(c => c.code === appliedCouponCode);
    if (coupon) {
      if (itemTotal >= coupon.minOrder) {
        if (coupon.discountPercent > 0) {
          const rawDiscount = (itemTotal * coupon.discountPercent) / 100;
          couponDiscount = coupon.maxDiscount ? Math.min(rawDiscount, coupon.maxDiscount) : rawDiscount;
        }
      }
    }
  }

  // Coins discount (1 coin = ₹1, up to max 100 or user coins)
  const coinsDiscount = useCoins ? Math.min(user.coins, 100, itemTotal) : 0;

  const finalAmount = Math.max(0, itemTotal - couponDiscount - coinsDiscount + rawDeliveryFee);
  const hasRxItems = cartItems.some(i => i.product.requiresPrescription);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError(null);

    const coupon = COUPONS.find(c => c.code === code);
    if (!coupon) {
      setCouponError('Invalid coupon code. Try PHARM20 or MEDICARE25.');
      return;
    }

    if (itemTotal < coupon.minOrder) {
      setCouponError(`Add items worth ₹${coupon.minOrder - itemTotal} more to use ${code}.`);
      return;
    }

    setAppliedCouponCode(code);
    setCouponInput('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCouponCode(null);
    setCouponError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0b4d34] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">My Pharmacy Cart</h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items in Cart
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Location Indicator Bar */}
          <div className="px-4 py-2 bg-[#f3f4f6] border-b border-gray-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Truck className="w-3.5 h-3.5 text-[#0b4d34]" />
              <span>Delivering to:</span>
              <strong className="text-[#ea580c]">{currentLocation.pincode}</strong>
              <span className="text-slate-500 truncate max-w-[120px]">({currentLocation.locality})</span>
            </div>
            <span className="text-emerald-700 font-bold text-[11px]">
              ⚡ {currentLocation.deliveryTime}
            </span>
          </div>

          {/* Free Delivery Goal Progress */}
          {cartItems.length > 0 && (
            <div className="px-4 py-2 bg-emerald-50/70 border-b border-emerald-100 text-xs">
              {amountNeededForFree > 0 ? (
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold text-emerald-900 text-[11px]">
                    <span>Add <strong>₹{amountNeededForFree}</strong> more for <strong>FREE Delivery</strong></span>
                    <span>₹{itemTotal}/₹{FREE_DELIVERY_THRESHOLD}</span>
                  </div>
                  <div className="w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#0b4d34] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (itemTotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Congratulations! You qualify for <strong>FREE Delivery</strong></span>
                </div>
              )}
            </div>
          )}

          {/* Cart Items List */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">Your Cart is Empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore our wide range of medicines, health devices, baby care & vitamins.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#0b4d34] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#083a27] transition-all shadow-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Prescription Notice if cart has Rx items */}
                {hasRxItems && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-900">
                    <FileText className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold">Prescription Required</span>
                      <p className="text-[11px] text-rose-700 mt-0.5">
                        Cart contains prescription items. You will be prompted to attach your Rx during checkout.
                      </p>
                    </div>
                  </div>
                )}

                {/* Items */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-3 flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-xl border border-gray-200 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="text-xs font-bold text-slate-800 line-clamp-1">
                            {item.product.name}
                          </h5>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[10px] text-slate-500 font-medium">
                          {item.product.packSize}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                              ₹{item.product.price * item.quantity}
                            </span>
                            {item.product.mrp > item.product.price && (
                              <span className="text-[10px] text-slate-400 line-through">
                                ₹{item.product.mrp * item.quantity}
                              </span>
                            )}
                          </div>

                          {/* Stepper */}
                          <div className="flex items-center gap-1.5 bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded bg-white text-slate-700 hover:bg-gray-200 flex items-center justify-center font-bold text-xs shadow-2xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1.5 text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded bg-[#0b4d34] text-white hover:bg-[#083a27] flex items-center justify-center font-bold text-xs shadow-2xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Apply Coupon / Voucher
                  </span>

                  {appliedCouponCode ? (
                    <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#0b4d34]" />
                        <div>
                          <div className="text-xs font-bold text-[#0b4d34] flex items-center gap-1.5">
                            <span>{appliedCouponCode}</span>
                            <span className="text-[10px] bg-emerald-200 text-[#0b4d34] px-1.5 rounded">Applied</span>
                          </div>
                          <div className="text-[10px] text-emerald-700 font-medium">
                            Saved ₹{Math.round(couponDiscount)} with this coupon
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-xs font-bold text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Enter coupon code (e.g. PHARM20)"
                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-xl text-xs uppercase font-bold focus:outline-none focus:ring-2 focus:ring-[#0b4d34]"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        disabled={!couponInput.trim()}
                        className="bg-[#0b4d34] hover:bg-[#083a27] disabled:opacity-50 text-white text-xs font-bold px-4 py-1.5 rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                  )}

                  {/* Quick Clickable Suggestion Pill */}
                  {!appliedCouponCode && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-600">
                      <span>Popular:</span>
                      <button
                        onClick={() => handleApplyCoupon('PHARM20')}
                        className="font-bold text-[#ea580c] bg-orange-50 px-2 py-0.5 rounded border border-orange-200 hover:bg-orange-100"
                      >
                        PHARM20 (20% OFF)
                      </button>
                    </div>
                  )}
                </div>

                {/* MediCare Coins Deduction Toggle */}
                {user.coins > 0 && (
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-400 text-amber-900 flex items-center justify-center">
                        <Coins className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Redeem {user.coins} MediCare Coins
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Get extra discount on this order
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useCoins}
                        onChange={(e) => setUseCoins(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0b4d34]" />
                    </label>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Drawer Footer & Bill Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
              
              {/* Bill Details */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span className="font-semibold text-slate-800">₹{mrpTotal}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Product Discount</span>
                    <span className="font-bold">-₹{totalSavings}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Discount ({appliedCouponCode})</span>
                    <span>-₹{Math.round(couponDiscount)}</span>
                  </div>
                )}
                {coinsDiscount > 0 && (
                  <div className="flex justify-between text-amber-700 font-bold">
                    <span>Coins Redeemed</span>
                    <span>-₹{coinsDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  {rawDeliveryFee === 0 ? (
                    <span className="font-bold text-emerald-700">FREE</span>
                  ) : (
                    <span className="font-semibold text-slate-800">₹{rawDeliveryFee}</span>
                  )}
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-slate-900">
                  <span>Total Payable Amount</span>
                  <span className="text-base text-[#0b4d34]">₹{Math.round(finalAmount)}</span>
                </div>
              </div>

              {/* Total Savings Highlight Pill */}
              <div className="bg-emerald-100 text-[#0b4d34] text-[11px] font-bold py-1.5 px-3 rounded-lg text-center">
                🎉 You are saving ₹{Math.round(totalSavings + couponDiscount + coinsDiscount)} on this order!
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => {
                  onProceedToCheckout(appliedCouponCode, useCoins ? coinsDiscount : 0);
                }}
                className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
