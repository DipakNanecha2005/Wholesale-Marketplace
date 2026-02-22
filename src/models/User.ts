import { model, Schema, Types } from 'mongoose';
import validator from 'validator';
import { UserRoles } from '../types/types';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles;
  phoneNumber?: string;
  companyId?: Types.ObjectId;
  isCompanyOwner?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Please enter a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['Buyer', 'Seller', 'Admin'] as UserRoles[],
      default: 'Buyer',
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: undefined,
      validate: {
        validator: function (value: string) {
          if (!value) return true; // If empty string or undefined >> Skip the validation
          return /^\d{10}$/.test(value);
        },
        message: 'Phone number must be exactly 10 digits',
      },
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: function (this: IUser) {
        return this.role === 'Seller';
      },
    },
    isCompanyOwner: {
      type: Boolean,
      required: function (this: IUser) {
        return this.role === 'Seller';
      },
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
  },
);

userSchema.pre<IUser>('save', function () {
  if (this.role !== 'Seller') {
    this.isCompanyOwner = undefined;
    this.companyId = undefined;
  }
});

userSchema.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

const userModel = model<IUser>('User', userSchema);

export default userModel;
