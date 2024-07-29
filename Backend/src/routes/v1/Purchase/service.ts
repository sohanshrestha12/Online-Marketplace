import { updateQuantityProduct } from "../Product/repository";
import { PurchaseProduct } from "./model";
import { addPurchaseProduct, getPurchaseProduct, getSalesDataByMonth } from "./repository";
import { PurchasedProductQuery } from "./types";

const PurchaseProductService = {
  async addPurchaseProduct(body: PurchaseProduct) {
    const addPurchase = await addPurchaseProduct(body);
    const updateQuantity = await updateQuantityProduct(
      body.productId.toString(),
      body.quantity
    );
    return { addPurchase, updateQuantity };
  },
  async getPurchaseProduct(userId: string, query: PurchasedProductQuery) {
    return getPurchaseProduct(userId, query);
  },
  async getSalesDataByMonth(sellerId: string) {
    return getSalesDataByMonth(sellerId);
  },
};

export default PurchaseProductService;