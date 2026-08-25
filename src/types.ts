export type ProductCategoryType = 
  | 'medicines' 
  | 'vitamins' 
  | 'devices' 
  | 'personal_care' 
  | 'baby_care' 
  | 'ayurveda' 
  | 'health_condition'
  | 'skin_care'
  | 'diabetes'
  | 'first_aid'
  | 'oral_care'
  | 'sexual_wellness';

export interface Product {
  id: string;
  name: string;
  brand: string;
  genericName?: string;
  category: ProductCategoryType;
  subCategory: string;
  dosageForm: string; // e.g. "Tablets", "Syrup", "Gel", "Device", "Drops", "Capsules", "Powder"
  packSize: string; // e.g. "15 Tablets / Strip", "200 ml Bottle", "1 Unit"
  price: number; // Discounted Price in INR
  mrp: number; // Maximum Retail Price in INR
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  requiresPrescription: boolean;
  isMedicareBrand?: boolean;
  isBestSeller?: boolean;
  image: string;
  gallery?: string[];
  description: string;
  keyIngredients?: string[];
  uses?: string[];
  benefits?: string[];
  dosageInstructions?: string;
  sideEffects?: string[];
  storageInfo?: string;
  safetyWarnings?: string[];
  manufacturer: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LocationData {
  pincode: string;
  locality: string;
  district: string;
  state: string;
  deliveryTime: string;
  allLocalities?: string[];
}

export interface Prescription {
  id: string;
  fileName: string;
  fileData?: string;
  patientName: string;
  doctorName?: string;
  notes?: string;
  uploadDate: string;
  status: 'Pending Review' | 'Verified' | 'Dispensing' | 'Rejected';
  orderOption: 'call_confirm' | 'auto_order';
  itemsEstimated?: string[];
}

export interface Address {
  id: string;
  fullName: string;
  phoneNumber: string;
  pincode: string;
  locality: string;
  addressLine: string;
  city: string;
  state: string;
  addressType: 'Home' | 'Work' | 'Other';
  isDefault?: boolean;
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  couponDiscount: number;
  deliveryFee: number;
  totalAmount: number;
  coinsEarned: number;
  prescriptionAttached?: boolean;
  prescriptionId?: string;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Cash on Delivery Pending';
  orderStatus: 'Placed' | 'Prescription Verified' | 'Packed' | 'Out for Delivery' | 'Delivered';
  estimatedDeliveryDate: string;
  deliverySlot: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  subcategories: string[];
  itemCount: number;
  bannerHeadline?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  minOrder: number;
  description: string;
  expiresOn: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  coins: number;
  isLoggedIn: boolean;
  savedAddresses: Address[];
}
