import React, { useState } from 'react';
import { 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  FileText, 
  Heart, 
  ShoppingCart, 
  Zap, 
  MapPin, 
  Share2, 
  Check, 
  AlertTriangle, 
  Info, 
  Plus, 
  Minus,
  Sparkles,
  ArrowRight,
  Package,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { Product, LocationData } from '../types';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onNavigateHome: () => void;
  onNavigateCategory: (catId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  quantityInCart: number;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenPrescriptionModal: () => void;
  onOpenLocationModal: () => void;
  currentLocation: LocationData;
  relatedProducts: Product[];
  frequentlyBoughtTogether?: Product[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigateHome,
  onNavigateCategory,
  onSelectProduct,
  onAddToCart,
  onUpdateQuantity,
  onBuyNow,
  quantityInCart,
  isWishlisted,
  onToggleWishlist,
  onOpenPrescriptionModal,
  onOpenLocationModal,
  currentLocation,
  relatedProducts,
  frequentlyBoughtTogether = []
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [localQty, setLocalQty] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'ingredients' | 'dosage' | 'safety' | 'manufacturer'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [pincodeInput, setPincodeInput] = useState(currentLocation.pincode);
  const [isPinChecking, setIsPinChecking] = useState(false);
  const [pinCheckedStatus, setPinCheckedStatus] = useState<string | null>(`Delivery in ${currentLocation.deliveryTime} to ${currentLocation.pincode}`);

  // Image gallery array
  const galleryImages = product.gallery && product.gallery.length > 0 
    ? [product.image, ...product.gallery.filter(img => img !== product.image)]
    : [product.image];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.length === 6) {
      setIsPinChecking(true);
      setTimeout(() => {
        setIsPinChecking(false);
        setPinCheckedStatus(`Delivery available! Estimated arrival Today/Tomorrow in ${currentLocation.locality || 'your area'}`);
      }, 500);
    }
  };

  const savingsAmount = product.mrp - product.price;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-6 animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* 1. Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-6 overflow-x-auto py-1">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[#0b4d34] transition-colors cursor-pointer whitespace-nowrap"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button 
            onClick={() => onNavigateCategory(product.category)}
            className="hover:text-[#0b4d34] transition-colors cursor-pointer capitalize whitespace-nowrap"
          >
            {product.category.replace('_', ' ')}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-600 font-semibold whitespace-nowrap">
            {product.subCategory}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[#0b4d34] font-bold truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* 2. Top Main Product Card (Gallery + Info + Pricing Card) */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Gallery Column (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-square rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden group flex items-center justify-center p-4">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Discount Badge */}
                {product.discountPercent > 0 && (
                  <span className="absolute top-4 left-4 bg-[#ea580c] text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                    {product.discountPercent}% OFF
                  </span>
                )}

                {/* Prescription Required Pill */}
                {product.requiresPrescription && (
                  <span className="absolute top-4 right-4 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs">
                    <FileText className="w-3.5 h-3.5 text-rose-600" />
                    <span>Rx Required</span>
                  </span>
                )}
              </div>

              {/* Thumbnail Selector */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 bg-gray-50 p-1 cursor-pointer transition-all ${
                        selectedImage === img ? 'border-[#0b4d34] ring-2 ring-emerald-100' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover rounded-lg" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guaranteed Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 text-[#0b4d34] shrink-0" />
                  <span className="text-[11px] font-bold text-[#0b4d34]">100% Genuine Medicine</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <RotateCcw className="w-4 h-4 text-[#0b4d34] shrink-0" />
                  <span className="text-[11px] font-bold text-[#0b4d34]">Easy Returns & Refunds</span>
                </div>
              </div>
            </div>

            {/* Product Meta & Purchase Panel (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                
                {/* Brand & Share */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0b4d34] bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {product.brand}
                    </span>
                    {product.isBestSeller && (
                      <span className="text-[11px] font-extrabold text-[#ea580c] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Bestseller</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      className="p-2 text-slate-500 hover:text-slate-900 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                      title="Share product link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    {copiedLink && (
                      <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded">
                        Link copied!
                      </span>
                    )}
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        isWishlisted ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-rose-600 hover:bg-gray-100'
                      }`}
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mb-2">
                  {product.name}
                </h1>

                {/* Generic Active Composition */}
                {product.genericName && (
                  <p className="text-xs text-slate-500 font-medium mb-3">
                    Contains: <strong className="text-slate-700">{product.genericName}</strong>
                  </p>
                )}

                {/* Ratings and Reviews */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-1 bg-emerald-800 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                    <span>{product.rating}</span>
                    <Star className="w-3 h-3 fill-white text-white" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {product.reviewsCount.toLocaleString()} Verified Ratings & Reviews
                  </span>
                </div>

                <div className="h-px bg-gray-100 my-4" />

                {/* Price & Savings */}
                <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 mb-5">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      MRP ₹{product.mrp}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      Save ₹{savingsAmount} ({product.discountPercent}% OFF)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Inclusive of all applicable taxes • Earn <strong>{Math.floor(product.price * 0.05)} MediCare Coins</strong> on this order
                  </p>
                </div>

                {/* Pack Size / Form */}
                <div className="mb-5">
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Pack Size / Unit:
                  </span>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0b4d34] border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                    <Package className="w-4 h-4" />
                    <span>{product.packSize}</span>
                  </div>
                </div>

                {/* Prescription Warning Box if Rx */}
                {product.requiresPrescription && (
                  <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 mb-5 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <FileText className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-rose-900">
                          Prescription Required for this Medicine
                        </h4>
                        <p className="text-[11px] text-rose-700 leading-relaxed">
                          A valid doctor's prescription is required before dispatch. You can upload it during checkout or right now for instant pharmacist review.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onOpenPrescriptionModal}
                      className="shrink-0 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Upload Rx
                    </button>
                  </div>
                )}

                {/* PIN Code Delivery Checker */}
                <div className="border border-gray-200 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0b4d34]" />
                      <span>Check Delivery Speed to Your Location</span>
                    </span>
                    <button 
                      onClick={onOpenLocationModal}
                      className="text-xs text-[#ea580c] font-bold hover:underline cursor-pointer"
                    >
                      Change PIN
                    </button>
                  </div>
                  
                  <form onSubmit={handlePinCheck} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit Indian PIN code"
                      className="w-full px-3 py-1.5 text-xs font-bold text-slate-800 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b4d34]"
                    />
                    <button
                      type="submit"
                      disabled={isPinChecking || pincodeInput.length !== 6}
                      className="bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white text-xs font-bold px-4 py-1.5 rounded-xl shrink-0 cursor-pointer"
                    >
                      {isPinChecking ? 'Checking...' : 'Check'}
                    </button>
                  </form>

                  {pinCheckedStatus && (
                    <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                      <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{pinCheckedStatus}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Purchase Action Buttons */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center border-2 border-gray-200 rounded-2xl bg-white p-1 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                    <button
                      onClick={() => setLocalQty(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-200 text-slate-700 flex items-center justify-center cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-sm font-extrabold text-slate-900">
                      {localQty}
                    </span>
                    <button
                      onClick={() => setLocalQty(prev => prev + 1)}
                      className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-200 text-slate-700 flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    id="pdp-add-to-cart-btn"
                    onClick={() => onAddToCart(product, localQty)}
                    className="w-full sm:flex-1 bg-emerald-50 hover:bg-emerald-100 text-[#0b4d34] border-2 border-[#0b4d34] font-black text-sm py-3 px-5 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{quantityInCart > 0 ? `Add More (${quantityInCart} in cart)` : 'Add to Cart'}</span>
                  </button>

                  {/* Buy Now Button */}
                  <button
                    id="pdp-buy-now-btn"
                    onClick={() => onBuyNow(product, localQty)}
                    className="w-full sm:flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white font-black text-sm py-3 px-5 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Buy Now</span>
                  </button>

                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 3. Detailed Product Tabs (Overview, Benefits, Ingredients, Dosage, Safety, Manufacturer) */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm mb-10">
          
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto pb-2 scrollbar-none mb-6">
            {[
              { id: 'overview', label: 'Product Overview' },
              { id: 'benefits', label: 'Key Benefits' },
              { id: 'ingredients', label: 'Ingredients & Composition' },
              { id: 'dosage', label: 'Directions & Dosage' },
              { id: 'safety', label: 'Safety & Storage' },
              { id: 'manufacturer', label: 'Manufacturer Info' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0b4d34] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="text-slate-700 text-sm leading-relaxed max-w-4xl">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">About {product.name}</h3>
                <p>{product.description}</p>
                {product.uses && product.uses.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Primary Therapeutic Indications:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      {product.uses.map((use, i) => (
                        <li key={i}>{use}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">Proven Health Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(product.benefits || [
                    'Standardized pharmaceutical purity and clinical efficacy',
                    'Formulated for rapid bioavailability and gut comfort',
                    'Quality tested under strict ISO & GMP regulatory standards',
                    'Doctor-trusted brand with verified patient satisfaction'
                  ]).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/60">
                      <Check className="w-4 h-4 text-[#0b4d34] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Composition & Active Formulation</h3>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <div className="space-y-2">
                    {(product.keyIngredients || ['Active Pharmaceutical Compound (IP standard)', 'Excipients Q.S.']).map((ing, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-gray-100 last:border-0">
                        <span className="font-semibold text-slate-800">{ing}</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dosage' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Directions for Use</h3>
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs sm:text-sm text-slate-800">
                  <p className="font-medium mb-2">
                    {product.dosageInstructions || 'Take as advised by your registered medical practitioner or as indicated on the packaging.'}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Note: Never exceed the recommended daily allowance. Swallow tablets whole with plenty of water. Do not crush or chew sustained-release formulations.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Safety Precautions & Storage Guidelines</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">Precautions:</span>
                      <span>{product.safetyWarnings?.join('. ') || 'Read label carefully before use. Keep out of reach of children. Consult doctor if pregnant or lactating.'}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-slate-700 text-xs">
                    <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">Storage:</span>
                      <span>{product.storageInfo || 'Store in a cool, dry place below 25°C away from direct sunlight and moisture.'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'manufacturer' && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">Manufacturing & Regulatory Details</h3>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-slate-500">Manufactured By:</span>
                    <strong className="text-slate-900">{product.manufacturer}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-slate-500">Marketed By:</span>
                    <strong className="text-[#0b4d34]">MediCare+ Healthcare Network Ltd</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-slate-500">Country of Origin:</span>
                    <strong className="text-slate-900">India (Bharat)</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Drug License / FSSAI:</span>
                    <strong className="text-slate-900">DL-KA-BNG-84920 / 1002004300084</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 4. Frequently Bought Together Bundle */}
        {frequentlyBoughtTogether.length > 0 && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm mb-10">
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#0b4d34]" />
              <span>Frequently Bought Together</span>
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {/* Main Product */}
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-200 p-1 flex items-center justify-center shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="text-xs">
                    <h5 className="font-bold text-slate-800 line-clamp-1">{product.name}</h5>
                    <span className="text-slate-900 font-extrabold">₹{product.price}</span>
                  </div>
                </div>

                <span className="text-lg font-bold text-slate-400">+</span>

                {/* Additional products */}
                {frequentlyBoughtTogether.slice(0, 2).map((bundleProd) => (
                  <React.Fragment key={bundleProd.id}>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-200 p-1 flex items-center justify-center shrink-0">
                        <img src={bundleProd.image} alt={bundleProd.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div className="text-xs">
                        <h5 className="font-bold text-slate-800 line-clamp-1">{bundleProd.name}</h5>
                        <span className="text-slate-900 font-extrabold">₹{bundleProd.price}</span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Add Bundle CTA */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-center shrink-0 w-full md:w-auto">
                <span className="text-xs text-slate-500 block">Total Combo Price</span>
                <span className="text-xl font-black text-[#0b4d34] block mb-2">
                  ₹{product.price + frequentlyBoughtTogether.slice(0, 2).reduce((sum, p) => sum + p.price, 0)}
                </span>
                <button
                  onClick={() => {
                    onAddToCart(product, 1);
                    frequentlyBoughtTogether.slice(0, 2).forEach(p => onAddToCart(p, 1));
                  }}
                  className="bg-[#0b4d34] hover:bg-[#083a27] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer w-full"
                >
                  Add Combo to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Related Healthcare Essentials
                </h3>
                <p className="text-xs text-slate-500">
                  Customers who viewed this item also ordered
                </p>
              </div>
              <button
                onClick={() => onNavigateCategory(product.category)}
                className="text-xs font-bold text-[#0b4d34] hover:text-[#ea580c] flex items-center gap-1 cursor-pointer"
              >
                <span>View More in {product.category.replace('_', ' ')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.slice(0, 4).map(relProd => (
                <ProductCard
                  key={relProd.id}
                  product={relProd}
                  onSelectProduct={() => {
                    onSelectProduct(relProd);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onAddToCart={() => onAddToCart(relProd, 1)}
                  onUpdateQuantity={(newQty) => onUpdateQuantity(relProd.id, newQty)}
                  quantityInCart={quantityInCart}
                  isWishlisted={false}
                  onToggleWishlist={() => onToggleWishlist(relProd)}
                  onQuickView={() => onSelectProduct(relProd)}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
