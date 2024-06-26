import { Router } from "express";
import CategoryController from "./controller";

const CategoryRouter = Router();

CategoryRouter.route("/").get(CategoryController.getAllCategory);

export default CategoryRouter;
