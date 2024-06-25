import { Router } from "express";
import UserRouter from "./Users";
import AuthRouter from "./Auth";

const routes = Router();

routes.use("/users", UserRouter);
routes.use("/auth", AuthRouter);


export default routes;