import { addToCart, getCartProducts } from "./repository";
import { CartType } from "./types";

const CartService ={
    async getCartProducts(userId:string){
        return getCartProducts(userId);
    },
    async addToCart(userId:string,body:CartType){
        return addToCart(userId,body);
    }
}

export default CartService;