import { Router } from "express";
import UserRouter from "./Users";
import AuthRouter from "./Auth";
import ProductRouter from "./Product";
import CategoryRouter from "./Category";

const routes = Router();

routes.use("/users", UserRouter);
routes.use("/auth", AuthRouter);
routes.use("/product", ProductRouter);
routes.use("/category", CategoryRouter);


export default routes;