import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Plus, 
  Minus, 
  ShieldCheck, 
  FileText, 
  Truck, 
  Check, 
  AlertCircle, 
  Heart, 
  Share2, 
  Building2,
  Package,
  Clock,
  Zap
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  quantityInCart: number;
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onBuyNow?: (product: Product, quantity?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenPrescriptionModal: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onOpenPrescriptionModal
}) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'uses' | 'safety'>('details');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !product) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden border border-gray-100">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-[#0b4d34] text-xs font-extrabold px-2.5 py-1 rounded-lg border border-emerald-200">
              {product.category.toUpperCase().replace('_', ' ')}
            </span>
            {product.requiresPrescription && (
              <span className="bg-rose-50 text-rose-700 text-xs font-extrabold px-2.5 py-1 rounded-lg border border-rose-200 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Prescription Required</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-slate-900 rounded-full hover:bg-gray-100 transition-colors"
              title="Share product link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Image Column */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 h-64 sm:h-72 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all ${
                    isWishlisted ? 'bg-rose-50 text-rose-600' : 'bg-white text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* MediCare Quality Assurance Card */}
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-[#0b4d34] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0b4d34]" />
                  <span>100% Genuine Pharmacy Stock</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Sourced directly from licensed manufacturers. Stored in climate-controlled conditions.
                </p>
              </div>
            </div>

            {/* Right Information Column */}
            <div className="md:col-span-7 space-y-4">
              
              <div>
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  {product.brand}
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {product.name}
                </h2>
                {product.genericName && (
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Composition: <span className="text-slate-700">{product.genericName}</span>
                  </p>
                )}
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-emerald-50 text-[#0b4d34] px-2.5 py-1 rounded-lg text-xs font-black border border-emerald-200">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-[#0b4d34] text-[#0b4d34]" />
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {product.reviewsCount.toLocaleString()} Verified Customer Ratings
                </span>
              </div>

              {/* Price Row */}
              <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{product.price}
                    </span>
                    {product.mrp > product.price && (
                      <span className="text-xs text-slate-400 line-through">
                        MRP ₹{product.mrp}
                      </span>
                    )}
                    {product.discountPercent > 0 && (
                      <span className="bg-[#ea580c] text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                        {product.discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Inclusive of all taxes • {product.packSize}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-lg">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Prescription Notice if Required */}
              {product.requiresPrescription && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-bold">Prescription Required for this Medicine.</span>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      You can easily upload your doctor's prescription during checkout or upload now.
                    </p>
                    <button
                      onClick={onOpenPrescriptionModal}
                      className="mt-1 text-xs font-bold text-[#0b4d34] underline hover:text-[#ea580c]"
                    >
                      Upload Prescription Now →
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {quantityInCart === 0 ? (
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 bg-[#0b4d34] hover:bg-[#083a27] text-white font-extrabold py-3 px-6 rounded-2xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-between bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-1.5">
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)}
                      className="w-9 h-9 rounded-xl bg-white text-[#0b4d34] hover:bg-emerald-100 flex items-center justify-center font-bold shadow-xs cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-extrabold text-[#0b4d34] px-3 text-center">
                      {quantityInCart} in Cart
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantityInCart + 1)}
                      className="w-9 h-9 rounded-xl bg-[#0b4d34] text-white hover:bg-[#083a27] flex items-center justify-center font-bold shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {onBuyNow && (
                  <button
                    onClick={() => {
                      onBuyNow(product, quantityInCart > 0 ? quantityInCart : 1);
                      onClose();
                    }}
                    className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold py-3 px-6 rounded-2xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Buy Now</span>
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* Tabbed Medicine Information (Monograph) */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex gap-4 border-b border-gray-100 pb-2 text-xs sm:text-sm font-bold">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'details' ? 'border-[#0b4d34] text-[#0b4d34]' : 'border-transparent text-slate-500'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('uses')}
                className={`pb-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'uses' ? 'border-[#0b4d34] text-[#0b4d34]' : 'border-transparent text-slate-500'
                }`}
              >
                Uses & Dosage
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                className={`pb-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'safety' ? 'border-[#0b4d34] text-[#0b4d34]' : 'border-transparent text-slate-500'
                }`}
              >
                Safety & Manufacturer
              </button>
            </div>

            <div className="pt-3 text-xs sm:text-sm text-slate-700 space-y-3">
              {activeTab === 'details' && (
                <div className="space-y-2">
                  <p className="text-slate-600 leading-relaxed">{product.description}</p>
                  {product.keyIngredients && (
                    <div>
                      <strong className="text-slate-900 block mb-1">Key Active Ingredients:</strong>
                      <div className="flex flex-wrap gap-1.5">
                        {product.keyIngredients.map((ing, i) => (
                          <span key={i} className="bg-gray-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'uses' && (
                <div className="space-y-2">
                  {product.uses && (
                    <div>
                      <strong className="text-slate-900 block mb-1">Therapeutic Uses:</strong>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600">
                        {product.uses.map((u, i) => (
                          <li key={i}>{u}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {product.dosageInstructions && (
                    <div className="mt-2 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                      <strong className="text-[#0b4d34] block mb-0.5">Recommended Dosage:</strong>
                      <p className="text-xs text-slate-700">{product.dosageInstructions}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'safety' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#0b4d34]" />
                    <span><strong>Manufacturer:</strong> {product.manufacturer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#0b4d34]" />
                    <span><strong>Packaging:</strong> {product.packSize} • Form: {product.dosageForm}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-slate-600">
                    <strong>Storage Instructions:</strong> Store in a cool, dry place protected from direct sunlight. Keep out of reach of children.
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
