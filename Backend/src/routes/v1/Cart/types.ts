import { Types } from "mongoose";
import { Product } from "../Product/model";

export interface CartType {
  productId: string;
  quantity: number;
  selectedSize: number;
  selectedColor:string;
} 
export interface AllCart {
  userId?: Types.ObjectId;
  productId: Types.ObjectId | Product;
  quantity: number;
  selectedColor: string;
  selectedSize: number;
}
