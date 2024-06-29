import CustomError from "../../../utils/Error";
import { Product } from "./model";
import { createProduct, getAllProducts, getProductById } from "./repository";

const ProductService = {
  async createProduct(body: Product, files: string[]) {
    return createProduct(body, files);
  },
  async getAllProducts() {
    return getAllProducts();
  },
  async getProductById(id: string) {
    const task = await getProductById(id);
    if (!task) throw new CustomError("Invalid id", 404);
    return task;
  },
};


export default ProductService;