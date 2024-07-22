import { rating } from "@/pages/ProductDetails";

export const countRatings = (ratings: rating[]) => {
    //index 0 lai 5 star ko count, index 1 lai 4 and so on..
    const counts = [0, 0, 0, 0, 0]; 

  ratings.forEach((rating) => {
    if (rating.rating >= 1 && rating.rating <= 5) {
      counts[5 - Math.round(rating.rating)]++; //5-5=0 count[0]++;
    }
  });

  return counts;
};
