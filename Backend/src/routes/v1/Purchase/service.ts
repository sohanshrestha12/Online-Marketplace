import { updateQuantityProduct } from "../Product/repository";
import { PurchaseProduct } from "./model";
import { addPurchaseProduct } from "./repository";

const PurchaseProductService={
    async addPurchaseProduct(body:PurchaseProduct){
        const addPurchase = await addPurchaseProduct(body);
        const updateQuantity = await updateQuantityProduct((body.productId.toString()),body.quantity);
        return {addPurchase,updateQuantity};
    }
}

export default PurchaseProductService;