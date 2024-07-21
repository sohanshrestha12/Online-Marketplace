
import ReactStars from 'react-rating-stars-component';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useState } from 'react';

const Ratings = () => {
  const [currentRating,setCurrentRating] = useState<number | null>(null);
  const ratingChanged = (newRating: number) => {
    setCurrentRating(newRating);
    console.log(newRating);
  };

  return (
    <div >
      <p className='mb-2'>Your Rating:{" "}{currentRating?currentRating+ " stars":"You haven't rated this product yet"} </p>
      <ReactStars
        count={5}
        isHalf={true}
        onChange={ratingChanged}
        activeColor="#ffd700"
        // size={100}
        emptyIcon={<FaStar style={{ fontSize: "50px", color: "#ddd" }} />} 
        halfIcon={
          <FaStarHalfAlt style={{ fontSize: "50px", color: "#ffd700" }} />
        }
        filledIcon={<FaStar style={{ fontSize: "50px", color: "#ffd700" }} />} 
      />
    </div>
  );
};

export default Ratings;
