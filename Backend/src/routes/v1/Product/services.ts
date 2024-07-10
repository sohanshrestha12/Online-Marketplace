import CustomError from "../../../utils/Error";
import { getCategoryBrand } from "../Brand/repository";
import { Product } from "./model";
import { createProduct, deleleteProduct, deleteMultipleProducts, filterProducts, getAllProducts, getProductById } from "./repository";
import { ProductQuery, SearchQuery } from "./types";

const ProductService = {
  async createProduct(body: Product, files: string[],user:string) {
    return createProduct(body, files,user);
  },
  async getAllProducts(query:ProductQuery) {
    return getAllProducts(query);
  },
  async getProductById(id: string) {
    const task = await getProductById(id);
    if (!task) throw new CustomError("Invalid id", 404);
    return task;
  },
  async filterProducts(query:SearchQuery){
    const categoryBrand = await getCategoryBrand(query.category)
    const filter = await filterProducts(query);
    return { categoryBrand, filter };
  },
  async deleteProduct(id:string,userId:string){
    this.getProductById(id);
    return deleleteProduct(id,userId);
  },
  async deleteMultipleProduct(ids:string[],userId:string){
     return deleteMultipleProducts(ids,userId);
  }
};


export default ProductService;