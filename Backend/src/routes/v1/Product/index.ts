import { Router } from "express";
import ProductController from "./controller";
import upload from "../../../Middleware/multerConfig";
import requireUser from "../../../Middleware/requireUser";
import checkUserRole from "../../../Middleware/checkUsersRole";

const ProductRouter = Router();

ProductRouter.post(
  "/",
  upload.array("images"),
  requireUser,
  checkUserRole("SELLER"),
  ProductController.createProduct
);
ProductRouter.patch(
  "/",
  upload.array("images"),
  requireUser,
  checkUserRole("SELLER"),
  ProductController.updateProduct
);
ProductRouter.route("/").get(ProductController.getAllProducts);
ProductRouter.route("/filterProducts").get(ProductController.filterProducts);
ProductRouter.route("/deleteMultiple").post(
    ProductController.deleteMultipleProduct
);
ProductRouter.route("/getCreatedDataByMonth").get(
    requireUser,
    checkUserRole("SELLER"),
    ProductController.getCreatedDataByMonth
);
ProductRouter.route("/:id").get(ProductController.getProductById);
ProductRouter.route("/:id").delete(ProductController.deleteProduct);

export default ProductRouter;
