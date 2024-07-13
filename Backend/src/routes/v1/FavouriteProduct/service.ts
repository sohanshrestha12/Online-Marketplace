import ProductService from "../Product/services";
import UserService from "../Users/services";
import { createFavourite, deleteFavourite, getFavourite } from "./repository";

const FavouriteProductService = {
  async createFavourite(productId: string, userId: string) {
    UserService.getUserById(userId);
    ProductService.getProductById(productId);
    return createFavourite(productId, userId);
  },
  async deleteFavourite(productId: string, userId: string) {
    UserService.getUserById(userId);
    ProductService.getProductById(productId);
    return deleteFavourite(productId, userId);
  },
  async getFavourite(productId: string, userId: string) {
    UserService.getUserById(userId);
    ProductService.getProductById(productId);
    return getFavourite(productId, userId);
  },
};

export default FavouriteProductService;
