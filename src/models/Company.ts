import { model, Schema, Types } from 'mongoose';
import { addressSchema } from './AddressSchema';
import { BusinessType, IAddress } from '../types/types';
import validator from 'validator';

interface ICompany {
  name: string;
  description: string;
  businessType: BusinessType;
  establishedYear: number;
  productionCapacity?: string;
  address: IAddress;
  categories: Types.ObjectId[];
  rating: number;
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

const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      enum: ['Manufacturer', 'Wholesaler', 'Retailer'] as BusinessType[],
      required: true,
    },
    establishedYear: {
      type: Number,
      required: true,
      min: 1800,
      max: new Date().getFullYear(),
    },
    productionCapacity: {
      type: String,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    annualTurnover: {
      type: String,
    },
    contactInfo: {
      type: {
        contactPerson: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          trim: true,
          validate: {
            validator: function (value: string) {
              return /^\d{10}$/.test(value);
            },
            message: 'Phone number must be exactly 10 digits',
          },
        },
        email: {
          type: String,
          required: true,
          validate: {
            validator: (value: string) => validator.isEmail(value),
            message: 'Invalid contact email',
          },
        },
        website: {
          type: String,
        },
      },
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const companyModel = model<ICompany>('Company', companySchema);

export default companyModel;
