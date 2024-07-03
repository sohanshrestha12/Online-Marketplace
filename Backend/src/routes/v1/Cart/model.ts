import mongoose, { Types } from "mongoose";

export interface Cart {
  userId?: Types.ObjectId,
  productId:Types.ObjectId,
  quantity: number
}

const CartSchema = new mongoose.Schema<Cart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: false,
      unique: false,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Product',
      required: true,
      unique: false,
    },
    quantity:{
        type: Number,
        required:false,
        unique:false,
        default:1,
    },
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model<Cart>("Cart", CartSchema);
