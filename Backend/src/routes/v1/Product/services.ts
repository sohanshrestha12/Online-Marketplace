import CustomError from "../../../utils/Error";
import { getCategoryBrand } from "../Brand/repository";
import { Product } from "./model";
import { createProduct, filterProducts, getAllProducts, getProductById } from "./repository";
import { SearchQuery } from "./types";

const ProductService = {
  async createProduct(body: Product, files: string[],user:string) {
    return createProduct(body, files,user);
  },
  async getAllProducts() {
    return getAllProducts();
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
};


export default ProductService;