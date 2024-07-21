import { addRatingToProduct } from "../Product/repository";
import { addRating } from "./repository";
import { ratingBody } from "./types";

const RatingService ={
    async addRating(productId:string,userId:string,body:ratingBody){
        const rating = await addRating(userId,body);
        if(!rating._id) return;
        const updatedRating = await addRatingToProduct(productId,rating._id);
        return {rating,updatedRating}
    }
}
export default RatingService;