import { Router } from "express";
import requireUser from "../../../Middleware/requireUser";
import PurchaseProductController from "./controller";

const PurchaseProductRouter = Router();

PurchaseProductRouter.route("/").post(requireUser,PurchaseProductController.addPurchaseProduct);
PurchaseProductRouter.route("/").get(requireUser,PurchaseProductController.getPurchaseProduct);


export default PurchaseProductRouter;