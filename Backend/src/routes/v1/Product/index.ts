import { Router } from "express";
import ProductController from "./controller";
import upload from "../../../Middleware/multerConfig";

const ProductRouter = Router();

ProductRouter.post("/",upload.array('images'),ProductController.createProduct);
ProductRouter.route("/").get(ProductController.getAllProducts);
ProductRouter.route("/filterProducts").get(ProductController.filterProducts);
ProductRouter.route("/:id").get(ProductController.getProductById);


export default ProductRouter;
