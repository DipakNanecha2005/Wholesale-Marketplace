import { model, Schema, Types } from 'mongoose';

interface IReview {
  review: string;
  rating: number;
  productId: Types.ObjectId;
  userId: Types.ObjectId;
}

const reviewSchema = new Schema<IReview>(
  {
    review: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const reviewModel = model<IReview>('Review', reviewSchema);

export default reviewModel;
