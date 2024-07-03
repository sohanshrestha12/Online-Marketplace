import { Router } from "express";
import CartController from "./controller";
import requireUser from "../../../Middleware/requireUser";

const CartRouter = Router();

CartRouter.route("/").get(requireUser,CartController.getCartProducts);
CartRouter.route("/add").post(requireUser,CartController.addToCart);

export default CartRouter;
