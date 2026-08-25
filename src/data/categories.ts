import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'medicines',
    name: 'Medicines',
    slug: 'medicines',
    iconName: 'Pill',
    subcategories: [
      'Fever & Pain Relief',
      'Heart & Blood Pressure',
      'Antibiotics & Anti-Infective',
      'Stomach & Digestion',
      'Cough, Cold & Allergy',
      'Eye & Ear Drops',
      'Pain Relieving Balms',
      'Diabetes Medicines',
      'Vitamins & Supplements',
      "Women's Health",
      "Men's Health",
      'Dermatology & Skin Medicines',
      'Bone & Joint Care',
      'Respiratory Care',
      'Pediatric Medicines',
      'Prescription Medicines',
      'OTC Medicines'
    ],
    itemCount: 1420,
    bannerHeadline: 'Save Flat 20% on Genuine Allopathic & Prescription Medicines'
  },
  {
    id: 'vitamins',
    name: 'Vitamins & Supplements',
    slug: 'vitamins-supplements',
    iconName: 'Apple',
    subcategories: [
      'Multivitamins',
      'Calcium',
      'Vitamin D',
      'Iron',
      'Protein Supplements',
      'Immunity Supplements',
      'Omega 3 & Fish Oil',
      'Effervescent Tablets'
    ],
    itemCount: 860,
    bannerHeadline: 'Clinically Formulated Daily Vitamins & Vitality Essentials'
  },
  {
    id: 'diet_nutrition',
    name: 'Diet & Nutrition',
    slug: 'diet-nutrition',
    iconName: 'Activity',
    subcategories: [
      'Protein',
      'Health Drinks',
      'Diabetic Nutrition',
      'Weight Management',
      'Energy & Nutrition Bars',
      'Herbal Teas & Infusions'
    ],
    itemCount: 620,
    bannerHeadline: 'Fuel Your Body with Certified Daily Nutrition & Protein Supplements'
  },
  {
    id: 'devices',
    name: 'Health Devices',
    slug: 'health-devices',
    iconName: 'Activity',
    subcategories: [
      'Blood Pressure Monitors',
      'Glucometers',
      'Thermometers',
      'Oximeters',
      'Nebulizers',
      'Medical Equipment',
      'Digital Weighing Scales',
      'Heating Pads'
    ],
    itemCount: 340,
    bannerHeadline: 'Clinical Grade Diagnostic Devices for Home Health Monitoring'
  },
  {
    id: 'personal_care',
    name: 'Personal Care',
    slug: 'personal-care',
    iconName: 'Sparkles',
    subcategories: [
      'Hair Care',
      'Bath & Body',
      'Deodorants',
      'Grooming',
      'Feminine Hygiene',
      'Hand Washes & Sanitizers'
    ],
    itemCount: 1120,
    bannerHeadline: 'Dermatologist-Tested Skincare & Daily Hygiene Essentials'
  },
  {
    id: 'skin_care',
    name: 'Skin Care',
    slug: 'skin-care',
    iconName: 'Sparkles',
    subcategories: [
      'Face Care',
      'Moisturizers',
      'Sunscreen',
      'Acne Care',
      'Body Care',
      'Anti-Aging & Serums'
    ],
    itemCount: 780,
    bannerHeadline: 'Clinically Backed Dermatological Formulas for Radiant Skin'
  },
  {
    id: 'baby_care',
    name: 'Baby Care',
    slug: 'baby-care',
    iconName: 'HeartHandshake',
    subcategories: [
      'Baby Food',
      'Diapers',
      'Baby Skin Care',
      'Baby Bath',
      'Mother & Baby Care',
      'Rash Relief Creams'
    ],
    itemCount: 490,
    bannerHeadline: 'Tear-Free, Hypoallergenic Care for Your Little One'
  },
  {
    id: 'ayurveda',
    name: 'Ayurveda',
    slug: 'ayurveda',
    iconName: 'Leaf',
    subcategories: [
      'Ayurvedic Medicines',
      'Herbal Products',
      'Herbal Supplements',
      'Natural Wellness',
      'Chyawanprash & Rasayanas',
      'Ashwagandha & Shilajit'
    ],
    itemCount: 680,
    bannerHeadline: '100% Pure Herbal Formulations Backed by Ancient Wisdom'
  },
  {
    id: 'health_condition',
    name: 'Health Condition',
    slug: 'health-condition',
    iconName: 'Stethoscope',
    subcategories: [
      'Diabetes',
      'Heart Care',
      'Blood Pressure',
      'Digestive Health',
      'Immunity',
      'Joint & Bone Care',
      'Liver & Kidney Care'
    ],
    itemCount: 950,
    bannerHeadline: 'Specialized Care Packages Tailored to Your Medical Condition'
  },
  {
    id: 'diabetes',
    name: 'Diabetes Care',
    slug: 'diabetes-care',
    iconName: 'Droplets',
    subcategories: [
      'Blood Glucose Monitors',
      'Test Strips & Lancets',
      'Sugar Free Substitutes',
      'Diabetic Foot Care',
      'Herbal Sugar Control',
      'Prescription Glycemic Drugs'
    ],
    itemCount: 430,
    bannerHeadline: 'Complete Glycemic Management & Certified Testing Essentials'
  },
  {
    id: 'first_aid',
    name: 'First Aid',
    slug: 'first-aid',
    iconName: 'ShieldAlert',
    subcategories: [
      'Antiseptic Liquids & Ointments',
      'Bandages & Dressings',
      'Burn Care Creams',
      'Cotton, Gauze & Tapes',
      'Pain Relief Sprays',
      'First Aid Kits'
    ],
    itemCount: 310,
    bannerHeadline: 'Emergency Medical & Wound Care Essentials Ready for Any Need'
  },
  {
    id: 'oral_care',
    name: 'Oral Care',
    slug: 'oral-care',
    iconName: 'Smile',
    subcategories: [
      'Medicated Toothpastes',
      'Electric & Manual Toothbrushes',
      'Mouthwashes & Gargles',
      'Dental Floss & Interdental',
      'Dentures & Gum Care'
    ],
    itemCount: 290,
    bannerHeadline: 'Dentist-Recommended Oral Hygiene & Tooth Sensitivity Solutions'
  },
  {
    id: 'sexual_wellness',
    name: 'Sexual Wellness',
    slug: 'sexual-wellness',
    iconName: 'Heart',
    subcategories: [
      'Lubricants & Gels',
      'Stamina & Vitality Boosters',
      'Family Planning & Condoms',
      'Test Kits & Fertility'
    ],
    itemCount: 220,
    bannerHeadline: 'Discreetly Packaged Wellness & Intimate Health Formulations'
  }
];

export const HEALTH_CONCERN_TAGS = [
  { id: 'diabetes', name: 'Diabetes Care', icon: 'Droplets', count: '180+ Products', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { id: 'heart', name: 'Cardiac & BP', icon: 'HeartPulse', count: '120+ Products', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  { id: 'stomach', name: 'Digestion & Gut', icon: 'ShieldAlert', count: '140+ Products', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { id: 'immunity', name: 'Immunity Booster', icon: 'ShieldCheck', count: '210+ Products', color: 'bg-teal-50 text-teal-800 border-teal-200' },
  { id: 'bone_joint', name: 'Bone & Joints', icon: 'Bone', count: '95+ Products', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  { id: 'skin', name: 'Derma & Skin', icon: 'Sparkles', count: '260+ Products', color: 'bg-orange-50 text-orange-800 border-orange-200' }
];

export const COUPONS = [
  {
    code: 'PHARM20',
    discountPercent: 20,
    maxDiscount: 250,
    minOrder: 499,
    description: 'Flat 20% OFF on first medicine or healthcare order above ₹499.',
    expiresOn: 'Limited Time Offer'
  },
  {
    code: 'MEDICARE25',
    discountPercent: 25,
    maxDiscount: 400,
    minOrder: 999,
    description: 'Special 25% OFF on MediCare+ Exclusive health devices & wellness.',
    expiresOn: 'Valid Today'
  },
  {
    code: 'FREESHIP',
    discountPercent: 0,
    maxDiscount: 50,
    minOrder: 299,
    description: 'Zero delivery fee on all orders above ₹299 across India.',
    expiresOn: 'All Users'
  }
];
