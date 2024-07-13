import { Router } from "express";
import UserRouter from "./Users";
import AuthRouter from "./Auth";
import ProductRouter from "./Product";
import CategoryRouter from "./Category";
import BrandRouter from "./Brand";
import CartRouter from "./Cart";
import FavouriteProductRouter from "./FavouriteProduct";

const routes = Router();

routes.use("/users", UserRouter);
routes.use("/auth", AuthRouter);
routes.use("/product", ProductRouter);
routes.use("/category", CategoryRouter);
routes.use("/brand", BrandRouter);
routes.use("/cart", CartRouter);
routes.use("/favourite", FavouriteProductRouter);


export default routes;