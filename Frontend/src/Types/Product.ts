import { FetchProduct } from "@/pages/ProductDetails";


export interface Product {
  _id?:string;
  name: string;
  description: string;
  category:string;
  brand: string;
  price: number;
  colorFamily: string;
  size: number;
  quantity: number;
  rating?: number;
  videoUrl?:string;
  images: File[];
}

export interface FavProduct{
  _id:string;
  productId:FetchProduct;
  userId:string;
}

export interface purchaseProduct {
  productId: string;
  userId: string;
  selectedColor: string;
  selectedSize: number;
  quantity: number;
  totalPrice: number;
}