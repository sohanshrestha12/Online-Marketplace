import { Router } from "express";
import UserRouter from "./Users";
import AuthRouter from "./Auth";
import ProductRouter from "./Product";

const routes = Router();

routes.use("/users", UserRouter);
routes.use("/auth", AuthRouter);
routes.use("/product", ProductRouter);


export default routes;