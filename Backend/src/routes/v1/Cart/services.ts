import { addToCart, getCartProducts, getTotalCartProduct, removeCartItems } from "./repository";
import { CartType } from "./types";

const CartService ={
    async getCartProducts(userId:string){
        return getCartProducts(userId);
    },
    async addToCart(userId:string,body:CartType){
        return addToCart(userId,body);
    },
    async getTotalCartProduct(sellerId:string){
        return getTotalCartProduct(sellerId);
    },
    async removeCartItems(productId:string){
        return removeCartItems(productId);
    }
}

export default CartService;