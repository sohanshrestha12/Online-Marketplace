import { Router } from "express";
import UserRouter from "./Users";

const routes = Router();

routes.use("/users", UserRouter);


export default routes;