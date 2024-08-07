import { Product } from "../Product/model";
import { UserDocument } from "../Users/model";
import { PurchaseProduct } from "./model";

export interface PurchasedProductQuery {
  page?: string;
  limit?: string;
}

export interface PurchasedProductReturn {
  purchasedProductList: PurchaseProduct[];
  totalPurchasedProduct: number;
  page: number;
  totalPage: number;
  limit: number;
}

export interface Purchases {
  productId: Product;
  userId: UserDocument;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  totalPrice: number;
}
