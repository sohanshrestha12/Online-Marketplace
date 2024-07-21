import { Router } from "express";
import RatingController from "./controller";
import requireUser from "../../../Middleware/requireUser";

const RatingRouter = Router({mergeParams:true});

RatingRouter.route('/').post(requireUser,RatingController.addRating);

export default RatingRouter;
