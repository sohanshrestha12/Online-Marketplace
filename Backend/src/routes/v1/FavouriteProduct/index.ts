import { Router } from "express";
import requireUser from "../../../Middleware/requireUser";
import FavouriteProductController from "./controller";

const FavouriteProductRouter = Router();

FavouriteProductRouter.route("/:productId").get(requireUser,FavouriteProductController.getFavourite);
FavouriteProductRouter.route("/:productId").post(requireUser,FavouriteProductController.createFavourite);
FavouriteProductRouter.route("/:productId").delete(requireUser,FavouriteProductController.deleteFavourite);

export default FavouriteProductRouter;