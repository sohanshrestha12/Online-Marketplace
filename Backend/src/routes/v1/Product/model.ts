import mongoose, { Types } from "mongoose";
import { Comment } from "../Comment/model";

export interface Product {
  _id?: string;
  createdAt?: string;
  name: string;
  description: string;
  category: string;
  brand?: string;
  price: number;
  colorFamily: string[];
  size: number[];
  quantity: number;
  rating?: Types.ObjectId[] ;
  videoUrl?: string;
  images?: string[] | File[];
  createdBy: Types.ObjectId;
  comments?: Comment[] | Types.ObjectId[];
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
    colorFamily: [
      {
        type: String,
        required: [true, "Color is Required"],
        unique: false,
      },
    ],
    price: {
      type: Number,
      required: [true, "Price is Required"],
      unique: false,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is Required"],
      unique: false,
    },
    size: [
      {
        type: Number,
        required: [true, "Size is Required"],
        unique: false,
      },
    ],
    rating:[{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Rating",
      unique: false,
    }],
    images: [
      {
        type: String,
        required: [true, "Image is Required"],
        unique: false,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: false,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required."],
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<Product>("Product", productSchema);
