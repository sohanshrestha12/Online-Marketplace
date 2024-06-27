import { Product, ProductModel } from "./model";

export const createProduct = (body:Product,files:string[]):Promise<Product> => {
    const product = new ProductModel({...body,images:files});
    return product.save();
}