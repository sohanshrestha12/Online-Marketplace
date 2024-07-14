import ProductService from "../Product/services";
import UserService from "../Users/services";
import { createFavourite, deleteFavourite, getAllUserFavourites, getFavourite } from "./repository";

const FavouriteProductService = {
  async getAllUserFavourites(userId: string) {
    UserService.getUserById(userId);
    return getAllUserFavourites(userId);
  },
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
