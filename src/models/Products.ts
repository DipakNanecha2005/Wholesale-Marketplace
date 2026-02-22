import { model, Schema, Types } from 'mongoose';
import { FabricTypes, ProductSizes, ProductUnit } from '../types/types';

const fabric: FabricTypes[] = [
  'Cotton',
  'Polyester',
  'Silk',
  'Linen',
  'Wool',
  'Nylon',
  'Blended',
  'Denim',
  'Knit',
];

interface IPriceTier {
  minQty: number;
  price: number;
}

interface IProduct {
  name: string;
  description: string;
  sellerId?: Types.ObjectId;
  companyId: Types.ObjectId;
  categoryId: Types.ObjectId;
  fabricType?: FabricTypes;
  gsm?: string; // Grams per Square Meter
  unit: ProductUnit;
  priceTiers: IPriceTier[];
  colorOptions: string[];
  sizeOptions: ProductSizes[];
  stock: number;
  minimumOrderQuantity: number;
  pricePerUnit: number;
  minPrice: number;
  maxPrice: number;
  availability: 'In Stock' | 'Out of Stock';
  images?: string[];
  review?: Types.ObjectId[];
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    fabricType: {
      type: String,
      enum: fabric,
    },
    gsm: {
      type: String,
    },
    priceTiers: [
      {
        minQty: {
          type: Number,
        },
        price: {
          type: Number,
        },
      },
    ],
    unit: {
      type: String,
      enum: ['meter', 'kg', 'piece'] as ProductUnit[],
    },
    colorOptions: {
      type: [String],
      default: [],
    },
    sizeOptions: {
      type: [String],
      enum: ['S', 'M', 'L', 'XL'] as ProductSizes[],
      default: [],
    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
    },
    minimumOrderQuantity: {
      type: Number,
      min: 1,
      default: 1,
    },
    pricePerUnit: {
      type: Number,
      required: true,
      min: 0,
    },
    minPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    availability: {
      type: String,
      enum: ['In Stock', 'Out of Stock'],
      default: 'In Stock',
    },
    images: {
      type: [String],
      default: [],
    },
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
  },
);

productSchema.virtual('priceRange').get(function () {
  return `${this.minPrice}-${this.maxPrice}`;
});

const productModel = model<IProduct>('Product', productSchema);

export default productModel;
