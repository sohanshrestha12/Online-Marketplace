import ReactStars from "react-rating-stars-component";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createRating } from "@/api/Product";
import { FetchProduct, rating } from "@/pages/ProductDetails";
import { useAuth } from "./Auth/ProtectedRoutes";

interface RatingProps {
  product: FetchProduct;
  updateRating:(rating:rating)=>void;
}

const Ratings = ({ product,updateRating }: RatingProps) => {
  const { user } = useAuth();
  const [currentRating, setCurrentRating] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    // Find the rating for the current user
    if (user) {
      const userRating = product.rating
        ? product.rating.find((r) => r.user === user._id)
        : undefined;
      if (userRating) {
        setCurrentRating(userRating.rating);
      } else {
        setCurrentRating(undefined);
      }
    }
  }, [product.rating, user]);

  const ratingChanged = async (newRating: number) => {
    try {
      const response = await createRating(product._id!, { rating: newRating });
      updateRating(response.data.data.rating);
      console.log(response);
      setCurrentRating(newRating);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-5">
      <p className="mb-2">
        Your Rating:{" "}
        {currentRating
          ? currentRating + " out of 5"
          : "You haven't rated this product yet"}{" "}
      </p>
     {user ?
     ( <ReactStars
        key={currentRating}
        count={5}
        isHalf={true}
        value={currentRating}
        onChange={ratingChanged}
        activeColor="#ffd700"
        // size={100}
        emptyIcon={<FaStar style={{ fontSize: "50px", color: "#ddd" }} />}
        halfIcon={
          <FaStarHalfAlt style={{ fontSize: "50px", color: "#ffd700" }} />
        }
        filledIcon={<FaStar style={{ fontSize: "50px", color: "#ffd700" }} />}
      />):(<p>Please Login to rate the product</p>)
     }
    </div>
  );
};

export default Ratings;
