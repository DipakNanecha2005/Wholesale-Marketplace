import { model, Schema, Types } from 'mongoose';
import { addressSchema } from './AddressSchema';
import { IAddress, OrderPaymentStatus, OrderStatus } from '../types/types';

interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  unitPrice: number;
}

interface IOrder {
  orderNumber: string;
  inquiryId: Types.ObjectId;
  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  shippingAddress: IAddress;
}

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    inquiryId: {
      type: Schema.Types.ObjectId,
      ref: 'Inquiry',
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
        },
        unitPrice: {
          type: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'] as OrderStatus[],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },
    shippingAddress: {
      type: addressSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.pre<IOrder>('save', async function () {
  const count = await model('Order').countDocuments();
  this.orderNumber = `ORD-${String(count + 1).padStart(6, '0')}`;
});

const orderModel = model<IOrder>('Order', orderSchema);

export default orderModel;
