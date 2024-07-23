import { Router } from "express";
import requireUser from "../../../Middleware/requireUser";
import PurchaseProductController from "./controller";

const PurchaseProductRouter = Router();

PurchaseProductRouter.route("/").get(requireUser,PurchaseProductController.addPurchaseProduct);


export default PurchaseProductRouter;