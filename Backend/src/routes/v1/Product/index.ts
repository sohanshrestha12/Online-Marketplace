import { Router } from "express";
import ProductController from "./controller";
import upload from "../../../Middleware/multerConfig";

const ProductRouter = Router();

ProductRouter.post("/",upload.array('images'),ProductController.createProduct);

export default ProductRouter;
