import { Router } from "express";
import UserRouter from "./Users";
import AuthRouter from "./Auth";
import ProductRouter from "./Product";
import CategoryRouter from "./Category";
import BrandRouter from "./Brand";
import CartRouter from "./Cart";
import FavouriteProductRouter from "./FavouriteProduct";
import CommentsRouter from "./Comment";
import RatingRouter from "./Rating";
import PurchaseProductRouter from "./Purchase";
import MessageRouter from "./Message";

const routes = Router();

routes.use("/users", UserRouter);
routes.use("/auth", AuthRouter);
routes.use("/product", ProductRouter);
routes.use("/category", CategoryRouter);
routes.use("/brand", BrandRouter);
routes.use("/cart", CartRouter);
routes.use("/favourite", FavouriteProductRouter);
routes.use("/purchase", PurchaseProductRouter);
routes.use('/message',MessageRouter);
routes.use("/product/:productId/rating",RatingRouter);
routes.use("/product/:productId/comment", CommentsRouter);



export default routes;