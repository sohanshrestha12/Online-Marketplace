import mongoose, { Types } from "mongoose";

export interface Cart {
  userId?: Types.ObjectId,
  productId:Types.ObjectId,
  quantity: number
  selectedColor:string,
  selectedSize:number,
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
    selectedColor:{
      type:String,
      required:true,
      unique:false
    },
    selectedSize:{
      type:Number,
      required:true,
      unique:false
    }
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model<Cart>("Cart", CartSchema);
