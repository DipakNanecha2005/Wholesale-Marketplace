import { Schema } from 'mongoose';
import { IAddress } from '../types/types';

export const addressSchema = new Schema<IAddress>(
  {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 6,
      validate: {
        validator: (value: string) => /^\d{6}$/.test(value),
        message: 'Pincode must be 6 digits',
      },
    },
    landmark: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
    toObject: {
      virtuals: true,
    },
  },
);

addressSchema.virtual('fullAddress').get(function getFullAddress() {
  return `${this.street}, ${
    this.landmark
      ? `\nNear ${this.landmark.replace(/^near\s+/i, '').trim()},`
      : ''
  } \n${this.city}, ${this.state} - ${this.pincode}`;
});
