import React from 'react';
import { Star, Plus, Minus, Heart, Eye, FileText, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onBuyNow?: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onBuyNow,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
  onQuickView
}) => {
  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      onQuickView(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100/90 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group relative p-3.5 sm:p-4">
      
      {/* Top Badges & Wishlist */}
      <div className="flex items-start justify-between gap-1 z-10">
        <div className="flex flex-col gap-1">
          {product.discountPercent > 0 && (
            <span className="bg-[#ea580c] text-white text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-2xs">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.requiresPrescription && (
            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <FileText className="w-2.5 h-2.5" />
              <span>Rx Required</span>
            </span>
          )}
          {product.isMedicareBrand && (
            <span className="bg-emerald-50 text-[#0b4d34] border border-emerald-200 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded">
              MediCare+ Choice
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-gray-50 hover:bg-gray-100 text-slate-400 hover:text-slate-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <div 
        onClick={handleCardClick}
        className="relative my-2 sm:my-3 cursor-pointer overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center h-36 sm:h-44 group/img border border-gray-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Pack Size */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1 gap-1">
            <span className="font-bold text-emerald-800 truncate max-w-[130px]">{product.brand}</span>
            <span className="truncate text-slate-500 font-medium">{product.packSize}</span>
          </div>

          {/* Product Name */}
          <h4 
            onClick={handleCardClick}
            className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 hover:text-[#0b4d34] cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* Active Composition / Key generic formula */}
          {product.genericName && (
            <p className="text-[10px] text-slate-500 line-clamp-1 mt-1 font-medium bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100" title={product.genericName}>
              <span className="text-slate-400 font-semibold">Formula:</span> {product.genericName}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center gap-0.5 bg-emerald-50 text-[#0b4d34] px-1.5 py-0.5 rounded text-[10px] font-extrabold border border-emerald-200">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-[#0b4d34] text-[#0b4d34]" />
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              ({product.reviewsCount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 space-y-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-black text-slate-900">
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <span className="text-[11px] text-slate-400 line-through">
                MRP ₹{product.mrp}
              </span>
            )}
          </div>

          {/* Add to Cart or Stepper + Buy Now Button */}
          {quantityInCart === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-[#0b4d34] hover:bg-[#083a27] text-white font-bold py-2 px-2.5 rounded-xl text-xs transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer active:scale-98"
              >
                <Plus className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Add to Cart</span>
              </button>

              {onBuyNow ? (
                <button
                  onClick={() => onBuyNow(product)}
                  className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-2 px-2.5 rounded-xl text-xs transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer active:scale-98"
                >
                  <Zap className="w-3.5 h-3.5 shrink-0 fill-current" />
                  <span className="truncate">Buy Now</span>
                </button>
              ) : (
                <button
                  onClick={handleCardClick}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-[#0b4d34] border border-emerald-200 font-bold py-2 px-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Details</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl p-1">
                <button
                  onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)}
                  className="w-7 h-7 rounded-lg bg-white text-[#0b4d34] hover:bg-emerald-100 flex items-center justify-center font-bold transition-colors shadow-2xs cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs font-extrabold text-[#0b4d34] px-1">
                  {quantityInCart} in cart
                </span>

                <button
                  onClick={() => onUpdateQuantity(product.id, quantityInCart + 1)}
                  className="w-7 h-7 rounded-lg bg-[#0b4d34] text-white hover:bg-[#083a27] flex items-center justify-center font-bold transition-colors shadow-2xs cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {onBuyNow && (
                <button
                  onClick={() => onBuyNow(product)}
                  className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-1.5 px-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Proceed to Checkout</span>
                </button>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
