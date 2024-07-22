import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

type RatingProps = {
  rating: number;
};
const RatingStars = ({ rating }: RatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="flex">
      {Array(totalStars)
        .fill(null)
        .map((_, index) => {
          if (index < fullStars) {
            return <FaStar key={index} className="text-yellow-500" />;
          } else if (index === fullStars && hasHalfStar) {
            return <FaStarHalfAlt key={index} className="text-yellow-500" />;
          } else {
            return <FaRegStar key={index} className="text-yellow-500" />;
          }
        })}
    </div>
  );
};

export default RatingStars;