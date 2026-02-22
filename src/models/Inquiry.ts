import { model, Schema, Types } from 'mongoose';
import { InquiryStatus } from '../types/types';

interface IInquiryResponse {
  senderId: Types.ObjectId;
  message: string;
  createdAt?: Date;
}

interface IInquiry {
  inquiryNumber: string;
  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  targetPrice: number;
  message: string;
  status: InquiryStatus;
  responses?: IInquiryResponse[];
}

const inquirySchema = new Schema<IInquiry>(
  {
    inquiryNumber: {
      type: String,
      unique: true,
      immutable: true,
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
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    targetPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Responded', 'Closed'] as InquiryStatus[],
      default: 'Pending',
    },
    responses: {
      type: [
        {
          senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          message: {
            type: String,
            required: true,
            trim: true,
          },
          createdAt: {
            type: Date,
            default: () => Date.now(),
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

inquirySchema.pre<IInquiry>('save', async function () {
  const count = await model('Inquiry').countDocuments();
  this.inquiryNumber = `INQ-${String(count + 1).padStart(6, '0')}`;
});

const inquiryModel = model<IInquiry>('Inquiry', inquirySchema);

export default inquiryModel;
