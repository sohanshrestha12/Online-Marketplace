import { Router } from "express";
import BrandController from "./controller";

const BrandRouter = Router();

BrandRouter.route("/").get(BrandController.getAllBrand);

export default BrandRouter;
