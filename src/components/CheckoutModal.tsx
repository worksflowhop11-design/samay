import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle, 
  FileText, 
  Smartphone, 
  Wallet, 
  Banknote, 
  Clock, 
  ArrowRight,
  ChevronRight,
  AlertCircle,
  Loader2,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, LocationData, Order, Prescription, UserProfile, Address } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentLocation: LocationData;
  appliedCoupon: string | null;
  coinsUsed: number;
  user: UserProfile;
  uploadedPrescriptions: Prescription[];
  onOrderPlaced: (order: Order) => void;
  onOpenPrescriptionModal: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currentLocation,
  appliedCoupon,
  coinsUsed,
  user,
  uploadedPrescriptions,
  onOrderPlaced,
  onOpenPrescriptionModal
}) => {
  const [step, setStep] = useState<'address' | 'delivery' | 'payment' | 'confirmed'>('address');
  
  // Address state
  const [fullName, setFullName] = useState(user.name || 'Rahul Sharma');
  const [phoneNumber, setPhoneNumber] = useState(user.phone || '9876543210');
  const [addressLine, setAddressLine] = useState('Flat 402, Green Meadows Apartment, Main Road');
  const [locality, setLocality] = useState(currentLocation.locality);
  const [pincode, setPincode] = useState(currentLocation.pincode);
  const [city, setCity] = useState(currentLocation.district);
  const [state, setState] = useState(currentLocation.state);
  const [addressType, setAddressType] = useState<'Home' | 'Work' | 'Other'>('Home');

  // Delivery slot
  const [selectedSlot, setSelectedSlot] = useState<'express_2hr' | 'standard_today' | 'tomorrow_morning'>('express_2hr');
  
  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState<Order | null>(null);

  // Attached Rx
  const [selectedRxId, setSelectedRxId] = useState<string | null>(
    uploadedPrescriptions.length > 0 ? uploadedPrescriptions[0].id : null
  );

  const hasRxItems = cartItems.some(i => i.product.requiresPrescription);

  // Calculation
  const itemTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const mrpTotal = cartItems.reduce((acc, item) => acc + (item.product.mrp * item.quantity), 0);
  const couponDiscount = appliedCoupon === 'PHARM20' ? Math.min((itemTotal * 20) / 100, 250) : appliedCoupon === 'MEDICARE25' ? Math.min((itemTotal * 25) / 100, 400) : 0;
  const deliveryFee = itemTotal >= 499 || appliedCoupon === 'FREESHIP' ? 0 : 40;
  const expressFee = selectedSlot === 'express_2hr' ? 19 : 0;
  const totalAmount = Math.max(0, itemTotal - couponDiscount - coinsUsed + deliveryFee + expressFee);

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    if (hasRxItems && uploadedPrescriptions.length === 0 && !selectedRxId) {
      alert('Please upload or attach a prescription before placing an order containing prescription medicines.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      
      const newOrder: Order = {
        orderId: `MC-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        items: [...cartItems],
        itemCount: cartItems.reduce((acc, i) => acc + i.quantity, 0),
        subtotal: itemTotal,
        discount: mrpTotal - itemTotal,
        couponDiscount: couponDiscount,
        deliveryFee: deliveryFee + expressFee,
        totalAmount: Math.round(totalAmount),
        coinsEarned: Math.round(totalAmount * 0.05 * 3), // 3X MediCare Coins promotion!
        prescriptionAttached: hasRxItems,
        prescriptionId: selectedRxId || (uploadedPrescriptions[0]?.id),
        shippingAddress: {
          id: `addr-${Date.now()}`,
          fullName,
          phoneNumber,
          pincode,
          locality,
          addressLine,
          city,
          state,
          addressType
        },
        paymentMethod: paymentMethod === 'upi' ? 'UPI (Google Pay / PhonePe)' : paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery',
        paymentStatus: paymentMethod === 'cod' ? 'Cash on Delivery Pending' : 'Paid',
        orderStatus: 'Placed',
        estimatedDeliveryDate: selectedSlot === 'express_2hr' ? 'Today in 2 Hours' : selectedSlot === 'standard_today' ? 'Today by 8 PM' : 'Tomorrow 10 AM - 1 PM',
        deliverySlot: selectedSlot === 'express_2hr' ? 'Express 2-Hour Delivery' : selectedSlot === 'standard_today' ? 'Standard Same-Day' : 'Next Day Morning'
      };

      setPlacedOrderDetails(newOrder);
      setStep('confirmed');
      onOrderPlaced(newOrder);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b4d34] text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg">Secure Pharmacy Checkout</h3>
              <p className="text-xs text-slate-500 font-medium">
                100% Encrypted • 19,000+ PIN Codes Serviced
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

        {/* Stepper (Hidden on confirmed) */}
        {step !== 'confirmed' && (
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs font-bold">
            <button
              onClick={() => setStep('address')}
              className={`flex items-center gap-1.5 cursor-pointer ${
                step === 'address' ? 'text-[#0b4d34]' : 'text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                step === 'address' ? 'bg-[#0b4d34] text-white' : 'bg-gray-200 text-slate-700'
              }`}>1</span>
              <span>Delivery Address</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            
            <button
              onClick={() => setStep('delivery')}
              className={`flex items-center gap-1.5 cursor-pointer ${
                step === 'delivery' ? 'text-[#0b4d34]' : 'text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                step === 'delivery' ? 'bg-[#0b4d34] text-white' : 'bg-gray-200 text-slate-700'
              }`}>2</span>
              <span>Slot & Rx</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />

            <button
              onClick={() => setStep('payment')}
              className={`flex items-center gap-1.5 cursor-pointer ${
                step === 'payment' ? 'text-[#0b4d34]' : 'text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                step === 'payment' ? 'bg-[#0b4d34] text-white' : 'bg-gray-200 text-slate-700'
              }`}>3</span>
              <span>Payment</span>
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* STEP 1: Address */}
          {step === 'address' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0b4d34]" />
                <span>Shipping & Delivery Details</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#0b4d34]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">10-Digit Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#0b4d34]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Flat / House No. / Building / Street *</label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#0b4d34]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-[#ea580c]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Locality</label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">City/District</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Address Type */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-bold text-slate-700">Save as:</span>
                {(['Home', 'Work', 'Other'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAddressType(type)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      addressType === type
                        ? 'bg-[#0b4d34] text-white shadow-xs'
                        : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep('delivery')}
                  className="bg-[#0b4d34] hover:bg-[#083a27] text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Continue to Slot & Rx</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery Slot & Rx Attachment */}
          {step === 'delivery' && (
            <div className="space-y-4 animate-in fade-in">
              {/* Prescription Section if Rx medicines are present */}
              {hasRxItems && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#0b4d34]" />
                      <h4 className="font-extrabold text-slate-800 text-sm">
                        Attach Doctor's Prescription
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={onOpenPrescriptionModal}
                      className="text-xs font-bold text-[#0b4d34] bg-white px-3 py-1 rounded-lg border border-emerald-300 hover:bg-emerald-50 cursor-pointer shadow-2xs"
                    >
                      + Upload New Rx
                    </button>
                  </div>

                  {uploadedPrescriptions.length > 0 ? (
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600 font-medium">
                        Select from your uploaded prescriptions:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {uploadedPrescriptions.map((rx) => (
                          <div
                            key={rx.id}
                            onClick={() => setSelectedRxId(rx.id)}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                              selectedRxId === rx.id
                                ? 'bg-white border-[#0b4d34] ring-1 ring-[#0b4d34] shadow-xs'
                                : 'bg-white/60 border-gray-200 hover:bg-white'
                            }`}
                          >
                            <div>
                              <div className="font-bold text-slate-800">{rx.fileName}</div>
                              <div className="text-[10px] text-slate-500">Patient: {rx.patientName} ({rx.status})</div>
                            </div>
                            {selectedRxId === rx.id && (
                              <CheckCircle className="w-4 h-4 text-[#0b4d34]" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                      <span>No prescription attached yet.</span>
                      <button
                        onClick={onOpenPrescriptionModal}
                        className="font-bold text-[#ea580c] underline"
                      >
                        Upload Now →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Delivery Slot Selection */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0b4d34]" />
                  <span>Choose Delivery Speed & Slot</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div
                    onClick={() => setSelectedSlot('express_2hr')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      selectedSlot === 'express_2hr'
                        ? 'border-[#ea580c] bg-orange-50/60 ring-1 ring-[#ea580c] shadow-xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] bg-[#ea580c] text-white px-2 py-0.5 rounded font-black">
                        ⚡ EXPRESS
                      </span>
                      <span className="text-xs font-black text-slate-900">+₹19</span>
                    </div>
                    <div className="font-bold text-slate-800 text-xs mt-1">2-Hour Delivery</div>
                    <div className="text-[10px] text-slate-500">Fastest dispatch from local hub</div>
                  </div>

                  <div
                    onClick={() => setSelectedSlot('standard_today')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      selectedSlot === 'standard_today'
                        ? 'border-[#0b4d34] bg-emerald-50/60 ring-1 ring-[#0b4d34] shadow-xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] bg-[#0b4d34] text-white px-2 py-0.5 rounded font-bold">
                        FREE
                      </span>
                    </div>
                    <div className="font-bold text-slate-800 text-xs mt-1">Today by 8 PM</div>
                    <div className="text-[10px] text-slate-500">Standard same-day delivery</div>
                  </div>

                  <div
                    onClick={() => setSelectedSlot('tomorrow_morning')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      selectedSlot === 'tomorrow_morning'
                        ? 'border-[#0b4d34] bg-emerald-50/60 ring-1 ring-[#0b4d34] shadow-xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] bg-slate-700 text-white px-2 py-0.5 rounded font-bold">
                        SCHEDULED
                      </span>
                    </div>
                    <div className="font-bold text-slate-800 text-xs mt-1">Tomorrow Morning</div>
                    <div className="text-[10px] text-slate-500">10:00 AM - 1:00 PM slot</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="text-xs font-semibold text-slate-600 hover:underline"
                >
                  ← Back to Address
                </button>
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="bg-[#0b4d34] hover:bg-[#083a27] text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 'payment' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0b4d34]" />
                <span>Select Payment Method</span>
              </h4>

              <div className="space-y-2">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#0b4d34] bg-emerald-50/60 ring-1 ring-[#0b4d34]'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-5 h-5 text-[#0b4d34]" />
                      <div>
                        <div className="text-xs font-bold text-slate-800">UPI Instant Payment</div>
                        <div className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Fastest
                    </span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-2.5 border-t border-emerald-200/70 flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter your UPI ID (e.g. mobile@upi)"
                        className="flex-1 px-3 py-1.5 bg-white border border-emerald-300 rounded-xl text-xs font-medium focus:outline-none"
                      />
                      <button
                        type="button"
                        className="bg-[#0b4d34] text-white text-xs font-bold px-3 py-1.5 rounded-xl"
                      >
                        Verify
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#0b4d34] bg-emerald-50/60 ring-1 ring-[#0b4d34]'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-[#0b4d34]" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Credit / Debit Card</div>
                      <div className="text-[11px] text-slate-500">Visa, MasterCard, RuPay, Maestro</div>
                    </div>
                  </div>
                </div>

                {/* Net Banking */}
                <div
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#0b4d34] bg-emerald-50/60 ring-1 ring-[#0b4d34]'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Wallet className="w-5 h-5 text-[#0b4d34]" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Net Banking</div>
                      <div className="text-[11px] text-slate-500">HDFC, ICICI, SBI, Axis, Kotak & all Indian banks</div>
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#0b4d34] bg-emerald-50/60 ring-1 ring-[#0b4d34]'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Banknote className="w-5 h-5 text-[#0b4d34]" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Cash / UPI on Delivery</div>
                      <div className="text-[11px] text-slate-500">Pay cash or scan QR at your doorstep</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1.5">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Payable Amount:</span>
                  <span className="text-base text-[#0b4d34]">₹{Math.round(totalAmount)}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Includes {cartItems.length} items • Delivering to {locality} ({pincode})
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('delivery')}
                  className="text-xs font-semibold text-slate-600 hover:underline"
                >
                  ← Back to Slot
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="bg-[#ea580c] hover:bg-[#c2410c] disabled:opacity-50 text-white font-extrabold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-md cursor-pointer active:scale-98"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Securing Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay & Confirm Order (₹{Math.round(totalAmount)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmed Screen */}
          {step === 'confirmed' && placedOrderDetails && (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0b4d34] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Order Successfully Placed
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Thank you for choosing MediCare+!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Order Reference: <strong className="font-mono text-[#0b4d34] text-base">{placedOrderDetails.orderId}</strong>
                </p>
              </div>

              {/* Order Details Card */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 text-left text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-emerald-100 pb-1.5">
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <span className="font-extrabold text-[#ea580c]">{placedOrderDetails.estimatedDeliveryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="font-bold text-slate-800 text-right">{placedOrderDetails.shippingAddress.locality}, {placedOrderDetails.shippingAddress.pincode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Status:</span>
                  <span className="font-bold text-emerald-700">{placedOrderDetails.paymentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">MediCare Coins Earned:</span>
                  <span className="font-extrabold text-amber-700">+{placedOrderDetails.coinsEarned} Coins (3X Bonus)</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                An SMS with live tracking details has been sent to {placedOrderDetails.shippingAddress.phoneNumber}.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="bg-[#0b4d34] hover:bg-[#083a27] text-white font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
