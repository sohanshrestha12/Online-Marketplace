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