import { Router } from "express";
import CartController from "./controller";
import requireUser from "../../../Middleware/requireUser";
import checkUserRole from "../../../Middleware/checkUsersRole";

const CartRouter = Router();

CartRouter.route("/").get(requireUser,CartController.getCartProducts);
CartRouter.route("/add").post(requireUser,CartController.addToCart);

CartRouter.route("/totalCartProduct").get(requireUser,checkUserRole("SELLER"),CartController.getTotalCartProduct);

export default CartRouter;
