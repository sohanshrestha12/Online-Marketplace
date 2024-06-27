import { Product } from "./model";
import { createProduct } from "./repository";

const ProductService = {
    async createProduct(body:Product,files:string[]){
        return createProduct(body,files);
    }
}

export default ProductService;