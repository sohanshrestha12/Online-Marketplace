import ProductService from "../Product/services";
import { PurchaseModel, PurchaseProduct } from "./model";

export const addPurchaseProduct = async(body:PurchaseProduct):Promise<PurchaseProduct> => {
    await ProductService.getProductById((body.productId).toString());
    const purchasedProduct = new PurchaseModel(body);
    return purchasedProduct.save();
}