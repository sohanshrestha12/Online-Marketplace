import { RatingModel } from "./model";
import { ratingBody } from "./types";

export const addRating =async(userId:string,body:ratingBody):Promise<RatingModel>=>{
    return  RatingModel.findOneAndUpdate(
        {user:userId},
        {rating:body.rating},
        {upsert:true,new:true},
    )
}