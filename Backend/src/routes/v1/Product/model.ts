import mongoose from "mongoose";

export interface Product {
  _id?: string;
  createdAt?:string;
  name: string;
  description: string;
  category: string;
  brand?: string;
  price: number;
  colorFamily: string[];
  size: number;
  quantity: number;
  rating?: number;
  videoUrl?: string;
  images?: string[] | File[];
}

const productSchema = new mongoose.Schema<Product>(
  {
    name: {
      type: String,
      required: [true, "Product name is Required"],
      unique: false,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      unique: false,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      unique: false,
    },
    brand: {
      type: String,
      required: false,
      unique: false,
    },
    videoUrl: {
      type: String,
      required: false,
      unique: false,
    },
    colorFamily: [{
      type: String,
      required: [true, "Color is Required"],
      unique: false,
    }],
    price: {
      type: Number,
      required: [true,"Price is Required"],
      unique:false,
    },
    quantity: {
      type: Number,
      required: [true,"Quantity is Required"],
      unique:false,
    },
    size: [{
      type: Number,
      required: [true,"Size is Required"],
      unique:false,
    }],
    rating: {
      type: Number,
      required: false,
      unique:false,
    },
    images:[{
        type:String,
        required:[true,"Image is Required"],
        unique:false
    }]
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<Product>("product", productSchema);
