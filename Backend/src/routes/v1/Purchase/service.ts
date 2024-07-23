import { PurchaseProduct } from "./model";
import { addPurchaseProduct } from "./repository";

const PurchaseProductService={
    async addPurchaseProduct(body:PurchaseProduct){
        return addPurchaseProduct(body);
    }
}

export default PurchaseProductService;