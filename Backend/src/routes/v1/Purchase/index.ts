import { Router } from "express";
import requireUser from "../../../Middleware/requireUser";
import PurchaseProductController from "./controller";
import checkUserRole from "../../../Middleware/checkUsersRole";

const PurchaseProductRouter = Router();

PurchaseProductRouter.route("/").post(requireUser,PurchaseProductController.addPurchaseProduct);
PurchaseProductRouter.route("/").get(requireUser,PurchaseProductController.getPurchaseProduct);
PurchaseProductRouter.route("/getSalesDataByMonth").get(
  requireUser,
  checkUserRole("SELLER"),
  PurchaseProductController.getSalesDataByMonth
);


export default PurchaseProductRouter;