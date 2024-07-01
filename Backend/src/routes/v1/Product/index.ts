import { Router } from "express";
import ProductController from "./controller";
import upload from "../../../Middleware/multerConfig";
import requireUser from "../../../Middleware/requireUser";
import checkUserRole from "../../../Middleware/checkUsersRole";

const ProductRouter = Router();

ProductRouter.post("/",upload.array('images'),requireUser,checkUserRole('SELLER'),ProductController.createProduct);
ProductRouter.route("/").get(ProductController.getAllProducts);
ProductRouter.route("/filterProducts").get(ProductController.filterProducts);
ProductRouter.route("/:id").get(ProductController.getProductById);


export default ProductRouter;
