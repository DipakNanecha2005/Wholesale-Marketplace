import { HydratedDocument, model, Schema, Types } from 'mongoose';
import { ProductCategories } from '../types/types';
import slugify from 'slugify';

interface ICategory {
  name: string;
  slug?: string;
  description: string;
  parentId: Types.ObjectId | null;
}

const rootCategories: ProductCategories[] = [
  'Raw Fibers',
  'Yarn & Threads',
  'Fabric',
  'Apparel - Men',
  'Apparel - Women',
  'Kids & Baby Wear',
  'Home Textile',
  'Hosiery & Innerwear',
  'Fashion Accessories & Trims',
  'Technical & Industrial Textile',
];

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      validate: {
        validator: function () {
          const doc = this as HydratedDocument<ICategory>;
          return doc.isModified('slug') ? false : true;
        },
        message: 'Slug cannot be modified manually',
      },
    },
    description: {
      type: String,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      validate: {
        validator: function (value: Types.ObjectId | null) {
          const doc = this as HydratedDocument<ICategory>;
          if (rootCategories.includes(doc.name as ProductCategories)) {
            return value === null;
          }

          return value !== null && value !== undefined;
        },
        message: function () {
          const doc = this as HydratedDocument<ICategory>;
          if (rootCategories.includes(doc.name as ProductCategories)) {
            return 'Root categories must have parentId null';
          }

          return 'Subcategories must have a parent ObjectId';
        },
      },
      default: null, // null for root category
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre('save', function (this: HydratedDocument<ICategory>) {
  if (!this.slug || this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
});

categorySchema.index({ slug: 1 });

const categoryModel = model<ICategory>('Category', categorySchema);

export default categoryModel;
