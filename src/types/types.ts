// Types

export type UserRoles = 'Buyer' | 'Seller' | 'Admin';

export type ProductCategories =
  | 'Raw Fibers'
  | 'Yarn & Threads'
  | 'Fabric'
  | 'Apparel - Men'
  | 'Apparel - Women'
  | 'Kids & Baby Wear'
  | 'Home Textile'
  | 'Hosiery & Innerwear'
  | 'Fashion Accessories & Trims'
  | 'Technical & Industrial Textile';

export type FabricTypes =
  | 'Cotton'
  | 'Polyester'
  | 'Silk'
  | 'Linen'
  | 'Wool'
  | 'Nylon'
  | 'Blended'
  | 'Denim'
  | 'Knit';

export type ProductSizes = 'S' | 'M' | 'L' | 'XL';

export type BusinessType = 'Manufacturer' | 'Wholesaler' | 'Retailer';

export type InquiryStatus = 'Pending' | 'Responded' | 'Closed';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export type ProductUnit = 'meter' | 'kg' | 'piece';

export type OrderPaymentStatus = 'Pending' | 'Paid' | 'Failed';

// Interfaces

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles;
  phoneNumber?: string;
  companyId?: string;
  isCompanyOwner?: boolean;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface ICategory {
  name: string;
  sslug?: string;
  description?: string;
  parentId: string | null;
}

export interface ICompany {
  name: string;
  description: string;
  businessType: BusinessType;
  establishedYear: number;
  productionCapacity?: string;
  address: IAddress;
  categories: string[];
  rating?: number;
  annualTurnover: Number;
  contactInfo: {
    contactPerson: string;
    phoneNumber: string;
    email: string;
    website?: string;
  };
  numberOfEmployees: Number;
  isVerified?: boolean;
}

export interface IInquiry {
  inquiryNumber: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  quantity: number;
  targetPrice: number;
  message: string;
  status: InquiryStatus;
  responses?: {
    senderId: string;
    message: string;
    createdAt?: Date;
  }[];
}

export interface IOrder {
  orderNumber: string;
  inquiryId: string;
  buyerId: string;
  sellerId: string;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  shippingAddress: IAddress;
}

export interface IProduct {
  name: string;
  description: string;
  sellerId?: string;
  companyId: string;
  categoryId: string;
  fabricType?: FabricTypes;
  gsm?: string; // Grams per Square Meter
  unit: ProductUnit;
  priceTiers: {
    minQty: number;
    price: number;
  }[];
  colorOptions: string[];
  sizeOptions: ProductSizes[];
  stock: number;
  minimumOrderQuantity: number;
  pricePerUnit: number;
  minPrice: number;
  maxPrice: number;
  availability: 'In Stock' | 'Out of Stock';
  images?: string[];
  review?: string[];
}

export interface IReview {
  review: string;
  rating: number;
  productId: string;
  userId: string;
}
